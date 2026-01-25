// Line Chart Component
import React from "react";

interface TimeSeriesData {
  date: string;
  [key: number | string]: number | string;
}

interface Props {
  timeSeriesData: TimeSeriesData[];
}

const LineChartComponent: React.FC<Props> = ({ timeSeriesData }) => {
  const padding = 40;
  const width = 500;
  const height = 300;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Get brand keys dynamically (exclude 'date')
  const brandKeys = timeSeriesData.length
    ? Object.keys(timeSeriesData[0]).filter((k) => k !== "date")
    : [];

  // Colors for lines (extend if more brands)
  const colors = ["#6366f1", "#8b5cf6", "#06b6d4", "#a855f7", "#f59e0b"];

  // Maximum value for scaling
  const maxValue = Math.max(
    ...timeSeriesData.flatMap((d) => brandKeys.map((key) => Number(d[key])))
  );

  // X position
  const getX = (index: number) =>
    padding + (index / (timeSeriesData.length - 1)) * chartWidth;

  // Y position
  const getY = (value: number) =>
    height - padding - (Number(value) / maxValue) * chartHeight;

  // Generate SVG path for a brand
  const createPath = (key:string) =>
    timeSeriesData
      .map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(Number(d[key]))}`)
      .join(" ");

  return (
    <div className="flex flex-col p-10 w-full shadow items-center gap-4">
      <svg width={width} height={height} className="overflow-visible">
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => {
          const y = padding + (i / 4) * chartHeight;
          return (
            <line
              key={i}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke="#e2e8f0"
              strokeWidth={1}
            />
          );
        })}

        {/* Lines */}
        {brandKeys.map((key, idx) => (
          <path
            key={key}
            d={createPath(key)}
            fill="none"
            stroke={colors[idx % colors.length]}
            strokeWidth={3}
            className="transition-all duration-300"
          />
        ))}

        {/* Data points */}
        {timeSeriesData.map((d, i) => (
          <g key={i}>
            {brandKeys.map((key, idx) => (
              <circle
                key={key}
                cx={getX(i)}
                cy={getY(Number(d[key]))}
                r={4}
                fill={colors[idx % colors.length]}
              />
            ))}
          </g>
        ))}

        {/* X-axis labels */}
        {timeSeriesData.map((d, i) => (
          <text
            key={i}
            x={getX(i)}
            y={height - 10}
            textAnchor="middle"
            className="text-xs fill-slate-600"
          >
            {d.date}
          </text>
        ))}
      </svg>

      {/* Legend */}
      <div className="flex gap-6">
        {brandKeys.map((key, idx) => (
          <div key={key} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[idx % colors.length] }}
            />
            <span className="text-sm">{key}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LineChartComponent;
