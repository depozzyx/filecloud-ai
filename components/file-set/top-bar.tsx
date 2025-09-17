"use client";

interface TopBarProps {
  title: string;
  onShare: () => void;
}

export default function TopBar({ title, onShare }: TopBarProps) {
  return (
    <div className="sticky top-0 z-20 flex items-center justify-between border-b border-neutral-200 bg-white/95 px-3 py-2 backdrop-blur">
      <div className="flex items-center gap-2 font-semibold">{title}</div>
      <button
        onClick={onShare}
        className="inline-flex items-center gap-1 rounded-full bg-emerald-400 px-3 py-1.5 text-[12px] font-bold text-emerald-950"
        type="button"
      >
        Copy link
      </button>
    </div>
  );
}
