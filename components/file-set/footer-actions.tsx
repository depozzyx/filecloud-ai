"use client";

interface FooterActionsProps {
    onChat: () => void;
    onOpen: () => void;
    onShare: () => void;
    disabled?: boolean;
}

export default function FooterActions({
    onChat,
    onOpen,
    onShare,
    disabled,
}: FooterActionsProps) {
    return (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-200 bg-white/95 px-3 py-2 backdrop-blur">
            <div className="flex gap-2">
                <button
                    onClick={onChat}
                    className="flex-1 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-[14px] font-semibold"
                    type="button"
                >
                    Chat
                </button>
                {/* <button
          onClick={onOpen}
          className="flex-1 rounded-xl bg-emerald-400 px-4 py-3 text-[14px] font-extrabold text-emerald-950 disabled:opacity-50"
          type="button"
          disabled={disabled}
        >
          Open file
        </button> */}
                <button
                    onClick={onShare}
                    className="flex-1 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-[14px] font-semibold"
                    type="button"
                >
                    Share
                </button>
            </div>
        </div>
    );
}
