import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { listBrands, getSettings } from "@/lib/store";
import { company } from "@/data/company";
import { C } from "@/lib/theme";
import PageHeader from "@/components/ui/PageHeader";
import EnquiryForm from "@/components/enquiry/EnquiryForm";

export const dynamic = "force-dynamic";

export const metadata = { title: "Enquiry | Sri Durai Kannammal Rice Products" };

export default function EnquiryPage() {
  const brands = listBrands();
  const { directPrice, retailPrice } = getSettings();
  const saving = retailPrice - directPrice;

  const contacts = [
    [<Phone key="p" size={18} />, company.phone, "Mon–Sat, 8am–6pm"],
    [<MessageCircle key="w" size={18} />, "WhatsApp Us", "Reply within 1 hour"],
    [<Mail key="m" size={18} />, company.email, "Email us"],
    [<MapPin key="l" size={18} />, `${company.address.city}, ${company.address.district}`, `${company.address.state} – ${company.address.pincode}`],
  ];

  return (
    <div style={{ paddingTop: 64 }}>
      <PageHeader
        eyebrow="Get In Touch"
        title="Customer Enquiry Form"
        subtitle="We respond within 2 hours during business hours."
      />
      <div className="grid-sidebar" style={{ padding: "48px 5%", background: C.cream }}>
        <EnquiryForm brands={brands} />

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: `linear-gradient(135deg,${C.green},${C.greenMid})`, borderRadius: 16, padding: 24, color: C.white }}>
            <div style={{ fontFamily: "var(--font-display)", color: C.goldLight, fontSize: "1.1rem", marginBottom: 16 }}>💰 Price Comparison</div>
            {[["Company Direct", `₹${directPrice.toLocaleString()}`, C.goldLight, false], ["Retail Market", `₹${retailPrice.toLocaleString()}`, "rgba(255,255,255,.45)", true]].map(([l, v, col, strike]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,.7)" }}>{l}</span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: col, textDecoration: strike ? "line-through" : "none" }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: 14, background: C.gold, color: C.green, padding: "10px 14px", borderRadius: 8, fontWeight: 800, fontSize: 13, textAlign: "center" }}>
              Save ₹{saving} per bag buying direct!
            </div>
          </div>

          <div style={{ background: C.white, borderRadius: 16, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,.07)" }}>
            <div style={{ fontFamily: "var(--font-display)", color: C.green, fontSize: "1.1rem", marginBottom: 16 }}>📞 Quick Contact</div>
            {contacts.map(([icon, main, sub], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}>
                <div style={{ color: C.greenMid }}>{icon}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{main}</div>
                  <div style={{ fontSize: 12, color: C.textLight }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
