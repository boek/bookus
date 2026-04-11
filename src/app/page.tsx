import { getAll } from "~/lib/content";
import type { Note, Post } from "~/lib/content";
import FeedNote from "~/components/FeedNote";
import FeedPost from "~/components/FeedPost";
import Header from "~/components/Header";

type Group = { type: "note" | "post"; items: (Note | Post)[] };

function groupConsecutive(items: (Note | Post)[]): Group[] {
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

export default async function HomePage() {
  const all = await getAll();
  const groups = groupConsecutive(all);

  return (
    <main>
      <ul>
        {groups.map((group, i) => (
          <li
            key={i}
            className={`shadow-inner-bottom ${group.type === "post" ? "bg-brand-amber" : "bg-brand-blue"}`}
          >
            <div className="divide-y divide-black/10">
              {group.items.map((item) =>
                item.type === "post" ? (
                  <FeedPost key={item.slug} post={item} />
                ) : (
                  <FeedNote key={item.slug} note={item} />
                ),
              )}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
