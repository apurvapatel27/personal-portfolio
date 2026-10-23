import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { person } from "@/content/site";

/*
 * Shared renderer for the generated share images (1200x630).
 * next/og only understands flexbox and inline styles, so the ruled
 * paper, tape and selection handles are drawn with plain divs.
 */

export const ogSize = { width: 1200, height: 630 };

const fontDir = join(process.cwd(), "assets/fonts");
const [pixel, display, hand, mono, sans] = await Promise.all([
  readFile(join(fontDir, "PixelifySans-Bold.ttf")),
  readFile(join(fontDir, "Figtree-ExtraBold.ttf")),
  readFile(join(fontDir, "Kalam-Bold.ttf")),
  readFile(join(fontDir, "IBMPlexMono-SemiBold.ttf")),
  readFile(join(fontDir, "Figtree-Medium.ttf")),
]);

// Same values as the tokens in app/globals.css.
const colors = {
  paper: "#fbf6ec",
  ink: "#1c1917",
  inkSoft: "#57514a",
  yellow: "#ffd23f",
  orange: "#ff8b3d",
  pink: "#ff9fcb",
  blue: "#72b8ff",
  orangeDeep: "#b3430a",
  blueDeep: "#1d5ca6",
  rule: "rgba(29, 92, 166, 0.13)",
};

type OgContent = {
  eyebrow: string;
  /** Handwritten line above the title. */
  hand?: string;
  title: string;
  titleSize: number;
  /** Draw the title like the hero name: pixel font in a dark, selected box. */
  nameBox?: boolean;
  subtitle: string;
  sticker?: string;
};

function Handle({ top, left }: { top: boolean; left: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        width: 16,
        height: 16,
        backgroundColor: colors.paper,
        border: `3px solid ${colors.blueDeep}`,
        ...(top ? { top: -9 } : { bottom: -9 }),
        ...(left ? { left: -9 } : { right: -9 }),
      }}
    />
  );
}

export function renderOgImage({ eyebrow, hand: handLine, title, titleSize, nameBox, subtitle, sticker }: OgContent) {
  const lines = Array.from({ length: Math.floor(ogSize.height / 34) }, (_, i) => (i + 1) * 34);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: colors.paper,
          fontFamily: "Figtree",
          color: colors.ink,
        }}
      >
        {/* ruled lines */}
        {lines.map((top) => (
          <div
            key={top}
            style={{ position: "absolute", left: 0, right: 0, top, height: 2, backgroundColor: colors.rule }}
          />
        ))}

        {/* tape strips */}
        <div
          style={{
            position: "absolute",
            top: 22,
            right: 120,
            width: 190,
            height: 46,
            backgroundColor: colors.pink,
            opacity: 0.85,
            transform: "rotate(6deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 34,
            right: 64,
            width: 150,
            height: 40,
            backgroundColor: colors.blue,
            opacity: 0.85,
            transform: "rotate(-8deg)",
          }}
        />

        {/* "AP" mark */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 64 64"
          style={{ position: "absolute", top: 70, right: 150, transform: "rotate(-8deg)" }}
        >
          <path
            d="M10 8.5c15-1.6 30-1.4 45 .3 1.8 15.5 1.6 31.4-.2 47-15 1.6-30 1.4-45-.2-1.6-15.6-1.6-31.4.2-47.1Z"
            fill={colors.yellow}
            stroke={colors.ink}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path
            d="M14.5 47 22.8 17.5 31 47M18 36.5h9.5M37.5 47.5V18c6.2-1 13.2.3 13.5 7.2.3 6.8-6.9 8.2-13.2 7.5"
            fill="none"
            stroke={colors.ink}
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 96,
            paddingRight: 120,
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Plex Mono",
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: colors.orangeDeep,
            }}
          >
            {eyebrow}
          </div>
          {handLine && (
            <div
              style={{
                display: "flex",
                marginTop: 18,
                fontFamily: "Kalam",
                fontSize: 46,
                transform: "rotate(-3deg)",
              }}
            >
              {handLine}
            </div>
          )}
          {nameBox ? (
            <div style={{ display: "flex", marginTop: 22 }}>
              <div
                style={{
                  display: "flex",
                  position: "relative",
                  padding: 7,
                  border: `2px solid ${colors.blueDeep}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    padding: `${titleSize * 0.08}px ${titleSize * 0.26}px ${titleSize * 0.12}px`,
                    backgroundColor: colors.ink,
                    color: colors.paper,
                    fontFamily: "Pixelify",
                    fontSize: titleSize,
                    lineHeight: 1,
                    letterSpacing: titleSize * 0.02,
                    textTransform: "uppercase",
                  }}
                >
                  {title}
                </div>
                <Handle top left />
                <Handle top left={false} />
                <Handle top={false} left />
                <Handle top={false} left={false} />
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                marginTop: handLine ? 0 : 16,
                fontFamily: "Figtree Display",
                fontSize: titleSize,
                lineHeight: 1.02,
                letterSpacing: -titleSize * 0.02,
                maxWidth: 900,
              }}
            >
              {title}
            </div>
          )}
          {sticker && (
            <div style={{ display: "flex", marginTop: 30 }}>
              <div
                style={{
                  display: "flex",
                  padding: "10px 24px",
                  border: `3px solid ${colors.ink}`,
                  borderRadius: 999,
                  backgroundColor: colors.yellow,
                  fontFamily: "Plex Mono",
                  fontSize: 26,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  transform: "rotate(-2deg)",
                  boxShadow: `4px 4px 0 ${colors.ink}`,
                }}
              >
                {sticker}
              </div>
            </div>
          )}
          <div style={{ display: "flex", marginTop: 30, fontSize: 30, lineHeight: 1.35, color: colors.inkSoft, maxWidth: 860 }}>
            {subtitle}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Pixelify", data: pixel, weight: 700, style: "normal" },
        { name: "Figtree Display", data: display, weight: 800, style: "normal" },
        { name: "Kalam", data: hand, weight: 700, style: "normal" },
        { name: "Plex Mono", data: mono, weight: 600, style: "normal" },
        { name: "Figtree", data: sans, weight: 500, style: "normal" },
      ],
    },
  );
}

export const ogAlt = `${person.name}, ${person.title}`;
