import { getAll } from "~/lib/content";
import type { Note, TIL, Post } from "~/lib/content";
import FeedNote from "~/components/FeedNote";
import FeedTIL from "~/components/FeedTIL";
import FeedPost from "~/components/FeedPost";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

type ContentItem = Note | TIL | Post;
type Group = { type: ContentItem["type"]; items: ContentItem[] };

function groupConsecutive(items: ContentItem[]): Group[] {
  return items.reduce<Group[]>((groups, item) => {
    const last = groups.at(-1);
    if (last && last.type === item.type) {
      last.items.push(item);
    } else {
      groups.push({ type: item.type, items: [item] });
    }
    return groups;
  }, []);
}

const bgColor: Record<ContentItem["type"], string> = {
  post: "bg-brand-post-bg",
  note: "bg-brand-note-bg",
  til: "bg-brand-til-bg",
};

export default async function HomePage() {
  const all = await getAll();
  const groups = groupConsecutive(all);

  return (
    <>
      <main>
        <ul>
          {groups.map((group, i) => (
            <li
              key={i}
              className={`shadow-inner-bottom ${bgColor[group.type]}`}
            >
              <div className="divide-y divide-white/5">
                {group.items.map((item) =>
                  item.type === "post" ? (
                    <FeedPost key={item.slug} post={item} />
                  ) : item.type === "til" ? (
                    <FeedTIL key={item.slug} til={item} />
                  ) : (
                    <FeedNote key={item.slug} note={item} />
                  ),
                )}
              </div>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
