import path from "path";
import { readdirSync } from "fs";

const contentDir = path.join(process.cwd(), "src/content");

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
}

export const posts: Post[] = await Promise.all(
  readdirSync(contentDir + "/posts")
    .filter((f) => f.endsWith(".mdx"))
    .map(async (f) => {
      const slug = f.replace(/\.mdx?$/, "");
      const { frontmatter } = (await import(`~/content/posts/${f}`)) as {
        frontmatter: { title: string; description: string; date: string };
      };
      return { slug, ...frontmatter };
    }),
);
