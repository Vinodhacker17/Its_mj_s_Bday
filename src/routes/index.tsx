import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from "lucide-react";

import giftClosed from "../assets/gift-closed.png";
import boxOpen from "../assets/box-open.jpg";
import itemCamera from "../assets/item-camera.png";
import itemVinyl from "../assets/item-vinyl.png";
import itemEnvelope from "../assets/item-envelope.png";
import itemFlowers from "../assets/item-flowers.png";
import kittenFlowers from "../assets/kitten-flowers.jpg";
import moonAlbum from "../assets/moon-album.jpg";
import m1 from "../assets/memory-1.jpg";
import m2 from "../assets/memory-2.jpg";
import m3 from "../assets/memory-3.jpg";
import m4 from "../assets/memory-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Birthday Surprise for MJ" },
      { name: "description", content: "An interactive birthday keepsake, made with love." },
    ],
  }),
  component: Storybook,
});

type View = "closed" | "hub" | "music" | "photos" | "letter" | "flowers";

function Storybook() {
  const [view, setView] = useState<View>("closed");

  return (
    <main className="bg-gingham relative min-h-screen w-full overflow-x-hidden">
      <AnimatePresence mode="wait">
        {view === "closed" && (
          <Scene key="closed">
            <ClosedBox onOpen={() => setView("hub")} />
          </Scene>
        )}
        {view === "hub" && (
          <Scene key="hub">
            <Hub onPick={(v) => setView(v)} />
          </Scene>
        )}
        {view === "music" && (
          <Scene key="music">
            <MusicScene onBack={() => setView("hub")} />
          </Scene>
        )}
        {view === "photos" && (
          <Scene key="photos">
            <PhotosScene onBack={() => setView("hub")} />
          </Scene>
        )}
        {view === "letter" && (
          <Scene key="letter">
            <LetterScene onBack={() => setView("hub")} />
          </Scene>
        )}
        {view === "flowers" && (
          <Scene key="flowers">
            <FlowersScene onBack={() => setView("hub")} />
          </Scene>
        )}
      </AnimatePresence>
    </main>
  );
}

/* ---------- Shared ---------- */

function Scene({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen w-full"
    >
      {children}
    </motion.div>
  );
}

function BackToBox({ onBack }: { onBack: () => void }) {
  return (
    <button
      onClick={onBack}
      className="font-serif fixed bottom-6 left-1/2 z-50 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/40 bg-white/30 px-5 py-2.5 text-base italic text-[var(--charcoal)] shadow-lg backdrop-blur-lg transition hover:scale-105 hover:bg-white/45 sm:text-lg"
      style={{ boxShadow: "0 8px 32px rgba(183,107,130,0.18)" }}
      aria-label="Back to the box"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to the Box
    </button>
  );
}

/* ---------- 1. Closed Box (Landing) ---------- */

function ClosedBox({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.7 }}
        className="font-script mb-2 text-center text-5xl text-[var(--charcoal)] sm:text-6xl"
      >
        A little surprise for you
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="font-serif mb-8 text-center text-lg italic text-[var(--rose-dark)] sm:text-xl"
      >
        Tap the box to open 🎁
      </motion.p>

      <motion.button
        onClick={onOpen}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
        whileHover={{ scale: 1.04, rotate: -1 }}
        whileTap={{ scale: 0.97 }}
        className="relative focus:outline-none"
        aria-label="Open the gift box"
      >
        <motion.img
          src={giftClosed}
          alt="A wrapped brown paper gift box with a cream silk ribbon"
          width={1024}
          height={1024}
          className="h-auto w-72 drop-shadow-2xl sm:w-96"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.button>
    </div>
  );
}

/* ---------- 2. Hub (Open Box) ---------- */

type HubItem = {
  key: View;
  label: string;
  img: string;
  alt: string;
  rotate: number;
};

const hubItems: HubItem[] = [
  { key: "photos", label: "Memories", img: itemCamera, alt: "Vintage film camera", rotate: -8 },
  { key: "music", label: "Play this!", img: itemVinyl, alt: "Vinyl record", rotate: 6 },
  { key: "letter", label: "For you", img: itemEnvelope, alt: "Wax-sealed vintage envelope", rotate: -5 },
  { key: "flowers", label: "Flowers", img: itemFlowers, alt: "Small bouquet of dusty pink roses", rotate: 7 },
];

function Hub({ onPick }: { onPick: (v: View) => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-script mb-2 text-center text-5xl text-[var(--charcoal)] sm:text-6xl"
      >
        Look what's inside
      </motion.h2>
      <p className="font-serif mb-8 text-center text-base italic text-[var(--rose-dark)] sm:text-lg">
        Pick something to unwrap ✨
      </p>

      {/* Open box */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-square w-full max-w-[560px] overflow-hidden rounded-xl shadow-2xl"
        style={{ boxShadow: "0 30px 60px -20px rgba(183,107,130,0.45)" }}
      >
        <img
          src={boxOpen}
          alt="Open vintage cardboard gift box, viewed from above"
          width={1024}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(90,58,71,0.4) 100%)" }} />

        {/* Items grid inside the box */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-[6%]">
          {hubItems.map((item, i) => (
            <motion.button
              key={item.key}
              onClick={() => onPick(item.key)}
              initial={{ opacity: 0, y: 24, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: item.rotate }}
              transition={{ delay: 0.35 + i * 0.12, type: "spring", stiffness: 90, damping: 14 }}
              whileHover={{ scale: 1.1, rotate: 0, y: -6, zIndex: 10 }}
              whileTap={{ scale: 0.96 }}
              className="group relative flex cursor-pointer flex-col items-center justify-center focus:outline-none"
              aria-label={`${item.label} — open scene`}
            >
              <img
                src={item.img}
                alt={item.alt}
                width={768}
                height={768}
                loading="lazy"
                className="h-[78%] w-auto max-w-[88%] object-contain"
                style={{ filter: "drop-shadow(0 10px 14px rgba(0,0,0,0.45))" }}
              />
              <span className="font-script pointer-events-none absolute -bottom-1 rounded-full bg-white/80 px-3 py-0.5 text-lg text-[var(--charcoal)] opacity-0 shadow transition-opacity group-hover:opacity-100 sm:text-xl">
                {item.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Labels always visible underneath (mobile-friendly) */}
      <div className="mt-6 grid w-full max-w-[560px] grid-cols-4 gap-2 text-center">
        {hubItems.map((it) => (
          <div key={it.key} className="font-serif text-sm italic text-[var(--charcoal)] sm:text-base">
            {it.label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 3a. Music Scene ---------- */

function MusicScene({ onBack }: { onBack: () => void }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(28);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 0.5)), 500);
    return () => clearInterval(id);
  }, [playing]);

  return (
    <div
      className="relative flex min-h-screen items-center justify-center px-4 py-16"
      style={{ background: "linear-gradient(135deg, #c8a8d8 0%, #e8b4c0 60%, #d4a5a5 100%)" }}
    >
      <div className="w-full max-w-5xl">
        <motion.h2
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-script mb-10 text-center text-4xl text-[var(--charcoal)] sm:text-6xl"
        >
          This song always reminds me of you
        </motion.h2>

        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto w-full max-w-sm rounded-2xl bg-[#181818] p-5 text-white shadow-2xl"
          >
            <div className="relative">
              <img
                src={moonAlbum}
                alt="Yellow album cover"
                width={640}
                height={640}
                loading="lazy"
                className="aspect-square w-full rounded-lg object-cover shadow-lg"
              />
              <motion.img
                src={itemVinyl}
                alt=""
                aria-hidden
                width={256}
                height={256}
                animate={{ rotate: playing ? 360 : 0 }}
                transition={{ duration: 6, repeat: playing ? Infinity : 0, ease: "linear" }}
                className="absolute -right-6 -top-6 h-20 w-20 drop-shadow-xl"
              />
            </div>

            <div className="mt-5">
              <h3 className="font-serif-display text-2xl">Yellow</h3>
              <p className="font-serif text-sm italic text-white/70">Coldplay</p>
            </div>

            <div className="mt-4">
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/20">
                <div className="h-full rounded-full bg-[var(--lavender-dark)] transition-all" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-1 flex justify-between text-[10px] text-white/60">
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

          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-center md:text-left"
          >
            <p className="font-script text-3xl leading-snug text-[var(--charcoal)] sm:text-5xl">
              "And it was all yellow —<br />
              your skin, your skin and bones,<br />
              turn into something beautiful…"
            </p>
            <p className="font-serif mt-6 text-base italic text-[var(--charcoal)]/70 sm:text-lg">
              — for the yellow in you ☀️
            </p>
          </motion.div>
        </div>
      </div>

      <BackToBox onBack={onBack} />
    </div>
  );
}

/* ---------- 3b. Photos Scene ---------- */

const photos = [
  { src: m1, rot: -6, caption: "golden hours" },
  { src: m2, rot: 4, caption: "coffee dates" },
  { src: m3, rot: -3, caption: "sunset hugs" },
  { src: m4, rot: 5, caption: "ice cream days" },
];

function PhotosScene({ onBack }: { onBack: () => void }) {
  return (
    <div className="bg-gingham relative flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <motion.h2
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="font-script mb-12 text-center text-5xl text-[var(--charcoal)] sm:text-7xl"
        style={{ transform: "rotate(-2deg)" }}
      >
        Our little memories
      </motion.h2>

      <div className="relative w-full max-w-5xl">
        <div
          className="absolute left-0 right-0 top-6 h-[3px] rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, #b76b82 8%, #b76b82 92%, transparent)" }}
        />
        <div className="relative flex flex-wrap items-start justify-center gap-4 sm:gap-6">
          {photos.map((p, i) => (
            <motion.div
              key={i}
              initial={{ y: -40, opacity: 0, rotate: 0 }}
              animate={{ y: 0, opacity: 1, rotate: p.rot }}
              transition={{ delay: 0.15 + i * 0.12, type: "spring", stiffness: 80 }}
              whileHover={{ scale: 1.06, rotate: 0, zIndex: 10 }}
              className="relative"
            >
              <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-2 h-5 w-3 rounded-sm bg-[var(--rose-dark)] shadow-md" />
              <div className="bg-[#fff8fa] p-2 pb-10 shadow-xl" style={{ width: 180 }}>
                <img
                  src={p.src}
                  alt={p.caption}
                  width={640}
                  height={640}
                  loading="lazy"
                  className="h-[160px] w-full object-cover"
                />
                <p className="font-script mt-2 text-center text-2xl text-[var(--charcoal)]">
                  {p.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BackToBox onBack={onBack} />
    </div>
  );
}

/* ---------- 3c. Letter Scene ---------- */

function LetterScene({ onBack }: { onBack: () => void }) {
  return (
    <div className="bg-gingham relative flex min-h-screen items-center justify-center px-4 py-16">
      <motion.div
        initial={{ y: 30, opacity: 0, rotate: -1 }}
        animate={{ y: 0, opacity: 1, rotate: -1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="bg-paper relative w-full max-w-2xl rounded-sm p-8 shadow-2xl sm:p-12"
        style={{
          border: "1px solid #e8c5d0",
          boxShadow: "0 20px 50px rgba(183,107,130,0.28), inset 0 0 80px rgba(212,140,158,0.06)",
        }}
      >
        <div
          className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-2"
          style={{ background: "rgba(255,255,255,0.5)", backdropFilter: "blur(2px)", border: "1px dashed rgba(183,107,130,0.25)" }}
        />

        <h2 className="font-script text-center text-5xl text-[var(--charcoal)] sm:text-6xl">
          Happy Birthday, MJ!
        </h2>
        <div className="mx-auto mt-4 h-px w-24 bg-[var(--rose)]/30" />

        <div className="font-serif mt-6 space-y-4 text-lg leading-relaxed text-[var(--charcoal)] sm:text-xl">
          <p>Dearest MJ,</p>
          <p>
            Where do I even begin? You're the kind of friend everyone wishes for — the
            one who laughs the loudest at my silly jokes, sends me memes at 2am, and shows
            up (even from far away) every single time it matters.
          </p>
          <p>
            Thank you for being soft when I'm sharp, brave when I'm scared, and silly
            with me always. Distance is nothing — my heart knows where home is.
          </p>
          <p>
            Wishing you a year full of yellow skies, good music, fresh flowers, and
            every little thing that makes you smile. You deserve all of it, and so much more.
          </p>
          <p className="font-script pt-2 text-3xl text-[var(--charcoal)] sm:text-4xl">
            Love you endlessly,<br />
            your bestie 💌
          </p>
        </div>
      </motion.div>

      <BackToBox onBack={onBack} />
    </div>
  );
}

/* ---------- 3d. Flowers Scene ---------- */

function FlowersScene({ onBack }: { onBack: () => void }) {
  return (
    <div className="bg-gingham relative flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.9 }}
        className="overflow-hidden rounded-2xl shadow-2xl"
        style={{ boxShadow: "0 25px 60px -15px rgba(183,107,130,0.45)" }}
      >
        <img
          src={kittenFlowers}
          alt="A ginger kitten nestled among fresh pink flowers"
          width={1024}
          height={1024}
          loading="lazy"
          className="h-auto w-80 object-cover sm:w-[28rem]"
        />
      </motion.div>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="font-script mt-6 text-center text-5xl text-[var(--charcoal)] sm:text-6xl"
      >
        Flowers for you {"<3"}
      </motion.p>
      <p className="font-serif mt-2 text-center text-lg italic text-[var(--rose-dark)] sm:text-xl">
        a little softness, just because.
      </p>

      <BackToBox onBack={onBack} />
    </div>
  );
}
