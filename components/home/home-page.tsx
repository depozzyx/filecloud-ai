"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const EXAMPLE_SLUG = "MenuofBBQ";

export default function HomePage() {
  const router = useRouter();
  const [slug, setSlug] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = slug.trim();

    if (!trimmed) {
      setError("Enter a fileset name to continue");
      return;
    }

    setError(null);
    router.push(`/fileset/${encodeURIComponent(trimmed)}`);
  };

  const useExample = () => {
    setSlug(EXAMPLE_SLUG);
    setError(null);
    router.push(`/fileset/${encodeURIComponent(EXAMPLE_SLUG)}`);
  };

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-xl flex-col justify-center gap-10 px-6 py-16">
      <header className="space-y-2 text-center md:text-left">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500">
          Gold&apos;s Yacht
        </span>
        <h1 className="text-4xl font-semibold text-neutral-900">Filecloud viewer</h1>
        <p className="text-base leading-6 text-neutral-600">
          Paste your private fileset code to access tailored brochures, videos, and documents instantly. Each link is secure and ready to share with clients.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="text-sm font-medium text-neutral-700" htmlFor="fileset">
          Fileset code
        </label>
        <input
          id="fileset"
          name="fileset"
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
          placeholder={`e.g. ${EXAMPLE_SLUG}`}
          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />
        {error ? <p className="text-sm text-rose-500">{error}</p> : null}
        <button
          type="submit"
          className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-emerald-400 px-4 py-3 text-base font-semibold text-emerald-950 shadow-sm"
        >
          Open fileset
        </button>
      </form>

      <div className="flex flex-col gap-2 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/70 px-4 py-3 text-sm text-neutral-700">
        <span className="font-semibold text-emerald-900">Need a demo?</span>
        <p>Try the public showcase link below to explore the experience.</p>
        <button
          onClick={useExample}
          type="button"
          className="self-start text-sm font-semibold text-emerald-600 underline decoration-emerald-400 decoration-2 underline-offset-4"
        >
          {EXAMPLE_SLUG}
        </button>
      </div>
    </main>
  );
}
