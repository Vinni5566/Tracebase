import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, Clock, BookOpen, Filter, FileLock2, Fingerprint,
  CheckCircle2, RotateCcw,
} from "lucide-react";
import { AppShell } from "@/components/cyber/AppShell";
import { PageHeader } from "@/components/cyber/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DifficultyBadge } from "@/components/cyber/Badges";
import { decks, type Difficulty } from "@/lib/mock-data";
import { useSound } from "@/hooks/useSound";
import { useGameState } from "@/hooks/useGameState";
import { PATH_CATEGORIES } from "./paths";

export const Route = createFileRoute("/missions")({
  head: () => ({ meta: [{ title: "Dossier Archive — ThreatForge" }, { name: "description", content: "Classified scenario dossiers across web, API, cloud, mobile, and AI security." }] }),
  component: MissionsPage,
});

const difficulties: (Difficulty | "All")[] = ["All", "Beginner", "Intermediate", "Advanced", "Expert"];

const clearance: Record<Difficulty, { level: string; tone: string }> = {
  Beginner:     { level: "L1", tone: "text-cyber-defense" },
  Intermediate: { level: "L2", tone: "text-cyber-cyan" },
  Advanced:     { level: "L3", tone: "text-cyber-purple" },
  Expert:       { level: "L4", tone: "text-cyber-gold" },
};

// Build category→pathId lookup for resetMission
const CATEGORY_TO_PATH: Record<string, string> = {};
for (const [pathId, cats] of Object.entries(PATH_CATEGORIES)) {
  for (const cat of cats) CATEGORY_TO_PATH[cat] = pathId;
}

function MissionsPage() {
  const [q, setQ] = useState("");
  const [diff, setDiff] = useState<Difficulty | "All">("All");
  const { playHover, playSelect } = useSound();
  const { state, resetMission } = useGameState();

  const filtered = useMemo(() => {
    return decks.filter((d) => {
      const matchesQ = q === "" || (d.title + d.description + d.tags.join(" ")).toLowerCase().includes(q.toLowerCase());
      const matchesD = diff === "All" || d.difficulty === diff;
      return matchesQ && matchesD;
    });
  }, [q, diff]);

  return (
    <AppShell>
      <PageHeader
        eyebrow="// archive"
        title="Classified dossier archive"
        description="Each dossier contains a sealed scenario stack. Clear clearance level to access."
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search archive · vulnerabilities · vectors…"
            className="h-11 border-cyber-cyan/30 bg-card/60 pl-10 font-mono text-sm placeholder:text-muted-foreground/60 focus-visible:ring-cyber-cyan"
          />
        </div>
        <div className="flex items-center gap-1 overflow-x-auto rounded-md border border-cyber-cyan/20 bg-card/50 p-1">
          <Filter className="ml-2 size-4 shrink-0 text-muted-foreground" />
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => setDiff(d)}
              className={`shrink-0 rounded px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                diff === d ? "bg-cyber-cyan/15 text-cyber-cyan shadow-[inset_0_0_0_1px_var(--cyber-cyan)]" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((d, i) => {
          const cl = clearance[d.difficulty];
          const isCompleted = state.missionsCompleted.includes(d.id);
          const pathId = CATEGORY_TO_PATH[d.category];

          return (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              onMouseEnter={playHover}
              onClick={playSelect}
              transition={{ delay: i * 0.04 }}
              className={`group relative flex flex-col overflow-hidden rounded-2xl holo-card hud-corners p-0 transition-all ${
                isCompleted ? "neon-edge-defense ring-1 ring-cyber-defense/30" : "neon-edge-purple"
              }`}
            >
              <span className="holo-shine" aria-hidden />

              {/* Completed glow overlay */}
              <AnimatePresence>
                {isCompleted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="pointer-events-none absolute inset-0 z-0 bg-cyber-defense/5"
                  />
                )}
              </AnimatePresence>

              {/* Dossier header strip */}
              <div className={`relative border-b px-5 py-3 bg-gradient-to-r ${
                isCompleted
                  ? "border-cyber-defense/25 from-cyber-defense/15 via-transparent to-cyber-cyan/10"
                  : "border-cyber-purple/25 from-cyber-purple/15 via-transparent to-cyber-cyan/10"
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileLock2 className={`size-3.5 ${isCompleted ? "text-cyber-defense" : "text-cyber-purple"}`} />
                    <span className={`font-mono text-[10px] uppercase tracking-[0.25em] ${isCompleted ? "text-cyber-defense" : "text-cyber-purple"}`}>
                      DOSSIER · {d.id.toUpperCase().slice(0, 8)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isCompleted && (
                      <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-cyber-defense">
                        <CheckCircle2 className="size-3" /> Cleared
                      </span>
                    )}
                    <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${cl.tone}`}>CLR · {cl.level}</span>
                  </div>
                </div>
              </div>

              <div className="relative flex flex-1 flex-col p-5">
                {/* Classified stamp */}
                <div className="pointer-events-none absolute right-3 top-3 rotate-12 select-none rounded border-2 border-cyber-attack/40 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-cyber-attack/60 opacity-0 transition-opacity group-hover:opacity-100">
                  Classified
                </div>

                <div className="flex items-start justify-between gap-3">
                  <span className={`rounded border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] ${
                    isCompleted
                      ? "border-cyber-defense/30 bg-cyber-defense/10 text-cyber-defense"
                      : "border-cyber-cyan/30 bg-cyber-cyan/10 text-cyber-cyan"
                  }`}>
                    {d.category}
                  </span>
                  <DifficultyBadge level={d.difficulty} />
                </div>

                <h3 className="mt-4 text-lg font-semibold leading-snug">{d.title}</h3>
                <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{d.description}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {d.tags.map((t) => (
                    <span key={t} className="rounded border border-border/60 bg-background/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                      #{t}
                    </span>
                  ))}
                </div>

                {/* Fingerprint signature */}
                <div className="mt-5 flex items-center gap-2 border-t border-cyber-purple/20 pt-3 font-mono text-[10px] text-muted-foreground">
                  <Fingerprint className={`size-3.5 ${isCompleted ? "text-cyber-defense/70" : "text-cyber-purple/70"}`} />
                  <span className="truncate">SIG · 0x{d.id.padEnd(8, "0").slice(0, 8)}-AE2{i}</span>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1 font-mono"><BookOpen className="size-3.5" /> {d.lessons} ops</span>
                  <span className="inline-flex items-center gap-1 font-mono"><Clock className="size-3.5" /> {d.estimatedMinutes}m</span>
                </div>

                {/* Action buttons */}
                <div className="mt-4 flex gap-2">
                  <Button asChild variant={isCompleted ? "outlineGlow" : "outlineGlow"} size="sm" className="flex-1">
                    <Link to="/lesson/$id" params={{ id: d.id }}>
                      {isCompleted ? "Review Intel" : "Review Intel"}
                    </Link>
                  </Button>
                  {isCompleted && (
                    <Button
                      variant="ghost"
                      size="sm"
                      title="Reset & replay this mission"
                      className="shrink-0 border border-border/50 text-muted-foreground hover:border-cyber-attack/40 hover:text-cyber-attack"
                      onClick={(e) => {
                        e.stopPropagation();
                        resetMission(d.id, pathId);
                      }}
                    >
                      <RotateCcw className="size-4" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
            No dossiers match the current query.
          </div>
        )}
      </div>
    </AppShell>
  );
}
