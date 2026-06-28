"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";
import { C, inputStyle } from "@/lib/theme";
import { purchaseOptions } from "@/data/enquiries";
import { brandWeights } from "@/data/brands";
import Field from "@/components/ui/Field";
import { usePublic } from "@/components/providers/PublicProvider";
import { createEnquiry } from "@/lib/api-client";

const empty = { name: "", email: "", phone: "", location: "", brand: "", size: "", qty: "", type: "direct", note: "" };

export default function EnquiryForm({ brands }) {
  const router = useRouter();
  const { toast } = usePublic();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const selectedBrand = brands.find((b) => b.name === form.brand);
  const sizeOptions = selectedBrand?.weights?.length ? selectedBrand.weights : brandWeights;
  const onBrandChange = (e) => {
    const name = e.target.value;
    const b = brands.find((x) => x.name === name);
    const allowed = b?.weights?.length ? b.weights : brandWeights;
    setForm((p) => ({ ...p, brand: name, size: allowed.includes(p.size) ? p.size : "" }));
  };

  const handle = async () => {
    setSubmitting(true);
    setErrors({});
    try {
      await createEnquiry(form);
      setForm(empty);
      toast("Enquiry submitted! We'll contact you within 2 hours.");
      router.push("/");
    } catch (err) {
      if (err.fields) setErrors(err.fields);
      toast(err.message || "Could not submit enquiry.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ background: C.white, borderRadius: 16, padding: 32, boxShadow: "0 2px 12px rgba(0,0,0,.07)" }}>
      <h3 style={{ fontFamily: "var(--font-display)", color: C.green, fontSize: "1.2rem", marginBottom: 24 }}>Tell Us Your Requirements</h3>
      <div className="grid-2" style={{ gap: 16 }}>
        <Field label="Customer Name" required>
          <input style={inputStyle} value={form.name} onChange={set("name")} placeholder="Your full name" />
          {errors.name && <small style={{ color: C.red }}>{errors.name}</small>}
        </Field>
        <Field label="Mobile Number" required>
          <input style={inputStyle} value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" />
          {errors.phone && <small style={{ color: C.red }}>{errors.phone}</small>}
        </Field>
      </div>
      <Field label="Email Address" required>
        <input type="email" style={inputStyle} value={form.email} onChange={set("email")} placeholder="you@example.com" />
        {errors.email && <small style={{ color: C.red }}>{errors.email}</small>}
      </Field>
      <Field label="Location / District" required>
        <input style={inputStyle} value={form.location} onChange={set("location")} placeholder="Your city or district" />
        {errors.location && <small style={{ color: C.red }}>{errors.location}</small>}
      </Field>
      <div className="grid-2" style={{ gap: 16 }}>
        <Field label="Rice Brand Interested In">
          <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }} value={form.brand} onChange={onBrandChange}>
            <option value="">-- Select brand --</option>
            {brands.map((b) => (
              <option key={b.id} value={b.name}>
                {b.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Pack Size">
          <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }} value={form.size} onChange={set("size")}>
            <option value="">-- Select size --</option>
            {sizeOptions.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Quantity Required">
        <input style={inputStyle} value={form.qty} onChange={set("qty")} placeholder="e.g. 10 bags" />
      </Field>
      <Field label="Purchase Preference" required>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {purchaseOptions.map((t) => (
            <label
              key={t.val}
              style={{
                display: "flex", alignItems: "flex-start", gap: 12,
                background: form.type === t.val ? C.greenPale : C.cream,
                border: `1.5px solid ${form.type === t.val ? C.greenMid : "#e8e8e8"}`,
                borderRadius: 10, padding: "12px 14px", cursor: "pointer", transition: "all .2s",
              }}
            >
              <input type="radio" name="type" value={t.val} checked={form.type === t.val} onChange={set("type")} style={{ marginTop: 2, accentColor: C.greenMid }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{t.icon} {t.label}</div>
                <div style={{ fontSize: 12, color: C.textLight }}>{t.sub}</div>
              </div>
            </label>
          ))}
        </div>
      </Field>
      <Field label="Additional Comments">
        <textarea style={{ ...inputStyle, resize: "vertical" }} rows={3} value={form.note} onChange={set("note")} placeholder="Any specific requirements or questions..." />
      </Field>
      <button
        onClick={handle}
        disabled={submitting}
        style={{
          width: "100%", background: `linear-gradient(135deg,${C.greenMid},${C.green})`,
          color: C.white, padding: 15, borderRadius: 12, border: "none", fontWeight: 700,
          fontSize: 15, cursor: submitting ? "wait" : "pointer", opacity: submitting ? 0.7 : 1,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}
      >
        <FileText size={16} /> {submitting ? "Submitting..." : "Submit Enquiry"}
      </button>
    </div>
  );
}
