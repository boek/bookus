import path from "path";
import { readdirSync, readFileSync } from "fs";

const contentDir = path.join(process.cwd(), "src/content");

export interface Content {
  date: Date;
  slug: string;
}

export interface Note extends Content {
  type: "note";
  content: string;
}

export interface Post extends Content {
  type: "post";
  title: string;
  description: string;
}

export async function getNotes(): Promise<Note[]> {
  return readdirSync(contentDir + "/notes")
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const content = readFileSync(
        path.join(contentDir, "notes", f),
        "utf-8",
      ).trim();
      const date = new Date(
        +f.slice(0, 4),
        +f.slice(4, 6) - 1,
        +f.slice(6, 8),
        +f.slice(8, 10),
        +f.slice(10, 12),
      );
      const slug = f.replace(/\.mdx?$/, "");
      return { type: "note" as const, slug, date, content };
    });
}

export async function getPosts(): Promise<Post[]> {
  return await Promise.all(
    readdirSync(contentDir + "/posts")
      .filter((f) => f.endsWith(".mdx"))
      .map(async (f) => {
        const slug = f.replace(/\.mdx?$/, "");
        const { frontmatter } = (await import(`~/content/posts/${f}`)) as {
          frontmatter: { title: string; description: string; date: string };
        };
        return {
          type: "post" as const,
          slug,
          ...frontmatter,
          date: new Date(frontmatter.date),
        };
      }),
  );
}

export async function getAll(): Promise<(Note | Post)[]> {
  const [notes, posts] = await Promise.all([getNotes(), getPosts()]);
  return [...notes, ...posts].sort((a, b) => b.date.getTime() - a.date.getTime());
}
