import Link from "next/link";
import { FileText, MessageCircle } from "lucide-react";
import { C } from "@/lib/theme";
import { company } from "@/data/company";

export default function BulkCTA() {
  return (
    <div style={{ background: `linear-gradient(135deg, ${C.greenPale}, #e3f3ef)`, padding: "60px 5%", textAlign: "center" }}>
      <div style={{ color: C.gold, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Special Offer</div>
      <h2 style={{ fontFamily: "var(--font-display)", color: C.green, fontSize: "1.9rem", marginBottom: 12 }}>Bulk Orders? Get Exclusive Pricing!</h2>
      <p style={{ color: C.textMid, maxWidth: 480, margin: "0 auto 28px" }}>Hotel, restaurant, caterer or business event? Contact us for bulk discounts and priority delivery.</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <Link href="/enquiry" className="btn-anim" style={{ background: `linear-gradient(135deg,${C.gold},#a87c2a)`, color: "white", padding: "13px 26px", borderRadius: 30, fontWeight: 700, fontSize: 14, textDecoration: "none", display: "flex", alignItems: "center", gap: 7 }}>
          <FileText size={15} /> Get a Bulk Quote
        </Link>
        <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer" className="btn-anim" style={{ background: "#25D366", color: "white", padding: "13px 26px", borderRadius: 30, fontWeight: 700, fontSize: 14, textDecoration: "none", display: "flex", alignItems: "center", gap: 7 }}>
          <MessageCircle size={15} /> WhatsApp Us
        </a>
      </div>
    </div>
  );
}
