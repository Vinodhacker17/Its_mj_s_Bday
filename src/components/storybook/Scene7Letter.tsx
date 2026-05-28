import { motion } from "motion/react";

export function Scene7Letter() {
  return (
    <div className="bg-gingham relative flex h-full w-full items-center justify-center overflow-hidden px-4 py-12">
      <motion.div
        initial={{ y: 30, opacity: 0, rotate: -1 }}
        animate={{ y: 0, opacity: 1, rotate: -1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="bg-paper relative w-full max-w-2xl rounded-sm p-8 shadow-2xl sm:p-12"
        style={{
          border: "1px solid #d9c79a",
          boxShadow: "0 20px 50px rgba(74,46,22,0.35), inset 0 0 80px rgba(139,90,43,0.08)",
        }}
      >
        {/* tape */}
        <div
          className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-2"
          style={{ background: "rgba(255,255,255,0.4)", backdropFilter: "blur(2px)", border: "1px dashed rgba(139,90,43,0.2)" }}
        />

        <h2 className="font-serif-display text-center text-4xl text-[var(--brown-dark)] sm:text-5xl">
          Happy Birthday, MJ!
        </h2>
        <div className="mx-auto mt-4 h-px w-24 bg-[var(--brown)]/30" />

        <div className="font-patrick mt-6 space-y-4 text-base leading-relaxed text-[var(--brown-dark)] sm:text-lg">
          <p>Dear MJ,</p>
          <p>
            Where do I even begin? You're the kind of friend everyone wishes for — the
            one who laughs the loudest at my dumb jokes, sends me memes at 2am, and shows
            up (even from far away) every time it matters.
          </p>
          <p>
            Thank you for being soft when I'm sharp, brave when I'm scared, and silly
            with me always. Distance is nothing — my heart knows where home is.
          </p>
          <p>
            Wishing you a year full of yellow skies, good music, fresh flowers, and
            every little thing that makes you smile. You deserve all of it and more.
          </p>
          <p className="font-hand pt-2 text-2xl text-[var(--brown-dark)] sm:text-3xl">
            Love you endlessly,<br />
            your bestie 💌
          </p>
        </div>
      </motion.div>
    </div>
  );
}
