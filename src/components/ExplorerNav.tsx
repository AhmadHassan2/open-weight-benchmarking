"use client";

import Link from "next/link";
import { useId, useState } from "react";

export interface NavCategory {
  id: string;
  name: string;
  href: string;
  tasks: { id: string; name: string; href: string }[];
}

interface Props {
  categories: NavCategory[];
  currentCategoryId?: string;
  currentTaskId?: string;
  currentRecord?: "models" | "datasets" | "search" | "overview";
  /** Text describing the current location, shown on the mobile toggle. */
  locationLabel: string;
}

/**
 * Category index. A left rail on desktop; a disclosure button on narrow screens.
 * All entries are real links, so keyboard and Back/Forward work normally.
 */
export function ExplorerNav({
  categories,
  currentCategoryId,
  currentTaskId,
  currentRecord,
  locationLabel,
}: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const close = () => setOpen(false);

  return (
    <nav className="explorer-nav" aria-label="Benchmark categories">
      <button
        type="button"
        className="explorer-nav__toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span>
          <span className="muted">Category: </span>
          {locationLabel}
        </span>
        <svg className="chevron" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      <div id={panelId} className="explorer-nav__panel" data-open={open}>
        <p className="explorer-nav__heading">Categories</p>
        <ul>
          <li>
            <Link
              href="/explorer"
              aria-current={currentRecord === "overview" ? "page" : undefined}
              onClick={close}
            >
              All categories
            </Link>
          </li>
          {categories.map((c) => {
            const active = c.id === currentCategoryId;
            return (
              <li key={c.id} className="nav-category">
                <Link
                  href={c.href}
                  aria-current={active && !currentTaskId ? "page" : undefined}
                  onClick={close}
                >
                  {c.name} <span className="count">({c.tasks.length})</span>
                </Link>
                {active ? (
                  <ul className="nav-tasks" aria-label={`${c.name} tasks`}>
                    {c.tasks.map((t) => (
                      <li key={t.id}>
                        <Link
                          href={t.href}
                          aria-current={t.id === currentTaskId ? "page" : undefined}
                          onClick={close}
                        >
                          {t.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
        <ul className="nav-records">
          <li>
            <Link
              href="/explorer/models"
              aria-current={currentRecord === "models" ? "page" : undefined}
              onClick={close}
            >
              All models
            </Link>
          </li>
          <li>
            <Link
              href="/explorer/datasets"
              aria-current={currentRecord === "datasets" ? "page" : undefined}
              onClick={close}
            >
              All datasets
            </Link>
          </li>
          <li>
            <Link
              href="/explorer/search"
              aria-current={currentRecord === "search" ? "page" : undefined}
              onClick={close}
            >
              Search
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
