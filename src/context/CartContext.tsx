import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react';
import type { CartLine, Product } from '@/types';
import {
  cartReducer,
  cartCount,
  cartSubtotal,
  sanitizeStoredLines,
} from '@/lib/cart';
import { storage, STORAGE_KEY } from '@/lib/storage';

interface CartCtx {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (product: Product, quantity?: number) => void;
  setQty: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  hydrated: boolean;
}

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { lines: [] });
  const [hydrated, setHydrated] = useState(false);

  // Hydrate ONCE from localStorage, sanitizing untrusted input.
  useEffect(() => {
    const raw = storage.get<unknown>(STORAGE_KEY, null);
    const cleaned = sanitizeStoredLines(raw);
    if (cleaned.length) dispatch({ type: 'replace', lines: cleaned });
    setHydrated(true);
  }, []);

  // Persist on every change (but not before hydration — otherwise we'd wipe
  // the stored value with the initial empty state on first render).
  useEffect(() => {
    if (!hydrated) return;
    storage.set(STORAGE_KEY, state.lines);
  }, [state.lines, hydrated]);

  const add = useCallback((product: Product, quantity = 1) => {
    dispatch({
      type: 'add',
      line: {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        reference: product.reference,
        price: product.price,
        image: product.images[0] ?? '',
        quantity,
      },
    });
  }, []);

  const setQty = useCallback((productId: string, quantity: number) => {
    dispatch({ type: 'setQty', productId, quantity });
  }, []);

  const remove = useCallback((productId: string) => {
    dispatch({ type: 'remove', productId });
  }, []);

  const clear = useCallback(() => dispatch({ type: 'clear' }), []);

  const subtotal = cartSubtotal(state.lines);

  const value = useMemo<CartCtx>(() => ({
    lines: state.lines,
    count: cartCount(state.lines),
    subtotal,
    add,
    setQty,
    remove,
    clear,
    hydrated,
  }), [state.lines, subtotal, add, setQty, remove, clear, hydrated]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart(): CartCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
