import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MarketplaceCard from "@/components/MarketplaceCard";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function MarketplacePage() {
  const generations = await prisma.generation.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
    select: { id: true, imageUrl: true, style: true, prompt: true },
  });

  return (
    <>
      <Header />
      <main className="marketplace site-wrapper">
        <div className="marketplace__header">
          <h1 className="marketplace__title">Market</h1>
          <p className="marketplace__subtitle">Own a piece of art inspired by the great movements of modern art</p>
        </div>
        <div className="marketplace__grid">
          {generations.length === 0 ? (
            <p className="marketplace__empty">No art yet — be the first to generate.</p>
          ) : (
            generations.map((g) => (
              <MarketplaceCard
                key={g.id}
                generationId={g.id}
                imageUrl={g.imageUrl}
                prompt={g.prompt}
                style={g.style}
              />
            ))
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
