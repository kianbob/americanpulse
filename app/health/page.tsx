import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import StatCard from '../components/StatCard';
import BarChart from '../components/BarChart';
import KeyInsight from '../components/KeyInsight';

export const metadata: Metadata = {
  title: 'Health Insurance Coverage — 2026 Census Data',
  description: 'Health insurance coverage and uninsured rates across America by state, age, and income. Based on U.S. Census HTOPS survey data.',
};

interface NationalStats {
  health: {
    insuranceTypes: Record<string, { percentage: number }>;
    uninsuredPct: number;
  };
}

export default function HealthPage() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/national-stats.json'), 'utf-8');
  const data: NationalStats = JSON.parse(raw);
  const { insuranceTypes, uninsuredPct } = data.health;

  const insuranceItems = Object.entries(insuranceTypes)
    .filter(([k]) => k !== 'Other')
    .sort((a, b) => b[1].percentage - a[1].percentage)
    .map(([label, { percentage }]) => ({ label, value: percentage }));

  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Health Insurance</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {uninsuredPct}% of Americans lack health insurance coverage.
          </p>
        </div>
      </section>
      <KeyInsight>7.45% of Americans lack health insurance — that&apos;s roughly 24.5 million people. The uninsured rate varies dramatically by state, income, and age. Being uninsured isn&apos;t just a policy statistic — it&apos;s the difference between seeing a doctor and hoping it goes away.</KeyInsight>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard value={`${uninsuredPct}%`} label="Uninsured" color="#dc2626" />
          <StatCard value={`${insuranceTypes['Employer/union'].percentage}%`} label="Employer Coverage" color="#2563eb" />
          <StatCard value={`${insuranceTypes['Medicare'].percentage}%`} label="Medicare" color="#059669" />
          <StatCard value={`${insuranceTypes['Medicaid'].percentage}%`} label="Medicaid" color="#7c3aed" />
        </div>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Insurance Type Breakdown</h2>
          <p className="text-sm text-gray-500 mb-6">Respondents may have multiple types of coverage, so percentages sum to more than 100%.</p>
          <BarChart items={insuranceItems} color="#7c3aed" />
        </section>
      </div>
    </div>
  );
}
