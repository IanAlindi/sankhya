// Low-precision astronomy, enough for an almanac: Sun and Moon longitudes after Jean Meeus,
// "Astronomical Algorithms" (2nd ed., ch. 25 and 47, truncated series), the Lahiri ayanamsa,
// sunrise by the standard sunrise equation, planetary hours, Rahu Kala and the Maya count.
// Accuracy: Moon within a few arcminutes, sunrise within a couple of minutes.

import type { N, YMD } from './num';

const R = Math.PI / 180;
const norm = (x: number) => ((x % 360) + 360) % 360;
const sin = (d: number) => Math.sin(d * R);
const cos = (d: number) => Math.cos(d * R);

export const jd = (t: Date) => t.getTime() / 86400000 + 2440587.5;
export const fromJd = (j: number) => new Date((j - 2440587.5) * 86400000);
const cent = (j: number) => (j - 2451545) / 36525;

export function sunLongitude(j: number) {
  const T = cent(j);
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  const M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * sin(M)
    + (0.019993 - 0.000101 * T) * sin(2 * M) + 0.000289 * sin(3 * M);
  const om = 125.04 - 1934.136 * T;
  return norm(L0 + C - 0.00569 - 0.00478 * sin(om));
}

// [D, M, M', F, coefficient in 1e-6 degrees] — the largest terms of Meeus table 47.A
const MOON: [number, number, number, number, number][] = [
  [0, 0, 1, 0, 6288774], [2, 0, -1, 0, 1274027], [2, 0, 0, 0, 658314], [0, 0, 2, 0, 213618],
  [0, 1, 0, 0, -185116], [0, 0, 0, 2, -114332], [2, 0, -2, 0, 58793], [2, -1, -1, 0, 57066],
  [2, 0, 1, 0, 53322], [2, -1, 0, 0, 45758], [0, 1, -1, 0, -40923], [1, 0, 0, 0, -34720],
  [0, 1, 1, 0, -30383], [2, 0, 0, -2, 15327], [0, 0, 1, 2, -12528], [0, 0, 1, -2, 10980],
  [4, 0, -1, 0, 10675], [0, 0, 3, 0, 10034], [4, 0, -2, 0, 8548], [2, 1, -1, 0, -7888],
  [2, 1, 0, 0, -6766], [1, 0, -1, 0, -5163], [1, 1, 0, 0, 4987], [2, -1, 1, 0, 4036],
  [2, 0, 2, 0, 3994], [4, 0, 0, 0, 3861], [2, 0, -3, 0, 3665], [0, 1, -2, 0, -2689],
  [2, 0, -1, 2, -2602], [2, -1, -2, 0, 2390], [1, 0, 1, 0, -2348], [2, -2, 0, 0, 2236],
  [0, 1, 2, 0, -2120], [0, 2, 0, 0, -2069], [2, -2, -1, 0, 2048], [2, 0, 1, -2, -1773],
  [2, 0, 0, 2, -1595], [4, -1, -1, 0, 1215], [0, 0, 2, 2, -1110], [3, 0, -1, 0, -892],
];

export function moonLongitude(j: number) {
  const T = cent(j);
  const Lp = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T + T ** 3 / 538841;
  const D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T * T + T ** 3 / 545868;
  const M = 357.5291092 + 35999.0502909 * T - 0.0001536 * T * T;
  const Mp = 134.9633964 + 477198.8675055 * T + 0.0087414 * T * T + T ** 3 / 69699;
  const F = 93.272095 + 483202.0175233 * T - 0.0036539 * T * T;
  const E = 1 - 0.002516 * T - 0.0000074 * T * T;
  let s = 0;
  for (const [d, m, mp, f, c] of MOON) {
    const e = Math.abs(m) === 1 ? E : Math.abs(m) === 2 ? E * E : 1;
    s += c * e * sin(d * D + m * M + mp * Mp + f * F);
  }
  s += 3958 * sin(119.75 + 131.849 * T) + 1962 * sin(Lp - F) + 318 * sin(53.09 + 479264.29 * T);
  const dpsi = (-17.2 * sin(125.04452 - 1934.136261 * T)) / 3600;
  return norm(Lp + s / 1e6 + dpsi);
}

/** Lahiri (Chitrapaksha) ayanamsa, the Indian government standard: ~23°51′ at J2000. */
export const ayanamsa = (j: number) => 23.8531 + 1.3972 * cent(j);

// --- Names ------------------------------------------------------------------

export const TITHI = [
  'Pratipada', 'Dvitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami', 'Ashtami',
  'Navami', 'Dashami', 'Ekadashi', 'Dvadashi', 'Trayodashi', 'Chaturdashi',
];
export const NAKSHATRA = [
  'Ashvini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya',
  'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Svati',
  'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana',
  'Dhanishtha', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati',
];
/** Vimshottari lords repeat Ketu → Mercury; written here as the book's numbers. */
const NAK_LORD: N[] = [7, 6, 1, 2, 9, 4, 3, 8, 5];
export const nakshatraLord = (i: number) => NAK_LORD[i % 9];

export const YOGA = [
  'Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda', 'Sukarma', 'Dhriti',
  'Shula', 'Ganda', 'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata',
  'Variyan', 'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma', 'Indra', 'Vaidhriti',
];
export const RASHI: { name: string; western: string; lord: N }[] = [
  { name: 'Mesha', western: 'Aries', lord: 9 }, { name: 'Vrishabha', western: 'Taurus', lord: 6 },
  { name: 'Mithuna', western: 'Gemini', lord: 5 }, { name: 'Karka', western: 'Cancer', lord: 2 },
  { name: 'Simha', western: 'Leo', lord: 1 }, { name: 'Kanya', western: 'Virgo', lord: 5 },
  { name: 'Tula', western: 'Libra', lord: 6 }, { name: 'Vrishchika', western: 'Scorpio', lord: 9 },
  { name: 'Dhanu', western: 'Sagittarius', lord: 3 }, { name: 'Makara', western: 'Capricorn', lord: 8 },
  { name: 'Kumbha', western: 'Aquarius', lord: 8 }, { name: 'Mina', western: 'Pisces', lord: 3 },
];
export const VARA = ['Ravivara', 'Somavara', 'Mangalavara', 'Budhavara', 'Guruvara', 'Shukravara', 'Shanivara'];

// --- The sky at an instant ------------------------------------------------------

export interface Sky {
  sun: number; moon: number; ayan: number;
  elong: number; illum: number; waxing: boolean;
  tithi: { index: number; name: string; paksha: 'Shukla' | 'Krishna'; day: number };
  nakshatra: { index: number; name: string; pada: number; lord: N };
  yoga: string;
  moonRashi: (typeof RASHI)[number];
  sunRashi: (typeof RASHI)[number];
  tropicalSun: string;
}

export function sky(t: Date): Sky {
  const j = jd(t);
  const sun = sunLongitude(j), moon = moonLongitude(j), ayan = ayanamsa(j);
  const elong = norm(moon - sun);
  const ti = Math.floor(elong / 12);
  const sid = norm(moon - ayan), sunSid = norm(sun - ayan);
  const ni = Math.floor(sid / (360 / 27));
  const tithiName = ti === 14 ? 'Purnima' : ti === 29 ? 'Amavasya' : TITHI[ti % 15];
  return {
    sun, moon, ayan, elong,
    illum: (1 - cos(elong)) / 2,
    waxing: elong < 180,
    tithi: { index: ti, name: tithiName, paksha: ti < 15 ? 'Shukla' : 'Krishna', day: (ti % 15) + 1 },
    nakshatra: {
      index: ni, name: NAKSHATRA[ni], lord: nakshatraLord(ni),
      pada: Math.floor((sid % (360 / 27)) / (360 / 108)) + 1,
    },
    yoga: YOGA[Math.floor(norm(sid + sunSid) / (360 / 27))],
    moonRashi: RASHI[Math.floor(sid / 30)],
    sunRashi: RASHI[Math.floor(sunSid / 30)],
    tropicalSun: RASHI[Math.floor(sun / 30)].western,
  };
}

/** When does a stepwise quantity (tithi index, nakshatra index) next change? Bisection. */
export function nextChange(from: Date, key: (s: Sky) => number, hours = 36): Date | null {
  const k0 = key(sky(from));
  let lo = from.getTime(), hi = lo;
  for (let h = 1; h <= hours; h++) {
    hi = lo + h * 3600000;
    if (key(sky(new Date(hi))) !== k0) { lo = hi - 3600000; break; }
    if (h === hours) return null;
  }
  for (let i = 0; i < 14; i++) {
    const mid = (lo + hi) / 2;
    if (key(sky(new Date(mid))) === k0) lo = mid; else hi = mid;
  }
  return new Date(hi);
}

// --- Sun on the horizon -----------------------------------------------------------

export interface SunTimes { rise: Date | null; set: Date | null; noon: Date }

/** Sunrise equation for the local calendar date v at latitude/longitude (east positive). */
export function sunTimes(v: YMD, lat: number, lon: number): SunTimes {
  const n = Math.round(Date.UTC(v.y, v.m - 1, v.d, 12) / 86400000 + 2440587.5 - 2451545);
  const Js = n - lon / 360;
  const M = norm(357.5291 + 0.98560028 * Js);
  const C = 1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M);
  const lam = norm(M + C + 180 + 102.9372);
  const Jt = 2451545 + Js + 0.0053 * sin(M) - 0.0069 * sin(2 * lam);
  const sd = sin(lam) * sin(23.4397);
  const cd = Math.cos(Math.asin(sd));
  const cw = (sin(-0.833) - sin(lat) * sd) / (cos(lat) * cd);
  if (cw > 1 || cw < -1) return { rise: null, set: null, noon: fromJd(Jt) };
  const w = Math.acos(cw) / R;
  return { rise: fromJd(Jt - w / 360), set: fromJd(Jt + w / 360), noon: fromJd(Jt) };
}

// --- Planetary hours ------------------------------------------------------------------

/** The Chaldean order, slowest to fastest, as the book's numbers. */
export const CHALDEAN: N[] = [8, 3, 9, 1, 6, 5, 2];
/** Weekday rulers (JS getDay order) as numbers: Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn. */
export const WEEKDAY_RULER: N[] = [1, 2, 9, 5, 3, 6, 8];

export interface Hora { start: Date; end: Date; ruler: N; night: boolean; index: number }
export interface VedicDay {
  weekday: number; rise: Date; set: Date; nextRise: Date; horas: Hora[];
  rahuKala: { start: Date; end: Date }; approximate: boolean;
}

const at = (v: YMD, h: number) => new Date(v.y, v.m - 1, v.d, h);
const shift = (v: YMD, k: number): YMD => {
  const d = new Date(v.y, v.m - 1, v.d + k, 12);
  return { y: d.getFullYear(), m: d.getMonth() + 1, d: d.getDate() };
};

/** Rahu Kala falls in one of eight daylight segments, fixed per weekday (Sun = 8th … Sat = 3rd). */
const RAHU_SEGMENT = [7, 1, 6, 4, 5, 3, 2];

/** The Hindu day runs sunrise to sunrise. Returns the one containing `t`. */
export function vedicDay(t: Date, lat: number, lon: number): VedicDay {
  const v = { y: t.getFullYear(), m: t.getMonth() + 1, d: t.getDate() };
  let approximate = false;
  const times = (x: YMD) => {
    const s = sunTimes(x, lat, lon);
    if (!s.rise || !s.set) { approximate = true; return { rise: at(x, 6), set: at(x, 18) }; }
    return { rise: s.rise, set: s.set };
  };
  let base = v;
  let today = times(v);
  if (t < today.rise) { base = shift(v, -1); today = times(base); }
  const next = times(shift(base, 1));
  const weekday = new Date(base.y, base.m - 1, base.d, 12).getDay();
  const day = (today.set.getTime() - today.rise.getTime()) / 12;
  const night = (next.rise.getTime() - today.set.getTime()) / 12;
  const first = CHALDEAN.indexOf(WEEKDAY_RULER[weekday]);
  const horas: Hora[] = [];
  for (let i = 0; i < 24; i++) {
    const nightH = i >= 12;
    const start = nightH ? today.set.getTime() + (i - 12) * night : today.rise.getTime() + i * day;
    horas.push({
      start: new Date(start), end: new Date(start + (nightH ? night : day)),
      ruler: CHALDEAN[(first + i) % 7], night: nightH, index: i,
    });
  }
  const seg = (today.set.getTime() - today.rise.getTime()) / 8;
  const rs = today.rise.getTime() + RAHU_SEGMENT[weekday] * seg;
  return {
    weekday, rise: today.rise, set: today.set, nextRise: next.rise, horas, approximate,
    rahuKala: { start: new Date(rs), end: new Date(rs + seg) },
  };
}

// --- The Maya count ----------------------------------------------------------------------

export const TZOLKIN = [
  ['Imix', 'crocodile, primordial waters'], ["Ik'", 'wind, breath'], ["Ak'bal", 'night, the dark house'],
  ["K'an", 'maize seed, ripening'], ['Chikchan', 'serpent, life force'], ['Kimi', 'death, transformation'],
  ["Manik'", 'deer, the open hand'], ['Lamat', 'star, Venus, abundance'], ['Muluk', 'water, offering'],
  ['Ok', 'dog, loyalty, guidance'], ['Chuwen', 'monkey, the craftsman'], ['Eb', 'road, the human path'],
  ['Ben', 'reed, growth, home'], ['Ix', 'jaguar, the hidden'], ['Men', 'eagle, vision'],
  ['Kib', 'vulture, wisdom of elders'], ['Kaban', 'earth, movement, thought'], ["Etz'nab", 'flint, the cutting truth'],
  ['Kawak', 'storm, renewal'], ['Ajaw', 'lord, the sun, completion'],
] as const;

/** Day in the 260-day count, using the standard GMT correlation (Long Count 0 = JDN 584283 = 4 Ajaw). */
export function tzolkin(v: YMD) {
  const jdn = Math.round(Date.UTC(v.y, v.m - 1, v.d, 12) / 86400000 + 2440587.5);
  const k = jdn - 584283;
  const tone = (((k + 3) % 13) + 13) % 13 + 1;
  const sign = (((k + 19) % 20) + 20) % 20;
  return { tone, sign, name: TZOLKIN[sign][0], meaning: TZOLKIN[sign][1], position: ((40 * (tone - 1) + 221 * sign) % 260) + 1 };
}

// --- Place ----------------------------------------------------------------------------------

export interface Place { lat: number; lon: number; label: string; source: 'zone' | 'device' | 'manual' }

const ZONES: Record<string, [number, number, string]> = {
  'Africa/Nairobi': [-1.286, 36.817, 'Nairobi'], 'Africa/Kampala': [0.347, 32.582, 'Kampala'],
  'Africa/Dar_es_Salaam': [-6.792, 39.208, 'Dar es Salaam'], 'Africa/Addis_Ababa': [9.03, 38.74, 'Addis Ababa'],
  'Africa/Kigali': [-1.944, 30.062, 'Kigali'], 'Africa/Lagos': [6.524, 3.379, 'Lagos'],
  'Africa/Accra': [5.603, -0.187, 'Accra'], 'Africa/Johannesburg': [-26.204, 28.047, 'Johannesburg'],
  'Africa/Cairo': [30.044, 31.236, 'Cairo'], 'Africa/Casablanca': [33.573, -7.589, 'Casablanca'],
  'Europe/London': [51.507, -0.128, 'London'], 'Europe/Paris': [48.857, 2.352, 'Paris'],
  'Europe/Berlin': [52.52, 13.405, 'Berlin'], 'Europe/Amsterdam': [52.368, 4.904, 'Amsterdam'],
  'Europe/Madrid': [40.417, -3.704, 'Madrid'], 'Europe/Rome': [41.903, 12.496, 'Rome'],
  'America/New_York': [40.713, -74.006, 'New York'], 'America/Chicago': [41.878, -87.63, 'Chicago'],
  'America/Denver': [39.739, -104.99, 'Denver'], 'America/Los_Angeles': [34.052, -118.244, 'Los Angeles'],
  'America/Toronto': [43.653, -79.383, 'Toronto'], 'America/Sao_Paulo': [-23.551, -46.633, 'São Paulo'],
  'America/Mexico_City': [19.433, -99.133, 'Mexico City'], 'Asia/Kolkata': [22.573, 88.364, 'Kolkata'],
  'Asia/Calcutta': [22.573, 88.364, 'Kolkata'], 'Asia/Dubai': [25.205, 55.271, 'Dubai'],
  'Asia/Karachi': [24.861, 67.01, 'Karachi'], 'Asia/Dhaka': [23.81, 90.413, 'Dhaka'],
  'Asia/Kathmandu': [27.717, 85.324, 'Kathmandu'], 'Asia/Singapore': [1.352, 103.82, 'Singapore'],
  'Asia/Shanghai': [31.23, 121.474, 'Shanghai'], 'Asia/Tokyo': [35.676, 139.65, 'Tokyo'],
  'Australia/Sydney': [-33.869, 151.209, 'Sydney'],
};

export function guessPlace(): Place {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const z = ZONES[tz];
    if (z) return { lat: z[0], lon: z[1], label: z[2], source: 'zone' };
    return { lat: 0, lon: -new Date().getTimezoneOffset() / 4, label: tz.split('/').pop()!.replace(/_/g, ' '), source: 'zone' };
  } catch {
    return { lat: 0, lon: 0, label: 'Equator, Greenwich', source: 'zone' };
  }
}
