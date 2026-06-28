// ─── CLIENT-SIDE API HELPERS ──────────────────────────────────────────────
// Thin fetch wrappers used by client components (forms, admin portal).
async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(payload.error || `Request failed (${res.status})`);
    error.status = res.status;
    error.fields = payload.fields;
    throw error;
  }
  return payload;
}

function toQuery(params = {}) {
  const entries = Object.entries(params).filter(([, v]) => v != null && v !== "" && v !== "all");
  if (!entries.length) return "";
  return "?" + new URLSearchParams(entries).toString();
}

// ── Enquiries (contact API) ──────────────────────────────────────────────
export const fetchEnquiries = (params) => request(`/api/enquiries${toQuery(params)}`);
export const createEnquiry = (data) => request("/api/enquiries", { method: "POST", body: JSON.stringify(data) });
export const updateEnquiry = (id, data) => request(`/api/enquiries/${id}`, { method: "PATCH", body: JSON.stringify(data) });
export const deleteEnquiry = (id) => request(`/api/enquiries/${id}`, { method: "DELETE" });

// ── Brands ───────────────────────────────────────────────────────────────
export const fetchBrands = (params) => request(`/api/brands${toQuery(params)}`);
export const createBrand = (data) => request("/api/brands", { method: "POST", body: JSON.stringify(data) });
export const updateBrand = (id, data) => request(`/api/brands/${id}`, { method: "PATCH", body: JSON.stringify(data) });
export const deleteBrand = (id) => request(`/api/brands/${id}`, { method: "DELETE" });

// ── Settings ───────────────────────────────────────────────────────────────
export const fetchSettings = () => request("/api/settings");
export const updateSettings = (data) => request("/api/settings", { method: "PUT", body: JSON.stringify(data) });

// ── Image upload ─────────────────────────────────────────────────────────────
// Saves a base64 dataUrl to /public/brands and returns { url }.
export const uploadImage = (dataUrl, name) =>
  request("/api/upload", { method: "POST", body: JSON.stringify({ dataUrl, name }) });
