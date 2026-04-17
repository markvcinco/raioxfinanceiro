import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

export function Input({ className, ...props }: ComponentPropsWithoutRef<"input">) {
  return (
    <input
      className={cn(
        "peer w-full rounded-md border border-border bg-muted",
        "px-3 py-2.5 text-sm text-foreground",
        "placeholder:text-muted-foreground",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "transition-[border-color,box-shadow] duration-150",
        className
      )}
      {...props}
    />
  );
}
