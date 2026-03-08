import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InspirationCard from "@/components/InspirationCard";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function InspirationPage() {
  const generations = await prisma.generation.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
    select: { id: true, imageUrl: true, style: true, prompt: true },
  });

  return (
    <>
      <Header />
      <main className="inspiration site-wrapper">
        <div className="inspiration__header">
          <h1 className="inspiration__header-title">Orchestra</h1>
          <p className="inspiration__header-subtitle">Some of the latest produced visual art</p>
        </div>
        <div className="inspiration__gallery">
          {generations.length === 0 ? (
            <p className="inspiration__empty">No images yet — check back soon.</p>
          ) : (
            generations.map((g) => (
              <InspirationCard key={g.id} imageUrl={g.imageUrl} style={g.style} prompt={g.prompt} />
            ))
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
