import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import StatCard from '../components/StatCard';
import BarChart from '../components/BarChart';
import KeyInsight from '../components/KeyInsight';

export const metadata: Metadata = {
  title: 'The Childcare Crisis — 2026 Census Data',
  description: '6.6% of families with children had childcare disruptions. 25.9% cut work hours, 25.5% supervised kids while working. Census HTOPS 2026 data.',
};

interface ChildcareData {
  overall: {
    percentages: Record<string, number>;
  };
  labels: Record<string, string>;
  barriers: Record<string, number>;
  byIncome: Record<string, { percentages: Record<string, number> }>;
  byMetro: Record<string, { percentages: Record<string, number> }>;
  headlines: {
    needChildcarePct: number;
    totalHouseholdsWithKids: number;
    childcareIssueCount: number;
  };
}

export default function ChildcarePage() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/childcare-stats.json'), 'utf-8');
  const data: ChildcareData = JSON.parse(raw);
  const { barriers, headlines, byIncome } = data;

  const barrierItems = Object.entries(barriers)
    .filter(([label]) => label !== 'None of the above' && label !== 'Other')
    .sort(([, a], [, b]) => b - a)
    .map(([label, val]) => ({ label, value: val, displayValue: `${val}%` }));

  const disruptionByIncome = Object.entries(byIncome).map(([label, v]) => ({
    label,
    value: v.percentages['1'],
    displayValue: `${v.percentages['1']}%`,
  }));

  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">The Childcare Crisis in Numbers</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {headlines.needChildcarePct}% of families with children experienced childcare disruptions — and the consequences ripple through the economy.
          </p>
        </div>
      </section>
      <KeyInsight>6.6% of families with children experienced childcare disruptions. But behind that number is a cascade: missed work, lost income, and children without supervised care. The childcare crisis is an economic crisis hiding in plain sight.</KeyInsight>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard value={`${headlines.needChildcarePct}%`} label="Had Childcare Disruptions" color="#dc2626" />
          <StatCard value={`${headlines.childcareIssueCount}`} label="Respondents Affected" color="#d97706" />
          <StatCard value={`${headlines.totalHouseholdsWithKids.toLocaleString()}`} label="Households with Kids Surveyed" color="#2563eb" />
        </div>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">What Happens When Childcare Fails?</h2>
          <p className="text-sm text-gray-600 mb-6">Among families who had childcare disruptions, percentage who experienced each consequence</p>
          <BarChart items={barrierItems} color="#dc2626" maxValue={30} />
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Childcare Disruptions by Income</h2>
          <p className="text-sm text-gray-600 mb-6">Percentage of families with children who experienced childcare issues</p>
          <BarChart items={disruptionByIncome} color="#d97706" maxValue={15} />
        </section>

        <section className="bg-amber-50 rounded-xl border border-amber-200 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-amber-900 mb-2">The Hidden Economic Cost</h2>
          <p className="text-sm text-amber-800">
            When childcare fails, parents cut hours ({barriers['Cut work hours']}%), leave jobs ({barriers['Left a job']}%), 
            or supervise children while working ({barriers['Supervised children while working']}%). 
            Each of these has a measurable economic cost — in lost wages, reduced productivity, and career setbacks 
            that compound over years. The {headlines.needChildcarePct}% disruption rate represents millions of families 
            making impossible tradeoffs between work and their children.
          </p>
        </section>

        <p className="text-xs text-gray-500 text-center">
          Data source: U.S. Census Bureau HTOPS, March 2026.
        </p>
      </div>
    </div>
  );
}
