import { useEffect, useRef } from 'react';
import type { ReactNode, RefObject } from 'react';
import type { N } from '../lib/num';
import {
  OPERATIONS, SEPHIROTH, PATHS, WORLDS, TIER, ESSENTIALS, METAL_BG, opIndex,
  type ElementK, type Essential, type Work, type MetalKey,
} from '../data/alchemy';

const css = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------------------------------------------------------------------------------------------
// Alchemical glyphs, drawn rather than typed so they render the same everywhere.
// ---------------------------------------------------------------------------------------------
export function GlyphPaths({ k }: { k: ElementK | Essential }) {
  switch (k) {
    case 'fire': return <path d="M12 3 L21.5 20 H2.5 Z" />;
    case 'air': return <><path d="M12 3 L21.5 20 H2.5 Z" /><path d="M5.6 14.5 H18.4" /></>;
    case 'water': return <path d="M12 21 L2.5 4 H21.5 Z" />;
    case 'earth': return <><path d="M12 21 L2.5 4 H21.5 Z" /><path d="M5.6 9.5 H18.4" /></>;
    case 'salt': return <><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12 H20.5" /></>;
    case 'sulfur': return <><path d="M12 2.5 L18 13 H6 Z" /><path d="M12 13 V22 M8.5 17.8 H15.5" /></>;
    case 'mercury': return <><path d="M7.6 2.6 a4.4 3.3 0 0 0 8.8 0" /><circle cx="12" cy="10.6" r="4.2" /><path d="M12 14.8 V22 M8.6 18.6 H15.4" /></>;
  }
}

export function Glyph({ k, size = 22, label }: { k: ElementK | Essential; size?: number; label?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.7}
      strokeLinejoin="round" strokeLinecap="round" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}
      style={{ flexShrink: 0, overflow: 'visible' }}>
      <GlyphPaths k={k} />
    </svg>
  );
}

/** A glyph placed inside another SVG, centred on (x, y). */
function G({ k, x, y, size, color, width = 1.7 }: { k: ElementK | Essential; x: number; y: number; size: number; color: string; width?: number }) {
  const s = size / 24;
  return (
    <g transform={`translate(${x - size / 2} ${y - size / 2}) scale(${s})`} fill="none" stroke={color}
      strokeWidth={width / s} strokeLinejoin="round" strokeLinecap="round">
      <GlyphPaths k={k} />
    </g>
  );
}

export const EL_COLOR: Record<ElementK, string> = {
  fire: 'var(--el-fire)', air: 'var(--el-air)', water: 'var(--el-water)', earth: 'var(--el-earth)',
};

export function MetalChip({ k, size = 46, label }: { k: MetalKey; size?: number; label?: string }) {
  return <i className="metal" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}
    style={{ width: size, height: size, background: METAL_BG[k] }} />;
}

// ---------------------------------------------------------------------------------------------
// Embers: gold and red sparks rising behind the hero.
// ---------------------------------------------------------------------------------------------
export function Embers() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const reduce = reducedMotion();
    type P = { x: number; y: number; vx: number; vy: number; r: number; life: number; max: number; c: number };
    let w = 0, h = 0, raf = 0, frame = 0, last = performance.now();
    let ps: P[] = [];
    let cols: string[] = [];
    let glow = true;
    const readPal = () => { cols = [css('--gold-1'), css('--gold-2'), css('--rubedo'), css('--gold-2')]; glow = css('--glow') === '1'; };
    const spawn = (anywhere: boolean): P => ({
      x: Math.random() * w, y: anywhere ? Math.random() * h : h + 8,
      vx: (Math.random() - 0.5) * 0.25, vy: -(0.22 + Math.random() * 0.65),
      r: 0.6 + Math.random() * 1.8, life: anywhere ? Math.random() * 300 : 0, max: 260 + Math.random() * 420,
      c: Math.floor(Math.random() * 4),
    });
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = glow ? 'lighter' : 'source-over';
      for (const p of ps) {
        const t = Math.min(1, p.life / p.max);
        ctx.globalAlpha = Math.sin(Math.PI * t) * (glow ? 0.9 : 0.5);
        ctx.fillStyle = cols[p.c];
        if (glow) { ctx.shadowColor = cols[p.c]; ctx.shadowBlur = 8; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1; ctx.shadowBlur = 0; ctx.globalCompositeOperation = 'source-over';
    };
    const resize = () => {
      const r = cv.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width; h = r.height;
      cv.width = Math.max(1, Math.round(w * dpr)); cv.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ps = Array.from({ length: Math.round(Math.min(90, (w * h) / 9000)) }, () => spawn(true));
      if (reduce) draw();
    };
    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      if (document.hidden) return;
      const r = cv.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) { last = now; return; }
      const dt = Math.min(3, (now - last) / 16.7);
      last = now;
      if (++frame % 120 === 0) readPal();
      ps.forEach((p, i) => {
        p.life += dt; p.x += p.vx * dt + Math.sin((p.life + i * 37) * 0.02) * 0.15; p.y += p.vy * dt;
        if (p.life > p.max || p.y < -10) ps[i] = spawn(false);
      });
      draw();
    };
    readPal();
    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    resize();
    const mo = new MutationObserver(() => { readPal(); if (reduce) draw(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    if (!reduce) raf = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); mo.disconnect(); };
  }, []);
  return <canvas ref={ref} className="embers" aria-hidden="true" />;
}

// ---------------------------------------------------------------------------------------------
// The wheel of the twelve operations. Aries at the top, signs running clockwise; the Moon marks
// the operation of the day, the Sun the operation of the month.
// ---------------------------------------------------------------------------------------------
export function OperationWheel({ moon, sun }: { moon: number; sun: number }) {
  const S = 520, c = S / 2;
  const rad = (lon: number) => ((lon - 90) * Math.PI) / 180;
  const pt = (lon: number, r: number) => [c + r * Math.cos(rad(lon)), c + r * Math.sin(rad(lon))];
  const f = (v: number) => v.toFixed(2);
  const sector = (a1: number, a2: number, r1: number, r2: number) => {
    const [x1, y1] = pt(a1, r2), [x2, y2] = pt(a2, r2), [x3, y3] = pt(a2, r1), [x4, y4] = pt(a1, r1);
    return `M${f(x1)} ${f(y1)} A${r2} ${r2} 0 0 1 ${f(x2)} ${f(y2)} L${f(x3)} ${f(y3)} A${r1} ${r1} 0 0 0 ${f(x4)} ${f(y4)} Z`;
  };
  const active = opIndex(moon), sunI = opIndex(sun);
  const [mx, my] = pt(moon, 247), [sx, sy] = pt(sun, 247);
  const [lx1, ly1] = pt(moon, 166), [lx2, ly2] = pt(moon, 238);
  return (
    <svg viewBox={`0 0 ${S} ${S}`} className="wheel" role="img"
      aria-label={`Wheel of the twelve operations. The Moon is in ${OPERATIONS[active].sign}: ${OPERATIONS[active].name}. The Sun is in ${OPERATIONS[sunI].sign}: ${OPERATIONS[sunI].name}.`}>
      <defs>
        <radialGradient id="ow-orb" cx="50%" cy="46%" r="52%">
          <stop offset="0" style={{ stopColor: 'var(--gold-1)', stopOpacity: 0.95 }} />
          <stop offset="0.45" style={{ stopColor: 'var(--gold-2)', stopOpacity: 0.45 }} />
          <stop offset="1" style={{ stopColor: 'var(--gold-2)', stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id="ow-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--gold-1)' }} />
          <stop offset="0.5" style={{ stopColor: 'var(--gold-3)' }} />
          <stop offset="1" style={{ stopColor: 'var(--gold-2)' }} />
        </linearGradient>
        <filter id="ow-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <circle cx={c} cy={c} r={252} fill="none" stroke="url(#ow-ring)" strokeWidth="1.5" />
      <g className="spin">
        <circle cx={c} cy={c} r={240} fill="none" stroke="var(--gold-2)" strokeOpacity="0.45" strokeWidth="1" strokeDasharray="2 7" />
      </g>

      {OPERATIONS.map((o, i) => {
        const on = i === active;
        const mid = i * 30 + 15;
        const [gx, gy] = pt(mid, 216);
        const [tx, ty] = pt(mid, 182);
        const flip = mid > 90 && mid < 270;
        return (
          <g key={o.sign}>
            <path d={sector(i * 30, i * 30 + 30, 166, 232)} fill={on ? 'url(#ow-orb)' : EL_COLOR[o.el]}
              fillOpacity={on ? 1 : 0.08} stroke="var(--line)" strokeWidth="1" />
            {on && <path d={sector(i * 30, i * 30 + 30, 166, 232)} fill="none" stroke="var(--gold-2)" strokeWidth="2" filter="url(#ow-glow)" />}
            {i === sunI && !on && <path d={sector(i * 30, i * 30 + 30, 228, 232)} fill="var(--gold-2)" fillOpacity="0.8" />}
            <text x={gx} y={gy} textAnchor="middle" dominantBaseline="central" fontSize={on ? 21 : 18}
              fill={on ? 'var(--fg)' : EL_COLOR[o.el]} fontFamily="'Segoe UI Symbol', 'Noto Sans Symbols', var(--font-body)">{o.glyph}{'︎'}</text>
            <text x={tx} y={ty} textAnchor="middle" dominantBaseline="central" fontSize="9.5" letterSpacing="1.2"
              fontFamily="var(--font-mono)" fill={on ? 'var(--fg)' : 'var(--muted)'} fontWeight={on ? 600 : 400}
              transform={`rotate(${flip ? mid + 180 : mid} ${tx} ${ty})`}>{o.name.toUpperCase()}</text>
          </g>
        );
      })}

      {Array.from({ length: 72 }, (_, i) => {
        const a = i * 5, long = a % 30 === 0;
        const [x1, y1] = pt(a, 232), [x2, y2] = pt(a, long ? 244 : 237);
        return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke={long ? 'var(--gold-2)' : 'var(--line)'} strokeWidth={long ? 1.4 : 1} />;
      })}

      <circle cx={c} cy={c} r={150} fill="none" stroke="var(--line)" strokeDasharray="1 5" />
      <circle cx={c} cy={c} r={112} fill="url(#ow-orb)" />
      <G k="fire" x={c} y={c - 128} size={22} color={EL_COLOR.fire} />
      <G k="air" x={c - 128} y={c} size={22} color={EL_COLOR.air} />
      <G k="water" x={c} y={c + 128} size={22} color={EL_COLOR.water} />
      <G k="earth" x={c + 128} y={c} size={22} color={EL_COLOR.earth} />
      <G k="sulfur" x={c} y={c - 48} size={26} color="var(--fg)" />
      <G k="mercury" x={c - 42} y={c + 26} size={26} color="var(--fg)" />
      <G k="salt" x={c + 42} y={c + 26} size={26} color="var(--fg)" />
      <path d={`M${c} ${c - 30} L${c - 26} ${c + 14} L${c + 26} ${c + 14} Z`} fill="none" stroke="var(--fg)" strokeOpacity="0.35" />

      <line x1={lx1} y1={ly1} x2={lx2} y2={ly2} stroke="var(--fg)" strokeOpacity="0.6" strokeWidth="1" />
      <circle cx={sx} cy={sy} r="6" fill="var(--gold-2)" filter="url(#ow-glow)" />
      <circle cx={mx} cy={my} r="8.5" fill="var(--p2)" stroke="var(--bg)" strokeWidth="1.5" filter="url(#ow-glow)" />
    </svg>
  );
}

// ---------------------------------------------------------------------------------------------
// From the One to the three: the descent of the prima materia.
// ---------------------------------------------------------------------------------------------
export function EssentialsTree() {
  const els: { k: ElementK; x: number }[] = [{ k: 'earth', x: 46 }, { k: 'water', x: 136 }, { k: 'air', x: 224 }, { k: 'fire', x: 314 }];
  const ess: { k: Essential; x: number; from: [number, number] }[] = [
    { k: 'salt', x: 91, from: [46, 136] }, { k: 'mercury', x: 180, from: [136, 224] }, { k: 'sulfur', x: 269, from: [224, 314] },
  ];
  const line = 'var(--line)';
  return (
    <svg viewBox="0 0 360 340" role="img" aria-label="The prima materia divides into fixed and volatile, then into the four elements, which pair into Salt, Mercury and Sulfur">
      <defs>
        <radialGradient id="et-orb"><stop offset="0" style={{ stopColor: 'var(--gold-1)', stopOpacity: 0.9 }} /><stop offset="1" style={{ stopColor: 'var(--gold-2)', stopOpacity: 0 }} /></radialGradient>
      </defs>
      <path d="M180 38 L95 98 M180 38 L268 98 M95 98 L46 168 M95 98 L136 168 M268 98 L224 168 M268 98 L314 168" stroke={line} fill="none" />
      {ess.map((e) => <path key={e.k} d={`M${e.from[0]} 168 L${e.x} 272 L${e.from[1]} 168`} stroke="var(--gold-2)" strokeOpacity="0.55" fill="none" />)}
      <circle cx="180" cy="38" r="34" fill="url(#et-orb)" />
      <circle cx="180" cy="38" r="14" fill="var(--bg)" stroke="var(--fg)" />
      <path d="M180 24 a7 7 0 0 1 0 14 a7 7 0 0 0 0 14 a14 14 0 0 1 0 -28 Z" fill="var(--fg)" />
      <text x="180" y="82" textAnchor="middle" fontSize="10" letterSpacing="1.4" fontFamily="var(--font-mono)" fill="var(--muted)">PRIMA MATERIA</text>
      {[{ x: 95, a: 'FIXED', b: 'celestial salt' }, { x: 268, a: 'VOLATILE', b: 'celestial niter' }].map((n) => (
        <g key={n.a}>
          <circle cx={n.x} cy="98" r="5" fill="var(--gold-2)" />
          <text x={n.x} y="120" textAnchor="middle" fontSize="10" letterSpacing="1.4" fontFamily="var(--font-mono)" fill="var(--fg)">{n.a}</text>
          <text x={n.x} y="134" textAnchor="middle" fontSize="11" fontFamily="var(--font-latin)" fontStyle="italic" fill="var(--muted)">{n.b}</text>
        </g>
      ))}
      {els.map((e) => (
        <g key={e.k}>
          <circle cx={e.x} cy="168" r="19" fill="var(--bg-2)" stroke={EL_COLOR[e.k]} />
          <G k={e.k} x={e.x} y={168} size={20} color={EL_COLOR[e.k]} />
          <text x={e.x} y="204" textAnchor="middle" fontSize="10" letterSpacing="1.2" fontFamily="var(--font-mono)" fill="var(--muted)">{e.k.toUpperCase()}</text>
        </g>
      ))}
      {ess.map((e) => (
        <g key={e.k}>
          <circle cx={e.x} cy="272" r="26" fill="url(#et-orb)" />
          <circle cx={e.x} cy="272" r="20" fill="var(--bg)" stroke="var(--gold-2)" />
          <G k={e.k} x={e.x} y={272} size={22} color="var(--fg)" />
          <text x={e.x} y="314" textAnchor="middle" fontSize="13" fontFamily="var(--font-display)" fill="var(--fg)">{ESSENTIALS[e.k].name}</text>
          <text x={e.x} y="330" textAnchor="middle" fontSize="11" fontFamily="var(--font-latin)" fontStyle="italic" fill="var(--muted)">{ESSENTIALS[e.k].aspect}</text>
        </g>
      ))}
    </svg>
  );
}

/** Aristotle's square: each element is a pair of qualities. */
export function ElementsSquare() {
  const v: { k: ElementK; x: number; y: number }[] = [{ k: 'fire', x: 150, y: 30 }, { k: 'earth', x: 270, y: 150 }, { k: 'water', x: 150, y: 270 }, { k: 'air', x: 30, y: 150 }];
  const q = [{ t: 'HOT', x: 66, y: 66 }, { t: 'DRY', x: 234, y: 66 }, { t: 'COLD', x: 234, y: 234 }, { t: 'WET', x: 66, y: 234 }];
  return (
    <svg viewBox="0 0 300 300" role="img" aria-label="Aristotle's square of elements: Fire is hot and dry, Earth dry and cold, Water cold and wet, Air wet and hot">
      <path d="M150 30 L270 150 L150 270 L30 150 Z" fill="none" stroke="var(--gold-2)" strokeOpacity="0.7" />
      <rect x="66" y="66" width="168" height="168" fill="none" stroke="var(--line)" />
      <path d="M66 66 L234 234 M234 66 L66 234 M150 30 V270 M30 150 H270" stroke="var(--line)" />
      {q.map((p) => (
        <g key={p.t}>
          <circle cx={p.x} cy={p.y} r="3" fill="var(--muted)" />
          <text x={p.x + (p.x < 150 ? -10 : 10)} y={p.y + (p.y < 150 ? -10 : 18)} textAnchor={p.x < 150 ? 'end' : 'start'}
            fontSize="10" letterSpacing="1.4" fontFamily="var(--font-mono)" fill="var(--muted)">{p.t}</text>
        </g>
      ))}
      {v.map((e) => (
        <g key={e.k}>
          <circle cx={e.x} cy={e.y} r="22" fill="var(--bg)" stroke={EL_COLOR[e.k]} strokeWidth="1.5" />
          <G k={e.k} x={e.x} y={e.y} size={22} color={EL_COLOR[e.k]} />
        </g>
      ))}
      <circle cx="150" cy="150" r="9" fill="var(--gold-2)" opacity="0.85" />
    </svg>
  );
}

/** The rotation of the elements drawn as a spiral closing on the quintessence. */
export function ElementSpiral() {
  const c = 150, pts: string[] = [];
  const turns = 3, R0 = 118, R1 = 26;
  for (let i = 0; i <= 360; i++) {
    const th = (i / 360) * turns * Math.PI * 2;
    const r = R0 - (R0 - R1) * (i / 360);
    const phi = Math.PI / 2 + th;
    pts.push(`${(c + r * Math.cos(phi)).toFixed(1)},${(c + r * Math.sin(phi)).toFixed(1)}`);
  }
  const at = (deg: number) => {
    const i = deg / (turns * 360) * 360;
    const r = R0 - (R0 - R1) * (i / 360);
    const phi = Math.PI / 2 + (deg * Math.PI) / 180;
    return [c + r * Math.cos(phi), c + r * Math.sin(phi), phi] as const;
  };
  const marks: { k: ElementK; deg: number }[] = [{ k: 'earth', deg: 0 }, { k: 'water', deg: 90 }, { k: 'air', deg: 180 }, { k: 'fire', deg: 270 }];
  return (
    <svg viewBox="-20 0 340 300" role="img" aria-label="Spiral: Earth to Water to Air to Fire, turning inward to the quintessence">
      <defs>
        <linearGradient id="sp-g" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" style={{ stopColor: 'var(--el-earth)' }} />
          <stop offset="0.35" style={{ stopColor: 'var(--el-water)' }} />
          <stop offset="0.65" style={{ stopColor: 'var(--el-air)' }} />
          <stop offset="1" style={{ stopColor: 'var(--gold-2)' }} />
        </linearGradient>
        <radialGradient id="sp-q"><stop offset="0" style={{ stopColor: 'var(--gold-1)' }} /><stop offset="1" style={{ stopColor: 'var(--gold-2)', stopOpacity: 0 }} /></radialGradient>
      </defs>
      <polyline points={pts.join(' ')} fill="none" stroke="url(#sp-g)" strokeWidth="2" strokeLinecap="round" />
      <circle cx={c} cy={c} r="24" fill="url(#sp-q)" />
      <path d={`M${c} ${c - 11} L${c + 3} ${c - 3} L${c + 11} ${c} L${c + 3} ${c + 3} L${c} ${c + 11} L${c - 3} ${c + 3} L${c - 11} ${c} L${c - 3} ${c - 3} Z`} fill="var(--fg)" />
      {marks.map((m) => {
        const [x, y] = at(m.deg);
        // Label sits outside the circle: below Earth, above Air, beside Water and Fire.
        const side = m.k === 'water' ? { x: x - 21, y: y + 4, a: 'end' } : m.k === 'fire' ? { x: x + 21, y: y + 4, a: 'start' }
          : m.k === 'air' ? { x, y: y - 22, a: 'middle' } : { x, y: y + 30, a: 'middle' };
        return (
          <g key={m.k}>
            <circle cx={x} cy={y} r="15" fill="var(--bg)" stroke={EL_COLOR[m.k]} />
            <G k={m.k} x={x} y={y} size={16} color={EL_COLOR[m.k]} />
            <text x={side.x} y={side.y} textAnchor={side.a as 'start' | 'middle' | 'end'} fontSize="9.5" letterSpacing="1.2" fontFamily="var(--font-mono)" fill="var(--muted)">{m.k.toUpperCase()}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ---------------------------------------------------------------------------------------------
// The Tree of Life, with your planets alight.
// ---------------------------------------------------------------------------------------------
export function TreeOfLife({ mine }: { mine: N[] }) {
  const pos = Object.fromEntries(SEPHIROTH.map((s) => [s.i, s]));
  const lit = (i: number) => { const n = pos[i].n; return n !== null && mine.includes(n); };
  const col = (s: (typeof SEPHIROTH)[number]) =>
    s.n ? `var(--p${s.n})` : s.i === 10 ? 'var(--el-earth)' : s.i === 1 ? 'var(--gold-1)' : 'var(--muted)';
  return (
    <svg viewBox="0 0 380 540" role="img" aria-label={`Tree of Life with ten spheres and twenty-two paths, in four worlds. Your planets are lit.`}>
      <defs>
        <radialGradient id="tl-glow"><stop offset="0" style={{ stopColor: 'var(--gold-1)', stopOpacity: 0.85 }} /><stop offset="1" style={{ stopColor: 'var(--gold-2)', stopOpacity: 0 }} /></radialGradient>
      </defs>
      {WORLDS.map((w, i) => (
        <g key={w.name}>
          <rect x="0" y={w.y0} width="380" height={w.y1 - w.y0} fill={EL_COLOR[w.el]} fillOpacity={i % 2 ? 0.035 : 0.07} />
          <G k={w.el} x={16} y={w.y0 + 20} size={13} color={EL_COLOR[w.el]} />
          <text x="30" y={w.y0 + 24} fontSize="9.5" letterSpacing="1.4" fontFamily="var(--font-mono)" fill="var(--fg)">{w.name.toUpperCase()}</text>
          <text x="10" y={w.y0 + 40} fontSize="11.5" fontFamily="var(--font-latin)" fontStyle="italic" fill="var(--muted)">{w.en}</text>
        </g>
      ))}
      {PATHS.map(([a, b]) => {
        const on = lit(a) || lit(b);
        return <line key={`${a}-${b}`} x1={pos[a].x} y1={pos[a].y} x2={pos[b].x} y2={pos[b].y}
          stroke={on ? 'var(--gold-2)' : 'var(--line)'} strokeWidth={on ? 2.2 : 2} strokeOpacity={on ? 0.9 : 1} />;
      })}
      {SEPHIROTH.map((s) => {
        const on = lit(s.i);
        return (
          <g key={s.i}>
            {on && <circle cx={s.x} cy={s.y} r="44" fill="url(#tl-glow)" />}
            <circle cx={s.x} cy={s.y} r="23" fill="var(--bg)" stroke={col(s)} strokeWidth={on ? 2.5 : 1.5} />
            <text x={s.x} y={s.y + 1} textAnchor="middle" dominantBaseline="central" fontSize="15" fontFamily="var(--font-display)" fill={col(s)}>{s.i}</text>
            <text x={s.x} y={s.y + 36} textAnchor="middle" fontSize="9" letterSpacing="1" fontFamily="var(--font-mono)" fill={on ? 'var(--fg)' : 'var(--muted)'}>{s.name.toUpperCase()}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ---------------------------------------------------------------------------------------------
// Steps that kindle as they come into view, and the card that holds them.
// ---------------------------------------------------------------------------------------------
export function useKindle<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll('.step'));
    if (reducedMotion() || !('IntersectionObserver' in window)) { items.forEach((i) => i.classList.add('lit')); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('lit'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -12% 0px' });
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);
  return ref;
}

export function TierBadge({ tier }: { tier: keyof typeof TIER }) {
  return <span className={`tier ${tier}`} title={TIER[tier].long}><i aria-hidden="true">{TIER[tier].icon}</i>{TIER[tier].label}</span>;
}

export function WorkCard({ w, index, after }: { w: Work; index?: string; after?: ReactNode }) {
  const ref = useKindle<HTMLOListElement>();
  const touches = Array.from(new Set(w.steps.flatMap((s) => s.touches ?? [])));
  const head = (
    <div className="work-head">
      <span className="eyebrow">{index}{w.latin ? <> · <span className="latin-sm">{w.latin}</span></> : null}</span>
      <h3>{w.title}</h3>
      <p className="purpose">{w.purpose}</p>
      <div className="work-meta">
        {w.tier && <TierBadge tier={w.tier} />}
        {w.time && <span className="tag">{w.time}</span>}
        <span className="tag">{w.steps.length} {w.tier === 'read' ? 'stages' : 'steps'}</span>
        {touches.map((t) => <span className="ess" key={t}><Glyph k={t} size={15} />{ESSENTIALS[t].name}</span>)}
      </div>
    </div>
  );
  const body = (
    <>
      {w.tier === 'read' && <p className="readonly"><b>Read, don't do.</b> {TIER.read.long}</p>}
      <ol className="steps" ref={ref}>
        {w.steps.map((s, i) => (
          <li className="step" key={i}>
            <span className="node" aria-hidden="true">{i + 1}</span>
            <h4>{s.title}</h4>
            {s.how && <p className="how">{s.how}</p>}
            <p className="why"><b>Purpose</b><span>{s.why}</span></p>
            {s.touches && s.touches.length > 0 && (
              <span className="touch">{s.touches.map((t) => <span key={t} title={`${ESSENTIALS[t].name}: ${ESSENTIALS[t].aspect}`}><Glyph k={t} size={14} />{ESSENTIALS[t].aspect}</span>)}</span>
            )}
          </li>
        ))}
      </ol>
      {w.cautions && (
        <ul className="cautions">{w.cautions.map((c) => <li key={c}>{c}</li>)}</ul>
      )}
      {w.honest && <p className="honest"><b>Honestly:</b> {w.honest}</p>}
      {after}
    </>
  );
  if (w.tier === 'read') {
    return (
      <details className="work read" id={`work-${w.id}`}>
        <summary>{head}<span className="open-hint">Show the {w.steps.length} stages</span></summary>
        {body}
      </details>
    );
  }
  return <article className="work" id={`work-${w.id}`}>{head}{body}</article>;
}

/** A thin bar at the top of the window that fills through the colours of the Work as you read. */
export function ScrollProgress({ target }: { target: RefObject<HTMLElement | null> }) {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = target.current, b = bar.current;
        if (!el || !b) return;
        const r = el.getBoundingClientRect();
        const total = r.height - innerHeight;
        const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1;
        b.style.transform = `scaleX(${p})`;
      });
    };
    on();
    addEventListener('scroll', on, { passive: true });
    addEventListener('resize', on);
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, [target]);
  return <div className="opus-progress" ref={bar} aria-hidden="true" />;
}
