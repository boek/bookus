import path from "path";
import { readdirSync, readFileSync } from "fs";

const contentDir = path.join(process.cwd(), "src/content");

export interface Content {
  date: Date;
  slug: string;
}

export interface Note extends Content {
  type: "note";
}

export interface TIL extends Content {
  type: "til";
}

export interface Post extends Content {
  type: "post";
  title: string;
  description: string;
  excerpt: string;
  hasMore: boolean;
}

function parseSlugDate(f: string): { slug: string; date: Date } {
  const date = new Date(
    +f.slice(0, 4),
    +f.slice(4, 6) - 1,
    +f.slice(6, 8),
    +f.slice(8, 10),
    +f.slice(10, 12),
  );
  const slug = f.replace(/\.mdx?$/, "");
  return { slug, date };
}

export async function getNotes(): Promise<Note[]> {
  return readdirSync(contentDir + "/notes")
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ type: "note" as const, ...parseSlugDate(f) }));
}

export async function getTILs(): Promise<TIL[]> {
  return readdirSync(contentDir + "/tils")
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ type: "til" as const, ...parseSlugDate(f) }));
}

const sumamryLength = 350;

export async function getPosts(): Promise<Post[]> {
  return await Promise.all(
    readdirSync(contentDir + "/posts")
      .filter((f) => f.endsWith(".mdx"))
      .map(async (f) => {
        const slug = f.replace(/\.mdx?$/, "");
        const { frontmatter } = (await import(`~/content/posts/${f}`)) as {
          frontmatter: { title: string; description: string; date: string };
        };
        const raw = readFileSync(path.join(contentDir, "posts", f), "utf-8");
        const body = raw.replace(/^---[\s\S]*?---\n/, "").trim();
        const excerpt = body.slice(0, sumamryLength);
        const hasMore = body.length > sumamryLength;
        return {
          type: "post" as const,
          slug,
          ...frontmatter,
          date: new Date(frontmatter.date),
          excerpt,
          hasMore,
        };
      }),
  );
}

export async function getAll(): Promise<(Note | TIL | Post)[]> {
  const [notes, tils, posts] = await Promise.all([
    getNotes(),
    getTILs(),
    getPosts(),
  ]);
  return [...notes, ...tils, ...posts].sort(
    (a, b) => b.date.getTime() - a.date.getTime(),
  );
}
