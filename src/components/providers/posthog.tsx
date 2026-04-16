"use client";

import posthog from "posthog-js";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

let initialized = false;

function initPostHog() {
  if (initialized || !POSTHOG_KEY || typeof window === "undefined") return;
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: "identified_only",
    capture_pageview: false, // We handle it manually
    capture_pageleave: true,
    loaded: () => {
      // Expose for lib/analytics/track.ts
      (window as unknown as Record<string, unknown>).posthog = posthog;
    },
  });
  initialized = true;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    initPostHog();
  }, []);

  useEffect(() => {
    if (!POSTHOG_KEY) return;
    posthog.capture("$pageview", {
      $current_url: `${window.location.origin}${pathname}${searchParams.toString() ? `?${searchParams}` : ""}`,
    });
  }, [pathname, searchParams]);

  return <>{children}</>;
}
