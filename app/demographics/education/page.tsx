import type { Metadata } from 'next';
import Link from 'next/link';
import StatCard from '../../components/StatCard';
import BarChart from '../../components/BarChart';

export const metadata: Metadata = {
  title: 'Demographics by Education — Education & Wellbeing',
  description:
    'Explore how education level impacts food security, employment, health insurance, AI adoption, and financial difficulty across America.',
};

const educationData = [
  { level: 'Less than HS', aiUsage: 5.2, foodInsecure: 18.5, employed: 35.2, uninsured: 22.1, expenseDifficult: 38.2 },
  { level: 'High School/GED', aiUsage: 17.9, foodInsecure: 9.8, employed: 48.5, uninsured: 11.5, expenseDifficult: 24.8 },
  { level: 'Some College', aiUsage: 22.3, foodInsecure: 7.2, employed: 55.8, uninsured: 8.2, expenseDifficult: 20.1 },
  { level: 'Associate Degree', aiUsage: 28.3, foodInsecure: 5.5, employed: 62.1, uninsured: 6.1, expenseDifficult: 16.5 },
  { level: "Bachelor's Degree", aiUsage: 28.6, foodInsecure: 3.1, employed: 68.2, uninsured: 4.2, expenseDifficult: 12.8 },
  { level: 'Graduate Degree', aiUsage: 27.6, foodInsecure: 1.8, employed: 71.5, uninsured: 2.8, expenseDifficult: 8.5 },
];

export default function EducationPage() {
  return (
    <>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Demographics by Education</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            How education level shapes employment, food security, health coverage, and financial difficulty across
            America.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Key Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard value="18.5%" label="Food Insecure (No HS)" color="#d97706" />
          <StatCard value="22.1%" label="Uninsured (No HS)" color="#7c3aed" />
          <StatCard value="28.6%" label="AI Usage (Bachelor's)" color="#2563eb" />
          <StatCard value="71.5%" label="Employment (Graduate)" color="#059669" />
        </div>

        {/* AI Usage */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">AI Usage by Education</h2>
          <BarChart items={educationData.map((d) => ({ label: d.level, value: d.aiUsage }))} color="#2563eb" />
        </section>

        {/* Food Insecurity */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Food Insecurity by Education</h2>
          <BarChart items={educationData.map((d) => ({ label: d.level, value: d.foodInsecure }))} color="#d97706" />
        </section>

        {/* Employment */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Employment Rate by Education</h2>
          <BarChart items={educationData.map((d) => ({ label: d.level, value: d.employed }))} color="#059669" />
        </section>

        {/* Uninsured */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Uninsured Rate by Education</h2>
          <BarChart items={educationData.map((d) => ({ label: d.level, value: d.uninsured }))} color="#7c3aed" />
        </section>

        {/* Expense Difficulty */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Expense Difficulty by Education</h2>
          <BarChart items={educationData.map((d) => ({ label: d.level, value: d.expenseDifficult }))} color="#0891b2" />
        </section>

        {/* Narrative */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">The Education Gradient</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Education is one of the strongest predictors of wellbeing in the HTOPS data. Americans without a high
              school diploma face hardship rates that are{' '}
              <strong>4–10 times higher</strong> than those with a graduate degree across nearly every metric.
            </p>
            <p>
              <strong>Food insecurity drops from 18.5% to 1.8%</strong> as education rises from less than high school to
              a graduate degree — a tenfold difference. The uninsured rate follows a similar pattern: 22.1% for those
              without a diploma versus just 2.8% for graduate degree holders.
            </p>
            <p>
              The <strong>AI adoption curve is particularly striking</strong>. Only 5.2% of those without a high school
              education use AI tools, compared to 28.6% of bachelor&apos;s degree holders — a 5.5x gap. This digital
              divide risks compounding existing educational inequalities as AI becomes more central to the economy.
            </p>
            <p>
              Employment climbs steadily from 35.2% to 71.5% with each education level, while expense difficulty
              drops from 38.2% to 8.5%. Each step up the educational ladder delivers measurable improvements in
              economic security.
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
              href="/demographics/race"
              className="bg-white rounded-xl border border-gray-200 p-4 hover:border-[--primary] hover:shadow-md transition-all"
            >
              <div className="font-bold text-gray-900">By Race &amp; Ethnicity</div>
              <div className="text-sm text-gray-600">Disparities across racial and ethnic groups</div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
