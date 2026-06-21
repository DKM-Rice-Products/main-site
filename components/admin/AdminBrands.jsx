"use client";

import { useState } from "react";
import { Plus, Search, Edit3, Trash2, Check } from "lucide-react";
import { C, inputStyle, stockMeta } from "@/lib/theme";
import { brandVarieties, brandTags, brandWeights } from "@/data/brands";
import Field from "@/components/ui/Field";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import { createBrand, updateBrand, deleteBrand } from "@/lib/api-client";

const empty = { name: "", variety: "Ponni Rice", tag: "ponni", weight: "50kg", price: "", stock: "available", emoji: "🌾", desc: "" };

export default function AdminBrands({ brands, onChange, toast }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editBrand, setEditBrand] = useState(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const openAdd = () => { setForm(empty); setEditBrand(null); setShowAdd(true); };
  const openEdit = (b) => { setForm({ ...b, price: String(b.price) }); setEditBrand(b); setShowAdd(true); };

  const save = async () => {
    if (!form.name || !form.price) return;
    setSaving(true);
    try {
      if (editBrand) {
        await updateBrand(editBrand.id, { ...form, price: parseInt(form.price, 10) });
        toast("Brand updated successfully!");
      } else {
        await createBrand({ ...form, price: parseInt(form.price, 10) });
        toast("New brand added!");
      }
      setShowAdd(false);
      await onChange();
    } catch (err) {
      toast(err.message || "Could not save brand.", "error");
    } finally {
      setSaving(false);
    }
  };

  const del = async (id) => {
    try {
      await deleteBrand(id);
      toast("Brand deleted.", "warn");
      await onChange();
    } catch (err) {
      toast(err.message || "Could not delete brand.", "error");
    }
  };

  const filtered = brands.filter(
    (b) => b.name.toLowerCase().includes(search.toLowerCase()) || b.variety.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
        <h2 style={{ fontFamily: "var(--font-display)", color: C.green, fontSize: "1.5rem" }}>Manage Rice Brands</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ position: "relative" }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: C.textLight }} />
            <input style={{ ...inputStyle, paddingLeft: 30, width: 200 }} value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search brands..." />
          </div>
          <button onClick={openAdd} style={{ background: `linear-gradient(135deg,${C.gold},#a87c2a)`, color: "white", padding: "9px 16px", border: "none", borderRadius: 9, fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <Plus size={15} /> Add Brand
          </button>
        </div>
      </div>

      <div style={{ background: C.white, borderRadius: 14, boxShadow: "0 2px 10px rgba(0,0,0,.07)", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr>
                {["#", "Brand Name", "Variety", "Weight", "Price", "Stock", "Actions"].map((h) => (
                  <th key={h} style={{ background: C.green, color: "white", padding: "12px 16px", textAlign: "left", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.7 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((b, i) => {
                const sm = stockMeta[b.stock];
                return (
                  <tr key={b.id} style={{ borderBottom: "1px solid #f5f5f5" }} onMouseEnter={(e) => (e.currentTarget.style.background = C.cream)} onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                    <td style={{ padding: "11px 16px", color: C.textLight }}>{i + 1}</td>
                    <td style={{ padding: "11px 16px" }}><strong>{b.emoji} {b.name}</strong></td>
                    <td style={{ padding: "11px 16px" }}>{b.variety}</td>
                    <td style={{ padding: "11px 16px" }}>{b.weight}</td>
                    <td style={{ padding: "11px 16px", fontWeight: 700, color: C.gold }}>₹{b.price.toLocaleString()}</td>
                    <td style={{ padding: "11px 16px" }}><Badge label={sm.label} color={sm.color} bg={sm.bg} /></td>
                    <td style={{ padding: "11px 16px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => openEdit(b)} style={{ padding: "5px 12px", border: "1px solid #ddd", borderRadius: 7, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, background: "white" }}>
                          <Edit3 size={12} /> Edit
                        </button>
                        <button onClick={() => del(b.id)} style={{ padding: "5px 12px", border: "1px solid #fca5a5", borderRadius: 7, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, background: "#fff5f5", color: C.red }}>
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title={editBrand ? "Edit Brand" : "Add New Rice Brand"}>
        <div className="grid-2" style={{ gap: 14 }}>
          <Field label="Brand Name" required><input style={inputStyle} value={form.name} onChange={set("name")} placeholder="e.g. Gold Ponni Premium" /></Field>
          <Field label="Emoji Icon"><input style={inputStyle} value={form.emoji} onChange={set("emoji")} placeholder="🌾" /></Field>
          <Field label="Rice Variety" required>
            <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }} value={form.variety} onChange={set("variety")}>
              {brandVarieties.map((v) => <option key={v}>{v}</option>)}
            </select>
          </Field>
          <Field label="Category Tag">
            <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }} value={form.tag} onChange={set("tag")}>
              {brandTags.filter((t) => t !== "all").map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Weight / Pack Size" required>
            <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }} value={form.weight} onChange={set("weight")}>
              {brandWeights.map((w) => <option key={w}>{w}</option>)}
            </select>
          </Field>
          <Field label="Price (₹)" required><input style={inputStyle} type="number" value={form.price} onChange={set("price")} placeholder="1850" /></Field>
          <Field label="Availability">
            <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }} value={form.stock} onChange={set("stock")}>
              <option value="available">Available</option>
              <option value="limited">Limited Stock</option>
              <option value="unavailable">Out of Stock</option>
            </select>
          </Field>
          <div style={{ gridColumn: "1/-1" }}>
            <Field label="Description"><textarea style={{ ...inputStyle, resize: "vertical" }} rows={2} value={form.desc} onChange={set("desc")} placeholder="Brief description of quality, aroma, cooking properties..." /></Field>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
          <button onClick={() => setShowAdd(false)} style={{ padding: "10px 18px", border: "1px solid #ddd", borderRadius: 9, background: "white", cursor: "pointer", fontSize: 13 }}>Cancel</button>
          <button onClick={save} disabled={saving} style={{ padding: "10px 20px", background: `linear-gradient(135deg,${C.greenMid},${C.green})`, color: "white", border: "none", borderRadius: 9, fontWeight: 700, fontSize: 13, cursor: saving ? "wait" : "pointer", opacity: saving ? 0.7 : 1, display: "flex", alignItems: "center", gap: 6 }}>
            <Check size={14} /> {editBrand ? "Save Changes" : "Add Brand"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
