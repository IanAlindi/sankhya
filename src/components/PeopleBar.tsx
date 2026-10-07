import { computeSelf } from '../lib/num';
import type { Person } from '../lib/store';
import { NUM } from '../data/numbers';
import { pc } from './viz';

/** Second row of the sticky header: everyone saved, one click to switch the whole site. */
export function PeopleBar({ people, activeId, isExample, onSwitch, onAdd, onEdit }: {
  people: Person[]; activeId: string; isExample: boolean;
  onSwitch: (id: string) => void; onAdd: () => void; onEdit: () => void;
}) {
  if (isExample) {
    return (
      <div className="people-row">
        <div className="wrap">
          <p className="small muted" style={{ flex: 1, minWidth: 0 }}>
            Viewing the book's own example: <b style={{ color: 'var(--fg)' }}>Harish Johari</b>, born 12 May 1934.
          </p>
          <button className="btn primary sm" onClick={onAdd}>Enter your details</button>
        </div>
      </div>
    );
  }
  return (
    <div className="people-row">
      <div className="wrap">
        <div className="chips" role="group" aria-label="Switch person">
          {people.map((p) => {
            const s = computeSelf(p);
            const n = s?.psychic.root ?? 1;
            const on = p.id === activeId;
            return (
              <button key={p.id} aria-pressed={on} onClick={() => onSwitch(p.id)} style={pc(n)}
                title={`${p.name || 'Unnamed'} · born ${p.dob} · psyche ${n} (${NUM[n].planet})${s ? `, destiny ${s.destiny.root}` : ''}`}>
                <b>{n}</b><span>{p.name || p.dob}</span>
              </button>
            );
          })}
        </div>
        <div className="people-actions">
          <button className="chip-add" onClick={onAdd} aria-label="Add a person"><span aria-hidden="true">+</span><span className="wide"> Add person</span></button>
          <button className="btn ghost sm" onClick={onEdit} aria-label="Edit this person's details">Edit</button>
        </div>
      </div>
    </div>
  );
}
