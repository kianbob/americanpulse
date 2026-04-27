import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import StatCard from '../components/StatCard';

export const metadata: Metadata = {
  title: 'Employment in America — 2026 Census Data',
  description: 'Employment rates, work types, and telework patterns across America by state and demographics. Based on U.S. Census HTOPS survey data.',
};
import BarChart from '../components/BarChart';
import CrossPortfolioCallout from '../components/CrossPortfolioCallout';
import KeyInsight from '../components/KeyInsight';

interface EmploymentStats {
  anywork: { percentages: Record<string, number> };
  workType: { percentages: Record<string, number> };
  telework: { percentages: Record<string, number> };
  byRegion: Record<string, { employed: number; states: string[] }>;
}

const workTypeLabels: Record<string, string> = {
  '1': 'Self-employed',
  '2': 'Wage/salary (private)',
  '3': 'Government',
  '4': 'Non-profit',
  '5': 'Family business',
};

const teleworkLabels: Record<string, string> = {
  '1': 'Telework most days',
  '2': 'Telework some days',
  '3': 'Rarely telework',
  '4': 'Never telework',
};

export default function EmploymentPage() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/employment-stats.json'), 'utf-8');
  const data: EmploymentStats = JSON.parse(raw);

  const workTypeItems = Object.entries(data.workType.percentages).map(([key, val]) => ({
    label: workTypeLabels[key] ?? key,
    value: val,
  }));

  const teleworkItems = Object.entries(data.telework.percentages).map(([key, val]) => ({
    label: teleworkLabels[key] ?? key,
    value: val,
  }));

  const regionItems = Object.entries(data.byRegion)
    .sort((a, b) => b[1].employed - a[1].employed)
    .map(([name, { employed }]) => ({ label: name, value: employed }));

  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Employment</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {data.anywork.percentages['1']}% of Americans report having done any work in the past 7 days.
          </p>
        </div>
      </section>
      <KeyInsight>56.6% of Americans are currently employed — but what matters more is HOW they work. The rise of remote work, gig employment, and AI-assisted jobs is reshaping the labor market in ways traditional unemployment numbers don&apos;t capture.</KeyInsight>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard value={`${data.anywork.percentages['1']}%`} label="Employed" color="#059669" />
          <StatCard value={`${data.anywork.percentages['2']}%`} label="Not Employed" color="#6b7280" />
          <StatCard value={`${data.telework.percentages['1']}%`} label="Telework Most Days" color="#2563eb" />
          <StatCard value={`${data.workType.percentages['1']}%`} label="Self-Employed" color="#7c3aed" />
        </div>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Work Type Breakdown</h2>
          <BarChart items={workTypeItems} color="#059669" />
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Telework Patterns</h2>
          <BarChart items={teleworkItems} color="#2563eb" />
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Employment Rate by Region</h2>
          <BarChart items={regionItems} maxValue={65} color="#059669" />
        </section>

        <CrossPortfolioCallout type="employment" />
      </div>
    </div>
  );
}
