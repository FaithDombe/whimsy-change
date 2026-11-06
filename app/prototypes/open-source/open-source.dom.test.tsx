// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import OpenSourceSuitePage from "./page";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

afterEach(() => {
  cleanup();
});

describe("OpenSourceSuitePage (#848)", () => {
  it("renders both Active Recruitment and View Other Agents collapsed by default", () => {
    render(<OpenSourceSuitePage />);

    expect(screen.getByRole("heading", { name: "Active Recruitment", level: 1 })).toBeDefined();
    expect(screen.getByRole("heading", { name: "View Other Agents", level: 2 })).toBeDefined();

    // Verify subtitle on View Other Agents
    expect(
      screen.getByText("The agents in open source remain available until assigned to a project key")
    ).toBeDefined();

    // Ensure ad details are not visible yet
    expect(screen.queryByText("Zorco Infrastructure")).toBeNull();
    expect(screen.queryByText("Kora-Runner")).toBeNull();
  });

  it("expands Active Recruitment dropdown on click and displays ads with keys", () => {
    render(<OpenSourceSuitePage />);

    const recruitmentToggle = screen.getByRole("button", { name: /Active Recruitment/i });
    fireEvent.click(recruitmentToggle);

    // Ads should now be visible
    expect(screen.getByText("Zorco Infrastructure")).toBeDefined();
    expect(screen.getByText("Zorco Labs")).toBeDefined();
    expect(screen.getByText("ziki_rec_8f29ab01")).toBeDefined();
    expect(screen.getAllByText("0 / 2 Slots Filled").length).toBeGreaterThan(0);

    // Should NOT show arbitrary bounty/points tokens
    expect(screen.queryByText("$")).toBeNull();
  });

  it("expands View Other Agents dropdown on click and displays resting agents", () => {
    render(<OpenSourceSuitePage />);

    const agentsToggle = screen.getByRole("button", { name: /View Other Agents/i });
    fireEvent.click(agentsToggle);

    // Standby agents should now be visible
    expect(screen.getByText("Kora-Runner")).toBeDefined();
    expect(screen.getByText("Nexus-Devin")).toBeDefined();
    expect(screen.getByText("Claude-Refactor")).toBeDefined();
    expect(screen.getAllByText("Resting").length).toBeGreaterThan(0);
  });

  it("allows applying directly with key and shows feedback", () => {
    render(<OpenSourceSuitePage />);

    // Open recruitment
    const recruitmentToggle = screen.getByRole("button", { name: /Active Recruitment/i });
    fireEvent.click(recruitmentToggle);

    // Click Apply Key on first ad
    const applyButtons = screen.getAllByRole("button", { name: /Apply Key/i });
    expect(applyButtons.length).toBeGreaterThan(0);
    fireEvent.click(applyButtons[0]);

    // Should show success confirmation
    expect(screen.getByText(/Agent paired with Zorco Infrastructure/i)).toBeDefined();
  });
});
