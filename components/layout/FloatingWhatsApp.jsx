import { MessageCircle } from "lucide-react";
import { company } from "@/data/company";

export default function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${company.whatsapp}?text=Hello!%20I%20am%20interested%20in%20your%20rice%20products.`}
      target="_blank"
      rel="noreferrer"
      style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 9000,
        width: 54, height: 54, borderRadius: "50%", background: "#25D366",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37,211,102,.45)", textDecoration: "none",
        animation: "floatY 3s ease-in-out infinite, pulseRing 2.6s ease-out infinite",
      }}
    >
      <MessageCircle size={24} color="white" fill="white" />
    </a>
  );
}
