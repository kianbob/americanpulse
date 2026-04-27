import type { Metadata } from 'next';
import LineChart from '../components/LineChart';

export const metadata: Metadata = {
  title: 'Historical Trends — How America Has Changed Since 2020',
  description:
    'Track how food insecurity, anxiety, rent delinquency, and uninsured rates have changed from 2020 (COVID peak) through 2026 (HTOPS era) using Census Household Pulse Survey data.',
};

const historicalData = [
  { year: 2020, label: 'COVID Peak', foodInsecurity: 23, anxiety: 40, rentBehind: 15, uninsured: 10.2 },
  { year: 2021, label: 'Recovery Begins', foodInsecurity: 18, anxiety: 32, rentBehind: 12, uninsured: 9.8 },
  { year: 2022, label: 'Inflation Spike', foodInsecurity: 14, anxiety: 28, rentBehind: 13, uninsured: 9.5 },
  { year: 2023, label: 'Stabilization', foodInsecurity: 14.3, anxiety: 26, rentBehind: 11, uninsured: 8.9 },
  { year: 2024, label: 'Gradual Improvement', foodInsecurity: 12, anxiety: 24, rentBehind: 10, uninsured: 8.5 },
  { year: 2026, label: 'HTOPS Era', foodInsecurity: 7.03, anxiety: 19.77, rentBehind: 8.87, uninsured: 7.45 },
];

const events = [
  { year: 2020, description: 'COVID Stimulus Checks — $1,200 per adult under CARES Act', color: '#059669' },
  { year: 2021, description: 'Expanded Child Tax Credit — $3,000-$3,600/child, monthly payments', color: '#059669' },
  { year: 2022, description: 'Inflation hits 9.1% — highest in 40 years; Fed begins rate hikes', color: '#dc2626' },
  { year: 2023, description: 'Rate hikes continue — mortgage rates exceed 7%', color: '#ea580c' },
  { year: 2024, description: 'Inflation cools to ~3% — labor market remains strong', color: '#2563eb' },
  { year: 2025, description: 'DOGE government efficiency push — federal workforce reductions begin', color: '#7c3aed' },
  { year: 2026, description: 'HTOPS replaces HPS — Census modernizes pulse survey', color: '#2563eb' },
];

export default function HistoryPage() {
  const foodSeries = {
    name: 'Food Insecurity',
    data: historicalData.map((d) => ({ x: d.year, y: d.foodInsecurity })),
    color: '#d97706',
  };
  const anxietySeries = {
    name: 'Anxiety/Worry',
    data: historicalData.map((d) => ({ x: d.year, y: d.anxiety })),
    color: '#7c3aed',
  };
  const rentSeries = {
    name: 'Behind on Rent',
    data: historicalData.map((d) => ({ x: d.year, y: d.rentBehind })),
    color: '#dc2626',
  };
  const uninsuredSeries = {
    name: 'Uninsured',
    data: historicalData.map((d) => ({ x: d.year, y: d.uninsured })),
    color: '#0891b2',
  };

  const annotations = [
    { x: 2020, label: 'COVID Stimulus' },
    { x: 2022, label: 'Inflation Spike' },
    { x: 2023, label: 'Rate Hikes' },
    { x: 2025, label: 'DOGE Cuts' },
  ];

  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            How America Has Changed Since 2020
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Six years of data from the Census Household Pulse Survey (2020–2024) and HTOPS (2026)
            reveal a story of crisis, recovery, and a cautiously improving nation.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Key improvement stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="text-sm text-gray-500 mb-1">Food Insecurity</div>
            <div className="text-2xl font-bold text-green-600">23% → 7%</div>
            <div className="text-xs text-green-600 mt-1">↓ 69% decline</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="text-sm text-gray-500 mb-1">Anxiety/Worry</div>
            <div className="text-2xl font-bold text-green-600">40% → 20%</div>
            <div className="text-xs text-green-600 mt-1">↓ 50% decline</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="text-sm text-gray-500 mb-1">Behind on Rent</div>
            <div className="text-2xl font-bold text-green-600">15% → 8.9%</div>
            <div className="text-xs text-green-600 mt-1">↓ 41% decline</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="text-sm text-gray-500 mb-1">Uninsured</div>
            <div className="text-2xl font-bold text-green-600">10.2% → 7.5%</div>
            <div className="text-xs text-green-600 mt-1">↓ 27% decline</div>
          </div>
        </div>

        {/* Chart */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">6-Year Trend: Key Indicators</h2>
          <p className="text-sm text-gray-500 mb-6">
            Tracking four critical measures of American wellbeing from the COVID peak through 2026.
            Dashed lines mark key events.
          </p>
          <LineChart
            series={[foodSeries, anxietySeries, rentSeries, uninsuredSeries]}
            annotations={annotations}
            height={420}
          />
        </section>

        {/* Timeline */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Key Events Timeline</h2>
          <div className="space-y-4">
            {events.map((evt) => (
              <div key={evt.year} className="flex gap-4 items-start">
                <div
                  className="w-16 shrink-0 text-center text-sm font-bold py-1 rounded"
                  style={{ backgroundColor: evt.color + '15', color: evt.color }}
                >
                  {evt.year}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{evt.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Year-by-year breakdown */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Year-by-Year Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 text-gray-500">Year</th>
                  <th className="text-left py-3 px-2 text-gray-500">Context</th>
                  <th className="text-right py-3 px-2 text-gray-500">Food Insecure</th>
                  <th className="text-right py-3 px-2 text-gray-500">Anxiety</th>
                  <th className="text-right py-3 px-2 text-gray-500">Rent Behind</th>
                  <th className="text-right py-3 px-2 text-gray-500">Uninsured</th>
                </tr>
              </thead>
              <tbody>
                {historicalData.map((d) => (
                  <tr key={d.year} className="border-b border-gray-100">
                    <td className="py-3 px-2 font-medium text-gray-900">{d.year}</td>
                    <td className="py-3 px-2 text-gray-600">{d.label}</td>
                    <td className="py-3 px-2 text-right text-gray-900">{d.foodInsecurity}%</td>
                    <td className="py-3 px-2 text-right text-gray-900">{d.anxiety}%</td>
                    <td className="py-3 px-2 text-right text-gray-900">{d.rentBehind}%</td>
                    <td className="py-3 px-2 text-right text-gray-900">{d.uninsured}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Analysis */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What the Data Tells Us</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              The six-year trajectory tells a clear story: <strong>America is measurably better off in 2026 than at the
              COVID peak</strong>. Every major indicator has improved substantially, with food insecurity seeing the most
              dramatic decline — from nearly 1 in 4 Americans to about 1 in 14.
            </p>
            <p>
              The 2022 inflation shock temporarily stalled housing progress (rent delinquency ticked up despite falling
              elsewhere), but the overall trajectory remained positive. The Federal Reserve&apos;s aggressive rate hikes
              cooled inflation but pushed mortgage rates past 7%, creating new housing affordability challenges.
            </p>
            <p>
              By 2026, the transition to HTOPS reflects a Census Bureau that sees America&apos;s challenges evolving beyond
              pandemic response. New questions about AI adoption, gig economy work, and household technology usage
              acknowledge that the economy — and what we measure about it — has fundamentally shifted.
            </p>
          </div>
        </section>

        <div className="text-center text-xs text-gray-400">
          Sources: U.S. Census Bureau Household Pulse Survey (2020–2024), HTOPS Wave 2506 (March 2026).
          Historical summary statistics from published HPS data tables. USDA Economic Research Service food security reports.
        </div>
      </div>
    </div>
  );
}
