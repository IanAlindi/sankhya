export {};
// Stub localStorage with a version-1 browser, then load the store (migration runs on import).
const mem = new Map<string, string>();
(globalThis as any).localStorage = {
  getItem: (k: string) => (mem.has(k) ? mem.get(k)! : null),
  setItem: (k: string, v: string) => void mem.set(k, String(v)),
  removeItem: (k: string) => void mem.delete(k),
};
const entry = { date: '2026-10-06', energy: 4, word: 'steady', note: '', felt: 3, saved: 1 };
mem.set('sankhya.profile', JSON.stringify({ name: 'Ian Alindi', dob: '1990-06-15', time: '03:30', hinduDay: true }));
mem.set('sankhya.people', JSON.stringify([{ id: 'p1', name: 'Ann', dob: '1992-03-09' }]));
mem.set('sankhya.journal', JSON.stringify({ '2026-10-06': entry }));

const { exportAll, importAll } = await import('../src/lib/store.ts');
const people = JSON.parse(mem.get('sankhya.persons')!);
const active = JSON.parse(mem.get('sankhya.active')!);
const journals = JSON.parse(mem.get('sankhya.journals')!);
const ok = (c: boolean, m: string) => console.log(c ? 'PASS' : 'FAIL', m);
ok(people.length === 2, 'two people after migration');
ok(people[0].name === 'Ian Alindi' && people[0].time === '03:30' && people[0].hinduDay === true, 'own profile kept with birth time');
ok(people[1].id === 'p1' && people[1].dob === '1992-03-09', 'Others person kept');
ok(active === people[0].id, 'own profile is active');
ok(journals[people[0].id]?.['2026-10-06']?.word === 'steady', 'journal moved to own profile');
ok(mem.get('sankhya.v') === '2', 'version flag set');

const backup = exportAll();
for (const k of ['sankhya.persons', 'sankhya.active', 'sankhya.journals']) mem.delete(k);
ok(importAll(backup) === null && JSON.parse(mem.get('sankhya.persons')!).length === 2, 'v2 backup restores');
ok(JSON.parse(mem.get('sankhya.journals')!)[people[0].id]['2026-10-06'].energy === 4, 'v2 journal restores');

const v1 = JSON.stringify({ app: 'sankhya', version: 1, profile: { name: 'A B', dob: '2000-01-01' }, people: [], journal: { '2026-01-01': entry } });
ok(importAll(v1) === null, 'v1 backup accepted');
const p2 = JSON.parse(mem.get('sankhya.persons')!);
ok(p2.length === 1 && p2[0].name === 'A B' && JSON.parse(mem.get('sankhya.journals')!)[p2[0].id]['2026-01-01'], 'v1 backup converted');
ok(importAll('{"app":"other"}') !== null && importAll('nonsense') !== null, 'bad backups rejected');
