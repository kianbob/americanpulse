import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import StatCard from '../components/StatCard';
import BarChart from '../components/BarChart';
import DataTable from '../components/DataTable';

export const metadata: Metadata = {
  title: 'Median Household Income by State — 2023 Census ACS Rankings',
  description:
    'Median household income rankings for all 50 states and DC from 2023 Census ACS data. Compare income, poverty rates, and cost of living across states.',
};

interface StateProfile {
  name: string;
  fips: string;
  medianIncome: number | null;
  medianRent: number | null;
  medianHomeValue: number | null;
  medianAge: number | null;
  povertyRate: number | null;
  bachelorsOrHigher: number | null;
  unemploymentRate: number | null;
}

interface AcsData {
  states: Record<string, StateProfile>;
}

export default function IncomePage() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/acs-state-profiles.json'), 'utf-8');
  const data: AcsData = JSON.parse(raw);

  const stateList = Object.entries(data.states)
    .map(([abbr, s]) => ({ abbr, ...s }))
    .filter((s) => s.medianIncome != null)
    .sort((a, b) => (b.medianIncome ?? 0) - (a.medianIncome ?? 0));

  const natIncome = Math.round(stateList.reduce((s, d) => s + (d.medianIncome ?? 0), 0) / stateList.length);
  const top = stateList[0];
  const bottom = stateList[stateList.length - 1];
  const median = stateList[Math.floor(stateList.length / 2)];

  // Top 15 for chart
  const chartItems = stateList.slice(0, 15).map((s) => ({
    label: s.name,
    value: s.medianIncome ?? 0,
    displayValue: `$${(s.medianIncome ?? 0).toLocaleString()}`,
  }));

  const rows = stateList.map((s, i) => ({
    rank: i + 1,
    state: s.name,
    medianIncome: s.medianIncome,
    medianRent: s.medianRent,
    povertyRate: s.povertyRate,
    unemploymentRate: s.unemploymentRate,
  }));

  const columns = [
    { key: 'rank', label: '#' },
    { key: 'state', label: 'State' },
    { key: 'medianIncome', label: 'Median Income', suffix: '' },
    { key: 'medianRent', label: 'Median Rent', suffix: '' },
    { key: 'povertyRate', label: 'Poverty Rate', suffix: '%' },
    { key: 'unemploymentRate', label: 'Unemployment', suffix: '%' },
  ];

  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Median Household Income by State</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            How much do households earn across America? State-by-state income rankings from the
            2023 American Community Survey.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard value={`$${top.medianIncome?.toLocaleString()}`} label={`Highest: ${top.name}`} color="#059669" />
          <StatCard value={`$${bottom.medianIncome?.toLocaleString()}`} label={`Lowest: ${bottom.name}`} color="#dc2626" />
          <StatCard value={`$${natIncome.toLocaleString()}`} label="State Average" color="#2563eb" />
          <StatCard value={`$${median.medianIncome?.toLocaleString()}`} label={`Median: ${median.name}`} color="#7c3aed" />
        </div>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Top 15 States by Income</h2>
          <p className="text-sm text-gray-500 mb-6">Median household income, 2023 ACS 1-Year Estimates.</p>
          <BarChart items={chartItems} color="#059669" />
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Full State Rankings</h2>
          <p className="text-sm text-gray-500 mb-6">Sorted by median household income. Click any column to re-sort.</p>
          <DataTable columns={columns} rows={rows} />
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Income vs. Cost of Living</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            High median income does not always mean greater purchasing power. States with the highest incomes
            (like {top.name} at ${top.medianIncome?.toLocaleString()}) often have high median rents
            (${top.medianRent?.toLocaleString()}/month), while lower-income states may have
            significantly lower housing costs.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The gap between the highest and lowest states is{' '}
            <strong>${((top.medianIncome ?? 0) - (bottom.medianIncome ?? 0)).toLocaleString()}</strong> — a{' '}
            {Math.round(((top.medianIncome ?? 1) / (bottom.medianIncome ?? 1) - 1) * 100)}% difference that
            reflects deep regional economic disparities across the country.
          </p>
        </section>

        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500">
            Source: U.S. Census Bureau, 2023 American Community Survey 1-Year Estimates |{' '}
            <a href="/demographics" className="text-[--primary] hover:underline">Full demographics</a> |{' '}
            <a href="/methodology" className="text-[--primary] hover:underline">Methodology</a>
          </p>
        </div>
      </div>
    </div>
  );
}
