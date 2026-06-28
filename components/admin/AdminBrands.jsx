"use client";

import { useState } from "react";
import { Plus, Search, Edit3, Trash2, Check, Upload, Sparkles, Loader2, X } from "lucide-react";
import { C, inputStyle, stockMeta } from "@/lib/theme";
import { brandVarieties, brandTags, brandWeights } from "@/data/brands";
import Field from "@/components/ui/Field";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import { createBrand, updateBrand, deleteBrand, uploadImage } from "@/lib/api-client";
import { fileToDataUrl, hasTransparentBackground, removeImageBackground } from "@/lib/image-tools";

const empty = { name: "", variety: "Ponni Rice", tag: "ponni", price: "", stock: "available", emoji: "🌾", weights: ["5kg", "10kg"], image: "", desc: "" };

// Checkerboard so transparency is visible in the preview.
const checkerboard = {
  backgroundColor: "#f7fbfa",
  backgroundImage:
    "linear-gradient(45deg,#e3eeec 25%,transparent 25%),linear-gradient(-45deg,#e3eeec 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#e3eeec 75%),linear-gradient(-45deg,transparent 75%,#e3eeec 75%)",
  backgroundSize: "16px 16px",
  backgroundPosition: "0 0,0 8px,8px -8px,-8px 0",
};

export default function AdminBrands({ brands, onChange, toast }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editBrand, setEditBrand] = useState(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [original, setOriginal] = useState(""); // uploaded image WITH its background (dataUrl)
  const [imgBusy, setImgBusy] = useState("");   // status text shown while processing
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const toggleWeight = (w) =>
    setForm((p) => {
      const has = p.weights.includes(w);
      // keep the chip order consistent with the master list
      const next = brandWeights.filter((x) => (x === w ? !has : p.weights.includes(x)));
      return { ...p, weights: next };
    });

  const resetImage = () => { setOriginal(""); setImgBusy(""); };

  const openAdd = () => { setForm({ ...empty, weights: [...empty.weights] }); setEditBrand(null); resetImage(); setShowAdd(true); };
  const openEdit = (b) => {
    const weights = Array.isArray(b.weights) && b.weights.length ? [...b.weights] : [...brandWeights];
    setForm({ ...b, price: String(b.price), weights, image: b.image || "" });
    setEditBrand(b);
    resetImage();
    setShowAdd(true);
  };

  // Read a file, then auto-cut its background (or keep it if already transparent).
  const onPickFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-picking the same file
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast("Please choose an image file.", "error"); return; }
    let dataUrl;
    try {
      dataUrl = await fileToDataUrl(file);
    } catch (err) {
      toast(err.message || "Could not read the image.", "error");
      return;
    }
    setOriginal(dataUrl);
    try {
      setImgBusy("Checking image…");
      if (await hasTransparentBackground(dataUrl)) {
        setForm((p) => ({ ...p, image: dataUrl }));
        toast("Image already has no background — using it as-is.");
        return;
      }
      setImgBusy("Removing background…");
      const cut = await removeImageBackground(dataUrl);
      setForm((p) => ({ ...p, image: cut }));
    } catch (err) {
      setForm((p) => ({ ...p, image: dataUrl }));
      toast("Couldn't remove the background automatically — kept the original. You can retry.", "error");
    } finally {
      setImgBusy("");
    }
  };

  const reRemoveBg = async () => {
    const src = original || form.image;
    if (!src) return;
    try {
      setImgBusy("Removing background…");
      const cut = await removeImageBackground(src);
      setForm((p) => ({ ...p, image: cut }));
    } catch {
      toast("Background removal failed. Please try again.", "error");
    } finally {
      setImgBusy("");
    }
  };

  const useOriginal = () => original && setForm((p) => ({ ...p, image: original }));
  const clearImage = () => { setForm((p) => ({ ...p, image: "" })); setOriginal(""); };

  const save = async () => {
    if (!form.name || !form.price) return;
    if (!form.weights.length) {
      toast("Select at least one pack size (kg).", "error");
      return;
    }
    if (imgBusy) { toast("Please wait — the image is still processing.", "error"); return; }
    setSaving(true);
    try {
      // A freshly uploaded/processed image is a dataUrl — save it to disk first.
      let image = form.image || "";
      if (image.startsWith("data:")) {
        const res = await uploadImage(image, form.name);
        image = res.url;
      }
      const payload = { ...form, image, price: parseInt(form.price, 10) };
      if (editBrand) {
        await updateBrand(editBrand.id, payload);
        toast("Brand updated successfully!");
      } else {
        await createBrand(payload);
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
                {["#", "Image", "Brand Name", "Variety", "Pack Sizes", "Price", "Stock", "Actions"].map((h) => (
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
                    <td style={{ padding: "8px 16px" }}>
                      <div style={{ width: 40, height: 46, borderRadius: 8, ...checkerboard, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                        <img src={b.image || "/AkastiGold.png"} alt="" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                      </div>
                    </td>
                    <td style={{ padding: "11px 16px" }}><strong>{b.emoji} {b.name}</strong></td>
                    <td style={{ padding: "11px 16px" }}>{b.variety}</td>
                    <td style={{ padding: "11px 16px" }}>
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                        {(b.weights?.length ? b.weights : brandWeights).map((w) => (
                          <span key={w} style={{ fontSize: 11, fontWeight: 700, color: C.greenMid, background: C.greenPale, borderRadius: 6, padding: "2px 7px" }}>{w}</span>
                        ))}
                      </div>
                    </td>
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
        {/* ── Rice bag image: upload + auto background removal + preview ── */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.textDark, marginBottom: 8 }}>Rice Bag Image</div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
            {/* Preview */}
            <div style={{ width: 150, height: 172, borderRadius: 12, border: "1.5px dashed #cde3df", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, ...checkerboard }}>
              {form.image ? (
                <img src={form.image} alt="Rice bag preview" style={{ maxWidth: "92%", maxHeight: "92%", objectFit: "contain", filter: "drop-shadow(0 8px 12px rgba(6,48,45,.22))" }} />
              ) : (
                <div style={{ textAlign: "center", color: C.textLight, fontSize: 12, padding: 10 }}>
                  <Upload size={22} style={{ opacity: 0.6 }} />
                  <div style={{ marginTop: 6 }}>No image yet</div>
                </div>
              )}
              {imgBusy && (
                <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,.82)", backdropFilter: "blur(2px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, color: C.greenMid }}>
                  <Loader2 size={22} style={{ animation: "spin 1s linear infinite" }} />
                  <div style={{ fontSize: 11.5, fontWeight: 700 }}>{imgBusy}</div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div style={{ flex: 1, minWidth: 210, display: "flex", flexDirection: "column", gap: 9 }}>
              <label style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7, background: `linear-gradient(135deg,${C.greenMid},${C.green})`, color: "white", padding: "10px 16px", borderRadius: 9, fontWeight: 700, fontSize: 13, cursor: imgBusy ? "wait" : "pointer", opacity: imgBusy ? 0.7 : 1 }}>
                <Upload size={14} /> {form.image ? "Replace image" : "Upload image"}
                <input type="file" accept="image/png,image/jpeg,image/webp" onChange={onPickFile} disabled={!!imgBusy} style={{ display: "none" }} />
              </label>

              {(original || form.image) && (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button type="button" onClick={reRemoveBg} disabled={!!imgBusy} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 12px", borderRadius: 9, border: `1.5px solid ${C.greenPale}`, background: C.white, color: C.greenMid, fontWeight: 700, fontSize: 12.5, cursor: imgBusy ? "wait" : "pointer" }}>
                    <Sparkles size={13} /> Remove background
                  </button>
                  {original && (
                    <button type="button" onClick={useOriginal} disabled={!!imgBusy} style={{ padding: "8px 12px", borderRadius: 9, border: "1.5px solid #e1e8e6", background: C.white, color: C.textMid, fontWeight: 700, fontSize: 12.5, cursor: "pointer" }}>
                      Use original
                    </button>
                  )}
                  <button type="button" onClick={clearImage} disabled={!!imgBusy} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "8px 12px", borderRadius: 9, border: "1.5px solid #fca5a5", background: "#fff5f5", color: C.red, fontWeight: 700, fontSize: 12.5, cursor: "pointer" }}>
                    <X size={13} /> Remove
                  </button>
                </div>
              )}

              <small style={{ color: C.textLight, lineHeight: 1.5 }}>
                The background is removed automatically so the bag floats on the page.
                Already-transparent PNGs are kept as-is. First run downloads a small AI model.
              </small>
            </div>
          </div>
        </div>

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
          <Field label="Price (₹)" required><input style={inputStyle} type="number" value={form.price} onChange={set("price")} placeholder="1850" /></Field>
          <Field label="Availability">
            <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }} value={form.stock} onChange={set("stock")}>
              <option value="available">Available</option>
              <option value="limited">Limited Stock</option>
              <option value="unavailable">Out of Stock</option>
            </select>
          </Field>
          <div style={{ gridColumn: "1/-1" }}>
            <Field label="Available Pack Sizes (kg)" required>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 2 }}>
                {brandWeights.map((w) => {
                  const active = form.weights.includes(w);
                  return (
                    <button
                      type="button"
                      key={w}
                      onClick={() => toggleWeight(w)}
                      aria-pressed={active}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        padding: "8px 16px", borderRadius: 20, cursor: "pointer", fontSize: 13, fontWeight: 700,
                        border: `1.5px solid ${active ? C.greenMid : "#d7e8e5"}`,
                        background: active ? C.greenPale : C.white,
                        color: active ? C.greenMid : C.textMid, transition: "all .15s",
                      }}
                    >
                      {active && <Check size={13} />} {w}
                    </button>
                  );
                })}
              </div>
              <small style={{ color: C.textLight, display: "block", marginTop: 6 }}>
                Tap to choose which bag sizes this brand is sold in.
              </small>
            </Field>
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <Field label="Description"><textarea style={{ ...inputStyle, resize: "vertical" }} rows={2} value={form.desc} onChange={set("desc")} placeholder="Brief description of quality, aroma, cooking properties..." /></Field>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
          <button onClick={() => setShowAdd(false)} style={{ padding: "10px 18px", border: "1px solid #ddd", borderRadius: 9, background: "white", cursor: "pointer", fontSize: 13 }}>Cancel</button>
          <button onClick={save} disabled={saving || !!imgBusy} style={{ padding: "10px 20px", background: `linear-gradient(135deg,${C.greenMid},${C.green})`, color: "white", border: "none", borderRadius: 9, fontWeight: 700, fontSize: 13, cursor: saving || imgBusy ? "wait" : "pointer", opacity: saving || imgBusy ? 0.7 : 1, display: "flex", alignItems: "center", gap: 6 }}>
            <Check size={14} /> {editBrand ? "Save Changes" : "Add Brand"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
