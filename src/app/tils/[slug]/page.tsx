import { getTILs } from "~/lib/content";
import FeedTIL from "~/components/FeedTIL";
import BackLink from "~/components/BackLink";
import Footer from "~/components/Footer";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tils = await getTILs();
  const til = tils.find((t) => t.slug === slug);

  if (!til) return <p>TIL not found.</p>;

  return (
    <div className="bg-brand-til-bg min-h-screen">
      <BackLink href="/" className="text-brand-til-accent" />
      <FeedTIL til={til} />
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  const tils = await getTILs();
  return tils.map((t) => ({ slug: t.slug }));
}

export const dynamicParams = false;
