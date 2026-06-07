import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { Lock, CheckCircle2, Play } from "lucide-react";
import { AppShell } from "@/components/cyber/AppShell";
import { PageHeader } from "@/components/cyber/PageHeader";
import { learningPaths, decks } from "@/lib/mock-data";
import { useGameState } from "@/hooks/useGameState";

// Maps each path ID → the deck categories that belong to it.
// When a new mission JSON is added with a matching category, its path appears automatically.
export const PATH_CATEGORIES: Record<string, string[]> = {
  owasp:  ["INJECTION", "BROKEN-AUTH", "SSRF", "IDOR", "CRYPTO"],
  web:    ["CLIENT-SIDE", "NETWORK", "CORS", "CLICKJACKING"],
  api:    ["API", "REST", "GRAPHQL", "BOLA"],
  cloud:  ["CLOUD", "IAM", "S3", "METADATA"],
  auth:   ["AUTH", "MFA", "SESSION", "OAUTH"],
};

export const Route = createFileRoute("/paths")({
  head: () => ({ meta: [{ title: "Campaign Map — ThreatForge" }, { name: "description", content: "Operate across cyber-defense campaigns." }] }),
  component: PathsPage,
});

const colorMap = {
  cyan: { ring: "ring-cyber-cyan", text: "text-cyber-cyan", bg: "bg-cyber-cyan", glow: "shadow-[0_0_24px_var(--cyber-cyan)]" },
  purple: { ring: "ring-cyber-purple", text: "text-cyber-purple", bg: "bg-cyber-purple", glow: "shadow-[0_0_24px_var(--cyber-purple)]" },
  defense: { ring: "ring-cyber-defense", text: "text-cyber-defense", bg: "bg-cyber-defense", glow: "shadow-[0_0_24px_var(--cyber-defense)]" },
  attack: { ring: "ring-cyber-attack", text: "text-cyber-attack", bg: "bg-cyber-attack", glow: "shadow-[0_0_24px_var(--cyber-attack)]" },
  gold: { ring: "ring-cyber-gold", text: "text-cyber-gold", bg: "bg-cyber-gold", glow: "shadow-[0_0_24px_var(--cyber-gold)]" },
} as const;

function PathsPage() {
  const { state } = useGameState();

  return (
    <AppShell>
      <PageHeader
        eyebrow="// campaigns"
        title="Campaign map"
        description="Each campaign is a chained series of missions. Clear nodes to unlock the next sector."
      />

      <div className="space-y-10">
        {learningPaths.map((p, idx) => {
          const missionsForPath = decks.filter(d => (PATH_CATEGORIES[p.id] ?? []).includes(d.category));
          const isPathActive = missionsForPath.length > 0;
          const Icon = (Icons as unknown as Record<string, typeof Icons.Shield>)[p.icon] ?? Icons.Shield;
          const c = colorMap[p.color];
          
          // Use real mission count for active paths, or a mock number (like 5) for locked coming-soon paths
          const nodes = isPathActive ? missionsForPath.length : 5;
          const completed = Math.min(nodes, state.pathsProgress[p.id] || 0);
          const progressPercent = nodes > 0 ? Math.round((completed / nodes) * 100) : 0;
          const currentMissionIdx = Math.min(completed, Math.max(0, nodes - 1));
          
          // Get the actual mission title from the JSON
          const currentMissionStr = isPathActive && missionsForPath[currentMissionIdx] 
            ? missionsForPath[currentMissionIdx].title 
            : missionName(p.id, currentMissionIdx);
          
          const availableMissionsForPath = missionsForPath.filter(d => !state.missionsCompleted.includes(d.id));
          const nextMissionId = availableMissionsForPath.length > 0 ? availableMissionsForPath[0].id : (missionsForPath[0]?.id || "sqli");

          return (
            <motion.section
              key={p.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className={`relative overflow-hidden rounded-2xl holo-card hud-corners p-5 sm:p-7 transition-shadow ${isPathActive ? `hover:shadow-[0_0_40px_-10px_var(--${c.ring.replace('ring-', '')})]` : 'opacity-60'} ${completed === nodes && isPathActive ? c.glow : ''}`}
            >
              <span className="holo-shine" aria-hidden />
              
              {!isPathActive && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/60 backdrop-blur-[2px]">
                  <div className="flex items-center gap-2 rounded-full border border-border/50 bg-background/80 px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground shadow-xl">
                    <Lock className="size-4" /> Coming Soon
                  </div>
                </div>
              )}

              {/* sector header */}
              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className={`grid size-14 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-current/20 to-transparent ring-1 ${c.ring}/50 ${c.text}`}>
                    <Icon className="size-7" />
                  </span>
                  <div className="min-w-0">
                    <p className={`font-mono text-[10px] uppercase tracking-[0.25em] ${c.text}`}>// SECTOR-{String(idx + 1).padStart(2, "0")} · {p.difficulty}</p>
                    <h2 className="mt-1 text-2xl font-bold">{p.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Current Target: <span className="font-medium text-foreground">{!isPathActive ? "N/A" : completed === nodes ? "Sector Cleared" : currentMissionStr}</span></p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">COMPLETION</p>
                  <p className={`font-mono text-3xl font-bold tabular-nums ${c.text}`}>{progressPercent}<span className="text-base text-muted-foreground">%</span></p>
                </div>
              </div>

              {/* Mission path */}
              <div className="relative mt-8 overflow-x-auto pb-2">
                <div className="relative flex min-w-max items-center gap-0 px-2">
                  {/* base track */}
                  <div className="absolute left-8 right-8 top-1/2 h-0.5 -translate-y-1/2 bg-border/60" />
                  {/* progress track */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: nodes <= 1 ? (completed >= 1 ? '100%' : '0%') : `calc(${(completed / (nodes - 1)) * 100}% - 4rem * ${(completed / (nodes - 1))})` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={`absolute left-8 top-1/2 h-0.5 -translate-y-1/2 ${c.bg} ${c.glow}`}
                    style={{ maxWidth: "calc(100% - 4rem)" }}
                  />
                  {Array.from({ length: nodes }).map((_, i) => {
                    const isDone = isPathActive && i < completed;
                    const isCurrent = isPathActive && i === completed;
                    const isLocked = !isPathActive || i > completed;
                    return (
                      <div key={i} className="relative z-10 flex flex-col items-center" style={{ width: "calc(100% / 8)", minWidth: 110 }}>
                        <motion.div whileHover={!isLocked ? { scale: 1.1 } : {}}>
                          <Link
                            to={!isLocked && isPathActive && missionsForPath[i] ? "/lesson/$id" : "/paths"}
                            params={!isLocked && isPathActive && missionsForPath[i] ? { id: missionsForPath[i].id } : undefined}
                            title={isLocked ? "Mission coming soon" : isCurrent ? "Current Mission" : "Mission Cleared"}
                            disabled={isLocked}
                            className={`group/node relative grid size-12 place-items-center rounded-full border-2 backdrop-blur transition-all ${
                              isDone
                                ? `bg-cyber-defense/20 border-cyber-defense text-cyber-defense shadow-[0_0_15px_var(--cyber-defense)]`
                                : isCurrent
                                ? `bg-background border-cyber-cyan text-cyber-cyan shadow-[0_0_15px_var(--cyber-cyan)] animate-node-pulse`
                                : "bg-background border-border/40 text-muted-foreground/40 opacity-60 cursor-not-allowed"
                            }`}
                          >
                            {isDone ? (
                              <CheckCircle2 className="size-5" />
                            ) : isCurrent ? (
                              <Play className="size-4 fill-current ml-0.5" />
                            ) : (
                              <Lock className="size-4" />
                            )}
                            {isCurrent && (
                              <span className="absolute -bottom-7 whitespace-nowrap rounded bg-cyber-navy px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-cyber-cyan ring-1 ring-cyber-cyan/40">
                                CURRENT
                              </span>
                            )}
                          </Link>
                        </motion.div>
                        <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">M-{String(i + 1).padStart(2, "0")}</p>
                        <p className={`mt-0.5 text-xs text-center ${isDone ? "text-foreground" : isCurrent ? "text-cyber-cyan font-medium" : "text-muted-foreground/40"}`}>
                          {isPathActive && missionsForPath[i] ? missionsForPath[i].title : missionName(p.id, i)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border/40 pt-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-4 font-mono">
                  <span><span className={c.text}>{completed}</span>/{nodes} missions cleared</span>
                  <span className="text-border">·</span>
                  <span>{p.lessons} ops total</span>
                </div>
                <Link to={isPathActive && completed < nodes ? `/lesson/$id` : `/paths`} params={isPathActive && completed < nodes ? { id: nextMissionId } : undefined} className={`inline-flex items-center gap-2 rounded-md border ${c.ring}/40 ${c.text} px-3 py-1.5 text-xs font-medium transition-all ${isPathActive ? 'hover:bg-current/10' : 'opacity-50 pointer-events-none'} ${completed === nodes && isPathActive ? 'opacity-50 pointer-events-none' : ''}`}>
                  <Play className="size-3.5 fill-current" /> {!isPathActive ? 'Inactive' : completed === nodes ? 'Sector Cleared' : 'Deploy to sector'}
                </Link>
              </div>
            </motion.section>
          );
        })}
      </div>
    </AppShell>
  );
}

function missionName(pathId: string, i: number) {
  const sets: Record<string, string[]> = {
    owasp: ["Recon", "Injection", "AuthBypass", "XSS Trap", "SSRF Hunt", "Crypto Fail", "IDOR", "Boss"],
    web: ["Cookies", "CORS", "CSP", "XSS-101", "CSRF", "Clickjack", "HSTS", "Boss"],
    api: ["Schema", "BOLA", "Mass-Assign", "JWT Heist", "Rate-Limit", "GraphQL", "Replay", "Boss"],
    cloud: ["IAM", "S3-Leak", "Metadata", "Lateral", "Logs", "KMS", "Egress", "Boss"],
    auth: ["Hashing", "Sessions", "MFA", "OAuth", "OIDC", "Passkeys", "SSO", "Boss"],
  };
  return (sets[pathId] ?? ["Op", "Op", "Op", "Op", "Op", "Op", "Op", "Boss"])[i] ?? "Op";
}
