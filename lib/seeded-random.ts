/**
 * Tiny deterministic PRNG so hand-drawn shapes look "random" but render
 * identically on the server and the client (no hydration mismatches).
 */

function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Returns a function producing numbers in [0, 1) for the given seed. */
export function seededRandom(seed: string): () => number {
  let state = hashString(seed) || 1;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Random number in [-amount, amount]. */
export function jitter(rand: () => number, amount: number): number {
  return (rand() * 2 - 1) * amount;
}
