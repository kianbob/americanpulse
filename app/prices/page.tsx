import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import StatCard from '../components/StatCard';
import BarChart from '../components/BarChart';
import KeyInsight from '../components/KeyInsight';

export const metadata: Metadata = {
  title: 'How Price Increases Are Hitting Americans — 2026 Census Data',
  description: '75.3% of Americans say prices increased. 27.5% find it very stressful. Explore price impact data by income from Census HTOPS 2026.',
};

interface PriceData {
  priceChange: {
    overall: { percentages: Record<string, number> };
    labels: Record<string, string>;
    byIncome: Record<string, { percentages: Record<string, number> }>;
  };
  priceStress: {
    overall: { percentages: Record<string, number> };
    labels: Record<string, string>;
    byIncome: Record<string, { percentages: Record<string, number> }>;
  };
  priceConcern: {
    overall: { percentages: Record<string, number> };
    labels: Record<string, string>;
    byIncome: Record<string, { percentages: Record<string, number> }>;
  };
  headlines: {
    pricesIncreasedPct: number;
    veryStressedPct: number;
    veryConcernedPct: number;
  };
}

export default function PricesPage() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/price-stats.json'), 'utf-8');
  const data: PriceData = JSON.parse(raw);
  const { priceChange, priceStress, priceConcern, headlines } = data;

  const priceChangeItems = Object.entries(priceChange.overall.percentages).map(([key, val]) => ({
    label: priceChange.labels[key] || key,
    value: val,
  }));

  const stressItems = Object.entries(priceStress.overall.percentages).map(([key, val]) => ({
    label: priceStress.labels[key] || key,
    value: val,
  }));

  const concernItems = Object.entries(priceConcern.overall.percentages).map(([key, val]) => ({
    label: priceConcern.labels[key] || key,
    value: val,
  }));

  const stressByIncome = Object.entries(priceStress.byIncome).map(([label, v]) => ({
    label,
    value: v.percentages['1'],
    displayValue: `${v.percentages['1']}%`,
  }));

  const concernByIncome = Object.entries(priceConcern.byIncome).map(([label, v]) => ({
    label,
    value: v.percentages['1'],
    displayValue: `${v.percentages['1']}%`,
  }));

  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">How Price Increases Are Hitting Americans</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {headlines.pricesIncreasedPct}% of Americans say prices have increased — and the stress is real.
          </p>
        </div>
      </section>
      <KeyInsight>75.3% of Americans say prices increased over the past year, and 27.5% are &apos;very stressed&apos; about it. But the impact isn&apos;t equal: low-income households spend a larger share of income on essentials, making every price increase hit harder.</KeyInsight>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard value={`${headlines.pricesIncreasedPct}%`} label="Say Prices Increased" color="#d97706" />
          <StatCard value={`${headlines.veryStressedPct}%`} label="Very Stressed by Prices" color="#dc2626" />
          <StatCard value={`${headlines.veryConcernedPct}%`} label="Very Concerned About Future" color="#7c3aed" />
        </div>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Price Change Perception</h2>
          <BarChart items={priceChangeItems} color="#d97706" />
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Price Stress Levels</h2>
          <p className="text-sm text-gray-600 mb-6">Among those who perceived price increases</p>
          <BarChart items={stressItems} color="#dc2626" />
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Concern About Future Prices</h2>
          <BarChart items={concernItems} color="#7c3aed" />
        </section>

        {/* Income breakdowns */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Who&apos;s Most Stressed? Income Breakdown</h2>
          <p className="text-sm text-gray-600 mb-6">&quot;Very stressful&quot; rate by household income</p>
          <BarChart items={stressByIncome} color="#dc2626" maxValue={50} />
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Price Concern by Income</h2>
          <p className="text-sm text-gray-600 mb-6">&quot;Very concerned&quot; about future prices by household income</p>
          <BarChart items={concernByIncome} color="#7c3aed" maxValue={70} />
        </section>

        {/* Cross-links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a href="/spending" className="block bg-amber-50 rounded-xl border border-amber-200 p-6 hover:bg-amber-100 transition-colors">
            <h3 className="font-bold text-amber-900 mb-1">Spending &amp; Expenses →</h3>
            <p className="text-sm text-amber-700">How Americans handle their household budgets</p>
          </a>
          <a href="/food" className="block bg-green-50 rounded-xl border border-green-200 p-6 hover:bg-green-100 transition-colors">
            <h3 className="font-bold text-green-900 mb-1">Food Security →</h3>
            <p className="text-sm text-green-700">7% of Americans are food insecure</p>
          </a>
        </div>

        <p className="text-xs text-gray-500 text-center">
          Data source: U.S. Census Bureau HTOPS, Wave 2506, March 2026.
        </p>
      </div>
    </div>
  );
}
