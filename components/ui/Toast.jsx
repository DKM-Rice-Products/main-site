"use client";

import { CheckCircle, XCircle } from "lucide-react";
import { C } from "@/lib/theme";

export default function Toast({ toasts }) {
  return (
    <div style={{ position: "fixed", top: 76, right: 16, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
      {toasts.map((t) => (
        <div
          key={t.id}
          style={{
            background: t.type === "error" ? C.red : t.type === "warn" ? C.amber : C.green,
            color: "white", padding: "12px 18px", borderRadius: 10,
            fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8,
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)", animation: "slideIn .3s ease",
            minWidth: 220, maxWidth: 320,
          }}
        >
          {t.type === "error" ? <XCircle size={16} /> : <CheckCircle size={16} />}
          {t.msg}
        </div>
      ))}
    </div>
  );
}
