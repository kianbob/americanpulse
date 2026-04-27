import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import StatCard from '../components/StatCard';
import BarChart from '../components/BarChart';
import DataTable from '../components/DataTable';
import KeyInsight from '../components/KeyInsight';

export const metadata: Metadata = {
  title: 'The Squeeze Index — How Financially Squeezed Is Your Region?',
  description:
    'The Squeeze Index measures financial pressure across 9 U.S. Census divisions by combining rent delinquency, food insufficiency, and expense difficulty from Census HTOPS data.',
};

interface RegionData {
  states: string[];
  n: number;
  aiUsage: number;
  foodInsufficient: number;
  expenseDifficult: number;
  employed: number;
  uninsured: number;
  rentBehind: number;
}

type RegionStats = Record<string, RegionData>;

function computeSqueeze(regions: RegionStats) {
  const entries = Object.entries(regions);

  const maxRent = Math.max(...entries.map(([, r]) => r.rentBehind));
  const maxFood = Math.max(...entries.map(([, r]) => r.foodInsufficient));
  const maxExpense = Math.max(...entries.map(([, r]) => r.expenseDifficult));

  return entries.map(([name, r]) => {
    const rentNorm = (r.rentBehind / maxRent) * 100;
    const foodNorm = (r.foodInsufficient / maxFood) * 100;
    const expenseNorm = (r.expenseDifficult / maxExpense) * 100;

    const squeeze = Math.round(((rentNorm + foodNorm + expenseNorm) / 3) * 10) / 10;

    return {
      name,
      squeeze,
      rentNorm: Math.round(rentNorm * 10) / 10,
      foodNorm: Math.round(foodNorm * 10) / 10,
      expenseNorm: Math.round(expenseNorm * 10) / 10,
      rentBehind: r.rentBehind,
      foodInsufficient: r.foodInsufficient,
      expenseDifficult: r.expenseDifficult,
      states: r.states,
    };
  }).sort((a, b) => b.squeeze - a.squeeze);
}

function gradeFromScore(score: number): { grade: string; label: string; color: string } {
  if (score >= 81) return { grade: 'F', label: 'Most squeezed', color: '#dc2626' };
  if (score >= 61) return { grade: 'D', label: 'Above average squeeze', color: '#ea580c' };
  if (score >= 41) return { grade: 'C', label: 'Average', color: '#d97706' };
  if (score >= 21) return { grade: 'B', label: 'Below average squeeze', color: '#2563eb' };
  return { grade: 'A', label: 'Least squeezed', color: '#059669' };
}

export default function SqueezePage() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/region-stats.json'), 'utf-8');
  const regions: RegionStats = JSON.parse(raw);
  const scored = computeSqueeze(regions);

  const avgSqueeze = Math.round((scored.reduce((s, d) => s + d.squeeze, 0) / scored.length) * 10) / 10;
  const mostSqueezed = scored[0];
  const leastSqueezed = scored[scored.length - 1];
  const avgGrade = gradeFromScore(avgSqueeze);

  const rankItems = scored.map((d) => ({
    label: `${d.name} (${gradeFromScore(d.squeeze).grade})`,
    value: d.squeeze,
    displayValue: `${d.squeeze} — ${gradeFromScore(d.squeeze).grade}`,
  }));

  const tableRows = scored.map((d) => {
    const g = gradeFromScore(d.squeeze);
    return {
      division: d.name,
      grade: g.grade,
      squeeze: d.squeeze,
      rentBehind: d.rentBehind,
      foodInsufficient: d.foodInsufficient,
      expenseDifficult: d.expenseDifficult,
    };
  });

  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">The Squeeze Index</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            How financially squeezed is each region? Combining rent delinquency, food insufficiency,
            and expense difficulty into a single pressure score.
          </p>
        </div>
      </section>
      <KeyInsight>The Squeeze Index measures how financially pressured each region is — combining rent burden, food insecurity, and expense difficulty into a single A-F grade. It&apos;s the answer to &apos;how hard is it to get by here?&apos;</KeyInsight>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard
            value={gradeFromScore(mostSqueezed.squeeze).grade}
            label={`Most: ${mostSqueezed.name}`}
            color="#dc2626"
          />
          <StatCard
            value={gradeFromScore(leastSqueezed.squeeze).grade}
            label={`Least: ${leastSqueezed.name}`}
            color="#059669"
          />
          <StatCard value={`${avgSqueeze}`} label="National Average" color="#2563eb" />
          <StatCard value={avgGrade.grade} label="Average Grade" color={avgGrade.color} />
        </div>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Division Rankings</h2>
          <p className="text-sm text-gray-500 mb-6">Higher scores mean more financial squeeze. Grades: A (least squeezed) to F (most squeezed).</p>
          <BarChart items={rankItems} maxValue={100} color="#dc2626" />
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Squeeze Breakdown by Division</h2>
          <div className="space-y-6">
            {scored.map((d) => {
              const g = gradeFromScore(d.squeeze);
              return (
                <div key={d.name} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{d.name}</h3>
                    <div className="flex items-baseline gap-3">
                      <span className="text-sm text-gray-500">{d.squeeze}</span>
                      <span
                        className="text-xl font-bold px-3 py-0.5 rounded-lg"
                        style={{ color: g.color, backgroundColor: `${g.color}15` }}
                      >
                        {g.grade}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{d.states.join(', ')} — {g.label}</p>
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div>
                      <div className="font-medium text-gray-900">{d.rentBehind}%</div>
                      <div className="text-xs text-gray-500">Rent Behind</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{d.foodInsufficient}%</div>
                      <div className="text-xs text-gray-500">Food Insufficient</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{d.expenseDifficult}%</div>
                      <div className="text-xs text-gray-500">Expense Difficulty</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">All Divisions</h2>
          <DataTable
            columns={[
              { key: 'division', label: 'Division' },
              { key: 'grade', label: 'Grade' },
              { key: 'squeeze', label: 'Score' },
              { key: 'rentBehind', label: 'Rent Behind', suffix: '%' },
              { key: 'foodInsufficient', label: 'Food Insuff.', suffix: '%' },
              { key: 'expenseDifficult', label: 'Expense Diff.', suffix: '%' },
            ]}
            rows={tableRows}
          />
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">How the Squeeze Index Works</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Squeeze Index measures financial pressure by combining three indicators from Census HTOPS data.
            Each metric is normalized to a 0–100 scale relative to the worst division, then averaged.
          </p>
          <div className="space-y-3 text-gray-700 text-sm">
            <div className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span><strong>Rent Delinquency:</strong> % of renters behind on rent payments</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span><strong>Food Insufficiency:</strong> % reporting sometimes or often not enough to eat</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span><strong>Expense Difficulty:</strong> % reporting difficulty paying usual household expenses</span>
            </div>
          </div>
          <div className="mt-4 bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
            <strong>Grading scale:</strong> A (0–20, least squeezed) · B (21–40) · C (41–60) · D (61–80) · F (81–100, most squeezed)
          </div>
          <p className="text-gray-500 text-sm mt-4">
            See the <a href="/methodology" className="text-[--primary] hover:underline">Methodology</a> page for full details on data sources and computation.
          </p>
        </section>
      </div>
    </div>
  );
}
