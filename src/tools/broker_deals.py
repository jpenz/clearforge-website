"""
broker_deals.py
---------------
BizBuySell broker-deal lookup tool.

Primary path  : Zylalabs BizBuySell API
Fallback path : Direct BizBuySell scraping (triggered on HTTP 404 only)

Behaviour:
  • Zylalabs 2xx  → return result unchanged; fallback scraper never invoked.
  • Zylalabs 404  → log warning (status + URL), transparently fall back to
                    direct BizBuySell scraping; 404 is never surfaced to the caller.
  • Other errors  → propagated normally (only 404 triggers the fallback).
"""

from __future__ import annotations

import logging
import os
from typing import Any
from urllib.parse import urlencode, urljoin

import requests
from bs4 import BeautifulSoup  # type: ignore[import-untyped]

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

_ZYLALABS_BASE_URL = "https://zylalabs.com/api/2176/bizbuysell+listings+api/2050/search+listings"
_BIZBUYSELL_BASE_URL = "https://www.bizbuysell.com"
_BIZBUYSELL_SEARCH_PATH = "/businesses-for-sale/"

_REQUEST_TIMEOUT = 30

# ---------------------------------------------------------------------------
# Fallback: direct BizBuySell scraping
# ---------------------------------------------------------------------------

_SCRAPER_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9",
}


def _scrape_bizbuysell_direct(query: str) -> list[dict[str, Any]]:
    """
    Scrape BizBuySell search results directly.

    Respects the site's HTML structure as of 2024; adjust selectors if the
    markup changes.  Returns a list of dicts with keys: title, price, url,
    location, description.
    """
    params = {"q": query}
    search_url = urljoin(_BIZBUYSELL_BASE_URL, _BIZBUYSELL_SEARCH_PATH) + "?" + urlencode(params)
    logger.debug("Direct BizBuySell scrape: %s", search_url)

    response = requests.get(search_url, headers=_SCRAPER_HEADERS, timeout=_REQUEST_TIMEOUT)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")
    deals: list[dict[str, Any]] = []

    # BizBuySell listing cards — selector as of mid-2024
    for card in soup.select("div.listing-card, div.result-snippet"):
        title_el = card.select_one("h2.title a, h3.title a, a.listing-title")
        price_el = card.select_one("span.price, div.asking-price")
        location_el = card.select_one("span.location, div.location")
        desc_el = card.select_one("p.description, div.description")

        if not title_el:
            continue

        href: str = title_el.get("href", "")  # type: ignore[assignment]
        full_url = urljoin(_BIZBUYSELL_BASE_URL, href) if href else ""

        deals.append(
            {
                "title": title_el.get_text(strip=True),
                "price": price_el.get_text(strip=True) if price_el else "",
                "location": location_el.get_text(strip=True) if location_el else "",
                "description": desc_el.get_text(strip=True) if desc_el else "",
                "url": full_url,
                "source": "bizbuysell_direct",
            }
        )

    logger.debug("Direct BizBuySell scrape returned %d listings", len(deals))
    return deals


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def get_broker_deals(query: str) -> list[dict[str, Any]]:
    """
    Retrieve broker deal listings for *query*.

    Tries the Zylalabs BizBuySell API first.  On HTTP 404 (endpoint not found
    or quota exhausted), transparently falls back to direct BizBuySell scraping.
    Any other HTTP error is re-raised so the caller can handle it.

    Parameters
    ----------
    query:
        Search term, e.g. ``"restaurant Dallas"`` or ``"manufacturing midwest"``.

    Returns
    -------
    list[dict[str, Any]]
        List of deal dicts.  Zylalabs responses are returned as-is; fallback
        responses use the schema: title, price, location, description, url, source.
    """
    api_key: str = os.environ.get("ZYLALABS_API_KEY", "")
    headers = {"Authorization": f"Bearer {api_key}"}
    params = {"keyword": query}

    zylalabs_url = f"{_ZYLALABS_BASE_URL}?{urlencode(params)}"

    try:
        response = requests.get(
            zylalabs_url,
            headers=headers,
            timeout=_REQUEST_TIMEOUT,
        )

        if response.status_code == 404:
            # Log the 404 with full context, then fall through to direct scraping.
            logger.warning(
                "Zylalabs BizBuySell API returned HTTP 404 for URL %s – "
                "falling back to direct BizBuySell scraping (query=%r)",
                zylalabs_url,
                query,
            )
            return _scrape_bizbuysell_direct(query)

        # For all other non-2xx responses, raise so the caller is aware.
        response.raise_for_status()

        data: Any = response.json()
        # Zylalabs wraps results differently across versions; normalise to list.
        if isinstance(data, list):
            return data  # type: ignore[return-value]
        if isinstance(data, dict):
            # Common shapes: {"results": [...]} or {"data": [...]}
            return data.get("results") or data.get("data") or [data]  # type: ignore[return-value]

        logger.warning("Unexpected Zylalabs response shape: %s", type(data))
        return []

    except requests.HTTPError:
        # Non-404 HTTP errors are re-raised; only 404 triggers the fallback.
        raise
