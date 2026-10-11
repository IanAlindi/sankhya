import { useMemo } from 'react';
import type { N } from '../lib/num';
import { NUM, RELATION_LABEL, relation } from '../data/numbers';
import { OPERATIONS, opIndex } from '../data/alchemy';
import { NUMBER_SHAPES } from '../data/geometry';
import { PLANET_MONEY } from '../data/wealth';
import { nextHora, type Place } from '../lib/astro';
import type { DayModel } from '../lib/model';
import { ShapeOf } from './geo';
import { hm } from './bits';
import { pc } from './viz';
import '../arts.css';

/** One line from each of the four books for the day being viewed, each linking to its page. */
export function ArtsToday({ m, psyche, now, place }: { m: DayModel; psyche: N; now: Date; place: Place }) {
  const op = OPERATIONS[opIndex(m.atInstant.moon)];
  const shape = NUMBER_SHAPES[m.dateNum];
  const dayN = m.vd.horas[0].ruler;
  const money = PLANET_MONEY[dayN];
  const from = m.isToday ? now : m.vd.rise;
  const jove = useMemo(() => nextHora(from, 3, place.lat, place.lon), [from.getTime(), place.lat, place.lon]);
  const rel = relation(psyche, m.dateNum);
  const joveText = jove
    ? (from >= jove.start && from < jove.end ? `Jupiter’s hour now, until ${hm(jove.end)}` : `Next hour of Jupiter: ${jove.start.toLocaleDateString([], { weekday: 'short' })} ${hm(jove.start)}`)
    : '';
  return (
    <div className="arts-today">
      <a className="art-tile" href="#numbers" style={pc(m.dateNum)}>
        <span className="art-k"><span>Numbers · Johari</span><span className="go">›</span></span>
        <span className="art-v"><b className="num pc">{m.dateNum}</b> A {NUM[m.dateNum].planet} date</span>
        <p>For your {psyche}, ruled by {NUM[psyche].planet}: {RELATION_LABEL[rel].long.toLowerCase()}.</p>
      </a>
      <a className="art-tile" href="#alchemy">
        <span className="art-k"><span>Alchemy · Bartlett</span><span className="go">›</span></span>
        <span className="art-v gold">{op.name}</span>
        <p>The Moon is in {op.sign}: a day for {op.name.toLowerCase()}. {op.why}</p>
      </a>
      <a className="art-tile" href="#geometry" style={pc(m.dateNum)}>
        <span className="art-k"><span>Geometry · Lawlor</span><span className="go">›</span></span>
        <span className="art-v"><ShapeOf n={m.dateNum} size={34} /> {shape.shape}</span>
        <p>The shape of {m.dateNum}: {shape.meaning}</p>
      </a>
      <a className="art-tile" href="#wealth" style={pc(dayN)}>
        <span className="art-k"><span>Wealth · Miller</span><span className="go">›</span></span>
        <span className="art-v"><span className="pc">{NUM[dayN].glyph}{'︎'}</span> {money?.role}</span>
        <p>{NUM[dayN].planet}’s day. {joveText}.</p>
      </a>
    </div>
  );
}
