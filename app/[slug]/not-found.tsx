import Link from "next/link";

export default function FileSetNotFound() {
  return (
    <main className="mx-auto flex min-h-[80vh] max-w-xl flex-col items-center justify-center gap-6 px-6 text-center text-neutral-700">
      <h1 className="text-3xl font-semibold text-neutral-900">Link not found</h1>
      <p className="text-base leading-6">
        We couldn&apos;t find the requested Filecloud set. Please double-check the link or request a new one from your Gold&apos;s Yacht representative.
      </p>
      <Link
        href="/"
        className="rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-emerald-950 shadow-sm"
      >
        Back to Filecloud
      </Link>
    </main>
  );
}
