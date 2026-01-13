
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const IVSurface: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 400;
    const height = 220;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Mock data for a "smile"
    const data = Array.from({ length: 20 }, (_, i) => ({
      strike: 90 + i,
      iv: 20 + Math.pow(i - 10, 2) * 0.3
    }));

    const x = d3.scaleLinear()
      .domain([90, 110])
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([15, 45])
      .range([height - margin.bottom, margin.top]);

    const line = d3.line<{ strike: number, iv: number }>()
      .x(d => x(d.strike))
      .y(d => y(d.iv))
      .curve(d3.curveBasis);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .attr("color", "#475569")
      .call(d3.axisBottom(x).ticks(5).tickFormat(d => `$${d}`));

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .attr("color", "#475569")
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => `${d}%`));

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Add areas to simulate "surface" feel
    const area = d3.area<{ strike: number, iv: number }>()
      .x(d => x(d.strike))
      .y0(height - margin.bottom)
      .y1(d => y(d.iv))
      .curve(d3.curveBasis);

    svg.append("path")
      .datum(data)
      .attr("fill", "url(#iv-gradient)")
      .attr("opacity", 0.3)
      .attr("d", area);

    const gradient = svg.append("defs")
      .append("linearGradient")
      .attr("id", "iv-gradient")
      .attr("x1", "0%").attr("y1", "0%")
      .attr("x2", "0%").attr("y2", "100%");

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#3b82f6");
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "transparent");

  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 h-full flex flex-col">
      <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-2">Volatility Surface (Smile)</h3>
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid meet" />
      </div>
    </div>
  );
};

export default IVSurface;
