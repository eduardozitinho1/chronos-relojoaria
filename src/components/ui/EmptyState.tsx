import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface Props {
  eyebrow?: string;
  title: string;
  body?: string;
  ctaTo?: string;
  ctaLabel?: string;
  children?: ReactNode;
}

export function EmptyState({ eyebrow, title, body, ctaTo, ctaLabel, children }: Props) {
  return (
    <div className="empty">
      {eyebrow && <p className="empty__eyebrow">{eyebrow}</p>}
      <h2 className="empty__title">{title}</h2>
      {body && <p className="empty__body">{body}</p>}
      {ctaTo && ctaLabel && (
        <Link to={ctaTo} className="btn btn--primary empty__cta">
          {ctaLabel}
        </Link>
      )}
      {children}
    </div>
  );
}
