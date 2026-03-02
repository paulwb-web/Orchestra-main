"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import AuthModal from "./AuthModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import BuyTokensModal from "./BuyTokensModal";

function ApertureIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M3.6 15h10.55" />
      <path d="M6.551 4.938l3.26 10.034" />
      <path d="M17.032 4.636l-8.535 6.201" />
      <path d="M20.559 14.51l-8.535 -6.201" />
      <path d="M12.257 20.916l3.261 -10.034" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M13 7a9.3 9.3 0 0 0 1.516 -.546c.911 -.438 1.494 -1.015 1.937 -1.932c.207 -.428 .382 -.928 .547 -1.522c.165 .595 .34 1.095 .547 1.521c.443 .918 1.026 1.495 1.937 1.933c.426 .205 .925 .38 1.516 .546a9.3 9.3 0 0 0 -1.516 .547c-.911 .438 -1.494 1.015 -1.937 1.932a9 9 0 0 0 -.547 1.521c-.165 -.594 -.34 -1.095 -.547 -1.521c-.443 -.918 -1.026 -1.494 -1.937 -1.932a9 9 0 0 0 -1.516 -.547" />
      <path d="M3 14a21 21 0 0 0 1.652 -.532c2.542 -.953 3.853 -2.238 4.816 -4.806a20 20 0 0 0 .532 -1.662a20 20 0 0 0 .532 1.662c.963 2.567 2.275 3.853 4.816 4.806q .75 .28 1.652 .532a21 21 0 0 0 -1.652 .532c-2.542 .953 -3.854 2.238 -4.816 4.806a20 20 0 0 0 -.532 1.662a20 20 0 0 0 -.532 -1.662c-.963 -2.568 -2.275 -3.853 -4.816 -4.806a21 21 0 0 0 -1.652 -.532" />
    </svg>
  );
}

const packs = [
  {
    id: "test",
    name: "Test pack",
    price: "€1",
    features: [
      { text: "1 Picture", icon: "aperture" as const },
      { text: "Normal processing", icon: "sparkles" as const },
    ],
  },
  {
    id: "standard",
    name: "Standard pack",
    price: "€25",
    features: [
      { text: "30 Pictures", icon: "aperture" as const },
      { text: "Fast processing", icon: "sparkles" as const },
    ],
  },
  {
    id: "premium",
    name: "Premium pack",
    price: "€50",
    features: [
      { text: "70 Pictures", icon: "aperture" as const },
      { text: "Fast processing", icon: "sparkles" as const },
    ],
  },
];

export default function PricingSection() {
  const { data: session } = useSession();
  const [authOpen, setAuthOpen] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const [selectedPackId, setSelectedPackId] = useState<string | null>(null);

  function handleGetStarted(packId: string) {
    if (session) {
      setSelectedPackId(packId);
      setBuyOpen(true);
    } else {
      setAuthOpen(true);
    }
  }

  return (
    <>
      <section className="pricing" id="pricing">
        <div className="pricing__header">
          <h2 className="pricing__title">Pricing</h2>
        </div>
        <div className="pricing__grid">
          {packs.map((pack) => (
            <div key={pack.id} className="pricing__card">
              <div className="pricing__details">
                <span className="pricing__pack-name">{pack.name}</span>
                <span className="pricing__price">{pack.price}</span>
              </div>
              <ul className="pricing__features">
                {pack.features.map((f) => (
                  <li key={f.text} className="pricing__feature">
                    {f.icon === "aperture" ? <ApertureIcon /> : <SparklesIcon />}
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>
              <div className="pricing__divider" />
              <button type="button" className="btn-secondary" onClick={() => handleGetStarted(pack.id)}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {authOpen && (
        <AuthModal
          onClose={() => setAuthOpen(false)}
          onOpenForgotPassword={() => {
            setAuthOpen(false);
            setForgotOpen(true);
          }}
        />
      )}
      {forgotOpen && <ForgotPasswordModal onClose={() => setForgotOpen(false)} />}
      {buyOpen && <BuyTokensModal onClose={() => setBuyOpen(false)} initialPackId={selectedPackId ?? undefined} />}
    </>
  );
}
