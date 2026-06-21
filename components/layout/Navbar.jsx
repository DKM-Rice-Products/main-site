"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Menu, X } from "lucide-react";
import { C } from "@/lib/theme";
import { company } from "@/data/company";

const navPages = [
  { href: "/", label: "Home" },
  { href: "/brands", label: "Our Brands" },
  { href: "/delivery", label: "Delivery" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: "rgba(11,79,74,.97)", backdropFilter: "blur(12px)",
        height: 64, padding: "0 5%", display: "flex", alignItems: "center",
        justifyContent: "space-between", boxShadow: "0 2px 16px rgba(0,0,0,.2)",
      }}
    >
      <Link href="/" onClick={close} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <img src="/logo.png" alt={company.shortName} width={40} height={40} style={{ width: 40, height: 40, objectFit: "contain" }} />
        <div style={{ color: "white", textAlign: "left" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 15, lineHeight: 1.1 }}>{company.shortName}</div>
          <div style={{ fontSize: 10, color: C.goldLight, letterSpacing: 1.2, textTransform: "uppercase" }}>{company.tagline}</div>
        </div>
      </Link>

      <div className="nav-desktop">
        {navPages.map((p) => {
          const active = pathname === p.href;
          return (
            <Link
              key={p.href}
              href={p.href}
              className={active ? undefined : "nav-link"}
              style={{
                textDecoration: "none",
                color: active ? C.goldLight : "rgba(255,255,255,.8)",
                fontSize: 13, fontWeight: active ? 700 : 500,
                padding: "4px 2px", borderBottom: active ? `2px solid ${C.gold}` : "2px solid transparent",
                transition: "all .2s", whiteSpace: "nowrap",
              }}
            >
              {p.label}
            </Link>
          );
        })}
        <Link
          href="/enquiry"
          className="btn-anim"
          style={{
            background: `linear-gradient(135deg,${C.gold},#a87c2a)`, color: "white",
            padding: "8px 16px", borderRadius: 20, textDecoration: "none",
            fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 6,
          }}
        >
          <FileText size={13} /> Enquire Now
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        className="nav-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
        aria-expanded={open}
        style={{
          background: "rgba(255,255,255,.12)", color: "white", border: "none",
          width: 40, height: 40, borderRadius: 9, cursor: "pointer",
          alignItems: "center", justifyContent: "center",
        }}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile dropdown menu */}
      <div
        className={`nav-mobile${open ? " open" : ""}`}
        style={{
          position: "absolute", top: 64, left: 0, right: 0,
          flexDirection: "column", gap: 4, padding: "12px 5% 18px",
          background: "rgba(11,79,74,.99)", backdropFilter: "blur(12px)",
          boxShadow: "0 12px 24px rgba(0,0,0,.25)",
        }}
      >
        {navPages.map((p) => {
          const active = pathname === p.href;
          return (
            <Link
              key={p.href}
              href={p.href}
              onClick={close}
              style={{
                textDecoration: "none",
                color: active ? C.goldLight : "rgba(255,255,255,.85)",
                fontSize: 15, fontWeight: active ? 700 : 500,
                padding: "12px 6px", borderBottom: "1px solid rgba(255,255,255,.08)",
              }}
            >
              {p.label}
            </Link>
          );
        })}
        <Link
          href="/enquiry"
          onClick={close}
          style={{
            marginTop: 10, background: `linear-gradient(135deg,${C.gold},#a87c2a)`, color: "white",
            padding: "12px 16px", borderRadius: 12, textDecoration: "none", textAlign: "center",
            fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}
        >
          <FileText size={15} /> Enquire Now
        </Link>
      </div>
    </nav>
  );
}
