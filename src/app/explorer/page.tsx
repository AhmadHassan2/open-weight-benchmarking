import type { Metadata } from "next";
import Link from "next/link";
import { ExplorerShell } from "@/components/ExplorerShell";
import { Breadcrumbs } from "@/components/bits";
import { candidatesByCategory, categoryHref, sortedCategories, taskHref, tasksByCategory } from "@/data";

export const metadata: Metadata = { title: "Benchmark explorer" };

export default function ExplorerIndexPage() {
  return (
    <ExplorerShell currentRecord="overview">
      <Breadcrumbs items={[{ label: "Benchmark explorer" }]} />
      <header className="page-header">
        <h1>Benchmark explorer</h1>
        <p className="lede">
          Pick a category, then a task. Each task page shows how it&rsquo;s tested, which models to
          try and which datasets to use.
        </p>
      </header>
      {sortedCategories().map((c) => (
        <section key={c.id} className="section" aria-labelledby={`cat-${c.id}`}>
          <h2 id={`cat-${c.id}`}>
            <Link href={categoryHref(c.id)}>{c.name}</Link>
          </h2>
          <p className="section-intro">
            {c.purpose}{" "}
            <span className="muted">
              <span className="num">{tasksByCategory(c.id).length}</span> tasks ·{" "}
              <span className="num">{candidatesByCategory(c.id).length}</span> models
            </span>
          </p>
          <ul>
            {tasksByCategory(c.id).map((t) => (
              <li key={t.id}>
                <Link href={taskHref(t)}>{t.name}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </ExplorerShell>
  );
}
