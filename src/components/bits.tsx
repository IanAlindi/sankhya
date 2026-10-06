import type { ReactNode } from 'react';
import type { N } from '../lib/num';
import { NUM, RELATION_LABEL, relation, type PeriodState } from '../data/numbers';
import { pc } from './viz';

export function Planet({ n, deva = false }: { n: N; deva?: boolean }) {
  return (
    <span style={pc(n)}>
      <b className="num pc" style={{ fontSize: '1.15em' }}>{n}</b>{' '}
      <span className="pc">{NUM[n].planet}</span>
      {deva && <span className="muted"> · {NUM[n].sanskrit}</span>}
    </span>
  );
}

export function RelTag({ from, to }: { from: N; to: N }) {
  const r = relation(from, to);
  return <span className={`tag ${r}`} title={RELATION_LABEL[r].long}>{RELATION_LABEL[r].short}</span>;
}

export function PeriodTag({ s }: { s: PeriodState }) {
  const label = { strong: 'Strong period', weak: 'Weak period', mixed: 'Mixed period', neutral: 'Ordinary period' }[s];
  return <span className={`tag ${s === 'neutral' ? '' : s}`}>{label}</span>;
}

export function Row({ k, children }: { k: string; children: ReactNode }) {
  return <div><dt>{k}</dt><dd>{children}</dd></div>;
}

export function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <header className="section-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </header>
  );
}

export const hm = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
export const longDate = (d: Date) => d.toLocaleDateString([], { day: 'numeric', month: 'long', year: 'numeric' });
export const sentence = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
export const list = (xs: (string | number)[]) =>
  xs.length <= 1 ? String(xs[0] ?? '') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`;
