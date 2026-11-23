import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CandidateTable } from "@/components/CandidateTable";
import { ExplorerShell } from "@/components/ExplorerShell";
import { Breadcrumbs, NotSupplied, SourceLinks, fmt } from "@/components/bits";
import {
  candidatesByCategory,
  candidatesForTask,
  categories,
  datasetHref,
  datasetsForTask,
  getCategory,
  getDataset,
  taskHref,
  tasksByCategory,
} from "@/data";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: PageProps<"/explorer/[category]">): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  return { title: c ? c.name : "Category not found", description: c?.purpose };
}

export default async function CategoryPage({ params }: PageProps<"/explorer/[category]">) {
  const { category: categoryId } = await params;
  const category = getCategory(categoryId);
  if (!category) notFound();
  const taskList = tasksByCategory(category.id);
  const entries = candidatesByCategory(category.id);
  const datasetUses = taskList.flatMap((t) => datasetsForTask(t.id));
  const datasetIds = [...new Set(datasetUses.map((u) => u.datasetId))];

  return (
    <ExplorerShell currentCategoryId={category.id}>
      <Breadcrumbs
        items={[{ label: "Benchmark explorer", href: "/explorer" }, { label: category.name }]}
      />
      <header className="page-header">
        <h1>{category.name}</h1>
        <p className="lede">{category.purpose}</p>
      </header>

      <section className="section" aria-labelledby="tasks">
        <h2 id="tasks">
          Tasks <span className="muted num">({taskList.length})</span>
        </h2>
        <div className="table-wrap">
          <table className="table-stack">
            <thead>
              <tr>
                <th scope="col">Task</th>
                <th scope="col">What it covers</th>
                <th scope="col">Datasets</th>
                <th scope="col" className="numeric">
                  Models named
                </th>
              </tr>
            </thead>
            <tbody>
              {taskList.map((t) => {
                const ds = [...new Set(datasetsForTask(t.id).map((d) => d.datasetId))];
                return (
                  <tr key={t.id}>
                    <th scope="row">
                      <Link href={taskHref(t)}>{t.name}</Link>
                    </th>
                    <td data-label="What it covers">{t.description}</td>
                    <td data-label="Datasets">
                      <ul className="link-list">
                        {ds.map((id) => (
                          <li key={id}>
                            <Link href={datasetHref(id)}>{getDataset(id)?.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="numeric" data-label="Models named">
                      <span className="num">{candidatesForTask(t.id).priority.length}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section" aria-labelledby="candidates">
        <h2 id="candidates">
          Models to test <span className="muted num">({entries.length})</span>
        </h2>
        <p className="section-intro">
          {category.poolNote} Together they need to cover every task in this category. This is
          what we plan to test, not a ranking. Reasons are quoted from the research notes, and any
          scores are what the publisher or someone else reported, not our results.
        </p>
        <CandidateTable entries={entries} caption={`Models to test for ${category.name}`} />
      </section>

      <section className="section" aria-labelledby="datasets">
        <h2 id="datasets">
          Datasets <span className="muted num">({datasetIds.length})</span>
        </h2>
        <p className="section-intro">
          Every dataset used by a task in this category. Licenses are as listed in the research
          notes. Internal approval is tracked separately, and nothing has been reviewed yet.
        </p>
        <div className="table-wrap">
          <table className="table-stack">
            <caption>{category.name} datasets</caption>
            <thead>
              <tr>
                <th scope="col">Dataset</th>
                <th scope="col">Used for</th>
                <th scope="col">Public release</th>
                <th scope="col" className="numeric">Examples</th>
                <th scope="col">Subset we&rsquo;ll use</th>
                <th scope="col">License</th>
              </tr>
            </thead>
            <tbody>
              {datasetIds.map((id) => {
                const ds = getDataset(id)!;
                const uses = datasetUses.filter((u) => u.datasetId === id);
                return (
                  <tr key={id}>
                    <th scope="row">
                      <Link href={datasetHref(id)}>{ds.name}</Link>
                      <div className="sub">
                        <SourceLinks links={ds.links} compact />
                      </div>
                    </th>
                    <td data-label="Used for">
                      <ul className="link-list">
                        {uses.map((u) => {
                          const t = taskList.find((x) => x.id === u.taskId)!;
                          return (
                            <li key={u.id}>
                              <Link href={taskHref(t)}>{t.name}</Link>
                              <span className="sub">{u.role}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </td>
                    <td data-label="Public release">
                      {ds.publicRelease}
                      {ds.version ? <span className="sub">Version: {ds.version}</span> : null}
                    </td>
                    <td className="numeric" data-label="Examples">
                      {ds.size.count !== null ? (
                        <>
                          <span className="num">{fmt(ds.size.count)}</span>
                          <span className="sub">{ds.size.unit}</span>
                        </>
                      ) : (
                        <NotSupplied />
                      )}
                    </td>
                    <td data-label="Subset we’ll use">
                      <ul className="link-list">
                        {uses.map((u) => (
                          <li key={u.id}>
                            {u.eligibleSubset ? (
                              <>
                                {u.eligibleSubset.description}:{" "}
                                {u.eligibleSubset.count !== null ? (
                                  <strong className="num">{fmt(u.eligibleSubset.count)}</strong>
                                ) : (
                                  <span className="to-define">not yet counted</span>
                                )}
                              </>
                            ) : (
                              <span className="muted">Whole dataset or listed slice</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td data-label="License">
                      {ds.license}
                      {ds.upstreamTerms ? <span className="sub">Code inside: {ds.upstreamTerms}</span> : null}
                      <span className="sub">Internal approval: {ds.enterpriseApproval}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </ExplorerShell>
  );
}
