"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Menu, X } from "lucide-react";
import { C } from "@/lib/theme";
import { company } from "@/data/company";

const publicPath = process.env.NEXT_PUBLIC_PAGES_CUSTOM_DOMAIN === "true" ? "" : "/main-site";

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
  const [scrolled, setScrolled] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(8,59,55,.92)" : "rgba(11,79,74,.82)",
        backdropFilter: "blur(16px) saturate(140%)",
        WebkitBackdropFilter: "blur(16px) saturate(140%)",
        borderBottom: scrolled
          ? "1px solid rgba(201,168,76,.28)"
          : "1px solid rgba(255,255,255,.06)",
        height: scrolled ? 60 : 64, padding: "0 5%", display: "flex", alignItems: "center",
        justifyContent: "space-between",
        boxShadow: scrolled ? "0 8px 30px rgba(6,48,45,.34)" : "0 2px 16px rgba(0,0,0,.14)",
        transition: "background .3s ease, height .3s ease, box-shadow .3s ease, border-color .3s ease",
      }}
    >
      <Link href="/" onClick={close} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <img src={`${publicPath}/logo.png`} alt={company.shortName} width={40} height={40} style={{ width: 40, height: 40, objectFit: "contain" }} />
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
            background: `linear-gradient(135deg,${C.goldLight},${C.gold})`, color: C.green,
            padding: "9px 18px", borderRadius: 22, textDecoration: "none",
            fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 6,
            boxShadow: "0 6px 18px rgba(201,168,76,.32)",
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
          position: "absolute", top: scrolled ? 60 : 64, left: 0, right: 0,
          flexDirection: "column", gap: 4, padding: "12px 5% 18px",
          background: "rgba(8,59,55,.98)",
          backdropFilter: "blur(16px) saturate(140%)",
          WebkitBackdropFilter: "blur(16px) saturate(140%)",
          borderTop: "1px solid rgba(201,168,76,.2)",
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
            marginTop: 10, background: `linear-gradient(135deg,${C.goldLight},${C.gold})`, color: C.green,
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
