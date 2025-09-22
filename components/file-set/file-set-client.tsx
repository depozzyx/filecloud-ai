"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { FileSet } from "@/lib/domain/file-set";

import ActionBar from "./action-bar";
import Caption from "./caption";
import Carousel from "./carousel";
import EmptyState from "./empty-state";
import FooterActions from "./footer-actions";
import TopBar from "./top-bar";
import Toast from "@/components/ui/toast";

interface FileSetClientProps {
    fileSet: FileSet;
}

const OWNER_HANDLE = "goldsyacht";

export default function FileSetClient({ fileSet }: FileSetClientProps) {
    const assets = fileSet.assets;
    const [active, setActive] = useState(0);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(() =>
        Math.max(assets.length * 120 + 820, 1280)
    );
    const [toast, setToast] = useState<string | null>(null);
    const railRef = useRef<HTMLDivElement>(null);
    const [audioUnlocked, setAudioUnlocked] = useState(false);

    useEffect(() => {
        if (active >= assets.length) {
            setActive(0);
        }
    }, [active, assets.length]);

    useEffect(() => {
        const element = railRef.current;
        if (!element) return;
        let timeout: ReturnType<typeof setTimeout> | undefined;

        const handleScroll = () => {
            setAudioUnlocked(true);
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
                const index = Math.round(
                    element.scrollLeft / element.clientWidth
                );
                setActive(
                    Math.max(0, Math.min(index, Math.max(assets.length - 1, 0)))
                );
            }, 60);
        };

        element.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            element.removeEventListener("scroll", handleScroll);
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [assets.length]);

    useEffect(() => {
        const rail = railRef.current;
        if (!rail) return;

        const videos = Array.from(
            rail.querySelectorAll<HTMLVideoElement>("video")
        );

        const ensurePlayback = (video: HTMLVideoElement) => {
            const playPromise = video.play();
            if (playPromise) {
                playPromise.catch(() => {
                    if (!video.muted) {
                        video.muted = true;
                    }
                    video.play().catch(() => {
                        /* noop */
                    });
                });
            }
        };

        videos.forEach((video, index) => {
            if (index === active) {
                video.muted = !audioUnlocked;
                ensurePlayback(video);
            } else {
                if (!video.paused) {
                    video.pause();
                }
                if (video.currentTime !== 0) {
                    video.currentTime = 0;
                }
                if (!video.muted) {
                    video.muted = true;
                }
            }
        });
    }, [active, assets.length, audioUnlocked]);

    useEffect(() => {
        if (audioUnlocked) {
            return;
        }
        const unlock = () => setAudioUnlocked(true);
        window.addEventListener("pointerup", unlock, { once: true });
        window.addEventListener("keydown", unlock, { once: true });
        return () => {
            window.removeEventListener("pointerup", unlock);
            window.removeEventListener("keydown", unlock);
        };
    }, [audioUnlocked]);

    useEffect(() => {
        const rail = railRef.current;
        if (!rail) return;

        const videos = Array.from(
            rail.querySelectorAll<HTMLVideoElement>("video")
        );

        const handleVolumeChange = (event: Event) => {
            if (!event.isTrusted) return;
            const target = event.currentTarget as HTMLVideoElement;
            if (target.muted && target.volume > 0) {
                target.muted = false;
            }
            setAudioUnlocked(true);
        };

        videos.forEach((video) => {
            video.addEventListener("volumechange", handleVolumeChange);
        });

        return () => {
            videos.forEach((video) => {
                video.removeEventListener("volumechange", handleVolumeChange);
            });
        };
    }, [assets.length]);

    const total = assets.length;
    const current = assets[active] ?? null;

    const countText = useMemo(() => {
        if (!total) return "";
        return `${active + 1}/${total}`;
    }, [active, total]);

    const activeBadge = useMemo(() => {
        if (!current) return "FILE";
        switch (current.kind) {
            case "video":
                return "VIDEO";
            case "pdf":
                return "PDF";
            case "image":
                return "PHOTO";
            default:
                return current.extension
                    ? `${current.extension.toUpperCase()} FILE`
                    : "FILE";
        }
    }, [current]);

    const scrollTo = useCallback((index: number) => {
        setAudioUnlocked(true);
        const element = railRef.current;
        if (!element) return;
        element.scrollTo({
            left: index * element.clientWidth,
            behavior: "smooth",
        });
    }, []);

    const showToast = useCallback((message: string) => {
        setToast(message);
        window.setTimeout(() => setToast(null), 2400);
    }, []);

    const handleShare = useCallback(async () => {
        try {
            const url = window.location.href;
            if ("share" in navigator && typeof navigator.share === "function") {
                await navigator.share({ title: fileSet.title, url });
            } else if (navigator.clipboard) {
                await navigator.clipboard.writeText(url);
                showToast("Link copied to clipboard");
            }
        } catch (error) {
            showToast("Unable to share link");
        }
    }, [fileSet.title, showToast]);

    const handleChat = useCallback(() => {
        // const text = encodeURIComponent(
        //     `I like this option (${fileSet.title})`
        // );
        const text = "";
        window.open(
            `https://api.whatsapp.com/send/?phone=971544402848&text=${text}`
        );
    }, [fileSet.title]);

    const handleOpen = useCallback(() => {
        if (!current) return;
        window.open(current.url, "_blank", "noopener,noreferrer");
    }, [current]);

    const toggleLike = useCallback(() => {
        setLiked((value) => {
            setLikes((previous) => {
                if (value) {
                    return Math.max(previous - 1, 0);
                }
                return previous + 1;
            });
            return !value;
        });
    }, []);

    if (assets.length === 0) {
        return <EmptyState fileSet={fileSet} />;
    }

    return (
        <div className="mx-auto max-w-[430px] min-h-[100dvh] bg-white text-neutral-900">
            <TopBar title="Gold's Yacht Cloud" onShare={handleShare} />

            {fileSet.description ? (
                <div className="px-3 pt-2 text-[11px] text-neutral-500">
                    {fileSet.description}
                </div>
            ) : null}

            <header className="flex items-center gap-3 px-3 py-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr bg-black flex items-center justify-center">
                    <img
                        src="https://www.yachtrentaldubai.com/wp-content/uploads/2023/09/group-12.png"
                        className="h-full w-full mt-[0px] ml-0.5"
                        width={200}
                        height={200}
                    ></img>
                </div>
                <div className="flex min-w-0 flex-col">
                    <div className="flex items-center gap-1 text-[14px] font-semibold">
                        {OWNER_HANDLE}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            width="16px"
                            height="16px"
                        >
                            <polygon
                                fill="#0095f6"
                                points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"
                            />
                            <polygon
                                fill="#fff"
                                points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"
                            />
                        </svg>
                    </div>
                    <div className="flex items-center gap-1 text-[12px] text-neutral-500">
                        File set • {fileSet.title}
                    </div>
                </div>
            </header>

            <Carousel
                ref={railRef}
                assets={assets}
                activeIndex={active}
                activeBadge={activeBadge}
                countText={countText}
                onDotClick={scrollTo}
            />

            <ActionBar
                liked={liked}
                onToggleLike={toggleLike}
                onComment={handleChat}
                onShare={handleShare}
            />

            <div className="px-3 text-[14px] font-semibold">
                {likes.toLocaleString()} likes
            </div>

            <Caption asset={current} ownerName={OWNER_HANDLE} />

            <div className="px-3 pb-20 pt-1 text-[11px] uppercase tracking-wide text-neutral-500">
                Shared via GOLD'S YACHT cloud
            </div>

            {/* <FooterActions
                onChat={handleChat}
                onOpen={handleOpen}
                onShare={handleShare}
                disabled={!current}
            /> */}

            <Toast>{toast}</Toast>
        </div>
    );
}
