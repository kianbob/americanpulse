import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';

export const metadata: Metadata = {
  title: 'State Demographics — Income, Education, Poverty, Housing by State',
  description:
    'Explore demographic profiles for all 50 states and DC: median income, rent, home values, poverty rates, education levels, and unemployment from Census ACS data.',
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

export default function DemographicsPage() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/acs-state-profiles.json'), 'utf-8');
  const data: AcsData = JSON.parse(raw);

  const stateList = Object.entries(data.states)
    .map(([abbr, s]) => ({ abbr, ...s }))
    .sort((a, b) => a.name.localeCompare(b.name));

  // National averages
  const avg = (key: keyof StateProfile) => {
    const vals = stateList.map((s) => s[key] as number | null).filter((v): v is number => v != null);
    return vals.length > 0 ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length * 10) / 10 : 0;
  };

  const natIncome = avg('medianIncome');
  const natRent = avg('medianRent');
  const natPoverty = avg('povertyRate');
  const natEdu = avg('bachelorsOrHigher');

  const rows = stateList.map((s) => ({
    state: s.name,
    medianIncome: s.medianIncome,
    medianRent: s.medianRent,
    medianHomeValue: s.medianHomeValue,
    medianAge: s.medianAge,
    povertyRate: s.povertyRate,
    bachelorsOrHigher: s.bachelorsOrHigher,
    unemploymentRate: s.unemploymentRate,
  }));

  const columns = [
    { key: 'state', label: 'State' },
    { key: 'medianIncome', label: 'Median Income', suffix: '' },
    { key: 'medianRent', label: 'Median Rent', suffix: '' },
    { key: 'medianHomeValue', label: 'Home Value', suffix: '' },
    { key: 'medianAge', label: 'Median Age', suffix: '' },
    { key: 'povertyRate', label: 'Poverty %', suffix: '%' },
    { key: 'bachelorsOrHigher', label: "Bachelor's+", suffix: '%' },
    { key: 'unemploymentRate', label: 'Unemp %', suffix: '%' },
  ];

  // Find highest/lowest income states
  const byIncome = [...stateList].filter((s) => s.medianIncome != null).sort((a, b) => (b.medianIncome ?? 0) - (a.medianIncome ?? 0));
  const highIncome = byIncome[0];
  const lowIncome = byIncome[byIncome.length - 1];

  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">State Demographic Profiles</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive demographic data for all 50 states and DC from the 2023 American Community Survey,
            including income, housing costs, education, poverty, and employment.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard value={`$${Math.round(natIncome).toLocaleString()}`} label="Avg Median Income" color="#059669" />
          <StatCard value={`$${Math.round(natRent).toLocaleString()}`} label="Avg Median Rent" color="#dc2626" />
          <StatCard value={`${natPoverty}%`} label="Avg Poverty Rate" color="#d97706" />
          <StatCard value={`${natEdu}%`} label="Avg Bachelor's+" color="#2563eb" />
        </div>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Income Extremes</h2>
          <p className="text-sm text-gray-500 mb-6">The gap between the highest and lowest median household income states.</p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-sm text-green-700 font-medium">Highest Median Income</div>
              <div className="text-2xl font-bold text-green-800">{highIncome?.name}</div>
              <div className="text-lg font-semibold text-green-700">${highIncome?.medianIncome?.toLocaleString()}</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <div className="text-sm text-red-700 font-medium">Lowest Median Income</div>
              <div className="text-2xl font-bold text-red-800">{lowIncome?.name}</div>
              <div className="text-lg font-semibold text-red-700">${lowIncome?.medianIncome?.toLocaleString()}</div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">All States</h2>
          <p className="text-sm text-gray-500 mb-6">Click any column header to sort. Income and housing values are in dollars.</p>
          <DataTable columns={columns} rows={rows} />
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About This Data</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Data comes from the 2023 American Community Survey (ACS) 1-Year Estimates, published by the U.S. Census
            Bureau. The ACS surveys approximately 3.5 million households annually and is the gold standard for
            state-level demographic data.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Variables include median household income (B19013), median gross rent (B25064), median home value (B25077),
            median age (B01002), poverty status (B17001), educational attainment (B15003), and unemployment rate
            (DP03_0009PE from ACS profile tables).
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Source: U.S. Census Bureau, 2023 ACS 1-Year Estimates |{' '}
            <a href="/methodology" className="text-[--primary] hover:underline">Full methodology</a>
          </p>
        </section>
      </div>
    </div>
  );
}
