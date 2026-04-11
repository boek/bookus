import type { Element, MDXProps } from "mdx/types";
import type { Note } from "~/lib/content";

export default async function FeedNote({ note }: { note: Note }) {
  const { default: Content } = (await import(
    `~/content/notes/${note.slug}.mdx`
  )) as {
    default: (props: MDXProps) => Element;
  };

  return (
    <div className="mx-auto flex max-w-2xl items-start gap-4 px-4 py-8">
      <div className="flex-1 text-white">
        <Content />
      </div>
      <p className="shrink-0 text-sm text-blue-200">
        {note.date.toLocaleDateString()}
      </p>
    </div>
  );
}
