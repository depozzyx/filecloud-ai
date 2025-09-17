"use client";

import { PropsWithChildren } from "react";

export default function Toast({ children }: PropsWithChildren) {
  if (!children) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-20 z-40 mx-auto w-fit rounded-full bg-black/80 px-4 py-2 text-[12px] text-white shadow">
      {children}
    </div>
  );
}
