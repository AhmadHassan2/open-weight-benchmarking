"use client";

import { useId, useSyncExternalStore, type ReactNode } from "react";

export type OriginFilterValue = "all" | "non-chinese" | "chinese";

const STORAGE_KEY = "model-origin-filter";
const listeners = new Set<() => void>();
let current: OriginFilterValue | null = null;

function read(): OriginFilterValue {
  if (current) return current;
  let stored: string | null = null;
  try {
    stored = window.sessionStorage.getItem(STORAGE_KEY);
  } catch {
    stored = null;
  }
  current = stored === "non-chinese" || stored === "chinese" ? stored : "all";
  return current;
}

function write(value: OriginFilterValue) {
  current = value;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* storage unavailable: keep the in-memory value */
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useOriginFilter(): [OriginFilterValue, (v: OriginFilterValue) => void] {
  const value = useSyncExternalStore(subscribe, read, () => "all" as const);
  return [value, write];
}

/** Test helper: reset the shared filter state. */
export function resetOriginFilterForTests() {
  current = "all";
  listeners.forEach((l) => l());
}

const OPTIONS: { value: OriginFilterValue; label: string }[] = [
  { value: "all", label: "All models" },
  { value: "non-chinese", label: "Exclude Chinese models" },
  { value: "chinese", label: "Chinese models only" },
];

interface Props {
  /** Number of entries in the wrapped table. */
  total: number;
  /** Number of those entries from a Chinese publisher. */
  chinese: number;
  /** Noun for the count, e.g. "entries" or "models". */
  noun?: string;
  children: ReactNode;
}

/**
 * Wraps a model table. Rows mark themselves with `data-chinese="true|false"`;
 * the filter hides non-matching rows with CSS so the table stays server-rendered.
 */
export function FilterableModels({ total, chinese, noun = "models", children }: Props) {
  const [origin, setOrigin] = useOriginFilter();
  const name = useId();
  const visible = origin === "all" ? total : origin === "chinese" ? chinese : total - chinese;

  return (
    <div data-origin-filter={origin}>
      <fieldset className="origin-filter">
        <legend>Model origin</legend>
        {OPTIONS.map((o) => (
          <label key={o.value}>
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={origin === o.value}
              onChange={() => setOrigin(o.value)}
            />
            {o.label}
          </label>
        ))}
        <span className="origin-filter__count" aria-live="polite">
          Showing <span className="num">{visible}</span> of <span className="num">{total}</span> {noun}
        </span>
      </fieldset>
      {visible === 0 ? (
        <p className="empty-state">No models match this filter.</p>
      ) : null}
      <div hidden={visible === 0}>{children}</div>
    </div>
  );
}
