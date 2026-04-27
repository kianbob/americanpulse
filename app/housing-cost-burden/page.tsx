import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import Link from 'next/link';
import StatCard from '../components/StatCard';
import BarChart from '../components/BarChart';

export const metadata: Metadata = {
  title: 'Housing Cost Burden by State 2026',
  description:
    '8.87% of renters and 4.37% of mortgage holders are behind on payments. Explore housing cost burden data by state and region from Census HTOPS 2026.',
  openGraph: {
    title: 'Housing Cost Burden by State 2026 | How Is America',
    description: '8.87% of renters are behind on payments. Explore regional and state-level housing burden data.',
  },
};

interface HousingStats {
  tenure: { percentages: Record<string, number> };
  rentCurrent: { percentages: Record<string, number> };
  mortgageCurrent: { percentages: Record<string, number> };
  byRegion: Record<string, { rentBehind: number; states: string[] }>;
}

interface FredData {
  meta: { source: string };
  states: Record<string, { medianRent: number; costBurdenedPct: number }>;
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is housing cost burden?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Housing cost burden means spending 30% or more of household income on housing costs, including rent or mortgage payments, utilities, and insurance. Households spending more than 50% are considered severely cost burdened. The Census HTOPS survey measures whether renters and mortgage holders are current on their payments.',
      },
    },
    {
      '@type': 'Question',
      name: 'What percentage of renters are cost burdened?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'According to Census HTOPS data, 8.87% of renters report being behind on rent payments. The broader measure of cost burden (spending 30%+ on housing) affects roughly half of all renters nationally according to Census ACS data.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which states have the highest housing costs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'At the regional level, the Middle Atlantic (NJ, NY, PA) has the highest rate of renters behind on payments at 21.23%, followed by the South Atlantic at 15.11%. California, Hawaii, Massachusetts, and New York consistently rank among the highest-cost states.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does behind on rent mean?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Being behind on rent means a renter has not made their rent payment on time. In the HTOPS survey, 8.87% of renters reported they were not current on their rent. This is a measure of acute housing distress, distinct from the broader concept of cost burden.',
      },
    },
  ],
};

export default function HousingCostBurdenPage() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/housing-stats.json'), 'utf-8');
  const data: HousingStats = JSON.parse(raw);

  const nationalRaw = fs.readFileSync(path.join(process.cwd(), 'public/data/national-stats.json'), 'utf-8');
  const national = JSON.parse(nationalRaw);
  const h = national.headlines;

  let fredData: FredData | null = null;
  try {
    const fredRaw = fs.readFileSync(path.join(process.cwd(), 'public/data/fred-housing.json'), 'utf-8');
    fredData = JSON.parse(fredRaw);
  } catch {
    // Supplemental data not available
  }

  const regionItems = Object.entries(data.byRegion)
    .sort((a, b) => b[1].rentBehind - a[1].rentBehind)
    .map(([name, { rentBehind }]) => ({ label: name, value: rentBehind }));

  const fredItems = fredData
    ? Object.entries(fredData.states)
        .sort((a, b) => b[1].costBurdenedPct - a[1].costBurdenedPct)
        .slice(0, 15)
        .map(([abbr, { costBurdenedPct }]) => ({ label: abbr, value: costBurdenedPct }))
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
            Housing Cost Burden by State
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
            Housing cost burden means spending <strong className="text-gray-900">30%+</strong> of income
            on housing. Census HTOPS data shows <strong className="text-gray-900">{h.housingBurden.rentBehindPct}%</strong> of
            renters and <strong className="text-gray-900">{h.housingBurden.mortgageBehindPct}%</strong> of mortgage holders
            are behind on payments.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard value={`${h.housingBurden.rentBehindPct}%`} label="Behind on Rent" color="#dc2626" />
          <StatCard value={`${h.housingBurden.mortgageBehindPct}%`} label="Behind on Mortgage" color="#ea580c" />
          <StatCard value={`${data.tenure.percentages['1']}%`} label="Renters" color="#2563eb" />
          <StatCard value={`${data.tenure.percentages['2']}%`} label="Own with Mortgage" color="#059669" />
        </div>

        {/* Regional Breakdown */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Renters Behind on Payments by Region</h2>
          <p className="text-gray-600 mb-6">
            The Middle Atlantic division (NJ, NY, PA) has the highest rate of renters behind on
            payments at 21.23%, more than 13× the rate in the Mountain states (1.61%).
          </p>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <BarChart items={regionItems} color="#dc2626" />
          </div>
        </section>

        {/* FRED State Data */}
        {fredItems ? (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top 15 States by Housing Cost Burden (FRED)</h2>
            <p className="text-gray-600 mb-6">
              State-level housing cost burden data from FRED (Federal Reserve Economic Data).
              Shows the percentage of households spending 30%+ of income on housing.
            </p>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <BarChart items={fredItems} color="#ea580c" />
            </div>
          </section>
        ) : (
          <section className="bg-gray-50 rounded-xl border border-gray-200 p-6">
            <p className="text-gray-600 text-sm">
              State-level housing cost burden data from FRED will be available soon. Census HTOPS data
              is reported at the regional (Census Division) level — it does not include state identifiers.
            </p>
          </section>
        )}

        {/* Housing Tenure */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Housing Tenure in America</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Renters</h3>
              <p className="text-sm text-gray-600">
                {data.tenure.percentages['1']}% of Americans rent their home. Of these,{' '}
                {data.rentCurrent.percentages['2']}% report being behind on rent — representing
                millions of households facing housing instability.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Homeowners</h3>
              <p className="text-sm text-gray-600">
                {data.tenure.percentages['2']}% own with a mortgage and {data.tenure.percentages['3']}%
                own free and clear. Among mortgage holders, {data.mortgageCurrent.percentages['2']}% are
                behind on payments — roughly half the rate of renters.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            Explore the full HTOPS housing data with detailed tenure and payment breakdowns.
          </p>
          <Link
            href="/housing"
            className="inline-flex items-center gap-2 bg-[--primary] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            View Full Housing Data →
          </Link>
        </section>
      </div>
    </div>
  );
}
