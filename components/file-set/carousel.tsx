"use client";

import { forwardRef } from "react";

import { FileAsset } from "@/lib/domain/file-set";

import SlideMedia from "./slide-media";

type CarouselProps = {
    assets: FileAsset[];
    activeIndex: number;
    activeBadge: string;
    countText: string;
    onDotClick: (index: number) => void;
};

const BADGE_LABELS: Record<FileAsset["kind"], string> = {
    video: "VIDEO",
    pdf: "DOCUMENT",
    image: "PHOTO",
    unknown: "FILE",
};

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(function Carousel(
    { assets, activeIndex, activeBadge, countText, onDotClick },
    ref
) {
    return (
        <div className="relative">
            <div
                ref={ref}
                className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
                style={{ scrollbarWidth: "none" }}
            >
                {assets.map((asset, index) => (
                    <div
                        key={asset.id}
                        className="relative h-[520px] w-full flex-none snap-center bg-black"
                    >
                        <SlideMedia asset={asset} index={index} />

                        <div className="absolute left-6 top-2 rounded-full bg-black/60 px-2 py-1 text-[12px] text-white">
                            {index === activeIndex
                                ? activeBadge
                                : BADGE_LABELS[asset.kind]}
                        </div>

                        <div className="absolute right-6 top-6 rounded-full bg-black/60 px-2 py-1 text-[12px] text-white">
                            {index === activeIndex ? countText : ""}
                        </div>

                        {index === activeIndex && assets.length > 1 ? (
                            <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5">
                                {assets.map((_, dotIndex) => (
                                    <button
                                        key={dotIndex}
                                        onClick={() => onDotClick(dotIndex)}
                                        className={`h-1.5 w-1.5 rounded-full ${
                                            dotIndex === activeIndex
                                                ? "bg-white"
                                                : "bg-white/50"
                                        }`}
                                        aria-label={`Go to slide ${
                                            dotIndex + 1
                                        }`}
                                        type="button"
                                    />
                                ))}
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    );
});

export default Carousel;
