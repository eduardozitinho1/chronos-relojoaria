import { describe, it, expect } from 'vitest';
import {
  cartReducer,
  cartSubtotal,
  cartCount,
  sanitizeStoredLines,
  MAX_QTY,
} from '@/lib/cart';
import type { CartLine } from '@/types';

const line = (id: string, price: number, quantity = 1): CartLine => ({
  productId: id,
  slug: id,
  name: `Watch ${id}`,
  reference: `REF-${id}`,
  price,
  image: 'https://example.test/x.jpg',
  quantity,
});

describe('cartReducer', () => {
  it('adds a new line', () => {
    const s = cartReducer({ lines: [] }, { type: 'add', line: line('a', 100) });
    expect(s.lines).toHaveLength(1);
    expect(s.lines[0]?.quantity).toBe(1);
  });

  it('merges quantities when adding the same product', () => {
    let s = { lines: [line('a', 100, 1)] };
    s = cartReducer(s, { type: 'add', line: line('a', 100, 2) });
    expect(s.lines).toHaveLength(1);
    expect(s.lines[0]?.quantity).toBe(3);
  });

  it('clamps added quantity to MAX_QTY', () => {
    let s = { lines: [line('a', 100, MAX_QTY - 1)] };
    s = cartReducer(s, { type: 'add', line: line('a', 100, 5) });
    expect(s.lines[0]?.quantity).toBe(MAX_QTY);
  });

  it('updates quantity', () => {
    const s = cartReducer({ lines: [line('a', 100, 3)] }, {
      type: 'setQty', productId: 'a', quantity: 5,
    });
    expect(s.lines[0]?.quantity).toBe(5);
  });

  it('removes line when quantity is set to 0', () => {
    const s = cartReducer({ lines: [line('a', 100, 3)] }, {
      type: 'setQty', productId: 'a', quantity: 0,
    });
    expect(s.lines).toHaveLength(0);
  });

  it('removes line explicitly', () => {
    const s = cartReducer({ lines: [line('a', 1), line('b', 2)] }, {
      type: 'remove', productId: 'a',
    });
    expect(s.lines.map((l) => l.productId)).toEqual(['b']);
  });

  it('clears all lines', () => {
    const s = cartReducer({ lines: [line('a', 1), line('b', 2)] }, { type: 'clear' });
    expect(s.lines).toHaveLength(0);
  });
});

describe('totals', () => {
  it('computes subtotal correctly', () => {
    const subtotal = cartSubtotal([line('a', 100, 2), line('b', 50.5, 1)]);
    expect(subtotal).toBeCloseTo(250.5, 2);
  });
  it('counts items correctly', () => {
    expect(cartCount([line('a', 1, 2), line('b', 1, 3)])).toBe(5);
  });
});

describe('sanitizeStoredLines', () => {
  it('returns [] for non-array input', () => {
    expect(sanitizeStoredLines(null)).toEqual([]);
    expect(sanitizeStoredLines('oops')).toEqual([]);
    expect(sanitizeStoredLines(42)).toEqual([]);
  });

  it('drops malformed entries', () => {
    const input = [
      line('a', 100),
      { productId: 'b' },                          // missing fields
      { ...line('c', 50), quantity: 'not-a-num' }, // bad quantity
      null,
      { ...line('d', 10), price: -1 },             // negative price
    ];
    const out = sanitizeStoredLines(input);
    expect(out.map((l) => l.productId)).toEqual(['a']);
  });

  it('clamps out-of-range quantities', () => {
    const out = sanitizeStoredLines([{ ...line('a', 100), quantity: 999 }]);
    expect(out[0]?.quantity).toBe(MAX_QTY);
  });
});
