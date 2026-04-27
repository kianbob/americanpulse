'use client';

interface DataPoint {
  x: number;
  y: number;
}

interface Series {
  name: string;
  data: DataPoint[];
  color: string;
}

interface Annotation {
  x: number;
  label: string;
}

interface LineChartProps {
  series: Series[];
  annotations?: Annotation[];
  height?: number;
  ySuffix?: string;
}

export default function LineChart({ series, annotations = [], height = 400, ySuffix = '%' }: LineChartProps) {
  const width = 800;
  const padLeft = 55;
  const padRight = 30;
  const padTop = 40;
  const padBottom = 60;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const allX = series.flatMap((s) => s.data.map((d) => d.x));
  const allY = series.flatMap((s) => s.data.map((d) => d.y));
  const xMin = Math.min(...allX);
  const xMax = Math.max(...allX);
  const yMax = Math.ceil(Math.max(...allY) / 10) * 10;

  const mapX = (x: number) => padLeft + ((x - xMin) / (xMax - xMin)) * chartW;
  const mapY = (y: number) => padTop + chartH - (y / yMax) * chartH;

  const yTicks = 5;
  const yStep = yMax / yTicks;

  const xLabels: number[] = [];
  for (let x = xMin; x <= xMax; x++) xLabels.push(x);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" role="img" aria-label={`Line chart showing ${series.map(s => s.name).join(', ')} over time`}>
      {/* Grid lines + Y labels */}
      {Array.from({ length: yTicks + 1 }, (_, i) => {
        const val = i * yStep;
        const cy = mapY(val);
        return (
          <g key={`grid-${i}`}>
            <line x1={padLeft} y1={cy} x2={width - padRight} y2={cy} stroke="#e5e7eb" strokeWidth={1} />
            <text x={padLeft - 8} y={cy + 4} textAnchor="end" fontSize={11} fill="#6b7280">
              {val}
              {ySuffix}
            </text>
          </g>
        );
      })}

      {/* X axis labels */}
      {xLabels.map((x) => (
        <text key={`x-${x}`} x={mapX(x)} y={height - padBottom + 20} textAnchor="middle" fontSize={11} fill="#6b7280">
          {x}
        </text>
      ))}

      {/* Annotations */}
      {annotations.map((a, i) => (
        <g key={`ann-${i}`}>
          <line
            x1={mapX(a.x)}
            y1={padTop}
            x2={mapX(a.x)}
            y2={padTop + chartH}
            stroke="#9ca3af"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
          <text x={mapX(a.x)} y={padTop - 10} textAnchor="middle" fontSize={10} fill="#6b7280" fontWeight={500}>
            {a.label}
          </text>
        </g>
      ))}

      {/* Lines + dots */}
      {series.map((s) => {
        const sorted = [...s.data].sort((a, b) => a.x - b.x);
        const d = sorted.map((p, i) => `${i === 0 ? 'M' : 'L'}${mapX(p.x)},${mapY(p.y)}`).join(' ');
        return (
          <g key={s.name}>
            <path d={d} fill="none" stroke={s.color} strokeWidth={2.5} strokeLinejoin="round" />
            {sorted.map((p, j) => (
              <circle key={j} cx={mapX(p.x)} cy={mapY(p.y)} r={4} fill={s.color} />
            ))}
          </g>
        );
      })}

      {/* Legend */}
      {series.map((s, i) => (
        <g key={`leg-${s.name}`} transform={`translate(${padLeft + i * 160}, ${height - 15})`}>
          <rect width={12} height={12} rx={2} fill={s.color} />
          <text x={16} y={10} fontSize={11} fill="#374151">
            {s.name}
          </text>
        </g>
      ))}
    </svg>
  );
}
