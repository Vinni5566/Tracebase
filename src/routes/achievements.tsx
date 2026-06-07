import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { Lock, Sparkles, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/cyber/AppShell";
import { PageHeader } from "@/components/cyber/PageHeader";
import { Progress } from "@/components/ui/progress";
import { decks, Achievement } from "@/lib/mock-data";
import { useGameState } from "@/hooks/useGameState";
import { PATH_CATEGORIES } from "./paths";

export const Route = createFileRoute("/achievements")({
  head: () => ({ meta: [{ title: "Trophy Vault — ThreatForge" }, { name: "description", content: "Unlock legendary badges across security disciplines." }] }),
  component: AchievementsPage,
});

const rarityStyles = {
  Common: {
    ring: "ring-muted-foreground/40",
    text: "text-muted-foreground",
    glow: "",
    gradient: "from-muted-foreground/15 via-transparent to-muted-foreground/5",
    border: "border-muted-foreground/30",
    edge: "",
  },
  Rare: {
    ring: "ring-cyber-cyan/60",
    text: "text-cyber-cyan",
    glow: "shadow-[0_0_40px_-10px_var(--cyber-cyan)]",
    gradient: "from-cyber-cyan/20 via-transparent to-cyber-cyan/5",
    border: "border-cyber-cyan/40",
    edge: "neon-edge-cyan",
  },
  Epic: {
    ring: "ring-cyber-purple/70",
    text: "text-cyber-purple",
    glow: "shadow-[0_0_50px_-8px_var(--cyber-purple)]",
    gradient: "from-cyber-purple/25 via-cyber-purple/5 to-cyber-cyan/10",
    border: "border-cyber-purple/50",
    edge: "neon-edge-purple",
  },
  Legendary: {
    ring: "ring-cyber-gold/80",
    text: "text-cyber-gold",
    glow: "shadow-[0_0_70px_-6px_var(--cyber-gold)]",
    gradient: "from-cyber-gold/30 via-cyber-attack/10 to-cyber-purple/15",
    border: "border-cyber-gold/60",
    edge: "neon-edge-gold",
  },
} as const;

function AchievementsPage() {
  const { state } = useGameState();

  const dynamicAchievements: Achievement[] = [];
  const missions = state.missionsCompleted.length;
  const totalAvailableMissions = decks.length;

  if (totalAvailableMissions > 0) {
    dynamicAchievements.push({
      id: "first-defense", title: "First Defense", description: "Complete your first mission.", icon: "Shield", rarity: "Common" as const,
      unlocked: missions >= 1, progress: missions >= 1 ? 100 : 0
    });
  }

  if (totalAvailableMissions >= 3) {
    const target = Math.min(10, totalAvailableMissions);
    dynamicAchievements.push({
      id: "threat-hunter", title: "Threat Hunter", description: `Complete ${target} missions.`, icon: "Target", rarity: "Rare" as const,
      unlocked: missions >= target, progress: Math.min(100, Math.round((missions / target) * 100))
    });
  }

  const pathAchievements = [
    { id: "owasp-explorer", title: "OWASP Explorer", pathId: "owasp", icon: "Compass", rarity: "Epic" as const },
    { id: "web-defender", title: "Web Defender", pathId: "web", icon: "Globe", rarity: "Epic" as const },
    { id: "api-guardian", title: "API Guardian", pathId: "api", icon: "Cable", rarity: "Epic" as const },
    { id: "cloud-defender", title: "Cloud Defender", pathId: "cloud", icon: "Cloud", rarity: "Legendary" as const },
    { id: "auth-master", title: "Auth Master", pathId: "auth", icon: "KeyRound", rarity: "Legendary" as const },
  ];

  pathAchievements.forEach((ach) => {
    // Count how many missions actually belong to this path right now
    const availableMissionsInPath = decks.filter(d => (PATH_CATEGORIES[ach.pathId] ?? []).includes(d.category)).length;
    
    // Only show achievement if there's at least one mission to play in this path
    if (availableMissionsInPath > 0) {
      // For progress, we simply check how many missions they've completed in this path category
      const completedInPath = state.missionsCompleted.filter(id => {
        const d = decks.find(m => m.id === id);
        return d && (PATH_CATEGORIES[ach.pathId] ?? []).includes(d.category);
      }).length;

      dynamicAchievements.push({
        id: ach.id, title: ach.title, description: `Complete all ${availableMissionsInPath} missions in the ${ach.pathId.toUpperCase()} path.`,
        icon: ach.icon, rarity: ach.rarity,
        unlocked: completedInPath >= availableMissionsInPath,
        progress: Math.min(100, Math.round((completedInPath / availableMissionsInPath) * 100))
      });
    }
  });

  const unlockedCount = dynamicAchievements.filter((a) => a.unlocked).length;

  return (
    <AppShell>
      <PageHeader
        eyebrow="// trophy vault"
        title="Legendary trophies"
        description={`${unlockedCount} of ${dynamicAchievements.length} unlocked. Rarity rises from Common → Legendary.`}
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dynamicAchievements.map((a, i) => {
          const Icon = (Icons as unknown as Record<string, typeof Icons.Shield>)[a.icon] ?? Icons.Trophy;
          const r = rarityStyles[a.rarity];
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={a.unlocked ? { y: -6, rotateX: 4, rotateY: -4 } : { y: -2 }}
              transition={{ delay: i * 0.04, type: "spring", stiffness: 220, damping: 22 }}
              style={{ transformPerspective: 1000 }}
              className={`group relative overflow-hidden rounded-2xl holo-card hud-corners ${a.unlocked ? r.edge : ""} ${a.unlocked ? r.glow : "opacity-75"}`}
            >
              <span className="holo-shine" aria-hidden />
              {/* Rarity gradient backdrop */}
              <div className={`absolute inset-0 bg-gradient-to-br ${r.gradient}`} />
              {a.rarity === "Legendary" && a.unlocked && (
                <div className="absolute inset-0 cyber-grid opacity-20" />
              )}

              {/* Legendary sparkles */}
              {a.rarity === "Legendary" && a.unlocked && (
                <>
                  {[
                    { x: "15%", y: "25%", d: 0 },
                    { x: "78%", y: "18%", d: 0.6 },
                    { x: "62%", y: "70%", d: 1.2 },
                    { x: "28%", y: "78%", d: 1.8 },
                  ].map((s, k) => (
                    <motion.div
                      key={k}
                      className="absolute"
                      style={{ left: s.x, top: s.y }}
                      animate={{ opacity: [0, 1, 0], scale: [0.6, 1.2, 0.6] }}
                      transition={{ duration: 2.4, repeat: Infinity, delay: s.d }}
                    >
                      <Sparkles className="size-3 text-cyber-gold" />
                    </motion.div>
                  ))}
                </>
              )}

              <div className="relative p-5">
                <div className="flex items-start justify-between">
                  <div className={`relative grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-background to-muted ring-2 ${r.ring}`}>
                    {a.unlocked ? (
                      <>
                        <Icon className={`relative z-10 size-8 ${r.text}`} />
                        <div className={`absolute inset-0 rounded-2xl ${r.glow}`} />
                      </>
                    ) : (
                      <Lock className="size-6 text-muted-foreground" />
                    )}
                  </div>
                  <span className={`rounded-full border ${r.border} bg-background/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] ${r.text}`}>
                    {a.rarity}
                  </span>
                </div>
                <h3 className="mt-4 font-semibold">{a.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{a.description}</p>
                <div className="mt-4">
                  <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
                    <span>PROGRESS</span><span>{a.progress}%</span>
                  </div>
                  <Progress value={a.progress} className="mt-1 h-1.5" />
                </div>

                {a.unlocked && (
                  <p className={`mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] ${r.text}`}>
                    <CheckCircle2 className="size-3" /> Unlocked
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </AppShell>
  );
}
