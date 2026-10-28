"use client";

import Link from "next/link";

export function MockZikiHeader() {
  return (
    <div className="border-b border-zk-border bg-zk-surface px-6 py-2.5">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Left branding & Workspace */}
        <div className="flex items-center gap-6">
          <Link href="/prototypes" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-electric-blue text-white font-extrabold text-sm shadow-sm">
              Z
            </span>
            <span className="text-xl font-black tracking-tight text-zk-text">ziki</span>
          </Link>

          <div className="flex items-center gap-1.5 rounded-lg border border-zk-border bg-zk-chip/50 px-2.5 py-1 text-xs font-bold text-zk-text">
            <span>Ziki</span>
            <svg className="h-3 w-3 text-zk-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <button className="flex items-center gap-1.5 rounded-full bg-zk-tint px-3 py-1 text-xs font-bold text-zk-accent border border-zk-border/50">
              <span className="h-2 w-2 rounded-full bg-electric-blue" />
              Product
            </button>
            <button className="rounded-full px-3 py-1 text-xs font-semibold text-zk-muted hover:text-zk-text">
              Marketing
            </button>
            <button className="rounded-full px-3 py-1 text-xs font-semibold text-zk-muted hover:text-zk-text">
              Security
            </button>
          </nav>
        </div>

        {/* Right user profile & status */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 rounded-full border border-zk-border bg-zk-surface px-3 py-1 text-xs font-bold text-zk-text hover:bg-zk-chip shadow-xs">
            <span className="text-sm">🤖</span>
            <span>Agents</span>
            <span className="rounded-full bg-zk-ok-bg px-1.5 text-[10px] text-zk-ok-fg font-extrabold">2 active</span>
          </button>

          <div className="flex items-center gap-2 rounded-full border border-zk-border bg-zk-surface py-1 pl-1 pr-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-[11px] font-bold text-white shadow-xs">
              FD
            </div>
            <span className="text-xs font-bold text-zk-text">faith dombe</span>
          </div>

          <div className="flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-extrabold text-amber-700">
            <span>🏆</span>
            <span>3,019.71 pts</span>
          </div>

          <button className="relative flex h-8 w-8 items-center justify-center rounded-full border border-zk-border bg-zk-surface text-zk-muted hover:text-zk-text shadow-xs">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
              2
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
