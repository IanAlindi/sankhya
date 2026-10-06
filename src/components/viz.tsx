import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { LO_SHU, VEDIC, vedicCells, NINE, type N } from '../lib/num';
import type { VedicDay } from '../lib/astro';
import { NUM } from '../data/numbers';

export const pc = (n: N) => ({ '--pc': `var(--p${n})` }) as CSSProperties;
const css = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

// ---------------------------------------------------------------------------------------------
// Tesseract: a 4-cube turning in the planes of your four numbers, ringed by the sidereal sky.
// Edges parallel to each axis glow in that dimension's planet colour.
// ---------------------------------------------------------------------------------------------
const VERTS = Array.from({ length: 16 }, (_, i) => [i & 1 ? 1 : -1, i & 2 ? 1 : -1, i & 4 ? 1 : -1, i & 8 ? 1 : -1]);
const EDGES: [number, number, number][] = [];
for (let i = 0; i < 16; i++) for (let b = 0; b < 4; b++) { const j = i ^ (1 << b); if (j > i) EDGES.push([i, j, b]); }

export function Tesseract({ nums, phase, sun, moon }: { nums: [N, N, N, N]; phase: number; sun: number; moon: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0, frame = 0;
    let pal = { cols: [] as string[], fg: '', faint: '', line: '', accent: '', sun: '', moon: '', glow: true };
    const readPal = () => {
      pal = {
        cols: nums.map((n) => css(`--p${n}`)), fg: css('--fg'), faint: css('--faint'), line: css('--line'),
        accent: css('--accent'), sun: css('--p1'), moon: css('--p2'), glow: css('--glow') === '1',
      };
    };
    readPal();
    const resize = () => {
      const r = cv.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.max(1, Math.round(r.width * dpr));
      cv.height = Math.max(1, Math.round(r.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw(0);
    };
    const speeds = nums.map((n) => 0.06 + n * 0.022);

    function draw(t: number) {
      const w = cv!.clientWidth, h = cv!.clientHeight, cx = w / 2, cy = h / 2, R = Math.min(w, h) / 2 - 4;
      ctx!.clearRect(0, 0, w, h);
      ctx!.globalCompositeOperation = 'source-over';
      ctx!.shadowBlur = 0;

      // the sky ring: 12 signs, 27 lunar mansions, Sun and Moon, the arc between them is the tithi
      const ang = (lon: number) => (lon - 90) * Math.PI / 180;
      ctx!.strokeStyle = pal.line; ctx!.lineWidth = 1;
      for (const r of [R * 0.985, R * 0.86]) { ctx!.beginPath(); ctx!.arc(cx, cy, r, 0, Math.PI * 2); ctx!.stroke(); }
      for (let i = 0; i < 27; i++) {
        const a = ang(i * 360 / 27);
        ctx!.beginPath(); ctx!.moveTo(cx + Math.cos(a) * R * 0.86, cy + Math.sin(a) * R * 0.86);
        ctx!.lineTo(cx + Math.cos(a) * R * 0.9, cy + Math.sin(a) * R * 0.9); ctx!.stroke();
      }
      ctx!.strokeStyle = pal.faint;
      for (let i = 0; i < 12; i++) {
        const a = ang(i * 30);
        ctx!.beginPath(); ctx!.moveTo(cx + Math.cos(a) * R * 0.86, cy + Math.sin(a) * R * 0.86);
        ctx!.lineTo(cx + Math.cos(a) * R * 0.985, cy + Math.sin(a) * R * 0.985); ctx!.stroke();
      }
      const elong = ((moon - sun) % 360 + 360) % 360;
      ctx!.strokeStyle = pal.accent; ctx!.globalAlpha = 0.5; ctx!.lineWidth = 3;
      ctx!.beginPath(); ctx!.arc(cx, cy, R * 0.92, ang(sun), ang(sun + elong)); ctx!.stroke();
      ctx!.globalAlpha = 1;
      for (const [lon, col, rad] of [[sun, pal.sun, 6], [moon, pal.moon, 5]] as const) {
        const a = ang(lon);
        ctx!.fillStyle = col; ctx!.beginPath(); ctx!.arc(cx + Math.cos(a) * R * 0.92, cy + Math.sin(a) * R * 0.92, rad, 0, Math.PI * 2); ctx!.fill();
      }

      // the 4-cube
      const a1 = phase * 0.37 + t * speeds[0], a2 = phase * 0.61 + t * speeds[1];
      const a3 = phase * 0.23 + t * speeds[2], a4 = phase * 0.11 + t * speeds[3] * 0.5;
      const pts = VERTS.map((v0) => {
        const p = v0.slice();
        const rot = (i: number, j: number, a: number) => {
          const c = Math.cos(a), s = Math.sin(a), x = p[i], y = p[j];
          p[i] = c * x - s * y; p[j] = s * x + c * y;
        };
        rot(0, 3, a1); rot(1, 3, a2); rot(2, 3, a3); rot(0, 1, a4); rot(1, 2, 0.62); rot(0, 2, 0.35 + t * 0.03);
        const k = 3 / (3.4 - p[3]);
        const x = p[0] * k, y = p[1] * k, z = p[2] * k;
        const k2 = 6 / (7 - z);
        const S = R * 0.31;
        return { x: cx + x * k2 * S, y: cy + y * k2 * S, w: p[3] };
      });
      const order = EDGES.map((e) => ({ e, d: (pts[e[0]].w + pts[e[1]].w) / 2 })).sort((a, b) => a.d - b.d);
      ctx!.lineCap = 'round';
      if (pal.glow) ctx!.globalCompositeOperation = 'lighter';
      for (const { e: [i, j, b], d } of order) {
        const near = (d + 2) / 4;
        ctx!.strokeStyle = pal.cols[b];
        ctx!.globalAlpha = pal.glow ? 0.25 + near * 0.6 : 0.4 + near * 0.55;
        ctx!.lineWidth = 0.8 + near * 2.2;
        if (pal.glow) { ctx!.shadowColor = pal.cols[b]; ctx!.shadowBlur = 6 + near * 8; }
        ctx!.beginPath(); ctx!.moveTo(pts[i].x, pts[i].y); ctx!.lineTo(pts[j].x, pts[j].y); ctx!.stroke();
      }
      ctx!.shadowBlur = 0; ctx!.globalCompositeOperation = 'source-over';
      for (const p of pts) {
        const near = (p.w + 2) / 4;
        ctx!.globalAlpha = 0.5 + near * 0.5; ctx!.fillStyle = pal.fg;
        ctx!.beginPath(); ctx!.arc(p.x, p.y, 1.2 + near * 2.2, 0, Math.PI * 2); ctx!.fill();
      }
      ctx!.globalAlpha = 1;
    }

    const start = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden) return;
      const r = cv.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      if (++frame % 90 === 0) readPal();
      draw((now - start) / 1000);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    resize();
    const mq = matchMedia('(prefers-color-scheme: dark)');
    const onTheme = () => { readPal(); if (reduce) draw(0); };
    mq.addEventListener('change', onTheme);
    const mo = new MutationObserver(onTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    if (reduce) draw(0); else raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); mq.removeEventListener('change', onTheme); mo.disconnect(); };
  }, [nums.join(','), phase, sun, moon]);

  return (
    <canvas ref={ref} role="img"
      aria-label={`A four-dimensional cube turning in the planes of your numbers ${nums.join(', ')}, inside a ring showing today's Sun and Moon.`} />
  );
}

// ---------------------------------------------------------------------------------------------
// The Vedic Square: cells where the reduced product equals n, joined point to point.
// ---------------------------------------------------------------------------------------------
export function VedicSquare({ layers }: { layers: N[] }) {
  const C = 40, c = (k: number) => k * C + C / 2;
  return (
    <svg viewBox="-28 -28 392 392" role="img" aria-label={`Vedic Square with the patterns of ${layers.join(', ')} drawn`}>
      {NINE.map((k, i) => (
        <g key={k}>
          <text x={c(i)} y={-12} textAnchor="middle" fontSize="11" fill="var(--muted)" fontFamily="var(--font-mono)">{k}</text>
          <text x={-14} y={c(i) + 4} textAnchor="middle" fontSize="11" fill="var(--muted)" fontFamily="var(--font-mono)">{k}</text>
        </g>
      ))}
      <rect x="0" y="0" width={9 * C} height={9 * C} fill="none" stroke="var(--line)" />
      {VEDIC.map((row, i) => row.map((v, j) => (
        <text key={`${i}-${j}`} x={c(j)} y={c(i) + 4} textAnchor="middle" fontSize="10" fill="var(--faint)" fontFamily="var(--font-mono)" opacity="0.7">{v}</text>
      )))}
      {layers.map((n) => {
        const pts = vedicCells(n);
        const inner = n === 9 ? pts.filter(([i, j]) => i < 8 && j < 8) : pts;
        const lines: [number, number, number, number][] = [];
        for (let a = 0; a < inner.length; a++) for (let b = a + 1; b < inner.length; b++)
          lines.push([c(inner[a][1]), c(inner[a][0]), c(inner[b][1]), c(inner[b][0])]);
        if (n === 9) lines.push([c(0), c(8), c(8), c(8)], [c(8), c(0), c(8), c(8)]);
        return (
          <g key={n} stroke={`var(--p${n})`} fill={`var(--p${n})`}>
            {lines.map((l, k) => <line key={k} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} strokeWidth="1.2" strokeOpacity="0.55" />)}
            {pts.map(([i, j]) => <circle key={`${i}-${j}`} cx={c(j)} cy={c(i)} r="4" />)}
          </g>
        );
      })}
    </svg>
  );
}

// ---------------------------------------------------------------------------------------------
export function LoShuGrid({ counts }: { counts: Record<N, number> }) {
  return (
    <div className="loshu" role="table" aria-label="Lo Shu grid of your birth date">
      {LO_SHU.flat().map((n) => {
        const k = counts[n as N];
        return (
          <div key={n} className={k ? '' : 'empty'} style={pc(n as N)} role="cell">
            <b>{k ? String(n).repeat(k) : n}</b>
            <small>{NUM[n as N].planet}</small>
          </div>
        );
      })}
    </div>
  );
}

export function YantraGrid({ n, cells }: { n: N; cells: number[] }) {
  return (
    <div className="yantra" style={pc(n)} role="table" aria-label={`Yantra of ${NUM[n].planet}`}>
      {cells.map((v, i) => <div key={i} role="cell">{v}</div>)}
    </div>
  );
}

// ---------------------------------------------------------------------------------------------
// The hora dial: a 24-hour face, noon at the top, each planetary hour drawn at its true length.
// ---------------------------------------------------------------------------------------------
const hm = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export function HoraRing({ day, now, mine, also }: { day: VedicDay; now: Date | null; mine: N[]; also: N[] }) {
  const S = 380, cx = S / 2, cy = S / 2, r = 124;
  const mid = new Date(day.rise); mid.setHours(0, 0, 0, 0);
  const th = (t: Date) => (((t.getTime() - mid.getTime()) / 60000 - 720) / 1440) * 2 * Math.PI;
  const pt = (a: number, rr: number) => [cx + rr * Math.sin(a), cy - rr * Math.cos(a)];
  const arc = (a1: number, a2: number, rr: number) => {
    const [x1, y1] = pt(a1, rr), [x2, y2] = pt(a2, rr);
    return `M${x1.toFixed(2)} ${y1.toFixed(2)} A${rr} ${rr} 0 ${a2 - a1 > Math.PI ? 1 : 0} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  };
  const current = now ? day.horas.find((h) => now >= h.start && now < h.end) : undefined;
  const gap = 0.012;
  return (
    <svg viewBox={`0 0 ${S} ${S}`} role="img" aria-label="Planetary hours of this day on a 24-hour dial">
      {[['12', 0], ['18', Math.PI / 2], ['00', Math.PI], ['06', -Math.PI / 2]].map(([l, a]) => {
        const [x, y] = pt(a as number, r + 46);
        return <text key={l} x={x} y={y + 4} textAnchor="middle" fontSize="10" fill="var(--muted)" fontFamily="var(--font-mono)">{l}</text>;
      })}
      <circle cx={cx} cy={cy} r={r - 18} fill="none" stroke="var(--line)" />
      {day.horas.map((h) => {
        const a1 = th(h.start) + gap, a2 = th(h.end) - gap;
        const isMine = mine.includes(h.ruler), isAlso = also.includes(h.ruler), isNow = current === h;
        const [lx, ly] = pt((a1 + a2) / 2, r);
        return (
          <g key={h.index}>
            <path d={arc(a1, a2, r)} fill="none" stroke={`var(--p${h.ruler})`} strokeWidth={isNow ? 26 : 20}
              strokeOpacity={isMine ? 0.95 : isAlso ? 0.5 : h.night ? 0.16 : 0.24} />
            {isAlso && !isMine && <path d={arc(a1, a2, r + 15)} fill="none" stroke={`var(--p${h.ruler})`} strokeWidth="1.5" strokeDasharray="3 3" />}
            <text x={lx} y={ly + 4} textAnchor="middle" fontSize="11" fontFamily="var(--font-display)"
              fill={isMine ? 'var(--bg)' : 'var(--fg)'} opacity={isMine || isNow ? 1 : 0.75}>{h.ruler}</text>
          </g>
        );
      })}
      <path d={arc(th(day.rahuKala.start), th(day.rahuKala.end), r + 26)} fill="none" stroke="var(--sindoor)" strokeWidth="4" strokeLinecap="round" />
      {(() => {
        const [x, y] = pt((th(day.rahuKala.start) + th(day.rahuKala.end)) / 2, r + 38);
        return <text x={x} y={y + 3} textAnchor="middle" fontSize="9" fill="var(--sindoor)" fontFamily="var(--font-mono)">RAHU</text>;
      })()}
      {[day.rise, day.set].map((t, i) => {
        const [x1, y1] = pt(th(t), r - 18), [x2, y2] = pt(th(t), r + 14);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--accent)" strokeWidth="1.5" />;
      })}
      {now && current && (() => {
        const [x1, y1] = pt(th(now), r - 26), [x2, y2] = pt(th(now), r + 20);
        return <g><line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--fg)" strokeWidth="2" strokeLinecap="round" /><circle cx={x1} cy={y1} r="3" fill="var(--fg)" /></g>;
      })()}
      <text x={cx} y={cy - 26} textAnchor="middle" fontSize="9" letterSpacing="1.5" fill="var(--muted)" fontFamily="var(--font-mono)">
        {current ? 'HOUR OF' : 'DAY RULED BY'}
      </text>
      <text x={cx} y={cy + 8} textAnchor="middle" fontSize="28" fill={`var(--p${current ? current.ruler : day.horas[0].ruler})`} fontFamily="var(--font-display)">
        {NUM[current ? current.ruler : day.horas[0].ruler].planet}
      </text>
      <text x={cx} y={cy + 30} textAnchor="middle" fontSize="10" fill="var(--muted)" fontFamily="var(--font-mono)">
        {current ? `until ${hm(current.end)}` : `sunrise ${hm(day.rise)}`}
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------------------------
// Figures for the method page
// ---------------------------------------------------------------------------------------------
const ring = (k: number, total: number, r: number, c = 150, start = -Math.PI / 2) => {
  const a = start + (k / total) * Math.PI * 2;
  return [c + r * Math.cos(a), c + r * Math.sin(a)];
};

/** Hours walk the Chaldean order; each new day starts 24 hours later = 3 steps on, which spells the week. */
export function Heptagram() {
  const order: N[] = [8, 3, 9, 1, 6, 5, 2];
  const path = Array.from({ length: 8 }, (_, i) => ring((3 + i * 3) % 7, 7, 105)).map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  return (
    <svg viewBox="0 0 300 300" role="img" aria-label="Heptagram: the planets in Chaldean order, connected every third, give the order of the weekdays">
      <circle cx="150" cy="150" r="105" fill="none" stroke="var(--line)" />
      <path d={path} fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinejoin="round" />
      {order.map((n, k) => {
        const [x, y] = ring(k, 7, 105), [lx, ly] = ring(k, 7, 132);
        return (
          <g key={n}>
            <circle cx={x} cy={y} r="5" fill={`var(--p${n})`} />
            <text x={lx} y={ly + 4} textAnchor="middle" fontSize="11" fill="var(--fg)" fontFamily="var(--font-body)">{NUM[n].planet}</text>
          </g>
        );
      })}
    </svg>
  );
}

/** 1 → 2 → 4 → 8 → 7 → 5: doubling mod 9 never touches 3, 6, 9, which close their own triangle. */
export function NineCircle() {
  const pos = (n: number) => ring(n % 9, 9, 108);
  const hex = [1, 2, 4, 8, 7, 5, 1].map((n, i) => { const [x, y] = pos(n); return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`; }).join(' ');
  const tri = [3, 6, 9, 3].map((n, i) => { const [x, y] = pos(n); return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`; }).join(' ');
  return (
    <svg viewBox="0 0 300 300" role="img" aria-label="Nine points on a circle: the doubling cycle 1 2 4 8 7 5 and the triangle 3 6 9">
      <circle cx="150" cy="150" r="108" fill="none" stroke="var(--line)" />
      <path d={hex} fill="none" stroke="var(--accent)" strokeWidth="1.5" />
      <path d={tri} fill="none" stroke="var(--p9)" strokeWidth="1.5" strokeDasharray="4 4" />
      {NINE.map((n) => {
        const [x, y] = pos(n), [lx, ly] = ring(n % 9, 9, 130);
        return (
          <g key={n}>
            <circle cx={x} cy={y} r="4.5" fill={`var(--p${n})`} />
            <text x={lx} y={ly + 6} textAnchor="middle" fontSize="17" fill={`var(--p${n})`} fontFamily="var(--font-display)">{n}</text>
          </g>
        );
      })}
    </svg>
  );
}

/** Hemachandra–Fibonacci numbers reduced: a 24-step cycle whose opposite points always sum to 9. */
export function FibRing() {
  const seq: number[] = [1, 1];
  while (seq.length < 24) seq.push((seq[seq.length - 1] + seq[seq.length - 2]) % 9);
  const v = seq.map((x) => (x === 0 ? 9 : x));
  return (
    <svg viewBox="0 0 300 300" role="img" aria-label="The 24 digital roots of the Fibonacci sequence on a ring; opposite pairs sum to nine">
      <circle cx="150" cy="150" r="105" fill="none" stroke="var(--line)" />
      {v.slice(0, 12).map((_, k) => {
        const [x1, y1] = ring(k, 24, 105), [x2, y2] = ring(k + 12, 24, 105);
        return <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--line)" />;
      })}
      {v.map((d, k) => {
        const [x, y] = ring(k, 24, 105), [lx, ly] = ring(k, 24, 128);
        return (
          <g key={k}>
            <circle cx={x} cy={y} r="3.5" fill={`var(--p${d})`} />
            <text x={lx} y={ly + 5} textAnchor="middle" fontSize="13" fill={`var(--p${d})`} fontFamily="var(--font-display)">{d}</text>
          </g>
        );
      })}
    </svg>
  );
}
