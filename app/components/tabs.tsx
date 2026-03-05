"use client";
import * as React from "react";
import { cn } from "./ui";

export function Tabs({
  tabs,
  value,
  onChange,
  className,
}: {
  tabs: Array<{ key: string; label: string; icon?: React.ReactNode }>;
  value: string;
  onChange: (key: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tabs.map((t) => {
        const active = t.key === value;
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs transition",
              active
                ? "border-white bg-white text-black"
                : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
            )}
            type="button"
          >
            {t.icon}
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
