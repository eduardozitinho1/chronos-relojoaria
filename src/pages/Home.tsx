import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { WATCHES } from '@/data/watches';
import { ProductGrid } from '@/components/product/ProductGrid';
import { SmartImage } from '@/components/ui/SmartImage';
import { LinkButton } from '@/components/ui/Button';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const HERO_IMG =
  'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=2000&q=80';
const STORY_IMG =
  'https://images.unsplash.com/photo-1495856455881-7d1e28b03a33?auto=format&fit=crop&w=1400&q=80';

export default function Home() {
  useDocumentTitle();

  const featured = WATCHES.filter((w) => w.featured).slice(0, 4);
  const total = WATCHES.length;

  return (
    <>
      {/* HERO */}
      <section className="hero" aria-labelledby="hero-title">
        <img src={HERO_IMG} alt="" aria-hidden className="hero__img" />
        <div className="hero__veil" aria-hidden />
        <div className="container hero__inner">
          <p className="hero__eyebrow">Precisão · presença · permanência</p>
          <h1 id="hero-title" className="hero__title">
            O tempo, <em>medido com intenção.</em>
          </h1>
          <p className="hero__lead">
            Relógios escolhidos pelo desenho, pela mecânica e pela presença.
            Uma coleção para quem entende que os melhores detalhes não precisam
            chamar atenção para serem lembrados.
          </p>
          <div className="hero__actions">
            <LinkButton to="/relogios" variant="gold" size="lg">
              Explorar a coleção
              <ArrowRight size={14} aria-hidden />
            </LinkButton>
            <LinkButton to="/relogios" variant="outline" size="lg">
              Ver destaques
            </LinkButton>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="section container" aria-labelledby="featured-title">
        <div className="section__head">
          <div>
            <p className="eyebrow">Destaques da casa</p>
            <h2 id="featured-title" className="section__title" style={{ marginTop: '1rem' }}>
              Quatro peças que definem a coleção.
            </h2>
          </div>
          <Link to="/relogios" className="text-link">
            Ver todas as {total} peças
            <ArrowRight size={12} aria-hidden />
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>

      {/* BRAND STORY */}
      <section className="section section--tight" aria-labelledby="story-title">
        <div className="container">
          <div className="brand-story">
            <div className="brand-story__img">
              <SmartImage
                src={STORY_IMG}
                alt="Detalhe de caixa e coroa de um relógio mecânico"
                frameClassName=""
              />
            </div>
            <div>
              <p className="eyebrow">A casa Chronos</p>
              <h2 id="story-title" style={{ marginTop: '1rem' }}>
                Um ateliê fictício, obsessivamente dedicado ao detalhe.
              </h2>
              <p style={{ marginTop: '1.5rem', color: 'var(--muted-2)', lineHeight: 1.75 }}>
                Chronos Relojoaria é uma marca fictícia criada por um desenvolvedor
                de software para demonstrar qualidade de execução em front-end.
                Cada relógio deste site é uma invenção — referências, calibres,
                materiais e preços não correspondem a produtos reais.
              </p>
              <p style={{ marginTop: '1rem', color: 'var(--muted-2)', lineHeight: 1.75 }}>
                O que é real é o código: tipagem estrita, dados centralizados,
                carrinho persistente e uma interface pensada para ser usada no
                celular e no desktop.
              </p>
              <Link to="/relogios" className="text-link" style={{ marginTop: '2rem' }}>
                Explorar a coleção
                <ArrowRight size={12} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CAMPAIGN */}
      <section className="campaign" aria-labelledby="campaign-title">
        <div className="container">
          <p className="eyebrow" style={{ color: 'rgba(212,180,119,0.85)' }}>O essencial permanece</p>
          <h2 id="campaign-title" className="campaign__title" style={{ marginTop: '1.25rem' }}>
            O tempo passa. <em>O estilo permanece.</em>
          </h2>
          <p className="campaign__lead">
            Descubra peças de presença discreta, desenho preciso e elegância sem prazo de validade.
          </p>
          <LinkButton to="/relogios" variant="gold" size="lg" className="campaign__cta">
            Ver a coleção completa
            <ArrowRight size={14} aria-hidden />
          </LinkButton>
        </div>
      </section>
    </>
  );
}
