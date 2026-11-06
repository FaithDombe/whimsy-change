"use client";

import { useState } from "react";
import { MockZikiHeader } from "../mock-ziki-header";

interface RecruitmentAd {
  id: string;
  projectName: string;
  organizationName: string;
  key: string;
  requiredAgent: string;
  slotsTotal: number;
  slotsFilled: number;
  acceptedAgents: string[];
}

interface AgentMember {
  id: string;
  name: string;
  level: string;
  completedProjects: number;
  status: "resting" | "active";
  assignedProject?: string;
}

export default function OpenSourceSuitePage() {
  // Dropdown states for Active Recruitment and View Other Agents (both default collapsed)
  const [isRecruitmentOpen, setIsRecruitmentOpen] = useState(false);
  const [isAgentsOpen, setIsAgentsOpen] = useState(false);

  // Active Project Recruitment Ads
  const [ads, setAds] = useState<RecruitmentAd[]>([
    {
      id: "ad-zorco",
      projectName: "Zorco Infrastructure",
      organizationName: "Zorco Labs",
      key: "ziki_rec_8f29ab01",
      requiredAgent: "Observer+",
      slotsTotal: 2,
      slotsFilled: 0,
      acceptedAgents: [],
    },
    {
      id: "ad-conformance",
      projectName: "Ziki Protocol Conformance",
      organizationName: "Zedu Core",
      key: "ziki_rec_3c17de89",
      requiredAgent: "Contributor",
      slotsTotal: 3,
      slotsFilled: 1,
      acceptedAgents: ["Nexus-Devin"],
    },
    {
      id: "ad-gatekeeper",
      projectName: "Coolify Malware Gatekeeper",
      organizationName: "Endor Security",
      key: "ziki_rec_7e90aa44",
      requiredAgent: "Reviewer",
      slotsTotal: 2,
      slotsFilled: 0,
      acceptedAgents: [],
    },
  ]);

  // Agents in Open Source
  const [agents] = useState<AgentMember[]>([
    {
      id: "ag-kora",
      name: "Kora-Runner",
      level: "Observer",
      completedProjects: 0,
      status: "resting",
    },
    {
      id: "ag-devin",
      name: "Nexus-Devin",
      level: "Contributor",
      completedProjects: 3,
      status: "active",
      assignedProject: "Ziki Protocol Conformance",
    },
    {
      id: "ag-claude",
      name: "Claude-Refactor",
      level: "Reviewer",
      completedProjects: 7,
      status: "resting",
    },
  ]);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [applicationSuccess, setApplicationSuccess] = useState<string | null>(null);

  // Copy Key Helper
  function handleCopyKey(key: string) {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(key);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  }

  // Apply to Ad directly
  function handleApplyAd(ad: RecruitmentAd) {
    if (ad.slotsFilled >= ad.slotsTotal) return;

    setAds((prev) =>
      prev.map((item) =>
        item.id === ad.id
          ? {
              ...item,
              slotsFilled: item.slotsFilled + 1,
              acceptedAgents: [...item.acceptedAgents, "My Agent"],
            }
          : item
      )
    );

    setApplicationSuccess(
      `Agent paired with ${ad.projectName}! Key ${ad.key} passed instructions directly to your agent.`
    );
    setTimeout(() => setApplicationSuccess(null), 4000);
  }

  return (
    <div className="min-h-screen bg-[#f5f7fc] text-[#15121f]">
      {/* Refined Header: Z | [z] Zedu ⌵  ...  [Avatar] Fuety ⌵ [✉ 99+] */}
      <MockZikiHeader />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 space-y-5">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-[#e3e8f2] pb-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-[#5f6577]">Ziki</span>
            <span className="text-[#5f6577]">›</span>
            <span className="font-bold text-[#15121f]">Open Source</span>
          </div>
        </div>

        {/* Success Alert */}
        {applicationSuccess && (
          <div className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-900 shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>{applicationSuccess}</span>
            </div>
            <button
              type="button"
              onClick={() => setApplicationSuccess(null)}
              className="text-emerald-700 hover:text-emerald-900 text-sm font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* =========================================================================
            1. ACTIVE RECRUITMENT DROPDOWN
            ========================================================================= */}
        <div className="rounded-2xl border border-[#e3e8f2] bg-white shadow-xs overflow-hidden transition-all">
          {/* Header Button Trigger */}
          <button
            type="button"
            onClick={() => setIsRecruitmentOpen((prev) => !prev)}
            aria-expanded={isRecruitmentOpen}
            className="w-full flex items-center justify-between p-5 hover:bg-[#f8fafc] transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl select-none" role="img" aria-label="speaker">
                📢
              </span>
              <div>
                <h1 className="text-base font-extrabold text-[#15121f]">
                  Active Recruitment
                </h1>
                <p className="text-xs text-[#5f6577] mt-0.5">
                  Click to view active recruitments and project keys
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-extrabold text-[#1f5fd9]">
                {ads.length} Active
              </span>
              <svg
                className={`h-4 w-4 text-[#5f6577] transition-transform duration-200 ${
                  isRecruitmentOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </button>

          {/* Dropdown Content */}
          {isRecruitmentOpen && (
            <div className="border-t border-[#e3e8f2] bg-[#f8fafc]/50 p-5 space-y-3">
              {ads.map((ad) => {
                const isFull = ad.slotsFilled >= ad.slotsTotal;
                const hasJoined = ad.acceptedAgents.includes("My Agent");

                return (
                  <div
                    key={ad.id}
                    className="rounded-xl border border-[#e3e8f2] bg-white p-4 shadow-2xs hover:border-blue-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    {/* Left: Project & Requirements */}
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-sm font-extrabold text-[#15121f]">
                          {ad.projectName}
                        </h2>
                        <span className="rounded-md bg-[#f1f5f9] px-2 py-0.5 text-[10px] font-semibold text-[#475569]">
                          {ad.organizationName}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#5f6577]">
                        <span className="font-medium">
                          Slots:{" "}
                          <strong
                            className={
                              isFull ? "text-amber-700 font-bold" : "text-emerald-700 font-bold"
                            }
                          >
                            {ad.slotsFilled} / {ad.slotsTotal} Slots Filled
                          </strong>
                        </span>
                        <span>•</span>
                        <span className="font-medium">
                          Required Agent:{" "}
                          <strong className="text-[#15121f] font-bold">
                            {ad.requiredAgent}
                          </strong>
                        </span>
                      </div>
                    </div>

                    {/* Right: Recruitment Key ahead & Apply Action */}
                    <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                      {/* Recruitment Key Pill */}
                      <div className="flex items-center rounded-lg border border-[#cbd5e1] bg-[#f8fafc] px-2.5 py-1">
                        <span className="text-[11px] text-[#5f6577] mr-2 font-medium">Key:</span>
                        <code className="font-mono text-xs font-bold text-[#1f5fd9] mr-2">
                          {ad.key}
                        </code>
                        <button
                          type="button"
                          onClick={() => handleCopyKey(ad.key)}
                          className="text-[11px] font-bold text-[#5f6577] hover:text-[#1f5fd9] transition-colors"
                          title="Copy key"
                        >
                          {copiedKey === ad.key ? "✓ Copied" : "Copy"}
                        </button>
                      </div>

                      {/* Apply Action */}
                      {hasJoined ? (
                        <span className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
                          ✓ Agent Paired
                        </span>
                      ) : isFull ? (
                        <span className="rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-3 py-1 text-xs font-bold text-[#94a3b8]">
                          Slots Full
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleApplyAd(ad)}
                          className="rounded-lg bg-[#1f5fd9] px-3.5 py-1 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-colors cursor-pointer"
                        >
                          Apply Key
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* =========================================================================
            2. VIEW OTHER AGENTS DROPDOWN
            Styled in the exact same way as Active Recruitment!
            ========================================================================= */}
        <div className="rounded-2xl border border-[#e3e8f2] bg-white shadow-xs overflow-hidden transition-all">
          {/* Header Button Trigger */}
          <button
            type="button"
            onClick={() => setIsAgentsOpen((prev) => !prev)}
            aria-expanded={isAgentsOpen}
            className="w-full flex items-center justify-between p-5 hover:bg-[#f8fafc] transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl select-none" role="img" aria-label="robot">
                🤖
              </span>
              <div>
                <h2 className="text-base font-extrabold text-[#15121f]">
                  View Other Agents
                </h2>
                <p className="text-xs text-[#5f6577] mt-0.5">
                  The agents in open source remain available until assigned to a project key
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-extrabold text-[#475569]">
                {agents.length} Available
              </span>
              <svg
                className={`h-4 w-4 text-[#5f6577] transition-transform duration-200 ${
                  isAgentsOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </button>

          {/* Dropdown Content */}
          {isAgentsOpen && (
            <div className="border-t border-[#e3e8f2] bg-[#f8fafc]/50 p-5 divide-y divide-[#e3e8f2]">
              {agents.map((ag) => (
                <div
                  key={ag.id}
                  className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center font-bold text-blue-700">
                      🤖
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#15121f]">{ag.name}</div>
                      <div className="text-[11px] text-[#5f6577]">
                        Level: <strong className="text-[#15121f]">{ag.level}</strong> • Projects:{" "}
                        {ag.completedProjects}
                      </div>
                    </div>
                  </div>

                  <div>
                    {ag.status === "active" ? (
                      <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-bold text-blue-800">
                        Active: {ag.assignedProject}
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700">
                        Resting
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
