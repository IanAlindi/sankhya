import { useMemo, useState } from 'react';
import type { Self, YMD, N } from '../lib/num';
import { addDays, dateToYMD, ymdKey, parseYMD } from '../lib/num';
import { VARA, type Place } from '../lib/astro';
import { NUM, WEEKDAY, MONTH, fmtPeriod, RELATION_LABEL, INTERACTION } from '../data/numbers';
import { dayModel, promptsFor } from '../lib/model';
import { Tesseract, HoraRing, pc } from '../components/viz';
import { Planet, RelTag, PeriodTag, Row, SectionHead, hm, sentence } from '../components/bits';
import { PlaceControl } from '../components/PlaceControl';
import { EntryForm } from './Journal';
import type { Entry } from '../lib/store';

export function Today({ self, sel, setSel, place, setPlace, now, journal, saveEntry }: {
  self: Self; sel: YMD; setSel: (v: YMD) => void; place: Place; setPlace: (p: Place) => void; now: Date;
  journal: Record<string, Entry>; saveEntry: (e: Entry) => void;
}) {
  const m = useMemo(() => dayModel(sel, place, now, self), [ymdKey(sel), place.lat, place.lon, Math.floor(now.getTime() / 60000), self]);
  const p = self.psychic.root, d = self.destiny.root, nm = self.name?.reading.root ?? null;
  const info = NUM[p];
  const prompts = useMemo(() => promptsFor(m, self), [m, self]);
  const [pi, setPi] = useState(0);
  const dims: { k: string; n: N; note: string }[] = [
    { k: 'Psyche', n: p, note: NUM[p].planet },
    { k: 'Destiny', n: d, note: NUM[d].planet },
    { k: 'Name', n: nm ?? p, note: nm ? NUM[nm].planet : 'add your name' },
    { k: 'Time', n: m.dateNum, note: `${NUM[m.dateNum].planet} · date` },
  ];
  const mineHoras: N[] = p === 4 || p === 7 ? info.friends.filter((x) => x !== 4 && x !== 7) : [p];
  const alsoHoras: N[] = [d, nm].filter((x): x is N => !!x && x !== 4 && x !== 7 && !mineHoras.includes(x));
  const myHours = m.vd.horas.filter((h) => mineHoras.includes(h.ruler));
  const wdPlanet = NUM[m.weekdayNum].planet;

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <span className="eyebrow">{m.isToday ? 'Today' : 'Viewing'} · {WEEKDAY[m.weekday]} {sel.d} {MONTH[sel.m - 1]} {sel.y} · {VARA[m.weekday]}</span>
          <h1>A <em style={pc(m.dateNum)} className="pc">{NUM[m.dateNum].planet}</em> date on a {wdPlanet} day.</h1>
          <p className="lede">
            For your {p}, ruled by {info.planet}, the date reads: {sentence(m.phrase)}. <RelTag from={p} to={m.dateNum} />
          </p>
          <div className="dims" aria-label="Your four dimensions">
            {dims.map((x) => (
              <div key={x.k} style={pc(x.n)}>
                <span className="k">{x.k}</span>
                <span className="num pc">{x.n}</span>
                <span className="p">{x.note}</span>
              </div>
            ))}
          </div>
          <div className="timebar">
            <button className="btn icon" onClick={() => setSel(addDays(sel, -1))} aria-label="Previous day">‹</button>
            <button className="btn" onClick={() => setSel(dateToYMD(new Date()))} disabled={m.isToday}>Today</button>
            <button className="btn icon" onClick={() => setSel(addDays(sel, 1))} aria-label="Next day">›</button>
            <label className="small muted" htmlFor="t-date" style={{ marginLeft: 6 }}>Go to</label>
            <input id="t-date" type="date" value={ymdKey(sel)} onChange={(e) => { const v = parseYMD(e.target.value); if (v) setSel(v); }} />
          </div>
        </div>
        <div className="instrument">
          <Tesseract nums={[p, d, nm ?? p, m.dateNum]} phase={(sel.y * 372 + sel.m * 31 + sel.d) % 997} sun={m.atInstant.sun - m.atInstant.ayan} moon={m.atInstant.moon - m.atInstant.ayan} />
        </div>
      </section>
      <p className="note">The instrument: a four-dimensional cube whose edges along each axis take the colour of one of your four numbers and turn at a speed set by it. The outer ring is the sidereal zodiac: the larger dot is the Sun, the smaller the Moon, and the bright arc between them is the lunar day.</p>

      <section className="section">
        <SectionHead eyebrow="Reading" title="This day, measured against you">
          The book reads a day by its date number, the planet ruling the weekday, and where you stand in your own season.
        </SectionHead>
        <div className="cols">
          <dl className="register">
            <Row k="Date number">
              <Planet n={m.dateNum} /> <span className="muted">from the {sel.d}{suffix(sel.d)}</span>{' '}
              {m.goodDate && <span className="tag yes">{m.goodDate === 'best' ? 'One of your best dates' : 'A good date for you'}</span>}
              <span className="sub">{RELATION_LABEL[m.rel].long}.</span>
            </Row>
            <Row k="Weekday">
              <Planet n={m.weekdayNum} /> <span className="muted">· {WEEKDAY[m.weekday]}</span>{' '}
              {m.goodDay && <span className="tag yes">Your day</span>} {m.restDay && <span className="tag">Your quiet day</span>}
              <span className="sub">{NUM[p].planet} reads {wdPlanet}: {sentence(NUM_PHRASE(p, m.weekdayNum))}.</span>
            </Row>
            <Row k="Whole date">
              <Planet n={m.fullNum} /> <span className="sub">{sel.d} + {sel.m} + {sel.y}, every digit added and reduced.</span>
            </Row>
            <Row k="Your season">
              <PeriodTag s={m.season} />
              <span className="sub">Strong: {info.strong.map(fmtPeriod).join('; ')}. Weak: {info.weak.map(fmtPeriod).join('; ')}.{info.periodNote ? ` ${info.periodNote}` : ''}</span>
            </Row>
            <Row k="Your year">
              <Planet n={m.yearNum} /> <span className="sub">{NUM[m.yearNum].year[0]} See Cycles for the whole year.</span>
            </Row>
          </dl>
          <dl className="register">
            <Row k="Moon">
              {m.atRise.tithi.paksha === 'Shukla' ? 'Waxing' : 'Waning'} · {m.atRise.tithi.name}, lunar day {m.atRise.tithi.day}
              <span className="sub">{m.atRise.waxing ? 'Waxing fortnight. The book times mantra repetition and new starts to this half.' : 'Waning fortnight: a time to finish and clear. Mantra cycles wait for the new moon.'}</span>
            </Row>
            <Row k="Moon's mansion">
              {m.atRise.nakshatra.name} <span className="muted">· pada {m.atRise.nakshatra.pada}</span> · ruled by <Planet n={m.atRise.nakshatra.lord} />{' '}
              <RelTag from={p} to={m.atRise.nakshatra.lord} />
            </Row>
            <Row k="Keep near you">
              <span className="swatches" style={{ gap: 6 }}>
                {info.colors.map((c) => <i key={c.name} title={c.name} style={{ width: 22, height: 22, borderRadius: '50%', background: c.hex, border: '1px solid var(--line)', display: 'inline-block' }} />)}
              </span>
              <span className="sub">{info.colors.map((c) => c.name).join(', ')} · {info.gem}</span>
            </Row>
            <Row k="Practice">
              {info.psyche.practice[(sel.d + sel.m) % info.psyche.practice.length]}
              <span className="sub">Lesson of your number: {info.lesson.toLowerCase()}.</span>
            </Row>
            <Row k="Maya count">
              {m.maya.tone} {m.maya.name} <span className="muted">· day {m.maya.position} of 260</span>
              <span className="sub">{m.maya.meaning}</span>
            </Row>
          </dl>
        </div>
      </section>

      <section className="section">
        <SectionHead eyebrow="Hours" title="When the day is yours">
          The Hindu day runs sunrise to sunrise. Its daylight and its night are each cut into twelve planetary hours, so they stretch with the seasons. The first hour belongs to the weekday's planet.
        </SectionHead>
        <div className="cols">
          <figure className="figure" style={{ margin: 0 }}>
            <HoraRing day={m.vd} now={m.isToday ? now : null} mine={mineHoras} also={alsoHoras} />
            <figcaption>
              Bright arcs: your {mineHoras.map((x) => NUM[x].planet).join(', ')} hours{p === 4 || p === 7 ? `, ${NUM[p].planet} having no hour of its own, so its friendly planets stand in` : ''}.
              {alsoHoras.length > 0 && ` Dashed: your destiny and name planets.`} Red: Rahu Kāla. Gold ticks: sunrise and sunset.
            </figcaption>
          </figure>
          <div style={{ display: 'grid', gap: 18, minWidth: 0 }}>
            <dl className="register">
              <Row k="Sunrise · sunset">{hm(m.vd.rise)} · {hm(m.vd.set)}{m.vd.approximate && <span className="sub">The Sun does not rise or set here today; times are nominal.</span>}</Row>
              <Row k="Rahu Kāla">{hm(m.vd.rahuKala.start)}–{hm(m.vd.rahuKala.end)}<span className="sub">An eighth of the daylight, fixed by weekday, traditionally left free of new beginnings.</span></Row>
              <Row k="Lunar day">{m.atRise.tithi.paksha} {m.atRise.tithi.name}{m.tithiEnds && <span className="sub">until {hm(m.tithiEnds)}{m.tithiEnds.getDate() !== sel.d ? ' next day' : ''}</span>}</Row>
              <Row k="Mansion">{m.atRise.nakshatra.name}{m.nakEnds && <span className="sub">until {hm(m.nakEnds)}{m.nakEnds.getDate() !== sel.d ? ' next day' : ''}</span>}</Row>
              <Row k="Yoga · Moon sign">{m.atRise.yoga} · {m.atRise.moonRashi.name} <span className="muted">({m.atRise.moonRashi.western})</span></Row>
            </dl>
            <div>
              <span className="eyebrow">Your hours {m.isToday ? 'today' : 'this day'}</span>
              <div className="hours" style={{ marginTop: 8 }}>
                {myHours.map((h) => {
                  const live = m.isToday && now >= h.start && now < h.end;
                  return (
                    <div key={h.index} className={live ? 'now' : ''} style={pc(h.ruler)}>
                      <span className="t">{hm(h.start)}–{hm(h.end)}</span>
                      <span><b className="pc">{NUM[h.ruler].planet}</b> {h.night ? <span className="muted">night</span> : ''}</span>
                      {live ? <span className="tag yes">Now</span> : <span />}
                    </div>
                  );
                })}
              </div>
            </div>
            <PlaceControl place={place} setPlace={setPlace} />
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHead eyebrow="Reflect" title="One question for the day" />
        <div className="cols">
          <div style={{ display: 'grid', gap: 16, alignContent: 'start' }}>
            <p className="prompt">{prompts[pi % prompts.length]}</p>
            <div><button className="btn ghost" onClick={() => setPi(pi + 1)}>Another question</button></div>
            <p className="note">The book asks you to test it against your own experience rather than accept it. Logging a few words each day lets the Journal show whether these numbers actually track your days.</p>
          </div>
          <EntryForm dateKey={ymdKey(sel)} existing={journal[ymdKey(sel)]} onSave={saveEntry} />
        </div>
      </section>
    </>
  );
}

const suffix = (d: number) => (d % 10 === 1 && d !== 11 ? 'st' : d % 10 === 2 && d !== 12 ? 'nd' : d % 10 === 3 && d !== 13 ? 'rd' : 'th');
const NUM_PHRASE = (a: N, b: N) => INTERACTION[a][b];
