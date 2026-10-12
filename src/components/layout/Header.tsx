import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { classNames } from '@/lib/format';

const NAV = [
  { to: '/', label: 'Início', end: true },
  { to: '/relogios', label: 'Coleção', end: false },
];

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? 'hidden' : prev;
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <button
            type="button"
            className="header__icon-btn header__menu-btn"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>

          <nav className="header__nav" aria-label="Navegação principal">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  classNames(
                    'header__nav-link',
                    isActive && 'header__nav-link--active',
                  )
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <Link to="/" className="header__brand" aria-label="Chronos Relojoaria — início">
            <span className="header__brand-name">CHRONOS</span>
            <span className="header__brand-sub">RELOJOARIA</span>
          </Link>

          <div className="header__actions">
            <Link
              to="/carrinho"
              className="header__icon-btn header__cart"
              aria-label={`Carrinho, ${count} ${count === 1 ? 'item' : 'itens'}`}
            >
              <ShoppingBag size={19} />
              {count > 0 && (
                <span className="header__cart-count" aria-hidden>
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="mobile-menu" role="dialog" aria-label="Menu">
          <nav className="mobile-menu__nav" aria-label="Navegação mobile">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end} className="mobile-menu__link">
                {n.label}
              </NavLink>
            ))}
            <NavLink to="/carrinho" className="mobile-menu__link">
              Carrinho {count > 0 && <span style={{ marginLeft: 8, fontSize: '0.9rem', color: 'var(--muted)' }}>({count})</span>}
            </NavLink>
          </nav>
          <p className="mobile-menu__small">Projeto fictício de portfólio</p>
        </div>
      )}
    </header>
  );
}
