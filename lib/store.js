// ─── IN-MEMORY DATA STORE (server-side) ──────────────────────────────────
// Seeds from the editable dummy-data files and keeps mutable state in the
// Node process memory. State is shared across requests but resets on restart.
// Swap these functions for a real database (Prisma, Drizzle, etc.) later —
// the API routes only depend on this module's exported functions.
import { brands as seedBrands } from "@/data/brands";
import { enquiries as seedEnquiries } from "@/data/enquiries";
import { company as seedCompany, pricing as seedPricing } from "@/data/company";

// `globalThis` keeps a single instance alive across hot-reloads in dev.
const db =
  globalThis.__riceStore ??
  (globalThis.__riceStore = {
    brands: seedBrands.map((b) => ({ ...b })),
    enquiries: seedEnquiries.map((e) => ({ ...e })),
    settings: {
      directPrice: seedPricing.directPrice,
      retailPrice: seedPricing.retailPrice,
      company: { ...seedCompany },
    },
    seq: {
      brand: Math.max(0, ...seedBrands.map((b) => b.id)) + 1,
      enquiry: Math.max(0, ...seedEnquiries.map((e) => e.id)) + 1,
    },
  });

const today = () => new Date().toISOString().slice(0, 10);

// ── Brands ───────────────────────────────────────────────────────────────
export function listBrands({ tag } = {}) {
  let result = db.brands;
  if (tag && tag !== "all") result = result.filter((b) => b.tag === tag);
  return result.map((b) => ({ ...b }));
}

export function getBrand(id) {
  const brand = db.brands.find((b) => b.id === Number(id));
  return brand ? { ...brand } : null;
}

export function createBrand(input) {
  const brand = {
    id: db.seq.brand++,
    name: input.name,
    variety: input.variety ?? "Ponni Rice",
    tag: input.tag ?? "ponni",
    weight: input.weight ?? "50kg",
    price: Number(input.price),
    stock: input.stock ?? "available",
    emoji: input.emoji ?? "🌾",
    desc: input.desc ?? "",
  };
  db.brands.push(brand);
  return { ...brand };
}

export function updateBrand(id, patch) {
  const brand = db.brands.find((b) => b.id === Number(id));
  if (!brand) return null;
  const { id: _ignore, ...rest } = patch;
  if (rest.price != null) rest.price = Number(rest.price);
  Object.assign(brand, rest);
  return { ...brand };
}

export function removeBrand(id) {
  const idx = db.brands.findIndex((b) => b.id === Number(id));
  if (idx === -1) return false;
  db.brands.splice(idx, 1);
  return true;
}

// ── Enquiries ──────────────────────────────────────────────────────────────
export function listEnquiries({ status, type, search } = {}) {
  let result = db.enquiries;
  if (status && status !== "all") result = result.filter((e) => e.status === status);
  if (type && type !== "all") result = result.filter((e) => e.type === type);
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.phone.includes(search) ||
        e.location.toLowerCase().includes(q),
    );
  }
  return result.map((e) => ({ ...e }));
}

export function getEnquiry(id) {
  const enquiry = db.enquiries.find((e) => e.id === Number(id));
  return enquiry ? { ...enquiry } : null;
}

export function createEnquiry(input) {
  const enquiry = {
    id: db.seq.enquiry++,
    name: input.name.trim(),
    email: input.email?.trim() ?? "",
    phone: String(input.phone).trim(),
    location: input.location.trim(),
    brand: input.brand?.trim() ?? "",
    qty: input.qty?.trim() ?? "",
    type: input.type ?? "direct",
    note: input.note?.trim() ?? "",
    status: "new",
    date: today(),
  };
  db.enquiries.push(enquiry);
  return { ...enquiry };
}

export function updateEnquiry(id, patch) {
  const enquiry = db.enquiries.find((e) => e.id === Number(id));
  if (!enquiry) return null;
  const { id: _ignore, ...rest } = patch;
  Object.assign(enquiry, rest);
  return { ...enquiry };
}

export function removeEnquiry(id) {
  const idx = db.enquiries.findIndex((e) => e.id === Number(id));
  if (idx === -1) return false;
  db.enquiries.splice(idx, 1);
  return true;
}

// ── Settings ───────────────────────────────────────────────────────────────
export function getSettings() {
  return { ...db.settings, company: { ...db.settings.company } };
}

export function updateSettings(patch) {
  if (patch.directPrice != null) db.settings.directPrice = Number(patch.directPrice);
  if (patch.retailPrice != null) db.settings.retailPrice = Number(patch.retailPrice);
  if (patch.company) db.settings.company = { ...db.settings.company, ...patch.company };
  return getSettings();
}
