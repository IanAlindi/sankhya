// The arithmetic of the book: reduction to one digit, the three personal numbers,
// the year projection, the Vedic Square and the Lo Shu grid.

export type N = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export const NINE: N[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/** Digital root. In arithmetic this is n mod 9, with 0 written as 9 ("casting out nines"). */
export function root(n: number): N {
  n = Math.abs(Math.trunc(n));
  if (n === 0) return 9;
  return (1 + ((n - 1) % 9)) as N;
}

export const digitSum = (s: string | number) =>
  [...String(s)].reduce((a, c) => (c >= '0' && c <= '9' ? a + Number(c) : a), 0);

export interface YMD { y: number; m: number; d: number }

export function parseYMD(s: string): YMD | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const y = +m[1], mo = +m[2], d = +m[3];
  const dt = new Date(y, mo - 1, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== mo - 1 || dt.getDate() !== d) return null;
  return { y, m: mo, d };
}

export const ymdToDate = ({ y, m, d }: YMD) => new Date(y, m - 1, d, 12);
export const dateToYMD = (dt: Date): YMD => ({ y: dt.getFullYear(), m: dt.getMonth() + 1, d: dt.getDate() });
export const ymdKey = ({ y, m, d }: YMD) =>
  `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
export function addDays(v: YMD, k: number): YMD {
  const dt = ymdToDate(v);
  dt.setDate(dt.getDate() + k);
  return dateToYMD(dt);
}

/** A number as the book reads it: the compound it came from and the single digit it reduces to. */
export interface Reading { compound: number; root: N; exalted: boolean }

/** Book, p.18: a single number is "exalted" when it comes from a particular compound. */
export const EXALTED: Record<N, number[]> = {
  1: [28], 2: [29], 3: [12], 4: [31], 5: [23, 32], 6: [24, 33], 7: [25, 34], 8: [26, 35], 9: [27, 36],
};

function reading(compound: number): Reading {
  const r = root(compound);
  return { compound, root: r, exalted: EXALTED[r].includes(compound) };
}

/** Psychic number: the day of the month, reduced. */
export const psychic = (b: YMD) => reading(b.d);

/** Destiny number: every digit of day, month and year added. */
export const destiny = (b: YMD) => reading(digitSum(`${b.d}${b.m}${b.y}`));

// --- Name systems ----------------------------------------------------------

export type NameSystem = 'johari' | 'chaldean' | 'pythagorean';

/** The "Unit System" printed in the book, p.10. */
const JOHARI: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, C: 2, K: 2, R: 2,
  G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  N: 5, E: 5,
  U: 6, V: 6, W: 6, X: 6,
  O: 7, Z: 7,
  F: 8, H: 8, P: 8,
};
/** Cheiro's Chaldean table (1926), the most common modern variant. No letter carries 9. */
const CHALDEAN: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1, B: 2, K: 2, R: 2, C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4, E: 5, H: 5, N: 5, X: 5, U: 6, V: 6, W: 6, O: 7, Z: 7, F: 8, P: 8,
};
/** Pythagorean: letters numbered 1–9 in alphabet order, cycling. */
const PYTHAGOREAN: Record<string, number> = Object.fromEntries(
  [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map((c, i) => [c, (i % 9) + 1]),
);
export const NAME_TABLES: Record<NameSystem, Record<string, number>> = {
  johari: JOHARI, chaldean: CHALDEAN, pythagorean: PYTHAGOREAN,
};
export const NAME_SYSTEM_LABEL: Record<NameSystem, string> = {
  johari: 'Johari (book)', chaldean: 'Chaldean (Cheiro)', pythagorean: 'Pythagorean',
};

export interface NameWord { word: string; letters: { ch: string; v: number }[]; total: number; reading: Reading }
export interface NameReading { words: NameWord[]; total: number; reading: Reading; first: string }

export function nameReading(raw: string, system: NameSystem = 'johari'): NameReading | null {
  const table = NAME_TABLES[system];
  const words = raw
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toUpperCase().split(/[^A-Z]+/).filter(Boolean)
    .map((word) => {
      const letters = [...word].map((ch) => ({ ch, v: table[ch] ?? 0 }));
      const total = letters.reduce((a, l) => a + l.v, 0);
      return { word, letters, total, reading: reading(total) };
    });
  if (!words.length) return null;
  const total = words.reduce((a, w) => a + w.total, 0);
  return { words, total, reading: reading(total), first: words[0].word[0] };
}

// --- Time -------------------------------------------------------------------

/** Book footnote: each weekday carries the number of its ruling planet. Index = JS getDay(). */
export const WEEKDAY_NUMBER: N[] = [1, 2, 9, 5, 3, 6, 8];

/** The book's yearly projection (p.188): month + day + last two digits of the year
 *  + the weekday number of the birthday in that year. */
export function yearNumber(b: YMD, year: number) {
  const day = b.m === 2 && b.d === 29 && !isLeap(year) ? 28 : b.d;
  const wd = new Date(year, b.m - 1, day).getDay();
  const yy = year % 100;
  const total = b.m + b.d + yy + WEEKDAY_NUMBER[wd];
  return { total, root: root(total), weekday: wd, parts: [b.m, b.d, yy, WEEKDAY_NUMBER[wd]] };
}
const isLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

/** The date number the book uses for "good dates" and appointments: the day of month, reduced. */
export const dateNumber = (v: YMD) => root(v.d);
/** The whole calendar date reduced, the way a destiny number is made. */
export const fullDateNumber = (v: YMD) => root(digitSum(`${v.d}${v.m}${v.y}`));

export function ageOn(b: YMD, on: YMD) {
  let a = on.y - b.y;
  if (on.m < b.m || (on.m === b.m && on.d < b.d)) a--;
  return a;
}

/** Pythagorean life path: month, day and year reduced separately, master numbers kept. */
export function lifePath(b: YMD) {
  const red = (n: number): number => {
    while (n > 9 && n !== 11 && n !== 22 && n !== 33) n = digitSum(n);
    return n;
  };
  return red(red(b.m) + red(b.d) + red(digitSum(b.y)));
}

// --- Geometry of nine --------------------------------------------------------

/** The Vedic Square: the 9×9 multiplication table, every product reduced. */
export const VEDIC: N[][] = NINE.map((i) => NINE.map((j) => root(i * j)));
export function vedicCells(n: N) {
  const out: [number, number][] = [];
  VEDIC.forEach((row, i) => row.forEach((v, j) => v === n && out.push([i, j])));
  return out;
}

/** Lo Shu magic square: the oldest known, from Chinese legend. */
export const LO_SHU = [[4, 9, 2], [3, 5, 7], [8, 1, 6]];
export const LO_SHU_PLANES: { name: string; nums: N[]; meaning: string }[] = [
  { name: 'Mind', nums: [4, 9, 2], meaning: 'thinking, memory, planning' },
  { name: 'Heart', nums: [3, 5, 7], meaning: 'feeling, imagination, spirit' },
  { name: 'Hands', nums: [8, 1, 6], meaning: 'practical, material life' },
  { name: 'Thought', nums: [4, 3, 8], meaning: 'ideas turned into plans' },
  { name: 'Will', nums: [9, 5, 1], meaning: 'determination, follow-through' },
  { name: 'Action', nums: [2, 7, 6], meaning: 'doing, movement, delivery' },
  { name: 'Resolve', nums: [4, 5, 6], meaning: 'steadiness of purpose' },
  { name: 'Ground', nums: [2, 5, 8], meaning: 'stability, property, roots' },
];
export function loShuCounts(b: YMD): Record<N, number> {
  const c = Object.fromEntries(NINE.map((n) => [n, 0])) as Record<N, number>;
  for (const ch of `${b.d}${b.m}${b.y}`) if (ch !== '0') c[Number(ch) as N]++;
  return c;
}

/** The book's planetary yantras: every one is a Lo Shu shifted by a constant, except Saturn,
 *  which is printed as the Lo Shu itself (Agrippa's "table of Saturn"). */
const SUN_BASE = [6, 1, 8, 7, 5, 3, 2, 9, 4];
const SHIFT: Record<N, number> = { 1: 0, 2: 1, 9: 2, 5: 3, 3: 4, 6: 5, 4: 7, 7: 8, 8: -1 };
export function yantra(n: N): number[] {
  if (SHIFT[n] < 0) return [4, 9, 2, 3, 5, 7, 8, 1, 6];
  return SUN_BASE.map((v) => v + SHIFT[n]);
}
export const yantraConstant = (n: N) => yantra(n).slice(0, 3).reduce((a, b) => a + b, 0);

// --- The whole person ---------------------------------------------------------

export interface Profile {
  name: string;
  dob: string;           // YYYY-MM-DD
  time?: string;         // HH:MM, optional
  utcOffset?: number;    // hours, for the birth moon
  hinduDay?: boolean;    // use the sunrise reckoning for births in the small hours
}

export interface Self {
  birth: YMD;            // calendar birth date as entered
  reckoned: YMD;         // the date used for the numbers (may be the previous day)
  twilight: boolean;     // born in the small hours: the Hindu day may differ
  psychic: Reading;
  destiny: Reading;
  name: NameReading | null;
  altPsychic?: Reading;  // the other reckoning, for twilight births
}

export function computeSelf(p: Profile): Self | null {
  const birth = parseYMD(p.dob);
  if (!birth) return null;
  let twilight = false;
  if (p.time) {
    const [h, m] = p.time.split(':').map(Number);
    // Book footnote 2: the Hindu date turns about 1½–2 hours before sunrise.
    // Without the birthplace sunrise we assume one near 6:00, so the line falls near 4:00.
    twilight = h * 60 + m < 4 * 60;
  }
  const prev = addDays(birth, -1);
  const reckoned = twilight && p.hinduDay ? prev : birth;
  return {
    birth, reckoned, twilight,
    psychic: psychic(reckoned),
    destiny: destiny(reckoned),
    name: p.name.trim() ? nameReading(p.name) : null,
    altPsychic: twilight ? psychic(p.hinduDay ? birth : prev) : undefined,
  };
}

/** Book: the psychic number is "very powerful up to the age of thirty-five to forty",
 *  after which destiny "becomes more active". Returns psyche's share, 0–1. */
export function psycheShare(age: number) {
  if (age <= 30) return 0.7;
  if (age >= 42) return 0.35;
  return 0.7 - ((age - 30) / 12) * 0.35;
}
