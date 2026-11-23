import type { ReactNode } from "react";
import { categoryHref, getCategory, getTask, sortedCategories, taskHref, tasksByCategory } from "@/data";
import { ExplorerNav, type NavCategory } from "./ExplorerNav";

interface Props {
  currentCategoryId?: string;
  currentTaskId?: string;
  currentRecord?: "models" | "datasets" | "search" | "overview";
  children: ReactNode;
}

export function ExplorerShell({ currentCategoryId, currentTaskId, currentRecord, children }: Props) {
  const nav: NavCategory[] = sortedCategories().map((c) => ({
    id: c.id,
    name: c.name,
    href: categoryHref(c.id),
    tasks: tasksByCategory(c.id).map((t) => ({ id: t.id, name: t.name, href: taskHref(t) })),
  }));

  const category = currentCategoryId ? getCategory(currentCategoryId) : undefined;
  const task = currentTaskId ? getTask(currentTaskId) : undefined;
  const locationLabel = task
    ? `${category?.shortName ?? ""} › ${task.name}`
    : category
      ? category.name
      : currentRecord === "models"
        ? "All models"
        : currentRecord === "datasets"
          ? "All datasets"
          : currentRecord === "search"
            ? "Search"
            : "All categories";

  return (
    <div className="page explorer">
      <ExplorerNav
        categories={nav}
        currentCategoryId={currentCategoryId}
        currentTaskId={currentTaskId}
        currentRecord={currentRecord}
        locationLabel={locationLabel}
      />
      <div>{children}</div>
    </div>
  );
}
