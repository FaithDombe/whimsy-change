"use client";

import Link from "next/link";
import Image from "next/image";

export function MockZikiHeader() {
  return (
    <header className="border-b border-zk-border bg-zk-surface px-4 py-2.5 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Left branding & Workspace: Z | [z] Zedu ⌵ */}
        <div className="flex items-center gap-3 sm:gap-3.5">
          <Link href="/prototypes" className="flex items-center" title="Ziki">
            <Image
              src="/brand/ziki-mark.png"
              alt="Ziki"
              width={24}
              height={24}
              unoptimized
              className="h-6 w-auto object-contain"
              priority
            />
          </Link>

          <span className="text-zk-border text-base font-light select-none">|</span>

          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-zk-border/70 bg-zk-chip/40 px-2.5 py-1 text-xs font-semibold text-zk-text hover:bg-zk-chip/70 transition-colors"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded bg-blue-100 text-electric-blue text-[10px] font-black">
              z
            </span>
            <span className="font-bold text-zk-text">Zedu</span>
            <svg className="h-3 w-3 text-zk-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Center: intentionally empty (Your App, Marketing, Security removed per design) */}

        {/* Right user profile & notifications: [Avatar] Fuety ⌵  [✉ 99+] */}
        <div className="flex items-center gap-3">
          {/* User profile dropdown pill */}
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-zk-border bg-zk-surface py-1 pl-1 pr-3 hover:bg-zk-chip/50 transition-colors shadow-2xs"
            aria-label="User menu"
          >
            <div className="relative h-6 w-6 overflow-hidden rounded-full border border-zk-border/60 bg-amber-500 shadow-xs">
              <Image
                src="/brand/fuety-avatar.png"
                alt="Fuety"
                width={24}
                height={24}
                unoptimized
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-xs font-bold text-zk-text">Fuety</span>
            <svg className="h-3 w-3 text-zk-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Mail icon with 99+ blue badge */}
          <button
            type="button"
            className="relative flex h-8 w-8 items-center justify-center text-zk-text hover:text-electric-blue transition-colors"
            aria-label="Inbox, 99+ unread messages"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="absolute -top-1 -right-1.5 flex h-4 min-w-[20px] items-center justify-center rounded-full bg-electric-blue-strong px-1 text-[9px] font-black text-white shadow-xs">
              99+
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
