"use client";

import { useState } from "react";
import Link from "next/link";
import { MockZikiHeader } from "../mock-ziki-header";
import { MOCK_ISSUES, PIPELINE_STAGES, type PrototypeIssue } from "../data";

export default function PipelinePerchPage() {
  const [activeStage, setActiveStage] = useState<string>("in_progress");
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>("iss-1");
  const [flyoutOpen, setFlyoutOpen] = useState<boolean>(true);
  const [resolvedIssues, setResolvedIssues] = useState<Set<string>>(new Set());
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [celebrating, setCelebrating] = useState<boolean>(false);
  const [celebrationMessage, setCelebrationMessage] = useState<string>("");

  const filteredIssues = MOCK_ISSUES.filter(
    (issue) => activeStage === "all" || issue.stage === activeStage
  );

  const activeIssue = MOCK_ISSUES.find((i) => i.id === selectedIssueId);

  const koraUnresolved = !resolvedIssues.has("iss-1");
  const letoUnresolved = !resolvedIssues.has("iss-2");

  function handleOpenFlyout(issueId: string, stageId: string) {
    setActiveStage(stageId);
    setSelectedIssueId(issueId);
    setFlyoutOpen(true);
    const iss = MOCK_ISSUES.find((i) => i.id === issueId);
    if (iss?.blocker?.defaultOption) {
      setSelectedOption(iss.blocker.defaultOption);
    }
  }

  function handleResolve(issueId: string) {
    setCelebrating(true);
    setCelebrationMessage("✨ Decision submitted! Agent unblocked and resuming automated pipeline.");
    setResolvedIssues((prev) => new Set(prev).add(issueId));

    setTimeout(() => {
      setCelebrating(false);
      setFlyoutOpen(false);
    }, 2400);
  }

  return (
    <div className="relative">
      <MockZikiHeader />

      {/* Floating Concept Explainer Pill */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border-b border-amber-200/60 px-4 py-2">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white font-extrabold text-[10px]">
              01
            </span>
            <span className="font-bold text-amber-900">
              Idea 1: The Pipeline Perch
            </span>
            <span className="text-amber-800/80 hidden sm:inline">
              — Mini agent mascots sit directly on stages where your decision is required.
            </span>
          </div>
          <button
            onClick={() => {
              setResolvedIssues(new Set());
              setFlyoutOpen(true);
              setSelectedIssueId("iss-1");
              setActiveStage("in_progress");
            }}
            className="rounded-full bg-amber-200/80 px-2.5 py-0.5 font-bold text-amber-900 hover:bg-amber-300 transition-colors text-[11px]"
          >
            Reset Demos
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {/* Breadcrumb & Action bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-zk-muted">Ziki</span>
            <span className="text-zk-muted">›</span>
            <span className="font-extrabold text-zk-text text-base">Issues</span>
            <span className="rounded-full bg-zk-chip px-2 py-0.5 text-xs font-bold text-zk-muted">
              Workspace Scope
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search issues or #id..."
                className="h-9 w-52 rounded-full border border-zk-border bg-zk-surface px-3 pl-8 text-xs text-zk-text placeholder:text-zk-muted focus:outline-none focus:ring-2 focus:ring-electric-blue"
              />
              <svg className="absolute left-2.5 top-2.5 h-4 w-4 text-zk-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button className="flex h-9 items-center gap-1.5 rounded-full bg-electric-blue-strong px-4 text-xs font-bold text-white shadow-md hover:brightness-105">
              <span>+</span>
              <span>New issue</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            PIPELINE STAGE TABS WITH PERCHED AGENTS
            ========================================================================= */}
        <div className="relative pt-12 pb-2">
          {/* PERCHED MASCOT 1: Kora on "In Progress" */}
          {koraUnresolved && (
            <div
              className="absolute left-[44%] sm:left-[50%] -top-1 -translate-x-1/2 z-20 cursor-pointer group"
              onClick={() => handleOpenFlyout("iss-1", "in_progress")}
            >
              <div className="relative flex flex-col items-center">
                {/* Speech Bubble */}
                <div className="animate-bounce mb-1 flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-[11px] font-extrabold text-amber-900 shadow-md group-hover:scale-105 transition-transform">
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                  <span>Kora needs you on #1440!</span>
                  <span className="text-amber-600 font-bold">Answer →</span>
                </div>

                {/* Robot Character SVG */}
                <div className="relative h-10 w-10 transition-transform group-hover:scale-110">
                  <svg viewBox="0 0 48 48" fill="none" className="h-full w-full drop-shadow-sm">
                    {/* Antenna */}
                    <circle cx="24" cy="6" r="3" fill="#f59e0b" />
                    <line x1="24" y1="8" x2="24" y2="14" stroke="#d97706" strokeWidth="2.5" />
                    {/* Head */}
                    <rect x="8" y="14" width="32" height="24" rx="8" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
                    {/* Face screen */}
                    <rect x="12" y="18" width="24" height="16" rx="5" fill="#1f2937" />
                    {/* Blinking eyes */}
                    <circle cx="18" cy="25" r="2.5" fill="#67e8f9" className="animate-pulse" />
                    <circle cx="30" cy="25" r="2.5" fill="#67e8f9" className="animate-pulse" />
                    {/* Cheeks */}
                    <circle cx="15" cy="29" r="1.5" fill="#f43f5e" opacity="0.6" />
                    <circle cx="33" cy="29" r="1.5" fill="#f43f5e" opacity="0.6" />
                    {/* Waving little hand */}
                    <ellipse cx="6" cy="24" rx="3" ry="2" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
                    <ellipse cx="42" cy="20" rx="3" ry="2" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" className="animate-bounce" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* PERCHED MASCOT 2: Leto on "Ready to Merge" */}
          {letoUnresolved && (
            <div
              className="absolute left-[69%] sm:left-[71%] -top-1 -translate-x-1/2 z-20 cursor-pointer group"
              onClick={() => handleOpenFlyout("iss-2", "ready_to_merge")}
            >
              <div className="relative flex flex-col items-center">
                {/* Speech Bubble */}
                <div className="animate-bounce mb-1 flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-[11px] font-extrabold text-emerald-900 shadow-md group-hover:scale-105 transition-transform">
                  <span className="text-xs">🎨</span>
                  <span>Leto: Design sign-off #1402</span>
                  <span className="text-emerald-700 font-bold">Review →</span>
                </div>

                {/* Robot Character SVG */}
                <div className="relative h-10 w-10 transition-transform group-hover:scale-110">
                  <svg viewBox="0 0 48 48" fill="none" className="h-full w-full drop-shadow-sm">
                    {/* Antenna */}
                    <circle cx="24" cy="6" r="3" fill="#10b981" />
                    <line x1="24" y1="8" x2="24" y2="14" stroke="#059669" strokeWidth="2.5" />
                    {/* Head */}
                    <rect x="8" y="14" width="32" height="24" rx="8" fill="#34d399" stroke="#059669" strokeWidth="2" />
                    {/* Face screen */}
                    <rect x="12" y="18" width="24" height="16" rx="5" fill="#064e3b" />
                    {/* Confident eyes */}
                    <circle cx="18" cy="25" r="2.5" fill="#a7f3d0" />
                    <circle cx="30" cy="25" r="2.5" fill="#a7f3d0" />
                    {/* Smile curve */}
                    <path d="M20 29 Q24 32 28 29" stroke="#a7f3d0" strokeWidth="1.5" strokeLinecap="round" />
                    {/* Reviewer Stamp hand */}
                    <rect x="39" y="18" width="6" height="8" rx="2" fill="#10b981" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* THE STAGE TABS BAR */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-zk-border">
            {PIPELINE_STAGES.map((stage) => {
              const isActive = activeStage === stage.id;
              const hasAlert =
                (stage.id === "in_progress" && koraUnresolved) ||
                (stage.id === "ready_to_merge" && letoUnresolved);

              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(stage.id)}
                  className={`group relative flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-bold transition-all shrink-0 ${
                    isActive
                      ? "bg-electric-blue-strong text-white shadow-md shadow-electric-blue/20"
                      : "border border-zk-border bg-zk-surface text-zk-text hover:bg-zk-chip"
                  }`}
                >
                  <span>{stage.icon}</span>
                  <span>{stage.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-extrabold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : hasAlert
                        ? "bg-amber-100 text-amber-900 border border-amber-300"
                        : "bg-zk-chip text-zk-muted"
                    }`}
                  >
                    {stage.count}
                  </span>

                  {hasAlert && !isActive && (
                    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-500 text-[9px] text-white font-bold ring-2 ring-white">
                      !
                    </span>
                  )}
                </button>
              );
            })}

            <button
              onClick={() => setActiveStage("all")}
              className={`rounded-full px-3 py-2 text-xs font-bold transition-all shrink-0 ${
                activeStage === "all"
                  ? "bg-electric-blue-strong text-white shadow-md"
                  : "border border-zk-border bg-zk-surface text-zk-muted hover:text-zk-text hover:bg-zk-chip"
              }`}
            >
              All 278
            </button>
          </div>
        </div>

        {/* =========================================================================
            1-CLICK DECISION FLYOUT (When an agent tab is opened)
            ========================================================================= */}
        {flyoutOpen && activeIssue?.blocker && (
          <div className="my-5 rounded-2xl border-2 border-amber-300/80 bg-gradient-to-br from-amber-50/80 via-white to-amber-50/30 p-5 shadow-lg transition-all animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white font-bold shadow-md shadow-amber-500/20 text-xl">
                  🤖
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-amber-200 px-2 py-0.5 text-[10px] font-extrabold text-amber-900 uppercase">
                      Decision Requested by {activeIssue.assignedAgent?.name ?? "Agent"}
                    </span>
                    <span className="text-xs font-mono font-bold text-zk-muted">
                      Issue #{activeIssue.number}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-zk-text mt-0.5">
                    {activeIssue.blocker.question}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setFlyoutOpen(false)}
                className="text-xs font-bold text-zk-muted hover:text-zk-text p-1 rounded-full hover:bg-zk-chip"
              >
                ✕ Dismiss for now
              </button>
            </div>

            <p className="mt-2.5 text-xs text-zk-text2 pl-13">
              <span className="font-semibold text-zk-text">Context: </span>
              {activeIssue.blocker.context}
            </p>

            {/* Options Radio / Buttons */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 pl-13">
              {activeIssue.blocker.options.map((option, idx) => {
                const isPicked = selectedOption === option;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedOption(option)}
                    className={`flex items-center justify-between rounded-xl border p-3 text-left text-xs font-bold transition-all ${
                      isPicked
                        ? "border-amber-500 bg-amber-100/70 text-amber-950 ring-2 ring-amber-400/50 shadow-xs"
                        : "border-zk-border bg-white text-zk-text hover:bg-zk-chip/50"
                    }`}
                  >
                    <span>{option}</span>
                    <span
                      className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                        isPicked ? "border-amber-600 bg-amber-600 text-white" : "border-zk-border"
                      }`}
                    >
                      {isPicked && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pl-13 pt-3 border-t border-amber-200/60">
              <div className="text-[11px] text-zk-muted">
                Agent status: <span className="font-bold text-amber-700">{activeIssue.assignedAgent?.status}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFlyoutOpen(false)}
                  className="rounded-full border border-zk-border bg-white px-4 py-1.5 text-xs font-bold text-zk-text hover:bg-zk-chip"
                >
                  Postpone
                </button>
                <button
                  type="button"
                  disabled={celebrating}
                  onClick={() => handleResolve(activeIssue.id)}
                  className="flex items-center gap-1.5 rounded-full bg-amber-600 hover:bg-amber-700 px-5 py-1.5 text-xs font-bold text-white shadow-md shadow-amber-600/25 disabled:opacity-50"
                >
                  <span>✓</span>
                  <span>Confirm & Unblock Agent</span>
                </button>
              </div>
            </div>

            {celebrating && (
              <div className="mt-3 rounded-xl bg-emerald-100 border border-emerald-300 p-3 text-xs font-bold text-emerald-800 animate-in fade-in">
                {celebrationMessage}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            ISSUE LIST TABLE
            ========================================================================= */}
        <div className="mt-4 rounded-2xl border border-zk-border bg-zk-surface overflow-hidden shadow-xs">
          <div className="border-b border-zk-border bg-zk-chip/40 px-4 py-3 flex items-center justify-between text-xs font-bold text-zk-muted">
            <span>SHOWING {filteredIssues.length} ISSUES IN &ldquo;{activeStage.toUpperCase()}&rdquo;</span>
            <span className="text-[11px]">Ranked by Consensus & Agent Activity</span>
          </div>

          <div className="divide-y divide-zk-divider">
            {filteredIssues.map((issue) => {
              const isBlocked = issue.blocker && !resolvedIssues.has(issue.id);
              const isSelected = selectedIssueId === issue.id;

              return (
                <div
                  key={issue.id}
                  onClick={() => {
                    setSelectedIssueId(issue.id);
                    if (issue.blocker) setFlyoutOpen(true);
                  }}
                  className={`flex flex-wrap items-center justify-between gap-4 p-4 transition-colors cursor-pointer ${
                    isSelected ? "bg-zk-tint/40" : "hover:bg-zk-chip/20"
                  } ${isBlocked ? "border-l-4 border-l-amber-500 bg-amber-50/20" : ""}`}
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <span className="mt-0.5 text-xs font-mono font-bold text-zk-muted">
                      #{issue.number}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-extrabold text-sm text-zk-text hover:text-electric-blue transition-colors">
                          {issue.title}
                        </span>
                        <span className="rounded-full bg-zk-chip px-2 py-0.5 text-[10px] font-bold text-zk-muted">
                          {issue.category}
                        </span>
                        {isBlocked && (
                          <span className="rounded-full bg-amber-100 border border-amber-300 px-2 py-0.5 text-[10px] font-extrabold text-amber-900 animate-pulse">
                            Needs Your Decision
                          </span>
                        )}
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-zk-muted">
                        <span>Reported by {issue.author}</span>
                        <span>•</span>
                        <span>{issue.updatedAt}</span>
                        {issue.assignedAgent && (
                          <>
                            <span>•</span>
                            <span className="inline-flex items-center gap-1 font-bold text-zk-text">
                              <span
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: issue.assignedAgent.avatarColor }}
                              />
                              Agent: {issue.assignedAgent.name}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-1 rounded-full border border-zk-border bg-zk-chip/50 px-2.5 py-1 text-xs font-bold text-zk-text">
                      <span>▲</span>
                      <span>{issue.votes}</span>
                    </div>

                    {isBlocked ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenFlyout(issue.id, issue.stage);
                        }}
                        className="rounded-full bg-amber-500 hover:bg-amber-600 px-3 py-1 text-xs font-bold text-white shadow-xs"
                      >
                        Action Needed →
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-zk-ok-fg">
                        In Progress
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tutor Presentation Callout */}
        <div className="mt-8 rounded-2xl border border-zk-border bg-zk-surface p-5 text-xs text-zk-text2 flex items-start gap-4">
          <div className="text-2xl">💡</div>
          <div>
            <span className="font-extrabold text-zk-text block mb-1">
              Why Mark Essien will like this concept:
            </span>
            <p>
              It connects the robotic teammate metaphor directly to the pipeline. Instead of opening an inbox to see an empty list, 
              the avatars physically signal <em>where</em> work is blocked, letting a developer or tutor unblock an issue in 1-click without ever breaking flow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
