import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { C } from "@/lib/theme";
import BrandCard from "@/components/brands/BrandCard";

export default function FeaturedBrands({ brands, showPrices = true }) {
  return (
    <div style={{ background: C.cream, padding: "72px 5%" }}>
      <div style={{ textAlign: "center", marginBottom: 44 }}>
        <div style={{ color: C.gold, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Our Products</div>
        <h2 style={{ fontFamily: "var(--font-display)", color: C.green, fontSize: "clamp(1.7rem,3.4vw,2.2rem)", letterSpacing: "-0.01em", marginBottom: 12 }}>Featured Rice Brands</h2>
        <p style={{ color: C.textMid, maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>Hand-picked varieties our customers reach for again and again.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 22, maxWidth: 1180, margin: "0 auto" }}>
        {brands.slice(0, 4).map((b) => (
          <BrandCard key={b.id} brand={b} showPrices={showPrices} />
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <Link
          href="/brands"
          className="btn-anim"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: C.white, color: C.green, border: `1.5px solid ${C.greenPale}`,
            padding: "12px 26px", borderRadius: 30, fontWeight: 700, fontSize: 14,
            textDecoration: "none", boxShadow: "0 6px 18px rgba(6,48,45,.08)",
          }}
        >
          View All Brands <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
