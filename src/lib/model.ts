import { dateNumber, fullDateNumber, ymdKey, dateToYMD, WEEKDAY_NUMBER, root, type N, type YMD, type Self, type Profile, yearNumber, ageOn } from './num';
import { sky, sunTimes, vedicDay, tzolkin, nextChange, type Place, type Sky, type VedicDay } from './astro';
import { NUM, INTERACTION, periodState, relation, type Relation, type PeriodState } from '../data/numbers';

export interface DayModel {
  sel: YMD; isToday: boolean; instant: Date;
  dateNum: N; fullNum: N; weekday: number; weekdayNum: N;
  vd: VedicDay; atRise: Sky; atInstant: Sky; riseOfSel: Date;
  tithiEnds: Date | null; nakEnds: Date | null;
  maya: ReturnType<typeof tzolkin>;
  rel: Relation; phrase: string;
  goodDate: 'best' | 'also' | null; goodDay: boolean; restDay: boolean;
  season: PeriodState; yearNum: N; age: number;
}

export function dayModel(sel: YMD, place: Place, now: Date, self: Self): DayModel {
  const isToday = ymdKey(sel) === ymdKey(dateToYMD(now));
  const instant = isToday ? now : new Date(sel.y, sel.m - 1, sel.d, 12);
  const vd = vedicDay(instant, place.lat, place.lon);
  const riseOfSel = sunTimes(sel, place.lat, place.lon).rise ?? new Date(sel.y, sel.m - 1, sel.d, 6);
  const atRise = sky(riseOfSel);
  const atInstant = sky(instant);
  const weekday = new Date(sel.y, sel.m - 1, sel.d, 12).getDay();
  const p = self.psychic.root;
  const info = NUM[p];
  const dateNum = dateNumber(sel);
  return {
    sel, isToday, instant, vd, atRise, atInstant, riseOfSel,
    dateNum, fullNum: fullDateNumber(sel), weekday, weekdayNum: WEEKDAY_NUMBER[weekday],
    tithiEnds: nextChange(riseOfSel, (s) => s.tithi.index, 40),
    nakEnds: nextChange(riseOfSel, (s) => s.nakshatra.index, 40),
    maya: tzolkin(sel),
    rel: relation(p, dateNum), phrase: INTERACTION[p][dateNum],
    goodDate: info.goodDates.includes(sel.d) ? 'best' : info.alsoDates.includes(sel.d) ? 'also' : null,
    goodDay: info.goodDays.includes(weekday),
    restDay: info.restDay === ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][weekday]
      || (info.restDay === 'Full moon days' && atRise.tithi.index === 14),
    season: periodState(p, sel.m, sel.d),
    yearNum: yearNumber(self.reckoned, sel.y).root,
    age: ageOn(self.birth, sel),
  };
}

/** Pick a stable question for a date: the same date always gets the same first question. */
export function promptsFor(m: DayModel, self: Self): string[] {
  const p = self.psychic.root;
  const lesson = NUM[p].lesson.toLowerCase();
  const rel = m.rel === 'enemy'
    ? `Today's number pushes against yours. What did the friction move forward?`
    : m.rel === 'friend'
      ? `Today's number agrees with yours. Did the ease make you coast anywhere?`
      : m.rel === 'same'
        ? `Today repeats your own number. Which of your habits did you see most clearly?`
        : `Today is neutral to you. What did you choose when nothing pushed?`;
  const all = [
    ...NUM[m.dateNum].prompts,
    rel,
    `Your lesson as a ${p} is ${lesson}. Where did it come up today?`,
    m.atRise.waxing
      ? 'The Moon is waxing. What are you building up, and what does it need from you tomorrow?'
      : 'The Moon is waning. What is ready to be finished, cleared or let go?',
    ...NUM[m.weekdayNum].prompts.slice(0, 1),
  ];
  const seed = m.sel.y * 372 + m.sel.m * 31 + m.sel.d;
  const k = seed % all.length;
  return [...all.slice(k), ...all.slice(0, k)];
}

/** The Moon at birth. With a birth time, one position; without, the day's range. */
export function birthSky(profile: Profile, self: Self) {
  const b = self.birth;
  if (profile.time) {
    const [h, mi] = profile.time.split(':').map(Number);
    const local = new Date(b.y, b.m - 1, b.d, h, mi);
    const off = profile.utcOffset ?? -local.getTimezoneOffset() / 60;
    const t = new Date(Date.UTC(b.y, b.m - 1, b.d, h, mi) - off * 3600000);
    return { exact: true, at: sky(t), start: sky(t), end: sky(t) };
  }
  const off = -new Date(b.y, b.m - 1, b.d, 12).getTimezoneOffset() / 60;
  const t = (h: number) => new Date(Date.UTC(b.y, b.m - 1, b.d, h) - off * 3600000);
  return { exact: false, at: sky(t(12)), start: sky(t(0)), end: sky(t(23.99)) };
}

export const harmonyYear = (self: Self, on: YMD) => {
  const age = ageOn(self.birth, on);
  const nth = age + 1;
  return { nth, root: root(nth), good: NUM[self.psychic.root].harmoniousYears.includes(root(nth)) };
};
