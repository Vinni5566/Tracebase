import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Volume2, VolumeX } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { useSound } from "@/hooks/useSound";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/paths", label: "Learning Paths" },
  { to: "/missions", label: "Missions" },
  { to: "/achievements", label: "Achievements" },
  { to: "/community", label: "Community" },
  { to: "/about", label: "About" },
] as const;

export function TopNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { muted, toggleMute, playHover, playSelect } = useSound();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "border-b border-cyber-cyan/30 bg-background/80 backdrop-blur-xl shadow-[0_4px_30px_-10px_rgba(0,0,0,0.5)]" : "border-b border-transparent bg-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                onMouseEnter={playHover}
                onClick={playSelect}
                className={`group relative rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ${
                  active ? "text-cyber-cyan text-shadow-cyan" : "text-muted-foreground hover:text-cyber-cyan hover:text-shadow-cyan"
                }`}
              >
                {l.label}
                <span className={`absolute bottom-0 left-0 h-[2px] w-full origin-left bg-cyber-cyan transition-transform duration-300 ${active ? "scale-x-100 shadow-[0_0_8px_var(--cyber-cyan)]" : "scale-x-0 group-hover:scale-x-100 group-hover:shadow-[0_0_8px_var(--cyber-cyan)]"}`} />
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleMute} className="text-muted-foreground hover:text-foreground">
            {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </Button>
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex" onMouseEnter={playHover} onClick={playSelect}>
            <Link to="/achievements">Achievements</Link>
          </Button>
          <Button asChild size="sm" variant="cyber" onMouseEnter={playHover} onClick={playSelect}>
            <Link to="/arena">Enter Arena</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
