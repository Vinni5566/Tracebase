import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  BookOpen, Flame, Shield, Trophy, ChevronRight, Radar, TrendingUp,
} from "lucide-react";
import { AppShell } from "@/components/cyber/AppShell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { decks } from "@/lib/mock-data";
import { HoloCard } from "@/components/cyber/HoloCard";
import { StatusTicker } from "@/components/cyber/StatusTicker";
import { useSound } from "@/hooks/useSound";
import { useGameState } from "@/hooks/useGameState";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Command Center — ThreatForge" }, { name: "description", content: "Your security operations command center." }] }),
  component: Dashboard,
});


function Dashboard() {
  const { state } = useGameState();
  const completion = decks.length > 0 ? Math.round((state.missionsCompleted.length / decks.length) * 100) : 0;
  const xpCurrent = state.xp;
  const level = state.level;
  const xpToNext = level * 500;
  const rank = state.rank;
  const { playHover, playSelect } = useSound();

  const nextMission = decks.find(d => !state.missionsCompleted.includes(d.id)) || decks[decks.length - 1] || { id: "sqli", title: "SQL Injection", lessons: 4 };
  const currentProgress = nextMission ? Math.round((state.missionsCompleted.length / decks.length) * 100) : 0;

  return (
    <AppShell>
      {/* Command banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-6 overflow-hidden rounded-2xl holo-card neon-edge-cyan hud-corners p-6 sm:p-8"
      >
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="absolute -right-20 -top-20 size-72 rounded-full bg-cyber-purple/20 blur-3xl" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="relative size-2 rounded-full bg-cyber-defense shadow-[0_0_10px_var(--cyber-defense)]">
                <span className="absolute inset-0 animate-ping rounded-full bg-cyber-defense opacity-60" />
              </span>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyber-cyan">// SOC // sector-7 // online</p>
            </div>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              Welcome to <span className="text-gradient-cyber">ThreatForge</span>
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Your training environment is ready. Engage in the arena to forge your defensive skills.
            </p>
          </div>

          {/* Operator HUD: Level/XP */}
          <div className="flex shrink-0 items-center gap-4 rounded-xl border border-cyber-cyan/30 bg-background/40 p-3 backdrop-blur">
            <div className="relative grid size-14 place-items-center rounded-full bg-gradient-to-br from-cyber-cyan/30 to-cyber-purple/20 ring-1 ring-cyber-cyan/50">
              <span className="font-mono text-lg font-bold text-cyber-cyan">{level}</span>
              <span className="absolute -bottom-1 rounded-full bg-cyber-navy px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-cyber-cyan ring-1 ring-cyber-cyan/40">LVL</span>
            </div>
            <div className="min-w-[180px]">
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span className="font-mono uppercase tracking-wider">XP</span>
                <span className="font-mono">{xpCurrent}/{xpToNext}</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(xpCurrent / xpToNext) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-cyan shadow-[0_0_10px_var(--cyber-cyan)]"
                />
              </div>
              <p className="mt-1 font-mono text-[10px] text-muted-foreground">RANK · <span className="text-cyber-purple">{rank}</span></p>
            </div>
            <Button asChild variant="cyber" size="sm" className="self-stretch" onMouseEnter={playHover} onClick={playSelect}>
              <Link to="/lesson/$id" params={{ id: nextMission.id }}>Engage <ChevronRight className="size-3.5" /></Link>
            </Button>
          </div>
        </div>

        <div className="relative mt-6">
          <StatusTicker />
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={BookOpen} label="OPS Completed" value={`${state.missionsCompleted.length}/${decks.length}`} tone="cyan" footer={<Progress value={completion} className="h-1.5" />} />
        <StatCard icon={Shield} label="Security Score" value={state.xp.toLocaleString()} tone="purple" footer={<span className="inline-flex items-center gap-1 font-mono text-xs text-cyber-defense"><TrendingUp className="size-3" /> This session</span>} />
        <StatCard icon={Flame} label="Streak" value={`${state.streakDays}d`} tone="attack" footer={<span className="text-xs text-muted-foreground">Keep training</span>} />
        <StatCard icon={Trophy} label="Rank" value={state.rank} tone="gold" footer={<span className="text-xs text-muted-foreground">Level {state.level}</span>} />
      </div>

      <div className="mt-6">
        {/* Mission queue (continue) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <HoloCard>
            <div className="flex items-center justify-between border-b border-cyber-cyan/15 p-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyber-cyan">// active mission</p>
                <h2 className="mt-1 text-xl font-semibold">Continue Training</h2>
              </div>
              <Radar className="size-5 animate-pulse-glow text-cyber-cyan" />
            </div>
            <div className="p-5">
              <div className="relative overflow-hidden rounded-xl border border-cyber-cyan/30 bg-gradient-to-br from-cyber-cyan/10 via-transparent to-cyber-purple/10 p-5">
                <div className="absolute -right-10 -top-10 size-32 rounded-full bg-cyber-purple/30 blur-2xl" />
                <div className="relative flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyber-cyan">CLASSIFIED · IN PROGRESS</p>
                    <h3 className="mt-1 text-2xl font-semibold">{nextMission.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Continue where you left off. {nextMission.lessons} ops remaining.</p>
                  </div>
                  <Button asChild variant="cyber" size="lg" onMouseEnter={playHover} onClick={playSelect}>
                    <Link to="/lesson/$id" params={{ id: nextMission.id }}>Resume Scenario</Link>
                  </Button>
                </div>
                <div className="relative mt-5">
                  <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
                    <span>OBJECTIVE PROGRESS</span><span>{currentProgress}%</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted/60">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${currentProgress}%` }} transition={{ duration: 1 }} className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-purple shadow-[0_0_10px_var(--cyber-cyan)]" />
                  </div>
                </div>
              </div>

              <h3 className="mb-3 mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">// quick deploy missions</h3>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                {decks.slice(0, 4).map((d) => {
                  const isCompleted = state.missionsCompleted.includes(d.id);
                  return (
                    <Link key={d.id} to="/lesson/$id" params={{ id: d.id }} onMouseEnter={playHover} onClick={playSelect} className={`group/quick relative flex flex-col justify-between overflow-hidden rounded-lg border bg-background/40 p-4 transition-all ${isCompleted ? 'border-cyber-defense/30 hover:border-cyber-defense/60 hover:bg-cyber-defense/5' : 'border-cyber-cyan/15 hover:border-cyber-cyan/50 hover:bg-cyber-cyan/5'}`}>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-medium">{d.title}</p>
                          {isCompleted && <span className="rounded-full bg-cyber-defense/20 px-1.5 py-0.5 font-mono text-[8px] uppercase text-cyber-defense">Cleared</span>}
                        </div>
                        <p className="mt-1 font-mono text-[10px] text-muted-foreground">{d.lessons} ops · {d.estimatedMinutes}m</p>
                      </div>
                      <ChevronRight className={`mt-2 size-4 shrink-0 transition-transform group-hover/quick:translate-x-0.5 ${isCompleted ? 'text-cyber-defense' : 'text-muted-foreground group-hover/quick:text-cyber-cyan'}`} />
                      <span className={`absolute inset-y-0 left-0 w-0.5 opacity-0 transition-opacity group-hover/quick:opacity-100 ${isCompleted ? 'bg-cyber-defense' : 'bg-cyber-cyan'}`} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </HoloCard>
        </motion.div>
      </div>

      {/* Activity log */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-6"
      >
        <HoloCard tone="purple">
          <div className="border-b border-cyber-purple/20 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyber-purple">// operator log</p>
            <h2 className="mt-1 text-lg font-semibold">Recent activity</h2>
          </div>
          <ul className="divide-y divide-border/30">
            {state.missionsCompleted.length === 0 ? (
              <li className="p-8 text-center text-sm text-muted-foreground">
                No recent activity. Complete missions to build your record.
              </li>
            ) : (
              state.missionsCompleted.slice().reverse().map((id, i) => (
                <li key={id} className="flex items-center gap-4 bg-card/40 p-4 transition-colors hover:bg-cyber-purple/5">
                  <span className="grid size-8 place-items-center rounded-lg bg-cyber-purple/15 text-cyber-purple ring-1 ring-cyber-purple/40">
                    <Shield className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium capitalize">{id.replace(/-/g, ' ')} — mission completed</p>
                    <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">+150 XP · Session #{state.missionsCompleted.length - i}</p>
                  </div>
                </li>
              ))
            )}
          </ul>
        </HoloCard>
      </motion.div>
    </AppShell>
  );
}

function StatCard({
  icon: Icon, label, value, tone, footer,
}: {
  icon: typeof Shield;
  label: string;
  value: string;
  tone: "cyan" | "purple" | "attack" | "gold";
  footer?: React.ReactNode;
}) {
  const toneCls = {
    cyan: "from-cyber-cyan/25 text-cyber-cyan shadow-[0_0_30px_-12px_var(--cyber-cyan)]",
    purple: "from-cyber-purple/25 text-cyber-purple shadow-[0_0_30px_-12px_var(--cyber-purple)]",
    attack: "from-cyber-attack/25 text-cyber-attack shadow-[0_0_30px_-12px_var(--cyber-attack)]",
    gold: "from-cyber-gold/25 text-cyber-gold shadow-[0_0_30px_-12px_var(--cyber-gold)]",
  }[tone];
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      className={`group relative overflow-hidden rounded-2xl holo-card hud-corners p-5 ${toneCls}`}
    >
      <span className="holo-shine" aria-hidden />
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
        <span className={`grid size-9 place-items-center rounded-lg bg-gradient-to-br ${toneCls} to-transparent ring-1 ring-current/30`}>
          <Icon className="size-4" />
        </span>
      </div>
      <p className="mt-3 font-mono text-2xl font-bold tabular-nums">{value}</p>
      <div className="mt-3">{footer}</div>
    </motion.div>
  );
}
