import '@testing-library/jest-dom/vitest';

// jsdom does not implement matchMedia; several animations rely on it.
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }) as MediaQueryList;
}

// jsdom does not implement scrollTo.
if (typeof window !== 'undefined' && !window.scrollTo) {
  window.scrollTo = () => {};
}
