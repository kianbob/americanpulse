import fs from 'fs';
import path from 'path';
import StatCard from '../components/StatCard';
import BarChart from '../components/BarChart';
import CrossPortfolioCallout from '../components/CrossPortfolioCallout';

interface FoodStats {
  sufficiency: { percentages: Record<string, number> };
  insecurePct: number;
  byRegion: Record<string, { foodInsufficient: number; states: string[] }>;
}

const sufficiencyLabels: Record<string, string> = {
  '1': 'Enough of the kinds wanted',
  '2': 'Enough but not always wanted',
  '3': 'Sometimes not enough',
  '4': 'Often not enough',
};

export default function FoodPage() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/food-stats.json'), 'utf-8');
  const data: FoodStats = JSON.parse(raw);

  const sufficiencyItems = Object.entries(data.sufficiency.percentages).map(([key, val]) => ({
    label: sufficiencyLabels[key] ?? key,
    value: val,
  }));

  const regionItems = Object.entries(data.byRegion)
    .sort((a, b) => b[1].foodInsufficient - a[1].foodInsufficient)
    .map(([name, { foodInsufficient }]) => ({ label: name, value: foodInsufficient }));

  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Food Security</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {data.insecurePct}% of Americans report food insufficiency — sometimes or often not having enough to eat.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard value={`${data.insecurePct}%`} label="Food Insecure" color="#d97706" />
          <StatCard value={`${data.sufficiency.percentages['1']}%`} label="Enough & Wanted" color="#059669" />
          <StatCard value={`${data.sufficiency.percentages['3']}%`} label="Sometimes Not Enough" color="#ea580c" />
          <StatCard value={`${data.sufficiency.percentages['4']}%`} label="Often Not Enough" color="#dc2626" />
        </div>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Food Sufficiency Breakdown</h2>
          <BarChart items={sufficiencyItems} color="#d97706" />
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Food Insufficiency by Region</h2>
          <BarChart items={regionItems} maxValue={12} color="#dc2626" />
        </section>

        <CrossPortfolioCallout type="food" />
      </div>
    </div>
  );
}
