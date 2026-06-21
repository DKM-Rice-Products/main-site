import { C } from "@/lib/theme";
import { stats } from "@/data/company";

export default function StatsBar() {
  return (
    <div className="grid-4" style={{ background: C.white, padding: "28px 5%", boxShadow: "0 2px 8px rgba(0,0,0,.07)", borderBottom: "1px solid #eee" }}>
      {stats.map((s) => (
        <div key={s.l} style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: C.greenMid, fontWeight: 700 }}>{s.n}</div>
          <div style={{ fontSize: 12, color: C.textLight, marginTop: 4 }}>{s.l}</div>
        </div>
      ))}
    </div>
  );
}
