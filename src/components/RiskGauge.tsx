import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface RiskGaugeProps {
  score: number; // 0 - 100
  tier: 'Critical' | 'High' | 'Moderate' | 'Low' | string;
  size?: number;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ score, tier, size = 260 }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const normalizedScore = Math.min(Math.max(score, 0), 100);

  // Dynamic D3 color scale: Green (0%) -> Amber/Yellow (40%) -> Orange (70%) -> Red (100%)
  const colorScale = d3.scaleLinear<string>()
    .domain([0, 35, 70, 100])
    .range(['#10B981', '#EAB308', '#F97316', '#EF4444'])
    .interpolate(d3.interpolateRgb);

  const activeColor = colorScale(normalizedScore);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = size;
    const height = size * 0.92;
    const margin = 20;
    const radius = Math.min(width, height) / 2 - margin;
    const strokeWidth = 14;
    const innerRadius = radius - strokeWidth;
    const outerRadius = radius;

    // Arc angles in radians: -135 deg to +135 deg (270 degrees)
    // In D3 arc convention, 0 rad is at 12 o'clock, clockwise is positive
    const startAngleDeg = -135;
    const endAngleDeg = 135;
    const totalAngleDeg = endAngleDeg - startAngleDeg; // 270 deg
    const targetAngleDeg = startAngleDeg + (normalizedScore / 100) * totalAngleDeg;

    const degToRad = (deg: number) => (deg * Math.PI) / 180;
    const startAngleRad = degToRad(startAngleDeg);
    const endAngleRad = degToRad(endAngleDeg);
    const targetAngleRad = degToRad(targetAngleDeg);

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2 + 8})`);

    // Gradient definitions
    const defs = svg.append('defs');

    // Linear gradient for gauge track from Green to Red
    const gradientId = 'd3-gauge-gradient';
    const linearGradient = defs
      .append('linearGradient')
      .attr('id', gradientId)
      .attr('x1', '0%')
      .attr('y1', '100%')
      .attr('x2', '100%')
      .attr('y2', '0%');

    linearGradient.append('stop').attr('offset', '0%').attr('stop-color', '#10B981');
    linearGradient.append('stop').attr('offset', '35%').attr('stop-color', '#EAB308');
    linearGradient.append('stop').attr('offset', '70%').attr('stop-color', '#F97316');
    linearGradient.append('stop').attr('offset', '100%').attr('stop-color', '#EF4444');

    // Dynamic glow filter based on the active risk color
    const filterId = 'd3-gauge-glow';
    const filter = defs
      .append('filter')
      .attr('id', filterId)
      .attr('x', '-30%')
      .attr('y', '-30%')
      .attr('width', '160%')
      .attr('height', '160%');

    filter
      .append('feDropShadow')
      .attr('dx', 0)
      .attr('dy', 0)
      .attr('stdDeviation', 4)
      .attr('flood-color', activeColor)
      .attr('flood-opacity', 0.5);

    // Background track arc generator
    const bgArc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(startAngleRad)
      .endAngle(endAngleRad)
      .cornerRadius(7);

    // Render background track
    g.append('path')
      .attr('d', bgArc as any)
      .attr('fill', '#1E293B')
      .attr('opacity', 0.6);

    // Foreground active arc generator
    const fgArc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(startAngleRad)
      .cornerRadius(7);

    // Render animated foreground arc with D3 transition
    const foregroundPath = g
      .append('path')
      .attr('fill', 'url(#d3-gauge-gradient)')
      .attr('filter', 'url(#d3-gauge-glow)');

    foregroundPath
      .transition()
      .duration(1200)
      .ease(d3.easeCubicOut)
      .attrTween('d', function () {
        const interpolate = d3.interpolate(startAngleRad, targetAngleRad);
        return function (t: number) {
          return (fgArc as any)({ endAngle: interpolate(t) }) || '';
        };
      });

    // Circular tick marks at 0%, 25%, 50%, 75%, 100%
    const tickPercentages = [0, 25, 50, 75, 100];
    const tickGroup = g.append('g').attr('class', 'ticks');

    tickPercentages.forEach((pct) => {
      const angleDeg = startAngleDeg + (pct / 100) * totalAngleDeg;
      const angleRad = degToRad(angleDeg);

      // In D3 arc coords, x = r * sin(angle), y = -r * cos(angle)
      const rInner = outerRadius + 4;
      const rOuter = outerRadius + 11;
      const rText = outerRadius + 22;

      const x1 = rInner * Math.sin(angleRad);
      const y1 = -rInner * Math.cos(angleRad);
      const x2 = rOuter * Math.sin(angleRad);
      const y2 = -rOuter * Math.cos(angleRad);
      const xt = rText * Math.sin(angleRad);
      const yt = -rText * Math.cos(angleRad);

      // Tick line
      tickGroup
        .append('line')
        .attr('x1', x1)
        .attr('y1', y1)
        .attr('x2', x2)
        .attr('y2', y2)
        .attr('stroke', '#64748B')
        .attr('stroke-width', 1.5)
        .attr('stroke-linecap', 'round');

      // Tick label
      tickGroup
        .append('text')
        .attr('x', xt)
        .attr('y', yt + 3)
        .attr('text-anchor', 'middle')
        .attr('font-size', '9px')
        .attr('font-family', 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace')
        .attr('fill', '#94A3B8')
        .text(`${pct}%`);
    });

    // Needle / Indicator pointer circle at the active tip of the arc
    const indicatorGroup = g.append('g').attr('class', 'indicator');

    const midRadius = (innerRadius + outerRadius) / 2;
    const indicatorCircle = indicatorGroup
      .append('circle')
      .attr('r', 6.5)
      .attr('fill', '#FFFFFF')
      .attr('stroke', activeColor)
      .attr('stroke-width', 3)
      .attr('filter', 'url(#d3-gauge-glow)');

    indicatorCircle
      .transition()
      .duration(1200)
      .ease(d3.easeCubicOut)
      .attrTween('transform', function () {
        const interpolate = d3.interpolate(startAngleRad, targetAngleRad);
        return function (t: number) {
          const a = interpolate(t);
          const x = midRadius * Math.sin(a);
          const y = -midRadius * Math.cos(a);
          return `translate(${x}, ${y})`;
        };
      });

    // Center Display - Dynamic Percentage Count-up via D3
    const centerGroup = g.append('g').attr('class', 'center-display');

    // Risk percentage number
    const percentText = centerGroup
      .append('text')
      .attr('y', -6)
      .attr('text-anchor', 'middle')
      .attr('font-size', '36px')
      .attr('font-weight', '700')
      .attr('font-family', 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace')
      .attr('fill', '#F8FAFC')
      .text('0%');

    percentText
      .transition()
      .duration(1200)
      .ease(d3.easeCubicOut)
      .tween('text', function () {
        const interpolate = d3.interpolateNumber(0, normalizedScore);
        return function (t: number) {
          d3.select(this).text(`${Math.round(interpolate(t))}%`);
        };
      });

    // Subtitle label: Risk Index
    centerGroup
      .append('text')
      .attr('y', 14)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('font-weight', '600')
      .attr('font-family', 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace')
      .attr('letter-spacing', '0.1em')
      .attr('fill', '#94A3B8')
      .text('RISK INDEX');

    // Small indicator dot and color label
    const statusGroup = centerGroup
      .append('g')
      .attr('transform', 'translate(0, 30)');

    statusGroup
      .append('circle')
      .attr('cx', -32)
      .attr('cy', -3)
      .attr('r', 3.5)
      .attr('fill', activeColor);

    statusGroup
      .append('text')
      .attr('x', -24)
      .attr('y', 0)
      .attr('text-anchor', 'start')
      .attr('font-size', '11px')
      .attr('font-weight', '600')
      .attr('fill', activeColor)
      .text(`${tier} Exposure`);

  }, [normalizedScore, tier, size, activeColor]);

  // Color-coded badge styling based on tier
  const getBadgeStyle = () => {
    switch (tier) {
      case 'Critical':
        return 'bg-red-950/60 border-red-500/50 text-red-400 shadow-sm shadow-red-900/30';
      case 'High':
        return 'bg-amber-950/60 border-amber-500/50 text-amber-400 shadow-sm shadow-amber-900/30';
      case 'Moderate':
        return 'bg-yellow-950/60 border-yellow-500/50 text-yellow-400 shadow-sm shadow-yellow-900/30';
      default:
        return 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400 shadow-sm shadow-emerald-900/30';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center relative select-none p-2">
      {/* SVG Canvas for D3 Rendering */}
      <svg
        ref={svgRef}
        width={size}
        height={size * 0.92}
        className="overflow-visible"
        aria-label={`D3 Risk Gauge showing ${normalizedScore}% exposure, ${tier} Risk`}
      />

      {/* Interactive Color-Coded Range Scale (Green to Red indicator bar) */}
      <div className="w-full max-w-[240px] mt-1 space-y-1.5">
        <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-emerald-500 via-yellow-400 via-amber-500 to-rose-500 relative overflow-hidden shadow-inner">
          {/* Position marker along the gradient */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-md transition-all duration-1000 ease-out"
            style={{ left: `calc(${normalizedScore}% - 2px)` }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-slate-400 font-medium">
          <span className="text-emerald-400">0% Safe</span>
          <span className="text-yellow-400">50% Mid</span>
          <span className="text-rose-400">100% Critical</span>
        </div>
      </div>

      {/* Tier Label Badge */}
      <div className={`mt-3 px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider border ${getBadgeStyle()}`}>
        {tier} Risk Classification
      </div>
    </div>
  );
};

