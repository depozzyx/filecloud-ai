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
  const [likes, setLikes] = useState(() => Math.max(assets.length * 120 + 820, 1280));
  const [toast, setToast] = useState<string | null>(null);
  const railRef = useRef<HTMLDivElement>(null);

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
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        const index = Math.round(element.scrollLeft / element.clientWidth);
        setActive(Math.max(0, Math.min(index, Math.max(assets.length - 1, 0))));
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
    const videos = Array.from(rail.querySelectorAll<HTMLVideoElement>("video"));
    videos.forEach((video, index) => {
      if (index === active) {
        const playPromise = video.play();
        if (playPromise) {
          playPromise.catch(() => {
            video.muted = true;
          });
        }
      } else {
        video.pause();
      }
    });
  }, [active, assets.length]);

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
        return current.extension ? `${current.extension.toUpperCase()} FILE` : "FILE";
    }
  }, [current]);

  const scrollTo = useCallback((index: number) => {
    const element = railRef.current;
    if (!element) return;
    element.scrollTo({ left: index * element.clientWidth, behavior: "smooth" });
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
    const text = encodeURIComponent(
      `Hi Gold's Yacht, I received the "${fileSet.title}" Filecloud link.`,
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
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
      <TopBar title="Gold's Yacht Filecloud" onShare={handleShare} />

      {fileSet.description ? (
        <div className="px-3 pt-2 text-[11px] text-neutral-500">
          {fileSet.description}
        </div>
      ) : null}

      <header className="flex items-center gap-3 px-3 py-3">
        <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-fuchsia-500" />
        <div className="flex min-w-0 flex-col">
          <div className="flex items-center gap-1 text-[14px] font-semibold">{OWNER_HANDLE}</div>
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

      <ActionBar liked={liked} onToggleLike={toggleLike} onComment={handleChat} onShare={handleShare} />

      <div className="px-3 text-[14px] font-semibold">{likes.toLocaleString()} likes</div>

      <Caption asset={current} ownerName={OWNER_HANDLE} />

      <div className="px-3 pb-20 pt-1 text-[11px] uppercase tracking-wide text-neutral-500">Shared via Filecloud</div>

      <FooterActions onChat={handleChat} onOpen={handleOpen} onShare={handleShare} disabled={!current} />

      <Toast>{toast}</Toast>
    </div>
  );
}
