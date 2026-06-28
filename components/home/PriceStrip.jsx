import { TrendingDown } from "lucide-react";
import { C } from "@/lib/theme";

export default function PriceStrip({ directPrice, retailPrice }) {
  const saving = retailPrice - directPrice;
  const items = [
    { label: "Company Direct Price", val: `₹${directPrice.toLocaleString()}`, sub: "per 50kg bag", color: C.goldLight },
    { label: "vs  Retail Market Price", val: `₹${retailPrice.toLocaleString()}`, sub: "approx. per 50kg bag", color: "rgba(255,255,255,.35)", line: true },
    { label: "Your Savings", val: `₹${saving}`, sub: "per bag buying direct", color: "#86efac" },
  ];
  return (
    <div style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenMid})`, padding: "22px 5%", display: "flex", justifyContent: "center", alignItems: "center", gap: 36, flexWrap: "wrap", borderBottom: `3px solid ${C.gold}` }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {i > 0 && <span aria-hidden style={{ width: 1, height: 40, background: "rgba(255,255,255,.16)" }} />}
          <div style={{ textAlign: "center", color: "white" }}>
            <div style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,.55)", marginBottom: 4 }}>{item.label}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.9rem", color: item.color, fontWeight: 700, textDecoration: item.line ? "line-through" : "none" }}>{item.val}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)" }}>{item.sub}</div>
          </div>
        </div>
      ))}
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg, ${C.goldLight}, ${C.gold})`, color: C.green, padding: "11px 20px", borderRadius: 30, fontWeight: 800, fontSize: 13, boxShadow: "0 8px 22px rgba(201,168,76,.32)" }}>
        <TrendingDown size={16} /> Buy Direct &amp; Save
      </div>
    </div>
  );
}
