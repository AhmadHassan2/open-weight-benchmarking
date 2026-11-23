import type { HistoricalObservation } from "./types";

/**
 * Earlier commercial runs, recorded labels verbatim. Costs are the amounts in
 * the supplied screenshot. Historical context only — not part of the active
 * open-weight comparison, and no savings are computed against them.
 */
export const historicalObservations: HistoricalObservation[] = [
  { modelLabel: "Sonnet 4-6", inputTokens: 76, outputTokens: 359, reportedCost: "0.00233875", latencyMs: 4276, finish: "stop", quality: "3/3" },
  { modelLabel: "Opus 4-7", inputTokens: 109, outputTokens: 203, reportedCost: "0.001405", latencyMs: 4880, finish: "stop", quality: "3/3" },
  { modelLabel: "Sonnet 4.5", inputTokens: 75, outputTokens: 197, reportedCost: "0.001325", latencyMs: 3542, finish: "stop", quality: "3/3" },
  { modelLabel: "Haiku 4.5", inputTokens: 75, outputTokens: 195, reportedCost: "0.0013125", latencyMs: 2282, finish: "stop", quality: "3/3" },
];

/** Details that were not supplied with the historical rows. Do not infer them. */
export const historicalNotSupplied = [
  "Prompt",
  "Run date",
  "Price schedule",
  "Currency denomination beyond the dollar symbol",
  "Sample size behind each displayed score",
  "Scoring rubric",
];

/** Labels from an earlier off-network comparison watchlist, verbatim. */
export const watchlistLabels = [
  "Kimi K3.1 Pro",
  "DeepSeek V4.1 Flash",
  "GLM 5.2/5.3",
  "Qwen 3.8-Max",
  "Qwen 3.8 Flash Next",
  "Qwen 3.8-27B",
  "MiniMax M3",
];
