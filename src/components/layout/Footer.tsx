import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <p className="footer__brand">CHRONOS</p>
            <p className="footer__brand-sub">RELOJOARIA</p>
            <p className="footer__blurb">
              Loja fictícia de relógios de alta relojoaria criada como peça de
              portfólio. Todas as peças, referências e descrições são inventadas.
            </p>
          </div>

          <div>
            <h3 className="footer__title">Navegação</h3>
            <ul className="footer__list">
              <li><Link to="/">Início</Link></li>
              <li><Link to="/relogios">Coleção completa</Link></li>
              <li><Link to="/carrinho">Carrinho</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="footer__title">Atendimento</h3>
            <ul className="footer__list">
              <li><a href="mailto:contato@chronos.example">contato@chronos.example</a></li>
              <li><span style={{ color: 'rgba(245,241,232,0.55)' }}>+55 11 0000-0000 (fictício)</span></li>
              <li><span style={{ color: 'rgba(245,241,232,0.55)' }}>Seg. a sex., 10h — 19h</span></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Chronos Relojoaria — Projeto fictício</span>
          <span>Demonstração · Sem vendas reais</span>
        </div>
      </div>
    </footer>
  );
}
