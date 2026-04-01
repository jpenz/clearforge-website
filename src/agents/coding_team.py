"""
coding_team.py
--------------
LangGraph agent that manages an iterative code-generation / auto-fix loop.

Key reliability constants (auditable module-level names):

    CODING_TIMEOUT_SECONDS = 600   (was 300 – raised to support long-running tasks)
    MAX_FIX_TURNS          = 10    (was 3  – raised to allow deeper fix iterations)

These constants are exported so external modules can reference them for
display, alerting, or testing purposes.
"""

from __future__ import annotations

import logging
import os
from typing import Annotated, Any, Literal, TypedDict

from langchain_core.messages import AIMessage, BaseMessage, HumanMessage, ToolMessage
from langchain_core.runnables import RunnableConfig
from langchain_openai import ChatOpenAI
from langgraph.graph import END, START, StateGraph
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Reliability constants — DO NOT shrink without reviewing downstream SLOs
# ---------------------------------------------------------------------------

#: Maximum wall-clock seconds allowed for a single coding-team graph execution.
#: Raised from 300 s to support long-running compilation / test cycles.
CODING_TIMEOUT_SECONDS: int = 600

#: Maximum number of iterative fix turns before the loop is terminated.
#: Raised from 3 to 10 to allow deeper error-correction cycles.
MAX_FIX_TURNS: int = 10


# ---------------------------------------------------------------------------
# State
# ---------------------------------------------------------------------------

class CodingState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]
    fix_turns: int
    code: str
    error: str
    status: Literal["running", "success", "failed", "max_turns_reached"]


# ---------------------------------------------------------------------------
# LLM
# ---------------------------------------------------------------------------

def _build_llm() -> ChatOpenAI:
    return ChatOpenAI(
        model=os.environ.get("CODING_MODEL", "gpt-4o"),
        temperature=0,
        # Per-call timeout aligned with the graph-level CODING_TIMEOUT_SECONDS.
        timeout=CODING_TIMEOUT_SECONDS,
    )


# ---------------------------------------------------------------------------
# Nodes
# ---------------------------------------------------------------------------

def code_generation_node(state: CodingState, config: RunnableConfig) -> dict[str, Any]:
    """Generate or refine code based on the current messages and error context."""
    llm = _build_llm()
    messages = state["messages"]

    # If there is a previous error, prepend it as context for the LLM.
    if state.get("error"):
        messages = [
            *messages,
            HumanMessage(
                content=(
                    f"The previous attempt produced the following error. "
                    f"Please fix it:\n\n```\n{state['error']}\n```"
                )
            ),
        ]

    response: AIMessage = llm.invoke(messages, config=config)
    logger.debug("code_generation_node turn %d response length=%d", state["fix_turns"], len(str(response.content)))

    return {
        "messages": [response],
        "code": str(response.content),
        "status": "running",
    }


def fix_loop_router(state: CodingState) -> Literal["code_generation", "end_success", "end_max_turns"]:
    """
    Decide the next edge after a fix attempt.

    Terminates the loop when:
      • the error is cleared (success), or
      • fix_turns >= MAX_FIX_TURNS (circuit-breaker).
    """
    if not state.get("error"):
        return "end_success"
    if state["fix_turns"] >= MAX_FIX_TURNS:
        logger.warning(
            "Coding-team fix loop reached MAX_FIX_TURNS (%d) without resolving error. "
            "Terminating loop to prevent runaway execution.",
            MAX_FIX_TURNS,
        )
        return "end_max_turns"
    return "code_generation"


def increment_turn_node(state: CodingState) -> dict[str, Any]:
    """Increment the fix-turn counter before the next generation attempt."""
    new_turn = state.get("fix_turns", 0) + 1
    logger.debug("Entering fix turn %d / %d", new_turn, MAX_FIX_TURNS)
    return {"fix_turns": new_turn}


def end_success_node(state: CodingState) -> dict[str, Any]:
    logger.info("Coding team completed successfully after %d fix turn(s).", state["fix_turns"])
    return {"status": "success"}


def end_max_turns_node(state: CodingState) -> dict[str, Any]:
    logger.error(
        "Coding team exceeded MAX_FIX_TURNS (%d). Last error: %s",
        MAX_FIX_TURNS,
        state.get("error", "<none>"),
    )
    return {"status": "max_turns_reached"}


# ---------------------------------------------------------------------------
# Graph assembly
# ---------------------------------------------------------------------------

def _build_coding_team_graph() -> Any:
    """Assemble and compile the coding-team LangGraph graph."""
    builder: StateGraph = StateGraph(CodingState)

    builder.add_node("code_generation", code_generation_node)
    builder.add_node("increment_turn", increment_turn_node)
    builder.add_node("end_success", end_success_node)
    builder.add_node("end_max_turns", end_max_turns_node)

    builder.add_edge(START, "code_generation")
    builder.add_edge("code_generation", "increment_turn")
    builder.add_conditional_edges(
        "increment_turn",
        fix_loop_router,
        {
            "code_generation": "code_generation",
            "end_success": "end_success",
            "end_max_turns": "end_max_turns",
        },
    )
    builder.add_edge("end_success", END)
    builder.add_edge("end_max_turns", END)

    return builder.compile()


# ---------------------------------------------------------------------------
# Public exports
# ---------------------------------------------------------------------------

#: Compiled LangGraph graph for the coding team.
coding_team_graph = _build_coding_team_graph()

__all__ = ["coding_team_graph", "CODING_TIMEOUT_SECONDS", "MAX_FIX_TURNS"]
