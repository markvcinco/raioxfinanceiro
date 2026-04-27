"use client";

import { lazy, Suspense } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineBackgroundProps {
  className?: string;
  overlayClassName?: string;
}

export function SplineBackground({
  className = "absolute inset-0",
  overlayClassName = "absolute inset-0 bg-black/50 z-[1] pointer-events-none",
}: SplineBackgroundProps) {
  return (
    <>
      <div className={className}>
        <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
          <Spline
            scene="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode"
            className="w-full h-full"
          />
        </Suspense>
      </div>
      <div className={overlayClassName} />
    </>
  );
}
