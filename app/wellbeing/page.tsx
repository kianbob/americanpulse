import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import StatCard from '../components/StatCard';
import BarChart from '../components/BarChart';
import KeyInsight from '../components/KeyInsight';

export const metadata: Metadata = {
  title: 'American Wellbeing Index — Division-Level Composite Scores',
  description:
    'A composite wellbeing index for all 9 U.S. Census divisions, measuring food security, housing affordability, employment, health insurance, expenses, AI adoption, and CDC health outcomes from HTOPS and PLACES data.',
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

interface CdcState {
  name: string;
  measures: Record<string, number | null>;
  healthScore: number;
}

interface CdcData {
  states: Record<string, CdcState>;
}

function getDivisionHealthScores(regions: RegionStats, cdcData: CdcData): Record<string, number> {
  const result: Record<string, number> = {};
  for (const [divisionName, region] of Object.entries(regions)) {
    const scores = region.states
      .map((abbr) => cdcData.states[abbr]?.healthScore)
      .filter((s): s is number => s != null);
    result[divisionName] = scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 10) / 10
      : 50;
  }
  return result;
}

function computeScores(regions: RegionStats, cdcData: CdcData) {
  const entries = Object.entries(regions);
  const divHealth = getDivisionHealthScores(regions, cdcData);

  const maxFood = Math.max(...entries.map(([, r]) => r.foodInsufficient));
  const maxRent = Math.max(...entries.map(([, r]) => r.rentBehind));
  const maxEmployed = Math.max(...entries.map(([, r]) => r.employed));
  const maxExpense = Math.max(...entries.map(([, r]) => r.expenseDifficult));
  const maxUninsured = Math.max(...entries.map(([, r]) => r.uninsured));
  const maxAi = Math.max(...entries.map(([, r]) => r.aiUsage));
  const maxHealth = Math.max(...Object.values(divHealth));

  return entries.map(([name, r]) => {
    const foodScore = (1 - r.foodInsufficient / maxFood) * 100;
    const rentScore = (1 - r.rentBehind / maxRent) * 100;
    const employedScore = (r.employed / maxEmployed) * 100;
    const expenseScore = (1 - r.expenseDifficult / maxExpense) * 100;
    const uninsuredScore = (1 - r.uninsured / maxUninsured) * 100;
    const aiScore = (r.aiUsage / maxAi) * 100;
    const healthScore = (divHealth[name] / maxHealth) * 100;

    const composite =
      foodScore * 0.175 +
      rentScore * 0.175 +
      employedScore * 0.125 +
      expenseScore * 0.125 +
      uninsuredScore * 0.125 +
      aiScore * 0.125 +
      healthScore * 0.15;

    return {
      name,
      composite: Math.round(composite * 10) / 10,
      foodScore: Math.round(foodScore * 10) / 10,
      rentScore: Math.round(rentScore * 10) / 10,
      employedScore: Math.round(employedScore * 10) / 10,
      expenseScore: Math.round(expenseScore * 10) / 10,
      uninsuredScore: Math.round(uninsuredScore * 10) / 10,
      aiScore: Math.round(aiScore * 10) / 10,
      healthScore: Math.round(healthScore * 10) / 10,
      states: r.states,
    };
  }).sort((a, b) => b.composite - a.composite);
}

function scoreColor(score: number): string {
  if (score >= 70) return '#059669';
  if (score >= 55) return '#d97706';
  return '#dc2626';
}

export default function WellbeingPage() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/region-stats.json'), 'utf-8');
  const regions: RegionStats = JSON.parse(raw);
  const cdcRaw = fs.readFileSync(path.join(process.cwd(), 'public/data/cdc-places.json'), 'utf-8');
  const cdcData: CdcData = JSON.parse(cdcRaw);
  const scored = computeScores(regions, cdcData);

  const topScore = scored[0];
  const bottomScore = scored[scored.length - 1];
  const avgScore = Math.round((scored.reduce((s, d) => s + d.composite, 0) / scored.length) * 10) / 10;

  const rankItems = scored.map((d) => ({
    label: d.name,
    value: d.composite,
    displayValue: `${d.composite}`,
  }));

  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">American Wellbeing Index</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A composite score measuring quality of life across 9 Census divisions, combining food security,
            housing affordability, employment, health coverage, expense difficulty, AI adoption, and CDC
            population health outcomes.
          </p>
        </div>
      </section>
      <KeyInsight>The American Wellbeing Index combines food security, housing, employment, health insurance, expense difficulty, and AI adoption into a single score. The gap between the highest-scoring region (West North Central, 67.2) and lowest (Middle Atlantic, 40.8) reveals just how different the American experience is depending on where you live.</KeyInsight>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard value={`${topScore.composite}`} label={`Top: ${topScore.name}`} color="#059669" />
          <StatCard value={`${bottomScore.composite}`} label={`Bottom: ${bottomScore.name}`} color="#dc2626" />
          <StatCard value={`${avgScore}`} label="Average Score" color="#2563eb" />
          <StatCard value="0–100" label="Score Range" color="#6b7280" />
        </div>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Division Rankings</h2>
          <p className="text-sm text-gray-500 mb-6">Higher scores indicate better overall wellbeing. Scores range from 0 (worst) to 100 (best).</p>
          <BarChart items={rankItems} maxValue={100} color="#2563eb" />
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Component Breakdown by Division</h2>
          <div className="space-y-8">
            {scored.map((d) => (
              <div key={d.name} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{d.name}</h3>
                  <span className="text-lg font-bold" style={{ color: scoreColor(d.composite) }}>
                    {d.composite}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-3">{d.states.join(', ')}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900">{d.foodScore}</div>
                    <div className="text-xs text-gray-500">Food Security</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900">{d.rentScore}</div>
                    <div className="text-xs text-gray-500">Housing</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900">{d.employedScore}</div>
                    <div className="text-xs text-gray-500">Employment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900">{d.expenseScore}</div>
                    <div className="text-xs text-gray-500">Expenses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900">{d.uninsuredScore}</div>
                    <div className="text-xs text-gray-500">Health Ins.</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900">{d.aiScore}</div>
                    <div className="text-xs text-gray-500">AI Adoption</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900">{d.healthScore}</div>
                    <div className="text-xs text-gray-500">Health (CDC)</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">How the Index Works</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The American Wellbeing Index combines seven dimensions of household wellbeing from Census
            HTOPS data and CDC PLACES health outcomes into a single 0–100 composite score for each Census division.
          </p>
          <div className="space-y-3 text-gray-700 text-sm">
            <div className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span><strong>Food Security (17.5%):</strong> Lower food insufficiency rate → higher score</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span><strong>Housing Affordability (17.5%):</strong> Lower rent delinquency rate → higher score</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span><strong>Employment (12.5%):</strong> Higher employment rate → higher score</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span><strong>Expense Difficulty (12.5%):</strong> Lower expense difficulty rate → higher score</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span><strong>Health Insurance (12.5%):</strong> Lower uninsured rate → higher score</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span><strong>AI Adoption (12.5%):</strong> Higher AI usage rate → higher score</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span><strong>Population Health (15%):</strong> Higher CDC PLACES health score (lower obesity, diabetes, depression, etc.) → higher score</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            Each dimension is normalized relative to the worst-performing division (which scores 0 on that dimension).
            The composite is a weighted average of the seven dimension scores. CDC health scores are computed from
            state-level data and averaged to the division level. See the{' '}
            <a href="/methodology" className="text-[--primary] hover:underline">Methodology</a> page for full details.
          </p>
        </section>
      </div>
    </div>
  );
}
