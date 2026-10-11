import { useMemo } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { N } from '../lib/num';
import { NUM } from '../data/numbers';
import { vedicDay, type Place } from '../lib/astro';
import { useKindle } from './opus';
import { hm } from './bits';
import { useStored } from '../lib/store';
import { payoff, growth, wealthDays, money, duration } from '../lib/money';
import { PLANET_MONEY, JUPITER_KAMEA, ODDS, SCORE_PARTS, DO_DONT, type Strategy } from '../data/wealth';
import { polar, type Pt } from '../lib/geo';

// ---------------------------------------------------------------------------------------------
// One strategy: closed, what it is for; open, the explainer and every step marked act or magic.
// ---------------------------------------------------------------------------------------------
export function StrategyCard({ s, n, extra }: { s: Strategy; n: number; extra?: ReactNode }) {
  const ref = useKindle<HTMLOListElement>();
  const acts = s.steps.filter((x) => x.kind === 'act').length, magic = s.steps.length - acts;
  return (
    <details className="proc wcard" id={`w-${s.id}`}>
      <summary>
        <span className="proc-n" aria-hidden="true">{n}</span>
        <span className="proc-main">
          <span className="proc-title">{s.title}</span>
          <span className="proc-short">{s.short}</span>
        </span>
        <span className="proc-meta">
          {acts > 0 && <span className="kind act" title="Ordinary actions">{acts} action{acts > 1 ? 's' : ''}</span>}
          {magic > 0 && <span className="kind magic" title="Magical steps">{magic} magic</span>}
        </span>
        <span className="proc-chev" aria-hidden="true" />
      </summary>
      <div className="proc-body">
        <div className="proc-explain">
          <div><span className="eyebrow">What it is</span><p>{s.what}</p></div>
          <div className="proc-helps"><span className="eyebrow">What it helps with</span><p>{s.helps}</p></div>
        </div>
        {s.need && <div className="proc-need"><span className="eyebrow">You will need</span><ul>{s.need.map((x) => <li key={x}>{x}</li>)}</ul></div>}
        <div className="proc-how">
          <span className="eyebrow">How to do it · {s.steps.length} steps</span>
          <ol className="steps" ref={ref}>
            {s.steps.map((st, i) => (
              <li className={`step ${st.kind}`} key={i}>
                <span className="node" aria-hidden="true">{i + 1}</span>
                <p className="step-do"><span className={`kind ${st.kind}`}>{st.kind === 'act' ? 'Do' : 'Magic'}</span>{st.do}</p>
                <p className="why"><b>Why</b><span>{st.why}</span></p>
              </li>
            ))}
          </ol>
        </div>
        {s.care && <div className="cautions"><b>Take care</b><ul>{s.care.map((c) => <li key={c}>{c}</li>)}</ul></div>}
        {s.note && <p className="book-note"><b>From the book</b> {s.note}</p>}
        {extra}
        <p className="small muted">Financial Sorcery, {s.pages}.</p>
      </div>
    </details>
  );
}

// ---------------------------------------------------------------------------------------------
// Agrippa's seal of Jupiter with the four goddesses at its gates: the nine-night altar.
// ---------------------------------------------------------------------------------------------
const GODDESSES = [
  { name: 'Victoria', gift: 'victory', at: 135 }, { name: 'Libertas', gift: 'freedom', at: 45 },
  { name: 'Concordia', gift: 'harmony', at: -45 }, { name: 'Abundantia', gift: 'abundance', at: -135 },
];
export function JupiterMandala({ size = 360, label = true }: { size?: number; label?: boolean }) {
  const c: Pt = [200, 200];
  const to = (p: Pt): Pt => [p[0], 400 - p[1]];
  const R = 112;
  return (
    <svg className="mandala" viewBox="0 0 400 400" width={size} height={size} role="img"
      aria-label="Agrippa's seal of Jupiter: a circle crossed by an X with small circles at its four ends, where the four goddesses stand, inside a square with four gates">
      <defs>
        <radialGradient id="jove-glow"><stop offset="0" stopColor="var(--jove)" stopOpacity="0.5" /><stop offset="1" stopColor="var(--jove)" stopOpacity="0" /></radialGradient>
      </defs>
      <circle cx="200" cy="200" r="190" fill="url(#jove-glow)" className="jove-breathe" />
      {/* the square of the earth with four gates */}
      <path d="M40 40 H170 V24 H230 V40 H360 V170 H376 V230 H360 V360 H230 V376 H170 V360 H40 V230 H24 V170 H40 Z"
        fill="none" stroke="var(--gold-2)" strokeOpacity="0.55" strokeWidth="1.4" />
      <circle cx="200" cy="200" r="150" fill="none" stroke="var(--gold-2)" strokeOpacity="0.35" />
      {/* Agrippa's seal */}
      <circle cx="200" cy="200" r={R} fill="none" stroke="var(--jove)" strokeWidth="3" />
      {GODDESSES.map((g) => {
        const [x1, y1] = to(polar(c, R * 1.38, g.at)), [x2, y2] = to(polar(c, R * 1.38, g.at + 180));
        return <line key={g.name} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--jove)" strokeWidth="3" strokeLinecap="round" />;
      })}
      {GODDESSES.map((g) => {
        const [x, y] = to(polar(c, R * 1.38 + 9, g.at));
        const [lx, ly] = to(polar(c, R * 1.38 + 9, g.at));
        const up = g.at > 0;
        return (
          <g key={g.name}>
            <circle cx={x} cy={y} r="9" fill="var(--bg)" stroke="var(--jove)" strokeWidth="3" />
            <circle cx={x} cy={y} r="3.5" fill="var(--gold-1)" className="flame" />
            {label && <text x={lx} y={ly + (up ? -18 : 26)} textAnchor="middle" style={{ font: 'italic 500 15px var(--font-latin)', fill: 'var(--gold-1)' }}>{g.name}</text>}
          </g>
        );
      })}
      <circle cx="200" cy="200" r="30" fill="var(--bg)" stroke="var(--jove)" strokeWidth="2" />
      <text x="200" y="212" textAnchor="middle" style={{ font: "400 30px 'Segoe UI Symbol', 'Noto Sans Symbols', 'Apple Symbols', sans-serif", fill: 'var(--jove-ink)' }}>♃{'︎'}</text>
      <path className="bolt" pathLength={1} d="M214 128 L198 160 L210 160 L192 196" fill="none" stroke="var(--gold-1)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

// ---------------------------------------------------------------------------------------------
// The magic square of Jupiter, for the inside of the cashbox lid.
// ---------------------------------------------------------------------------------------------
export function Kamea() {
  return (
    <figure className="kamea-fig">
      <div className="kamea" role="table" aria-label="The magic square of Jupiter, four by four">
        {JUPITER_KAMEA.flat().map((v, i) => <div key={i} role="cell"><b>{v}</b></div>)}
      </div>
      <figcaption className="small muted">The magic square of Jupiter, after Agrippa. Every row, column and diagonal adds up to 34, and all sixteen to 136. Saturn’s square is the Lo Shu on your Numbers page, where every line makes 15.</figcaption>
    </figure>
  );
}

// ---------------------------------------------------------------------------------------------
// Calculators
// ---------------------------------------------------------------------------------------------
function Num({ id, label, value, set, step = 1, suffix, min = 0 }: { id: string; label: string; value: number; set: (v: number) => void; step?: number; suffix?: string; min?: number }) {
  return (
    <div className="field calc-field">
      <label htmlFor={id}>{label}</label>
      <div className="calc-input">
        <input id={id} type="number" inputMode="decimal" min={min} step={step} value={Number.isFinite(value) ? value : ''} onChange={(e) => set(Math.max(min, +e.target.value || 0))} />
        {suffix && <span>{suffix}</span>}
      </div>
    </div>
  );
}

export function PayoffCalc() {
  const [v, setV] = useStored('wealth.payoff', { balance: 5000, apr: 17, minPct: 3, floor: 25, fixed: 300 });
  const set = (k: keyof typeof v) => (x: number) => setV({ ...v, [k]: x });
  const a = useMemo(() => payoff(v.balance, v.apr, { minPct: v.minPct, floor: v.floor }), [v]);
  const b = useMemo(() => payoff(v.balance, v.apr, { fixed: v.fixed }), [v]);
  const worst = Math.max(Number.isFinite(a.interest) ? a.interest : 0, Number.isFinite(b.interest) ? b.interest : 0, 1);
  return (
    <div className="calc">
      <span className="eyebrow">Card payoff calculator</span>
      <div className="calc-grid">
        <Num id="pb" label="Balance owed" value={v.balance} set={set('balance')} step={100} />
        <Num id="pr" label="Interest rate (APR)" value={v.apr} set={set('apr')} step={0.5} suffix="%" />
        <Num id="pm" label="Minimum payment" value={v.minPct} set={set('minPct')} step={0.5} suffix="% of balance" />
        <Num id="pf" label="…but at least" value={v.floor} set={set('floor')} step={5} />
        <Num id="px" label="Or pay every month" value={v.fixed} set={set('fixed')} step={10} />
      </div>
      <div className="calc-compare">
        {[{ k: 'Minimum only', r: a, tone: 'var(--p9)' }, { k: `${money(v.fixed)} a month`, r: b, tone: 'var(--p5)' }].map((x) => (
          <div key={x.k}>
            <span className="eyebrow">{x.k}</span>
            <b className="calc-big">{duration(x.r.months)}</b>
            <span className="small muted">{x.r.done ? `${money(x.r.paid)} paid in total, ${money(x.r.interest)} of it interest` : 'The payment never gets ahead of the interest.'}</span>
            <div className="calc-bar"><i style={{ width: `${Number.isFinite(x.r.interest) ? (x.r.interest / worst) * 100 : 100}%`, background: x.tone }} /></div>
          </div>
        ))}
      </div>
      <p className="small muted">The bars compare the interest paid. Set to the book’s example ($5,000 at 17%, minimum 3% or $25), the minimum takes 13 years 2 months and about $9,030 in all; $300 a month clears it in 20 months.</p>
    </div>
  );
}

export function GrowthCalc() {
  const [v, setV] = useStored('wealth.growth', { initial: 2000, yearly: 2000, rate: 8, years: 45 });
  const set = (k: keyof typeof v) => (x: number) => setV({ ...v, [k]: x });
  const rows = useMemo(() => growth(v.initial, v.yearly, v.rate, Math.min(80, Math.max(1, Math.round(v.years)))), [v]);
  const last = rows[rows.length - 1];
  const W = 460, H = 200, max = last?.value || 1, bw = (W - 20) / rows.length;
  return (
    <div className="calc">
      <span className="eyebrow">Growth calculator</span>
      <div className="calc-grid">
        <Num id="gi" label="Put in now" value={v.initial} set={set('initial')} step={100} />
        <Num id="gy" label="Add every year" value={v.yearly} set={set('yearly')} step={100} />
        <Num id="gr" label="Growth per year" value={v.rate} set={set('rate')} step={0.5} suffix="%" />
        <Num id="gn" label="For" value={v.years} set={set('years')} suffix="years" min={1} />
      </div>
      {last && (
        <>
          <div className="calc-compare">
            <div><span className="eyebrow">At the end</span><b className="calc-big gold">{money(last.value)}</b></div>
            <div><span className="eyebrow">You put in</span><b className="calc-big">{money(last.paidIn)}</b></div>
            <div><span className="eyebrow">Grown by itself</span><b className="calc-big" style={{ color: 'var(--p5)' }}>{money(last.value - last.paidIn)}</b></div>
          </div>
          <svg viewBox={`0 0 ${W} ${H + 20}`} className="growth-chart" role="img" aria-label={`Year by year, what you put in and what it grew to, reaching ${money(last.value)} after ${rows.length} years`}>
            {rows.map((r, i) => {
              const hv = (r.value / max) * H, hp = (r.paidIn / max) * H;
              return (
                <g key={r.year}>
                  <rect x={10 + i * bw + 0.5} y={H - hv} width={Math.max(1, bw - 1)} height={hv - hp} fill="var(--gold-2)" opacity="0.85" />
                  <rect x={10 + i * bw + 0.5} y={H - hp} width={Math.max(1, bw - 1)} height={hp} fill="var(--faint)" opacity="0.7" />
                </g>
              );
            })}
            <text x="10" y={H + 16} className="cs-label" style={{ fontSize: 11, fill: 'var(--muted)' }}>year 1</text>
            <text x={W - 10} y={H + 16} textAnchor="end" className="cs-label" style={{ fontSize: 11, fill: 'var(--muted)' }}>year {rows.length}</text>
          </svg>
          <p className="small muted">Grey is what you put in; gold is what it grew. Each year’s gold is added to the pile and grows in turn, like the gnomon in lesson 8 of the Geometry page. The book’s examples: $2,000 once at 8% for 45 years is about $63,800; $2,000 every year is about $835,000.</p>
        </>
      )}
    </div>
  );
}

export function OddsFunnel() {
  return (
    <div className="odds" role="list" aria-label="How the odds narrow at each step">
      {ODDS.map((o, i) => (
        <div key={o.step} className="odds-row" role="listitem" style={{ '--w': `${Math.max(6, (Math.log(o.n + 1) / Math.log(81)) * 100)}%`, '--d': `${i * 0.12}s` } as CSSProperties}>
          <span className="odds-step">{o.step}</span>
          <span className="odds-bar"><i /></span>
          <b>{o.odds}</b>
        </div>
      ))}
    </div>
  );
}

export function ScoreDonut() {
  const cols = ['var(--p5)', 'var(--p3)', 'var(--p6)', 'var(--p4)', 'var(--p7)'];
  let acc = 0;
  return (
    <div className="score">
      <svg viewBox="0 0 120 120" width="150" height="150" role="img" aria-label="What makes up a credit score">
        {SCORE_PARTS.map((p, i) => {
          const a0 = acc, a1 = acc + p.pct; acc = a1;
          const arc = (f: number): Pt => polar([60, 60], 44, 90 - f * 3.6);
          const [x0, y0] = arc(a0), [x1, y1] = arc(a1);
          return <path key={p.k} d={`M${x0} ${120 - y0} A44 44 0 ${p.pct > 50 ? 1 : 0} 1 ${x1} ${120 - y1}`} fill="none" stroke={cols[i]} strokeWidth="16" />;
        })}
      </svg>
      <ul>{SCORE_PARTS.map((p, i) => <li key={p.k}><i style={{ background: cols[i] }} /><b>{p.pct}%</b> {p.k}</li>)}</ul>
    </div>
  );
}

export function DoDont() {
  return (
    <table className="dodont">
      <thead><tr><th>Do</th><th>Don’t</th></tr></thead>
      <tbody>{DO_DONT.map((r) => <tr key={r.do}><td>{r.do}</td><td>{r.dont}</td></tr>)}</tbody>
    </table>
  );
}

/** Buckminster Fuller's measure and the book's two piles. */
export function WealthMeter() {
  const [v, setV] = useStored('wealth.meter', { savings: 0, costs: 0, income: 0 });
  const set = (k: keyof typeof v) => (x: number) => setV({ ...v, [k]: x });
  const days = wealthDays(v.savings, v.costs);
  const flow = v.income - v.costs;
  const filled = v.costs > 0;
  const level = !filled ? 0 : Math.min(1, days / 365);
  return (
    <div className="meter-card">
      <div className="calc-grid">
        <Num id="ms" label="Savings you could live on" value={v.savings} set={set('savings')} step={100} />
        <Num id="mc" label="Monthly living costs" value={v.costs} set={set('costs')} step={50} />
        <Num id="mi" label="Monthly income" value={v.income} set={set('income')} step={50} />
      </div>
      <div className="meter-read">
        <div className="vessel" aria-hidden="true"><i style={{ height: `${level * 100}%` }} /></div>
        <div>
          <span className="eyebrow">Your wealth, by Fuller’s measure</span>
          <b className="calc-big gold">{filled ? (Number.isFinite(days) ? `${Math.floor(days)} days` : 'unlimited') : '—'}</b>
          <p className="small muted">{filled ? 'How long you could keep living as you do now without a paycheque.' : 'Enter your numbers. They stay in this browser.'}</p>
          {filled && v.income > 0 && (
            <p className="small">{flow >= 0
              ? <>More comes in than goes out, by <b>{money(flow)}</b> a month: you are building wealth.</>
              : <>More goes out than comes in, by <b>{money(-flow)}</b> a month: you are building debt. Start with Get out of debt.</>}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------------------------
// The two-week planetary challenge: one planet every other day, from a Monday.
// ---------------------------------------------------------------------------------------------
export function Challenge({ place, start }: { place: Place; start: Date }) {
  const [goal, setGoal] = useStored('wealth.goal', '');
  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i * 2, 12);
    const vd = vedicDay(d, place.lat, place.lon);
    return { d, ruler: vd.horas[0].ruler, first: vd.horas[0] };
  }), [start.getTime(), place.lat, place.lon]);
  return (
    <div className="challenge">
      <div className="field">
        <label htmlFor="goal">Your goal</label>
        <input id="goal" value={goal} placeholder="e.g. land a better job by March" onChange={(e) => setGoal(e.target.value)} />
      </div>
      <ol className="challenge-list">
        {days.map(({ d, ruler, first }) => {
          const pm = PLANET_MONEY[ruler]!;
          return (
            <li key={d.toDateString()} style={{ '--pc': `var(--p${ruler})` } as CSSProperties}>
              <span className="ch-date">{d.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' })}</span>
              <span className="ch-planet"><b className="pc">{NUM[ruler].glyph}{'︎'} {NUM[ruler].planet}</b> · {pm.role}</span>
              <span className="ch-ask">{goal ? <><i>{goal}:</i> </> : null}{pm.ask}</span>
              <span className="ch-hour small muted">{NUM[ruler].planet}’s first hour: {hm(first.start)}–{hm(first.end)}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export const moneyRole = (n: N) => PLANET_MONEY[n];
