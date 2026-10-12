# Chronos Relojoaria

**A fictional luxury-watch storefront built as a developer portfolio piece.**

Chronos Relojoaria is not a real store. It is a demonstration e-commerce
built to showcase front-end engineering quality — clean architecture,
strict typing, accessible UI, and a coherent classic-luxury visual system.

> **No real orders, payments, shipments, or customer accounts.**
> Every product, reference, spec, and price is fictional.

## Stack

- React 18 + TypeScript (strict) + Vite
- React Router v6
- lucide-react icons
- Plain CSS, organized into structured stylesheets
- Vitest + Testing Library

## Getting started

    npm install
    npm run dev

Then open http://localhost:5173.

## Scripts

    npm run dev        Start the Vite dev server
    npm run build      Type-check + production build
    npm run preview    Preview the built output
    npm run typecheck  TypeScript only
    npm test           Run the test suite

## Project structure

    src/
      components/
        layout/        Announcement, Header, Footer, Layout
        product/       ProductCard, ProductGrid
        ui/            Button, SmartImage, QuantitySelector, EmptyState, Badge
      context/         CartContext (localStorage-backed)
      data/            watches.ts — the single source of truth for products
      hooks/           useDebounced, useDocumentTitle
      lib/             cart, filters, format, storage
      pages/           Home, Catalog, ProductDetail, Cart, NotFound
      styles/          tokens, base, layout, components, shell, product,
                       detail, cart, utilities
      tests/           cart, filters, format, data
      types/           shared domain types

## Product data

All products live in `src/data/watches.ts`. Components never redeclare
products — the dataset is the single source of truth.

## Cart persistence

The cart is persisted in `localStorage` under `chronos:cart:lines`.
Stored data is sanitized on hydration: malformed entries are dropped and
quantities are clamped. Totals are always recalculated from product prices
and quantities — no stored total is trusted.

## Routes

    /                   Home
    /relogios           Catalog (search, filters, sort)
    /relogios/:slug     Product detail
    /carrinho           Cart
    *                   Not found

## Scope

This is a frontend-only demonstration. There is no backend, no database,
no authentication, no payment processing, no order submission. The
"Finalizar compra" button in the cart is intentionally disabled.

## License

MIT.

**Chronos Relojoaria is and always will be a fictional brand.**
