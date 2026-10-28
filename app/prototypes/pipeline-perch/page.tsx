"use client";

import { useState } from "react";
import Link from "next/link";
import { MockZikiHeader } from "../mock-ziki-header";

interface AgentPerch {
  name: string;
  stageId: string;
  avatarColor: string;
  status: "blocked" | "smooth";
  speechText?: string;
  holdingIcon?: string;
  issueNumber?: number;
  question?: string;
  options?: string[];
}

export default function PipelinePerchPage() {
  const [activeStage, setActiveStage] = useState<string>("in_progress");
  const [activeFlyoutAgent, setActiveFlyoutAgent] = useState<string | null>("Kora");
  const [resolvedAgents, setResolvedAgents] = useState<Set<string>>(new Set());
  const [animatingCheer, setAnimatingCheer] = useState<string | null>(null);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  // Sound chime synthesizer via Web Audio API (zero external assets needed)
  function playHappyChime() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
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
    } catch {
      // Audio autoplay may be disabled in some environments
    }
  }

  // Handle human clicking one of the 1-click option buttons
  function handleAnswer(agentName: string, chosenOption: string, issueNum: number) {
    playHappyChime();
    setAnimatingCheer(agentName);
    setFeedbackToast(`✨ Answer "${chosenOption}" delivered on #${issueNum}! Agent ${agentName} hopped back to work.`);

    setTimeout(() => {
      setResolvedAgents((prev) => new Set(prev).add(agentName));
      setAnimatingCheer(null);
      setActiveFlyoutAgent(null);
    }, 1800);
  }

  const koraBlocked = !resolvedAgents.has("Kora");
  const letoBlocked = !resolvedAgents.has("Leto");

  const STAGES = [
    { id: "drafts", label: "Drafts", count: 62, icon: "📝" },
    { id: "ideas", label: "Ideas", count: 9, icon: "💡" },
    { id: "open", label: "Open", count: 138, icon: "⭕" },
    { id: "in_progress", label: "In progress", count: koraBlocked ? 22 : 21, icon: "⏱" },
    { id: "ready_to_merge", label: "Ready to Merge", count: letoBlocked ? 3 : 2, icon: "🔀" },
    { id: "live", label: "Live", count: 7, icon: "🚀" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fc] text-[#15121f]">
      <MockZikiHeader />

      {/* Top Banner Explaining the Innovation to Tutors */}
      <div className="border-b border-[#e3e8f2] bg-white px-4 py-3 shadow-xs">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1f5fd9] text-white font-extrabold text-xs shadow-xs">
              01
            </span>
            <div>
              <span className="font-extrabold text-[#15121f] text-sm">
                Idea 1: The Pipeline Perch
              </span>
              <span className="text-[#5f6577] ml-2 hidden md:inline">
                Active agents physically sit on stage tabs. When working smoothly they breathe gently; when blocked they wave a speech bubble.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setResolvedAgents(new Set());
                setActiveFlyoutAgent("Kora");
                setFeedbackToast(null);
              }}
              className="rounded-full border border-[#e3e8f2] bg-[#f0f2f7] hover:bg-[#eaf2fe] px-3 py-1 font-bold text-[#1f5fd9] transition-colors"
            >
              ↻ Replay Agent Question
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Workspace Breadcrumbs & Search */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-[#5f6577]">Ziki</span>
            <span className="text-[#5f6577]">›</span>
            <h1 className="text-xl font-extrabold text-[#15121f] tracking-tight">Issues</h1>
            <span className="rounded-full bg-[#eaf2fe] px-2.5 py-0.5 text-xs font-bold text-[#1f5fd9] border border-[#e3e8f2]">
              HNG 15 · Faith Dombe
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="relative">
              <input
                type="text"
                placeholder="Search issues or #id..."
                className="h-9 w-60 rounded-full border border-[#e3e8f2] bg-white px-3.5 pl-8 text-xs text-[#15121f] placeholder:text-[#5f6577] shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#1f5fd9]"
              />
              <svg className="absolute left-2.5 top-2.5 h-4 w-4 text-[#5f6577]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button className="flex h-9 items-center gap-1.5 rounded-full bg-[#2e6fef] px-4 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:brightness-105">
              <span>+</span>
              <span>New issue</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            PIPELINE STAGE TABS WITH PERCHED AGENTS
            ========================================================================= */}
        <div className="relative pt-16 pb-4">

          {/* PERCHED AGENT 1: Duncan on "Open" (SMOOTH OPERATION - Idle breathing & green antenna) */}
          <div className="absolute left-[38%] -top-2 -translate-x-1/2 z-20 pointer-events-none hidden sm:block">
            <div className="flex flex-col items-center">
              <div className="mb-0.5 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-800 shadow-xs flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Duncan · Working smoothly</span>
              </div>
              {/* Bot SVG with idle breathing and glowing green antenna */}
              <div className="h-9 w-9 animate-[bounce_3s_infinite] drop-shadow-xs">
                <svg viewBox="0 0 48 48" fill="none" className="h-full w-full">
                  <circle cx="24" cy="6" r="3" fill="#10b981" className="animate-pulse" />
                  <line x1="24" y1="8" x2="24" y2="14" stroke="#059669" strokeWidth="2.5" />
                  <rect x="8" y="14" width="32" height="24" rx="8" fill="#60a5fa" stroke="#2563eb" strokeWidth="2" />
                  <rect x="13" y="19" width="22" height="14" rx="4" fill="#0f172a" />
                  <circle cx="19" cy="26" r="2" fill="#38bdf8" />
                  <circle cx="29" cy="26" r="2" fill="#38bdf8" />
                  <path d="M21 29 Q24 31 27 29" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* PERCHED AGENT 2: Kora on "In Progress" (BLOCKED - Waving sign: "Hey, quick question!") */}
          {koraBlocked && (
            <div
              className={`absolute left-[54%] sm:left-[54%] -top-3 -translate-x-1/2 z-30 cursor-pointer transition-transform hover:scale-105 ${
                animatingCheer === "Kora" ? "animate-[bounce_0.5s_infinite]" : ""
              }`}
              onClick={() => setActiveFlyoutAgent((curr) => (curr === "Kora" ? null : "Kora"))}
            >
              <div className="flex flex-col items-center">
                {/* Speech Bubble / Little Sign */}
                <div className="animate-bounce mb-1 flex items-center gap-1.5 rounded-full border-2 border-amber-400 bg-amber-50 px-3 py-1 text-xs font-black text-amber-900 shadow-md">
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                  <span>Kora: &ldquo;Hey, quick question!&rdquo;</span>
                  <span className="text-[#1f5fd9] font-bold underline ml-1">Open →</span>
                </div>

                {/* Animated Robot Graphic with Waving Hand and Sign */}
                <div className="relative h-11 w-11 drop-shadow-md">
                  <svg viewBox="0 0 48 48" fill="none" className="h-full w-full">
                    {/* Glowing yellow antenna */}
                    <circle cx="24" cy="5" r="3.5" fill="#f59e0b" className="animate-pulse" />
                    <line x1="24" y1="8" x2="24" y2="14" stroke="#d97706" strokeWidth="2.5" />
                    {/* Head */}
                    <rect x="8" y="14" width="32" height="24" rx="8" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
                    {/* Screen */}
                    <rect x="12" y="18" width="24" height="15" rx="5" fill="#1e293b" />
                    {/* Inquisitive eyes */}
                    <circle cx="18" cy="25" r="2.5" fill="#38bdf8" className="animate-pulse" />
                    <circle cx="30" cy="25" r="2.5" fill="#38bdf8" className="animate-pulse" />
                    {/* Cheerful mouth */}
                    <path d="M21 29 Q24 32 27 29" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
                    {/* Waving arm with sign */}
                    <ellipse cx="6" cy="24" rx="3" ry="2" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
                    <ellipse cx="42" cy="18" rx="3.5" ry="2.5" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" className="animate-bounce" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* PERCHED AGENT 3: Leto on "Ready to Merge" (HOLDING MERGE STAMP) */}
          {letoBlocked && (
            <div
              className={`absolute left-[72%] sm:left-[72%] -top-3 -translate-x-1/2 z-30 cursor-pointer transition-transform hover:scale-105 ${
                animatingCheer === "Leto" ? "animate-[bounce_0.5s_infinite]" : ""
              }`}
              onClick={() => setActiveFlyoutAgent((curr) => (curr === "Leto" ? null : "Leto"))}
            >
              <div className="flex flex-col items-center">
                {/* Speech Bubble */}
                <div className="animate-bounce mb-1 flex items-center gap-1.5 rounded-full border-2 border-emerald-400 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-900 shadow-md">
                  <span>🔑</span>
                  <span>Leto: &ldquo;Merge consensus needed&rdquo;</span>
                  <span className="text-[#1f5fd9] font-bold underline ml-1">Review →</span>
                </div>

                {/* Robot Graphic holding key/stamp */}
                <div className="relative h-11 w-11 drop-shadow-md">
                  <svg viewBox="0 0 48 48" fill="none" className="h-full w-full">
                    {/* Green antenna */}
                    <circle cx="24" cy="5" r="3.5" fill="#10b981" />
                    <line x1="24" y1="8" x2="24" y2="14" stroke="#059669" strokeWidth="2.5" />
                    {/* Head */}
                    <rect x="8" y="14" width="32" height="24" rx="8" fill="#34d399" stroke="#059669" strokeWidth="2" />
                    {/* Face screen */}
                    <rect x="12" y="18" width="24" height="15" rx="5" fill="#064e3b" />
                    {/* Confident eyes */}
                    <circle cx="18" cy="25" r="2.5" fill="#a7f3d0" />
                    <circle cx="30" cy="25" r="2.5" fill="#a7f3d0" />
                    {/* Merge stamp badge */}
                    <rect x="38" y="16" width="7" height="9" rx="2" fill="#047857" stroke="#a7f3d0" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* THE STAGE TABS BAR */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-[#e3e8f2]">
            {STAGES.map((stage) => {
              const isActive = activeStage === stage.id;
              const hasAlert =
                (stage.id === "in_progress" && koraBlocked) ||
                (stage.id === "ready_to_merge" && letoBlocked);

              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(stage.id)}
                  className={`group relative flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-extrabold transition-all shrink-0 ${
                    isActive
                      ? "bg-[#2e6fef] text-white shadow-md shadow-blue-500/25"
                      : "border border-[#e3e8f2] bg-white text-[#15121f] hover:bg-[#f0f2f7]"
                  }`}
                >
                  <span className="text-sm">{stage.icon}</span>
                  <span>{stage.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-black ${
                      isActive
                        ? "bg-white/20 text-white"
                        : hasAlert
                        ? "bg-amber-100 text-amber-900 border border-amber-300"
                        : "bg-[#f0f2f7] text-[#5f6577]"
                    }`}
                  >
                    {stage.count}
                  </span>

                  {hasAlert && !isActive && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] text-white font-black ring-2 ring-white animate-pulse">
                      !
                    </span>
                  )}
                </button>
              );
            })}

            <button
              onClick={() => setActiveStage("all")}
              className={`rounded-full px-4 py-2.5 text-xs font-extrabold transition-all shrink-0 ${
                activeStage === "all"
                  ? "bg-[#2e6fef] text-white shadow-md"
                  : "border border-[#e3e8f2] bg-white text-[#5f6577] hover:text-[#15121f] hover:bg-[#f0f2f7]"
              }`}
            >
              All 278
            </button>
          </div>
        </div>

        {/* =========================================================================
            1-CLICK PREVIEW CARD (RIGHT ABOVE/BELOW THE TAB AS REQUESTED)
            ========================================================================= */}
        {activeFlyoutAgent === "Kora" && koraBlocked && (
          <div className="my-6 rounded-2xl border-2 border-amber-300 bg-white p-5 shadow-xl transition-all animate-in fade-in zoom-in-95">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#eef1f7] pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-xl font-bold border border-amber-200">
                  🤖
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-black uppercase text-amber-900 border border-amber-200">
                      Perched Agent: Kora
                    </span>
                    <span className="font-mono text-xs font-bold text-[#5f6577]">
                      Issue #1440
                    </span>
                  </div>
                  <h2 className="text-base font-extrabold text-[#15121f] mt-0.5">
                    Kora asks on #1440: &ldquo;Should the retry logic run on every test suite or just frontend?&rdquo;
                  </h2>
                </div>
              </div>

              <button
                onClick={() => setActiveFlyoutAgent(null)}
                className="text-xs font-bold text-[#5f6577] hover:text-[#15121f] p-1.5 rounded-full hover:bg-[#f0f2f7]"
              >
                ✕ Close
              </button>
            </div>

            <p className="mt-3 text-xs text-[#3e4a63]">
              Running on all test suites adds ~45s of CI execution time, whereas frontend-only prevents false positive UI flakes immediately.
            </p>

            {/* 1-CLICK ACTION BUTTONS MATCHING EXACT PROMPT */}
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleAnswer("Kora", "All Suites", 1440)}
                className="flex items-center gap-1.5 rounded-full border border-[#e3e8f2] bg-white hover:bg-[#eaf2fe] hover:border-[#1f5fd9] px-4 py-2 text-xs font-extrabold text-[#15121f] transition-all shadow-xs"
              >
                <span>🛡️</span>
                <span>[All Suites]</span>
              </button>

              <button
                type="button"
                onClick={() => handleAnswer("Kora", "Frontend Only", 1440)}
                className="flex items-center gap-1.5 rounded-full bg-[#2e6fef] hover:bg-[#1f5fd9] px-4 py-2 text-xs font-extrabold text-white transition-all shadow-md shadow-blue-500/20"
              >
                <span>⚡</span>
                <span>[Frontend Only (Recommended)]</span>
              </button>

              <button
                type="button"
                onClick={() => handleAnswer("Kora", "Opened in detail view", 1440)}
                className="rounded-full border border-[#e3e8f2] bg-[#f0f2f7] hover:bg-white px-3.5 py-2 text-xs font-extrabold text-[#5f6577] hover:text-[#15121f] transition-colors"
              >
                [Open Full Issue ↗]
              </button>
            </div>
          </div>
        )}

        {/* FLYOUT FOR LETO ON "READY TO MERGE" */}
        {activeFlyoutAgent === "Leto" && letoBlocked && (
          <div className="my-6 rounded-2xl border-2 border-emerald-400 bg-white p-5 shadow-xl transition-all animate-in fade-in zoom-in-95">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#eef1f7] pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-xl font-bold border border-emerald-200">
                  🔑
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black uppercase text-emerald-900 border border-emerald-200">
                      Perched Merger: Leto
                    </span>
                    <span className="font-mono text-xs font-bold text-[#5f6577]">
                      PR #1402
                    </span>
                  </div>
                  <h2 className="text-base font-extrabold text-[#15121f] mt-0.5">
                    Leto asks on #1402: &ldquo;All 18 automated tests passed. Does this brand color update have human consensus to merge?&rdquo;
                  </h2>
                </div>
              </div>

              <button
                onClick={() => setActiveFlyoutAgent(null)}
                className="text-xs font-bold text-[#5f6577] hover:text-[#15121f] p-1.5 rounded-full hover:bg-[#f0f2f7]"
              >
                ✕ Close
              </button>
            </div>

            <p className="mt-3 text-xs text-[#3e4a63]">
              Automated checks passed 100%. Contrast ratio improves from 4.6:1 to 5.2:1. Ready for instant human-free go-live.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleAnswer("Leto", "Approve & Merge", 1402)}
                className="flex items-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-xs font-extrabold text-white transition-all shadow-md shadow-emerald-600/20"
              >
                <span>🚀</span>
                <span>[Approve & Auto-Merge into Production]</span>
              </button>

              <button
                type="button"
                onClick={() => handleAnswer("Leto", "Keep Current Palette", 1402)}
                className="rounded-full border border-[#e3e8f2] bg-white hover:bg-[#f0f2f7] px-4 py-2 text-xs font-extrabold text-[#15121f] transition-all"
              >
                [Keep Current Palette]
              </button>

              <button
                type="button"
                onClick={() => handleAnswer("Leto", "Opened in detail view", 1402)}
                className="rounded-full border border-[#e3e8f2] bg-[#f0f2f7] hover:bg-white px-3.5 py-2 text-xs font-extrabold text-[#5f6577] hover:text-[#15121f] transition-colors"
              >
                [Open Full Issue ↗]
              </button>
            </div>
          </div>
        )}

        {/* FEEDBACK TOAST / CELEBRATION */}
        {feedbackToast && (
          <div className="mb-6 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-xs font-extrabold text-emerald-900 shadow-sm animate-in fade-in">
            {feedbackToast}
          </div>
        )}

        {/* =========================================================================
            CLEAN ISSUE LIST TABLE
            ========================================================================= */}
        <div className="rounded-2xl border border-[#e3e8f2] bg-white overflow-hidden shadow-xs">
          <div className="border-b border-[#e3e8f2] bg-[#f5f7fc] px-4 py-3 flex items-center justify-between text-xs font-extrabold text-[#5f6577]">
            <span className="uppercase tracking-wider">
              STAGE: {activeStage.replace("_", " ")}
            </span>
            <span>Real-time Agent Synchronization</span>
          </div>

          <div className="divide-y divide-[#eef1f7]">
            {/* Issue 1: #1440 */}
            <div
              onClick={() => setActiveFlyoutAgent("Kora")}
              className={`flex flex-wrap items-center justify-between gap-4 p-4 transition-colors cursor-pointer hover:bg-[#f5f7fc] ${
                koraBlocked ? "border-l-4 border-l-amber-500 bg-amber-50/20" : ""
              }`}
            >
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <span className="mt-0.5 text-xs font-mono font-bold text-[#5f6577]">
                  #1440
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-extrabold text-sm text-[#15121f]">
                      Exponential retry backoff strategy across test suites
                    </span>
                    <span className="rounded-full bg-[#f0f2f7] px-2 py-0.5 text-[10px] font-bold text-[#5f6577]">
                      Fixes
                    </span>
                    {koraBlocked ? (
                      <span className="rounded-full bg-amber-100 border border-amber-300 px-2 py-0.5 text-[10px] font-black text-amber-900 animate-pulse">
                        Waiting on Kora&apos;s Question
                      </span>
                    ) : (
                      <span className="rounded-full bg-emerald-100 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                        ✓ Unblocked · Running on Frontend
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-[#5f6577]">
                    <span>Reported by Faith Dombe</span>
                    <span>•</span>
                    <span>18m ago</span>
                    <span>•</span>
                    <span className="font-bold text-[#15121f]">Agent: Kora (Core Triager)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="rounded-full border border-[#e3e8f2] bg-[#f0f2f7] px-2.5 py-1 text-xs font-bold text-[#15121f]">
                  ▲ 42
                </span>
                {koraBlocked && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveFlyoutAgent("Kora");
                    }}
                    className="rounded-full bg-amber-500 hover:bg-amber-600 px-3.5 py-1.5 text-xs font-extrabold text-white shadow-xs"
                  >
                    Answer Agent →
                  </button>
                )}
              </div>
            </div>

            {/* Issue 2: #1402 */}
            <div
              onClick={() => setActiveFlyoutAgent("Leto")}
              className={`flex flex-wrap items-center justify-between gap-4 p-4 transition-colors cursor-pointer hover:bg-[#f5f7fc] ${
                letoBlocked ? "border-l-4 border-l-emerald-500 bg-emerald-50/20" : ""
              }`}
            >
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <span className="mt-0.5 text-xs font-mono font-bold text-[#5f6577]">
                  #1402
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-extrabold text-sm text-[#15121f]">
                      Brand green refresh on status pills and badge borders
                    </span>
                    <span className="rounded-full bg-[#f0f2f7] px-2 py-0.5 text-[10px] font-bold text-[#5f6577]">
                      Design
                    </span>
                    {letoBlocked ? (
                      <span className="rounded-full bg-emerald-100 border border-emerald-300 px-2 py-0.5 text-[10px] font-black text-emerald-900">
                        Awaiting Human Consensus
                      </span>
                    ) : (
                      <span className="rounded-full bg-emerald-100 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                        ✓ Approved & Merged
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-[#5f6577]">
                    <span>Reported by Stephen</span>
                    <span>•</span>
                    <span>32m ago</span>
                    <span>•</span>
                    <span className="font-bold text-[#15121f]">Agent: Leto (Reviewer & Merger)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="rounded-full border border-[#e3e8f2] bg-[#f0f2f7] px-2.5 py-1 text-xs font-bold text-[#15121f]">
                  ▲ 28
                </span>
                {letoBlocked && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveFlyoutAgent("Leto");
                    }}
                    className="rounded-full bg-emerald-600 hover:bg-emerald-700 px-3.5 py-1.5 text-xs font-extrabold text-white shadow-xs"
                  >
                    Review Merge →
                  </button>
                )}
              </div>
            </div>

            {/* Issue 3: #1421 */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 hover:bg-[#f5f7fc] transition-colors">
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <span className="mt-0.5 text-xs font-mono font-bold text-[#5f6577]">
                  #1421
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-extrabold text-sm text-[#15121f]">
                      Webhook re-render loop on issue attribute edit
                    </span>
                    <span className="rounded-full bg-[#f0f2f7] px-2 py-0.5 text-[10px] font-bold text-[#5f6577]">
                      Fixes
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-[#5f6577]">
                    <span>Reported by Yolanda</span>
                    <span>•</span>
                    <span>2h ago</span>
                    <span>•</span>
                    <span className="font-bold text-[#15121f]">Agent: Duncan (Working smoothly)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="rounded-full border border-[#e3e8f2] bg-[#f0f2f7] px-2.5 py-1 text-xs font-bold text-[#15121f]">
                  ▲ 19
                </span>
                <span className="text-xs font-extrabold text-emerald-600">
                  Automated Tests Running
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* TUTOR / MARK ESSIEN DESIGN ALIGNMENT CARD */}
        <div className="mt-8 rounded-2xl border border-[#e3e8f2] bg-white p-5 shadow-xs text-xs text-[#3e4a63]">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🤖</span>
            <div>
              <h3 className="font-extrabold text-[#15121f] text-sm mb-1">
                Design Achievement: Idea 1 (The Pipeline Perch)
              </h3>
              <p className="leading-relaxed">
                This prototype replaces passive status cards and disjointed inbox sub-tabs with active, embodied AI agents who physically perch on top of the workflow stages. When an agent like <strong>Kora</strong> is blocked on an architectural fork, she waves an interactive speech bubble directly on the <em>In Progress</em> stage tab. Clicking the agent surfaces a 1-click preview card asking the exact question (<code>[All Suites]</code> or <code>[Frontend Only]</code>), and submitting the answer plays a delightful audio chime, triggers a celebratory hop animation, and immediately clears the blocker so the agent can resume automated merging.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
