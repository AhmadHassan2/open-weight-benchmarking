import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodology",
  description: "How we'll run the tests, score them, check the datasets and measure cost.",
};

export default function MethodologyPage() {
  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Methodology</p>
        <h1>How the benchmarks will work</h1>
        <p className="lede">
          How we&rsquo;ll run the tests, score them, check the datasets, measure cost and pick
          models. None of this has been run yet.
        </p>
      </header>

      <section className="section" aria-labelledby="summary">
        <h2 id="summary">At a glance</h2>
        <ul className="prose">
          <li>
            <a href="#harness">Running the tests</a>: every model gets the same inputs, and every
            attempt is logged.
          </li>
          <li>
            <a href="#quality">Scoring</a>: run real tests where we can, and use a written checklist
            for answers in plain English.
          </li>
          <li>
            <a href="#freshness">Datasets</a>: record where the data came from and when. If we
            don&rsquo;t know whether a model has seen it, we say &ldquo;unknown&rdquo;.
          </li>
          <li>
            <a href="#cost">Cost and speed</a>: cost per successful task, plus typical and slowest
            response times.
          </li>
          <li>
            <a href="#decision">Picking models</a>: use the smallest model that passes, then compare
            cost, speed and GPU needs.
          </li>
        </ul>
      </section>

      <section className="section" aria-labelledby="harness">
        <h2 id="harness">Running the tests</h2>
        <p className="prose">
          A script loads the test cases, sends every model the same inputs, records each call and
          retry, scores the result, and saves one record per attempt.
        </p>
        <div className="subsection prose">
          <h3>What we measure with</h3>
          <ul>
            <li>
              <strong>Gateway or client logging:</strong> timing, token usage and errors for each
              request.
            </li>
            <li>
              <strong>Server and GPU monitoring:</strong> queue length, tokens per second, memory and
              GPU use.
            </li>
            <li>
              <strong>IDs:</strong> every record carries a run ID and request ID so the logs can be
              joined up.
            </li>
            <li>
              <strong>Shared GPUs:</strong> cost is split across the time window we measured.
            </li>
          </ul>
        </div>
        <div className="subsection prose">
          <h3>Agent and repository tasks</h3>
          <ul>
            <li>We log every turn and every tool call.</li>
            <li>
              Each repo is pinned to a fixed snapshot and run in a container on our servers, with
              the same tools and the same limits for every model.
            </li>
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="quality">
        <h2 id="quality">Scoring</h2>
        <p className="prose">
          Where we can, we run real tests or check the output directly. For written answers and
          reviews, we use a written checklist.
        </p>
        <div className="subsection prose">
          <h3>Special cases</h3>
          <ul>
            <li>
              <strong>Tool use:</strong> calling a tool correctly and the tool actually working are
              scored separately.
            </li>
            <li>
              <strong>Speed-ups:</strong> first check the output is unchanged, then time it several
              times on the same hardware.
            </li>
          </ul>
        </div>
        <div className="subsection prose">
          <h3>What every score comes with</h3>
          <p>
            Which part of the dataset was used, how many cases were tried, how much results varied,
            and the pass mark.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="freshness">
        <h2 id="freshness">Datasets</h2>
        <p className="prose">
          A recent release date doesn&rsquo;t prove a model hasn&rsquo;t seen the data. If we
          don&rsquo;t have evidence either way, we mark it &ldquo;unknown&rdquo;.
        </p>
        <div className="subsection prose">
          <h3>What we record for each dataset</h3>
          <ul>
            <li>When the items were written, when the dataset was released, and the exact version</li>
            <li>Where the data originally came from</li>
            <li>Each model&rsquo;s training cutoff, if known, and any overlap checks</li>
            <li>Whether a case is genuinely new or an old example repackaged</li>
          </ul>
        </div>
        <div className="subsection prose">
          <h3>Licenses</h3>
          <p>
            We record the dataset&rsquo;s license separately from the licenses of the code inside it,
            and separately for any filtered subset. Licenses are listed as the research notes
            describe them. Internal approval is tracked on its own.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="cost">
        <h2 id="cost">Cost and speed</h2>
        <p className="prose">
          Every comparison uses the same workload and counts costs the same way. We also record GPU
          time, idle time and any assumptions behind the numbers.
        </p>
        <div className="subsection prose">
          <h3>Formulas</h3>
          <p className="formula">
            cost per successful task = serving cost of all attempts (including retries) ÷ number of
            successful tasks
          </p>
          <p className="formula">
            cost per million tokens = serving cost ÷ total tokens × 1,000,000
          </p>
          <p className="small muted">
            If nothing succeeded, cost per successful task shows &ldquo;undefined&rdquo;, not zero.
          </p>
        </div>
        <div className="subsection prose">
          <h3>Tokens</h3>
          <p>
            We count input, output, reasoning and cached tokens the way the server reports them, and
            never count the same token twice.
          </p>
        </div>
        <div className="subsection prose">
          <h3>Speed and hardware</h3>
          <ul>
            <li>Typical (p50) and slowest (p95) total response time</li>
            <li>Time to the first token</li>
            <li>Tokens per second</li>
            <li>GPU use and memory</li>
            <li>Hardware setup</li>
          </ul>
        </div>
        <div className="subsection prose">
          <h3>Three different kinds of saving</h3>
          <p>These are reported separately because they aren&rsquo;t the same thing:</p>
          <ul>
            <li>Paying for fewer commercial tokens</li>
            <li>Generating fewer tokens overall</li>
            <li>Spending less in total to serve the requests</li>
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="decision">
        <h2 id="decision">Picking models</h2>
        <ol className="prose">
          <li>For each task, find the smallest models that pass.</li>
          <li>Compare their cost per successful task, speed and GPU needs under realistic load.</li>
          <li>
            Choose a set of models that covers every task in the category. Where we don&rsquo;t
            have results yet, the task shows <strong>Pending benchmark</strong>.
          </li>
        </ol>
        <p className="after-block prose">
          To estimate company-wide savings, we&rsquo;ll need real request volumes and the cost of
          the models we actually deploy. Until then, this site shows no savings estimates or
          rankings.
        </p>
      </section>
    </div>
  );
}
