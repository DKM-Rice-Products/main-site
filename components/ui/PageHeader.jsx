import { C } from "@/lib/theme";

export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <div style={{ position: "relative", background: `linear-gradient(135deg, ${C.green}, ${C.greenDeep})`, padding: "64px 5% 48px", textAlign: "center", overflow: "hidden" }}>
      {/* ambient glows */}
      <div aria-hidden style={{ position: "absolute", top: "-40%", right: "-4%", width: 360, height: 360, background: "radial-gradient(circle, rgba(201,168,76,.16), transparent 62%)", pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "absolute", bottom: "-50%", left: "-4%", width: 360, height: 360, background: "radial-gradient(circle, rgba(45,212,191,.14), transparent 62%)", pointerEvents: "none" }} />
      <div style={{ position: "relative" }}>
        {eyebrow && <div style={{ color: C.goldLight, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>{eyebrow}</div>}
        <h1 style={{ fontFamily: "var(--font-display)", color: "white", fontSize: "clamp(1.9rem,4vw,2.4rem)", letterSpacing: "-0.01em", margin: 0 }}>{title}</h1>
        <div aria-hidden style={{ width: 48, height: 3, borderRadius: 3, background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight})`, margin: "16px auto 0" }} />
        {subtitle && <p style={{ color: "rgba(255,255,255,.7)", marginTop: 16, maxWidth: 520, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>{subtitle}</p>}
      </div>
    </div>
  );
}
