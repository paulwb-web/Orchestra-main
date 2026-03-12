import Link from "next/link";

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 4L13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__inner">
        <h1 className="hero__title">Orchestra</h1>
        <div className="hero__subtitle-block">
          <p className="hero__subtitle">Generate art inspired by the great movements of modern art history</p>
          <p className="hero__description">
            Orchestra lets you generate original artwork in the style of Modernism, Expressionism,
            Surrealism, and more. Pick a movement, describe your vision, get your image
          </p>
          <Link href="/generate" className="btn-primary">
            Start creating <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
