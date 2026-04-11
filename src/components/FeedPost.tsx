import Link from "next/link";
import Markdown from "react-markdown";
import type { Post } from "~/lib/content";

export default function FeedPost({ post }: { post: Post }) {
  return (
    <div className="mx-auto flex max-w-2xl items-start gap-4 px-4 py-8">
      <div className="flex-1">
        <Link href={`/posts/${post.slug}`} className="group">
          <h2 className="group-hover:text-brand-navy mb-2 text-xl font-semibold text-gray-900">
            {post.title}
          </h2>
        </Link>
        <div className="prose-sm prose-amber">
          <Markdown>{post.excerpt}</Markdown>
        </div>
        {post.hasMore && (
          <Link
            href={`/posts/${post.slug}`}
            className="text-brand-navy mt-2 inline-block text-sm font-medium hover:underline"
          >
            Read more
          </Link>
        )}
      </div>
      <p className="shrink-0 text-sm text-amber-800">
        {post.date.toLocaleDateString()}
      </p>
    </div>
  );
}
