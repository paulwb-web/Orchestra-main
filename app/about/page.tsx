import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

const features = [
  {
    title: "Models Built for Each Movement",
    desc: "Every art style gets its own AI model — trained on the visual language of that movement, not a generic prompt engine. The result is images that feel genuinely rooted in Expressionism, Surrealism, or whichever movement you choose.",
  },
  {
    title: "Five Movements. Endless Outcomes.",
    desc: "Modernism, Expressionism, Fauvism, Surrealism, Symbolism. Each one is a distinct creative direction — explore them all, or commit to one. Every prompt produces something that has never existed before.",
  },
  {
    title: "High-Resolution Originals",
    desc: "Every image you generate is one-of-a-kind and yours to keep. High-resolution files ready for digital use, print, or commercial projects. No watermarks. No templates. No compromises.",
  },
  {
    title: "Instant Checkout & Download",
    desc: "Buy tokens, generate, download. The whole flow is designed to stay out of your way — secure payment, instant delivery, no subscriptions required.",
  },
  {
    title: "Depth Behind Every Image",
    desc: "We didn't just train on pretty pictures. We studied the movements. What makes Fauvism bold. What makes Surrealism unsettling. That understanding shapes every image Orchestra creates.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="about site-wrapper">
        <div className="about__header">
          <h1 className="about__header-title">Orchestra</h1>
          <p className="about__header-subtitle">
            Art history meets AI — generate original images inspired by the movements
            that shaped modern art, one prompt at a time.
          </p>
        </div>

        <section className="about__content">
          <div className="about__section">
            <h2 className="about__section-title">Why choose us</h2>
            <p className="about__section-desc">
              Orchestra was built for anyone who wants more than generic AI art. Each model is
              trained on a specific movement — its visual logic, its defining characteristics,
              its history. Whether you&rsquo;re a designer, an artist, or just curious, the
              images you create here will feel like they belong to something.
            </p>
          </div>

          <ul className="about__features">
            {features.map((f) => (
              <li key={f.title} className="about__feature">
                <h3 className="about__feature-title">{f.title}</h3>
                <p className="about__feature-desc">{f.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="about__cta">
          <h2 className="about__cta-title">
            Create something that has never existed before.
          </h2>
          <div className="about__cta-content">
            <div className="about__cta-image-wrap">
              <Image
                src="/images/art_styles/Symbolism02.jpg"
                alt="Symbolism artwork example"
                width={442}
                height={360}
                className="about__cta-image"
              />
            </div>
            <Link href="/generate" className="btn-primary">
              Start creating <ArrowRight />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
