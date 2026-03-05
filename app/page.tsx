"use client";

import * as React from "react";
import { Sidebar } from "./components/sidebar";
import { TxFeed } from "./components/tx-feed";
import { Tabs } from "./components/tabs";
import { MiniReading } from "./components/mini-reading";
import { Topbar } from "./components/topbar";
import { Button, Card, Pill } from "./components/ui";
import {
  Activity,
  ArrowRight,
  Blocks,
  CheckCircle2,
  Compass,
  Copy,
  Droplets,
  ExternalLink,
  Globe,
  HandCoins,
  KeyRound,
  RefreshCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";

type Dapp = {
  name: string;
  category: "DeFi" | "AI" | "Infra" | "NFT" | "Tools";
  blurb: string;
  linkLabel: string;
  href: string;
};

const DAPPS: Dapp[] = [
  { name: "HTS Token Tools", category: "Tools", blurb: "Create and manage Hedera tokens (HTS).", linkLabel: "Docs", href: "https://docs.hedera.com/" },
  { name: "Hedera Mirror Node", category: "Infra", blurb: "Query transactions, topics, and token activity.", linkLabel: "Learn", href: "https://docs.hedera.com/" },
  { name: "HCS Topics", category: "Infra", blurb: "Consensus messages for auditable event logs.", linkLabel: "Explore", href: "https://docs.hedera.com/" },
  { name: "AI Agent Actions", category: "AI", blurb: "Mushee agents execute on-chain actions from prompts.", linkLabel: "Demo", href: "#" },
  { name: "DeFi Pools", category: "DeFi", blurb: "Liquidity + swaps + staking flows (demo-ready).", linkLabel: "Scan", href: "#" },
  { name: "NFT Mint Studio", category: "NFT", blurb: "Mint NFTs + receipts for real-world actions.", linkLabel: "Demo", href: "#" },
];

function shortAddr(addr: string) {
  if (!addr) return "";
  return addr.slice(0, 6) + "…" + addr.slice(-4);
}

export default function Page() {
  const [connected, setConnected] = React.useState(false);
  const [network, setNetwork] = React.useState<"testnet" | "mainnet">("testnet");
  const [account, setAccount] = React.useState<string>("");
  const [lastTx, setLastTx] = React.useState<string>("");
  const [busy, setBusy] = React.useState(false);

  const [ecoTab, setEcoTab] = React.useState<"scan" | "reading" | "trackers">("scan");
    const [query, setQuery] = React.useState("");
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DAPPS;
    return DAPPS.filter(d =>
      (d.name + " " + d.category + " " + d.blurb).toLowerCase().includes(q)
    );
  }, [query]);

  const status = connected ? (network === "testnet" ? "TestNet Connected" : "MainNet Connected") : "Disconnected";

  async function connectDemo() {
    setBusy(true);
    await new Promise(r => setTimeout(r, 650));
    setConnected(true);
    const mock = network === "testnet"
      ? "0.0.4873921"
      : "0.0.128739";
    setAccount(mock);
    setLastTx("");
    setBusy(false);
  }

  async function disconnect() {
    setBusy(true);
    await new Promise(r => setTimeout(r, 250));
    setConnected(false);
    setAccount("");
    setLastTx("");
    setBusy(false);
  }

  async function runAgentDemo(kind: "send" | "token" | "scan") {
    setBusy(true);
    await new Promise(r => setTimeout(r, 900));
    // fake tx id format (not real)
    const tx = `${network}-tx-${Math.random().toString(16).slice(2, 10)}-${Date.now().toString().slice(-6)}`;
    setLastTx(tx);
    setBusy(false);
  }

  const [faucetTab, setFaucetTab] = React.useState<"claim" | "how" | "links">("claim");
    const [faucetMsg, setFaucetMsg] = React.useState<string>("");
  const [cooldownUntil, setCooldownUntil] = React.useState<number>(0);

  async function claimFaucet() {
    setBusy(true);
    setFaucetMsg("");
    await new Promise(r => setTimeout(r, 850));
    const cd = Date.now() + 60_000; // 60s cooldown demo
    setCooldownUntil(cd);
    setFaucetMsg("Faucet claim submitted (demo). Replace with real Hedera faucet call.");
    setBusy(false);
  }

  const cooldownLeft = Math.max(0, Math.ceil((cooldownUntil - Date.now()) / 1000));

  function copy(text: string) {
    navigator.clipboard?.writeText(text).catch(() => {});
  }

  return (
    <main className="relative min-h-screen bg-[#050505] text-white">
      <div className="orbs absolute inset-0" />
      <div className="grain" />

      <div className="relative mx-auto max-w-[1400px] px-4 py-5 md:px-6">
        <div className="flex gap-5">
          <Sidebar />

          <div className="flex-1 space-y-5">
            <Topbar status={status} />

            {/* Mobile quick links */}
            <div className="md:hidden">
              <Card>
                <div className="flex flex-wrap items-center gap-2">
                  <Pill>Mushee Suite</Pill>
                  <Pill>Hedera</Pill>
                  <a className="text-xs text-white/80 underline underline-offset-4" href="https://mushee.xyz/" target="_blank">Mushee Website</a>
                  <a className="text-xs text-white/80 underline underline-offset-4" href="https://x.com/mushee_io" target="_blank">Mushee X</a>
                </div>
              </Card>
            </div>

            <section id="overview" className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <Card
                title="On-chain AI Actions"
                subtitle="Every prompt → real Hedera transactions (demo-ready)"
                right={<Sparkles size={18} className="text-white/80" />}
                className="lg:col-span-2"
              >
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs text-white/60">Mode</div>
                    <div className="mt-1 text-sm font-semibold">{network.toUpperCase()}</div>
                    <div className="mt-3 text-xs text-white/50">
                      Switch between TestNet & MainNet for milestone demos.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs text-white/60">Wallet</div>
                    <div className="mt-1 text-sm font-semibold">{connected ? "Connected" : "Not connected"}</div>
                    <div className="mt-3 text-xs text-white/50">
                      Next step: plug in WalletConnect for HashPack/Blade signing (HashConnect is being deprecated).
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs text-white/60">Last action</div>
                    <div className="mt-1 text-sm font-semibold">{lastTx ? "TX Created" : "—"}</div>
                    <div className="mt-3 text-xs text-white/50 break-words">
                      {lastTx ? lastTx : "Run a demo to generate a transaction id."}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button
                    disabled={!connected || busy}
                    onClick={() => runAgentDemo("send")}
                    className="min-w-[170px]"
                  >
                    <HandCoins size={16} /> Prompt: Send HBAR <ArrowRight size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    disabled={!connected || busy}
                    onClick={() => runAgentDemo("token")}
                    className="min-w-[170px]"
                  >
                    <Blocks size={16} /> Prompt: Create Token
                  </Button>
                  <Button
                    variant="outline"
                    disabled={!connected || busy}
                    onClick={() => runAgentDemo("scan")}
                    className="min-w-[170px]"
                  >
                    <Compass size={16} /> Prompt: Scan Ecosystem
                  </Button>

                  {lastTx && (
                    <Button variant="ghost" onClick={() => copy(lastTx)} className="ml-auto">
                      <Copy size={16} /> Copy TX
                    </Button>
                  )}
                </div>
              </Card>

              
            </section>

            <section id="wallet" className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <Card title="Wallet + Network" subtitle="HBAR connectivity (demo)" right={<Wallet size={18} className="text-white/80" />} className="lg:col-span-2">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="text-xs text-white/60">Active account</div>
                    <div className="mt-1 text-lg font-semibold">
                      {connected ? account : "—"}
                    </div>
                    <div className="mt-1 text-xs text-white/50">
                      {connected ? "Demo account id (replace with real wallet address)." : "Connect a Hedera wallet to enable demos."}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex rounded-xl border border-white/10 bg-white/5 p-1">
                      <button
                        onClick={() => setNetwork("testnet")}
                        className={`rounded-lg px-3 py-2 text-xs ${network === "testnet" ? "bg-white text-black" : "text-white/80 hover:bg-white/5"}`}
                        disabled={busy}
                      >
                        TestNet
                      </button>
                      <button
                        onClick={() => setNetwork("mainnet")}
                        className={`rounded-lg px-3 py-2 text-xs ${network === "mainnet" ? "bg-white text-black" : "text-white/80 hover:bg-white/5"}`}
                        disabled={busy}
                      >
                        MainNet
                      </button>
                    </div>

                    {!connected ? (
                      <Button onClick={connectDemo} disabled={busy}>
                        <KeyRound size={16} /> Connect Hedera Wallet (Demo)
                      </Button>
                    ) : (
                      <Button variant="outline" onClick={disconnect} disabled={busy}>
                        Disconnect
                      </Button>
                    )}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs text-white/60">Suggested wallets</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Pill>HashPack</Pill>
                      <Pill>Blade</Pill>
                      <Pill>WalletConnect</Pill>
                    </div>
                    <div className="mt-3 text-xs text-white/50">
                      Swap this demo connect with real wallet SDK when ready.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs text-white/60">Hedera services</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Pill>HTS</Pill>
                      <Pill>HCS</Pill>
                      <Pill>Mirror Nodes</Pill>
                    </div>
                    <div className="mt-3 text-xs text-white/50">
                      Each demo maps to a service for clear grant reporting.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs text-white/60">Explorer</div>
                    <div className="mt-1 text-sm font-semibold">{network === "testnet" ? "Testnet explorer" : "Mainnet explorer"}</div>
                    <div className="mt-3 flex items-center gap-2 text-xs text-white/70">
                      <ExternalLink size={14} />
                      <span className="truncate">Add tx + contract links here</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card id="faucet" title="Faucet" subtitle="Claim Hedera for free (TestNet)" right={<Droplets size={18} className="text-white/80" />}>
                  <div className="text-xs text-white/60">
                    Instant HBAR for reviewers and testers. Built as a simple tabbed flow.
                  </div>

                  <div className="mt-4">
                    <Tabs
                      value={faucetTab}
                      onChange={(k) => setFaucetTab(k as any)}
                      tabs={[
                        { key: "claim", label: "Claim" },
                        { key: "how", label: "How it works" },
                        { key: "links", label: "Links" },
                      ]}
                    />
                  </div>

                  {faucetTab === "claim" && (
                    <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold">TestNet HBAR</div>
                          <div className="mt-1 text-xs text-white/60">
                            {connected ? `Send to: ${account}` : "Connect a wallet to claim."}
                          </div>
                        </div>
                        <Button
                          disabled={!connected || busy || network !== "testnet" || cooldownLeft > 0}
                          onClick={claimFaucet}
                        >
                          <Droplets size={16} /> {cooldownLeft > 0 ? `Cooldown (${cooldownLeft}s)` : "Claim"}
                        </Button>
                      </div>
                      {network !== "testnet" && (
                        <div className="mt-3 text-xs text-white/50">
                          Faucet is for TestNet only. Switch to TestNet to claim.
                        </div>
                      )}
                      {faucetMsg && (
                        <div className="mt-3 text-xs text-white/80">
                          {faucetMsg}
                        </div>
                      )}
                      <div className="mt-3 text-xs text-white/50">
                        Demo mode: replace <span className="text-white">claimFaucet()</span> with a real faucet request and show the returned tx hash.
                      </div>
                    </div>
                  )}

                  {faucetTab === "how" && (
                    <div className="mt-4 rounded-2xl border border-white/10 bg-black/50 p-4 text-xs text-white/60 space-y-2">
                      <div className="text-sm font-semibold text-white">What reviewers want to see</div>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>A one-click faucet to onboard new users on TestNet.</li>
                        <li>A visible result: tx id + link to explorer.</li>
                        <li>Rate limiting (cooldown) to prevent abuse.</li>
                      </ul>
                      <div className="pt-2">
                        <span className="text-white/80">Tip:</span> after a real claim, show an explorer link and update the wallet balance via Mirror Node.
                      </div>
                    </div>
                  )}

                  {faucetTab === "links" && (
                    <div className="mt-4 rounded-2xl border border-white/10 bg-black/50 p-4">
                      <div className="text-xs text-white/60">
                        Reference links you can paste into the grant submission.
                      </div>
                      <div className="mt-3 space-y-2 text-xs">
                        <a className="block underline underline-offset-4 text-white/80" href="https://docs.hedera.com/" target="_blank">
                          Hedera docs
                        </a>
                        <a className="block underline underline-offset-4 text-white/80" href="https://docs.hedera.com/hedera/sdks-and-apis/rest-api" target="_blank">
                          Mirror Node REST API
                        </a>
                        <a className="block underline underline-offset-4 text-white/80" href="https://hashscan.io/testnet" target="_blank">
                          HashScan explorer (TestNet)
                        </a>
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-2">
                        <Button variant="ghost" onClick={() => setFaucetMsg("")}>
                          <RefreshCcw size={16} /> Clear messages
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              </section>


            <section id="explore" className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                <Card title="HBAR Ecosystem" subtitle="Scan + mini reading + live trackers" right={<Globe size={18} className="text-white/80" />} className="lg:col-span-2">
                  <div className="flex items-center justify-between gap-3">
                    <Tabs
                      value={ecoTab}
                      onChange={(k) => setEcoTab(k as any)}
                      tabs={[
                        { key: "scan", label: "Scan" },
                        { key: "reading", label: "Mini reading" },
                        { key: "trackers", label: "Network" },
                      ]}
                    />
                    <Pill>Grant demo</Pill>
                  </div>

                  {ecoTab === "scan" && (
                    <>
                      <div className="mt-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                        <Search size={16} className="text-white/60" />
                        <input
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Search DeFi, AI, infra, tools…"
                          className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
                        />
                        <Button variant="ghost" onClick={() => setQuery("")}>Clear</Button>
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {filtered.map((d) => (
                          <div key={d.name} className="rounded-2xl border border-white/10 bg-black/50 p-4 hover:bg-white/5 transition">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="text-sm font-semibold">{d.name}</div>
                                <div className="mt-1 text-xs text-white/60">{d.blurb}</div>
                              </div>
                              <Pill>{d.category}</Pill>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                              <Button
                                variant="outline"
                                onClick={() => {
                                  if (d.href === "#") return;
                                  window.open(d.href, "_blank");
                                }}
                              >
                                {d.linkLabel} <ExternalLink size={16} />
                              </Button>
                              <Button variant="ghost" onClick={() => copy(d.name)}>
                                <Copy size={16} /> Copy
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {ecoTab === "reading" && (
                    <div className="mt-4">
                      <MiniReading />
                    </div>
                  )}

                  {ecoTab === "trackers" && (
                    <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                      <TxFeed network={network} />
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="text-sm font-semibold">Network activity</div>
                        <div className="mt-1 text-xs text-white/60">
                          Use these widgets to prove traction for Milestone 3 (TX volume + users).
                        </div>
                        <div className="mt-4 space-y-3">
                          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                            <div className="text-xs text-white/60">Explorer</div>
                            <div className="mt-1 text-sm font-semibold">{network === "testnet" ? "HashScan TestNet" : "HashScan MainNet"}</div>
                            <a
                              className="mt-2 inline-flex items-center gap-2 text-xs text-white/80 underline underline-offset-4"
                              href={network === "testnet" ? "https://hashscan.io/testnet" : "https://hashscan.io/mainnet"}
                              target="_blank"
                            >
                              Open explorer <ExternalLink size={14} />
                            </a>
                          </div>
                          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                            <div className="text-xs text-white/60">Mirror Node API</div>
                            <div className="mt-1 text-sm font-semibold">{network === "testnet" ? "testnet.mirrornode.hedera.com" : "mainnet-public.mirrornode.hedera.com"}</div>
                            <div className="mt-2 text-xs text-white/60 break-words">
                              {network === "testnet"
                                ? "https://testnet.mirrornode.hedera.com/api/v1/transactions"
                                : "https://mainnet-public.mirrornode.hedera.com/api/v1/transactions"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>

                <Card title="Shortlist" subtitle="What we’ll integrate first" right={<Compass size={18} className="text-white/80" />}>
                  <div className="space-y-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-sm font-semibold">Wallet</div>
                      <div className="mt-1 text-xs text-white/60">WalletConnect → HashPack / Blade</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-sm font-semibold">On-chain action</div>
                      <div className="mt-1 text-xs text-white/60">AI executes HTS token deploy + HCS logging</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-sm font-semibold">Analytics</div>
                      <div className="mt-1 text-xs text-white/60">Mirror Node dashboard for TX + MAU proofs</div>
                    </div>
                  </div>
                </Card>
              </section>
<section id="demos" className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <Card title="Demos" subtitle="Milestone-friendly walkthroughs" right={<Sparkles size={18} className="text-white/80" />} className="lg:col-span-2">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm font-semibold">Demo 1</div>
                    <div className="mt-1 text-xs text-white/60">Prompt → send HBAR</div>
                    <div className="mt-4">
                      <Button disabled={!connected || busy} onClick={() => runAgentDemo("send")}>
                        Run <ArrowRight size={16} />
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm font-semibold">Demo 2</div>
                    <div className="mt-1 text-xs text-white/60">Prompt → create token</div>
                    <div className="mt-4">
                      <Button variant="outline" disabled={!connected || busy} onClick={() => runAgentDemo("token")}>
                        Run <ArrowRight size={16} />
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm font-semibold">Demo 3</div>
                    <div className="mt-1 text-xs text-white/60">Prompt → scan ecosystem</div>
                    <div className="mt-4">
                      <Button variant="outline" disabled={!connected || busy} onClick={() => runAgentDemo("scan")}>
                        Run <ArrowRight size={16} />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-black/50 p-4">
                  <div className="text-xs text-white/60">Evidence pack (copy/paste for grant form)</div>
                  <div className="mt-2 text-sm font-semibold">What to include</div>
                  <ul className="mt-2 space-y-2 text-xs text-white/60 list-disc pl-4">
                    <li>Contract addresses (testnet + mainnet)</li>
                    <li>Explorer links proving on-chain actions</li>
                    <li>Loom demo showing prompts and execution</li>
                    <li>Public dashboard for MAUs / TX volume / TVL</li>
                  </ul>
                </div>
              </Card>

              <Card id="trust" title="Trust + Security" subtitle="Simple, clean, and safe defaults" right={<ShieldCheck size={18} className="text-white/80" />}>
                <div className="space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm font-semibold">Transaction confirmation</div>
                    <div className="mt-1 text-xs text-white/60">
                      AI proposes actions; user signs (real wallet integration).
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm font-semibold">Audit trail</div>
                    <div className="mt-1 text-xs text-white/60">
                      Log prompts + outcomes to HCS topics (optional).
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm font-semibold">Zero-glass UI</div>
                    <div className="mt-1 text-xs text-white/60">
                      Black + white, sharp surfaces, no blur panels.
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            <footer className="pb-8 pt-2 text-center text-xs text-white/50">
              © {new Date().getFullYear()} Mushee Suite — Hedera Demo. Built for fast milestone shipping.
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
