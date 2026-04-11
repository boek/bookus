import { getNotes } from "~/lib/content";
import FeedNote from "~/components/FeedNote";
import Footer from "~/components/Footer";
import BackLink from "~/components/BackLink";

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <>
      <main className="bg-brand-note-bg">
        <BackLink href="/" className="text-brand-note-accent" />
        <ul className="divide-y divide-white/5">
          {notes.map((note) => (
            <li key={note.slug}>
              <FeedNote note={note} />
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
