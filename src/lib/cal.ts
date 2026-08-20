import type { getCalApi } from "@calcom/embed-react";
import { sendGAEvent } from "@next/third-parties/google";
import { CAL_LINK } from "@/data/site";

/**
 * Shared Cal.com loader. Perf contract (carried over from V11): the embed's
 * third-party JS loads on INTENT (hover/focus/touch preload, click opens),
 * never on page load. Only BookingInline (/contact) loads it eagerly, because
 * that page IS booking intent.
 *
 * Every namespace gets the bookingSuccessful listener exactly once, firing
 * the generate_lead conversion into GA4 via the official dataLayer helper.
 */

type CalApi = Awaited<ReturnType<typeof getCalApi>>;

const instances = new Map<string, Promise<CalApi>>();

export function loadCal(namespace: string): Promise<CalApi> {
  let instance = instances.get(namespace);
  if (!instance) {
    instance = import("@calcom/embed-react")
      .then((m) => m.getCalApi({ namespace }))
      .then((cal) => {
        cal("on", {
          action: "bookingSuccessful",
          callback: () => {
            sendGAEvent("event", "generate_lead", { method: "cal_booking" });
          },
        });
        cal("ui", { theme: "light", layout: "month_view" });
        return cal;
      });
    instances.set(namespace, instance);
  }
  return instance;
}

export function preloadCal(namespace: string): void {
  void loadCal(namespace).then((cal) => {
    cal("preload", { calLink: CAL_LINK });
  });
}

export function openCalModal(
  namespace: string,
  prefill?: { name?: string; email?: string },
): void {
  void loadCal(namespace).then((cal) => {
    cal("modal", {
      calLink: CAL_LINK,
      config: { layout: "month_view", theme: "light", ...prefill },
    });
  });
}
