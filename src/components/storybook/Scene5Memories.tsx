import { motion } from "motion/react";
import m1 from "../../assets/memory-1.jpg";
import m2 from "../../assets/memory-2.jpg";
import m3 from "../../assets/memory-3.jpg";
import m4 from "../../assets/memory-4.jpg";

const photos = [
  { src: m1, rot: -6, caption: "golden hours" },
  { src: m2, rot: 4, caption: "coffee dates" },
  { src: m3, rot: -3, caption: "sunset hugs" },
  { src: m4, rot: 5, caption: "ice cream days" },
];

export function Scene5Memories() {
  return (
    <div className="bg-gingham relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-4 py-12">
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="font-hand mb-12 text-center text-5xl text-[var(--brown-dark)] sm:text-6xl"
        style={{ transform: "rotate(-2deg)" }}
      >
        Our little memories
      </motion.h2>

      <div className="relative w-full max-w-5xl">
        {/* Clothesline */}
        <div
          className="absolute left-0 right-0 top-6 h-[3px] rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, #4a2e16 8%, #4a2e16 92%, transparent)" }}
        />

        <div className="relative flex flex-wrap items-start justify-center gap-4 pt-0 sm:gap-6">
          {photos.map((p, i) => (
            <motion.div
              key={i}
              initial={{ y: -40, opacity: 0, rotate: 0 }}
              animate={{ y: 0, opacity: 1, rotate: p.rot }}
              transition={{ delay: 0.2 + i * 0.12, type: "spring", stiffness: 80 }}
              whileHover={{ scale: 1.06, rotate: 0, zIndex: 10 }}
              className="relative"
            >
              {/* Clip */}
              <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-2">
                <svg width="22" height="32" viewBox="0 0 22 32">
                  <rect x="4" y="4" width="14" height="22" rx="2" fill="#8b5a2b" stroke="#4a2e16" strokeWidth="1"/>
                  <rect x="6" y="6" width="10" height="3" rx="1" fill="#4a2e16"/>
                  <circle cx="11" cy="14" r="1.5" fill="#4a2e16"/>
                </svg>
              </div>
              {/* Polaroid */}
              <div className="bg-[#faf6e8] p-2 pb-10 shadow-xl" style={{ width: 170 }}>
                <img
                  src={p.src}
                  alt={p.caption}
                  width={640}
                  height={640}
                  loading="lazy"
                  className="h-[150px] w-full object-cover"
                />
                <p className="font-hand mt-2 text-center text-xl text-[var(--brown-dark)]">
                  {p.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
