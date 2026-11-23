import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page prose">
      <h1>Page not found</h1>
      <p className="after-block">
        There is no category, task, model or dataset at this address. Go to the{" "}
        <Link href="/explorer">benchmark explorer</Link> or{" "}
        <Link href="/explorer/search">search the catalog</Link>.
      </p>
    </div>
  );
}
