"use client";

import { useState, useEffect } from "react";
import PricingSlider from "./PricingSlider";

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

type BuyTokensModalProps = {
  onClose: () => void;
  initialQty?: number;
  initialTotal?: number;
};

export default function BuyTokensModal({ onClose, initialQty = 1, initialTotal = 1 }: BuyTokensModalProps) {
  const [step, setStep] = useState<1 | 2>(initialQty > 1 || initialTotal > 1 ? 2 : 1);
  const [qty, setQty] = useState(initialQty);
  const [total, setTotal] = useState(initialTotal);
  const [closing, setClosing] = useState(false);

  function handleClose() {
    setClosing(true);
    setTimeout(onClose, 300);
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  function handleSliderSelect(q: number, t: number) {
    setQty(q);
    setTotal(t);
    setStep(2);
  }

  return (
    <div className={`modal-overlay${closing ? " modal-overlay--closing" : ""}`} onClick={handleClose} role="dialog" aria-modal="true">
      <div className="modal buy-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={handleClose} aria-label="Close">
          <XIcon />
        </button>

        {step === 1 ? (
          <>
            <div className="buy-modal__header">
              <h2 className="buy-modal__title">You are out of tokens</h2>
              <p className="buy-modal__subtitle">Buy more tokens to keep generating images</p>
            </div>

            <div className="buy-modal__nav">
              <button type="button" className="btn-ghost buy-modal__back" onClick={handleClose}>
                <ChevronLeftIcon /> Back
              </button>
              <span className="buy-modal__step">Step 1 / 2</span>
            </div>

            <PricingSlider onSelect={handleSliderSelect} />
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

            <div className="buy-modal__summary">
              <p className="buy-modal__summary-title">
                €{total} · {qty} Token{qty !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="buy-modal__payment-placeholder">
              Payment module to be inserted here
            </div>
          </>
        )}
      </div>
    </div>
  );
}
