"use client";

import { SVGProps } from "react";

const baseProps: SVGProps<SVGSVGElement> = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function Heart(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="M19.5 4.75a4.75 4.75 0 0 0-6.72 0L12 5.53l-.78-.78a4.75 4.75 0 1 0-6.72 6.72l7.5 7.5 7.5-7.5a4.75 4.75 0 0 0 0-6.72Z" />
    </svg>
  );
}

export function MessageCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="M21 11.5a8.5 8.5 0 1 1-3.4-6.77" />
      <path d="M21 11.5v7l-3.2-1.8" />
    </svg>
  );
}

export function Send(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="m3.5 4.5 16 7.5-16 7.5 3.6-7.5-3.6-7.5Z" />
      <path d="M3.5 12h9" />
    </svg>
  );
}

export function Bookmark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="M6 3.5h12a1 1 0 0 1 1 1v16l-7-4-7 4v-16a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

export function ExternalLink(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="M11 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
      <path d="M10 14 20 4" />
      <path d="M15 4h5v5" />
    </svg>
  );
}
