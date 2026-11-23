import type { BenchmarkRun } from "./types";

/**
 * Current open-weight benchmark runs. Empty until runs are recorded.
 *
 * To add a run, append a record. Use `{ status: "not-measured" }` for any value
 * that was not captured — a measured zero is `{ status: "measured", value: 0 }`.
 */
export const runs: BenchmarkRun[] = [];
