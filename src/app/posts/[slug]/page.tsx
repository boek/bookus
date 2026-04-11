import type { Element, MDXProps } from "mdx/types";
import { getPosts } from "~/lib/content";
import BackLink from "~/components/BackLink";
import Footer from "~/components/Footer";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [{ default: Post }, posts] = await Promise.all([
    import(`~/content/posts/${slug}.mdx`) as Promise<{
      default: (props: MDXProps) => Element;
    }>,
    getPosts(),
  ]);
  const post = posts.find((p) => p.slug === slug);

  return (
    <div className="bg-brand-post-bg min-h-screen">
      <BackLink href="/" className="text-brand-post-accent" />
      <div className="mx-auto max-w-2xl px-4 py-12">
        {post && (
          <h1 className="text-brand-post-text mb-8 text-5xl font-bold tracking-tight">
            {post.title}
          </h1>
        )}
        <article className="prose prose-invert prose-headings:text-brand-post-accent prose-headings:font-semibold prose-strong:text-white prose-em:text-brand-post-text/80 prose-a:text-brand-post-accent prose-a:no-underline hover:prose-a:underline prose-code:text-brand-post-accent prose-code:bg-white/5 prose-blockquote:border-brand-post-accent prose-blockquote:text-brand-post-text/70 text-brand-post-text">
          <Post />
        </article>
      </div>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;
