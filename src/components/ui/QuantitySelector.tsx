import { Minus, Plus } from 'lucide-react';
import { MAX_QTY } from '@/lib/cart';

interface Props {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  label?: string;
  size?: 'sm' | 'md';
}

export function QuantitySelector({
  value, onChange, min = 1, max = MAX_QTY, label = 'Quantidade', size = 'md',
}: Props) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div
      className="qty"
      role="group"
      aria-label={label}
      style={size === 'sm' ? { height: '2.5rem' } : undefined}
    >
      <button
        type="button"
        className="qty__btn"
        onClick={dec}
        disabled={value <= min}
        aria-label="Diminuir quantidade"
      >
        <Minus size={14} />
      </button>
      <span className="qty__value" aria-live="polite">{value}</span>
      <button
        type="button"
        className="qty__btn"
        onClick={inc}
        disabled={value >= max}
        aria-label="Aumentar quantidade"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
