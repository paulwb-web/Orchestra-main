import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FeatureBlocks from "@/components/FeatureBlocks";
import ArtStyleViewer from "@/components/ArtStyleViewer";
import PricingSection from "@/components/PricingSection";
import Link from "next/link";
import Image from "next/image";

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 4L13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <div className="site-wrapper">
          <Hero />
          <FeatureBlocks />
          <ArtStyleViewer />
        </div>
        {/* PricingSection is full-width so its background stretches edge-to-edge */}
        <PricingSection />
        <section className="cta-block">
          <h2 className="cta-block__title">Ready to start creating?</h2>
          <div className="cta-block__content">
            <div className="cta-block__image-wrap">
              <Image
                src="/images/art_styles/Fauvism02.jpg"
                width={640}
                height={371}
                alt="Fauvism artwork example"
                className="cta-block__image"
              />
            </div>
            <div className="cta-block__body">
              <p className="cta-block__text">
                Generate original artwork in the style of the movements that shaped modern art.
                One prompt, one image, entirely yours.
              </p>
              <Link href="/generate" className="btn-primary">
                Start creating <ArrowRight />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
