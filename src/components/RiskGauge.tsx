import React from 'react';

interface RiskGaugeProps {
  score: number; // 0 - 100
  tier: 'Critical' | 'High' | 'Moderate' | 'Low';
  size?: number;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ score, tier, size = 220 }) => {
  // Clamped score between 0 and 100
  const normalizedScore = Math.min(Math.max(score, 0), 100);
  
  // Angle for the needle: 0 corresponds to -180 deg (left), 100 corresponds to 0 deg (right)
  // Or a semi-circular arc: from -135deg to +135deg (270 degree span)
  const startAngle = -135;
  const endAngle = 135;
  const totalAngle = endAngle - startAngle; // 270 degrees
  const currentAngle = startAngle + (normalizedScore / 100) * totalAngle;

  const radius = 80;
  const strokeWidth = 14;
  const center = size / 2;

  // Helpers to calculate SVG arc
  const polarToCartesian = (centerX: number, centerY: number, r: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + r * Math.cos(angleInRadians),
      y: centerY + r * Math.sin(angleInRadians),
    };
  };

  const describeArc = (x: number, y: number, r: number, startAngleDeg: number, endAngleDeg: number) => {
    const start = polarToCartesian(x, y, r, endAngleDeg);
    const end = polarToCartesian(x, y, r, startAngleDeg);
    const largeArcFlag = endAngleDeg - startAngleDeg <= 180 ? '0' : '1';
    return ['M', start.x, start.y, 'A', r, r, 0, largeArcFlag, 0, end.x, end.y].join(' ');
  };

  const backgroundArc = describeArc(center, center, radius, startAngle, endAngle);
  const valueArc = describeArc(center, center, radius, startAngle, currentAngle);

  // Determine color based on tier
  const getTierColor = (t: string) => {
    switch (t) {
      case 'Critical':
        return {
          stroke: '#EF4444',
          bg: 'bg-red-950/40',
          text: 'text-red-400',
          border: 'border-red-500/40',
          glow: 'rgba(239, 68, 68, 0.3)',
        };
      case 'High':
        return {
          stroke: '#F97316',
          bg: 'bg-amber-950/40',
          text: 'text-amber-400',
          border: 'border-amber-500/40',
          glow: 'rgba(249, 115, 22, 0.3)',
        };
      case 'Moderate':
        return {
          stroke: '#EAB308',
          bg: 'bg-yellow-950/40',
          text: 'text-yellow-400',
          border: 'border-yellow-500/40',
          glow: 'rgba(234, 179, 8, 0.3)',
        };
      default:
        return {
          stroke: '#10B981',
          bg: 'bg-emerald-950/40',
          text: 'text-emerald-400',
          border: 'border-emerald-500/40',
          glow: 'rgba(16, 185, 129, 0.3)',
        };
    }
  };

  const colors = getTierColor(tier);

  return (
    <div className="flex flex-col items-center justify-center relative select-none">
      <svg
        width={size}
        height={size * 0.85}
        viewBox={`0 0 ${size} ${size * 0.9}`}
        className="overflow-visible"
        aria-label={`Risk gauge showing ${score} out of 100, ${tier} Risk`}
      >
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="45%" stopColor="#EAB308" />
            <stop offset="75%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
          <filter id="gaugeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={colors.stroke} floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Background track */}
        <path
          d={backgroundArc}
          fill="none"
          stroke="#1E293B"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Ticks */}
        {[0, 25, 50, 75, 100].map((tick) => {
          const tickAngle = startAngle + (tick / 100) * totalAngle;
          const outerPoint = polarToCartesian(center, center, radius + 14, tickAngle);
          const innerPoint = polarToCartesian(center, center, radius + 7, tickAngle);
          return (
            <line
              key={tick}
              x1={innerPoint.x}
              y1={innerPoint.y}
              x2={outerPoint.x}
              y2={outerPoint.y}
              stroke="#475569"
              strokeWidth={1.5}
              strokeLinecap="round"
            />
          );
        })}

        {/* Active Arc */}
        <path
          d={valueArc}
          fill="none"
          stroke={colors.stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          filter="url(#gaugeGlow)"
          className="transition-all duration-700 ease-out"
        />

        {/* Needle / indicator marker */}
        {(() => {
          const needleTip = polarToCartesian(center, center, radius - 6, currentAngle);
          return (
            <g className="transition-all duration-700 ease-out">
              <circle cx={needleTip.x} cy={needleTip.y} r={6} fill="#FFFFFF" stroke={colors.stroke} strokeWidth={2.5} />
            </g>
          );
        })()}

        {/* Center Display */}
        <text
          x={center}
          y={center + 8}
          textAnchor="middle"
          className="fill-slate-100 font-bold text-4xl font-mono tracking-tight"
        >
          {normalizedScore}
        </text>
        <text
          x={center}
          y={center + 26}
          textAnchor="middle"
          className="fill-slate-400 text-xs font-mono uppercase tracking-widest"
        >
          / 100 Index
        </text>
      </svg>

      {/* Tier Label Badge */}
      <div className={`-mt-4 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${colors.bg} ${colors.text} ${colors.border}`}>
        {tier} Exposure
      </div>
    </div>
  );
};
