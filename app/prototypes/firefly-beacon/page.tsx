"use client";

import { useState } from "react";
import Link from "next/link";
import { MockZikiHeader } from "../mock-ziki-header";
import { MOCK_ISSUES, PIPELINE_STAGES } from "../data";

export default function FireflyBeaconPage() {
  const [activeStage, setActiveStage] = useState<string>("ready_to_merge");
  const [activePopover, setActivePopover] = useState<string | null>("ready_to_merge");
  const [resolvedStages, setResolvedStages] = useState<Set<string>>(new Set());
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>("iss-2");
  const [feedbackGiven, setFeedbackGiven] = useState<boolean>(false);

  const filteredIssues = MOCK_ISSUES.filter(
    (issue) => activeStage === "all" || issue.stage === activeStage
  );

  const inProgressNeedsInput = !resolvedStages.has("in_progress");
  const mergeNeedsDesign = !resolvedStages.has("ready_to_merge");

  function handleQuickResolve(stageId: string, issueId: string) {
    setFeedbackGiven(true);
    setResolvedStages((prev) => new Set(prev).add(stageId));
    setTimeout(() => {
      setFeedbackGiven(false);
      setActivePopover(null);
    }, 2000);
  }

  return (
    <div className="relative">
      <MockZikiHeader />

      {/* Floating Concept Explainer Pill */}
      <div className="bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-500/10 border-b border-blue-200/60 px-4 py-2">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-electric-blue text-white font-extrabold text-[10px]">
              02
            </span>
            <span className="font-bold text-blue-900">
              Idea 2: The Firefly Beacon
            </span>
            <span className="text-blue-800/80 hidden sm:inline">
              — Ambient glowing beacons and light prisms signal human touchpoints without visual noise.
            </span>
          </div>
          <button
            onClick={() => {
              setResolvedStages(new Set());
              setActivePopover("ready_to_merge");
              setActiveStage("ready_to_merge");
              setSelectedIssueId("iss-2");
            }}
            className="rounded-full bg-blue-200/80 px-2.5 py-0.5 font-bold text-blue-900 hover:bg-blue-300 transition-colors text-[11px]"
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
              Ambient Radar Active
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search issues..."
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
            PIPELINE STAGE TABS WITH FIREFLY BEACONS
            ========================================================================= */}
        <div className="relative pt-6 pb-2">
          <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-zk-border">
            {PIPELINE_STAGES.map((stage) => {
              const isActive = activeStage === stage.id;
              const hasAmberFirefly = stage.id === "in_progress" && inProgressNeedsInput;
              const hasPrismBeacon = stage.id === "ready_to_merge" && mergeNeedsDesign;

              return (
                <div key={stage.id} className="relative">
                  <button
                    onClick={() => {
                      setActiveStage(stage.id);
                      if (hasAmberFirefly || hasPrismBeacon) {
                        setActivePopover(stage.id);
                      } else {
                        setActivePopover(null);
                      }
                    }}
                    className={`relative flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold transition-all shrink-0 ${
                      isActive
                        ? "bg-electric-blue-strong text-white shadow-md shadow-electric-blue/20"
                        : "border border-zk-border bg-zk-surface text-zk-text hover:bg-zk-chip"
                    }`}
                  >
                    <span>{stage.icon}</span>
                    <span>{stage.label}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-extrabold ${
                        isActive ? "bg-white/20 text-white" : "bg-zk-chip text-zk-muted"
                      }`}
                    >
                      {stage.count}
                    </span>
                  </button>

                  {/* AMBER FIREFLY (Logic Blocker) */}
                  {hasAmberFirefly && (
                    <div
                      onClick={() => setActivePopover("in_progress")}
                      className="absolute -top-3.5 right-2 z-20 cursor-pointer flex items-center justify-center group"
                      title="1 Logic decision needed"
                    >
                      <span className="absolute h-6 w-6 rounded-full bg-amber-400/40 animate-ping" />
                      <div className="relative flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-[10px] text-amber-950 shadow-md ring-2 ring-white">
                        ✨
                      </div>
                    </div>
                  )}

                  {/* RAINBOW PRISM (Visual Design Review) */}
                  {hasPrismBeacon && (
                    <div
                      onClick={() => setActivePopover("ready_to_merge")}
                      className="absolute -top-3.5 right-2 z-20 cursor-pointer flex items-center justify-center group"
                      title="1 Design feedback needed"
                    >
                      <span className="absolute h-6 w-6 rounded-full bg-indigo-400/40 animate-ping" />
                      <div className="relative flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-emerald-400 text-[10px] text-white shadow-md ring-2 ring-white">
                        🎨
                      </div>
                    </div>
                  )}

                  {/* POPOVER CARD */}
                  {activePopover === stage.id && (
                    <div className="absolute left-0 top-12 z-30 w-80 rounded-2xl border border-zk-border bg-zk-surface/95 backdrop-blur-md p-4 shadow-xl ring-1 ring-black/5 animate-in fade-in zoom-in-95">
                      <div className="flex items-start justify-between gap-2 border-b border-zk-divider pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-base">
                            {stage.id === "in_progress" ? "✨" : "🎨"}
                          </span>
                          <div>
                            <span className="text-xs font-extrabold text-zk-text block">
                              {stage.id === "in_progress"
                                ? "Human Guidance Beacon"
                                : "Design Consensus Beacon"}
                            </span>
                            <span className="text-[10px] text-zk-muted">
                              {stage.id === "in_progress"
                                ? "Issue #1440 · Agent Kora"
                                : "PR #1402 · Agent Leto"}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => setActivePopover(null)}
                          className="text-xs text-zk-muted hover:text-zk-text p-1"
                        >
                          ✕
                        </button>
                      </div>

                      <p className="mt-2.5 text-xs text-zk-text2">
                        {stage.id === "in_progress"
                          ? "Kora is stuck determining whether exponential retry backoff should apply to all test suites or just external runner."
                          : "Leto completed all unit & screenshot tests. This changes global CSS brand tokens and requires human visual approval."}
                      </p>

                      <div className="mt-3 flex items-center justify-end gap-2 pt-2 border-t border-zk-divider">
                        <button
                          onClick={() => {
                            setActivePopover(null);
                            setSelectedIssueId(stage.id === "in_progress" ? "iss-1" : "iss-2");
                          }}
                          className="rounded-full border border-zk-border bg-zk-chip/50 px-3 py-1 text-[11px] font-bold text-zk-text hover:bg-zk-chip"
                        >
                          View Issue
                        </button>
                        <button
                          onClick={() =>
                            handleQuickResolve(
                              stage.id,
                              stage.id === "in_progress" ? "iss-1" : "iss-2"
                            )
                          }
                          className="rounded-full bg-electric-blue-strong hover:bg-electric-blue px-3 py-1 text-[11px] font-bold text-white shadow-xs"
                        >
                          {stage.id === "in_progress" ? "Confirm Default" : "Approve Colors"}
                        </button>
                      </div>

                      {feedbackGiven && (
                        <div className="mt-2 text-center text-[11px] font-extrabold text-emerald-600 bg-emerald-50 rounded-lg py-1 border border-emerald-200">
                          ✓ Beacon cleared! Agent unblocked.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            ISSUE SPOTLIGHT & TABLE
            ========================================================================= */}
        <div className="mt-6 rounded-2xl border border-zk-border bg-zk-surface overflow-hidden shadow-xs">
          <div className="border-b border-zk-border bg-zk-chip/30 px-4 py-3 flex items-center justify-between text-xs font-bold text-zk-muted">
            <span className="uppercase">
              CURRENT STAGE: {activeStage.replace("_", " ")} ({filteredIssues.length} ISSUES)
            </span>
            <span className="text-[11px] text-electric-blue font-bold">
              Ambient Firefly Engine: Clean & Non-Intrusive
            </span>
          </div>

          <div className="divide-y divide-zk-divider">
            {filteredIssues.map((issue) => {
              const isTarget = selectedIssueId === issue.id;
              const hasBeacon =
                (issue.id === "iss-1" && inProgressNeedsInput) ||
                (issue.id === "iss-2" && mergeNeedsDesign);

              return (
                <div
                  key={issue.id}
                  onClick={() => setSelectedIssueId(issue.id)}
                  className={`flex flex-wrap items-center justify-between gap-4 p-4 transition-all cursor-pointer ${
                    isTarget ? "bg-zk-tint/40 ring-1 ring-inset ring-electric-blue/30" : "hover:bg-zk-chip/20"
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <span className="mt-0.5 text-xs font-mono font-bold text-zk-muted">
                      #{issue.number}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-extrabold text-sm text-zk-text">
                          {issue.title}
                        </span>
                        <span className="rounded-full bg-zk-chip px-2 py-0.5 text-[10px] font-bold text-zk-muted">
                          {issue.category}
                        </span>
                        {hasBeacon && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 border border-purple-300 px-2.5 py-0.5 text-[10px] font-extrabold text-purple-900 shadow-xs">
                            <span>✨</span> Beacon Active
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
                              {issue.assignedAgent.name} ({issue.assignedAgent.role})
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

                    {hasBeacon ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePopover(issue.stage);
                        }}
                        className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 px-3 py-1 text-xs font-bold text-white shadow-xs"
                      >
                        Inspect Beacon →
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-zk-muted">
                        Normal
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
          <div className="text-2xl">✨</div>
          <div>
            <span className="font-extrabold text-zk-text block mb-1">
              Why this passes Mark Essien&apos;s &ldquo;Non-Intrusive&rdquo; Rule:
            </span>
            <p>
              During Call 5, Mark repeatedly praised interactions that enhance the interface without being annoying or cluttering the workspace. 
              The Firefly Beacon is completely non-intrusive: it takes up zero extra layout height, provides ambient feedback, and can be dismissed in 1-click.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
