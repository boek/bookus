import Link from "next/link";
import Header from "~/components/Header";
import { posts } from "~/lib/content";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`}>
                {post.title} - {post.date}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
