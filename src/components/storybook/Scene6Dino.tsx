import { motion } from "motion/react";
import dino from "../../assets/dino-phone.png";

export function Scene6Dino() {
  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-6"
      style={{ background: "linear-gradient(160deg, #f8e8ee 0%, #fde9d9 100%)" }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.img
          src={dino}
          alt="Dino hugging phone"
          width={768}
          height={768}
          loading="lazy"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="h-auto w-72 drop-shadow-2xl sm:w-96"
        />
      </motion.div>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="font-hand mt-4 text-center text-4xl text-[var(--brown-dark)] sm:text-5xl"
      >
        Hugging you through my phone 📱🦖
      </motion.p>
    </div>
  );
}
