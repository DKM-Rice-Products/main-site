"use client";

import { useState } from "react";
import { C } from "@/lib/theme";
import { brandTags } from "@/data/brands";
import BrandCard from "@/components/brands/BrandCard";

export default function BrandsExplorer({ brands }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? brands : brands.filter((b) => b.tag === filter);

  return (
    <>
      <div style={{ background: C.white, padding: "14px 5%", display: "flex", gap: 10, flexWrap: "wrap", boxShadow: "0 2px 8px rgba(0,0,0,.07)", position: "sticky", top: 64, zIndex: 100 }}>
        {brandTags.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            style={{
              padding: "7px 16px", borderRadius: 20, border: `1.5px solid ${filter === t ? C.green : "#ddd"}`,
              background: filter === t ? C.green : C.white, color: filter === t ? C.white : C.textMid,
              fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .2s", textTransform: "capitalize",
            }}
          >
            {t === "all" ? "All Varieties" : t.charAt(0).toUpperCase() + t.slice(1) + " Rice"}
          </button>
        ))}
      </div>
      <div style={{ padding: "40px 5%", background: C.cream }}>
        {filtered.length === 0 ? (
          <p style={{ textAlign: "center", color: C.textLight, padding: "40px 0" }}>No brands found for this filter.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 22 }}>
            {filtered.map((b) => (
              <BrandCard key={b.id} brand={b} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
