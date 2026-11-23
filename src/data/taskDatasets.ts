import type { TaskDataset } from "./types";

/**
 * Usage notes: how each dataset is used on each task (many-to-many).
 * Row release/size/license text is kept verbatim per appendix row, because the
 * same dataset is described slightly differently in different categories.
 */

const NOT_COUNTED = null;

export const taskDatasets: TaskDataset[] = [
  // ── Understanding & Communication ──
  {
    id: "code-explanation--swe-qa-pro-bench",
    taskId: "code-explanation",
    datasetId: "swe-qa-pro-bench",
    role: "Primary dataset for explaining behavior",
    slice: "“Why” questions",
    coverage: "Questions and reference answers tied to exact repository commits.",
    rowReleaseAndSize: "Mar 20, 2026 · 260 test questions, 26 repositories",
    rowLicense: "MIT",
    eligibleSubset: {
      description: "“Why” questions within the shared 260",
      count: NOT_COUNTED,
      unit: "questions",
    },
    usageNote:
      "Use the “Why” questions for explaining behavior and the factual and dependency questions for codebase Q&A. The 260 is shared across both tasks.",
    gaps: [
      {
        title: "Shared pool",
        detail:
          "The 260 questions are shared with Q&A about a codebase. The number of “Why” questions is not supplied.",
      },
      {
        title: "Harder examples not tagged",
        detail:
          "The task asks to compare short functions with examples containing callbacks, mutation, or exception handling. The notes do not say whether the dataset labels these cases.",
      },
    ],
  },
  {
    id: "codebase-qa--swe-qa-pro-bench",
    taskId: "codebase-qa",
    datasetId: "swe-qa-pro-bench",
    role: "Primary dataset for codebase Q&A",
    slice: "Factual and dependency questions",
    coverage: "Questions and reference answers tied to exact repository commits.",
    rowReleaseAndSize: "Mar 20, 2026 · 260 test questions, 26 repositories",
    rowLicense: "MIT",
    eligibleSubset: {
      description: "Factual and dependency questions within the shared 260",
      count: NOT_COUNTED,
      unit: "questions",
    },
    usageNote:
      "Use the factual and dependency questions for codebase Q&A. The 260 is shared with Code explanation.",
    gaps: [
      {
        title: "Shared pool",
        detail:
          "The 260 questions are shared with Code explanation. The number of factual and dependency questions is not supplied.",
      },
      {
        title: "Answer vs retrieval",
        detail:
          "Give every model the same repository excerpts so the score measures answer quality, not retrieval quality.",
      },
    ],
  },
  {
    id: "reading-understanding-code--cruxeval",
    taskId: "reading-understanding-code",
    datasetId: "cruxeval",
    role: "Executable comprehension check",
    slice: "Output prediction and input prediction",
    coverage:
      "Predict a function’s output from its input, or find an input that produces a specified output.",
    rowReleaseAndSize: "Jan 2024 · 800 Python functions",
    rowLicense: "MIT",
    eligibleSubset: null,
    usageNote: "Gives an executable correctness check for code comprehension.",
    gaps: [
      {
        title: "Python only",
        detail: "All 800 functions are Python, so comprehension in other languages is not covered.",
      },
    ],
  },
  {
    id: "summarization--lca-module-summarization",
    taskId: "summarization",
    datasetId: "lca-module-summarization",
    role: "Module summaries (and file summaries by filtering)",
    slice: "Test split. For a file-only score, filter by relevant_code_files.",
    coverage:
      "Python source files and documentation intent paired with a manually curated reference document.",
    rowReleaseAndSize: "Jun 2024 · 216 test examples",
    rowLicense: "Apache 2.0",
    eligibleSubset: {
      description: "File-only examples after filtering by relevant_code_files",
      count: NOT_COUNTED,
      unit: "examples",
    },
    usageNote:
      "Primarily module-level. For a file-only score, filter by relevant_code_files and report the resulting count.",
    gaps: [
      {
        title: "File vs module",
        detail:
          "The dataset is primarily module-level. The file-only count is not yet computed and must be reported with the score.",
      },
    ],
  },
  {
    id: "summarization--swe-rebench-v2-prs",
    taskId: "summarization",
    datasetId: "swe-rebench-v2-prs",
    role: "PR summaries",
    slice: "Diff as input; pr_description withheld as the reference",
    coverage: "Real multilingual PRs with patches, repository identifiers, and PR descriptions.",
    rowReleaseAndSize: "Mar 3, 2026 announcement · 126,300 PRs",
    rowLicense: "CC BY 4.0",
    eligibleSubset: {
      description: "Evaluation sample drawn from the corpus",
      count: NOT_COUNTED,
      unit: "PRs",
    },
    usageNote:
      "Use the diff as input and withhold pr_description as the reference. This is a training corpus from which to draw an evaluation sample.",
    gaps: [
      {
        title: "Training corpus, not a test set",
        detail:
          "126,300 is the whole corpus. The evaluation sample size and selection rule are still to define.",
      },
      {
        title: "File vs PR",
        detail:
          "Report PR summaries separately from file and module summaries. A model can summarize a file accurately and still miss a behavior change in a multifile PR.",
      },
    ],
  },
  {
    id: "technical-questions--freshstack-qa",
    taskId: "technical-questions",
    datasetId: "freshstack-qa",
    role: "Developer Q&A with reference answers",
    slice: "Test questions",
    coverage:
      "Developer questions with accepted Stack Overflow answers and key answer facts across Angular, Godot, LangChain, Laravel, and YOLO.",
    rowReleaseAndSize: "Apr 2025 publication; Oct 2024 snapshot · 672 test questions",
    rowLicense: "CC BY-SA 4.0",
    eligibleSubset: null,
    usageNote:
      "Score the answer against the key answer facts. For version-specific cases, supply identical documentation.",
    gaps: [
      {
        title: "Version-specific questions not identified",
        detail:
          "The task calls for questions tied to a specific library version. The notes don’t say how many FreshStack questions are version-specific.",
      },
    ],
  },
  {
    id: "docstring-generation--scicode-doc-alignment",
    taskId: "docstring-generation",
    datasetId: "scicode-doc-alignment",
    role: "Function-level documentation",
    slice: "Function–docstring pairs",
    coverage: "Scientific-computing functions paired with Gemini-generated docstrings.",
    rowReleaseAndSize:
      "Mar 13, 2026 dataset upload · 500,000 function–docstring pairs, publisher-reported",
    rowLicense: "Apache 2.0",
    eligibleSubset: {
      description: "Evaluation sample drawn from the pairs",
      count: NOT_COUNTED,
      unit: "pairs",
    },
    usageNote:
      "Useful for function-level documentation. Treat the references as synthetic and score factual claims against the code.",
    gaps: [
      {
        title: "Synthetic references",
        detail:
          "The reference docstrings were generated by Gemini. Score parameters, returns, defaults, exceptions and side effects against the code, not against the reference text.",
      },
      {
        title: "Domain and scope",
        detail: "Scientific computing at function level only. Module or API reference docs are not covered.",
      },
    ],
  },
  {
    id: "commit-pr-description--lca-commit-message-generation",
    taskId: "commit-pr-description",
    datasetId: "lca-commit-message-generation",
    role: "Commit messages",
    slice: "Test commits",
    coverage:
      "Manually curated, larger Python commits with file changes, diffs, and original commit messages.",
    rowReleaseAndSize: "Jun 2024 · 163 test commits, 34 repositories",
    rowLicense: "Apache 2.0",
    eligibleSubset: null,
    usageNote: "Complements the PR-description dataset with a dedicated commit-level test.",
    gaps: [
      {
        title: "Commit vs PR description",
        detail: "Score short commit titles separately from full PR descriptions.",
      },
    ],
  },
  {
    id: "commit-pr-description--swe-rebench-v2-prs",
    taskId: "commit-pr-description",
    datasetId: "swe-rebench-v2-prs",
    role: "PR descriptions",
    slice: "Diff as input; pr_description withheld as the reference",
    coverage: "Real multilingual PRs with patches, repository identifiers, and PR descriptions.",
    rowReleaseAndSize: "Mar 3, 2026 announcement · 126,300 PRs",
    rowLicense: "CC BY 4.0",
    eligibleSubset: {
      description: "Evaluation sample drawn from the corpus",
      count: NOT_COUNTED,
      unit: "PRs",
    },
    usageNote:
      "Use the diff as input and withhold pr_description as the reference. Check that every claim is supported by the diff.",
    gaps: [
      {
        title: "Training corpus, not a test set",
        detail:
          "The evaluation sample size and selection rule are still to define. Keep this sample disjoint from the PR-summarization sample.",
      },
    ],
  },
  {
    id: "error-stack-trace-diagnosis--distdebug-bench--trace",
    taskId: "error-stack-trace-diagnosis",
    datasetId: "distdebug-bench",
    role: "Dedicated stack-trace score",
    slice: "The 28 reports that contain a stack trace",
    coverage:
      "Incident reports with stack traces, logs, pre-fix source, and human-labeled root-cause locations.",
    rowReleaseAndSize: "Nov 2026 · 120 incidents, 11 systems; 28 reports contain a stack trace",
    rowLicense:
      "MIT for benchmark annotations, metadata, and code; upstream terms for issues and attachments",
    eligibleSubset: { description: "Trace-bearing reports", count: 28, unit: "reports" },
    usageNote: "Use the 28 trace-bearing cases for a dedicated stack-trace score.",
    gaps: [
      {
        title: "Subset vs whole dataset",
        detail:
          "28 of 120 incidents contain a stack trace. Report the stack-trace score separately from the wider error-diagnosis score.",
      },
    ],
  },
  {
    id: "error-stack-trace-diagnosis--distdebug-bench--all",
    taskId: "error-stack-trace-diagnosis",
    datasetId: "distdebug-bench",
    role: "Wider error diagnosis",
    slice: "All 120 incidents across 11 systems",
    coverage: "Incident reports, logs, pre-fix source, and human-labeled root-cause locations.",
    rowReleaseAndSize: "Nov 2026 · 120 incidents, 11 systems",
    rowLicense:
      "MIT for benchmark annotations, metadata, and code; upstream terms for issues and attachments",
    eligibleSubset: null,
    usageNote: "Use the wider set for error diagnosis.",
    gaps: [
      {
        title: "Crash location vs root cause",
        detail:
          "Score the crash location separately from the underlying cause, using the human-labeled root-cause locations.",
      },
    ],
  },

  // ── Code Generation ──
  {
    id: "single-function--gauntlet-live",
    taskId: "single-function",
    datasetId: "gauntlet-live",
    role: "Single-function generation with original tests",
    slice: "PRs that introduce a single function (Python and JS/TS)",
    coverage: "Dated recent PRs with their original tests.",
    rowReleaseAndSize: "Nov 2026 · 53 Python + 69 JS/TS PRs before filtering",
    rowLicense: "MIT repository. Check each upstream project’s license.",
    eligibleSubset: {
      description: "PRs that introduce a single function",
      count: NOT_COUNTED,
      unit: "PRs",
    },
    usageNote:
      "Select PRs that introduce a single function. Give the model the signature and requirements, then run the original tests.",
    gaps: [
      {
        title: "Whole dataset vs eligible subset",
        detail: "122 is the count before filtering. The number of single-function PRs is not yet counted.",
      },
    ],
  },
  {
    id: "multifile-project--multi-step-swe",
    taskId: "multifile-project",
    datasetId: "multi-step-swe",
    role: "Project-level generation across files",
    slice: "From-scratch feature tasks",
    coverage: "Requirements added step by step across files, each with executable checks.",
    rowReleaseAndSize: "Nov 4, 2026 · 69 tasks, 574 steps, 9 languages across the full suite",
    rowLicense: "MIT benchmark. Bundled upstream code retains its license.",
    eligibleSubset: {
      description: "From-scratch feature tasks",
      count: NOT_COUNTED,
      unit: "tasks",
    },
    usageNote:
      "Select from-scratch feature tasks. Score whether the generated project passes the executable checks as requirements are added across files.",
    gaps: [
      {
        title: "Full suite vs selected tasks",
        detail:
          "69 tasks and 574 steps describe the full suite. The number of from-scratch feature tasks is not supplied.",
      },
    ],
  },
  {
    id: "fim-autocomplete--delulu",
    taskId: "fim-autocomplete",
    datasetId: "delulu",
    role: "Multilingual completion and invented API calls",
    slice: "Rows licensed MIT, Apache-2.0, or BSD",
    coverage: "Fill-in-the-middle prompts across 7 languages and 319 repositories.",
    rowReleaseAndSize: "Delulu, May 2026 · 947 unique prompts, 319 repositories, 7 languages",
    rowLicense: "Delulu code is licensed per row. Select MIT, Apache-2.0, or BSD rows.",
    eligibleSubset: {
      description: "License-filtered rows (MIT, Apache-2.0, BSD)",
      count: NOT_COUNTED,
      unit: "prompts",
    },
    usageNote: "Use Delulu for multilingual completion and invented API calls.",
    gaps: [
      {
        title: "Whole dataset vs license-filtered subset",
        detail: "947 prompts is the whole dataset. The license-filtered count is not yet counted.",
      },
    ],
  },
  {
    id: "fim-autocomplete--gauntlet-live",
    taskId: "fim-autocomplete",
    datasetId: "gauntlet-live",
    role: "Fresh completion cases from dated PRs",
    slice: "JS/TS subset: mask newly added code in dated PRs and test the completion",
    coverage: "Recently merged JS/TS changes, masked for completion.",
    rowReleaseAndSize: "Gauntlet, Nov 2026 · 69 source PRs before filtering",
    rowLicense: "Gauntlet upstream licenses also apply.",
    eligibleSubset: {
      description: "JS/TS PRs with newly added code suitable for masking",
      count: NOT_COUNTED,
      unit: "PRs",
    },
    usageNote:
      "For fresh cases, mask newly added code in dated Gauntlet PRs and test the completion.",
    gaps: [
      {
        title: "Whole subset vs eligible cases",
        detail: "69 is the JS/TS count before filtering.",
      },
    ],
  },
  {
    id: "boilerplate-scaffolding--autobaxbench",
    taskId: "boilerplate-scaffolding",
    datasetId: "autobaxbench",
    role: "Backend scaffolding",
    slice: "40 backend scenarios × 14 frameworks",
    coverage: "Backend service scaffolding.",
    rowReleaseAndSize: "AutoBaxBench, Dec 2025 · 40 backend scenarios × 14 frameworks = 560 tasks",
    rowLicense: "MIT",
    eligibleSubset: null,
    usageNote: "For backend scaffolding, check service startup and route registration.",
    gaps: [],
  },
  {
    id: "boilerplate-scaffolding--vite-starter-templates",
    taskId: "boilerplate-scaffolding",
    datasetId: "vite-starter-templates",
    role: "Frontend scaffolding reference templates",
    slice: "2 selected Solid presets (JavaScript and TypeScript)",
    coverage: "Reference templates for two custom frontend cases.",
    rowReleaseAndSize: "Vite, Nov 2026 update · 2 selected Solid presets, JavaScript and TypeScript",
    rowLicense: "MIT",
    eligibleSubset: { description: "Custom frontend cases", count: 2, unit: "cases" },
    usageNote:
      "For frontend scaffolding, check dependency installation and production build. Vite supplies reference templates for two custom cases.",
    gaps: [
      {
        title: "Fixtures, not a benchmark",
        detail:
          "Frontend coverage is two custom cases built from templates. It is too small for variability estimates on its own.",
      },
    ],
  },
  {
    id: "unfamiliar-code-generation--novelapibench",
    taskId: "unfamiliar-code-generation",
    datasetId: "novelapibench",
    role: "Code against supplied API documentation",
    slice: "Published tasks, plus generated cases for APIs introduced after the newest checkpoint",
    coverage: "1,670 published tasks covering 856 APIs.",
    rowReleaseAndSize: "June 2, 2026 · 1,670 published tasks covering 856 APIs",
    rowLicense:
      "Apache-2.0 for benchmark records and harness. Source excerpts retain upstream licenses.",
    eligibleSubset: {
      description: "Fresh generated cases (APIs newer than the newest checkpoint)",
      count: NOT_COUNTED,
      unit: "tasks",
    },
    usageNote:
      "Give every model the same API documentation and run the generated code. Use its generator with APIs introduced after the newest checkpoint for fresh cases.",
    gaps: [
      {
        title: "Published vs fresh cases",
        detail:
          "The published tasks may predate some checkpoints. Report published-task and freshly generated results separately.",
      },
    ],
  },

  // ── Quality & Maintenance ──
  {
    id: "test-generation--gauntlet-live",
    taskId: "test-generation",
    datasetId: "gauntlet-live",
    role: "Fail-before / pass-after test writing",
    slice: "Hidden developer tests; unit and integration cases labelled separately",
    coverage: "Bug-fix and feature PRs with developer tests.",
    rowReleaseAndSize: "Nov 2026 · 53 Python + 69 JS/TS PRs before filtering",
    rowLicense: "MIT repository. Upstream code retains its license.",
    eligibleSubset: {
      description: "PRs with a hideable developer test, labelled unit or integration",
      count: NOT_COUNTED,
      unit: "PRs",
    },
    usageNote:
      "Adaptation: Hide the developer’s tests and ask the model to write one that fails before the fix and passes afterward. Label unit and integration cases separately. For integration, require the test to exercise a real boundary such as an API handler and database.",
    gaps: [
      {
        title: "Unit vs integration",
        detail:
          "The dataset does not label unit and integration cases. Labels must be assigned before scoring, and the two are reported separately.",
      },
      {
        title: "Adapted, not native",
        detail: "This is an adaptation of the dataset, not a published test-generation track.",
      },
    ],
  },
  {
    id: "debugging--gauntlet-live",
    taskId: "debugging",
    datasetId: "gauntlet-live",
    role: "Bug-fix patches checked by hidden regression tests",
    slice: "Bug-fix PRs, disjoint from the test-generation set",
    coverage: "Issue plus pre-fix code; hidden regression tests and previously passing tests.",
    rowReleaseAndSize: "Nov 2026 · Same 122 candidate PRs",
    rowLicense: "MIT repository plus upstream licenses",
    eligibleSubset: { description: "Bug-fix PRs", count: NOT_COUNTED, unit: "PRs" },
    usageNote:
      "Select bug fixes. Give the model the issue and pre-fix code. Score whether its patch passes the hidden regression tests and preserves previously passing tests. Use different PRs from the test-generation set.",
    gaps: [
      {
        title: "Shared source pool",
        detail:
          "Draws from the same 122 candidates as test generation and type/lint fixes. The PR sets must be kept disjoint.",
      },
    ],
  },
  {
    id: "refactoring--swe-refactor-v2",
    taskId: "refactoring",
    datasetId: "swe-refactor-v2",
    role: "Requested structural refactorings",
    slice: "Specific refactorings such as moving or inlining a method",
    coverage: "1,099 refactorings across 18 Java projects.",
    rowReleaseAndSize: "Nov 19, 2025 · 1,099 refactorings across 18 Java projects",
    rowLicense: "CC BY 4.0 for this dataset version",
    eligibleSubset: null,
    usageNote:
      "Ask for a specific change such as moving or inlining a method. Score both whether the requested structural change occurred and whether the build and tests still pass.",
    gaps: [
      {
        title: "Java only",
        detail: "Refactoring in other languages is not covered.",
      },
    ],
  },
  {
    id: "code-review--swe-prbench",
    taskId: "code-review",
    datasetId: "swe-prbench",
    role: "Review findings against human-identified issues",
    slice: "Same diff and file context for every model",
    coverage: "350 PRs across five languages.",
    rowReleaseAndSize: "Mar 2026 · 350 PRs across five languages",
    rowLicense: "CC BY 4.0",
    eligibleSubset: null,
    usageNote:
      "Give each model the same diff and file context. Score which human-identified issues it catches and how many of its additional findings are valid. This measures both missed bugs and review noise.",
    gaps: [
      {
        title: "Additional findings need judging",
        detail:
          "Findings outside the human-identified set must be judged valid or invalid with a documented rubric.",
      },
    ],
  },
  {
    id: "type-annotation-lint--gauntlet-live",
    taskId: "type-annotation-lint",
    datasetId: "gauntlet-live",
    role: "Two adapted sets: annotations removed; lint violation introduced",
    slice: "Custom subset of the 122 PRs; eligible files only",
    coverage: "Files from recent PRs with type checker, linter and tests available.",
    rowReleaseAndSize: "Nov 2026 source · Custom subset of the 122 PRs",
    rowLicense: "MIT repository plus upstream licenses",
    eligibleSubset: {
      description: "Eligible files, split into a type-annotation set and a lint set",
      count: NOT_COUNTED,
      unit: "files",
    },
    usageNote:
      "Create two separate sets from eligible files. Remove existing annotations for the first. Introduce a reproducible lint violation for the second. Require the type checker or linter and existing tests to pass. Reject fixes that silence diagnostics or replace specific types with Any.",
    gaps: [
      {
        title: "Type vs lint",
        detail: "Report the type-annotation and lint sets separately.",
      },
      {
        title: "Adapted, not native",
        detail: "Both sets are constructed by the team and are not published tracks.",
      },
    ],
  },
  {
    id: "migration-upgrades--multi-step-swe",
    taskId: "migration-upgrades",
    datasetId: "multi-step-swe",
    role: "Staged migrations and version upgrades",
    slice: "Migration and version-upgrade tasks",
    coverage:
      "Staged upgrades with a verifier per stage, e.g. a React 15 dashboard upgraded to React 19 in eight stages.",
    rowReleaseAndSize: "Nov 4, 2026 · 69 tasks / 574 steps in the full suite",
    rowLicense: "MIT benchmark plus upstream licenses",
    eligibleSubset: {
      description: "Migration and version-upgrade tasks",
      count: NOT_COUNTED,
      unit: "tasks",
    },
    usageNote:
      "Select the migration and version-upgrade tasks. One concrete example upgrades a React 15 dashboard to React 19 in eight stages. Score each stage with its verifier so you can identify the first breaking change the model misses.",
    gaps: [
      {
        title: "Full suite vs selected tasks",
        detail: "The number of migration tasks within the 69 is not supplied.",
      },
    ],
  },
  {
    id: "performance-suggestions--gso",
    taskId: "performance-suggestions",
    datasetId: "gso",
    role: "Bottleneck diagnosis and suggested change",
    slice: "All tasks; diagnosis scored separately from implemented speedup",
    coverage: "Each case includes a performance test and an expert optimization.",
    rowReleaseAndSize: "May 30, 2025 · 102 tasks across 10 codebases",
    rowLicense: "MIT dataset",
    eligibleSubset: null,
    usageNote:
      "Ask the model to identify the bottleneck and propose a change. Score the diagnosis separately from the measured speedup of the implemented suggestion.",
    gaps: [
      {
        title: "Suggestion vs measured speedup",
        detail:
          "A correct diagnosis is not a speedup. Report diagnosis quality and measured speedup as separate results.",
      },
    ],
  },
  {
    id: "technical-debt--mlcq",
    taskId: "technical-debt",
    datasetId: "mlcq",
    role: "Code-smell detection against professional assessments",
    slice: "Java code samples with developer code-smell assessments",
    coverage: "Approximately 15,000 Java code samples.",
    rowReleaseAndSize: "Feb 2020 · Approximately 15,000 Java code samples",
    rowLicense: "CC BY",
    eligibleSubset: null,
    usageNote:
      "Use the professional developers’ code-smell assessments to score whether the model flags the right code and avoids false positives.",
    gaps: [
      {
        title: "Code-level vs architectural debt",
        detail:
          "MLCQ covers code-level maintainability only. Architectural debt still needs a separate, maintainer-reviewed sample.",
      },
    ],
  },

  // ── Advanced / Agentic Programming ──
  {
    id: "tool-function-calling--bfcl-multi-turn",
    taskId: "tool-function-calling",
    datasetId: "bfcl-multi-turn",
    role: "Diagnostic baseline: function choice and arguments",
    slice: "Multi-turn split (four multi-turn groups)",
    coverage:
      "Whether the model selects the correct function and arguments, asks for missing information, and recognizes when no available function can fulfill a request.",
    rowReleaseAndSize: "Sep 2024 · 800 cases across four multi-turn groups",
    rowLicense: "Apache-2.0",
    eligibleSubset: null,
    usageNote: "Use it as a diagnostic baseline.",
    gaps: [
      {
        title: "Argument correctness vs execution",
        detail:
          "This measures whether calls and arguments are correct, not whether a real tool executed successfully. Pair it with MCP-Atlas.",
      },
    ],
  },
  {
    id: "tool-function-calling--mcp-atlas",
    taskId: "tool-function-calling",
    datasetId: "mcp-atlas",
    role: "Task success with real tool execution",
    slice: "Developer-tool cases",
    coverage:
      "Whether the agent can discover tools, chain calls, and complete a task across 36 MCP servers and 220 tools.",
    rowReleaseAndSize:
      "Jan 2026 paper · 500 public tasks from a benchmark spanning 36 MCP servers and 220 tools",
    rowLicense: "CC BY 4.0 dataset",
    eligibleSubset: { description: "Developer-tool cases", count: NOT_COUNTED, unit: "tasks" },
    usageNote: "Use the developer-tool cases and record task success, invalid calls, and retries.",
    gaps: [
      {
        title: "Whole dataset vs developer-tool subset",
        detail: "500 is the public set. The developer-tool count is not yet counted.",
      },
    ],
  },
  {
    id: "multi-step-workflows--multi-step-swe",
    taskId: "multi-step-workflows",
    datasetId: "multi-step-swe",
    role: "Dependent multi-step repository work",
    slice: "Full suite: 69 workflows, 574 dependent steps",
    coverage: "The agent carries its own code changes through 5–15 successive requests.",
    rowReleaseAndSize: "Nov 4, 2026 · 69 workflows, 574 dependent steps, 9 languages",
    rowLicense: "MIT benchmark. Upstream code retains its licenses.",
    eligibleSubset: null,
    usageNote:
      "Report both steps passed and complete workflows solved. Capture which tests the agent chooses to run.",
    gaps: [
      {
        title: "Steps passed vs workflows solved",
        detail: "Report both counts. A high step pass rate can hide few completed workflows.",
      },
    ],
  },
  {
    id: "language-translation--repotransbench",
    taskId: "language-translation",
    datasetId: "repotransbench",
    role: "Repository translation checked by target tests",
    slice: "Per language pair, including Java → C# and JavaScript → Python",
    coverage: "1,897 repository samples across 13 language pairs.",
    rowReleaseAndSize: "Feb 2026 expanded publication · 1,897 repository samples across 13 language pairs",
    rowLicense: "MIT project. Upstream repository licenses apply.",
    eligibleSubset: null,
    usageNote:
      "Whether a translated repository runs and passes its target-language tests. Report results per language pair, including enterprise-relevant pairs such as Java → C# and JavaScript → Python.",
    gaps: [
      {
        title: "Per-pair reporting",
        detail: "An aggregate score can hide failures on the pairs the company actually needs.",
      },
    ],
  },
  {
    id: "optimization-profiling--gso",
    taskId: "optimization-profiling",
    datasetId: "gso",
    role: "Given performance test, match expert speedup",
    slice: "All 102 tasks",
    coverage: "Repository plus performance test; expert optimization as the reference.",
    rowReleaseAndSize: "May 30, 2025 · 102 tasks, 10 codebases, 5 languages",
    rowLicense: "MIT dataset",
    eligibleSubset: null,
    usageNote:
      "The agent receives a repository and a performance test. A successful patch passes correctness checks and achieves at least 95% of the expert’s speedup under the benchmark’s standard metric.",
    gaps: [],
  },
  {
    id: "optimization-profiling--accelerate-bench",
    taskId: "optimization-profiling",
    datasetId: "accelerate-bench",
    role: "Agent-chosen profiling under fixed limits",
    slice: "License-compatible subset for the enterprise run",
    coverage: "CPU application tasks; the agent chooses what to profile and optimize.",
    rowReleaseAndSize:
      "Nov 16, 2026 paper · 32 CPU application tasks in the full package, 31 available through Harbor",
    rowLicense:
      "Author-owned code and tools are Apache-2.0. Third-party terms vary, including noncommercial terms for ABySS.",
    eligibleSubset: {
      description: "License-compatible subset for the enterprise run",
      count: NOT_COUNTED,
      unit: "tasks",
    },
    usageNote:
      "The agent chooses what to profile and optimize under fixed CPU and memory limits. Hidden checks verify correctness and timing. Use the license-compatible subset for the enterprise run and report how many tasks it contains.",
    gaps: [
      {
        title: "Full package vs available vs license-compatible",
        detail:
          "32 tasks in the full package, 31 through Harbor. The license-compatible count is not yet counted. Noncommercial terms (e.g. ABySS) exclude some tasks.",
      },
    ],
  },
];

/** Side-by-side protocol comparison for the agentic optimization task. */
export const optimizationProtocolComparison = {
  taskId: "optimization-profiling",
  datasetIds: ["gso", "accelerate-bench"] as const,
  rows: [
    {
      aspect: "What the agent receives",
      values: {
        gso: "A repository and a performance test",
        "accelerate-bench": "A CPU application; the agent chooses what to profile and optimize",
      },
    },
    {
      aspect: "Constraints",
      values: {
        gso: "The benchmark’s standard metric",
        "accelerate-bench": "Fixed CPU and memory limits",
      },
    },
    {
      aspect: "Success",
      values: {
        gso: "Passes correctness checks and achieves at least 95% of the expert’s speedup",
        "accelerate-bench": "Hidden checks verify correctness and timing",
      },
    },
    {
      aspect: "Size",
      values: {
        gso: "102 tasks, 10 codebases, 5 languages",
        "accelerate-bench":
          "32 tasks in the full package; 31 through Harbor; license-compatible subset: not yet counted",
      },
    },
    {
      aspect: "License",
      values: {
        gso: "MIT dataset",
        "accelerate-bench":
          "Author-owned code and tools Apache-2.0; third-party terms vary, including noncommercial terms for ABySS",
      },
    },
    {
      aspect: "Release",
      values: { gso: "May 30, 2025", "accelerate-bench": "Nov 16, 2026 paper (v1.1)" },
    },
  ],
};
