import type { ReactNode } from 'react';
import { classNames } from '@/lib/format';

type Tone = 'neutral' | 'gold' | 'dark';

export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: Tone }) {
  const cls: Record<Tone, string> = {
    neutral: '',
    gold: 'badge--gold',
    dark: 'badge--dark',
  };
  return <span className={classNames('badge', cls[tone])}>{children}</span>;
}
