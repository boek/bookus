import { ImageResponse } from "next/og";
import { getNotes } from "~/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  const notes = await getNotes();
  return notes.map((note) => ({ slug: note.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const notes = await getNotes();
  const note = notes.find((n) => n.slug === slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          backgroundColor: "#071218",
          padding: 80,
        }}
      >
        <div
          style={{
            width: 64,
            height: 8,
            borderRadius: 4,
            backgroundColor: "#38bdf8",
            marginBottom: 32,
          }}
        />
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#b8d4e0",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Note
        </div>
        <div style={{ fontSize: 28, color: "#38bdf8" }}>
          {note?.date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }) ?? "boek.us"}
        </div>
      </div>
    ),
    size,
  );
}
