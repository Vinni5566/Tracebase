import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Shield, Target, Trophy, Zap, ArrowRight, Sparkles,
  Database, Code2, KeyRound, Server, Skull, Lock, CheckCircle2,
  Layers, Languages, Palette, Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CyberBackground } from "@/components/cyber/CyberBackground";
import { Logo } from "@/components/cyber/Logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ThreatForge — Forge Real-World Cybersecurity Skills" },
      { name: "description", content: "Learn attacks, defenses, and secure development through interactive missions and hands-on challenges." },
      { property: "og:title", content: "ThreatForge — Cybersecurity, gamified" },
      { property: "og:description", content: "Learn attacks, defenses, and secure development through interactive missions and hands-on challenges." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <CyberBackground intensity="intense" />

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 mx-auto flex h-20 max-w-7xl items-center justify-between border-b border-transparent bg-background/0 px-4 transition-all duration-300 sm:px-6 hover:bg-background/40 hover:backdrop-blur-md hover:border-cyber-cyan/20">
        <Logo />
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link to="/about" className="relative transition-colors hover:text-cyber-cyan hover:drop-shadow-[0_0_8px_var(--cyber-cyan)] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-cyber-cyan after:transition-all after:duration-300 hover:after:w-full">About</Link>
          <a href="#paths" className="relative transition-colors hover:text-cyber-cyan hover:drop-shadow-[0_0_8px_var(--cyber-cyan)] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-cyber-cyan after:transition-all after:duration-300 hover:after:w-full">Paths</a>
          <Link to="/missions" className="relative transition-colors hover:text-cyber-cyan hover:drop-shadow-[0_0_8px_var(--cyber-cyan)] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-cyber-cyan after:transition-all after:duration-300 hover:after:w-full">Missions</Link>
          <Link to="/community" className="relative transition-colors hover:text-cyber-cyan hover:drop-shadow-[0_0_8px_var(--cyber-cyan)] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-cyber-cyan after:transition-all after:duration-300 hover:after:w-full">Community</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <a href="https://github.com" target="_blank" rel="noreferrer"><Github className="size-4" /> Star</a>
          </Button>
          <Button asChild variant="cyber" size="sm">
            <Link to="/dashboard">Launch app</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 pb-24 pt-12 sm:px-6 lg:grid-cols-2 lg:pt-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyber-cyan/40 bg-cyber-cyan/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-cyber-cyan"
          >
            <Sparkles className="size-3" /> Open-source · v0.1 MVP
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-5 text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl"
          >
            Forge Real-World{" "}
            <span className="text-gradient-cyber">Cybersecurity Skills</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-5 max-w-xl text-lg text-muted-foreground"
          >
            Learn attacks, defenses, and secure development through interactive missions and hands-on challenges.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button asChild variant="cyber" size="lg">
              <Link to="/arena">Start Training <ArrowRight className="size-4" /></Link>
            </Button>
            <Button asChild variant="outlineGlow" size="lg">
              <Link to="/missions">Explore Missions</Link>
            </Button>
          </motion.div>
          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            {[
              { icon: CheckCircle2, label: "120+ scenarios" },
              { icon: CheckCircle2, label: "OWASP aligned" },
              { icon: CheckCircle2, label: "Free forever" },
            ].map((i) => (
              <div key={i.label} className="inline-flex items-center gap-1.5">
                <i.icon className="size-4 text-cyber-defense" /> {i.label}
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual: battle scene */}
        <HeroBattle />
      </section>

      {/* Why ThreatForge */}
      <section id="why" className="relative z-10 border-y border-cyber-cyan/10 bg-black/20 py-24 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="// philosophy" title="Why ThreatForge" subtitle="The best way to learn security is by doing it." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Learn by doing", desc: "Interactive exercises instead of reading walls of text.", icon: Code2 },
            { title: "Real-world attacks", desc: "Based on actual breaches and modern vulnerability classes.", icon: Skull },
            { title: "Interactive missions", desc: "Engaging scenarios where you are the last line of defense.", icon: Target },
            { title: "Community-driven", desc: "New content contributed by security engineers worldwide.", icon: Languages },
          ].map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm transition-all hover:border-cyber-cyan/40 hover:shadow-[0_0_30px_-10px_var(--cyber-cyan)]"
            >
              <s.icon className="mt-2 size-7 text-cyber-purple" />
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        </div>
      </section>

      {/* Training Paths */}
      <section id="paths" className="relative z-10 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="// curriculums" title="Training Paths" subtitle="Master core security domains." />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {[
            { icon: Zap, title: "OWASP Top 10", desc: "Critical risks" },
            { icon: Shield, title: "Web Security", desc: "XSS, CSRF" },
            { icon: Layers, title: "API Security", desc: "REST, GraphQL" },
            { icon: KeyRound, title: "Auth Security", desc: "Tokens, MFA" },
            { icon: Target, title: "Cloud Security", desc: "AWS, IAM" },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-panel rounded-2xl p-6 transition-all hover:glow-cyan"
            >
              <div className="grid size-11 place-items-center rounded-lg bg-gradient-to-br from-cyber-cyan/20 to-cyber-purple/20 ring-1 ring-cyber-cyan/30">
                <f.icon className="size-5 text-cyber-cyan" />
              </div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
        </div>
      </section>

      {/* Community Powered */}
      <section id="community" className="relative z-10 border-y border-cyber-purple/10 bg-black/20 py-24 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="// open-source" title="Community Powered" subtitle="Built by analysts for the next generation." />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Layers, title: "New missions", desc: "Community-created scenarios.", tag: "Live" },
            { icon: Target, title: "New learning paths", desc: "Specialized curriculums.", tag: "Live" },
            { icon: Languages, title: "New translations", desc: "Accessible globally.", tag: "Live" },
            { icon: Palette, title: "New themes", desc: "Custom aesthetics.", tag: "Live" },
          ].map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="relative overflow-hidden rounded-2xl border border-cyber-purple/30 bg-gradient-to-br from-cyber-purple/10 via-card to-cyber-cyan/10 p-6"
            >
              <span className="absolute right-4 top-4 rounded-full bg-cyber-purple/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyber-purple">{r.tag}</span>
              <r.icon className="size-7 text-cyber-purple" />
              <h3 className="mt-4 font-semibold">{r.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{r.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button asChild variant="outlineGlow" size="lg">
            <Link to="/community">Join the community <ArrowRight className="size-4" /></Link>
          </Button>
        </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mt-10 border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-3">
            <Logo compact />
            <span>© {new Date().getFullYear()} ThreatForge. MIT licensed.</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="https://github.com/Vinni5566/cyberpunk-defense-lab" className="transition-colors hover:text-foreground">GitHub</a>
            <a href="https://github.com/Vinni5566/cyberpunk-defense-lab/blob/main/CONTRIBUTING.md" className="transition-colors hover:text-foreground">Contributing</a>
            <a href="https://github.com/Vinni5566/cyberpunk-defense-lab/blob/main/LICENSE" className="transition-colors hover:text-foreground">License</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-cyan">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-2 text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function HeroBattle() {
  const attacks = [
    { icon: Database, label: "SQL Injection", color: "text-cyber-attack" },
    { icon: Code2, label: "XSS", color: "text-cyber-attack" },
    { icon: KeyRound, label: "CSRF", color: "text-cyber-attack" },
  ];
  const defenses = [
    { icon: Shield, label: "Input Validation", color: "text-cyber-defense" },
    { icon: Lock, label: "CSP", color: "text-cyber-defense" },
    { icon: Server, label: "Param Queries", color: "text-cyber-defense" },
  ];
  return (
    <div className="relative h-[500px]">
      {/* Central server core */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative grid size-40 place-items-center rounded-2xl border border-cyber-cyan/40 bg-gradient-to-br from-cyber-navy via-cyber-purple/30 to-cyber-navy backdrop-blur-md">
          <div className="absolute inset-0 rounded-2xl bg-cyber-cyan/10 animate-pulse-glow" />
          <Server className="relative size-14 text-cyber-cyan" />
          <span className="absolute -bottom-3 rounded-full bg-cyber-cyan px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-cyber-navy">
            SERVER CORE
          </span>
          {/* Orbit ring */}
          <motion.div
            className="absolute inset-[-20px] rounded-full border border-dashed border-cyber-cyan/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>

      {/* Attack cards floating left */}
      {attacks.map((a, i) => (
        <motion.div
          key={a.label}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
          transition={{
            opacity: { delay: 0.3 + i * 0.15 },
            x: { delay: 0.3 + i * 0.15 },
            y: { duration: 3 + i, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute"
          style={{ left: `${4 + i * 3}%`, top: `${10 + i * 28}%` }}
        >
          <FloatingCard icon={a.icon} label={a.label} variant="attack" />
        </motion.div>
      ))}

      {/* Defense cards floating right */}
      {defenses.map((d, i) => (
        <motion.div
          key={d.label}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
          transition={{
            opacity: { delay: 0.5 + i * 0.15 },
            x: { delay: 0.5 + i * 0.15 },
            y: { duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: 0.7 },
          }}
          className="absolute"
          style={{ right: `${4 + i * 3}%`, top: `${14 + i * 28}%` }}
        >
          <FloatingCard icon={d.icon} label={d.label} variant="defense" />
        </motion.div>
      ))}
    </div>
  );
}

function FloatingCard({
  icon: Icon,
  label,
  variant,
}: {
  icon: typeof Shield;
  label: string;
  variant: "attack" | "defense";
}) {
  const cls =
    variant === "attack"
      ? "border-cyber-attack/50 bg-cyber-attack/10 text-cyber-attack shadow-[0_0_24px_-8px_var(--cyber-attack)]"
      : "border-cyber-defense/50 bg-cyber-defense/10 text-cyber-defense shadow-[0_0_24px_-8px_var(--cyber-defense)]";
  return (
    <div className={`flex w-40 items-center gap-2.5 rounded-xl border p-3 backdrop-blur-md ${cls}`}>
      <Icon className="size-5 shrink-0" />
      <div className="min-w-0">
        <p className="truncate text-xs font-semibold">{label}</p>
        <p className="font-mono text-[10px] uppercase tracking-wider opacity-70">
          {variant === "attack" ? "Threat" : "Mitigation"}
        </p>
      </div>
    </div>
  );
}
