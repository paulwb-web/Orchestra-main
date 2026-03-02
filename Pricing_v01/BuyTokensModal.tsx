"use client";

import { useState, useEffect } from "react";

function ChevronLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 6l-6 6l6 6" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

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
  { id: "test",     name: "Test pack",     price: "€1",  pictures: 1,  speed: "Normal processing" },
  { id: "standard", name: "Standard pack", price: "€25", pictures: 30, speed: "Fast processing" },
  { id: "premium",  name: "Premium pack",  price: "€50", pictures: 70, speed: "Fast processing" },
];

type BuyTokensModalProps = { onClose: () => void; initialPackId?: string };

export default function BuyTokensModal({ onClose, initialPackId }: BuyTokensModalProps) {
  const [step, setStep] = useState<1 | 2>(initialPackId ? 2 : 1);
  const [selected, setSelected] = useState<string | null>(initialPackId ?? null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const selectedPack = packs.find((p) => p.id === selected);

  function handleSelectPack(id: string) {
    setSelected(id);
    setStep(2);
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal buy-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
          <XIcon />
        </button>

        {step === 1 ? (
          <>
            <div className="buy-modal__header">
              <h2 className="buy-modal__title">You are out of tokens</h2>
              <p className="buy-modal__subtitle">Buy more to continue generate pictures</p>
            </div>

            <div className="buy-modal__nav">
              <button type="button" className="btn-ghost buy-modal__back" onClick={onClose}>
                <ChevronLeftIcon /> Back
              </button>
              <span className="buy-modal__step">Step 1 / 2</span>
            </div>

            <div className="buy-modal__packs">
              {packs.map((pack) => (
                <div key={pack.id} className="buy-modal__pack">
                  <p className="buy-modal__summary-title">{pack.price} · {pack.name}</p>
                  <div className="buy-modal__pack-row">
                    <ApertureIcon />
                    <span>{pack.pictures} Picture{pack.pictures !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="buy-modal__pack-row">
                    <SparklesIcon />
                    <span>{pack.speed}</span>
                  </div>
                  <hr className="buy-modal__pack-divider" />
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => handleSelectPack(pack.id)}
                  >
                    Buy pack
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="buy-modal__header">
              <h2 className="buy-modal__title">Buy token pack</h2>
              <p className="buy-modal__subtitle">Input your card details to purchase more tokens</p>
            </div>

            <div className="buy-modal__nav">
              <button type="button" className="btn-ghost buy-modal__back" onClick={() => setStep(1)}>
                <ChevronLeftIcon /> Back
              </button>
              <span className="buy-modal__step">Step 2 / 2</span>
            </div>

            {selectedPack && (
              <div className="buy-modal__summary">
                <p className="buy-modal__summary-title">
                  {selectedPack.price} · {selectedPack.name}
                </p>
                <div className="buy-modal__pack-row">
                  <ApertureIcon />
                  <span>{selectedPack.pictures} Picture{selectedPack.pictures !== 1 ? "s" : ""}</span>
                </div>
                <div className="buy-modal__pack-row">
                  <SparklesIcon />
                  <span>{selectedPack.speed}</span>
                </div>
              </div>
            )}

            <div className="buy-modal__payment-placeholder">
              Payment module to be inserted here
            </div>
          </>
        )}
      </div>
    </div>
  );
}
