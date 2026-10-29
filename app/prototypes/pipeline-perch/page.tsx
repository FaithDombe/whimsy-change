"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MockZikiHeader } from "../mock-ziki-header";

interface StageConfig {
  id: string;
  label: string;
  count: number;
  icon: string;
  hasAlert?: boolean;
}

interface IssueItem {
  id: number;
  title: string;
  tag: string;
  votes: number;
  author?: string;
  timeAgo?: string;
  description?: string;
}

export default function PipelinePerchPage() {
  // Start on "open" tab so the bot is perched on the "In progress" icon FIRST before being clicked
  const [activeStage, setActiveStage] = useState<string>("open");
  const [isAnimatingToIssue, setIsAnimatingToIssue] = useState<boolean>(false);
  const [is1440Expanded, setIs1440Expanded] = useState<boolean>(false);
  const [expandedStandardId, setExpandedStandardId] = useState<number | null>(null);
  const [resolved1440Choice, setResolved1440Choice] = useState<string | null>(null);

  const tabBotRef = useRef<HTMLDivElement | null>(null);
  const issueBotRef = useRef<HTMLDivElement | null>(null);
  const pendingOriginRef = useRef<{ left: number; top: number } | null>(null);

  // Playful Web Audio synthesizer (zero external audio files needed)
  function playSound(type: "jump" | "land" | "chime") {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === "jump") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(760, ctx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.09, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.22);
      } else if (type === "land") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.14);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.16);
      } else if (type === "chime") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch {
      // Audio autoplay may be silenced by browser policy
    }
  }

  function handleStageSelect(stageId: string) {
    if (stageId === "in_progress") {
      if (activeStage !== "in_progress") {
        if (tabBotRef.current) {
          const rect = tabBotRef.current.getBoundingClientRect();
          pendingOriginRef.current = { left: rect.left, top: rect.top };
        }
        setActiveStage("in_progress");
        setIsAnimatingToIssue(true);
      } else {
        // Already on in_progress: trigger a playful bounce
        triggerIssueHop();
      }
    } else {
      setActiveStage(stageId);
      setIsAnimatingToIssue(false);
    }
  }

  function triggerIssueHop() {
    if (!issueBotRef.current) return;
    playSound("jump");
    const keyframes = [
      { transform: "translateY(0) scale(1)", offset: 0 },
      { transform: "translateY(-18px) scale(1.15) rotate(-6deg)", offset: 0.4 },
      { transform: "translateY(0) scale(1.1, 0.9)", offset: 0.8 },
      { transform: "translateY(0) scale(1)", offset: 1 },
    ];
    issueBotRef.current.animate(keyframes, {
      duration: 380,
      easing: "cubic-bezier(0.2, 0.9, 0.3, 1)",
    });
  }

  // Smooth parabolic transition from tab icon down into issue #1440
  useEffect(() => {
    if (activeStage === "in_progress" && isAnimatingToIssue && issueBotRef.current) {
      playSound("jump");
      const to = issueBotRef.current.getBoundingClientRect();
      const from = pendingOriginRef.current;

      const deltaX = from ? from.left - to.left : 40;
      const deltaY = from ? from.top - to.top : -110;

      const keyframes = [
        { transform: `translate(${deltaX}px, ${deltaY}px) scale(0.88) rotate(0deg)`, opacity: 0.95, offset: 0 },
        { transform: `translate(${deltaX * 0.65}px, ${deltaY * 0.5 - 42}px) scale(1.24) rotate(-14deg)`, opacity: 1, offset: 0.35 },
        { transform: `translate(${deltaX * 0.25}px, ${deltaY * 0.15 - 12}px) scale(1.1) rotate(6deg)`, opacity: 1, offset: 0.75 },
        { transform: "translate(0px, 0px) scale(1.22, 0.82) rotate(0deg)", opacity: 1, offset: 0.92 },
        { transform: "translate(0px, 0px) scale(1, 1) rotate(0deg)", opacity: 1, offset: 1 },
      ];

      const anim = issueBotRef.current.animate(keyframes, {
        duration: 700,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "both",
      });

      anim.onfinish = () => {
        setIsAnimatingToIssue(false);
        pendingOriginRef.current = null;
        playSound("land");
      };
    }
  }, [activeStage, isAnimatingToIssue]);

  function handleResolve1440(choice: string) {
    playSound("chime");
    setResolved1440Choice(choice);
    setTimeout(() => {
      setIs1440Expanded(false);
    }, 1200);
  }

  const is1440Blocked = resolved1440Choice === null;

  const STAGES: StageConfig[] = [
    { id: "drafted_ideas", label: "Drafted ideas", count: 62, icon: "📝" },
    { id: "new_ideas", label: "New ideas", count: 3, icon: "💡" },
    { id: "open", label: "Open", count: 135, icon: "⭕" },
    { id: "in_progress", label: "In progress", count: is1440Blocked ? 25 : 24, icon: "⏱", hasAlert: is1440Blocked },
    { id: "done", label: "Done", count: 111, icon: "✓" },
    { id: "ready_to_merge", label: "Ready to Merge", count: 0, icon: "🔀" },
    { id: "live", label: "Live", count: 7, icon: "🚀" },
    { id: "all", label: "All", count: 278, icon: "📁" },
  ];

  const ISSUES_BY_STAGE: Record<string, IssueItem[]> = {
    open: [
      { id: 1432, title: "Clarify webhook payload schema on team invite", tag: "Triage", votes: 34, author: "Faith Dombe", timeAgo: "1h ago", description: "Payload schema for team member invitations must document the new role permission bitmap." },
      { id: 1429, title: "Allow team administrators to bulk-export audit events", tag: "Features", votes: 27, author: "Faith Dombe", timeAgo: "3h ago", description: "CSV and JSON formats requested for compliance logging." },
      { id: 1426, title: "Database connection pool starvation during spikes", tag: "Fixes", votes: 15, author: "Faith Dombe", timeAgo: "5h ago", description: "Investigating max connection lease timeout in PgBouncer pool configuration." },
    ],
    drafted_ideas: [
      { id: 1451, title: "RFC: Visual agent collaboration timeline canvas", tag: "RFC", votes: 56, author: "Faith Dombe", timeAgo: "1d ago", description: "Interactive canvas visualizing multiple autonomous agents coordinating on complex tasks." },
      { id: 1448, title: "RFC: Natural language query engine for historical bug threads", tag: "RFC", votes: 39, author: "Faith Dombe", timeAgo: "2d ago", description: "Embedding pipeline for searching through closed discussion threads." },
    ],
    new_ideas: [
      { id: 1455, title: "Idea: Voice note attachments for bug reproductions", tag: "Community", votes: 22, author: "Faith Dombe", timeAgo: "4h ago", description: "Enable engineers to record a 30s voice snippet summarizing mobile repro steps." },
      { id: 1453, title: "Idea: GitHub Actions bi-directional status sync widget", tag: "Integrations", votes: 18, author: "Faith Dombe", timeAgo: "6h ago", description: "Show live GH workflow checks inside each Ziki issue header." },
    ],
    done: [
      { id: 1428, title: "Verify 100% theme contrast on pipeline badges", tag: "Design", votes: 28, author: "Faith Dombe", timeAgo: "1d ago", description: "Contrast ratio tests passed 100% on both light and dark mode targets." },
      { id: 1419, title: "Session token refresh race condition under strict mode", tag: "Security", votes: 45, author: "Faith Dombe", timeAgo: "2d ago", description: "Patched with atomic token swap mechanism and distributed lock." },
    ],
    ready_to_merge: [
      { id: 1402, title: "PR #1402: Production deployment consensus for brand colors", tag: "Release", votes: 31, author: "Faith Dombe", timeAgo: "3h ago", description: "All CI suites and visual regression checks are passing." },
    ],
    live: [
      { id: 1385, title: "Dynamic status filter pill layout with real-time counters", tag: "Core", votes: 64, author: "Faith Dombe", timeAgo: "3d ago", description: "Deployed to production cluster with sub-50ms query latency." },
    ],
    all: [
      { id: 1440, title: "Exponential retry backoff strategy across test suites", tag: "Fixes", votes: 42, author: "Faith Dombe", timeAgo: "18m ago", description: "Agent Kora needs human sign-off on exponential retry coverage." },
      { id: 1432, title: "Clarify webhook payload schema on team invite", tag: "Triage", votes: 34, author: "Faith Dombe", timeAgo: "1h ago", description: "Payload schema for team member invitations." },
      { id: 1428, title: "Verify 100% theme contrast on pipeline badges", tag: "Design", votes: 28, author: "Faith Dombe", timeAgo: "1d ago", description: "Contrast ratio verification." },
      { id: 1421, title: "Automated webhook delivery verification and audit log sync", tag: "Core", votes: 19, author: "Faith Dombe", timeAgo: "2h ago", description: "Webhook event delivery system." },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f5f7fc] text-[#15121f]">
      {/* Real Ziki Navigation Header (Clean & authentic) */}
      <MockZikiHeader />

      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
        {/* Workspace Breadcrumbs & Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-[#5f6577]">Ziki</span>
            <span className="text-[#5f6577]">›</span>
            <h1 className="text-lg font-extrabold text-[#15121f] tracking-tight">Issues</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search issues..."
                className="h-8 w-44 sm:w-56 rounded-lg border border-[#e3e8f2] bg-white px-3 pl-8 text-xs text-[#15121f] placeholder:text-[#5f6577] shadow-2xs focus:outline-none focus:ring-1 focus:ring-[#2e6fef]"
              />
              <svg className="absolute left-2.5 top-2 h-4 w-4 text-[#5f6577]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* View toggles & filters */}
            <button
              type="button"
              aria-label="Toggle board view"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e3e8f2] bg-white text-[#5f6577] hover:text-[#15121f]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Filter issues"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e3e8f2] bg-white text-[#5f6577] hover:text-[#15121f]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Sort issues"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e3e8f2] bg-white text-[#5f6577] hover:text-[#15121f]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Create new issue"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e3e8f2] bg-white text-[#5f6577] hover:text-[#15121f] font-bold"
            >
              +
            </button>

            {/* Platform pill */}
            <div className="flex h-8 items-center gap-1.5 rounded-lg border border-[#e3e8f2] bg-white px-2.5 text-xs font-semibold text-[#5f6577]">
              <span>🖥️</span>
              <span>Platform: All</span>
              <span className="rounded-full bg-[#f0f2f7] px-1 text-xs">0</span>
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* View deleted issues */}
            <button
              type="button"
              className="h-8 rounded-lg border border-rose-200 bg-white px-3 text-xs font-bold text-rose-700 hover:bg-rose-50"
            >
              View deleted issues
            </button>
          </div>
        </div>

        {/* =========================================================================
            PIPELINE STAGE TABS
            Perched Agent Companion & Thought Bubble Badge placed directly on top of In Progress tab
            (Full clearance so it is completely visible and never covered/clipped)
            ========================================================================= */}
        <div className="pb-3 border-b border-[#e3e8f2]">
          <div className="flex items-center gap-1.5 overflow-x-auto pt-28 pb-2">
            {/* Inbox split button */}
            <div className="flex items-center shrink-0">
              <button
                type="button"
                onClick={() => handleStageSelect("inbox")}
                className={`flex items-center gap-1.5 rounded-l-full px-3.5 py-1.5 text-xs font-semibold shadow-xs ${
                  activeStage === "inbox"
                    ? "bg-[#2e6fef] text-white"
                    : "border border-[#e3e8f2] bg-white text-[#15121f] hover:bg-[#f0f2f7]"
                }`}
              >
                <span>📥</span>
                <span>Inbox</span>
                <span className="rounded-full bg-black/10 px-1.5 text-xs">0</span>
              </button>
              <button
                type="button"
                aria-label="Inbox options"
                className={`flex h-[28px] w-7 items-center justify-center rounded-r-full border-y border-r text-xs ${
                  activeStage === "inbox"
                    ? "border-[#2e6fef] bg-[#2e6fef] text-white"
                    : "border-[#e3e8f2] bg-white text-[#5f6577] hover:bg-[#f0f2f7]"
                }`}
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </button>
            </div>

            {/* UNIFIED STAGES */}
            {STAGES.map((stage) => {
              const isActive = activeStage === stage.id;
              const isTarget = stage.id === "in_progress";

              return (
                <div key={stage.id} className="relative shrink-0">
                  {/* PERCHED ROBOT COMPANION & THOUGHT BUBBLE BADGE ON TOP OF IN PROGRESS TAB (EXACTLY AS SCREENSHOT 2) */}
                  {isTarget && is1440Blocked && (
                    <div
                      ref={tabBotRef}
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStageSelect("in_progress");
                        setIs1440Expanded(true);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleStageSelect("in_progress");
                          setIs1440Expanded(true);
                        }
                      }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex flex-col items-center cursor-pointer z-30 transition-transform hover:scale-105"
                      title="Kora: Quick decision on #1440! Click to view and resolve"
                    >
                      {/* PLAYFUL SPEECH BUBBLE BADGE */}
                      <div className="mb-1 flex items-center gap-1.5 rounded-full border-2 border-amber-400 bg-amber-50 px-3 py-1 text-xs font-black text-amber-950 shadow-md whitespace-nowrap animate-bounce">
                        <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                        <span>Kora: Quick decision on #1440!</span>
                        <span className="rounded-full bg-amber-200/90 px-1.5 py-0.5 text-[10px] font-black text-amber-950">
                          1-click →
                        </span>
                      </div>

                      {/* 3 FLOATING CYAN DOTS */}
                      <div className="flex items-center gap-1 mb-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                      </div>

                      {/* SLEEK WHITE ROBOT AVATAR CARD */}
                      <div className="relative h-14 w-14 rounded-2xl bg-white p-1 border-2 border-cyan-300 shadow-xl overflow-hidden group">
                        <Image
                          src="/robot-agent.png"
                          alt="Agent Kora"
                          width={56}
                          height={56}
                          unoptimized
                          className="h-full w-full object-contain mix-blend-multiply"
                        />
                        {/* Subtle glowing rim */}
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-cyan-400/40 pointer-events-none" />
                      </div>

                      {/* Mini Perch Base / Shadow */}
                      <div className="h-1.5 w-8 rounded-full bg-slate-300/60 blur-[1px] mt-1" />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => handleStageSelect(stage.id)}
                    className={`group relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-[#2e6fef] text-white shadow-md shadow-blue-500/20 font-bold"
                        : "border border-[#e3e8f2] bg-white text-[#15121f] hover:bg-[#f0f2f7]"
                    }`}
                  >
                    <span className="text-xs">{stage.icon}</span>
                    <span>{stage.label}</span>
                    <span
                      className={`rounded-full px-1.5 text-xs ${
                        isActive
                          ? "bg-white/20 text-white font-bold"
                          : "bg-[#f0f2f7] text-[#5f6577]"
                      }`}
                    >
                      {stage.count}
                    </span>

                    {/* Notification bug badge stating an issue needs attention in this tab */}
                    {stage.hasAlert && (
                      <span
                        className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] text-white font-black ring-2 ring-white animate-pulse"
                        title="1 issue waiting on your input"
                      >
                        !
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            CLEAN ISSUE LIST UNDER ACTIVE TAB
            - Top row is elevated when an issue needs attention with the mini bot perched on it.
            - Row is ultra-clean (single line). Details appear only on expand.
            ========================================================================= */}
        <div className="mt-4">
          <div className="rounded-xl border border-[#e3e8f2] bg-white overflow-hidden shadow-xs">
            {/* Table Header */}
            <div className="border-b border-[#e3e8f2] bg-[#f8fafc] px-4 py-2.5 flex items-center justify-between text-xs font-bold text-[#5f6577]">
              <span className="uppercase tracking-wider">
                STAGE: {activeStage.replace("_", " ")}
              </span>
              <div className="flex items-center gap-3">
                {activeStage === "in_progress" && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveStage("open");
                      setTimeout(() => handleStageSelect("in_progress"), 120);
                    }}
                    className="text-[11px] font-semibold text-[#2e6fef] hover:underline flex items-center gap-1"
                    title="Watch the agent leap from tab to issue again"
                  >
                    <span>↺</span>
                    <span>Replay transition</span>
                  </button>
                )}
                <span>Click issue to expand and resolve</span>
              </div>
            </div>

            <div className="divide-y divide-[#eef1f7]">
              {/* If on IN PROGRESS stage: show top elevated issue #1440 with perched mini bot */}
              {activeStage === "in_progress" && (
                <div
                  className={`transition-colors ${
                    is1440Blocked
                      ? "bg-amber-50/25 border-l-4 border-l-amber-500"
                      : "bg-emerald-50/20 border-l-4 border-l-emerald-500"
                  }`}
                >
                  {/* Collapsed Single-Line Row */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setIs1440Expanded((curr) => !curr)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setIs1440Expanded((curr) => !curr);
                      }
                    }}
                    className="px-4 py-3.5 cursor-pointer flex items-center justify-between gap-3 hover:bg-amber-50/60 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {/* SMALL BOT AVATAR DIRECTLY ON THE TOP ISSUE (with issueBotRef for landing transition) */}
                      <div
                        ref={issueBotRef}
                        className={`relative h-7 w-7 rounded-lg bg-white p-0.5 border border-amber-300 shadow-xs shrink-0 ${
                          isAnimatingToIssue
                            ? "z-30 shadow-lg border-amber-400"
                            : "animate-[bounce_2.5s_infinite]"
                        }`}
                        title="Agent Kora is waiting on this issue"
                      >
                        <Image
                          src="/robot-agent.png"
                          alt="Bot"
                          width={28}
                          height={28}
                          unoptimized
                          className="h-full w-full object-contain mix-blend-multiply"
                        />
                        {is1440Blocked && (
                          <span className="absolute -top-1 -right-1 flex h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                        )}
                      </div>

                      <span className="font-mono text-xs font-bold text-[#5f6577] shrink-0">
                        #1440
                      </span>

                      <span className="font-extrabold text-sm text-[#15121f] truncate">
                        Exponential retry backoff strategy across test suites
                      </span>

                      <span className="rounded-full bg-[#f0f2f7] px-2 py-0.5 text-xs font-bold text-[#5f6577] shrink-0">
                        Fixes
                      </span>

                      {!is1440Blocked && (
                        <span className="rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-xs font-bold shrink-0">
                          ✓ Resolved: {resolved1440Choice}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="rounded-full border border-[#e3e8f2] bg-white px-2.5 py-0.5 text-xs font-bold text-[#15121f]">
                        ▲ 42
                      </span>
                      <span className="text-xs font-extrabold text-[#5f6577] px-1">
                        {is1440Expanded ? "⌃" : "⌄"}
                      </span>
                    </div>
                  </div>

                  {/* EXPANDED DETAILS (Appears only when clicked to read & resolve) */}
                  {is1440Expanded && (
                    <div className="px-5 pb-5 pt-1 border-t border-amber-200/80 bg-white animate-in fade-in">
                      {/* Metadata revealed upon expand */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#5f6577] pt-2 mb-3">
                        <span>
                          Reported by <strong className="text-[#15121f]">Faith Dombe</strong>
                        </span>
                        <span>•</span>
                        <span>18m ago</span>
                        <span>•</span>
                        <span>
                          Assigned Agent: <strong className="text-[#15121f]">Kora (Core Builder)</strong>
                        </span>
                        <span>•</span>
                        {is1440Blocked ? (
                          <span className="rounded bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.2 text-[11px] font-black">
                            Awaiting Human Decision
                          </span>
                        ) : (
                          <span className="rounded bg-emerald-100 text-emerald-900 border border-emerald-300 px-1.5 py-0.2 text-[11px] font-black">
                            ✓ Unblocked &amp; Running
                          </span>
                        )}
                      </div>

                      {/* Blocker Question Card */}
                      <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4">
                        <div className="text-xs font-extrabold uppercase tracking-wider text-amber-900 mb-1">
                          Agent Kora asks:
                        </div>
                        <h3 className="text-sm font-extrabold text-[#15121f]">
                          &ldquo;Should the exponential retry logic run on every test suite or just frontend?&rdquo;
                        </h3>
                        <p className="mt-2 text-xs text-[#3e4a63] leading-relaxed">
                          Running on all test suites adds ~45s of CI execution time, whereas frontend-only prevents false positive UI flakes immediately.
                        </p>

                        {/* 1-Click Resolution Buttons */}
                        {is1440Blocked ? (
                          <div className="mt-4 flex flex-wrap items-center gap-2.5">
                            <button
                              type="button"
                              onClick={() => handleResolve1440("Frontend Only")}
                              className="rounded-full bg-[#2e6fef] hover:bg-blue-600 px-4 py-2 text-xs font-extrabold text-white shadow-sm flex items-center gap-1.5"
                            >
                              <span>⚡</span>
                              <span>[Frontend Only (Recommended)]</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleResolve1440("All Suites")}
                              className="rounded-full border border-[#e3e8f2] bg-white hover:bg-[#f0f2f7] px-4 py-2 text-xs font-extrabold text-[#15121f]"
                            >
                              <span>🛡️</span>
                              <span>[All Test Suites]</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setIs1440Expanded(false)}
                              className="text-xs font-bold text-[#5f6577] hover:text-[#15121f] px-3 py-1"
                            >
                              Collapse
                            </button>
                          </div>
                        ) : (
                          <div className="mt-3 text-xs font-extrabold text-emerald-800">
                            ✓ Resolved: Answer &ldquo;{resolved1440Choice}&rdquo; submitted. Agent Kora unblocked!
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Standard issues under active stage */}
              {(activeStage === "in_progress"
                ? [
                    { id: 1421, title: "Automated webhook delivery verification and audit log sync", tag: "Core", votes: 19, author: "Faith Dombe", timeAgo: "2h ago", description: "Automated verification worker ensures all webhook delivery endpoints receive signed HMAC payloads without delay." },
                    { id: 1415, title: "Worker thread queue backpressure under high burst load", tag: "Performance", votes: 11, author: "Faith Dombe", timeAgo: "4h ago", description: "Applying adaptive concurrency limits to prevent memory pressure when sudden traffic spikes occur." },
                    { id: 1398, title: "Token bucket rate limiter telemetry metric drift", tag: "Fixes", votes: 8, author: "Faith Dombe", timeAgo: "5h ago", description: "Synchronizing local token bucket refills with Redis cluster time stamps." },
                  ]
                : ISSUES_BY_STAGE[activeStage] || ISSUES_BY_STAGE.all
              ).map((issue) => {
                const isExpanded = expandedStandardId === issue.id;

                return (
                  <div key={issue.id} className="transition-colors hover:bg-[#f8fafc]">
                    {/* Collapsed Single-Line Row */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setExpandedStandardId(isExpanded ? null : issue.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setExpandedStandardId(isExpanded ? null : issue.id);
                        }
                      }}
                      className="px-4 py-3.5 cursor-pointer flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <span className="font-mono text-xs font-bold text-[#5f6577] shrink-0">
                          #{issue.id}
                        </span>
                        <span className="font-extrabold text-sm text-[#15121f] truncate">
                          {issue.title}
                        </span>
                        <span className="rounded-full bg-[#f0f2f7] px-2 py-0.5 text-xs font-bold text-[#5f6577] shrink-0">
                          {issue.tag}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <span className="rounded-full border border-[#e3e8f2] bg-[#f0f2f7] px-2.5 py-0.5 text-xs font-bold text-[#15121f]">
                          ▲ {issue.votes}
                        </span>
                        <span className="text-xs font-extrabold text-[#5f6577] px-1">
                          {isExpanded ? "⌃" : "⌄"}
                        </span>
                      </div>
                    </div>

                    {/* Expanded Details on Click */}
                    {isExpanded && (
                      <div className="px-5 pb-4 pt-1 border-t border-[#e3e8f2] bg-white animate-in fade-in">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#5f6577] pt-2 mb-2">
                          <span>
                            Reported by <strong className="text-[#15121f]">{issue.author || "Faith Dombe"}</strong>
                          </span>
                          <span>•</span>
                          <span>{issue.timeAgo || "2h ago"}</span>
                        </div>
                        <p className="text-xs text-[#3e4a63] leading-relaxed">
                          {issue.description || "All pipeline integration checks running nominally. No human intervention required."}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
