export interface PrototypeIssue {
  id: string;
  number: number;
  title: string;
  stage: "drafts" | "ideas" | "open" | "in_progress" | "ready_to_merge" | "live";
  category: "Fixes" | "Features" | "Design" | "Performance" | "Infrastructure";
  severity: "high" | "medium" | "low";
  author: string;
  updatedAt: string;
  votes: number;
  assignedAgent?: {
    name: string;
    avatarColor: string;
    role: string;
    status: string;
  };
  blocker?: {
    type: "input_needed" | "design_feedback" | "idea_consensus";
    question: string;
    context: string;
    options: string[];
    defaultOption?: string;
  };
}

export const MOCK_ISSUES: PrototypeIssue[] = [
  {
    id: "iss-1",
    number: 1440,
    title: "Exponential retry backoff strategy across test suites",
    stage: "in_progress",
    category: "Fixes",
    severity: "high",
    author: "Faith Dombe",
    updatedAt: "18m ago",
    votes: 42,
    assignedAgent: {
      name: "Kora",
      avatarColor: "#f59e0b",
      role: "Core Triager",
      status: "Waiting for human answer",
    },
    blocker: {
      type: "input_needed",
      question: "Should exponential retry backoff apply to ALL test suites or strictly the external API runner?",
      context: "Applying to all suites prevents false failures on CI but adds ~45s overhead to local unit runs.",
      options: [
        "All test suites (Safer on CI)",
        "External runner only (Faster local runs)",
        "Make it configurable via project notes",
      ],
      defaultOption: "External runner only (Faster local runs)",
    },
  },
  {
    id: "iss-2",
    number: 1402,
    title: "Brand green refresh on status pills and badge borders",
    stage: "ready_to_merge",
    category: "Design",
    severity: "medium",
    author: "Stephen",
    updatedAt: "32m ago",
    votes: 28,
    assignedAgent: {
      name: "Leto",
      avatarColor: "#10b981",
      role: "Reviewer & Merger",
      status: "Automated checks passed · Awaiting design signoff",
    },
    blocker: {
      type: "design_feedback",
      question: "All 18 automated tests & screenshot diffs passed, but this changes global brand tokens. Do humans approve this visual delta?",
      context: "Delta: --zk-ok-bg updated from #e3f6ec to #dcfce7, contrast ratio improves from 4.6:1 to 5.2:1.",
      options: [
        "Approve & Merge into Production",
        "Keep current color palette",
        "Request secondary dark-mode check",
      ],
      defaultOption: "Approve & Merge into Production",
    },
  },
  {
    id: "iss-3",
    number: 1421,
    title: "Webhook re-render loop on issue attribute edit",
    stage: "in_progress",
    category: "Fixes",
    severity: "high",
    author: "Yolanda",
    updatedAt: "2h ago",
    votes: 19,
    assignedAgent: {
      name: "Duncan",
      avatarColor: "#3b82f6",
      role: "Backend Specialist",
      status: "Running unit tests",
    },
  },
  {
    id: "iss-4",
    number: 1398,
    title: "Prisma migration lock timeout handler during deployment",
    stage: "ready_to_merge",
    category: "Infrastructure",
    severity: "low",
    author: "Faith Dombe",
    updatedAt: "4h ago",
    votes: 14,
    assignedAgent: {
      name: "Thufir",
      avatarColor: "#6366f1",
      role: "Ops Agent",
      status: "Ready for final merge",
    },
  },
  {
    id: "iss-5",
    number: 1390,
    title: "Replace toggle tables with game-like agent dispatch dock",
    stage: "ideas",
    category: "Features",
    severity: "medium",
    author: "Community Suggestion",
    updatedAt: "1h ago",
    votes: 56,
    blocker: {
      type: "idea_consensus",
      question: "Agents reached 88% consensus on this feature proposal. Greenlight into Open issue backlog?",
      context: "Replaces traditional SaaS tables with game-like interactive cards per Mark Essien's review.",
      options: [
        "Promote to Open Issue Backlog",
        "Hold for community call discussion",
        "Archive draft",
      ],
      defaultOption: "Promote to Open Issue Backlog",
    },
  },
  {
    id: "iss-6",
    number: 1385,
    title: "Standardize agent level pairing tokens across organizations",
    stage: "open",
    category: "Features",
    severity: "low",
    author: "Alice Admin",
    updatedAt: "5h ago",
    votes: 12,
  },
  {
    id: "iss-7",
    number: 1378,
    title: "Cron secret bearer authorization sweep script",
    stage: "live",
    category: "Infrastructure",
    severity: "medium",
    author: "Ziki Bot",
    updatedAt: "1d ago",
    votes: 8,
  },
  {
    id: "iss-8",
    number: 1360,
    title: "Auto-generate PR test screenshots via headless Chromium",
    stage: "drafts",
    category: "Features",
    severity: "low",
    author: "Faith Dombe (Scratchpad)",
    updatedAt: "25m ago",
    votes: 3,
  },
];

export const PIPELINE_STAGES = [
  { id: "drafts", label: "Drafts", count: 62, icon: "📝", description: "Private brainstorms & unshared notes" },
  { id: "ideas", label: "Ideas", count: 9, icon: "💡", description: "Team proposals & agent consensus deliberations", hasAction: true },
  { id: "open", label: "Open", count: 138, icon: "⭕", description: "Approved issues ready for agents to claim" },
  { id: "in_progress", label: "In progress", count: 22, icon: "⏱", description: "Active coding, debugging & test runs", hasAction: true },
  { id: "ready_to_merge", label: "Ready to Merge", count: 3, icon: "🔀", description: "All CI tests passed; awaiting merge consensus", hasAction: true },
  { id: "live", label: "Live", count: 7, icon: "🚀", description: "Safely deployed to production without human friction" },
] as const;
