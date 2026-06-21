// ─── CUSTOMER ENQUIRIES (dummy data) ─────────────────────────────────────
// Seed data for the contact / enquiry API. Edit freely.
export const enquiries = [
  { id: 1, name: "Rajesh Kumar",    phone: "9876543210", location: "Chennai",        brand: "Gold Ponni Premium",   qty: "10 bags", type: "direct",   status: "new",     note: "Urgent requirement",     date: "2025-06-10" },
  { id: 2, name: "Meena Lakshmi",   phone: "9845123456", location: "Vellore",        brand: "Royal Basmati",        qty: "5 bags",  type: "home",     status: "done",    note: "Hotel catering order",   date: "2025-06-11" },
  { id: 3, name: "Suresh Babu",     phone: "9988776655", location: "Tiruvannamalai", brand: "Sona Gold Masuri",     qty: "20 bags", type: "bulk",     status: "pending", note: "Monthly supply needed",  date: "2025-06-12" },
  { id: 4, name: "Anitha Devi",     phone: "9123456789", location: "Arani",          brand: "Nattu Raw Rice",       qty: "2 bags",  type: "retailer", status: "new",     note: "",                       date: "2025-06-13" },
  { id: 5, name: "Mohammed Farook", phone: "9765432109", location: "Salem",          brand: "Durai Special Ponni",  qty: "50 bags", type: "bulk",     status: "pending", note: "Restaurant chain order", date: "2025-06-14" },
  { id: 6, name: "Kavitha S",       phone: "9654321098", location: "Kanchipuram",    brand: "Mill Fresh Idli Rice", qty: "8 bags",  type: "direct",   status: "done",    note: "",                       date: "2025-06-15" },
];

// Allowed values used by both the API validation layer and the UI.
export const enquiryStatuses = ["new", "pending", "done"];
export const enquiryTypes = ["direct", "retailer", "home", "bulk"];

// Purchase-preference options rendered on the enquiry form.
export const purchaseOptions = [
  { val: "direct",   icon: "🏭", label: "Direct Company Purchase", sub: "Pick up from our mill at lowest prices" },
  { val: "retailer", icon: "🏪", label: "Through Nearby Retailer",  sub: "We'll connect you with a partner in your area" },
  { val: "home",     icon: "🏠", label: "Home Delivery",            sub: "We deliver to your doorstep" },
  { val: "bulk",     icon: "📦", label: "Bulk / Business / Hotel",  sub: "Large orders with special pricing" },
];
