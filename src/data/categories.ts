import type { Category } from "./types";

export const categories: Category[] = [
  {
    id: "understanding-communication",
    name: "Understanding & Communication",
    shortName: "Understanding",
    purpose:
      "Explain, summarize, document and answer questions about existing code.",
    order: 1,
    poolNote:
      "The research notes name three models per task. This list combines them.",
  },
  {
    id: "code-generation",
    name: "Code Generation",
    shortName: "Generation",
    purpose:
      "Write new code: single functions, whole projects, autocomplete, boilerplate and code for unfamiliar libraries.",
    order: 2,
    poolNote:
      "The research notes list the models to test here and which tasks each one should focus on.",
  },
  {
    id: "quality-maintenance",
    name: "Quality & Maintenance",
    shortName: "Quality",
    purpose:
      "Keep code healthy: tests, bug fixes, refactoring, reviews, type and lint fixes, upgrades, performance and tech debt.",
    order: 3,
    poolNote:
      "The research notes list the models to test here and which tasks each one should focus on.",
  },
  {
    id: "advanced-agentic",
    name: "Advanced / Agentic Programming",
    shortName: "Agentic",
    purpose:
      "Multi-step work: calling tools, working across a repo, translating code and speeding it up.",
    order: 4,
    poolNote:
      "The research notes list the models to test here and which tasks each one should focus on.",
  },
];
