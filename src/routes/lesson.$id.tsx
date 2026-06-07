import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, AlertTriangle, Bug, ShieldCheck, Lightbulb, Code2, BookOpen, CheckCircle2, RotateCcw } from "lucide-react";
import { AppShell } from "@/components/cyber/AppShell";
import { Button } from "@/components/ui/button";
import { DifficultyBadge } from "@/components/cyber/Badges";
import { allLessons, decks } from "@/lib/mock-data";
import { useGameState } from "@/hooks/useGameState";
import { PATH_CATEGORIES } from "./paths";

export const Route = createFileRoute("/lesson/$id")({
  head: () => ({ meta: [{ title: "Lesson — ThreatForge" }, { name: "description", content: "Deep dive on a cybersecurity concept." }] }),
  component: LessonPage,
});

function LessonPage() {
  const { id } = Route.useParams();
  const l = allLessons.find((x) => x.id === id) || allLessons[0];
  const { state, resetMission } = useGameState();
  const isCompleted = state.missionsCompleted.includes(l.id);

  // Determine which path this mission belongs to
  const deck = decks.find(d => d.id === l.id);
  const pathId = deck ? Object.entries(PATH_CATEGORIES).find(([, cats]) => cats.includes(deck.category))?.[0] : undefined;

  return (
    <AppShell>
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link to="/missions"><ArrowLeft className="size-4" /> Back to missions</Link>
      </Button>

      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={`overflow-hidden rounded-2xl border bg-gradient-to-br p-6 sm:p-8 ${
          isCompleted
            ? "border-cyber-defense/40 from-cyber-defense/10 via-card to-cyber-cyan/10"
            : "border-cyber-cyan/30 from-cyber-cyan/10 via-card to-cyber-purple/10"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-cyan">{l.category}</p>
          {isCompleted && (
            <span className="flex items-center gap-1.5 rounded-full border border-cyber-defense/40 bg-cyber-defense/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-cyber-defense">
              <CheckCircle2 className="size-3" /> Mission Cleared
            </span>
          )}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold sm:text-4xl">{l.title}</h1>
          <DifficultyBadge level={l.difficulty} />
        </div>
        <p className="mt-4 max-w-3xl text-muted-foreground">{l.summary}</p>
      </motion.header>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Section icon={AlertTriangle} title="Real-world incidents" tone="attack">
            <ul className="space-y-2">
              {l.realWorld.map((r: string) => <li key={r} className="flex gap-2 text-sm"><span className="text-cyber-attack">›</span>{r}</li>)}
            </ul>
          </Section>

          <Section icon={Bug} title="How attackers exploit it" tone="purple">
            <ul className="grid gap-2 sm:grid-cols-2">
              {l.exploits.map((r: string) => (
                <li key={r} className="rounded-lg border border-border/60 bg-background/40 px-3 py-2 font-mono text-xs text-muted-foreground">{r}</li>
              ))}
            </ul>
          </Section>

          <Section icon={Code2} title="Code: vulnerable vs secure" tone="cyan">
            <div className="grid gap-3 lg:grid-cols-2">
              <CodeBlock label="Vulnerable" tone="attack" code={l.vulnerableCode} />
              <CodeBlock label="Secure" tone="defense" code={l.secureCode} />
            </div>
          </Section>

          <Section icon={ShieldCheck} title="Defense techniques" tone="defense">
            <ul className="space-y-2">
              {l.defenses.map((d: string) => (
                <li key={d} className="flex items-start gap-2 text-sm"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-cyber-defense" />{d}</li>
              ))}
            </ul>
          </Section>
        </div>

        <aside className="space-y-6">
          <Section icon={AlertTriangle} title="Common mistakes" tone="attack" compact>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {l.mistakes.map((m: string) => <li key={m}>• {m}</li>)}
            </ul>
          </Section>

          <Section icon={Lightbulb} title="Security tips" tone="gold" compact>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {l.tips.map((t: string) => <li key={t}>• {t}</li>)}
            </ul>
          </Section>

          <div className="rounded-2xl border border-cyber-cyan/30 bg-gradient-to-br from-cyber-cyan/10 to-cyber-purple/10 p-5">
            <BookOpen className="size-5 text-cyber-cyan" />
            <h3 className="mt-3 font-semibold">
              {isCompleted ? "Mission complete — replay anytime" : "Ready to test it?"}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {isCompleted
                ? "You've already cleared this mission. Jump back in to reinforce the concept."
                : "Jump into the arena and apply what you just learned."
              }
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Button asChild variant="cyber" size="sm" className="w-full">
                <Link to="/arena">Enter Arena</Link>
              </Button>
              {isCompleted && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full border border-border/50 text-muted-foreground hover:border-cyber-attack/40 hover:text-cyber-attack"
                  onClick={() => resetMission(l.id, pathId)}
                >
                  <RotateCcw className="mr-2 size-4" /> Reset & Redo Mission
                </Button>
              )}
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

function Section({
  icon: Icon, title, tone, children, compact,
}: {
  icon: typeof BookOpen; title: string; tone: "attack" | "defense" | "cyan" | "purple" | "gold"; children: React.ReactNode; compact?: boolean;
}) {
  const toneCls = {
    attack: "text-cyber-attack",
    defense: "text-cyber-defense",
    cyan: "text-cyber-cyan",
    purple: "text-cyber-purple",
    gold: "text-cyber-gold",
  }[tone];
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`rounded-2xl border border-border/60 bg-card/70 backdrop-blur ${compact ? "p-5" : "p-6"}`}
    >
      <div className="mb-4 flex items-center gap-2">
        <Icon className={`size-5 ${toneCls}`} />
        <h2 className="font-semibold">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

function CodeBlock({ label, tone, code }: { label: string; tone: "attack" | "defense"; code: string }) {
  const toneCls = tone === "attack"
    ? "border-cyber-attack/40 bg-cyber-attack/5 text-cyber-attack"
    : "border-cyber-defense/40 bg-cyber-defense/5 text-cyber-defense";
  return (
    <div className={`overflow-hidden rounded-xl border ${toneCls}`}>
      <div className="flex items-center justify-between border-b border-current/20 px-3 py-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wider">{label}</span>
        <span className="font-mono text-[10px] opacity-70">javascript</span>
      </div>
      <pre className="whitespace-pre-wrap break-all bg-background/60 p-4 font-mono text-xs leading-relaxed text-foreground"><code>{code}</code></pre>
    </div>
  );
}
