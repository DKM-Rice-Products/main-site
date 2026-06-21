import { C } from "@/lib/theme";
import { features } from "@/data/company";

export default function WhyChooseUs() {
  return (
    <div style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDeep})`, padding: "64px 5%" }}>
      <div style={{ textAlign: "center", marginBottom: 44 }}>
        <div style={{ color: C.goldLight, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Why Choose Us</div>
        <h2 style={{ fontFamily: "var(--font-display)", color: "white", fontSize: "2rem", marginBottom: 12 }}>Quality You Can Taste in Every Grain</h2>
        <p style={{ color: "rgba(255,255,255,.65)", maxWidth: 480, margin: "0 auto" }}>We combine traditional milling expertise with modern quality controls.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 20 }}>
        {features.map(([icon, title, desc]) => (
          <div key={title} className="hover-lift" style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
            <h3 style={{ color: "white", fontSize: "1rem", marginBottom: 8 }}>{title}</h3>
            <p style={{ color: "rgba(255,255,255,.6)", fontSize: 13, lineHeight: 1.6 }}>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
