import { useEffect, useMemo, useRef, useState } from 'react';
import { computeSelf, dateToYMD, ymdKey, type Profile, type YMD } from './lib/num';
import { guessPlace } from './lib/astro';
import { useProfile, usePlace, usePeople, useJournal, useTheme, useNow, type Entry } from './lib/store';
import { Details } from './components/Details';
import { Today } from './views/Today';
import { Numbers } from './views/Numbers';
import { Cycles } from './views/Cycles';
import { Others } from './views/Others';
import { Journal } from './views/Journal';
import { Method } from './views/Method';

const EXAMPLE: Profile = { name: 'Harish Johari', dob: '1934-05-12' };
const TABS = [
  ['today', 'Today'], ['numbers', 'Your numbers'], ['cycles', 'Cycles'],
  ['others', 'Others'], ['journal', 'Journal'], ['method', 'Method'],
] as const;
type Tab = (typeof TABS)[number][0];
const readHash = (): Tab => {
  const h = location.hash.replace('#', '');
  return (TABS.find(([k]) => k === h)?.[0] ?? 'today') as Tab;
};

export default function App() {
  const [profile, setProfile] = useProfile();
  const [storedPlace, setPlace] = usePlace();
  const [people, setPeople] = usePeople();
  const [journal, setJournal] = useJournal();
  const [theme, setTheme] = useTheme();
  const now = useNow();
  const [tab, setTab] = useState<Tab>(readHash);
  const [sel, setSel] = useState<YMD>(() => dateToYMD(new Date()));
  const [editing, setEditing] = useState(false);

  const place = useMemo(() => storedPlace ?? guessPlace(), [storedPlace]);
  const active = profile ?? EXAMPLE;
  const isExample = !profile;
  const self = useMemo(() => computeSelf(active), [active.name, active.dob, active.time, active.hinduDay, active.utcOffset]);

  useEffect(() => {
    const on = () => { setTab(readHash()); window.scrollTo({ top: 0 }); };
    addEventListener('hashchange', on);
    return () => removeEventListener('hashchange', on);
  }, []);
  const themeSet = useRef(false);
  useEffect(() => {
    // Only clear the attribute if this page set it, so a host's explicit choice survives.
    const el = document.documentElement;
    if (theme === 'system') { if (themeSet.current) el.removeAttribute('data-theme'); themeSet.current = false; }
    else { el.setAttribute('data-theme', theme); themeSet.current = true; }
  }, [theme]);
  useEffect(() => {
    const label = TABS.find(([k]) => k === tab)?.[1];
    document.title = tab === 'today' ? 'Sankhya' : `${label} · Sankhya`;
  }, [tab]);

  const saveEntry = (e: Entry) => setJournal({ ...journal, [e.date]: e });
  const removeEntry = (k: string) => { const j = { ...journal }; delete j[k]; setJournal(j); };
  const openDay = (v: YMD) => { setSel(v); location.hash = 'today'; };
  const nextTheme = { system: 'dark', dark: 'light', light: 'system' } as const;

  if (!self) {
    return (
      <div className="wrap" style={{ paddingBlock: 60 }}>
        <p>The saved date of birth could not be read. <button className="btn" onClick={() => setProfile(null)}>Start again</button></p>
      </div>
    );
  }

  return (
    <>
      <header className="top">
        <div className="wrap">
          <a className="brand" href="#today" aria-label="Sankhya, today"><b>Sankhya</b><span lang="sa">सांख्य</span></a>
          <nav className="nav" aria-label="Sections">
            {TABS.map(([k, label]) => <a key={k} href={`#${k}`} aria-current={tab === k ? 'page' : undefined}>{label}</a>)}
          </nav>
          <div className="top-actions">
            <button className="btn ghost" onClick={() => setTheme(nextTheme[theme])} aria-label={`Theme: ${theme}. Switch.`} title="Theme">
              {theme === 'system' ? 'Auto' : theme === 'dark' ? 'Night' : 'Day'}
            </button>
          </div>
        </div>
      </header>

      {isExample && !editing && (
        <div className="banner">
          <div className="wrap">
            <p>You are looking at the book's own example: <b>Harish Johari, born 12 May 1934</b>. Enter your details to see yours.</p>
            <button className="btn primary" onClick={() => setEditing(true)}>Enter your details</button>
          </div>
        </div>
      )}
      {editing && (
        <Details initial={profile} isExample={isExample}
          onSave={(p) => { setProfile(p); setEditing(false); }}
          onClose={() => setEditing(false)}
          onClear={() => { setProfile(null); setEditing(false); }} />
      )}

      <main className="wrap" key={tab}>
        {tab === 'today' && <Today self={self} sel={sel} setSel={setSel} place={place} setPlace={setPlace} now={now} journal={journal} saveEntry={saveEntry} />}
        {tab === 'numbers' && <Numbers self={self} profile={active} now={now} onEdit={() => { setEditing(true); scrollTo({ top: 0, behavior: 'smooth' }); }} />}
        {tab === 'cycles' && <Cycles self={self} now={now} place={place} sel={sel} openDay={openDay} />}
        {tab === 'others' && <Others self={self} people={people} setPeople={setPeople} />}
        {tab === 'journal' && <Journal self={self} journal={journal} place={place} saveEntry={saveEntry} removeEntry={removeEntry} todayKey={ymdKey(dateToYMD(now))} />}
        {tab === 'method' && <Method />}
      </main>

      <footer className="foot">
        <div className="wrap">
          <p>Your details, people and journal are stored only in this browser. Nothing is sent anywhere.</p>
          <p>After Harish Johari, <i>Numerology with Tantra, Ayurveda, and Astrology</i> (1990), with Panchāṅga, planetary hours, the Lo Shu and the Maya count computed from the sky. A mirror, not a prediction.</p>
        </div>
      </footer>
    </>
  );
}
