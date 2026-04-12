"use client";

import { useState, useEffect } from "react";
import LspError from "~/components/LspError";

const phrases = [
  () => <>would rather be on my bike 🚲</>,
  () => <>would rather be using my camera 📸</>,
  () => <>would rather be eating cake 🍰</>,
  () => <>would rather be camping ⛺️</>,
  () => <>would rather be drinking coffee ☕</>,
  () => <>would rather be reading a book 📖</>,
  () => <>would rather be watching a movie 🎬</>,
  () => <>probably aborting a rebase 😅</>,
  () => (
    <>
      currently arguing with the <LspError>type system</LspError>
    </>
  ),
  () => <>probably fixing some typos ⌨️</>,
  () => <>is this web development 🦋</>,
];

export default function Footer() {
  const [Phrase, setPhrase] = useState<(() => React.ReactNode) | null>(null);

  useEffect(() => {
    setPhrase(() => phrases[Math.floor(Math.random() * phrases.length)]!);
  }, []);

  return (
    <footer className="px-4 py-8 text-center text-sm text-white/30">
      <p>{Phrase ? <Phrase /> : null}</p>
    </footer>
  );
}
