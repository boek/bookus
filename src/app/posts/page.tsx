import { getPosts } from "~/lib/content";
import FeedPost from "~/components/FeedPost";
import Footer from "~/components/Footer";
import BackLink from "~/components/BackLink";

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <>
      <main className="bg-brand-post-bg">
        <BackLink href="/" className="text-brand-post-accent" />
        <ul className="divide-y divide-white/5">
          {posts.map((post) => (
            <li key={post.slug}>
              <FeedPost post={post} />
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
