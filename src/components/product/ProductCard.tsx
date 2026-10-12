import { Link } from 'react-router-dom';
import type { Product } from '@/types';
import { CATEGORY_LABELS, MOVEMENT_LABELS } from '@/types';
import { formatBRL } from '@/lib/format';
import { SmartImage } from '@/components/ui/SmartImage';

export function ProductCard({ product }: { product: Product }) {
  const soldOut = product.stock <= 0;

  return (
    <article className="card">
      <Link to={`/relogios/${product.slug}`} className="card__media" aria-label={`Ver ${product.name}`}>
        <SmartImage
          src={product.images[0] ?? ''}
          alt={`${product.name} — vista principal`}
          frameClassName=""
        />
        {soldOut ? (
          <span className="card__badge">Esgotado</span>
        ) : product.featured ? (
          <span className="card__badge card__badge--gold">Destaque</span>
        ) : null}
      </Link>

      <div className="card__body">
        <p className="card__ref">{product.reference}</p>
        <h3 className="card__name">
          <Link to={`/relogios/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="card__meta">
          {CATEGORY_LABELS[product.category]} · {MOVEMENT_LABELS[product.specs.movement]}
        </p>
        <div className="card__row">
          <span className="card__price">{formatBRL(product.price)}</span>
        </div>
      </div>
    </article>
  );
}
