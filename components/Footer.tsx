import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      {/* 4-column content, 1280px wide, centered */}
      <div className="footer__content">
        {/* Col 1: Company info */}
        <div className="footer__section">
          <span className="footer__section-title">Lorem ipsum AB</span>
          <p className="footer__section-text">
            {"Lorem ipsum AB\nReg.no 00000000\nDress Lorem ipsum\nStockholm, Sweden"}
          </p>
        </div>

        {/* Col 2: Orchestra links */}
        <div className="footer__section">
          <span className="footer__section-title">Orchestra</span>
          <Link href="/about" className="footer__link">About</Link>
          <Link href="/faq" className="footer__link">FAQ</Link>
        </div>

        {/* Col 3: Legal links */}
        <div className="footer__section">
          <span className="footer__section-title">Legal</span>
          <Link href="/privacy" className="footer__link">Privacy policy</Link>
          <Link href="/terms" className="footer__link">Terms of use</Link>
        </div>

        {/* Col 4: Support */}
        <div className="footer__section">
          <span className="footer__section-title">Support</span>
          <span className="footer__section-email">Support@Loremipsum.com</span>
          <span className="footer__copyright">Copyright © 2026. All rights reserved.</span>
        </div>
      </div>

      {/* Decorative wordmark — SVG so not selectable; clipped halfway through word */}
      <div className="footer__wordmark-wrap" aria-hidden>
        <svg className="footer__wordmark-svg" viewBox="0 0 1200 280" preserveAspectRatio="xMidYMax meet">
          <text
            x="50%"
            y="240"
            textAnchor="middle"
            className="footer__wordmark-text"
          >
            Orchestra
          </text>
        </svg>
      </div>
    </footer>
  );
}
