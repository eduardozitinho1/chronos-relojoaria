import { Link } from 'react-router-dom';
import { ArrowRight, Trash2, XCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatBRL } from '@/lib/format';
import { SmartImage } from '@/components/ui/SmartImage';
import { Button } from '@/components/ui/Button';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { EmptyState } from '@/components/ui/EmptyState';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export default function Cart() {
  useDocumentTitle('Carrinho');
  const { lines, subtotal, setQty, remove, clear, hydrated } = useCart();

  if (!hydrated) {
    return (
      <div className="container" style={{ padding: '4rem 0' }}>
        <p className="eyebrow">Carregando carrinho…</p>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 0 5rem' }}>
        <EmptyState
          eyebrow="Carrinho"
          title="Seu carrinho está vazio."
          body="Explore a coleção e adicione peças para vê-las aqui."
          ctaTo="/relogios"
          ctaLabel="Ver a coleção"
        />
      </div>
    );
  }

  const total = subtotal;

  return (
    <div className="container">
      <header className="page-heading">
        <p className="eyebrow">Carrinho</p>
        <h1>Sua seleção</h1>
        <p>
          {lines.length} {lines.length === 1 ? 'peça' : 'peças'} no carrinho.
        </p>
      </header>

      <div className="cart">
        <ul className="cart__list" aria-label="Itens no carrinho">
          {lines.map((line) => (
            <li key={line.productId} className="cart__item">
              <Link to={`/relogios/${line.slug}`} className="cart__thumb" aria-label={`Ver ${line.name}`}>
                <SmartImage src={line.image} alt={`${line.name} — miniatura`} frameClassName="" />
              </Link>
              <div className="cart__body">
                <p className="cart__ref">Ref. {line.reference}</p>
                <Link to={`/relogios/${line.slug}`} className="cart__name">
                  {line.name}
                </Link>
                <p className="cart__unit">Preço unitário: {formatBRL(line.price)}</p>

                <div className="cart__row">
                  <QuantitySelector
                    value={line.quantity}
                    onChange={(q) => setQty(line.productId, q)}
                    size="sm"
                    label={`Quantidade de ${line.name}`}
                  />
                  <span className="cart__line-total">
                    {formatBRL(line.price * line.quantity)}
                  </span>
                  <button
                    type="button"
                    className="cart__remove"
                    onClick={() => remove(line.productId)}
                    aria-label={`Remover ${line.name} do carrinho`}
                  >
                    <Trash2 size={12} aria-hidden /> Remover
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="cart__summary" aria-label="Resumo do carrinho">
          <div className="cart__panel">
            <h2 className="cart__panel-title">Resumo</h2>
            <dl className="cart__totals">
              <div className="cart__total-row">
                <dt>Subtotal</dt>
                <dd>{formatBRL(subtotal)}</dd>
              </div>
              <div className="cart__total-row">
                <dt>Envio</dt>
                <dd>Calculado no checkout</dd>
              </div>
              <div className="cart__total-row cart__total-row--grand">
                <dt>Total</dt>
                <dd>{formatBRL(total)}</dd>
              </div>
            </dl>

            <div className="cart__actions">
              <Button variant="gold" size="lg" block disabled aria-disabled="true">
                Finalizar compra (demo)
              </Button>
              <Button variant="ghost" onClick={clear}>
                <XCircle size={14} aria-hidden /> Esvaziar carrinho
              </Button>
              <Link to="/relogios" className="text-link" style={{ justifyContent: 'center' }}>
                Continuar comprando <ArrowRight size={12} aria-hidden />
              </Link>
            </div>

            <p className="cart__note">
              Demonstração — nenhum pedido real é processado.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
