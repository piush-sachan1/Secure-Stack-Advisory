import React, { useState } from 'react';
import { SERVICES_LIST } from '../data/contentData';
import { ServiceDetail } from '../types';
import { ArrowUpRight, Cpu, ShieldCheck, Cloud, Award, Sparkles } from 'lucide-react';

interface ServicesGridProps {
  onSelectService: (service: ServiceDetail) => void;
  selectedFilterPractice?: string | null;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  onSelectService,
  selectedFilterPractice = null,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>(selectedFilterPractice || 'all');

  const filterTabs = [
    { id: 'all', label: 'All Services (8)' },
    { id: 'ai-security', label: 'AI Security' },
    { id: 'devsecops', label: 'DevSecOps & AppSec' },
    { id: 'cloud-security', label: 'Cloud Security' },
    { id: 'advisory-compliance', label: 'Advisory & Compliance' },
  ];

  const filteredServices =
    activeFilter === 'all'
      ? SERVICES_LIST
      : SERVICES_LIST.filter((s) => s.practiceId === activeFilter);

  return (
    <section id="services" className="py-24 bg-slate-900 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold mb-2">
              Catalog of Specialized Engagements
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Consulting Services & Assessments
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md">
            Click any service to inspect our named methodology, verification deliverables, and technical scoping criteria.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                  : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 8 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => {
            const isFeatured = service.id === 'ai-security-review';
            return (
              <div
                key={service.id}
                onClick={() => onSelectService(service)}
                className={`p-6 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
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
                  <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2">
                    {service.practiceId.replace('-', ' ')}
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-3 mb-5 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {service.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-900 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-white">
                  <span>View Scope & Deliverables</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
