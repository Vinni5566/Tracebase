import { ShieldCheck, Wifi, Radio, Cpu, Activity, Lock } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "FIREWALL", value: "OPERATIONAL", tone: "text-cyber-defense" },
  { icon: Wifi, label: "UPLINK", value: "256.4 Mb/s", tone: "text-cyber-cyan" },
  { icon: Radio, label: "SIGINT", value: "12 SENSORS", tone: "text-cyber-cyan" },
  { icon: Cpu, label: "AI CORE", value: "NOMINAL", tone: "text-cyber-defense" },
  { icon: Activity, label: "INCIDENTS", value: "3 ACTIVE", tone: "text-cyber-gold" },
  { icon: Lock, label: "VAULT", value: "SEALED", tone: "text-cyber-purple" },
];

export function StatusTicker() {
  const row = (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((it, i) => {
        const Icon = it.icon;
        return (
          <div key={i} className="flex items-center gap-2 whitespace-nowrap">
            <Icon className={`size-3.5 ${it.tone}`} />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{it.label}</span>
            <span className={`font-mono text-[11px] font-semibold ${it.tone}`}>{it.value}</span>
            <span className="text-border">·</span>
          </div>
        );
      })}
    </div>
  );
  return (
    <div className="relative overflow-hidden rounded-lg border border-cyber-cyan/20 bg-background/50 py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent" />
      <div className="flex animate-ticker">
        {row}
        {row}
      </div>
    </div>
  );
}
