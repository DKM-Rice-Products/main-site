"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { C, inputStyle } from "@/lib/theme";
import Field from "@/components/ui/Field";
import { updateBrand, updateSettings } from "@/lib/api-client";

export default function AdminPrices({ brands, settings, onChange, toast }) {
  const [localPrices, setLocalPrices] = useState(() => brands.reduce((a, b) => ({ ...a, [b.id]: b.price }), {}));
  const [directPrice, setDirectPrice] = useState(settings.directPrice);
  const [retailPrice, setRetailPrice] = useState(settings.retailPrice);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLocalPrices(brands.reduce((a, b) => ({ ...a, [b.id]: b.price }), {}));
  }, [brands]);

  useEffect(() => {
    setDirectPrice(settings.directPrice);
    setRetailPrice(settings.retailPrice);
  }, [settings]);

  const savePrices = async () => {
    setSaving(true);
    try {
      const changed = brands.filter((b) => parseInt(localPrices[b.id], 10) !== b.price && localPrices[b.id] !== "");
      await Promise.all(changed.map((b) => updateBrand(b.id, { price: parseInt(localPrices[b.id], 10) })));
      toast("All prices saved!");
      await onChange();
    } catch (err) {
      toast(err.message || "Could not save prices.", "error");
    } finally {
      setSaving(false);
    }
  };

  const saveBanner = async () => {
    try {
      await updateSettings({ directPrice: Number(directPrice), retailPrice: Number(retailPrice) });
      toast("Banner updated!");
      await onChange();
    } catch (err) {
      toast(err.message || "Could not update banner.", "error");
    }
  };

  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-display)", color: C.green, fontSize: "1.5rem", marginBottom: 24 }}>Price Management</h2>
      <div className="grid-admin-side">
        <div style={{ background: C.white, borderRadius: 14, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,.07)" }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: C.textDark, marginBottom: 20 }}>Update All Brand Prices</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {brands.map((b) => (
              <div key={b.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: 12, background: C.cream, borderRadius: 10 }}>
                <div style={{ fontSize: 24 }}>{b.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{b.name}</div>
                  <div style={{ fontSize: 11, color: C.textLight }}>{b.variety} · {b.weight}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 13, color: C.textLight }}>₹</span>
                  <input type="number" value={localPrices[b.id] || ""} onChange={(e) => setLocalPrices((p) => ({ ...p, [b.id]: e.target.value }))} style={{ ...inputStyle, width: 100, textAlign: "right", fontWeight: 700, color: C.gold }} />
                </div>
              </div>
            ))}
          </div>
          <button onClick={savePrices} disabled={saving} style={{ marginTop: 20, background: `linear-gradient(135deg,${C.greenMid},${C.green})`, color: "white", padding: "12px 24px", borderRadius: 10, border: "none", fontWeight: 700, fontSize: 14, cursor: saving ? "wait" : "pointer", opacity: saving ? 0.7 : 1, display: "flex", alignItems: "center", gap: 6 }}>
            <Check size={15} /> Save All Prices
          </button>
        </div>

        <div style={{ background: C.white, borderRadius: 14, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,.07)" }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: C.textDark, marginBottom: 20 }}>Price Comparison Banner</h3>
          <Field label="Company Direct Price (₹)">
            <input style={inputStyle} type="number" value={directPrice} onChange={(e) => setDirectPrice(e.target.value)} />
          </Field>
          <Field label="Retail Market Price (₹)">
            <input style={inputStyle} type="number" value={retailPrice} onChange={(e) => setRetailPrice(e.target.value)} />
          </Field>
          <div style={{ background: C.greenPale, borderRadius: 10, padding: 16, marginTop: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.greenMid, marginBottom: 6 }}>Preview</div>
            <div style={{ fontSize: 22, fontFamily: "var(--font-display)", color: C.gold, fontWeight: 700 }}>Save ₹{(Number(retailPrice) - Number(directPrice)).toLocaleString()}</div>
            <div style={{ fontSize: 12, color: C.textMid }}>per bag buying direct vs retail</div>
          </div>
          <button onClick={saveBanner} style={{ marginTop: 16, background: `linear-gradient(135deg,${C.gold},#a87c2a)`, color: "white", padding: "11px 20px", borderRadius: 10, border: "none", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
            Update Banner
          </button>
        </div>
      </div>
    </div>
  );
}
