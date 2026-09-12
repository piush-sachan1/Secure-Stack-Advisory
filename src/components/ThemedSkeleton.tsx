import React from 'react';
import { ShieldCheck, Cpu, Terminal, Sparkles } from 'lucide-react';

interface ServicesGridSkeletonProps {
  count?: number;
}

export const ServicesGridSkeleton: React.FC<ServicesGridSkeletonProps> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-pulse">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="relative p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between overflow-hidden shadow-lg shadow-black/40 min-h-[340px]"
        >
          {/* Subtle Cyber Glowing Hairline Top Accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

          <div className="space-y-4">
            {/* Top Category Tag + Icon */}
            <div className="flex items-center justify-between">
              <div className="h-3.5 w-24 rounded-full bg-slate-800/80" />
              <div className="w-5 h-5 rounded bg-slate-800/60" />
            </div>

            {/* Title Skeleton */}
            <div className="space-y-1.5 pt-1">
              <div className="h-5 w-4/5 rounded bg-slate-800" />
              <div className="h-5 w-3/5 rounded bg-slate-800/60" />
            </div>

            {/* Description Multi-line */}
            <div className="space-y-2 pt-2">
              <div className="h-3 w-full rounded bg-slate-850" />
              <div className="h-3 w-11/12 rounded bg-slate-850" />
              <div className="h-3 w-3/4 rounded bg-slate-850" />
            </div>

            {/* Technical Tags / Deliverable Pills */}
            <div className="flex flex-wrap gap-1.5 pt-3">
              <div className="h-5 w-16 rounded-md bg-slate-800/70 border border-slate-750" />
              <div className="h-5 w-20 rounded-md bg-slate-800/70 border border-slate-750" />
              <div className="h-5 w-14 rounded-md bg-slate-800/70 border border-slate-750" />
            </div>
          </div>

          {/* Bottom Action Skeleton */}
          <div className="pt-5 border-t border-slate-850 flex items-center justify-between">
            <div className="h-3.5 w-28 rounded bg-cyan-950/60 border border-cyan-800/30" />
            <div className="w-6 h-6 rounded-lg bg-slate-850" />
          </div>
        </div>
      ))}
    </div>
  );
};

interface InsightsSectionSkeletonProps {
  count?: number;
}

export const InsightsSectionSkeleton: React.FC<InsightsSectionSkeletonProps> = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col justify-between overflow-hidden shadow-xl min-h-[380px]"
        >
          <div className="space-y-4">
            {/* Image Placeholder Skeleton */}
            <div className="w-full h-40 rounded-xl bg-slate-900 border border-slate-800/80 relative overflow-hidden flex items-center justify-center">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-500/30">
                <Terminal className="w-4 h-4" />
                <span>Decrypting Research Paper</span>
              </div>
            </div>

            {/* Meta Category & Read Time */}
            <div className="flex items-center justify-between pt-1">
              <div className="h-4 w-28 rounded-full bg-blue-950/70 border border-blue-900/40" />
              <div className="h-3 w-16 rounded bg-slate-800" />
            </div>

            {/* Title */}
            <div className="space-y-1.5 pt-1">
              <div className="h-5 w-full rounded bg-slate-800" />
              <div className="h-5 w-4/5 rounded bg-slate-800/70" />
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-slate-850" />
              <div className="h-3 w-10/12 rounded bg-slate-850" />
            </div>
          </div>

          {/* Author Footer */}
          <div className="pt-4 border-t border-slate-850 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-800" />
              <div className="space-y-1">
                <div className="h-3 w-20 rounded bg-slate-800" />
                <div className="h-2.5 w-14 rounded bg-slate-850" />
              </div>
            </div>
            <div className="w-7 h-7 rounded-lg bg-slate-850" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const PracticesOverviewSkeleton: React.FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-pulse">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-4"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800" />
          <div className="space-y-2">
            <div className="h-4 w-3/4 rounded bg-slate-800" />
            <div className="h-3 w-full rounded bg-slate-850" />
            <div className="h-3 w-5/6 rounded bg-slate-850" />
          </div>
          <div className="pt-2 flex items-center justify-between">
            <div className="h-3 w-20 rounded bg-slate-800/60" />
            <div className="w-4 h-4 rounded bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const ComplianceTrackerSkeleton: React.FC = () => {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-6 animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-6 w-64 rounded bg-slate-800" />
          <div className="h-4 w-96 rounded bg-slate-850" />
        </div>
        <div className="h-10 w-44 rounded-xl bg-slate-900 border border-slate-800" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-850 space-y-3"
          >
            <div className="flex justify-between items-center">
              <div className="h-4 w-28 rounded bg-slate-800" />
              <div className="h-4 w-12 rounded bg-emerald-950/60 border border-emerald-800/40" />
            </div>
            <div className="h-2 w-full rounded bg-slate-800" />
            <div className="h-3 w-3/4 rounded bg-slate-850" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const CaseStudiesSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3"
          >
            <div className="h-3.5 w-24 rounded bg-slate-800" />
            <div className="h-5 w-4/5 rounded bg-slate-800" />
            <div className="h-3 w-1/2 rounded bg-slate-850" />
          </div>
        ))}
      </div>
      <div className="p-8 rounded-3xl bg-slate-950/80 border border-slate-800 min-h-[300px] space-y-6">
        <div className="h-7 w-2/3 rounded bg-slate-800" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-20 rounded-xl bg-slate-900 border border-slate-850" />
          <div className="h-20 rounded-xl bg-slate-900 border border-slate-850" />
          <div className="h-20 rounded-xl bg-slate-900 border border-slate-850" />
        </div>
      </div>
    </div>
  );
};
