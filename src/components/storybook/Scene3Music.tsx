import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from "lucide-react";
import moonAlbum from "../../assets/moon-album.jpg";

export function Scene3Music() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(28);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 0.5)), 500);
    return () => clearInterval(id);
  }, [playing]);

  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden px-4 py-12"
      style={{ background: "linear-gradient(135deg, #d4a017 0%, #b8860b 100%)" }}
    >
      <div className="w-full max-w-5xl">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-hand mb-8 text-center text-3xl text-[var(--brown-dark)] sm:text-5xl"
        >
          this song always reminds me of you {"<3"}
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          {/* Music player card */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto w-full max-w-sm rounded-2xl bg-[#181818] p-5 text-white shadow-2xl"
          >
            <div className="relative">
              <img
                src={moonAlbum}
                alt="Yellow album"
                width={640}
                height={640}
                loading="lazy"
                className="aspect-square w-full rounded-lg object-cover shadow-lg"
              />
              <motion.div
                animate={{ rotate: playing ? 360 : 0 }}
                transition={{ duration: 4, repeat: playing ? Infinity : 0, ease: "linear" }}
                className="absolute -right-3 -top-3 flex h-14 w-14 items-center justify-center rounded-full bg-black shadow-xl"
                style={{ border: "2px solid #d4a017" }}
              >
                <svg viewBox="0 0 40 40" className="h-12 w-12">
                  <circle cx="20" cy="20" r="19" fill="#0a0a0a"/>
                  <circle cx="20" cy="20" r="14" fill="none" stroke="#222" strokeWidth="0.5"/>
                  <circle cx="20" cy="20" r="10" fill="none" stroke="#222" strokeWidth="0.5"/>
                  <circle cx="20" cy="20" r="6" fill="#d4a017"/>
                  <circle cx="20" cy="20" r="1.5" fill="#0a0a0a"/>
                </svg>
              </motion.div>
            </div>

            <div className="mt-5">
              <h3 className="font-serif-display text-2xl tracking-tight">Yellow</h3>
              <p className="text-sm text-white/60">Coldplay</p>
            </div>

            <div className="mt-4">
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-[#1db954] transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-1 flex justify-between text-[10px] text-white/50">
                <span>1:{String(Math.floor(progress * 0.027)).padStart(2, "0")}</span>
                <span>4:29</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-white/80">
              <Shuffle className="h-4 w-4" />
              <SkipBack className="h-5 w-5" />
              <button
                onClick={() => setPlaying((p) => !p)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-md transition hover:scale-105"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
              </button>
              <SkipForward className="h-5 w-5" />
              <Repeat className="h-4 w-4" />
            </div>
          </motion.div>

          {/* Lyrics */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center md:text-left"
          >
            <p className="font-hand text-2xl leading-relaxed text-[var(--brown-dark)] sm:text-4xl">
              "And it was all yellow<br />
              your skin, your skin and bones<br />
              turn into something beautiful..."
            </p>
            <p className="font-patrick mt-6 text-base text-[var(--brown-dark)]/70 sm:text-lg">
              — for the yellow in you ☀️
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
