"use client";

import { useState } from "react";
import { Download, Search, Eye, Phone, MessageCircle, Trash2 } from "lucide-react";
import { C, inputStyle, statusMeta } from "@/lib/theme";
import { company } from "@/data/company";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import { updateEnquiry, deleteEnquiry } from "@/lib/api-client";

export default function AdminEnquiries({ enquiries, onChange, toast }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [viewEnq, setViewEnq] = useState(null);

  const updateStatus = async (id, status) => {
    try {
      await updateEnquiry(id, { status });
      toast("Status updated!");
      await onChange();
    } catch (err) {
      toast(err.message || "Could not update status.", "error");
    }
  };

  const del = async (id) => {
    try {
      await deleteEnquiry(id);
      toast("Enquiry deleted.", "warn");
      await onChange();
    } catch (err) {
      toast(err.message || "Could not delete enquiry.", "error");
    }
  };

  const exportCSV = () => {
    const headers = ["ID", "Name", "Phone", "Location", "Brand", "Quantity", "Type", "Status", "Note", "Date"];
    const rows = enquiries.map((e) => [e.id, e.name, e.phone, e.location, e.brand, e.qty, e.type, e.status, e.note, e.date]);
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${v || ""}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `enquiries_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    toast("CSV exported!");
  };

  const filtered = enquiries.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.includes(search) ||
      e.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || e.status === statusFilter;
    const matchType = typeFilter === "all" || e.type === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
        <h2 style={{ fontFamily: "var(--font-display)", color: C.green, fontSize: "1.5rem" }}>Customer Enquiries</h2>
        <button onClick={exportCSV} style={{ background: `linear-gradient(135deg,${C.greenMid},${C.green})`, color: "white", padding: "9px 16px", border: "none", borderRadius: 9, fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          <Download size={15} /> Export CSV
        </button>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
        <div style={{ position: "relative" }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: C.textLight }} />
          <input style={{ ...inputStyle, paddingLeft: 30, width: 200 }} value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name / phone / city..." />
        </div>
        <select style={{ ...inputStyle, width: 140, appearance: "none", cursor: "pointer" }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Statuses</option>
          <option value="new">New</option>
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>
        <select style={{ ...inputStyle, width: 150, appearance: "none", cursor: "pointer" }} value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="all">All Types</option>
          <option value="direct">Direct</option>
          <option value="retailer">Retailer</option>
          <option value="home">Home Delivery</option>
          <option value="bulk">Bulk</option>
        </select>
        <div style={{ fontSize: 13, color: C.textLight, alignSelf: "center" }}>
          Showing {filtered.length} of {enquiries.length}
        </div>
      </div>

      <div style={{ background: C.white, borderRadius: 14, boxShadow: "0 2px 10px rgba(0,0,0,.07)", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr>
                {["#", "Name", "Phone", "Location", "Brand", "Qty", "Type", "Date", "Status", "Actions"].map((h) => (
                  <th key={h} style={{ background: C.green, color: "white", padding: "12px 14px", textAlign: "left", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.7 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={10} style={{ padding: "40px", textAlign: "center", color: C.textLight }}>No enquiries match your filters.</td></tr>
              ) : (
                filtered.map((e, i) => {
                  const sm = statusMeta[e.status];
                  return (
                    <tr key={e.id} style={{ borderBottom: "1px solid #f5f5f5" }} onMouseEnter={(el) => (el.currentTarget.style.background = C.cream)} onMouseLeave={(el) => (el.currentTarget.style.background = "")}>
                      <td style={{ padding: "10px 14px", color: C.textLight }}>{i + 1}</td>
                      <td style={{ padding: "10px 14px", fontWeight: 700 }}>{e.name}</td>
                      <td style={{ padding: "10px 14px" }}><a href={`tel:${e.phone}`} style={{ color: C.greenMid, textDecoration: "none" }}>{e.phone}</a></td>
                      <td style={{ padding: "10px 14px" }}>{e.location}</td>
                      <td style={{ padding: "10px 14px", maxWidth: 140 }}><div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.brand || "—"}</div></td>
                      <td style={{ padding: "10px 14px" }}>{e.qty || "—"}</td>
                      <td style={{ padding: "10px 14px", textTransform: "capitalize" }}>{e.type}</td>
                      <td style={{ padding: "10px 14px", color: C.textLight }}>{e.date}</td>
                      <td style={{ padding: "10px 14px" }}>
                        <select value={e.status} onChange={(el) => updateStatus(e.id, el.target.value)} style={{ border: "1px solid #ddd", borderRadius: 7, padding: "4px 8px", fontSize: 12, cursor: "pointer", background: sm.bg, color: sm.color, fontWeight: 700 }}>
                          <option value="new">New</option>
                          <option value="pending">Pending</option>
                          <option value="done">Done</option>
                        </select>
                      </td>
                      <td style={{ padding: "10px 14px" }}>
                        <div style={{ display: "flex", gap: 5 }}>
                          <button onClick={() => setViewEnq(e)} title="View" style={{ padding: "5px 9px", border: "1px solid #ddd", borderRadius: 7, background: "white", cursor: "pointer" }}><Eye size={12} /></button>
                          <a href={`tel:${e.phone}`} title="Call" style={{ padding: "5px 9px", border: "1px solid #d1fae5", borderRadius: 7, background: "#f0fdf4", color: C.greenMid, display: "flex", alignItems: "center" }}><Phone size={12} /></a>
                          <a href={`https://wa.me/${e.phone.replace(/\D/g, "")}?text=Hello ${e.name}, this is ${company.name}.`} target="_blank" rel="noreferrer" title="WhatsApp" style={{ padding: "5px 9px", border: "1px solid #bbf7d0", borderRadius: 7, background: "#dcfce7", color: "#16a34a", display: "flex", alignItems: "center" }}><MessageCircle size={12} /></a>
                          <button onClick={() => del(e.id)} title="Delete" style={{ padding: "5px 9px", border: "1px solid #fca5a5", borderRadius: 7, background: "#fff5f5", color: C.red, cursor: "pointer" }}><Trash2 size={12} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={!!viewEnq} onClose={() => setViewEnq(null)} title="Enquiry Details">
        {viewEnq && (
          <div>
            {[["Customer Name", viewEnq.name], ["Mobile Number", viewEnq.phone], ["Location", viewEnq.location], ["Rice Brand", viewEnq.brand || "—"], ["Quantity", viewEnq.qty || "—"], ["Purchase Type", viewEnq.type], ["Date", viewEnq.date], ["Status", viewEnq.status], ["Note", viewEnq.note || "—"]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", gap: 16, padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}>
                <div style={{ width: 140, fontSize: 12, fontWeight: 700, color: C.textLight, textTransform: "uppercase", letterSpacing: 0.5 }}>{l}</div>
                <div style={{ fontSize: 14, color: C.textDark, textTransform: l === "Purchase Type" ? "capitalize" : "none" }}>{v}</div>
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <a href={`tel:${viewEnq.phone}`} style={{ flex: 1, background: `linear-gradient(135deg,${C.greenMid},${C.green})`, color: "white", padding: "11px 0", borderRadius: 10, textAlign: "center", textDecoration: "none", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Phone size={14} /> Call</a>
              <a href={`https://wa.me/${viewEnq.phone.replace(/\D/g, "")}?text=Hello ${viewEnq.name}`} target="_blank" rel="noreferrer" style={{ flex: 1, background: "#25D366", color: "white", padding: "11px 0", borderRadius: 10, textAlign: "center", textDecoration: "none", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><MessageCircle size={14} /> WhatsApp</a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
