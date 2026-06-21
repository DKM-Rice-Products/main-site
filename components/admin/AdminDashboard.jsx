"use client";

import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Package, Inbox, Bell, Clock, DollarSign, Users } from "lucide-react";
import { C, statusMeta } from "@/lib/theme";
import { ENQUIRY_TREND, REVENUE_TREND } from "@/data/charts";
import StatCard from "@/components/ui/StatCard";
import Badge from "@/components/ui/Badge";

export default function AdminDashboard({ brands, enquiries }) {
  const newCount = enquiries.filter((e) => e.status === "new").length;
  const pendingCount = enquiries.filter((e) => e.status === "pending").length;
  const totalRevEst = enquiries.length * 1850;
  const pieData = [
    { name: "Direct", value: enquiries.filter((e) => e.type === "direct").length || 1 },
    { name: "Retailer", value: enquiries.filter((e) => e.type === "retailer").length || 1 },
    { name: "Home", value: enquiries.filter((e) => e.type === "home").length || 1 },
    { name: "Bulk", value: enquiries.filter((e) => e.type === "bulk").length || 1 },
  ];
  const PIE_COLORS = [C.greenMid, C.gold, C.brown, C.greenLight];

  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-display)", color: C.green, fontSize: "1.5rem", marginBottom: 24 }}>Dashboard Overview</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 16, marginBottom: 28 }}>
        <StatCard icon={<Package size={20} />} label="Active Brands" value={brands.length} accent={C.greenMid} trend="+2 this month" />
        <StatCard icon={<Inbox size={20} />} label="Total Enquiries" value={enquiries.length} accent={C.gold} trend="+6 this week" />
        <StatCard icon={<Bell size={20} />} label="New Enquiries" value={newCount} accent={C.red} />
        <StatCard icon={<Clock size={20} />} label="Pending" value={pendingCount} accent={C.amber} />
        <StatCard icon={<DollarSign size={20} />} label="Est. Revenue" value={`₹${(totalRevEst / 1000).toFixed(0)}K`} accent={C.greenLight} />
        <StatCard icon={<Users size={20} />} label="Retailer Partners" value="50+" accent={C.brown} />
      </div>

      <div className="grid-dash" style={{ marginBottom: 24 }}>
        <div style={{ background: C.white, borderRadius: 14, padding: 22, boxShadow: "0 2px 10px rgba(0,0,0,.07)" }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: C.textDark, marginBottom: 18 }}>📈 Enquiries This Year</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={ENQUIRY_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="enquiries" stroke={C.greenMid} strokeWidth={2.5} dot={{ fill: C.greenMid, r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: C.white, borderRadius: 14, padding: 22, boxShadow: "0 2px 10px rgba(0,0,0,.07)" }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: C.textDark, marginBottom: 18 }}>💰 Estimated Revenue (₹)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={REVENUE_TREND.slice(-6)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
              <Bar dataKey="revenue" fill={C.gold} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: C.white, borderRadius: 14, padding: 22, boxShadow: "0 2px 10px rgba(0,0,0,.07)" }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: C.textDark, marginBottom: 18 }}>🥧 Purchase Type</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={65} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ background: C.white, borderRadius: 14, padding: 22, boxShadow: "0 2px 10px rgba(0,0,0,.07)" }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: C.textDark, marginBottom: 16 }}>🕐 Recent Enquiries</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr>
                {["Name", "Phone", "Location", "Brand", "Type", "Status"].map((h) => (
                  <th key={h} style={{ background: C.green, color: "white", padding: "10px 14px", textAlign: "left", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.7 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {enquiries.slice(-5).reverse().map((e) => {
                const sm = statusMeta[e.status];
                return (
                  <tr key={e.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                    <td style={{ padding: "10px 14px", fontWeight: 600 }}>{e.name}</td>
                    <td style={{ padding: "10px 14px" }}>{e.phone}</td>
                    <td style={{ padding: "10px 14px" }}>{e.location}</td>
                    <td style={{ padding: "10px 14px" }}>{e.brand || "—"}</td>
                    <td style={{ padding: "10px 14px", textTransform: "capitalize" }}>{e.type}</td>
                    <td style={{ padding: "10px 14px" }}><Badge label={sm.label} color={sm.color} bg={sm.bg} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
