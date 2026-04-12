import path from "path";
import { readFileSync } from "fs";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { getAll } from "~/lib/content";

const siteUrl = "https://boek.us";
const contentDir = path.join(process.cwd(), "src/content");

async function markdownToHtml(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);
  return String(file);
}

function readContent(type: "notes" | "tils" | "posts", slug: string) {
  const raw = readFileSync(
    path.join(contentDir, type, `${slug}.mdx`),
    "utf-8",
  );
  return raw.replace(/^---[\s\S]*?---\n/, "").trim();
}

function cdata(str: string) {
  return `<![CDATA[${str}]]>`;
}

export async function GET() {
  const items = await getAll();

  const xmlItems = await Promise.all(
    items.map(async (item) => {
      if (item.type === "post") {
        const content = await markdownToHtml(readContent("posts", item.slug));
        return `    <item>
      <title>${cdata(item.title)}</title>
      <link>${siteUrl}/posts/${item.slug}</link>
      <guid>${siteUrl}/posts/${item.slug}</guid>
      <pubDate>${item.date.toUTCString()}</pubDate>
      <description>${cdata(content)}</description>
    </item>`;
      }

      if (item.type === "note") {
        const content = await markdownToHtml(readContent("notes", item.slug));
        return `    <item>
      <title>Note — ${item.date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</title>
      <link>${siteUrl}/notes/${item.slug}</link>
      <guid>${siteUrl}/notes/${item.slug}</guid>
      <pubDate>${item.date.toUTCString()}</pubDate>
      <description>${cdata(content)}</description>
    </item>`;
      }

      const content = await markdownToHtml(readContent("tils", item.slug));
      return `    <item>
      <title>TIL — ${item.date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</title>
      <link>${siteUrl}/tils/${item.slug}</link>
      <guid>${siteUrl}/tils/${item.slug}</guid>
      <pubDate>${item.date.toUTCString()}</pubDate>
      <description>${cdata(content)}</description>
    </item>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>boek.us</title>
    <link>${siteUrl}</link>
    <description>Jeff Boek's personal site — posts, notes, and TILs</description>
    <lastBuildDate>${items[0]?.date.toUTCString() ?? ""}</lastBuildDate>
${xmlItems.join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
