import { useEffect, useState } from 'react';
import { classNames } from '@/lib/format';

interface Props {
  src: string;
  alt: string;
  className?: string;
  /** Aspect ratio wrapper classes; pass an empty string to inherit the parent. */
  frameClassName?: string;
  /** Whether to render a visible placeholder while loading. */
  showPlaceholder?: boolean;
}

export function SmartImage({
  src,
  alt,
  className,
  frameClassName,
  showPlaceholder = true,
}: Props) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => { setStatus('loading'); }, [src]);

  return (
    <div className={classNames('img-frame', frameClassName)}>
      {showPlaceholder && status === 'loading' && <div className="img-frame__placeholder" aria-hidden />}
      {status === 'error' ? (
        <div className="img-frame__fallback" role="img" aria-label={alt}>
          {alt}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setStatus('ready')}
          onError={() => setStatus('error')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: status === 'ready' ? 1 : 0,
            transition: 'opacity 400ms ease',
          }}
          className={className}
        />
      )}
    </div>
  );
}
