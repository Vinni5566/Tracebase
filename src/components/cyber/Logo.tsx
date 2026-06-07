import { ShieldHalf } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group inline-flex items-center gap-2">
      <span className="relative grid size-9 place-items-center rounded-lg bg-gradient-to-br from-cyber-cyan to-cyber-purple shadow-[0_0_24px_-4px_var(--cyber-cyan)]">
        <ShieldHalf className="size-5 text-cyber-navy" strokeWidth={2.5} />
        <span className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/20" />
      </span>
      {!compact && (
        <span className="font-mono text-lg font-bold tracking-tight">
          Threat<span className="text-gradient-cyber">Forge</span>
        </span>
      )}
    </Link>
  );
}
