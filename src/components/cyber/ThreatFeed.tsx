import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { AlertTriangle, ShieldCheck, Activity, Zap } from "lucide-react";

type Threat = {
  id: number;
  severity: "low" | "medium" | "high" | "critical";
  source: string;
  vector: string;
  status: "blocked" | "investigating" | "mitigated";
  time: string;
};

const POOL: Omit<Threat, "id" | "time">[] = [
  { severity: "critical", source: "185.220.101.42", vector: "SQLi · /api/login", status: "blocked" },
  { severity: "high", source: "203.0.113.17", vector: "XSS · /comments", status: "blocked" },
  { severity: "medium", source: "198.51.100.9", vector: "Brute force · ssh", status: "investigating" },
  { severity: "critical", source: "45.155.205.233", vector: "SSRF · /fetch", status: "blocked" },
  { severity: "low", source: "172.16.4.21", vector: "Port scan · TCP/22", status: "mitigated" },
  { severity: "high", source: "91.243.59.14", vector: "CSRF · /transfer", status: "blocked" },
  { severity: "critical", source: "internal.lan", vector: "Anomalous egress", status: "investigating" },
  { severity: "medium", source: "104.28.7.55", vector: "JWT replay", status: "blocked" },
];

const sevTone = {
  low: { dot: "bg-cyber-defense", text: "text-cyber-defense", ring: "ring-cyber-defense/40" },
  medium: { dot: "bg-cyber-gold", text: "text-cyber-gold", ring: "ring-cyber-gold/40" },
  high: { dot: "bg-cyber-attack", text: "text-cyber-attack", ring: "ring-cyber-attack/40" },
  critical: { dot: "bg-cyber-attack", text: "text-cyber-attack", ring: "ring-cyber-attack/60" },
} as const;

function now() {
  const d = new Date();
  return d.toLocaleTimeString("en-GB", { hour12: false });
}

export function ThreatFeed() {
  const [items, setItems] = useState<Threat[]>(() =>
    POOL.slice(0, 5).map((p, i) => ({ ...p, id: Date.now() + i, time: now() })),
  );

  useEffect(() => {
    let id = 1;
    const t = setInterval(() => {
      const next = POOL[Math.floor(Math.random() * POOL.length)];
      setItems((prev) => [{ ...next, id: Date.now() + id++, time: now() }, ...prev].slice(0, 7));
    }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-cyber-cyan/25 bg-card/60 backdrop-blur-xl">
      {/* neon edge */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_24px_-8px_var(--cyber-cyan)]" />
      <div className="flex items-center justify-between border-b border-cyber-cyan/20 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="relative grid size-7 place-items-center rounded-md bg-cyber-attack/15 ring-1 ring-cyber-attack/40">
            <AlertTriangle className="size-3.5 text-cyber-attack" />
            <span className="absolute -right-0.5 -top-0.5 size-2 animate-pulse-glow rounded-full bg-cyber-attack shadow-[0_0_8px_var(--cyber-attack)]" />
          </span>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyber-cyan">// live threat feed</p>
            <p className="text-sm font-semibold leading-tight">Edge sensors · global</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
          <Activity className="size-3 text-cyber-defense" />
          <span>STREAMING</span>
        </div>
      </div>

      <ul className="relative max-h-[420px] divide-y divide-border/40 overflow-hidden">
        <AnimatePresence initial={false}>
          {items.map((t) => {
            const tone = sevTone[t.severity];
            const StatusIcon = t.status === "blocked" ? ShieldCheck : t.status === "investigating" ? Zap : ShieldCheck;
            return (
              <motion.li
                key={t.id}
                layout
                initial={{ opacity: 0, x: -16, backgroundColor: "rgba(56, 232, 255, 0.08)" }}
                animate={{ opacity: 1, x: 0, backgroundColor: "rgba(0,0,0,0)" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3 px-5 py-3"
              >
                <span className={`relative size-2.5 rounded-full ${tone.dot} shadow-[0_0_10px_currentColor]`}>
                  <span className={`absolute inset-0 animate-ping rounded-full ${tone.dot} opacity-60`} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-[10px] uppercase ${tone.text}`}>{t.severity}</span>
                    <span className="font-mono text-xs text-muted-foreground">{t.time}</span>
                  </div>
                  <p className="truncate text-sm font-medium">{t.vector}</p>
                  <p className="truncate font-mono text-[10px] text-muted-foreground">from {t.source}</p>
                </div>
                <span className={`inline-flex shrink-0 items-center gap-1 rounded-md border border-current/30 px-2 py-0.5 font-mono text-[10px] uppercase ${
                  t.status === "blocked" ? "text-cyber-defense" : t.status === "investigating" ? "text-cyber-gold" : "text-cyber-cyan"
                }`}>
                  <StatusIcon className="size-3" />
                  {t.status}
                </span>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
}
