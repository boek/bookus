import type { Note } from "~/lib/content";

export default function FeedNote({ note }: { note: Note }) {
  return (
    <div className="mx-auto flex max-w-2xl items-start gap-4 px-4 py-8">
      <p className="flex-1 text-white">{note.content}</p>
      <p className="shrink-0 text-sm text-blue-200">{note.date.toLocaleDateString()}</p>
    </div>
  );
}
