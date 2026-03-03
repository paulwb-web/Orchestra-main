"use client";

import { useState, useEffect } from "react";

type ForgotPasswordModalProps = { onClose: () => void };

export default function ForgotPasswordModal({ onClose }: ForgotPasswordModalProps) {
  const [closing, setClosing] = useState(false);

  function handleClose() {
    setClosing(true);
    setTimeout(onClose, 300);
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className={`modal-overlay${closing ? " modal-overlay--closing" : ""}`} onClick={handleClose} role="dialog" aria-modal="true">
      <div className="modal forgot-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={handleClose} aria-label="Close">
          ✕
        </button>
        <div className="forgot-modal__body">
          <h2 className="forgot-modal__title">Forgot password?</h2>
          <p className="forgot-modal__hint">
            Enter your email and we&apos;ll send you a link to reset your password. (UI only in V0.1 — no email sent yet.)
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleClose();
            }}
            className="auth-modal__form"
          >
            <label className="auth-modal__label">
              Email
              <input type="email" required className="auth-modal__input" placeholder="you@example.com" />
            </label>
            <button type="submit" className="btn-primary auth-modal__submit">
              Send reset link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
