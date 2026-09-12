import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const SectionLoader: React.FC<{ label?: string }> = ({ label = 'Loading Architecture Module...' }) => {
  return (
    <div className="py-24 sm:py-32 flex flex-col items-center justify-center space-y-4 text-center px-4">
      <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 animate-pulse shadow-lg shadow-cyan-950">
        <ShieldCheck className="w-6 h-6 animate-spin" />
      </div>
      <div className="space-y-1">
        <div className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
          {label}
        </div>
        <div className="text-[11px] font-mono text-slate-500">
          Decrypting SecureStack Telemetry & Controls
        </div>
      </div>
    </div>
  );
};
