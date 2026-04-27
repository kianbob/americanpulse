import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import Link from 'next/link';
import StatCard from '../components/StatCard';
import BarChart from '../components/BarChart';

export const metadata: Metadata = {
  title: 'Cost of Living Difficulty by State 2026',
  description:
    '19.77% of Americans report expense difficulty. Explore cost of living challenges by state and region with Census HTOPS 2026 data.',
  openGraph: {
    title: 'Cost of Living Difficulty by State 2026 | How Is America',
    description: '19.77% of Americans find expenses difficult. See regional and state-level cost of living data.',
  },
};

interface NationalStats {
  headlines: {
    expenseDifficultyPct: number;
    employedPct: number;
  };
  spending: {
    expenseDifficulty: { percentages: Record<string, number> };
    priceChange: { percentages: Record<string, number> };
  };
}

interface RegionStats {
  [division: string]: {
    states: string[];
    n: number;
    expenseDifficult: number;
    employed: number;
    uninsured: number;
  };
}

interface BlsData {
  meta: { source: string };
  states: Record<string, { rate: number }>;
}

const expenseLabels: Record<string, string> = {
  '1': 'Not at all difficult',
  '2': 'A little difficult',
  '3': 'Somewhat difficult',
  '4': 'Very difficult',
};

const priceChangeLabels: Record<string, string> = {
  '1': 'Prices increased',
  '2': 'Prices stayed the same',
  '3': 'Prices decreased',
  '4': 'Not sure',
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How many Americans struggle with expenses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'According to Census HTOPS data (March 2026), 19.77% of Americans find it somewhat or very difficult to pay for usual household expenses. 12.23% find it somewhat difficult and 7.54% find it very difficult.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is expense difficulty?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Expense difficulty is measured by the Census HTOPS survey asking how difficult it is to pay for usual household expenses such as food, rent, mortgage, car payments, medical expenses, and student loans. Responses range from "not at all difficult" (47.54%) to "very difficult" (7.54%).',
      },
    },
    {
      '@type': 'Question',
      name: 'Which regions have the highest cost of living?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Census HTOPS data shows the West North Central division (IA, KS, MN, MO, NE, ND, SD) reports the highest expense difficulty rate at 87.71%, followed by Middle Atlantic (82.94%) and East North Central (82.67%). These reflect the percentage reporting at least "a little" difficulty with expenses.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does unemployment affect cost of living?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Unemployment directly impacts household ability to meet expenses. Census HTOPS shows 56.64% of adults are employed, and expense difficulty correlates with employment status. Regions with lower employment tend to report higher rates of difficulty paying for basic expenses.',
      },
    },
  ],
};

export default function CostOfLivingByStatePage() {
  const nationalRaw = fs.readFileSync(path.join(process.cwd(), 'public/data/national-stats.json'), 'utf-8');
  const national: NationalStats = JSON.parse(nationalRaw);

  const regionRaw = fs.readFileSync(path.join(process.cwd(), 'public/data/region-stats.json'), 'utf-8');
  const regions: RegionStats = JSON.parse(regionRaw);

  let blsData: BlsData | null = null;
  try {
    const blsRaw = fs.readFileSync(path.join(process.cwd(), 'public/data/bls-unemployment.json'), 'utf-8');
    blsData = JSON.parse(blsRaw);
  } catch {
    // Supplemental data not available
  }

  const expenseItems = Object.entries(national.spending.expenseDifficulty.percentages).map(([key, val]) => ({
    label: expenseLabels[key] ?? key,
    value: val,
  }));

  const priceItems = Object.entries(national.spending.priceChange.percentages).map(([key, val]) => ({
    label: priceChangeLabels[key] ?? key,
    value: val,
  }));

  const regionExpenseItems = Object.entries(regions)
    .sort((a, b) => b[1].expenseDifficult - a[1].expenseDifficult)
    .map(([name, { expenseDifficult }]) => ({ label: name, value: expenseDifficult }));

  const blsItems = blsData
    ? Object.entries(blsData.states)
        .sort((a, b) => b[1].rate - a[1].rate)
        .slice(0, 15)
        .map(([abbr, { rate }]) => ({ label: abbr, value: rate }))
    : null;

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Cost of Living Difficulty by State
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
            <strong className="text-gray-900">{national.headlines.expenseDifficultyPct}%</strong> of Americans
            find it somewhat or very difficult to pay for usual household expenses, and{' '}
            <strong className="text-gray-900">{national.spending.priceChange.percentages['1']}%</strong> report
            prices have increased.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard value={`${national.headlines.expenseDifficultyPct}%`} label="Expense Difficulty" color="#0891b2" />
          <StatCard value={`${national.spending.expenseDifficulty.percentages['4']}%`} label="Very Difficult" color="#dc2626" />
          <StatCard value={`${national.spending.priceChange.percentages['1']}%`} label="Prices Increased" color="#d97706" />
          <StatCard value={`${national.headlines.employedPct}%`} label="Employed" color="#059669" />
        </div>

        {/* Expense Difficulty & Price Change */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Expense Difficulty & Price Changes</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">How Difficult Are Expenses?</h3>
              <BarChart items={expenseItems} color="#0891b2" />
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Changes (Last Month)</h3>
              <BarChart items={priceItems} color="#d97706" />
            </div>
          </div>
        </section>

        {/* Regional Breakdown */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Expense Difficulty by Region</h2>
          <p className="text-gray-600 mb-6">
            Regional rates of expense difficulty (at least &ldquo;a little difficult&rdquo;) from Census HTOPS.
            The West North Central division reports the highest rate, while the Pacific states report the lowest.
          </p>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <BarChart items={regionExpenseItems} color="#0891b2" />
          </div>
        </section>

        {/* BLS Unemployment */}
        {blsItems ? (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top 15 States by Unemployment (BLS)</h2>
            <p className="text-gray-600 mb-6">
              State-level unemployment rates from the Bureau of Labor Statistics. Higher unemployment
              often correlates with greater expense difficulty.
            </p>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <BarChart items={blsItems} color="#dc2626" />
            </div>
          </section>
        ) : (
          <section className="bg-gray-50 rounded-xl border border-gray-200 p-6">
            <p className="text-gray-600 text-sm">
              State-level unemployment data from BLS will be available soon. Census HTOPS data
              is reported at the regional (Census Division) level — it does not include state identifiers.
            </p>
          </section>
        )}

        {/* Context */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Expense Difficulty</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What&apos;s Measured</h3>
              <p className="text-sm text-gray-600">
                The HTOPS survey asks: &ldquo;In the last 7 days, how difficult has it been for your
                household to pay for usual household expenses, including but not limited to food,
                rent or mortgage, car payments, medical expenses, student loans, and so on?&rdquo;
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Findings</h3>
              <p className="text-sm text-gray-600">
                Nearly half of Americans (47.54%) say expenses are not at all difficult, while about
                1 in 5 (19.77%) find them somewhat or very difficult. Three-quarters (75.28%) report
                that prices have increased in the past month.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            Explore the full HTOPS spending data with detailed expense and price breakdowns.
          </p>
          <Link
            href="/spending"
            className="inline-flex items-center gap-2 bg-[--primary] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            View Full Spending Data →
          </Link>
        </section>
      </div>
    </div>
  );
}
