import { useState } from 'react';
import { computeSelf, type N, type Self } from '../lib/num';
import { NUM, INTERACTION, relation, RELATION_LABEL } from '../data/numbers';
import type { Person } from '../lib/store';
import { SectionHead, sentence } from '../components/bits';
import { VedicSquare, pc } from '../components/viz';

const EXAMPLE: Person = { id: 'other-example', name: '', dob: '1992-03-09' };

export function Others({ self, active, people, onAdd, onSwitch }: {
  self: Self; active: Person; people: Person[]; onAdd: () => void; onSwitch: (id: string) => void;
}) {
  const others = people.filter((p) => p.id !== active.id);
  const [pick, setPick] = useState<string | null>(others[0]?.id ?? null);
  const person = others.find((x) => x.id === pick) ?? others[0] ?? EXAMPLE;
  const isExample = person.id === EXAMPLE.id;
  const them = computeSelf(person)!;
  const me = active.name || 'You';
  const they = person.name || `born ${person.dob}`;

  const rows: { k: string; a: N; b: N | null }[] = [
    { k: 'Psyche', a: self.psychic.root, b: them.psychic.root },
    { k: 'Destiny', a: self.destiny.root, b: them.destiny.root },
    { k: 'Name', a: self.name?.reading.root ?? self.psychic.root, b: them.name?.reading.root ?? null },
  ];
  const a = self.psychic.root, b = them.psychic.root;
  const info = NUM[a];
  const fits = (list: N[]) => (list.includes(b) ? 'listed' : 'not listed');

  return (
    <section className="section" style={{ paddingTop: 40 }}>
      <SectionHead eyebrow="Others" title={`${me}, beside someone else`}>
        The book compares like with like: psyche with psyche, destiny with destiny, name with name. Relations are not symmetrical; how a 1 meets a 5 is not how a 5 meets a 1, so both directions are shown.
      </SectionHead>
      <div className="cols">
        <div style={{ display: 'grid', gap: 14, minWidth: 0, alignContent: 'start' }}>
          <span className="eyebrow">Compare with</span>
          {others.length > 0 ? (
            <div className="people" role="group" aria-label="Choose someone to compare with">
              {others.map((x) => {
                const s = computeSelf(x);
                return (
                  <button key={x.id} aria-pressed={x.id === person.id} onClick={() => setPick(x.id)}>
                    <span>{x.name || 'Unnamed'} <span className="muted small">· {x.dob}</span></span>
                    <span className="mono small">{s?.psychic.root}·{s?.destiny.root}{s?.name ? `·${s.name.reading.root}` : ''}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="small muted">No one else is saved yet. Add a person and they appear here and in the bar at the top.</p>
          )}
          <div><button className="btn primary" onClick={onAdd}>Add a person</button></div>
        </div>
        <div style={{ display: 'grid', gap: 18, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'baseline' }}>
            <h3 className="display" style={{ fontSize: 'var(--step-2)' }}>{isExample ? 'Example: someone born 9 March 1992' : `${me} and ${they}`}</h3>
            {!isExample && <button className="btn" onClick={() => onSwitch(person.id)}>View as {person.name || 'them'}</button>}
          </div>
          {isExample && <p className="small muted">This example shows how a comparison reads.</p>}
          <div className="pair">
            {rows.map((r) => (
              <div key={r.k}>
                <span className="eyebrow">{r.k}</span>
                {r.b === null ? <span className="small muted">Add their name to compare name numbers.</span> : (
                  <>
                    <span className="num" style={{ fontSize: '2.2rem' }}>
                      <span style={pc(r.a)} className="pc">{r.a}</span> <span className="muted" style={{ fontSize: '1rem' }}>and</span> <span style={pc(r.b)} className="pc">{r.b}</span>
                    </span>
                    <span className="small"><b>{active.name ? active.name.split(' ')[0] : 'You'} meet{active.name ? 's' : ''} them:</b> {sentence(INTERACTION[r.a][r.b])}. <span className={`tag ${relation(r.a, r.b)}`}>{RELATION_LABEL[relation(r.a, r.b)].short}</span></span>
                    <span className="small muted"><b>They meet {active.name ? active.name.split(' ')[0] : 'you'}:</b> {sentence(INTERACTION[r.b][r.a])}.</span>
                  </>
                )}
              </div>
            ))}
          </div>
          <dl className="register">
            <div><dt>Business</dt><dd>{b} is {fits(info.business)} among the book's business numbers for a {a}.</dd></div>
            <div><dt>Marriage</dt><dd>{b} is {fits(info.marriage)} for marriage.</dd></div>
            <div><dt>Romance</dt><dd>{b} is {fits(info.romance)} for romance.</dd></div>
          </dl>
          <figure className="figure" style={{ margin: 0 }}>
            <VedicSquare layers={a === b ? [a] : [a, b]} />
            <figcaption>The psychic pattern of {me} ({NUM[a].planet}, {a}) laid over theirs ({NUM[b].planet}, {b}) on the Vedic Square.</figcaption>
          </figure>
          <p className="note">The book's chapters add gendered notes to many pairings. They are left out here; read any pairing as a tendency between two people, not a rule about either.</p>
        </div>
      </div>
    </section>
  );
}
