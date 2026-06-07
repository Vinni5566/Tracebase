import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  AlertTriangle, Target, Globe, Users, Code2, BookOpen,
  Shield, Zap, Lock, Server, Github, GitPullRequest, CircleDot,
  ArrowRight, CheckCircle2,
} from "lucide-react";
import { CyberBackground } from "@/components/cyber/CyberBackground";
import { TopNav } from "@/components/cyber/TopNav";
import { Logo } from "@/components/cyber/Logo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ThreatForge" },
      { name: "description", content: "Why ThreatForge exists: the mission, the problem, and the vision behind an open-source cybersecurity training platform." },
    ],
  }),
  component: AboutPage,
});

// ── Shared section wrapper ────────────────────────────────────────────────
function Section({
  children, className = "",
}: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-3xl border bg-card/50 backdrop-blur-lg ${className}`}
    >
      {children}
    </motion.section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-cyber-cyan/30 bg-cyber-cyan/10 px-3 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-cyber-cyan">
      {children}
    </span>
  );
}

function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <CyberBackground intensity="subtle" />

      {/* ── Nav ── */}
      <TopNav />

      <main className="mx-auto max-w-5xl px-4 pb-32 pt-10 sm:px-6">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <Tag>// mission log</Tag>
          <h1 className="mt-6 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Why{" "}
            <span className="bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-cyan bg-clip-text text-transparent">
              ThreatForge
            </span>{" "}
            Exists
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            Most developers learn how to build software.{" "}
            <strong className="font-semibold text-foreground">
              Few learn how to defend it.
            </strong>
          </p>

          {/* Decorative HUD line */}
          <div className="mx-auto mt-10 flex max-w-md items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyber-cyan/50 to-transparent" />
            <Shield className="size-4 text-cyber-cyan/60" />
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyber-cyan/50 to-transparent" />
          </div>
        </motion.div>

        {/* ── The Problem ──────────────────────────────────────────────── */}
        <Section className="mb-10 border-cyber-attack/30 p-8 sm:p-12">
          <div className="absolute -right-24 -top-24 size-72 rounded-full bg-cyber-attack/8 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyber-attack/40 to-transparent" />

          <div className="relative z-10">
            <div className="mb-6 flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-2xl bg-cyber-attack/15 ring-1 ring-cyber-attack/40">
                <AlertTriangle className="size-6 text-cyber-attack" />
              </span>
              <Tag>// the problem</Tag>
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Security is the gap no one talks about.
            </h2>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-cyber-attack">
                  What most programs teach
                </p>
                <ul className="space-y-2.5">
                  {["Web development", "Mobile development", "Databases & SQL", "Cloud deployment", "System design"].map(item => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                      <CheckCircle2 className="size-4 shrink-0 text-cyber-defense" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-cyber-attack">
                  What is often skipped
                </p>
                <ul className="space-y-2.5">
                  {["Common vulnerability classes", "Attack vectors and techniques", "Secure coding practices", "Defensive architecture", "How attackers think"].map(item => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <Lock className="size-4 shrink-0 text-cyber-attack" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
              As a result, many developers can ship applications — but may not understand how attackers approach them.
              Security becomes something you learn <em>after</em> a breach, not before one.
            </p>
          </div>
        </Section>

        {/* ── Why We Built It ──────────────────────────────────────────── */}
        <Section className="mb-10 border-cyber-cyan/30 p-8 sm:p-12">
          <div className="absolute -left-24 top-0 size-64 rounded-full bg-cyber-cyan/8 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-6 flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-2xl bg-cyber-cyan/15 ring-1 ring-cyber-cyan/40">
                <Target className="size-6 text-cyber-cyan" />
              </span>
              <Tag>// why we built it</Tag>
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Security learning should feel like a mission, not a lecture.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
              ThreatForge was built to make cybersecurity education <strong className="text-foreground">practical, interactive, and genuinely engaging</strong> —
              not a passive playlist of videos or walls of documentation that takes months to read.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Zap,      label: "Interactive Missions",   desc: "Learn by doing, not by watching." },
                { icon: Target,   label: "Real Attack Scenarios",  desc: "Based on actual vulnerability classes." },
                { icon: Shield,   label: "Instant Feedback",       desc: "Know what worked, and why." },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="rounded-2xl border border-border/50 bg-background/40 p-5">
                  <Icon className="mb-3 size-5 text-cyber-cyan" />
                  <p className="text-sm font-semibold">{label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Why Cybersecurity Matters ─────────────────────────────────── */}
        <Section className="mb-10 border-cyber-purple/30 p-8 sm:p-12">
          <div className="absolute -right-16 bottom-0 size-60 rounded-full bg-cyber-purple/10 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-6 flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-2xl bg-cyber-purple/15 ring-1 ring-cyber-purple/40">
                <Server className="size-6 text-cyber-purple" />
              </span>
              <Tag>// why it matters</Tag>
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              As software grows, so does the attack surface.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Modern applications expose APIs, run on shared cloud infrastructure, handle sensitive user data,
              and integrate dozens of third-party services. Every layer is a potential entry point.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Code2,   label: "Application Security" },
                { icon: Server,  label: "API Security"         },
                { icon: Lock,    label: "Authentication"       },
                { icon: Globe,   label: "Cloud Security"       },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 rounded-xl border border-cyber-purple/25 bg-cyber-purple/5 px-4 py-3">
                  <Icon className="size-4 shrink-0 text-cyber-purple" />
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Security is not an add-on. It is a fundamental skill that every developer should have access to — in a format that actually sticks.
            </p>
          </div>
        </Section>

        {/* ── Vision ──────────────────────────────────────────────────── */}
        <Section className="mb-10 border-cyber-gold/30 bg-gradient-to-br from-cyber-gold/5 via-card/50 to-transparent p-8 sm:p-12">
          <div className="relative z-10">
            <div className="mb-6 flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-2xl bg-cyber-gold/15 ring-1 ring-cyber-gold/40">
                <Globe className="size-6 text-cyber-gold" />
              </span>
              <Tag>// the vision</Tag>
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Every developer understands security before they deploy.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Not every developer needs to become a security engineer. But every developer who ships software
              should understand the basics: what SQL injection is, why JWTs expire, how CSRF works.
              ThreatForge is built to get them there — fast, clearly, and practically.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Open Source",       desc: "Every line is public, auditable, and forkable."   },
                { label: "Community Driven",  desc: "Anyone can add missions, paths, or translations." },
                { label: "Globally Accessible",desc: "Free to use. No paywalls on core education."   },
              ].map(({ label, desc }) => (
                <div key={label} className="rounded-2xl border border-cyber-gold/20 bg-cyber-gold/5 p-5">
                  <p className="font-semibold text-cyber-gold">{label}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Open Source Mission ──────────────────────────────────────── */}
        <Section className="mb-10 border-cyber-defense/30 p-8 sm:p-12">
          <div className="absolute -left-20 -bottom-20 size-64 rounded-full bg-cyber-defense/8 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-6 flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-2xl bg-cyber-defense/15 ring-1 ring-cyber-defense/40">
                <BookOpen className="size-6 text-cyber-defense" />
              </span>
              <Tag>// open source</Tag>
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built to grow through contributors.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
              ThreatForge uses a modular JSON-driven content architecture. Adding a new mission requires
              creating one file — no application code changes needed. That makes contributions trivially easy
              and the platform infinitely extensible.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {[
                "New missions",
                "New learning paths",
                "New lessons",
                "Translations",
                "UI themes",
                "Bug fixes & improvements",
              ].map(item => (
                <div key={item} className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-background/40 px-4 py-2.5 text-sm">
                  <span className="text-cyber-defense">›</span>
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-border/40 bg-background/30 p-5 font-mono text-xs text-muted-foreground">
              <p className="text-cyber-cyan">// Example: Adding a new mission takes one file</p>
              <p className="mt-2">src/content/missions/<span className="text-cyber-gold">jwt-heist.json</span></p>
              <p className="mt-1 opacity-60">{"{ id, title, category, difficulty, lesson, arena }"}</p>
            </div>
          </div>
        </Section>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-cyber-cyan/30 bg-gradient-to-br from-cyber-cyan/10 via-card/60 to-cyber-purple/10 p-12 text-center backdrop-blur-lg"
        >
          <div className="absolute inset-0 cyber-grid opacity-10" />
          <div className="absolute -right-20 -top-20 size-64 rounded-full bg-cyber-purple/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-cyber-cyan/15 blur-3xl" />

          <div className="relative z-10">
            <Users className="mx-auto mb-5 size-9 text-cyber-cyan" />
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Help Build ThreatForge
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
              Every mission, every lesson, every line of this platform can be improved by someone in the community.
              That someone could be you.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="cyber" size="lg">
                <a href="https://github.com/Vinni5566/cyberpunk-defense-lab" target="_blank" rel="noreferrer">
                  <Github className="mr-2 size-4" /> Explore Repository
                </a>
              </Button>
              <Button asChild variant="outlineGlow" size="lg">
                <a href="https://github.com/Vinni5566/cyberpunk-defense-lab/blob/main/CONTRIBUTING.md" target="_blank" rel="noreferrer">
                  <GitPullRequest className="mr-2 size-4" /> Contribute
                </a>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <a href="https://github.com/Vinni5566/cyberpunk-defense-lab/issues" target="_blank" rel="noreferrer">
                  <CircleDot className="mr-2 size-4" /> View Open Issues
                </a>
              </Button>
            </div>

            <div className="mt-10 border-t border-border/40 pt-8">
              <Link to="/missions" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-cyber-cyan">
                Ready to train? View missions <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </motion.div>

      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-border/40">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-3">
            <Logo compact />
            <span>© {new Date().getFullYear()} ThreatForge. MIT licensed.</span>
          </div>
          <div className="flex items-center gap-5">
            <Link to="/dashboard" className="transition-colors hover:text-foreground">Dashboard</Link>
            <Link to="/missions" className="transition-colors hover:text-foreground">Missions</Link>
            <Link to="/community" className="transition-colors hover:text-foreground">Community</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
