import { useState } from 'react';
import type { FormEvent } from 'react';
import { parseYMD, type Profile } from '../lib/num';

export function Details({ mode, initial, first, onSave, onClose, onRemove }: {
  mode: 'add' | 'edit'; initial: Profile | null; first: boolean;
  onSave: (p: Profile) => void; onClose: () => void; onRemove: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? '');
  const [dob, setDob] = useState(initial?.dob ?? '');
  const [time, setTime] = useState(initial?.time ?? '');
  const [hinduDay, setHinduDay] = useState(initial?.hinduDay ?? false);
  const [offset, setOffset] = useState(initial?.utcOffset?.toString() ?? '');
  const [error, setError] = useState('');
  const [confirmRemove, setConfirmRemove] = useState(false);
  const who = initial?.name || 'this person';

  const smallHours = (() => {
    if (!time) return false;
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m < 240;
  })();

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!parseYMD(dob)) { setError('Enter the date of birth as a full date.'); return; }
    const off = offset.trim() === '' ? undefined : Number(offset);
    if (off !== undefined && (Number.isNaN(off) || off < -12 || off > 14)) { setError('UTC offset is in hours, between −12 and +14 (Nairobi is 3).'); return; }
    onSave({ name: name.trim(), dob, time: time || undefined, hinduDay: smallHours ? hinduDay : undefined, utcOffset: off });
  }

  return (
    <section className="details" aria-label={mode === 'add' ? 'Add a person' : `Edit ${who}`}>
      <form className="wrap" onSubmit={submit}>
        <div className="section-head">
          <span className="eyebrow">{mode === 'edit' ? `Edit ${who}` : first ? 'Your details' : 'Add a person'}</span>
          <h2 style={{ fontSize: 'var(--step-2)' }} className="display">Three facts make the three numbers.</h2>
          <p className="muted">
            Date of birth gives the psychic and destiny numbers; the name they are known by gives the name number. Birth time is optional and only matters for births in the small hours and for the Moon at birth.
            {mode === 'add' && !first ? ' Everyone you save appears in the bar at the top; one click switches the whole site to them.' : ''} Everything stays in this browser.
          </p>
        </div>
        <div className="grid">
          <div className="field">
            <label htmlFor="f-name">Name they are known by</label>
            <input id="f-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Harish Johari" autoComplete="name" />
            <span className="hint">The name used for work and accounts, not necessarily the passport.</span>
          </div>
          <div className="field">
            <label htmlFor="f-dob">Date of birth</label>
            <input id="f-dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} required min="1800-01-01" max="2100-12-31" />
          </div>
          <div className="field">
            <label htmlFor="f-time">Time of birth (optional)</label>
            <input id="f-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="f-off">UTC offset at birth (optional)</label>
            <input id="f-off" inputMode="decimal" value={offset} onChange={(e) => setOffset(e.target.value)} placeholder="this device's zone" />
            <span className="hint">Only used to place the Moon at birth.</span>
          </div>
        </div>
        {smallHours && (
          <div className="field">
            <label htmlFor="f-hindu">Born before about 4 a.m.</label>
            <span className="hint" style={{ maxWidth: '70ch' }}>In the Hindu reckoning the date turns roughly two hours before sunrise, not at midnight, so by that count you were born on the previous date. The book suggests watching which number's traits fit you better.</span>
            <span className="row"><input id="f-hindu" type="checkbox" checked={hinduDay} onChange={(e) => setHinduDay(e.target.checked)} /> <span>Use the previous date (Hindu day)</span></span>
          </div>
        )}
        {error && <p role="alert" style={{ color: 'var(--sindoor)' }}>{error}</p>}
        <div className="row">
          <button className="btn primary" type="submit">{mode === 'add' ? 'Save and view' : 'Save changes'}</button>
          <button className="btn ghost" type="button" onClick={onClose}>Cancel</button>
          {mode === 'edit' && !confirmRemove && <button className="btn ghost" type="button" onClick={() => setConfirmRemove(true)}>Remove {who}…</button>}
          {confirmRemove && (
            <span className="row">
              <span className="small muted">This deletes {who} and their journal from this browser.</span>
              <button className="btn" type="button" onClick={onRemove}>Remove</button>
              <button className="btn ghost" type="button" onClick={() => setConfirmRemove(false)}>Keep</button>
            </span>
          )}
        </div>
      </form>
    </section>
  );
}
