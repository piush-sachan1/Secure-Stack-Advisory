import React from 'react';
import { CONSULTANTS } from '../data/contentData';
import { MapPin, Award, CheckCircle2, Shield } from 'lucide-react';

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-24 bg-slate-950 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold mb-2">
            Senior Engineering Practitioners
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            You Work Directly With Principals
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Unlike traditional consulting firms that staff engagements with junior analysts supervised by remote partners, every SecureStack assessment is planned, executed, and defended by senior engineers with 14+ years of hands-on offensive experience.
          </p>
        </div>

        {/* 3 Consultant Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CONSULTANTS.map((member, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Avatar / Monogram Header */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700 flex items-center justify-center font-mono font-bold text-lg text-blue-400 shadow-inner">
                    {member.avatarSeed}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-xs font-medium text-blue-400 mt-0.5">
                      {member.role}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                      <MapPin className="w-3 h-3" />
                      {member.location}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {member.bio}
                </p>

                {/* Prior Pedigree */}
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 mb-5 leading-relaxed">
                  <strong className="text-slate-300 block mb-0.5 font-mono text-[10px] uppercase">
                    Background:
                  </strong>
                  {member.priorExperience}
                </div>
              </div>

              {/* Certifications & Badges */}
              <div className="pt-4 border-t border-slate-800">
                <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider block mb-2">
                  Verified Certifications
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {member.certifications.map((cert, cIdx) => (
                    <span
                      key={cIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-950 text-slate-300 border border-slate-700/80"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
