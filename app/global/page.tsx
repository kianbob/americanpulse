import BarChart from '../components/BarChart';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Does the US Compare? International Data | American Pulse',
  description:
    'Compare the United States against 7 other nations on AI adoption, food insecurity, health coverage, housing burden, and government trust using international survey data.',
};

const countries = [
  { name: 'United States', flag: '🇺🇸', ai: 24.45, food: 14.3, uninsured: 7.5, housingBurden: 50, trustGov: 17.9 },
  { name: 'United Kingdom', flag: '🇬🇧', ai: 25, food: 7.4, uninsured: 0, housingBurden: 33, trustGov: 25 },
  { name: 'Canada', flag: '🇨🇦', ai: 22, food: 8.5, uninsured: 0, housingBurden: 35, trustGov: 30 },
  { name: 'Germany', flag: '🇩🇪', ai: 20, food: 5.2, uninsured: 0.1, housingBurden: 28, trustGov: 35 },
  { name: 'Japan', flag: '🇯🇵', ai: 15, food: 3.1, uninsured: 0, housingBurden: 25, trustGov: 28 },
  { name: 'China', flag: '🇨🇳', ai: 35, food: 2.5, uninsured: 5, housingBurden: 40, trustGov: 90 },
  { name: 'Australia', flag: '🇦🇺', ai: 23, food: 6.0, uninsured: 0, housingBurden: 32, trustGov: 32 },
  { name: 'France', flag: '🇫🇷', ai: 18, food: 5.5, uninsured: 0.1, housingBurden: 26, trustGov: 22 },
];

const metrics = [
  { key: 'ai' as const, label: 'AI Usage', unit: '%', color: '#2563eb' },
  { key: 'food' as const, label: 'Food Insecurity', unit: '%', color: '#f97316' },
  { key: 'uninsured' as const, label: 'Uninsured Rate', unit: '%', color: '#ef4444' },
  { key: 'housingBurden' as const, label: 'Housing Burden', unit: '%', color: '#8b5cf6' },
  { key: 'trustGov' as const, label: 'Trust in Government', unit: '%', color: '#10b981' },
];

export default function GlobalPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">How Does the US Compare Globally?</h1>
        <p className="text-lg text-gray-600">
          International comparison across AI adoption, food security, health coverage, housing costs, and government
          trust. Data from OECD, World Bank, and national surveys.
        </p>
      </section>

      {/* Comparison Table */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Country Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-3 font-semibold text-gray-700">Country</th>
                <th className="text-right py-3 px-3 font-semibold text-gray-700">AI Usage</th>
                <th className="text-right py-3 px-3 font-semibold text-gray-700">Food Insecurity</th>
                <th className="text-right py-3 px-3 font-semibold text-gray-700">Uninsured</th>
                <th className="text-right py-3 px-3 font-semibold text-gray-700">Housing Burden</th>
                <th className="text-right py-3 px-3 font-semibold text-gray-700">Trust in Gov</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((c) => (
                <tr
                  key={c.name}
                  className={`border-b border-gray-100 ${c.name === 'United States' ? 'bg-blue-50 font-medium' : 'hover:bg-gray-50'}`}
                >
                  <td className="py-3 px-3">
                    <span className="mr-2">{c.flag}</span>
                    {c.name}
                  </td>
                  <td className="text-right py-3 px-3">{c.ai}%</td>
                  <td className="text-right py-3 px-3">{c.food}%</td>
                  <td className="text-right py-3 px-3">{c.uninsured}%</td>
                  <td className="text-right py-3 px-3">{c.housingBurden}%</td>
                  <td className="text-right py-3 px-3">{c.trustGov}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bar Charts */}
      <section className="mb-16 space-y-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Metric Breakdowns</h2>
        {metrics.map((m) => (
          <div key={m.key} className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{m.label}</h3>
            <BarChart
              items={countries
                .map((c) => ({
                  label: `${c.flag} ${c.name}`,
                  value: c[m.key],
                }))
                .sort((a, b) => b.value - a.value)}
              color={m.color}
            />
          </div>
        ))}
      </section>

      {/* Narrative */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Where the US Leads and Lags</h2>
        <div className="prose prose-gray max-w-none space-y-4">
          <p>
            The United States sits near the top in <strong>AI adoption</strong> at 24.45%, trailing only China (35%)
            and the UK (25%). America&apos;s tech sector and consumer culture have driven rapid uptake of AI tools across
            demographics.
          </p>
          <p>
            However, the US is a clear <strong>outlier on food insecurity</strong>. At 14.3%, the American food
            insecurity rate is nearly double that of Canada (8.5%) and almost 6× higher than Japan (3.1%). Among wealthy
            nations, this gap is striking.
          </p>
          <p>
            On <strong>health coverage</strong>, the US remains the only peer nation with a significant uninsured
            population at 7.5%. Most comparison countries have universal or near-universal coverage, with uninsured rates
            at or near zero.
          </p>
          <p>
            <strong>Housing burden</strong> is where the US fares worst: 50% of Americans face housing cost stress,
            compared to 25–35% in peer nations. Only China (40%) comes close, and no other country exceeds 35%.
          </p>
          <p>
            Finally, <strong>trust in government</strong> in the US stands at just 17.9% — the lowest among all
            comparison countries except France (22%). This reflects decades of declining institutional confidence, a
            trend the Census HTOPS data now quantifies with precision.
          </p>
        </div>
      </section>

      {/* Sources */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Sources &amp; Methodology</h2>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>
            <strong>US data:</strong> U.S. Census Bureau, Household Trends and Outlook Pulse Survey (HTOPS), 2026
          </li>
          <li>
            <strong>International AI adoption:</strong> OECD AI Policy Observatory; national statistics offices
          </li>
          <li>
            <strong>Food insecurity:</strong> FAO State of Food Security and Nutrition; USDA Economic Research Service
          </li>
          <li>
            <strong>Health coverage:</strong> WHO Global Health Observatory; OECD Health Statistics 2025
          </li>
          <li>
            <strong>Housing burden:</strong> OECD Affordable Housing Database; Eurostat Housing Cost Overburden
          </li>
          <li>
            <strong>Trust in government:</strong> OECD Trust in Government survey; Edelman Trust Barometer 2025; World
            Values Survey
          </li>
        </ul>
        <p className="text-xs text-gray-400 mt-4">
          International figures are approximate and drawn from the most recent available survey year for each country.
          Direct cross-country comparisons should account for differences in survey methodology.
        </p>
      </section>
    </main>
  );
}
