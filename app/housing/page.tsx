import fs from 'fs';
import path from 'path';
import StatCard from '../components/StatCard';
import BarChart from '../components/BarChart';

interface HousingStats {
  tenure: { percentages: Record<string, number> };
  rentCurrent: { percentages: Record<string, number> };
  mortgageCurrent: { percentages: Record<string, number> };
  byRegion: Record<string, { rentBehind: number; states: string[] }>;
}

const tenureLabels: Record<string, string> = {
  '1': 'Owned free & clear',
  '2': 'Owned with mortgage',
  '3': 'Rented',
  '4': 'Occupied without payment',
};

export default function HousingPage() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/housing-stats.json'), 'utf-8');
  const data: HousingStats = JSON.parse(raw);

  const tenureItems = Object.entries(data.tenure.percentages).map(([key, val]) => ({
    label: tenureLabels[key] ?? key,
    value: val,
  }));

  const regionItems = Object.entries(data.byRegion)
    .sort((a, b) => b[1].rentBehind - a[1].rentBehind)
    .map(([name, { rentBehind }]) => ({ label: name, value: rentBehind }));

  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Housing</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {data.rentCurrent.percentages['2']}% of renters are behind on rent, while {data.mortgageCurrent.percentages['2']}% of homeowners are behind on their mortgage.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard value={`${data.rentCurrent.percentages['2']}%`} label="Behind on Rent" color="#dc2626" />
          <StatCard value={`${data.mortgageCurrent.percentages['2']}%`} label="Behind on Mortgage" color="#ea580c" />
          <StatCard value={`${data.tenure.percentages['2']}%`} label="Own w/ Mortgage" color="#2563eb" />
          <StatCard value={`${data.tenure.percentages['3']}%`} label="Renting" color="#7c3aed" />
        </div>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Housing Tenure Breakdown</h2>
          <BarChart items={tenureItems} color="#2563eb" />
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Rent Delinquency by Region</h2>
          <BarChart items={regionItems} maxValue={25} color="#dc2626" />
        </section>
      </div>
    </div>
  );
}
