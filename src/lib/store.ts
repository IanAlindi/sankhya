// Everything a person enters stays in this browser. Nothing is sent anywhere.
import { useEffect, useState } from 'react';
import type { N, Profile } from './num';
import type { Place } from './astro';

/** A saved person: the same facts as a Profile, plus a stable id. */
export interface Person extends Profile { id: string }
export interface Entry { date: string; energy: number; word: string; note: string; felt: N | null; saved: number }
/** Journals are kept per person: person id → date → entry. */
export type Journals = Record<string, Record<string, Entry>>;

const KEY = {
  people: 'sankhya.persons', active: 'sankhya.active', journals: 'sankhya.journals',
  place: 'sankhya.place', theme: 'sankhya.theme', version: 'sankhya.v',
  // version 1 keys, read once by the migration
  v1Profile: 'sankhya.profile', v1People: 'sankhya.people', v1Journal: 'sankhya.journal',
} as const;

function read<T>(k: string, fallback: T): T {
  try {
    const v = localStorage.getItem(k);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(k: string, v: unknown) {
  try {
    if (v === null || v === undefined) localStorage.removeItem(k);
    else localStorage.setItem(k, JSON.stringify(v));
  } catch { /* storage blocked: the page still works for this visit */ }
}

export const newId = () => Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);

/** Version 1 kept one profile, a separate list of name-and-date people, and one journal.
 *  Version 2 keeps everyone as a full person, one active, and a journal for each. */
function migrate() {
  try {
    if (localStorage.getItem(KEY.version) === '2') return;
    const me = read<Profile | null>(KEY.v1Profile, null);
    const others = read<{ id?: string; name: string; dob: string }[]>(KEY.v1People, []);
    const journal = read<Record<string, Entry>>(KEY.v1Journal, {});
    const people: Person[] = [];
    if (me) people.push({ ...me, id: newId() });
    for (const o of others) people.push({ id: o.id || newId(), name: o.name, dob: o.dob });
    const owner = me ? people[0].id : 'example';
    write(KEY.people, people);
    write(KEY.active, people[0]?.id ?? null);
    write(KEY.journals, Object.keys(journal).length ? { [owner]: journal } : {});
    localStorage.setItem(KEY.version, '2');
  } catch { /* nothing stored yet, or storage blocked */ }
}
migrate();

function usePersistent<T>(k: string, fallback: T) {
  const [v, setV] = useState<T>(() => read(k, fallback));
  useEffect(() => write(k, v), [k, v]);
  return [v, setV] as const;
}

export const usePeopleList = () => usePersistent<Person[]>(KEY.people, []);
export const useActiveId = () => usePersistent<string | null>(KEY.active, null);
export const useJournals = () => usePersistent<Journals>(KEY.journals, {});
export const usePlace = () => usePersistent<Place | null>(KEY.place, null);
export const useTheme = () => usePersistent<'light' | 'dark' | 'system'>(KEY.theme, 'system');

export function exportAll() {
  return JSON.stringify({
    app: 'sankhya', version: 2, exported: new Date().toISOString(),
    people: read(KEY.people, []), active: read(KEY.active, null), journals: read(KEY.journals, {}),
  }, null, 2);
}

/** Restores a backup from either version. Returns an error message, or null on success. */
export function importAll(text: string): string | null {
  try {
    const d = JSON.parse(text);
    if (d.app !== 'sankhya') return 'That text is not a Sankhya backup.';
    if (d.version === 2) {
      if (!Array.isArray(d.people)) return 'This backup has no people in it.';
      write(KEY.people, d.people);
      write(KEY.active, d.active ?? d.people[0]?.id ?? null);
      write(KEY.journals, d.journals ?? {});
      localStorage.setItem(KEY.version, '2');
      return null;
    }
    // Version 1: put it where the old app kept it and let the migration convert it.
    write(KEY.v1Profile, d.profile ?? null);
    write(KEY.v1People, Array.isArray(d.people) ? d.people : []);
    write(KEY.v1Journal, d.journal ?? {});
    localStorage.removeItem(KEY.version);
    migrate();
    return null;
  } catch {
    return 'Could not read that backup. Paste the whole text, starting with {.';
  }
}

export function useNow(ms = 30000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), ms);
    return () => clearInterval(id);
  }, [ms]);
  return now;
}
