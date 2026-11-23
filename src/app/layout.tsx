import type { Metadata } from "next";
import Form from "next/form";
import Link from "next/link";
import { Suspense } from "react";
import { SiteNavLinks, SiteNavLinksStatic } from "@/components/SiteNav";
import "./globals.css";

const TITLE = "Open-Weight Models for Development Tasks";
const DESCRIPTION =
  "Benchmark plan and catalog for routing routine developer tasks to self-hosted open-weight models: tasks, candidate checkpoints, datasets, evaluation contracts and results.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: { default: TITLE, template: `%s · ${TITLE}` },
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="site-header">
          <div className="site-header__inner">
            <Link href="/" className="site-title">
              {TITLE}
            </Link>
            <nav className="primary-nav" aria-label="Primary">
              <Suspense fallback={<SiteNavLinksStatic />}>
                <SiteNavLinks />
              </Suspense>
            </nav>
            <Form action="/explorer/search" className="search-form" role="search">
              <label htmlFor="site-search" className="visually-hidden">
                Search tasks, models and datasets
              </label>
              <input
                id="site-search"
                name="q"
                type="search"
                placeholder="Search tasks, models, datasets"
                autoComplete="off"
              />
              <button type="submit" className="button">
                Search
              </button>
            </Form>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="site-footer">
          <div className="site-footer__inner">
            Internal planning site. All data is static and lives in <code>src/data</code>. No
            benchmarks have been run yet.
          </div>
        </footer>
      </body>
    </html>
  );
}
