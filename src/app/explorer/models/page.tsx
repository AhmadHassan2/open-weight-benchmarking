import type { Metadata } from "next";
import Link from "next/link";
import { ExplorerShell } from "@/components/ExplorerShell";
import { FilterableModels } from "@/components/OriginFilter";
import { BandText, Breadcrumbs, ModelLink, NotSupplied, SizeText } from "@/components/bits";
import { categoryHref, checkpoints, entriesForCheckpoint, getCategory } from "@/data";

export const metadata: Metadata = { title: "All models" };

export default function ModelsIndexPage() {
  const chinese = checkpoints.filter((c) => c.chinesePublisher).length;
  return (
    <ExplorerShell currentRecord="models">
      <Breadcrumbs items={[{ label: "Benchmark explorer", href: "/explorer" }, { label: "All models" }]} />
      <header className="page-header">
        <h1>All models</h1>
        <p className="lede">
          <span className="num">{checkpoints.length}</span> models. Some appear in more than one
          category, so the category pages list{" "}
          <span className="num">
            {checkpoints.reduce((n, c) => n + entriesForCheckpoint(c.id).length, 0)}
          </span>{" "}
          entries in total.
        </p>
      </header>
      <FilterableModels total={checkpoints.length} chinese={chinese}>
        <div className="table-wrap">
          <table className="table-stack">
            <caption>Every model in the research notes</caption>
            <thead>
              <tr>
                <th scope="col">Model</th>
                <th scope="col">Publisher</th>
                <th scope="col">Total / active size</th>
                <th scope="col">Band</th>
                <th scope="col">License</th>
                <th scope="col">Categories</th>
              </tr>
            </thead>
            <tbody>
              {checkpoints.map((cp) => (
                <tr key={cp.id} data-chinese={cp.chinesePublisher ? "true" : "false"}>
                  <th scope="row">
                    <ModelLink id={cp.id} />
                  </th>
                  <td data-label="Publisher">{cp.publisher}</td>
                  <td data-label="Total / active size">
                    <SizeText checkpoint={cp} />
                  </td>
                  <td data-label="Band">
                    <BandText checkpoint={cp} />
                  </td>
                  <td data-label="License">{cp.license ?? <NotSupplied />}</td>
                  <td data-label="Categories">
                    <ul className="link-list">
                      {entriesForCheckpoint(cp.id).map((e) => (
                        <li key={e.id}>
                          <Link href={categoryHref(e.categoryId)}>{getCategory(e.categoryId)?.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FilterableModels>
    </ExplorerShell>
  );
}
