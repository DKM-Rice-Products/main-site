// ─── EMAIL SENDING (Gmail SMTP via nodemailer) ────────────────────────────
// Credentials come from environment variables (never hard-code them):
//   GMAIL_USER          → the Gmail address that sends the mail
//   GMAIL_APP_PASSWORD  → a Google "App Password" (NOT your normal password)
//   ENQUIRY_TO          → where new enquiries are delivered (defaults to GMAIL_USER)
// See .env.example for setup instructions.
import nodemailer from "nodemailer";
import { company } from "@/data/company";

let cachedTransporter = null;

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null; // not configured

  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
  }
  return cachedTransporter;
}

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function detailsText(enquiry) {
  return [
    ["Name", enquiry.name],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone],
    ["Location", enquiry.location],
    ["Brand", enquiry.brand || "-"],
    ["Quantity", enquiry.qty || "-"],
    ["Purchase Type", enquiry.type],
    ["Comments", enquiry.note || "-"],
  ]
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}

function detailsHtml(enquiry) {
  const rows = [
    ["Name", enquiry.name],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone],
    ["Location", enquiry.location],
    ["Brand", enquiry.brand || "—"],
    ["Quantity", enquiry.qty || "—"],
    ["Purchase Type", enquiry.type],
    ["Comments", enquiry.note || "—"],
  ];
  return `
    <table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;color:#16201f">
      ${rows
        .map(
          ([k, v]) =>
            `<tr>
               <td style="padding:8px 16px 8px 0;font-weight:700;color:#0f766e;vertical-align:top">${esc(k)}</td>
               <td style="padding:8px 0;border-bottom:1px solid #e7f4f1">${esc(v)}</td>
             </tr>`,
        )
        .join("")}
    </table>`;
}

// Sends two emails: one to the business inbox, one confirmation to the enquirer.
// Returns { sent: boolean, skipped?: boolean, error?: string }.
export async function sendEnquiryEmails(enquiry) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("[mailer] GMAIL_USER / GMAIL_APP_PASSWORD not set — skipping email.");
    return { sent: false, skipped: true };
  }

  const from = `"${company.name}" <${process.env.GMAIL_USER}>`;
  const businessInbox = process.env.ENQUIRY_TO || process.env.GMAIL_USER;

  // 1) Notification to the business
  const adminMail = {
    from,
    to: businessInbox,
    replyTo: enquiry.email || undefined,
    subject: `New Rice Enquiry - ${enquiry.name} (${enquiry.location})`,
    text: `A new enquiry was submitted on your website.\n\n${detailsText(enquiry)}\n\nSubmitted on ${enquiry.date} - ${company.name}`,
    html: `
      <div style="max-width:560px;margin:0 auto;font-family:Arial,sans-serif">
        <h2 style="color:#0b4f4a;margin:0 0 4px">New Enquiry Received</h2>
        <p style="color:#475251;margin:0 0 20px">A customer submitted the enquiry form on your website.</p>
        ${detailsHtml(enquiry)}
        <p style="margin-top:24px;color:#8a9694;font-size:12px">Submitted on ${esc(enquiry.date)} &middot; ${esc(company.name)}</p>
      </div>`,
  };

  // 2) Confirmation to the enquirer
  const customerMail = enquiry.email
    ? {
        from,
        to: enquiry.email,
        replyTo: businessInbox,
        subject: `We received your enquiry - ${company.name}`,
        text: `Thank you, ${enquiry.name}!\n\nWe've received your enquiry and our team will contact you shortly, usually within 2 hours during business hours.\n\nYour enquiry details\n${detailsText(enquiry)}\n\nNeed it faster? Call us at ${company.phone} or message us on WhatsApp.\n\n${company.name}\n${company.address.city}, ${company.address.state}`,
        html: `
          <div style="max-width:560px;margin:0 auto;font-family:Arial,sans-serif">
            <h2 style="color:#0b4f4a;margin:0 0 4px">Thank you, ${esc(enquiry.name)}!</h2>
            <p style="color:#475251;line-height:1.7">
              We've received your enquiry and our team will get in touch with you shortly,
              usually within 2 hours during business hours.
            </p>
            <h3 style="color:#0f766e;margin:24px 0 8px">Your enquiry details</h3>
            ${detailsHtml(enquiry)}
            <p style="margin-top:24px;color:#475251;line-height:1.7">
              Need it faster? Call us at <strong>${esc(company.phone)}</strong> or message us on WhatsApp.
            </p>
            <p style="margin-top:24px;color:#8a9694;font-size:12px">${esc(company.name)} &middot; ${esc(company.address.city)}, ${esc(company.address.state)}</p>
          </div>`,
      }
    : null;

  try {
    const jobs = [transporter.sendMail(adminMail)];
    if (customerMail) jobs.push(transporter.sendMail(customerMail));
    await Promise.all(jobs);
    return { sent: true };
  } catch (err) {
    console.error("[mailer] Failed to send enquiry email:", err?.message || err);
    return { sent: false, error: err?.message || "Email send failed" };
  }
}
