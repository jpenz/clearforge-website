"use client";

import Cal from "@calcom/embed-react";
import { useEffect, useState } from "react";
import { CAL_INLINE_NAMESPACE, CAL_LINK } from "@/data/site";
import { loadCal } from "@/lib/cal";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

/**
 * The embedded month-view calendar. Roughly 600px tall, light theme.
 * A hairline-drawn calendar skeleton holds the frame until the embed
 * reports ready, so Cal's default spinner never shows.
 */
export function BookingInline() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    const markReady = () => {
      if (mounted) setReady(true);
    };
    void loadCal(CAL_INLINE_NAMESPACE).then((api) => {
      api("on", { action: "linkReady", callback: markReady });
    });
    // Never trap the surface behind the skeleton if the embed stalls.
    const fallback = setTimeout(markReady, 12000);
    return () => {
      mounted = false;
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div className="relative min-h-[600px] bg-white">
      <Cal
        namespace={CAL_INLINE_NAMESPACE}
        calLink={CAL_LINK}
        style={{ width: "100%", height: "600px" }}
        config={{ layout: "month_view", theme: "light" }}
      />
      {/* Hairline calendar skeleton, in the design language */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 flex flex-col bg-white p-5 transition-opacity duration-300 motion-reduce:transition-none ${
          ready ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex items-center justify-between pb-4">
          <span className="cf-skeleton h-3 w-28 bg-ink/10" />
          <div className="flex gap-2">
            <span className="cf-skeleton size-6 border border-hairline" />
            <span className="cf-skeleton size-6 border border-hairline" />
          </div>
        </div>
        <div className="grid grid-cols-7 pb-2 text-center text-[10px] tracking-[0.14em] text-ink/40 uppercase">
          {WEEKDAYS.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="grid grow grid-cols-7 grid-rows-5 border-t border-l border-hairline-faint">
          {Array.from({ length: 35 }, (_, index) => (
            <div
              key={index}
              className="border-r border-b border-hairline-faint p-2"
            >
              <span
                className="cf-skeleton inline-block h-2 w-4 bg-ink/10"
                style={{ animationDelay: `${(index % 7) * 90}ms` }}
              />
            </div>
          ))}
        </div>
        <p className="pt-4 text-center text-[10px] tracking-[0.16em] text-ink/40 uppercase">
          Loading live availability
        </p>
      </div>
    </div>
  );
}
