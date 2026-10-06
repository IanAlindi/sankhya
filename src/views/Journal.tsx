import { useEffect, useMemo, useState } from 'react';
import { NINE, parseYMD, dateNumber, WEEKDAY_NUMBER, type N, type Self } from '../lib/num';
import { sky, sunTimes, type Place } from '../lib/astro';
import { NUM, WEEKDAY, relation, RELATION_LABEL } from '../data/numbers';
import { exportAll, importAll, type Entry } from '../lib/store';
import { SectionHead, longDate } from '../components/bits';
import { pc } from '../components/viz';

export function EntryForm({ dateKey, existing, onSave }: { dateKey: string; existing?: Entry; onSave: (e: Entry) => void }) {
  const [energy, setEnergy] = useState(existing?.energy ?? 0);
  const [word, setWord] = useState(existing?.word ?? '');
  const [note, setNote] = useState(existing?.note ?? '');
  const [felt, setFelt] = useState<N | null>(existing?.felt ?? null);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    setEnergy(existing?.energy ?? 0); setWord(existing?.word ?? ''); setNote(existing?.note ?? '');
    setFelt(existing?.felt ?? null); setSaved(false);
  }, [dateKey, existing?.saved]);
  const d = parseYMD(dateKey)!;
  return (
    <form className="panel" style={{ display: 'grid', gap: 16 }}
      onSubmit={(e) => { e.preventDefault(); if (!energy) return; onSave({ date: dateKey, energy, word: word.trim(), note: note.trim(), felt, saved: Date.now() }); setSaved(true); }}>
      <span className="eyebrow">Journal · {longDate(new Date(d.y, d.m - 1, d.d))}</span>
      <div className="field">
        <label id="e-energy-l">Energy, 1 to 5</label>
        <div className="energy" role="group" aria-labelledby="e-energy-l">
          {[1, 2, 3, 4, 5].map((v) => <button key={v} type="button" aria-pressed={energy === v} onClick={() => setEnergy(v)}>{v}</button>)}
        </div>
      </div>
      <div className="field">
        <label htmlFor="e-word">The day in one word</label>
        <input id="e-word" value={word} onChange={(e) => setWord(e.target.value)} maxLength={40} placeholder="e.g. scattered, steady, bright" />
      </div>
      <div className="field">
        <label htmlFor="e-note">Answer, or anything else</label>
        <textarea id="e-note" rows={3} value={note} onChange={(e) => setNote(e.target.value)} />
      </div>
      <div className="field">
        <label id="e-felt-l">Which number did the day feel like? (optional)</label>
        <div className="feltrow" role="group" aria-labelledby="e-felt-l">
          {NINE.map((n) => <button key={n} type="button" style={pc(n)} aria-pressed={felt === n} onClick={() => setFelt(felt === n ? null : n)} title={NUM[n].planet}>{n}</button>)}
        </div>
        <span className="hint">Guess before you look. Over time the Journal compares your guesses with the day's numbers.</span>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <button className="btn primary" type="submit" disabled={!energy}>{existing ? 'Update entry' : 'Save entry'}</button>
        {!energy && <span className="small muted">Choose an energy level to save.</span>}
        {saved && <span className="small" role="status">Saved in this browser.</span>}
      </div>
    </form>
  );
}

/** Inside a frame (an embedded preview) script-started downloads are blocked, so only offer Copy. */
const framed = (() => { try { return window.self !== window.top; } catch { return true; } })();

interface Enriched extends Entry { dn: N; wd: number; wdn: N; waxing: boolean; rel: ReturnType<typeof relation> }

function Bars({ title, rows }: { title: string; rows: { label: string; mean: number; n: number }[] }) {
  if (!rows.length) return null;
  return (
    <div style={{ display: 'grid', gap: 10, minWidth: 0 }}>
      <span className="eyebrow">{title}</span>
      <div className="bars">
        {rows.map((r) => (
          <div className="row" key={r.label} title={`${r.label}: average energy ${r.mean.toFixed(1)} over ${r.n} day${r.n === 1 ? '' : 's'}`}>
            <span>{r.label}</span>
            <span className="track"><span style={{ width: `${(r.mean / 5) * 100}%` }} /></span>
            <span className="v">{r.mean.toFixed(1)} · {r.n}d</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function group(es: Enriched[], key: (e: Enriched) => string, order: string[]) {
  const m = new Map<string, number[]>();
  es.forEach((e) => { const k = key(e); m.set(k, [...(m.get(k) ?? []), e.energy]); });
  return order.filter((k) => m.has(k)).map((k) => {
    const v = m.get(k)!;
    return { label: k, mean: v.reduce((a, b) => a + b, 0) / v.length, n: v.length };
  });
}

export function Journal({ self, journal, place, saveEntry, removeEntry, todayKey }: {
  self: Self; journal: Record<string, Entry>; place: Place; saveEntry: (e: Entry) => void; removeEntry: (k: string) => void; todayKey: string;
}) {
  const [backup, setBackup] = useState('');
  const [msg, setMsg] = useState('');
  const [confirm, setConfirm] = useState<string | null>(null);
  const p = self.psychic.root;

  const entries: Enriched[] = useMemo(() => Object.values(journal)
    .map((e) => {
      const d = parseYMD(e.date)!;
      const wd = new Date(d.y, d.m - 1, d.d, 12).getDay();
      const rise = sunTimes(d, place.lat, place.lon).rise ?? new Date(d.y, d.m - 1, d.d, 6);
      const dn = dateNumber(d);
      return { ...e, dn, wd, wdn: WEEKDAY_NUMBER[wd], waxing: sky(rise).waxing, rel: relation(p, dn) };
    })
    .sort((a, b) => b.date.localeCompare(a.date)), [journal, place.lat, place.lon, p]);

  const enough = entries.length >= 7;
  const felt = entries.filter((e) => e.felt);
  const hits = felt.filter((e) => e.felt === e.dn || e.felt === e.wdn).length;

  const copy = async () => {
    const text = exportAll();
    setBackup(text);
    try { await navigator.clipboard.writeText(text); setMsg('Backup copied. Paste it somewhere safe.'); }
    catch { setMsg('Copy was blocked. Select the text below and copy it yourself.'); }
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob([exportAll()], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url; a.download = `sankhya-backup-${todayKey}.json`; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const restore = () => {
    const err = importAll(backup);
    if (err) setMsg(err); else { setMsg('Restored. Reloading…'); setTimeout(() => location.reload(), 600); }
  };

  return (
    <>
      <section className="section">
        <SectionHead eyebrow="Journal" title="Your own evidence">
          Numerology here is a lens, not a verdict. Each entry is matched with that day's date number, weekday planet and Moon, so after a week or two you can see which of them, if any, move with your energy.
        </SectionHead>
        <div className="cols">
          <EntryForm dateKey={todayKey} existing={journal[todayKey]} onSave={saveEntry} />
          <div style={{ display: 'grid', gap: 26, minWidth: 0 }}>
            {!enough && (
              <div className="panel" style={{ display: 'grid', gap: 10 }}>
                <span className="eyebrow">Patterns</span>
                <p>{entries.length} of 7 days logged. Patterns appear after a week of entries, and get more trustworthy with every week after that.</p>
                <div className="meter"><div className="bar"><span style={{ width: `${(entries.length / 7) * 100}%`, background: 'var(--accent)' }} /></div></div>
              </div>
            )}
            {enough && (
              <>
                <Bars title="Average energy by date number" rows={group(entries, (e) => `${e.dn} ${NUM[e.dn].planet}`, NINE.map((n) => `${n} ${NUM[n].planet}`))} />
                <Bars title="By how the date meets your number" rows={group(entries, (e) => RELATION_LABEL[e.rel].short, ['Same frequency', 'Ease', 'Friction', 'Neutral'])} />
                <Bars title="By weekday" rows={group(entries, (e) => WEEKDAY[e.wd], WEEKDAY)} />
                <Bars title="By Moon" rows={group(entries, (e) => (e.waxing ? 'Waxing' : 'Waning'), ['Waxing', 'Waning'])} />
                {felt.length >= 5 && (
                  <p className="small muted">Your guesses matched the date or weekday number on {hits} of {felt.length} days. Chance alone would give about {Math.round(felt.length * 0.22)}.</p>
                )}
                <p className="note">Averages over a handful of days are noisy. Treat a difference smaller than about one point as no difference.</p>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHead eyebrow="Entries" title={`${entries.length} day${entries.length === 1 ? '' : 's'} logged`} />
        {entries.length === 0 && <p className="muted">No entries yet. Today's form is above, and the Today page has one under its question.</p>}
        <div className="entries">
          {entries.map((e) => {
            const d = parseYMD(e.date)!;
            return (
              <article key={e.date}>
                <span className="when mono small muted">{longDate(new Date(d.y, d.m - 1, d.d))}</span>
                <div style={{ minWidth: 0 }}>
                  <b>{e.word || '—'}</b> <span className="muted small">· energy {e.energy} · date <span style={pc(e.dn)} className="pc">{e.dn}</span>{e.felt ? <> · felt <span style={pc(e.felt)} className="pc">{e.felt}</span></> : null}</span>
                  {e.note && <p>{e.note}</p>}
                </div>
                {confirm === e.date
                  ? <span style={{ display: 'flex', gap: 6 }}><button className="btn" onClick={() => { removeEntry(e.date); setConfirm(null); }}>Delete</button><button className="btn ghost" onClick={() => setConfirm(null)}>Keep</button></span>
                  : <button className="btn ghost" onClick={() => setConfirm(e.date)} aria-label={`Delete entry for ${e.date}`}>×</button>}
              </article>
            );
          })}
        </div>
      </section>

      <section className="section">
        <SectionHead eyebrow="Backup" title="Keep a copy">
          Your details, people and journal live only in this browser. Clearing site data erases them, so copy a backup now and then.
        </SectionHead>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className="btn" onClick={copy}>Copy backup</button>
          {!framed && <button className="btn" onClick={download}>Download backup file</button>}
          <button className="btn ghost" onClick={restore} disabled={!backup.trim()}>Restore from the text below</button>
        </div>
        <div className="field">
          <label htmlFor="b-text">Backup text</label>
          <textarea id="b-text" rows={5} value={backup} onChange={(e) => setBackup(e.target.value)} placeholder="Paste a backup here to restore it" className="mono small" />
        </div>
        {msg && <p className="small" role="status">{msg}</p>}
      </section>
    </>
  );
}
