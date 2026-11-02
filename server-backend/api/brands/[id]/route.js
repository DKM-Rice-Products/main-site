import { NextResponse } from "next/server";
import { getBrand, updateBrand, removeBrand } from "@/lib/store";
import { validateBrand } from "@/lib/validation";

export const dynamic = "force-dynamic";

// GET /api/brands/:id
export async function GET(_request, { params }) {
  const brand = getBrand(params.id);
  if (!brand) return NextResponse.json({ error: "Brand not found." }, { status: 404 });
  return NextResponse.json({ data: brand });
}

// PATCH /api/brands/:id
export async function PATCH(request, { params }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Only validate name/price when they are being changed.
  if ("name" in body || "price" in body) {
    const current = getBrand(params.id);
    if (!current) return NextResponse.json({ error: "Brand not found." }, { status: 404 });
    const fields = validateBrand({ ...current, ...body });
    if (Object.keys(fields).length) {
      return NextResponse.json({ error: "Validation failed.", fields }, { status: 422 });
    }
  }

  const updated = updateBrand(params.id, body);
  if (!updated) return NextResponse.json({ error: "Brand not found." }, { status: 404 });
  return NextResponse.json({ data: updated });
}

// DELETE /api/brands/:id
export async function DELETE(_request, { params }) {
  const ok = removeBrand(params.id);
  if (!ok) return NextResponse.json({ error: "Brand not found." }, { status: 404 });
  return NextResponse.json({ success: true });
}
