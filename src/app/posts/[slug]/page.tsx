import type { Element, MDXProps } from "mdx/types";
import { getPosts } from "~/lib/content";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Post } = (await import(`~/content/posts/${slug}.mdx`)) as {
    default: (props: MDXProps) => Element;
  };

  return <Post />;
}

export async function generateStaticParams() {
  let posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;
