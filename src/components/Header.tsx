import Link from "next/link";

export default function Header() {
  return (
    <header className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/" className="text-3xl tracking-tight text-white">
        <span className="font-semibold">JEFF</span>{" "}
        <span className="font-bold">BOEK</span>
      </Link>
      <nav className="mt-2 flex gap-6 text-sm font-medium">
        <Link href="/posts" className="text-brand-post-accent hover:underline">
          Posts
        </Link>
        <Link href="/notes" className="text-brand-note-accent hover:underline">
          Notes
        </Link>
        <Link href="/tils" className="text-brand-til-accent hover:underline">
          TIL
        </Link>
      </nav>
    </header>
  );
}
