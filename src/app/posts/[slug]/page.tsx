import { readdirSync } from "node:fs";
import path from "path";
import type { Element, MDXProps } from "mdx/types";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Post } = (await import(`@content/posts/${slug}.mdx`)) as {
    default: (props: MDXProps) => Element;
  };

  return <Post />;
}

export function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "src/content/posts");
  return readdirSync(postsDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(/\.mdx?$/, "") }));
}

export const dynamicParams = false;
