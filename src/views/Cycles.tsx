import { useMemo, useState } from 'react';
import { yearNumber, dateNumber, root, ymdKey, dateToYMD, type N, type Self, type YMD } from '../lib/num';
import { sky, sunTimes, type Place } from '../lib/astro';
import { NUM, MONTH, WEEKDAY, periodState, relation, RELATION_LABEL } from '../data/numbers';
import { SectionHead } from '../components/bits';
import { pc } from '../components/viz';

export function Cycles({ self, now, place, sel, openDay }: { self: Self; now: Date; place: Place; sel: YMD; openDay: (v: YMD) => void }) {
  const today = dateToYMD(now);
  const p = self.psychic.root;
  const years = Array.from({ length: 10 }, (_, i) => today.y - 1 + i);
  const [y, setY] = useState(today.y);
  const yr = yearNumber(self.reckoned, y);
  const turn = y - self.birth.y, nth = turn + 1, nthRoot = root(nth);
  const goodYear = NUM[p].harmoniousYears.includes(nthRoot);
  const [view, setView] = useState({ y: sel.y, m: sel.m });

  const cells = useMemo(() => {
    const first = new Date(view.y, view.m - 1, 1).getDay();
    const days = new Date(view.y, view.m, 0).getDate();
    const out: (null | { v: YMD; dn: N; state: ReturnType<typeof periodState>; good: boolean; gday: boolean; phase: 'full' | 'new' | null })[] = [];
    for (let i = 0; i < first; i++) out.push(null);
    for (let d = 1; d <= days; d++) {
      const v = { y: view.y, m: view.m, d };
      const rise = sunTimes(v, place.lat, place.lon).rise ?? new Date(view.y, view.m - 1, d, 6);
      const ti = sky(rise).tithi.index;
      out.push({
        v, dn: dateNumber(v), state: periodState(p, view.m, d),
        good: NUM[p].goodDates.includes(d) || NUM[p].alsoDates.includes(d),
        gday: NUM[p].goodDays.includes(new Date(view.y, view.m - 1, d, 12).getDay()),
        phase: ti === 14 ? 'full' : ti === 29 ? 'new' : null,
      });
    }
    return out;
  }, [view.y, view.m, p, place.lat, place.lon]);

  const shift = (k: number) => { const d = new Date(view.y, view.m - 1 + k, 1); setView({ y: d.getFullYear(), m: d.getMonth() + 1 }); };

  return (
    <>
      <section className="section" style={{ paddingTop: 40 }}>
        <SectionHead eyebrow="Years" title="The path of years">
          The book's projection: birth month, plus birth day, plus the last two digits of the year, plus the number of the weekday your birthday falls on that year. Reduced, it names the year's ruler.
        </SectionHead>
        <div className="years" role="group" aria-label="Choose a year">
          {years.map((yy) => {
            const r = yearNumber(self.reckoned, yy).root;
            return (
              <button key={yy} aria-pressed={y === yy} style={pc(r)} onClick={() => setY(yy)}>
                <span className="y">{yy}{yy === today.y ? ' · now' : ''}</span>
                <span className="num pc">{r}</span>
                <span className="small muted">{NUM[r].planet}</span>
              </button>
            );
          })}
        </div>
        <div className="cols">
          <div className="prose">
            <span className="eyebrow">{y} · year {yr.root}, ruled by {NUM[yr.root].planet}</span>
            <p className="mono small muted">
              {yr.parts[0]} (month) + {yr.parts[1]} (day) + {String(yr.parts[2]).padStart(2, '0')} (year) + {yr.parts[3]} ({WEEKDAY[yr.weekday]}) = {yr.total} → {yr.root}
            </p>
            <ul style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 6 }}>
              {NUM[yr.root].year.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
          <div className="prose">
            <span className="eyebrow">Your year of life</span>
            <p>On your birthday in {y} you turn {turn} and begin your {nth}{ord(nth)} year of life, which reduces to {nthRoot}. {goodYear ? `The book counts years reducing to ${nthRoot} as harmonious for a ${p}.` : `For a ${p}, the book's harmonious years reduce to ${NUM[p].harmoniousYears.join(', ')}.`}</p>
            <p className="small muted">How {p} meets the year's {yr.root}: {RELATION_LABEL[relation(p, yr.root)].short.toLowerCase()}. {RELATION_LABEL[relation(p, yr.root)].long}.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="cal-head">
          <SectionHead eyebrow="Month" title={`${MONTH[view.m - 1]} ${view.y}`} />
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn icon" onClick={() => shift(-1)} aria-label="Previous month">‹</button>
            <button className="btn" onClick={() => setView({ y: today.y, m: today.m })}>This month</button>
            <button className="btn icon" onClick={() => shift(1)} aria-label="Next month">›</button>
          </div>
        </div>
        <div className="legend">
          <span><i style={{ background: 'color-mix(in srgb, var(--accent) 18%, transparent)' }} /> Strong period</span>
          <span><i style={{ background: 'repeating-linear-gradient(135deg, transparent 0 4px, color-mix(in srgb, var(--sindoor) 35%, transparent) 4px 5px)' }} /> Weak period</span>
          <span><span className="dot" /> Good date</span>
          <span><span className="dot" style={{ background: 'transparent', border: '1px solid var(--fg)' }} /> Your weekday</span>
          <span>Full / New: the Moon at sunrise</span>
          <span>Large numeral: the date number, in its planet's colour</span>
        </div>
        <div className="cal" role="grid" aria-label={`${MONTH[view.m - 1]} ${view.y}`}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => <div key={d} className="dow">{d}</div>)}
          {cells.map((c, i) => c === null
            ? <button key={`p${i}`} className="pad" tabIndex={-1} aria-hidden="true" />
            : (
              <button key={c.v.d}
                className={[c.state === 'neutral' ? '' : c.state, ymdKey(c.v) === ymdKey(today) ? 'today' : ''].join(' ')}
                onClick={() => openDay(c.v)}
                aria-label={`${c.v.d} ${MONTH[view.m - 1]}: date number ${c.dn}, ${NUM[c.dn].planet}. ${c.state} period. ${c.good ? 'Good date. ' : ''}Open this day.`}>
                <span className="d"><span>{c.v.d}</span><span className="ph">{c.phase === 'full' ? 'Full' : c.phase === 'new' ? 'New' : ''}</span></span>
                <span className="n" style={pc(c.dn)}><span className="pc">{c.dn}</span></span>
                <span className="marks">{c.good && <i className="good" />}{c.gday && <i className="day" />}</span>
              </button>
            ))}
        </div>
        <p className="note">Select a day to open its full reading. Moon phases are the lunar day at sunrise in {place.label}.</p>
      </section>
    </>
  );
}

const ord = (n: number) => (n % 100 >= 11 && n % 100 <= 13 ? 'th' : n % 10 === 1 ? 'st' : n % 10 === 2 ? 'nd' : n % 10 === 3 ? 'rd' : 'th');
