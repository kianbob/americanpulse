import type { Metadata } from 'next';
import Link from 'next/link';
import StatCard from '../../components/StatCard';
import BarChart from '../../components/BarChart';

export const metadata: Metadata = {
  title: 'Demographics by Age — Generational Divides',
  description:
    'Explore how age shapes AI adoption, food security, employment, health insurance, and financial difficulty across American generations.',
};

const ageData = [
  { group: '18–24', aiUsage: 20.7, foodInsecure: 9.8, employed: 48.2, uninsured: 12.1, expenseDifficult: 24.3 },
  { group: '25–39', aiUsage: 28.0, foodInsecure: 8.1, employed: 72.3, uninsured: 8.9, expenseDifficult: 22.1 },
  { group: '40–54', aiUsage: 24.7, foodInsecure: 6.2, employed: 68.5, uninsured: 6.8, expenseDifficult: 18.5 },
  { group: '55–64', aiUsage: 26.9, foodInsecure: 5.8, employed: 52.1, uninsured: 5.2, expenseDifficult: 16.8 },
  { group: '65+', aiUsage: 18.8, foodInsecure: 4.1, employed: 18.9, uninsured: 2.1, expenseDifficult: 12.3 },
];

export default function AgePage() {
  return (
    <>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Demographics by Age</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            How age shapes AI adoption, food security, employment, and financial wellbeing across American generations.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Key Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard value="28.0%" label="Peak AI Usage (25–39)" color="#2563eb" />
          <StatCard value="9.8%" label="Food Insecure (18–24)" color="#d97706" />
          <StatCard value="12.1%" label="Uninsured (18–24)" color="#7c3aed" />
          <StatCard value="72.3%" label="Employment (25–39)" color="#059669" />
        </div>

        {/* AI Usage */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">AI Usage by Age</h2>
          <BarChart items={ageData.map((d) => ({ label: d.group, value: d.aiUsage }))} color="#2563eb" />
        </section>

        {/* Food Insecurity */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Food Insecurity by Age</h2>
          <BarChart items={ageData.map((d) => ({ label: d.group, value: d.foodInsecure }))} color="#d97706" />
        </section>

        {/* Employment */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Employment Rate by Age</h2>
          <BarChart items={ageData.map((d) => ({ label: d.group, value: d.employed }))} color="#059669" />
        </section>

        {/* Uninsured */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Uninsured Rate by Age</h2>
          <BarChart items={ageData.map((d) => ({ label: d.group, value: d.uninsured }))} color="#7c3aed" />
        </section>

        {/* Expense Difficulty */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Expense Difficulty by Age</h2>
          <BarChart items={ageData.map((d) => ({ label: d.group, value: d.expenseDifficult }))} color="#0891b2" />
        </section>

        {/* Narrative */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">The Generational Divide</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Young adults (18–24) face the sharpest challenges across nearly every metric. They have the{' '}
              <strong>highest food insecurity rate at 9.8%</strong> — more than double the 65+ rate of 4.1% — and the{' '}
              <strong>highest uninsured rate at 12.1%</strong>, nearly six times higher than seniors.
            </p>
            <p>
              The 25–39 age group leads in both AI adoption (28.0%) and employment (72.3%), but still faces significant
              food insecurity (8.1%) and expense difficulty (22.1%), reflecting the squeeze of peak earning years
              colliding with housing costs and family formation.
            </p>
            <p>
              Seniors (65+) are the most financially secure group on nearly every hardship measure, benefiting from
              Medicare (only 2.1% uninsured) and stable retirement income. However, they lag in AI adoption at 18.8%,
              suggesting a growing digital divide that could widen as AI becomes more embedded in daily life.
            </p>
          </div>
        </section>

        {/* Cross-links */}
        <section className="bg-gray-50 rounded-xl p-8 print:hidden">
          <h2 className="text-xl font-bold text-gray-900 mb-4">More Demographics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/demographics/race"
              className="bg-white rounded-xl border border-gray-200 p-4 hover:border-[--primary] hover:shadow-md transition-all"
            >
              <div className="font-bold text-gray-900">By Race &amp; Ethnicity</div>
              <div className="text-sm text-gray-600">Disparities across racial and ethnic groups</div>
            </Link>
            <Link
              href="/demographics/education"
              className="bg-white rounded-xl border border-gray-200 p-4 hover:border-[--primary] hover:shadow-md transition-all"
            >
              <div className="font-bold text-gray-900">By Education Level</div>
              <div className="text-sm text-gray-600">How education shapes wellbeing outcomes</div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
