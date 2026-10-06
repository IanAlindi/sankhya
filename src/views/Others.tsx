import { useState } from 'react';
import type { FormEvent } from 'react';
import { computeSelf, parseYMD, type N, type Self } from '../lib/num';
import { NUM, INTERACTION, relation, RELATION_LABEL } from '../data/numbers';
import type { Person } from '../lib/store';
import { SectionHead, sentence } from '../components/bits';
import { VedicSquare, pc } from '../components/viz';

const EXAMPLE: Person = { id: 'example', name: '', dob: '1992-03-09' };

export function Others({ self, people, setPeople }: { self: Self; people: Person[]; setPeople: (p: Person[]) => void }) {
  const [sel, setSel] = useState<string | null>(people[0]?.id ?? null);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [err, setErr] = useState('');
  const [confirm, setConfirm] = useState(false);
  const person = people.find((x) => x.id === sel) ?? (people.length ? people[0] : EXAMPLE);
  const isExample = person.id === 'example';
  const them = computeSelf({ name: person.name, dob: person.dob })!;

  const add = (e: FormEvent) => {
    e.preventDefault();
    if (!parseYMD(dob)) { setErr('Enter a full date of birth.'); return; }
    const p: Person = { id: String(Date.now()), name: name.trim(), dob };
    setPeople([...people, p]); setSel(p.id); setName(''); setDob(''); setErr('');
  };

  const rows: { k: string; a: N; b: N | null }[] = [
    { k: 'Psyche', a: self.psychic.root, b: them.psychic.root },
    { k: 'Destiny', a: self.destiny.root, b: them.destiny.root },
    { k: 'Name', a: self.name?.reading.root ?? self.psychic.root, b: them.name?.reading.root ?? null },
  ];
  const a = self.psychic.root, b = them.psychic.root;
  const info = NUM[a];
  const fits = (list: N[]) => (list.includes(b) ? 'listed' : 'not listed');

  return (
    <>
      <section className="section" style={{ paddingTop: 40 }}>
        <SectionHead eyebrow="Others" title="You, beside someone else">
          The book compares like with like: psyche with psyche, destiny with destiny, name with name. Relations are not symmetrical; how a 1 meets a 5 is not how a 5 meets a 1, so both directions are shown.
        </SectionHead>
        <div className="cols">
          <div style={{ display: 'grid', gap: 18, minWidth: 0 }}>
            <form onSubmit={add} className="panel" style={{ display: 'grid', gap: 12 }}>
              <span className="eyebrow">Add a person</span>
              <div className="field"><label htmlFor="o-name">Name they are known by</label><input id="o-name" value={name} onChange={(e) => setName(e.target.value)} /></div>
              <div className="field"><label htmlFor="o-dob">Date of birth</label><input id="o-dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} /></div>
              {err && <p role="alert" style={{ color: 'var(--sindoor)' }}>{err}</p>}
              <div><button className="btn primary" type="submit">Add</button></div>
            </form>
            {people.length > 0 && (
              <div className="people" role="group" aria-label="People">
                {people.map((x) => {
                  const s = computeSelf({ name: x.name, dob: x.dob });
                  return (
                    <button key={x.id} aria-pressed={x.id === person.id} onClick={() => setSel(x.id)}>
                      <span>{x.name || 'Unnamed'} <span className="muted small">· {x.dob}</span></span>
                      <span className="mono small">{s?.psychic.root}·{s?.destiny.root}{s?.name ? `·${s.name.reading.root}` : ''}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <div style={{ display: 'grid', gap: 18, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'baseline' }}>
              <h3 className="display" style={{ fontSize: 'var(--step-2)' }}>{isExample ? 'Example: someone born 9 March 1992' : person.name || `Born ${person.dob}`}</h3>
              {!isExample && (confirm
                ? <span style={{ display: 'flex', gap: 6 }}><button className="btn" onClick={() => { setPeople(people.filter((x) => x.id !== person.id)); setSel(null); setConfirm(false); }}>Remove</button><button className="btn ghost" onClick={() => setConfirm(false)}>Keep</button></span>
                : <button className="btn ghost" onClick={() => setConfirm(true)}>Remove person</button>)}
            </div>
            {isExample && <p className="small muted">This example shows how a comparison reads. Add someone to compare with them instead.</p>}
            <div className="pair">
              {rows.map((r) => (
                <div key={r.k}>
                  <span className="eyebrow">{r.k}</span>
                  {r.b === null ? <span className="small muted">Add their name to compare name numbers.</span> : (
                    <>
                      <span className="num" style={{ fontSize: '2.2rem' }}>
                        <span style={pc(r.a)} className="pc">{r.a}</span> <span className="muted" style={{ fontSize: '1rem' }}>you · them</span> <span style={pc(r.b)} className="pc">{r.b}</span>
                      </span>
                      <span className="small"><b>You meet them:</b> {sentence(INTERACTION[r.a][r.b])}. <span className={`tag ${relation(r.a, r.b)}`}>{RELATION_LABEL[relation(r.a, r.b)].short}</span></span>
                      <span className="small muted"><b>They meet you:</b> {sentence(INTERACTION[r.b][r.a])}.</span>
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
              <figcaption>Your psychic pattern ({NUM[a].planet}, {a}) laid over theirs ({NUM[b].planet}, {b}) on the Vedic Square.</figcaption>
            </figure>
            <p className="note">The book's chapters add gendered notes to many pairings. They are left out here; read any pairing as a tendency between two people, not a rule about either.</p>
          </div>
        </div>
      </section>
    </>
  );
}
