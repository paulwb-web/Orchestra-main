"use client";

import { useState } from "react";

// Power curve: f(1)=1, f(1000)=900
const EXP = Math.log(900) / Math.log(1000); // ≈ 0.9847

function calcPrice(qty: number): number {
  if (qty <= 1) return 1;
  return Math.round(Math.pow(qty, EXP) * 10) / 10;
}

// Figma 82:4200 — strokeWidth 2px to match page design system
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

type Props = { onSelect: (qty: number, total: number) => void };

export default function PricingSlider({ onSelect }: Props) {
  const [qty, setQty] = useState(1);
  const total = calcPrice(qty);

  return (
    <div className="pricing-slider">
      {/* Inner group: info row + qty display share 8px gap (Figma 82:4197) */}
      <div className="pricing-slider__top">
        {/* Figma 82:4198: single horizontal row — price · icon · pictures */}
        <div className="pricing-slider__info">
          <span className="pricing-slider__price">€{total}</span>
          <ApertureIcon />
          <span className="pricing-slider__pictures">
            {qty} Picture{qty !== 1 ? "s" : ""}
          </span>
        </div>
        {/* Figma 82:4209: big token quantity display */}
        <div className="pricing-slider__qty">
          <span className="pricing-slider__number">{qty}</span>
          <span className="pricing-slider__unit">Token{qty !== 1 ? "s" : ""}</span>
        </div>
      </div>

      <input
        type="range"
        min="1"
        max="1000"
        value={qty}
        className="pricing-slider__track"
        onChange={(e) => setQty(Number(e.target.value))}
        aria-label="Number of tokens"
        aria-valuemin={1}
        aria-valuemax={1000}
        aria-valuenow={qty}
      />

      <button
        type="button"
        className="btn-secondary"
        onClick={() => onSelect(qty, total)}
      >
        Get Started
      </button>
    </div>
  );
}
