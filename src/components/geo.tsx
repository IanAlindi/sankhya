import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { N } from '../lib/num';
import { NUM } from '../data/numbers';
import {
  PHI, frame, pathOf, arcPoints, regular, polar, sideDiagonal, whirl, solid, rotate, fibonacci,
  type Construction, type Shape, type Tone, type Pt, type Dir, type SolidK,
} from '../lib/geo';
import { ELEMENT_ROWS, type El5 } from '../data/geometry';

const css = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
const reducedMotion = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const TONE: Record<Tone, string> = {
  ink: 'var(--fg)', faint: 'var(--faint)', gold: 'var(--gold-2)', accent: 'var(--accent)', red: 'var(--rubedo)', blue: 'var(--el-water)',
  p1: 'var(--p1)', p2: 'var(--p2)', p3: 'var(--p3)', p4: 'var(--p4)', p5: 'var(--p5)', p6: 'var(--p6)', p7: 'var(--p7)', p8: 'var(--p8)', p9: 'var(--p9)',
};
const OFF: Record<Dir, [number, number, 'start' | 'middle' | 'end']> = {
  n: [0, -10, 'middle'], s: [0, 18, 'middle'], e: [9, 4, 'start'], w: [-9, 4, 'end'],
  ne: [7, -7, 'start'], nw: [-7, -7, 'end'], se: [7, 15, 'start'], sw: [-7, 15, 'end'],
};

/** Plays the given element's appearance only once it is on screen. */
function useOnScreen<T extends Element>(margin = '0px') {
  const ref = useRef<T>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return [ref, on] as const;
}

// ---------------------------------------------------------------------------------------------
// A construction that draws itself, one compass step at a time.
// ---------------------------------------------------------------------------------------------
function drawShape(s: Shape, to: (p: Pt) => Pt, key: string, cls: string, delay: number): ReactNode {
  const color = TONE[s.tone ?? 'ink'];
  const style = { '--d': `${delay}s` } as CSSProperties;
  const dashed = 'dash' in s && s.dash;
  const strokeCls = `${cls} ${dashed ? 'cs-fade' : 'cs-line'}`;
  switch (s.t) {
    case 'circle': {
      const pts = arcPoints(s.c, s.r, s.start ?? 90, (s.start ?? 90) + 360, 1);
      return <path key={key} d={pathOf(pts, to, true)} pathLength={1} className={strokeCls} style={style}
        fill={s.fill ? color : 'none'} fillOpacity={s.fill ? 0.12 : undefined} stroke={color} strokeWidth={1.6} strokeDasharray={dashed ? '5 5' : undefined} />;
    }
    case 'line': {
      const [x1, y1] = to(s.a), [x2, y2] = to(s.b);
      return <path key={key} d={`M${x1} ${y1} L${x2} ${y2}`} pathLength={1} className={strokeCls} style={style}
        stroke={color} strokeWidth={s.w ?? 1.5} strokeLinecap="round" strokeDasharray={dashed ? '5 5' : undefined} />;
    }
    case 'arc':
      return <path key={key} d={pathOf(arcPoints(s.c, s.r, s.from, s.to), to)} pathLength={1} className={strokeCls} style={style}
        fill="none" stroke={color} strokeWidth={1.6} strokeDasharray={dashed ? '5 5' : undefined} />;
    case 'poly':
      return (
        <g key={key}>
          {s.fill && !s.open && <path d={pathOf(s.pts, to, true)} fill={color} fillOpacity={0.14} stroke="none" className={`${cls} cs-fade`} style={{ '--d': `${delay + 0.5}s` } as CSSProperties} />}
          <path d={pathOf(s.pts, to, !s.open)} pathLength={1} className={strokeCls} style={style} fill="none" stroke={color}
            strokeWidth={s.w ?? 1.7} strokeLinejoin="round" strokeDasharray={dashed ? '5 5' : undefined} />
        </g>
      );
    case 'dot': {
      const [x, y] = to(s.p);
      const [dx, dy, anchor] = OFF[s.at ?? 'n'];
      return (
        <g key={key} className={`${cls} cs-pop`} style={style}>
          <circle cx={x} cy={y} r={3.6} fill={TONE[s.tone ?? 'ink']} />
          {s.label && <text x={x + dx} y={y + dy} textAnchor={anchor} className="cs-letter">{s.label}</text>}
        </g>
      );
    }
    case 'label': {
      const [x, y] = to(s.p);
      return <text key={key} x={x} y={y} textAnchor={s.anchor ?? 'middle'} dominantBaseline="middle" className={`${cls} cs-fade cs-label`}
        style={{ ...style, fontSize: `${(s.size ?? 1) * 14}px`, fill: TONE[s.tone ?? 'ink'] } as CSSProperties}>{s.text}</text>;
    }
  }
}

export function ConstructionView({ c }: { c: Construction }) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const f = useMemo(() => frame(c.box, 440), [c]);
  const last = c.steps.length - 1;
  useEffect(() => { setStep(0); setPlaying(false); }, [c]);
  useEffect(() => {
    if (!playing) return;
    if (step >= last) { setPlaying(false); return; }
    const t = setTimeout(() => setStep((s) => s + 1), 3200);
    return () => clearTimeout(t);
  }, [playing, step, last]);
  const cur = c.steps[step];
  return (
    <div className="cs">
      <svg viewBox={`0 0 ${f.width} ${f.height.toFixed(1)}`} role="img" aria-label={`${c.label}. Step ${step + 1} of ${c.steps.length}: ${cur.do}`}>
        {c.steps.slice(0, step + 1).map((st, i) => (
          <g key={`${i}`} className={i < step ? 'cs-past' : 'cs-cur'}>
            {st.add.map((s, j) => drawShape(s, f.to, `${i}-${j}`, i === step ? 'cs-new' : '', j * 0.32))}
          </g>
        ))}
      </svg>
      <div className="cs-dots" role="tablist" aria-label="Steps">
        {c.steps.map((_, i) => (
          <button key={i} role="tab" aria-selected={i === step} aria-label={`Step ${i + 1}`} className={i <= step ? 'done' : ''} onClick={() => { setPlaying(false); setStep(i); }} />
        ))}
      </div>
      <div className="cs-text" aria-live="polite">
        <p className="cs-do"><span className="cs-n">{step + 1}<small>/{c.steps.length}</small></span>{cur.do}</p>
        <p className="cs-why"><b>Why</b>{cur.why}</p>
      </div>
      <div className="cs-controls">
        <button className="btn" onClick={() => { setPlaying(false); setStep(Math.max(0, step - 1)); }} disabled={step === 0} aria-label="Previous step">‹ Back</button>
        <button className="btn primary" onClick={() => { setPlaying(false); setStep(Math.min(last, step + 1)); }} disabled={step === last}>Next step ›</button>
        {step < last
          ? <button className="btn ghost" onClick={() => setPlaying(!playing)}>{playing ? 'Pause' : 'Play the rest'}</button>
          : <button className="btn ghost" onClick={() => { setStep(0); setPlaying(false); }}>Draw it again</button>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------------------------
// A number's shape, small, in its planet's colour.
// ---------------------------------------------------------------------------------------------
export function ShapePath({ n, c = [50, 50], r = 40, w = 2 }: { n: N; c?: Pt; r?: number; w?: number }) {
  const col = `var(--p${n})`;
  const to = (p: Pt): Pt => [p[0], 100 - p[1]];
  const C: Pt = [c[0], 100 - c[1]];
  if (n === 1) return <g fill="none" stroke={col} strokeWidth={w}><circle cx={c[0]} cy={c[1]} r={r} /><circle cx={c[0]} cy={c[1]} r={w * 1.6} fill={col} /></g>;
  if (n === 2) {
    const rr = r * 0.62;
    const a2: Pt = [C[0] - rr / 2, C[1]], b2: Pt = [C[0] + rr / 2, C[1]];
    const lens = [...arcPoints(a2, rr, -60, 60), ...arcPoints(b2, rr, 120, 240)];
    return (
      <g fill="none" stroke={col} strokeWidth={w}>
        <circle cx={a2[0]} cy={100 - a2[1]} r={rr} opacity={0.55} />
        <circle cx={b2[0]} cy={100 - b2[1]} r={rr} opacity={0.55} />
        <path d={pathOf(lens, to, true)} fill={col} fillOpacity={0.18} />
      </g>
    );
  }
  if (n === 9) {
    const pts = regular(C, r, 9, 90);
    const star = Array.from({ length: 9 }, (_, i) => pts[(i * 4) % 9]);
    return (
      <g fill="none" stroke={col} strokeWidth={w} strokeLinejoin="round">
        <path d={pathOf(pts, to, true)} opacity={0.45} />
        <path d={pathOf(star, to, true)} />
      </g>
    );
  }
  const pts = regular(C, r, n, 90);
  return (
    <g fill="none" stroke={col} strokeWidth={w} strokeLinejoin="round">
      <circle cx={c[0]} cy={c[1]} r={r} opacity={0.3} />
      <path d={pathOf(pts, to, true)} fill={col} fillOpacity={0.12} />
    </g>
  );
}

export function ShapeOf({ n, size = 44, label }: { n: N; size?: number; label?: string }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} style={{ flexShrink: 0, overflow: 'visible' }}>
      <ShapePath n={n} />
    </svg>
  );
}

// ---------------------------------------------------------------------------------------------
// Hero: the polygons three to nine growing out of one circle, each in its planet's colour.
// ---------------------------------------------------------------------------------------------
export function PolygonSeed() {
  const c: Pt = [200, 200];
  const to = (p: Pt): Pt => [p[0], 400 - p[1]];
  const order: N[] = [3, 4, 5, 6, 7, 8, 9];
  return (
    <svg className="seed" viewBox="0 0 400 400" role="img" aria-label="A circle with the polygons from three to nine sides drawn inside it, each in the colour of its number's planet">
      <defs>
        <radialGradient id="seed-glow"><stop offset="0" stopColor="var(--gold-2)" stopOpacity="0.35" /><stop offset="1" stopColor="var(--gold-2)" stopOpacity="0" /></radialGradient>
      </defs>
      <circle cx="200" cy="200" r="190" fill="url(#seed-glow)" />
      <g className="seed-spin">
        <circle cx="200" cy="200" r="160" fill="none" stroke="var(--gold-2)" strokeOpacity="0.6" strokeWidth="1.2" pathLength={1} className="seed-draw" style={{ '--d': '0s' } as CSSProperties} />
        {order.map((n, i) => {
          const pts = regular(c, 160, n, 90);
          const d = n === 9 ? pathOf(Array.from({ length: 9 }, (_, k) => pts[(k * 4) % 9]), to, true) : pathOf(pts, to, true);
          return <path key={n} d={d} fill="none" stroke={`var(--p${n})`} strokeWidth="1.5" strokeLinejoin="round" pathLength={1}
            className="seed-draw" style={{ '--d': `${0.6 + i * 0.7}s` } as CSSProperties} />;
        })}
        <circle cx="200" cy="200" r="4" fill="var(--gold-1)" className="seed-pulse" />
      </g>
    </svg>
  );
}

// ---------------------------------------------------------------------------------------------
// Theon's ladder: side and diagonal numbers swinging over and under √2.
// ---------------------------------------------------------------------------------------------
export function Alternation() {
  const all = useMemo(() => sideDiagonal(8), []);
  const [k, setK] = useState(2);
  const shown = all.slice(0, k);
  const W = 440, H = 240, x0 = 40, x1 = W - 20, y = (v: number) => 20 + ((1.56 - v) / (1.56 - 0.96)) * (H - 50);
  const x = (i: number) => x0 + (i * (x1 - x0)) / 7;
  return (
    <div className="alt">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`The first ${k} side and diagonal pairs, alternately above and below the square root of two`}>
        <line x1={x0} x2={x1} y1={y(Math.SQRT2)} y2={y(Math.SQRT2)} stroke="var(--gold-2)" strokeDasharray="6 5" />
        <text x={x1} y={y(Math.SQRT2) - 8} textAnchor="end" className="cs-label" style={{ fill: 'var(--gold-2)', fontSize: 13 }}>√2 = 1.41421…</text>
        <path d={shown.map((p, i) => `${i ? 'L' : 'M'}${x(i)} ${y(p.diag / p.side)}`).join(' ')} fill="none" stroke="var(--accent)" strokeWidth="1.5" />
        {shown.map((p, i) => {
          const v = p.diag / p.side, over = v > Math.SQRT2;
          return (
            <g key={i} className="cs-pop">
              <circle cx={x(i)} cy={y(v)} r="5" fill={over ? 'var(--p9)' : 'var(--p5)'} />
              <text x={x(i)} y={y(v) + (over ? -12 : 20)} textAnchor="middle" className="cs-label" style={{ fontSize: 13 }}>{p.diag}/{p.side}</text>
            </g>
          );
        })}
      </svg>
      <table className="alt-table">
        <thead><tr><th>Side</th><th>Diagonal</th><th>Diagonal ÷ side</th><th /></tr></thead>
        <tbody>
          {shown.map((p, i) => {
            const v = p.diag / p.side;
            return (
              <tr key={i}>
                <td>{p.side}</td><td>{p.diag}</td><td className="mono">{v.toFixed(6)}</td>
                <td><span className={`tag ${v > Math.SQRT2 ? 'over' : 'under'}`}>{i === 0 ? 'the One' : v > Math.SQRT2 ? 'over' : 'under'}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="cs-controls">
        <button className="btn primary" onClick={() => setK(Math.min(8, k + 1))} disabled={k >= 8}>Next pair ›</button>
        <button className="btn ghost" onClick={() => setK(2)}>Start again</button>
        <span className="small muted">New side = side + diagonal. New diagonal = diagonal + 2 × side.</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------------------------
// The golden cut: slide the point until the two ratios agree.
// ---------------------------------------------------------------------------------------------
export function GoldenCut() {
  const [t, setT] = useState(0.5);
  const big = Math.max(t, 1 - t), small = Math.min(t, 1 - t);
  const r1 = big / small, r2 = 1 / big;
  const golden = Math.abs(r1 - r2) < 0.012;
  const W = 440, L = 30, R = W - 30, cx = L + (R - L) * t;
  return (
    <div className={`gcut${golden ? ' is-golden' : ''}`}>
      <svg viewBox={`0 0 ${W} 86`} aria-hidden="true">
        <line x1={L} x2={cx} y1="40" y2="40" stroke={t >= 0.5 ? 'var(--gold-2)' : 'var(--p5)'} strokeWidth="6" strokeLinecap="round" />
        <line x1={cx} x2={R} y1="40" y2="40" stroke={t >= 0.5 ? 'var(--p5)' : 'var(--gold-2)'} strokeWidth="6" strokeLinecap="round" />
        <circle cx={cx} cy="40" r="9" fill="var(--bg)" stroke="var(--fg)" strokeWidth="2" />
        <text x={(L + cx) / 2} y="72" textAnchor="middle" className="cs-label" style={{ fontSize: 13 }}>{(t * 100).toFixed(1)}%</text>
        <text x={(cx + R) / 2} y="72" textAnchor="middle" className="cs-label" style={{ fontSize: 13 }}>{((1 - t) * 100).toFixed(1)}%</text>
      </svg>
      <label className="sr-only" htmlFor="gcut">Where to cut the line</label>
      <input id="gcut" type="range" min={0.05} max={0.95} step={0.001} value={t} onChange={(e) => setT(+e.target.value)} />
      <div className="gcut-read">
        <div><span className="eyebrow">Large ÷ small</span><b>{r1.toFixed(3)}</b></div>
        <div><span className="eyebrow">Whole ÷ large</span><b>{r2.toFixed(3)}</b></div>
        <div className="gcut-verdict">{golden ? <><b className="gold">Golden.</b> Both are φ, 1.618.</> : 'Drag the point until the two numbers match.'}</div>
      </div>
      <div className="cs-controls">
        <button className="btn ghost" onClick={() => setT(1 / PHI)}>Show me φ</button>
        <button className="btn ghost" onClick={() => setT(0.5)}>Cut in half</button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------------------------
// A sunflower head: seeds placed by a fixed turn. Only the golden angle packs them without gaps.
// ---------------------------------------------------------------------------------------------
export function Sunflower() {
  const GOLDEN = 360 * (1 - 1 / PHI); // 137.507…
  const [deg, setDeg] = useState(GOLDEN);
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1), S = 320;
    cv.width = S * dpr; cv.height = S * dpr;
    const g = cv.getContext('2d')!;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, S, S);
    const n = 520, scale = (S / 2 - 8) / Math.sqrt(n);
    const gold = css('--gold-2') || '#f2c45a', green = css('--p5') || '#46bd82';
    for (let i = 1; i <= n; i++) {
      const a = (i * deg * Math.PI) / 180, r = scale * Math.sqrt(i);
      g.beginPath();
      g.arc(S / 2 + r * Math.cos(a), S / 2 + r * Math.sin(a), 2.2 + (i / n) * 2, 0, Math.PI * 2);
      g.fillStyle = i % 21 === 0 ? green : gold;
      g.globalAlpha = 0.55 + 0.45 * (i / n);
      g.fill();
    }
    g.globalAlpha = 1;
  }, [deg]);
  const isGolden = Math.abs(deg - GOLDEN) < 0.05;
  return (
    <div className="sunflower">
      <canvas ref={ref} role="img" aria-label={`Seeds placed at a turn of ${deg.toFixed(1)} degrees each`} />
      <div className="sun-side">
        <label className="field" htmlFor="sunangle"><span className="eyebrow">Turn between seeds: {deg.toFixed(2)}°</span></label>
        <input id="sunangle" type="range" min={90} max={180} step={0.01} value={deg} onChange={(e) => setDeg(+e.target.value)} />
        <div className="toggles">
          {[[GOLDEN, 'Golden 137.5°'], [137, '137°'], [138, '138°'], [120, '120°'], [90, '90°']].map(([v, l]) => (
            <button key={l as string} aria-pressed={Math.abs(deg - (v as number)) < 0.05} onClick={() => setDeg(v as number)}>{l}</button>
          ))}
        </div>
        <p className="small muted">{isGolden
          ? 'At the golden angle every seed finds its own space and the head fills evenly. Count the spirals and you find neighbouring Fibonacci numbers.'
          : 'Any other turn leaves gaps or lines the seeds up in spokes. A plant that used it would waste room and light.'}</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------------------------
// Gnomons: a square grows by L-shapes; a golden rectangle grows by squares and spirals.
// ---------------------------------------------------------------------------------------------
export function GnomonGrow() {
  const [mode, setMode] = useState<'square' | 'golden'>('golden');
  const [n, setN] = useState(mode === 'golden' ? 5 : 3);
  const max = mode === 'golden' ? 11 : 9;
  const W = 440;
  let body: ReactNode, note: string;
  if (mode === 'square') {
    const s = (W - 40) / max;
    body = (
      <svg viewBox={`0 0 ${W} ${W}`} role="img" aria-label={`A square of ${n} by ${n} built from L-shaped gnomons`}>
        {Array.from({ length: n }, (_, k) => {
          const a = (k + 1) * s, b = k * s, y0 = W - 20;
          const d = `M20 ${y0 - a} H${20 + a} V${y0} H20 Z`;
          const inner = `M20 ${y0 - b} H${20 + b} V${y0} H20 Z`;
          return (
            <g key={k} className="cs-pop">
              <path d={`${d} ${k ? inner : ''}`} fillRule="evenodd" fill={`var(--p${((k % 9) + 1) as N})`} fillOpacity={0.22} stroke={`var(--p${((k % 9) + 1) as N})`} strokeWidth="1.4" />
              <text x={20 + a - s / 2} y={y0 - a + s / 2 + 5} textAnchor="middle" className="cs-label" style={{ fontSize: Math.min(16, s * 0.45) }}>{2 * k + 1}</text>
            </g>
          );
        })}
      </svg>
    );
    note = `${Array.from({ length: n }, (_, k) => 2 * k + 1).join(' + ')} = ${n * n}, a square of ${n}. Each L-shaped gnomon is the next odd number.`;
  } else {
    const wv = whirl(n);
    const [bx0, by0, bx1, by1] = wv.box;
    const span = Math.max(bx1 - bx0, by1 - by0), sc = (W - 40) / span;
    const to = (p: Pt): Pt => [20 + (p[0] - bx0) * sc + ((span - (bx1 - bx0)) * sc) / 2, 20 + (by1 - p[1]) * sc + ((span - (by1 - by0)) * sc) / 2];
    body = (
      <svg viewBox={`0 0 ${W} ${W}`} role="img" aria-label={`${n} squares whirling into a golden spiral`}>
        {wv.squares.map((q, i) => {
          const pts: Pt[] = [[q.x, q.y], [q.x + q.s, q.y], [q.x + q.s, q.y + q.s], [q.x, q.y + q.s]];
          const [cx, cy] = to([q.x + q.s / 2, q.y + q.s / 2]);
          const fs = Math.min(22, q.s * sc * 0.32);
          return (
            <g key={i} className="cs-pop">
              <path d={pathOf(pts, to, true)} fill={`var(--p${((i % 9) + 1) as N})`} fillOpacity={0.1} stroke="var(--faint)" strokeWidth="1" />
              {fs > 7 && <text x={cx} y={cy + fs / 3} textAnchor="middle" className="cs-label" style={{ fontSize: fs, fill: 'var(--muted)' }}>{q.s}</text>}
            </g>
          );
        })}
        <path d={wv.squares.map((q, i) => pathOf(arcPoints(q.arc.c, q.s, q.arc.from, q.arc.from + 90), to).replace(/^M/, i ? 'L' : 'M')).join(' ')}
          fill="none" stroke="var(--gold-2)" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
    const f = fibonacci(n + 1);
    note = n > 1 ? `Sides so far: ${f.slice(0, n).join(', ')}. The newest two, ${f[n - 1]} ÷ ${f[n - 2]} = ${(f[n - 1] / f[n - 2]).toFixed(4)}, close in on φ = 1.6180.` : 'One square to begin.';
  }
  return (
    <div className="gnomon">
      <div className="seg" role="group" aria-label="Kind of growth">
        <button aria-pressed={mode === 'golden'} onClick={() => { setMode('golden'); setN(5); }}>Squares round a rectangle</button>
        <button aria-pressed={mode === 'square'} onClick={() => { setMode('square'); setN(3); }}>L-shapes round a square</button>
      </div>
      {body}
      <p className="small muted" aria-live="polite">{note}</p>
      <div className="cs-controls">
        <button className="btn primary" onClick={() => setN(Math.min(max, n + 1))} disabled={n >= max}>Add a gnomon ›</button>
        <button className="btn ghost" onClick={() => setN(1)}>Start again</button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------------------------
// The monochord: hear the ratios. Uses the browser's own sound, nothing loaded.
// ---------------------------------------------------------------------------------------------
let audio: AudioContext | null = null;
function tone(freq: number, at = 0, dur = 1.6) {
  try {
    audio ??= new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const t0 = audio.currentTime + at;
    const o = audio.createOscillator(), g = audio.createGain();
    o.type = 'triangle'; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(0.22, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(audio.destination);
    o.start(t0); o.stop(t0 + dur + 0.05);
  } catch { /* no sound available */ }
}
const NOTES = [
  { k: 'whole', label: 'Whole string', len: 1, ratio: '1 : 1', name: 'the note itself', mult: 1 },
  { k: 'fourth', label: 'Three-quarters', len: 3 / 4, ratio: '4 : 3', name: 'the fourth', mult: 4 / 3 },
  { k: 'fifth', label: 'Two-thirds', len: 2 / 3, ratio: '3 : 2', name: 'the fifth', mult: 3 / 2 },
  { k: 'octave', label: 'Half', len: 1 / 2, ratio: '2 : 1', name: 'the octave', mult: 2 },
] as const;

export function Monochord() {
  const [sel, setSel] = useState<(typeof NOTES)[number]['k']>('whole');
  const [pulse, setPulse] = useState(0);
  const base = 196;
  const cur = NOTES.find((x) => x.k === sel)!;
  const W = 440, L = 30, R = W - 30, stop = L + (R - L) * cur.len;
  const pluck = (k: (typeof NOTES)[number]['k']) => {
    const x = NOTES.find((y) => y.k === k)!;
    setSel(k); setPulse((p) => p + 1); tone(base * x.mult);
  };
  return (
    <div className="mono-chord">
      <svg viewBox={`0 0 ${W} 120`} role="img" aria-label={`A string stopped at ${cur.label.toLowerCase()} of its length, sounding ${cur.name}`}>
        <rect x={L - 6} y="30" width="6" height="60" fill="var(--faint)" />
        <rect x={R} y="30" width="6" height="60" fill="var(--faint)" />
        {NOTES.map((x) => <line key={x.k} x1={L + (R - L) * x.len} x2={L + (R - L) * x.len} y1="92" y2="100" stroke="var(--faint)" />)}
        <line x1={L} x2={R} y1="60" y2="60" stroke="var(--faint)" strokeWidth="1.2" />
        <path key={pulse} className="string-vibe" d={`M${L} 60 Q${(L + stop) / 2} ${60 - 26} ${stop} 60 Q${(L + stop) / 2} ${60 + 26} ${L} 60`} fill="var(--gold-2)" fillOpacity="0.18" stroke="var(--gold-2)" strokeWidth="1.8" />
        <polygon points={`${stop - 7},96 ${stop + 7},96 ${stop},84`} fill="var(--accent)" />
        <text x={(L + stop) / 2} y="20" textAnchor="middle" className="cs-label" style={{ fontSize: 13, fill: 'var(--gold-2)' }}>{cur.ratio}</text>
      </svg>
      <div className="toggles chord-buttons">
        {NOTES.map((x) => <button key={x.k} aria-pressed={sel === x.k} onClick={() => pluck(x.k)}>▶ {x.label} · {x.name}</button>)}
      </div>
      <div className="cs-controls">
        <button className="btn ghost" onClick={() => { tone(base, 0, 1.2); tone(base * 4 / 3, 0.9, 1.2); tone(base * 2, 1.8, 1.6); }}>Hear 1 → fourth → octave</button>
        <button className="btn ghost" onClick={() => { tone(base, 0, 2.2); tone(base * 3 / 2, 0, 2.2); }}>Note and fifth together</button>
      </div>
    </div>
  );
}

/** Plato's Lambda: powers of 2 down one side, powers of 3 down the other. */
export function Lambda() {
  const rows = [[1], [2, 3], [4, 6, 9], [8, 12, 18, 27]];
  return (
    <svg className="lambda" viewBox="0 0 300 220" role="img" aria-label="The Lambda: 1, 2, 4, 8 down the left, 1, 3, 9, 27 down the right, with 6, 12 and 18 between">
      <path d="M150 28 L45 190 M150 28 L255 190" stroke="var(--line)" fill="none" />
      {rows.map((row, i) => row.map((v, j) => {
        const x = 150 + (j - i / 2) * 70, y = 30 + i * 52;
        const left = j === 0, right = j === row.length - 1;
        const col = i === 0 ? 'var(--gold-2)' : left ? 'var(--p2)' : right ? 'var(--p9)' : 'var(--muted)';
        return <text key={`${i}-${j}`} x={x} y={y + 6} textAnchor="middle" style={{ font: '400 24px var(--font-display)', fill: col }}>{v}</text>;
      }))}
      <text x="40" y="214" className="cs-label" style={{ fontSize: 12, fill: 'var(--p2)' }}>× 2: the octaves</text>
      <text x="260" y="214" textAnchor="end" className="cs-label" style={{ fontSize: 12, fill: 'var(--p9)' }}>× 3: the fifths</text>
    </svg>
  );
}

// ---------------------------------------------------------------------------------------------
// The body as a measure: the canon's divisions on your own height, with Miller's five spheres.
// ---------------------------------------------------------------------------------------------
export function BodyCanon({ height, setHeight }: { height: number; setHeight: (h: number) => void }) {
  const H = 380, top = 20, foot = top + H - 40, span = foot - top;
  const at = (f: number) => foot - span * f; // f = fraction of height from the feet
  const lines = [
    { f: 1 / PHI, k: 'Navel · golden cut', c: 'var(--gold-2)', dy: -6 },
    { f: 2 - Math.SQRT2, k: 'Hara · √2 point', c: 'var(--p5)', dy: 14 },
    { f: 0.5, k: 'Centre · half', c: 'var(--p6)', dy: 14 },
  ];
  const spheres: { f: number; el: El5 }[] = [
    { f: 1.04, el: 'ether' }, { f: 0.855, el: 'air' }, { f: 0.73, el: 'water' }, { f: 0.565, el: 'fire' }, { f: 0.48, el: 'earth' },
  ];
  const fmt = (cm: number) => `${cm.toFixed(0)} cm`;
  return (
    <div className="body-canon">
      <svg viewBox={`0 0 300 ${H}`} role="img" aria-label="A standing figure with the navel at the golden cut of its height, the hara at the square-root-of-two point, and the centre at half">
        <g stroke="var(--muted)" strokeWidth="1.6" fill="none" strokeLinecap="round">
          <circle cx="110" cy={at(0.935)} r={span * 0.062} />
          <path d={`M110 ${at(0.872)} V${at(0.5)}`} />
          <path d={`M110 ${at(0.82)} L72 ${at(0.56)} M110 ${at(0.82)} L148 ${at(0.56)}`} />
          <path d={`M110 ${at(0.5)} L88 ${at(0)} M110 ${at(0.5)} L132 ${at(0)}`} />
        </g>
        {spheres.map((s) => {
          const row = ELEMENT_ROWS.find((r) => r.k === s.el)!;
          return <circle key={s.el} cx="110" cy={at(s.f)} r="7" fill={row.color} fillOpacity="0.85" stroke="var(--bg)" strokeWidth="1.5"><title>{row.name}: {row.sphere}</title></circle>;
        })}
        {lines.map((l) => (
          <g key={l.k}>
            <line x1="60" x2="290" y1={at(l.f)} y2={at(l.f)} stroke={l.c} strokeDasharray="5 4" />
            <text x="290" y={at(l.f) + l.dy} textAnchor="end" className="cs-label" style={{ fontSize: 11.5, fill: l.c }}>{l.k}</text>
          </g>
        ))}
        <line x1="20" x2="20" y1={top} y2={foot} stroke="var(--faint)" />
        <text x="26" y={top + 4} className="cs-label" style={{ fontSize: 11 }}>{fmt(height)}</text>
        <text x="26" y={foot} className="cs-label" style={{ fontSize: 11 }}>0</text>
      </svg>
      <div className="body-side">
        <div className="field">
          <label htmlFor="height">Your height in centimetres</label>
          <input id="height" type="number" inputMode="numeric" min={50} max={250} value={height} onChange={(e) => setHeight(Math.max(50, Math.min(250, +e.target.value || 0)))} />
        </div>
        <dl className="register">
          <div><dt>Navel, by the canon</dt><dd>{fmt(height / PHI)} from the floor <span className="sub">The golden cut: 0.618 of your height.</span></dd></div>
          <div><dt>Hara</dt><dd>{fmt(height * (2 - Math.SQRT2))} <span className="sub">0.586 of your height: the belly centre used in Zen breathing.</span></dd></div>
          <div><dt>Centre</dt><dd>{fmt(height / 2)} <span className="sub">Half your height, where the book places the sex organs.</span></dd></div>
          <div><dt>Arm span</dt><dd>{fmt(height)} <span className="sub">In the canon, outstretched arms equal the height.</span></dd></div>
        </dl>
        <p className="note">Measure your real navel and compare. The book says few people sit exactly on the line: it moves during life, and hovers a little above or below.</p>
        <div className="sphere-key">
          {[...ELEMENT_ROWS].reverse().map((r) => <span key={r.k}><i style={{ background: r.color }} />{r.name}: {r.sphere.toLowerCase()}</span>)}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------------------------
// The five solids, turning.
// ---------------------------------------------------------------------------------------------
export function SolidView({ k, color }: { k: SolidK; color: string }) {
  const [ref, on] = useOnScreen<HTMLCanvasElement>('50px');
  const data = useMemo(() => solid(k), [k]);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const S = 300, dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = S * dpr; cv.height = S * dpr;
    const g = cv.getContext('2d')!;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    const col = color.startsWith('var(') ? css(color.slice(4, -1)) || '#f2c45a' : color;
    const faint = css('--faint') || '#6c6f93';
    let raf = 0, t0 = performance.now();
    const draw = (now: number) => {
      const t = (now - t0) / 1000;
      const ax = 0.5 + Math.sin(t * 0.21) * 0.25, ay = t * 0.42;
      g.clearRect(0, 0, S, S);
      const P = data.verts.map((v) => rotate(v, ax, ay));
      const proj = P.map(([x, y, z]) => { const s = 105 * (2.6 / (2.6 - z * 0.6)); return [S / 2 + x * s, S / 2 - y * s, z] as const; });
      const edges = [...data.edges].sort((a, b) => (P[a[0]][2] + P[a[1]][2]) - (P[b[0]][2] + P[b[1]][2]));
      for (const [i, j] of edges) {
        const z = (P[i][2] + P[j][2]) / 2;
        g.beginPath(); g.moveTo(proj[i][0], proj[i][1]); g.lineTo(proj[j][0], proj[j][1]);
        g.strokeStyle = z < -0.1 ? faint : col; g.globalAlpha = z < -0.1 ? 0.55 : 1; g.lineWidth = z < -0.1 ? 1 : 2;
        g.stroke();
      }
      g.globalAlpha = 1;
      for (const [x, y, z] of proj) { g.beginPath(); g.arc(x, y, z < 0 ? 1.8 : 2.8, 0, Math.PI * 2); g.fillStyle = z < 0 ? faint : col; g.fill(); }
      if (on && !reducedMotion()) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [data, on, color, ref]);
  return <canvas ref={ref} className="solid-canvas" role="img" aria-label={`A turning ${k}`} />;
}

// ---------------------------------------------------------------------------------------------
// Your seal: the shapes of your numbers drawn together in one circle.
// ---------------------------------------------------------------------------------------------
export function Seal({ nums, size = 300 }: { nums: { n: N; k: string }[]; size?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const radii = [86, 66, 46];
  const download = () => {
    const el = ref.current;
    if (!el) return;
    const bg = css('--bg') || '#0c0e1d';
    const raw = el.outerHTML.replace(/var\((--[\w-]+)\)/g, (_, v) => css(v) || '#999')
      .replace('<svg', `<svg xmlns="http://www.w3.org/2000/svg" style="background:${bg}"`);
    const url = URL.createObjectURL(new Blob([raw], { type: 'image/svg+xml' }));
    const a = Object.assign(document.createElement('a'), { href: url, download: 'my-seal.svg' });
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <figure className="seal">
      <svg ref={ref} viewBox="0 0 200 200" width={size} height={size} role="img" aria-label={`Your seal: ${nums.map((x) => `${x.k} ${x.n}, ${NUM[x.n].planet}`).join('; ')}`}>
        <circle cx="100" cy="100" r="96" fill="none" stroke="var(--gold-2)" strokeOpacity="0.5" />
        <circle cx="100" cy="100" r="92" fill="none" stroke="var(--gold-2)" strokeOpacity="0.25" />
        {nums.map((x, i) => (
          <g key={x.k} transform={`translate(${100 - radii[i] * 1.0} ${100 - radii[i] * 1.0}) scale(${(radii[i] * 2) / 80})`}>
            <ShapePath n={x.n} c={[40, 40]} r={40} w={1.6 / ((radii[i] * 2) / 80)} />
          </g>
        ))}
        <circle cx="100" cy="100" r="2.6" fill="var(--gold-1)" />
        {nums.map((x, i) => {
          const [lx, ly] = polar([100, 100], 99, 90 + 120 * i + 60);
          return <text key={x.k} x={lx} y={200 - ly} textAnchor="middle" dominantBaseline="middle" style={{ font: '400 9px var(--font-display)', fill: `var(--p${x.n})` }}>{x.n}</text>;
        })}
      </svg>
      <figcaption>
        <span className="small muted">Largest to smallest: {nums.map((x) => `${x.k.toLowerCase()} ${x.n} (${NUM[x.n].planet})`).join(', ')}.</span>
        <button className="btn sm ghost" onClick={download}>Save as image</button>
      </figcaption>
    </figure>
  );
}

// ---------------------------------------------------------------------------------------------
// The week is a star: the seven planets in Chaldean order. The hours walk the circle, the days
// jump three places, and Miller's two-week challenge walks the circle the other way.
// ---------------------------------------------------------------------------------------------
export function WeekStar({ highlight }: { highlight?: N }) {
  const order: N[] = [8, 3, 9, 1, 6, 5, 2];
  const c: Pt = [160, 160];
  const pt = (k: number, r = 112): Pt => polar(c, r, 90 - (k * 360) / 7);
  const to = (p: Pt): Pt => [p[0], 320 - p[1]];
  const star = Array.from({ length: 8 }, (_, i) => pt((3 + i * 3) % 7));
  const ring = Array.from({ length: 8 }, (_, i) => pt(i % 7));
  return (
    <svg className="weekstar" viewBox="-28 -6 376 336" role="img" aria-label="The seven planets in Chaldean order around a circle. Walking the circle gives the planetary hours; jumping three places gives the days of the week.">
      <path d={pathOf(ring, to)} fill="none" stroke="var(--faint)" strokeDasharray="4 4" />
      <path d={pathOf(star, to)} fill="none" stroke="var(--gold-2)" strokeWidth="1.6" strokeLinejoin="round" className="seed-draw" pathLength={1} style={{ '--d': '0.2s' } as CSSProperties} />
      {order.map((n, k) => {
        const [x, y] = to(pt(k)), [lx, ly] = to(pt(k, 140));
        const day = ['Sat', 'Thu', 'Tue', 'Sun', 'Fri', 'Wed', 'Mon'][k];
        return (
          <g key={n}>
            <circle cx={x} cy={y} r={highlight === n ? 9 : 6} fill={`var(--p${n})`} stroke={highlight === n ? 'var(--fg)' : 'none'} strokeWidth="1.5" />
            <text x={lx} y={ly - 2} textAnchor="middle" style={{ font: '500 12px var(--font-body)', fill: 'var(--fg)' }}>{NUM[n].planet}</text>
            <text x={lx} y={ly + 12} textAnchor="middle" style={{ font: '500 10px var(--font-mono)', fill: 'var(--muted)', letterSpacing: '.08em' }}>{day.toUpperCase()}</text>
          </g>
        );
      })}
    </svg>
  );
}

export const ELEMENT_COLOR = (k: El5) => ELEMENT_ROWS.find((r) => r.k === k)!.color;
