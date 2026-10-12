import { describe, it, expect } from 'vitest';
import { formatBRL, normalize, classNames } from '@/lib/format';

describe('formatBRL', () => {
  it('formats whole numbers as Brazilian real', () => {
    const out = formatBRL(18900);
    expect(out).toContain('18.900');
    expect(out).toMatch(/R\$\s?18\.900,00/);
  });

  it('formats decimals with comma separator', () => {
    const out = formatBRL(1234.5);
    expect(out).toMatch(/R\$\s?1\.234,50/);
  });

  it('handles zero', () => {
    expect(formatBRL(0)).toMatch(/R\$\s?0,00/);
  });
});

describe('normalize', () => {
  it('strips accents and lowercases', () => {
    expect(normalize('Coleção')).toBe('colecao');
    expect(normalize('Relógio')).toBe('relogio');
  });
});

describe('classNames', () => {
  it('joins truthy parts', () => {
    expect(classNames('a', false, 'b', null, undefined, 'c')).toBe('a b c');
  });
});
