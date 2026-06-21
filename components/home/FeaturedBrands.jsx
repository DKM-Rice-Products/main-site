import { C } from "@/lib/theme";
import BrandCard from "@/components/brands/BrandCard";

export default function FeaturedBrands({ brands }) {
  return (
    <div style={{ background: C.cream, padding: "64px 5%" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ color: C.gold, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Our Products</div>
        <h2 style={{ fontFamily: "var(--font-display)", color: C.green, fontSize: "2rem" }}>Featured Rice Brands</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 22 }}>
        {brands.slice(0, 4).map((b) => (
          <BrandCard key={b.id} brand={b} />
        ))}
      </div>
    </div>
  );
}
