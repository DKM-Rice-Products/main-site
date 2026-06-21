// ─── COMPANY PROFILE & PRICING (dummy data) ──────────────────────────────
// Single source of truth for business contact details and headline pricing.
export const company = {
  name: "DKM",
  shortName: "DKM",
  tagline: "Rice Products",
  established: 1995,
  phone: "+91 9443335547",
  whatsapp: "919443335547",
  email: "info@skriceproducts.com",
  mill: "Durai Kannammal Modern Rice Mill",
  address: {
    line1: "Durai Kannammal Modern Rice Mill",
    city: "Arani",
    district: "Tiruvannamalai",
    state: "Tamil Nadu",
    pincode: "632 301",
  },
  mapsQuery: "Arani,Tiruvannamalai,Tamil+Nadu",
};

// Headline price-comparison banner values (editable from the admin portal).
export const pricing = {
  directPrice: 1850,
  retailPrice: 2100,
};

// Marketing stats shown on the home and about pages.
export const stats = [
  { n: "31+",  l: "Years Experience" },
  { n: "10",    l: "Rice Varieties" },
  { n: "1500+", l: "Happy Customers" },
  { n: "100+",  l: "Retailer Partners" },
];

// "Why choose us" feature grid (home page).
export const features = [
  ["🏭", "Own Mill Processing",   "Rice processed in our Durai Kannammal Modern Rice Mill — quality controlled at every step."],
  ["💰", "Direct Company Prices", "Skip middlemen. Save ₹250+ per bag vs retail market price."],
  ["🚚", "Flexible Delivery",     "Home delivery, direct pick-up, or through nearby retailers — your choice."],
  ["⚖️", "Accurate Weight",       "Precision-weighed and sealed. You get exactly what you pay for."],
  ["🌿", "Naturally Processed",   "No artificial additives. Clean, naturally milled rice from quality paddy."],
  ["📦", "Bulk Orders Welcome",   "Hotels, restaurants, events — large orders with special pricing."],
  ["🏆", "Unbeatable Quality",    "Hand-checked, premium-grade grains held to a standard the market simply can't match."],
];

// Delivery / purchase options (delivery page).
export const deliveryOptions = [
  { icon: "🏭", title: "Direct Company Purchase", desc: "Visit our mill in Arani and pick up at the lowest direct-from-mill prices. No middlemen, maximum savings.", tag: "Save ₹250+ per bag vs retail", tagColor: "gold" },
  { icon: "🏪", title: "Through Nearby Retailer",  desc: "We supply to verified retailers across Tamil Nadu. Tell us your area and we'll connect you to the nearest partner.", tag: "Retail pricing applies", tagColor: "textLight" },
  { icon: "🚚", title: "Home Delivery",             desc: "Delivery to your home within Tiruvannamalai district and select areas. Minimum order applies for free delivery.", tag: "Check availability", tagColor: "greenLight" },
  { icon: "📦", title: "Bulk / Business Orders",   desc: "Hotels, restaurants, canteens and event caterers can place large orders with dedicated account management.", tag: "Custom pricing for bulk", tagColor: "gold" },
];
