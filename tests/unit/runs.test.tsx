import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EMPTY_RUNS_MESSAGE, MeasuredValue, RunsTable } from "@/components/RunsTable";
import type { BenchmarkRun } from "@/data";

const notMeasured = { status: "not-measured" } as const;
const m = (value: number) => ({ status: "measured", value }) as const;

// Test-only fixtures. The site's data has no runs yet.
const fixtures: BenchmarkRun[] = [
  {
    runId: "run-a",
    taskId: "reading-understanding-code",
    checkpointId: "rnj-1-instruct",
    datasetId: "cruxeval",
    datasetSplit: "output prediction",
    attempts: 10,
    successes: m(0),
    quality: m(0),
    qualityLabel: null,
    latencyP50Ms: m(0),
    latencyP95Ms: notMeasured,
    attributableCostUsd: m(0.5),
  },
  {
    runId: "run-b",
    taskId: "reading-understanding-code",
    checkpointId: "granite-4.2-8b",
    datasetId: "cruxeval",
    datasetSplit: "output prediction",
    attempts: 10,
    successes: m(4),
    quality: notMeasured,
    qualityLabel: null,
    latencyP50Ms: m(1200),
    latencyP95Ms: m(2400),
    attributableCostUsd: m(0.2),
  },
  {
    runId: "run-c",
    taskId: "reading-understanding-code",
    checkpointId: "mellum-2.1-thinking",
    datasetId: "cruxeval",
    datasetSplit: "input prediction",
    attempts: 5,
    successes: m(5),
    quality: m(1),
    qualityLabel: "5/5",
    latencyP50Ms: notMeasured,
    latencyP95Ms: notMeasured,
    attributableCostUsd: notMeasured,
  },
];

describe("RunsTable", () => {
  it("shows the plain empty state when there are no runs", () => {
    render(<RunsTable runs={[]} />);
    expect(screen.getByText(EMPTY_RUNS_MESSAGE)).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("keeps a measured zero distinct from not measured", () => {
    render(<RunsTable runs={fixtures} />);
    const rows = screen.getAllByRole("row");
    const runA = rows.find((r) => within(r).queryByText("run-a"))!;
    expect(within(runA).getByText("0.0%")).toBeInTheDocument();
    expect(within(runA).getByText("0 ms")).toBeInTheDocument();
    expect(within(runA).getByText("Not measured")).toBeInTheDocument();
  });

  it("shows undefined cost per successful task when there are zero successes", () => {
    render(<RunsTable runs={fixtures} />);
    const runA = screen.getAllByRole("row").find((r) => within(r).queryByText("run-a"))!;
    expect(within(runA).getByText("Undefined (0 successes)")).toBeInTheDocument();
  });

  it("divides attributable cost by successes", () => {
    render(<RunsTable runs={fixtures} />);
    const runB = screen.getAllByRole("row").find((r) => within(r).queryByText("run-b"))!;
    expect(within(runB).getByText("$0.05")).toBeInTheDocument();
  });

  it("shows cost as not measured when cost was not captured", () => {
    render(<RunsTable runs={fixtures} />);
    const runC = screen.getAllByRole("row").find((r) => within(r).queryByText("run-c"))!;
    expect(within(runC).getAllByText("Not measured").length).toBeGreaterThanOrEqual(3);
  });

  it("renders MeasuredValue zero as a number", () => {
    render(<MeasuredValue value={m(0)} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
