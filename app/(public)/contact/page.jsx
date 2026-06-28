import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { C } from "@/lib/theme";
import { company } from "@/data/company";
import PageHeader from "@/components/ui/PageHeader";

export const metadata = { title: "Contact Us | Sri Durai Kannammal Rice Products" };

export default function ContactPage() {
  const channels = [
    [<Phone key="p" size={20} />, "Phone / Call Us", company.phone, "Mon–Sat, 8:00 AM – 6:00 PM", false],
    [<MessageCircle key="w" size={20} />, "WhatsApp", `wa.me/${company.whatsapp}`, "Reply within 1 hour", true],
    [<Mail key="m" size={20} />, "Email", company.email, "We reply same day", false],
    [<MapPin key="l" size={20} />, "Address", company.mill, `${company.address.city}, ${company.address.district}, ${company.address.state}`, false],
  ];

  return (
    <div style={{ paddingTop: 64 }}>
      <PageHeader eyebrow="Get In Touch" title="Contact Us" />
      <div style={{ padding: "56px 5%", background: C.white, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", color: C.green, fontSize: "1.6rem", marginBottom: 20 }}>Our Location</h2>
          <div style={{ height: 280, background: C.cream, borderRadius: 16, border: "1px solid #e0e0e0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, color: C.textLight }}>
            <div style={{ fontSize: 48 }}>🗺️</div>
            <p style={{ fontWeight: 700, color: C.green }}>{company.address.city}, {company.address.district} District</p>
            <p style={{ fontSize: 13 }}>{company.address.state} – {company.address.pincode}</p>
            <a href={company.mapsUrl} target="_blank" rel="noreferrer" style={{ marginTop: 10, background: C.greenMid, color: "white", padding: "8px 18px", borderRadius: 20, textDecoration: "none", fontSize: 13, fontWeight: 600 }}>
              Open in Google Maps
            </a>
          </div>
        </div>
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", color: C.green, fontSize: "1.6rem", marginBottom: 20 }}>Reach Us Directly</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {channels.map(([icon, title, main, sub, wa], i) => (
              <div key={i} style={{ background: C.cream, borderRadius: 12, padding: 18, display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: `linear-gradient(135deg,${C.greenMid},${C.green})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.textLight, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{title}</div>
                  {wa ? (
                    <a href={`https://${main}`} target="_blank" rel="noreferrer" style={{ color: C.greenMid, fontWeight: 700, textDecoration: "none", fontSize: 14 }}>💬 Chat on WhatsApp</a>
                  ) : (
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{main}</div>
                  )}
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
