// ─── DASHBOARD CHART DATA (dummy data) ───────────────────────────────────
export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const ENQUIRY_TREND = MONTHS.map((month, i) => ({
  month,
  enquiries: [3, 5, 4, 8, 6, 11, 9, 14, 12, 18, 15, 22][i],
}));

export const REVENUE_TREND = MONTHS.map((month, i) => ({
  month,
  revenue: [42000, 65000, 58000, 95000, 78000, 130000, 110000, 165000, 148000, 210000, 185000, 260000][i],
}));
