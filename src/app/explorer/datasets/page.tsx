import type { Metadata } from "next";
import Link from "next/link";
import { ExplorerShell } from "@/components/ExplorerShell";
import { Breadcrumbs, NotSupplied, fmt } from "@/components/bits";
import { datasetHref, datasets, getTask, taskHref, usesOfDataset } from "@/data";

export const metadata: Metadata = { title: "All datasets" };

export default function DatasetsIndexPage() {
  return (
    <ExplorerShell currentRecord="datasets">
      <Breadcrumbs items={[{ label: "Benchmark explorer", href: "/explorer" }, { label: "All datasets" }]} />
      <header className="page-header">
        <h1>All datasets</h1>
        <p className="lede">
          <span className="num">{datasets.length}</span> datasets. Some are used for more than one
          task, in different ways.
        </p>
      </header>
      <div className="table-wrap">
        <table className="table-stack">
          <caption>Every dataset in the research notes</caption>
          <thead>
            <tr>
              <th scope="col">Dataset</th>
              <th scope="col">Public release</th>
              <th scope="col" className="numeric">Examples</th>
              <th scope="col">License</th>
              <th scope="col">Used for</th>
            </tr>
          </thead>
          <tbody>
            {datasets.map((d) => {
              const taskIds = [...new Set(usesOfDataset(d.id).map((u) => u.taskId))];
              return (
                <tr key={d.id}>
                  <th scope="row">
                    <Link href={datasetHref(d.id)}>{d.name}</Link>
                  </th>
                  <td data-label="Public release">{d.publicRelease}</td>
                  <td className="numeric" data-label="Examples">
                    {d.size.count !== null ? (
                      <>
                        <span className="num">{fmt(d.size.count)}</span>
                        <span className="sub">{d.size.unit}</span>
                      </>
                    ) : (
                      <NotSupplied />
                    )}
                  </td>
                  <td data-label="License">{d.license}</td>
                  <td data-label="Used for">
                    <ul className="link-list">
                      {taskIds.map((tid) => {
                        const t = getTask(tid)!;
                        return (
                          <li key={tid}>
                            <Link href={taskHref(t)}>{t.name}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </ExplorerShell>
  );
}
