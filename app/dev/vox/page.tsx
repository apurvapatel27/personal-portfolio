/* eslint-disable @next/next/no-img-element -- shows the exact files, not optimiser re-encodes */
import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import assets from "@/content/vox-assets.json";

// Dev-only check of the processed public/vox assets. Not linked anywhere,
// and a 404 in production builds.
export const metadata: Metadata = {
  title: "Vox assets (dev)",
  robots: { index: false, follow: false },
};

const maskColours = [
  { label: "yellow", value: "var(--color-yellow)" },
  { label: "red", value: "var(--color-red)" },
  { label: "blue", value: "var(--color-blue)" },
];

type Asset = (typeof assets)[number];

const kb = (bytes: number) => `${(bytes / 1024).toFixed(1)} KB`;

function Label({ asset }: { asset: Asset }) {
  return (
    <p className="mt-2 font-mono text-[0.72rem] font-semibold tracking-wider text-ink-soft uppercase">
      {asset.src.split("/").pop()} · {asset.width}×{asset.height} · {kb(asset.bytes)}
    </p>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="font-display text-2xl font-extrabold">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

/** A mask filled with a flat colour, the way a page will tint it. */
function TintedMask({ asset, colour }: { asset: Asset; colour: string }) {
  const style: CSSProperties = {
    aspectRatio: `${asset.width} / ${asset.height}`,
    backgroundColor: colour,
    maskImage: `url(${asset.src})`,
    maskSize: "100% 100%",
    maskRepeat: "no-repeat",
  };
  return <div style={style} className="w-full" />;
}

export default function VoxPreviewPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  const of = (kind: string) => assets.filter((a) => a.kind === kind);
  const paper = assets.find((a) => a.name === "paper");
  const total = assets.reduce((sum, a) => sum + a.bytes, 0);

  return (
    <div className="pb-24" style={{ backgroundImage: paper ? `url(${paper.src})` : undefined, backgroundSize: `${paper?.width}px` }}>
      <div className="page pt-12">
        <h1 className="font-display text-4xl font-extrabold">public/vox preview</h1>
        <p className="mt-2 text-ink-soft">
          {assets.length} files · {kb(total)} total (budget 1.5 MB) · background is paper.webp tiled at its full size
        </p>

        <Group title="Ink masks (tinted)">
          <div className="grid gap-10">
            {of("mask").map((asset) => (
              <div key={asset.name}>
                <div className="grid items-center gap-6 sm:grid-cols-3">
                  {maskColours.map((c) => (
                    <div key={c.label}>
                      <TintedMask asset={asset} colour={c.value} />
                    </div>
                  ))}
                </div>
                <Label asset={asset} />
              </div>
            ))}
          </div>
        </Group>

        <Group title="Objects (as-is)">
          <div className="flex flex-wrap items-end gap-10">
            {of("object").map((asset) => (
              <div key={asset.name} style={{ width: asset.name.startsWith("tape") ? 360 : asset.name === "pin" ? 120 : 380 }}>
                <img src={asset.src} alt="" width={asset.width} height={asset.height} className="h-auto w-full" />
                <Label asset={asset} />
              </div>
            ))}
          </div>
        </Group>

        <Group title="Objects on ink (edge check)">
          <div className="flex flex-wrap items-end gap-10 rounded-[8px] bg-ink p-8">
            {of("object").map((asset) => (
              <img
                key={asset.name}
                src={asset.src}
                alt=""
                width={asset.width}
                height={asset.height}
                className="h-auto"
                style={{ width: asset.name.startsWith("tape") ? 260 : asset.name === "pin" ? 90 : 260 }}
              />
            ))}
          </div>
        </Group>

        <Group title="Map">
          {of("image").map((asset) => (
            <div key={asset.name}>
              <img src={asset.src} alt="" width={asset.width} height={asset.height} className="h-auto w-full max-w-[900px]" />
              <Label asset={asset} />
            </div>
          ))}
        </Group>

        <Group title="Paper tiling check">
          {paper && (
            <div>
              <div
                className="h-[600px] w-full rounded-[8px] border-2 border-ink"
                style={{ backgroundImage: `url(${paper.src})`, backgroundSize: "300px" }}
              />
              <p className="mt-2 font-mono text-[0.72rem] font-semibold tracking-wider text-ink-soft uppercase">
                paper.webp repeated every 300px · no seams or stripes should show · {paper.width}×{paper.height} · {kb(paper.bytes)}
              </p>
            </div>
          )}
        </Group>
      </div>
    </div>
  );
}
