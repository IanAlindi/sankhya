import { useMemo, useState } from 'react';
import {
  nameReading, NAME_SYSTEM_LABEL, loShuCounts, LO_SHU_PLANES, yantra, yantraConstant, psycheShare, yearNumber, ageOn,
  lifePath, dateToYMD, type N, type Self, type Profile, type NameSystem,
} from '../lib/num';
import { tzolkin } from '../lib/astro';
import { NUM, COMPOUND, relation, RELATION_LABEL, triad, fmtPeriod, WEEKDAY } from '../data/numbers';
import { birthSky } from '../lib/model';
import { VedicSquare, LoShuGrid, YantraGrid, pc } from '../components/viz';
import { Planet, RelTag, Row, SectionHead, list } from '../components/bits';

export function Numbers({ self, profile, now, onEdit }: { self: Self; profile: Profile; now: Date; onEdit: () => void }) {
  const today = dateToYMD(now);
  const p = self.psychic.root, d = self.destiny.root, nm = self.name?.reading.root ?? null;
  const yr = yearNumber(self.reckoned, today.y);
  const age = ageOn(self.birth, today);
  const share = psycheShare(age);
  const [tab, setTab] = useState<'psyche' | 'destiny' | 'name'>('psyche');
  const [layers, setLayers] = useState<N[]>(() => [...new Set([p, d, nm ?? p])]);
  const counts = loShuCounts(self.birth);
  const bs = useMemo(() => birthSky(profile, self), [profile, self]);
  const maya = tzolkin(self.birth);
  const born = new Date(self.birth.y, self.birth.m - 1, self.birth.d, 12);
  const info = NUM[p];

  const cards: { k: string; n: N; from: string; ex: boolean; note: string }[] = [
    { k: 'Psyche', n: p, from: `day ${self.reckoned.d}`, ex: self.psychic.exalted, note: 'How you see yourself' },
    { k: 'Destiny', n: d, from: `digits total ${self.destiny.compound}`, ex: self.destiny.exalted, note: 'How the world meets you' },
    ...(self.name ? [{ k: 'Name', n: self.name.reading.root, from: `letters total ${self.name.total}`, ex: self.name.reading.exalted, note: 'How you are called' }] : []),
    { k: `Year ${today.y}`, n: yr.root, from: `${yr.parts.join(' + ')} = ${yr.total}`, ex: false, note: 'Where you are in time' },
  ];

  const pairs: [string, N, string, N][] = [['Psyche', p, 'Destiny', d]];
  if (nm) pairs.push(['Psyche', p, 'Name', nm], ['Destiny', d, 'Name', nm]);
  const tri = triad([p, d, ...(nm ? [nm] : [])]);

  return (
    <>
      <section className="section" style={{ paddingTop: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'end' }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <span className="eyebrow">Your numbers</span>
            <h1 className="display" style={{ fontSize: 'var(--step-4)' }}>{profile.name || 'Unnamed'}</h1>
            <p className="muted">
              Born {WEEKDAY[born.getDay()]}, {born.toLocaleDateString([], { day: 'numeric', month: 'long', year: 'numeric' })}{profile.time ? ` at ${profile.time}` : ''} · {age} years
              {self.reckoned.d !== self.birth.d || self.reckoned.m !== self.birth.m ?` · counted from ${self.reckoned.d}/${self.reckoned.m} by the Hindu day` : ''}
            </p>
          </div>
          <button className="btn" onClick={onEdit}>Edit details</button>
        </div>
        <div className="four">
          {cards.map((c) => (
            <article key={c.k} style={pc(c.n)}>
              <span className="eyebrow">{c.k}</span>
              <span className="num pc">{c.n}</span>
              <h3><span className="pc">{NUM[c.n].planet}</span> <span className="deva muted" style={{ fontWeight: 400 }}>{NUM[c.n].deva}</span></h3>
              <span className="compound">{c.from}</span>
              {c.ex && <span><span className="tag exalt">Exalted</span></span>}
              <span className="small muted">{c.note}</span>
            </article>
          ))}
        </div>
        {!self.name && <p className="note">Add the name you are known by to get the third number. <button className="btn ghost" onClick={onEdit}>Add name</button></p>}
      </section>

      <section className="section">
        <div className="cols">
          <div style={{ display: 'grid', gap: 16 }}>
            <SectionHead eyebrow="Balance" title="Which number leads now">
              The book: the psychic number is "very powerful" until about 35 to 40; after that, destiny becomes more active and you begin to compromise what you want with what comes.
            </SectionHead>
            <div className="meter">
              <div className="bar">
                <span style={{ width: `${share * 100}%`, background: `var(--p${p})` }} />
                <span style={{ width: `${(1 - share) * 100}%`, background: `var(--p${d})` }} />
              </div>
              <div className="labels"><span>Psyche {p} · {Math.round(share * 100)}%</span><span>Destiny {d} · {Math.round((1 - share) * 100)}%</span></div>
            </div>
            <p className="small muted">At {age}, {share > 0.55 ? 'your psychic number still sets the tone' : share < 0.45 ? 'destiny carries more weight than your own wishes' : 'you are in the crossing, where the two trade places'}. This weighting is a reading of the book's text, not a figure it gives.</p>
          </div>
          <div style={{ display: 'grid', gap: 16 }}>
            <SectionHead eyebrow="Harmony" title="How your numbers meet each other" />
            <dl className="register">
              {pairs.map(([ak, a, bk, b]) => (
                <Row key={ak + bk} k={`${ak} · ${bk}`}>
                  <span style={pc(a)} className="pc num">{a}</span> <span className="muted">and</span> <span style={pc(b)} className="pc num">{b}</span>{' '}
                  <RelTag from={a} to={b} />
                  <span className="sub">{RELATION_LABEL[relation(a, b)].long}. {pairNote(ak, bk)}</span>
                </Row>
              ))}
              <Row k="As psychic, as destiny">
                {NUM[p].asPsychic}. <span className="muted">{NUM[d].asDestiny}.</span>
              </Row>
              {tri && <Row k="Triad">{tri === 'harmonious' ? 'You hold 3, 6 and 9, the triad the book calls compatible.' : 'Your numbers form a triad the book calls incompatible (3·5·7 or 2·5·7); expect to feel misread at times.'}</Row>}
            </dl>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHead eyebrow="Portraits" title="Read each dimension" />
        <div className="seg" role="group" aria-label="Choose a dimension">
          {(['psyche', 'destiny', 'name'] as const).map((t) => (
            <button key={t} aria-pressed={tab === t} onClick={() => setTab(t)}>{t === 'psyche' ? `Psyche ${p}` : t === 'destiny' ? `Destiny ${d}` : `Name ${nm ?? '–'}`}</button>
          ))}
        </div>
        {tab === 'psyche' && (
          <div className="cols">
            <div className="prose">
              <p className="lead">{info.psyche.portrait}</p>
              {self.reckoned.d >= 10 && COMPOUND[self.reckoned.d] && (
                <p><b>Born on the {self.reckoned.d}.</b> {COMPOUND[self.reckoned.d]}</p>
              )}
              {info.psyche.note && <p className="muted">{info.psyche.note}</p>}
              {self.twilight && self.altPsychic && (
                <p className="quote">
                  You were born before about 4 a.m. {profile.hinduDay
                    ? `These numbers count the Hindu day, which turns before sunrise; by the civil date you would be a ${self.altPsychic.root} (${NUM[self.altPsychic.root].planet}).`
                    : `By the Hindu day, which turns before sunrise, you would be a ${self.altPsychic.root} (${NUM[self.altPsychic.root].planet}).`} Read both portraits and notice which fits.
                </p>
              )}
              <p className="small muted">Qualities the book gives the {info.planet}: {info.qualities}.</p>
            </div>
            <div className="lists">
              <div><span className="eyebrow">Light</span><ul>{info.psyche.light.map((x) => <li key={x}>{x}</li>)}</ul></div>
              <div><span className="eyebrow">Shadow</span><ul>{info.psyche.shadow.map((x) => <li key={x}>{x}</li>)}</ul></div>
              <div><span className="eyebrow">Practice</span><ul>{info.psyche.practice.map((x) => <li key={x}>{x}</li>)}</ul></div>
            </div>
          </div>
        )}
        {tab === 'destiny' && (
          <div className="prose">
            <p className="lead">{NUM[d].destiny}</p>
            <p>Your destiny compound is {self.destiny.compound}. The book reads the digits inside it as well: here {String(self.destiny.compound).split('').join(' and ')} colour the {d}, the first digit more than the second.{self.destiny.exalted ? ` A ${d} reached from ${self.destiny.compound} is exalted, which the book reads as a balanced, more successful form of the number.` : ''}</p>
            <p className="muted">The book ties destiny to past actions: you are free in what you do, less free in what comes back. It advises effort without fixing on the result.</p>
          </div>
        )}
        {tab === 'name' && <NamePanel self={self} profile={profile} />}
      </section>

      <section className="section">
        <SectionHead eyebrow="Geometry" title="Your numbers as figures">
          The book suggests laying your three patterns from the Vedic Square over one another to see how they relate. The Lo Shu grid places the digits of your birth date on the oldest magic square; the yantra is your planet's own square.
        </SectionHead>
        <div className="cols">
          <figure className="figure" style={{ margin: 0 }}>
            <div className="toggles" role="group" aria-label="Patterns to draw">
              {[...new Set<N>([p, d, ...(nm ? [nm] : []), ...[1, 2, 3, 4, 5, 6, 7, 8, 9] as N[]])].map((n) => (
                <button key={n} style={pc(n)} aria-pressed={layers.includes(n)}
                  onClick={() => setLayers(layers.includes(n) ? layers.filter((x) => x !== n) : [...layers, n])}>
                  <i />{n}{n === p ? ' psyche' : n === d ? ' destiny' : n === nm ? ' name' : ''}
                </button>
              ))}
            </div>
            <VedicSquare layers={layers} />
            <figcaption>The Vedic Square: row × column, reduced to one digit. Each number's cells joined point to point.</figcaption>
          </figure>
          <div style={{ display: 'grid', gap: 26 }}>
            <figure className="figure" style={{ margin: 0 }}>
              <LoShuGrid counts={counts} />
              <figcaption>Digits of {self.birth.d}·{self.birth.m}·{self.birth.y} on the Lo Shu. Repeats are stacked; empty squares are numbers missing from your date.</figcaption>
              <div className="planes">
                {LO_SHU_PLANES.map((pl) => {
                  const have = pl.nums.filter((n) => counts[n]).length;
                  return (
                    <div key={pl.name}>
                      <span><b>{pl.name}</b> <span className="muted">{pl.nums.join('·')}</span></span>
                      <span className="small muted">{have === 3 ? 'complete: ' + pl.meaning : have === 0 ? 'empty: room to build' : `${have} of 3`}</span>
                    </div>
                  );
                })}
              </div>
            </figure>
            <figure className="figure" style={{ margin: 0 }}>
              <YantraGrid n={p} cells={yantra(p)} />
              <figcaption>Yantra of {info.planet}, as printed in the book. Every row, column and diagonal sums to {yantraConstant(p)}.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHead eyebrow="Attunement" title={`What the book prescribes for a ${p}`}>
          These are traditional correspondences for the psychic number. Use what helps you focus; nothing here replaces medical care.
        </SectionHead>
        <div className="cols">
          <dl className="register">
            <Row k="Colours">
              <span className="swatches">{info.colors.map((c) => <span className="swatch" key={c.name}><i style={{ background: c.hex }} />{c.name}</span>)}</span>
            </Row>
            <Row k="Stone">{info.gem}{info.gemAlt && <span className="sub">Substitutes: {info.gemAlt}</span>}</Row>
            <Row k="Deity · focus">{info.deity}<span className="sub">Meditate on {info.focus}.</span></Row>
            <Row k="Mantra"><i>{info.mantra}</i><span className="sub">{info.japa}.</span></Row>
            <Row k="Quiet day">{info.restDay}<span className="sub">The book keeps this day for a light fast and slower pace.</span></Row>
          </dl>
          <dl className="register">
            <Row k="Good days">{list(info.goodDays.map((x) => WEEKDAY[x]))}</Row>
            <Row k="Good dates">{info.goodDates.join(', ')}{info.alsoDates.length > 0 && <span className="sub">Also {info.alsoDates.join(', ')}. {info.datesNote ?? ''}</span>}</Row>
            <Row k="Strong periods">{info.strong.map(fmtPeriod).join('; ')}</Row>
            <Row k="Weak periods">{info.weak.map(fmtPeriod).join('; ')}{info.periodNote && <span className="sub">{info.periodNote}</span>}</Row>
            <Row k="Good years of life">Years that reduce to {list(info.harmoniousYears)}</Row>
          </dl>
        </div>
        <dl className="register" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', columnGap: 32 }}>
          <Row k="Element · metal">{info.element} · {info.metal}</Row>
          <Row k="Guna · humour">{info.guna} by nature, {info.aspect} in behaviour · {info.dosha}</Row>
          <Row k="Role">{info.role}</Row>
          <Row k="Direction · hour">{info.direction} · {info.hour}</Row>
          <Row k="Season · taste">{info.season} · {info.taste}</Row>
          <Row k="Karmic lesson">{info.lesson}</Row>
          <Row k="Suited work">{info.professions}</Row>
          <Row k="Business with">{list(info.business)}</Row>
          <Row k="Marriage with">{list(info.marriage)}</Row>
          <Row k="Romance with">{list(info.romance)}</Row>
        </dl>
      </section>

      <section className="section">
        <SectionHead eyebrow="Birth sky" title="Other lenses on the same day">
          The book asks a numerologist to know the Sun and Moon at birth too. These are computed, not looked up.
        </SectionHead>
        <dl className="register" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', columnGap: 32 }}>
          <Row k="Sun, sidereal">{bs.at.sunRashi.name} <span className="muted">({bs.at.sunRashi.western})</span> · ruled by <Planet n={bs.at.sunRashi.lord} /></Row>
          <Row k="Sun, tropical">{bs.at.tropicalSun}<span className="sub">The Western sign; it runs about 24 days ahead of the sidereal one.</span></Row>
          <Row k="Moon sign">
            {bs.exact || bs.start.moonRashi.name === bs.end.moonRashi.name ? bs.at.moonRashi.name : `${bs.start.moonRashi.name} or ${bs.end.moonRashi.name}`}
            {!bs.exact && bs.start.moonRashi.name !== bs.end.moonRashi.name && <span className="sub">The Moon changed sign that day; a birth time settles it.</span>}
          </Row>
          <Row k="Birth mansion">
            {bs.exact || bs.start.nakshatra.index === bs.end.nakshatra.index ? `${bs.at.nakshatra.name}, pada ${bs.at.nakshatra.pada}` : `${bs.start.nakshatra.name} or ${bs.end.nakshatra.name}`}
            {' '}· ruled by <Planet n={(bs.exact ? bs.at : bs.start).nakshatra.lord} />
            <span className="sub">Indian naming begins a child's name with this mansion's syllable.</span>
          </Row>
          <Row k="Lunar day at birth">{bs.at.tithi.paksha} {bs.at.tithi.name}</Row>
          <Row k="Maya birth day">{maya.tone} {maya.name}<span className="sub">{maya.meaning} · day {maya.position} of the 260-day count</span></Row>
          <Row k="Western life path">{lifePath(self.birth)}<span className="sub">The Pythagorean method: month, day and year reduced separately, 11, 22 and 33 kept whole.</span></Row>
        </dl>
      </section>
    </>
  );
}

function pairNote(a: string, b: string) {
  if (a === 'Psyche' && b === 'Destiny') return 'In harmony, this makes you firm and self-reliant.';
  if (a === 'Psyche' && b === 'Name') return 'Harmony here helps friendships and social life.';
  return 'The book says harmony here keeps a name remembered.';
}

function NamePanel({ self, profile }: { self: Self; profile: Profile }) {
  const [trial, setTrial] = useState('');
  const [system, setSystem] = useState<NameSystem>('johari');
  const shown = nameReading(profile.name, system);
  const t = trial.trim() ? nameReading(trial) : null;
  const p = self.psychic.root, d = self.destiny.root;
  if (!self.name) return <p className="muted">Add the name you are known by in your details to see this.</p>;
  const n = self.name.reading.root;
  return (
    <div className="cols">
      <div className="prose">
        <p className="lead">{NUM[n].name}</p>
        <p>The first letter, <b>{self.name.first}</b>, carries the most weight. Each word is read on its own too: {self.name.words.map((w) => `${w.word[0] + w.word.slice(1).toLowerCase()} is ${w.reading.root}`).join(', ')}. A first name works in the circle that uses it; the full name works in official papers and business.</p>
        <p className="muted">Name {n} with psyche {p}: {RELATION_LABEL[relation(p, n)].short.toLowerCase()}. With destiny {d}: {RELATION_LABEL[relation(d, n)].short.toLowerCase()}. Unlike your birth numbers, a name can be changed; the book suggests choosing one that agrees with psyche or destiny.</p>
      </div>
      <div style={{ display: 'grid', gap: 18, minWidth: 0 }}>
        <div className="seg" role="group" aria-label="Letter system">
          {(Object.keys(NAME_SYSTEM_LABEL) as NameSystem[]).map((s) => <button key={s} aria-pressed={system === s} onClick={() => setSystem(s)}>{NAME_SYSTEM_LABEL[s]}</button>)}
        </div>
        {shown && (
          <div className="letters">
            {shown.words.map((w, wi) => (
              <div className="word" key={wi}>
                <div className="cells">
                  {w.letters.map((l, i) => (
                    <span key={i} className={`cell${wi === 0 && i === 0 ? ' first' : ''}`} style={pc(((l.v - 1) % 9 + 1) as N)}>
                      <b>{l.ch}</b><span>{l.v}</span>
                    </span>
                  ))}
                </div>
                <span className="sum">= {w.total} → {w.reading.root}</span>
              </div>
            ))}
            <div className="word"><span className="eyebrow">Total</span><span className="num" style={{ fontSize: '2rem' }}>{shown.total} → <span style={pc(shown.reading.root)} className="pc">{shown.reading.root}</span></span></div>
          </div>
        )}
        <p className="small muted">The book's table gives H = 8, C = 2 and X = 6, where Cheiro's Chaldean gives H = 5, C = 3 and X = 5. The other systems are shown for comparison; everything else on this site uses the book's.</p>
        <div className="field">
          <label htmlFor="n-trial">Try another spelling or name</label>
          <input id="n-trial" value={trial} onChange={(e) => setTrial(e.target.value)} placeholder="e.g. a pen name" />
        </div>
        {t && (
          <p>
            <b>{trial}</b> = {t.total} → <span style={pc(t.reading.root)} className="pc num">{t.reading.root}</span> {NUM[t.reading.root].planet}.{' '}
            With psyche {p}: <RelTag from={p} to={t.reading.root} /> With destiny {d}: <RelTag from={d} to={t.reading.root} />
          </p>
        )}
      </div>
    </div>
  );
}
