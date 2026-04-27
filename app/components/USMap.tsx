import Link from 'next/link';

interface StateData {
  name: string;
  abbreviation: string;
  slug: string;
  aiUsage: number;
  foodInsufficient: number;
  employed: number;
  uninsured: number;
  rentBehind: number;
}

// NPR-style state grid cartogram: [row, col] positions (0-indexed)
const stateGrid: Record<string, [number, number]> = {
  AK: [0, 0], ME: [0, 10],
  WI: [1, 5], VT: [1, 9], NH: [1, 10],
  WA: [2, 0], ID: [2, 1], MT: [2, 2], ND: [2, 3], MN: [2, 4], IL: [2, 5], MI: [2, 6], NY: [2, 8], MA: [2, 9], CT: [2, 10],
  OR: [3, 0], NV: [3, 1], WY: [3, 2], SD: [3, 3], IA: [3, 4], IN: [3, 5], OH: [3, 6], PA: [3, 7], NJ: [3, 8], RI: [3, 9],
  CA: [4, 0], UT: [4, 1], CO: [4, 2], NE: [4, 3], MO: [4, 4], KY: [4, 5], WV: [4, 6], VA: [4, 7], MD: [4, 8], DE: [4, 9],
  AZ: [5, 1], NM: [5, 2], KS: [5, 3], AR: [5, 4], TN: [5, 5], NC: [5, 6], SC: [5, 7], DC: [5, 8],
  OK: [6, 3], LA: [6, 4], MS: [6, 5], AL: [6, 6], GA: [6, 7],
  HI: [7, 0], TX: [7, 3], FL: [7, 7],
};

function getColor(value: number, min: number, max: number): string {
  const ratio = Math.max(0, Math.min(1, (value - min) / (max - min)));
  // Blue gradient: light blue (low wellbeing-proxy) to deep blue (high)
  if (ratio < 0.2) return '#dbeafe';
  if (ratio < 0.4) return '#93c5fd';
  if (ratio < 0.6) return '#60a5fa';
  if (ratio < 0.8) return '#3b82f6';
  return '#1d4ed8';
}

export default function USMap({ states }: { states: Record<string, StateData> }) {
  const stateList = Object.values(states);
  // Use employed % as the wellbeing metric for coloring
  const values = stateList.map((s) => s.employed);
  const min = Math.min(...values);
  const max = Math.max(...values);

  const cellSize = 44;
  const gap = 3;
  const cols = 11;
  const rows = 8;
  const width = cols * (cellSize + gap) - gap;
  const height = rows * (cellSize + gap) - gap;

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-2xl mx-auto" role="img" aria-label="US state map colored by employment rate">
        {stateList.map((state) => {
          const pos = stateGrid[state.abbreviation];
          if (!pos) return null;
          const [row, col] = pos;
          const x = col * (cellSize + gap);
          const y = row * (cellSize + gap);
          const color = getColor(state.employed, min, max);
          return (
            <Link key={state.slug} href={`/states/${state.slug}`}>
              <g>
                <rect x={x} y={y} width={cellSize} height={cellSize} rx={4} fill={color} className="hover:opacity-80 transition-opacity cursor-pointer" stroke="#fff" strokeWidth={1} />
                <text x={x + cellSize / 2} y={y + cellSize / 2 + 1} textAnchor="middle" dominantBaseline="middle" fontSize={11} fontWeight={600} fill={state.employed > (min + max) / 2 ? '#fff' : '#1e3a5f'}>
                  {state.abbreviation}
                </text>
              </g>
            </Link>
          );
        })}
      </svg>
      {/* Legend */}
      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
        <span>Lower employment</span>
        <div className="flex gap-0.5">
          {['#dbeafe', '#93c5fd', '#60a5fa', '#3b82f6', '#1d4ed8'].map((c) => (
            <div key={c} className="w-6 h-3 rounded-sm" style={{ backgroundColor: c }} />
          ))}
        </div>
        <span>Higher employment</span>
      </div>
    </div>
  );
}
