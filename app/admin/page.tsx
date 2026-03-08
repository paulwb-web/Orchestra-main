"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

type Generation = {
  id: string;
  imageUrl: string;
  style: string;
  prompt: string;
  createdAt: string;
};

export default function AdminPage() {
  const [pending, setPending] = useState<Generation[]>([]);
  const [approved, setApproved] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const [queueRes, approvedRes] = await Promise.all([
      fetch("/api/admin/queue").then((r) => r.json()),
      fetch("/api/admin/approved").then((r) => r.json()),
    ]);
    setPending(queueRes.generations ?? []);
    setApproved(approvedRes.generations ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function act(id: string, action: "approve" | "decline" | "remove") {
    await fetch("/api/admin/action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action }),
    });
    await load();
  }

  return (
    <main className="admin">
      <div className="admin__inner">
        <div className="admin__header">
          <h1 className="admin__title">Admin · Orchestra</h1>
          <Link href="/generate" className="btn-primary">Back to Studio</Link>
        </div>

        <section className="admin__section">
          <h2 className="admin__section-title">Pending — last 48h</h2>
          {loading ? (
            <p className="admin__empty">Loading…</p>
          ) : pending.length === 0 ? (
            <p className="admin__empty">No pending images.</p>
          ) : (
            <div className="admin__grid">
              {pending.map((g) => (
                <div key={g.id} className="admin__card">
                  <div className="admin__card-image">
                    <Image src={g.imageUrl} alt={g.prompt} fill style={{ objectFit: "cover" }} unoptimized />
                  </div>
                  <p className="admin__card-meta">{g.style}</p>
                  <p className="admin__card-prompt">{g.prompt}</p>
                  <div className="admin__card-actions">
                    <button type="button" className="btn-ghost admin__btn-accept" onClick={() => act(g.id, "approve")}>Accept</button>
                    <button type="button" className="btn-ghost admin__btn-decline" onClick={() => act(g.id, "decline")}>Decline</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="admin__section">
          <h2 className="admin__section-title">Approved — on inspiration page</h2>
          {loading ? (
            <p className="admin__empty">Loading…</p>
          ) : approved.length === 0 ? (
            <p className="admin__empty">No approved images yet.</p>
          ) : (
            <div className="admin__grid">
              {approved.map((g) => (
                <div key={g.id} className="admin__card">
                  <div className="admin__card-image">
                    <Image src={g.imageUrl} alt={g.prompt} fill style={{ objectFit: "cover" }} unoptimized />
                  </div>
                  <p className="admin__card-meta">{g.style}</p>
                  <p className="admin__card-prompt">{g.prompt}</p>
                  <div className="admin__card-actions">
                    <button type="button" className="btn-ghost admin__btn-decline" onClick={() => act(g.id, "remove")}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
