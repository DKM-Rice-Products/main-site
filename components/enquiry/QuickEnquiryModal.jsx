"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { C, inputStyle } from "@/lib/theme";
import Modal from "@/components/ui/Modal";
import Field from "@/components/ui/Field";
import { brandWeights } from "@/data/brands";
import { company } from "@/data/company";

const empty = { name: "", phone: "", location: "", size: "", qty: "" };

export default function QuickEnquiryModal({ open, onClose, brand, showPrices = true, onSuccess, onError }) {
  const [form, setForm] = useState(empty);
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handle = () => {
    const message = [
      "Rice product enquiry",
      `Name: ${form.name.trim() || "Not provided"}`,
      `Phone: ${form.phone.trim() || "Not provided"}`,
      form.location && `Location: ${form.location.trim()}`,
      brand?.name && `Brand: ${brand.name}`,
      form.size && `Pack size: ${form.size}`,
      form.qty && `Quantity: ${form.qty}`,
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setForm(empty);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="🌾 Quick Enquiry">
      {brand && (
        <p style={{ fontSize: 13, color: C.textMid, marginBottom: 20, background: C.greenPale, padding: "8px 12px", borderRadius: 8 }}>
          Enquiring about: <strong>{brand.name}</strong> ({brand.variety})
          {showPrices && (
            <>
              {" "}– <strong style={{ color: C.gold }}>₹{brand.price.toLocaleString()}</strong>
            </>
          )}
        </p>
      )}
      <Field label="Your Name" required>
        <input style={inputStyle} value={form.name} onChange={set("name")} placeholder="Full name" />
      </Field>
      <Field label="Mobile Number" required>
        <input style={inputStyle} value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" />
      </Field>
      <Field label="Location">
        <input style={inputStyle} value={form.location} onChange={set("location")} placeholder="City / District" />
      </Field>
      <Field label="Pack Size">
        <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }} value={form.size} onChange={set("size")}>
          <option value="">-- Select size --</option>
          {(brand?.weights?.length ? brand.weights : brandWeights).map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Quantity Required">
        <input style={inputStyle} value={form.qty} onChange={set("qty")} placeholder="e.g. 5 bags" />
      </Field>
      <button
        onClick={handle}
        style={{
          width: "100%", background: `linear-gradient(135deg,${C.greenMid},${C.green})`,
          color: "white", padding: 13, borderRadius: 10, border: "none", fontWeight: 700,
          fontSize: 14, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}
      >
        <Check size={15} /> Continue in WhatsApp
      </button>
    </Modal>
  );
}
