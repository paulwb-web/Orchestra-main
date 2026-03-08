"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BuyTokensModal from "@/components/BuyTokensModal";

const STYLES = ["Modernism", "Expressionism", "Fauvism", "Surrealism", "Symbolism"] as const;
type Style = (typeof STYLES)[number];

const RATIOS = [
  { value: "landscape_4_3", label: "Landscape 4:3" },
  { value: "portrait_4_3",  label: "Portrait 3:4"  },
  { value: "square_hd",     label: "Square 1:1"    },
] as const;
type Ratio = (typeof RATIOS)[number]["value"];

function ChevronDownIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 9l6 6l6 -6" />
    </svg>
  );
}

function ApertureIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M3.6 15h10.55" />
      <path d="M6.551 4.938l3.26 10.034" />
      <path d="M17.032 4.636l-8.535 6.201" />
      <path d="M20.559 14.51l-8.535 -6.201" />
      <path d="M12.257 20.916l3.261 -10.034" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="generate__spinner" aria-hidden>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  );
}

export default function GeneratePage() {
  const [selectedStyle, setSelectedStyle] = useState<Style>("Modernism");
  const [selectedRatio, setSelectedRatio] = useState<Ratio>("landscape_4_3");
  const [ratioOpen, setRatioOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [tokenBalance, setTokenBalance] = useState<number | null>(null);
  const [showBuyModal, setShowBuyModal] = useState(false);

  const ratioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/user/balance")
      .then((r) => r.json())
      .then((d) => setTokenBalance(d.balance ?? null))
      .catch(() => setTokenBalance(null));

    fetch("/api/user/generations")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d.generations)) {
          setImages(d.generations.map((g: { imageUrl: string }) => g.imageUrl));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ratioRef.current && !ratioRef.current.contains(e.target as Node)) {
        setRatioOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleGenerate() {
    if (!prompt.trim()) return;

    if (tokenBalance !== null && tokenBalance < 1) {
      setShowBuyModal(true);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, style: selectedStyle, imageSize: selectedRatio }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 402) {
          setShowBuyModal(true);
          return;
        }
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setImages((prev) => [...(data.imageUrls ?? [data.imageUrl].filter(Boolean)), ...prev]);
      setTokenBalance(data.remainingTokens);
      window.dispatchEvent(new CustomEvent("tokenSpent", { detail: { balance: data.remainingTokens } }));
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const ratioLabel = RATIOS.find((r) => r.value === selectedRatio)?.label ?? "Landscape 4:3";

  return (
    <>
      <Header />
      <main className="generate__main">

        {/* Left column: controls */}
        <div className="generate__left">
          <h1 className="generate__title">Orchestra · Studio</h1>

          {/* Style toggles */}
          <div className="generate__toggles" role="group" aria-label="Art style">
            {STYLES.map((style) => (
              <button
                key={style}
                type="button"
                className={`generate__toggle${selectedStyle === style ? " generate__toggle--active" : ""}`}
                onClick={() => setSelectedStyle(style)}
              >
                {style}
              </button>
            ))}
          </div>

          <hr className="generate__divider" />

          {/* Prompt + buttons */}
          <div className="generate__form">
            <textarea
              className="generate__textarea"
              placeholder="Describe your scene — a figure in a forest, an empty city street at dusk..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={5}
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleGenerate();
              }}
            />
            <div className="generate__buttons">

              {/* Ratio dropdown */}
              <div className="generate__ratio" ref={ratioRef}>
                <button
                  type="button"
                  className="generate__format btn-ghost"
                  onClick={() => setRatioOpen((o) => !o)}
                  aria-haspopup="listbox"
                  aria-expanded={ratioOpen}
                >
                  <ChevronDownIcon /> {ratioLabel}
                </button>
                {ratioOpen && (
                  <div className="generate__ratio-menu" role="listbox">
                    {RATIOS.map((r) => (
                      <button
                        key={r.value}
                        type="button"
                        role="option"
                        aria-selected={selectedRatio === r.value}
                        className={`generate__ratio-option${selectedRatio === r.value ? " generate__ratio-option--active" : ""}`}
                        onClick={() => { setSelectedRatio(r.value); setRatioOpen(false); }}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                className="btn-primary generate__submit"
                onClick={handleGenerate}
                disabled={isLoading || !prompt.trim()}
              >
                {isLoading ? <><SpinnerIcon /> Generating…</> : <><ApertureIcon /> Generate</>}
              </button>
            </div>
          </div>

          {error && <p className="generate__error">{error}</p>}
        </div>

        {/* Right column: image gallery */}
        <div className="generate__right">
          {images.length === 0 && !isLoading ? (
            <div className="generate__empty">
              <p className="generate__empty-text">Your images will appear here</p>
            </div>
          ) : (
            <div className="generate__grid">
              {isLoading && (
                <div className="generate__grid-placeholder">
                  <p className="generate__loading-text">Creating your {selectedStyle} artwork…</p>
                </div>
              )}
              {images.map((url, i) => (
                <div key={url} className="generate__image-wrap">
                  <Image
                    src={url}
                    alt={`Generated ${selectedStyle} artwork ${i + 1}`}
                    width={1024}
                    height={1024}
                    className="generate__image"
                    unoptimized
                  />
                  <div className="generate__image-overlay">
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={async () => {
                        const blob = await fetch(url).then((r) => r.blob());
                        const a = document.createElement("a");
                        a.href = URL.createObjectURL(blob);
                        a.download = `orchestra-${selectedStyle.toLowerCase()}-${i + 1}.jpg`;
                        a.click();
                        URL.revokeObjectURL(a.href);
                      }}
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
      <Footer />
      {showBuyModal && <BuyTokensModal onClose={() => setShowBuyModal(false)} />}
    </>
  );
}
