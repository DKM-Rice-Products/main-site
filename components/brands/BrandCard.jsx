"use client";

import { FileText } from "lucide-react";
import { C, stockMeta } from "@/lib/theme";
import { brandWeights } from "@/data/brands";
import Badge from "@/components/ui/Badge";
import { usePublic } from "@/components/providers/PublicProvider";

export default function BrandCard({ brand, showPrices = true }) {
  const { openEnquiry } = usePublic();
  const s = stockMeta[brand.stock];
  return (
    <div
      style={{
        background: C.white, borderRadius: 16, overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.06)",
        transition: "transform .25s, box-shadow .25s", display: "flex", flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.14)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)";
      }}
    >
      <div style={{ height: 250, background: C.white, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        {/* soft brand glow */}
        <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-58%)", width: 200, height: 200, background: `radial-gradient(circle, ${C.greenPale} 0%, rgba(213,245,240,.35) 45%, transparent 70%)`, pointerEvents: "none" }} />
        {/* grounding shadow that sells the float */}
        <div aria-hidden style={{ position: "absolute", bottom: 26, left: "50%", transform: "translateX(-50%)", width: 130, height: 22, background: "radial-gradient(ellipse, rgba(6,48,45,.30) 0%, transparent 70%)", filter: "blur(3px)", animation: `floatShadow 4s ease-in-out ${(brand.id % 5) * 0.4}s infinite`, pointerEvents: "none" }} />
        <img
          src={brand.image || "/AkastiGold.png"}
          alt={`${brand.name} rice bag`}
          loading="lazy"
          style={{ height: 230, width: "auto", objectFit: "contain", position: "relative", zIndex: 1, filter: "drop-shadow(0 14px 22px rgba(6,48,45,.30))", animation: `floatY 4s ease-in-out ${(brand.id % 5) * 0.4}s infinite` }}
        />
        <div style={{ position: "absolute", top: 10, left: 10, zIndex: 2 }}>
          <Badge label={s.label} color={s.color} bg={s.bg} />
        </div>
      </div>
      <div style={{ padding: "18px 18px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: C.green, marginBottom: 6 }}>{brand.name}</div>
        <Badge label={brand.variety} color={C.greenMid} bg={C.greenPale} />
        <p style={{ fontSize: 12, color: C.textMid, lineHeight: 1.6, margin: "10px 0 12px", flex: 1 }}>{brand.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
          {(brand.weights?.length ? brand.weights : brandWeights).map((w) => (
            <span key={w} style={{ fontSize: 11, fontWeight: 700, color: C.greenMid, background: C.greenPale, borderRadius: 6, padding: "3px 9px" }}>{w}</span>
          ))}
        </div>
        {showPrices ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: C.gold, fontWeight: 700 }}>₹{brand.price.toLocaleString()}</div>
              <div style={{ fontSize: 11, color: C.textLight }}>per bag</div>
            </div>
            <div style={{ fontSize: 11, color: C.textLight, textAlign: "right" }}>
              Retail ~₹{Math.round(brand.price * 1.14).toLocaleString()}
              <br />
              <span style={{ color: C.greenLight, fontWeight: 700 }}>Save ₹{Math.round(brand.price * 0.14)}</span>
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: 12, padding: "10px 12px", borderRadius: 10, background: C.greenPale, color: C.greenMid, fontSize: 12.5, fontWeight: 700, textAlign: "center" }}>
            Price on enquiry
          </div>
        )}
        <button
          onClick={() => openEnquiry(brand)}
          className="btn-anim"
          style={{
            width: "100%", background: `linear-gradient(135deg, ${C.greenMid}, ${C.green})`,
            color: C.white, padding: "11px 0", borderRadius: 10, border: "none",
            fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center", gap: 6, transition: "opacity .2s",
          }}
        >
          <FileText size={14} /> Enquire Now
        </button>
      </div>
    </div>
  );
}
