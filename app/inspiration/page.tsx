import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InspirationCard from "@/components/InspirationCard";

const placeholderItems = [
  { id: "#928092", prompt: "Prompt: Still life digital painting of fresh lemons in blue and white porcelain dishes on a floral tablecloth, dark blue background with dramatic shadows, Mediterranean style, oil painting look." },
  { id: "#F2B600", prompt: "Prompt: Abstract expressionist composition in warm ochre and burnt sienna, gestural brushstrokes over a deep cobalt ground, reminiscent of the New York School." },
  { id: "#2A9D8F", prompt: "Prompt: Surrealist landscape with melting clocks draped over barren branches, vast desert horizon at dusk, deep teal sky merging into violet." },
  { id: "#D64D3D", prompt: "Prompt: Fauvist portrait of a woman in bold unnatural reds and oranges, flat planes of colour, loose brushwork, inspired by Matisse and Derain." },
  { id: "#6B4C92", prompt: "Prompt: Symbolist moonlit garden with ethereal figures emerging from mist, pale purples and silver whites, dreamlike atmosphere, Pre-Raphaelite influence." },
  { id: "#4E8B7F", prompt: "Prompt: Modernist cityscape in geometric blocks of muted teal and ivory, flat perspective, early 20th century urban scene, Bauhaus compositional principles." },
];

export default function InspirationPage() {
  return (
    <>
      <Header />
      <main className="inspiration site-wrapper">
        <div className="inspiration__header">
          <h1 className="inspiration__header-title">Orchestra</h1>
          <p className="inspiration__header-subtitle">Some of the latest produced visual art</p>
        </div>
        <div className="inspiration__gallery">
          {placeholderItems.map((item) => (
            <InspirationCard key={item.id} id={item.id} prompt={item.prompt} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
