import { getTILs } from "~/lib/content";
import FeedTIL from "~/components/FeedTIL";
import Footer from "~/components/Footer";
import BackLink from "~/components/BackLink";

export default async function TILsPage() {
  const tils = await getTILs();

  return (
    <>
      <main className="bg-brand-til-bg">
        <BackLink href="/" className="text-brand-til-accent" />
        <ul className="divide-y divide-white/5">
          {tils.map((til) => (
            <li key={til.slug}>
              <FeedTIL til={til} />
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
