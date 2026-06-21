// ─── API INPUT VALIDATION ─────────────────────────────────────────────────
import { enquiryStatuses, enquiryTypes } from "@/data/enquiries";

// Returns a map of field -> error message. Empty object means valid.
export function validateEnquiry(body = {}) {
  const errors = {};

  if (!body.name || !String(body.name).trim()) {
    errors.name = "Name is required.";
  } else if (String(body.name).trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  const phone = String(body.phone ?? "").replace(/\D/g, "");
  if (!body.phone || !String(body.phone).trim()) {
    errors.phone = "Phone number is required.";
  } else if (phone.length < 10 || phone.length > 12) {
    errors.phone = "Enter a valid phone number.";
  }

  const email = String(body.email ?? "").trim();
  if (!email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!body.location || !String(body.location).trim()) {
    errors.location = "Location is required.";
  }

  if (body.type && !enquiryTypes.includes(body.type)) {
    errors.type = `Type must be one of: ${enquiryTypes.join(", ")}.`;
  }

  return errors;
}

export function validateEnquiryPatch(body = {}) {
  const errors = {};
  if (body.status != null && !enquiryStatuses.includes(body.status)) {
    errors.status = `Status must be one of: ${enquiryStatuses.join(", ")}.`;
  }
  if (body.type != null && !enquiryTypes.includes(body.type)) {
    errors.type = `Type must be one of: ${enquiryTypes.join(", ")}.`;
  }
  return errors;
}

export function validateBrand(body = {}) {
  const errors = {};
  if (!body.name || !String(body.name).trim()) errors.name = "Brand name is required.";
  if (body.price == null || body.price === "" || Number.isNaN(Number(body.price))) {
    errors.price = "A valid price is required.";
  } else if (Number(body.price) < 0) {
    errors.price = "Price cannot be negative.";
  }
  return errors;
}
