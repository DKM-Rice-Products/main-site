import { NextResponse } from "next/server";
import { listBrands, createBrand } from "@/lib/store";
import { validateBrand } from "@/lib/validation";

export const dynamic = "force-dynamic";

// GET /api/brands?tag=
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const data = listBrands({ tag: searchParams.get("tag") ?? undefined });
  return NextResponse.json({ data, count: data.length });
}

// POST /api/brands
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const fields = validateBrand(body);
  if (Object.keys(fields).length) {
    return NextResponse.json({ error: "Validation failed.", fields }, { status: 422 });
  }

  const created = createBrand(body);
  return NextResponse.json({ data: created }, { status: 201 });
}
