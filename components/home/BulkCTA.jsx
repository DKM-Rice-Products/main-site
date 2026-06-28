import Link from "next/link";
import { FileText, MessageCircle } from "lucide-react";
import { C } from "@/lib/theme";
import { company } from "@/data/company";

export default function BulkCTA() {
  return (
    <div style={{ background: `linear-gradient(135deg, ${C.greenPale}, #e3f3ef)`, padding: "64px 5%" }}>
      <div
        style={{
          position: "relative", maxWidth: 1000, margin: "0 auto",
          background: `linear-gradient(135deg, ${C.green}, ${C.greenDeep})`,
          borderRadius: 24, padding: "56px 40px", textAlign: "center", overflow: "hidden",
          boxShadow: "0 24px 60px -20px rgba(6,48,45,.5)",
          border: "1px solid rgba(201,168,76,.18)",
        }}
      >
        {/* decorative glows */}
        <div aria-hidden style={{ position: "absolute", top: "-30%", right: "-8%", width: 360, height: 360, background: "radial-gradient(circle, rgba(201,168,76,.22), transparent 62%)", pointerEvents: "none" }} />
        <div aria-hidden style={{ position: "absolute", bottom: "-40%", left: "-6%", width: 360, height: 360, background: "radial-gradient(circle, rgba(45,212,191,.16), transparent 62%)", pointerEvents: "none" }} />

        <div style={{ position: "relative" }}>
          <div style={{ color: C.goldLight, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Special Offer</div>
          <h2 style={{ fontFamily: "var(--font-display)", color: "white", fontSize: "clamp(1.6rem,3.6vw,2.1rem)", marginBottom: 14, letterSpacing: "-0.01em" }}>Bulk Orders? Get Exclusive Pricing!</h2>
          <p style={{ color: "rgba(255,255,255,.72)", maxWidth: 500, margin: "0 auto 30px", lineHeight: 1.7 }}>Hotel, restaurant, caterer or business event? Contact us for bulk discounts and priority delivery.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/enquiry" className="btn-anim" style={{ background: `linear-gradient(135deg,${C.goldLight},${C.gold})`, color: C.green, padding: "14px 28px", borderRadius: 30, fontWeight: 700, fontSize: 14, textDecoration: "none", display: "flex", alignItems: "center", gap: 7, boxShadow: "0 10px 26px rgba(201,168,76,.36)" }}>
              <FileText size={15} /> Get a Bulk Quote
            </Link>
            <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer" className="btn-anim" style={{ background: "#25D366", color: "white", padding: "14px 28px", borderRadius: 30, fontWeight: 700, fontSize: 14, textDecoration: "none", display: "flex", alignItems: "center", gap: 7, boxShadow: "0 10px 26px rgba(37,211,102,.3)" }}>
              <MessageCircle size={15} /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
