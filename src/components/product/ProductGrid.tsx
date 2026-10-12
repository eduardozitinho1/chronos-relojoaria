import type { Product } from '@/types';
import { ProductCard } from './ProductCard';

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid-products">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
