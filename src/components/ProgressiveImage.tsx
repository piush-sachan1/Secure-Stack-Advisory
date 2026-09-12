import React, { useState } from 'react';
import { ImageOff, Sparkles } from 'lucide-react';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  sizes?: string;
  srcSet?: string;
  priority?: boolean;
}

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  aspectRatio = 'aspect-video',
  sizes,
  srcSet,
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-slate-950/80 ${aspectRatio} ${containerClassName}`}
    >
      {/* Progressive Shimmer / Skeleton Placeholder (visible until high-res image finishes loading) */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 animate-pulse">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-500/40 uppercase tracking-widest select-none">
            <Sparkles className="w-3 h-3 animate-spin" />
            <span>Telemetry Visual</span>
          </div>
        </div>
      )}

      {/* Error Fallback */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-slate-900/90 text-slate-500 text-center space-y-1">
          <ImageOff className="w-5 h-5 text-slate-600" />
          <span className="text-[10px] font-mono">Image stream unavailable</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          sizes={sizes}
          srcSet={srcSet}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-sm'
          } ${className}`}
        />
      )}
    </div>
  );
};
