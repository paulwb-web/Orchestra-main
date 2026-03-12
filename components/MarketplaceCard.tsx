"use client";

import Image from "next/image";
import { useState } from "react";

type MarketplaceCardProps = {
  generationId: string;
  imageUrl: string;
  prompt: string;
  style: string;
};

function hashId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (Math.imul(31, h) + id.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function getStarRating(id: string): number {
  const steps = [3.5, 4.0, 4.5, 5.0];
  return steps[hashId(id) % steps.length];
}

function FullStar() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#111827" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function HalfStar({ uid }: { uid: string }) {
  const clipId = `half-${uid}`;
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width="12" height="24" />
        </clipPath>
      </defs>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#d1d5db" />
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#111827" clipPath={`url(#${clipId})`} />
    </svg>
  );
}

function EmptyStar() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#d1d5db" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function Stars({ rating, uid }: { rating: number; uid: string }) {
  return (
    <span className="marketplace-card__stars" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => {
        if (rating >= i) return <FullStar key={i} />;
        if (rating >= i - 0.5) return <HalfStar key={i} uid={`${uid}-${i}`} />;
        return <EmptyStar key={i} />;
      })}
    </span>
  );
}

export default function MarketplaceCard({ generationId, imageUrl, prompt, style }: MarketplaceCardProps) {
  const [toast, setToast] = useState(false);
  const rating = getStarRating(generationId);

  function handleAddToCart() {
    if (toast) return;
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  }

  return (
    <div className="marketplace-card">
      <div className="marketplace-card__image-wrap">
        <Image
          src={imageUrl}
          alt={prompt}
          width={400}
          height={400}
          className="marketplace-card__image"
          unoptimized
        />
        <div className="marketplace-card__watermark" aria-hidden />
      </div>
      <div className="marketplace-card__body">
        <p className="marketplace-card__title" title={prompt}>{prompt}</p>
        <div className="marketplace-card__meta">
          <Stars rating={rating} uid={generationId} />
          <span className="marketplace-card__price">€10</span>
        </div>
        <button
          type="button"
          className="marketplace-card__btn"
          onClick={handleAddToCart}
        >
          Buy art
        </button>
        {toast && (
          <p className="marketplace-card__toast">
            Purchasing coming soon — we&apos;re setting up payments.
          </p>
        )}
      </div>
    </div>
  );
}
