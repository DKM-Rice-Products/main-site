import { C } from "@/lib/theme";

export default function StatCard({ icon, label, value, sub, accent = C.greenMid, trend }) {
  return (
    <div
      style={{
        background: C.white, borderRadius: 14, padding: "20px 22px",
        borderLeft: `4px solid ${accent}`, boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
        display: "flex", flexDirection: "column", gap: 6,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: `${accent}18`, display: "flex", alignItems: "center", justifyContent: "center", color: accent }}>
          {icon}
        </div>
        {trend && <span style={{ fontSize: 12, color: C.greenLight, fontWeight: 700 }}>↑ {trend}</span>}
      </div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: "1.9rem", fontWeight: 700, color: C.textDark, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, color: C.textLight, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".5px" }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: C.textMid }}>{sub}</div>}
    </div>
  );
}
