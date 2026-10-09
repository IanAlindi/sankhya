import { useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { N, Self, Profile } from '../lib/num';
import { sky, vedicDay, nextChange, WEEKDAY_RULER, type Place } from '../lib/astro';
import { NUM, WEEKDAY } from '../data/numbers';
import { birthSky } from '../lib/model';
import { OPERATIONS, ELEMENTS, ESSENTIALS, PLANETS7, P7, POISONOUS, fraction, opIndex, type Essential, type ElementK } from '../data/alchemy';
import { PROCESSES, GROUPS, OILS, GLOSSARY, FIRES, type GroupK, type Tone, type Process } from '../data/processes';
import { Embers, OperationWheel, EssentialsTree, MetalChip, ProcessCard, ScrollProgress, Glyph, EL_COLOR } from '../components/opus';
import { hm } from '../components/bits';
import { pc } from '../components/viz';
import '../opus.css';
import '../opus-read.css';

const tone = (k: Tone) => ({ '--stage': `var(--${k})`, '--stage-ink': `var(--${k}-ink)` }) as CSSProperties;
const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
const shortDay = (d: Date) => d.toLocaleDateString([], { weekday: 'short' });
const NUMBER: Record<string, number> = Object.fromEntries(PROCESSES.map((p, i) => [p.id, i + 1]));

export function Alchemy({ self, profile, now, place }: { self: Self; profile: Profile; now: Date; place: Place }) {
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const minute = Math.floor(now.getTime() / 60000);
  const s = useMemo(() => sky(now), [minute]);
  const mI = opIndex(s.moon), sI = opIndex(s.sun);
  const op = OPERATIONS[mI], monthOp = OPERATIONS[sI];
  const until = useMemo(() => nextChange(now, (x) => opIndex(x.moon), 72), [mI, Math.floor(minute / 30)]);
  const vd = useMemo(() => vedicDay(now, place.lat, place.lon), [minute, place.lat, place.lon]);
  const dayN = WEEKDAY_RULER[vd.weekday];
  const dp = P7[dayN]!;
  const dayHours = vd.horas.filter((h) => h.ruler === dayN);
  const [group, setGroup] = useState<GroupK | 'all'>('all');
  const [query, setQuery] = useState('');

  const p = self.psychic.root, d = self.destiny.root, nm = self.name?.reading.root ?? null;
  const birthWd = new Date(self.birth.y, self.birth.m - 1, self.birth.d, 12).getDay();
  const stars: { k: string; n: N }[] = [
    { k: 'Psyche', n: p }, { k: 'Destiny', n: d },
    ...(nm ? [{ k: 'Name', n: nm }] : []),
    { k: `Born on a ${WEEKDAY[birthWd]}`, n: WEEKDAY_RULER[birthWd] },
  ];
  const bs = useMemo(() => birthSky(profile, self), [profile, self]);
  const bSun = opIndex(bs.at.sun), bEl = OPERATIONS[bSun].el;
  const who = profile.name ? profile.name.split(' ')[0] : 'you';

  const q = query.trim().toLowerCase();
  const matches = (x: Process) => !q || [x.title, x.aka, x.short, x.what, x.helps].some((t) => t?.toLowerCase().includes(q));
  const shown = GROUPS.filter((g) => group === 'all' || g.k === group)
    .map((g) => ({ g, items: PROCESSES.filter((x) => x.group === g.k && matches(x)) }))
    .filter((x) => x.items.length);
  const setAll = (open: boolean) => list.current?.querySelectorAll('details').forEach((el) => { el.open = open; });

  return (
    <div className="opus" ref={root}>
      <ScrollProgress target={root} />

      {/* --------------------------------------------------------------- hero */}
      <section className="opus-hero" aria-labelledby="opus-title">
        <Embers />
        <div className="opus-hero-text">
          <span className="eyebrow">Practical alchemy · after Robert Allen Bartlett, <i>Real Alchemy</i></span>
          <h1 id="opus-title"><span className="gold">The Great Work</span></h1>
          <p className="lede">
            {PROCESSES.length} alchemical processes in plain English: what each one is, what it helps with, and how to do it, step by step.
          </p>
          <div className="today-pill" style={tone('citrin')}>
            <span className="eyebrow">Moon in {op.sign} · today’s operation</span>
            <span className="op-mini gold">{op.name}</span>
          </div>
          <div className="hero-actions">
            <button className="btn primary" onClick={() => goTo('opus-processes')}>See the processes</button>
            <button className="btn ghost" onClick={() => goTo('opus-basics')}>How alchemy works</button>
          </div>
        </div>
        <OperationWheel moon={s.moon} sun={s.sun} />
      </section>
      <p className="note">The wheel shows the book’s twelve operations, one for each zodiac sign. The pale dot is the Moon, which sets the operation of the day; the gold dot is the Sun, which sets the operation of the month.</p>

      {/* --------------------------------------------------------------- today */}
      <section className="section" aria-labelledby="opus-today">
        <header className="sub-head"><span className="eyebrow">Today</span><h3 id="opus-today">{WEEKDAY[vd.weekday]}: a day for {op.name.toLowerCase()}</h3></header>
        <div className="today-op" style={tone('citrin')}>
          <article className="op-card">
            <div className="op-top">
              <span className="op-sign" style={{ color: EL_COLOR[op.el] }}>{op.glyph}{'︎'}</span>
              <div>
                <span className="eyebrow">The Moon is in {op.sign}</span>
                <h2 className="op-name gold">{op.name}</h2>
                {until && <span className="small muted">Until {shortDay(until)} {hm(until)}, then {OPERATIONS[(mI + 1) % 12].name.toLowerCase()}</span>}
              </div>
            </div>
            <dl className="op-rows">
              <div><dt>What it is</dt><dd>{op.what}</dd></div>
              <div><dt>What it does</dt><dd>{op.why}</dd></div>
              <div><dt>In your life</dt><dd>{op.inner}</dd></div>
            </dl>
            <p className="op-prompt latin">{op.prompt}</p>
          </article>
          <div className="today-side">
            <article className="mini-card">
              <span className="eyebrow">The Moon is {s.waxing ? 'waxing' : 'waning'}</span>
              <h4>{s.waxing ? 'A time to build up and strengthen' : 'A time to separate and clean'}</h4>
              <p className="small muted">
                {s.waxing
                  ? 'The book says a waxing Moon draws things upward. It favours circulating and distilling to strengthen an elixir.'
                  : 'The book says a waning Moon favours separating the pure from the impure: extracting, distilling and burning to ash.'}
              </p>
            </article>
            <article className="mini-card">
              <span className="eyebrow">Today’s planet</span>
              <div className="day-planet">
                <MetalChip k={dp.metalKey} label={dp.metal} />
                <div>
                  <h4><span style={pc(dayN)} className="pc">{dp.glyph}{'︎'} {dp.planet}</span> · {dp.metal}</h4>
                  <p className="small muted">Rules the {dp.organ.toLowerCase()}</p>
                </div>
              </div>
              <p className="small">A good day to start work with {dp.planet}’s herbs, such as {dp.herbs.filter((h) => !POISONOUS.has(h)).slice(0, 4).join(', ')}.</p>
              <p className="small muted">Best hour: {dayHours[0] ? `${hm(dayHours[0].start)}–${hm(dayHours[0].end)}` : 'the first after sunrise'}, the first after sunrise. {dp.planet}’s other hours today: {dayHours.slice(1).map((h) => `${hm(h.start)}–${hm(h.end)}`).join(', ')}.</p>
            </article>
            <article className="mini-card">
              <span className="eyebrow">This month</span>
              <h4>The Sun is in {monthOp.sign}: {monthOp.name.toLowerCase()}</h4>
              <p className="small muted">{monthOp.why}</p>
            </article>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- your metals */}
      <section className="section" aria-labelledby="opus-stars">
        <header className="sub-head">
          <span className="eyebrow">Your metals</span>
          <h3 id="opus-stars">{profile.name ? `The planets and metals of ${who}` : 'Your planets and metals'}</h3>
          <p>Each of your numbers has a planet, and each planet has its metal. The book calls these planets inside us our “interior stars”. The qualities listed are the mental effects the book reports for each metal.</p>
        </header>
        <div className="stars">
          {stars.map((x) => {
            const pl = P7[x.n];
            return (
              <article key={x.k} className="star-card" style={pc(x.n)}>
                <MetalChip k={pl ? pl.metalKey : 'shadow'} size={56} label={pl ? pl.metal : 'No metal'} />
                <span className="eyebrow">{x.k}</span>
                <h4><span className="num pc">{x.n}</span> {NUM[x.n].planet}</h4>
                {pl
                  ? <><p className="metal-name">{pl.metal}</p><p className="small">{pl.quality}</p></>
                  : <p className="small muted">{NUM[x.n].planet} is not one of the seven planets in the book’s table, so it has no metal.</p>}
              </article>
            );
          })}
        </div>
        <div className="birth-el" style={{ '--el': EL_COLOR[bEl] } as CSSProperties}>
          <Glyph k={bEl} size={48} />
          <div>
            <span className="eyebrow">Your element</span>
            <h4>{ELEMENTS[bEl].name}: {ELEMENTS[bEl].qualities.toLowerCase()}</h4>
            <p className="small">You were born with the Sun in {OPERATIONS[bSun].sign}, a {ELEMENTS[bEl].name.toLowerCase()} sign. {ELEMENTS[bEl].nature} The book says the sign you are born under shapes your temperament and the organs most likely to need care.</p>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- basics */}
      <section className="section" id="opus-basics" aria-labelledby="opus-basics-h">
        <header className="sub-head"><span className="eyebrow">Before you begin</span><h3 id="opus-basics-h">How alchemy works, in four ideas</h3></header>
        <div className="ideas">
          <article className="idea" style={tone('citrin')}>
            <span className="idea-n">1</span>
            <h4>Everything has three parts</h4>
            <p>Alchemy says every plant, mineral and person has a body, a soul and a spirit. It calls them <b>Salt</b>, <b>Sulfur</b> and <b>Mercury</b>. In a plant, the Salt is the mineral left in its ash, the Sulfur is its essential oil, and the Mercury is the alcohol that fermentation releases.</p>
            <div className="idea-glyphs">
              {(['salt', 'sulfur', 'mercury'] as Essential[]).map((k) => <span key={k}><Glyph k={k} size={22} />{ESSENTIALS[k].name} · {ESSENTIALS[k].aspect}</span>)}
            </div>
          </article>
          <article className="idea" style={tone('albedo')}>
            <span className="idea-n">2</span>
            <h4>Separate, purify, reunite</h4>
            <p>Almost every process follows the same pattern. Take the substance apart into its three parts, clean each one, then put them back together. The result, the book says, is stronger and purer than what you started with.</p>
          </article>
          <article className="idea" style={tone('nigredo')}>
            <span className="idea-n">3</span>
            <h4>Work with the sky</h4>
            <p>A waxing Moon is for building up and strengthening; a waning Moon is for separating and cleaning. Start work with a herb on the day of its ruling planet, ideally in the hour after sunrise. The Today panel above does this for you.</p>
          </article>
          <article className="idea" style={tone('rubedo')}>
            <span className="idea-n">4</span>
            <h4>The work changes you too</h4>
            <p>The book insists your state of mind matters: work calmly, with intention. Each operation in the flask has a match in your inner life. In its words, “you are the lead which is transmuted into pure gold.”</p>
          </article>
        </div>
        <div className="cols" style={{ alignItems: 'center' }}>
          <figure className="figure opus-fig" style={tone('citrin')}><EssentialsTree /><figcaption>How the three parts arise: the four elements pair up into Salt, Mercury and Sulfur.</figcaption></figure>
          <div className="basics-side">
            <span className="eyebrow">The four kinds of heat</span>
            <div className="fires-mini">
              {FIRES.map((f) => (
                <div key={f.n} className="fire-row" style={{ '--heat': f.n } as CSSProperties}>
                  <span className="heat" aria-hidden="true"><i /></span>
                  <div><b>{f.name}</b> <span className="muted small">· {f.heat}</span><p className="small muted">{f.use}</p></div>
                </div>
              ))}
            </div>
            <p className="small muted">Always start with the gentlest heat that will do the job, and raise it slowly.</p>
          </div>
        </div>
        <div className="glossary">
          <span className="eyebrow">Words you will meet</span>
          <dl>
            {GLOSSARY.map((g) => <div key={g.word}><dt>{g.word}</dt><dd>{g.meaning}</dd></div>)}
          </dl>
        </div>
      </section>

      {/* --------------------------------------------------------------- processes */}
      <section className="section" id="opus-processes" aria-labelledby="opus-processes-h">
        <header className="sub-head">
          <span className="eyebrow">The processes</span>
          <h3 id="opus-processes-h">{PROCESSES.length} processes, from a simple tincture to the Philosopher’s Stone</h3>
          <p>Open any process to see what it is, what it helps with, what you need, and each step with its reason. The badges show how hard the book considers it.</p>
        </header>
        <div className="proc-tools">
          <div className="filters" role="group" aria-label="Show a family of processes">
            <button aria-pressed={group === 'all'} onClick={() => setGroup('all')}>All</button>
            {GROUPS.map((g) => (
              <button key={g.k} aria-pressed={group === g.k} style={tone(g.tone)} onClick={() => setGroup(g.k)}><i aria-hidden="true" />{g.title}</button>
            ))}
          </div>
          <div className="proc-search">
            <label htmlFor="proc-q" className="sr-only">Search the processes</label>
            <input id="proc-q" type="search" placeholder="Search, e.g. salt, gold, blood" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button className="btn ghost sm" onClick={() => setAll(true)}>Open all</button>
            <button className="btn ghost sm" onClick={() => setAll(false)}>Close all</button>
          </div>
        </div>
        <div ref={list} className="proc-groups">
          {shown.length === 0 && <p className="muted">No process matches “{query}”.</p>}
          {shown.map(({ g, items }) => (
            <div key={g.k} className="proc-group" style={tone(g.tone)}>
              <header className="proc-group-head">
                <h4>{g.title}</h4>
                <p>{g.intro}</p>
              </header>
              <div className="proc-list">
                {items.map((x) => (
                  <ProcessCard key={x.id} p={x} n={NUMBER[x.id]}
                    extra={x.extra === 'week' ? <SevenWeek today={vd.weekday} /> : x.extra === 'fractions' ? <TwelveFractions /> : x.extra === 'oils' ? <Oils /> : undefined} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------------------- reference */}
      <section className="section" aria-labelledby="opus-ref">
        <header className="sub-head">
          <span className="eyebrow">Reference</span>
          <h3 id="opus-ref">Planets, metals and herbs</h3>
          <p>The book’s tables, for choosing which herb or metal belongs to which planet and day. The herbs are mostly from Nicholas Culpeper’s 17th-century herbal.</p>
        </header>
        <PlanetTable today={vd.weekday} />
        <Herbs today={vd.weekday} />
      </section>

      {/* --------------------------------------------------------------- close */}
      <section className="opus-close" style={tone('rubedo')}>
        <h2><span className="gold">Start simply</span></h2>
        <p className="lede">The book’s advice is to begin with the simple plant elixir and the Seven Basics, learn the theory before the practice, and move on to harder work only as your skill grows. As you work on your material, it works on you.</p>
        <button className="btn primary" onClick={() => { setGroup('plants'); setQuery(''); goTo('opus-processes'); }}>Begin with the plant medicines</button>
        <p className="note">After Robert Allen Bartlett, <i>Real Alchemy: A Primer of Practical Alchemy</i> (Quinquangle Press, 2006). Effects and warnings are as the book gives them. The book advises consulting a licensed physician before taking any herbal preparation.</p>
      </section>
    </div>
  );
}

// ---------------------------------------------------------------------------------------------

function HerbList({ list }: { list: string[] }) {
  return <>{list.map((h, i) => <span key={h}>{i ? ', ' : ''}{h}{POISONOUS.has(h) && <sup className="poison" title="Poisonous if swallowed">†</sup>}</span>)}</>;
}

function Herbs({ today }: { today: number }) {
  const order = [1, 2, 9, 5, 3, 6, 8] as N[];
  return (
    <div className="herbs">
      {order.map((n) => {
        const pl = P7[n]!;
        return (
          <article key={n} className={`herb-row${pl.weekday === today ? ' today' : ''}`} style={pc(n)}>
            <h4><span className="pc">{pl.glyph}{'︎'} {pl.planet}</span></h4>
            <p><HerbList list={pl.herbs} /></p>
          </article>
        );
      })}
      <p className="note"><sup className="poison">†</sup> Poisonous if swallowed.</p>
    </div>
  );
}

function PlanetTable({ today }: { today: number }) {
  const order = [0, 1, 2, 3, 4, 5, 6].map((wd) => PLANETS7.find((x) => x.weekday === wd)!);
  return (
    <div className="week-rows planet-table" role="table" aria-label="Planets, metals, organs and weekdays">
      <div role="row" className="head"><span role="columnheader">Planet</span><span role="columnheader">Metal</span><span role="columnheader">Organ</span><span role="columnheader">Day</span></div>
      {order.map((pl) => (
        <div key={pl.planet} role="row" className={pl.weekday === today ? 'today' : ''} style={pc(pl.n)}>
          <span role="cell" className="pl"><b className="pc">{pl.glyph}{'︎'} {pl.planet}</b></span>
          <span role="cell" className="pl"><MetalChip k={pl.metalKey} size={20} />{pl.metal === 'Quicksilver' ? 'Mercury' : pl.metal}</span>
          <span role="cell">{pl.organ}</span>
          <span role="cell" className="wd">{WEEKDAY[pl.weekday]}</span>
        </div>
      ))}
    </div>
  );
}

function SevenWeek({ today }: { today: number }) {
  const order = [0, 1, 2, 3, 4, 5, 6].map((wd) => PLANETS7.find((x) => x.weekday === wd)!);
  return (
    <div className="week">
      <span className="eyebrow">Which herb for which day</span>
      <div className="week-rows" role="table" aria-label="The seven days with their planets, herbs and organs">
        {order.map((pl) => (
          <div key={pl.planet} role="row" className={pl.weekday === today ? 'today' : ''} style={pc(pl.n)}>
            <span role="cell" className="wd">{WEEKDAY[pl.weekday]}</span>
            <span role="cell" className="pl"><MetalChip k={pl.metalKey} size={20} /><b className="pc">{pl.glyph}{'︎'} {pl.planet}</b></span>
            <span role="cell" className="small"><HerbList list={pl.herbs} /></span>
            <span role="cell" className="small muted">{pl.organ}</span>
          </div>
        ))}
      </div>
      <p className="note"><sup className="poison">†</sup> Poisonous if swallowed.</p>
    </div>
  );
}

function TwelveFractions() {
  const els: ElementK[] = ['fire', 'air', 'water', 'earth'];
  const ess: Essential[] = ['sulfur', 'mercury', 'salt'];
  return (
    <div className="fractions" role="table" aria-label="The twelve parts of rainwater and their signs">
      <span role="row" className="frow head"><span role="columnheader" />{els.map((e) => <span role="columnheader" key={e} style={{ color: EL_COLOR[e] }}><Glyph k={e} size={16} /> {ELEMENTS[e].name}</span>)}</span>
      {ess.map((x) => (
        <span role="row" className="frow" key={x}>
          <span role="rowheader"><Glyph k={x} size={16} /> {ESSENTIALS[x].name}</span>
          {els.map((e) => { const o = fraction(e, x); return <span role="cell" key={e}><b>{o.glyph}{'︎'} {o.sign}</b><small>{ESSENTIALS[x].name} of {ELEMENTS[e].name}</small></span>; })}
        </span>
      ))}
    </div>
  );
}

function Oils() {
  return (
    <div className="claims">
      <span className="eyebrow">What each metal’s oil is reported to help with</span>
      <div className="claims-grid">
        {OILS.map((o) => (
          <article key={o.name} className="claim">
            <MetalChip k={o.metal} size={36} />
            <div><h4>Oil of {o.name}</h4><p className="small">{o.text}</p></div>
          </article>
        ))}
      </div>
    </div>
  );
}
