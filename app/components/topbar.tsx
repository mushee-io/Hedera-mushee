import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Button, Pill } from "./ui";

export function Topbar({ status }: { status: string }) {
  return (
    <header className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/60 p-4 shadow-soft">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <div className="text-white font-semibold tracking-tight">Mushee Suite</div>
          <Pill>{status}</Pill>
        </div>
        <div className="mt-1 text-xs text-white/60">
          Hedera-native demo dashboard — AI + Wallet + Faucet + Ecosystem
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link href="https://mushee.xyz/" target="_blank">
          <Button variant="outline" className="hidden sm:inline-flex">
            Website <ArrowUpRight size={16} />
          </Button>
        </Link>
        <Link href="https://x.com/mushee_io" target="_blank">
          <Button variant="outline" className="hidden sm:inline-flex">
            X <ArrowUpRight size={16} />
          </Button>
        </Link>
        <Button className="whitespace-nowrap">
          <Sparkles size={16} /> New Demo
        </Button>
      </div>
    </header>
  );
}
