"use client";

import { useState } from "react";
import Image from "next/image";

const STYLES = [
  { id: "modernism",     label: "Modernism",     image: "/images/art_styles/Modernism01.jpg" },
  { id: "expressionism", label: "Expressionism", image: "/images/art_styles/Expressionism01.jpg" },
  { id: "fauvism",       label: "Fauvism",       image: "/images/art_styles/Fauvism01.jpg" },
  { id: "surrealism",    label: "Surrealism",    image: "/images/art_styles/Surrealism01.jpg" },
  { id: "symbolism",     label: "Symbolism",     image: "/images/art_styles/Symbolism01.jpg" },
];

export default function ArtStyleViewer() {
  const [active, setActive] = useState("modernism");
  const activeStyle = STYLES.find((s) => s.id === active)!;

  return (
    <section className="art-styles">
      <div className="art-styles__header">
        <h2 className="art-styles__title">Art styles</h2>
        <p className="art-styles__desc">
          Precision AI image models trained on the defining art movements of the modern era
        </p>
      </div>
      <div className="art-styles__content">
        <div className="art-styles__toggles">
          {STYLES.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`art-styles__btn${active === s.id ? " art-styles__btn--active" : ""}`}
              onClick={() => setActive(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="art-styles__viewer">
          {/* key={active} remounts on each switch, re-triggering the CSS fade-in */}
          <Image
            key={active}
            src={activeStyle.image}
            alt={activeStyle.label}
            width={300}
            height={400}
            className="art-styles__image"
          />
        </div>
      </div>
    </section>
  );
}
