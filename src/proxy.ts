import { NextResponse, type NextRequest } from "next/server";
import { categories } from "./data/categories";
import { checkpoints } from "./data/checkpoints";
import { datasets } from "./data/datasets";
import { tasks } from "./data/tasks";

/**
 * With Cache Components, a page's static shell streams before `notFound()` runs,
 * so unknown slugs would answer 200. This checks explorer paths against the
 * catalog first and serves the not-found page with a real 404 status.
 */
const valid = new Set<string>([
  "/explorer",
  "/explorer/models",
  "/explorer/datasets",
  "/explorer/search",
  ...categories.map((c) => `/explorer/${c.id}`),
  ...tasks.map((t) => `/explorer/${t.categoryId}/${t.id}`),
  ...checkpoints.map((c) => `/explorer/models/${c.id}`),
  ...datasets.map((d) => `/explorer/datasets/${d.id}`),
]);

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/\/+$/, "") || "/";
  let decoded = path;
  try {
    decoded = decodeURIComponent(path);
  } catch {
    /* keep raw path */
  }
  if (valid.has(decoded)) return NextResponse.next();
  return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 });
}

export const config = {
  matcher: "/explorer/:path*",
};
