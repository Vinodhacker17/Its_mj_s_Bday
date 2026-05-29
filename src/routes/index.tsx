import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from "lucide-react";

import giftClosed from "../assets/gift-closed.png";
import boxOpen from "../assets/box-open.jpg";
import itemCamera from "../assets/item-camera.png";
import itemVinyl from "../assets/item-vinyl.png";
import itemEnvelope from "../assets/item-envelope.png";
import itemFlowers from "../assets/item-flowers.png";
import kittenFlowers from "../assets/kitten-flowers.jpg";
// NOTE: If you uploaded a new album cover, change "moon-album.jpg" here to your new file's name!
import moonAlbum from "../assets/moon-album.jpg";
import m1 from "../assets/memory-1.png";
import m2 from "../assets/memory-2.png";
import m3 from "../assets/memory-3.png";


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
      className="font-serif fixed bottom-6 left-1/2 z-50 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-[var(--brown)]/30 bg-[var(--cream-light)]/90 px-5 py-2.5 text-base italic text-[var(--brown-dark)] shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-[var(--cream-light)] sm:text-lg"
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
        className="font-script mb-2 text-center text-5xl text-[var(--brown-dark)] sm:text-6xl"
      >
        A little surprise for you
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="font-serif mb-8 text-center text-lg italic text-[var(--brown)] sm:text-xl"
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
  { key: "photos", label: "Future Plans", img: itemCamera, alt: "Vintage film camera", rotate: -8 },
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
        className="font-script mb-2 text-center text-5xl text-[var(--brown-dark)] sm:text-6xl"
      >
        Look what's inside
      </motion.h2>
      <p className="font-serif mb-8 text-center text-base italic text-[var(--brown)] sm:text-lg">
        Pick something to unwrap ✨
      </p>

      {/* Open box */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-square w-full max-w-[560px] overflow-hidden rounded-xl shadow-2xl"
        style={{ boxShadow: "0 30px 60px -20px rgba(74,46,22,0.55)" }}
      >
        <img
          src={boxOpen}
          alt="Open vintage cardboard gift box, viewed from above"
          width={1024}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(58,30,10,0.45) 100%)" }} />

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
              <span className="font-script pointer-events-none absolute -bottom-1 rounded-full bg-[var(--cream-light)]/90 px-3 py-0.5 text-lg text-[var(--brown-dark)] opacity-0 shadow transition-opacity group-hover:opacity-100 sm:text-xl">
                {item.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Labels always visible underneath (mobile-friendly) */}
      <div className="mt-6 grid w-full max-w-[560px] grid-cols-4 gap-2 text-center">
        {hubItems.map((it) => (
          <div key={it.key} className="font-serif text-sm italic text-[var(--brown-dark)] sm:text-base">
            {it.label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 3a. Music Scene ---------- */
function MusicScene({ onBack }: { onBack: () => void }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };
    const onMeta = () => setDuration(audio.duration || 0);
    const onEnd = () => setPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
  };

  const fmt = (s: number) => {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16">
      {/* Album-art driven background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${moonAlbum})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(60px) brightness(0.45) saturate(1.3)",
          transform: "scale(1.2)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(139,90,43,0.35), transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(74,46,22,0.55), transparent 60%), linear-gradient(180deg, rgba(20,12,6,0.55), rgba(20,12,6,0.85))",
        }}
      />

      <audio ref={audioRef} src="/humsafar.mp3" preload="metadata" />

      <div className="w-full max-w-5xl">
        <motion.h2
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          /* 👇 THIS IS THE LINE I FIXED FOR YOU! changed text-[var(--cream-light)] to text-[var(--brown-dark)] 👇 */
          className="font-script mb-10 text-center text-4xl text-[var(--brown-dark)] drop-shadow-lg sm:text-6xl"
        >
          This song always reminds me of you
        </motion.h2>

        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto w-full max-w-sm rounded-2xl bg-[#181818]/90 p-5 text-white shadow-2xl backdrop-blur-md"
          >
            <div className="relative">
              <img
                src={moonAlbum}
                alt="Humsafar album cover"
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
                transition={{
                  duration: 6,
                  repeat: playing ? Infinity : 0,
                  ease: "linear",
                }}
                className="absolute -right-6 -top-6 h-20 w-20 drop-shadow-xl"
              />
            </div>

            <div className="mt-5">
              <h3 className="font-serif-display text-2xl">Humsafar</h3>
              <p className="font-serif text-sm italic text-white/60">Akhil Sachdeva</p>
            </div>

            <div className="mt-4">
              <div
                onClick={seek}
                className="h-1.5 w-full cursor-pointer overflow-hidden rounded-full bg-white/15"
              >
                <div
                  className="h-full rounded-full bg-[#d4a017] transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-1 flex justify-between text-[10px] text-white/50">
                <span>{fmt(currentTime)}</span>
                <span>{fmt(duration)}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-white/80">
              <Shuffle className="h-4 w-4" />
              <SkipBack className="h-5 w-5" />
              <button
                onClick={toggle}
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
            <p className="font-script text-3xl leading-snug text-[var(--brown-dark)] sm:text-5xl">
              "Muskurana Bhi Tujhi Se Sikha Hai<br />
              Dil Lagane Ka Tu Hi Tareeka Hai<br />
              Aitbaar Bhi Tujhi Se Hota Hai<br />
              Aau Na Hosh Mein Main Kabhi"
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
  { src: m1, rot: -6, caption: "Taj Mahal trip!" },
  { src: m2, rot: 4, caption: "Mountain trekking 🏔️" },
  { src: m3, rot: -3, caption: "Power Ranger vibes 🔴🩷" },
];

function PhotosScene({ onBack }: { onBack: () => void }) {
  return (
    <div className="bg-gingham relative flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <motion.h2
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="font-script mb-12 text-center text-5xl text-[var(--brown-dark)] sm:text-7xl"
        style={{ transform: "rotate(-2deg)" }}
      >
        Future Adventures Pending... ✈️
      </motion.h2>

      <div className="relative w-full max-w-5xl">
        <div
          className="absolute left-0 right-0 top-6 h-[3px] rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, #4a2e16 8%, #4a2e16 92%, transparent)" }}
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
              <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-2 h-5 w-3 rounded-sm bg-[#8b5a2b] shadow-md" />
              <div className="bg-[#faf6e8] p-2 pb-10 shadow-xl" style={{ width: 180 }}>
                <img
                  src={p.src}
                  alt={p.caption}
                  width={640}
                  height={640}
                  loading="lazy"
                  className="h-[160px] w-full object-cover"
                />
                <p className="font-script mt-2 text-center text-2xl text-[var(--brown-dark)]">
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
          border: "1px solid #d9c79a",
          boxShadow: "0 20px 50px rgba(74,46,22,0.35), inset 0 0 80px rgba(139,90,43,0.08)",
        }}
      >
        <div
          className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-2"
          style={{ background: "rgba(255,255,255,0.4)", backdropFilter: "blur(2px)", border: "1px dashed rgba(139,90,43,0.2)" }}
        />

        <h2 className="font-script text-center text-5xl text-[var(--brown-dark)] sm:text-6xl">
          Happy Birthday, MJ!
        </h2>
        <div className="mx-auto mt-4 h-px w-24 bg-[var(--brown)]/30" />

        <div className="font-serif mt-6 space-y-4 text-lg leading-relaxed text-[var(--brown-dark)] sm:text-xl">
          <p>Dearest MJ, 🤍</p>
          <p>
            Where do I even begin? You're the kind of friend everyone wishes for, but I'm
            the lucky one who actually got you.
          </p>
          <p>
            Like Ranbir Kapoor says, "Pyaar mein junoon hai, par dosti mein sukoon hai."
            You are exactly that sukoon in my life. I want to thank you from the bottom of
            my heart for standing by me when no one else did. When things were tough and I
            felt alone, you were my constant. You didn't just show up; you stayed, and that
            means everything to me.
          </p>
          <p>
            Thanks for always having my back, matching my crazy energy, and being my
            absolute rock. Distance means nothing when you have a bond like ours.
          </p>
          <p>
            Wishing you the happiest birthday filled with all your favorite things, great
            music, and tons of success this year. You deserve the absolute best. 🤍
          </p>
          <p>Cheers to more fun times and unforgettable memories!</p>

          <p className="font-script pt-2 text-3xl text-[var(--brown-dark)] sm:text-4xl">
            your dumbo 🐼
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
        style={{ boxShadow: "0 25px 60px -15px rgba(74,46,22,0.5)" }}
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
        className="font-script mt-6 text-center text-5xl text-[var(--brown-dark)] sm:text-6xl"
      >
        Flowers for you {"<3"}
      </motion.p>
      <p className="font-serif mt-2 text-center text-lg italic text-[var(--brown)] sm:text-xl">
        a little softness, just because.
      </p>

      <BackToBox onBack={onBack} />
    </div>
  );
}
