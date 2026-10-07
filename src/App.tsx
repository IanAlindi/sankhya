import { useEffect, useMemo, useRef, useState } from 'react';
import { computeSelf, dateToYMD, ymdKey, type Profile, type YMD } from './lib/num';
import { guessPlace } from './lib/astro';
import { usePeopleList, useActiveId, useJournals, usePlace, useTheme, useNow, newId, type Entry, type Person } from './lib/store';
import { Details } from './components/Details';
import { PeopleBar } from './components/PeopleBar';
import { Today } from './views/Today';
import { Numbers } from './views/Numbers';
import { Cycles } from './views/Cycles';
import { Others } from './views/Others';
import { Journal } from './views/Journal';
import { Method } from './views/Method';

const EXAMPLE: Person = { id: 'example', name: 'Harish Johari', dob: '1934-05-12' };
const TABS = [
  ['today', 'Today'], ['numbers', 'Numbers'], ['cycles', 'Cycles'],
  ['others', 'Others'], ['journal', 'Journal'], ['method', 'Method'],
] as const;
type Tab = (typeof TABS)[number][0];
const readHash = (): Tab => {
  const h = location.hash.replace('#', '');
  return (TABS.find(([k]) => k === h)?.[0] ?? 'today') as Tab;
};

export default function App() {
  const [people, setPeople] = usePeopleList();
  const [activeId, setActiveId] = useActiveId();
  const [journals, setJournals] = useJournals();
  const [storedPlace, setPlace] = usePlace();
  const [theme, setTheme] = useTheme();
  const now = useNow();
  const [tab, setTab] = useState<Tab>(readHash);
  const [sel, setSel] = useState<YMD>(() => dateToYMD(new Date()));
  const [editing, setEditing] = useState<null | 'add' | 'edit'>(null);

  const place = useMemo(() => storedPlace ?? guessPlace(), [storedPlace]);
  const saved = people.find((p) => p.id === activeId) ?? people[0] ?? null;
  const active = saved ?? EXAMPLE;
  const isExample = !saved;
  const journal = journals[active.id] ?? {};
  const self = useMemo(() => computeSelf(active), [active.id, active.name, active.dob, active.time, active.hinduDay, active.utcOffset]);

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
    const who = isExample ? '' : ` · ${active.name || active.dob}`;
    document.title = tab === 'today' ? `Sankhya${who}` : `${label}${who} · Sankhya`;
  }, [tab, active.id, active.name, isExample]);

  const savePerson = (p: Profile) => {
    if (editing === 'edit' && saved) {
      setPeople(people.map((x) => (x.id === saved.id ? { ...p, id: x.id } : x)));
    } else {
      const id = newId();
      setPeople([...people, { ...p, id }]);
      setActiveId(id);
      // Entries written while looking at the example belong to the first real person.
      if (!people.length && journals.example) {
        const { example, ...rest } = journals;
        setJournals({ ...rest, [id]: example });
      }
    }
    setEditing(null);
  };
  const removePerson = () => {
    if (!saved) return;
    const rest = people.filter((x) => x.id !== saved.id);
    setPeople(rest);
    setActiveId(rest[0]?.id ?? null);
    const j = { ...journals };
    delete j[saved.id];
    setJournals(j);
    setEditing(null);
  };
  const switchTo = (id: string) => { setActiveId(id); setEditing(null); };
  const openEditor = (mode: 'add' | 'edit') => { setEditing(mode); scrollTo({ top: 0, behavior: 'smooth' }); };

  const saveEntry = (e: Entry) => setJournals({ ...journals, [active.id]: { ...journal, [e.date]: e } });
  const removeEntry = (k: string) => {
    const j = { ...journal };
    delete j[k];
    setJournals({ ...journals, [active.id]: j });
  };
  const openDay = (v: YMD) => { setSel(v); location.hash = 'today'; };
  const nextTheme = { system: 'dark', dark: 'light', light: 'system' } as const;

  if (!self) {
    return (
      <div className="wrap" style={{ paddingBlock: 60 }}>
        <p>The saved date of birth for {active.name || 'this person'} could not be read. <button className="btn" onClick={() => openEditor('edit')}>Fix it</button></p>
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
        <PeopleBar people={people} activeId={active.id} isExample={isExample}
          onSwitch={switchTo} onAdd={() => openEditor('add')} onEdit={() => openEditor('edit')} />
      </header>

      {editing && (
        <Details key={`${editing}-${active.id}`} mode={editing} first={isExample}
          initial={editing === 'edit' ? saved : null}
          onSave={savePerson} onClose={() => setEditing(null)} onRemove={removePerson} />
      )}

      <main className="wrap" key={`${tab}-${active.id}`}>
        {tab === 'today' && <Today self={self} sel={sel} setSel={setSel} place={place} setPlace={setPlace} now={now} journal={journal} saveEntry={saveEntry} />}
        {tab === 'numbers' && <Numbers self={self} profile={active} now={now} onEdit={() => openEditor(isExample ? 'add' : 'edit')} />}
        {tab === 'cycles' && <Cycles self={self} now={now} place={place} sel={sel} openDay={openDay} />}
        {tab === 'others' && <Others self={self} active={active} people={people} onAdd={() => openEditor('add')} onSwitch={switchTo} />}
        {tab === 'journal' && <Journal self={self} who={isExample ? 'the example' : active.name || 'this person'} journal={journal} place={place} saveEntry={saveEntry} removeEntry={removeEntry} todayKey={ymdKey(dateToYMD(now))} />}
        {tab === 'method' && <Method />}
      </main>

      <footer className="foot">
        <div className="wrap">
          <p>Everyone you save, and each person's journal, is stored only in this browser. Nothing is sent anywhere.</p>
          <p>After Harish Johari, <i>Numerology with Tantra, Ayurveda, and Astrology</i> (1990), with Panchāṅga, planetary hours, the Lo Shu and the Maya count computed from the sky. A mirror, not a prediction.</p>
        </div>
      </footer>
    </>
  );
}
