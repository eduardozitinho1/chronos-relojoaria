const BRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatBRL = (value: number): string => BRL.format(value);

export const classNames = (
  ...parts: Array<string | false | null | undefined>
): string => parts.filter(Boolean).join(' ');

/** Normalizes text for accent-insensitive, case-insensitive search. */
export const normalize = (s: string): string =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
