import Link from "next/link";
import { bandsFor, getCheckpoint, getTask, sizeSummary, taskHref, type CategoryCandidate } from "@/data";
import { EnvironmentText, ModelLink, NotSupplied, SourceLink } from "./bits";
import { FilterableModels } from "./OriginFilter";

interface Props {
  entries: CategoryCandidate[];
  caption: string;
  /** Category view shows priority-task links; task view shows the wording for one task. */
  forTaskId?: string;
}

export function CandidateTable({ entries, caption, forTaskId }: Props) {
  const chineseCount = entries.filter((e) => getCheckpoint(e.checkpointId)?.chinesePublisher).length;
  const taskView = Boolean(forTaskId);

  return (
    <FilterableModels total={entries.length} chinese={chineseCount} noun="entries">
      <div className="table-wrap">
        <table className="table-stack candidates">
          <caption>{caption}</caption>
          <thead>
            <tr>
              <th scope="col">Model</th>
              <th scope="col">Size and band</th>
              <th scope="col">{taskView ? "What the notes say" : "Focus tasks"}</th>
              <th scope="col">Why it&rsquo;s included</th>
              <th scope="col">Environment</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => {
              const cp = getCheckpoint(e.checkpointId);
              if (!cp) return null;
              const size = sizeSummary(cp);
              const band = bandsFor(cp);
              const interpretive = forTaskId ? e.interpretiveTaskIds.includes(forTaskId) : false;
              return (
                <tr key={e.id} data-chinese={cp.chinesePublisher ? "true" : "false"}>
                  <th scope="row">
                    <ModelLink id={cp.id} />
                    {e.labelAsSupplied !== cp.name ? (
                      <span className="sub">Listed as &ldquo;{e.labelAsSupplied}&rdquo;</span>
                    ) : null}
                    <span className="sub">
                      <SourceLink link={cp.modelCard} compact />
                    </span>
                  </th>
                  <td data-label="Size and band">
                    <span className="num num--wrap">{size.primary}</span>
                    <span className="sub">
                      {band.labels.length > 0 ? band.labels.join(" / ") : "Not banded"}
                      {band.note ? ` · ${band.note}` : ""}
                    </span>
                  </td>
                  <td data-label={taskView ? "What the notes say" : "Focus tasks"}>
                    {taskView ? (
                      <>
                        &ldquo;{e.priorityTasksText}&rdquo;
                        {interpretive ? (
                          <span className="sub">Our reading: the notes don&rsquo;t name this task directly.</span>
                        ) : null}
                      </>
                    ) : (
                      <ul className="link-list">
                        {e.priorityTaskIds.map((tid) => {
                          const t = getTask(tid);
                          if (!t) return null;
                          return (
                            <li key={tid}>
                              <Link href={taskHref(t)}>{t.name}</Link>
                              {e.interpretiveTaskIds.includes(tid) ? (
                                <span className="link-kind">our reading</span>
                              ) : null}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                    {e.categoryWide ? <span className="sub">{e.categoryWide}</span> : null}
                  </td>
                  <td data-label="Why it’s included">
                    {e.reason === null ? (
                      <NotSupplied>No reason given in the notes</NotSupplied>
                    ) : e.reason === e.priorityTasksText ? (
                      <span className="muted">Same as the focus tasks</span>
                    ) : (
                      e.reason
                    )}
                  </td>
                  <td data-label="Environment">
                    <EnvironmentText env={e.environment} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </FilterableModels>
  );
}
