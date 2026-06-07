import type { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { CyberBackground } from "./CyberBackground";
import { TopNav } from "./TopNav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <CyberBackground intensity="subtle" />
      <div className="flex">
        <AppSidebar />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <div className="lg:hidden">
            <TopNav />
          </div>
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
