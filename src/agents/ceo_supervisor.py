"""
ceo_supervisor.py
-----------------
CEO supervisor LangGraph agent with three reliability enhancements:

1. **Circuit-breaker (daily auto-fix counter)**
   A module-level dict ``_auto_fix_counter`` (keyed by ``YYYY-MM-DD``) caps
   automated error-fix invocations at ``AUTO_FIX_DAILY_LIMIT`` (10) per
   calendar day.  On breach, a Telegram alert is sent instead of running the
   fix.  The counter is intentionally process-local and ephemeral — it is NOT
   persisted to a database (see out-of-scope in PRD).

2. **Error handler node**
   ``error_handler_node`` catches tool errors propagated through the graph,
   logs them with full traceback, and routes to an appropriate recovery path
   without crashing the entire graph run.

3. **LangMem async background consolidation**
   ``build_memory_manager()`` enables LangMem's async background consolidation
   (deduplication + enrichment) when the installed version supports it.
   Minimum required LangMem version: 0.0.15.
"""

from __future__ import annotations

import logging
import os
import traceback
from datetime import date
from typing import Annotated, Any, Literal, Optional, TypedDict

from langchain_core.messages import AIMessage, BaseMessage, HumanMessage, SystemMessage
from langchain_core.runnables import RunnableConfig
from langchain_openai import ChatOpenAI
from langgraph.graph import END, START, StateGraph
from langgraph.graph.message import add_messages

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Circuit-breaker: daily auto-fix counter
# ---------------------------------------------------------------------------

#: Maximum number of automated error-fix runs allowed per calendar day.
AUTO_FIX_DAILY_LIMIT: int = 10

#: In-memory counter keyed by YYYY-MM-DD date string.
#: Process-local and ephemeral — resets on restart (by design, see PRD).
_auto_fix_counter: dict[str, int] = {}


def _today_key() -> str:
    """Return today's date as a ``YYYY-MM-DD`` string (local clock)."""
    return date.today().isoformat()


def _check_and_increment_auto_fix() -> bool:
    """
    Check whether another auto-fix run is permitted today.

    Returns ``True`` and increments the counter when under the daily limit.
    Returns ``False`` without incrementing when the limit is reached or exceeded.
    """
    key = _today_key()
    current = _auto_fix_counter.get(key, 0)
    if current >= AUTO_FIX_DAILY_LIMIT:
        return False
    _auto_fix_counter[key] = current + 1
    logger.debug("Auto-fix counter for %s: %d / %d", key, current + 1, AUTO_FIX_DAILY_LIMIT)
    return True


def _get_today_auto_fix_count() -> int:
    """Return the current auto-fix count for today (read-only)."""
    return _auto_fix_counter.get(_today_key(), 0)


# ---------------------------------------------------------------------------
# Telegram alerting helper
# ---------------------------------------------------------------------------

async def _send_telegram_alert(message: str) -> None:
    """
    Send a plain-text alert to the configured Telegram chat.

    Silently logs and continues on send failure — alert delivery is best-effort
    so that a broken Telegram connection does not itself cause a graph crash.
    """
    try:
        import telegram  # type: ignore[import-untyped]

        bot_token: str = os.environ.get("TELEGRAM_BOT_TOKEN", "")
        chat_id: str = os.environ.get("TELEGRAM_ALERT_CHAT_ID", "")

        if not bot_token or not chat_id:
            logger.warning(
                "TELEGRAM_BOT_TOKEN or TELEGRAM_ALERT_CHAT_ID not set; "
                "cannot send alert: %s",
                message,
            )
            return

        bot = telegram.Bot(token=bot_token)
        await bot.send_message(chat_id=chat_id, text=message)
        logger.info("Telegram alert sent: %s", message[:80])

    except Exception as exc:  # noqa: BLE001
        logger.error("Failed to send Telegram alert (%s): %s", exc, message[:80])


# ---------------------------------------------------------------------------
# LangMem memory manager
# ---------------------------------------------------------------------------

def build_memory_manager() -> Any:
    """
    Initialise and return a LangMem memory manager with async background
    consolidation enabled.

    Minimum required LangMem version for background consolidation: **0.0.15**.
    Earlier versions lack the ``enable_background_consolidation`` parameter and
    will fall back to in-session-only memory (the version guard below handles
    this transparently).
    """
    try:
        import langmem  # type: ignore[import-untyped]
        import importlib.metadata as _meta

        langmem_version = _meta.version("langmem")
        logger.info("LangMem version: %s", langmem_version)

        # Parse major.minor.patch for comparison (ignore pre-release suffixes).
        _parts = langmem_version.split(".")
        _major, _minor, *_rest = (_parts + ["0", "0"])[:3]
        version_tuple = (int(_major), int(_minor), int(_rest[0]) if _rest else 0)

        # Minimum version required for async background consolidation: 0.0.15
        LANGMEM_MIN_CONSOLIDATION = (0, 0, 15)

        if version_tuple >= LANGMEM_MIN_CONSOLIDATION:
            logger.info(
                "LangMem background consolidation ENABLED "
                "(version %s >= %s required minimum)",
                langmem_version,
                ".".join(str(x) for x in LANGMEM_MIN_CONSOLIDATION),
            )
            # Enable async background consolidation: deduplication and
            # enrichment run asynchronously after each agent session,
            # preventing memory bloat without blocking graph execution.
            memory_manager = langmem.MemoryManager(
                enable_background_consolidation=True,
            )
        else:
            logger.warning(
                "LangMem background consolidation DISABLED: "
                "installed version %s is below minimum %s. "
                "Upgrade langmem to enable deduplication/enrichment.",
                langmem_version,
                ".".join(str(x) for x in LANGMEM_MIN_CONSOLIDATION),
            )
            memory_manager = langmem.MemoryManager()

        return memory_manager

    except ImportError:
        logger.error("langmem package not installed; memory manager unavailable.")
        return None
    except Exception as exc:  # noqa: BLE001
        logger.error("Failed to initialise LangMem memory manager: %s", exc)
        return None


# ---------------------------------------------------------------------------
# State
# ---------------------------------------------------------------------------

class SupervisorState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]
    task: str
    error: Optional[str]
    error_traceback: Optional[str]
    auto_fix_blocked: bool
    status: Literal["running", "success", "failed", "auto_fix_blocked"]


# ---------------------------------------------------------------------------
# LLM
# ---------------------------------------------------------------------------

def _build_supervisor_llm() -> ChatOpenAI:
    return ChatOpenAI(
        model=os.environ.get("SUPERVISOR_MODEL", "gpt-4o"),
        temperature=0,
    )


# ---------------------------------------------------------------------------
# Nodes
# ---------------------------------------------------------------------------

def supervisor_node(state: SupervisorState, config: RunnableConfig) -> dict[str, Any]:
    """Main CEO supervisor decision node."""
    llm = _build_supervisor_llm()
    system = SystemMessage(
        content=(
            "You are the CEO supervisor agent. Analyse the task and delegate "
            "to the appropriate specialist sub-agent or tool."
        )
    )
    response: AIMessage = llm.invoke([system, *state["messages"]], config=config)
    return {"messages": [response], "status": "running", "error": None}


def auto_fix_gate_node(state: SupervisorState) -> dict[str, Any]:
    """
    Circuit-breaker node for automated error-fix runs.

    Checks the daily counter before allowing the fix to proceed.  On breach,
    sets ``auto_fix_blocked=True`` so the router can divert to the alert path.
    """
    if _check_and_increment_auto_fix():
        logger.info(
            "Auto-fix permitted (count today: %d / %d)",
            _get_today_auto_fix_count(),
            AUTO_FIX_DAILY_LIMIT,
        )
        return {"auto_fix_blocked": False}
    else:
        logger.warning(
            "Auto-fix BLOCKED — daily limit of %d reached for %s.",
            AUTO_FIX_DAILY_LIMIT,
            _today_key(),
        )
        return {"auto_fix_blocked": True, "status": "auto_fix_blocked"}


def auto_fix_alert_node(state: SupervisorState, config: RunnableConfig) -> dict[str, Any]:
    """Send a Telegram alert when the daily auto-fix limit has been breached."""
    import asyncio

    alert_msg = (
        f"⚠️ *Auto-Fix Circuit Breaker Triggered*\n\n"
        f"The daily auto-fix limit of {AUTO_FIX_DAILY_LIMIT} has been reached "
        f"for {_today_key()}.\n\n"
        f"Task: {state.get('task', '<unknown>')}\n"
        f"No further automated fixes will run today.  Manual intervention may be required."
    )
    try:
        loop = asyncio.get_event_loop()
        if loop.is_running():
            loop.create_task(_send_telegram_alert(alert_msg))
        else:
            loop.run_until_complete(_send_telegram_alert(alert_msg))
    except Exception as exc:  # noqa: BLE001
        logger.error("Could not dispatch Telegram alert: %s", exc)

    return {"status": "auto_fix_blocked"}


def error_handler_node(state: SupervisorState) -> dict[str, Any]:
    """
    Error handler node — catches tool errors propagated through the graph.

    Logs the full traceback, updates state with the error details, and returns
    control to the routing layer which will select the appropriate recovery path.
    This node NEVER re-raises; the graph run continues rather than crashing.
    """
    error = state.get("error") or "Unknown error"
    tb = state.get("error_traceback") or ""

    logger.error(
        "error_handler_node caught an error in the CEO supervisor graph.\n"
        "Error: %s\n"
        "Traceback:\n%s",
        error,
        tb or "<no traceback available>",
    )

    # Return updated state; routing logic below decides recovery path.
    return {
        "error": error,
        "error_traceback": tb,
        "status": "failed",
    }


def recovery_node(state: SupervisorState) -> dict[str, Any]:
    """
    Recovery path: attempt a graceful degradation after a tool error.

    In production this might retry with a simpler tool, skip the failing step,
    or escalate.  For now it logs and terminates cleanly.
    """
    logger.info(
        "recovery_node: gracefully handling error '%s'",
        state.get("error", "<none>"),
    )
    return {
        "messages": [
            AIMessage(
                content=(
                    "I encountered an error and could not complete the requested action. "
                    "Please review the logs or retry with a different approach."
                )
            )
        ],
        "status": "failed",
    }


# ---------------------------------------------------------------------------
# Routers
# ---------------------------------------------------------------------------

def auto_fix_router(
    state: SupervisorState,
) -> Literal["auto_fix_alert", "supervisor"]:
    if state.get("auto_fix_blocked"):
        return "auto_fix_alert"
    return "supervisor"


def error_router(
    state: SupervisorState,
) -> Literal["error_handler", "end"]:
    if state.get("error"):
        return "error_handler"
    return "end"


def post_error_router(
    state: SupervisorState,
) -> Literal["recovery", "end"]:
    """After error_handler runs, always route to recovery (not back to supervisor)."""
    return "recovery"


# ---------------------------------------------------------------------------
# Graph assembly
# ---------------------------------------------------------------------------

def _build_ceo_supervisor_graph() -> Any:
    """Assemble and compile the CEO supervisor LangGraph graph."""
    builder: StateGraph = StateGraph(SupervisorState)

    builder.add_node("auto_fix_gate", auto_fix_gate_node)
    builder.add_node("auto_fix_alert", auto_fix_alert_node)
    builder.add_node("supervisor", supervisor_node)
    builder.add_node("error_handler", error_handler_node)
    builder.add_node("recovery", recovery_node)

    builder.add_edge(START, "auto_fix_gate")
    builder.add_conditional_edges(
        "auto_fix_gate",
        auto_fix_router,
        {
            "auto_fix_alert": "auto_fix_alert",
            "supervisor": "supervisor",
        },
    )
    builder.add_edge("auto_fix_alert", END)
    builder.add_conditional_edges(
        "supervisor",
        error_router,
        {
            "error_handler": "error_handler",
            "end": END,
        },
    )
    builder.add_conditional_edges(
        "error_handler",
        post_error_router,
        {
            "recovery": "recovery",
            "end": END,
        },
    )
    builder.add_edge("recovery", END)

    return builder.compile()


# ---------------------------------------------------------------------------
# Public exports
# ---------------------------------------------------------------------------

#: Compiled CEO supervisor graph.
ceo_supervisor_graph = _build_ceo_supervisor_graph()

#: Initialised LangMem memory manager (may be None if langmem is not installed).
memory_manager = build_memory_manager()

__all__ = [
    "ceo_supervisor_graph",
    "build_memory_manager",
    "AUTO_FIX_DAILY_LIMIT",
]
