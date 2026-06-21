"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import {
  ShoppingBag, Phone, Mail, MapPin, MessageCircle, Star,
  TrendingUp, Package, Users, DollarSign, Plus, Trash2, Edit3,
  Download, Search, Filter, ChevronDown, X, Check, AlertCircle,
  Home, Grid, FileText, Truck, Info, LogIn, LogOut, Menu,
  BarChart2, Eye, Upload, RefreshCw, Bell, Settings, ArrowRight,
  Wheat, ChevronRight, Clock, CheckCircle, XCircle, Inbox
} from "lucide-react";

// ─── PALETTE & TOKENS ───────────────────────────────────────────────────────
const C = {
  green:      "#1a4a2e",
  greenMid:   "#2d6a4f",
  greenLight: "#52b788",
  greenPale:  "#d8f3dc",
  gold:       "#c9a84c",
  goldLight:  "#f0d27a",
  goldPale:   "#fdf4dc",
  brown:      "#7c5c3a",
  cream:      "#faf7f0",
  white:      "#ffffff",
  textDark:   "#1a1a1a",
  textMid:    "#4a4a4a",
  textLight:  "#888888",
  red:        "#e53935",
  amber:      "#f59e0b",
};

// ─── INITIAL DATA ─────────────────────────────────────────────────────────
const INITIAL_BRANDS = [
  { id:1, name:"Gold Ponni Premium",    variety:"Ponni Rice",    tag:"ponni",   weight:"50kg", price:1850, stock:"available", emoji:"🌾", desc:"Short-grain Ponni with distinct aroma. Soft, fluffy and perfectly textured for everyday cooking." },
  { id:2, name:"Royal Basmati",         variety:"Basmati Rice",  tag:"basmati", weight:"25kg", price:2200, stock:"available", emoji:"✨", desc:"Long-grain aged Basmati with signature fragrance. Perfect for biriyani and special occasion dishes." },
  { id:3, name:"Nattu Raw Rice",        variety:"Raw Rice",      tag:"raw",     weight:"50kg", price:1650, stock:"available", emoji:"🌿", desc:"Traditional raw rice for everyday use. Nutritious, clean and consistent quality from farm-fresh paddy." },
  { id:4, name:"Sri Idiyappam Boiled",  variety:"Boiled Rice",   tag:"boiled",  weight:"50kg", price:1750, stock:"available", emoji:"🍚", desc:"Parboiled rice retaining more nutrients. Ideal for idli, dosa batter and daily meals." },
  { id:5, name:"Sona Gold Masuri",      variety:"Sona Masuri",   tag:"sona",    weight:"25kg", price:1950, stock:"available", emoji:"⭐", desc:"Lightweight medium-grain with low starch. Aromatic and ideal for all South Indian cooking." },
  { id:6, name:"Durai Special Ponni",   variety:"Ponni Rice",    tag:"ponni",   weight:"25kg", price:975,  stock:"limited",   emoji:"🏆", desc:"Our signature in-house brand Ponni rice, processed for maximum freshness. Consistent quality guaranteed." },
  { id:7, name:"Mill Fresh Idli Rice",  variety:"Idli Rice",     tag:"raw",     weight:"50kg", price:1800, stock:"limited",   emoji:"🫓", desc:"Specially selected rice for perfect idli and dosa batter. Ferments well, fluffy results every time." },
  { id:8, name:"Classic Boiled Rice",   variety:"Boiled Rice",   tag:"boiled",  weight:"10kg", price:380,  stock:"available", emoji:"🍱", desc:"Family-size 10kg pack of quality boiled rice. Ideal for households seeking affordable, nutritious rice." },
];

const INITIAL_ENQUIRIES = [
  { id:1, name:"Rajesh Kumar",    phone:"9876543210", location:"Chennai",        brand:"Gold Ponni Premium",   qty:"10 bags", type:"direct",   status:"new",     note:"Urgent requirement",        date:"2025-06-10" },
  { id:2, name:"Meena Lakshmi",   phone:"9845123456", location:"Vellore",        brand:"Royal Basmati",        qty:"5 bags",  type:"home",      status:"done",    note:"Hotel catering order",      date:"2025-06-11" },
  { id:3, name:"Suresh Babu",     phone:"9988776655", location:"Tiruvannamalai", brand:"Sona Gold Masuri",     qty:"20 bags", type:"bulk",      status:"pending", note:"Monthly supply needed",     date:"2025-06-12" },
  { id:4, name:"Anitha Devi",     phone:"9123456789", location:"Arani",          brand:"Nattu Raw Rice",       qty:"2 bags",  type:"retailer",  status:"new",     note:"",                          date:"2025-06-13" },
  { id:5, name:"Mohammed Farook", phone:"9765432109", location:"Salem",          brand:"Durai Special Ponni",  qty:"50 bags", type:"bulk",      status:"pending", note:"Restaurant chain order",    date:"2025-06-14" },
  { id:6, name:"Kavitha S",       phone:"9654321098", location:"Kanchipuram",    brand:"Mill Fresh Idli Rice", qty:"8 bags",  type:"direct",    status:"done",    note:"",                          date:"2025-06-15" },
];

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const ENQUIRY_TREND = MONTHS.map((m,i) => ({ month:m, enquiries: [3,5,4,8,6,11,9,14,12,18,15,22][i] }));
const REVENUE_TREND = MONTHS.map((m,i) => ({ month:m, revenue: [42000,65000,58000,95000,78000,130000,110000,165000,148000,210000,185000,260000][i] }));

// ─── TOAST ────────────────────────────────────────────────────────────────
function Toast({ toasts }) {
  return (
    <div style={{ position:"fixed", top:76, right:16, zIndex:9999, display:"flex", flexDirection:"column", gap:8 }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          background: t.type==="error" ? C.red : t.type==="warn" ? C.amber : C.green,
          color:"white", padding:"12px 18px", borderRadius:10,
          fontSize:13, fontWeight:600, display:"flex", alignItems:"center", gap:8,
          boxShadow:"0 4px 20px rgba(0,0,0,0.2)",
          animation:"slideIn .3s ease",
          minWidth:220, maxWidth:320
        }}>
          {t.type==="error" ? <XCircle size={16}/> : <CheckCircle size={16}/>}
          {t.msg}
        </div>
      ))}
    </div>
  );
}

function useToast() {
  const [toasts, setToasts] = useState([]);
  const push = (msg, type="success") => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3200);
  };
  return { toasts, push };
}

// ─── MODAL ────────────────────────────────────────────────────────────────
function Modal({ open, onClose, title, children, width=540 }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, zIndex:8000,
      background:"rgba(0,0,0,0.5)", backdropFilter:"blur(4px)",
      display:"flex", alignItems:"center", justifyContent:"center", padding:16
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:C.white, borderRadius:16, maxWidth:width, width:"100%",
        padding:28, maxHeight:"90vh", overflowY:"auto",
        animation:"slideUp .3s ease"
      }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <h3 style={{ fontFamily:"Georgia,serif", color:C.green, fontSize:"1.2rem" }}>{title}</h3>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:C.textLight, padding:4 }}>
            <X size={20}/>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── FORM CONTROLS ─────────────────────────────────────────────────────────
const inputStyle = {
  width:"100%", padding:"10px 13px", borderRadius:9,
  border:`1.5px solid #e0e0e0`, fontSize:13,
  fontFamily:"inherit", color:C.textDark,
  background:"#fafafa", outline:"none", boxSizing:"border-box",
};

function Field({ label, required, children }) {
  return (
    <div style={{ marginBottom:16 }}>
      <label style={{ display:"block", fontSize:12, fontWeight:700, color:C.textDark, marginBottom:6, textTransform:"uppercase", letterSpacing:".5px" }}>
        {label}{required && <span style={{ color:C.red }}> *</span>}
      </label>
      {children}
    </div>
  );
}

// ─── BADGE ────────────────────────────────────────────────────────────────
function Badge({ label, color="#1a4a2e", bg="#d8f3dc" }) {
  return (
    <span style={{ background:bg, color, padding:"3px 10px", borderRadius:10, fontSize:11, fontWeight:700, whiteSpace:"nowrap" }}>
      {label}
    </span>
  );
}

const statusMeta = {
  new:     { label:"New",     color:C.green,  bg:C.greenPale },
  pending: { label:"Pending", color:"#92400e", bg:"#fef3c7" },
  done:    { label:"Done",    color:"#5b21b6", bg:"#ede9fe" },
};
const stockMeta = {
  available:   { label:"In Stock",      color:C.green,  bg:C.greenPale },
  limited:     { label:"Limited",       color:"#92400e", bg:"#fef3c7" },
  unavailable: { label:"Out of Stock",  color:C.red,    bg:"#fee2e2" },
};

// ─── STAT CARD ────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub, accent=C.greenMid, trend }) {
  return (
    <div style={{
      background:C.white, borderRadius:14, padding:"20px 22px",
      borderLeft:`4px solid ${accent}`, boxShadow:"0 2px 10px rgba(0,0,0,0.07)",
      display:"flex", flexDirection:"column", gap:6
    }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ width:40, height:40, borderRadius:10, background:`${accent}18`, display:"flex", alignItems:"center", justifyContent:"center", color:accent }}>
          {icon}
        </div>
        {trend && <span style={{ fontSize:12, color:C.greenLight, fontWeight:700 }}>↑ {trend}</span>}
      </div>
      <div style={{ fontFamily:"Georgia,serif", fontSize:"1.9rem", fontWeight:700, color:C.textDark, lineHeight:1 }}>{value}</div>
      <div style={{ fontSize:12, color:C.textLight, fontWeight:600, textTransform:"uppercase", letterSpacing:".5px" }}>{label}</div>
      {sub && <div style={{ fontSize:12, color:C.textMid }}>{sub}</div>}
    </div>
  );
}

// ─── BRAND CARD (public) ──────────────────────────────────────────────────
function BrandCard({ brand, onEnquire }) {
  const s = stockMeta[brand.stock];
  return (
    <div style={{
      background:C.white, borderRadius:16, overflow:"hidden",
      boxShadow:"0 2px 12px rgba(0,0,0,0.08)",
      border:"1px solid rgba(0,0,0,0.06)",
      transition:"transform .25s, box-shadow .25s",
      display:"flex", flexDirection:"column"
    }}
    onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow="0 10px 30px rgba(0,0,0,0.14)"; }}
    onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,0.08)"; }}
    >
      {/* Image area */}
      <div style={{
        height:170, background:`linear-gradient(135deg, ${C.greenPale}, ${C.goldPale})`,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:72, position:"relative"
      }}>
        {brand.emoji}
        <div style={{ position:"absolute", top:10, left:10 }}>
          <Badge label={s.label} color={s.color} bg={s.bg}/>
        </div>
        <div style={{ position:"absolute", top:10, right:10, background:C.gold, color:C.green, padding:"3px 10px", borderRadius:10, fontSize:11, fontWeight:700 }}>
          {brand.weight}
        </div>
      </div>
      <div style={{ padding:"18px 18px 20px", flex:1, display:"flex", flexDirection:"column" }}>
        <div style={{ fontFamily:"Georgia,serif", fontSize:"1.1rem", color:C.green, marginBottom:6 }}>{brand.name}</div>
        <Badge label={brand.variety} color={C.greenMid} bg={C.greenPale}/>
        <p style={{ fontSize:12, color:C.textMid, lineHeight:1.6, margin:"10px 0 14px", flex:1 }}>{brand.desc}</p>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
          <div>
            <div style={{ fontFamily:"Georgia,serif", fontSize:"1.4rem", color:C.gold, fontWeight:700 }}>₹{brand.price.toLocaleString()}</div>
            <div style={{ fontSize:11, color:C.textLight }}>per bag</div>
          </div>
          <div style={{ fontSize:11, color:C.textLight, textAlign:"right" }}>
            Retail ~₹{Math.round(brand.price*1.14).toLocaleString()}<br/>
            <span style={{ color:C.greenLight, fontWeight:700 }}>Save ₹{Math.round(brand.price*.14)}</span>
          </div>
        </div>
        <button onClick={()=>onEnquire(brand)} style={{
          width:"100%", background:`linear-gradient(135deg, ${C.greenMid}, ${C.green})`,
          color:C.white, padding:"11px 0", borderRadius:10, border:"none",
          fontWeight:700, fontSize:13, cursor:"pointer", display:"flex",
          alignItems:"center", justifyContent:"center", gap:6, transition:"opacity .2s"
        }}>
          <FileText size={14}/> Enquire Now
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  PUBLIC WEBSITE PAGES
// ══════════════════════════════════════════════════════════════════════════

function HeroSection({ onEnquire }) {
  return (
    <div style={{
      minHeight:"92vh",
      background:"linear-gradient(to bottom, rgba(10,35,15,.82) 0%, rgba(26,74,46,.88) 100%), url('https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1600&q=80') center/cover no-repeat",
      display:"flex", alignItems:"center", justifyContent:"center",
      textAlign:"center", padding:"100px 20px 60px"
    }}>
      <div style={{ maxWidth:720, position:"relative", zIndex:1 }}>
        <div style={{
          display:"inline-flex", alignItems:"center", gap:8,
          background:"rgba(201,168,76,.18)", border:`1px solid ${C.gold}`,
          color:C.goldLight, padding:"6px 18px", borderRadius:20,
          fontSize:11, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", marginBottom:24
        }}>
          🌾 Trusted Rice Distributor Since 1998
        </div>
        <h1 style={{
          fontFamily:"Georgia,serif", fontSize:"clamp(2rem,6vw,3.6rem)",
          color:"white", lineHeight:1.2, marginBottom:18,
          textShadow:"0 2px 20px rgba(0,0,0,.4)"
        }}>
          Premium Quality Rice<br/>
          <span style={{ color:C.goldLight }}>Direct from the Source</span>
        </h1>
        <p style={{ fontSize:"clamp(.95rem,2vw,1.1rem)", color:"rgba(255,255,255,.85)", lineHeight:1.8, marginBottom:36, maxWidth:540, margin:"0 auto 36px" }}>
          Ponni, Basmati, Raw Rice, Boiled Rice and more — at direct mill prices. Save up to ₹250 per bag versus retail.
        </p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={onEnquire} style={{
            background:`linear-gradient(135deg, ${C.gold}, #a87c2a)`, color:"white",
            padding:"14px 28px", borderRadius:30, fontWeight:700, fontSize:14,
            border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:8,
            boxShadow:"0 4px 20px rgba(201,168,76,.4)"
          }}>
            <FileText size={16}/> Place an Enquiry
          </button>
          <a href={`https://wa.me/919876543210?text=Hello!%20I%20am%20interested%20in%20your%20rice%20products.`}
            target="_blank" rel="noreferrer" style={{
            background:"#25D366", color:"white",
            padding:"14px 28px", borderRadius:30, fontWeight:700, fontSize:14,
            border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:8,
            textDecoration:"none"
          }}>
            <MessageCircle size={16}/> WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}

function PriceStrip({ directPrice, retailPrice }) {
  const saving = retailPrice - directPrice;
  return (
    <div style={{
      background:`linear-gradient(135deg, ${C.green}, ${C.greenMid})`,
      padding:"20px 5%", display:"flex", justifyContent:"center",
      alignItems:"center", gap:32, flexWrap:"wrap",
      borderBottom:`3px solid ${C.gold}`
    }}>
      {[
        { label:"Company Direct Price", val:`₹${directPrice.toLocaleString()}`, sub:"per 50kg bag", color:C.goldLight },
        { label:"vs  Retail Market Price", val:`₹${retailPrice.toLocaleString()}`, sub:"approx. per 50kg bag", color:"rgba(255,255,255,.35)", line:true },
        { label:"Your Savings", val:`₹${saving}`, sub:"per bag buying direct", color:"#86efac" },
      ].map((item,i) => (
        <div key={i} style={{ textAlign:"center", color:"white" }}>
          <div style={{ fontSize:11, letterSpacing:1, textTransform:"uppercase", color:"rgba(255,255,255,.55)", marginBottom:4 }}>{item.label}</div>
          <div style={{ fontFamily:"Georgia,serif", fontSize:"1.9rem", color:item.color, fontWeight:700, textDecoration:item.line?"line-through":"none" }}>{item.val}</div>
          <div style={{ fontSize:12, color:"rgba(255,255,255,.6)" }}>{item.sub}</div>
        </div>
      ))}
      <div style={{ background:C.gold, color:C.green, padding:"10px 20px", borderRadius:20, fontWeight:800, fontSize:13 }}>
        💰 Buy Direct & Save!
      </div>
    </div>
  );
}

function StatsBar() {
  const items = [
    { n:"25+", l:"Years Experience" },
    { n:"8",   l:"Rice Varieties" },
    { n:"500+",l:"Happy Customers" },
    { n:"50+", l:"Retailer Partners" },
  ];
  return (
    <div style={{
      background:C.white, display:"grid",
      gridTemplateColumns:"repeat(4,1fr)", padding:"28px 5%",
      boxShadow:"0 2px 8px rgba(0,0,0,.07)", borderBottom:"1px solid #eee"
    }}>
      {items.map(s => (
        <div key={s.l} style={{ textAlign:"center" }}>
          <div style={{ fontFamily:"Georgia,serif", fontSize:"2rem", color:C.greenMid, fontWeight:700 }}>{s.n}</div>
          <div style={{ fontSize:12, color:C.textLight, marginTop:4 }}>{s.l}</div>
        </div>
      ))}
    </div>
  );
}

function HomePage({ brands, directPrice, retailPrice, onEnquire, onBrandEnquire }) {
  return (
    <>
      <HeroSection onEnquire={onEnquire}/>
      <PriceStrip directPrice={directPrice} retailPrice={retailPrice}/>
      <StatsBar/>

      {/* Why choose us */}
      <div style={{ background:`linear-gradient(135deg, ${C.green}, #0f2d1a)`, padding:"64px 5%" }}>
        <div style={{ textAlign:"center", marginBottom:44 }}>
          <div style={{ color:C.goldLight, fontSize:11, fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:8 }}>Why Choose Us</div>
          <h2 style={{ fontFamily:"Georgia,serif", color:"white", fontSize:"2rem", marginBottom:12 }}>Quality You Can Taste in Every Grain</h2>
          <p style={{ color:"rgba(255,255,255,.65)", maxWidth:480, margin:"0 auto" }}>We combine traditional milling expertise with modern quality controls.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:20 }}>
          {[
            ["🏭","Own Mill Processing","Rice processed in our Durai Kannammal Modern Rice Mill — quality controlled at every step."],
            ["💰","Direct Company Prices","Skip middlemen. Save ₹250+ per bag vs retail market price."],
            ["🚚","Flexible Delivery","Home delivery, direct pick-up, or through nearby retailers — your choice."],
            ["⚖️","Accurate Weight","Precision-weighed and sealed. You get exactly what you pay for."],
            ["🌿","Naturally Processed","No artificial additives. Clean, naturally milled rice from quality paddy."],
            ["📦","Bulk Orders Welcome","Hotels, restaurants, events — large orders with special pricing."],
          ].map(([icon,title,desc]) => (
            <div key={title} style={{
              background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.12)",
              borderRadius:14, padding:24, transition:"background .2s"
            }}>
              <div style={{ fontSize:28, marginBottom:12 }}>{icon}</div>
              <h3 style={{ color:"white", fontSize:"1rem", marginBottom:8 }}>{title}</h3>
              <p style={{ color:"rgba(255,255,255,.6)", fontSize:13, lineHeight:1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured brands */}
      <div style={{ background:C.cream, padding:"64px 5%" }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ color:C.gold, fontSize:11, fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:8 }}>Our Products</div>
          <h2 style={{ fontFamily:"Georgia,serif", color:C.green, fontSize:"2rem" }}>Featured Rice Brands</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))", gap:22 }}>
          {brands.slice(0,4).map(b => <BrandCard key={b.id} brand={b} onEnquire={onBrandEnquire}/>)}
        </div>
      </div>

      {/* Bulk CTA */}
      <div style={{ background:`linear-gradient(135deg,${C.goldPale},#fff8e1)`, padding:"60px 5%", textAlign:"center" }}>
        <div style={{ color:C.gold, fontSize:11, fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:10 }}>Special Offer</div>
        <h2 style={{ fontFamily:"Georgia,serif", color:C.green, fontSize:"1.9rem", marginBottom:12 }}>Bulk Orders? Get Exclusive Pricing!</h2>
        <p style={{ color:C.textMid, maxWidth:480, margin:"0 auto 28px" }}>Hotel, restaurant, caterer or business event? Contact us for bulk discounts and priority delivery.</p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={onEnquire} style={{
            background:`linear-gradient(135deg,${C.gold},#a87c2a)`, color:"white",
            padding:"13px 26px", borderRadius:30, fontWeight:700, fontSize:14,
            border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:7
          }}>
            <FileText size={15}/> Get a Bulk Quote
          </button>
          <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" style={{
            background:"#25D366", color:"white", padding:"13px 26px", borderRadius:30,
            fontWeight:700, fontSize:14, textDecoration:"none",
            display:"flex", alignItems:"center", gap:7
          }}>
            <MessageCircle size={15}/> WhatsApp Us
          </a>
        </div>
      </div>
    </>
  );
}

function BrandsPage({ brands, onEnquire }) {
  const [filter, setFilter] = useState("all");
  const tags = ["all","ponni","basmati","raw","boiled","sona"];
  const filtered = filter === "all" ? brands : brands.filter(b => b.tag === filter);
  return (
    <div style={{ paddingTop:64 }}>
      <div style={{ background:C.green, padding:"56px 5% 40px", textAlign:"center" }}>
        <div style={{ color:C.goldLight, fontSize:11, fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:8 }}>Product Catalog</div>
        <h1 style={{ fontFamily:"Georgia,serif", color:"white", fontSize:"2.2rem" }}>Our Rice Brands</h1>
        <p style={{ color:"rgba(255,255,255,.7)", marginTop:10 }}>Premium varieties for household, restaurant, or bulk orders.</p>
      </div>
      {/* Filters */}
      <div style={{ background:C.white, padding:"14px 5%", display:"flex", gap:10, flexWrap:"wrap", boxShadow:"0 2px 8px rgba(0,0,0,.07)", position:"sticky", top:64, zIndex:100 }}>
        {tags.map(t => (
          <button key={t} onClick={()=>setFilter(t)} style={{
            padding:"7px 16px", borderRadius:20, border:`1.5px solid ${filter===t?C.green:"#ddd"}`,
            background:filter===t?C.green:C.white, color:filter===t?C.white:C.textMid,
            fontSize:13, fontWeight:600, cursor:"pointer", transition:"all .2s", textTransform:"capitalize"
          }}>
            {t==="all"?"All Varieties":t.charAt(0).toUpperCase()+t.slice(1)+" Rice"}
          </button>
        ))}
      </div>
      <div style={{ padding:"40px 5%", background:C.cream }}>
        {filtered.length === 0
          ? <p style={{ textAlign:"center", color:C.textLight, padding:"40px 0" }}>No brands found for this filter.</p>
          : <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))", gap:22 }}>
              {filtered.map(b => <BrandCard key={b.id} brand={b} onEnquire={onEnquire}/>)}
            </div>
        }
      </div>
    </div>
  );
}

function EnquiryPage({ brands, onSubmit }) {
  const [form, setForm] = useState({ name:"", phone:"", location:"", brand:"", qty:"", type:"direct", note:"" });
  const set = k => e => setForm(p=>({...p,[k]:e.target.value}));
  const handle = () => {
    if (!form.name || !form.phone || !form.location) return;
    onSubmit(form);
    setForm({ name:"", phone:"", location:"", brand:"", qty:"", type:"direct", note:"" });
  };
  const types = [
    { val:"direct",   icon:"🏭", label:"Direct Company Purchase",   sub:"Pick up from our mill at lowest prices" },
    { val:"retailer", icon:"🏪", label:"Through Nearby Retailer",    sub:"We'll connect you with a partner in your area" },
    { val:"home",     icon:"🏠", label:"Home Delivery",              sub:"We deliver to your doorstep" },
    { val:"bulk",     icon:"📦", label:"Bulk / Business / Hotel",    sub:"Large orders with special pricing" },
  ];
  return (
    <div style={{ paddingTop:64 }}>
      <div style={{ background:C.green, padding:"56px 5% 40px", textAlign:"center" }}>
        <div style={{ color:C.goldLight, fontSize:11, fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:8 }}>Get In Touch</div>
        <h1 style={{ fontFamily:"Georgia,serif", color:"white", fontSize:"2.2rem" }}>Customer Enquiry Form</h1>
        <p style={{ color:"rgba(255,255,255,.7)", marginTop:10 }}>We respond within 2 hours during business hours.</p>
      </div>
      <div style={{ padding:"48px 5%", background:C.cream, display:"grid", gridTemplateColumns:"1fr 400px", gap:48, alignItems:"start" }}>
        {/* Form */}
        <div style={{ background:C.white, borderRadius:16, padding:32, boxShadow:"0 2px 12px rgba(0,0,0,.07)" }}>
          <h3 style={{ fontFamily:"Georgia,serif", color:C.green, fontSize:"1.2rem", marginBottom:24 }}>Tell Us Your Requirements</h3>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <Field label="Customer Name" required>
              <input style={inputStyle} value={form.name} onChange={set("name")} placeholder="Your full name"/>
            </Field>
            <Field label="Mobile Number" required>
              <input style={inputStyle} value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210"/>
            </Field>
          </div>
          <Field label="Location / District" required>
            <input style={inputStyle} value={form.location} onChange={set("location")} placeholder="Your city or district"/>
          </Field>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <Field label="Rice Brand Interested In">
              <select style={{...inputStyle, appearance:"none", cursor:"pointer"}} value={form.brand} onChange={set("brand")}>
                <option value="">-- Select brand --</option>
                {brands.map(b => <option key={b.id} value={b.name}>{b.name} ({b.weight})</option>)}
              </select>
            </Field>
            <Field label="Quantity Required">
              <input style={inputStyle} value={form.qty} onChange={set("qty")} placeholder="e.g. 10 bags of 50kg"/>
            </Field>
          </div>
          <Field label="Purchase Preference" required>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {types.map(t => (
                <label key={t.val} style={{
                  display:"flex", alignItems:"flex-start", gap:12,
                  background:form.type===t.val?C.greenPale:C.cream,
                  border:`1.5px solid ${form.type===t.val?C.greenMid:"#e8e8e8"}`,
                  borderRadius:10, padding:"12px 14px", cursor:"pointer", transition:"all .2s"
                }}>
                  <input type="radio" name="type" value={t.val} checked={form.type===t.val} onChange={set("type")} style={{ marginTop:2, accentColor:C.greenMid }}/>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, marginBottom:2 }}>{t.icon} {t.label}</div>
                    <div style={{ fontSize:12, color:C.textLight }}>{t.sub}</div>
                  </div>
                </label>
              ))}
            </div>
          </Field>
          <Field label="Additional Comments">
            <textarea style={{...inputStyle, resize:"vertical"}} rows={3} value={form.note} onChange={set("note")} placeholder="Any specific requirements or questions..."/>
          </Field>
          <button onClick={handle} style={{
            width:"100%", background:`linear-gradient(135deg,${C.greenMid},${C.green})`,
            color:C.white, padding:15, borderRadius:12, border:"none",
            fontWeight:700, fontSize:15, cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center", gap:8
          }}>
            <FileText size={16}/> Submit Enquiry
          </button>
        </div>

        {/* Info panel */}
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
          {/* Price compare */}
          <div style={{ background:`linear-gradient(135deg,${C.green},${C.greenMid})`, borderRadius:16, padding:24, color:C.white }}>
            <div style={{ fontFamily:"Georgia,serif", color:C.goldLight, fontSize:"1.1rem", marginBottom:16 }}>💰 Price Comparison</div>
            {[["Company Direct","₹1,850",C.goldLight,false],["Retail Market","₹2,100","rgba(255,255,255,.45)",true]].map(([l,v,col,strike])=>(
              <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:"1px solid rgba(255,255,255,.1)" }}>
                <span style={{ fontSize:13, color:"rgba(255,255,255,.7)" }}>{l}</span>
                <span style={{ fontFamily:"Georgia,serif", fontSize:"1.2rem", color:col, textDecoration:strike?"line-through":"none" }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop:14, background:C.gold, color:C.green, padding:"10px 14px", borderRadius:8, fontWeight:800, fontSize:13, textAlign:"center" }}>
              Save ₹250 per bag buying direct!
            </div>
          </div>

          {/* Contact */}
          <div style={{ background:C.white, borderRadius:16, padding:24, boxShadow:"0 2px 10px rgba(0,0,0,.07)" }}>
            <div style={{ fontFamily:"Georgia,serif", color:C.green, fontSize:"1.1rem", marginBottom:16 }}>📞 Quick Contact</div>
            {[
              [<Phone key="phone" size={18}/>, "+91 98765 43210", "Mon–Sat, 8am–6pm"],
              [<MessageCircle key="wa" size={18}/>, "WhatsApp Us", "Reply within 1 hour"],
              [<Mail key="mail" size={18}/>, "info@skriceproducts.com", "Email us"],
              [<MapPin key="map" size={18}/>, "Arani, Tiruvannamalai", "Tamil Nadu – 632 301"],
            ].map(([icon,main,sub],i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:"1px solid #f0f0f0" }}>
                <div style={{ color:C.greenMid }}>{icon}</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:600 }}>{main}</div>
                  <div style={{ fontSize:12, color:C.textLight }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DeliveryPage() {
  const options = [
    { icon:"🏭", title:"Direct Company Purchase", desc:"Visit our mill in Arani and pick up at the lowest direct-from-mill prices. No middlemen, maximum savings.", tag:"Save ₹250+ per bag vs retail", tagColor:C.gold },
    { icon:"🏪", title:"Through Nearby Retailer",  desc:"We supply to verified retailers across Tamil Nadu. Tell us your area and we'll connect you to the nearest partner.", tag:"Retail pricing applies", tagColor:C.textLight },
    { icon:"🚚", title:"Home Delivery",             desc:"Delivery to your home within Tiruvannamalai district and select areas. Minimum order applies for free delivery.", tag:"Check availability", tagColor:C.greenLight },
    { icon:"📦", title:"Bulk / Business Orders",   desc:"Hotels, restaurants, canteens and event caterers can place large orders with dedicated account management.", tag:"Custom pricing for bulk", tagColor:C.gold },
  ];
  return (
    <div style={{ paddingTop:64 }}>
      <div style={{ background:C.green, padding:"56px 5% 40px", textAlign:"center" }}>
        <div style={{ color:C.goldLight, fontSize:11, fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:8 }}>How It Works</div>
        <h1 style={{ fontFamily:"Georgia,serif", color:"white", fontSize:"2.2rem" }}>Delivery & Purchase Options</h1>
        <p style={{ color:"rgba(255,255,255,.7)", marginTop:10 }}>Complete flexibility in how you buy and receive your rice.</p>
      </div>
      <div style={{ background:C.goldPale, padding:"56px 5%" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))", gap:22 }}>
          {options.map(o => (
            <div key={o.title} style={{ background:C.white, borderRadius:16, padding:28, boxShadow:"0 2px 10px rgba(0,0,0,.07)", textAlign:"center" }}>
              <div style={{ fontSize:48, marginBottom:14 }}>{o.icon}</div>
              <h3 style={{ color:C.green, fontSize:"1rem", marginBottom:10 }}>{o.title}</h3>
              <p style={{ fontSize:13, color:C.textMid, lineHeight:1.6, marginBottom:12 }}>{o.desc}</p>
              <span style={{ fontSize:12, color:o.tagColor, fontWeight:700 }}>{o.tag}</span>
            </div>
          ))}
        </div>
        {/* Steps */}
        <div style={{ marginTop:56, textAlign:"center" }}>
          <h2 style={{ fontFamily:"Georgia,serif", color:C.green, fontSize:"1.8rem", marginBottom:36 }}>Order in 3 Simple Steps</h2>
          <div style={{ display:"flex", gap:24, justifyContent:"center", flexWrap:"wrap" }}>
            {[
              ["📋","Submit Enquiry","Fill our form or WhatsApp us with your requirements."],
              ["📞","We Confirm","Our team contacts you within 2 hours to confirm pricing."],
              ["🎉","Receive Order","Pick up from our mill or receive delivery at your location."],
            ].map(([icon,title,desc],i) => (
              <div key={i} style={{ maxWidth:200, textAlign:"center" }}>
                <div style={{ width:60, height:60, borderRadius:"50%", background:C.greenPale, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, margin:"0 auto 14px" }}>{icon}</div>
                <div style={{ fontSize:11, color:C.gold, fontWeight:700, letterSpacing:1, marginBottom:6 }}>STEP {i+1}</div>
                <h3 style={{ color:C.green, marginBottom:8 }}>{title}</h3>
                <p style={{ fontSize:13, color:C.textMid }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div style={{ paddingTop:64 }}>
      <div style={{ background:C.green, padding:"56px 5% 40px", textAlign:"center" }}>
        <div style={{ color:C.goldLight, fontSize:11, fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:8 }}>Our Story</div>
        <h1 style={{ fontFamily:"Georgia,serif", color:"white", fontSize:"2.2rem" }}>About Us</h1>
      </div>
      <div style={{ padding:"56px 5%", background:C.cream, display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"start" }}>
        <div>
          <div style={{ color:C.gold, fontSize:11, fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:8 }}>Established 1998</div>
          <h2 style={{ fontFamily:"Georgia,serif", color:C.green, fontSize:"1.9rem", marginBottom:20 }}>Sri Durai Kannammal Rice Products</h2>
          <p style={{ color:C.textMid, lineHeight:1.8, marginBottom:16 }}>
            For over 25 years, Sri Durai Kannammal Rice Products has been a trusted name in the rice distribution business across Tamil Nadu. What began as a small family mill in Arani, Tiruvannamalai district has grown into a full-scale rice processing and distribution operation serving hundreds of households, retailers, hotels, and institutions.
          </p>
          <p style={{ color:C.textMid, lineHeight:1.8, marginBottom:24 }}>
            Our modern rice mill — <strong>Durai Kannammal Modern Rice Mill</strong> — processes paddy using contemporary machinery while maintaining the traditional values of quality and cleanliness. We source paddy directly from farmers, ensuring freshness at every stage from farm to your kitchen.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            {[["25+","Years in Business"],["8","Rice Varieties"],["500+","Regular Customers"],["50+","Retail Partners"]].map(([n,l])=>(
              <div key={l} style={{ background:C.white, borderRadius:10, padding:16, borderLeft:`3px solid ${C.gold}` }}>
                <div style={{ fontFamily:"Georgia,serif", fontSize:"1.6rem", color:C.greenMid }}>{n}</div>
                <div style={{ fontSize:12, color:C.textLight, marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ height:360, background:`linear-gradient(135deg,${C.greenPale},${C.goldPale})`, borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center", fontSize:100 }}>
            🌾
          </div>
          <div style={{ background:C.goldPale, borderRadius:10, padding:20, marginTop:18, borderLeft:`4px solid ${C.gold}` }}>
            <h4 style={{ color:C.brown, marginBottom:8 }}>🏭 Our Mill</h4>
            <p style={{ fontSize:13, color:C.textMid, lineHeight:1.6 }}>Durai Kannammal Modern Rice Mill, Arani, Tiruvannamalai district. Our state-of-the-art facility processes large volumes daily while maintaining consistent quality standards.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div style={{ paddingTop:64 }}>
      <div style={{ background:C.green, padding:"56px 5% 40px", textAlign:"center" }}>
        <div style={{ color:C.goldLight, fontSize:11, fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:8 }}>Get In Touch</div>
        <h1 style={{ fontFamily:"Georgia,serif", color:"white", fontSize:"2.2rem" }}>Contact Us</h1>
      </div>
      <div style={{ padding:"56px 5%", background:C.white, display:"grid", gridTemplateColumns:"1fr 1fr", gap:56 }}>
        <div>
          <h2 style={{ fontFamily:"Georgia,serif", color:C.green, fontSize:"1.6rem", marginBottom:20 }}>Our Location</h2>
          <div style={{ height:280, background:C.cream, borderRadius:16, border:"1px solid #e0e0e0", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:10, color:C.textLight }}>
            <div style={{ fontSize:48 }}>🗺️</div>
            <p style={{ fontWeight:700, color:C.green }}>Arani, Tiruvannamalai District</p>
            <p style={{ fontSize:13 }}>Tamil Nadu – 632 301</p>
            <a href="https://maps.google.com/?q=Arani,Tiruvannamalai,Tamil+Nadu" target="_blank" rel="noreferrer" style={{ marginTop:10, background:C.greenMid, color:"white", padding:"8px 18px", borderRadius:20, textDecoration:"none", fontSize:13, fontWeight:600 }}>
              Open in Google Maps
            </a>
          </div>
        </div>
        <div>
          <h2 style={{ fontFamily:"Georgia,serif", color:C.green, fontSize:"1.6rem", marginBottom:20 }}>Reach Us Directly</h2>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {[
              [<Phone key="phone" size={20}/>, "Phone / Call Us", "+91 98765 43210", "Mon–Sat, 8:00 AM – 6:00 PM", "#25D366", false],
              [<MessageCircle key="wa" size={20}/>, "WhatsApp", "wa.me/919876543210", "Reply within 1 hour", "#25D366", true],
              [<Mail key="mail" size={20}/>, "Email", "info@skriceproducts.com", "We reply same day", C.greenMid, false],
              [<MapPin key="map" size={20}/>, "Address", "Durai Kannammal Modern Rice Mill", "Arani, Tiruvannamalai, TN", C.brown, false],
            ].map(([icon,title,main,sub,iconColor,wa],i) => (
              <div key={i} style={{ background:C.cream, borderRadius:12, padding:18, display:"flex", alignItems:"center", gap:16 }}>
                <div style={{ width:46, height:46, borderRadius:12, background:`linear-gradient(135deg,${C.greenMid},${C.green})`, display:"flex", alignItems:"center", justifyContent:"center", color:"white", flexShrink:0 }}>{icon}</div>
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:C.textLight, textTransform:"uppercase", letterSpacing:.5, marginBottom:4 }}>{title}</div>
                  {wa ? <a href={`https://${main}`} target="_blank" rel="noreferrer" style={{ color:C.greenMid, fontWeight:700, textDecoration:"none", fontSize:14 }}>💬 Chat on WhatsApp</a>
                      : <div style={{ fontSize:14, fontWeight:600 }}>{main}</div>}
                  <div style={{ fontSize:12, color:C.textLight }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  ADMIN PORTAL
// ══════════════════════════════════════════════════════════════════════════

function AdminLogin({ onLogin }) {
  const [u,setU]=useState(""); const [p,setP]=useState(""); const [err,setErr]=useState(false);
  const handle = () => {
    if (u==="admin" && p==="rice2025") { onLogin(); }
    else setErr(true);
  };
  return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(135deg,${C.green},#0f2d1a)`, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ background:C.white, borderRadius:20, padding:40, maxWidth:380, width:"100%", textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:12 }}>🌾</div>
        <h2 style={{ fontFamily:"Georgia,serif", color:C.green, marginBottom:6 }}>Admin Portal</h2>
        <p style={{ fontSize:13, color:C.textLight, marginBottom:28 }}>Sri Durai Kannammal Rice Products</p>
        {err && <div style={{ background:"#fee2e2", color:C.red, padding:"10px 16px", borderRadius:8, fontSize:13, marginBottom:16, display:"flex", alignItems:"center", gap:8 }}><AlertCircle size={14}/> Invalid credentials. Try admin / rice2025</div>}
        <Field label="Username">
          <input style={inputStyle} value={u} onChange={e=>setU(e.target.value)} placeholder="admin" onKeyDown={e=>e.key==="Enter"&&handle()}/>
        </Field>
        <Field label="Password">
          <input style={inputStyle} type="password" value={p} onChange={e=>setP(e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&handle()}/>
        </Field>
        <button onClick={handle} style={{
          width:"100%", background:`linear-gradient(135deg,${C.gold},#a87c2a)`,
          color:C.white, padding:14, borderRadius:12, border:"none",
          fontWeight:700, fontSize:15, cursor:"pointer", marginTop:8
        }}>
          <LogIn size={16} style={{ display:"inline", marginRight:8, verticalAlign:"middle" }}/>
          Sign In
        </button>
        <p style={{ fontSize:11, color:C.textLight, marginTop:16 }}>Demo: admin / rice2025</p>
      </div>
    </div>
  );
}

// ── Admin Dashboard ────────────────────────────────────────────────────────
function AdminDashboard({ brands, enquiries }) {
  const newCount = enquiries.filter(e=>e.status==="new").length;
  const pendingCount = enquiries.filter(e=>e.status==="pending").length;
  const totalRevEst = enquiries.length * 1850;
  const pieData = [
    { name:"Direct",   value: enquiries.filter(e=>e.type==="direct").length   || 1 },
    { name:"Retailer", value: enquiries.filter(e=>e.type==="retailer").length || 1 },
    { name:"Home",     value: enquiries.filter(e=>e.type==="home").length     || 1 },
    { name:"Bulk",     value: enquiries.filter(e=>e.type==="bulk").length     || 1 },
  ];
  const PIE_COLORS = [C.greenMid, C.gold, C.brown, C.greenLight];
  return (
    <div>
      <h2 style={{ fontFamily:"Georgia,serif", color:C.green, fontSize:"1.5rem", marginBottom:24 }}>Dashboard Overview</h2>
      {/* Stat cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:16, marginBottom:28 }}>
        <StatCard icon={<Package size={20}/>}   label="Active Brands"    value={brands.length}    accent={C.greenMid}   trend="+2 this month"/>
        <StatCard icon={<Inbox size={20}/>}      label="Total Enquiries"  value={enquiries.length} accent={C.gold}       trend="+6 this week"/>
        <StatCard icon={<Bell size={20}/>}       label="New Enquiries"    value={newCount}          accent={C.red}/>
        <StatCard icon={<Clock size={20}/>}      label="Pending"          value={pendingCount}      accent={C.amber}/>
        <StatCard icon={<DollarSign size={20}/>} label="Est. Revenue"     value={`₹${(totalRevEst/1000).toFixed(0)}K`} accent={C.greenLight}/>
        <StatCard icon={<Users size={20}/>}      label="Retailer Partners" value="50+" accent={C.brown}/>
      </div>

      {/* Charts row */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 300px", gap:20, marginBottom:24 }}>
        {/* Enquiry trend */}
        <div style={{ background:C.white, borderRadius:14, padding:22, boxShadow:"0 2px 10px rgba(0,0,0,.07)" }}>
          <h3 style={{ fontSize:14, fontWeight:700, color:C.textDark, marginBottom:18 }}>📈 Enquiries This Year</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={ENQUIRY_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="month" tick={{ fontSize:11 }}/>
              <YAxis tick={{ fontSize:11 }}/>
              <Tooltip/>
              <Line type="monotone" dataKey="enquiries" stroke={C.greenMid} strokeWidth={2.5} dot={{ fill:C.greenMid, r:3 }}/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue trend */}
        <div style={{ background:C.white, borderRadius:14, padding:22, boxShadow:"0 2px 10px rgba(0,0,0,.07)" }}>
          <h3 style={{ fontSize:14, fontWeight:700, color:C.textDark, marginBottom:18 }}>💰 Estimated Revenue (₹)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={REVENUE_TREND.slice(-6)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="month" tick={{ fontSize:11 }}/>
              <YAxis tick={{ fontSize:11 }}/>
              <Tooltip formatter={v=>`₹${v.toLocaleString()}`}/>
              <Bar dataKey="revenue" fill={C.gold} radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Purchase type pie */}
        <div style={{ background:C.white, borderRadius:14, padding:22, boxShadow:"0 2px 10px rgba(0,0,0,.07)" }}>
          <h3 style={{ fontSize:14, fontWeight:700, color:C.textDark, marginBottom:18 }}>🥧 Purchase Type</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={65} dataKey="value" label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} labelLine={false}>
                {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]}/>)}
              </Pie>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent enquiries */}
      <div style={{ background:C.white, borderRadius:14, padding:22, boxShadow:"0 2px 10px rgba(0,0,0,.07)" }}>
        <h3 style={{ fontSize:14, fontWeight:700, color:C.textDark, marginBottom:16 }}>🕐 Recent Enquiries</h3>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
            <thead>
              <tr>{["Name","Phone","Location","Brand","Type","Status"].map(h=>(
                <th key={h} style={{ background:C.green, color:"white", padding:"10px 14px", textAlign:"left", fontSize:11, textTransform:"uppercase", letterSpacing:.7 }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {enquiries.slice(-5).reverse().map(e=>{
                const sm=statusMeta[e.status];
                return <tr key={e.id} style={{ borderBottom:"1px solid #f5f5f5" }}>
                  <td style={{ padding:"10px 14px", fontWeight:600 }}>{e.name}</td>
                  <td style={{ padding:"10px 14px" }}>{e.phone}</td>
                  <td style={{ padding:"10px 14px" }}>{e.location}</td>
                  <td style={{ padding:"10px 14px" }}>{e.brand||"—"}</td>
                  <td style={{ padding:"10px 14px", textTransform:"capitalize" }}>{e.type}</td>
                  <td style={{ padding:"10px 14px" }}><Badge label={sm.label} color={sm.color} bg={sm.bg}/></td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Admin Brands ──────────────────────────────────────────────────────────
function AdminBrands({ brands, setBrands, toast }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editBrand, setEditBrand] = useState(null);
  const [search, setSearch] = useState("");
  const empty = { name:"", variety:"Ponni Rice", tag:"ponni", weight:"50kg", price:"", stock:"available", emoji:"🌾", desc:"" };
  const [form, setForm] = useState(empty);
  const set = k => e => setForm(p=>({...p,[k]:e.target.value}));
  const nextId = useRef(brands.length ? Math.max(...brands.map(b=>b.id))+1 : 1);

  const openAdd = () => { setForm(empty); setEditBrand(null); setShowAdd(true); };
  const openEdit = b => { setForm({...b, price:String(b.price)}); setEditBrand(b); setShowAdd(true); };

  const save = () => {
    if (!form.name || !form.price) return;
    const record = { ...form, price:parseInt(form.price) };
    if (editBrand) {
      setBrands(p => p.map(b => b.id===editBrand.id ? {...record, id:editBrand.id} : b));
      toast("Brand updated successfully!");
    } else {
      setBrands(p => [...p, { ...record, id:nextId.current++ }]);
      toast("New brand added!");
    }
    setShowAdd(false);
  };

  const del = id => {
    setBrands(p => p.filter(b => b.id!==id));
    toast("Brand deleted.", "warn");
  };

  const filtered = brands.filter(b => b.name.toLowerCase().includes(search.toLowerCase()) || b.variety.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22, flexWrap:"wrap", gap:12 }}>
        <h2 style={{ fontFamily:"Georgia,serif", color:C.green, fontSize:"1.5rem" }}>Manage Rice Brands</h2>
        <div style={{ display:"flex", gap:10 }}>
          <div style={{ position:"relative" }}>
            <Search size={14} style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:C.textLight }}/>
            <input style={{...inputStyle, paddingLeft:30, width:200}} value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search brands..."/>
          </div>
          <button onClick={openAdd} style={{ background:`linear-gradient(135deg,${C.gold},#a87c2a)`, color:"white", padding:"9px 16px", border:"none", borderRadius:9, fontWeight:700, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
            <Plus size={15}/> Add Brand
          </button>
        </div>
      </div>

      <div style={{ background:C.white, borderRadius:14, boxShadow:"0 2px 10px rgba(0,0,0,.07)", overflow:"hidden" }}>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
            <thead>
              <tr>{["#","Brand Name","Variety","Weight","Price","Stock","Actions"].map(h=>(
                <th key={h} style={{ background:C.green, color:"white", padding:"12px 16px", textAlign:"left", fontSize:11, textTransform:"uppercase", letterSpacing:.7 }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {filtered.map((b,i)=>{
                const sm=stockMeta[b.stock];
                return <tr key={b.id} style={{ borderBottom:"1px solid #f5f5f5" }}
                  onMouseEnter={e=>e.currentTarget.style.background=C.cream}
                  onMouseLeave={e=>e.currentTarget.style.background=""}>
                  <td style={{ padding:"11px 16px", color:C.textLight }}>{i+1}</td>
                  <td style={{ padding:"11px 16px" }}><strong>{b.emoji} {b.name}</strong></td>
                  <td style={{ padding:"11px 16px" }}>{b.variety}</td>
                  <td style={{ padding:"11px 16px" }}>{b.weight}</td>
                  <td style={{ padding:"11px 16px", fontWeight:700, color:C.gold }}>₹{b.price.toLocaleString()}</td>
                  <td style={{ padding:"11px 16px" }}><Badge label={sm.label} color={sm.color} bg={sm.bg}/></td>
                  <td style={{ padding:"11px 16px" }}>
                    <div style={{ display:"flex", gap:6 }}>
                      <button onClick={()=>openEdit(b)} style={{ padding:"5px 12px", border:`1px solid #ddd`, borderRadius:7, fontSize:12, cursor:"pointer", display:"flex", alignItems:"center", gap:4, background:"white" }}>
                        <Edit3 size={12}/> Edit
                      </button>
                      <button onClick={()=>del(b.id)} style={{ padding:"5px 12px", border:`1px solid #fca5a5`, borderRadius:7, fontSize:12, cursor:"pointer", display:"flex", alignItems:"center", gap:4, background:"#fff5f5", color:C.red }}>
                        <Trash2 size={12}/> Delete
                      </button>
                    </div>
                  </td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={showAdd} onClose={()=>setShowAdd(false)} title={editBrand?"Edit Brand":"Add New Rice Brand"}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          <Field label="Brand Name" required><input style={inputStyle} value={form.name} onChange={set("name")} placeholder="e.g. Gold Ponni Premium"/></Field>
          <Field label="Emoji Icon"><input style={inputStyle} value={form.emoji} onChange={set("emoji")} placeholder="🌾"/></Field>
          <Field label="Rice Variety" required>
            <select style={{...inputStyle,appearance:"none",cursor:"pointer"}} value={form.variety} onChange={set("variety")}>
              {["Ponni Rice","Basmati Rice","Raw Rice","Boiled Rice","Sona Masuri","Idli Rice","Brown Rice","Kolam Rice"].map(v=><option key={v}>{v}</option>)}
            </select>
          </Field>
          <Field label="Category Tag">
            <select style={{...inputStyle,appearance:"none",cursor:"pointer"}} value={form.tag} onChange={set("tag")}>
              {["ponni","basmati","raw","boiled","sona"].map(t=><option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Weight / Pack Size" required>
            <select style={{...inputStyle,appearance:"none",cursor:"pointer"}} value={form.weight} onChange={set("weight")}>
              {["1kg","5kg","10kg","25kg","50kg"].map(w=><option key={w}>{w}</option>)}
            </select>
          </Field>
          <Field label="Price (₹)" required><input style={inputStyle} type="number" value={form.price} onChange={set("price")} placeholder="1850"/></Field>
          <Field label="Availability">
            <select style={{...inputStyle,appearance:"none",cursor:"pointer"}} value={form.stock} onChange={set("stock")}>
              <option value="available">Available</option>
              <option value="limited">Limited Stock</option>
              <option value="unavailable">Out of Stock</option>
            </select>
          </Field>
          <div style={{ gridColumn:"1/-1" }}>
            <Field label="Description"><textarea style={{...inputStyle,resize:"vertical"}} rows={2} value={form.desc} onChange={set("desc")} placeholder="Brief description of quality, aroma, cooking properties..."/></Field>
          </div>
        </div>
        <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:20 }}>
          <button onClick={()=>setShowAdd(false)} style={{ padding:"10px 18px", border:"1px solid #ddd", borderRadius:9, background:"white", cursor:"pointer", fontSize:13 }}>Cancel</button>
          <button onClick={save} style={{ padding:"10px 20px", background:`linear-gradient(135deg,${C.greenMid},${C.green})`, color:"white", border:"none", borderRadius:9, fontWeight:700, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
            <Check size={14}/> {editBrand?"Save Changes":"Add Brand"}
          </button>
        </div>
      </Modal>
    </div>
  );
}

// ── Admin Enquiries ────────────────────────────────────────────────────────
function AdminEnquiries({ enquiries, setEnquiries, toast }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [viewEnq, setViewEnq] = useState(null);

  const updateStatus = (id, status) => {
    setEnquiries(p => p.map(e => e.id===id ? {...e, status} : e));
    toast("Status updated!");
  };

  const del = id => {
    setEnquiries(p => p.filter(e => e.id!==id));
    toast("Enquiry deleted.", "warn");
  };

  const exportCSV = () => {
    const headers = ["ID","Name","Phone","Location","Brand","Quantity","Type","Status","Note","Date"];
    const rows = enquiries.map(e => [e.id,e.name,e.phone,e.location,e.brand,e.qty,e.type,e.status,e.note,e.date]);
    const csv = [headers,...rows].map(r=>r.map(v=>`"${v||""}"`).join(",")).join("\n");
    const blob = new Blob([csv],{type:"text/csv"});
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `enquiries_${new Date().toISOString().slice(0,10)}.csv`; a.click();
    toast("CSV exported!");
  };

  const filtered = enquiries.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.phone.includes(search) || e.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter==="all" || e.status===statusFilter;
    const matchType = typeFilter==="all" || e.type===typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22, flexWrap:"wrap", gap:12 }}>
        <h2 style={{ fontFamily:"Georgia,serif", color:C.green, fontSize:"1.5rem" }}>Customer Enquiries</h2>
        <button onClick={exportCSV} style={{ background:`linear-gradient(135deg,${C.greenMid},${C.green})`, color:"white", padding:"9px 16px", border:"none", borderRadius:9, fontWeight:700, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
          <Download size={15}/> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div style={{ display:"flex", gap:10, marginBottom:18, flexWrap:"wrap" }}>
        <div style={{ position:"relative" }}>
          <Search size={14} style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:C.textLight }}/>
          <input style={{...inputStyle, paddingLeft:30, width:200}} value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name / phone / city..."/>
        </div>
        <select style={{...inputStyle,width:140,appearance:"none",cursor:"pointer"}} value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
          <option value="all">All Statuses</option>
          <option value="new">New</option>
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>
        <select style={{...inputStyle,width:150,appearance:"none",cursor:"pointer"}} value={typeFilter} onChange={e=>setTypeFilter(e.target.value)}>
          <option value="all">All Types</option>
          <option value="direct">Direct</option>
          <option value="retailer">Retailer</option>
          <option value="home">Home Delivery</option>
          <option value="bulk">Bulk</option>
        </select>
        <div style={{ fontSize:13, color:C.textLight, alignSelf:"center" }}>
          Showing {filtered.length} of {enquiries.length}
        </div>
      </div>

      <div style={{ background:C.white, borderRadius:14, boxShadow:"0 2px 10px rgba(0,0,0,.07)", overflow:"hidden" }}>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
            <thead>
              <tr>{["#","Name","Phone","Location","Brand","Qty","Type","Date","Status","Actions"].map(h=>(
                <th key={h} style={{ background:C.green, color:"white", padding:"12px 14px", textAlign:"left", fontSize:11, textTransform:"uppercase", letterSpacing:.7 }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {filtered.length === 0
                ? <tr><td colSpan={10} style={{ padding:"40px", textAlign:"center", color:C.textLight }}>No enquiries match your filters.</td></tr>
                : filtered.map((e,i) => {
                  const sm=statusMeta[e.status];
                  return <tr key={e.id} style={{ borderBottom:"1px solid #f5f5f5" }}
                    onMouseEnter={el=>el.currentTarget.style.background=C.cream}
                    onMouseLeave={el=>el.currentTarget.style.background=""}>
                    <td style={{ padding:"10px 14px", color:C.textLight }}>{i+1}</td>
                    <td style={{ padding:"10px 14px", fontWeight:700 }}>{e.name}</td>
                    <td style={{ padding:"10px 14px" }}><a href={`tel:${e.phone}`} style={{ color:C.greenMid, textDecoration:"none" }}>{e.phone}</a></td>
                    <td style={{ padding:"10px 14px" }}>{e.location}</td>
                    <td style={{ padding:"10px 14px", maxWidth:140 }}><div style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{e.brand||"—"}</div></td>
                    <td style={{ padding:"10px 14px" }}>{e.qty||"—"}</td>
                    <td style={{ padding:"10px 14px", textTransform:"capitalize" }}>{e.type}</td>
                    <td style={{ padding:"10px 14px", color:C.textLight }}>{e.date}</td>
                    <td style={{ padding:"10px 14px" }}>
                      <select value={e.status} onChange={el=>updateStatus(e.id,el.target.value)}
                        style={{ border:"1px solid #ddd", borderRadius:7, padding:"4px 8px", fontSize:12, cursor:"pointer", background:sm.bg, color:sm.color, fontWeight:700 }}>
                        <option value="new">New</option>
                        <option value="pending">Pending</option>
                        <option value="done">Done</option>
                      </select>
                    </td>
                    <td style={{ padding:"10px 14px" }}>
                      <div style={{ display:"flex", gap:5 }}>
                        <button onClick={()=>setViewEnq(e)} title="View" style={{ padding:"5px 9px", border:"1px solid #ddd", borderRadius:7, background:"white", cursor:"pointer" }}><Eye size={12}/></button>
                        <a href={`tel:${e.phone}`} title="Call" style={{ padding:"5px 9px", border:"1px solid #d1fae5", borderRadius:7, background:"#f0fdf4", color:C.greenMid, display:"flex", alignItems:"center" }}><Phone size={12}/></a>
                        <a href={`https://wa.me/${e.phone.replace(/\D/g,"")}?text=Hello ${e.name}, this is Sri Durai Kannammal Rice Products.`} target="_blank" rel="noreferrer" title="WhatsApp" style={{ padding:"5px 9px", border:"1px solid #bbf7d0", borderRadius:7, background:"#dcfce7", color:"#16a34a", display:"flex", alignItems:"center" }}><MessageCircle size={12}/></a>
                        <button onClick={()=>del(e.id)} title="Delete" style={{ padding:"5px 9px", border:"1px solid #fca5a5", borderRadius:7, background:"#fff5f5", color:C.red, cursor:"pointer" }}><Trash2 size={12}/></button>
                      </div>
                    </td>
                  </tr>;
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      <Modal open={!!viewEnq} onClose={()=>setViewEnq(null)} title="Enquiry Details">
        {viewEnq && (
          <div>
            {[["Customer Name",viewEnq.name],["Mobile Number",viewEnq.phone],["Location",viewEnq.location],["Rice Brand",viewEnq.brand||"—"],["Quantity",viewEnq.qty||"—"],["Purchase Type",viewEnq.type],["Date",viewEnq.date],["Status",viewEnq.status],["Note",viewEnq.note||"—"]].map(([l,v])=>(
              <div key={l} style={{ display:"flex", gap:16, padding:"10px 0", borderBottom:"1px solid #f0f0f0" }}>
                <div style={{ width:140, fontSize:12, fontWeight:700, color:C.textLight, textTransform:"uppercase", letterSpacing:.5 }}>{l}</div>
                <div style={{ fontSize:14, color:C.textDark, textTransform:l==="Purchase Type"?"capitalize":"none" }}>{v}</div>
              </div>
            ))}
            <div style={{ display:"flex", gap:10, marginTop:20 }}>
              <a href={`tel:${viewEnq.phone}`} style={{ flex:1, background:`linear-gradient(135deg,${C.greenMid},${C.green})`, color:"white", padding:"11px 0", borderRadius:10, textAlign:"center", textDecoration:"none", fontWeight:700, fontSize:13, display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}><Phone size={14}/> Call</a>
              <a href={`https://wa.me/${viewEnq.phone.replace(/\D/g,"")}?text=Hello ${viewEnq.name}`} target="_blank" rel="noreferrer" style={{ flex:1, background:"#25D366", color:"white", padding:"11px 0", borderRadius:10, textAlign:"center", textDecoration:"none", fontWeight:700, fontSize:13, display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}><MessageCircle size={14}/> WhatsApp</a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ── Admin Price Manager ────────────────────────────────────────────────────
function AdminPrices({ brands, setBrands, directPrice, retailPrice, setDirectPrice, setRetailPrice, toast }) {
  const [localPrices, setLocalPrices] = useState(() => brands.reduce((a,b)=>({...a,[b.id]:b.price}),{}));
  useEffect(() => setLocalPrices(brands.reduce((a,b)=>({...a,[b.id]:b.price}),{})), [brands]);

  const save = () => {
    setBrands(p => p.map(b => ({ ...b, price: parseInt(localPrices[b.id]) || b.price })));
    toast("All prices saved!");
  };

  return (
    <div>
      <h2 style={{ fontFamily:"Georgia,serif", color:C.green, fontSize:"1.5rem", marginBottom:24 }}>Price Management</h2>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 360px", gap:24, alignItems:"start" }}>
        {/* Bulk price editor */}
        <div style={{ background:C.white, borderRadius:14, padding:24, boxShadow:"0 2px 10px rgba(0,0,0,.07)" }}>
          <h3 style={{ fontSize:14, fontWeight:700, color:C.textDark, marginBottom:20 }}>Update All Brand Prices</h3>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {brands.map(b => (
              <div key={b.id} style={{ display:"flex", alignItems:"center", gap:14, padding:12, background:C.cream, borderRadius:10 }}>
                <div style={{ fontSize:24 }}>{b.emoji}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:700 }}>{b.name}</div>
                  <div style={{ fontSize:11, color:C.textLight }}>{b.variety} · {b.weight}</div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ fontSize:13, color:C.textLight }}>₹</span>
                  <input type="number" value={localPrices[b.id]||""} onChange={e=>setLocalPrices(p=>({...p,[b.id]:e.target.value}))}
                    style={{...inputStyle, width:100, textAlign:"right", fontWeight:700, color:C.gold}}/>
                </div>
              </div>
            ))}
          </div>
          <button onClick={save} style={{ marginTop:20, background:`linear-gradient(135deg,${C.greenMid},${C.green})`, color:"white", padding:"12px 24px", borderRadius:10, border:"none", fontWeight:700, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
            <Check size={15}/> Save All Prices
          </button>
        </div>

        {/* Banner settings */}
        <div style={{ background:C.white, borderRadius:14, padding:24, boxShadow:"0 2px 10px rgba(0,0,0,.07)" }}>
          <h3 style={{ fontSize:14, fontWeight:700, color:C.textDark, marginBottom:20 }}>Price Comparison Banner</h3>
          <Field label="Company Direct Price (₹)">
            <input style={inputStyle} type="number" value={directPrice} onChange={e=>setDirectPrice(Number(e.target.value))}/>
          </Field>
          <Field label="Retail Market Price (₹)">
            <input style={inputStyle} type="number" value={retailPrice} onChange={e=>setRetailPrice(Number(e.target.value))}/>
          </Field>
          <div style={{ background:C.greenPale, borderRadius:10, padding:16, marginTop:10 }}>
            <div style={{ fontSize:12, fontWeight:700, color:C.greenMid, marginBottom:6 }}>Preview</div>
            <div style={{ fontSize:22, fontFamily:"Georgia,serif", color:C.gold, fontWeight:700 }}>Save ₹{(retailPrice-directPrice).toLocaleString()}</div>
            <div style={{ fontSize:12, color:C.textMid }}>per bag buying direct vs retail</div>
          </div>
          <button onClick={()=>toast("Banner updated!")} style={{ marginTop:16, background:`linear-gradient(135deg,${C.gold},#a87c2a)`, color:"white", padding:"11px 20px", borderRadius:10, border:"none", fontWeight:700, fontSize:13, cursor:"pointer" }}>
            Update Banner
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Admin Settings ─────────────────────────────────────────────────────────
function AdminSettings({ toast }) {
  const [company, setCompany] = useState({ name:"Sri Durai Kannammal Rice Products", phone:"+91 98765 43210", email:"info@skriceproducts.com", address:"Arani, Tiruvannamalai District, Tamil Nadu – 632 301", whatsapp:"919876543210" });
  const set = k => e => setCompany(p=>({...p,[k]:e.target.value}));
  return (
    <div>
      <h2 style={{ fontFamily:"Georgia,serif", color:C.green, fontSize:"1.5rem", marginBottom:24 }}>Settings</h2>
      <div style={{ background:C.white, borderRadius:14, padding:28, boxShadow:"0 2px 10px rgba(0,0,0,.07)", maxWidth:640 }}>
        <h3 style={{ fontSize:14, fontWeight:700, color:C.textDark, marginBottom:20 }}>Company Information</h3>
        <Field label="Company Name" required><input style={inputStyle} value={company.name} onChange={set("name")}/></Field>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          <Field label="Phone Number"><input style={inputStyle} value={company.phone} onChange={set("phone")}/></Field>
          <Field label="WhatsApp Number"><input style={inputStyle} value={company.whatsapp} onChange={set("whatsapp")}/></Field>
        </div>
        <Field label="Email Address"><input style={inputStyle} value={company.email} onChange={set("email")}/></Field>
        <Field label="Business Address"><textarea style={{...inputStyle, resize:"vertical"}} rows={2} value={company.address} onChange={set("address")}/></Field>
        <button onClick={()=>toast("Settings saved!")} style={{ background:`linear-gradient(135deg,${C.greenMid},${C.green})`, color:"white", padding:"12px 22px", borderRadius:10, border:"none", fontWeight:700, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
          <Check size={14}/> Save Settings
        </button>
      </div>
    </div>
  );
}

// ── Admin Shell ────────────────────────────────────────────────────────────
function AdminPortal({ brands, setBrands, enquiries, setEnquiries, directPrice, retailPrice, setDirectPrice, setRetailPrice, onLogout }) {
  const [panel, setPanel] = useState("dashboard");
  const { toasts, push: toast } = useToast();

  const navItems = [
    { id:"dashboard",  icon:<BarChart2 size={16}/>,  label:"Dashboard" },
    { id:"brands",     icon:<Package size={16}/>,    label:"Manage Brands" },
    { id:"enquiries",  icon:<Inbox size={16}/>,      label:"Enquiries", badge: enquiries.filter(e=>e.status==="new").length },
    { id:"prices",     icon:<DollarSign size={16}/>, label:"Prices" },
    { id:"settings",   icon:<Settings size={16}/>,   label:"Settings" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"#f4f6f9", display:"flex", flexDirection:"column" }}>
      <Toast toasts={toasts}/>
      {/* Admin topbar */}
      <div style={{ background:C.green, height:56, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 24px", boxShadow:"0 2px 8px rgba(0,0,0,.2)", position:"sticky", top:0, zIndex:200 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, color:"white" }}>
          <span style={{ fontSize:22 }}>🌾</span>
          <div>
            <div style={{ fontFamily:"Georgia,serif", fontSize:15 }}>Admin Portal</div>
            <div style={{ fontSize:10, color:"rgba(255,255,255,.55)", letterSpacing:1 }}>SRI DURAI KANNAMMAL RICE PRODUCTS</div>
          </div>
        </div>
        <button onClick={onLogout} style={{ background:"rgba(255,255,255,.12)", color:"white", border:"1px solid rgba(255,255,255,.2)", padding:"7px 14px", borderRadius:8, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
          <LogOut size={14}/> Logout
        </button>
      </div>

      <div style={{ display:"flex", flex:1 }}>
        {/* Sidebar */}
        <aside style={{ width:220, background:C.green, minHeight:"calc(100vh - 56px)", padding:"16px 0", flexShrink:0 }}>
          {navItems.map(item => (
            <button key={item.id} onClick={()=>setPanel(item.id)} style={{
              width:"100%", display:"flex", alignItems:"center", gap:10,
              padding:"12px 20px", background:"none", border:"none",
              color: panel===item.id ? "white" : "rgba(255,255,255,.65)",
              borderLeft: panel===item.id ? `3px solid ${C.gold}` : "3px solid transparent",
              background: panel===item.id ? "rgba(255,255,255,.1)" : "none",
              cursor:"pointer", fontSize:13, fontWeight:600, textAlign:"left", transition:"all .2s"
            }}>
              {item.icon}
              <span style={{ flex:1 }}>{item.label}</span>
              {item.badge > 0 && <span style={{ background:C.red, color:"white", borderRadius:"50%", width:18, height:18, fontSize:10, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700 }}>{item.badge}</span>}
            </button>
          ))}
        </aside>

        {/* Main content */}
        <main style={{ flex:1, padding:28, overflowY:"auto" }}>
          {panel==="dashboard" && <AdminDashboard brands={brands} enquiries={enquiries}/>}
          {panel==="brands"    && <AdminBrands brands={brands} setBrands={setBrands} toast={toast}/>}
          {panel==="enquiries" && <AdminEnquiries enquiries={enquiries} setEnquiries={setEnquiries} toast={toast}/>}
          {panel==="prices"    && <AdminPrices brands={brands} setBrands={setBrands} directPrice={directPrice} retailPrice={retailPrice} setDirectPrice={setDirectPrice} setRetailPrice={setRetailPrice} toast={toast}/>}
          {panel==="settings"  && <AdminSettings toast={toast}/>}
        </main>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  ROOT APP
// ══════════════════════════════════════════════════════════════════════════
export default function RiceWebsite() {
  const [view, setView] = useState("home"); // public page
  const [mode, setMode] = useState("public"); // "public" | "adminLogin" | "admin"
  const [brands, setBrands] = useState(INITIAL_BRANDS);
  const [enquiries, setEnquiries] = useState(INITIAL_ENQUIRIES);
  const [directPrice, setDirectPrice] = useState(1850);
  const [retailPrice, setRetailPrice] = useState(2100);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toasts, push: toast } = useToast();

  // Enquiry modal
  const [enquiryModal, setEnquiryModal] = useState(false);
  const [modalBrand, setModalBrand] = useState(null);

  const navPages = [
    { id:"home",     label:"Home",       icon:<Home size={14}/> },
    { id:"brands",   label:"Our Brands", icon:<Grid size={14}/> },
    { id:"delivery", label:"Delivery",   icon:<Truck size={14}/> },
    { id:"about",    label:"About Us",   icon:<Info size={14}/> },
    { id:"contact",  label:"Contact",    icon:<Phone size={14}/> },
  ];

  const openEnquiry = (brand=null) => { setModalBrand(brand); setEnquiryModal(true); };

  const submitEnquiry = (form) => {
    if (!form.name || !form.phone || !form.location) { toast("Please fill required fields.", "error"); return; }
    const enq = { ...form, id: enquiries.length+1, status:"new", date: new Date().toISOString().slice(0,10) };
    setEnquiries(p => [...p, enq]);
    toast("✅ Enquiry submitted! We'll contact you within 2 hours.");
    setView("home");
  };

  const submitModalEnquiry = (name, phone, location, qty) => {
    if (!name || !phone) { toast("Name and phone required.", "error"); return; }
    const enq = { name, phone, location, brand: modalBrand?.name||"", qty, type:"direct", note:"", id: enquiries.length+1, status:"new", date: new Date().toISOString().slice(0,10) };
    setEnquiries(p => [...p, enq]);
    toast("Enquiry submitted!");
    setEnquiryModal(false);
  };

  // ── Admin logic ──────────────────────────────────────────────────────
  if (mode === "adminLogin") return <AdminLogin onLogin={()=>setMode("admin")}/>;
  if (mode === "admin") return (
    <AdminPortal
      brands={brands} setBrands={setBrands}
      enquiries={enquiries} setEnquiries={setEnquiries}
      directPrice={directPrice} retailPrice={retailPrice}
      setDirectPrice={setDirectPrice} setRetailPrice={setRetailPrice}
      onLogout={()=>setMode("public")}
    />
  );

  // ── Public site ───────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily:"'Segoe UI',system-ui,sans-serif", background:C.cream, minHeight:"100vh" }}>
      <style>{`
        @keyframes slideIn { from{transform:translateX(120%);opacity:0} to{transform:translateX(0);opacity:1} }
        @keyframes slideUp { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
        * { box-sizing:border-box; }
        ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:#f1f1f1} ::-webkit-scrollbar-thumb{background:#aaa;border-radius:3px}
        a { cursor:pointer; }
      `}</style>

      <Toast toasts={toasts}/>

      {/* NAV */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:1000,
        background:"rgba(26,74,46,.97)", backdropFilter:"blur(12px)",
        height:64, padding:"0 5%", display:"flex", alignItems:"center", justifyContent:"space-between",
        boxShadow:"0 2px 16px rgba(0,0,0,.2)"
      }}>
        <button onClick={()=>setView("home")} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
          <div style={{ width:36, height:36, background:`linear-gradient(135deg,${C.gold},${C.goldLight})`, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🌾</div>
          <div style={{ color:"white", textAlign:"left" }}>
            <div style={{ fontFamily:"Georgia,serif", fontSize:15, lineHeight:1.1 }}>Sri Durai Kannammal</div>
            <div style={{ fontSize:10, color:C.goldLight, letterSpacing:1.2, textTransform:"uppercase" }}>Rice Products</div>
          </div>
        </button>

        {/* Desktop nav */}
        <div style={{ display:"flex", alignItems:"center", gap:20 }}>
          {navPages.map(p => (
            <button key={p.id} onClick={()=>setView(p.id)} style={{
              background:"none", border:"none", cursor:"pointer",
              color: view===p.id ? C.goldLight : "rgba(255,255,255,.8)",
              fontSize:13, fontWeight:view===p.id?700:500,
              display:"flex", alignItems:"center", gap:5,
              padding:"4px 2px", borderBottom: view===p.id?`2px solid ${C.gold}`:"2px solid transparent",
              transition:"all .2s"
            }}>{p.label}</button>
          ))}
          <button onClick={()=>setView("enquiry")} style={{
            background:`linear-gradient(135deg,${C.gold},#a87c2a)`, color:"white",
            padding:"8px 16px", borderRadius:20, border:"none",
            fontWeight:700, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", gap:6
          }}>
            <FileText size={13}/> Enquire Now
          </button>
          <button onClick={()=>setMode("adminLogin")} style={{
            background:"rgba(255,255,255,.1)", color:"rgba(255,255,255,.5)",
            padding:"7px 12px", borderRadius:8, border:"1px solid rgba(255,255,255,.15)",
            fontSize:11, cursor:"pointer"
          }}>
            Admin
          </button>
        </div>
      </nav>

      {/* Main content */}
      <div style={{ paddingTop: view==="home" ? 0 : 0 }}>
        {view==="home"     && <HomePage brands={brands} directPrice={directPrice} retailPrice={retailPrice} onEnquire={()=>setView("enquiry")} onBrandEnquire={openEnquiry}/>}
        {view==="brands"   && <BrandsPage brands={brands} onEnquire={openEnquiry}/>}
        {view==="enquiry"  && <EnquiryPage brands={brands} onSubmit={submitEnquiry}/>}
        {view==="delivery" && <DeliveryPage/>}
        {view==="about"    && <AboutPage/>}
        {view==="contact"  && <ContactPage/>}
      </div>

      {/* Footer */}
      {view !== "enquiry" && (
        <footer style={{ background:C.green, padding:"48px 5% 24px", color:"rgba(255,255,255,.7)" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:40, marginBottom:40 }}>
            <div>
              <h3 style={{ fontFamily:"Georgia,serif", color:"white", marginBottom:10 }}>🌾 Sri Durai Kannammal Rice Products</h3>
              <p style={{ fontSize:13, lineHeight:1.7 }}>Premium quality rice from our mill to your table. Serving Tamil Nadu since 1998.</p>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#25D366", color:"white", padding:"9px 16px", borderRadius:20, fontSize:13, fontWeight:700, textDecoration:"none", marginTop:14 }}>
                <MessageCircle size={14}/> WhatsApp Us
              </a>
            </div>
            {[
              { h:"Quick Links", items:[["Home","home"],["Our Brands","brands"],["Delivery","delivery"],["About Us","about"],["Contact","contact"]] },
              { h:"Rice Varieties", items:[["Ponni Rice"],["Basmati Rice"],["Raw Rice"],["Boiled Rice"],["Sona Masuri"]] },
              { h:"Contact", items:[["📱 +91 98765 43210"],["📧 info@skriceproducts.com"],["📍 Arani, Tiruvannamalai"],["Tamil Nadu – 632 301"]] },
            ].map(col => (
              <div key={col.h}>
                <h4 style={{ color:C.goldLight, fontSize:11, textTransform:"uppercase", letterSpacing:1, marginBottom:14 }}>{col.h}</h4>
                <ul style={{ listStyle:"none", padding:0 }}>
                  {col.items.map(item => (
                    <li key={item[0]} style={{ marginBottom:8 }}>
                      {item[1]
                        ? <button onClick={()=>setView(item[1])} style={{ background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,.6)", fontSize:13 }}>{item[0]}</button>
                        : <span style={{ fontSize:13 }}>{item[0]}</span>
                      }
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,.1)", paddingTop:20, textAlign:"center", fontSize:12, color:"rgba(255,255,255,.35)" }}>
            © 2025 Sri Durai Kannammal Rice Products. All rights reserved. | Arani, Tiruvannamalai District, Tamil Nadu
          </div>
        </footer>
      )}

      {/* Floating WhatsApp */}
      <a href="https://wa.me/919876543210?text=Hello!%20I%20am%20interested%20in%20your%20rice%20products." target="_blank" rel="noreferrer" style={{
        position:"fixed", bottom:24, right:24, zIndex:9000,
        width:54, height:54, borderRadius:"50%", background:"#25D366",
        display:"flex", alignItems:"center", justifyContent:"center",
        boxShadow:"0 4px 20px rgba(37,211,102,.45)", textDecoration:"none",
        animation:"bounce 3s ease-in-out infinite"
      }}>
        <MessageCircle size={24} color="white" fill="white"/>
      </a>
      <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}`}</style>

      {/* Quick Enquiry Modal */}
      <QuickEnquiryModal open={enquiryModal} onClose={()=>setEnquiryModal(false)} brand={modalBrand} onSubmit={submitModalEnquiry}/>
    </div>
  );
}

function QuickEnquiryModal({ open, onClose, brand, onSubmit }) {
  const [name,setName]=useState(""); const [phone,setPhone]=useState("");
  const [location,setLocation]=useState(""); const [qty,setQty]=useState("");
  const handle = () => { onSubmit(name,phone,location,qty); setName(""); setPhone(""); setLocation(""); setQty(""); };
  return (
    <Modal open={open} onClose={onClose} title="🌾 Quick Enquiry">
      {brand && <p style={{ fontSize:13, color:C.textMid, marginBottom:20, background:C.greenPale, padding:"8px 12px", borderRadius:8 }}>
        Enquiring about: <strong>{brand.name}</strong> ({brand.variety}, {brand.weight}) – <strong style={{color:C.gold}}>₹{brand.price.toLocaleString()}</strong>
      </p>}
      <Field label="Your Name" required><input style={inputStyle} value={name} onChange={e=>setName(e.target.value)} placeholder="Full name"/></Field>
      <Field label="Mobile Number" required><input style={inputStyle} value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+91 98765 43210"/></Field>
      <Field label="Location"><input style={inputStyle} value={location} onChange={e=>setLocation(e.target.value)} placeholder="City / District"/></Field>
      <Field label="Quantity Required"><input style={inputStyle} value={qty} onChange={e=>setQty(e.target.value)} placeholder="e.g. 5 bags of 50kg"/></Field>
      <button onClick={handle} style={{ width:"100%", background:`linear-gradient(135deg,${C.greenMid},${C.green})`, color:"white", padding:13, borderRadius:10, border:"none", fontWeight:700, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
        <Check size={15}/> Submit Enquiry
      </button>
    </Modal>
  );
}
