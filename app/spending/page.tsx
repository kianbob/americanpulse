import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import StatCard from '../components/StatCard';

export const metadata: Metadata = {
  title: 'Spending & Expenses — 2026 Census Data',
  description: 'How Americans handle expenses and price changes. Explore spending difficulty rates by state, income, and demographics from Census HTOPS data.',
};
import BarChart from '../components/BarChart';

interface NationalStats {
  spending: {
    expenseDifficulty: { percentages: Record<string, number> };
    priceChange: { percentages: Record<string, number> };
  };
  headlines: { expenseDifficultyPct: number };
}

const difficultyLabels: Record<string, string> = {
  '1': 'Not at all difficult',
  '2': 'Somewhat difficult',
  '3': 'Difficult',
  '4': 'Very difficult',
};

const priceLabels: Record<string, string> = {
  '1': 'Prices went up',
  '2': 'Prices stayed the same',
  '3': 'Prices went down',
  '4': 'Not sure',
};

export default function SpendingPage() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/national-stats.json'), 'utf-8');
  const data: NationalStats = JSON.parse(raw);
  const { expenseDifficulty, priceChange } = data.spending;

  const difficultyItems = Object.entries(expenseDifficulty.percentages).map(([key, val]) => ({
    label: difficultyLabels[key] ?? key,
    value: val,
  }));

  const priceItems = Object.entries(priceChange.percentages).map(([key, val]) => ({
    label: priceLabels[key] ?? key,
    value: val,
  }));

  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Spending &amp; Expenses</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {data.headlines.expenseDifficultyPct}% of Americans find it difficult or very difficult to pay usual expenses.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard value={`${data.headlines.expenseDifficultyPct}%`} label="Difficulty Paying" color="#0891b2" />
          <StatCard value={`${expenseDifficulty.percentages['4']}%`} label="Very Difficult" color="#dc2626" />
          <StatCard value={`${priceChange.percentages['1']}%`} label="Prices Went Up" color="#d97706" />
          <StatCard value={`${priceChange.percentages['3']}%`} label="Prices Went Down" color="#059669" />
        </div>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Expense Difficulty Breakdown</h2>
          <BarChart items={difficultyItems} color="#0891b2" />
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Price Change Impact</h2>
          <BarChart items={priceItems} color="#d97706" />
        </section>
      </div>
    </div>
  );
}
