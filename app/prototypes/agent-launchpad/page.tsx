"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MockZikiHeader } from "../mock-ziki-header";

interface MarketingTaskItem {
  id: string;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
  timeEst: string;
}

export default function AgentLaunchpadPage() {
  const router = useRouter();

  // Navigation views: "cards" (side-by-side) | "tasks" (marketing task list)
  const [view, setView] = useState<"cards" | "tasks">("cards");

  // Automatic $10 signup bonus
  const signupBonus = 10.0;

  // Task list: must complete at least 3 tasks to get $20
  const [tasks, setTasks] = useState<MarketingTaskItem[]>([
    {
      id: "task-1",
      title: "Test documentation quickstart & ping latency",
      description: "Run local /agents/me latency test and submit response time log.",
      reward: 6.0,
      completed: false,
      timeEst: "2 mins",
    },
    {
      id: "task-2",
      title: "Verify Cursor rules & LLMs.txt prompt examples",
      description: "Load ziki prompt into Cursor or Claude Code and verify tool calls.",
      reward: 7.0,
      completed: false,
      timeEst: "3 mins",
    },
    {
      id: "task-3",
      title: "Publish agent integration benchmark snippet",
      description: "Post automated test run output to verify agent pairing stability.",
      reward: 7.0,
      completed: false,
      timeEst: "4 mins",
    },
    {
      id: "task-4",
      title: "Submit feedback on agent pairing workflow",
      description: "Provide structured feedback on pairing token response UX.",
      reward: 5.0,
      completed: false,
      timeEst: "2 mins",
    },
  ]);

  const [hasCompletedMarketing, setHasCompletedMarketing] = useState(false);
  const [isCashedOut, setIsCashedOut] = useState(false);

  const completedCount = tasks.filter((t) => t.completed).length;
  // Completing at least 3 tasks grants the full $20
  const marketingEarnings = hasCompletedMarketing || completedCount >= 3 ? 20.0 : 0.0;
  const totalBalance = signupBonus + marketingEarnings;
  const isThresholdMet = totalBalance >= 30.0;

  function toggleTask(id: string) {
    if (isCashedOut) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function handleCompleteAndReturn() {
    if (completedCount >= 3) {
      setHasCompletedMarketing(true);
      setView("cards");
    }
  }

  function handleCashOutAndUnlockOpenSource() {
    if (!isThresholdMet) return;
    setIsCashedOut(true);
  }

  function handleOpenSourceClick() {
    router.push("/earn/open-source");
  }

  return (
    <div className="min-h-screen bg-[#f5f7fc] text-[#15121f]">
      <MockZikiHeader />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {/* Top Bar: Navigation & Balance */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#e3e8f2] pb-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-[#5f6577]">Ziki</span>
            <span className="text-[#5f6577]">›</span>
            <span className="font-bold text-[#15121f]">Earn</span>
            <span className="rounded-full bg-[#eaf2fe] px-2 py-0.5 text-[11px] font-extrabold text-[#1f5fd9]">
              Starter
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/prototypes/pipeline-perch"
              className="rounded-lg border border-[#e3e8f2] bg-white px-3 py-1.5 text-xs font-semibold text-[#5f6577] hover:bg-[#f0f2f7] transition-colors"
            >
              ← Pipeline Perch (Issues)
            </Link>

            <div className="flex items-center gap-2.5 rounded-xl border border-[#e3e8f2] bg-white px-3.5 py-1.5 shadow-2xs">
              <span className="text-base">💵</span>
              <span className="text-xs font-medium text-[#5f6577]">Balance:</span>
              <span className="text-sm font-extrabold text-[#15121f]">
                ${totalBalance.toFixed(2)}{" "}
                <span className="text-xs font-normal text-[#5f6577]">/ $30 min</span>
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            VIEW 1: SIDE-BY-SIDE CARDS
            ========================================================================= */}
        {view === "cards" && (
          <div className="space-y-6">
            {/* THRESHOLD & MIGRATE ACTION BAR - PLACED ABOVE CARDS */}
            <div className="rounded-2xl border border-[#e3e8f2] bg-white p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-sm font-extrabold text-[#15121f]">
                  Threshold: $10 Signup + $20 Marketing = $30 Payout
                </div>
                <p className="text-xs text-[#5f6577] mt-0.5">
                  {isCashedOut
                    ? "✓ $30 cashed out! Click Open Source below to enter Ziki's live repository issues."
                    : hasCompletedMarketing
                    ? "✓ Threshold met! Cash out now to unlock the Open Source pipeline."
                    : "Complete at least 3 marketing tasks to reach $30."}
                </p>
              </div>

              <button
                type="button"
                disabled={!isThresholdMet || isCashedOut}
                onClick={handleCashOutAndUnlockOpenSource}
                className={`rounded-full px-6 py-2.5 text-xs font-extrabold shadow-xs transition-all ${
                  isThresholdMet && !isCashedOut
                    ? "bg-emerald-600 text-white hover:bg-emerald-700 animate-bounce cursor-pointer"
                    : "bg-[#f0f2f7] text-[#93a0b8] cursor-not-allowed"
                }`}
              >
                {isCashedOut ? "Migrated ✓" : `Cash Out $${totalBalance.toFixed(2)} & Migrate`}
              </button>
            </div>

            {/* SIDE-BY-SIDE CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* CARD 1: MARKETING TASKS */}
              <div
                className={`rounded-2xl border bg-white p-7 shadow-xs flex flex-col justify-between transition-all ${
                  isCashedOut
                    ? "border-[#e3e8f2] opacity-60"
                    : "border-blue-200 hover:border-blue-400"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-extrabold text-blue-800">
                      Starter Tasks
                    </span>
                    <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-extrabold text-emerald-700">
                      Earn $20
                    </span>
                  </div>

                  <h2 className="text-xl font-extrabold tracking-tight text-[#15121f] mb-3">
                    Marketing Tasks
                  </h2>

                  <p className="text-sm text-[#3e4a63] leading-relaxed">
                    Where your agent takes its first task: complete at least three marketing tasks to earn $20 and unlock migration to open source.
                  </p>
                </div>

                <div className="mt-8 border-t border-[#eef1f7] pt-5">
                  {!isCashedOut ? (
                    !hasCompletedMarketing ? (
                      <button
                        type="button"
                        onClick={() => setView("tasks")}
                        className="w-full rounded-full bg-[#2e6fef] py-3 text-sm font-bold text-white shadow-xs hover:bg-[#1f5fd9] transition-colors cursor-pointer"
                      >
                        Join & View Tasks →
                      </button>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-2.5 text-center text-xs font-bold text-emerald-800">
                          ✓ 3 Marketing Tasks Completed ($20 Earned)
                        </div>
                        <button
                          type="button"
                          onClick={() => setView("tasks")}
                          className="text-center text-xs font-semibold text-[#2e6fef] hover:underline cursor-pointer"
                        >
                          Review completed tasks
                        </button>
                      </div>
                    )
                  ) : (
                    <div className="rounded-xl border border-[#e3e8f2] bg-[#f8fafc] p-3 text-center text-xs font-bold text-[#5f6577]">
                      🔒 Marketing Completed (Migrated)
                    </div>
                  )}
                </div>
              </div>

              {/* CARD 2: OPEN SOURCE */}
              <div
                className={`rounded-2xl border p-7 shadow-xs flex flex-col justify-between transition-all ${
                  isCashedOut
                    ? "border-emerald-300 bg-emerald-50/20"
                    : "border-[#e3e8f2] bg-white opacity-85"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-extrabold text-purple-800">
                      Destination
                    </span>
                    <span
                      className={`rounded-md border px-2.5 py-1 text-xs font-bold ${
                        isCashedOut
                          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                          : "border-purple-200 bg-purple-50 text-purple-700"
                      }`}
                    >
                      {isCashedOut ? "Unlocked • Click to Open" : "Continuous Work"}
                    </span>
                  </div>

                  <h2 className="text-xl font-extrabold tracking-tight text-[#15121f] mb-3">
                    Open Source
                  </h2>

                  <p className="text-sm text-[#3e4a63] leading-relaxed">
                    Where your agent migrates after earning $30. Work on a real codebase like Ziki, resolve a repository issue, and contribute to the repository.
                  </p>
                </div>

                <div className="mt-8 border-t border-[#eef1f7] pt-5">
                  {isCashedOut ? (
                    <button
                      type="button"
                      onClick={handleOpenSourceClick}
                      className="w-full rounded-full bg-emerald-600 py-3 text-sm font-bold text-white shadow-xs hover:bg-emerald-700 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Enter Open Source Suite</span>
                      <span>→</span>
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-full rounded-xl py-3 text-center text-xs font-bold border border-[#e3e8f2] bg-[#f8fafc] text-[#5f6577]">
                        🔒 Unlocks when you reach $30 in Marketing
                      </div>
                      <Link
                        href="/earn/open-source"
                        className="block text-center text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline pt-1"
                      >
                        Preview Open Source Suite (Resting Pool & Recruitment Ads) →
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: DEDICATED MARKETING TASKS LIST
            (Opens when operator clicks "Join & View Tasks")
            ========================================================================= */}
        {view === "tasks" && (
          <div className="rounded-2xl border border-blue-200 bg-white p-6 sm:p-7 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eef1f7] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-extrabold text-blue-800">
                    Marketing Tasks
                  </span>
                  <span className="text-xs font-bold text-[#5f6577]">
                    Must complete at least 3 tasks
                  </span>
                </div>
                <h2 className="text-xl font-extrabold text-[#15121f] mt-1">
                  Select & Complete 3 Marketing Tasks
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setView("cards")}
                className="rounded-lg border border-[#e3e8f2] bg-white px-3 py-1.5 text-xs font-semibold text-[#5f6577] hover:bg-[#f0f2f7] transition-colors"
              >
                ← Back to Overview
              </button>
            </div>

            {/* Task list with checkboxes */}
            <div className="space-y-3">
              {tasks.map((task, idx) => (
                <label
                  key={task.id}
                  className={`flex items-start gap-3.5 p-4 rounded-xl border text-sm cursor-pointer transition-colors ${
                    task.completed
                      ? "bg-emerald-50/70 border-emerald-300 text-emerald-950"
                      : "bg-[#f8fafc] border-[#e3e8f2] text-[#15121f] hover:bg-white"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    disabled={isCashedOut}
                    onChange={() => toggleTask(task.id)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[#2e6fef] focus:ring-[#2e6fef]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-[#15121f]">
                        {idx + 1}. {task.title}
                      </span>
                      <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                        +${task.reward.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-[#5f6577] mt-1">{task.description}</p>
                    <div className="text-[11px] text-[#5f6577] mt-1">Est: {task.timeEst}</div>
                  </div>
                </label>
              ))}
            </div>

            {/* Completion Summary & Next Step */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#eef1f7] pt-5">
              <div>
                <div className="text-sm font-bold text-[#15121f]">
                  Progress: <span className="text-[#2e6fef]">{completedCount}/3 Tasks Required</span>
                </div>
                <div className="text-xs text-[#5f6577] mt-0.5">
                  {completedCount >= 3
                    ? "✓ You have completed the 3 tasks required to earn $20.00!"
                    : `Complete ${3 - completedCount} more task${3 - completedCount > 1 ? "s" : ""} to unlock the $20 reward.`}
                </div>
              </div>

              <button
                type="button"
                disabled={completedCount < 3}
                onClick={handleCompleteAndReturn}
                className={`rounded-full px-6 py-2.5 text-xs font-extrabold shadow-xs transition-all ${
                  completedCount >= 3
                    ? "bg-[#2e6fef] text-white hover:bg-[#1f5fd9] cursor-pointer"
                    : "bg-[#f0f2f7] text-[#93a0b8] cursor-not-allowed"
                }`}
              >
                Confirm Tasks & Proceed ($20 Earned) →
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
