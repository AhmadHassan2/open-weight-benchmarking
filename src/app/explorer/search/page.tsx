import type { Metadata } from "next";
import { Suspense } from "react";
import { ExplorerShell } from "@/components/ExplorerShell";
import { SearchPanel } from "@/components/SearchPanel";
import { Breadcrumbs } from "@/components/bits";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage() {
  return (
    <ExplorerShell currentRecord="search">
      <Breadcrumbs items={[{ label: "Benchmark explorer", href: "/explorer" }, { label: "Search" }]} />
      <header className="page-header">
        <h1>Search</h1>
        <p className="lede">Find a task by name, a model by checkpoint or label, or a dataset by name.</p>
      </header>
      <Suspense fallback={<p className="muted">Loading search…</p>}>
        <SearchPanel />
      </Suspense>
    </ExplorerShell>
  );
}
