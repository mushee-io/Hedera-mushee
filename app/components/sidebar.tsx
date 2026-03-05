import Link from "next/link";
import { BadgeCheck, Blocks, Compass, Droplets, LayoutGrid, Sparkles } from "lucide-react";
import { Pill } from "./ui";

export function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-72 md:flex-col md:gap-4 md:p-5">
      <div className="rounded-2xl border border-white/10 bg-black/60 p-4 shadow-soft">
        <div className="flex items-center justify-between">
          <div className="text-white font-semibold tracking-tight">Mushee Suite</div>
          <Pill>Hedera</Pill>
        </div>
        <div className="mt-2 text-xs text-white/60">
          AI on-chain assistant dashboard (demo)
        </div>
        <div className="mt-4 flex gap-2">
          <Link
            href="https://mushee.xyz/"
            target="_blank"
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-xs text-white hover:bg-white/10"
          >
            Mushee Website
          </Link>
          <Link
            href="https://x.com/mushee_io"
            target="_blank"
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-xs text-white hover:bg-white/10"
          >
            Mushee X
          </Link>
        </div>
      </div>

      <nav className="rounded-2xl border border-white/10 bg-black/60 p-2 shadow-soft">
        <a className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white hover:bg-white/5" href="#overview">
          <LayoutGrid size={18} /> Overview
        </a>
        <a className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white hover:bg-white/5" href="#wallet">
          <Blocks size={18} /> Wallet + Network
        </a>
        <a className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white hover:bg-white/5" href="#explore">
          <Compass size={18} /> Ecosystem Scan
        </a>
        <a className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white hover:bg-white/5" href="#faucet">
          <Droplets size={18} /> Faucet
        </a>
        <a className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white hover:bg-white/5" href="#demos">
          <Sparkles size={18} /> Demos
        </a>
        <a className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white hover:bg-white/5" href="#trust">
          <BadgeCheck size={18} /> Readiness
        </a>
      </nav>

      <div className="rounded-2xl border border-white/10 bg-black/60 p-4 shadow-soft">
        <div className="text-sm font-semibold text-white">Submission-ready</div>
        <div className="mt-2 text-xs text-white/60">
          Clean, sharp, glassless UI designed for a grant / accelerator demo.
        </div>
        <div className="mt-3 text-xs text-white/50">
          Replace demo actions with real Hedera wallet + faucet calls when you’re ready.
        </div>
      </div>
    </aside>
  );
}
