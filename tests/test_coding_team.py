"""
Tests for coding_team.py — timeout constant and max-turn-limit constant.

Acceptance criteria covered:
  AC4 – New timeout is 600 s; agent does NOT time out before 600 s (previously 300 s).
  AC5 – Turn limit is 10 (previously 3); loop permitted up to 10 turns before termination.
"""
import pytest

# ---------------------------------------------------------------------------
# Module under test
# ---------------------------------------------------------------------------
from src.agents.coding_team import CODING_TIMEOUT_SECONDS, MAX_FIX_TURNS


# ===========================================================================
# AC4 — Timeout is 600 seconds
# ===========================================================================

class TestCodingTeamTimeout:
    """
    Given: The coding team agent is executing a long-running task
    When: execution time approaches the old 300 s limit
    Then: the agent does NOT time out; the new timeout is 600 s.
    """

    def test_timeout_constant_is_600(self):
        """CODING_TIMEOUT_SECONDS must equal 600."""
        assert CODING_TIMEOUT_SECONDS == 600, (
            f"Expected CODING_TIMEOUT_SECONDS=600, got {CODING_TIMEOUT_SECONDS}"
        )

    def test_timeout_is_not_old_value_of_300(self):
        """Ensure the old 300 s limit has been replaced (not just doubled by coincidence)."""
        assert CODING_TIMEOUT_SECONDS != 300, (
            "CODING_TIMEOUT_SECONDS is still the old 300 s value; it should be 600 s"
        )

    def test_timeout_is_integer_or_numeric(self):
        """Timeout value must be numeric (int or float)."""
        assert isinstance(CODING_TIMEOUT_SECONDS, (int, float)), (
            f"CODING_TIMEOUT_SECONDS must be numeric, got {type(CODING_TIMEOUT_SECONDS)}"
        )

    def test_timeout_is_positive(self):
        """Timeout must be a positive value."""
        assert CODING_TIMEOUT_SECONDS > 0

    def test_timeout_is_exported_at_module_level(self):
        """CODING_TIMEOUT_SECONDS must be importable from src.agents.coding_team."""
        # This test passes by virtue of the import at the top succeeding.
        import src.agents.coding_team as mod
        assert hasattr(mod, "CODING_TIMEOUT_SECONDS")

    def test_timeout_is_at_least_600(self):
        """New timeout should be >= 600 s — never less than what the PRD specifies."""
        assert CODING_TIMEOUT_SECONDS >= 600


# ===========================================================================
# AC5 — Max fix turns is 10
# ===========================================================================

class TestCodingTeamMaxTurns:
    """
    Given: The coding team agent is in an iterative fix loop
    When: the turn counter is checked
    Then: the agent is permitted up to 10 turns before the loop terminates.
    """

    def test_max_fix_turns_is_10(self):
        """MAX_FIX_TURNS must equal 10."""
        assert MAX_FIX_TURNS == 10, (
            f"Expected MAX_FIX_TURNS=10, got {MAX_FIX_TURNS}"
        )

    def test_max_fix_turns_is_not_old_value_of_3(self):
        """Ensure the old 3-turn limit has been replaced."""
        assert MAX_FIX_TURNS != 3, (
            "MAX_FIX_TURNS is still the old value of 3; it should be 10"
        )

    def test_max_fix_turns_is_positive_integer(self):
        """MAX_FIX_TURNS must be a positive integer."""
        assert isinstance(MAX_FIX_TURNS, int)
        assert MAX_FIX_TURNS > 0

    def test_max_fix_turns_is_exported_at_module_level(self):
        """MAX_FIX_TURNS must be importable from src.agents.coding_team."""
        import src.agents.coding_team as mod
        assert hasattr(mod, "MAX_FIX_TURNS")

    def test_max_fix_turns_is_at_least_10(self):
        """New turn limit should be >= 10 — never less than what the PRD specifies."""
        assert MAX_FIX_TURNS >= 10


# ===========================================================================
# Integration: both constants are used together in fix_loop_router
# ===========================================================================

class TestFixLoopRouterLogic:
    """
    Verify that the graph routing logic uses the new constants correctly.
    These tests introspect the compiled graph structure rather than running it.
    """

    def test_coding_team_graph_is_exported(self):
        """coding_team_graph must be importable."""
        from src.agents.coding_team import coding_team_graph
        assert coding_team_graph is not None

    def test_fix_loop_router_respects_max_turns(self):
        """
        When fix_turns < MAX_FIX_TURNS the router should NOT route to end_max_turns.
        We test this by calling fix_loop_router directly with a stub state.
        """
        from src.agents.coding_team import fix_loop_router, MAX_FIX_TURNS

        # State below the limit: expect continuation (not 'end_max_turns')
        state_below_limit = {
            "messages": [],
            "fix_turns": MAX_FIX_TURNS - 1,
            "code": "",
            "error": "some error",
            "status": "fixing",
        }
        route = fix_loop_router(state_below_limit)
        # Route should NOT be the termination edge when turns < limit
        assert "max_turns" not in str(route).lower() or route != "end_max_turns", (
            f"Router sent to max_turns at turn {MAX_FIX_TURNS - 1} — should only terminate at {MAX_FIX_TURNS}"
        )

    def test_fix_loop_router_terminates_at_max_turns(self):
        """
        When fix_turns >= MAX_FIX_TURNS the router must route to end_max_turns.
        """
        from src.agents.coding_team import fix_loop_router, MAX_FIX_TURNS

        state_at_limit = {
            "messages": [],
            "fix_turns": MAX_FIX_TURNS,
            "code": "",
            "error": "some error",
            "status": "fixing",
        }
        route = fix_loop_router(state_at_limit)
        assert "max_turns" in str(route).lower() or route == "end_max_turns", (
            f"Router must terminate at MAX_FIX_TURNS={MAX_FIX_TURNS}, got route: {route}"
        )
