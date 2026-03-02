"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type AuthModalProps = {
  onClose: () => void;
  onOpenForgotPassword: () => void;
};

function XIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function AuthModal({ onClose, onOpenForgotPassword }: AuthModalProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");

  // Login fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  // Signup-only fields
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "signup") {
        if (!termsAccepted) {
          setError("Please accept the Terms and Privacy to continue");
          setLoading(false);
          return;
        }
        if (signupPassword !== confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            fullName,
            email: signupEmail,
            password: signupPassword,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Sign up failed");
          setLoading(false);
          return;
        }
        const result = await signIn("credentials", {
          email: signupEmail,
          password: signupPassword,
          redirect: false,
        });
        if (result?.error) {
          setError("Account created — please log in");
          setLoading(false);
          return;
        }
      } else {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        if (result?.error) {
          setError("Invalid email or password");
          setLoading(false);
          return;
        }
      }

      router.push("/");
      router.refresh();
      onClose();
    } catch {
      setError("Something went wrong");
    }
    setLoading(false);
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal auth-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close button — circular, SVG X icon */}
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
          <XIcon />
        </button>

        {/* Tab row — space-between, active tab gets 5px underline */}
        <div className="auth-modal__tabs">
          <button
            type="button"
            className={`auth-modal__tab${mode === "login" ? " auth-modal__tab--active" : ""}`}
            onClick={() => { setMode("login"); setError(""); }}
          >
            Log in
          </button>
          <button
            type="button"
            className={`auth-modal__tab${mode === "signup" ? " auth-modal__tab--active" : ""}`}
            onClick={() => { setMode("signup"); setError(""); }}
          >
            Create account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-modal__form">
          {/* Separator above fields */}
          <hr className="auth-modal__separator" />

          <div className="auth-modal__fields">
            {error && <p className="auth-modal__error">{error}</p>}

            {mode === "login" ? (
              <>
                <label className="auth-modal__label">
                  Username or email
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="auth-modal__input"
                    placeholder="Username / email"
                    autoComplete="email"
                  />
                </label>

                <label className="auth-modal__label">
                  Password
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="auth-modal__input"
                    placeholder="Password"
                    autoComplete="current-password"
                  />
                </label>

                <div className="auth-modal__row">
                  <label className="auth-modal__remember">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    className="auth-modal__forgot"
                    onClick={onOpenForgotPassword}
                  >
                    Forgot password?
                  </button>
                </div>
              </>
            ) : (
              <>
                <label className="auth-modal__label">
                  Username
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="auth-modal__input"
                    placeholder="Username"
                    autoComplete="username"
                  />
                </label>

                <label className="auth-modal__label">
                  Full name
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="auth-modal__input"
                    placeholder="First name Sur name"
                    autoComplete="name"
                  />
                </label>

                <label className="auth-modal__label">
                  Email
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                    className="auth-modal__input"
                    placeholder="email address"
                    autoComplete="email"
                  />
                </label>

                <label className="auth-modal__label">
                  Password
                  <input
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                    className="auth-modal__input"
                    placeholder="*********"
                    autoComplete="new-password"
                  />
                </label>

                <label className="auth-modal__label">
                  Confirm password
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="auth-modal__input"
                    placeholder="*********"
                    autoComplete="new-password"
                  />
                </label>

                <label className="auth-modal__terms">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                  I have read and accept the Terms and Privacy
                </label>
              </>
            )}
          </div>

          {/* Separator below fields */}
          <hr className="auth-modal__separator" />

          <button
            type="submit"
            className="btn-primary auth-modal__submit"
            disabled={loading}
          >
            {loading ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
