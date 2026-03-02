import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function GeneratePage() {
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="hero__inner">
            <h1 className="hero__title">Orchestra</h1>
            <div className="hero__subtitle-block">
              <p className="hero__subtitle">Create your Bauhaus masterpiece</p>
              <p className="hero__description">
                Describe what you want to create and let AI bring your Bauhaus-inspired vision to life.
              </p>
            </div>
          </div>
        </section>
        <div className="site-wrapper">
          <div className="generate__placeholder">
            <p className="generate__placeholder-text">Image generator coming soon</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
