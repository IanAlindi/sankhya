import { useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { N, Self, Profile } from '../lib/num';
import { sky, vedicDay, nextChange, WEEKDAY_RULER, type Place } from '../lib/astro';
import { NUM, WEEKDAY } from '../data/numbers';
import { birthSky } from '../lib/model';
import {
  OPERATIONS, ELEMENTS, ESSENTIALS, KINGDOMS, PLANETS7, P7, CORE_OPS, FIRE_DEGREES, TIMELINE, STAGES,
  HAND, ORES, GOLDS, WORKS, WORLDS, SEPHIROTH, fraction, opIndex, type Essential, type ElementK,
} from '../data/alchemy';
import {
  Embers, OperationWheel, EssentialsTree, ElementsSquare, ElementSpiral, TreeOfLife, MetalChip,
  WorkCard, ScrollProgress, Glyph, EL_COLOR,
} from '../components/opus';
import { hm } from '../components/bits';
import { pc } from '../components/viz';
import '../opus.css';

type StageK = 'nigredo' | 'albedo' | 'citrin' | 'rubedo';
const tone = (k: StageK) => ({ '--stage': `var(--${k})`, '--stage-ink': `var(--${k}-ink)` }) as CSSProperties;
const CHAPTERS: { id: string; k: StageK; roman: string; latin: string; title: string }[] = [
  { id: 'opus-1', k: 'nigredo', roman: 'I', latin: 'Nigredo', title: 'Theory before the fire' },
  { id: 'opus-2', k: 'albedo', roman: 'II', latin: 'Albedo', title: 'The laboratory' },
  { id: 'opus-3', k: 'citrin', roman: 'III', latin: 'Citrinitas', title: 'Plants and waters' },
  { id: 'opus-4', k: 'rubedo', roman: 'IV', latin: 'Rubedo', title: 'Fire, the Tree and the Stone' },
];
const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });

function Chapter({ c, lede, children }: { c: (typeof CHAPTERS)[number]; lede: ReactNode; children: ReactNode }) {
  return (
    <section className="stage" id={c.id} style={tone(c.k)} aria-labelledby={`${c.id}-h`}>
      <header className="stage-head">
        <span className="roman" aria-hidden="true">{c.roman}</span>
        <span className="latin stage-latin">{c.latin}</span>
        <h2 id={`${c.id}-h`}>{c.title}</h2>
        <p>{lede}</p>
      </header>
      {children}
    </section>
  );
}

function Sub({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <header className="sub-head">
      <span className="eyebrow">{eyebrow}</span>
      <h3>{title}</h3>
      {children && <p>{children}</p>}
    </header>
  );
}

const shortDay = (d: Date) => d.toLocaleDateString([], { weekday: 'short' });

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
  const st = STAGES.find((x) => x.k === stage)!;

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

  return (
    <div className="opus" ref={root}>
      <ScrollProgress target={root} />

      {/* --------------------------------------------------------------- hero */}
      <section className="opus-hero" aria-labelledby="opus-title">
        <Embers />
        <div className="opus-hero-text">
          <span className="eyebrow">Alchemy · after Robert Allen Bartlett, <i>Real Alchemy</i> (2006)</span>
          <h1 id="opus-title"><span className="gold">The Great Work</span></h1>
          <p className="lede">
            The whole method fits in three words: <span className="latin">separate, purify, reunite.</span> Every process from the book is set out
            below, step by step, with the reason for each step. The Moon decides which operation the day belongs to.
          </p>
          <div className="today-pill" style={tone('citrin')}>
            <span className="eyebrow">Moon in {op.sign} · today's operation</span>
            <span className="op-mini gold">{op.name}</span>
          </div>
          <nav className="chapter-chips" aria-label="Chapters">
            {CHAPTERS.map((c) => (
              <button key={c.id} style={tone(c.k)} onClick={() => goTo(c.id)}>
                <i aria-hidden="true" />{c.roman} · {c.latin}
              </button>
            ))}
          </nav>
        </div>
        <OperationWheel moon={s.moon} sun={s.sun} />
      </section>
      <p className="note">The wheel: the twelve operations of the zodiac, Aries at the top. The pale disc is the Moon, which picks the day's operation; the gold disc is the Sun, which picks the month's. Signs here are tropical, as in Western alchemy, so they run about 24° ahead of the sidereal signs on the Today page.</p>

      {/* --------------------------------------------------------------- today */}
      <section className="section" aria-labelledby="opus-today">
        <Sub eyebrow="Today in the Work" title={`${WEEKDAY[vd.weekday]}: ${op.name} under a ${s.waxing ? 'waxing' : 'waning'} Moon`} />
        <div className="today-op" style={tone('citrin')}>
          <article className="op-card">
            <div className="op-top">
              <span className="op-sign" style={{ color: EL_COLOR[op.el] }}>{op.glyph}{'︎'}</span>
              <div>
                <span className="eyebrow">Moon in {op.sign} · {ELEMENTS[op.el].name} · {op.mode} · ruled by {op.planet}</span>
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
              <span className="eyebrow">The Moon's direction</span>
              <h4>{s.waxing ? 'Waxing: enrich and exalt' : 'Waning: separate the pure from the impure'}</h4>
              <p className="small muted">
                {s.waxing
                  ? 'Its pull draws things upward. The book times circulations and distillations that raise and enrich to this half.'
                  : 'The dying light favours extraction, calcination and every work of separating, as the matter gives up its essence.'}
                {' '}{Math.round(s.illum * 100)}% lit.
              </p>
            </article>
            <article className="mini-card">
              <span className="eyebrow">The day's planet</span>
              <div className="day-planet">
                <MetalChip k={dp.metalKey} label={dp.metal} />
                <div>
                  <h4><span style={pc(dayN)} className="pc">{dp.glyph}{'︎'} {dp.planet}</span> · {dp.metal}</h4>
                  <p className="small muted">Organ: {dp.organ.toLowerCase()} · Sephira: {dp.sephira}</p>
                </div>
              </div>
              <p className="small">Its plants: {dp.herbs.join(', ')}.</p>
              <p className="small muted">
                {dp.planet}'s hours today: {dayHours.map((h) => `${hm(h.start)}–${hm(h.end)}`).join(', ')}. The book's rule: begin a plant's work on its planet's day, in the first of those hours, the hour after sunrise.
              </p>
            </article>
            <article className="mini-card">
              <span className="eyebrow">The month's operation</span>
              <h4>Sun in {monthOp.sign}: {monthOp.name}</h4>
              <p className="small muted">{monthOp.why}</p>
            </article>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- interior stars */}
      <section className="section" aria-labelledby="opus-stars">
        <Sub eyebrow="Interior stars" title={profile.name ? `The metals of ${who}` : 'Your metals'}>
          The old texts call the planets inside a person "interior stars". Each of your numbers has its planet, and each of the seven classical planets has a metal, an organ and a sphere on the Tree of Life. The qualities are what tradition ascribes to each metal: a lens for reflection, nothing to swallow.
        </Sub>
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
                  <p className="small muted">{NUM[x.n].planet} is a lunar node, not one of the seven classical planets, so the Western table gives it no metal. A shadow: felt, never handled.</p>
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
              {ELEMENTS[bEl].nature} On the inner level, {ELEMENTS[bEl].mind.toLowerCase()}. Your birth sign's operation is <b>{OPERATIONS[bSun].name}</b>
              {bMoonA === bMoonB || bs.exact
                ? <>, your birth Moon's is <b>{OPERATIONS[bMoonA].name}</b>.</>
                : <>; your birth Moon's is <b>{OPERATIONS[bMoonA].name}</b> or <b>{OPERATIONS[bMoonB].name}</b> (a birth time would settle it).</>}
            </p>
          </div>
        </div>
      </section>

      {/* =============================================================== I · NIGREDO */}
      <Chapter c={CHAPTERS[0]} lede="The old masters said: know the theory before you touch the practice. Everything in the laboratory rests on two laws, four elements and three essentials.">
        <div className="cols">
          <article className="law">
            <span className="eyebrow">First law · All is from One</span>
            <p className="emerald latin">"That which is below is like that which is above, and that which is above is like that which is below, to accomplish the miracle of the one thing."</p>
            <p className="small muted">The Emerald Tablet of Hermes. Everything, seen and unseen, is one living substance differing only in its rate of vibration. The alchemists called it the prima materia, the first matter, the celestial fire.</p>
          </article>
          <article className="law">
            <span className="eyebrow">Second law · Polarity</span>
            <h4>The One divides into volatile and fixed</h4>
            <p className="small muted">An active energy of life (celestial niter) and a passive energy of matter (celestial salt): two halves of one wave. Life works through Fire and Air; matter through Water and Earth.</p>
            <div className="polarity" aria-hidden="true"><svg viewBox="0 0 300 60"><path d="M0 30 Q 37.5 -10 75 30 T 150 30 T 225 30 T 300 30" fill="none" stroke="var(--gold-2)" strokeWidth="2" /></svg></div>
          </article>
        </div>

        <div className="cols" style={{ alignItems: 'center' }}>
          <figure className="figure opus-fig"><EssentialsTree />
            <figcaption>After the book's diagram: Fire acting on Air gives Sulfur, Air on Water gives Mercury, Water on Earth gives Salt. Earth alone acts on nothing and becomes the womb of the three.</figcaption>
          </figure>
          <div className="essentials">
            {(['sulfur', 'mercury', 'salt'] as Essential[]).map((k) => (
              <article key={k} className="ess-card">
                <Glyph k={k} size={36} />
                <div>
                  <h4>{ESSENTIALS[k].name} <span className="latin muted">· {ESSENTIALS[k].aspect}</span></h4>
                  <p className="small">{ESSENTIALS[k].nature}</p>
                  <p className="small muted"><b>In a plant:</b> {ESSENTIALS[k].plant} <b>In you:</b> {ESSENTIALS[k].you}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="cols" style={{ alignItems: 'center' }}>
          <div className="elements">
            {(['fire', 'air', 'water', 'earth'] as ElementK[]).map((k) => (
              <article key={k} className="el-card" style={{ '--el': EL_COLOR[k] } as CSSProperties}>
                <Glyph k={k} size={30} />
                <div>
                  <h4>{ELEMENTS[k].name} <span className="muted small">· {ELEMENTS[k].qualities.toLowerCase()}</span></h4>
                  <p className="small">{ELEMENTS[k].nature} {ELEMENTS[k].side}.</p>
                  <p className="small muted">In the psyche: {ELEMENTS[k].mind.toLowerCase()}.</p>
                </div>
              </article>
            ))}
            <p className="note">These are states of energy, not the fire in your stove or the water in your glass.</p>
          </div>
          <figure className="figure opus-fig"><ElementsSquare />
            <figcaption>Aristotle's square: each element is a pair of qualities, and changing one quality turns an element into its neighbour.</figcaption>
          </figure>
        </div>

        <Sub eyebrow="Three kingdoms" title="Everything is alive" >
          To the alchemist the vegetable, animal and mineral worlds all have body, soul and spirit. Nature is the greatest alchemist and has all of time; the laboratory only helps her along, removing what holds the matter back.
        </Sub>
        <div className="kingdoms">
          {KINGDOMS.map((k) => <article key={k.name} className="mini-card"><h4>{k.name}</h4><p className="small muted">{k.text}</p></article>)}
        </div>

        <Sub eyebrow="As above, so below" title="Timing is part of the recipe">
          Each planet has its sympathies: a metal, an organ, plants, colours, a day. You would not sow lettuce in the snow, and the alchemist does not start an operation against the sky. The simplest rule, which the Today panel above applies: watch whether the Moon waxes or wanes, and work on the day of the planet that rules your subject.
        </Sub>

        <Sub eyebrow="History" title="From Khem to Salt Lake City" />
        <ol className="timeline">
          {TIMELINE.map((t) => <li key={t.when}><span className="when">{t.when}</span><span>{t.what}</span></li>)}
        </ol>
      </Chapter>

      {/* =============================================================== II · ALBEDO */}
      <Chapter c={CHAPTERS[1]} lede={<><span className="latin">Ora et labora</span>, pray and work: the laboratory is an oratory where you labour. The book insists the artist's attitude shapes the result, and that a kitchen is enough to begin.</>}>
        <Sub eyebrow="The four degrees of fire" title="Control of the fire is the whole secret">
          The old masters called themselves fire philosophers. Start with the lowest heat that does the job and raise it slowly; a long gentle heat almost always beats a short fierce one.
        </Sub>
        <div className="fires">
          {FIRE_DEGREES.map((f) => (
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

        <Sub eyebrow="The operations" title="What each one does, and why" />
        <div className="ops-grid">
          {CORE_OPS.map((o) => (
            <article key={o.name} className="mini-card">
              <h4>{o.name}</h4>
              <p className="small">{o.what}</p>
              <p className="why-line small"><b>Purpose</b> {o.why}</p>
            </article>
          ))}
        </div>

        <Sub eyebrow="The zodiac of operations" title="Twelve operations, one for each sign">
          When the Moon stands in a sign, the subtle forces of its operation are held to be active. The book's table, with what each operation does in the vessel and in you.
        </Sub>
        <div className="twelve">
          {OPERATIONS.map((o, i) => (
            <article key={o.sign} className={`op-tile${i === mI ? ' now' : ''}`} aria-current={i === mI ? 'true' : undefined}>
              <div className="op-tile-top">
                <span className="op-glyph" style={{ color: EL_COLOR[o.el] }}>{o.glyph}{'︎'}</span>
                <span className="eyebrow">{o.sign} · {o.planet} {o.pol} · {o.mode}</span>
                {i === mI && <span className="tag yes">Moon here now</span>}
              </div>
              <h4>{o.name}</h4>
              <p className="small">{o.what}</p>
              <p className="why-line small"><b>Purpose</b> {o.why}</p>
              <p className="small muted"><b>In you:</b> {o.inner}</p>
            </article>
          ))}
        </div>

        <WorkCard w={WORKS.pattern} index="Work 1" />
        <WorkCard w={WORKS.basics} index="Work 2" after={<SevenWeek today={vd.weekday} />} />
        <WorkCard w={WORKS.rosemary} index="Work 3" />
      </Chapter>

      {/* =============================================================== III · CITRINITAS */}
      <Chapter c={CHAPTERS[2]} lede="Deeper plant medicines, then the strange and gentle work on rain itself. All of it rehearses, in miniature, the movement of the Great Work.">
        <WorkCard w={WORKS.magistery} index="Work 4" />
        <WorkCard w={WORKS.ens} index="Work 5" />
        <WorkCard w={WORKS.vegstone} index="Work 6" />
        <Sub eyebrow="Water works" title="Volatile and fixed">
          Alcohol is the plant world's volatile spirit; vinegar, wine's second death, is its fixed spirit. The book says unfixed tinctures warm and energise, fixed ones cool and contract. Then it turns to water, the only substance on Earth found as solid, liquid and gas at once, said to carry the Sun's "universal fire" down in the rain.
        </Sub>
        <WorkCard w={WORKS.rain} index="Work 7" />
        <WorkCard w={WORKS.sevenfold} index="Work 8" after={<TwelveFractions />} />
        <WorkCard w={WORKS.angel} index="Work 9" />
        <WorkCard w={WORKS.archaeus} index="Work 10" />
      </Chapter>

      {/* =============================================================== IV · RUBEDO */}
      <Chapter c={CHAPTERS[3]} lede="Back to the fire in its subtler forms, up the Tree of Life, and into the mineral works that end at the Stone. From here on, the works are for reading.">
        <div className="cols" style={{ alignItems: 'center' }}>
          <div className="prose">
            <Sub eyebrow="Return to the fire" title="One fire, from one root" />
            <p>In its subtlest form fire is the One itself: the celestial fire, gentle, invisible, known only by what it does, whose visible representative is the Sun. It has two faces. The <b>universal</b> fire is everywhere and keeps the seed of all things warm. The <b>particular</b> fire is planted in each thing with its seed and sleeps until it is woken.</p>
            <p>When the four elements of a thing are perfectly balanced, a fifth appears: the <span className="latin">quinta essentia</span>, its most purified and fixed part. Michael Sendivogius (1604) called it the seed: one seed everywhere, made different only by the womb it falls into and how long it is "cooked".</p>
          </div>
          <div className="golds">
            {GOLDS.map((g, i) => (
              <article key={g.name} className="gold-card">
                <MetalChip k="gold" size={36 + i * 6} />
                <div><h4>{g.name}</h4><p className="small muted">{g.text}</p></div>
              </article>
            ))}
            <p className="note">The three golds, after <i>The Hermetical Triumph</i> (1723).</p>
          </div>
        </div>

        <div className="cols" style={{ alignItems: 'center' }}>
          <figure className="figure opus-fig"><ElementSpiral />
            <figcaption>The rotation of the elements: Earth to Water to Air to Fire, a spiral that closes on the quintessence.</figcaption>
          </figure>
          <WorkCard w={WORKS.rotation} index="The pattern" />
        </div>

        <Sub eyebrow="Qabalah" title="The Tree of Life">
          Alchemy, astrology and Qabalah are the three pillars of the Hermetic art. The Tree maps how the One descends into matter and how it climbs back: ten spheres, twenty-two paths, four worlds. Your planets are lit.
        </Sub>
        <div className="cols" style={{ alignItems: 'start' }}>
          <figure className="figure opus-fig tree"><TreeOfLife mine={mine} /></figure>
          <div style={{ display: 'grid', gap: 18 }}>
            <dl className="register">
              {WORLDS.map((w) => (
                <div key={w.name}><dt>{w.name}</dt><dd>{w.en} world · {ELEMENTS[w.el].name} · {w.mind}</dd></div>
              ))}
            </dl>
            <p className="small muted">Three pillars: on the left Severity (Binah, Geburah, Hod: Saturn, Mars, Mercury), the receptive side; on the right Mercy (Chokmah, Chesed, Netzach: the zodiac, Jupiter, Venus), the active side; in the middle Equilibrium (Kether, Tiphareth, Yesod, Malkuth: the undivided light, Sun, Moon, Earth), which alone can hold every energy in balance.</p>
            <div className="sephira-list">
              {SEPHIROTH.filter((x) => x.n !== null && mine.includes(x.n)).map((x) => (
                <article key={x.i} className="mini-card" style={pc(x.n!)}>
                  <span className="eyebrow">Sphere {x.i}</span>
                  <h4><span className="pc">{x.name}</span> · {x.en}</h4>
                  <p className="small muted">The sphere of {x.ruler}, where your {NUM[x.n!].planet} lives on the Tree.</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="danger" role="note">
          <span className="danger-icon" aria-hidden="true">✕</span>
          <div>
            <h3>The mineral works: read, don't do</h3>
            <p>The book itself warns that plants forgive mistakes and minerals do not. These works use mercury, antimony, lead, arsenic-bearing ores, corrosive fumes and mixtures that are effectively gunpowder. Each work below gives every stage and its purpose so the tradition makes sense, with quantities and temperatures left out. Its claims that metallic "oils" cure disease are unproven, and none of these preparations should be swallowed.</p>
          </div>
        </div>

        <Sub eyebrow="The ores" title="A metal for each planet" />
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

        <WorkCard w={WORKS.menstrua} index="Work 11" />
        <WorkCard w={WORKS.ores} index="Work 12" />
        <WorkCard w={WORKS.acetate} index="Work 13" />

        <Sub eyebrow="Via sicca" title="The Hand of the Philosophers">
          Isaac Holland set five salts on one hand: the keys that unlock every mineral. Combined and distilled, they gave the old world its strong acids, aqua fortis and aqua regia. Their roles are below; the recipes are left out.
        </Sub>
        <div className="hand">
          {HAND.map((h) => (
            <article key={h.salt} className="mini-card">
              <span className="eyebrow">{h.finger} · {h.emblem}</span>
              <h4>{h.salt} <span className="muted small">· {h.modern}</span></h4>
              <p className="small">{h.role}</p>
            </article>
          ))}
        </div>

        <WorkCard w={WORKS.dry} index="Work 14" />
        <WorkCard w={WORKS.antimony} index="Work 15" />

        <div className="prose seed">
          <Sub eyebrow="The seed of metals" title="You won't grow a dog from wheat" />
          <p>The alchemists held that metals, too, grow from seed, slowly, in the womb of the earth, and that the seed ripens fully only in gold; in other metals it is green fruit. The salt, the body, is the womb that decides how the seed's fire will burn. Their rule: put the right seed in the right matrix, and nature does the rest. Look for a metal's seed in its own ore.</p>
        </div>

        <WorkCard w={WORKS.stone} index="Work 16" after={<StageSelector stage={stage} setStage={setStage} st={st} />} />
      </Chapter>

      {/* --------------------------------------------------------------- close */}
      <section className="opus-close" style={tone('rubedo')}>
        <span className="latin stage-latin">Ora et labora</span>
        <h2><span className="gold">You are the lead</span></h2>
        <p className="lede">Bartlett's teacher, Frater Albertus, defined alchemy as raising the vibratory rate, and the book's last word is that the true subject of the Work is the worker. Each operation in the vessel has a twin in you: what you calcine, dissolve, ferment and fix in yourself. As you work on your matter, it works on you.</p>
        <div className="today-pill" style={tone('citrin')}>
          <span className="eyebrow">Today's operation, in you</span>
          <span className="small">{op.inner}</span>
        </div>
        <p className="note">
          Sources: Robert Allen Bartlett, <i>Real Alchemy: A Primer of Practical Alchemy</i> (Quinquangle Press, 2006), summarised in fresh words. Plant rulers after Nicholas Culpeper's <i>Complete Herbal</i> (1653), listing only plants that are commonly eaten. Older lines quoted: the Emerald Tablet; George Ripley (15th c.); <i>The Golden Chain of Homer</i> (1723). Nothing here is medical advice; ask a doctor before taking any tincture.
        </p>
      </section>
    </div>
  );
}

function SevenWeek({ today }: { today: number }) {
  const order = [0, 1, 2, 3, 4, 5, 6].map((wd) => PLANETS7.find((p) => p.weekday === wd)!);
  return (
    <div className="week">
      <span className="eyebrow">The Seven Basics, one per day</span>
      <div className="week-rows" role="table" aria-label="The seven planetary days with their plants and metals">
        {order.map((pl) => (
          <div key={pl.planet} role="row" className={pl.weekday === today ? 'today' : ''} style={pc(pl.n)}>
            <span role="cell" className="wd">{WEEKDAY[pl.weekday]}</span>
            <span role="cell" className="pl"><MetalChip k={pl.metalKey} size={20} /><b className="pc">{pl.glyph}{'︎'} {pl.planet}</b></span>
            <span role="cell" className="small">{pl.herbs.join(', ')}</span>
            <span role="cell" className="small muted">{pl.organ}</span>
          </div>
        ))}
      </div>
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
          {els.map((e) => { const o = fraction(e, x); return <span role="cell" key={e}><b>{o.glyph}{'︎'} {o.sign}</b><small>{ESSENTIALS[x].name} of {ELEMENTS[e].name}</small></span>; })}
        </span>
      ))}
    </div>
  );
}

function StageSelector({ stage, setStage, st }: {
  stage: (typeof STAGES)[number]['k']; setStage: (k: (typeof STAGES)[number]['k']) => void; st: (typeof STAGES)[number];
}) {
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
