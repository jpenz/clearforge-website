"""
website_intelligence.py
-----------------------
Scraping utility with a two-level fallback strategy:

  1. Primary  – Firecrawl (authenticated, high-fidelity)
  2. Fallback – Jina Reader  https://r.jina.ai/{url}  (unauthenticated GET)

Behaviour:
  • Firecrawl success  → return Firecrawl result; Jina is never called.
  • Firecrawl non-2xx / HTTP 402 → warn, attempt Jina Reader.
  • Both fail          → raise ScrapingError with both failure reasons included
                         in the message (errors are never silently swallowed).
"""

from __future__ import annotations

import logging
import os
from typing import Optional
from urllib.parse import quote_plus

import requests
from firecrawl import FirecrawlApp  # type: ignore[import-untyped]

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Custom exception
# ---------------------------------------------------------------------------

class ScrapingError(RuntimeError):
    """Raised when both Firecrawl and the Jina Reader fallback fail."""


# ---------------------------------------------------------------------------
# Jina Reader helper
# ---------------------------------------------------------------------------

_JINA_BASE_URL = "https://r.jina.ai/"
_JINA_TIMEOUT_SECONDS = 30


def _scrape_via_jina(url: str) -> str:
    """
    Fetch *url* through Jina Reader (https://r.jina.ai/{url}).

    No authentication header is required.  Returns the response body as a
    plain string.  Raises ``requests.HTTPError`` on non-2xx responses.
    """
    jina_url = f"{_JINA_BASE_URL}{url}"
    logger.debug("Jina Reader request: %s", jina_url)
    response = requests.get(jina_url, timeout=_JINA_TIMEOUT_SECONDS)
    response.raise_for_status()
    return response.text


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def scrape_website(url: str, *, formats: Optional[list[str]] = None) -> str:
    """
    Scrape *url* and return its content as a string.

    Parameters
    ----------
    url:
        The target URL to scrape.
    formats:
        Optional list of Firecrawl output formats (e.g. ``["markdown"]``).
        Defaults to ``["markdown"]`` when not provided.

    Returns
    -------
    str
        Page content returned by the first successful scraper.

    Raises
    ------
    ScrapingError
        When both Firecrawl and Jina Reader fail; the exception message
        contains both failure reasons.
    """
    if formats is None:
        formats = ["markdown"]

    api_key: str = os.environ.get("FIRECRAWL_API_KEY", "")
    app = FirecrawlApp(api_key=api_key)

    firecrawl_error: Optional[str] = None

    # -----------------------------------------------------------------------
    # 1. Attempt Firecrawl (primary)
    # -----------------------------------------------------------------------
    try:
        result = app.scrape_url(url, params={"formats": formats})

        # The SDK raises on HTTP errors but check the response object too.
        # Some SDK versions surface errors in result["error"] rather than
        # raising; treat that case as a failure so we fall through to Jina.
        if isinstance(result, dict) and result.get("error"):
            firecrawl_error = f"Firecrawl API error: {result['error']}"
            raise RuntimeError(firecrawl_error)

        # Success – return content without ever touching Jina.
        content: str = (
            result.get("markdown")
            or result.get("content")
            or result.get("html")
            or str(result)
        )
        logger.debug("Firecrawl succeeded for %s (%d chars)", url, len(content))
        return content

    except requests.HTTPError as exc:
        status = exc.response.status_code if exc.response is not None else "unknown"
        firecrawl_error = f"Firecrawl HTTP {status}: {exc}"
        logger.warning(
            "Firecrawl failed for %s (HTTP %s) – falling back to Jina Reader",
            url,
            status,
        )
    except Exception as exc:  # noqa: BLE001
        firecrawl_error = f"Firecrawl exception: {exc}"
        logger.warning(
            "Firecrawl failed for %s (%s) – falling back to Jina Reader",
            url,
            exc,
        )

    # -----------------------------------------------------------------------
    # 2. Attempt Jina Reader (fallback)
    # -----------------------------------------------------------------------
    try:
        content = _scrape_via_jina(url)
        logger.warning(
            "Firecrawl failed (%s); Jina Reader fallback succeeded for %s",
            firecrawl_error,
            url,
        )
        return content

    except Exception as jina_exc:  # noqa: BLE001
        jina_error = f"Jina Reader exception: {jina_exc}"
        raise ScrapingError(
            f"Both scrapers failed for {url!r}.\n"
            f"  Primary  (Firecrawl): {firecrawl_error}\n"
            f"  Fallback (Jina):      {jina_error}"
        ) from jina_exc
