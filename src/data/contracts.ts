import type { EvaluationContract } from "./types";

/**
 * Usage notes: one evaluation contract per task. All are drafts.
 * Prompts are proposed examples only, labelled as such in the UI.
 * Thresholds that have not been agreed are `null` and render as “To define”.
 */

const passThreshold = { label: "Pass threshold", value: null };
const sampleSize = { label: "Sampled-run size", value: null };

export const contracts: EvaluationContract[] = [
  {
    taskId: "code-explanation",
    status: "draft",
    prompt: {
      kind: "proposed",
      text: "Explain what this function does. Describe its purpose, the execution path for the given call, and any side effects (state it mutates, I/O, exceptions). Say if anything cannot be determined from the code shown.",
    },
    inputArtifacts: [
      "Function or block at a pinned repository commit (SWE-QA-Pro “Why” questions)",
      "Short functions and harder examples with callbacks, mutation, or exception handling",
    ],
    successCriteria: [
      "Purpose, execution path and side effects are stated accurately",
      "No unsupported claims about behavior",
    ],
    scoringMethod: [
      "Documented rubric against the reference answer: accuracy of purpose, path and side effects",
      "Report short and harder examples separately",
    ],
    thresholds: [passThreshold, sampleSize],
  },
  {
    taskId: "reading-understanding-code",
    status: "draft",
    prompt: {
      kind: "proposed",
      text: "Given this Python function and input, state the exact return value. Respond with the value only.",
    },
    inputArtifacts: ["CRUXEval function plus input (output prediction) or target output (input prediction)"],
    successCriteria: [
      "Predicted output equals the executed output, or the proposed input produces the target output",
    ],
    scoringMethod: ["Executable check: run the function and compare (pass@1)"],
    thresholds: [passThreshold, sampleSize],
  },
  {
    taskId: "summarization",
    status: "draft",
    prompt: {
      kind: "proposed",
      text: "Summarize this change for a reviewer in at most five sentences. State what behavior changes and where. Do not describe anything that is not in the diff.",
    },
    inputArtifacts: [
      "File or module source with documentation intent (Long Code Arena – Module Summarization)",
      "PR diff with pr_description withheld (SWE-rebench-V2-PRs sample)",
    ],
    successCriteria: [
      "Factual coverage of the reference’s key points",
      "No unsupported claims",
    ],
    scoringMethod: [
      "Rubric for factual coverage and unsupported-claim count",
      "File, module and PR results reported separately",
    ],
    thresholds: [passThreshold, { label: "Max unsupported claims", value: null }, sampleSize],
  },
  {
    taskId: "codebase-qa",
    status: "draft",
    prompt: {
      kind: "proposed",
      text: "Answer the question using only the repository excerpts provided. Cite the file and symbol that support your answer. If the excerpts do not contain the evidence, say what is missing.",
    },
    inputArtifacts: [
      "Identical repository excerpts for every model",
      "SWE-QA-Pro factual and dependency questions at pinned commits",
    ],
    successCriteria: [
      "Correct answer",
      "Correct supporting file or symbol",
      "Recognizes missing evidence when the excerpts are insufficient",
    ],
    scoringMethod: ["Rubric scored on three parts: answer, citation, missing-evidence handling"],
    thresholds: [passThreshold, sampleSize],
  },
  {
    taskId: "technical-questions",
    status: "draft",
    prompt: {
      kind: "proposed",
      text: "Answer this developer question. If documentation is provided, answer for the library version it describes.",
    },
    inputArtifacts: [
      "FreshStack test questions",
      "For version-specific cases: identical documentation for the stated library version",
    ],
    successCriteria: [
      "Answer contains the key answer facts",
      "For version-specific cases, the answer applies to that version",
    ],
    scoringMethod: [
      "Key-fact coverage against the accepted answer",
      "General and version-specific questions reported separately",
    ],
    thresholds: [passThreshold, sampleSize],
  },
  {
    taskId: "docstring-generation",
    status: "draft",
    prompt: {
      kind: "proposed",
      text: "Write a docstring for this function. Document parameters, return value, defaults, raised exceptions and side effects. Describe only what the code does.",
    },
    inputArtifacts: ["Function source (SciCode-Doc-Alignment sample)"],
    successCriteria: [
      "Parameters, returns, defaults, exceptions and side effects match the implementation",
    ],
    scoringMethod: [
      "Claim-by-claim check against the code (references are synthetic and not ground truth)",
    ],
    thresholds: [passThreshold, sampleSize],
  },
  {
    taskId: "commit-pr-description",
    status: "draft",
    prompt: {
      kind: "proposed",
      text: "Write a commit message (a title under 72 characters plus an optional body) for this diff. Only describe what the diff shows.",
    },
    inputArtifacts: [
      "Commit diff and file changes (Long Code Arena – Commit Message Generation)",
      "PR diff with pr_description withheld (SWE-rebench-V2-PRs sample)",
    ],
    successCriteria: [
      "Every claim is supported by the diff, especially motivation, tests and user-visible behavior",
    ],
    scoringMethod: [
      "Rubric for supported vs unsupported claims",
      "Commit titles and full PR descriptions scored separately",
    ],
    thresholds: [passThreshold, sampleSize],
  },
  {
    taskId: "error-stack-trace-diagnosis",
    status: "draft",
    prompt: {
      kind: "proposed",
      text: "Here is an incident report with logs and the relevant source. Identify where it failed and the underlying cause. Cite the trace lines or code that support your diagnosis, and say what information is missing if the cause is ambiguous.",
    },
    inputArtifacts: [
      "DistDebug-Bench incident report, logs and pre-fix source",
      "Stack trace for the 28 trace-bearing cases",
    ],
    successCriteria: [
      "Distinguishes the crash location from the underlying cause",
      "Root-cause location matches the human label",
      "Cites supporting trace or code evidence",
    ],
    scoringMethod: [
      "Root-cause location match plus a rubric for evidence and ambiguity handling",
      "Stack-trace score (28 cases) reported separately from wider error diagnosis (120)",
    ],
    thresholds: [passThreshold, sampleSize],
  },
  {
    taskId: "single-function",
    status: "draft",
    prompt: {
      kind: "proposed",
      text: "Implement the function with this signature so that it meets the requirements below. Return only the function body.",
    },
    inputArtifacts: ["Function signature and requirements from a Gauntlet Live PR", "Repository snapshot before the PR"],
    successCriteria: ["The PR’s original tests pass"],
    scoringMethod: ["Executable: run the original tests (pass@1, repeated attempts recorded)"],
    thresholds: [passThreshold, sampleSize],
  },
  {
    taskId: "multifile-project",
    status: "draft",
    prompt: {
      kind: "proposed",
      text: "Implement the next requirement in this project. You may create or edit any files. The project must keep passing all earlier checks.",
    },
    inputArtifacts: ["Multi-step SWE from-scratch feature tasks", "Requirements delivered step by step"],
    successCriteria: ["Generated project passes the executable checks as requirements are added across files"],
    scoringMethod: ["Executable checks per step; report steps passed and tasks completed"],
    thresholds: [passThreshold, sampleSize],
  },
  {
    taskId: "fim-autocomplete",
    status: "draft",
    prompt: {
      kind: "proposed",
      text: "Fill-in-the-middle format: <prefix> … <suffix>. Complete the missing code only.",
    },
    inputArtifacts: [
      "Delulu prompts (MIT, Apache-2.0 or BSD rows only)",
      "Gauntlet JS/TS PRs with newly added code masked",
    ],
    successCriteria: [
      "Completion passes the relevant tests",
      "No invented API calls",
    ],
    scoringMethod: [
      "Executable tests for Gauntlet cases",
      "Delulu’s scoring for invented API calls",
      "Latency recorded alongside quality (autocomplete is latency-sensitive)",
    ],
    thresholds: [passThreshold, { label: "Latency target (p95)", value: null }, sampleSize],
  },
  {
    taskId: "boilerplate-scaffolding",
    status: "draft",
    prompt: {
      kind: "proposed",
      text: "Create a new service with the framework and routes described below. Include everything needed to install and start it.",
    },
    inputArtifacts: [
      "AutoBaxBench backend scenario and framework",
      "Vite Solid presets (JavaScript and TypeScript) as frontend reference templates",
    ],
    successCriteria: [
      "Backend: service starts and routes are registered",
      "Frontend: dependencies install and the production build succeeds",
    ],
    scoringMethod: ["Executable startup, route and build checks; backend and frontend reported separately"],
    thresholds: [passThreshold, sampleSize],
  },
  {
    taskId: "unfamiliar-code-generation",
    status: "draft",
    prompt: {
      kind: "proposed",
      text: "Using only the API documentation provided, write code that accomplishes the task below.",
    },
    inputArtifacts: [
      "Identical API documentation for every model",
      "NovelAPIBench published tasks and generated cases for APIs introduced after the newest checkpoint",
    ],
    successCriteria: ["Generated code runs and passes the task’s checks"],
    scoringMethod: ["Executable; published and freshly generated cases reported separately"],
    thresholds: [passThreshold, sampleSize],
  },
  {
    taskId: "test-generation",
    status: "draft",
    prompt: {
      kind: "proposed",
      text: "Write a test that fails on the code before this fix and passes after it. For integration cases, the test must exercise the real API handler and database.",
    },
    inputArtifacts: [
      "Gauntlet Live PR with the developer’s tests hidden",
      "Pre-fix and post-fix code",
    ],
    successCriteria: [
      "Test fails before the fix and passes after it",
      "Integration tests exercise a real boundary such as an API handler and database",
    ],
    scoringMethod: ["Executable before/after check; unit and integration cases reported separately"],
    thresholds: [passThreshold, sampleSize],
  },
  {
    taskId: "debugging",
    status: "draft",
    prompt: {
      kind: "proposed",
      text: "Here is an issue report and the code before the fix. Produce a patch that fixes the issue.",
    },
    inputArtifacts: ["Issue and pre-fix code from Gauntlet Live bug-fix PRs (disjoint from the test-generation set)"],
    successCriteria: [
      "Patch passes the hidden regression tests",
      "Previously passing tests still pass",
    ],
    scoringMethod: ["Executable: hidden regression tests plus the existing suite"],
    thresholds: [passThreshold, sampleSize],
  },
  {
    taskId: "refactoring",
    status: "draft",
    prompt: {
      kind: "proposed",
      text: "Apply this refactoring: move method X from class A to class B. Do not change behavior.",
    },
    inputArtifacts: ["SWE-Refactor v2 Java project and requested refactoring"],
    successCriteria: [
      "The requested structural change occurred",
      "Build and tests still pass",
    ],
    scoringMethod: ["Structural check of the refactoring plus executable build and tests"],
    thresholds: [passThreshold, sampleSize],
  },
  {
    taskId: "code-review",
    status: "draft",
    prompt: {
      kind: "proposed",
      text: "Review this pull request. List concrete issues with file and line, and explain each. Do not comment on style unless it causes a defect.",
    },
    inputArtifacts: ["Identical diff and file context for every model (SWE-PRBench)"],
    successCriteria: [
      "Catches human-identified issues (recall)",
      "Additional findings are valid (precision)",
    ],
    scoringMethod: ["Precision, recall and F1 against human-identified issues; extra findings judged with a rubric"],
    thresholds: [passThreshold, sampleSize],
  },
  {
    taskId: "type-annotation-lint",
    status: "draft",
    prompt: {
      kind: "proposed",
      text: "Add type annotations to this file so the type checker passes. Do not use Any or ignore comments.",
    },
    inputArtifacts: [
      "Set 1: eligible Gauntlet files with annotations removed",
      "Set 2: eligible files with a reproducible lint violation introduced",
    ],
    successCriteria: [
      "Type checker or linter passes and existing tests pass",
      "No silenced diagnostics and no specific types replaced with Any",
    ],
    scoringMethod: ["Executable checker/linter and tests, plus a rejection rule for silencing; two sets reported separately"],
    thresholds: [passThreshold, sampleSize],
  },
  {
    taskId: "migration-upgrades",
    status: "draft",
    prompt: {
      kind: "proposed",
      text: "Carry out the next stage of this upgrade. Keep the application building and its checks passing.",
    },
    inputArtifacts: ["Multi-step SWE migration and version-upgrade tasks (e.g. React 15 → 19 in eight stages)"],
    successCriteria: ["Each stage passes its verifier"],
    scoringMethod: ["Per-stage verifier; record the first stage that breaks"],
    thresholds: [passThreshold, sampleSize],
  },
  {
    taskId: "performance-suggestions",
    status: "draft",
    prompt: {
      kind: "proposed",
      text: "Identify the main performance bottleneck in this code for the given workload, explain why, and propose a specific change.",
    },
    inputArtifacts: ["GSO repository, performance test and (hidden) expert optimization"],
    successCriteria: [
      "Diagnosis identifies the bottleneck",
      "Implemented suggestion keeps output equivalent and produces a measured speedup",
    ],
    scoringMethod: [
      "Diagnosis scored by rubric against the expert optimization",
      "Speedup measured separately: equivalence check first, then repeated timing on fixed hardware",
    ],
    thresholds: [passThreshold, { label: "Minimum speedup", value: null }, sampleSize],
  },
  {
    taskId: "technical-debt",
    status: "draft",
    prompt: {
      kind: "proposed",
      text: "Does this code contain a code smell? If so, name it and point to the lines. If not, say so.",
    },
    inputArtifacts: ["MLCQ Java code samples"],
    successCriteria: [
      "Flags code the professional assessments identify",
      "Avoids false positives",
    ],
    scoringMethod: ["Precision and recall against developer assessments; architectural debt needs a separate sample"],
    thresholds: [passThreshold, sampleSize],
  },
  {
    taskId: "tool-function-calling",
    status: "draft",
    prompt: {
      kind: "proposed",
      text: "System: You can call the tools listed below. Ask for missing information instead of guessing, and say so if no tool can fulfill the request.",
    },
    inputArtifacts: [
      "BFCL multi-turn cases and tool definitions",
      "MCP-Atlas developer-tool cases with live MCP servers",
    ],
    successCriteria: [
      "Correct function and arguments; asks for missing information; recognizes no-fit requests (BFCL)",
      "Task completed through real tool execution (MCP-Atlas)",
    ],
    scoringMethod: [
      "Argument correctness reported separately from successful execution",
      "Record task success, invalid calls and retries",
    ],
    thresholds: [passThreshold, sampleSize],
  },
  {
    taskId: "multi-step-workflows",
    status: "draft",
    prompt: {
      kind: "proposed",
      text: "Continue working in this repository on the next request. Run whatever tests you judge necessary before finishing.",
    },
    inputArtifacts: [
      "Multi-step SWE workflows (5–15 dependent requests)",
      "Pinned repository snapshot in an on-prem container with consistent tools and budgets",
    ],
    successCriteria: ["Steps pass their checks; workflows complete"],
    scoringMethod: [
      "Steps passed and complete workflows solved, reported separately",
      "Record which tests the agent chose to run",
    ],
    thresholds: [passThreshold, { label: "Time / tool-call budget", value: null }, sampleSize],
  },
  {
    taskId: "language-translation",
    status: "draft",
    prompt: {
      kind: "proposed",
      text: "Translate this repository from Java to C#. The result must build and pass the provided C# tests.",
    },
    inputArtifacts: ["RepoTransBench source repository and target-language tests"],
    successCriteria: ["Translated repository runs and passes its target-language tests"],
    scoringMethod: ["Executable target-language tests; results reported per language pair"],
    thresholds: [passThreshold, { label: "Time / tool-call budget", value: null }, sampleSize],
  },
  {
    taskId: "optimization-profiling",
    status: "draft",
    prompt: {
      kind: "proposed",
      text: "Make this program faster on the provided workload without changing its output. You may profile, edit and run tests.",
    },
    inputArtifacts: [
      "GSO: repository and performance test",
      "Accelerate Bench v1.1: CPU application under fixed CPU and memory limits (license-compatible subset)",
    ],
    successCriteria: [
      "GSO: passes correctness checks and achieves at least 95% of the expert’s speedup under the benchmark’s standard metric",
      "Accelerate Bench v1.1: hidden checks verify correctness and timing",
    ],
    scoringMethod: [
      "Output equivalence checked before timing",
      "Repeated measurements under fixed hardware constraints",
      "Each dataset reported under its own protocol",
    ],
    thresholds: [
      { label: "GSO speedup threshold", value: "≥ 95% of expert speedup (benchmark definition)" },
      { label: "Time / tool-call budget", value: null },
      sampleSize,
    ],
  },
];
