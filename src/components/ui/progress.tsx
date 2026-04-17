"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value?: number;
  className?: string;
}

export function Progress({ value = 0, className }: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      value={value}
      max={100}
      aria-label={`Progresso: ${Math.round(value)}%`}
      className={cn("relative h-0.5 w-full overflow-hidden bg-border", className)}
    >
      <ProgressPrimitive.Indicator
        className="h-full bg-markv-light transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}
