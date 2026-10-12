import type { CartLine } from '@/types';

export const MAX_QTY = 99;

export type CartAction =
  | { type: 'add'; line: CartLine }
  | { type: 'setQty'; productId: string; quantity: number }
  | { type: 'remove'; productId: string }
  | { type: 'clear' }
  | { type: 'replace'; lines: CartLine[] };

export interface CartState { lines: CartLine[]; }

const clampQty = (n: number): number => {
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.min(MAX_QTY, Math.floor(n)));
};

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add': {
      const existing = state.lines.find((l) => l.productId === action.line.productId);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.productId === action.line.productId
              ? { ...l, quantity: clampQty(l.quantity + action.line.quantity) }
              : l,
          ),
        };
      }
      return {
        lines: [...state.lines, { ...action.line, quantity: clampQty(action.line.quantity) }],
      };
    }
    case 'setQty': {
      const q = Math.max(0, Math.min(MAX_QTY, Math.floor(action.quantity)));
      if (q === 0) {
        return { lines: state.lines.filter((l) => l.productId !== action.productId) };
      }
      return {
        lines: state.lines.map((l) =>
          l.productId === action.productId ? { ...l, quantity: q } : l,
        ),
      };
    }
    case 'remove':
      return { lines: state.lines.filter((l) => l.productId !== action.productId) };
    case 'clear':
      return { lines: [] };
    case 'replace':
      return { lines: action.lines };
    default:
      return state;
  }
}

export const cartSubtotal = (lines: CartLine[]): number =>
  Math.round(lines.reduce((sum, l) => sum + l.price * l.quantity, 0) * 100) / 100;

export const cartCount = (lines: CartLine[]): number =>
  lines.reduce((sum, l) => sum + l.quantity, 0);

/**
 * Validate untrusted persisted data.
 * Anything that does not match the expected shape is discarded.
 */
export function sanitizeStoredLines(raw: unknown): CartLine[] {
  if (!Array.isArray(raw)) return [];
  const out: CartLine[] = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const o = item as Record<string, unknown>;
    const productId = typeof o.productId === 'string' ? o.productId : null;
    const slug = typeof o.slug === 'string' ? o.slug : null;
    const name = typeof o.name === 'string' ? o.name : null;
    const reference = typeof o.reference === 'string' ? o.reference : null;
    const price = typeof o.price === 'number' && o.price >= 0 ? o.price : null;
    const image = typeof o.image === 'string' ? o.image : null;
    const quantity = typeof o.quantity === 'number' ? Math.max(1, Math.min(MAX_QTY, Math.floor(o.quantity))) : null;
    if (!productId || !slug || !name || !reference || price === null || image === null || quantity === null) continue;
    out.push({ productId, slug, name, reference, price, image, quantity });
  }
  return out;
}
