import { useEffect } from "react";
import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        className="absolute inset-0 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close dialog"
      />

      <div
        className="relative w-full max-w-lg rounded-3xl border border-cream/10 bg-coffee-dark/20
                   p-6 shadow-2xl backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-serif text-xl md:text-2xl font-bold text-cream drop-shadow-sm">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-3 py-2 text-cream/80 hover:text-cream
                       hover:bg-cream/10 transition-colors ui-focus-ring"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 text-cream/90">{children}</div>
      </div>
    </div>
  );
}
