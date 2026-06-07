import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Route as RouteIcon, Layers, Trophy, Settings, Users } from "lucide-react";
import { Logo } from "./Logo";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/paths", label: "Learning Paths", icon: RouteIcon },
  { to: "/missions", label: "Missions", icon: Layers },
  { to: "/achievements", label: "Achievements", icon: Trophy },
  { to: "/community", label: "Community", icon: Users },
] as const;

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 border-r border-border/60 bg-sidebar/80 backdrop-blur-xl lg:flex lg:flex-col">
      <div className="flex h-16 items-center border-b border-border/60 px-5">
        <Logo />
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {items.map((item) => {
          const active = pathname === item.to || (item.to !== "/dashboard" && pathname.startsWith(item.to));
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                active
                  ? "bg-cyber-cyan/10 text-cyber-cyan shadow-[inset_0_0_0_1px_var(--cyber-cyan)]"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
              }`}
            >
              {active && <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r bg-cyber-cyan shadow-[0_0_12px_var(--cyber-cyan)]" />}
              <Icon className="size-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

    </aside>
  );
}
