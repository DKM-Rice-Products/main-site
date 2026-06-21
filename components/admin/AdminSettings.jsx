"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { C, inputStyle } from "@/lib/theme";
import Field from "@/components/ui/Field";
import { updateSettings } from "@/lib/api-client";

export default function AdminSettings({ settings, onChange, toast }) {
  const c = settings.company;
  const [company, setCompany] = useState({
    name: c.name,
    phone: c.phone,
    email: c.email,
    whatsapp: c.whatsapp,
    address: `${c.address.city}, ${c.address.district} District, ${c.address.state} – ${c.address.pincode}`,
  });
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => setCompany((p) => ({ ...p, [k]: e.target.value }));

  const save = async () => {
    setSaving(true);
    try {
      await updateSettings({ company: { name: company.name, phone: company.phone, email: company.email, whatsapp: company.whatsapp } });
      toast("Settings saved!");
      await onChange();
    } catch (err) {
      toast(err.message || "Could not save settings.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-display)", color: C.green, fontSize: "1.5rem", marginBottom: 24 }}>Settings</h2>
      <div style={{ background: C.white, borderRadius: 14, padding: 28, boxShadow: "0 2px 10px rgba(0,0,0,.07)", maxWidth: 640 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: C.textDark, marginBottom: 20 }}>Company Information</h3>
        <Field label="Company Name" required><input style={inputStyle} value={company.name} onChange={set("name")} /></Field>
        <div className="grid-2" style={{ gap: 14 }}>
          <Field label="Phone Number"><input style={inputStyle} value={company.phone} onChange={set("phone")} /></Field>
          <Field label="WhatsApp Number"><input style={inputStyle} value={company.whatsapp} onChange={set("whatsapp")} /></Field>
        </div>
        <Field label="Email Address"><input style={inputStyle} value={company.email} onChange={set("email")} /></Field>
        <Field label="Business Address"><textarea style={{ ...inputStyle, resize: "vertical" }} rows={2} value={company.address} onChange={set("address")} /></Field>
        <button onClick={save} disabled={saving} style={{ background: `linear-gradient(135deg,${C.greenMid},${C.green})`, color: "white", padding: "12px 22px", borderRadius: 10, border: "none", fontWeight: 700, fontSize: 14, cursor: saving ? "wait" : "pointer", opacity: saving ? 0.7 : 1, display: "flex", alignItems: "center", gap: 6 }}>
          <Check size={14} /> Save Settings
        </button>
      </div>
    </div>
  );
}
