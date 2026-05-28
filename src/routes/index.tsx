import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Scene1Gift } from "../components/storybook/Scene1Gift";
import { Scene2Hub } from "../components/storybook/Scene2Hub";
import { Scene3Music } from "../components/storybook/Scene3Music";
import { Scene4Cat } from "../components/storybook/Scene4Cat";
import { Scene5Memories } from "../components/storybook/Scene5Memories";
import { Scene6Dino } from "../components/storybook/Scene6Dino";
import { Scene7Letter } from "../components/storybook/Scene7Letter";
import { NavArrows } from "../components/storybook/NavArrows";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Birthday Surprise for MJ" },
      { name: "description", content: "An interactive birthday storybook, made with love." },
    ],
  }),
  component: Storybook,
});

const TOTAL = 7;

function Storybook() {
  const [scene, setScene] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next: number) => {
    if (next < 0 || next >= TOTAL) return;
    setDir(next > scene ? 1 : -1);
    setScene(next);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  const scenes = [
    <Scene1Gift key="1" onOpen={() => go(1)} />,
    <Scene2Hub key="2" />,
    <Scene3Music key="3" />,
    <Scene4Cat key="4" />,
    <Scene5Memories key="5" />,
    <Scene6Dino key="6" />,
    <Scene7Letter key="7" />,
  ];

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[var(--cream)]">
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={scene}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {scenes[scene]}
        </motion.div>
      </AnimatePresence>

      {/* Scene counter */}
      {scene > 0 && (
        <div className="font-patrick pointer-events-none absolute right-4 top-4 z-40 rounded-full bg-[var(--cream-light)]/80 px-3 py-1 text-sm text-[var(--brown-dark)] shadow backdrop-blur">
          {scene + 1} / {TOTAL}
        </div>
      )}

      {/* Nav arrows: hide on cover */}
      {scene > 0 && (
        <NavArrows
          onPrev={() => go(scene - 1)}
          onNext={() => go(scene + 1)}
          canPrev={scene > 0}
          canNext={scene < TOTAL - 1}
        />
      )}
    </main>
  );
}
