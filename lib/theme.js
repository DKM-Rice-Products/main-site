// ─── DESIGN TOKENS & SHARED STYLE META ───────────────────────────────────
// Teal-forward palette: deep teal primary + warm gold accent for a premium,
// professional look. Token names kept (green*) so all components recolour at once.
export const C = {
  green: "#0b4f4a", // deep teal — headings, nav, dark sections
  greenMid: "#0f766e", // teal 700 — buttons, mid tones
  greenLight: "#2dd4bf", // teal 400 — highlights, savings
  greenPale: "#d5f5f0", // soft teal — tints & badges
  greenDeep: "#06302d", // darkest teal — gradient companions
  gold: "#c9a84c",
  goldLight: "#f0d27a",
  goldPale: "#fdf4dc",
  brown: "#7c5c3a",
  cream: "#e7f4f1", // soft teal surface (sections, hovers)
  white: "#ffffff",
  textDark: "#16201f",
  textMid: "#475251",
  textLight: "#8a9694",
  red: "#e53935",
  amber: "#f59e0b",
};

export const statusMeta = {
  new: { label: "New", color: C.green, bg: C.greenPale },
  pending: { label: "Pending", color: "#92400e", bg: "#fef3c7" },
  done: { label: "Done", color: "#5b21b6", bg: "#ede9fe" },
};

export const stockMeta = {
  available: { label: "In Stock", color: C.green, bg: C.greenPale },
  limited: { label: "Limited", color: "#92400e", bg: "#fef3c7" },
  unavailable: { label: "Out of Stock", color: C.red, bg: "#fee2e2" },
};

export const inputStyle = {
  width: "100%",
  padding: "10px 13px",
  borderRadius: 9,
  border: "1.5px solid #d7e8e5",
  fontSize: 13,
  fontFamily: "inherit",
  color: C.textDark,
  background: "#f3faf8",
  outline: "none",
  boxSizing: "border-box",
};
