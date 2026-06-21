import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { C } from "@/lib/theme";
import { company } from "@/data/company";

const columns = [
  {
    h: "Quick Links",
    items: [
      ["Home", "/"],
      ["Our Brands", "/brands"],
      ["Delivery", "/delivery"],
      ["About Us", "/about"],
      ["Contact", "/contact"],
    ],
  },
  { h: "Rice Varieties", items: [["Ponni Rice"], ["Basmati Rice"], ["Raw Rice"], ["Boiled Rice"], ["Sona Masuri"]] },
  {
    h: "Contact",
    items: [[`📱 ${company.phone}`], [`📧 ${company.email}`], [`📍 ${company.address.city}, ${company.address.district}`], [`${company.address.state} – ${company.address.pincode}`]],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: C.green, padding: "48px 5% 24px", color: "rgba(255,255,255,.7)" }}>
      <div className="grid-footer" style={{ marginBottom: 40 }}>
        <div>
          <h3 style={{ fontFamily: "var(--font-display)", color: "white", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
            <img src="/logo.png" alt="" width={30} height={30} style={{ objectFit: "contain" }} /> {company.name}
          </h3>
          <p style={{ fontSize: 13, lineHeight: 1.7 }}>Premium quality rice from our mill to your table. Serving Tamil Nadu since {company.established}.</p>
          <a
            href={`https://wa.me/${company.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#25D366", color: "white", padding: "9px 16px", borderRadius: 20, fontSize: 13, fontWeight: 700, textDecoration: "none", marginTop: 14 }}
          >
            <MessageCircle size={14} /> WhatsApp Us
          </a>
        </div>
        {columns.map((col) => (
          <div key={col.h}>
            <h4 style={{ color: C.goldLight, fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>{col.h}</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {col.items.map((item) => (
                <li key={item[0]} style={{ marginBottom: 8 }}>
                  {item[1] ? (
                    <Link href={item[1]} style={{ color: "rgba(255,255,255,.6)", fontSize: 13, textDecoration: "none" }}>{item[0]}</Link>
                  ) : (
                    <span style={{ fontSize: 13 }}>{item[0]}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,.1)", paddingTop: 20, textAlign: "center", fontSize: 12, color: "rgba(255,255,255,.35)" }}>
        © {new Date().getFullYear()} {company.name}. All rights reserved. | {company.address.city}, {company.address.district} District, {company.address.state}
      </div>
    </footer>
  );
}
