"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useId, useMemo, useState, type FormEvent } from "react";
import { checkpoints, datasets, search, tasks, type SearchKind } from "@/data";

const GROUPS: { kind: SearchKind; label: string }[] = [
  { kind: "task", label: "Tasks" },
  { kind: "model", label: "Models" },
  { kind: "dataset", label: "Datasets" },
];

export function SearchPanel() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const urlQuery = params.get("q") ?? "";
  const inputId = useId();

  // The input is the source of truth while typing. URL changes that this panel
  // wrote itself are ignored; changes from elsewhere (header search, Back/Forward)
  // replace the draft.
  const [draft, setDraft] = useState(urlQuery);
  const [seenUrlQuery, setSeenUrlQuery] = useState(urlQuery);
  const [written, setWritten] = useState<string[]>([]);
  if (urlQuery !== seenUrlQuery) {
    setSeenUrlQuery(urlQuery);
    if (!written.includes(urlQuery)) {
      setDraft(urlQuery);
      setWritten([]);
    }
  }

  useEffect(() => {
    const onPop = () => {
      const q = new URLSearchParams(window.location.search).get("q") ?? "";
      setDraft(q);
      setWritten([]);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const results = useMemo(() => search(draft), [draft]);
  const total = results.task.length + results.model.length + results.dataset.length;
  const hasQuery = draft.trim().length > 0;

  const hrefFor = (q: string) => (q ? `${pathname}?q=${encodeURIComponent(q)}` : pathname);

  function onChange(value: string) {
    setDraft(value);
    setWritten((w) => [...w.slice(-49), value]);
    router.replace(hrefFor(value), { scroll: false });
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setWritten((w) => [...w.slice(-49), draft.trim()]);
    router.push(hrefFor(draft.trim()), { scroll: false });
  }

  return (
    <div className="search-results">
      <form role="search" onSubmit={onSubmit} className="field">
        <label htmlFor={inputId}>Task, model or dataset</label>
        <input
          id={inputId}
          type="search"
          value={draft}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. CRUXEval, Flint, stack trace"
          autoComplete="off"
        />
      </form>

      <p aria-live="polite" className="after-block muted small">
        {hasQuery
          ? total === 0
            ? `No tasks, models or datasets match “${draft.trim()}”.`
            : `${total} ${total === 1 ? "result" : "results"}: ${results.task.length} tasks, ${results.model.length} models, ${results.dataset.length} datasets.`
          : `Type to search across all ${tasks.length} tasks, ${checkpoints.length} checkpoints and ${datasets.length} datasets.`}
      </p>

      {hasQuery && total === 0 ? (
        <div className="empty-state after-block">
          No matches. Try a shorter term, a dataset name such as &ldquo;GSO&rdquo;, or a checkpoint
          label such as &ldquo;Mellum&rdquo;.
        </div>
      ) : null}

      {GROUPS.map(({ kind, label }) =>
        results[kind].length > 0 ? (
          <section key={kind} aria-labelledby={`results-${kind}`}>
            <h2 id={`results-${kind}`}>
              {label} <span className="muted num">({results[kind].length})</span>
            </h2>
            <ul className="result-list">
              {results[kind].map((r) => (
                <li key={r.id}>
                  <Link href={r.href} className={kind === "model" ? "model-name" : undefined}>
                    {r.title}
                  </Link>
                  {r.context ? <span className="result-context">{r.context}</span> : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null,
      )}
    </div>
  );
}
