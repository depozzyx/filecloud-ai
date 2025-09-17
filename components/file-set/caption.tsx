"use client";

import { useEffect, useMemo, useState } from "react";

import { FileAsset } from "@/lib/domain/file-set";

interface CaptionProps {
    asset: FileAsset | null;
    ownerName: string;
}

const TEXT_LIMIT = 110;

export default function Caption({ asset, ownerName }: CaptionProps) {
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        setExpanded(false);
    }, [asset?.id]);

    const text = asset?.description?.trim();
    const long = (text?.length ?? 0) > TEXT_LIMIT;
    const shown = useMemo(() => {
        if (!text) return "";
        if (expanded || !long) return text;
        return `${text.slice(0, TEXT_LIMIT)}…`;
    }, [text, expanded, long]);

    if (!asset) {
        return null;
    }

    return (
        <div className="px-3 pt-1 text-[14px] leading-snug">
            <b className="mr-1 font-semibold">{ownerName}</b>
            {/* <span className="font-semibold">{asset.name}</span> */}
            {text ? <span> — {shown}</span> : null}
            {long && !expanded ? (
                <button
                    onClick={() => setExpanded(true)}
                    className="ml-1 align-baseline text-[13px] font-medium text-neutral-500"
                    type="button"
                >
                    more
                </button>
            ) : null}
        </div>
    );
}
