import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/store";

export const dynamic = "force-dynamic";

// GET /api/settings
export async function GET() {
  return NextResponse.json({ data: getSettings() });
}

// PUT /api/settings  — update pricing banner / company info
export async function PUT(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (body.directPrice != null && Number(body.directPrice) < 0) {
    return NextResponse.json({ error: "directPrice cannot be negative." }, { status: 422 });
  }
  if (body.retailPrice != null && Number(body.retailPrice) < 0) {
    return NextResponse.json({ error: "retailPrice cannot be negative." }, { status: 422 });
  }

  return NextResponse.json({ data: updateSettings(body) });
}
