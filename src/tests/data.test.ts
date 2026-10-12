import { describe, it, expect } from 'vitest';
import { WATCHES } from '@/data/watches';
import { CATEGORIES, MOVEMENTS } from '@/types';

describe('dataset integrity', () => {
  it('contains at least 12 fictional watches', () => {
    expect(WATCHES.length).toBeGreaterThanOrEqual(12);
  });

  it('has unique ids and slugs', () => {
    expect(new Set(WATCHES.map((w) => w.id)).size).toBe(WATCHES.length);
    expect(new Set(WATCHES.map((w) => w.slug)).size).toBe(WATCHES.length);
    expect(new Set(WATCHES.map((w) => w.reference)).size).toBe(WATCHES.length);
  });

  it('every watch has a valid category and movement', () => {
    for (const w of WATCHES) {
      expect(CATEGORIES).toContain(w.category);
      expect(MOVEMENTS).toContain(w.specs.movement);
    }
  });

  it('every watch has at least one image and a positive price', () => {
    for (const w of WATCHES) {
      expect(w.images.length).toBeGreaterThan(0);
      expect(w.price).toBeGreaterThan(0);
    }
  });
});
