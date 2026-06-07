import type { ReactNode } from "react";

/**
 * Holographic card with neon edge lighting, HUD corners, and a hover shine sweep.
 * Wrap in `group` to enable shine on hover (default included).
 */
export function HoloCard({
  children,
  className = "",
  tone = "cyan",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  tone?: "cyan" | "purple" | "gold";
  as?: "div" | "article" | "section";
}) {
  const edge =
    tone === "purple" ? "neon-edge-purple" : tone === "gold" ? "neon-edge-gold" : "neon-edge-cyan";
  return (
    <Tag className={`group relative holo-card ${edge} hud-corners rounded-2xl ${className}`}>
      <span className="holo-shine" aria-hidden />
      {children}
    </Tag>
  );
}
