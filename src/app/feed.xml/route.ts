import path from "path";
import { readFileSync } from "fs";
import { getAll } from "~/lib/content";

const siteUrl = "https://boek.us";
const contentDir = path.join(process.cwd(), "src/content");

function cdata(str: string) {
  return `<![CDATA[${str}]]>`;
}

function readContent(type: "notes" | "tils" | "posts", slug: string) {
  const raw = readFileSync(
    path.join(contentDir, type, `${slug}.mdx`),
    "utf-8",
  );
  return raw.replace(/^---[\s\S]*?---\n/, "").trim();
}

export async function GET() {
  const items = await getAll();

  const xmlItems = items
    .map((item) => {
      if (item.type === "post") {
        return `    <item>
      <title>${cdata(item.title)}</title>
      <link>${siteUrl}/posts/${item.slug}</link>
      <guid>${siteUrl}/posts/${item.slug}</guid>
      <pubDate>${item.date.toUTCString()}</pubDate>
      <description>${cdata(item.excerpt)}</description>
    </item>`;
      }

      if (item.type === "note") {
        const content = readContent("notes", item.slug);
        return `    <item>
      <title>Note — ${item.date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</title>
      <link>${siteUrl}/notes/${item.slug}</link>
      <guid>${siteUrl}/notes/${item.slug}</guid>
      <pubDate>${item.date.toUTCString()}</pubDate>
      <description>${cdata(content)}</description>
    </item>`;
      }

      const content = readContent("tils", item.slug);
      return `    <item>
      <title>TIL — ${item.date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</title>
      <link>${siteUrl}/tils/${item.slug}</link>
      <guid>${siteUrl}/tils/${item.slug}</guid>
      <pubDate>${item.date.toUTCString()}</pubDate>
      <description>${cdata(content)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>boek.us</title>
    <link>${siteUrl}</link>
    <description>Jeff Boek's personal site — posts, notes, and TILs</description>
    <lastBuildDate>${items[0]?.date.toUTCString() ?? ""}</lastBuildDate>
${xmlItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
