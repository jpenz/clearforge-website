"""
bot.py
------
Telegram bot handler with real-time LangGraph token streaming.

Streaming behaviour:
  • Uses ``stream_mode=['messages', 'custom']`` so both incremental tokens
    and custom event payloads are delivered.
  • Accumulated tokens are flushed to the Telegram message at most every
    ``STREAM_EDIT_INTERVAL_SECONDS`` (1.5 s) to stay well within Telegram's
    edit-rate limit (~1 edit/message/second).
  • When a **custom tool-call event** arrives (``event_type == 'tool_call'``)
    the Telegram message is immediately updated with a status line such as
    ``🔧 Calling search_leads...`` — bypassing the 1.5 s throttle so the user
    gets instant feedback before the tool result arrives.
"""

from __future__ import annotations

import asyncio
import logging
import os
import time
from typing import Any, Optional

from telegram import Update
from telegram.constants import ParseMode
from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes,
    MessageHandler,
    filters,
)

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

#: Minimum interval between Telegram message edits (seconds).
#: Provides ~33% headroom above Telegram's ~1 edit/s per-message limit.
STREAM_EDIT_INTERVAL_SECONDS: float = 1.5

#: Placeholder text shown while the first tokens arrive.
_THINKING_PLACEHOLDER = "⏳ Thinking…"

#: Maximum characters per Telegram message (hard cap is 4096).
_MAX_MESSAGE_LENGTH = 4000


# ---------------------------------------------------------------------------
# Streaming helper
# ---------------------------------------------------------------------------

async def _stream_graph_to_telegram(
    graph: Any,
    initial_messages: list[Any],
    update: Update,
    context: ContextTypes.DEFAULT_TYPE,
) -> str:
    """
    Invoke *graph* with streaming and progressively edit the Telegram message.

    Parameters
    ----------
    graph:
        A compiled LangGraph graph that supports ``astream``.
    initial_messages:
        The input messages to pass as the graph's initial state.
    update:
        The Telegram ``Update`` object for the originating message.
    context:
        The Telegram ``ContextTypes.DEFAULT_TYPE`` handler context.

    Returns
    -------
    str
        The final accumulated text that was sent to the user.
    """
    chat_id: int = update.effective_chat.id  # type: ignore[union-attr]

    # Send an initial placeholder message that we will edit with streamed tokens.
    sent_message = await context.bot.send_message(
        chat_id=chat_id,
        text=_THINKING_PLACEHOLDER,
    )
    message_id: int = sent_message.message_id

    accumulated_text: str = ""
    last_edit_time: float = 0.0

    async def _flush_edit(text: str, force: bool = False) -> None:
        """Edit the Telegram message with *text*, respecting the throttle unless *force* is True."""
        nonlocal last_edit_time
        now = time.monotonic()
        if not force and (now - last_edit_time) < STREAM_EDIT_INTERVAL_SECONDS:
            return
        # Truncate to Telegram's character limit.
        display_text = text[-_MAX_MESSAGE_LENGTH:] if len(text) > _MAX_MESSAGE_LENGTH else text
        if not display_text:
            return
        try:
            await context.bot.edit_message_text(
                chat_id=chat_id,
                message_id=message_id,
                text=display_text,
            )
            last_edit_time = time.monotonic()
        except Exception as exc:  # noqa: BLE001
            # 429 rate-limit or "message is not modified" — log and continue.
            logger.debug("edit_message_text skipped: %s", exc)

    # -----------------------------------------------------------------------
    # Stream the graph output
    # -----------------------------------------------------------------------
    input_state = {"messages": initial_messages}

    async for stream_chunk in graph.astream(
        input_state,
        stream_mode=["messages", "custom"],
    ):
        # LangGraph yields (mode, payload) tuples when multiple stream_modes
        # are requested.
        if isinstance(stream_chunk, tuple):
            mode, payload = stream_chunk
        else:
            # Single-mode fallback (shouldn't happen with the list form, but
            # be defensive).
            mode = "messages"
            payload = stream_chunk

        if mode == "messages":
            # ``payload`` is a (message_chunk, metadata) tuple in langgraph ≥0.2.
            if isinstance(payload, tuple):
                message_chunk, _meta = payload
            else:
                message_chunk = payload

            # Extract token text.
            token: str = ""
            if hasattr(message_chunk, "content"):
                content = message_chunk.content
                if isinstance(content, str):
                    token = content
                elif isinstance(content, list):
                    # Content blocks (tool-use format).
                    for block in content:
                        if isinstance(block, dict) and block.get("type") == "text":
                            token += block.get("text", "")

            if token:
                accumulated_text += token
                await _flush_edit(accumulated_text)

        elif mode == "custom":
            # Custom events are emitted by the graph for tool calls and other
            # structured signals.  Expected shape: {"type": "tool_call", "name": "..."}
            event_type: str = payload.get("type", "") if isinstance(payload, dict) else ""
            tool_name: str = payload.get("name", "") if isinstance(payload, dict) else ""

            if event_type == "tool_call" and tool_name:
                # Immediately update the message with a tool-call status line.
                # This bypasses the 1.5 s throttle (force=True) so the user
                # sees instant feedback before the tool result arrives.
                status_line = f"\n\n🔧 Calling {tool_name}…"
                display = accumulated_text + status_line
                await _flush_edit(display, force=True)
                logger.debug("Tool-call status sent: %s", tool_name)

    # Final flush to ensure the last tokens are visible.
    if accumulated_text:
        await _flush_edit(accumulated_text, force=True)

    return accumulated_text


# ---------------------------------------------------------------------------
# Bot handler class
# ---------------------------------------------------------------------------

class TelegramBotHandler:
    """
    Wraps the python-telegram-bot Application with LangGraph streaming support.
    """

    def __init__(self, graph: Any) -> None:
        """
        Parameters
        ----------
        graph:
            A compiled LangGraph graph (e.g. ``ceo_supervisor_graph``) that
            accepts ``{"messages": [...]}`` as initial state and supports
            ``astream`` with ``stream_mode=['messages', 'custom']``.
        """
        self._graph = graph
        self._app: Optional[Application] = None  # type: ignore[type-arg]

    # ------------------------------------------------------------------
    # Command handlers
    # ------------------------------------------------------------------

    async def _start_command(
        self, update: Update, context: ContextTypes.DEFAULT_TYPE
    ) -> None:
        await update.message.reply_text(  # type: ignore[union-attr]
            "👋 Hello! I'm the AgentForge assistant. Send me a message to get started."
        )

    # ------------------------------------------------------------------
    # Message handler
    # ------------------------------------------------------------------

    async def _handle_message(
        self, update: Update, context: ContextTypes.DEFAULT_TYPE
    ) -> None:
        """Route an incoming Telegram message through the LangGraph agent with streaming."""
        user_text: str = update.message.text or ""  # type: ignore[union-attr]
        if not user_text.strip():
            return

        logger.info(
            "Received message from chat %s: %r",
            update.effective_chat.id,  # type: ignore[union-attr]
            user_text[:80],
        )

        from langchain_core.messages import HumanMessage

        initial_messages = [HumanMessage(content=user_text)]

        try:
            await _stream_graph_to_telegram(
                graph=self._graph,
                initial_messages=initial_messages,
                update=update,
                context=context,
            )
        except Exception as exc:
            logger.exception("Error streaming graph response: %s", exc)
            await context.bot.send_message(
                chat_id=update.effective_chat.id,  # type: ignore[union-attr]
                text="⚠️ An error occurred while processing your request. Please try again.",
            )

    # ------------------------------------------------------------------
    # Lifecycle
    # ------------------------------------------------------------------

    def build_application(self) -> Application:  # type: ignore[type-arg]
        """Build and return the configured telegram Application."""
        bot_token: str = os.environ.get("TELEGRAM_BOT_TOKEN", "")
        if not bot_token:
            raise ValueError("TELEGRAM_BOT_TOKEN environment variable is not set.")

        self._app = (
            Application.builder()
            .token(bot_token)
            .build()
        )

        self._app.add_handler(CommandHandler("start", self._start_command))
        self._app.add_handler(
            MessageHandler(filters.TEXT & ~filters.COMMAND, self._handle_message)
        )

        return self._app


# ---------------------------------------------------------------------------
# Public entry point
# ---------------------------------------------------------------------------

def start_bot(graph: Any) -> None:
    """
    Initialise and run the Telegram bot in polling mode.

    Parameters
    ----------
    graph:
        A compiled LangGraph graph to stream responses through.
    """
    handler = TelegramBotHandler(graph=graph)
    app = handler.build_application()
    logger.info("Starting Telegram bot (polling mode)…")
    app.run_polling(drop_pending_updates=True)


__all__ = ["TelegramBotHandler", "start_bot", "STREAM_EDIT_INTERVAL_SECONDS"]
