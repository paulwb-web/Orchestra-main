import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 4L13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="not-found">
        <div className="not-found__inner">
          <h1 className="not-found__title">404</h1>
          <div className="not-found__body">
            <p className="not-found__text">This page could not be found</p>
            <Link href="/" className="btn-primary">
              Go Back <ArrowRight />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
