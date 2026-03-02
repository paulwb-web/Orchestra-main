"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import ForgotPasswordModal from "@/components/ForgotPasswordModal";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [forgotOpen, setForgotOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
      return;
    }
  }, [status, router]);

  if (status === "loading") return <div className="container" style={{ padding: "var(--space-16)", textAlign: "center" }}>Loading…</div>;

  return (
    <>
      <Header />
      <main className="container" style={{ paddingTop: "var(--space-16)", paddingBottom: "var(--space-16)", textAlign: "center" }}>
        <h1 style={{ fontSize: "var(--text-2xl)", marginBottom: "var(--space-4)" }}>Log in or create an account</h1>
        <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-6)" }}>
          Click below to open the sign-in modal.
        </p>
        <button type="button" className="btn-primary" onClick={() => setAuthOpen(true)}>
          Log in / Sign up
        </button>
      </main>
      <Footer />
      {authOpen && (
        <AuthModal
          onClose={() => setAuthOpen(false)}
          onOpenForgotPassword={() => { setAuthOpen(false); setForgotOpen(true); }}
        />
      )}
      {forgotOpen && <ForgotPasswordModal onClose={() => setForgotOpen(false)} />}
    </>
  );
}
