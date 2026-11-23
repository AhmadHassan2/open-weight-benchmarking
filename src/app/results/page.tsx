import type { Metadata } from "next";
import { RunsTable } from "@/components/RunsTable";
import { fmt } from "@/components/bits";
import { historicalNotSupplied, historicalObservations, runs, watchlistLabels } from "@/data";

export const metadata: Metadata = {
  title: "Results",
  description: "Historical commercial observations and current open-weight benchmark runs.",
};

export default function ResultsPage() {
  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Results</p>
        <h1>Results</h1>
        <p className="lede">
          Our open-weight test results go here first. Older results from commercial models are
          below for reference only.
        </p>
      </header>

      <section className="section" aria-labelledby="current">
        <h2 id="current">Open-weight results</h2>
        <RunsTable runs={runs} />
      </section>

      <section className="section" aria-labelledby="historical">
        <h2 id="historical">Past commercial results</h2>
        <p className="section-intro">
          Copied exactly as recorded, with costs from the supplied screenshot. We don&rsquo;t
          calculate savings from these.
        </p>
        <div className="table-wrap">
          <table className="table-stack">
            <caption>Earlier commercial runs, for reference</caption>
            <thead>
              <tr>
                <th scope="col">Model label</th>
                <th scope="col" className="numeric">Input tokens</th>
                <th scope="col" className="numeric">Output tokens</th>
                <th scope="col" className="numeric">Reported cost ($)</th>
                <th scope="col" className="numeric">Latency (ms)</th>
                <th scope="col">Finish</th>
                <th scope="col">Quality</th>
              </tr>
            </thead>
            <tbody>
              {historicalObservations.map((h) => (
                <tr key={h.modelLabel}>
                  <th scope="row">{h.modelLabel}</th>
                  <td className="numeric" data-label="Input tokens">
                    <span className="num">{fmt(h.inputTokens)}</span>
                  </td>
                  <td className="numeric" data-label="Output tokens">
                    <span className="num">{fmt(h.outputTokens)}</span>
                  </td>
                  <td className="numeric" data-label="Reported cost ($)">
                    <span className="num">{h.reportedCost}</span>
                  </td>
                  <td className="numeric" data-label="Latency (ms)">
                    <span className="num">{fmt(h.latencyMs)}</span>
                  </td>
                  <td data-label="Finish">
                    <span className="num">{h.finish}</span>
                  </td>
                  <td data-label="Quality">
                    <span className="num">{h.quality}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="callout after-block prose" role="note">
          <h4>Missing from these results</h4>
          <p>{historicalNotSupplied.join(", ")}. We haven&rsquo;t guessed any of these.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="watchlist">
        <h2 id="watchlist">Earlier watchlist</h2>
        <p className="section-intro">
          Model names from an earlier off-network watchlist, as given. Being on this list
          doesn&rsquo;t mean a model has open weights, a usable license or approval to deploy. Only
          the research notes decide which models we test.
        </p>
        <ul>
          {watchlistLabels.map((l) => (
            <li key={l}>&ldquo;{l}&rdquo;</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
