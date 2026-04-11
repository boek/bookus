const phrases = [
  "would rather be on my bike 🚲",
  "would rather be using my camera 📸",
  "would rather be eating cake 🍰",
  "would rather be camping ⛺️",
  "would rather be drinking coffee ☕",
  "would rather be reading a book 📖",
  "would rather be watching a movie 🎬",
  "probably lost in a git rebase 😅",
  "currently arguing with a compiler 🤖",
  "refreshing the deploy logs 👀",
  "definitely not debugging CSS 😤",
];

export default function Footer() {
  const phrase = phrases[Math.floor(Math.random() * phrases.length)];

  return (
    <footer className="px-4 py-8 text-center text-sm text-white/30">
      <p>{phrase}</p>
    </footer>
  );
}
