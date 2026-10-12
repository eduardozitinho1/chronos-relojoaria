import type { Category, Movement, Product } from '@/types';
import { normalize } from './format';

export type SortKey = 'price-asc' | 'price-desc' | 'name-asc';

export interface FilterState {
  query: string;
  categories: Category[];
  movements: Movement[];
  minPrice: number | null;
  maxPrice: number | null;
  sort: SortKey;
}

export const DEFAULT_FILTERS: FilterState = {
  query: '',
  categories: [],
  movements: [],
  minPrice: null,
  maxPrice: null,
  sort: 'price-asc',
};

export function filterWatches(products: Product[], f: FilterState): Product[] {
  const q = normalize(f.query.trim());

  const filtered = products.filter((p) => {
    if (q) {
      const haystack = normalize(`${p.name} ${p.reference} ${p.shortDescription}`);
      if (!haystack.includes(q)) return false;
    }
    if (f.categories.length && !f.categories.includes(p.category)) return false;
    if (f.movements.length && !f.movements.includes(p.specs.movement)) return false;
    if (f.minPrice !== null && p.price < f.minPrice) return false;
    if (f.maxPrice !== null && p.price > f.maxPrice) return false;
    return true;
  });

  return filtered.sort((a, b) => {
    switch (f.sort) {
      case 'price-desc': return b.price - a.price;
      case 'name-asc':   return a.name.localeCompare(b.name, 'pt-BR');
      case 'price-asc':
      default:           return a.price - b.price;
    }
  });
}
