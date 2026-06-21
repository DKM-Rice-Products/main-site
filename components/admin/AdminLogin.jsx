"use client";

import { useState } from "react";
import { LogIn, AlertCircle } from "lucide-react";
import { C, inputStyle } from "@/lib/theme";
import Field from "@/components/ui/Field";

// NOTE: demo-only client-side gate. Replace with real server-side auth
// (e.g. NextAuth, signed cookies, middleware) before production use.
const DEMO_USER = "admin";
const DEMO_PASS = "rice2025";

export default function AdminLogin({ onLogin }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState(false);

  const handle = () => {
    if (u === DEMO_USER && p === DEMO_PASS) onLogin();
    else setErr(true);
  };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg,${C.green},${C.greenDeep})`, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: C.white, borderRadius: 20, padding: 40, maxWidth: 380, width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🌾</div>
        <h2 style={{ fontFamily: "var(--font-display)", color: C.green, marginBottom: 6 }}>Admin Portal</h2>
        <p style={{ fontSize: 13, color: C.textLight, marginBottom: 28 }}>Sri Durai Kannammal Rice Products</p>
        {err && (
          <div style={{ background: "#fee2e2", color: C.red, padding: "10px 16px", borderRadius: 8, fontSize: 13, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <AlertCircle size={14} /> Invalid credentials. Try admin / rice2025
          </div>
        )}
        <Field label="Username">
          <input style={inputStyle} value={u} onChange={(e) => setU(e.target.value)} placeholder="admin" onKeyDown={(e) => e.key === "Enter" && handle()} />
        </Field>
        <Field label="Password">
          <input style={inputStyle} type="password" value={p} onChange={(e) => setP(e.target.value)} placeholder="••••••••" onKeyDown={(e) => e.key === "Enter" && handle()} />
        </Field>
        <button onClick={handle} style={{ width: "100%", background: `linear-gradient(135deg,${C.gold},#a87c2a)`, color: C.white, padding: 14, borderRadius: 12, border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer", marginTop: 8 }}>
          <LogIn size={16} style={{ display: "inline", marginRight: 8, verticalAlign: "middle" }} />
          Sign In
        </button>
        <p style={{ fontSize: 11, color: C.textLight, marginTop: 16 }}>Demo: admin / rice2025</p>
      </div>
    </div>
  );
}
