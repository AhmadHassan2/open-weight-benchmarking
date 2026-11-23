import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExplorerShell } from "@/components/ExplorerShell";
import { Breadcrumbs, GapCallout, NotSupplied, SourceLinks, fmt } from "@/components/bits";
import { datasets, getCategory, getDataset, getTask, taskHref, usesOfDataset } from "@/data";

export function generateStaticParams() {
  return datasets.map((d) => ({ id: d.id }));
}

export async function generateMetadata({ params }: PageProps<"/explorer/datasets/[id]">): Promise<Metadata> {
  const { id } = await params;
  const d = getDataset(id);
  return { title: d ? d.name : "Dataset not found" };
}

export default async function DatasetPage({ params }: PageProps<"/explorer/datasets/[id]">) {
  const { id } = await params;
  const ds = getDataset(id);
  if (!ds) notFound();
  const uses = usesOfDataset(ds.id);

  return (
    <ExplorerShell currentRecord="datasets">
      <Breadcrumbs
        items={[
          { label: "Benchmark explorer", href: "/explorer" },
          { label: "All datasets", href: "/explorer/datasets" },
          { label: ds.name },
        ]}
      />
      <header className="page-header">
        <p className="eyebrow">Dataset record</p>
        <h1>{ds.name}</h1>
        <p className="lede">{ds.coverage}</p>
      </header>

      <section className="section" aria-labelledby="facts">
        <h2 id="facts">Details</h2>
        <dl className="facts">
          <dt>Public release</dt>
          <dd>{ds.publicRelease}</dd>
          <dt>Version</dt>
          <dd>{ds.version ?? <NotSupplied>Not stated</NotSupplied>}</dd>
          <dt>Exact version</dt>
          <dd>
            {ds.pinnedRevision ? (
              <>
                <span className="num">{ds.pinnedRevision}</span>
                <span className="sub">Mentioned in the notes. Not yet confirmed as the version we&rsquo;ll use.</span>
              </>
            ) : (
              <span className="to-define">To define (pick before the tests are locked)</span>
            )}
          </dd>
          <dt>Examples</dt>
          <dd>
            {ds.size.count !== null ? (
              <>
                <span className="num">{fmt(ds.size.count)}</span> {ds.size.unit}
              </>
            ) : (
              <NotSupplied />
            )}
            <span className="sub">From the notes: {ds.size.text}</span>
          </dd>
          <dt>License</dt>
          <dd>{ds.license}</dd>
          <dt>Terms for the code inside</dt>
          <dd>{ds.upstreamTerms ?? <NotSupplied>None stated</NotSupplied>}</dd>
          <dt>Internal approval</dt>
          <dd>{ds.enterpriseApproval}</dd>
          <dt>Where it came from</dt>
          <dd>{ds.provenance ?? <NotSupplied>Not stated</NotSupplied>}</dd>
          <dt>When the items were written</dt>
          <dd>{ds.sourceItemDate ?? <NotSupplied>Not recorded</NotSupplied>}</dd>
          <dt>Seen in training?</dt>
          <dd>
            <span className="to-define">Unknown</span>
            <span className="sub">
              We haven&rsquo;t checked yet whether the models were trained on this data.
            </span>
          </dd>
          <dt>Sources</dt>
          <dd>
            <SourceLinks links={ds.links} />
            {ds.citationsAsSupplied.length > 0 ? (
              <span className="sub">Source in the notes: {ds.citationsAsSupplied.join(", ")}</span>
            ) : null}
          </dd>
        </dl>
      </section>

      <section className="section" aria-labelledby="roles">
        <h2 id="roles">
          How each task uses it <span className="muted num">({uses.length})</span>
        </h2>
        {uses.map((u) => {
          const t = getTask(u.taskId)!;
          return (
            <article key={u.id} className="record" aria-labelledby={`use-${u.id}`}>
              <div className="record__head">
                <h3 id={`use-${u.id}`}>
                  <Link href={taskHref(t)}>{t.name}</Link>
                </h3>
                <span className="muted small">{getCategory(t.categoryId)?.name}</span>
              </div>
              <p className="record__role">Used for: {u.role}</p>
              <dl className="facts">
                <dt>Part to use</dt>
                <dd>{u.slice}</dd>
                <dt>Subset we&rsquo;ll use</dt>
                <dd>
                  {u.eligibleSubset ? (
                    <>
                      {u.eligibleSubset.description}:{" "}
                      {u.eligibleSubset.count !== null ? (
                        <strong>
                          <span className="num">{fmt(u.eligibleSubset.count)}</span> {u.eligibleSubset.unit}
                        </strong>
                      ) : (
                        <span className="to-define">Not yet counted</span>
                      )}
                    </>
                  ) : (
                    <span className="muted">Uses the whole dataset or the slice above</span>
                  )}
                </dd>
                <dt>Notes for this task</dt>
                <dd>
                  {u.rowReleaseAndSize}
                  <span className="sub">License: {u.rowLicense}</span>
                </dd>
                <dt>How to use it</dt>
                <dd>{u.usageNote}</dd>
              </dl>
              <GapCallout gaps={u.gaps} />
            </article>
          );
        })}
      </section>
    </ExplorerShell>
  );
}
