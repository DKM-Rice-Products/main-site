import { C } from "@/lib/theme";
import { company, stats } from "@/data/company";
import PageHeader from "@/components/ui/PageHeader";

export const metadata = { title: "About Us | Sri Durai Kannammal Rice Products" };

export default function AboutPage() {
  return (
    <div style={{ paddingTop: 64 }}>
      <PageHeader eyebrow="Our Story" title="About Us" />
      <div className="grid-2" style={{ padding: "56px 5%", background: C.cream, gap: 56, alignItems: "start" }}>
        <div>
          <div style={{ color: C.gold, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Established {company.established}</div>
          <h2 style={{ fontFamily: "var(--font-display)", color: C.green, fontSize: "1.9rem", marginBottom: 20 }}>{company.name}</h2>
          <p style={{ color: C.textMid, lineHeight: 1.8, marginBottom: 16 }}>
            For over 25 years, {company.name} has been a trusted name in the rice distribution business across {company.address.state}. What began as a small family mill in {company.address.city}, {company.address.district} district has grown into a full-scale rice processing and distribution operation serving hundreds of households, retailers, hotels, and institutions.
          </p>
          <p style={{ color: C.textMid, lineHeight: 1.8, marginBottom: 24 }}>
            Our modern rice mill — <strong>{company.mill}</strong> — processes paddy using contemporary machinery while maintaining the traditional values of quality and cleanliness. We source paddy directly from farmers, ensuring freshness at every stage from farm to your kitchen.
          </p>
          <div className="grid-2" style={{ gap: 14 }}>
            {stats.map((s) => (
              <div key={s.l} style={{ background: C.white, borderRadius: 10, padding: 16, borderLeft: `3px solid ${C.gold}` }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: C.greenMid }}>{s.n}</div>
                <div style={{ fontSize: 12, color: C.textLight, marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ height: 360, background: `linear-gradient(135deg,${C.greenPale},${C.goldPale})`, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 100 }}>🌾</div>
          <div style={{ background: C.goldPale, borderRadius: 10, padding: 20, marginTop: 18, borderLeft: `4px solid ${C.gold}` }}>
            <h4 style={{ color: C.brown, marginBottom: 8 }}>🏭 Our Mill</h4>
            <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6 }}>{company.mill}, {company.address.city}, {company.address.district} district. Our state-of-the-art facility processes large volumes daily while maintaining consistent quality standards.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
