import { C } from "@/lib/theme";
import { stats } from "@/data/company";

export default function StatsBar() {
  return (
    <div className="grid-4" style={{ position: "relative", background: C.white, padding: "30px 5%", boxShadow: "0 4px 20px rgba(6,48,45,.06)", borderBottom: "1px solid #e8efed" }}>
      {/* slim gold top accent */}
      <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${C.gold}, ${C.goldLight}, ${C.gold}, transparent)` }} />
      {stats.map((s) => (
        <div key={s.l} style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-display)", fontSize: "2.1rem", fontWeight: 700,
              background: `linear-gradient(135deg, ${C.green}, ${C.greenLight})`,
              WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: C.greenMid,
            }}
          >
            {s.n}
          </div>
          <div aria-hidden style={{ width: 22, height: 2, borderRadius: 2, background: C.gold, margin: "8px auto 0", opacity: 0.7 }} />
          <div style={{ fontSize: 12, color: C.textLight, marginTop: 8, letterSpacing: 0.3 }}>{s.l}</div>
        </div>
      ))}
    </div>
  );
}
