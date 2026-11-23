import type { Dataset } from "./types";

/**
 * Factual dataset metadata. Licenses are as reported in the research notes —
 * enterprise approval is a separate field. Links come only from the supplied
 * link list; appendix citations without URLs are kept as text.
 */
const base = {
  version: null,
  pinnedRevision: null,
  provenance: null,
  sourceItemDate: null,
  exposure: "unknown" as const,
  enterpriseApproval: "Not reviewed" as const,
};

export const datasets: Dataset[] = [
  {
    ...base,
    id: "swe-qa-pro-bench",
    name: "SWE-QA-Pro Bench",
    publicRelease: "Mar 20, 2026",
    license: "MIT",
    upstreamTerms: null,
    size: { count: 260, unit: "test questions", text: "260 test questions, 26 repositories" },
    coverage:
      "Questions and reference answers tied to exact repository commits. “Why” questions suit explaining behavior; factual and dependency questions suit codebase Q&A.",
    provenance: "Questions tied to exact repository commits.",
    links: [
      {
        kind: "Dataset card",
        label: "SWE-QA-Pro Bench dataset card",
        url: "https://huggingface.co/datasets/TIGER-Lab/SWE-QA-Pro-Bench",
      },
    ],
    citationsAsSupplied: ["huggingface.co"],
  },
  {
    ...base,
    id: "cruxeval",
    name: "CRUXEval",
    publicRelease: "Jan 2024",
    pinnedRevision: "19f319a",
    license: "MIT",
    upstreamTerms: null,
    size: { count: 800, unit: "Python functions", text: "800 Python functions" },
    coverage:
      "Predict a function’s output from its input, or find an input that produces a specified output. Gives an executable correctness check for code comprehension.",
    links: [
      {
        kind: "Dataset card",
        label: "CRUXEval dataset card",
        url: "https://huggingface.co/datasets/cruxeval-org/cruxeval",
      },
    ],
    citationsAsSupplied: ["cruxeval-org/cruxeval at 19f319a"],
  },
  {
    ...base,
    id: "lca-module-summarization",
    name: "Long Code Arena – Module Summarization",
    publicRelease: "Jun 2024",
    license: "Apache 2.0",
    upstreamTerms: null,
    size: { count: 216, unit: "test examples", text: "216 test examples" },
    coverage:
      "Python source files and documentation intent paired with a manually curated reference document. Primarily module-level.",
    provenance: "Manually curated reference documents.",
    links: [
      {
        kind: "Dataset card",
        label: "Long Code Arena – Module Summarization dataset card",
        url: "https://huggingface.co/datasets/JetBrains-Research/lca-module-summarization",
      },
    ],
    citationsAsSupplied: ["huggingface.co"],
  },
  {
    ...base,
    id: "swe-rebench-v2-prs",
    name: "SWE-rebench-V2-PRs",
    publicRelease: "Mar 3, 2026 announcement",
    license: "CC BY 4.0",
    upstreamTerms: null,
    size: { count: 126300, unit: "PRs", text: "126,300 PRs" },
    coverage:
      "Real multilingual PRs with patches, repository identifiers, and PR descriptions. A training corpus from which to draw an evaluation sample.",
    provenance: "Real pull requests from public repositories.",
    links: [
      {
        kind: "Dataset card",
        label: "SWE-rebench-V2-PRs dataset card",
        url: "https://huggingface.co/datasets/nebius/SWE-rebench-V2-PRs",
      },
    ],
    citationsAsSupplied: ["Datasets at Hugging Face"],
  },
  {
    ...base,
    id: "freshstack-qa",
    name: "FreshStack – Questions and Answers",
    publicRelease: "Apr 2025 publication; Oct 2024 snapshot",
    version: "Oct 2024 snapshot",
    license: "CC BY-SA 4.0",
    upstreamTerms: null,
    size: { count: 672, unit: "test questions", text: "672 test questions" },
    coverage:
      "Developer questions with accepted Stack Overflow answers and key answer facts across Angular, Godot, LangChain, Laravel, and YOLO.",
    provenance: "Stack Overflow questions and accepted answers.",
    sourceItemDate: "Oct 2024 snapshot",
    links: [
      {
        kind: "Dataset card",
        label: "FreshStack queries (Oct 2024) dataset card",
        url: "https://huggingface.co/datasets/freshstack/queries-oct-2024",
      },
    ],
    citationsAsSupplied: ["huggingface.co"],
  },
  {
    ...base,
    id: "scicode-doc-alignment",
    name: "SciCode-Doc-Alignment",
    publicRelease: "Mar 13, 2026 dataset upload",
    license: "Apache 2.0",
    upstreamTerms: null,
    size: {
      count: 500000,
      unit: "function–docstring pairs",
      text: "500,000 function–docstring pairs, publisher-reported",
    },
    coverage:
      "Scientific-computing functions paired with Gemini-generated docstrings. Useful for function-level documentation.",
    provenance: "Reference docstrings are synthetic (Gemini-generated).",
    links: [
      {
        kind: "Dataset card",
        label: "SciCode-Doc-Alignment dataset card",
        url: "https://huggingface.co/datasets/SciCodePile/SciCode-Doc-Alignment",
      },
    ],
    citationsAsSupplied: ["Datasets at Hugging Face"],
  },
  {
    ...base,
    id: "lca-commit-message-generation",
    name: "Long Code Arena – Commit Message Generation",
    publicRelease: "Jun 2024",
    license: "Apache 2.0",
    upstreamTerms: null,
    size: { count: 163, unit: "test commits", text: "163 test commits, 34 repositories" },
    coverage:
      "Manually curated, larger Python commits with file changes, diffs, and original commit messages.",
    provenance: "Manually curated commits with their original messages.",
    links: [
      {
        kind: "Dataset card",
        label: "Long Code Arena – Commit Message Generation dataset card",
        url: "https://huggingface.co/datasets/JetBrains-Research/lca-commit-message-generation",
      },
    ],
    citationsAsSupplied: ["huggingface.co"],
  },
  {
    ...base,
    id: "distdebug-bench",
    name: "DistDebug-Bench",
    publicRelease: "Nov 2026",
    license: "MIT for benchmark annotations, metadata, and code",
    upstreamTerms: "Upstream terms apply to issues and attachments.",
    size: {
      count: 120,
      unit: "incidents",
      text: "120 incidents, 11 systems; 28 reports contain a stack trace",
    },
    coverage:
      "Incident reports, logs, pre-fix source, and human-labeled root-cause locations.",
    provenance: "Human-labeled root-cause locations.",
    links: [
      {
        kind: "Dataset card",
        label: "DistDebug-Bench dataset card",
        url: "https://huggingface.co/datasets/OrderLab/distdebug-bench",
      },
      {
        kind: "Repository",
        label: "DistDebug-Bench project repository",
        url: "https://github.com/OrderLab/distdebug-bench",
      },
    ],
    citationsAsSupplied: ["github.com"],
  },
  {
    ...base,
    id: "gauntlet-live",
    name: "Gauntlet Live — Python and JS/TS",
    publicRelease: "Nov 2026",
    license: "MIT repository",
    upstreamTerms: "Check each upstream project’s license; upstream code retains its license.",
    size: {
      count: 122,
      unit: "candidate PRs before filtering",
      text: "53 Python + 69 JS/TS PRs before filtering",
    },
    coverage:
      "Dated, recent pull requests from Python and JavaScript/TypeScript projects with their original tests.",
    links: [
      {
        kind: "Repository",
        label: "Gauntlet Live datasets (repository folder)",
        url: "https://github.com/abhishekcpp007/gauntlet-harness/tree/main/datasets",
      },
      {
        kind: "Repository",
        label: "Gauntlet Live JS/TS subset, 2026-11 (repository folder)",
        url: "https://github.com/abhishekcpp007/gauntlet-harness/tree/main/datasets/gauntlet-live-js-2026-11",
      },
    ],
    citationsAsSupplied: ["opencode.terrychan.org"],
  },
  {
    ...base,
    id: "multi-step-swe",
    name: "Multi-step SWE",
    publicRelease: "Nov 4, 2026",
    license: "MIT benchmark",
    upstreamTerms: "Bundled upstream code retains its license.",
    size: {
      count: 69,
      unit: "tasks (workflows)",
      text: "69 tasks, 574 steps, 9 languages across the full suite",
    },
    coverage:
      "Workflows of 5–15 dependent requests in which the agent carries its own code changes forward. Includes from-scratch feature tasks and migration/version-upgrade tasks.",
    links: [
      {
        kind: "Repository",
        label: "Multi-step SWE repository",
        url: "https://github.com/Klavis-AI/Multi-step-SWE",
      },
    ],
    citationsAsSupplied: ["arxiv.org", "www.klavis.ai"],
  },
  {
    ...base,
    id: "delulu",
    name: "Microsoft Delulu",
    publicRelease: "May 2026",
    license: "Code licensed per row",
    upstreamTerms: "Select MIT, Apache-2.0, or BSD rows.",
    size: {
      count: 947,
      unit: "unique prompts",
      text: "947 unique prompts, 319 repositories, 7 languages",
    },
    coverage: "Multilingual fill-in-the-middle completion, including invented API calls.",
    links: [
      {
        kind: "Dataset card",
        label: "Microsoft Delulu FIM Benchmark dataset card",
        url: "https://huggingface.co/datasets/microsoft/delulu-fim-benchmark",
      },
    ],
    citationsAsSupplied: ["arxiv.org"],
  },
  {
    ...base,
    id: "autobaxbench",
    name: "AutoBaxBench",
    publicRelease: "Dec 2025",
    license: "MIT",
    upstreamTerms: null,
    size: {
      count: 560,
      unit: "tasks",
      text: "40 backend scenarios × 14 frameworks = 560 tasks",
    },
    coverage: "Backend service scaffolding across 14 frameworks.",
    links: [
      {
        kind: "Dataset card",
        label: "AutoBaxBench dataset card",
        url: "https://huggingface.co/datasets/eth-sri/AutoBaxBench",
      },
    ],
    citationsAsSupplied: ["huggingface.co"],
  },
  {
    ...base,
    id: "vite-starter-templates",
    name: "Vite starter templates",
    publicRelease: "Nov 2026 update",
    license: "MIT",
    upstreamTerms: null,
    size: {
      count: 2,
      unit: "selected Solid presets",
      text: "2 selected Solid presets, JavaScript and TypeScript",
    },
    coverage:
      "Reference templates used as scaffolding fixtures for two custom frontend cases. Not a benchmark dataset in itself.",
    links: [
      {
        kind: "Repository",
        label: "create-vite templates (repository folder)",
        url: "https://github.com/vitejs/vite/tree/main/packages/create-vite",
      },
    ],
    citationsAsSupplied: ["huggingface.co (cited for the row as a whole)"],
  },
  {
    ...base,
    id: "novelapibench",
    name: "NovelAPIBench",
    publicRelease: "June 2, 2026",
    license: "Apache-2.0 for benchmark records and harness",
    upstreamTerms: "Source excerpts retain upstream licenses.",
    size: { count: 1670, unit: "published tasks", text: "1,670 published tasks covering 856 APIs" },
    coverage:
      "Code generation against supplied API documentation. Includes a generator for creating cases from APIs introduced after a given date.",
    links: [
      {
        kind: "Repository",
        label: "NovelAPIBench repository",
        url: "https://github.com/MAPS-research/NovelAPIBench",
      },
    ],
    citationsAsSupplied: ["github.com"],
  },
  {
    ...base,
    id: "swe-refactor-v2",
    name: "SWE-Refactor v2",
    publicRelease: "Nov 19, 2025",
    version: "v2",
    license: "CC BY 4.0 for this dataset version",
    upstreamTerms: null,
    size: { count: 1099, unit: "refactorings", text: "1,099 refactorings across 18 Java projects" },
    coverage: "Requested structural refactorings in Java projects, with build and tests.",
    links: [
      {
        kind: "Dataset record (Zenodo)",
        label: "SWE-Refactor v2 record on Zenodo",
        url: "https://zenodo.org/records/17655592",
      },
    ],
    citationsAsSupplied: ["Zenodo"],
  },
  {
    ...base,
    id: "swe-prbench",
    name: "SWE-PRBench",
    publicRelease: "Mar 2026",
    license: "CC BY 4.0",
    upstreamTerms: null,
    size: { count: 350, unit: "PRs", text: "350 PRs across five languages" },
    coverage: "Pull requests with human-identified review issues across five languages.",
    provenance: "Human-identified review issues.",
    links: [
      {
        kind: "Dataset card",
        label: "SWE-PRBench dataset card",
        url: "https://huggingface.co/datasets/foundry-ai/swe-prbench",
      },
    ],
    citationsAsSupplied: ["arxiv.org"],
  },
  {
    ...base,
    id: "gso",
    name: "GSO",
    publicRelease: "May 30, 2025",
    license: "MIT dataset",
    upstreamTerms: null,
    size: { count: 102, unit: "tasks", text: "102 tasks, 10 codebases, 5 languages" },
    coverage:
      "Each case includes a repository, a performance test and an expert optimization to compare against.",
    links: [
      {
        kind: "Dataset card",
        label: "GSO dataset card",
        url: "https://huggingface.co/datasets/gso-bench/gso",
      },
      {
        kind: "Benchmark site",
        label: "GSO benchmark site",
        url: "https://gso-bench.github.io/",
      },
    ],
    citationsAsSupplied: ["gso-bench.github.io", "huggingface.co"],
  },
  {
    ...base,
    id: "mlcq",
    name: "MLCQ",
    publicRelease: "Feb 2020",
    license: "CC BY",
    upstreamTerms: null,
    size: { count: 15000, unit: "Java code samples (approx.)", text: "Approximately 15,000 Java code samples" },
    coverage:
      "Professional developers’ code-smell assessments of Java code. Code-level maintainability only.",
    provenance: "Assessments by professional developers.",
    links: [
      {
        kind: "Dataset record (Zenodo)",
        label: "MLCQ code-smell dataset on Zenodo",
        url: "https://zenodo.org/records/3666840",
      },
    ],
    citationsAsSupplied: ["zenodo.org"],
  },
  {
    ...base,
    id: "bfcl-multi-turn",
    name: "Berkeley Function Calling Leaderboard — multi-turn split",
    publicRelease: "Sep 2024",
    license: "Apache-2.0",
    upstreamTerms: null,
    size: { count: 800, unit: "cases", text: "800 cases across four multi-turn groups" },
    coverage:
      "Function selection and arguments, asking for missing information, and recognising when no available function fits.",
    links: [
      {
        kind: "Dataset card",
        label: "Berkeley Function Calling Leaderboard dataset card",
        url: "https://huggingface.co/datasets/gorilla-llm/Berkeley-Function-Calling-Leaderboard",
      },
      {
        kind: "Guide",
        label: "Berkeley multi-turn split guide (blog post)",
        url: "https://gorilla.cs.berkeley.edu/blogs/13_bfcl_v3_multi_turn.html",
      },
    ],
    citationsAsSupplied: ["Multi-Turn & Multi-Step Function Calling"],
  },
  {
    ...base,
    id: "mcp-atlas",
    name: "MCP-Atlas",
    publicRelease: "Jan 2026 paper",
    license: "CC BY 4.0 dataset",
    upstreamTerms: null,
    size: {
      count: 500,
      unit: "public tasks",
      text: "500 public tasks from a benchmark spanning 36 MCP servers and 220 tools",
    },
    coverage: "Tool discovery, chained calls and task completion across MCP servers.",
    links: [
      {
        kind: "Dataset card",
        label: "MCP-Atlas dataset card",
        url: "https://huggingface.co/datasets/ScaleAI/MCP-Atlas",
      },
    ],
    citationsAsSupplied: ["arxiv.org"],
  },
  {
    ...base,
    id: "repotransbench",
    name: "RepoTransBench",
    publicRelease: "Feb 2026 expanded publication",
    license: "MIT project",
    upstreamTerms: "Upstream repository licenses apply.",
    size: {
      count: 1897,
      unit: "repository samples",
      text: "1,897 repository samples across 13 language pairs",
    },
    coverage: "Repository-level translation checked by target-language tests.",
    links: [
      {
        kind: "Repository",
        label: "RepoTransBench repository",
        url: "https://github.com/DeepSoftwareAnalytics/RepoTransBench",
      },
    ],
    citationsAsSupplied: ["github.com"],
  },
  {
    ...base,
    id: "accelerate-bench",
    name: "Accelerate Bench v1.1",
    publicRelease: "Nov 16, 2026 paper",
    version: "v1.1",
    license: "Author-owned code and tools are Apache-2.0",
    upstreamTerms: "Third-party terms vary, including noncommercial terms for ABySS.",
    size: {
      count: 32,
      unit: "CPU application tasks",
      text: "32 CPU application tasks in the full package, 31 available through Harbor",
    },
    coverage:
      "The agent chooses what to profile and optimize under fixed CPU and memory limits. Hidden checks verify correctness and timing.",
    links: [
      {
        kind: "Dataset card",
        label: "Accelerate Bench v1.1 dataset card",
        url: "https://huggingface.co/datasets/AdAstraAbyssoque/accelerate-bench",
      },
    ],
    citationsAsSupplied: ["arxiv.org"],
  },
];
