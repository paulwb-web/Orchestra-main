"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import AuthModal from "./AuthModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import BuyTokensModal from "./BuyTokensModal";
import PricingSlider from "./PricingSlider";

export default function PricingSection() {
  const { data: session } = useSession();
  const [authOpen, setAuthOpen] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const [selectedQty, setSelectedQty] = useState<number>(1);
  const [selectedTotal, setSelectedTotal] = useState<number>(1);

  function handleGetStarted(qty: number, total: number) {
    if (session) {
      setSelectedQty(qty);
      setSelectedTotal(total);
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
        <div className="pricing__slider-wrap">
          <PricingSlider onSelect={handleGetStarted} />
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
      {buyOpen && (
        <BuyTokensModal
          onClose={() => setBuyOpen(false)}
          initialQty={selectedQty}
          initialTotal={selectedTotal}
        />
      )}
    </>
  );
}
