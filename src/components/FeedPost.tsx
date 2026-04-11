import Link from "next/link";
import Markdown from "react-markdown";
import type { Post } from "~/lib/content";

export default function FeedPost({ post }: { post: Post }) {
  return (
    <div className="mx-auto flex max-w-2xl items-start gap-4 px-4 py-8">
      <div className="flex-1">
        <Link href={`/posts/${post.slug}`} className="group">
          <h2 className="mb-2 text-5xl font-bold tracking-tight text-brand-post-text group-hover:text-brand-post-accent">
            {post.title}
          </h2>
        </Link>
        <div className="prose prose-sm prose-invert prose-headings:text-brand-post-accent prose-headings:font-semibold prose-strong:text-white prose-em:text-brand-post-text/80 prose-a:text-brand-post-accent prose-a:no-underline hover:prose-a:underline prose-code:text-brand-post-accent prose-code:bg-white/5 prose-blockquote:border-brand-post-accent prose-blockquote:text-brand-post-text/70 text-brand-post-text">
          <Markdown>{post.excerpt}</Markdown>
        </div>
        {post.hasMore && (
          <Link
            href={`/posts/${post.slug}`}
            className="mt-2 inline-block text-sm font-medium text-brand-post-accent hover:underline"
          >
            Read more
          </Link>
        )}
      </div>
      <Link href={`/posts/${post.slug}`} className="shrink-0 text-sm text-brand-post-accent/60 hover:text-brand-post-accent">
        {post.date.toLocaleDateString()}
      </Link>
    </div>
  );
}
