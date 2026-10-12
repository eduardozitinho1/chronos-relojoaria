import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { classNames } from '@/lib/format';

type Variant = 'primary' | 'gold' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  children: ReactNode;
}

const variantClass: Record<Variant, string> = {
  primary: 'btn--primary',
  gold: 'btn--gold',
  outline: 'btn--outline',
  ghost: 'btn--ghost',
};

const sizeClass: Record<Size, string> = {
  sm: 'btn--sm',
  md: '',
  lg: 'btn--lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', block, className, type = 'button', children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={classNames('btn', variantClass[variant], sizeClass[size], block && 'btn--block', className)}
      {...rest}
    >
      {children}
    </button>
  );
});

interface LinkButtonProps {
  to: string;
  variant?: Variant;
  size?: Size;
  block?: boolean;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}

export function LinkButton({
  to, variant = 'primary', size = 'md', block, className, children, ariaLabel,
}: LinkButtonProps) {
  return (
    <Link
      to={to}
      aria-label={ariaLabel}
      className={classNames('btn', variantClass[variant], sizeClass[size], block && 'btn--block', className)}
    >
      {children}
    </Link>
  );
}
