import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { CATEGORY_LABELS, MOVEMENT_LABELS } from '@/types';
import { WATCHES } from '@/data/watches';
import { formatBRL } from '@/lib/format';
import { useCart } from '@/context/CartContext';
import { SmartImage } from '@/components/ui/SmartImage';
import { Button, LinkButton } from '@/components/ui/Button';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { ProductGrid } from '@/components/product/ProductGrid';
import { NotFoundContent } from '@/pages/NotFound';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = useMemo(() => WATCHES.find((w) => w.slug === slug), [slug]);
  const { add } = useCart();

  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    setQty(1);
    setActiveImg(0);
    setFeedback(null);
  }, [slug]);

  useEffect(() => {
    if (!feedback) return;
    const id = setTimeout(() => setFeedback(null), 3200);
    return () => clearTimeout(id);
  }, [feedback]);

  useDocumentTitle(product ? product.name : 'Peça não encontrada');

  if (!product) {
    return (
      <div className="container">
        <NotFoundContent
          eyebrow="Peça não encontrada"
          title="Esta referência não existe na coleção."
          body="O link pode estar desatualizado ou o relógio pode ter saído da vitrine."
        />
      </div>
    );
  }

  const soldOut = product.stock <= 0;

  const handleAdd = () => {
    if (soldOut) return;
    add(product, qty);
    setFeedback(`${product.name} adicionado ao carrinho.`);
  };

  const related = WATCHES
    .filter((w) => w.id !== product.id && w.category === product.category)
    .slice(0, 3);

  return (
    <div className="container">
      <nav className="crumbs" aria-label="Trilha de navegação">
        <Link to="/">Início</Link>
        <span className="crumbs__sep" aria-hidden>/</span>
        <Link to="/relogios">Coleção</Link>
        <span className="crumbs__sep" aria-hidden>/</span>
        <span className="crumbs__current">{product.name}</span>
      </nav>

      <section className="detail">
        {/* Gallery */}
        <div className="detail__gallery">
          <div className="detail__thumbs">
            {product.images.map((src, idx) => (
              <button
                key={src}
                type="button"
                className={`detail__thumb${idx === activeImg ? ' detail__thumb--active' : ''}`}
                onClick={() => setActiveImg(idx)}
                aria-label={`Ver imagem ${idx + 1} de ${product.images.length}`}
                aria-pressed={idx === activeImg}
              >
                <SmartImage src={src} alt="" frameClassName="" showPlaceholder={false} />
              </button>
            ))}
          </div>
          <div className="detail__main">
            <SmartImage
              src={product.images[activeImg] ?? product.images[0] ?? ''}
              alt={`${product.name} — imagem ${activeImg + 1}`}
              frameClassName=""
            />
          </div>
        </div>

        {/* Info */}
        <div className="detail__info">
          <p className="detail__ref">Ref. {product.reference}</p>
          <h1 className="detail__title">{product.name}</h1>
          <p className="detail__price">{formatBRL(product.price)}</p>
          <p className="detail__desc">{product.description}</p>

          <ul className="spec-list">
            <li>
              <span className="spec-list__k">Movimento</span>
              <span className="spec-list__v">{product.specs.movementLabel}</span>
            </li>
            <li>
              <span className="spec-list__k">Caixa</span>
              <span className="spec-list__v">{product.specs.caseMaterial}</span>
            </li>
            <li>
              <span className="spec-list__k">Pulseira</span>
              <span className="spec-list__v">{product.specs.strapMaterial}</span>
            </li>
            <li>
              <span className="spec-list__k">Diâmetro</span>
              <span className="spec-list__v">{product.specs.caseDiameter}</span>
            </li>
            <li>
              <span className="spec-list__k">Resistência</span>
              <span className="spec-list__v">{product.specs.waterResistance}</span>
            </li>
            <li>
              <span className="spec-list__k">Categoria</span>
              <span className="spec-list__v">
                {CATEGORY_LABELS[product.category]} · {MOVEMENT_LABELS[product.specs.movement]}
              </span>
            </li>
          </ul>

          <div className="detail__buy">
            {soldOut ? (
              <p className="detail__stock">Peça esgotada — entre em contato para encomenda.</p>
            ) : (
              <p className="detail__stock">
                {product.stock} {product.stock === 1 ? 'unidade disponível' : 'unidades disponíveis'}
              </p>
            )}
            <div className="detail__buy-row">
              <QuantitySelector value={qty} onChange={setQty} max={Math.max(1, product.stock)} />
              <Button variant="primary" size="lg" onClick={handleAdd} disabled={soldOut}>
                Adicionar ao carrinho
              </Button>
            </div>
            {feedback && (
              <p
                role="status"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  color: '#3f7a3a', fontSize: '0.85rem',
                }}
              >
                <CheckCircle2 size={16} aria-hidden /> {feedback}
              </p>
            )}
            <LinkButton to="/relogios" variant="ghost" size="sm">
              <ArrowLeft size={14} aria-hidden /> Voltar à coleção
            </LinkButton>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--tight" aria-labelledby="related-title">
          <div className="section__head">
            <div>
              <p className="eyebrow">Também nesta linha</p>
              <h2 id="related-title" className="section__title" style={{ marginTop: '0.75rem' }}>
                Peças relacionadas
              </h2>
            </div>
          </div>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
