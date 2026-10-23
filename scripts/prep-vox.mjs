// Builds public/vox/ from the raw art in _assets-raw/ (kept out of git).
// Run: node scripts/prep-vox.mjs
import { mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const RAW = "_assets-raw";
const OUT = "public/vox";
const MAX_W = 1200;

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const smoothstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

async function readRgb(name) {
  const { data, info } = await sharp(`${RAW}/${name}.png`).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height };
}

/**
 * Bounding box of the visible pixels (alpha above `min`), padded and clamped
 * to the image. Rows and columns with only a few such pixels are ignored, so
 * a stray speck (pin.png has three in its corners) can't stretch the crop.
 */
function alphaBox(rgba, width, height, min = 6, pad = 3, minCount = 3) {
  const rows = new Uint32Array(height);
  const cols = new Uint32Array(width);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (rgba[(y * width + x) * 4 + 3] > min) {
        rows[y]++;
        cols[x]++;
      }
    }
  }
  let y0 = rows.findIndex((n) => n >= minCount);
  let y1 = rows.findLastIndex((n) => n >= minCount);
  let x0 = cols.findIndex((n) => n >= minCount);
  let x1 = cols.findLastIndex((n) => n >= minCount);
  x0 = Math.max(0, x0 - pad);
  y0 = Math.max(0, y0 - pad);
  x1 = Math.min(width - 1, x1 + pad);
  y1 = Math.min(height - 1, y1 + pad);
  return { left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 };
}

/** Crop, cap the width and save an RGBA buffer as WebP. */
async function saveRgba(rgba, width, height, box, file, quality, { maxWidth = MAX_W, webp } = {}) {
  // Fully transparent pixels get a flat colour so they cost nothing to encode.
  for (let i = 0; i < rgba.length; i += 4) if (rgba[i + 3] === 0) rgba[i] = rgba[i + 1] = rgba[i + 2] = 0;
  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .extract(box)
    .resize({ width: Math.min(maxWidth, box.width), withoutEnlargement: true })
    .webp(webp ?? { quality, alphaQuality: 90, effort: 6, smartSubsample: true })
    .toFile(`${OUT}/${file}.webp`);
}

/* ── Ink masks: brightness → alpha, black on transparent ─────────────── */

// Background paper sits at ~254 and the ink at 0-20, so anything brighter
// than PAPER is fully clear and anything darker than INK fully solid.
const INK = 25;
const PAPER = 232;

async function mask(name) {
  const { data, width, height } = await readRgb(name);
  const rgba = Buffer.alloc(width * height * 4);
  for (let p = 0, i = 0; p < width * height; p++, i += 3) {
    const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
    rgba[p * 4 + 3] = Math.round(255 * clamp((PAPER - lum) / (PAPER - INK), 0, 1));
  }
  await saveRgba(rgba, width, height, alphaBox(rgba, width, height), name, 88);
}

/* ── Magenta objects: key out #FF00FF, unmix the edges, despill ───────── */

// "Magenta-ness" of a pixel: how far red and blue both sit above green.
// The backdrop scores ~247, the objects themselves ≤ 1.
const KEY = [252, 3, 251];
const SOLID = 24; // at or below: fully opaque
const CLEAR = 232; // at or above: fully transparent

function keyMagenta({ data, width, height }) {
  const rgba = Buffer.alloc(width * height * 4);
  for (let p = 0, i = 0; p < width * height; p++, i += 3) {
    let r = data[i], g = data[i + 1], b = data[i + 2];
    const m = Math.min(r, b) - g;
    const a = clamp((CLEAR - m) / (CLEAR - SOLID), 0, 1);
    if (a > 0 && a < 1) {
      // Edge pixel: a mix of object and backdrop. Take the backdrop's share
      // back out so the edge keeps the object's own colour.
      r = clamp((r - (1 - a) * KEY[0]) / a, 0, 255);
      g = clamp((g - (1 - a) * KEY[1]) / a, 0, 255);
      b = clamp((b - (1 - a) * KEY[2]) / a, 0, 255);
    }
    // Despill: no pixel may lean magenta (red and blue both above green).
    const spill = Math.max(0, Math.min(r, b) - g);
    rgba[p * 4] = Math.round(r - spill);
    rgba[p * 4 + 1] = Math.round(g);
    rgba[p * 4 + 2] = Math.round(b - spill);
    rgba[p * 4 + 3] = Math.round(a * 255);
  }
  // The outermost pixel rows of the renders are slightly off-key (pin.png's
  // bottom row keys to a faint line that stretched its crop by 260px). No
  // object touches the border, so clear it.
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (x < 2 || y < 2 || x >= width - 2 || y >= height - 2) rgba[(y * width + x) * 4 + 3] = 0;
    }
  }
  return rgba;
}

/** `smaller` adds narrower copies named name-<width> for srcset. */
async function object(name, quality, { maxWidth = MAX_W, avif, smaller = [] } = {}) {
  const img = await readRgb(name);
  const rgba = keyMagenta(img);
  const box = alphaBox(rgba, img.width, img.height);
  for (const [width, file] of [[maxWidth, name], ...smaller.map((w) => [w, `${name}-${w}`])]) {
    await saveRgba(rgba, img.width, img.height, box, file, quality, { maxWidth: width });
    if (avif) {
      await sharp(rgba, { raw: { width: img.width, height: img.height, channels: 4 } })
        .extract(box)
        .resize({ width: Math.min(width, box.width), withoutEnlargement: true })
        .avif(avif)
        .toFile(`${OUT}/${file}.avif`);
    }
  }
}

/** tape.png holds three strips stacked vertically; each becomes its own file. */
// Multiplied into the tape's colour so the beige still reads on cream paper.
// The strips are already ~99% opaque, so darker is the only way to add contrast.
const TAPE_TINT = [0.95, 0.915, 0.86];

async function tapes() {
  const img = await readRgb("tape");
  const { width, height } = img;
  const rgba = keyMagenta(img);
  for (let i = 0; i < rgba.length; i += 4) {
    for (let c = 0; c < 3; c++) rgba[i + c] = Math.round(rgba[i + c] * TAPE_TINT[c]);
  }
  const filled = (y) => {
    let n = 0;
    for (let x = 0; x < width; x++) if (rgba[(y * width + x) * 4 + 3] > 128) n++;
    return n > 20;
  };
  const bands = [];
  let start = -1;
  for (let y = 0; y <= height; y++) {
    const on = y < height && filled(y);
    if (on && start < 0) start = y;
    if (!on && start >= 0) {
      if (y - start > 40) bands.push([start, y]);
      start = -1;
    }
  }
  if (bands.length !== 3) throw new Error(`expected 3 tape strips, found ${bands.length}`);
  for (const [k, [y0, y1]] of bands.entries()) {
    // Mask out everything but this band (plus a margin for its soft edges).
    const band = Buffer.from(rgba);
    for (let y = 0; y < height; y++) {
      if (y >= y0 - 12 && y < y1 + 12) continue;
      for (let x = 0; x < width; x++) band[(y * width + x) * 4 + 3] = 0;
    }
    // Near-lossless: the tape is translucent, and lossy WebP's colour
    // subsampling brings back a pink cast in its crinkles that the despill
    // removed. 800px keeps the size down and is plenty for a strip of tape.
    await saveRgba(band, width, height, alphaBox(band, width, height), `tape-${k + 1}`, 0, {
      maxWidth: 800,
      webp: { nearLossless: true, quality: 60, effort: 6 },
    });
  }
  return bands;
}

/* ── Paper: flatten the lighting, then make it tile ─────────────────── */

async function paper(size) {
  const { data, info } = await sharp(`${RAW}/paper.png`)
    .removeAlpha()
    .resize(size, size, { fit: "cover" })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, C = 3;

  // 1. Remove the slow light falloff (top is brighter than bottom), which
  //    would show as stripes when tiled: subtract a heavy blur, add the mean back.
  const blur = await sharp(data, { raw: { width: W, height: H, channels: C } }).blur(60).raw().toBuffer();
  const mean = [0, 0, 0];
  for (let i = 0; i < data.length; i++) mean[i % C] += data[i];
  for (let c = 0; c < C; c++) mean[c] /= W * H;
  let img = new Float32Array(data.length);
  for (let i = 0; i < data.length; i++) img[i] = data[i] - blur[i] + mean[i % C];

  // 2. Cross-fade each edge band with a copy shifted by half a tile, one axis
  //    at a time. The shifted copy's own seam lands mid-tile, where the
  //    original is used untouched. Dividing by the weights' RMS keeps the
  //    grain's contrast in the blend zone, so the edges don't look washed out.
  const band = 0.18;
  const blendAxis = (src, horizontal) => {
    const out = new Float32Array(src.length);
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const t = horizontal ? x / (W - 1) : y / (H - 1);
        const w = smoothstep(0, band, Math.min(t, 1 - t));
        const sx = horizontal ? (x + W / 2) % W : x;
        const sy = horizontal ? y : (y + H / 2) % H;
        const norm = Math.sqrt(w * w + (1 - w) * (1 - w));
        for (let c = 0; c < C; c++) {
          const a = src[(y * W + x) * C + c] - mean[c];
          const b = src[(sy * W + sx) * C + c] - mean[c];
          out[(y * W + x) * C + c] = mean[c] + (w * a + (1 - w) * b) / norm;
        }
      }
    }
    return out;
  };
  img = blendAxis(blendAxis(img, true), false);

  const bytes = Buffer.alloc(img.length);
  for (let i = 0; i < img.length; i++) bytes[i] = clamp(Math.round(img[i]), 0, 255);
  await sharp(bytes, { raw: { width: W, height: H, channels: C } }).webp({ quality: 72, effort: 6 }).toFile(`${OUT}/paper.webp`);
}

/* ── Run ────────────────────────────────────────────────────────────── */

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

for (const name of ["highlighter", "circle", "arrow", "torn", "stamp"]) await mask(name);
const bands = await tapes();
await object("pin", 82);
// Never shown wider than 540 CSS px, so 900px covers 1.5x screens. On
// phones it's ~250 CSS px wide, so the 560px copy covers 2x screens.
await object("me-cutout", 80, { maxWidth: 900, smaller: [560], avif: { quality: 62, effort: 7 } });
await paper(1024);
await sharp(`${RAW}/map.png`).resize({ width: MAX_W, withoutEnlargement: true }).webp({ quality: 74, effort: 6 }).toFile(`${OUT}/map.webp`);

const shots = readdirSync(RAW).filter((f) => /^shot-.*\.png$/.test(f));
if (shots.length) console.log(`Screenshots found but not exported (they need a privacy check first): ${shots.join(", ")}`);

// Sizes and kinds for the pages that use these files (content/vox-assets.json).
const kindOf = (name) =>
  ["highlighter", "circle", "arrow", "torn", "stamp"].includes(name) ? "mask"
  : name === "paper" ? "texture"
  : name === "map" ? "image"
  : "object";
const manifest = [];
let total = 0;
for (const f of readdirSync(OUT).sort()) {
  const { size } = statSync(`${OUT}/${f}`);
  const { width, height } = await sharp(`${OUT}/${f}`).metadata();
  const [name, ext] = f.split(".");
  manifest.push({ name, src: `/vox/${f}`, format: ext, kind: kindOf(name), width, height, bytes: size });
  total += size;
  console.log(`${f.padEnd(18)} ${`${width}x${height}`.padEnd(10)} ${(size / 1024).toFixed(1).padStart(7)} KB`);
}
writeFileSync("content/vox-assets.json", `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`${"total".padEnd(29)} ${(total / 1024).toFixed(1).padStart(7)} KB  (budget 1536 KB)`);
console.log(`tape bands (rows in tape.png): ${bands.map(([a, b]) => `${a}-${b}`).join(", ")}`);
