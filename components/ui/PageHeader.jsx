import { C } from "@/lib/theme";

export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <div style={{ background: C.green, padding: "56px 5% 40px", textAlign: "center" }}>
      {eyebrow && <div style={{ color: C.goldLight, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{eyebrow}</div>}
      <h1 style={{ fontFamily: "var(--font-display)", color: "white", fontSize: "2.2rem" }}>{title}</h1>
      {subtitle && <p style={{ color: "rgba(255,255,255,.7)", marginTop: 10 }}>{subtitle}</p>}
    </div>
  );
}
