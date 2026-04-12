import { ImageResponse } from "next/og";
import { getPosts } from "~/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getPosts();
  const post = posts.find((p) => p.slug === slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          backgroundColor: "#13111f",
          padding: 80,
        }}
      >
        <div
          style={{
            width: 64,
            height: 8,
            borderRadius: 4,
            backgroundColor: "#818cf8",
            marginBottom: 32,
          }}
        />
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#c4c3d4",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          {post?.title ?? "Post"}
        </div>
        <div style={{ fontSize: 28, color: "#818cf8" }}>boek.us</div>
      </div>
    ),
    size,
  );
}
