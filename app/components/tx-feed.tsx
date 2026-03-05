"use client";
import * as React from "react";
import { ExternalLink, RefreshCcw } from "lucide-react";
import { Button, Pill } from "./ui";

type TxItem = {
  transaction_id: string;
  consensus_timestamp: string;
  name?: string;
  result?: string;
};

const MIRROR = {
  mainnet: "https://mainnet-public.mirrornode.hedera.com",
  testnet: "https://testnet.mirrornode.hedera.com",
} as const;

function fmtTime(ts: string) {
  const sec = Number(ts.split(".")[0] || 0);
  if (!sec) return "—";
  const d = new Date(sec * 1000);
  return d.toLocaleString();
}

export function TxFeed({ network }: { network: "testnet" | "mainnet" }) {
  const [items, setItems] = React.useState<TxItem[]>([]);
  const [err, setErr] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const base = MIRROR[network];

  async function load() {
    setLoading(true);
    setErr("");
    try {
      const url = `${base}/api/v1/transactions?limit=8&order=desc`;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`Mirror node error ${res.status}`);
      const data = await res.json();
      const txs = (data?.transactions ?? []) as TxItem[];
      setItems(txs.slice(0, 8));
    } catch (e: any) {
      setErr(e?.message ?? "Failed to load transactions");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    load();
    const t = setInterval(load, 12_000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="text-sm font-semibold">Live tx feed</div>
          <Pill>{network.toUpperCase()}</Pill>
        </div>
        <Button variant="ghost" onClick={load} disabled={loading}>
          <RefreshCcw size={16} /> Refresh
        </Button>
      </div>
      <div className="mt-1 text-xs text-white/60">
        Pulled from Hedera public mirror node REST API (auto-refresh).
      </div>

      {err ? (
        <div className="mt-3 rounded-xl border border-white/10 bg-black/40 p-3 text-xs text-white/70">
          Couldn’t load mirror node data: <span className="text-white">{err}</span>
        </div>
      ) : (
        <div className="mt-3 space-y-2">
          {items.map((tx) => (
            <a
              key={tx.transaction_id + tx.consensus_timestamp}
              href={`https://hashscan.io/${network}/transaction/${encodeURIComponent(
                tx.transaction_id
              )}`}
              target="_blank"
              className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/40 px-3 py-2 hover:bg-white/5 transition"
            >
              <div className="min-w-0">
                <div className="truncate text-xs text-white/80">
                  {tx.transaction_id}
                </div>
                <div className="mt-1 text-[11px] text-white/50">
                  {fmtTime(tx.consensus_timestamp)}
                </div>
              </div>
              <ExternalLink size={16} className="shrink-0 text-white/60" />
            </a>
          ))}
          {!items.length && (
            <div className="text-xs text-white/50">No transactions returned yet.</div>
          )}
        </div>
      )}
    </div>
  );
}
