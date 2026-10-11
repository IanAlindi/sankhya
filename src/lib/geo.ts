// Compass-and-straight-edge geometry for the Geometry view: points, arcs, constructions that
// draw themselves step by step, and the five regular solids. Coordinates are in "math" units
// (y up); the renderer flips them into SVG space.

export type Pt = [number, number];
export type Tone = 'ink' | 'faint' | 'gold' | 'accent' | 'red' | 'blue' | 'p1' | 'p2' | 'p3' | 'p4' | 'p5' | 'p6' | 'p7' | 'p8' | 'p9';

export type Shape =
  | { t: 'circle'; c: Pt; r: number; tone?: Tone; dash?: boolean; fill?: boolean; start?: number }
  | { t: 'line'; a: Pt; b: Pt; tone?: Tone; dash?: boolean; w?: number }
  | { t: 'arc'; c: Pt; r: number; from: number; to: number; tone?: Tone; dash?: boolean }
  | { t: 'poly'; pts: Pt[]; tone?: Tone; fill?: boolean; open?: boolean; dash?: boolean; w?: number }
  | { t: 'dot'; p: Pt; label?: string; at?: Dir; tone?: Tone }
  | { t: 'label'; p: Pt; text: string; tone?: Tone; size?: number; anchor?: 'start' | 'middle' | 'end' };
export type Dir = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export interface CStep { do: string; why: string; add: Shape[] }
export interface Construction { box: [number, number, number, number]; steps: CStep[]; label: string }

export const PHI = (1 + Math.sqrt(5)) / 2;
export const R2 = Math.SQRT2, R3 = Math.sqrt(3), R5 = Math.sqrt(5);
const rad = (d: number) => (d * Math.PI) / 180;

export const polar = (c: Pt, r: number, deg: number): Pt => [c[0] + r * Math.cos(rad(deg)), c[1] + r * Math.sin(rad(deg))];
export const mid = (a: Pt, b: Pt): Pt => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
export const dist = (a: Pt, b: Pt) => Math.hypot(a[0] - b[0], a[1] - b[1]);
export const add = (a: Pt, b: Pt): Pt => [a[0] + b[0], a[1] + b[1]];
export const angleOf = (c: Pt, p: Pt) => (Math.atan2(p[1] - c[1], p[0] - c[0]) * 180) / Math.PI;

/** n corners of a regular polygon on a circle, the first at `start` degrees (90 = top). */
export const regular = (c: Pt, r: number, n: number, start = 90): Pt[] =>
  Array.from({ length: n }, (_, k) => polar(c, r, start + (k * 360) / n));

/** Points along an arc, counter-clockwise from `from` to `to` degrees (or clockwise if to < from). */
export function arcPoints(c: Pt, r: number, from: number, to: number, perDeg = 0.5): Pt[] {
  const steps = Math.max(8, Math.ceil(Math.abs(to - from) * perDeg));
  return Array.from({ length: steps + 1 }, (_, i) => polar(c, r, from + ((to - from) * i) / steps));
}

/** Where two circles cross. */
export function circleX(c1: Pt, r1: number, c2: Pt, r2: number): Pt[] {
  const d = dist(c1, c2);
  if (d > r1 + r2 || d < Math.abs(r1 - r2) || d === 0) return [];
  const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, r1 * r1 - a * a));
  const m: Pt = [c1[0] + (a * (c2[0] - c1[0])) / d, c1[1] + (a * (c2[1] - c1[1])) / d];
  return [
    [m[0] + (h * (c2[1] - c1[1])) / d, m[1] - (h * (c2[0] - c1[0])) / d],
    [m[0] - (h * (c2[1] - c1[1])) / d, m[1] + (h * (c2[0] - c1[0])) / d],
  ];
}

// ---------------------------------------------------------------------------------------------
// Rendering helpers: map a construction's math box onto an SVG canvas of fixed pixel width.
// ---------------------------------------------------------------------------------------------
export function frame(box: Construction['box'], width = 420, pad = 18) {
  const [x0, y0, x1, y1] = box;
  const s = (width - 2 * pad) / (x1 - x0);
  const height = (y1 - y0) * s + 2 * pad;
  const to = (p: Pt): Pt => [(p[0] - x0) * s + pad, (y1 - p[1]) * s + pad];
  return { width, height, s, to };
}
export const pathOf = (pts: Pt[], to: (p: Pt) => Pt, close = false) =>
  pts.map((p, i) => { const [x, y] = to(p); return `${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`; }).join(' ') + (close ? ' Z' : '');

// ---------------------------------------------------------------------------------------------
// Theon's side and diagonal numbers: 1/1, 3/2, 7/5, 17/12 … alternately over and under √2.
// ---------------------------------------------------------------------------------------------
export function sideDiagonal(n: number) {
  const out: { side: number; diag: number }[] = [{ side: 1, diag: 1 }];
  while (out.length < n) {
    const { side, diag } = out[out.length - 1];
    out.push({ side: side + diag, diag: diag + 2 * side });
  }
  return out;
}

export function fibonacci(n: number, a = 1, b = 1) {
  const out = [a, b];
  while (out.length < n) out.push(out[out.length - 1] + out[out.length - 2]);
  return out.slice(0, n);
}

/** Squares added round and round a growing rectangle (the gnomon of a Fibonacci rectangle),
 *  with the quarter-circle that each square contributes to the spiral. Unit squares to start. */
export function whirl(count: number) {
  const f = fibonacci(Math.max(2, count));
  const squares: { x: number; y: number; s: number; arc: { c: Pt; from: number } }[] = [];
  // the bounding rectangle so far
  let minX = 0, minY = 0, maxX = 1, maxY = 1;
  squares.push({ x: 0, y: 0, s: 1, arc: { c: [1, 1], from: 180 } });
  // direction order: right, up, left, down (counter-clockwise growth)
  for (let i = 1; i < count; i++) {
    const s = f[i];
    let x = 0, y = 0, c: Pt = [0, 0], from = 0;
    switch (i % 4) {
      case 1: x = maxX; y = minY; c = [maxX, maxY]; from = 270; break;          // to the right, arc corner top-left of square
      case 2: x = maxX - s; y = maxY; c = [maxX - s, maxY]; from = 0; break;     // on top
      case 3: x = minX - s; y = maxY - s; c = [minX, minY]; from = 90; break;    // to the left
      case 0: x = minX; y = minY - s; c = [minX + s, minY]; from = 180; break;   // below
    }
    squares.push({ x, y, s, arc: { c, from } });
    minX = Math.min(minX, x); minY = Math.min(minY, y); maxX = Math.max(maxX, x + s); maxY = Math.max(maxY, y + s);
  }
  return { squares, box: [minX, minY, maxX, maxY] as [number, number, number, number], f };
}

// ---------------------------------------------------------------------------------------------
// The five regular solids: vertices on a unit sphere and edges between nearest neighbours.
// ---------------------------------------------------------------------------------------------
export type SolidK = 'tetrahedron' | 'cube' | 'octahedron' | 'icosahedron' | 'dodecahedron';
type V3 = [number, number, number];

function solidVerts(k: SolidK): V3[] {
  const p = PHI, q = 1 / PHI;
  switch (k) {
    case 'tetrahedron': return [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]];
    case 'cube': return [-1, 1].flatMap((x) => [-1, 1].flatMap((y) => [-1, 1].map((z) => [x, y, z] as V3)));
    case 'octahedron': return [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
    case 'icosahedron': {
      const v: V3[] = [];
      for (const a of [-1, 1]) for (const b of [-p, p]) v.push([0, a, b], [a, b, 0], [b, 0, a]);
      return v;
    }
    case 'dodecahedron': {
      const v: V3[] = [-1, 1].flatMap((x) => [-1, 1].flatMap((y) => [-1, 1].map((z) => [x, y, z] as V3)));
      for (const a of [-1, 1]) for (const b of [-1, 1]) v.push([0, a * q, b * p], [a * q, b * p, 0], [b * p, 0, a * q]);
      return v;
    }
  }
}

export function solid(k: SolidK) {
  const raw = solidVerts(k);
  const r = Math.hypot(...raw[0]);
  const verts = raw.map((v) => v.map((x) => x / r) as V3);
  let min = Infinity;
  for (let i = 0; i < verts.length; i++) for (let j = i + 1; j < verts.length; j++) {
    const d = Math.hypot(verts[i][0] - verts[j][0], verts[i][1] - verts[j][1], verts[i][2] - verts[j][2]);
    if (d < min) min = d;
  }
  const edges: [number, number][] = [];
  for (let i = 0; i < verts.length; i++) for (let j = i + 1; j < verts.length; j++) {
    const d = Math.hypot(verts[i][0] - verts[j][0], verts[i][1] - verts[j][1], verts[i][2] - verts[j][2]);
    if (d < min * 1.001) edges.push([i, j]);
  }
  return { verts, edges };
}

export const rotate = ([x, y, z]: V3, ax: number, ay: number): V3 => {
  const cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax);
  const x1 = x * cy + z * sy, z1 = -x * sy + z * cy;
  const y2 = y * cx - z1 * sx, z2 = y * sx + z1 * cx;
  return [x1, y2, z2];
};
