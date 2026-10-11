import { useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { N, Self, Profile } from '../lib/num';
import { NUM, WEEKDAY } from '../data/numbers';
import { vedicDay, nextHora, CHALDEAN, type Place } from '../lib/astro';
import {
  FAMILIES, STRATEGIES, PLANET_MONEY, CORRESPONDENCES, QUALITIES, CAN_CANT, GLYPHS, SPIRITS, RULES, TAKEAWAYS,
  type FamilyK, type Strategy, type Tool,
} from '../data/wealth';
import {
  StrategyCard, JupiterMandala, Kamea, PayoffCalc, GrowthCalc, OddsFunnel, ScoreDonut, DoDont, WealthMeter, Challenge,
} from '../components/wealth';
import { WeekStar } from '../components/geo';
import { ScrollProgress } from '../components/opus';
import { hm } from '../components/bits';
import { pc } from '../components/viz';
import '../opus.css';
import '../opus-read.css';
import '../arts.css';

const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
const fam = (k: FamilyK) => ({ '--stage': FAMILIES.find((f) => f.k === k)!.color, '--stage-ink': FAMILIES.find((f) => f.k === k)!.color }) as CSSProperties;
const NUMBER: Record<string, number> = Object.fromEntries(STRATEGIES.map((s, i) => [s.id, i + 1]));
const TOOLS: Record<Tool, () => ReactNode> = {
  payoff: () => <PayoffCalc />, growth: () => <GrowthCalc />, odds: () => <OddsFunnel />, score: () => <ScoreDonut />,
  kamea: () => <Kamea />, mandala: () => <div className="tool-mandala"><JupiterMandala size={300} /></div>, dodont: () => <DoDont />,
};
const whenLabel = (d: Date, now: Date) => {
  const same = d.toDateString() === now.toDateString();
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).toDateString() === d.toDateString();
  return same ? 'today' : tomorrow ? 'tomorrow' : d.toLocaleDateString([], { weekday: 'long' });
};

export function Wealth({ self, profile, now, place }: { self: Self; profile: Profile; now: Date; place: Place }) {
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const [family, setFamily] = useState<FamilyK | 'all'>('all');
  const [query, setQuery] = useState('');
  const minute = Math.floor(now.getTime() / 60000);
  const vd = useMemo(() => vedicDay(now, place.lat, place.lon), [minute, place.lat, place.lon]);
  const dayN = vd.horas[0].ruler, day = PLANET_MONEY[dayN]!;
  const hour = vd.horas.find((h) => now >= h.start && now < h.end) ?? vd.horas[0];
  const hourM = PLANET_MONEY[hour.ruler]!;
  const jove = useMemo(() => nextHora(now, 3, place.lat, place.lon), [minute, place.lat, place.lon]);
  const joveNow = !!jove && now >= jove.start && now < jove.end;
  const monday = useMemo(() => { const d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12); d.setDate(d.getDate() + ((8 - d.getDay()) % 7)); return d; }, [now.toDateString()]);

  const p = self.psychic.root, d = self.destiny.root, nm = self.name?.reading.root ?? null;
  const mine: { k: string; n: N }[] = [{ k: 'Psyche', n: p }, { k: 'Destiny', n: d }, ...(nm ? [{ k: 'Name', n: nm }] : [])];
  const who = profile.name ? profile.name.split(' ')[0] : 'you';

  const q = query.trim().toLowerCase();
  const matches = (s: Strategy) => !q || [s.title, s.short, s.what, s.helps, ...s.steps.map((x) => x.do)].some((t) => t.toLowerCase().includes(q));
  const shown = FAMILIES.filter((f) => family === 'all' || f.k === family)
    .map((f) => ({ f, items: STRATEGIES.filter((s) => s.family === f.k && matches(s)) }))
    .filter((x) => x.items.length);
  const setAll = (open: boolean) => list.current?.querySelectorAll('details').forEach((el) => { el.open = open; });
  const choose = (k: FamilyK) => { setFamily(k); setQuery(''); setTimeout(() => goTo('w-strategies'), 30); };

  return (
    <div className="opus wealth" ref={root}>
      <ScrollProgress target={root} />

      {/* ------------------------------------------------------------------ hero */}
      <section className="w-hero" aria-labelledby="w-title">
        <div className="w-hero-text">
          <span className="eyebrow">Financial sorcery · after Jason Miller, <i>Financial Sorcery</i></span>
          <h1 id="w-title"><span className="gold">Money, by magic and by plan</span></h1>
          <p className="lede">The book’s whole idea in one line: magic works, but only inside a strategy. Here are its strategies step by step, each step marked as an ordinary action or as magic, because the two must go together.</p>
          <div className="today-pill jove-pill">
            <span className="eyebrow">{joveNow ? 'Now' : 'Your next hour of Jupiter'}</span>
            <span className="op-mini">{jove ? `${joveNow ? 'until' : whenLabel(jove.start, now)} ${joveNow ? hm(jove.end) : `${hm(jove.start)}–${hm(jove.end)}`}` : '—'}</span>
            <span className="small muted">{joveNow ? 'The hour of increase is running. A good time for the toast and the chant.' : 'Jupiter rules increase. The book times its toast and its rites to his hours.'}</span>
          </div>
          <div className="hero-actions">
            <button className="btn primary" onClick={() => goTo('w-need')}>What do you need?</button>
            <button className="btn ghost" onClick={() => goTo('w-today')}>Today’s money hours</button>
          </div>
        </div>
        <div className="w-hero-art"><JupiterMandala /></div>
      </section>
      <p className="note">The emblem is Agrippa’s seal of Jupiter. In the book’s nine-night rite Jupiter sits at the centre and four goddesses stand at the ends of the cross: Victoria, Libertas, Concordia and Abundantia.</p>

      {/* ------------------------------------------------------------------ chooser */}
      <section className="section" id="w-need" aria-labelledby="w-need-h">
        <header className="sub-head"><span className="eyebrow">Start here</span><h3 id="w-need-h">What do you need right now?</h3>
          <p>Pick one and the page opens the right strategies. You can always see everything.</p></header>
        <div className="chooser">
          {FAMILIES.map((f) => {
            const n = STRATEGIES.filter((s) => s.family === f.k).length;
            return (
              <button key={f.k} className="choice" style={fam(f.k)} onClick={() => choose(f.k)}>
                <i aria-hidden="true" />
                <b>{f.need}</b>
                <span>{f.title} · {n} {n === 1 ? 'strategy' : 'strategies'}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ today */}
      <section className="section" id="w-today" aria-labelledby="w-today-h">
        <header className="sub-head"><span className="eyebrow">Today</span>
          <h3 id="w-today-h">{WEEKDAY[vd.weekday]} belongs to {NUM[dayN].planet}: {day.role.toLowerCase()}</h3>
          <p>Miller asks you to use all seven planets, not only Jupiter, each for its own part of a money plan. The day and the hour tell you whose help is closest.</p></header>
        <div className="w-today">
          <article className="mini-card big" style={pc(dayN)}>
            <span className="eyebrow">Today’s planet</span>
            <h4><span className="pc">{NUM[dayN].glyph}{'︎'} {NUM[dayN].planet}</span> · {day.role}</h4>
            <p>{day.job}</p>
            <p className="small muted">Ask: {day.ask}</p>
          </article>
          <article className="mini-card" style={pc(hour.ruler)}>
            <span className="eyebrow">The hour now</span>
            <h4><span className="pc">{NUM[hour.ruler].glyph}{'︎'} {NUM[hour.ruler].planet}</span> · until {hm(hour.end)}</h4>
            <p className="small">{hourM.role}: {hourM.job}</p>
          </article>
          <article className="mini-card" style={pc(3)}>
            <span className="eyebrow">Next hour of Jupiter</span>
            <h4 className="pc">{jove ? (joveNow ? `Now, until ${hm(jove.end)}` : `${whenLabel(jove.start, now)[0].toUpperCase()}${whenLabel(jove.start, now).slice(1)}, ${hm(jove.start)}–${hm(jove.end)}`) : '—'}</h4>
            <p className="small muted">The author toasts Jupiter every Thursday in his hour, suit and tie on, whiskey raised.</p>
          </article>
          <article className="mini-card">
            <span className="eyebrow">Your money planets</span>
            <ul className="my-money">
              {mine.map((x) => {
                const m = PLANET_MONEY[x.n];
                return <li key={x.k} style={pc(x.n)}><b className="pc">{x.n} {NUM[x.n].planet}</b> <span className="muted">{x.k}</span><br /><span className="small">{m ? m.role : 'A shadow planet with no hour of its own; Miller works with the seven.'}</span></li>;
              })}
            </ul>
          </article>
        </div>
      </section>

      {/* ------------------------------------------------------------------ where you stand */}
      <section className="section" id="w-stand" aria-labelledby="w-stand-h">
        <header className="sub-head"><span className="eyebrow">Where you stand</span><h3 id="w-stand-h">{profile.name ? `How wealthy is ${who}?` : 'How wealthy are you?'}</h3>
          <p>Miller borrows Buckminster Fuller’s measure: wealth is not your income but how many days you could keep living as you do without a paycheque. And everything comes down to two piles: what comes in and what goes out.</p></header>
        <WealthMeter />
        <div className="can-cant">
          {CAN_CANT.map((c) => <article key={c.k} className="mini-card"><h4>{c.title}</h4><p className="small">{c.text}</p></article>)}
        </div>
      </section>

      {/* ------------------------------------------------------------------ money as spirit */}
      <section className="section" aria-labelledby="w-spirit-h">
        <header className="sub-head"><span className="eyebrow">Money behaves like a spirit</span><h3 id="w-spirit-h">Six things money likes</h3>
          <p>You cannot serve money and spirit, the book says, and you cannot really avoid money either. That leaves mastering it, as a magician binds a spirit to serve. Whether money is a literal spirit doesn’t matter; it behaves like one, with its own likes and protocols.</p></header>
        <div className="qualities">
          {QUALITIES.map((x, k) => (
            <article key={x.k} className="quality">
              <span className="q-n">{k + 1}</span>
              <h4>{x.title}</h4>
              <p className="small">{x.text}</p>
              <p className="q-do">{x.do}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ planets */}
      <section className="section" id="w-planets" aria-labelledby="w-planets-h">
        <header className="sub-head"><span className="eyebrow">The seven planets on your money team</span><h3 id="w-planets-h">Every planet has a job</h3>
          <p>The book’s example is landing a job, and every planet has a part in it. The same roles work for any money goal.</p></header>
        <div className="planet-team">
          {CHALDEAN.slice().reverse().map((n) => {
            const m = PLANET_MONEY[n]!;
            return (
              <article key={n} className={`team-card${n === dayN ? ' is-today' : ''}`} style={pc(n)}>
                <span className="eyebrow">{WEEKDAY[m.day]}{n === dayN ? ' · today' : ''}</span>
                <h4><span className="pc">{NUM[n].glyph}{'︎'} {NUM[n].planet}</span></h4>
                <b className="team-role">{m.role}</b>
                <p className="small">{m.job}</p>
              </article>
            );
          })}
        </div>
        <details className="corr">
          <summary>Traditional names for each planet</summary>
          <p className="small muted">The book gives this chart only as a place to start research, and warns against shouting all the names at once: it is better to praise one being deeply than to crowd a rite with many.</p>
          <div className="rosetta-wrap">
            <table className="rosetta corr-table">
              <thead><tr><th>Planet</th><th>Day</th><th>Archangel</th><th>Intelligence</th><th>Spirit</th><th>Olympic spirit</th><th>Babylonian</th></tr></thead>
              <tbody>{CORRESPONDENCES.map((c) => <tr key={c.n} style={pc(c.n)}><td className="pc">{c.roman}</td><td>{c.day}</td><td>{c.archangel}</td><td>{c.intelligence}</td><td>{c.spirit}</td><td>{c.olympic}</td><td>{c.babylonian}</td></tr>)}</tbody>
            </table>
          </div>
        </details>

        <div className="challenge-wrap">
          <div>
            <span className="eyebrow">The two-week planetary challenge</span>
            <h4 className="challenge-h">One planet every other day, from Monday {monday.toLocaleDateString([], { day: 'numeric', month: 'long' })}</h4>
            <p className="small muted">The author’s challenge: hold one goal in mind and invoke each planet on its own day and hour, starting on a Monday and working every other day. In two weeks you have asked all seven for their part.</p>
            <Challenge place={place} start={monday} />
          </div>
          <figure className="figure">
            <WeekStar />
            <figcaption>The challenge walks the circle from the Moon round to Saturn. The gold star is the order of the week. The Geometry page explains why.</figcaption>
          </figure>
        </div>
      </section>

      {/* ------------------------------------------------------------------ strategies */}
      <section className="section" id="w-strategies" aria-labelledby="w-strat-h">
        <header className="sub-head"><span className="eyebrow">The strategies</span><h3 id="w-strat-h">{STRATEGIES.length} strategies, step by step</h3>
          <p>Each card opens to what it is, what it helps with, what you need, and every step with its reason. <span className="kind act">Do</span> marks an ordinary action; <span className="kind magic">Magic</span> marks the sorcery that goes with it.</p></header>
        <div className="proc-tools">
          <div className="filters" role="group" aria-label="Show">
            <button aria-pressed={family === 'all'} onClick={() => setFamily('all')}>All</button>
            {FAMILIES.map((f) => <button key={f.k} aria-pressed={family === f.k} onClick={() => setFamily(f.k)} style={fam(f.k)}><i />{f.title}</button>)}
          </div>
          <div className="proc-search">
            <label className="sr-only" htmlFor="w-q">Search the strategies</label>
            <input id="w-q" type="search" value={query} placeholder="Search, e.g. lodestone, résumé, credit card" onChange={(e) => setQuery(e.target.value)} />
            <button className="btn sm ghost" onClick={() => setAll(true)}>Open all</button>
            <button className="btn sm ghost" onClick={() => setAll(false)}>Close all</button>
          </div>
        </div>
        <div className="proc-groups" ref={list}>
          {shown.length === 0 && <p className="muted">Nothing matches “{query}”.</p>}
          {shown.map(({ f, items }) => (
            <div key={f.k} className="proc-group" style={fam(f.k)}>
              <header className="proc-group-head"><h4>{f.title}</h4><p>{f.intro}</p></header>
              <div className="proc-list">
                {items.map((s) => <StrategyCard key={s.id} s={s} n={NUMBER[s.id]} extra={s.tool ? TOOLS[s.tool]() : undefined} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ glyphs */}
      <section className="section" id="w-glyphs" aria-labelledby="w-glyphs-h">
        <header className="sub-head"><span className="eyebrow">The Lightning Glyphs of Jupiter</span><h3 id="w-glyphs-h">Sixteen flashes, sixteen uses</h3>
          <p>The author asked Jupiter for seals for modern money work and felt sixteen flashes of lightning; as each arose in his mind, the artist Matthew Brownlee drew it. Treat the glyphs, and anything you draw them on, as sacred and alive. The drawings are the artist’s work and are not copied here: each card gives the page where you will find it.</p></header>
        <div className="glyphs">
          {GLYPHS.map((g, k) => (
            <article key={g.k} className="glyph-card">
              <div className="glyph-top"><span className="glyph-n">{k + 1}</span><h4>{g.name}</h4><span className="tag">p. {g.page}</span></div>
              <p className="small">{g.purpose}</p>
              <p className="small"><b>Use:</b> {g.use}</p>
              {g.place && <p className="small muted">As a paper seal: {g.place.toLowerCase()}.</p>}
              {g.warn && <p className="glyph-warn small">{g.warn}</p>}
            </article>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ spirits */}
      <section className="section" id="w-spirits" aria-labelledby="w-spirits-h">
        <header className="sub-head"><span className="eyebrow">The powers that be</span><h3 id="w-spirits-h">Spirits the author has worked with</h3>
          <p>A short list to whet your appetite; the book asks you to research any of them before you begin. Start with the local spirits and your ancestors (see Foundations), and keep the three rules below.</p></header>
        <div className="spirits">
          {SPIRITS.map((s) => <article key={s.name} className="spirit"><h4>{s.name}</h4><span className="eyebrow">{s.from}</span><p className="small">{s.text}</p></article>)}
        </div>
        <div className="rules">
          {RULES.map((r, k) => <article key={r.title} className="mini-card"><span className="eyebrow">Rule {k + 1}</span><h4>{r.title}</h4><p className="small">{r.text}</p></article>)}
        </div>
      </section>

      <section className="section w-close">
        <div className="today-pill">
          <span className="eyebrow">The author’s parting words</span>
          <ul>{TAKEAWAYS.map((t) => <li key={t}>{t}</li>)}</ul>
          <p className="small muted">The book is written for the United States in 2011–12: its banks, taxes and figures are American, and it says so itself. It also says plainly that its author is not a financial professional; the money advice is mainstream common sense.</p>
        </div>
      </section>
    </div>
  );
}
