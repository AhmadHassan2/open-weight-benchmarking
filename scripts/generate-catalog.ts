/**
 * Regenerates the model and dataset catalog section of README.md from src/data.
 * Run with `npm run catalog`. Only the text between the CATALOG markers changes.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  bandsFor,
  categories,
  checkpoints,
  datasets,
  entriesForCheckpoint,
  getCategory,
  getTask,
  sizeSummary,
  usesOfDataset,
} from "../src/data";

const README = join(__dirname, "..", "README.md");
const START = "<!-- CATALOG:START -->";
const END = "<!-- CATALOG:END -->";

const cell = (s: string) => s.replace(/\|/g, "\\|").replace(/\n/g, " ");
const fmt = (n: number) => new Intl.NumberFormat("en-US").format(n);

const lines: string[] = [];
lines.push("_Generated from `src/data` by `npm run catalog`. Do not edit by hand._", "");

lines.push(`### Models (${checkpoints.length} checkpoints, ${checkpoints.reduce((n, c) => n + entriesForCheckpoint(c.id).length, 0)} category entries)`, "");
lines.push("| Checkpoint | Publisher | Total / active size | Band | License (as reported) | Chinese publisher | Categories | Model card |");
lines.push("|---|---|---|---|---|---|---|---|");
for (const c of checkpoints) {
  const band = bandsFor(c);
  const cats = entriesForCheckpoint(c.id)
    .map((e) => getCategory(e.categoryId)?.shortName)
    .join(", ");
  lines.push(
    `| ${cell(c.name)} | ${cell(c.publisher)} | ${cell(sizeSummary(c).primary)} | ${cell(band.labels.join(" / ") || "Not banded")} | ${cell(c.license ?? "Not supplied")} | ${c.chinesePublisher ? "Yes (off-network, public data only)" : "No"} | ${cats} | [${c.repoId}](${c.modelCard.url}) |`,
  );
}
lines.push("");

lines.push(`### Datasets (${datasets.length})`, "");
lines.push("| Dataset | Public release | Examples | Dataset license | Upstream terms | Used for | Links |");
lines.push("|---|---|---|---|---|---|---|");
for (const d of datasets) {
  const used = [...new Set(usesOfDataset(d.id).map((u) => getTask(u.taskId)?.name))].join("; ");
  const links = d.links.map((l) => `[${l.kind}](${l.url})`).join(" · ");
  const size = d.size.count !== null ? `${fmt(d.size.count)} ${d.size.unit}` : "Not supplied";
  lines.push(
    `| ${cell(d.name)} | ${cell(d.publicRelease)} | ${cell(size)} | ${cell(d.license)} | ${cell(d.upstreamTerms ?? "None stated")} | ${cell(used)} | ${links} |`,
  );
}
lines.push("");
lines.push(`Categories: ${categories.map((c) => c.name).join(", ")}. Enterprise approval for every dataset: Not reviewed.`);

const readme = readFileSync(README, "utf8");
const s = readme.indexOf(START);
const e = readme.indexOf(END);
if (s === -1 || e === -1) throw new Error("README is missing the CATALOG markers");
writeFileSync(README, readme.slice(0, s + START.length) + "\n" + lines.join("\n") + "\n" + readme.slice(e));
console.log("README catalog updated");
