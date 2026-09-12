import React, { useState, useEffect } from 'react';
import { SERVICES_LIST } from '../data/contentData';
import { ServiceDetail } from '../types';
import { ArrowUpRight, Sparkles, Search, X, Filter } from 'lucide-react';
import { ServicesGridSkeleton } from './ThemedSkeleton';

interface ServicesGridProps {
  onSelectService: (service: ServiceDetail) => void;
  selectedFilterPractice?: string | null;
  isLoading?: boolean;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  onSelectService,
  selectedFilterPractice = null,
  isLoading: initialLoading = false,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>(selectedFilterPractice || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFiltering, setIsFiltering] = useState<boolean>(initialLoading);

  useEffect(() => {
    if (selectedFilterPractice) {
      setActiveFilter(selectedFilterPractice);
    }
  }, [selectedFilterPractice]);

  const filterTabs = [
    { id: 'all', label: `All Services (${SERVICES_LIST.length})` },
    { id: 'ai-security', label: `AI Security (${SERVICES_LIST.filter(s => s.practiceId === 'ai-security').length})` },
    { id: 'devsecops', label: `DevSecOps & AppSec (${SERVICES_LIST.filter(s => s.practiceId === 'devsecops').length})` },
    { id: 'cloud-security', label: `Cloud Security (${SERVICES_LIST.filter(s => s.practiceId === 'cloud-security').length})` },
    { id: 'advisory-compliance', label: `Advisory & Compliance (${SERVICES_LIST.filter(s => s.practiceId === 'advisory-compliance').length})` },
  ];

  const handleFilterChange = (tabId: string) => {
    if (tabId === activeFilter) return;
    setIsFiltering(true);
    setActiveFilter(tabId);
    // Subtle snappy skeleton loader transition to boost perceived performance
    setTimeout(() => {
      setIsFiltering(false);
    }, 220);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const filteredServices = SERVICES_LIST.filter((s) => {
    // Category filter
    if (activeFilter !== 'all' && s.practiceId !== activeFilter) {
      return false;
    }
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = s.title.toLowerCase().includes(q);
      const matchTagline = s.tagline.toLowerCase().includes(q);
      const matchDesc = s.shortDescription.toLowerCase().includes(q);
      const matchProblem = s.problem.toLowerCase().includes(q);
      const matchTags = s.tags.some(t => t.toLowerCase().includes(q));
      return matchTitle || matchTagline || matchDesc || matchProblem || matchTags;
    }
    return true;
  });

  return (
    <section id="services" className="py-16 sm:py-24 bg-slate-900 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4 sm:gap-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold mb-2">
              Catalog of Specialized Engagements
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Consulting Services & Assessments
            </h2>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md leading-relaxed">
            Tap any service to inspect our named methodology, verification deliverables, and technical scoping criteria.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-6 sm:mb-8">
          {/* Search Bar Input */}
          <div className="relative w-full lg:max-w-md shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              id="input-services-search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search services by keyword, tech stack, or framework (e.g., LLM, Kubernetes, SOC 2)..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 hover:border-slate-600 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 font-mono transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 rounded-md hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleFilterChange(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  activeFilter === tab.id
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                    : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Search & Filter Indicator */}
        {(searchQuery.trim() || activeFilter !== 'all') && (
          <div className="flex items-center justify-between mb-4 text-xs font-mono text-slate-400 bg-slate-950/40 px-3.5 py-2 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-3.5 h-3.5 text-blue-400" />
              <span>
                Showing {filteredServices.length} of {SERVICES_LIST.length} services
              </span>
              {searchQuery && (
                <span className="text-slate-200 bg-slate-800 px-2 py-0.5 rounded text-[11px]">
                  Matching: "{searchQuery}"
                </span>
              )}
            </div>
            {(searchQuery || activeFilter !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="text-blue-400 hover:text-blue-300 hover:underline cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>
        )}

        {/* 8 Cards Grid or Custom Skeleton */}
        {isFiltering ? (
          <ServicesGridSkeleton count={filteredServices.length || 4} />
        ) : filteredServices.length === 0 ? (
          <div className="p-8 sm:p-12 text-center rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <Search className="w-8 h-8 text-slate-500 mx-auto opacity-60" />
            <h3 className="text-base font-bold text-white">No Matching Consulting Services</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              We couldn't find any services matching "{searchQuery}". Try adjusting your keywords or clearing the category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors cursor-pointer"
            >
              Clear Search & Show All
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-in fade-in duration-200">
            {filteredServices.map((service) => {
              const isFeatured = service.id === 'ai-security-review';
              return (
                <div
                  key={service.id}
                  onClick={() => onSelectService(service)}
                  className={`p-5 sm:p-6 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                    isFeatured
                      ? 'bg-slate-950/90 border-2 border-blue-500/50 shadow-lg shadow-blue-950/40 hover:border-blue-400'
                      : 'bg-slate-950/70 border border-slate-800 hover:border-slate-700 hover:shadow-xl'
                  }`}
                >
                  {isFeatured && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-mono uppercase font-bold text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800/80">
                      <Sparkles className="w-3 h-3" />
                      Featured Deep-Dive
                    </div>
                  )}

                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-medium mb-2">
                      {service.practiceId.replace('-', ' ')}
                    </div>

                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-3 mb-5 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {service.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-300 border border-slate-700/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-white">
                    <span>View Scope & Deliverables</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
