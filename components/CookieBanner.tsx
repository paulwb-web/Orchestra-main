"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function handleAccept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <Image
        src="/images/cookie001.png"
        width={80}
        height={80}
        alt="Bauhaus cookie"
        className="cookie-banner__image"
      />
      <div className="cookie-banner__body">
        <p className="cookie-banner__title">We use cookies</p>
        <p className="cookie-banner__text">
          We use cookies to improve your experience and analyze site usage.{" "}
          <a href="/privacy" className="cookie-banner__link">Learn more &rsaquo;</a>
        </p>
      </div>
      <div className="cookie-banner__actions">
        <button type="button" className="btn-secondary" onClick={handleDecline}>
          Decline
        </button>
        <button type="button" className="btn-primary" onClick={handleAccept}>
          Accept
        </button>
      </div>
    </div>
  );
}
