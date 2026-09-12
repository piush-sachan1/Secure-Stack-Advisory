import React, { useState } from 'react';
import { INSIGHTS } from '../data/contentData';
import { InsightPost } from '../types';
import { Clock, ArrowUpRight, BookOpen, X, Check, RefreshCw } from 'lucide-react';
import { ProgressiveImage } from './ProgressiveImage';
import { InsightsSectionSkeleton } from './ThemedSkeleton';

interface InsightsSectionProps {
  isLoading?: boolean;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ isLoading = false }) => {
  const [selectedArticle, setSelectedArticle] = useState<InsightPost | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(isLoading);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 300);
  };

  return (
    <section id="insights" className="py-20 sm:py-24 bg-slate-900 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold mb-2">
              Engineering Whitepapers & Research
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Advisory Field Notes
            </h2>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md">
            Unfiltered technical analyses derived directly from our recent adversarial engagements and threat modeling sprints.
          </p>
        </div>

        {/* 3 Articles Grid or Themed Skeleton */}
        {isRefreshing ? (
          <InsightsSectionSkeleton count={3} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 animate-in fade-in duration-200">
            {INSIGHTS.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedArticle(post)}
                className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between cursor-pointer group hover:shadow-xl overflow-hidden"
              >
                <div>
                  {/* High-Resolution Responsive Image Graphic */}
                  {post.imageUrl && (
                    <div className="mb-4 rounded-xl overflow-hidden border border-slate-850">
                      <ProgressiveImage
                        src={post.imageUrl}
                        alt={post.title}
                        aspectRatio="aspect-[16/9]"
                        className="group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* Meta details */}
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-3">
                    <span className="text-[11px] font-semibold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-900">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-500">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-300 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-6 line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                {/* Author & CTA */}
                <div className="pt-4 border-t border-slate-850 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-200 block">
                      {post.author.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {post.publishDate}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-slate-700 transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Reading Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 text-slate-100 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase text-blue-400 bg-blue-950/80 px-2.5 py-0.5 rounded border border-blue-800">
                  {selectedArticle.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {selectedArticle.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 font-mono">
                  <span>By {selectedArticle.author.name}</span>
                  <span>•</span>
                  <span>{selectedArticle.publishDate}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedArticle.imageUrl && (
              <div className="rounded-xl overflow-hidden border border-slate-800">
                <ProgressiveImage
                  src={selectedArticle.imageUrl}
                  alt={selectedArticle.title}
                  aspectRatio="aspect-[16/8]"
                />
              </div>
            )}

            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedArticle.summary}
            </p>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Executive Architecture Takeaways:
              </h4>
              <div className="space-y-2">
                {selectedArticle.keyTakeaways.map((point, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200 leading-relaxed font-medium">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
              >
                Close Field Note
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
