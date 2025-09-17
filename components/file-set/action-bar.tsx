"use client";

import { Bookmark, Heart, MessageCircle, Send } from "@/components/icons";

interface ActionBarProps {
  liked: boolean;
  onToggleLike: () => void;
  onComment: () => void;
  onShare: () => void;
}

export default function ActionBar({ liked, onToggleLike, onComment, onShare }: ActionBarProps) {
  return (
    <div className="flex items-center gap-4 px-3 py-2">
      <button aria-label="Like" onClick={onToggleLike} className="-m-1 rounded p-1" type="button">
        <Heart className={`h-6 w-6 ${liked ? "fill-rose-500 stroke-rose-500" : "stroke-neutral-900"}`} />
      </button>
      <button aria-label="Comment" onClick={onComment} className="-m-1 rounded p-1" type="button">
        <MessageCircle className="h-6 w-6" />
      </button>
      <button aria-label="Share" onClick={onShare} className="-m-1 rounded p-1" type="button">
        <Send className="h-6 w-6" />
      </button>
      <div className="ml-auto" />
      <button aria-label="Save" className="-m-1 rounded p-1" type="button">
        <Bookmark className="h-5 w-5" />
      </button>
    </div>
  );
}
