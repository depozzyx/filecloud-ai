export function gradientForIndex(index: number): string {
  const gradients = [
    "bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-600",
    "bg-gradient-to-br from-slate-800 via-slate-900 to-slate-600",
    "bg-gradient-to-br from-slate-900 via-slate-800 to-blue-600",
    "bg-gradient-to-br from-slate-900 via-slate-800 to-teal-500",
    "bg-gradient-to-br from-neutral-900 via-neutral-800 to-amber-500",
  ];

  return gradients[((index % gradients.length) + gradients.length) % gradients.length];
}
