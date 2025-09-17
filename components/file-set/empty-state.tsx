"use client";

import { FileSet } from "@/lib/domain/file-set";

export default function EmptyState({ fileSet }: { fileSet: FileSet }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[430px] flex-col items-center justify-center gap-4 px-6 text-center text-neutral-600">
      <div className="text-sm uppercase tracking-[0.3em] text-neutral-400">No files</div>
      <h2 className="text-2xl font-semibold text-neutral-900">{fileSet.title}</h2>
      <p className="text-sm leading-6">
        This link does not include any downloadable assets yet. Please contact your Gold&apos;s Yacht representative if you believe this is a mistake.
      </p>
    </div>
  );
}
