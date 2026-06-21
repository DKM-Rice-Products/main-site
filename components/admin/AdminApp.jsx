"use client";

import { useState, useEffect, useCallback } from "react";
import {
  LayoutDashboard, Package, Inbox, Tag, Settings as SettingsIcon,
  LogOut, Loader2,
} from "lucide-react";
import { C } from "@/lib/theme";
import { company } from "@/data/company";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/ui/Toast";
import { fetchBrands, fetchEnquiries, fetchSettings } from "@/lib/api-client";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import AdminBrands from "./AdminBrands";
import AdminEnquiries from "./AdminEnquiries";
import AdminPrices from "./AdminPrices";
import AdminSettings from "./AdminSettings";

const AUTH_KEY = "rice-admin-auth";

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "brands", label: "Brands", icon: Package },
  { id: "enquiries", label: "Enquiries", icon: Inbox },
  { id: "prices", label: "Prices", icon: Tag },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

export default function AdminApp() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [settings, setSettings] = useState(null);
  const { toasts, push } = useToast();

  useEffect(() => {
    setAuthed(typeof window !== "undefined" && localStorage.getItem(AUTH_KEY) === "1");
    setReady(true);
  }, []);

  const reload = useCallback(async () => {
    try {
      const [b, e, s] = await Promise.all([fetchBrands(), fetchEnquiries(), fetchSettings()]);
      setBrands(b.data);
      setEnquiries(e.data);
      setSettings(s.data);
    } catch {
      push("Failed to load data from the server.", "error");
    } finally {
      setLoading(false);
    }
  }, [push]);

  useEffect(() => {
    if (authed) reload();
  }, [authed, reload]);

  const login = () => {
    localStorage.setItem(AUTH_KEY, "1");
    setAuthed(true);
  };
  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  };

  if (!ready) return null;
  if (!authed) return <AdminLogin onLogin={login} />;

  const newCount = enquiries.filter((e) => e.status === "new").length;

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: C.cream }}>
      <Toast toasts={toasts} />

      {/* Sidebar */}
      <aside style={{ width: 240, background: C.green, color: "white", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh" }}>
        <div style={{ padding: "24px 22px", borderBottom: "1px solid rgba(255,255,255,.12)" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700 }}>{company.shortName} Admin</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)" }}>Management Portal</div>
        </div>
        <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
          {NAV.map(({ id, label, icon: Icon }) => {
            const active = tab === id;
            return (
              <button key={id} onClick={() => setTab(id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, textAlign: "left", background: active ? "rgba(255,255,255,.15)" : "transparent", color: active ? "white" : "rgba(255,255,255,.75)" }}>
                <Icon size={17} />
                <span style={{ flex: 1 }}>{label}</span>
                {id === "enquiries" && newCount > 0 && (
                  <span style={{ background: C.gold, color: "white", fontSize: 11, fontWeight: 700, padding: "1px 7px", borderRadius: 20 }}>{newCount}</span>
                )}
              </button>
            );
          })}
        </nav>
        <div style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,.12)" }}>
          <button onClick={logout} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, background: "rgba(255,255,255,.08)", color: "white" }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "32px 36px", overflowX: "hidden" }}>
        {loading || !settings ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60vh", gap: 14, color: C.textLight }}>
            <Loader2 size={32} style={{ animation: "spin 1s linear infinite" }} />
            <div>Loading data…</div>
          </div>
        ) : (
          <>
            {tab === "dashboard" && <AdminDashboard brands={brands} enquiries={enquiries} />}
            {tab === "brands" && <AdminBrands brands={brands} onChange={reload} toast={push} />}
            {tab === "enquiries" && <AdminEnquiries enquiries={enquiries} onChange={reload} toast={push} />}
            {tab === "prices" && <AdminPrices brands={brands} settings={settings} onChange={reload} toast={push} />}
            {tab === "settings" && <AdminSettings settings={settings} onChange={reload} toast={push} />}
          </>
        )}
      </main>
    </div>
  );
}
