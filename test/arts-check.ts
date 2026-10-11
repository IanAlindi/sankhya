// Checks for the Geometry and Wealth pages: the constructions land where the book says, the solids
// are whole, the spiral is continuous, and the money sums reproduce the book's worked examples.
import { PHI, polar, regular, dist, sideDiagonal, whirl, solid, arcPoints, circleX } from '../src/lib/geo.ts';
import { payoff, growth, wealthDays } from '../src/lib/money.ts';
import { vedicDay, nextHora, CHALDEAN, WEEKDAY_RULER } from '../src/lib/astro.ts';
import { JUPITER_KAMEA, STRATEGIES, GLYPHS, FAMILIES, PLANET_MONEY } from '../src/data/wealth.ts';

let pass = 0, fail = 0;
const ok = (name: string, cond: boolean, detail = '') => {
  if (cond) pass++; else fail++;
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`);
};
const near = (a: number, b: number, eps = 1e-3) => Math.abs(a - b) < eps;

// --- geometry ------------------------------------------------------------------------------------
ok('phi', near(PHI, 1.6180339887, 1e-9));
// Workbook 1: the square on the diagonal has twice the area
ok('√2 square doubles', near(dist([-1, 0], [0, 1]) ** 2, 2));
// Workbook 2: vesica long axis is √3 times the short
const [c1, c2] = circleX([-0.5, 0], 1, [0.5, 0], 1);
ok('vesica tips at ±√3/2', near(Math.abs(c1[1]), Math.sqrt(3) / 2) && near(Math.abs(c2[1]), Math.sqrt(3) / 2));
// Workbook 3: the pentagon from the double square
const MY = Math.hypot(0.5, 1), B: [number, number] = [0.5 - MY, 0];
const side = dist([0, 1], B), P = regular([0, 0], 1, 5, 90);
ok('MY = √5/2', near(MY, Math.sqrt(5) / 2));
ok('OB = 1/φ (golden cut of the radius)', near(-B[0], 1 / PHI));
ok('YB is the pentagon side', near(side, dist(P[0], P[1])), side.toFixed(5));
// Workbook 5: the golden rectangle from a square
ok('golden rectangle long side', near(0.5 + MY, PHI));
// Workbook 7: squaring the circle
ok('arc from the top, radius φ, hugs both small circles', near(dist([0, 1], [0.5, 0]) + 0.5, PHI));
ok('arc from the bottom meets the circle at a pentagon corner', near(dist([0, -1], P[1]), PHI) && near(dist([0, -1], P[4]), PHI));
ok('small arc from the bottom meets the lower corners', near(dist([0, -1], P[2]), 1 / PHI) && near(dist([0, -1], P[3]), 1 / PHI));
ok('circle through the mouth ≈ square perimeter', near(2 * Math.PI * Math.sqrt(PHI), 7.993, 1e-3), (2 * Math.PI * Math.sqrt(PHI)).toFixed(4));
// Workbook 4: side and diagonal numbers
const sd = sideDiagonal(8);
ok('Theon’s pairs', sd.map((x) => `${x.diag}/${x.side}`).join(' ') === '1/1 3/2 7/5 17/12 41/29 99/70 239/169 577/408');
ok('diagonal² − 2·side² = ∓1 alternately', sd.every((x, i) => x.diag ** 2 - 2 * x.side ** 2 === (i % 2 ? 1 : -1)));
// Workbook 6: whirling squares tile and the spiral is continuous
const w = whirl(10);
let joined = true;
for (let i = 0; i < w.squares.length - 1; i++) {
  const a = w.squares[i], b = w.squares[i + 1];
  const end = polar(a.arc.c, a.s, a.arc.from + 90), start = polar(b.arc.c, b.s, b.arc.from);
  if (dist(end, start) > 1e-9) joined = false;
}
ok('golden spiral arcs join square to square', joined);
ok('whirl sides are Fibonacci', w.squares.map((q) => q.s).join(',') === '1,1,2,3,5,8,13,21,34,55');
const areaSum = w.squares.reduce((s, q) => s + q.s * q.s, 0), [x0, y0, x1, y1] = w.box;
ok('whirl squares exactly fill their rectangle', areaSum === (x1 - x0) * (y1 - y0), `${areaSum} vs ${(x1 - x0) * (y1 - y0)}`);
// Workbook 9: the five solids
const counts = (['tetrahedron', 'cube', 'octahedron', 'icosahedron', 'dodecahedron'] as const).map((k) => { const s = solid(k); return `${s.verts.length}/${s.edges.length}`; });
ok('solids: vertices/edges', counts.join(' ') === '4/6 8/12 6/12 12/30 20/30', counts.join(' '));
ok('arc sampling ends where it should', near(dist(arcPoints([0, 0], 1, 0, 90).slice(-1)[0], [0, 1]), 0));

// --- the week as a star ------------------------------------------------------------------------
const week = Array.from({ length: 7 }, (_, i) => CHALDEAN[(3 + i * 3) % 7]);
ok('Chaldean order every third place = the weekdays from Sunday', week.join() === WEEKDAY_RULER.join());
const challenge = Array.from({ length: 7 }, (_, i) => WEEKDAY_RULER[(1 + 2 * i) % 7]);
ok('two-week challenge from a Monday: Moon, Mercury, Venus, Sun, Mars, Jupiter, Saturn', challenge.join() === '2,5,6,1,9,3,8');
ok('challenge walks the Chaldean circle backwards', challenge.every((n, i) => i === 0 || CHALDEAN.indexOf(n) === (CHALDEAN.indexOf(challenge[i - 1]) + 6) % 7));
ok('every weekday planet has a money role', WEEKDAY_RULER.every((n) => !!PLANET_MONEY[n]));

// --- hours ---------------------------------------------------------------------------------------
const t = new Date('2026-10-11T09:00:00+03:00');
const h = nextHora(t, 3, -1.286, 36.817);
ok('next Jupiter hour found', !!h && h.ruler === 3 && h.end > t, h ? `${h.start.toISOString()}` : 'none');
const thu = vedicDay(new Date('2026-10-15T09:00:00+03:00'), -1.286, 36.817);
ok('Thursday’s first hour is Jupiter’s', thu.horas[0].ruler === 3);

// --- money ---------------------------------------------------------------------------------------
const minOnly = payoff(5000, 17, { minPct: 3, floor: 25 });
ok('book: $5,000 at 17%, minimum only → 13 years 2 months', minOnly.months === 158, `${minOnly.months} months`);
ok('book: … about $9,031 in all', near(minOnly.paid, 9031, 2), minOnly.paid.toFixed(2));
const fixed = payoff(5000, 17, { fixed: 300 });
ok('book: $300 a month → about 20 months, ~$700 interest', fixed.months === 20 && fixed.interest > 650 && fixed.interest < 760, `${fixed.months} months, ${fixed.interest.toFixed(0)}`);
ok('a payment below the interest never ends', !payoff(5000, 17, { fixed: 50 }).done);
const once = growth(2000, 0, 8, 45).slice(-1)[0];
ok('book: $2,000 once at 8% for 45 years = $63,840.90', near(once.value, 63840.9, 0.05), once.value.toFixed(2));
const late = growth(2000, 0, 8, 40).slice(-1)[0];
ok('book: started five years later = about $43,450', near(late.value, 43449.0, 1), late.value.toFixed(2));
ok('book: first year of $2,000 a year = $2,160', near(growth(0, 2000, 8, 1)[0].value, 2160));
ok('Fuller: 6 months of costs saved = about 183 days', near(wealthDays(6000, 1000), 182.64, 0.01));
const lines = [...JUPITER_KAMEA, ...JUPITER_KAMEA[0].map((_, c) => JUPITER_KAMEA.map((r) => r[c])),
  JUPITER_KAMEA.map((r, i) => r[i]), JUPITER_KAMEA.map((r, i) => r[3 - i])];
ok('Jupiter square: every line 34', lines.every((l) => l.reduce((a, b) => a + b, 0) === 34));
ok('Jupiter square: 1 to 16 once each', JUPITER_KAMEA.flat().sort((a, b) => a - b).join() === Array.from({ length: 16 }, (_, i) => i + 1).join());

// --- content -------------------------------------------------------------------------------------
ok('sixteen glyphs', GLYPHS.length === 16);
ok('every strategy belongs to a family', STRATEGIES.every((s) => FAMILIES.some((f) => f.k === s.family)));
ok('every family has strategies', FAMILIES.every((f) => STRATEGIES.some((s) => s.family === f.k)));
ok('strategy ids are unique', new Set(STRATEGIES.map((s) => s.id)).size === STRATEGIES.length);
ok('every strategy has steps with reasons', STRATEGIES.every((s) => s.steps.length > 0 && s.steps.every((x) => x.do && x.why)));

console.log(`\n${pass} PASS, ${fail} FAIL`);
if (fail) throw new Error(`${fail} check(s) failed`);
