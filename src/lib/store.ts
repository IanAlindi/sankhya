// Everything a person enters stays in this browser. Nothing is sent anywhere.
import { useEffect, useState } from 'react';
import type { N, Profile } from './num';
import type { Place } from './astro';

export interface Person { id: string; name: string; dob: string }
export interface Entry { date: string; energy: number; word: string; note: string; felt: N | null; saved: number }

const KEY = {
  profile: 'sankhya.profile', place: 'sankhya.place', people: 'sankhya.people',
  journal: 'sankhya.journal', theme: 'sankhya.theme',
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

function usePersistent<T>(k: string, fallback: T) {
  const [v, setV] = useState<T>(() => read(k, fallback));
  useEffect(() => write(k, v), [k, v]);
  return [v, setV] as const;
}

export const useProfile = () => usePersistent<Profile | null>(KEY.profile, null);
export const usePlace = () => usePersistent<Place | null>(KEY.place, null);
export const usePeople = () => usePersistent<Person[]>(KEY.people, []);
export const useJournal = () => usePersistent<Record<string, Entry>>(KEY.journal, {});
export const useTheme = () => usePersistent<'light' | 'dark' | 'system'>(KEY.theme, 'system');

export function exportAll() {
  return JSON.stringify({
    app: 'sankhya', version: 1, exported: new Date().toISOString(),
    profile: read(KEY.profile, null), people: read(KEY.people, []), journal: read(KEY.journal, {}),
  }, null, 2);
}
export function importAll(text: string): string | null {
  try {
    const d = JSON.parse(text);
    if (d.app !== 'sankhya') return 'That text is not a Sankhya backup.';
    if (d.profile) write(KEY.profile, d.profile);
    if (Array.isArray(d.people)) write(KEY.people, d.people);
    if (d.journal && typeof d.journal === 'object') write(KEY.journal, d.journal);
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
