import { useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { N, Self, Profile } from '../lib/num';
import { sky, vedicDay, nextChange, WEEKDAY_RULER, type Place } from '../lib/astro';
import { NUM, WEEKDAY } from '../data/numbers';
import { birthSky } from '../lib/model';
import {
  OPERATIONS, ELEMENTS, ESSENTIALS, PLANETS7, P7, STAGES, HAND, ORES, GOLDS, POISONOUS,
  fraction, opIndex, type Essential, type ElementK, type MetalKey,
} from '../data/alchemy';
import { BOOK, WORKS, STAGE_HEADS, type Block, type FigId, type StageK } from '../data/book';
import {
  Embers, OperationWheel, EssentialsTree, ElementsSquare, ElementSpiral, TreeOfLife, FireCycle, MetalChip,
  WorkCard, ScrollProgress, Glyph, EL_COLOR,
} from '../components/opus';
import { hm } from '../components/bits';
import { pc } from '../components/viz';
import '../opus.css';

const tone = (k: StageK) => ({ '--stage': `var(--${k})`, '--stage-ink': `var(--${k}-ink)` }) as CSSProperties;
const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
const shortDay = (d: Date) => d.toLocaleDateString([], { weekday: 'short' });

/** Work numbers in reading order, as they appear through the book. */
const WORK_NO: Record<string, number> = (() => {
  const out: Record<string, number> = {};
  let i = 0;
  for (const ch of BOOK) for (const b of ch.blocks) if (b.k === 'work') out[b.id] = ++i;
  return out;
})();

const FIRES = [
  { n: 1, latin: 'Balneum Mariae', name: 'The Bath of Mary', heat: 'never above 100 °C', text: 'A double boiler: the vessel stands in water heated by the furnace, so its contents can never scorch. Some say it was devised by a Jewish adept, Mary the Prophetess, around 500 CE; others that the name comes from mare, the sea.', use: 'Delicate components; alcohol is rectified in a water bath.' },
  { n: 2, latin: 'Balneum Cineris', name: 'The ash bath', heat: 'above boiling, evenly spread', text: 'The matter is set in the ash pit and heated hotter still; the ashes insulate and spread the heat around the vessel.', use: 'Heats beyond boiling water, still even.' },
  { n: 3, latin: 'Balneum Arenae', name: 'The sand bath', heat: 'higher, without hot spots', text: 'Set up like the water bath but holding a higher heat; it heats evenly, avoids hot spots, and at high heats supports a vessel that might otherwise deform.', use: 'Oils and substances boiling above water.' },
  { n: 4, latin: 'Balneum Ignis', name: 'Bathed in flame', heat: 'as hot as the furnace will go', text: 'A naked flame, as hot as you can make it in your furnace.', use: 'Calcinations and fusions.' },
];

export function Alchemy({ self, profile, now, place }: { self: Self; profile: Profile; now: Date; place: Place }) {
  const root = useRef<HTMLDivElement>(null);
  const minute = Math.floor(now.getTime() / 60000);
  const s = useMemo(() => sky(now), [minute]);
  const mI = opIndex(s.moon), sI = opIndex(s.sun);
  const op = OPERATIONS[mI], monthOp = OPERATIONS[sI];
  const until = useMemo(() => nextChange(now, (x) => opIndex(x.moon), 72), [mI, Math.floor(minute / 30)]);
  const vd = useMemo(() => vedicDay(now, place.lat, place.lon), [minute, place.lat, place.lon]);
  const dayN = WEEKDAY_RULER[vd.weekday];
  const dp = P7[dayN]!;
  const dayHours = vd.horas.filter((h) => h.ruler === dayN);
  const [stage, setStage] = useState<(typeof STAGES)[number]['k']>('nigredo');

  const p = self.psychic.root, d = self.destiny.root, nm = self.name?.reading.root ?? null;
  const birthWd = new Date(self.birth.y, self.birth.m - 1, self.birth.d, 12).getDay();
  const stars: { k: string; n: N }[] = [
    { k: 'Psyche', n: p }, { k: 'Destiny', n: d },
    ...(nm ? [{ k: 'Name', n: nm }] : []),
    { k: `Born on a ${WEEKDAY[birthWd]}`, n: WEEKDAY_RULER[birthWd] },
  ];
  const mine = [...new Set(stars.map((x) => x.n))];
  const bs = useMemo(() => birthSky(profile, self), [profile, self]);
  const bSun = opIndex(bs.at.sun), bEl = OPERATIONS[bSun].el;
  const bMoonA = opIndex(bs.start.moon), bMoonB = opIndex(bs.end.moon);
  const who = profile.name ? profile.name.split(' ')[0] : 'you';

  const fig = (id: FigId): ReactNode => {
    switch (id) {
      case 'essentials': return <figure className="figure opus-fig"><EssentialsTree /><figcaption>The book’s diagram: from the Prima Materia to the fixed and the volatile, the four Elements, and the Three Essentials.</figcaption></figure>;
      case 'elements': return <figure className="figure opus-fig"><ElementsSquare /><figcaption>Aristotle’s Elements: Fire hot and dry, Earth dry and cold, Water cold and wet, Air wet and hot.</figcaption></figure>;
      case 'spiral': return <figure className="figure opus-fig"><ElementSpiral /><figcaption>The rotation of the Elements: a corkscrew drawing them to a centre of balance, the Quintessence.</figcaption></figure>;
      case 'firecycle': return <figure className="figure opus-fig wide"><FireCycle /><figcaption>After the book’s diagram from The Golden Chain of Homer.</figcaption></figure>;
      case 'tree': return <figure className="figure opus-fig tree"><TreeOfLife mine={mine} /><figcaption>The Tree of Life in its Four Worlds. The spheres of your planets are lit.</figcaption></figure>;
      case 'zodiac': return <Zodiac mI={mI} />;
      case 'fires': return <Fires />;
      case 'week': return <SevenWeek today={vd.weekday} />;
      case 'fractions': return <TwelveFractions />;
      case 'hand': return <Hand />;
      case 'ores': return <Ores />;
      case 'golds': return <Golds />;
      case 'stages': return <StageSelector stage={stage} setStage={setStage} />;
      case 'herbs': return <Herbs today={vd.weekday} />;
      case 'planets': return <PlanetTable today={vd.weekday} />;
    }
  };

  const block = (b: Block, i: number): ReactNode => {
    switch (b.k) {
      case 'p': return <p key={i} className="book-p">{b.t}</p>;
      case 'h': return <header key={i} className="book-h">{b.eyebrow && <span className="eyebrow">{b.eyebrow}</span>}<h4>{b.t}</h4></header>;
      case 'quote': return <blockquote key={i} className="book-quote"><p>“{b.t}”</p><cite>{b.by}</cite></blockquote>;
      case 'list': {
        const L = b.ordered ? 'ol' : 'ul';
        return <div key={i} className="book-list">{b.title && <span className="eyebrow">{b.title}</span>}<L>{b.items.map((x) => <li key={x}>{x}</li>)}</L></div>;
      }
      case 'cards': return <div key={i} className="book-cards">{b.items.map((c) => <article key={c.title} className="mini-card"><h4>{c.title}{c.sub && <span className="latin muted"> · {c.sub}</span>}</h4><p className="small">{c.text}</p></article>)}</div>;
      case 'caution': return <div key={i} className="danger" role="note"><span className="danger-icon" aria-hidden="true">!</span><div><h3>The book warns</h3><p>{b.t}</p></div></div>;
      case 'claims': return <Claims key={i} b={b} />;
      case 'work': return <WorkCard key={i} w={WORKS[b.id]} index={`Work ${WORK_NO[b.id]}`} />;
      case 'fig': return <div key={i} className="book-fig">{fig(b.id)}</div>;
    }
  };

  return (
    <div className="opus" ref={root}>
      <ScrollProgress target={root} />

      {/* --------------------------------------------------------------- hero */}
      <section className="opus-hero" aria-labelledby="opus-title">
        <Embers />
        <div className="opus-hero-text">
          <span className="eyebrow">Alchemy · Robert Allen Bartlett, <i>Real Alchemy: A Primer of Practical Alchemy</i> (2006)</span>
          <h1 id="opus-title"><span className="gold">The Great Work</span></h1>
          <p className="lede">
            The whole book, chapter by chapter, as it gives it: <span className="latin">separate, purify, reunite.</span> Every process is set out step by step with the purpose of each step, and the Moon chooses the operation of the day.
          </p>
          <div className="today-pill" style={tone('citrin')}>
            <span className="eyebrow">Moon in {op.sign} · today’s operation</span>
            <span className="op-mini gold">{op.name}</span>
          </div>
          <nav className="chapter-chips" aria-label="The four stages">
            {STAGE_HEADS.map((c) => (
              <button key={c.k} style={tone(c.k)} onClick={() => goTo(`stage-${c.k}`)}>
                <i aria-hidden="true" />{c.roman} · {c.latin}
              </button>
            ))}
          </nav>
        </div>
        <OperationWheel moon={s.moon} sun={s.sun} />
      </section>
      <p className="note">The wheel of the book’s twelve operations, Aries at the top. The pale disc is the Moon, which picks the day’s operation; the gold disc the Sun, which picks the month’s. Signs here are tropical, as in Western alchemy, so they run about 24° ahead of the sidereal signs on the Today page.</p>

      {/* --------------------------------------------------------------- today */}
      <section className="section" aria-labelledby="opus-today">
        <header className="sub-head"><span className="eyebrow">Today in the Work</span><h3 id="opus-today">{WEEKDAY[vd.weekday]}: {op.name} under a {s.waxing ? 'waxing' : 'waning'} Moon</h3></header>
        <div className="today-op" style={tone('citrin')}>
          <article className="op-card">
            <div className="op-top">
              <span className="op-sign" style={{ color: EL_COLOR[op.el] }}>{op.glyph}{'︎'}</span>
              <div>
                <span className="eyebrow">Moon in {op.sign} · {ELEMENTS[op.el].name} · {op.mode} · {op.planet} {op.pol}</span>
                <h2 className="op-name gold">{op.name}</h2>
                {until && <span className="small muted">Until {shortDay(until)} {hm(until)}, then {OPERATIONS[(mI + 1) % 12].name}</span>}
              </div>
            </div>
            <dl className="op-rows">
              <div><dt>In the vessel</dt><dd>{op.what}</dd></div>
              <div><dt>Purpose</dt><dd>{op.why}</dd></div>
              <div><dt>In you</dt><dd>{op.inner}</dd></div>
            </dl>
            <p className="op-prompt latin">{op.prompt}</p>
          </article>
          <div className="today-side">
            <article className="mini-card">
              <span className="eyebrow">The Moon’s disposition</span>
              <h4>{s.waxing ? 'Waxing: enrich and exalt' : 'Waning: separate the pure from the impure'}</h4>
              <p className="small muted">
                {s.waxing
                  ? 'The book: good for enriching an essential by circulations or distillations; its magnetic pull draws things up, volatilising, exalting and spiritualising them.'
                  : 'The book: good for separating the pure from the impure, by distillation, extraction or calcination; like the dying moonlight, the matter gives up its essence.'}
                {' '}{Math.round(s.illum * 100)}% lit.
              </p>
            </article>
            <article className="mini-card">
              <span className="eyebrow">The day’s planet</span>
              <div className="day-planet">
                <MetalChip k={dp.metalKey} label={dp.metal} />
                <div>
                  <h4><span style={pc(dayN)} className="pc">{dp.glyph}{'︎'} {dp.planet}</span> · {dp.metal}</h4>
                  <p className="small muted">Organ: {dp.organ.toLowerCase()} · Sephira: {dp.sephira}</p>
                </div>
              </div>
              <p className="small">Its herbs (the book’s appendix): <HerbList list={dp.herbs} />.</p>
              <p className="small muted">
                {dp.planet}’s hours today: {dayHours.map((h) => `${hm(h.start)}–${hm(h.end)}`).join(', ')}. The book: work on the day whose planet rules the herb, preferably within the hour after sunrise.
              </p>
            </article>
            <article className="mini-card">
              <span className="eyebrow">The month’s operation</span>
              <h4>Sun in {monthOp.sign}: {monthOp.name}</h4>
              <p className="small muted">{monthOp.why}</p>
            </article>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- interior stars */}
      <section className="section" aria-labelledby="opus-stars">
        <header className="sub-head">
          <span className="eyebrow">Interior stars</span>
          <h3 id="opus-stars">{profile.name ? `The metals of ${who}` : 'Your metals'}</h3>
          <p>The book calls the planetary representatives in man’s occult anatomy our “Interior Stars”. Each of your numbers has its planet, and each of the seven planets its metal, organ and sphere on the Tree. The qualities are the mental effects the book reports for each metal’s oil.</p>
        </header>
        <div className="stars">
          {stars.map((x) => {
            const pl = P7[x.n];
            return (
              <article key={x.k} className="star-card" style={pc(x.n)}>
                <MetalChip k={pl ? pl.metalKey : 'shadow'} size={64} label={pl ? pl.metal : 'No metal'} />
                <span className="eyebrow">{x.k}</span>
                <h4><span className="num pc">{x.n}</span> {NUM[x.n].planet}</h4>
                {pl ? (
                  <>
                    <p className="metal-name">{pl.metal}</p>
                    <p className="small muted">{pl.sephira}, {pl.sephiraEn.toLowerCase()} · {pl.organ.toLowerCase()}</p>
                    <p className="small">{pl.quality}</p>
                  </>
                ) : (
                  <p className="small muted">{NUM[x.n].planet} is a lunar node, not one of the seven planets of the book’s table, so it has no metal there.</p>
                )}
              </article>
            );
          })}
        </div>
        <div className="birth-el" style={{ '--el': EL_COLOR[bEl] } as CSSProperties}>
          <Glyph k={bEl} size={54} />
          <div>
            <span className="eyebrow">Born with the Sun in {OPERATIONS[bSun].sign} (tropical)</span>
            <h4>{ELEMENTS[bEl].name}: {ELEMENTS[bEl].qualities.toLowerCase()}</h4>
            <p className="small">
              {ELEMENTS[bEl].nature} On the psychological level, {ELEMENTS[bEl].mind.toLowerCase()}. The book: each person is born a zodiac type, predisposed to that sign’s temperament and organ weakness. Your birth sign’s operation is <b>{OPERATIONS[bSun].name}</b>
              {bMoonA === bMoonB || bs.exact
                ? <>, your birth Moon’s is <b>{OPERATIONS[bMoonA].name}</b>.</>
                : <>; your birth Moon’s is <b>{OPERATIONS[bMoonA].name}</b> or <b>{OPERATIONS[bMoonB].name}</b> (a birth time would settle it).</>}
            </p>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- contents */}
      <section className="section" aria-labelledby="opus-contents">
        <header className="sub-head"><span className="eyebrow">Contents</span><h3 id="opus-contents">The book, chapter by chapter</h3><p>{Object.keys(WORKS).length} works, every one in numbered steps with the purpose of each step.</p></header>
        <div className="toc">
          {STAGE_HEADS.map((h) => (
            <div key={h.k} className="toc-stage" style={tone(h.k)}>
              <span className="eyebrow"><i aria-hidden="true" />{h.roman} · {h.latin}</span>
              <ol>
                {BOOK.filter((c) => c.stage === h.k).map((c) => (
                  <li key={c.id}><button onClick={() => goTo(`book-${c.id}`)}><span className="toc-n">{c.n}</span>{c.title}</button></li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------------------- the book */}
      {STAGE_HEADS.map((h) => (
        <section key={h.k} className="stage" id={`stage-${h.k}`} style={tone(h.k)} aria-labelledby={`stage-${h.k}-h`}>
          <header className="stage-head">
            <span className="roman" aria-hidden="true">{h.roman}</span>
            <span className="latin stage-latin">{h.latin}</span>
            <h2 id={`stage-${h.k}-h`}>{h.title}</h2>
            <p>{h.lede}</p>
          </header>
          {BOOK.filter((c) => c.stage === h.k).map((c) => (
            <article key={c.id} className="chapter" id={`book-${c.id}`} aria-labelledby={`book-${c.id}-h`}>
              <header className="chapter-head">
                <span className="eyebrow">{c.n}</span>
                <h3 id={`book-${c.id}-h`}>{c.title}</h3>
              </header>
              {c.blocks.map(block)}
            </article>
          ))}
        </section>
      ))}

      {/* --------------------------------------------------------------- close */}
      <section className="opus-close" style={tone('rubedo')}>
        <span className="latin stage-latin">Ora et labora</span>
        <h2><span className="gold">You are the lead</span></h2>
        <p className="lede">The book: the attitude of the artist makes alchemy the Divine Art, and the true subject of the Great Work is the worker. As you work on your matter, it works on you.</p>
        <div className="today-pill" style={tone('citrin')}>
          <span className="eyebrow">Today’s operation, in you</span>
          <span className="small">{op.inner}</span>
        </div>
        <p className="note">After Robert Allen Bartlett, <i>Real Alchemy: A Primer of Practical Alchemy</i> (Quinquangle Press, 2006), restated chapter by chapter. Quotations are from public-domain texts. The wheel, the day’s reading and your interior stars apply the book’s correspondences to the live sky and your numbers.</p>
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
      <p className="note"><sup className="poison">†</sup> poisonous if swallowed. The book’s own instruction stands for every herb: consult a licensed physician before consuming herbal preparations.</p>
    </div>
  );
}

function PlanetTable({ today }: { today: number }) {
  const order = [0, 1, 2, 3, 4, 5, 6].map((wd) => PLANETS7.find((x) => x.weekday === wd)!);
  return (
    <div className="week-rows planet-table" role="table" aria-label="Planets, metals, organs and weekdays">
      <div role="row" className="head"><span role="columnheader">Planet</span><span role="columnheader">Metal</span><span role="columnheader">Organ</span><span role="columnheader">Weekday</span></div>
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
      <span className="eyebrow">The Seven Basics, one elixir for each day</span>
      <div className="week-rows" role="table" aria-label="The seven planetary days with their herbs and metals">
        {order.map((pl) => (
          <div key={pl.planet} role="row" className={pl.weekday === today ? 'today' : ''} style={pc(pl.n)}>
            <span role="cell" className="wd">{WEEKDAY[pl.weekday]}</span>
            <span role="cell" className="pl"><MetalChip k={pl.metalKey} size={20} /><b className="pc">{pl.glyph}{'︎'} {pl.planet}</b></span>
            <span role="cell" className="small"><HerbList list={pl.herbs} /></span>
            <span role="cell" className="small muted">{pl.organ}</span>
          </div>
        ))}
      </div>
      <p className="note"><sup className="poison">†</sup> poisonous if swallowed.</p>
    </div>
  );
}

function Zodiac({ mI }: { mI: number }) {
  return (
    <div className="twelve">
      {OPERATIONS.map((o, i) => (
        <article key={o.sign} className={`op-tile${i === mI ? ' now' : ''}`} aria-current={i === mI ? 'true' : undefined}>
          <div className="op-tile-top">
            <span className="op-glyph" style={{ color: EL_COLOR[o.el] }}>{o.glyph}{'︎'}</span>
            <span className="eyebrow">{o.sign} · {o.planet} {o.pol} · {ELEMENTS[o.el].name} · {o.mode}</span>
            {i === mI && <span className="tag yes">Moon here now</span>}
          </div>
          <h4>{o.name}</h4>
          <p className="small">{o.what}</p>
          <p className="why-line small"><b>Purpose</b> {o.why}</p>
          <p className="small muted"><b>In you:</b> {o.inner}</p>
        </article>
      ))}
    </div>
  );
}

function Fires() {
  return (
    <div className="fires">
      {FIRES.map((f) => (
        <article key={f.n} className="fire-card" style={{ '--heat': f.n } as CSSProperties}>
          <span className="heat" aria-hidden="true"><i /></span>
          <span className="eyebrow">Degree {f.n} · {f.heat}</span>
          <h4>{f.name}</h4>
          <p className="latin muted">{f.latin}</p>
          <p className="small">{f.text}</p>
          <p className="small muted"><b>For:</b> {f.use}</p>
        </article>
      ))}
    </div>
  );
}

function TwelveFractions() {
  const els: ElementK[] = ['fire', 'air', 'water', 'earth'];
  const ess: Essential[] = ['sulfur', 'mercury', 'salt'];
  return (
    <div className="fractions" role="table" aria-label="The twelve fractions of rain water and their signs">
      <span role="row" className="frow head"><span role="columnheader" />{els.map((e) => <span role="columnheader" key={e} style={{ color: EL_COLOR[e] }}><Glyph k={e} size={16} /> {ELEMENTS[e].name}</span>)}</span>
      {ess.map((x) => (
        <span role="row" className="frow" key={x}>
          <span role="rowheader"><Glyph k={x} size={16} /> {ESSENTIALS[x].name}</span>
          {els.map((e) => { const o = fraction(e, x); return <span role="cell" key={e}><b>{o.glyph}{'︎'} {o.sign}</b><small>{ESSENTIALS[x].name} of {ELEMENTS[e].name} of Water</small></span>; })}
        </span>
      ))}
    </div>
  );
}

function Hand() {
  return (
    <div className="hand">
      {HAND.map((h) => (
        <article key={h.salt} className="mini-card">
          <span className="eyebrow">{h.finger} · {h.emblem}</span>
          <h4>{h.salt} <span className="muted small">· {h.modern}</span></h4>
          <p className="small">{h.role}</p>
        </article>
      ))}
    </div>
  );
}

function Ores() {
  return (
    <div className="ores">
      {ORES.map((o) => {
        const pl = PLANETS7.find((x) => x.planet === o.planet)!;
        return (
          <article key={o.planet} className="ore" style={pc(pl.n)}>
            <MetalChip k={pl.metalKey} size={30} />
            <div><h4><span className="pc">{pl.glyph}{'︎'}</span> {o.planet} · {pl.metal}</h4><p className="small muted">{o.ore}</p></div>
          </article>
        );
      })}
    </div>
  );
}

function Golds() {
  return (
    <div className="golds">
      {GOLDS.map((g, i) => (
        <article key={g.name} className="gold-card">
          <MetalChip k="gold" size={36 + i * 6} />
          <div><h4>{g.name}</h4><p className="small muted">{g.text}</p></div>
        </article>
      ))}
    </div>
  );
}

const OIL_METAL: Record<string, MetalKey> = {
  'Oil of Antimony': 'antimony', 'Oil of Gold': 'gold', 'Oil of Silver': 'silver', 'Oil of Mercury': 'quicksilver',
  'Oil of Copper': 'copper', 'Oil of Iron': 'iron', 'Oil of Tin': 'tin', 'Oil of Lead': 'lead',
};
function Claims({ b }: { b: Extract<Block, { k: 'claims' }> }) {
  return (
    <div className="claims">
      <span className="eyebrow">{b.title}</span>
      {b.intro && <p className="small muted">{b.intro}</p>}
      <div className="claims-grid">
        {b.items.map((it) => (
          <article key={it.name} className="claim">
            <MetalChip k={OIL_METAL[it.name] ?? 'shadow'} size={40} />
            <div><h4>{it.name}</h4><p className="small">{it.text}</p></div>
          </article>
        ))}
      </div>
      {b.after && <p className="small muted">{b.after}</p>}
    </div>
  );
}

function StageSelector({ stage, setStage }: {
  stage: (typeof STAGES)[number]['k']; setStage: (k: (typeof STAGES)[number]['k']) => void;
}) {
  const st = STAGES.find((x) => x.k === stage)!;
  return (
    <div className="stages">
      <span className="eyebrow">The colours of the Work, and where you are in your own</span>
      <div className="gw-bar" role="radiogroup" aria-label="Stages of the Great Work">
        {STAGES.map((x) => (
          <button key={x.k} role="radio" aria-checked={stage === x.k} className={`gw ${x.k}`} onClick={() => setStage(x.k)}>
            <i aria-hidden="true" /><span className="latin">{x.latin}</span><small>{x.en}</small>
          </button>
        ))}
      </div>
      <div className="gw-detail">
        <p><b>In the flask:</b> {st.meaning}</p>
        <p><b>In you:</b> {st.inner}</p>
        <p className="op-prompt latin">{st.question}</p>
      </div>
    </div>
  );
}
