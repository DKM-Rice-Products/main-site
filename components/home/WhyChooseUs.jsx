import { C } from "@/lib/theme";
import { features } from "@/data/company";

export default function WhyChooseUs() {
  return (
    <div style={{ position: "relative", background: `linear-gradient(135deg, ${C.green}, ${C.greenDeep})`, padding: "72px 5%", overflow: "hidden" }}>
      {/* ambient glow */}
      <div aria-hidden style={{ position: "absolute", top: "-10%", right: "-6%", width: 420, height: 420, background: "radial-gradient(circle, rgba(201,168,76,.14), transparent 62%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", textAlign: "center", marginBottom: 48 }}>
        <div style={{ color: C.goldLight, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Why Choose Us</div>
        <h2 style={{ fontFamily: "var(--font-display)", color: "white", fontSize: "clamp(1.7rem,3.4vw,2.2rem)", marginBottom: 12, letterSpacing: "-0.01em" }}>Quality You Can Taste in Every Grain</h2>
        <p style={{ color: "rgba(255,255,255,.65)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>We combine traditional milling expertise with modern quality controls.</p>
      </div>
      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 18, maxWidth: 1180, margin: "0 auto" }}>
        {features.map(([icon, title, desc]) => (
          <div
            key={title}
            className="hover-lift"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,.09), rgba(255,255,255,.04))",
              border: "1px solid rgba(255,255,255,.12)",
              borderRadius: 16, padding: 26, backdropFilter: "blur(4px)",
            }}
          >
            <div
              style={{
                width: 52, height: 52, borderRadius: 14, marginBottom: 16,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 26, background: "rgba(201,168,76,.16)",
                border: "1px solid rgba(201,168,76,.32)",
              }}
            >
              {icon}
            </div>
            <h3 style={{ color: "white", fontSize: "1.02rem", marginBottom: 8, marginTop: 0 }}>{title}</h3>
            <p style={{ color: "rgba(255,255,255,.6)", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
