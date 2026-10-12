import { describe, it, expect } from 'vitest';
import { filterWatches, DEFAULT_FILTERS, type FilterState } from '@/lib/filters';
import { WATCHES } from '@/data/watches';

const f = (over: Partial<FilterState> = {}): FilterState => ({ ...DEFAULT_FILTERS, ...over });

describe('filterWatches', () => {
  it('returns all products when no filter is applied', () => {
    const r = filterWatches(WATCHES, f());
    expect(r.length).toBe(WATCHES.length);
  });

  it('searches by product name (accent-insensitive)', () => {
    const r = filterWatches(WATCHES, f({ query: 'heritage' }));
    expect(r.every((p) => /heritage/i.test(p.name))).toBe(true);
    expect(r.length).toBeGreaterThan(0);
  });

  it('searches by reference', () => {
    const r = filterWatches(WATCHES, f({ query: 'CHR-AU-MPH' }));
    expect(r.length).toBe(1);
    expect(r[0]?.reference).toBe('CHR-AU-MPH');
  });

  it('filters by category', () => {
    const r = filterWatches(WATCHES, f({ categories: ['mergulho'] }));
    expect(r.every((p) => p.category === 'mergulho')).toBe(true);
    expect(r.length).toBeGreaterThan(0);
  });

  it('filters by movement', () => {
    const r = filterWatches(WATCHES, f({ movements: ['quartzo'] }));
    expect(r.every((p) => p.specs.movement === 'quartzo')).toBe(true);
  });

  it('combines category + movement filters (both preserved)', () => {
    const r = filterWatches(WATCHES, f({
      categories: ['classico'],
      movements: ['manual'],
    }));
    expect(r.every((p) => p.category === 'classico' && p.specs.movement === 'manual')).toBe(true);
    expect(r.length).toBeGreaterThan(0);
  });

  it('filters by price range', () => {
    const r = filterWatches(WATCHES, f({ minPrice: 10000, maxPrice: 30000 }));
    expect(r.every((p) => p.price >= 10000 && p.price <= 30000)).toBe(true);
  });

  it('sorts by price ascending', () => {
    const r = filterWatches(WATCHES, f({ sort: 'price-asc' }));
    for (let i = 1; i < r.length; i += 1) {
      expect(r[i - 1]!.price).toBeLessThanOrEqual(r[i]!.price);
    }
  });

  it('sorts by price descending', () => {
    const r = filterWatches(WATCHES, f({ sort: 'price-desc' }));
    for (let i = 1; i < r.length; i += 1) {
      expect(r[i - 1]!.price).toBeGreaterThanOrEqual(r[i]!.price);
    }
  });

  it('sorts by name (A — Z)', () => {
    const r = filterWatches(WATCHES, f({ sort: 'name-asc' }));
    for (let i = 1; i < r.length; i += 1) {
      expect(r[i - 1]!.name.localeCompare(r[i]!.name, 'pt-BR')).toBeLessThanOrEqual(0);
    }
  });

  it('returns empty array when no match', () => {
    const r = filterWatches(WATCHES, f({ query: 'zzz-nao-existe' }));
    expect(r.length).toBe(0);
  });
});
