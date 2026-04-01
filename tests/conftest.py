"""
Shared pytest fixtures and configuration for AgentForge backend tests.
"""
import sys
import os
from pathlib import Path
from datetime import date
from unittest.mock import MagicMock, AsyncMock

import pytest

# Ensure the repo root is on sys.path so `from src.xxx import yyy` works.
REPO_ROOT = Path(__file__).parent.parent
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _make_mock_response(status_code: int = 200, text: str = "response body"):
    """Build a minimal requests.Response-like mock."""
    resp = MagicMock()
    resp.status_code = status_code
    resp.text = text
    resp.ok = (200 <= status_code < 300)
    resp.raise_for_status = MagicMock(
        side_effect=None if resp.ok else Exception(f"HTTP {status_code}")
    )
    return resp


# ---------------------------------------------------------------------------
# Fixtures
# ---------------------------------------------------------------------------

@pytest.fixture()
def success_response():
    """A mock HTTP response with status 200."""
    return _make_mock_response(200, "scraped content")


@pytest.fixture()
def firecrawl_402_response():
    """A mock HTTP 402 response (Firecrawl credit exhaustion)."""
    return _make_mock_response(402, "Payment Required")


@pytest.fixture()
def not_found_response():
    """A mock HTTP 404 response."""
    return _make_mock_response(404, "Not Found")


@pytest.fixture()
def jina_success_response():
    """A mock successful Jina Reader response."""
    return _make_mock_response(200, "jina scraped content")


@pytest.fixture(autouse=False)
def reset_auto_fix_counter():
    """
    Reset the in-memory auto-fix counter in ceo_supervisor before/after each test.
    Import the module lazily so tests that don't need ceo_supervisor can still run.
    """
    import importlib
    try:
        import src.agents.ceo_supervisor as supervisor
        today = date.today().strftime("%Y-%m-%d")
        # Save original value
        original = supervisor._auto_fix_counter.copy()
        supervisor._auto_fix_counter.clear()
        yield supervisor
        # Restore
        supervisor._auto_fix_counter.clear()
        supervisor._auto_fix_counter.update(original)
    except ImportError:
        yield None


@pytest.fixture()
def mock_telegram_bot():
    """A mock python-telegram-bot Application and Update objects."""
    bot = AsyncMock()
    bot.send_message = AsyncMock(return_value=MagicMock(message_id=42))
    bot.edit_message_text = AsyncMock()
    return bot


@pytest.fixture()
def mock_update():
    """A minimal mock Telegram Update object."""
    update = MagicMock()
    update.effective_chat.id = 12345
    update.effective_user.first_name = "TestUser"
    update.message.text = "Hello agent"
    update.message.reply_text = AsyncMock(
        return_value=MagicMock(message_id=100, chat_id=12345)
    )
    update.message.chat.id = 12345
    return update


@pytest.fixture()
def mock_context():
    """A minimal mock telegram CallbackContext."""
    ctx = MagicMock()
    ctx.bot = AsyncMock()
    ctx.bot.edit_message_text = AsyncMock()
    return ctx
