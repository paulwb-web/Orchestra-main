import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function InspirationPage() {
  const items = Array.from({ length: 6 });
  return (
    <>
      <Header />
      <main className="inspiration site-wrapper">
        <div className="inspiration__header">
          <h1 className="inspiration__header-title">Orchestra</h1>
          <p className="inspiration__header-subtitle">Latest produced Bauhaus inspired visual art</p>
        </div>
        <div className="inspiration__gallery">
          {items.map((_, i) => (
            <div key={i} className="inspiration__item" aria-hidden />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
