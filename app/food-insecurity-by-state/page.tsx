import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import Link from 'next/link';
import StatCard from '../components/StatCard';
import BarChart from '../components/BarChart';

export const metadata: Metadata = {
  title: 'Food Insecurity by State 2026 — Census Data',
  description:
    '7.03% of Americans report food insufficiency according to Census HTOPS data. Explore food insecurity rates by state and region with the latest 2026 data.',
  openGraph: {
    title: 'Food Insecurity by State 2026 — Census Data | American Pulse',
    description: '7.03% of Americans report food insufficiency. See regional and state-level food insecurity data.',
  },
};

interface FoodStats {
  sufficiency: { percentages: Record<string, number> };
  insecurePct: number;
  byRegion: Record<string, { foodInsufficient: number; states: string[] }>;
}

interface UsdaData {
  meta: { source: string; year: number };
  states: Record<string, { rate: number; rank: number }>;
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Which state has the highest food insecurity?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'According to USDA data, Mississippi, Louisiana, and Arkansas consistently rank among the states with the highest food insecurity rates. Census HTOPS regional data shows the East South Central division (AL, KY, MS, TN) has 8.12% food insufficiency.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is food insecurity?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Food insecurity means a household lacks consistent access to enough food for an active, healthy life. The USDA defines it as a lack of consistent access to enough food for every person in a household to live an active, healthy life. Census HTOPS measures food insufficiency — sometimes or often not having enough to eat.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is food insecurity measured?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The USDA uses an 18-item survey module in the Current Population Survey. The Census HTOPS survey asks a simpler food sufficiency question with four response options ranging from "enough of the kinds of food wanted" to "often not enough to eat." The HTOPS measure captures food insufficiency, a more severe indicator.',
      },
    },
    {
      '@type': 'Question',
      name: 'What percentage of Americans are food insecure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'According to Census HTOPS data (Wave 2506), 7.03% of Americans report food insufficiency — sometimes or often not having enough to eat. The USDA reports a higher overall food insecurity rate of approximately 14.3% nationally using a broader measure.',
      },
    },
  ],
};

export default function FoodInsecurityByStatePage() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/food-stats.json'), 'utf-8');
  const data: FoodStats = JSON.parse(raw);

  let usdaData: UsdaData | null = null;
  try {
    const usdaRaw = fs.readFileSync(path.join(process.cwd(), 'public/data/usda-food-security.json'), 'utf-8');
    usdaData = JSON.parse(usdaRaw);
  } catch {
    // Supplemental data not available
  }

  const regionItems = Object.entries(data.byRegion)
    .sort((a, b) => b[1].foodInsufficient - a[1].foodInsufficient)
    .map(([name, { foodInsufficient }]) => ({ label: name, value: foodInsufficient }));

  const stateItems = usdaData
    ? Object.entries(usdaData.states)
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
            Food Insecurity by State
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
            <strong className="text-gray-900">7.03%</strong> of Americans report food insufficiency — sometimes
            or often not having enough to eat, according to Census HTOPS data.
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Note: USDA reports ~14.3% food insecurity nationally using a broader measure.
            HTOPS captures food <em>insufficiency</em>, a more severe indicator.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard value={`${data.insecurePct}%`} label="Food Insufficient (HTOPS)" color="#d97706" />
          <StatCard value={`${data.sufficiency.percentages['1']}%`} label="Enough & Wanted" color="#059669" />
          <StatCard value={`${data.sufficiency.percentages['3']}%`} label="Sometimes Not Enough" color="#ea580c" />
          <StatCard value={`${data.sufficiency.percentages['4']}%`} label="Often Not Enough" color="#dc2626" />
        </div>

        {/* Regional Breakdown */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Food Insufficiency by Census Region</h2>
          <p className="text-gray-600 mb-6">
            Regional rates of food insufficiency from the Census HTOPS survey. The Middle Atlantic
            division (NJ, NY, PA) reports the highest rate at 9.46%, while Mountain states report
            the lowest at 5.32%.
          </p>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <BarChart items={regionItems} color="#d97706" />
          </div>
        </section>

        {/* USDA State Rankings */}
        {stateItems ? (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top 15 States by Food Insecurity (USDA)</h2>
            <p className="text-gray-600 mb-6">
              State-level food insecurity rates from USDA Economic Research Service data. These
              use a broader food insecurity measure than the HTOPS food insufficiency question.
            </p>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <BarChart items={stateItems} color="#ea580c" />
            </div>
          </section>
        ) : (
          <section className="bg-gray-50 rounded-xl border border-gray-200 p-6">
            <p className="text-gray-600 text-sm">
              State-level food insecurity data from USDA will be available soon. Census HTOPS data
              is reported at the regional (Census Division) level — it does not include state identifiers.
            </p>
          </section>
        )}

        {/* What Is Food Insecurity */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Food Insecurity</h2>
          <div className="prose prose-gray max-w-none">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">HTOPS Measure</h3>
                <p className="text-sm text-gray-600">
                  The Census HTOPS survey asks respondents to describe their food situation in the
                  last 7 days using four categories: enough of the kinds wanted (70.49%), enough but
                  not always the kinds wanted (22.48%), sometimes not enough (5.29%), and often not
                  enough (1.74%). Food insufficiency combines the last two categories.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">USDA Measure</h3>
                <p className="text-sm text-gray-600">
                  The USDA uses an 18-item food security module administered annually in the Current
                  Population Survey. Food insecurity includes both low and very low food security,
                  capturing a broader range of food access challenges including reduced quality
                  and variety of diet.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            Explore the full HTOPS food security data with detailed breakdowns.
          </p>
          <Link
            href="/food"
            className="inline-flex items-center gap-2 bg-[--primary] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            View Full Food Security Data →
          </Link>
        </section>
      </div>
    </div>
  );
}
