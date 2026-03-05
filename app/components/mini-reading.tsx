import { BookOpen, ExternalLink } from "lucide-react";
import { Button, Pill } from "./ui";

const READS = [
  {
    title: "HTS (Token Service)",
    blurb:
      "Fast token creation + transfers. Great for launching utility tokens and receipts.",
    bullets: [
      "Mint/freeze/wipe/supply keys",
      "Frictionless user transfers",
      "Perfect for Milestone 4 (token launch)",
    ],
    href: "https://docs.hedera.com/",
  },
  {
    title: "HCS (Consensus Service)",
    blurb: "Append-only event log with ordering and timestamps.",
    bullets: [
      "Log AI prompts → outcomes",
      "Audit trail for reviewers",
      "Proves integrity without storing secrets on-chain",
    ],
    href: "https://docs.hedera.com/",
  },
  {
    title: "Mirror Node API",
    blurb:
      "The best way to show traction: transactions, holders, balances, usage dashboards.",
    bullets: ["Live tx feed", "Balance lookup", "Public analytics for Milestone 3"],
    href: "https://docs.hedera.com/hedera/sdks-and-apis/rest-api",
  },
  {
    title: "WalletConnect (Recommended)",
    blurb:
      "Connect HashPack/Blade via WalletConnect. HashConnect is being deprecated.",
    bullets: [
      "Multi-wallet support",
      "Sign and submit transactions",
      "Future-proof connection method",
    ],
    href: "https://docs.hedera.com/hedera/tutorials/more-tutorials/develop-a-hedera-dapp-integrated-with-walletconnect",
  },
];

export function MiniReading() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <BookOpen size={18} className="text-white/80" />
          <div className="text-sm font-semibold">Mini reading</div>
        </div>
        <Pill>Fast context</Pill>
      </div>
      <div className="space-y-3">
        {READS.map((r) => (
          <div
            key={r.title}
            className="rounded-2xl border border-white/10 bg-black/50 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">{r.title}</div>
                <div className="mt-1 text-xs text-white/60">{r.blurb}</div>
              </div>
              <a href={r.href} target="_blank">
                <Button variant="outline">
                  Read <ExternalLink size={16} />
                </Button>
              </a>
            </div>
            <ul className="mt-3 list-disc space-y-1 pl-4 text-xs text-white/60">
              {r.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
