// ─── RICE BRANDS (dummy data) ────────────────────────────────────────────
// Edit this file to change the rice brands shown across the site & admin.
export const brands = [
  { id: 1, name: "Gold Ponni Premium",   variety: "Ponni Rice",   tag: "ponni",   weight: "50kg", price: 1850, stock: "available", emoji: "🌾", desc: "Short-grain Ponni with distinct aroma. Soft, fluffy and perfectly textured for everyday cooking." },
  { id: 2, name: "Royal Basmati",        variety: "Basmati Rice", tag: "basmati", weight: "25kg", price: 2200, stock: "available", emoji: "✨", desc: "Long-grain aged Basmati with signature fragrance. Perfect for biriyani and special occasion dishes." },
  { id: 3, name: "Nattu Raw Rice",       variety: "Raw Rice",     tag: "raw",     weight: "50kg", price: 1650, stock: "available", emoji: "🌿", desc: "Traditional raw rice for everyday use. Nutritious, clean and consistent quality from farm-fresh paddy." },
  { id: 4, name: "Sri Idiyappam Boiled", variety: "Boiled Rice",  tag: "boiled",  weight: "50kg", price: 1750, stock: "available", emoji: "🍚", desc: "Parboiled rice retaining more nutrients. Ideal for idli, dosa batter and daily meals." },
  { id: 5, name: "Sona Gold Masuri",     variety: "Sona Masuri",  tag: "sona",    weight: "25kg", price: 1950, stock: "available", emoji: "⭐", desc: "Lightweight medium-grain with low starch. Aromatic and ideal for all South Indian cooking." },
  { id: 6, name: "Durai Special Ponni",  variety: "Ponni Rice",   tag: "ponni",   weight: "25kg", price: 975,  stock: "limited",   emoji: "🏆", desc: "Our signature in-house brand Ponni rice, processed for maximum freshness. Consistent quality guaranteed." },
  { id: 7, name: "Mill Fresh Idli Rice", variety: "Idli Rice",    tag: "raw",     weight: "50kg", price: 1800, stock: "limited",   emoji: "🫓", desc: "Specially selected rice for perfect idli and dosa batter. Ferments well, fluffy results every time." },
  { id: 8, name: "Classic Boiled Rice",  variety: "Boiled Rice",  tag: "boiled",  weight: "10kg", price: 380,  stock: "available", emoji: "🍱", desc: "Family-size 10kg pack of quality boiled rice. Ideal for households seeking affordable, nutritious rice." },
];

// Category filter tags used by the public Brands page.
export const brandTags = ["all", "ponni", "basmati", "raw", "boiled", "sona"];

// Options offered in the admin "add/edit brand" form.
export const brandVarieties = ["Ponni Rice", "Basmati Rice", "Raw Rice", "Boiled Rice", "Sona Masuri", "Idli Rice", "Brown Rice", "Kolam Rice"];
export const brandWeights = ["1kg", "5kg", "10kg", "25kg", "50kg"];
export const brandStockLevels = ["available", "limited", "unavailable"];
