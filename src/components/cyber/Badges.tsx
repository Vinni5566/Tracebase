import { motion } from "motion/react";
import type { Difficulty } from "@/lib/mock-data";

const map: Record<Difficulty, string> = {
  Beginner: "bg-cyber-defense/15 text-cyber-defense border-cyber-defense/40",
  Intermediate: "bg-cyber-cyan/15 text-cyber-cyan border-cyber-cyan/40",
  Advanced: "bg-cyber-purple/15 text-cyber-purple border-cyber-purple/40",
  Expert: "bg-cyber-attack/15 text-cyber-attack border-cyber-attack/40",
};

export function DifficultyBadge({ level }: { level: Difficulty }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${map[level]}`}>
      <span className="size-1.5 rounded-full bg-current" />
      {level}
    </span>
  );
}

export function SeverityBadge({ severity }: { severity: "Low" | "Medium" | "High" | "Critical" }) {
  const tone =
    severity === "Critical"
      ? "bg-cyber-attack text-cyber-attack-foreground"
      : severity === "High"
      ? "bg-cyber-attack/80 text-white"
      : severity === "Medium"
      ? "bg-cyber-gold/80 text-cyber-navy"
      : "bg-muted text-muted-foreground";
  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest ${tone}`}
    >
      ⚠ {severity}
    </motion.span>
  );
}
