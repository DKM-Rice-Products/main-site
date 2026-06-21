import { C } from "@/lib/theme";
import { deliveryOptions } from "@/data/company";
import PageHeader from "@/components/ui/PageHeader";

export const metadata = { title: "Delivery & Purchase Options | Sri Durai Kannammal Rice Products" };

const steps = [
  ["📋", "Submit Enquiry", "Fill our form or WhatsApp us with your requirements."],
  ["📞", "We Confirm", "Our team contacts you within 2 hours to confirm pricing."],
  ["🎉", "Receive Order", "Pick up from our mill or receive delivery at your location."],
];

export default function DeliveryPage() {
  return (
    <div style={{ paddingTop: 64 }}>
      <PageHeader
        eyebrow="How It Works"
        title="Delivery & Purchase Options"
        subtitle="Complete flexibility in how you buy and receive your rice."
      />
      <div style={{ background: C.goldPale, padding: "56px 5%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 22, maxWidth: 1100, margin: "0 auto" }}>
          {deliveryOptions.map((o) => (
            <div key={o.title} style={{ background: C.white, borderRadius: 16, padding: 28, boxShadow: "0 2px 10px rgba(0,0,0,.07)", textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 14 }}>{o.icon}</div>
              <h3 style={{ color: C.green, fontSize: "1rem", marginBottom: 10 }}>{o.title}</h3>
              <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6, marginBottom: 12 }}>{o.desc}</p>
              <span style={{ fontSize: 12, color: C[o.tagColor] || C.gold, fontWeight: 700 }}>{o.tag}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 56, textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", color: C.green, fontSize: "1.8rem", marginBottom: 36 }}>Order in 3 Simple Steps</h2>
          <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
            {steps.map(([icon, title, desc], i) => (
              <div key={i} style={{ maxWidth: 200, textAlign: "center" }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: C.greenPale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, margin: "0 auto 14px" }}>{icon}</div>
                <div style={{ fontSize: 11, color: C.gold, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>STEP {i + 1}</div>
                <h3 style={{ color: C.green, marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 13, color: C.textMid }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
