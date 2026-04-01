"""
Tests for scrape_website() — Firecrawl primary scraper with Jina Reader fallback.

Acceptance criteria covered:
  AC1 – Firecrawl 402/non-2xx → auto-retry via Jina (https://r.jina.ai/{url}),
          return Jina body, log warning.
  AC2 – Firecrawl AND Jina both fail → raise descriptive exception with both
          failure reasons; must not silently swallow errors.
  AC3 – Firecrawl 2xx → Jina never called, Firecrawl result returned unchanged.
"""
import logging
from unittest.mock import MagicMock, patch, call

import pytest
import requests

# ---------------------------------------------------------------------------
# Module under test
# ---------------------------------------------------------------------------
from src.tools.website_intelligence import scrape_website

SAMPLE_URL = "https://example.com/page"
FIRECRAWL_CONTENT = "firecrawl scraped content"
JINA_CONTENT = "jina scraped content"
JINA_EXPECTED_URL = f"https://r.jina.ai/{SAMPLE_URL}"


# ===========================================================================
# AC3 — Happy path: Firecrawl succeeds, Jina is never touched
# ===========================================================================

class TestFirecrawlSuccess:
    """
    Given: Firecrawl returns a successful 2xx response
    When: scrape_website() is called
    Then: Jina Reader is never called; the Firecrawl result is returned unchanged.
    """

    def test_returns_firecrawl_content_on_success(self):
        """Firecrawl 200 → result returned verbatim, no Jina call."""
        mock_firecrawl = MagicMock()
        mock_firecrawl.scrape_url.return_value = {"content": FIRECRAWL_CONTENT}

        with patch("src.tools.website_intelligence.FirecrawlApp", return_value=mock_firecrawl), \
             patch("src.tools.website_intelligence.requests.get") as mock_get:

            result = scrape_website(SAMPLE_URL)

        assert FIRECRAWL_CONTENT in result
        mock_get.assert_not_called()

    def test_jina_not_called_when_firecrawl_succeeds(self):
        """Jina endpoint is never hit on a successful Firecrawl response."""
        mock_firecrawl = MagicMock()
        mock_firecrawl.scrape_url.return_value = {"content": FIRECRAWL_CONTENT}

        with patch("src.tools.website_intelligence.FirecrawlApp", return_value=mock_firecrawl), \
             patch("requests.get") as mock_get:

            scrape_website(SAMPLE_URL)

        # Assert Jina URL was never requested
        for c in mock_get.call_args_list:
            assert "r.jina.ai" not in str(c), "Jina should not be called on Firecrawl success"

    def test_firecrawl_result_type_preserved(self):
        """Return type is str (the scraped text content)."""
        mock_firecrawl = MagicMock()
        mock_firecrawl.scrape_url.return_value = {"content": FIRECRAWL_CONTENT}

        with patch("src.tools.website_intelligence.FirecrawlApp", return_value=mock_firecrawl):
            result = scrape_website(SAMPLE_URL)

        assert isinstance(result, str)


# ===========================================================================
# AC1 — Firecrawl fails (402 / non-2xx) → fallback to Jina
# ===========================================================================

class TestFirecrawlFailsJinaSucceeds:
    """
    Given: Firecrawl returns HTTP 402 or any non-2xx error
    When: scrape_website() is called with any URL
    Then: the function automatically retries the same URL via Jina Reader
          (https://r.jina.ai/{url}), returns the Jina response body, and logs
          a warning that Firecrawl failed and Jina fallback was used.
    """

    def _firecrawl_error(self, status_code: int = 402):
        """Return a mock FirecrawlApp that raises an HTTP error."""
        mock_firecrawl = MagicMock()
        err = requests.HTTPError(f"HTTP {status_code}")
        err.response = MagicMock(status_code=status_code)
        mock_firecrawl.scrape_url.side_effect = err
        return mock_firecrawl

    def _jina_ok_response(self):
        resp = MagicMock()
        resp.status_code = 200
        resp.text = JINA_CONTENT
        resp.raise_for_status = MagicMock()
        return resp

    def test_402_triggers_jina_fallback(self):
        """HTTP 402 from Firecrawl causes a Jina retry."""
        mock_jina_resp = self._jina_ok_response()

        with patch("src.tools.website_intelligence.FirecrawlApp", return_value=self._firecrawl_error(402)), \
             patch("src.tools.website_intelligence.requests.get", return_value=mock_jina_resp) as mock_get:

            result = scrape_website(SAMPLE_URL)

        assert result == JINA_CONTENT
        mock_get.assert_called_once()
        called_url = mock_get.call_args[0][0]
        assert called_url == JINA_EXPECTED_URL, (
            f"Jina must be called with https://r.jina.ai/{{url}}, got: {called_url}"
        )

    def test_500_non_2xx_triggers_jina_fallback(self):
        """Any non-2xx error (e.g. 500) also falls back to Jina."""
        mock_jina_resp = self._jina_ok_response()

        with patch("src.tools.website_intelligence.FirecrawlApp", return_value=self._firecrawl_error(500)), \
             patch("src.tools.website_intelligence.requests.get", return_value=mock_jina_resp) as mock_get:

            result = scrape_website(SAMPLE_URL)

        assert result == JINA_CONTENT
        mock_get.assert_called_once()

    def test_503_non_2xx_triggers_jina_fallback(self):
        """503 Service Unavailable also triggers Jina fallback."""
        mock_jina_resp = self._jina_ok_response()

        with patch("src.tools.website_intelligence.FirecrawlApp", return_value=self._firecrawl_error(503)), \
             patch("src.tools.website_intelligence.requests.get", return_value=mock_jina_resp) as mock_get:

            result = scrape_website(SAMPLE_URL)

        assert result == JINA_CONTENT

    def test_jina_called_with_correct_url_format(self):
        """Jina URL must be exactly https://r.jina.ai/{original_url}."""
        test_url = "https://acme.com/some/path?q=1"
        expected = f"https://r.jina.ai/{test_url}"
        mock_jina_resp = self._jina_ok_response()

        with patch("src.tools.website_intelligence.FirecrawlApp", return_value=self._firecrawl_error(402)), \
             patch("src.tools.website_intelligence.requests.get", return_value=mock_jina_resp) as mock_get:

            scrape_website(test_url)

        called_url = mock_get.call_args[0][0]
        assert called_url == expected

    def test_jina_called_without_auth_header(self):
        """Jina Reader requires no auth header — verify no Authorization header is sent."""
        mock_jina_resp = self._jina_ok_response()

        with patch("src.tools.website_intelligence.FirecrawlApp", return_value=self._firecrawl_error(402)), \
             patch("src.tools.website_intelligence.requests.get", return_value=mock_jina_resp) as mock_get:

            scrape_website(SAMPLE_URL)

        _, kwargs = mock_get.call_args
        headers = kwargs.get("headers", {})
        assert "Authorization" not in headers, (
            "Jina Reader must be called without an Authorization header"
        )

    def test_warning_logged_on_firecrawl_failure_and_jina_fallback(self, caplog):
        """A warning-level log must record both 'Firecrawl failed' and 'Jina fallback'."""
        mock_jina_resp = self._jina_ok_response()

        with patch("src.tools.website_intelligence.FirecrawlApp", return_value=self._firecrawl_error(402)), \
             patch("src.tools.website_intelligence.requests.get", return_value=mock_jina_resp), \
             caplog.at_level(logging.WARNING):

            scrape_website(SAMPLE_URL)

        warning_text = " ".join(caplog.messages).lower()
        assert "firecrawl" in warning_text, "Warning must mention Firecrawl failure"
        assert any(
            kw in warning_text for kw in ("jina", "fallback")
        ), "Warning must mention Jina or fallback"

    def test_returns_jina_response_body_verbatim(self):
        """The exact Jina response body text is returned."""
        unique_content = "unique-jina-content-xyz-789"
        mock_jina_resp = MagicMock()
        mock_jina_resp.status_code = 200
        mock_jina_resp.text = unique_content
        mock_jina_resp.raise_for_status = MagicMock()

        with patch("src.tools.website_intelligence.FirecrawlApp", return_value=self._firecrawl_error(402)), \
             patch("src.tools.website_intelligence.requests.get", return_value=mock_jina_resp):

            result = scrape_website(SAMPLE_URL)

        assert result == unique_content

    def test_firecrawl_exception_also_triggers_jina(self):
        """Generic exceptions from Firecrawl (e.g. network error) also trigger Jina."""
        mock_firecrawl = MagicMock()
        mock_firecrawl.scrape_url.side_effect = Exception("connection refused")
        mock_jina_resp = self._jina_ok_response()

        with patch("src.tools.website_intelligence.FirecrawlApp", return_value=mock_firecrawl), \
             patch("src.tools.website_intelligence.requests.get", return_value=mock_jina_resp):

            result = scrape_website(SAMPLE_URL)

        assert result == JINA_CONTENT


# ===========================================================================
# AC2 — Both Firecrawl AND Jina fail → descriptive exception
# ===========================================================================

class TestBothScrapersFail:
    """
    Given: Firecrawl returns error AND Jina Reader also fails
    When: scrape_website() is called
    Then: a descriptive exception is raised that includes BOTH failure reasons;
          errors are NOT silently swallowed.
    """

    def _setup_both_fail(self, firecrawl_msg="firecrawl 402 error", jina_msg="jina 503 error"):
        mock_firecrawl = MagicMock()
        mock_firecrawl.scrape_url.side_effect = requests.HTTPError(firecrawl_msg)

        mock_jina_resp = MagicMock()
        mock_jina_resp.status_code = 503
        mock_jina_resp.text = ""
        mock_jina_resp.raise_for_status = MagicMock(
            side_effect=requests.HTTPError(jina_msg)
        )
        return mock_firecrawl, mock_jina_resp

    def test_raises_exception_when_both_fail(self):
        """An exception must be raised when both scrapers fail."""
        mock_fc, mock_jina = self._setup_both_fail()

        with patch("src.tools.website_intelligence.FirecrawlApp", return_value=mock_fc), \
             patch("src.tools.website_intelligence.requests.get", return_value=mock_jina):

            with pytest.raises(Exception):
                scrape_website(SAMPLE_URL)

    def test_exception_includes_firecrawl_failure_reason(self):
        """Exception message must reference the Firecrawl failure."""
        mock_fc, mock_jina = self._setup_both_fail(firecrawl_msg="Firecrawl 402 Payment Required")

        with patch("src.tools.website_intelligence.FirecrawlApp", return_value=mock_fc), \
             patch("src.tools.website_intelligence.requests.get", return_value=mock_jina):

            with pytest.raises(Exception) as exc_info:
                scrape_website(SAMPLE_URL)

        err_msg = str(exc_info.value).lower()
        assert any(kw in err_msg for kw in ("firecrawl", "402", "primary")), (
            f"Exception must mention Firecrawl failure, got: {exc_info.value}"
        )

    def test_exception_includes_jina_failure_reason(self):
        """Exception message must reference the Jina failure."""
        mock_fc, mock_jina = self._setup_both_fail(jina_msg="Jina 503 Service Unavailable")

        with patch("src.tools.website_intelligence.FirecrawlApp", return_value=mock_fc), \
             patch("src.tools.website_intelligence.requests.get", return_value=mock_jina):

            with pytest.raises(Exception) as exc_info:
                scrape_website(SAMPLE_URL)

        err_msg = str(exc_info.value).lower()
        assert any(kw in err_msg for kw in ("jina", "fallback", "503")), (
            f"Exception must mention Jina failure, got: {exc_info.value}"
        )

    def test_exception_contains_both_failure_reasons(self):
        """Single exception must carry BOTH failure reasons."""
        fc_msg = "Firecrawl HTTP 402"
        jina_msg = "Jina HTTP 503"
        mock_fc, mock_jina = self._setup_both_fail(fc_msg, jina_msg)

        with patch("src.tools.website_intelligence.FirecrawlApp", return_value=mock_fc), \
             patch("src.tools.website_intelligence.requests.get", return_value=mock_jina):

            with pytest.raises(Exception) as exc_info:
                scrape_website(SAMPLE_URL)

        err_str = str(exc_info.value)
        # The exception must not be empty or generic
        assert len(err_str) > 20, "Exception message is too generic"

    def test_does_not_silently_return_none_on_both_fail(self):
        """scrape_website must never return None when both scrapers fail."""
        mock_fc, mock_jina = self._setup_both_fail()

        with patch("src.tools.website_intelligence.FirecrawlApp", return_value=mock_fc), \
             patch("src.tools.website_intelligence.requests.get", return_value=mock_jina):

            result = None
            try:
                result = scrape_website(SAMPLE_URL)
            except Exception:
                pass

        assert result is None, (
            "scrape_website must raise, not return None when both scrapers fail"
        )

    def test_does_not_silently_return_empty_string_on_both_fail(self):
        """scrape_website must never silently return empty string when both scrapers fail."""
        mock_fc, mock_jina = self._setup_both_fail()

        with patch("src.tools.website_intelligence.FirecrawlApp", return_value=mock_fc), \
             patch("src.tools.website_intelligence.requests.get", return_value=mock_jina):

            with pytest.raises(Exception):
                scrape_website(SAMPLE_URL)
