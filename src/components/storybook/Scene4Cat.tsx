import { motion } from "motion/react";
import cat from "../../assets/cat-flowers.png";

export function Scene4Cat() {
  return (
    <div className="bg-gingham relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-6">
      <motion.img
        src={cat}
        alt="Kitten holding flowers"
        width={768}
        height={768}
        loading="lazy"
        initial={{ scale: 0.6, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.9 }}
        className="h-auto w-72 drop-shadow-xl sm:w-96"
      />
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="font-hand mt-4 text-center text-4xl text-[var(--brown-dark)] sm:text-5xl"
      >
        flowers for you {"<3"} 🌷🐱
      </motion.p>
    </div>
  );
}
