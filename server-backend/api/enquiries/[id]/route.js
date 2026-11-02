import { NextResponse } from "next/server";
import { getEnquiry, updateEnquiry, removeEnquiry } from "@/lib/store";
import { validateEnquiryPatch } from "@/lib/validation";

export const dynamic = "force-dynamic";

// GET /api/enquiries/:id
export async function GET(_request, { params }) {
  const enquiry = getEnquiry(params.id);
  if (!enquiry) return NextResponse.json({ error: "Enquiry not found." }, { status: 404 });
  return NextResponse.json({ data: enquiry });
}

// PATCH /api/enquiries/:id  — update status / fields
export async function PATCH(request, { params }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const fields = validateEnquiryPatch(body);
  if (Object.keys(fields).length) {
    return NextResponse.json({ error: "Validation failed.", fields }, { status: 422 });
  }

  const updated = updateEnquiry(params.id, body);
  if (!updated) return NextResponse.json({ error: "Enquiry not found." }, { status: 404 });
  return NextResponse.json({ data: updated });
}

// DELETE /api/enquiries/:id
export async function DELETE(_request, { params }) {
  const ok = removeEnquiry(params.id);
  if (!ok) return NextResponse.json({ error: "Enquiry not found." }, { status: 404 });
  return NextResponse.json({ success: true });
}
