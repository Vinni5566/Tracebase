import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Heart, Zap, Trophy, Shield, ArrowRight, RotateCcw, CheckCircle2, XCircle, BookOpen } from "lucide-react";
import { AppShell } from "@/components/cyber/AppShell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SeverityBadge } from "@/components/cyber/Badges";
import { attackCards, defenseCards, decks } from "@/lib/mock-data";
import { useSound } from "@/hooks/useSound";
import { useGameState } from "@/hooks/useGameState";
import { PATH_CATEGORIES } from "./paths";

// Reverse-map category -> pathId so arena can tell completeMission which path to credit
const CATEGORY_TO_PATH: Record<string, string> = {};
for (const [pathId, cats] of Object.entries(PATH_CATEGORIES)) {
  for (const cat of cats) CATEGORY_TO_PATH[cat] = pathId;
}

export const Route = createFileRoute("/arena")({
  head: () => ({ meta: [{ title: "Training Arena — ThreatForge" }, { name: "description", content: "Live cybersecurity battles. Defend the server core." }] }),
  component: Arena,
});

type Phase = "playing" | "result";

function Arena() {
  const { state, completeMission } = useGameState();
  const [round, setRound] = useState(0);
  const [health, setHealth] = useState(100);
  const [phase, setPhase] = useState<Phase>("playing");
  const [picked, setPicked] = useState<string | null>(null);
  
  const { playHover, playSelect, playSuccess, playFailure } = useSound();

  const attack = attackCards[round % attackCards.length];

  // Pull 4 defenses: at least 1 correct + 3 random distractors
  const hand = useMemo(() => {
    const correct = defenseCards.find((d) => attack.defenses.includes(d.id))!;
    const others = defenseCards.filter((d) => d.id !== correct.id).sort(() => 0.5 - Math.random()).slice(0, 3);
    return [correct, ...others].sort(() => 0.5 - Math.random());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  const isCorrect = picked ? attack.defenses.includes(picked) : false;

  function handlePick(id: string) {
    if (phase !== "playing") return;
    setPicked(id);
    setPhase("result");
    playSelect();

    if (attack.defenses.includes(id)) {
      playSuccess();
      // Look up which deck (and therefore which path) this attack belongs to
      const deck = decks.find(d => d.id === attack.id);
      const pathId = deck ? CATEGORY_TO_PATH[deck.category] : undefined;
      completeMission(attack.id, pathId);
    } else {
      playFailure();
      setHealth((h) => Math.max(0, h - 25));
    }
  }

  function nextRound() {
    setPicked(null);
    setPhase("playing");
    setRound((r) => r + 1);
    if (health <= 0) setHealth(100);
  }

  const xpInLevel = state.xp % 500;

  return (
    <AppShell>
      {/* HUD */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-cyber-defense/30 bg-card/70 p-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground"><Heart className="size-4 text-cyber-attack" /> Server Integrity</span>
            <span className="font-mono text-sm tabular-nums">{health}/100</span>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full bg-gradient-to-r from-cyber-defense via-cyber-cyan to-cyber-defense"
              animate={{ width: `${health}%` }}
              transition={{ type: "spring", stiffness: 80 }}
              style={{ boxShadow: "0 0 12px var(--cyber-defense)" }}
            />
          </div>
        </div>
        <div className="rounded-2xl border border-cyber-cyan/30 bg-card/70 p-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground"><Zap className="size-4 text-cyber-cyan" /> XP</span>
            <span className="font-mono text-sm tabular-nums">{state.xp}</span>
          </div>
          <Progress value={(xpInLevel / 500) * 100} className="mt-3 h-2" />
        </div>
        <div className="rounded-2xl border border-cyber-purple/30 bg-card/70 p-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground"><Trophy className="size-4 text-cyber-purple" /> Rank</span>
            <span className="font-mono text-xl font-bold tabular-nums text-cyber-purple">{state.level}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{state.rank}</p>
        </div>
      </div>

      {/* Battlefield */}
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-b from-cyber-navy via-card/40 to-cyber-navy p-6 backdrop-blur-md sm:p-10">
        <div className="absolute inset-0 cyber-grid opacity-30" />
        {/* scanning line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent animate-scan-line" />

        <div className="relative min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${round}-${phase}`}
              initial={{ y: -80, opacity: 0, rotate: -4 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 60, opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 140, damping: 16 }}
              className="mx-auto max-w-md"
            >
              <div className="relative overflow-hidden rounded-2xl border border-cyber-attack/50 bg-gradient-to-br from-cyber-attack/15 via-card to-cyber-navy p-5 shadow-[0_0_40px_-8px_var(--cyber-attack)]">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-cyber-attack">// incoming attack</span>
                  <SeverityBadge severity={attack.severity} />
                </div>
                <h2 className="mt-3 text-2xl font-bold">{attack.name}</h2>
                <p className="mt-1 font-mono text-xs text-muted-foreground">{attack.vector}</p>
                <p className="mt-4 text-sm text-foreground/90">{attack.description}</p>

                {/* Impact flash */}
                {phase === "result" && !isCorrect && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.8, 0] }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-cyber-attack/40"
                  />
                )}
                {phase === "result" && isCorrect && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 0] }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 grid place-items-center"
                  >
                    <div className="rounded-full bg-cyber-defense/30 p-10 ring-2 ring-cyber-defense">
                      <Shield className="size-12 text-cyber-defense" />
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Hand */}
      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-cyan">// your hand · pick a defense</h3>
          <Button variant="ghost" size="sm" onClick={() => { setRound(0); setHealth(100); setPicked(null); setPhase("playing"); }}>
            <RotateCcw className="size-4" /> Reset run
          </Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {hand.map((d) => {
            const correct = attack.defenses.includes(d.id);
            const isPicked = picked === d.id;
            const reveal = phase === "result";
            return (
              <motion.button
                key={d.id}
                initial={{ y: 0, opacity: 1, scale: 1 }}
                animate={reveal && isPicked ? { y: -80, opacity: 0, scale: 0.8 } : { y: 0, opacity: 1, scale: 1 }}
                whileHover={phase === "playing" ? { y: -4 } : undefined}
                whileTap={phase === "playing" ? { scale: 0.98 } : undefined}
                onMouseEnter={playHover}
                onClick={() => handlePick(d.id)}
                disabled={phase !== "playing"}
                className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all ${
                  reveal && correct ? "border-cyber-defense/70 bg-cyber-defense/15 shadow-[0_0_30px_-8px_var(--cyber-defense)]" :
                  reveal && isPicked && !correct ? "border-cyber-attack/70 bg-cyber-attack/15" :
                  "border-border/60 bg-card/70 hover:border-cyber-cyan/50 hover:bg-cyber-cyan/5"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{d.category}</span>
                  {reveal && correct && <CheckCircle2 className="size-5 text-cyber-defense" />}
                  {reveal && isPicked && !correct && <XCircle className="size-5 text-cyber-attack" />}
                </div>
                <h4 className="mt-3 text-base font-semibold">{d.name}</h4>
                <p className="mt-1 text-xs text-muted-foreground">{d.description}</p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Result / explanation panel */}
      <AnimatePresence>
        {phase === "result" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`mt-6 overflow-hidden rounded-2xl border p-6 backdrop-blur ${
              isCorrect ? "border-cyber-defense/40 bg-cyber-defense/5" : "border-cyber-attack/40 bg-cyber-attack/5"
            }`}
          >
            <div className="flex items-start gap-4">
              <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${
                isCorrect ? "bg-cyber-defense/20 text-cyber-defense" : "bg-cyber-attack/20 text-cyber-attack"
              }`}>
                {isCorrect ? <Shield className="size-5" /> : <XCircle className="size-5" />}
              </span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">
                  {isCorrect ? "Attack neutralized." : "Defense failed."}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {isCorrect
                    ? `Correct — the right mitigation against ${attack.name} is to apply layered controls like the one you picked. +75 XP.`
                    : `That control wouldn't stop ${attack.name}. The server takes 25 damage. Try a defense that targets the actual vector.`}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="cyber" size="sm" onClick={nextRound}>
                    Next round <ArrowRight className="size-4" />
                  </Button>
                  <Button asChild variant="outlineGlow" size="sm">
                    <Link to="/lesson/$id" params={{ id: attack.id }}>
                      <BookOpen className="size-4" /> Deep dive lesson
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}
