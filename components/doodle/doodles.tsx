import type { SVGProps } from "react";
import type { DoodleName } from "@/content/site";

/*
 * Hand-drawn style illustrations, drawn from scratch as inline SVG.
 * All are decorative (aria-hidden); wrappers provide labels when needed.
 */

type DoodleProps = SVGProps<SVGSVGElement>;

const ink = "var(--color-ink)";
const stroke = {
  stroke: ink,
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Svg({ children, viewBox, ...props }: DoodleProps & { viewBox: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox={viewBox} fill="none" {...props}>
      {children}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Small icons (service cards)                                          */
/* ------------------------------------------------------------------ */

export function BoardIcon(props: DoodleProps) {
  return (
    <Svg viewBox="0 0 64 64" {...props}>
      <path d="M8 12.5c15-1.2 33-.8 48 .3 1 12.4.8 27 .2 39.6-16 .9-32 .7-48-.2-.9-13-.9-26.6-.2-39.7Z" fill="#fff" {...stroke} />
      <path d="M8.5 21.5c16-.6 31.5-.5 47.5.2M25 13l.4 39M40 13l-.3 39.2" {...stroke} strokeWidth={2} />
      <rect x="12" y="25" width="10" height="7" rx="2" fill="var(--color-yellow)" {...stroke} strokeWidth={1.8} />
      <rect x="12" y="35" width="10" height="7" rx="2" fill="var(--color-blue)" {...stroke} strokeWidth={1.8} />
      <rect x="28" y="25" width="9" height="7" rx="2" fill="var(--color-mint)" {...stroke} strokeWidth={1.8} />
      <rect x="43" y="25" width="10" height="7" rx="2" fill="var(--color-pink)" {...stroke} strokeWidth={1.8} />
      <path d="M46 40l2.5 2.6 4.5-5" stroke="var(--color-green-deep)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function AgentIcon(props: DoodleProps) {
  return (
    <Svg viewBox="0 0 64 64" {...props}>
      <path d="M32 9.5v7" {...stroke} />
      <path d="M32 3.5l1.3 3 3 1.2-3 1.3L32 12l-1.3-3-3-1.3 3-1.2Z" fill="var(--color-yellow)" {...stroke} strokeWidth={1.6} />
      <path d="M13.5 18.8c12-1.6 25-1.4 37 .3 1.6 9 1.4 19-.2 27.6-12.3 1.5-24.6 1.4-36.8-.2-1.5-9.3-1.5-18.5 0-27.7Z" fill="var(--color-mint)" {...stroke} />
      <circle cx="24.5" cy="31" r="3.4" fill={ink} />
      <circle cx="40" cy="31" r="3.4" fill={ink} />
      <path d="M25.5 39.5c4 2.6 9.5 2.6 13.5 0" {...stroke} strokeWidth={2.2} />
      <path d="M13.5 30h-4.5M55 30h-4.5" {...stroke} />
      <path d="M20 52.5c7.6 1.4 16.7 1.4 24.5 0" {...stroke} strokeWidth={2} />
    </Svg>
  );
}

export function AutomationIcon(props: DoodleProps) {
  return (
    <Svg viewBox="0 0 64 64" {...props}>
      <circle cx="13" cy="15" r="7.5" fill="var(--color-blue)" {...stroke} />
      <circle cx="51" cy="15" r="7.5" fill="var(--color-pink)" {...stroke} />
      <circle cx="32" cy="50" r="8" fill="var(--color-yellow)" {...stroke} />
      <path d="M20.5 16.5c6-2 15-2 22.5 0M17 21.5c3 9 7 15.5 10.5 21.8M47 21.5c-3 9-6.8 15.6-10.3 21.6" {...stroke} strokeWidth={2.1} strokeDasharray="0.1 5" />
      <path d="M33.5 44.5l-4 6.3h5l-3.7 6" {...stroke} strokeWidth={2.2} />
    </Svg>
  );
}

export function DesignIcon(props: DoodleProps) {
  return (
    <Svg viewBox="0 0 64 64" {...props}>
      <path d="M7.5 10.5c11-.8 22-.6 32.5.3.7 8.5.5 17-.3 25.5-10.9.6-21.6.5-32.4-.3-.6-8.5-.6-17 .2-25.5Z" fill="#fff" {...stroke} />
      <path d="M12 17h15M12 23h22M12 29h10" {...stroke} strokeWidth={2} />
      <path d="M44 23.5l12.5 12.5-15 18-8.5 2.5 2.4-8.6 13.4-17Z" fill="var(--color-pink)" {...stroke} />
      <path d="M48.5 28l6 6M35.3 48l6 5.5" {...stroke} strokeWidth={2} />
      <path d="M9 46.5c4-3 7 3 11 0s7 3 11 0" stroke="var(--color-orange)" strokeWidth={2.4} strokeLinecap="round" />
    </Svg>
  );
}

export function WebIcon(props: DoodleProps) {
  return (
    <Svg viewBox="0 0 64 64" {...props}>
      <path d="M6.5 11c17-1 34-.8 51 .3.9 14 .7 28-.3 42-17 .9-34 .8-50.6-.2-1-14-1-28-.1-42.1Z" fill="#fff" {...stroke} />
      <path d="M6.8 20.5c17-.7 34-.6 50.8.2" {...stroke} strokeWidth={2} />
      <circle cx="12.5" cy="15.8" r="1.6" fill="var(--color-orange)" />
      <circle cx="18" cy="15.8" r="1.6" fill="var(--color-yellow)" />
      <circle cx="23.5" cy="15.8" r="1.6" fill="var(--color-green-deep)" />
      <rect x="12" y="26" width="22" height="13" rx="2.5" fill="var(--color-yellow)" {...stroke} strokeWidth={1.8} />
      <path d="M39 28h13M39 33.5h10M12 45h30M12 49.5h20" {...stroke} strokeWidth={2} />
    </Svg>
  );
}

/* ------------------------------------------------------------------ */
/* Large illustrations (project cards)                                  */
/* ------------------------------------------------------------------ */

export function CrmIllustration(props: DoodleProps) {
  return (
    <Svg viewBox="0 0 440 300" {...props}>
      {/* before: the spreadsheet */}
      <text x="40" y="52" className="font-hand" fontSize="22" fill={ink} transform="rotate(-4 40 52)">
        before
      </text>
      <g transform="rotate(-5 100 140)">
        <path d="M28 70c40-2 82-1.4 124 .5 1.4 40 1.2 80-.3 120-41.6 1.4-82.6 1.2-123.4-.4-1.4-40-1.5-80-.3-120Z" fill="#fff" {...stroke} />
        <path d="M28.5 92c41-.8 82-.6 123 .4" {...stroke} strokeWidth={2} />
        <path d="M28 70.5h124v21.5H28Z" fill="var(--color-blue-tint)" />
        <path d="M66 71l.5 119M108 70.5l-.4 120M29 116c41 .3 82 .2 122.5 0M29 140c41 .4 82 .3 122.8-.1M29 164c41 .3 82 .2 122.6 0" {...stroke} strokeWidth={1.6} opacity={0.7} />
        <path d="M37 103h18M76 103h22M116 103h26M37 127h22M76 127h16M116 127h20M37 151h14M76 151h24M116 151h18M37 175h20M76 175h14" {...stroke} strokeWidth={2} opacity={0.5} />
      </g>
      {/* the red cross-out */}
      <path d="M30 92c34 26 72 60 118 92M146 84c-32 30-70 64-112 104" stroke="var(--color-orange)" strokeWidth={5} strokeLinecap="round" />
      <path d="M36 98c32 26 70 58 108 82" stroke="var(--color-orange)" strokeWidth={2} strokeLinecap="round" opacity={0.55} />

      {/* arrow */}
      <path d="M172 150c18-24 44-30 70-14" {...stroke} strokeWidth={3} />
      <path d="M229 124l14 12-17 6" {...stroke} strokeWidth={3} />

      {/* after: the CRM board */}
      <text x="282" y="40" className="font-hand" fontSize="22" fill={ink} transform="rotate(3 282 40)">
        after
      </text>
      <path d="M258 54c50-1.6 104-1.2 158 .4 1.6 64 1.4 128-.4 192-53 1.6-105.6 1.4-157.6-.4-1.6-64-1.6-128 0-192Z" fill="#fff" {...stroke} />
      <path d="M258.5 78c52-.8 105-.6 157.5.3" {...stroke} strokeWidth={2} />
      <circle cx="270" cy="66" r="3" fill="var(--color-orange)" />
      <circle cx="281" cy="66" r="3" fill="var(--color-yellow)" />
      <circle cx="292" cy="66" r="3" fill="var(--color-green-deep)" />
      {[0, 1, 2].map((col) => {
        const x = 268 + col * 50;
        const fills = [
          ["var(--color-yellow)", "var(--color-blue)", "var(--color-pink)"],
          ["var(--color-mint)", "var(--color-yellow)"],
          ["var(--color-blue)"],
        ][col];
        return (
          <g key={col}>
            <rect x={x} y="88" width="40" height="8" rx="4" fill="var(--color-paper-deep)" />
            {fills.map((fill, row) => (
              <g key={row}>
                <rect x={x} y={104 + row * 40} width="40" height="32" rx="5" fill={fill} {...stroke} strokeWidth={1.8} />
                <path d={`M${x + 6} ${116 + row * 40}h22M${x + 6} ${125 + row * 40}h14`} {...stroke} strokeWidth={1.6} />
              </g>
            ))}
          </g>
        );
      })}
      {/* phone on the last column card */}
      <path d="M375 116c1.5 4 4 6.8 7.5 8.8l2.4-2.3 3.6 2-1.3 3.6c-6 0-12.6-6.4-13-12.6l3.5-1.4 1.8 3.8Z" fill="#fff" {...stroke} strokeWidth={1.6} />
      {/* sparkles = AI */}
      <path d="M392 182l2.4 6 6 2.4-6 2.4-2.4 6-2.4-6-6-2.4 6-2.4Z" fill="var(--color-yellow)" {...stroke} strokeWidth={1.8} />
      <path d="M370 210l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6Z" fill="var(--color-mint)" {...stroke} strokeWidth={1.6} />
      <path d="M268 226c10-5 20 5 30 0s20 5 30 0" stroke="var(--color-blue-deep)" strokeWidth={2.5} strokeLinecap="round" />
    </Svg>
  );
}

export function ShieldIllustration(props: DoodleProps) {
  const packets = [
    { x: 24, y: 128, fill: "var(--color-blue)" },
    { x: 62, y: 112, fill: "var(--color-blue)" },
    { x: 94, y: 140, fill: "var(--color-orange)", bad: true },
    { x: 130, y: 120, fill: "var(--color-blue)" },
  ];
  return (
    <Svg viewBox="0 0 440 300" {...props}>
      {/* radar arcs */}
      <path d="M220 40c50 0 90 40 90 110M220 18c64 0 112 52 112 132M220 40c-50 0-90 40-90 110M220 18c-64 0-112 52-112 132" stroke="var(--color-blue-deep)" strokeWidth={2} strokeLinecap="round" strokeDasharray="2 7" />
      {/* incoming packets */}
      {packets.map((p) => (
        <g key={p.x}>
          <rect x={p.x} y={p.y} width="26" height="20" rx="4" fill={p.fill} {...stroke} strokeWidth={2} />
          {p.bad && <path d={`M${p.x + 7} ${p.y + 5}l12 10M${p.x + 19} ${p.y + 5}l-12 10`} {...stroke} strokeWidth={2.2} />}
        </g>
      ))}
      <path d="M20 160c40 6 90 4 140-4" {...stroke} strokeWidth={1.8} strokeDasharray="1 7" />
      {/* the shield */}
      <path d="M220 66c22 12 44 17 66 16 3 50-12 98-66 128-54-30-69-78-66-128 22 1 44-4 66-16Z" fill="var(--color-mint)" {...stroke} strokeWidth={3} />
      <path d="M220 84c15 8 30 12 46 12 1 36-9 70-46 92" stroke="#fff" strokeWidth={4} strokeLinecap="round" opacity={0.6} />
      <path d="M198 138l15 15 30-34" stroke={ink} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
      {/* clean packets leaving */}
      <rect x="320" y="118" width="26" height="20" rx="4" fill="var(--color-blue)" {...stroke} strokeWidth={2} />
      <rect x="364" y="132" width="26" height="20" rx="4" fill="var(--color-blue)" {...stroke} strokeWidth={2} />
      <path d="M300 168c40-4 80-2 120 6" {...stroke} strokeWidth={1.8} strokeDasharray="1 7" />
      {/* alert chart */}
      <path d="M150 268c40-1 100-1 140 1" {...stroke} strokeWidth={2} />
      <path d="M160 266V246M180 266V236M200 266V252M220 266V224M240 266V244M260 266V238M280 266V256" stroke="var(--color-blue-deep)" strokeWidth={7} strokeLinecap="round" />
      <text x="300" y="262" className="font-hand" fontSize="20" fill={ink}>
        alerts
      </text>
    </Svg>
  );
}

export function PayslipIllustration(props: DoodleProps) {
  return (
    <Svg viewBox="0 0 440 300" {...props}>
      <g transform="rotate(-3 220 150)">
        <path d="M130 30c60-1.6 120-1.2 180 .4 1.4 72 1.2 152 .3 226l-15-10-15 10-15-10-15 10-15-10-15 10-15-10-15 10-15-10-15 10-15-10-15 10c-1.2-75-1.3-150 .2-226.6Z" fill="#fff" {...stroke} strokeWidth={2.6} />
        <path d="M150 58h80" {...stroke} strokeWidth={4} />
        <path d="M150 74h50" {...stroke} strokeWidth={2} opacity={0.6} />
        <path d="M150 104c45-.6 95-.6 140 .4" {...stroke} strokeWidth={1.6} strokeDasharray="2 6" />
        <path d="M150 126h60M262 126h28M150 148h48M262 148h28M150 170h70M262 170h28" {...stroke} strokeWidth={2.2} />
        <path d="M150 196c45-.6 95-.6 140 .4" {...stroke} strokeWidth={1.6} strokeDasharray="2 6" />
        <path d="M150 218h40M248 218h42" {...stroke} strokeWidth={4} />
      </g>
      <g transform="rotate(-14 330 210)">
        <rect x="270" y="186" width="120" height="48" rx="8" stroke="var(--color-orange-deep)" strokeWidth={4} />
        <text x="330" y="222" textAnchor="middle" fontFamily="var(--font-plex-mono), monospace" fontWeight="600" fontSize="28" fill="var(--color-orange-deep)" letterSpacing="4">
          PAID
        </text>
      </g>
      <path d="M78 96l2.6 6.6 6.6 2.6-6.6 2.6-2.6 6.6-2.6-6.6-6.6-2.6 6.6-2.6Z" fill="var(--color-yellow)" {...stroke} strokeWidth={1.8} />
      <path d="M60 210c8-6 16 6 24 0s16 6 24 0" stroke="var(--color-blue-deep)" strokeWidth={2.5} strokeLinecap="round" />
    </Svg>
  );
}

/* ------------------------------------------------------------------ */
/* Decorations                                                          */
/* ------------------------------------------------------------------ */

export function Star(props: DoodleProps) {
  return (
    <Svg viewBox="0 0 48 48" {...props}>
      <path d="M24 4.5l5.6 12.3 13.2 1.4-9.9 9 2.8 13.1L24 33.6l-11.7 6.7 2.8-13.1-9.9-9 13.2-1.4Z" fill="var(--color-yellow)" {...stroke} />
    </Svg>
  );
}

export function Spark(props: DoodleProps) {
  return (
    <Svg viewBox="0 0 40 40" {...props}>
      <path d="M20 3c1.6 9 6.6 14.6 17 17-10.4 2.4-15.4 8-17 17-1.6-9-6.6-14.6-17-17 10.4-2.4 15.4-8 17-17Z" fill="var(--color-mint)" {...stroke} />
    </Svg>
  );
}

export function SquiggleArrow(props: DoodleProps) {
  return (
    <Svg viewBox="0 0 120 60" {...props}>
      <path d="M6 44c14-22 28 6 42-12s24-16 34-4 18 4 30-14" {...stroke} />
      <path d="M100 12l12 2-4 11" {...stroke} />
    </Svg>
  );
}

/** Two quick crayon strokes under a word. Uses currentColor. */
export function DoubleUnderline(props: DoodleProps) {
  return (
    <Svg viewBox="0 0 200 18" preserveAspectRatio="none" {...props}>
      <path d="M3 6.5C48 2 104 9.5 197 4" stroke="currentColor" strokeWidth={3.2} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <path d="M12 14c52-4.5 112 1 180-3.5" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </Svg>
  );
}

/** Loopy hand-drawn arrow pointing up and to the right. Flip it with scale classes. */
export function CurvyArrow(props: DoodleProps) {
  return (
    <Svg viewBox="0 0 90 70" {...props}>
      <path d="M6 62c4-17 12-29 25-31 10-1.5 13 7.5 6.6 10.5-7 3.2-9.8-7.2-1.6-15.5C46 15.6 61 11 80 9.5" {...stroke} />
      <path d="M69 3.5l12 6-9.5 9" {...stroke} />
    </Svg>
  );
}

export function Pin(props: DoodleProps) {
  return (
    <Svg viewBox="0 0 32 40" {...props}>
      <path d="M16 37c-7-9.5-11.5-16-11.5-21.5a11.5 11.5 0 0 1 23 0C27.5 21 23 27.5 16 37Z" fill="var(--color-orange)" {...stroke} strokeWidth={2.2} />
      <circle cx="16" cy="15.5" r="4" fill="#fff" {...stroke} strokeWidth={2} />
    </Svg>
  );
}

export function Smiley(props: DoodleProps) {
  return (
    <Svg viewBox="0 0 48 48" {...props}>
      <path d="M24 4.5c11 .2 19.4 8.6 19.5 19.6.1 11-8.4 19.4-19.6 19.4C13 43.5 4.6 35 4.5 24 4.5 13 13 4.3 24 4.5Z" fill="var(--color-blue)" {...stroke} />
      <path d="M17 19v3M31 19v3" {...stroke} strokeWidth={3.2} />
      <path d="M15.5 29c4.6 5.6 12.4 5.6 17 0" {...stroke} />
    </Svg>
  );
}

/** Lookup used by content-driven components. */
export function Doodle({ name, ...props }: DoodleProps & { name: DoodleName }) {
  switch (name) {
    case "crm":
      return <BoardIcon {...props} />;
    case "agent":
      return <AgentIcon {...props} />;
    case "automation":
      return <AutomationIcon {...props} />;
    case "design":
      return <DesignIcon {...props} />;
    case "web":
      return <WebIcon {...props} />;
    case "shield":
      return <ShieldIllustration {...props} />;
    case "payslip":
      return <PayslipIllustration {...props} />;
  }
}

/** Large illustration for a project card. */
export function ProjectIllustration({ name, ...props }: DoodleProps & { name: DoodleName }) {
  if (name === "crm") return <CrmIllustration {...props} />;
  if (name === "shield") return <ShieldIllustration {...props} />;
  if (name === "payslip") return <PayslipIllustration {...props} />;
  return <Doodle name={name} {...props} />;
}
