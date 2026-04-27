import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import StatCard from '../components/StatCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trend Tracker: How America Is Changing | How Is America',
  description:
    'Track key indicators over time: AI adoption, food insecurity, housing burden, employment, and more across Census HTOPS waves 2502, 2504, and 2506.',
};

interface WaveMetrics {
  employedPct: number;
  foodInsecurePct: number;
  rentBehindPct: number;
  expenseDiffPct: number;
  uninsuredPct: number;
  mortBehindPct: number;
}

interface WaveData {
  wave: string;
  label: string;
  date: string;
  sampleSize: number;
  metrics: WaveMetrics;
}

interface TrendsData {
  waves: WaveData[];
  note: string;
}

const metricConfig = [
  { key: 'employedPct' as const, label: 'Employed', color: '#059669', description: 'Adults who worked in past 7 days', icon: '💼', goodDirection: 'up' as const },
  { key: 'foodInsecurePct' as const, label: 'Food Insecure', color: '#dc2626', description: 'Households with sometimes/often not enough to eat', icon: '🍽️', goodDirection: 'down' as const },
  { key: 'rentBehindPct' as const, label: 'Behind on Rent', color: '#d97706', description: 'Renters behind on payments', icon: '🏠', goodDirection: 'down' as const },
  { key: 'expenseDiffPct' as const, label: 'Expense Difficulty', color: '#7c3aed', description: 'Very/somewhat difficult to pay expenses', icon: '💸', goodDirection: 'down' as const },
  { key: 'uninsuredPct' as const, label: 'Uninsured', color: '#0891b2', description: 'Adults without health insurance', icon: '🏥', goodDirection: 'down' as const },
  { key: 'mortBehindPct' as const, label: 'Mortgage Behind', color: '#6366f1', description: 'Homeowners behind on mortgage', icon: '🏦', goodDirection: 'down' as const },
];

function TrendArrow({ current, previous, goodDirection }: { current: number; previous: number; goodDirection: 'up' | 'down' }) {
  const diff = current - previous;
  const absDiff = Math.abs(diff);
  if (absDiff < 0.3) return <span className="text-gray-400 text-sm">→ Stable</span>;

  const isUp = diff > 0;
  const isGood = goodDirection === 'up' ? isUp : !isUp;

  return (
    <span className={`text-sm font-medium ${isGood ? 'text-green-600' : 'text-red-600'}`}>
      {isUp ? '↑' : '↓'} {absDiff.toFixed(1)}pp
    </span>
  );
}

export default function TrendsPage() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/trends-data.json'), 'utf-8');
  const data: TrendsData = JSON.parse(raw);
  const waves = data.waves;
  const latest = waves[waves.length - 1];
  const previous = waves[waves.length - 2];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-indigo-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <div className="inline-block bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium mb-6">
            3 Waves of Data &middot; {waves[0].label} → {latest.label}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Trend Tracker
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            How is America changing? We compare key indicators across three Census HTOPS waves
            to reveal trends in economic hardship, employment, and wellbeing.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* Wave-over-Wave Comparison Table */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Wave-over-Wave Comparison</h2>
          <p className="text-sm text-gray-500 mb-8 text-center">
            How key metrics changed across {waves.length} HTOPS survey waves
          </p>

          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Metric</th>
                  {waves.map((w) => (
                    <th key={w.wave} className="text-center px-6 py-4 text-sm font-semibold text-gray-900">
                      <div>{w.label}</div>
                      <div className="text-xs font-normal text-gray-500">Wave {w.wave} · n={w.sampleSize.toLocaleString()}</div>
                    </th>
                  ))}
                  <th className="text-center px-6 py-4 text-sm font-semibold text-gray-900">Change</th>
                </tr>
              </thead>
              <tbody>
                {metricConfig.map((m, i) => (
                  <tr key={m.key} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{m.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900">{m.label}</div>
                          <div className="text-xs text-gray-500">{m.description}</div>
                        </div>
                      </div>
                    </td>
                    {waves.map((w) => (
                      <td key={w.wave} className="text-center px-6 py-4">
                        <span className="text-lg font-bold" style={{ color: m.color }}>
                          {w.metrics[m.key]}%
                        </span>
                      </td>
                    ))}
                    <td className="text-center px-6 py-4">
                      <TrendArrow
                        current={latest.metrics[m.key]}
                        previous={waves[0].metrics[m.key]}
                        goodDirection={m.goodDirection}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden space-y-4">
            {metricConfig.map((m) => (
              <div key={m.key} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{m.icon}</span>
                  <span className="font-semibold text-gray-900">{m.label}</span>
                  <span className="ml-auto">
                    <TrendArrow
                      current={latest.metrics[m.key]}
                      previous={waves[0].metrics[m.key]}
                      goodDirection={m.goodDirection}
                    />
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {waves.map((w) => (
                    <div key={w.wave}>
                      <div className="text-xs text-gray-500">{w.label}</div>
                      <div className="text-lg font-bold" style={{ color: m.color }}>{w.metrics[m.key]}%</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Visual Trend Bars */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Trend Overview</h2>
          <div className="space-y-8">
            {metricConfig.map((m) => {
              const maxVal = Math.max(...waves.map(w => w.metrics[m.key])) * 1.2;
              return (
                <div key={m.key}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span>{m.icon}</span>
                      <span className="font-medium text-gray-900">{m.label}</span>
                    </div>
                    <TrendArrow
                      current={latest.metrics[m.key]}
                      previous={waves[0].metrics[m.key]}
                      goodDirection={m.goodDirection}
                    />
                  </div>
                  <div className="space-y-1.5">
                    {waves.map((w) => (
                      <div key={w.wave} className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 w-24 shrink-0">{w.label}</span>
                        <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                          <div
                            className="h-full rounded-full flex items-center justify-end pr-2"
                            style={{
                              width: `${(w.metrics[m.key] / maxVal) * 100}%`,
                              backgroundColor: m.color,
                              minWidth: '40px',
                            }}
                          >
                            <span className="text-xs font-bold text-white">{w.metrics[m.key]}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Takeaways</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white/80 rounded-lg p-4">
              <div className="text-red-600 font-semibold mb-1">📉 Employment Declining</div>
              <p className="text-sm text-gray-600">
                Employment dropped from {waves[0].metrics.employedPct}% to {latest.metrics.employedPct}% over three waves — a {(waves[0].metrics.employedPct - latest.metrics.employedPct).toFixed(1)} percentage point decline.
              </p>
            </div>
            <div className="bg-white/80 rounded-lg p-4">
              <div className="text-amber-600 font-semibold mb-1">🏠 Rent Burden Fluctuating</div>
              <p className="text-sm text-gray-600">
                Rent delinquency dipped to {waves[1].metrics.rentBehindPct}% in {waves[1].label} but rebounded to {latest.metrics.rentBehindPct}% — slightly below the {waves[0].label} rate.
              </p>
            </div>
            <div className="bg-white/80 rounded-lg p-4">
              <div className="text-green-600 font-semibold mb-1">💸 Expense Difficulty Improving</div>
              <p className="text-sm text-gray-600">
                The share of Americans finding it difficult to pay expenses fell from {waves[0].metrics.expenseDiffPct}% to {latest.metrics.expenseDiffPct}%.
              </p>
            </div>
            <div className="bg-white/80 rounded-lg p-4">
              <div className="text-blue-600 font-semibold mb-1">🤖 AI Data Now Available</div>
              <p className="text-sm text-gray-600">
                Wave 2506 introduced AI usage tracking for the first time — 24.1% of Americans report using AI tools.{' '}
                <Link href="/ai" className="text-[--primary] hover:underline">Explore AI data →</Link>
              </p>
            </div>
          </div>
        </section>

        {/* Data Notes */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Methodology Notes</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              All percentages are weighted using PWEIGHT from each wave&apos;s public use file.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              AI usage questions were introduced in Wave 2506 and cannot be compared to prior waves.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              Sample sizes vary by wave: {waves.map(w => `${w.label} (n=${w.sampleSize.toLocaleString()})`).join(', ')}.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              Small changes (&lt;0.5pp) may not be statistically significant given sample sizes.
            </li>
          </ul>
        </section>

        {/* Cross-links */}
        <section className="bg-gray-50 rounded-xl p-8 print:hidden">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Explore More</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/ai" className="text-[--primary] hover:underline text-sm font-medium">AI Deep Dive →</Link>
            <Link href="/ai/divide" className="text-[--primary] hover:underline text-sm font-medium">The AI Divide →</Link>
            <Link href="/metro-rural" className="text-[--primary] hover:underline text-sm font-medium">Metro vs Rural →</Link>
            <Link href="/compare" className="text-[--primary] hover:underline text-sm font-medium">Compare Regions →</Link>
            <Link href="/downloads" className="text-[--primary] hover:underline text-sm font-medium">Download the Data →</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
