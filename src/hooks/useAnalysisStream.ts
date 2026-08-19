"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AnalysisEvent, AnalysisMode } from "@/lib/analysis";

export type AnalysisStatus =
  | "idle"
  | "running"
  | "streaming"
  | "done"
  | "error";

/**
 * Client driver for the /api/hero-analyze NDJSON stream.
 * Shared by HeroAgent (brief) and ForgeIntelligence (detailed).
 */
export function useAnalysisStream(mode: AnalysisMode = "brief") {
  const [status, setStatus] = useState<AnalysisStatus>("idle");
  const [target, setTarget] = useState("yourcompany.com");
  const [progress, setProgress] = useState<string[]>([]);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [live, setLive] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  const run = useCallback(
    async (rawTarget: string) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      const nextTarget = rawTarget.trim() || "yourcompany.com";
      setTarget(nextTarget);
      setProgress([]);
      setFields({});
      setLive(false);
      setStatus("running");

      try {
        const res = await fetch("/api/hero-analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ target: nextTarget, mode }),
          signal: controller.signal,
        });
        if (!res.ok || !res.body) throw new Error("Analysis request failed");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let finished = false;

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.trim()) continue;
            const event = JSON.parse(line) as AnalysisEvent;
            if (event.type === "progress") {
              setProgress((prev) => [...prev, event.label]);
            } else if (event.type === "mode") {
              setLive(event.value === "live");
            } else if (event.type === "field") {
              setStatus("streaming");
              setFields((prev) => ({ ...prev, [event.key]: event.value }));
            } else if (event.type === "done") {
              finished = true;
              setStatus("done");
            } else if (event.type === "error") {
              throw new Error("Analysis failed");
            }
          }
        }
        if (!finished) throw new Error("Stream ended early");
      } catch (error) {
        if ((error as Error).name !== "AbortError") setStatus("error");
      }
    },
    [mode],
  );

  return { status, target, progress, fields, live, run };
}
