// Sacred geometry after Robert Lawlor, *Sacred Geometry: Philosophy and Practice* (1982).
// The book's ideas and constructions, retold in plain English for this site. Every sentence is
// written fresh; page numbers point to the printed book.
import type { N } from '../lib/num';
import { PHI, R3, arcPoints, regular, type Construction, type Pt, type Shape, type SolidK } from '../lib/geo';

// ---------------------------------------------------------------------------------------------
// Constructions: each step is something you could do with a compass and a straight edge.
// ---------------------------------------------------------------------------------------------
const sq = (x: number, y: number, s: number): Pt[] => [[x, y], [x + s, y], [x + s, y + s], [x, y + s]];
function cube(cx: number, cy: number, size: number, off: number) {
  const h = size / 2, f = sq(cx - off / 2 - h, cy - off / 2 - h, size), b = f.map(([x, y]) => [x + off, y + off] as Pt);
  const lines: Shape[] = f.map((p, i) => ({ t: 'line', a: p, b: b[i] }));
  return { f, b, lines };
}
const wave = (y: number, k: number, amp: number, sign: 1 | -1): Pt[] =>
  Array.from({ length: 121 }, (_, i) => { const x = -2 + (4 * i) / 120; return [x, y + sign * amp * Math.abs(Math.sin((Math.PI * k * (x + 2)) / 4))]; });

const outer = cube(5, 1, 1.0, 0.36), inner = cube(5, 1, 0.42, 0.15);
const P = regular([0, 0], 1, 5, 90);
const MY = Math.hypot(0.5, 1);

export const CONSTRUCTIONS: Record<string, Construction> = {
  dims: {
    label: 'From a point to the tesseract: one, two, three and four, and then into space',
    box: [0, -0.15, 6, 4],
    steps: [
      { do: 'Put down a single point.', why: 'One. It has no size and no direction, yet every figure starts here. Indian tradition calls it the bindu, the seed.', add: [{ t: 'dot', p: [1, 3], tone: 'gold' }, { t: 'label', p: [1, 2.15], text: '1 · point' }] },
      { do: 'Add a second point and join the two.', why: 'Two. Two points make a line: the first direction, and the first difference. The One has divided.', add: [{ t: 'line', a: [2.35, 3], b: [3.65, 3], tone: 'gold' }, { t: 'dot', p: [2.35, 3] }, { t: 'dot', p: [3.65, 3] }, { t: 'label', p: [3, 2.15], text: '2 · line' }] },
      { do: 'Add a third point and close the shape.', why: 'Three. The triangle is the first shape with an inside. The book calls it the mother of form: what was only an idea can now become a surface.', add: [{ t: 'poly', pts: regular([5, 2.95], 0.72, 3, 90), tone: 'gold', fill: true }, { t: 'label', p: [5, 2.15], text: '3 · triangle' }] },
      { do: 'Four points make a square.', why: 'Four. The square is the world we can measure: four sides, four directions, four elements. The book calls it the first-born thing.', add: [{ t: 'poly', pts: sq(0.45, 0.6, 1.1), tone: 'gold', fill: true }, { t: 'label', p: [1, 0.12], text: '4 · square' }] },
      { do: 'Lift the square at right angles to itself.', why: 'A square moved straight up traces a cube. The surface has become a solid thing you could hold.', add: [{ t: 'poly', pts: cube(3, 1, 0.9, 0.36).f, tone: 'gold' }, { t: 'poly', pts: cube(3, 1, 0.9, 0.36).b, tone: 'gold' }, ...cube(3, 1, 0.9, 0.36).lines.map((l) => ({ ...l, tone: 'gold' as const })), { t: 'label', p: [3, 0.12], text: 'solid · cube' }] },
      { do: 'Move the cube in a fourth direction.', why: 'A cube moved at right angles to all three of its directions traces a tesseract, drawn here as a cube inside a cube. It is the figure turning on your Today page: four of your numbers, one for each direction.', add: [{ t: 'poly', pts: outer.f, tone: 'accent' }, { t: 'poly', pts: outer.b, tone: 'accent' }, ...outer.lines.map((l) => ({ ...l, tone: 'accent' as const })), { t: 'poly', pts: inner.f, tone: 'accent' }, { t: 'poly', pts: inner.b, tone: 'accent' }, ...inner.lines.map((l) => ({ ...l, tone: 'accent' as const })), ...[...outer.f, ...outer.b].map((p, i) => ({ t: 'line' as const, a: p, b: [...inner.f, ...inner.b][i], tone: 'faint' as const })), { t: 'label', p: [5, 0.12], text: '4D · tesseract' }] },
    ],
  },

  reciprocal: {
    label: 'A vibrating string divided into two, three and four equal parts',
    box: [-2.95, -0.95, 2.95, 3.55],
    steps: [
      { do: 'Stretch a string between two pegs and pluck it.', why: 'One whole. It swings as a single loop and sounds its own note. The book points out that the loop has the same pointed, almond shape as the vesica you will meet in lesson 4.', add: [{ t: 'line', a: [-2, 3], b: [2, 3], tone: 'faint' }, { t: 'poly', pts: wave(3, 1, 0.38, 1), open: true, tone: 'gold' }, { t: 'poly', pts: wave(3, 1, 0.38, -1), open: true, tone: 'gold' }, { t: 'dot', p: [-2, 3] }, { t: 'dot', p: [2, 3] }, { t: 'label', p: [-2.55, 2.93], text: '1', size: 1.3 }, { t: 'label', p: [2.55, 2.93], text: '1', size: 1.3 }] },
      { do: 'Hold it at the exact middle.', why: 'Half the length swings twice as fast, and you hear the same note an octave higher. Half becomes double: ½ and 2 are mirror images of each other.', add: [{ t: 'line', a: [-2, 2], b: [2, 2], tone: 'faint' }, { t: 'poly', pts: wave(2, 2, 0.3, 1), open: true, tone: 'p2' }, { t: 'poly', pts: wave(2, 2, 0.3, -1), open: true, tone: 'p2' }, { t: 'dot', p: [0, 2], tone: 'p2' }, { t: 'label', p: [-2.55, 1.93], text: '½', size: 1.3 }, { t: 'label', p: [2.55, 1.93], text: '2', size: 1.3 }] },
      { do: 'Now hold it a third of the way along.', why: 'Each third swings three times as fast. A third of the length, three times the vibration.', add: [{ t: 'line', a: [-2, 1], b: [2, 1], tone: 'faint' }, { t: 'poly', pts: wave(1, 3, 0.25, 1), open: true, tone: 'p3' }, { t: 'poly', pts: wave(1, 3, 0.25, -1), open: true, tone: 'p3' }, { t: 'label', p: [-2.55, 0.93], text: '⅓', size: 1.3 }, { t: 'label', p: [2.55, 0.93], text: '3', size: 1.3 }] },
      { do: 'And at a quarter.', why: 'A quarter of the length, four times the vibration: two octaves above the whole string.', add: [{ t: 'line', a: [-2, 0], b: [2, 0], tone: 'faint' }, { t: 'poly', pts: wave(0, 4, 0.22, 1), open: true, tone: 'p4' }, { t: 'poly', pts: wave(0, 4, 0.22, -1), open: true, tone: 'p4' }, { t: 'label', p: [-2.55, -0.07], text: '¼', size: 1.3 }, { t: 'label', p: [2.55, -0.07], text: '4', size: 1.3 }] },
      { do: 'Read the two columns together.', why: 'Every step out from One has a matching step in: 2 and ½, 3 and ⅓, 4 and ¼. The old Egyptian number series ran both ways from One like this, with no zero anywhere. Nothing is made from nothing: everything is a part of the One.', add: [{ t: 'label', p: [0, -0.78], text: '… ¼ · ⅓ · ½ · 1 · 2 · 3 · 4 …', tone: 'gold', size: 1.1 }] },
    ],
  },

  root2: {
    label: 'A square, its diagonal, and the square built on the diagonal',
    box: [-1.25, -1.25, 1.25, 1.25],
    steps: [
      { do: 'Draw a square.', why: 'Call its side 1, so its area is 1. The book takes this square as a picture of unity: one whole, ready to divide.', add: [{ t: 'poly', pts: sq(-1, 0, 1), tone: 'gold', fill: true }, { t: 'label', p: [-0.86, 0.86], text: '1', tone: 'gold', size: 1.2 }] },
      { do: 'Draw its diagonal.', why: 'The diagonal cuts the square into two equal triangles. It is about 1.414 times as long as the side, whatever size the square is. That number, √2, never ends and never repeats: you can draw it exactly but never write it exactly.', add: [{ t: 'line', a: [-1, 0], b: [0, 1], tone: 'accent', w: 2.4 }, { t: 'dot', p: [-1, 0] }, { t: 'dot', p: [0, 1] }] },
      { do: 'Build a new square on the diagonal.', why: 'Count the triangles: the first square holds two, the new one holds four. Its area is exactly 2. The diagonal of the first square is the side of the second.', add: [{ t: 'poly', pts: [[-1, 0], [0, 1], [1, 0], [0, -1]], tone: 'accent' }, { t: 'line', a: [-1, 0], b: [1, 0], tone: 'faint', dash: true }, { t: 'line', a: [0, 1], b: [0, -1], tone: 'faint', dash: true }, { t: 'label', p: [0.38, -0.42], text: '2', tone: 'accent', size: 1.4 }] },
      { do: 'Do it again.', why: 'The new square’s diagonal is the side of a square of 4. Then 8, then 16. The book calls this the generative power of √2: one becomes two, and two becomes endless multiplication, while the proportion stays the same.', add: [{ t: 'poly', pts: sq(-1, -1, 2), tone: 'p3' }, { t: 'label', p: [0.78, -0.86], text: '4', tone: 'p3', size: 1.4 }] },
      { do: 'Go the other way: join the middles of the first square’s sides.', why: 'You get a square of ½, then ¼. Halving and doubling are the same act seen from two sides. The book sets this beside a cell dividing: the half produces the double.', add: [{ t: 'poly', pts: [[-0.5, 0], [0, 0.5], [-0.5, 1], [-1, 0.5]], tone: 'p2', dash: true }, { t: 'label', p: [-0.5, 0.62], text: '½', tone: 'p2', size: 1.1 }] },
    ],
  },

  vesica: {
    label: 'Two equal circles, each through the other’s centre, and what grows from them',
    box: [-1.62, -1.12, 1.62, 1.12],
    steps: [
      { do: 'Draw a circle around a point A.', why: 'The book takes the circle as unity before it divides: whole, endless, and impossible to measure exactly.', add: [{ t: 'circle', c: [-0.5, 0], r: 1, tone: 'ink' }, { t: 'dot', p: [-0.5, 0], label: 'A', at: 'sw' }] },
      { do: 'Keep the compass open. Put its point on any spot B on the rim, and draw a second circle.', why: 'Unity reflects itself. Each circle now passes through the other’s centre. In the book one is the source and the other its reflection, like the Sun and the Moon.', add: [{ t: 'circle', c: [0.5, 0], r: 1, tone: 'ink', start: 180 }, { t: 'dot', p: [0.5, 0], label: 'B', at: 'se' }] },
      { do: 'Look at where they overlap.', why: 'This almond shape is the vesica piscis, “the fish’s bladder”. It is the middle world, where the two meet. Medieval artists drew Christ inside it, and it is the root of the fish as a symbol.', add: [{ t: 'poly', pts: [...arcPoints([-0.5, 0], 1, -60, 60), ...arcPoints([0.5, 0], 1, 120, 240)], tone: 'gold', fill: true }, { t: 'dot', p: [0, R3 / 2], label: 'C', at: 'n' }, { t: 'dot', p: [0, -R3 / 2], label: 'D', at: 's' }] },
      { do: 'Join A, B and the two tips C and D.', why: 'Two perfect equilateral triangles appear by themselves. The book says: everything that is two by nature is three by principle.', add: [{ t: 'poly', pts: [[-0.5, 0], [0.5, 0], [0, R3 / 2]], tone: 'accent' }, { t: 'poly', pts: [[-0.5, 0], [0.5, 0], [0, -R3 / 2]], tone: 'accent' }] },
      { do: 'Compare the long axis CD with the short one AB.', why: 'If AB is 1, CD is √3, about 1.732. The book calls √3 the formative power: every solid needs triangles to hold its shape, and √3 is also the diagonal of a cube.', add: [{ t: 'line', a: [0, R3 / 2], b: [0, -R3 / 2], tone: 'gold', w: 2.4 }, { t: 'line', a: [-0.5, 0], b: [0.5, 0], tone: 'gold', w: 2.4 }, { t: 'label', p: [0.12, 0.42], text: '√3', tone: 'gold', anchor: 'start' }, { t: 'label', p: [0.18, -0.18], text: '1', tone: 'gold' }] },
      { do: 'Step the same opening all the way round the first circle.', why: 'It fits exactly six times: a hexagon. The order of six runs through crystals, snowflakes, the honeycomb and the carbon ring of living matter. The book shows every regular shape growing from this one figure.', add: [{ t: 'poly', pts: regular([-0.5, 0], 1, 6, 0), tone: 'p6' }, ...regular([-0.5, 0], 1, 6, 0).map((p) => ({ t: 'dot' as const, p, tone: 'p6' as const }))] },
    ],
  },

  root5: {
    label: 'The double square, √5, and the pentagon stepped around a circle',
    box: [-1.22, -1.18, 1.22, 1.2],
    steps: [
      { do: 'Draw a circle and cross it with two diameters.', why: 'The four directions divide the circle. This is the starting point for most of the book’s figures.', add: [{ t: 'circle', c: [0, 0], r: 1, tone: 'ink' }, { t: 'line', a: [-1, 0], b: [1, 0], tone: 'faint' }, { t: 'line', a: [0, -1], b: [0, 1], tone: 'faint' }, { t: 'dot', p: [0, 0], label: 'O', at: 'sw' }, { t: 'dot', p: [0, 1], label: 'Y', at: 'n' }] },
      { do: 'Mark M, halfway along the right-hand radius.', why: 'The box from O to M and up to Y is half as wide as it is tall: two squares stacked, a double square.', add: [{ t: 'poly', pts: [[0, 0], [0.5, 0], [0.5, 1], [0, 1]], tone: 'gold' }, { t: 'line', a: [0, 0.5], b: [0.5, 0.5], tone: 'gold', dash: true }, { t: 'dot', p: [0.5, 0], label: 'M', at: 's' }] },
      { do: 'Draw the double square’s diagonal, from M to Y.', why: 'When the short side is 1, this diagonal is √5, about 2.236. The book calls √5 the regenerative power. It joins the two squares, which it reads as spirit above and body below.', add: [{ t: 'line', a: [0.5, 0], b: [0, 1], tone: 'accent', w: 2.4 }, { t: 'label', p: [0.36, 0.56], text: '√5', tone: 'accent', anchor: 'start' }] },
      { do: 'With the point on M, swing that diagonal down to the left until it meets the line at B.', why: 'OB is now about 0.618 of the radius: the golden cut you will meet in lesson 7. √5 is its door.', add: [{ t: 'arc', c: [0.5, 0], r: MY, from: 116.565, to: 180, tone: 'accent', dash: true }, { t: 'dot', p: [0.5 - MY, 0], label: 'B', at: 's' }] },
      { do: 'The distance from Y to B is the side of a pentagon. Step it around the circle.', why: 'It fits exactly five times.', add: [{ t: 'line', a: [0, 1], b: [0.5 - MY, 0], tone: 'p5' }, ...P.map((p) => ({ t: 'dot' as const, p, tone: 'p5' as const }))] },
      { do: 'Join the five points, then draw the star inside.', why: 'Five is the number of life in the book: flowers, starfish, the human body with head and four limbs. Every line of the star cuts the others in the golden proportion.', add: [{ t: 'poly', pts: P, tone: 'p5', w: 2.2 }, { t: 'poly', pts: [P[0], P[2], P[4], P[1], P[3]], tone: 'gold', dash: true }] },
    ],
  },

  golden: {
    label: 'The golden rectangle drawn from a square, and the spiral of squares inside it',
    box: [-0.95, -0.72, 0.95, 0.66],
    steps: [
      { do: 'Draw a square.', why: 'Call its side 1.', add: [{ t: 'poly', pts: sq(-0.809, -0.5, 1), tone: 'ink' }, { t: 'label', p: [-0.309, -0.04], text: '1', size: 1.3 }] },
      { do: 'Mark M, the middle of the bottom side.', why: 'Each half of the square is now a double square on its side.', add: [{ t: 'dot', p: [-0.309, -0.5], label: 'M', at: 's' }, { t: 'line', a: [-0.309, -0.5], b: [-0.309, 0.5], tone: 'faint', dash: true }] },
      { do: 'Join M to the top right corner.', why: 'This is the diagonal of a double square: √5 over 2.', add: [{ t: 'line', a: [-0.309, -0.5], b: [0.191, 0.5], tone: 'accent', w: 2.2 }] },
      { do: 'Swing that line down onto the base, extended to the right.', why: 'Where it lands, the base has become 1.618 long. You have just found φ, phi, the golden proportion.', add: [{ t: 'line', a: [0.191, -0.5], b: [0.809, -0.5], tone: 'faint', dash: true }, { t: 'arc', c: [-0.309, -0.5], r: MY, from: 63.435, to: 0, tone: 'accent', dash: true }, { t: 'dot', p: [0.809, -0.5] }] },
      { do: 'Complete the rectangle.', why: 'A golden rectangle: its sides are 1 and 1.618. The piece you added on the right is itself a golden rectangle, standing up.', add: [{ t: 'poly', pts: [[-0.809, -0.5], [0.809, -0.5], [0.809, 0.5], [-0.809, 0.5]], tone: 'gold', w: 2.2 }, { t: 'label', p: [0, -0.66], text: '1.618 = φ', tone: 'gold' }] },
      { do: 'Cut a square from the small piece, then again, and join the corners with quarter circles.', why: 'Each leftover is golden again, without end. The quarter circles join into the spiral of the nautilus shell, which lesson 8 grows outwards.', add: [{ t: 'poly', pts: sq(0.191, -0.5, 0.618), tone: 'faint', dash: true }, { t: 'poly', pts: sq(0.427, 0.118, 0.382), tone: 'faint', dash: true }, { t: 'poly', pts: sq(0.191, 0.264, 0.236), tone: 'faint', dash: true }, { t: 'arc', c: [0.191, 0.5], r: 1, from: 180, to: 270, tone: 'p5', }, { t: 'arc', c: [0.191, 0.118], r: 0.618, from: 270, to: 360, tone: 'p5' }, { t: 'arc', c: [0.427, 0.118], r: 0.382, from: 0, to: 90, tone: 'p5' }, { t: 'arc', c: [0.427, 0.264], r: 0.236, from: 90, to: 180, tone: 'p5' }] },
    ],
  },

  squaring: {
    label: 'A circle divided like yin and yang, the pentagon hidden in it, and a square of nearly equal perimeter',
    box: [-1.42, -1.42, 1.42, 1.42],
    steps: [
      { do: 'Draw a circle with its two diameters.', why: 'For the book the circle is heaven, or spirit: whole, and impossible to measure exactly, because π never ends.', add: [{ t: 'circle', c: [0, 0], r: 1, tone: 'ink' }, { t: 'line', a: [-1, 0], b: [1, 0], tone: 'faint' }, { t: 'line', a: [0, -1], b: [0, 1], tone: 'faint' }, { t: 'dot', p: [0, 1], label: 'A', at: 'n' }, { t: 'dot', p: [0, -1], label: 'A′', at: 's' }] },
      { do: 'Draw two circles half as wide, side by side on the horizontal diameter.', why: 'One has become two, as in yin and yang. The rims of the two small circles add up to exactly the rim of the big one, but together they hold only half its area.', add: [{ t: 'circle', c: [-0.5, 0], r: 0.5, tone: 'p2' }, { t: 'circle', c: [0.5, 0], r: 0.5, tone: 'p1' }] },
      { do: 'From A, swing an arc that just wraps both small circles. Do the same from A′.', why: 'The two arcs make a pointed “mouth”, which the book links to the Egyptian sign for the creative word. Each arc has radius φ, and each cuts the vertical radius at the golden section.', add: [{ t: 'arc', c: [0, 1], r: PHI, from: -141.83, to: -38.17, tone: 'accent' }, { t: 'arc', c: [0, -1], r: PHI, from: 38.17, to: 141.83, tone: 'accent' }, { t: 'dot', p: [-Math.sqrt(PHI), 0], tone: 'accent' }, { t: 'dot', p: [Math.sqrt(PHI), 0], tone: 'accent' }] },
      { do: 'Where A′’s arc crosses the big circle are two corners of a pentagon. A smaller arc from A′, just touching the small circles, gives the other two. Join all five.', why: 'The plan for life, the five-sided figure, was hidden in the very first division of the circle.', add: [{ t: 'arc', c: [0, -1], r: 1 / PHI, from: 18, to: 162, tone: 'accent', dash: true }, { t: 'poly', pts: regular([0, 0], 1, 5, 90), tone: 'p5', w: 2.2 }] },
      { do: 'Draw a square around the circle.', why: 'The square is the earth: the measurable world. With a radius of 1, its sides add up to exactly 8.', add: [{ t: 'poly', pts: sq(-1, -1, 2), tone: 'gold', w: 2.2 }, { t: 'label', p: [0.62, -1.13], text: 'perimeter 8', tone: 'gold', size: 0.85 }] },
      { do: 'Draw a circle through the two tips of the mouth.', why: 'Its rim measures 7.99, almost exactly the square’s 8. Circle and square, heaven and earth, have nearly met. The book connects this to the value of π believed to have been used for the Great Pyramid.', add: [{ t: 'circle', c: [0, 0], r: Math.sqrt(PHI), tone: 'gold', dash: true, start: 0 }, { t: 'label', p: [0, 1.32], text: 'rim 7.99', tone: 'gold', size: 0.85 }] },
    ],
  },
};

// ---------------------------------------------------------------------------------------------
// The twelve lessons
// ---------------------------------------------------------------------------------------------
export type Visual = 'dims' | 'reciprocal' | 'root2' | 'vesica' | 'root5' | 'alternation' | 'golden' | 'gnomon' | 'squaring' | 'music' | 'body' | 'solids';
export interface Lesson {
  k: Visual; title: string; short: string; idea: string; body: string[];
  nature: string[]; bridges: { to: 'numbers' | 'alchemy' | 'wealth' | 'today' | 'geometry'; text: string }[];
  pages: string;
}

export const LESSONS: Lesson[] = [
  {
    k: 'dims', title: 'Every number has two faces', short: 'Quantity and quality',
    idea: 'A number counts things, but it also has a character and a shape: one is a point, two a line, three a triangle, four a square.',
    body: [
      'Geometry means “measuring the earth”. In ancient Egypt the Nile flooded every year and washed away the field boundaries. Marking them out again was seen as putting the world back in order. Sacred geometry keeps that spirit: it looks for the order underneath things.',
      'The book says every number has an outer face, its quantity (how many), and an inner face, its quality (what kind). One is unity, a single point. Two is division: two points make a line. Three closes the first shape, the triangle. Four is the square: the solid world you can measure.',
      'Ancient geometers worked with only two tools: a compass for circles and a straight edge for lines. Every figure on this page can be drawn with nothing else. The book’s advice is to draw them yourself, slowly, on squared paper: the understanding comes through the hand.',
    ],
    nature: ['Kolam patterns drawn on South Indian doorsteps every morning', 'Mandalas and rose windows', 'The Sri Yantra’s nine triangles', 'Crystals and the spiral of DNA'],
    bridges: [
      { to: 'numbers', text: 'This is why your numbers on this site have characters and not just values: Johari reads their inner face.' },
      { to: 'today', text: 'The last step is the tesseract on your Today page: four of your numbers, one for each direction.' },
    ],
    pages: 'pp. 6–15',
  },
  {
    k: 'reciprocal', title: 'Begin with One', short: 'Wholes and parts',
    idea: 'Old geometry starts from One, the whole, and treats everything as a part of it. Every step outward has a matching step inward.',
    body: [
      'Modern maths starts counting at zero. The book argues that ancient geometry started at One: a single whole that divides itself from the inside, the way one cell becomes two. Nothing is made from nothing; everything is a fraction of the One.',
      'The book is wary of zero. Once “nothing” became a number, it says, people began to picture empty space between things, waste that could vanish, and a spirit that counts for nothing. In nature, it says, there is no zero: there is no “away” to throw things.',
      'Starting from One gives a mirror: 2 and ½, 3 and ⅓, 4 and ¼. You can hear it on any string: halve it and it vibrates twice as fast, sounding the same note an octave higher.',
      'A mandala, a circle ordered into four, is this idea as a picture: one whole, organised into parts. The book shows the same pattern in domes, where the square of the earth sits under the circle of the sky.',
    ],
    nature: ['The octave on any string or pipe', 'Mandalas in India, Tibet, Islam and Europe', 'Domes over square halls', 'The common leaf shape, which follows 1, 2, 3 and ½, ⅓, ¼'],
    bridges: [
      { to: 'numbers', text: 'Johari reduces every number back to one digit from 1 to 9: everything returns to the family of One.' },
      { to: 'alchemy', text: 'Bartlett’s work runs the same way: one substance separated into its parts, then made one again.' },
    ],
    pages: 'pp. 16–22',
  },
  {
    k: 'root2', title: 'One becomes two', short: 'The square and its diagonal · √2',
    idea: 'Draw a square’s diagonal and build a new square on it: the new square is exactly twice as big. That is how one becomes two, and two becomes many.',
    body: [
      'A square’s diagonal is always about 1.414 times its side. This number, the square root of 2 (√2), never ends and never repeats. The Pythagoreans called such numbers “unutterable”. The book treats them not as mistakes but as relationships: you can draw them perfectly even though you can never write them down.',
      'Build a square on the diagonal and it holds four half-squares instead of two: double the area. Do it again: four times, eight times. Halving works the same way, inwards. The book calls √2 the generative power: like a cell dividing, the half produces the double.',
      'It links √2 to the root of a plant, which breaks hard minerals down so the plant can grow. It takes apart in order to make new. In the body the √2 point of your height marks the hara, the centre just below the navel used in Zen breathing.',
    ],
    nature: ['Cell division', 'Plant roots', 'The plan of the Parthenon', 'Islamic floor tiles', 'The hara, below the navel'],
    bridges: [
      { to: 'alchemy', text: 'Separation, the first step of nearly every process on the Alchemy page: take the plant apart so its powers can multiply.' },
      { to: 'wealth', text: 'Doubling. Miller’s compound interest grows the same way: what you have becomes the side of what comes next.' },
    ],
    pages: 'pp. 23–31',
  },
  {
    k: 'vesica', title: 'Two circles and a fish', short: 'The vesica piscis · √3',
    idea: 'Draw two equal circles, each through the other’s centre. The fish-shaped overlap gives birth to triangles, hexagons and every regular shape.',
    body: [
      'The overlap is called the vesica piscis, Latin for the bladder of a fish. Its long axis is √3 (about 1.732) times its short one, and two perfect triangles sit inside it.',
      'Keep stepping the same compass opening around the circle and it fits exactly six times: a hexagon. The book shows the square, pentagon, hexagon, octagon, decagon and dodecagon all growing from this one figure, like branches from a seed.',
      'The book calls √3 the formative power. Every solid needs triangles to hold its shape, and the diagonal of a cube is √3. Six is the order of crystals, of the honeycomb, and of the carbon ring that makes living matter possible.',
      'One circle is the source, the other its reflection; the overlap is the middle world where they meet. Medieval Christians drew Christ inside it, which is one root of the fish as a Christian sign, and of the sign for Pisces.',
    ],
    nature: ['The honeycomb', 'Snowflakes and crystals', 'Chartres and the Gothic cathedrals', 'The 360 degrees of the circle', 'The sign for Pisces'],
    bridges: [
      { to: 'numbers', text: 'In Johari’s system the Sun is 1 and the Moon is 2: one circle the source, the other the reflection.' },
      { to: 'alchemy', text: 'Bartlett’s gold and silver, the metals of the Sun and the Moon, are the two circles of the work.' },
    ],
    pages: 'pp. 31–35',
  },
  {
    k: 'root5', title: 'Five and life', short: 'The double square and the pentagon · √5',
    idea: 'Put two squares together. The diagonal of this double square is √5, and with it you can draw the five-sided pentagon, the shape of living things.',
    body: [
      'A rectangle one wide and two tall is a double square. Its diagonal is √5, about 2.236. With it you can step a perfect pentagon around a circle.',
      'The book says √5 joins two worlds, as the diagonal joins the two squares: spirit above and body below. It is also the doorway to the golden proportion of lesson 7.',
      'The book’s three “sacred roots” are √2, √3 and √5: generation, formation and regeneration. With these three alone you can build all five perfect solids and divide the octave into musical scales.',
      'Nature only makes fivefold shapes in living things, the book notes. Flowers of the rose family, which includes most edible fruit, have five petals. A person with head, arms and legs is a five-pointed star.',
    ],
    nature: ['Five-petalled flowers: the rose family, apples, pears, strawberries', 'The starfish', 'The Egyptian five-pointed star', 'The human body as a star'],
    bridges: [
      { to: 'numbers', text: 'Five is Mercury in Johari’s system: quick, sensory, alive. The pentagon is its shape.' },
      { to: 'geometry', text: 'Lessons 7 and 9 return to the pentagon: it carries the golden cut in every line.' },
    ],
    pages: 'pp. 35–37',
  },
  {
    k: 'alternation', title: 'Alternation', short: 'Swinging toward the centre',
    idea: 'Whole numbers can creep up on √2 by guessing too high, then too low, then too high, closer each time. The book reads this as how everything grows: by swinging between opposites.',
    body: [
      'Theon of Smyrna, a teacher of Plato’s thought in the 2nd century, gave the recipe. Start with a side of 1 and a diagonal of 1. The new side is side plus diagonal; the new diagonal is diagonal plus two sides. You get 1/1, 3/2, 7/5, 17/12, 41/29, 99/70…',
      'Each pair lands a little above, then a little below, the true √2, and each lands closer. By 41/29 it is right to three decimal places. Square the diagonal and you always get twice the side’s square, plus or minus exactly one.',
      'The book reads this as a law of life. Nothing grows in a straight line: it alternates, like a string vibrating around its still point, or a seed whose root grows down while its shoot grows up. The yin-yang sign is built on the same idea.',
      'The 3-4-5 triangle, the “sacred triangle” of Egypt, is the most famous whole-number moment of this kind: a fixed, stable shape caught out of endless change.',
    ],
    nature: ['A vibrating string', 'A seed’s root and shoot', 'The yin-yang sign and the I Ching', 'The 3-4-5 triangle used to square corners'],
    bridges: [
      { to: 'wealth', text: 'Miller quotes Warren Buffett: those who win buy when everyone is selling. Markets swing above and below value.' },
      { to: 'alchemy', text: 'Circulation: the liquid rises, falls and rises again in the vessel, and each round refines it.' },
      { to: 'numbers', text: 'Johari’s strong and weak periods alternate through your year; see Cycles.' },
    ],
    pages: 'pp. 38–43',
  },
  {
    k: 'golden', title: 'The golden cut', short: 'Phi, φ = 1.618',
    idea: 'Cut a line so that the small part is to the large part as the large part is to the whole. There is only one place to cut, about 61.8% of the way. That proportion, 1 to 1.618, is the golden proportion, φ (phi).',
    body: [
      'A ratio compares two things. A proportion says two ratios match: a is to b as c is to d. The tightest form uses three terms, a is to b as b is to c, with the middle one binding the two ends. The golden cut goes further and uses only two: the small part is to the large as the large is to the whole.',
      'Its number is 1.618… and it has odd powers. Add 1 to it and you get its square; take 1 away and you get one over it. The book says that in φ adding and multiplying become the same act: growth that is both steady and sudden.',
      'Add numbers in pairs, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, and each pair comes closer to φ. Sunflowers carry 55 spirals one way and 34 or 89 the other. Leaves step around a stem in these numbers so each gets light and air.',
      'The book finds φ in the pentagon and its star, in Egyptian, Greek and Gothic buildings, and in the body: the navel divides a grown person’s height at the golden cut. At birth it sits halfway, and it rises to φ as we grow.',
      'It calls φ the most intimate division of the One: the only cut that keeps the whole inside its parts. Not everything in nature is golden, it says, but wherever form is most alive and most beautiful, φ is found.',
    ],
    nature: ['Sunflower and cactus seed spirals', 'Leaves around a stem', 'The nautilus shell', 'The pentagram', 'The navel in the human body', 'The tomb of Petosiris; Piero della Francesca’s Baptism of Christ'],
    bridges: [
      { to: 'wealth', text: 'The book names wealth among the things that grow by adding. Miller’s compound interest shows the moment adding turns into multiplying.' },
      { to: 'geometry', text: 'Lesson 11 measures your own golden cut: where your navel falls in your height.' },
    ],
    pages: 'pp. 44–64',
  },
  {
    k: 'gnomon', title: 'Growing without changing shape', short: 'The gnomon and the spiral',
    idea: 'A gnomon is the piece you add to a shape so it grows bigger but keeps its shape. Shells, horns and bones grow this way, keeping their whole past inside them.',
    body: [
      'Add an L-shaped border to a square and you get a bigger square. The borders are the odd numbers, 1, 3, 5, 7, and together they always make a square. Add a square to a golden rectangle and you get a bigger golden rectangle. Either way, the new contains the old.',
      'Draw a quarter circle in each square as it is added and a spiral appears. The book builds spirals for √5, √2 and √3 in the same way. Old geometers called the logarithmic spiral the miraculous spiral, because its size grows by multiplying while its turning grows by adding.',
      'The book sees time itself this way: growth upon growth, with the past kept as form. Remove the newest chamber of a nautilus and you step back in its life.',
      'A Hindu temple was laid out from a single square altar, growing outwards square by square. The Egyptian throne of Osiris is drawn as a square with its gnomon.',
    ],
    nature: ['The nautilus and other shells', 'Rams’ horns, teeth and bones', 'The sunflower head', 'The Hindu temple plan', 'Spiral galaxies'],
    bridges: [
      { to: 'wealth', text: 'Compound interest is growth by gnomon: each year’s interest is added to what you already have, and the whole keeps its shape. Try the growth calculator on the Wealth page.' },
      { to: 'alchemy', text: 'Multiplication of the Stone: each round adds to what is already there.' },
    ],
    pages: 'pp. 64–73',
  },
  {
    k: 'squaring', title: 'Squaring the circle', short: 'Heaven meets earth',
    idea: 'The circle stands for spirit, which cannot be measured, and the square for the earth, which can. Drawing a square almost equal to a circle is a picture of the infinite fitting into the finite.',
    body: [
      'π, the circle’s number (3.14159…), never ends, so no square can equal a circle exactly. With a compass alone, though, you can come astonishingly close.',
      'Divide the circle into two half-size circles, as in yin and yang. Arcs that wrap them cut the radius at the golden section and find the corners of a pentagon. The book says the plan for life is already there in the first division.',
      'Put a square around the circle: its perimeter is 8. Draw a circle through the tips of the arcs: its rim is 7.99. Circle and square have nearly met. The book connects this to a value of π believed to have been used for the Great Pyramid.',
      'Domes over square rooms, mandalas, and pilgrims circling the cube of the Kaaba are all, the book says, ways of squaring the circle.',
    ],
    nature: ['Domes over square halls', 'Mandalas', 'The circling of the Kaaba', 'The Great Pyramid', 'Medieval squarings through the pentagon'],
    bridges: [
      { to: 'wealth', text: 'Miller’s nine-night rite sets four goddess candles around Jupiter’s circle: a mandala, the circle squared. It is drawn on the Wealth page.' },
      { to: 'numbers', text: 'The Lo Shu on your Numbers page is a square holding the nine numbers in perfect balance.' },
    ],
    pages: 'pp. 74–79',
  },
  {
    k: 'music', title: 'Geometry becomes music', short: 'Octave, fifth and fourth',
    idea: 'The ratios that make shapes also make harmony: half a string sounds the octave, two-thirds the fifth, three-quarters the fourth.',
    body: [
      'Between any two numbers there are three classic middles. The arithmetic middle takes equal steps (3, 5, 7). The geometric middle takes equal ratios (4, 8, 16). The harmonic middle mixes the two (2, 3, 6). The book calls their study the cornerstone of ancient philosophy.',
      'Put the arithmetic and harmonic middles between 1 and 2 and you get 1, 4/3, 3/2, 2: a note, its fourth, its fifth and its octave, the backbone of nearly every scale. A fourth and a fifth make an octave whether you add the string lengths or multiply the vibrations.',
      'Plato built the World Soul from two ladders, 1, 2, 4, 8 and 1, 3, 9, 27, called the Lambda. Multiplying by 3/2 again and again gives every note of the Pythagorean scale.',
      'Goethe said geometry is frozen music. The book shows sound making shapes: sand on a vibrating plate gathers into patterns.',
    ],
    nature: ['Every musical scale', 'Cistercian churches built to musical proportions', 'Sand patterns on vibrating plates', 'Crystal lattices spaced like the frets of a harp'],
    bridges: [
      { to: 'numbers', text: 'Johari gives each planet a mantra to repeat. The book’s last pages say the true name of a thing is the sound of the forces that make it; your Name number reads the sound of your name.' },
    ],
    pages: 'pp. 80–89',
  },
  {
    k: 'body', title: 'The body as a measure', short: 'Navel, centre, hara',
    idea: 'In the traditional canon of the ideal body, the navel sits at the golden cut of your height, the body’s centre at its half, and the hara at the √2 point.',
    body: [
      'Old traditions saw the human being as the universe in small: the tree grown from a seed, where the seed is the cosmic person. Temples in India, Egypt and Europe were laid out on a human figure.',
      'In the canon, the outstretched arms equal the height, the sex organs fall at half the height, the navel at the golden cut, and the hara, the belly centre of Zen practice, at 0.586 of the height from the feet.',
      'A child’s navel starts at the halfway point and rises toward the golden cut as it grows. In grown men it sits a little below, in women a little above, and it shifts at puberty and again between 17 and 30: alternation again.',
      'Egypt drew the figure on a grid of 18 squares to the brow and 19 to the crown. Measures like the cubit and the fathom came from the body, and the book says they also fit the size and turning of the Earth.',
    ],
    nature: ['Leonardo’s Vitruvian Man', 'Dürer’s figures', 'The Temple of Luxor, planned as a human body', 'Cathedrals planned on a figure on the cross', 'Bharata Natyam dance positions'],
    bridges: [
      { to: 'wealth', text: 'Miller’s “spheres” exercise lays the five elements along the same central line: earth at the base, fire behind the navel, water at the heart, air at the throat, space at the crown.' },
      { to: 'alchemy', text: 'Bartlett gives each planet an organ: Sun the heart, Moon the brain, Jupiter the liver.' },
    ],
    pages: 'pp. 90–95',
  },
  {
    k: 'solids', title: 'The five perfect solids', short: 'Fire, earth, air, water, ether',
    idea: 'Only five solids have every face, edge and corner alike. Plato matched them to the elements: fire, earth, air, water, and the fifth, ether.',
    body: [
      'The tetrahedron (4 triangles) is fire; the cube (6 squares) is earth; the octahedron (8 triangles) is air; the icosahedron (20 triangles) is water; the dodecahedron (12 pentagons) is the fifth element, ether or prana. All five are made from just three shapes: the triangle, the square and the pentagon.',
      'They nest inside each other in a cycle. An icosahedron holds a dodecahedron, which holds a cube, which holds two interlocked tetrahedra, which hold an octahedron, which holds a smaller icosahedron. Above, the steps are φ; below, the steps are √2. The book says √2 is the way φ acts in nature.',
      'In Hindu thought, the book says, the icosahedron is Purusha, the cosmic seed-person, and the dodecahedron is Prakriti, the mother of nature. Some link each solid to one of the sheaths of a person: from the food body to the body of bliss.',
      'Carved stone balls in these shapes were made in Neolithic Scotland a thousand years before Plato. Kepler nested them to explain the orbits of the planets.',
    ],
    nature: ['Crystals: cubes of salt, quartz, beryl', 'Neolithic carved stone balls', 'Kepler’s model of the solar system', 'Renaissance study of transparent solids'],
    bridges: [
      { to: 'numbers', text: 'Johari gives each number an element. The solids of your elements carry a star.' },
      { to: 'wealth', text: 'Miller’s spheres exercise balances the same five elements in the body.' },
      { to: 'alchemy', text: 'Bartlett’s four elements, and the fifth that holds them, are the ground of every operation.' },
    ],
    pages: 'pp. 96–109',
  },
];

// ---------------------------------------------------------------------------------------------
// Each number as a shape (the book's reading of the first numbers and the polygons), beside the
// planet Johari gives it. Seven, eight and nine draw on the book's remarks on cycles, the cube
// and the Sri Yantra.
// ---------------------------------------------------------------------------------------------
export interface NumberShape { n: N; shape: string; sides: number; meaning: string; nature: string }
export const NUMBER_SHAPES: Record<N, NumberShape> = {
  1: { n: 1, shape: 'Point and circle', sides: 0, meaning: 'Unity, the seed. Every figure starts from one point and one circle.', nature: 'the bindu at the centre of a mandala' },
  2: { n: 2, shape: 'Line and vesica', sides: 2, meaning: 'Division, the power of many. Two points make a line; one circle reflected makes two.', nature: 'a cell dividing; the octave' },
  3: { n: 3, shape: 'Triangle', sides: 3, meaning: 'The mother of form: the first closed shape. Every solid needs it.', nature: 'every rigid structure' },
  4: { n: 4, shape: 'Square', sides: 4, meaning: 'The measurable world: four directions, four elements, the first-born thing.', nature: 'salt crystals; the temple’s altar' },
  5: { n: 5, shape: 'Pentagon', sides: 5, meaning: 'Life and the golden proportion: flowers, the human star.', nature: 'five-petalled flowers' },
  6: { n: 6, shape: 'Hexagon', sides: 6, meaning: 'Form and crystal: the honeycomb, the snowflake, the carbon ring.', nature: 'the honeycomb' },
  7: { n: 7, shape: 'Heptagon', sides: 7, meaning: 'Process and cycles: the lunar month, the seven intervals of the octave, the colours of the rainbow. The only one of these you cannot draw exactly from a circle.', nature: 'the phases of the Moon' },
  8: { n: 8, shape: 'Octagon', sides: 8, meaning: 'Volume: two times two times two is the cube. Four becomes eight, and the square turns toward the circle.', nature: 'the octave’s eight notes' },
  9: { n: 9, shape: 'Nine triangles', sides: 9, meaning: 'Completion: the nine interlocked triangles of the Sri Yantra hold every force in the universe; Egypt counted nine great principles of creation.', nature: 'the Sri Yantra' },
};

// ---------------------------------------------------------------------------------------------
// The five elements across the books.
// ---------------------------------------------------------------------------------------------
export type El5 = 'fire' | 'earth' | 'air' | 'water' | 'ether';
export interface ElementRow { k: El5; name: string; solid: SolidK; solidName: string; faces: string; sphere: string; sphereColour: string; color: string; johari: string; kosha: string }
export const ELEMENT_ROWS: ElementRow[] = [
  { k: 'earth', name: 'Earth', solid: 'cube', solidName: 'Cube', faces: '6 squares', sphere: 'Perineum, at the base of the body', sphereColour: 'dark earth tones: dense, cool, dry', color: 'var(--el-earth)', johari: 'Earth', kosha: 'The mind body (pure reason)' },
  { k: 'water', name: 'Water', solid: 'icosahedron', solidName: 'Icosahedron', faces: '20 triangles', sphere: 'Heart', sphereColour: 'deep blue: cool, fluid', color: 'var(--el-water)', johari: 'Water', kosha: 'The bliss body (the outer icosahedron)' },
  { k: 'fire', name: 'Fire', solid: 'tetrahedron', solidName: 'Tetrahedron', faces: '4 triangles', sphere: 'Below and behind the navel, near the base of the spine', sphereColour: 'red: hot, dry, expanding', color: 'var(--el-fire)', johari: 'Fire', kosha: 'The energy body (prana)' },
  { k: 'air', name: 'Air', solid: 'octahedron', solidName: 'Octahedron', faces: '8 triangles', sphere: 'Throat', sphereColour: 'bright yellow: warm, moist, quick', color: 'var(--el-air)', johari: 'Air', kosha: 'The food body (instinct)' },
  { k: 'ether', name: 'Ether · space', solid: 'dodecahedron', solidName: 'Dodecahedron', faces: '12 pentagons', sphere: 'Crown, inside and above the head', sphereColour: 'clear: spacious awareness', color: 'var(--gold-2)', johari: 'Ether', kosha: 'The knowledge body (knowing by identity)' },
];
export const elementOf = (johari: string): El5 =>
  (({ Fire: 'fire', Water: 'water', Earth: 'earth', Air: 'air', Ether: 'ether' } as Record<string, El5>)[johari] ?? 'ether');

// ---------------------------------------------------------------------------------------------
// Words you will meet
// ---------------------------------------------------------------------------------------------
export const GEO_WORDS: { w: string; d: string }[] = [
  { w: 'Ratio', d: 'A comparison of two things: 1 to 2, written 1 : 2.' },
  { w: 'Proportion', d: 'Two ratios that match: 1 is to 2 as 2 is to 4.' },
  { w: 'Mean', d: 'The middle term that binds two ends in a proportion.' },
  { w: 'Root (√)', d: 'The side of a square of a given area. √2 is the side of a square whose area is 2.' },
  { w: 'Irrational', d: 'A number like √2 or π whose decimals never end or repeat. The book prefers “supra-rational”.' },
  { w: 'φ, phi', d: 'The golden proportion, about 1.618: the only cut where the small part is to the large as the large is to the whole.' },
  { w: 'π, pi', d: 'How many times a circle’s width fits round its rim, about 3.14159.' },
  { w: 'Vesica piscis', d: 'The almond shape where two equal circles overlap, each through the other’s centre.' },
  { w: 'Gnomon', d: 'The piece added to a shape so it grows but keeps its shape.' },
  { w: 'Octave', d: 'The same note at double the vibration: the sound of 1 : 2.' },
  { w: 'Fibonacci numbers', d: '1, 1, 2, 3, 5, 8, 13…: each is the sum of the two before. Neighbours approach φ.' },
  { w: 'Platonic solid', d: 'One of the five solids with every face, edge and corner alike.' },
];

