import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export function Scene1Gift({ onOpen }: { onOpen: () => void }) {
  const [opened, setOpened] = useState(false);

  const handleClick = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(onOpen, 900);
  };

  return (
    <div className="bg-gingham relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-8 text-center"
      >
        <p className="font-hand text-4xl text-[var(--brown-dark)] sm:text-5xl">
          A little surprise for you 🎁
        </p>
        <p className="font-patrick mt-2 text-lg text-[var(--brown)] sm:text-xl">
          Tap the gift to open 🎁
        </p>
      </motion.div>

      <motion.button
        onClick={handleClick}
        whileHover={{ scale: opened ? 1 : 1.04, rotate: opened ? 0 : -1 }}
        whileTap={{ scale: 0.97 }}
        className="relative h-64 w-64 cursor-pointer focus:outline-none sm:h-80 sm:w-80"
        aria-label="Open gift"
      >
        {/* Box base */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 mx-auto h-[70%] w-full rounded-md"
          style={{
            background:
              "linear-gradient(180deg, #a06a3c 0%, #7a4a23 50%, #5b3416 100%)",
            boxShadow: "inset 0 -16px 30px rgba(0,0,0,0.35), 0 12px 24px rgba(0,0,0,0.25)",
          }}
        >
          {/* Vertical ribbon on base */}
          <div
            className="absolute bottom-0 left-1/2 top-0 w-10 -translate-x-1/2"
            style={{
              background:
                "linear-gradient(90deg, #f0e3c2 0%, #f9f0d4 50%, #d9c79a 100%)",
              boxShadow: "0 0 8px rgba(0,0,0,0.15)",
            }}
          />
        </motion.div>

        {/* Lid */}
        <motion.div
          animate={
            opened
              ? { y: -120, rotate: -18, opacity: 0 }
              : { y: 0, rotate: 0, opacity: 1 }
          }
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute left-0 right-0 top-[18%] mx-auto h-[22%] w-[108%] -translate-x-[4%] rounded-md"
          style={{
            background:
              "linear-gradient(180deg, #b07a44 0%, #8b5a2b 100%)",
            boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
          }}
        >
          <div
            className="absolute bottom-0 left-1/2 top-0 w-10 -translate-x-1/2"
            style={{
              background:
                "linear-gradient(90deg, #f0e3c2 0%, #f9f0d4 50%, #d9c79a 100%)",
            }}
          />
        </motion.div>

        {/* Bow */}
        <AnimatePresence>
          {!opened && (
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
              className="absolute left-1/2 top-[12%] z-10 -translate-x-1/2"
            >
              <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
                <ellipse cx="30" cy="40" rx="28" ry="20" fill="#f5ead3" stroke="#d9c79a" strokeWidth="2" />
                <ellipse cx="90" cy="40" rx="28" ry="20" fill="#f5ead3" stroke="#d9c79a" strokeWidth="2" />
                <ellipse cx="30" cy="40" rx="10" ry="8" fill="#e6d4a8" />
                <ellipse cx="90" cy="40" rx="10" ry="8" fill="#e6d4a8" />
                <rect x="50" y="28" width="20" height="24" rx="4" fill="#f9f0d4" stroke="#d9c79a" strokeWidth="2" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sparkle when opening */}
        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute left-1/2 top-[25%] -translate-x-1/2 text-6xl"
            >
              ✨
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
