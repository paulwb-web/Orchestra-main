"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import AuthModal from "./AuthModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import BuyTokensModal from "./BuyTokensModal";

function AccountIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
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

export default function Header() {
  const { data: session, status } = useSession();
  const [authOpen, setAuthOpen] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!session) return;
    fetch("/api/user/balance")
      .then((r) => r.json())
      .then((d) => typeof d.balance === "number" && setBalance(d.balance))
      .catch(() => {});
  }, [session]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("checkout") === "success") {
      fetch("/api/user/balance")
        .then((r) => r.json())
        .then((d) => typeof d.balance === "number" && setBalance(d.balance));
      window.history.replaceState({}, "", "/");
    }
  }, []);

  const nav = (
    <nav className="header__nav">
      <Link href="/generate" className="btn-ghost">Create</Link>
      <Link href="/inspiration" className="btn-ghost">Inspiration</Link>
      <Link href="/about" className="btn-ghost">About</Link>
    </nav>
  );

  if (status === "loading") {
    return (
      <>
        <header className="header">
          <div className="header__inner">
            <Link href="/" className="header__logo" aria-label="Orchestra">
              <Image src="/logo.svg" width={48} height={48} alt="Orchestra" priority />
            </Link>
            {nav}
            <div className="header__actions">
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setAuthOpen(true)}
              >
                <AccountIcon />
                Log in / Register
              </button>
            </div>
          </div>
        </header>
        {authOpen && (
          <AuthModal
            onClose={() => setAuthOpen(false)}
            onOpenForgotPassword={() => {
              setAuthOpen(false);
              setForgotOpen(true);
            }}
          />
        )}
        {forgotOpen && (
          <ForgotPasswordModal onClose={() => setForgotOpen(false)} />
        )}
      </>
    );
  }

  if (session) {
    return (
      <>
        <header className="header">
          <div className="header__inner">
            <Link href="/" className="header__logo" aria-label="Orchestra">
              <Image src="/logo.svg" width={48} height={48} alt="Orchestra" priority />
            </Link>
            {nav}
            <div className="header__actions">
              <div className="header__counter-container">
                <button
                  type="button"
                  className="header__counter"
                  onClick={() => setBuyOpen(true)}
                  aria-label="Buy more pictures"
                >
                  <ApertureIcon />
                  <span className="header__counter-value">{balance !== null ? String(balance).padStart(2, "0") : "00"}</span>
                  <span className="header__counter-label">
                    Picture{balance !== 1 ? "s" : ""} left to generate
                  </span>
                </button>
                <span className="header__divider" />
                <button type="button" className="btn-ghost" onClick={() => signOut({ callbackUrl: "/" })}>
                  <AccountIcon />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </header>
        {buyOpen && <BuyTokensModal onClose={() => setBuyOpen(false)} />}
      </>
    );
  }

  return (
    <>
      <header className="header">
        <div className="header__inner">
          <Link href="/" className="header__logo" aria-label="Orchestra">
            <Image src="/logo.svg" width={48} height={48} alt="Orchestra" priority />
          </Link>
          {nav}
          <div className="header__actions">
            <button
              type="button"
              className="btn-ghost"
              onClick={() => setAuthOpen(true)}
            >
              <AccountIcon />
              Log in / Register
            </button>
          </div>
        </div>
      </header>
      {authOpen && (
        <AuthModal
          onClose={() => setAuthOpen(false)}
          onOpenForgotPassword={() => {
            setAuthOpen(false);
            setForgotOpen(true);
          }}
        />
      )}
      {forgotOpen && (
        <ForgotPasswordModal onClose={() => setForgotOpen(false)} />
      )}
    </>
  );
}
