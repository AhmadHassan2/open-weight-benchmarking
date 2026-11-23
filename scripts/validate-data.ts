/**
 * Data-integrity checks for the research catalog. Structural only: no network
 * requests are made, so links are checked against the supplied list, not live.
 * Run with `npm run validate:data`.
 */
import {
  categories,
  tasks,
  checkpoints,
  categoryCandidates,
  datasets,
  taskDatasets,
  contracts,
  runs,
  historicalObservations,
  getDataset,
} from "../src/data";

const errors: string[] = [];
const ok: string[] = [];
const check = (cond: boolean, msg: string) => (cond ? ok.push(msg) : errors.push(msg));

// Unique IDs
for (const [name, items] of [
  ["categories", categories],
  ["tasks", tasks],
  ["checkpoints", checkpoints],
  ["categoryCandidates", categoryCandidates],
  ["datasets", datasets],
  ["taskDatasets", taskDatasets],
] as const) {
  const ids = items.map((i) => i.id);
  check(new Set(ids).size === ids.length, `${name}: ids are unique`);
}

// Task counts per category
const expectedTasks: Record<string, number> = {
  "understanding-communication": 8,
  "code-generation": 5,
  "quality-maintenance": 8,
  "advanced-agentic": 4,
};
check(tasks.length === 25, `25 tasks (found ${tasks.length})`);
for (const [cat, n] of Object.entries(expectedTasks)) {
  const found = tasks.filter((t) => t.categoryId === cat).length;
  check(found === n, `${cat}: ${n} tasks (found ${found})`);
}

// Category entries vs unique checkpoints, counted independently
const expectedEntries: Record<string, number> = {
  "understanding-communication": 8,
  "code-generation": 8,
  "quality-maintenance": 7,
  "advanced-agentic": 7,
};
check(categoryCandidates.length === 30, `30 category entries (found ${categoryCandidates.length})`);
for (const [cat, n] of Object.entries(expectedEntries)) {
  const found = categoryCandidates.filter((c) => c.categoryId === cat).length;
  check(found === n, `${cat}: ${n} candidate entries (found ${found})`);
}
const referenced = new Set(categoryCandidates.map((c) => c.checkpointId));
check(checkpoints.length === 20, `20 unique checkpoints (found ${checkpoints.length})`);
check(referenced.size === checkpoints.length, `every checkpoint is used by at least one category entry`);

// Relationships resolve
const taskIds = new Set(tasks.map((t) => t.id));
const catIds = new Set(categories.map((c) => c.id));
const cpIds = new Set(checkpoints.map((c) => c.id));
const dsIds = new Set(datasets.map((d) => d.id));
for (const t of tasks) check(catIds.has(t.categoryId), `task ${t.id} → category resolves`);
for (const c of categoryCandidates) {
  check(cpIds.has(c.checkpointId), `entry ${c.id} → checkpoint resolves`);
  check(catIds.has(c.categoryId), `entry ${c.id} → category resolves`);
  for (const tid of c.priorityTaskIds) {
    const task = tasks.find((t) => t.id === tid);
    check(!!task && task.categoryId === c.categoryId, `entry ${c.id} → priority task ${tid} is in its category`);
  }
  for (const tid of c.interpretiveTaskIds) {
    check(c.priorityTaskIds.includes(tid), `entry ${c.id} → interpretive ${tid} is also a priority`);
  }
}
for (const td of taskDatasets) {
  check(taskIds.has(td.taskId), `mapping ${td.id} → task resolves`);
  check(dsIds.has(td.datasetId), `mapping ${td.id} → dataset resolves`);
}
for (const d of datasets) {
  check(taskDatasets.some((td) => td.datasetId === d.id), `dataset ${d.id} is used by a task`);
}
for (const t of tasks) {
  check(taskDatasets.some((td) => td.taskId === t.id), `task ${t.id} has at least one dataset`);
  check(categoryCandidates.some((c) => c.categoryId === t.categoryId), `task ${t.id} has a candidate pool`);
  check(contracts.filter((c) => c.taskId === t.id).length === 1, `task ${t.id} has exactly one contract`);
}
// Understanding & Communication: three explicit primaries per task
for (const t of tasks.filter((t) => t.categoryId === "understanding-communication")) {
  const n = categoryCandidates.filter((c) => c.priorityTaskIds.includes(t.id)).length;
  check(n === 3, `U&C task ${t.id} has 3 primary candidates (found ${n})`);
}

// Supplied links: exact URLs on the intended records
const expectedModelUrls: Record<string, string> = {
  "rnj-1-instruct": "https://huggingface.co/EssentialAI/rnj-1-instruct",
  "granite-4.2-8b": "https://huggingface.co/ibm-granite/granite-4.2-8b",
  "ministral-3-8b-instruct-2512": "https://huggingface.co/mistralai/Ministral-3-8B-Instruct-2512",
  "nemotron-3.5-bolt-e4b-bf16": "https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-BF16",
  "mellum-2.1-thinking": "https://huggingface.co/JetBrains/Mellum2.1-12B-A2.5B-Thinking",
  "qwen3.5-4b": "https://huggingface.co/Qwen/Qwen3.5-4B",
  "qwen3.5-9b": "https://huggingface.co/Qwen/Qwen3.5-9B",
  "gemma-4-12b-it": "https://huggingface.co/google/gemma-4-12b-it",
  "granite-4.1-8b": "https://huggingface.co/ibm-granite/granite-4.1-8b",
  "devstral-small-2-24b-instruct-2512": "https://huggingface.co/mistralai/Devstral-Small-2-24B-Instruct-2512",
  "qwen3.8-27b": "https://huggingface.co/Qwen/Qwen3.8-27B",
  "qwen3-coder-30b-a3b-instruct": "https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct",
  "qwen3-coder-next": "https://huggingface.co/Qwen/Qwen3-Coder-Next",
  "qwen3.8-flash-next": "https://huggingface.co/Qwen/Qwen3.8-Flash-Next",
  "recursive-flint-bf16": "https://huggingface.co/RecursiveSI/flint",
  "devstral-2-123b-instruct-2512": "https://huggingface.co/mistralai/Devstral-2-123B-Instruct-2512",
  "glm-5.3": "https://huggingface.co/zai-org/GLM-5.3",
  "nemotron-3.5-super-vl-120b-a12b-bf16": "https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-BF16",
  "beam-1.0-501b-a23b": "https://huggingface.co/reflection/Beam-1.0-501B-A23B",
  "glm-5.3-bf16": "https://huggingface.co/zai-org/GLM-5.3-BF16",
};
for (const [id, url] of Object.entries(expectedModelUrls)) {
  check(checkpoints.find((c) => c.id === id)?.modelCard.url === url, `model ${id} links to ${url}`);
}
// Model links as listed per category in the supplied list
const expectedCategoryModels: Record<string, string[]> = {
  "understanding-communication": ["rnj-1-instruct", "granite-4.2-8b", "ministral-3-8b-instruct-2512", "nemotron-3.5-bolt-e4b-bf16", "mellum-2.1-thinking", "qwen3.5-4b", "qwen3.5-9b", "gemma-4-12b-it"],
  "code-generation": ["granite-4.1-8b", "rnj-1-instruct", "mellum-2.1-thinking", "devstral-small-2-24b-instruct-2512", "qwen3.8-27b", "qwen3-coder-30b-a3b-instruct", "qwen3-coder-next", "qwen3.8-flash-next"],
  "quality-maintenance": ["rnj-1-instruct", "mellum-2.1-thinking", "devstral-small-2-24b-instruct-2512", "qwen3.8-27b", "recursive-flint-bf16", "devstral-2-123b-instruct-2512", "glm-5.3"],
  "advanced-agentic": ["mellum-2.1-thinking", "devstral-small-2-24b-instruct-2512", "recursive-flint-bf16", "nemotron-3.5-super-vl-120b-a12b-bf16", "qwen3.8-flash-next", "beam-1.0-501b-a23b", "glm-5.3-bf16"],
};
for (const [cat, ids] of Object.entries(expectedCategoryModels)) {
  const actual = categoryCandidates.filter((c) => c.categoryId === cat).map((c) => c.checkpointId).sort();
  check(JSON.stringify(actual) === JSON.stringify([...ids].sort()), `${cat}: candidate checkpoints match the supplied link list`);
}

const expectedTaskDatasetUrls: Record<string, string[]> = {
  "code-explanation": ["https://huggingface.co/datasets/TIGER-Lab/SWE-QA-Pro-Bench"],
  "reading-understanding-code": ["https://huggingface.co/datasets/cruxeval-org/cruxeval"],
  summarization: ["https://huggingface.co/datasets/JetBrains-Research/lca-module-summarization", "https://huggingface.co/datasets/nebius/SWE-rebench-V2-PRs"],
  "codebase-qa": ["https://huggingface.co/datasets/TIGER-Lab/SWE-QA-Pro-Bench"],
  "technical-questions": ["https://huggingface.co/datasets/freshstack/queries-oct-2024"],
  "docstring-generation": ["https://huggingface.co/datasets/SciCodePile/SciCode-Doc-Alignment"],
  "commit-pr-description": ["https://huggingface.co/datasets/JetBrains-Research/lca-commit-message-generation", "https://huggingface.co/datasets/nebius/SWE-rebench-V2-PRs"],
  "error-stack-trace-diagnosis": ["https://huggingface.co/datasets/OrderLab/distdebug-bench", "https://github.com/OrderLab/distdebug-bench"],
  "single-function": ["https://github.com/abhishekcpp007/gauntlet-harness/tree/main/datasets"],
  "multifile-project": ["https://github.com/Klavis-AI/Multi-step-SWE"],
  "fim-autocomplete": ["https://huggingface.co/datasets/microsoft/delulu-fim-benchmark", "https://github.com/abhishekcpp007/gauntlet-harness/tree/main/datasets/gauntlet-live-js-2026-11"],
  "boilerplate-scaffolding": ["https://huggingface.co/datasets/eth-sri/AutoBaxBench", "https://github.com/vitejs/vite/tree/main/packages/create-vite"],
  "unfamiliar-code-generation": ["https://github.com/MAPS-research/NovelAPIBench"],
  "test-generation": ["https://github.com/abhishekcpp007/gauntlet-harness/tree/main/datasets"],
  debugging: ["https://github.com/abhishekcpp007/gauntlet-harness/tree/main/datasets"],
  refactoring: ["https://zenodo.org/records/17655592"],
  "code-review": ["https://huggingface.co/datasets/foundry-ai/swe-prbench"],
  "type-annotation-lint": ["https://github.com/abhishekcpp007/gauntlet-harness/tree/main/datasets"],
  "migration-upgrades": ["https://github.com/Klavis-AI/Multi-step-SWE"],
  "performance-suggestions": ["https://huggingface.co/datasets/gso-bench/gso", "https://gso-bench.github.io/"],
  "technical-debt": ["https://zenodo.org/records/3666840"],
  "tool-function-calling": ["https://huggingface.co/datasets/gorilla-llm/Berkeley-Function-Calling-Leaderboard", "https://gorilla.cs.berkeley.edu/blogs/13_bfcl_v3_multi_turn.html", "https://huggingface.co/datasets/ScaleAI/MCP-Atlas"],
  "multi-step-workflows": ["https://github.com/Klavis-AI/Multi-step-SWE"],
  "language-translation": ["https://github.com/DeepSoftwareAnalytics/RepoTransBench"],
  "optimization-profiling": ["https://huggingface.co/datasets/gso-bench/gso", "https://huggingface.co/datasets/AdAstraAbyssoque/accelerate-bench"],
};
for (const [taskId, urls] of Object.entries(expectedTaskDatasetUrls)) {
  const available = new Set(
    taskDatasets
      .filter((td) => td.taskId === taskId)
      .flatMap((td) => getDataset(td.datasetId)?.links.map((l) => l.url) ?? []),
  );
  for (const url of urls) check(available.has(url), `task ${taskId} reaches ${url}`);
}

const allUrls = [...checkpoints.map((c) => c.modelCard.url), ...datasets.flatMap((d) => d.links.map((l) => l.url))];
for (const url of allUrls) {
  let parsed: URL | null = null;
  try {
    parsed = new URL(url);
  } catch {
    /* invalid */
  }
  check(!!parsed && parsed.protocol === "https:", `${url} is a valid https URL`);
  check(!url.includes("utm_"), `${url} has no tracking parameters`);
}

// Worked navigation checks
const traceRow = taskDatasets.find(
  (td) => td.taskId === "error-stack-trace-diagnosis" && td.datasetId === "distdebug-bench" && td.eligibleSubset?.count === 28,
);
check(!!traceRow, "DistDebug-Bench 28 trace-bearing cases on Error/stack trace diagnosis");
check(
  taskDatasets.some((td) => td.taskId === "error-stack-trace-diagnosis" && td.datasetId === "distdebug-bench" && td.slice.includes("120")),
  "DistDebug-Bench wider 120-incident set on Error/stack trace diagnosis",
);
const optimization = taskDatasets.filter((td) => td.taskId === "optimization-profiling").map((td) => td.datasetId);
check(optimization.includes("gso") && optimization.includes("accelerate-bench"), "GSO and Accelerate Bench on Optimization");
check(getDataset("accelerate-bench")?.name === "Accelerate Bench v1.1", "Accelerate Bench v1.1 exact spelling");
const accel = taskDatasets.find((td) => td.datasetId === "accelerate-bench");
check(accel?.eligibleSubset?.count === null, "Accelerate Bench license-compatible subset has no invented count");
const gauntletTasks = taskDatasets.filter((td) => td.datasetId === "gauntlet-live").map((td) => td.taskId).sort();
check(
  JSON.stringify(gauntletTasks) === JSON.stringify(["debugging", "fim-autocomplete", "single-function", "test-generation", "type-annotation-lint"]),
  "Gauntlet Live is mapped to its 5 tasks",
);

// Contracts and historical rows
check(contracts.every((c) => c.status === "draft" && c.prompt.kind === "proposed"), "all contracts are drafts with proposed prompts");
check(historicalObservations.length === 4, "4 historical observations");
check(runs.length === 0, "no current runs recorded (empty state expected)");

const chinese = checkpoints.filter((c) => c.chinesePublisher).map((c) => c.name);
console.log(`Chinese-publisher checkpoints flagged (${chinese.length}): ${chinese.join(", ")}`);

console.log(`${ok.length} checks passed`);
if (errors.length) {
  console.error(`${errors.length} checks FAILED:`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}
