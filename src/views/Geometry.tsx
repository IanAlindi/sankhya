import { useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { N, Self, Profile } from '../lib/num';
import { dateToYMD, dateNumber } from '../lib/num';
import { NUM } from '../data/numbers';
import { P7 } from '../data/alchemy';
import { PLANET_MONEY } from '../data/wealth';
import { LESSONS, CONSTRUCTIONS, NUMBER_SHAPES, ELEMENT_ROWS, GEO_WORDS, elementOf, type Lesson } from '../data/geometry';
import { useStored } from '../lib/store';
import {
  ConstructionView, ShapeOf, PolygonSeed, Alternation, GoldenCut, Sunflower, GnomonGrow, Monochord, Lambda,
  BodyCanon, SolidView, Seal, WeekStar,
} from '../components/geo';
import { ScrollProgress } from '../components/opus';
import { pc } from '../components/viz';
import '../opus.css';
import '../opus-read.css';
import '../arts.css';

const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
const TAB_LABEL = { numbers: 'Numbers', alchemy: 'Alchemy', wealth: 'Wealth', today: 'Today', geometry: 'Geometry' } as const;

export function Geometry({ self, profile, now }: { self: Self; profile: Profile; now: Date }) {
  const root = useRef<HTMLDivElement>(null);
  const [li, setLi] = useStored('geo.lesson', 0);
  const [seen, setSeen] = useStored<number[]>('geo.seen', []);
  const [height, setHeight] = useStored('geo.height', 170);
  const i = Math.min(LESSONS.length - 1, Math.max(0, li));
  const lesson = LESSONS[i];
  const open = (k: number, scroll = true) => {
    setLi(k);
    if (!seen.includes(k)) setSeen([...seen, k].sort((a, b) => a - b));
    if (scroll) goTo('geo-lesson');
  };

  const p = self.psychic.root, d = self.destiny.root, nm = self.name?.reading.root ?? null;
  const today = dateNumber(dateToYMD(now));
  const mine: { k: string; n: N }[] = [{ k: 'Psyche', n: p }, { k: 'Destiny', n: d }, ...(nm ? [{ k: 'Name', n: nm }] : [])];
  const myEls = useMemo(() => new Set(mine.map((x) => elementOf(NUM[x.n].element))), [p, d, nm]);
  const who = profile.name ? profile.name.split(' ')[0] : 'you';

  return (
    <div className="opus geo" ref={root}>
      <ScrollProgress target={root} />

      {/* ------------------------------------------------------------------ hero */}
      <section className="geo-hero" aria-labelledby="geo-title">
        <div className="geo-hero-text">
          <span className="eyebrow">Sacred geometry · after Robert Lawlor, <i>Sacred Geometry: Philosophy and Practice</i></span>
          <h1 id="geo-title"><span className="gold">The shapes behind everything</span></h1>
          <p className="lede">Twelve ideas from the book, each drawn step by step with nothing but a compass and a straight edge. No maths needed: watch it draw, read why, then draw it yourself.</p>
          <div className="hero-actions">
            <button className="btn primary" onClick={() => open(seen.length && seen.length < LESSONS.length ? Math.min(LESSONS.length - 1, Math.max(...seen) + 1) : 0)}>
              {seen.length ? (seen.length < LESSONS.length ? 'Continue the lessons' : 'Back to the lessons') : 'Start the first lesson'}
            </button>
            <button className="btn ghost" onClick={() => goTo('geo-you')}>See your shapes</button>
          </div>
          <p className="small muted">{seen.length} of {LESSONS.length} ideas opened.</p>
        </div>
        <PolygonSeed />
      </section>
      <p className="note">The figure grows the shapes with three to nine sides out of one circle. Each one is drawn in the colour this site gives its number’s planet.</p>

      {/* ------------------------------------------------------------------ your shapes */}
      <section className="section" id="geo-you" aria-labelledby="geo-you-h">
        <header className="sub-head">
          <span className="eyebrow">Your shapes</span>
          <h3 id="geo-you-h">{profile.name ? `The geometry of ${who}` : 'The geometry of your numbers'}</h3>
          <p>Lawlor reads each number as a shape with a character; Johari gives it a planet. Here are both, for your numbers and for today.</p>
        </header>
        <div className="geo-you">
          <div className="shape-cards">
            {[...mine, { k: 'Today', n: today }].map((x) => {
              const s = NUMBER_SHAPES[x.n];
              return (
                <article key={x.k} className="shape-card" style={pc(x.n)}>
                  <ShapeOf n={x.n} size={74} label={`${s.shape}, for ${x.n}`} />
                  <div>
                    <span className="eyebrow">{x.k} · <b className="pc">{x.n}</b> · {NUM[x.n].planet}</span>
                    <h4>{s.shape}</h4>
                    <p className="small">{s.meaning}</p>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="seal-wrap">
            <Seal nums={mine} />
            <p className="note">Your seal: the shapes of your numbers in one circle, largest for your psyche. You can save it and draw it by hand, as the book asks you to draw every figure.</p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ the course */}
      <section className="section" id="geo-course" aria-labelledby="geo-course-h">
        <header className="sub-head">
          <span className="eyebrow">The twelve ideas</span>
          <h3 id="geo-course-h">From one point to the five perfect solids</h3>
          <p>The book in order. Each idea opens with one plain sentence, a figure you can step through, and where the book finds it in nature and in you. Pick any, or go in order.</p>
        </header>
        <nav className="path" aria-label="Lessons">
          {LESSONS.map((l, k) => (
            <button key={l.k} className={`path-node${k === i ? ' on' : ''}${seen.includes(k) ? ' seen' : ''}`} aria-current={k === i ? 'step' : undefined} onClick={() => open(k)}>
              <span className="path-n">{k + 1}</span>
              <span className="path-t">{l.title}</span>
            </button>
          ))}
        </nav>

        <article className="lesson" id="geo-lesson" aria-labelledby="lesson-title" key={lesson.k}>
          <div className="lesson-visual">
            <LessonVisual l={lesson} height={height} setHeight={setHeight} myEls={myEls} />
          </div>
          <div className="lesson-text">
            <span className="eyebrow">Idea {i + 1} of {LESSONS.length} · {lesson.short} · {lesson.pages}</span>
            <h3 id="lesson-title" className="lesson-title">{lesson.title}</h3>
            <p className="lesson-idea">{lesson.idea}</p>
            <div className="prose">{lesson.body.map((b) => <p key={b.slice(0, 24)}>{b}</p>)}</div>
            <div className="lesson-nature">
              <span className="eyebrow">Where the book finds it</span>
              <ul>{lesson.nature.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div className="lesson-bridges">
              <span className="eyebrow">How it connects to the rest of Sankhya</span>
              {lesson.bridges.map((b) => (
                <a key={b.text} href={`#${b.to}`} className="bridge"><b>{TAB_LABEL[b.to]}</b><span>{b.text}</span></a>
              ))}
            </div>
            <div className="lesson-nav">
              <button className="btn" onClick={() => open(i - 1)} disabled={i === 0}>‹ {i > 0 ? LESSONS[i - 1].title : 'Previous'}</button>
              <button className="btn primary" onClick={() => open(i + 1)} disabled={i === LESSONS.length - 1}>{i < LESSONS.length - 1 ? LESSONS[i + 1].title : 'Next'} ›</button>
            </div>
          </div>
        </article>
      </section>

      {/* ------------------------------------------------------------------ where the books meet */}
      <section className="section" id="geo-meet" aria-labelledby="geo-meet-h">
        <header className="sub-head">
          <span className="eyebrow">Where the four books meet</span>
          <h3 id="geo-meet-h">One number, four faces</h3>
          <p>Each book on this site reads the same nine numbers its own way. Johari gives the planet, Lawlor the shape, Bartlett the metal, and Miller the planet’s job in your money. Your numbers are marked.</p>
        </header>
        <div className="rosetta-wrap">
          <table className="rosetta">
            <thead><tr><th>Number</th><th>Planet <small>Johari</small></th><th>Shape <small>Lawlor</small></th><th>Metal <small>Bartlett</small></th><th>Money <small>Miller</small></th></tr></thead>
            <tbody>
              {([1, 2, 3, 4, 5, 6, 7, 8, 9] as N[]).map((n) => {
                const tags = mine.filter((x) => x.n === n).map((x) => x.k);
                const s = NUMBER_SHAPES[n], m = P7[n], money = PLANET_MONEY[n];
                return (
                  <tr key={n} className={tags.length ? 'is-mine' : ''} style={pc(n)}>
                    <td><b className="num pc">{n}</b>{tags.map((t) => <span key={t} className="tag yes">{t}</span>)}</td>
                    <td><span className="pc">{NUM[n].glyph}{'︎'} {NUM[n].planet}</span><small>{NUM[n].element}</small></td>
                    <td><span className="ros-shape"><ShapeOf n={n} size={30} /> {s.shape}</span><small>{s.meaning}</small></td>
                    <td>{m ? <>{m.metal}<small>{m.organ}</small></> : <small>Not one of the seven planets of alchemy</small>}</td>
                    <td>{money ? <>{money.role}<small>{money.job}</small></> : <small>A shadow planet; Miller works with the seven</small>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="meet-grid">
          <figure className="figure meet-star">
            <WeekStar highlight={p as N} />
            <figcaption>
              <b>The week is a star.</b> Put the seven planets round a circle in the old Chaldean order, slowest to fastest. Walking the circle gives the planetary hours, one planet after another. Jumping three places gives the days of the week: Sunday, Monday, Tuesday and so on. Miller’s two-week planetary challenge, one planet every other day from a Monday, walks the circle the other way, from the Moon up to Saturn. The book notes that seven, the number of cycles, is the one shape you cannot draw exactly from a circle.
            </figcaption>
          </figure>
          <div className="elements-table">
            <span className="eyebrow">The five elements in all four books</span>
            {ELEMENT_ROWS.map((r) => (
              <div key={r.k} className={`el-row${myEls.has(r.k) ? ' is-mine' : ''}`} style={{ '--el': r.color } as CSSProperties}>
                <b>{r.name}</b>
                <span><i>Lawlor</i> {r.solidName}, {r.faces}</span>
                <span><i>Miller</i> {r.sphere.toLowerCase()}, {r.sphereColour}</span>
                <span><i>Johari</i> {([1, 2, 3, 4, 5, 6, 7, 8, 9] as N[]).filter((n) => elementOf(NUM[n].element) === r.k).map((n) => `${n} ${NUM[n].planet}`).join(', ')}</span>
                {myEls.has(r.k) && <span className="tag yes">Yours</span>}
              </div>
            ))}
            <p className="small muted">Bartlett’s alchemy works with the four elements and the fifth that holds them; see the Alchemy page.</p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ words */}
      <section className="section" aria-labelledby="geo-words-h">
        <div className="glossary">
          <span className="eyebrow">Words you will meet</span>
          <h3 id="geo-words-h" className="sr-only">Glossary</h3>
          <dl>{GEO_WORDS.map((w) => <div key={w.w}><dt>{w.w}</dt><dd>{w.d}</dd></div>)}</dl>
        </div>
      </section>

      <section className="section geo-close">
        <div className="today-pill">
          <span className="eyebrow">How to practise</span>
          <p>Get a compass, a ruler without markings, a sharp pencil and squared paper. Take one figure a day and draw it slowly, step by step. The book’s promise is that the understanding comes through the hand, not through the sums.</p>
        </div>
      </section>
    </div>
  );
}

function LessonVisual({ l, height, setHeight, myEls }: { l: Lesson; height: number; setHeight: (h: number) => void; myEls: Set<string> }) {
  const [tab, setTab] = useState(0);
  const [solidK, setSolidK] = useState(0);
  if (l.k in CONSTRUCTIONS && l.k !== 'golden') return <ConstructionView c={CONSTRUCTIONS[l.k]} />;
  switch (l.k) {
    case 'golden': {
      const tabs = ['Draw it', 'Cut a line', 'Grow a sunflower'];
      return (
        <div className="visual-tabs">
          <div className="seg" role="tablist">{tabs.map((t, k) => <button key={t} role="tab" aria-pressed={tab === k} aria-selected={tab === k} onClick={() => setTab(k)}>{t}</button>)}</div>
          {tab === 0 && <ConstructionView c={CONSTRUCTIONS.golden} />}
          {tab === 1 && <GoldenCut />}
          {tab === 2 && <Sunflower />}
        </div>
      );
    }
    case 'alternation': return <Alternation />;
    case 'gnomon': return <GnomonGrow />;
    case 'music': return <div className="visual-stack"><Monochord /><figure className="figure"><Lambda /><figcaption>The Lambda: Plato’s two ladders of the World Soul, doubling down the left and tripling down the right. Along each row every number is three-halves of the one before it: 4, 6, 9 and 8, 12, 18, 27. That step is the musical fifth.</figcaption></figure></div>;
    case 'body': return <BodyCanon height={height} setHeight={setHeight} />;
    case 'solids': {
      const r = ELEMENT_ROWS[solidK];
      return (
        <div className="solids">
          <div className="seg" role="tablist">{ELEMENT_ROWS.map((x, k) => <button key={x.k} role="tab" aria-pressed={solidK === k} aria-selected={solidK === k} onClick={() => setSolidK(k)}>{x.solidName}{myEls.has(x.k) ? ' ★' : ''}</button>)}</div>
          <SolidView k={r.solid} color={r.color} />
          <dl className="register solid-facts">
            <div><dt>Element</dt><dd style={{ color: r.color }}>{r.name}{myEls.has(r.k) && <span className="tag yes" style={{ marginLeft: 8 }}>Your element</span>}</dd></div>
            <div><dt>Faces</dt><dd>{r.faces}</dd></div>
            <div><dt>In Miller’s spheres</dt><dd>{r.sphere}: {r.sphereColour}</dd></div>
            <div><dt>As a sheath</dt><dd>{r.kosha}</dd></div>
          </dl>
        </div>
      );
    }
    default: return null;
  }
}
