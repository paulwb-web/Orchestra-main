import Link from "next/link";
import Image from "next/image";

const features = [
  {
    title: "Welcome to Orchestra",
    description:
      "Generate original AI artwork inspired by history's most influential art movements — Modernism, Expressionism, Fauvism, Surrealism, and Symbolism — in seconds.",
    image: "/images/image001.png",
  },
  {
    title: "Our Mission",
    description:
      "We believe everyone deserves access to great art. Orchestra puts the power of art history in your hands — through AI precision-tuned to each movement's defining style.",
    image: "/images/image002.png",
  },
  {
    title: "Unleash your creativity",
    description:
      "Simple by design. Describe what you want, choose your movement, and download a high-resolution original. No art school required.",
    image: "/images/image003.png",
  },
];

export default function FeatureBlocks() {
  return (
    <section className="features">
      <div className="features__grid">
        {features.map((f) => (
          <div key={f.title} className="features__card">
            <div className="features__image-wrap">
              <Image
                src={f.image}
                alt=""
                width={240}
                height={240}
                className="features__image"
              />
            </div>
            <h3 className="features__card-title">{f.title}</h3>
            <p className="features__card-desc">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
