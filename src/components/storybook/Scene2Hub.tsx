import { motion } from "motion/react";

export function Scene2Hub() {
  return (
    <div className="bg-gingham relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-4 py-12">
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="font-hand mb-6 text-center text-4xl text-[var(--brown-dark)] sm:text-5xl"
      >
        look what's inside ✨
      </motion.h2>

      {/* Open box - top-down view */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md aspect-square rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, #c08a5a 0%, #a06a3c 30%, #7a4a23 70%, #5b3416 100%)",
          boxShadow:
            "inset 0 0 60px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.4), 0 20px 40px rgba(0,0,0,0.3)",
        }}
      >
        {/* Box flaps */}
        <div className="absolute -top-6 left-4 right-4 h-6 rounded-t-lg bg-gradient-to-b from-[#8b5a2b] to-[#a06a3c] opacity-80" />

        {/* Inside arrangement */}
        <div className="absolute inset-4 grid grid-cols-2 grid-rows-2 gap-3">
          {/* Camera */}
          <motion.div
            whileHover={{ rotate: -6, scale: 1.05 }}
            className="flex items-center justify-center"
          >
            <svg viewBox="0 0 100 80" className="h-full w-full max-h-28">
              <rect x="8" y="20" width="84" height="50" rx="6" fill="#3a2418" stroke="#1a0f08" strokeWidth="2"/>
              <rect x="30" y="12" width="40" height="14" rx="3" fill="#3a2418" stroke="#1a0f08" strokeWidth="2"/>
              <circle cx="50" cy="46" r="16" fill="#d9c79a" stroke="#1a0f08" strokeWidth="2"/>
              <circle cx="50" cy="46" r="9" fill="#1a0f08"/>
              <circle cx="46" cy="42" r="3" fill="#f5ead3"/>
              <circle cx="78" cy="28" r="3" fill="#e85d3a"/>
            </svg>
          </motion.div>

          {/* Flowers */}
          <motion.div whileHover={{ rotate: 6, scale: 1.05 }} className="flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="h-full w-full max-h-28">
              <path d="M50 95 Q40 70 35 50" stroke="#4a6741" strokeWidth="3" fill="none"/>
              <path d="M50 95 Q55 75 60 55" stroke="#4a6741" strokeWidth="3" fill="none"/>
              <path d="M50 95 L50 60" stroke="#4a6741" strokeWidth="3" fill="none"/>
              <g transform="translate(35,45)"><circle r="8" fill="#f8c8d8"/><circle r="3" fill="#e88aab"/></g>
              <g transform="translate(50,30)"><circle r="9" fill="#e88aab"/><circle r="3" fill="#c45c7c"/></g>
              <g transform="translate(65,48)"><circle r="8" fill="#fecaca"/><circle r="3" fill="#f9a8a8"/></g>
              <rect x="40" y="92" width="20" height="8" fill="#f0e3c2" stroke="#8b5a2b" strokeWidth="1"/>
            </svg>
          </motion.div>

          {/* Letter */}
          <motion.div whileHover={{ rotate: -4, scale: 1.05 }} className="flex items-center justify-center">
            <svg viewBox="0 0 100 80" className="h-full w-full max-h-28">
              <rect x="8" y="14" width="84" height="56" rx="3" fill="#faf2dd" stroke="#8b5a2b" strokeWidth="2"/>
              <path d="M8 14 L50 44 L92 14" stroke="#8b5a2b" strokeWidth="2" fill="none"/>
              <path d="M50 38 C44 32, 36 32, 36 40 C36 46, 50 56, 50 56 C50 56, 64 46, 64 40 C64 32, 56 32, 50 38 Z" fill="#e85d3a"/>
              <text x="50" y="68" textAnchor="middle" fontSize="9" fill="#6b4423" fontFamily="Caveat, cursive">I love you</text>
            </svg>
          </motion.div>

          {/* Vinyl */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            className="flex items-center justify-center"
          >
            <svg viewBox="0 0 100 100" className="h-full w-full max-h-28">
              <circle cx="50" cy="50" r="46" fill="#1a0f08"/>
              <circle cx="50" cy="50" r="40" fill="none" stroke="#3a2418" strokeWidth="1"/>
              <circle cx="50" cy="50" r="32" fill="none" stroke="#3a2418" strokeWidth="1"/>
              <circle cx="50" cy="50" r="24" fill="none" stroke="#3a2418" strokeWidth="1"/>
              <circle cx="50" cy="50" r="16" fill="#d4a017"/>
              <text x="50" y="48" textAnchor="middle" fontSize="6" fill="#4a2e16" fontFamily="Patrick Hand, cursive">Play</text>
              <text x="50" y="56" textAnchor="middle" fontSize="6" fill="#4a2e16" fontFamily="Patrick Hand, cursive">this!</text>
              <circle cx="50" cy="50" r="2" fill="#1a0f08"/>
            </svg>
          </motion.div>
        </div>
      </motion.div>

      <p className="font-patrick mt-6 text-center text-base text-[var(--brown)] sm:text-lg">
        a few little things, just for you →
      </p>
    </div>
  );
}
