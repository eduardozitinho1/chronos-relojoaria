import { Link } from 'react-router-dom';
import { LinkButton } from '@/components/ui/Button';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

interface ContentProps {
  eyebrow?: string;
  title?: string;
  body?: string;
}

export function NotFoundContent({
  eyebrow = 'Erro 404',
  title = 'Página não encontrada.',
  body = 'O endereço que você tentou acessar não existe neste site.',
}: ContentProps) {
  return (
    <div className="notfound">
      <p className="notfound__code">{eyebrow}</p>
      <h1 className="notfound__title">{title}</h1>
      <p className="notfound__body">{body}</p>
      <div className="notfound__cta">
        <LinkButton to="/" variant="primary">Voltar ao início</LinkButton>
        <LinkButton to="/relogios" variant="ghost">Ver a coleção</LinkButton>
      </div>
      <p style={{ marginTop: '2rem', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)' }}>
        <Link to="/relogios">Ou explore a coleção completa</Link>
      </p>
    </div>
  );
}

export default function NotFound() {
  useDocumentTitle('Página não encontrada');
  return (
    <div className="container">
      <NotFoundContent />
    </div>
  );
}
