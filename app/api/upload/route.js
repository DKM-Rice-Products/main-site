import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

const MIME_EXT = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/webp": "webp",
};
const MAX_BYTES = 12 * 1024 * 1024; // 12 MB decoded

// POST /api/upload  — body: { dataUrl: "data:image/png;base64,...", name?: string }
// Saves the image under /public/brands and returns its public URL.
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { dataUrl, name } = body || {};
  const match = typeof dataUrl === "string" && dataUrl.match(/^data:([^;]+);base64,(.+)$/s);
  if (!match) {
    return NextResponse.json({ error: "A valid base64 image dataUrl is required." }, { status: 422 });
  }

  const ext = MIME_EXT[match[1].toLowerCase()];
  if (!ext) {
    return NextResponse.json({ error: "Unsupported image type. Use PNG, JPG or WebP." }, { status: 422 });
  }

  const buffer = Buffer.from(match[2], "base64");
  if (buffer.length > MAX_BYTES) {
    return NextResponse.json({ error: "Image is too large (max 12 MB)." }, { status: 413 });
  }

  const slug =
    String(name || "rice-bag")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 40) || "rice-bag";
  const filename = `${slug}-${Date.now()}.${ext}`;

  const dir = path.join(process.cwd(), "public", "brands");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), buffer);

  return NextResponse.json({ url: `/brands/${filename}` }, { status: 201 });
}
