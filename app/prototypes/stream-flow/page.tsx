"use client";

import { useState } from "react";
import Link from "next/link";
import { MockZikiHeader } from "../mock-ziki-header";
import { MOCK_ISSUES, PIPELINE_STAGES } from "../data";

export default function StreamFlowPage() {
  const [activeStage, setActiveStage] = useState<string>("in_progress");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);
  const [resolvedIds, setResolvedIds] = useState<Set<string>>(new Set());
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>("iss-1");

  const blockedIssues = MOCK_ISSUES.filter(
    (issue) => issue.blocker && !resolvedIds.has(issue.id)
  );

  const filteredIssues = MOCK_ISSUES.filter(
    (issue) => activeStage === "all" || issue.stage === activeStage
  );

  function handleResolveInTray(id: string) {
    setResolvedIds((prev) => new Set(prev).add(id));
  }

  return (
    <div className="relative">
      <MockZikiHeader />

      {/* Floating Concept Explainer Pill */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 border-b border-emerald-200/60 px-4 py-2">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white font-extrabold text-[10px]">
              03
            </span>
            <span className="font-bold text-emerald-950">
              Idea 3: The Stream Flow
            </span>
            <span className="text-emerald-800/80 hidden sm:inline">
              — End-to-end conveyor stream with an Express Lane tray to unblock merges in seconds.
            </span>
          </div>
          <button
            onClick={() => {
              setResolvedIds(new Set());
              setDrawerOpen(true);
              setActiveStage("in_progress");
            }}
            className="rounded-full bg-emerald-200/80 px-2.5 py-0.5 font-bold text-emerald-900 hover:bg-emerald-300 transition-colors text-[11px]"
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
            <span className="font-extrabold text-zk-text text-base">Issues Assembly</span>
            <span className="rounded-full bg-zk-chip px-2 py-0.5 text-xs font-bold text-zk-muted">
              Live Pipeline Stream
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDrawerOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-1.5 text-xs font-extrabold text-emerald-900 shadow-xs transition-colors"
            >
              <span>⚡</span>
              <span>Express Lane</span>
              <span className="rounded-full bg-emerald-600 px-1.5 py-0.2 text-[10px] text-white">
                {blockedIssues.length}
              </span>
            </button>

            <button className="flex h-9 items-center gap-1.5 rounded-full bg-electric-blue-strong px-4 text-xs font-bold text-white shadow-md hover:brightness-105">
              <span>+</span>
              <span>New issue</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            UNIFIED PIPELINE STREAM CONVEYOR
            ========================================================================= */}
        <div className="rounded-2xl border border-zk-border bg-zk-surface p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3 text-xs font-bold text-zk-muted">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              END-TO-END ISSUE LIFECYCLE
            </span>
            <span className="text-[11px]">Correct Flow: Drafts ➔ Ideas ➔ Open ➔ In Progress ➔ Merge ➔ Live</span>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-2">
            {PIPELINE_STAGES.map((stage, idx) => {
              const isActive = activeStage === stage.id;
              const isBlockedStage =
                (stage.id === "in_progress" && !resolvedIds.has("iss-1")) ||
                (stage.id === "ready_to_merge" && !resolvedIds.has("iss-2"));

              return (
                <div key={stage.id} className="flex items-center shrink-0">
                  <button
                    onClick={() => setActiveStage(stage.id)}
                    className={`group relative flex flex-col items-start rounded-xl p-3 text-left transition-all min-w-[130px] ${
                      isActive
                        ? "bg-electric-blue-strong text-white shadow-md shadow-electric-blue/20"
                        : "border border-zk-border bg-zk-chip/40 text-zk-text hover:bg-zk-tint/60"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-base">{stage.icon}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-extrabold ${
                          isActive
                            ? "bg-white/20 text-white"
                            : isBlockedStage
                            ? "bg-amber-100 text-amber-900 border border-amber-300"
                            : "bg-zk-surface text-zk-muted border border-zk-border/60"
                        }`}
                      >
                        {stage.count}
                      </span>
                    </div>

                    <span className="text-xs font-extrabold tracking-tight">
                      {stage.label}
                    </span>

                    <span
                      className={`text-[10px] line-clamp-1 mt-0.5 ${
                        isActive ? "text-white/80" : "text-zk-muted"
                      }`}
                    >
                      {stage.description}
                    </span>

                    {isBlockedStage && !isActive && (
                      <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] text-white font-extrabold ring-2 ring-white">
                        ⚡
                      </span>
                    )}
                  </button>

                  {/* Flow Connector Arrow */}
                  {idx < PIPELINE_STAGES.length - 1 && (
                    <div className="px-1 text-zk-border flex items-center justify-center">
                      <svg className="h-4 w-4 text-zk-muted/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            SLIDE-OUT / EMBEDDED FAST-TRACK EXPRESS TRAY
            ========================================================================= */}
        {drawerOpen && (
          <div className="my-5 rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50/60 via-white to-emerald-50/20 p-5 shadow-lg animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-200/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-sm shadow-xs">
                  ⚡
                </span>
                <div>
                  <h3 className="text-sm font-extrabold text-emerald-950">
                    Express Lane: Active Human Decision Bottlenecks
                  </h3>
                  <p className="text-[11px] text-emerald-800">
                    {blockedIssues.length > 0
                      ? `Surfacing ${blockedIssues.length} questions blocking autonomous agent deployment.`
                      : "All bottlenecks cleared! Agents are actively deploying code."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-bold text-emerald-900 hover:bg-emerald-100"
                >
                  Collapse Tray
                </button>
              </div>
            </div>

            {blockedIssues.length === 0 ? (
              <div className="py-6 text-center text-xs font-bold text-emerald-800">
                🎉 No pending forks! Every agent has what they need to merge into production.
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {blockedIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className="flex flex-col justify-between rounded-xl border border-emerald-200 bg-white p-4 shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold text-emerald-800 uppercase">
                          Stage: {issue.stage.replace("_", " ")}
                        </span>
                        <span className="text-xs font-mono font-bold text-zk-muted">
                          #{issue.number}
                        </span>
                      </div>

                      <h4 className="text-sm font-extrabold text-zk-text">
                        {issue.title}
                      </h4>

                      <div className="mt-2 rounded-lg bg-zk-chip/50 p-2.5 text-xs text-zk-text2 border border-zk-divider">
                        <div className="flex items-center gap-1.5 font-bold text-zk-text mb-1">
                          <span>🤖 {issue.assignedAgent?.name}:</span>
                        </div>
                        <p>{issue.blocker?.question}</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zk-divider flex items-center justify-between gap-2">
                      <span className="text-[11px] text-zk-muted">
                        Agent: <strong className="text-zk-text">{issue.assignedAgent?.name}</strong>
                      </span>
                      <button
                        onClick={() => handleResolveInTray(issue.id)}
                        className="rounded-full bg-emerald-600 hover:bg-emerald-700 px-4 py-1.5 text-xs font-bold text-white shadow-xs transition-colors"
                      >
                        ✓ Approve & Unblock
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            ISSUE LIST TABLE
            ========================================================================= */}
        <div className="mt-4 rounded-2xl border border-zk-border bg-zk-surface overflow-hidden shadow-xs">
          <div className="border-b border-zk-border bg-zk-chip/30 px-4 py-3 flex items-center justify-between text-xs font-bold text-zk-muted">
            <span className="uppercase">
              CURRENT CONVEYOR STAGE: {activeStage.replace("_", " ")} ({filteredIssues.length} ISSUES)
            </span>
            <span className="text-[11px] text-emerald-700 font-bold">
              Automated Flow Stream
            </span>
          </div>

          <div className="divide-y divide-zk-divider">
            {filteredIssues.map((issue) => {
              const isBlocked = issue.blocker && !resolvedIds.has(issue.id);

              return (
                <div
                  key={issue.id}
                  onClick={() => setSelectedIssueId(issue.id)}
                  className={`flex flex-wrap items-center justify-between gap-4 p-4 transition-colors hover:bg-zk-chip/20 cursor-pointer ${
                    isBlocked ? "border-l-4 border-l-emerald-500 bg-emerald-50/10" : ""
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
                        {isBlocked && (
                          <span className="rounded-full bg-emerald-100 border border-emerald-300 px-2 py-0.5 text-[10px] font-extrabold text-emerald-800">
                            In Express Tray
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
                        onClick={(e) => {
                          e.stopPropagation();
                          setDrawerOpen(true);
                        }}
                        className="rounded-full bg-emerald-600 hover:bg-emerald-700 px-3 py-1 text-xs font-bold text-white shadow-xs"
                      >
                        Unblock in Express Tray →
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-zk-ok-fg">
                        Active Flow
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
          <div className="text-2xl">⚡</div>
          <div>
            <span className="font-extrabold text-zk-text block mb-1">
              Why Mark Essien will appreciate this:
            </span>
            <p>
              Mark specifically stated: <em>&ldquo;Human review is the bottleneck... we have not been able to get any PRs into production... we need to break through that bottleneck.&rdquo;</em>
              The Express Lane creates a zero-friction queue where all human touchpoints across the entire company are cleared in seconds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
