import Link from "next/link";
import { FileText, MessageCircle, ShieldCheck, Truck, Award } from "lucide-react";
import { C } from "@/lib/theme";
import { company } from "@/data/company";

const trust = [
  { icon: ShieldCheck, label: "Mill-Direct Quality" },
  { icon: Truck, label: "Pan-Tamil Nadu Delivery" },
  { icon: Award, label: `Trusted Since ${company.established}` },
];

export default function HeroSection() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "94vh",
        background:
          "linear-gradient(115deg, rgba(5,40,38,.94) 0%, rgba(6,48,45,.86) 42%, rgba(11,79,74,.72) 100%), url('https://images.unsplash.com/photo-1568347355280-d33fdf77d42a?w=1800&q=80') center/cover no-repeat",
        display: "flex", alignItems: "center",
        padding: "120px 24px 80px",
        overflow: "hidden",
      }}
    >
      {/* subtle gold corner glow */}
      <div aria-hidden style={{ position: "absolute", top: "-15%", right: "-8%", width: 480, height: 480, background: "radial-gradient(circle, rgba(201,168,76,.22), transparent 60%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1180, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 720 }}>
          <div
            className="anim-fade-up"
            style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              background: "rgba(201,168,76,.12)", border: `1px solid rgba(201,168,76,.55)`,
              color: C.goldLight, padding: "7px 18px", borderRadius: 30,
              fontSize: 11.5, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 28,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.goldLight, display: "inline-block" }} />
            Wholesale &amp; Retail Rice Suppliers
          </div>

          <h1 className="anim-fade-up" style={{ animationDelay: ".1s", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(2.4rem,6.2vw,4.4rem)", color: "white", lineHeight: 1.08, letterSpacing: "-0.02em", marginBottom: 22, textShadow: "0 2px 30px rgba(0,0,0,.45)" }}>
            Premium Rice,
            <br />
            <span style={{ color: C.goldLight, fontStyle: "italic" }}>Direct from Our Mill</span>
          </h1>

          <p className="anim-fade-up" style={{ animationDelay: ".2s", fontSize: "clamp(1rem,1.6vw,1.18rem)", color: "rgba(255,255,255,.82)", lineHeight: 1.75, maxWidth: 560, margin: "0 0 38px" }}>
            Supplying Ponni, Sona Masoori, Nei Kitchadi and Boiled rice to homes, hotels and retailers across Tamil Nadu — at transparent, direct-from-source prices.
          </p>

          <div className="anim-fade-up" style={{ animationDelay: ".3s", display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link href="/enquiry" className="btn-anim" style={{ background: `linear-gradient(135deg, ${C.gold}, #a87c2a)`, color: "white", padding: "15px 30px", borderRadius: 12, fontWeight: 700, fontSize: 14.5, textDecoration: "none", display: "flex", alignItems: "center", gap: 9, boxShadow: "0 8px 26px rgba(201,168,76,.38)" }}>
              <FileText size={17} /> Request a Quote
            </Link>
            <a href={`https://wa.me/${company.whatsapp}?text=Hello!%20I%20am%20interested%20in%20your%20rice%20products.`} target="_blank" rel="noreferrer" className="btn-anim" style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.3)", color: "white", padding: "15px 30px", borderRadius: 12, fontWeight: 700, fontSize: 14.5, textDecoration: "none", display: "flex", alignItems: "center", gap: 9, backdropFilter: "blur(4px)" }}>
              <MessageCircle size={17} /> Talk on WhatsApp
            </a>
          </div>

          <div className="anim-fade-up" style={{ animationDelay: ".4s", display: "flex", gap: 28, flexWrap: "wrap", marginTop: 48, paddingTop: 30, borderTop: "1px solid rgba(255,255,255,.14)" }}>
            {trust.map(({ icon: Icon, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,.88)" }}>
                <Icon size={20} color={C.goldLight} />
                <span style={{ fontSize: 13.5, fontWeight: 600, letterSpacing: 0.2 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
