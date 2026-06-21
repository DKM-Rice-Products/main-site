import { NextResponse } from "next/server";
import { listEnquiries, createEnquiry } from "@/lib/store";
import { validateEnquiry } from "@/lib/validation";
import { sendEnquiryEmails } from "@/lib/mailer";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// GET /api/enquiries?status=&type=&search=
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const data = listEnquiries({
    status: searchParams.get("status") ?? undefined,
    type: searchParams.get("type") ?? undefined,
    search: searchParams.get("search") ?? undefined,
  });
  return NextResponse.json({ data, count: data.length });
}

// POST /api/enquiries  — submit a contact / enquiry
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const fields = validateEnquiry(body);
  if (Object.keys(fields).length) {
    return NextResponse.json({ error: "Validation failed.", fields }, { status: 422 });
  }

  const created = createEnquiry(body);

  // Fire the notification + confirmation emails. Email problems must not
  // fail the enquiry itself, so we report status without throwing.
  const mail = await sendEnquiryEmails(created);

  return NextResponse.json({ data: created, emailSent: mail.sent }, { status: 201 });
}
