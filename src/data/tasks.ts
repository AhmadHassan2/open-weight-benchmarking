import type { Task } from "./types";

export const tasks: Task[] = [
  // Understanding & Communication (8)
  {
    id: "code-explanation",
    categoryId: "understanding-communication",
    name: "Code explanation",
    description:
      "A developer selects a function or block and asks what it does, how execution flows through it, and what side effects it has.",
    fitNote:
      "Can it explain the purpose, execution path, and side effects accurately? Compare short functions with harder examples containing callbacks, mutation, or exception handling.",
  },
  {
    id: "reading-understanding-code",
    categoryId: "understanding-communication",
    name: "Reading/understanding code",
    description:
      "The developer needs a precise answer about behaviour: what a function returns, which branch runs, or how state changes.",
    fitNote:
      "Ask for a verifiable result: the return value, branch taken, state change, or order of execution. This is the strongest direct comparison of the three code-reasoning candidates.",
  },
  {
    id: "summarization",
    categoryId: "understanding-communication",
    name: "Summarization (file/module/PR)",
    description:
      "Produce a short, accurate summary of a file, a module, or a pull request so a reviewer or newcomer can orient quickly.",
    fitNote:
      "Measure factual coverage and unsupported claims at three sizes. Report file, module, and PR results separately. A model may summarize a file accurately while missing a behavior change in a multifile PR.",
  },
  {
    id: "codebase-qa",
    categoryId: "understanding-communication",
    name: "Q&A about a codebase",
    description:
      "Answer a question about a specific repository using supplied excerpts, citing the file or symbol that supports the answer.",
    fitNote:
      "Give each model the same repository excerpts. Score the answer, the supporting file or symbol, and whether it recognizes missing evidence. This isolates answer quality from retrieval quality.",
  },
  {
    id: "technical-questions",
    categoryId: "understanding-communication",
    name: "Answering technical questions",
    description:
      "Answer general developer questions and questions tied to a particular library version, using supplied documentation.",
    fitNote:
      "Include general developer questions and questions tied to a specific library version. For version-specific cases, supply identical documentation and score whether the answer applies to that version.",
  },
  {
    id: "docstring-generation",
    categoryId: "understanding-communication",
    name: "Documentation/docstring generation",
    description:
      "Write a docstring or reference documentation for existing code that matches its real parameters, returns and behaviour.",
    fitNote:
      "Check parameters, returns, defaults, exceptions, and side effects against the implementation. Rnj versus Ministral is especially informative: both are near 8B, and this task needs accurate code reading and clear writing.",
  },
  {
    id: "commit-pr-description",
    categoryId: "understanding-communication",
    name: "Commit message/PR description generation",
    description:
      "Draft a commit title or a full pull-request description from a diff, without claiming anything the diff does not show.",
    fitNote:
      "Score short commit titles separately from full PR descriptions. Check that every claim is supported by the diff, especially claims about motivation, tests, or user-visible behavior.",
  },
  {
    id: "error-stack-trace-diagnosis",
    categoryId: "understanding-communication",
    name: "Error/stack trace diagnosis",
    description:
      "Given an error report, logs or a stack trace and the relevant code, identify where it failed and why.",
    fitNote:
      "Score whether the model distinguishes the crash location from the underlying cause, cites supporting trace or code evidence, and identifies what is missing when the cause is ambiguous.",
  },

  // Code Generation (5)
  {
    id: "single-function",
    categoryId: "code-generation",
    name: "Single function / snippet",
    description:
      "Implement one function from a signature and requirements so that the project's existing tests pass.",
    fitNote: null,
  },
  {
    id: "multifile-project",
    categoryId: "code-generation",
    name: "Multifile / project-level generation",
    description:
      "Build a feature or a new project that spans several files, keeping it working as requirements are added.",
    fitNote: null,
  },
  {
    id: "fim-autocomplete",
    categoryId: "code-generation",
    name: "Fill-in-the-middle / autocomplete",
    description:
      "Complete code at the cursor using the surrounding prefix and suffix, as an IDE autocomplete would.",
    fitNote: null,
  },
  {
    id: "boilerplate-scaffolding",
    categoryId: "code-generation",
    name: "Boilerplate scaffolding",
    description:
      "Generate the standard skeleton for a backend service or frontend app that installs, starts and builds.",
    fitNote: null,
  },
  {
    id: "unfamiliar-code-generation",
    categoryId: "code-generation",
    name: "Unfamiliar code generation",
    description:
      "Write working code against an API or library the model may not have seen, using supplied documentation.",
    fitNote: null,
  },

  // Quality & Maintenance (8)
  {
    id: "test-generation",
    categoryId: "quality-maintenance",
    name: "Test generation (unit / integration)",
    description:
      "Write a test that captures a bug or behaviour: it fails before the fix and passes after it.",
    fitNote: null,
  },
  {
    id: "debugging",
    categoryId: "quality-maintenance",
    name: "Debugging / troubleshooting",
    description:
      "Given an issue and the pre-fix code, produce a patch that fixes the bug without breaking passing tests.",
    fitNote: null,
  },
  {
    id: "refactoring",
    categoryId: "quality-maintenance",
    name: "Refactoring",
    description:
      "Apply a requested structural change, such as moving or inlining a method, while the build and tests keep passing.",
    fitNote: null,
  },
  {
    id: "code-review",
    categoryId: "quality-maintenance",
    name: "Code review / PR review",
    description:
      "Review a diff with file context and report real issues without flooding the author with invalid comments.",
    fitNote: null,
  },
  {
    id: "type-annotation-lint",
    categoryId: "quality-maintenance",
    name: "Type annotation / lint fixes",
    description:
      "Add correct type annotations or fix a lint violation so the checker and existing tests pass, without silencing diagnostics.",
    fitNote: null,
  },
  {
    id: "migration-upgrades",
    categoryId: "quality-maintenance",
    name: "Code migration / version upgrades",
    description:
      "Move code to a new framework or library version in stages, keeping each stage working.",
    fitNote: null,
  },
  {
    id: "performance-suggestions",
    categoryId: "quality-maintenance",
    name: "Performance optimization suggestions",
    description:
      "Identify the bottleneck in slow code and propose a change. The diagnosis and the measured speedup are scored separately.",
    fitNote: null,
  },
  {
    id: "technical-debt",
    categoryId: "quality-maintenance",
    name: "Technical debt identification",
    description:
      "Flag maintainability problems (code smells) in the right places while avoiding false positives.",
    fitNote: null,
  },

  // Advanced / Agentic Programming (4)
  {
    id: "tool-function-calling",
    categoryId: "advanced-agentic",
    name: "Tool / function calling",
    description:
      "Choose the right tool, supply valid arguments, ask for missing information, and act on the result.",
    fitNote: null,
  },
  {
    id: "multi-step-workflows",
    categoryId: "advanced-agentic",
    name: "Multi-step agentic workflows — repo navigation and multi-file edits",
    description:
      "Carry a sequence of dependent requests through a repository, navigating files, editing several of them and running tests.",
    fitNote: null,
  },
  {
    id: "language-translation",
    categoryId: "advanced-agentic",
    name: "Translation between programming languages",
    description:
      "Port a repository or module to another language so that it builds and passes target-language tests.",
    fitNote: null,
  },
  {
    id: "optimization-profiling",
    categoryId: "advanced-agentic",
    name: "Optimization — performance / profiling",
    description:
      "Profile a repository, change the code and verify that output is unchanged and the target is faster.",
    fitNote: null,
  },
];
