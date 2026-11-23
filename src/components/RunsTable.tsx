import Link from "next/link";
import {
  costPerSuccessfulTask,
  datasetHref,
  getCheckpoint,
  getDataset,
  getTask,
  modelHref,
  taskHref,
  type BenchmarkRun,
  type Measured,
} from "@/data";

export const EMPTY_RUNS_MESSAGE = "No open-weight benchmark runs recorded yet.";

/** Renders a measured value. "Not measured" never looks like a measured zero. */
export function MeasuredValue({
  value,
  format = (n) => String(n),
}: {
  value: Measured<number>;
  format?: (n: number) => string;
}) {
  if (value.status === "not-measured") return <span className="not-measured">Not measured</span>;
  return <span className="num">{format(value.value)}</span>;
}

const ms = (n: number) => `${new Intl.NumberFormat("en-US").format(Math.round(n))} ms`;
const usd = (n: number) => `$${n.toFixed(6).replace(/0+$/, "").replace(/\.$/, ".0")}`;
const pct = (n: number) => `${(n * 100).toFixed(1)}%`;

function CostCell({ run }: { run: BenchmarkRun }) {
  const c = costPerSuccessfulTask(run);
  if (c.status === "not-measured") return <span className="not-measured">Not measured</span>;
  if (c.status === "undefined")
    return (
      <span className="not-measured" title="Zero successful tasks in this window">
        Undefined (0 successes)
      </span>
    );
  return <span className="num">{usd(c.value)}</span>;
}

export function RunsTable({ runs }: { runs: BenchmarkRun[] }) {
  if (runs.length === 0) {
    return <p className="empty-state">{EMPTY_RUNS_MESSAGE}</p>;
  }
  return (
    <div className="table-wrap">
      <table className="table-stack">
        <caption>Open-weight test results</caption>
        <thead>
          <tr>
            <th scope="col">Task</th>
            <th scope="col">Model</th>
            <th scope="col">Dataset split</th>
            <th scope="col" className="numeric">Attempts</th>
            <th scope="col" className="numeric">Successes</th>
            <th scope="col" className="numeric">Quality</th>
            <th scope="col" className="numeric">Latency p50 / p95</th>
            <th scope="col" className="numeric">Cost per successful task</th>
            <th scope="col">Run ID</th>
          </tr>
        </thead>
        <tbody>
          {runs.map((r) => {
            const task = getTask(r.taskId);
            const cp = getCheckpoint(r.checkpointId);
            const ds = getDataset(r.datasetId);
            return (
              <tr key={r.runId}>
                <th scope="row">{task ? <Link href={taskHref(task)}>{task.name}</Link> : r.taskId}</th>
                <td data-label="Model">
                  {cp ? (
                    <Link href={modelHref(cp.id)} className="model-name">
                      {cp.name}
                    </Link>
                  ) : (
                    r.checkpointId
                  )}
                </td>
                <td data-label="Dataset split">
                  {ds ? <Link href={datasetHref(ds.id)}>{ds.name}</Link> : r.datasetId}
                  <span className="sub">{r.datasetSplit}</span>
                </td>
                <td className="numeric" data-label="Attempts">
                  <span className="num">{r.attempts}</span>
                </td>
                <td className="numeric" data-label="Successes">
                  <MeasuredValue value={r.successes} />
                </td>
                <td className="numeric" data-label="Quality">
                  <MeasuredValue value={r.quality} format={pct} />
                  {r.qualityLabel ? <span className="sub">{r.qualityLabel}</span> : null}
                </td>
                <td className="numeric" data-label="Latency p50 / p95">
                  <MeasuredValue value={r.latencyP50Ms} format={ms} /> /{" "}
                  <MeasuredValue value={r.latencyP95Ms} format={ms} />
                </td>
                <td className="numeric" data-label="Cost per successful task">
                  <CostCell run={r} />
                </td>
                <td data-label="Run ID">
                  <span className="num">{r.runId}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
