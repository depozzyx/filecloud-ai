"use client";

import { ExternalLink } from "@/components/icons";

import { FileAsset } from "@/lib/domain/file-set";

import { gradientForIndex } from "./gradients";

interface SlideMediaProps {
    asset: FileAsset;
    index: number;
}

export default function SlideMedia({ asset, index }: SlideMediaProps) {
    if (asset.kind === "image") {
        return (
            <div className="h-full w-full">
                <img
                    src={asset.url}
                    alt={asset.description || asset.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                />
                <p className="font-black text-white/50 absolute left-[38%] top-1/2">
                    @goldsyacht
                </p>
            </div>
        );
    }

    if (asset.kind === "video") {
        return (
            <div className="h-full w-full">
                <video
                    key={asset.id}
                    src={asset.url}
                    playsInline
                    preload="auto"
                    muted
                    className="h-full w-full object-cover"
                    data-asset-index={index}
                />
                <p className="font-black text-white/50 absolute left-[38%] top-1/2">
                    @goldsyacht
                </p>
            </div>
        );
    }

    if (asset.kind === "pdf") {
        return (
            <div className="relative h-full w-full bg-neutral-950">
                <iframe
                    src={`${asset.url}#toolbar=0&navpanes=0&scrollbar=0`}
                    title={asset.name}
                    loading="lazy"
                    className="h-full w-full"
                />
                <div className="absolute inset-x-0 bottom-4 flex justify-center">
                    <a
                        href={asset.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[12px] font-semibold text-neutral-900 shadow"
                    >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Open document
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`h-full w-full ${gradientForIndex(
                index
            )} grid place-items-center text-white/90`}
        >
            <div className="flex flex-col items-center gap-3 text-center">
                <span className="text-sm tracking-widest">FILE</span>
                <a
                    href={asset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-[12px] font-semibold text-white backdrop-blur"
                >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Open
                </a>
            </div>
        </div>
    );
}
