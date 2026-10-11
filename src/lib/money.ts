// Plain money arithmetic for the Wealth page. Nothing here is advice; it is the same sums the
// book works through, done for your own numbers.

export interface Payoff { months: number; paid: number; interest: number; done: boolean }

/** Pay a card down month by month. `minPct` with `floor` imitates a card's minimum payment;
 *  `fixed` pays the same amount every month. Interest is charged monthly at APR / 12. */
export function payoff(balance: number, aprPct: number, plan: { fixed?: number; minPct?: number; floor?: number }, cap = 1200): Payoff {
  const r = aprPct / 100 / 12;
  let bal = balance, paid = 0, months = 0;
  while (bal > 0.005 && months < cap) {
    const interest = bal * r;
    const due = plan.fixed ?? Math.max(((plan.minPct ?? 3) / 100) * bal, plan.floor ?? 0);
    if (due <= interest) return { months: Infinity, paid: Infinity, interest: Infinity, done: false };
    const pay = Math.min(due, bal + interest);
    bal = bal + interest - pay;
    paid += pay;
    months++;
  }
  return { months, paid, interest: paid - balance, done: bal <= 0.005 };
}

export interface GrowthYear { year: number; value: number; paidIn: number }

/** Money put in at the start of each year, growing once a year at `ratePct`. An opening lump
 *  sum goes in at the start of year one. */
export function growth(initial: number, yearly: number, ratePct: number, years: number): GrowthYear[] {
  const r = ratePct / 100;
  const out: GrowthYear[] = [];
  let value = 0, paidIn = 0;
  for (let y = 1; y <= years; y++) {
    const add = (y === 1 ? initial : 0) + yearly;
    value = (value + add) * (1 + r);
    paidIn += add;
    out.push({ year: y, value, paidIn });
  }
  return out;
}

/** Buckminster Fuller's measure of wealth: how many days you could keep living as you do
 *  without a paycheque. */
export const wealthDays = (savings: number, monthlyCosts: number) =>
  monthlyCosts > 0 ? Math.max(0, (savings / monthlyCosts) * 30.44) : Infinity;

export const money = (v: number) =>
  Number.isFinite(v) ? v.toLocaleString(undefined, { maximumFractionDigits: v < 100 ? 2 : 0 }) : '∞';
export const duration = (months: number) => {
  if (!Number.isFinite(months)) return 'never';
  const y = Math.floor(months / 12), m = months % 12;
  return [y && `${y} year${y > 1 ? 's' : ''}`, m && `${m} month${m > 1 ? 's' : ''}`].filter(Boolean).join(' ') || '0 months';
};
