import Link from "next/link";
import type { Post } from "~/lib/content";

export default function FeedPost({ post }: { post: Post }) {
  return (
    <div className="mx-auto flex max-w-2xl items-start gap-4 px-4 py-8">
      <Link href={`/posts/${post.slug}`} className="group flex-1">
        <h2 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-brand-navy">
          {post.title}
        </h2>
        <p className="text-amber-900">{post.description}</p>
      </Link>
      <p className="shrink-0 text-sm text-amber-800">{post.date.toLocaleDateString()}</p>
    </div>
  );
}
