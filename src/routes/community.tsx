import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { Github, Heart, Sparkles, FolderGit2 } from "lucide-react";
import { AppShell } from "@/components/cyber/AppShell";
import { PageHeader } from "@/components/cyber/PageHeader";
import { Button } from "@/components/ui/button";
import { contributions } from "@/lib/mock-data";

export const Route = createFileRoute("/community")({
  head: () => ({ meta: [{ title: "Community — ThreatForge" }, { name: "description", content: "Help build the open-source future of cybersecurity education." }] }),
  component: CommunityPage,
});

function CommunityPage() {
  const [stars, setStars] = useState<number | string>(0);
  const [issues, setIssues] = useState<number | string>(0);
  const [contributors, setContributors] = useState<number | string>(0);

  useEffect(() => {
    fetch("https://api.github.com/repos/Vinni5566/cyberpunk-defense-lab")
      .then((r) => r.json())
      .then((d) => {
        if (d.stargazers_count !== undefined) setStars(d.stargazers_count);
        if (d.open_issues_count !== undefined) setIssues(d.open_issues_count);
      })
      .catch(() => {
        setStars(0);
        setIssues(0);
      });

    fetch("https://api.github.com/repos/Vinni5566/cyberpunk-defense-lab/contributors?per_page=1")
      .then((r) => {
        const link = r.headers.get("link");
        if (link) {
          const match = link.match(/page=(\d+)>; rel="last"/);
          if (match) setContributors(match[1]);
          else setContributors(0);
        } else {
          setContributors(0); // Might be very few or none
        }
      })
      .catch(() => setContributors(0));
  }, []);

  return (
    <AppShell>
      <PageHeader
        eyebrow="// open source"
        title="Build ThreatForge with us"
        description="ThreatForge is community-owned. Here's how to help us ship the next chapter."
        actions={
          <>
            <Button asChild variant="outlineGlow"><a href="https://github.com/Vinni5566/cyberpunk-defense-lab" target="_blank" rel="noreferrer"><Github className="size-4" /> Explore Repository</a></Button>
          </>
        }
      />

      {/* Stats banner */}
      <div className="mb-8 grid gap-3 sm:grid-cols-4">
        {[
          { label: "Contributors", value: contributors },
          { label: "Open Issues", value: issues },
          { label: "Translations", value: "0" },
          { label: "GitHub stars", value: stars },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border/60 bg-card/70 p-4 text-center backdrop-blur"
          >
            <p className="font-mono text-2xl font-bold text-cyber-cyan">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <h2 className="mb-4 text-lg font-semibold">Ways to contribute</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {contributions.map((c, i) => {
          const Icon = (Icons as unknown as Record<string, typeof Icons.Shield>)[c.icon] ?? Sparkles;
          return (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl border border-border/60 bg-card/70 p-6 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-cyber-purple/40 hover:shadow-[0_0_30px_-10px_var(--cyber-purple)]"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-cyber-purple/20 to-cyber-cyan/10 ring-1 ring-cyber-purple/40">
                <Icon className="size-6 text-cyber-purple" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{c.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{c.description}</p>
            </motion.article>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <Button asChild variant="cyber" size="lg">
          <a href="https://github.com/Vinni5566/cyberpunk-defense-lab/blob/main/CONTRIBUTING.md" target="_blank" rel="noreferrer">
            Contribute on GitHub
          </a>
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-10 rounded-2xl border border-cyber-cyan/30 bg-gradient-to-r from-cyber-cyan/10 via-card to-cyber-purple/10 p-8 text-center"
      >
        <Heart className="mx-auto size-7 text-cyber-attack" />
        <h3 className="mt-3 text-2xl font-bold">Built by the community. Securing the next generation of developers.</h3>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          Every mission, defense, and animation in ThreatForge was contributed by someone who wanted security education to be better. Join them.
        </p>
      </motion.div>
    </AppShell>
  );
}
