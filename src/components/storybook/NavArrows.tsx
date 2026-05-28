import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface Props {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
}

export function NavArrows({ onPrev, onNext, canPrev, canNext }: Props) {
  return (
    <div className="pointer-events-none absolute bottom-6 left-0 right-0 z-40 flex justify-center gap-6 sm:bottom-10">
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Previous"
        className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-[var(--brown)]/30 bg-[var(--cream-light)]/80 text-[var(--brown-dark)] shadow-lg backdrop-blur-md transition disabled:opacity-30 sm:h-14 sm:w-14"
      >
        <ChevronLeft className="h-6 w-6" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={onNext}
        disabled={!canNext}
        aria-label="Next"
        className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-[var(--brown)]/30 bg-[var(--cream-light)]/80 text-[var(--brown-dark)] shadow-lg backdrop-blur-md transition disabled:opacity-30 sm:h-14 sm:w-14"
      >
        <ChevronRight className="h-6 w-6" />
      </motion.button>
    </div>
  );
}
