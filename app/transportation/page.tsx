import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import BarChart from '../components/BarChart';

export const metadata: Metadata = {
  title: 'Transportation in America — 2026 Census Data',
  description: 'How Americans commute and get around. Transportation modes and patterns by state and region, based on U.S. Census HTOPS survey data.',
};

interface NationalStats {
  transportation: {
    modes: Record<string, { weighted: number; n: number }>;
  };
}

export default function TransportationPage() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/national-stats.json'), 'utf-8');
  const data: NationalStats = JSON.parse(raw);
  const { modes } = data.transportation;

  const modeItems = Object.entries(modes)
    .filter(([k]) => k !== 'Did not report')
    .sort((a, b) => b[1].n - a[1].n)
    .map(([label, { n }]) => ({ label, value: n, displayValue: `n=${n.toLocaleString()}` }));

  const maxN = Math.max(...modeItems.map((m) => m.value));

  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Transportation</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            How Americans get around — from personal vehicles to public transit and beyond.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Transportation Modes</h2>
          <p className="text-sm text-gray-500 mb-6">Respondents could select multiple modes. Ranked by number of respondents.</p>
          <BarChart items={modeItems} maxValue={maxN} color="#4f46e5" />
        </section>
      </div>
    </div>
  );
}
