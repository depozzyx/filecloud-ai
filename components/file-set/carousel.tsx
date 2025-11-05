"use client";

import { forwardRef } from "react";

import { FileAsset } from "@/lib/domain/file-set";

import SlideMedia from "./slide-media";
import { SoundMuted } from "../icons";
import { Volume2Icon, VolumeOff } from "lucide-react";

type CarouselProps = {
    assets: FileAsset[];
    activeIndex: number;
    activeBadge: string;
    countText: string;
    onDotClick: (index: number) => void;
    volumeOff?: boolean;
};

const BADGE_LABELS: Record<FileAsset["kind"], string> = {
    video: "VIDEO",
    pdf: "DOCUMENT",
    image: "PHOTO",
    unknown: "FILE",
};

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(function Carousel(
    { assets, activeIndex, activeBadge, countText, onDotClick, volumeOff },
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
                        <SlideMedia
                            activeIndex={activeIndex}
                            asset={asset}
                            index={index}
                        />

                        <div className="absolute left-3 top-3 rounded-full bg-black/60 px-2 py-1 text-[12px] text-white">
                            {index === activeIndex
                                ? activeBadge
                                : BADGE_LABELS[asset.kind]}
                        </div>

                        <div className="absolute right-3 top-3 rounded-full bg-black/60 px-2 py-1 text-[12px] text-white">
                            {index === activeIndex ? countText : ""}
                        </div>

                        <div className="absolute left-3 bottom-3 rounded-full bg-black/60 px-2 py-1 text-[12px] w-[25px] h-[25px] flex items-center justify-center text-white">
                            {volumeOff ? (
                                <VolumeOff size={16} className="scale-150" />
                            ) : (
                                <Volume2Icon size={16} className="scale-150" />
                            )}
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
