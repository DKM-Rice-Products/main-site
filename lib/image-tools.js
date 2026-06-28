// ─── CLIENT-SIDE IMAGE HELPERS ────────────────────────────────────────────
// Browser-only utilities used by the admin brand form: read a file, detect
// whether an image already has a transparent background, and run AI-based
// background removal (no API key — the model runs in the browser and is
// cached after first use).

export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read the image file."));
    reader.readAsDataURL(file);
  });
}

export function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not process the image."));
    reader.readAsDataURL(blob);
  });
}

export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not load the image."));
    img.src = src;
  });
}

// Returns true if the image already looks cut-out (its corners are transparent),
// so we can display it directly without removing the background again.
export async function hasTransparentBackground(src) {
  const img = await loadImage(src);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  let data;
  try {
    data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  } catch {
    return false; // tainted canvas (cross-origin) — assume opaque
  }
  const w = canvas.width;
  const h = canvas.height;
  const corners = [
    [0, 0],
    [w - 1, 0],
    [0, h - 1],
    [w - 1, h - 1],
  ];
  // If every corner is (near) fully transparent, treat it as already cut-out.
  return corners.every(([x, y]) => data[(y * w + x) * 4 + 3] < 16);
}

// Runs the in-browser AI model and returns a transparent PNG as a dataUrl.
// The library is loaded from a CDN at runtime and deliberately kept OUT of the
// webpack bundle (`webpackIgnore`): it ships onnxruntime-web's node/webgpu
// builds which use `import.meta`/`createRequire` and can't be bundled by
// Next's minifier. The model weights download from the CDN on first use and
// are then cached by the browser.
const BG_REMOVAL_CDN = "https://esm.sh/@imgly/background-removal@1.7.0";

export async function removeImageBackground(src) {
  const mod = await import(/* webpackIgnore: true */ BG_REMOVAL_CDN);
  const removeBackground = mod.removeBackground || mod.default?.removeBackground || mod.default;
  if (typeof removeBackground !== "function") {
    throw new Error("Background-removal library failed to load.");
  }
  const blob = await removeBackground(src);
  return blobToDataUrl(blob);
}
