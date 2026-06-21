// ─── RICE BRANDS (dummy data) ────────────────────────────────────────────
// Edit this file to change the rice brands shown across the site & admin.
export const brands = [
  { id: 1, name: "Sri Kannan Rice",       variety: "Ponni Rice",        tag: "ponni", price: 1850, stock: "available", emoji: "🌾", desc: "The Sri Kannan flagship — classic short-grain Ponni with a gentle aroma. Cooks up soft and fluffy for everyday family meals." },
  { id: 2, name: "Gokula Kannan Rice",    variety: "Sona Rice",         tag: "sona",  price: 2200, stock: "available", emoji: "✨", desc: "Gokula Kannan's premium Sona selection. Slender, lightweight grains that stay separate and fragrant — perfect for festive spreads." },
  { id: 3, name: "Aashirvaadam Rice",     variety: "Sona Rice",         tag: "sona",  price: 1650, stock: "available", emoji: "🌿", desc: "A blessing at every table — Aashirvaadam Sona rice is clean, wholesome and consistent, milled fresh from farm paddy." },
  { id: 4, name: "Anil Rice",             variety: "RNR Rice",          tag: "rnr",   price: 1750, stock: "available", emoji: "🍚", desc: "Anil RNR rice holds its nutrients beautifully. Ideal for idli, dosa batter and hearty daily meals." },
  { id: 5, name: "Akasti Gold",           variety: "Sona Masoori",      tag: "sona",  price: 1950, stock: "available", emoji: "⭐", desc: "Akasti Gold lives up to its name — golden-grade Sona Masoori, light, low-starch and aromatic for authentic South Indian cooking." },
  { id: 6, name: "Thamarai Kannan Rice",  variety: "RNR Rice",          tag: "rnr",   price: 975,  stock: "available", emoji: "🏆", desc: "Thamarai Kannan, our signature RNR, is processed for maximum freshness. Dependable quality in every single grain." },
  { id: 7, name: "MKS Gold",              variety: "Broken Rice",       tag: "raw",   price: 1800, stock: "available", emoji: "🫓", desc: "MKS Gold broken rice is hand-selected for perfect batter. Ferments evenly for fluffy idli and crisp dosa every time." },
  { id: 8, name: "Sri Kannan WP Rice",    variety: "White Ponni Rice",  tag: "ponni", price: 380,  stock: "available", emoji: "🍱", desc: "Sri Kannan WP — bright, polished White Ponni rice. An affordable, nutritious staple households reach for again and again." },
];

// Category filter tags used by the public Brands page.
// Derived automatically from the brands above, so only tags that actually
// exist in the data are shown — no empty/unused filters.
export const brandTags = ["all", ...Array.from(new Set(brands.map((b) => b.tag)))];

// Options offered in the admin "add/edit brand" form.
export const brandVarieties = ["Ponni Rice", "Basmati Rice", "Raw Rice", "Boiled Rice", "Sona Masuri", "Idli Rice", "Brown Rice", "Kolam Rice"];
export const brandWeights = ["5kg", "10kg", "26kg"];
export const brandStockLevels = ["available", "limited", "unavailable"];
