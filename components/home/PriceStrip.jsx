import { C } from "@/lib/theme";

export default function PriceStrip({ directPrice, retailPrice }) {
  const saving = retailPrice - directPrice;
  const items = [
    { label: "Company Direct Price", val: `₹${directPrice.toLocaleString()}`, sub: "per 50kg bag", color: C.goldLight },
    { label: "vs  Retail Market Price", val: `₹${retailPrice.toLocaleString()}`, sub: "approx. per 50kg bag", color: "rgba(255,255,255,.35)", line: true },
    { label: "Your Savings", val: `₹${saving}`, sub: "per bag buying direct", color: "#86efac" },
  ];
  return (
    <div style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenMid})`, padding: "20px 5%", display: "flex", justifyContent: "center", alignItems: "center", gap: 32, flexWrap: "wrap", borderBottom: `3px solid ${C.gold}` }}>
      {items.map((item, i) => (
        <div key={i} style={{ textAlign: "center", color: "white" }}>
          <div style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,.55)", marginBottom: 4 }}>{item.label}</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.9rem", color: item.color, fontWeight: 700, textDecoration: item.line ? "line-through" : "none" }}>{item.val}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)" }}>{item.sub}</div>
        </div>
      ))}
      <div style={{ background: C.gold, color: C.green, padding: "10px 20px", borderRadius: 20, fontWeight: 800, fontSize: 13 }}>💰 Buy Direct &amp; Save!</div>
    </div>
  );
}
