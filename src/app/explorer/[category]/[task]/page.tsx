import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CandidateTable } from "@/components/CandidateTable";
import { ExplorerShell } from "@/components/ExplorerShell";
import {
  Breadcrumbs,
  GapCallout,
  NotSupplied,
  SourceLinks,
  ToDefine,
  fmt,
} from "@/components/bits";
import {
  candidatesForTask,
  categoryHref,
  datasetHref,
  datasetsForTask,
  getCategory,
  getContract,
  getDataset,
  getTask,
  optimizationProtocolComparison,
  taskHref,
  tasks,
  usesOfDataset,
  type EvaluationContract,
  type TaskDataset,
} from "@/data";

export function generateStaticParams() {
  return tasks.map((t) => ({ category: t.categoryId, task: t.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/explorer/[category]/[task]">): Promise<Metadata> {
  const { task } = await params;
  const t = getTask(task);
  return { title: t ? t.name : "Task not found", description: t?.description };
}

export default async function TaskPage({ params }: PageProps<"/explorer/[category]/[task]">) {
  const { category: categoryId, task: taskId } = await params;
  const task = getTask(taskId);
  if (!task || task.categoryId !== categoryId) notFound();
  const category = getCategory(task.categoryId)!;
  const contract = getContract(task.id);
  const { priority, pool } = candidatesForTask(task.id);
  const rows = datasetsForTask(task.id);

  return (
    <ExplorerShell currentCategoryId={category.id} currentTaskId={task.id}>
      <Breadcrumbs
        items={[
          { label: "Benchmark explorer", href: "/explorer" },
          { label: category.name, href: categoryHref(category.id) },
          { label: task.name },
        ]}
      />
      <header className="page-header">
        <p className="eyebrow">
          <Link href={categoryHref(category.id)}>{category.name}</Link>
        </p>
        <h1>{task.name}</h1>
        <p className="lede">{task.description}</p>
        {task.fitNote ? (
          <div className="callout prose">
            <h4>What decides which model fits</h4>
            <p>{task.fitNote}</p>
          </div>
        ) : null}
        <nav aria-label="On this page">
          <ul className="jump-links">
            <li>
              <a href="#contract">Evaluation contract</a>
            </li>
            <li>
              <a href="#models">Models to benchmark</a>
            </li>
            <li>
              <a href="#datasets">Datasets and coverage</a>
            </li>
            {task.id === optimizationProtocolComparison.taskId ? (
              <li>
                <a href="#protocols">Protocol comparison</a>
              </li>
            ) : null}
          </ul>
        </nav>
      </header>

      {contract ? <Contract contract={contract} /> : null}

      <section className="section" aria-labelledby="models">
        <h2 id="models">Models to benchmark</h2>
        <p className="section-intro">
          These are the models we plan to test, not a ranking. We&rsquo;ll only pick one after
          measuring quality, speed and cost. Status: <strong>Pending benchmark</strong>.
        </p>
        <div className="subsection">
          <h3>
            Named for this task <span className="muted num">({priority.length})</span>
          </h3>
          {priority.length > 0 ? (
            <CandidateTable
              entries={priority}
              caption={`Models the notes name for ${task.name}`}
              forTaskId={task.id}
            />
          ) : (
            <p className="empty-state">The notes don&rsquo;t name any models for this task specifically.</p>
          )}
        </div>
        {pool.length > 0 ? (
          <div className="subsection">
            <h3>
              Other {category.name} models <span className="muted num">({pool.length})</span>
            </h3>
            <p className="section-intro small muted">
              The notes don&rsquo;t name this task for these models. Some are meant to run on every
              task in the category anyway.
            </p>
            <CandidateTable
              entries={pool}
              caption={`Other ${category.name} models`}
              forTaskId={task.id}
            />
          </div>
        ) : null}
      </section>

      <section className="section" aria-labelledby="datasets">
        <h2 id="datasets">Datasets and coverage</h2>
        <p className="section-intro">
          {rows.length} {rows.length === 1 ? "dataset" : "datasets"} used for this task. Licenses are
          as listed in the research notes. Internal approval is tracked separately.
        </p>
        {rows.map((row) => (
          <DatasetUse key={row.id} row={row} />
        ))}
      </section>

      {task.id === optimizationProtocolComparison.taskId ? <ProtocolComparison /> : null}
    </ExplorerShell>
  );
}

function Contract({ contract }: { contract: EvaluationContract }) {
  const frozen = contract.status === "frozen";
  return (
    <section className="section" aria-labelledby="contract">
      <h2 id="contract">
        Evaluation contract{" "}
        <span className={`tag ${frozen ? "tag--frozen" : "tag--draft"}`}>
          {frozen ? "Frozen" : "Draft"}
        </span>
      </h2>
      <p className="section-intro">
        {frozen
          ? "This is locked in. Every run uses exactly these inputs, pass criteria and scoring."
          : "This is a draft. Nothing is locked in yet: the prompt is an example, and anything marked “To define” still needs agreeing."}
      </p>
      <dl className="facts">
        <dt>Frozen function prompt</dt>
        <dd>
          {contract.prompt.kind === "proposed" ? (
            <>
              <span className="sub">Proposed prompt (example, not final)</span>
              <pre className="prompt-box">{contract.prompt.text}</pre>
            </>
          ) : (
            <pre className="prompt-box">{contract.prompt.text}</pre>
          )}
        </dd>
        <dt>Input artifacts</dt>
        <dd>
          <ul>
            {contract.inputArtifacts.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </dd>
        <dt>Success criteria</dt>
        <dd>
          <ul>
            {contract.successCriteria.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <ul className="link-list">
            {contract.thresholds.map((t) => (
              <li key={t.label}>
                <span className="muted">{t.label}:</span> {t.value ?? <ToDefine />}
              </li>
            ))}
          </ul>
        </dd>
        <dt>Scoring method</dt>
        <dd>
          <ul>
            {contract.scoringMethod.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </dd>
      </dl>
    </section>
  );
}

function DatasetUse({ row }: { row: TaskDataset }) {
  const ds = getDataset(row.datasetId);
  if (!ds) return null;
  const otherUses = usesOfDataset(ds.id).filter((u) => u.id !== row.id);

  return (
    <article className="record" aria-labelledby={`ds-${row.id}`}>
      <div className="record__head">
        <h3 id={`ds-${row.id}`}>
          <Link href={datasetHref(ds.id)}>{ds.name}</Link>
        </h3>
      </div>
      <p className="record__role">Used here for: {row.role}</p>
      <dl className="facts">
        <dt>Part to use</dt>
        <dd>{row.slice}</dd>
        <dt>What it covers</dt>
        <dd>{row.coverage}</dd>
        <dt>Release and size</dt>
        <dd>
          {row.rowReleaseAndSize}
          {ds.version ? <span className="sub">Version: {ds.version}</span> : null}
          {ds.pinnedRevision ? (
            <span className="sub">
              Revision cited in notes: <span className="num">{ds.pinnedRevision}</span>
            </span>
          ) : null}
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
          <span className="sub">Whole dataset: {ds.size.text}</span>
        </dd>
        <dt>Subset we&rsquo;ll use</dt>
        <dd>
          {row.eligibleSubset ? (
            <>
              {row.eligibleSubset.description}:{" "}
              {row.eligibleSubset.count !== null ? (
                <strong>
                  <span className="num">{fmt(row.eligibleSubset.count)}</span>{" "}
                  {row.eligibleSubset.unit}
                </strong>
              ) : (
                <span className="to-define">Not yet counted</span>
              )}
            </>
          ) : (
            <span className="muted">Uses the whole dataset or the slice above</span>
          )}
        </dd>
        <dt>License</dt>
        <dd>
          {row.rowLicense}
          {ds.upstreamTerms ? <span className="sub">Code inside: {ds.upstreamTerms}</span> : null}
          <span className="sub">Internal approval: {ds.enterpriseApproval}</span>
        </dd>
        <dt>Seen in training?</dt>
        <dd>
          <span className="to-define">Unknown</span>
          <span className="sub">Not checked yet. A recent release date doesn&rsquo;t prove a model hasn&rsquo;t seen it.</span>
        </dd>
        <dt>How to use it</dt>
        <dd>{row.usageNote}</dd>
        <dt>Sources</dt>
        <dd>
          <SourceLinks links={ds.links} />
          {ds.citationsAsSupplied.length > 0 ? (
            <span className="sub">Source in the notes: {ds.citationsAsSupplied.join(", ")}</span>
          ) : null}
        </dd>
        {otherUses.length > 0 ? (
          <>
            <dt>Also used for</dt>
            <dd>
              <ul className="link-list">
                {otherUses.map((u) => {
                  const t = getTask(u.taskId);
                  if (!t) return null;
                  return (
                    <li key={u.id}>
                      {u.taskId === row.taskId ? (
                        <span>This task: {u.role}</span>
                      ) : (
                        <>
                          <Link href={taskHref(t)}>{t.name}</Link>
                          <span className="muted">: {u.role}</span>
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
            </dd>
          </>
        ) : null}
      </dl>
      <GapCallout gaps={row.gaps} />
    </article>
  );
}

function ProtocolComparison() {
  const [a, b] = optimizationProtocolComparison.datasetIds;
  const da = getDataset(a)!;
  const db = getDataset(b)!;
  return (
    <section className="section" aria-labelledby="protocols">
      <h2 id="protocols">Protocol comparison</h2>
      <p className="section-intro">
        The two datasets test optimization in different ways, so we report them separately
        instead of combining them into one score.
      </p>
      <div className="table-wrap">
        <table className="table-stack">
          <thead>
            <tr>
              <th scope="col">Aspect</th>
              <th scope="col">{da.name}</th>
              <th scope="col">{db.name}</th>
            </tr>
          </thead>
          <tbody>
            {optimizationProtocolComparison.rows.map((r) => (
              <tr key={r.aspect}>
                <th scope="row">{r.aspect}</th>
                <td data-label={da.name}>{r.values[a]}</td>
                <td data-label={db.name}>{r.values[b]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
