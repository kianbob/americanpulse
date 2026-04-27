import type { Metadata } from 'next';
import Link from 'next/link';
import StatCard from '../../components/StatCard';
import BarChart from '../../components/BarChart';

export const metadata: Metadata = {
  title: 'Demographics by Race & Ethnicity — Racial Disparities',
  description:
    'Explore racial and ethnic disparities in food security, employment, health insurance, AI adoption, and financial difficulty across America.',
};

const raceData = [
  { group: 'White, non-Hispanic', aiUsage: 24.2, foodInsecure: 5.1, employed: 57.8, uninsured: 5.9, expenseDifficult: 17.2 },
  { group: 'Black, non-Hispanic', aiUsage: 22.8, foodInsecure: 12.3, employed: 54.1, uninsured: 9.8, expenseDifficult: 28.5 },
  { group: 'Hispanic', aiUsage: 25.1, foodInsecure: 10.8, employed: 61.2, uninsured: 14.2, expenseDifficult: 25.3 },
  { group: 'Asian, non-Hispanic', aiUsage: 28.5, foodInsecure: 3.2, employed: 62.5, uninsured: 4.1, expenseDifficult: 14.8 },
  { group: 'Other/Multiple', aiUsage: 23.1, foodInsecure: 8.5, employed: 51.3, uninsured: 8.2, expenseDifficult: 21.7 },
];

export default function RacePage() {
  return (
    <>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Demographics by Race &amp; Ethnicity</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Examining racial and ethnic disparities in food security, employment, health coverage, AI adoption, and
            financial difficulty.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Key Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard value="14.2%" label="Hispanic Uninsured Rate" color="#7c3aed" />
          <StatCard value="12.3%" label="Black Food Insecurity" color="#d97706" />
          <StatCard value="28.5%" label="Asian AI Adoption" color="#2563eb" />
          <StatCard value="28.5%" label="Black Expense Difficulty" color="#0891b2" />
        </div>

        {/* Food Insecurity */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Food Insecurity by Race</h2>
          <BarChart items={raceData.map((d) => ({ label: d.group, value: d.foodInsecure }))} color="#d97706" />
        </section>

        {/* Uninsured */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Uninsured Rate by Race</h2>
          <BarChart items={raceData.map((d) => ({ label: d.group, value: d.uninsured }))} color="#7c3aed" />
        </section>

        {/* Employment */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Employment Rate by Race</h2>
          <BarChart items={raceData.map((d) => ({ label: d.group, value: d.employed }))} color="#059669" />
        </section>

        {/* AI Usage */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">AI Usage by Race</h2>
          <BarChart items={raceData.map((d) => ({ label: d.group, value: d.aiUsage }))} color="#2563eb" />
        </section>

        {/* Expense Difficulty */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Expense Difficulty by Race</h2>
          <BarChart items={raceData.map((d) => ({ label: d.group, value: d.expenseDifficult }))} color="#0891b2" />
        </section>

        {/* Narrative */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Racial Disparities in Wellbeing</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Black Americans face the highest food insecurity</strong> at 12.3% — more than double the White
              rate of 5.1% and nearly four times the Asian rate of 3.2%. This disparity persists across income levels
              and reflects structural barriers in access to affordable, nutritious food.
            </p>
            <p>
              <strong>Hispanic Americans have the highest uninsured rate</strong> at 14.2%, nearly 3.5 times the Asian
              rate (4.1%). Despite having the second-highest employment rate at 61.2%, coverage gaps — often tied to
              employer type and immigration status — leave many without health insurance.
            </p>
            <p>
              <strong>Asian Americans lead in AI adoption</strong> at 28.5% while also showing the lowest food
              insecurity (3.2%) and expense difficulty (14.8%). However, these aggregate numbers mask significant
              variation within the Asian American community.
            </p>
            <p>
              Notably, <strong>AI adoption rates are relatively similar</strong> across racial groups (22.8%–28.5%),
              making it one of the most equitable metrics tracked — a promising sign for digital inclusion even as
              other disparities persist.
            </p>
          </div>
        </section>

        {/* Cross-links */}
        <section className="bg-gray-50 rounded-xl p-8 print:hidden">
          <h2 className="text-xl font-bold text-gray-900 mb-4">More Demographics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/demographics/age"
              className="bg-white rounded-xl border border-gray-200 p-4 hover:border-[--primary] hover:shadow-md transition-all"
            >
              <div className="font-bold text-gray-900">By Age Group</div>
              <div className="text-sm text-gray-600">Generational divides in wellbeing</div>
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
