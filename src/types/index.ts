export type Category = 'classico' | 'esportivo' | 'mergulho' | 'cronografo';
export type Movement = 'automatico' | 'manual' | 'quartzo';

export interface WatchSpecs {
  movement: Movement;
  movementLabel: string;
  caseMaterial: string;
  strapMaterial: string;
  caseDiameter: string;
  waterResistance: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  reference: string;
  category: Category;
  price: number;
  shortDescription: string;
  description: string;
  images: string[];
  specs: WatchSpecs;
  featured: boolean;
  stock: number;
}

export interface CartLine {
  productId: string;
  slug: string;
  name: string;
  reference: string;
  price: number;
  image: string;
  quantity: number;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  classico: 'Clássico',
  esportivo: 'Esportivo',
  mergulho: 'Mergulho',
  cronografo: 'Cronógrafo',
};

export const MOVEMENT_LABELS: Record<Movement, string> = {
  automatico: 'Automático',
  manual: 'Corda manual',
  quartzo: 'Quartzo',
};

export const CATEGORIES: Category[] = ['classico', 'esportivo', 'mergulho', 'cronografo'];
export const MOVEMENTS: Movement[] = ['automatico', 'manual', 'quartzo'];
