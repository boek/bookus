import { ImageResponse } from "next/og";
import { getTILs } from "~/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  const tils = await getTILs();
  return tils.map((til) => ({ slug: til.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tils = await getTILs();
  const til = tils.find((t) => t.slug === slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          backgroundColor: "#0d1a0d",
          padding: 80,
        }}
      >
        <div
          style={{
            width: 64,
            height: 8,
            borderRadius: 4,
            backgroundColor: "#4ade80",
            marginBottom: 32,
          }}
        />
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#b8d4b8",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          TIL
        </div>
        <div style={{ fontSize: 28, color: "#4ade80" }}>
          {til?.date.toLocaleDateString("en-US", {
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
