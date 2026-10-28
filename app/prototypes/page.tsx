"use client";

import Link from "next/link";
import { MockZikiHeader } from "./mock-ziki-header";

export default function PrototypesHubPage() {
  const concepts = [
    {
      id: "pipeline-perch",
      number: "01",
      title: "The Pipeline Perch",
      subtitle: "Mini Robot Teammates Sitting on Stage Tabs",
      href: "/prototypes/pipeline-perch",
      badge: "Highest Praise Potential",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
      description:
        "Directly inspired by Mark Essien's praise of the 'little robot crew' in Call 5. Active agents physically perch atop the pipeline tab where they are currently working. When blocked, they wave a speech bubble requesting human consensus.",
      features: [
        "Expressive animated avatars (Kora & Leto) with idle breathing & blinking",
        "Waving speech bubbles right on 'In progress' & 'Ready to Merge'",
        "1-Click Decision Flyout: answer the blocker without navigating away",
        "Celebration animation (confetti & robot cheer) when unblocked",
      ],
      icon: "🤖",
      colorGradient: "from-amber-500/10 to-orange-500/10 border-amber-200",
      accentButton: "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-500/20",
    },
    {
      id: "firefly-beacon",
      number: "02",
      title: "The Firefly Beacon",
      subtitle: "Playful Ambient Glows & Contextual Spotlights",
      href: "/prototypes/firefly-beacon",
      badge: "Subtle & Non-Intrusive",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
      description:
        "An elegant, tech-modern evolution of the butterfly metaphor. Soft glowing fireflies and color prisms hover over stages requiring human presence. Non-intrusive, dismissible, and beautiful.",
      features: [
        "Amber Firefly for logic/architecture questions on 'In progress'",
        "Rainbow Color Prism for visual design reviews on 'Ready to Merge'",
        "Gentle pulse radar that smoothly draws the eye without clutter",
        "Interactive popover with 1-click spotlight directly on the target issue",
      ],
      icon: "✨",
      colorGradient: "from-blue-500/10 to-indigo-500/10 border-blue-200",
      accentButton: "bg-electric-blue-strong hover:bg-electric-blue text-white shadow-electric-blue/20",
    },
    {
      id: "stream-flow",
      number: "03",
      title: "The Stream Flow",
      subtitle: "Continuous Conveyor & Fast-Track Express Tray",
      href: "/prototypes/stream-flow",
      badge: "High-Speed Merge Velocity",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      description:
        "Transforms the pipeline into an intuitive assembly line with glowing flow connectors. An interactive 'Tollgate / Express Lane' button allows humans to unblock all merge decisions in under 10 seconds via a slide-out drawer.",
      features: [
        "Strict end-to-end lifecycle: Drafts ➔ Ideas ➔ Open ➔ In Progress ➔ Ready to Merge ➔ Live",
        "Express Lane badge: '2 Agents Waiting for Human Wisdom'",
        "Slide-out quick review tray that bypasses the 278 regular issues",
        "Accelerates Mark's vision for rapid automated merging into production",
      ],
      icon: "🚀",
      colorGradient: "from-emerald-500/10 to-teal-500/10 border-emerald-200",
      accentButton: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20",
    },
  ];

  return (
    <div>
      <MockZikiHeader />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Hero Section */}
        <div className="mb-10 text-center sm:text-left sm:flex sm:items-end sm:justify-between border-b border-zk-border pb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-zk-border bg-zk-tint px-3 py-1 text-xs font-bold text-zk-accent mb-3">
              <span>🎯</span> HNG 15 Week 5 · Ziki Issue Tracker Innovation
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zk-text">
              Whimsical Pipeline Prototypes
            </h1>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-zk-muted">
              Addressing Mark Essien&apos;s design review: eliminating disconnected sub-tabs, 
              moving <span className="font-semibold text-zk-text">Drafts</span> and <span className="font-semibold text-zk-text">Ideas</span> to their rightful place, and adding purposeful, delightful micro-interactions.
            </p>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center justify-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold text-zk-text2">3 Live Interactive Demos</span>
          </div>
        </div>

        {/* Mark's Core Criteria Alert */}
        <div className="mb-10 rounded-2xl border border-zk-border bg-zk-surface p-5 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-electric-blue text-white text-base font-bold">
              💡
            </div>
            <div>
              <h2 className="text-sm font-bold text-zk-text">
                Key Design Mandates from Mark Essien&apos;s Review
              </h2>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-zk-text2">
                <div className="rounded-xl border border-zk-divider bg-zk-chip/40 p-3">
                  <span className="font-extrabold text-zk-text block mb-1">1. Keep Scope Small & Focused</span>
                  Do not redesign the whole app. Pick one high-leverage component (the pipeline & input alerts) and make it extraordinary.
                </div>
                <div className="rounded-xl border border-zk-divider bg-zk-chip/40 p-3">
                  <span className="font-extrabold text-zk-text block mb-1">2. Whimsy with Real Purpose</span>
                  No useless &ldquo;movie shows&rdquo; or spiders. Animations must convey active agent state and make human decisions fast.
                </div>
                <div className="rounded-xl border border-zk-divider bg-zk-chip/40 p-3">
                  <span className="font-extrabold text-zk-text block mb-1">3. Eliminate Merge Bottlenecks</span>
                  Surface only what needs a human decision. Agents do the work; humans just clear the forks.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Prototype Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {concepts.map((concept) => (
            <div
              key={concept.id}
              className={`flex flex-col justify-between rounded-2xl border bg-gradient-to-b ${concept.colorGradient} bg-zk-surface p-6 shadow-xs hover:shadow-lg transition-all duration-200`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-3xl">{concept.icon}</span>
                  <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${concept.badgeColor}`}>
                    {concept.badge}
                  </span>
                </div>

                <div className="text-xs font-mono font-bold text-zk-muted">
                  CONCEPT {concept.number}
                </div>
                <h3 className="text-xl font-extrabold text-zk-text mt-0.5">
                  {concept.title}
                </h3>
                <p className="text-xs font-semibold text-zk-accent mt-0.5">
                  {concept.subtitle}
                </p>

                <p className="mt-3 text-xs text-zk-muted leading-relaxed">
                  {concept.description}
                </p>

                <div className="mt-4 pt-4 border-t border-zk-border/60">
                  <span className="text-[11px] font-bold text-zk-text uppercase tracking-wider block mb-2">
                    Key Micro-Interactions:
                  </span>
                  <ul className="space-y-1.5 text-xs text-zk-text2">
                    {concept.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-electric-blue font-bold">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zk-border/40">
                <Link
                  href={concept.href}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs font-bold transition-all shadow-md ${concept.accentButton}`}
                >
                  <span>Launch {concept.title}</span>
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-xs text-zk-muted">
          Built for presentation to tutors & mentors. All 3 concepts run completely self-contained with live interactive state.
        </div>
      </div>
    </div>
  );
}
