"""
server.py
---------
FastAPI diagnostics and orchestration server for the AgentForge backend.

Routes
------
GET  /health                  Liveness probe
GET  /api/diagnostics/status  System status snapshot (polling-based)
GET  /api/diagnostics/agents  Active agent summaries (polling-based)
POST /api/runs                Trigger an agent run
GET  /api/runs/{run_id}       Retrieve run details by ID
"""

from __future__ import annotations

import logging
import os
from datetime import datetime, timezone
from typing import Any, Optional
from uuid import uuid4

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# App setup
# ---------------------------------------------------------------------------

app = FastAPI(
    title="AgentForge API",
    description="Backend diagnostics and orchestration endpoints for AgentForge.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------

class HealthResponse(BaseModel):
    status: str
    timestamp: str


class DiagnosticsStatus(BaseModel):
    healthy: bool
    active_agents: int
    uptime_seconds: float
    timestamp: str


class AgentSummary(BaseModel):
    agent_id: str
    name: str
    status: str
    last_active: Optional[str]


class RunRequest(BaseModel):
    task: str
    agent: str = "ceo_supervisor"
    metadata: dict[str, Any] = {}


class RunResponse(BaseModel):
    run_id: str
    status: str
    agent: str
    task: str
    created_at: str


# ---------------------------------------------------------------------------
# In-memory run registry (replace with Supabase persistence in production)
# ---------------------------------------------------------------------------

_runs: dict[str, dict[str, Any]] = {}
_server_start_time: datetime = datetime.now(timezone.utc)


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.get("/health", response_model=HealthResponse, tags=["ops"])
async def health_check() -> HealthResponse:
    """Liveness probe — returns 200 when the server is up."""
    return HealthResponse(
        status="ok",
        timestamp=datetime.now(timezone.utc).isoformat(),
    )


# TODO: Implement Supabase Realtime postgres_changes for sub-second dashboard updates instead of polling
@app.get(
    "/api/diagnostics/status",
    response_model=DiagnosticsStatus,
    tags=["diagnostics"],
)
async def diagnostics_status() -> DiagnosticsStatus:
    """
    Return a system status snapshot.

    ⚠️  Currently polled by the dashboard on a fixed interval.
    TODO: Implement Supabase Realtime postgres_changes for sub-second
          dashboard updates instead of polling.
    """
    uptime = (datetime.now(timezone.utc) - _server_start_time).total_seconds()
    active_count = sum(1 for r in _runs.values() if r.get("status") == "running")

    return DiagnosticsStatus(
        healthy=True,
        active_agents=active_count,
        uptime_seconds=uptime,
        timestamp=datetime.now(timezone.utc).isoformat(),
    )


# TODO: Implement Supabase Realtime postgres_changes for sub-second dashboard updates instead of polling
@app.get(
    "/api/diagnostics/agents",
    response_model=list[AgentSummary],
    tags=["diagnostics"],
)
async def diagnostics_agents() -> list[AgentSummary]:
    """
    Return active agent summaries.

    ⚠️  Currently polled by the dashboard on a fixed interval.
    TODO: Implement Supabase Realtime postgres_changes for sub-second
          dashboard updates instead of polling.
    """
    summaries: list[AgentSummary] = []
    for run_id, run in _runs.items():
        summaries.append(
            AgentSummary(
                agent_id=run_id,
                name=run.get("agent", "unknown"),
                status=run.get("status", "unknown"),
                last_active=run.get("updated_at"),
            )
        )
    return summaries


@app.post(
    "/api/runs",
    response_model=RunResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["runs"],
)
async def create_run(body: RunRequest) -> RunResponse:
    """Trigger an agent run and return a run ID for status polling."""
    run_id = str(uuid4())
    now = datetime.now(timezone.utc).isoformat()

    _runs[run_id] = {
        "run_id": run_id,
        "agent": body.agent,
        "task": body.task,
        "metadata": body.metadata,
        "status": "queued",
        "created_at": now,
        "updated_at": now,
    }

    logger.info("Run %s queued (agent=%s task=%r)", run_id, body.agent, body.task[:60])

    # In production: enqueue to a task queue (Celery, RQ, etc.) here.

    return RunResponse(
        run_id=run_id,
        status="queued",
        agent=body.agent,
        task=body.task,
        created_at=now,
    )


@app.get("/api/runs/{run_id}", response_model=RunResponse, tags=["runs"])
async def get_run(run_id: str) -> RunResponse:
    """Retrieve run details by ID."""
    run = _runs.get(run_id)
    if not run:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Run {run_id!r} not found.",
        )
    return RunResponse(
        run_id=run["run_id"],
        status=run["status"],
        agent=run["agent"],
        task=run["task"],
        created_at=run["created_at"],
    )


# ---------------------------------------------------------------------------
# Entry point (development only — use uvicorn in production)
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "src.api.server:app",
        host="0.0.0.0",
        port=int(os.environ.get("API_PORT", "8000")),
        reload=True,
        log_level="info",
    )
