import { useMemo, useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import type { Category, Movement } from '@/types';
import { CATEGORIES, CATEGORY_LABELS, MOVEMENTS, MOVEMENT_LABELS } from '@/types';
import { WATCHES } from '@/data/watches';
import {
  DEFAULT_FILTERS,
  filterWatches,
  type FilterState,
  type SortKey,
} from '@/lib/filters';
import { ProductGrid } from '@/components/product/ProductGrid';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { useDebounced } from '@/hooks/useDebounced';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'price-asc', label: 'Menor preço' },
  { value: 'price-desc', label: 'Maior preço' },
  { value: 'name-asc', label: 'Nome (A — Z)' },
];

export default function Catalog() {
  useDocumentTitle('Coleção completa');

  const [state, setState] = useState<FilterState>(DEFAULT_FILTERS);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const debouncedQuery = useDebounced(state.query, 200);
  const effective: FilterState = { ...state, query: debouncedQuery };

  const results = useMemo(() => filterWatches(WATCHES, effective), [effective]);

  const toggleCategory = (c: Category) => {
    setState((s) => ({
      ...s,
      categories: s.categories.includes(c)
        ? s.categories.filter((x) => x !== c)
        : [...s.categories, c],
    }));
  };

  const toggleMovement = (m: Movement) => {
    setState((s) => ({
      ...s,
      movements: s.movements.includes(m)
        ? s.movements.filter((x) => x !== m)
        : [...s.movements, m],
    }));
  };

  const parsePriceInput = (raw: string): number | null => {
    if (raw.trim() === '') return null;
    const n = Number(raw);
    return Number.isFinite(n) && n >= 0 ? n : null;
  };

  const clearAll = () => setState({ ...DEFAULT_FILTERS, sort: state.sort });

  const filterPanel = (prefix: 'desktop' | 'mobile') => (
    <div className="catalog__aside">
      <div className="field">
        <label className="field__label" htmlFor={`${prefix}-search-input`}>Buscar</label>
        <input
          id={`${prefix}-search-input`}
          type="search"
          className="field__control"
          placeholder="Nome ou referência…"
          value={state.query}
          onChange={(e) => setState((s) => ({ ...s, query: e.target.value }))}
        />
      </div>

      <div className="filter-group">
        <h3 className="filter-group__title">Categoria</h3>
        <div className="filter-group__list">
          {CATEGORIES.map((c) => (
            <label key={c} className="filter-check">
              <input
                type="checkbox"
                checked={state.categories.includes(c)}
                onChange={() => toggleCategory(c)}
              />
              <span>{CATEGORY_LABELS[c]}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h3 className="filter-group__title">Movimento</h3>
        <div className="filter-group__list">
          {MOVEMENTS.map((m) => (
            <label key={m} className="filter-check">
              <input
                type="checkbox"
                checked={state.movements.includes(m)}
                onChange={() => toggleMovement(m)}
              />
              <span>{MOVEMENT_LABELS[m]}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h3 className="filter-group__title">Faixa de preço (R$)</h3>
        <div className="filter-price">
          <label className="sr-only" htmlFor={`${prefix}-min-price`}>Preço mínimo</label>
          <input
            id={`${prefix}-min-price`} type="number" inputMode="numeric" min={0}
            className="field__control" placeholder="Mínimo"
            value={state.minPrice ?? ''}
            onChange={(e) => setState((s) => ({ ...s, minPrice: parsePriceInput(e.target.value) }))}
          />
          <span className="filter-price__sep" aria-hidden>—</span>
          <label className="sr-only" htmlFor={`${prefix}-max-price`}>Preço máximo</label>
          <input
            id={`${prefix}-max-price`} type="number" inputMode="numeric" min={0}
            className="field__control" placeholder="Máximo"
            value={state.maxPrice ?? ''}
            onChange={(e) => setState((s) => ({ ...s, maxPrice: parsePriceInput(e.target.value) }))}
          />
        </div>
      </div>

      <button type="button" className="catalog__clear" onClick={clearAll}>
        Limpar filtros
      </button>
    </div>
  );

  return (
    <div className="container">
      <header className="page-heading">
        <p className="eyebrow">Coleção</p>
        <h1>Todos os relógios</h1>
        <p>
          {WATCHES.length} peças fictícias. Use os filtros para refinar por categoria,
          movimento ou faixa de preço.
        </p>
      </header>

      <div className="catalog" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
        <aside className="catalog__sidebar" aria-label="Filtros do catálogo">
          {filterPanel('desktop')}
        </aside>

        <div>
          <div className="catalog__toolbar">
            <button
              type="button"
              className="btn btn--ghost btn--sm catalog__mobile-toggle"
              onClick={() => setDrawerOpen(true)}
            >
              <SlidersHorizontal size={14} aria-hidden />
              Filtros
            </button>

            <p className="catalog__count" aria-live="polite">
              {results.length} {results.length === 1 ? 'resultado' : 'resultados'}
            </p>

            <div className="catalog__sort">
              <label className="field__label" htmlFor="sort-select" style={{ display: 'block', marginBottom: 4 }}>
                Ordenar por
              </label>
              <select
                id="sort-select"
                className="field__control field__select"
                value={state.sort}
                onChange={(e) => setState((s) => ({ ...s, sort: e.target.value as SortKey }))}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {results.length === 0 ? (
            <EmptyState
              eyebrow="Sem resultados"
              title="Nenhum relógio corresponde aos filtros."
              body="Tente ajustar a busca, remover filtros ou ampliar a faixa de preço."
              ctaTo="/relogios"
              ctaLabel="Ver toda a coleção"
            />
          ) : (
            <ProductGrid products={results} />
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="catalog__drawer" role="dialog" aria-modal="true" aria-label="Filtros">
          <div className="catalog__drawer-head">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}>Filtros</h2>
            <button
              type="button"
              className="header__icon-btn"
              aria-label="Fechar filtros"
              onClick={() => setDrawerOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
          {filterPanel('mobile')}
          <div style={{ marginTop: '2rem' }}>
            <Button block onClick={() => setDrawerOpen(false)}>
              Ver {results.length} resultado{results.length === 1 ? '' : 's'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
