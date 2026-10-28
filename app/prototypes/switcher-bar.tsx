"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SwitcherBar() {
  const pathname = usePathname();

  const links = [
    { href: "/prototypes", label: "Showcase Hub", badge: "Overview" },
    { href: "/prototypes/pipeline-perch", label: "Idea 1: Pipeline Perch", badge: "Mascots" },
    { href: "/prototypes/firefly-beacon", label: "Idea 2: Firefly Beacon", badge: "Ambient" },
    { href: "/prototypes/stream-flow", label: "Idea 3: Stream Flow", badge: "Express Lane" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-zk-border bg-zk-surface/95 backdrop-blur-md px-4 py-2.5 shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-electric-blue to-purple-600 text-white font-bold shadow-md shadow-electric-blue/20">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold tracking-tight text-zk-text">
                Ziki Innovation Lab
              </span>
              <span className="rounded-full bg-zk-tint px-2 py-0.5 text-[10px] font-bold text-zk-accent border border-zk-border">
                Faith Dombe · HNG15
              </span>
            </div>
            <p className="text-[11px] text-zk-muted hidden sm:block">
              3 Whimsical Pipeline Prototypes answering Mark Essien&apos;s Review
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-1.5" aria-label="Prototype switcher">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                  isActive
                    ? "bg-electric-blue-strong text-white shadow-md shadow-electric-blue/25 scale-[1.02]"
                    : "border border-zk-border bg-zk-chip/60 text-zk-text hover:bg-zk-tint hover:text-zk-accent"
                }`}
              >
                <span>{link.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[9px] uppercase tracking-wider ${
                    isActive ? "bg-white/20 text-white" : "bg-zk-border/60 text-zk-muted"
                  }`}
                >
                  {link.badge}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
