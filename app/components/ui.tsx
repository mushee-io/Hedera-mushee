import * as React from "react";
import { clsx } from "clsx";

export function cn(...classes: Array<string | undefined | null | false>) {
  return clsx(classes);
}

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "outline" }) {
  const { className, variant = "primary", ...rest } = props;
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed";
  const styles =
    variant === "primary"
      ? "bg-white text-black hover:bg-neutral-200"
      : variant === "outline"
      ? "border border-white/15 text-white hover:border-white/25 hover:bg-white/5"
      : "text-white hover:bg-white/5";
  return <button className={cn(base, styles, className)} {...rest} />;
}

export function Card(props: React.HTMLAttributes<HTMLDivElement> & { title?: string; subtitle?: string; right?: React.ReactNode }) {
  const { className, title, subtitle, right, children, ...rest } = props;
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-black/60 shadow-soft",
        className
      )}
      {...rest}
    >
      {(title || subtitle || right) && (
        <div className="flex items-start justify-between gap-3 border-b border-white/10 p-4">
          <div>
            {title && <div className="text-sm font-semibold text-white">{title}</div>}
            {subtitle && <div className="mt-1 text-xs text-white/60">{subtitle}</div>}
          </div>
          {right}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}
