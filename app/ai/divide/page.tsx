import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import BarChart from '../../components/BarChart';
import StatCard from '../../components/StatCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The AI Divide: Does AI Correlate with Economic Wellbeing? | How Is America',
  description:
    'Explore how AI adoption correlates with income, education, and geography. Census data reveals a growing AI divide across American demographics.',
};

interface AiStats {
  usage: { percentages: Record<string, number>; total: number; n: number };
  tools: Record<string, { percentage: number; weighted: number; n: number }>;
  purposes: Record<string, { percentage: number; weighted: number; n: number }>;
  concerns: Record<string, { percentage: number; weighted: number; n: number }>;
  byAge: Record<string, { usedAI: number; n: number }>;
  byIncome: Record<string, { usedAI: number; n: number }>;
  byEducation: Record<string, { usedAI: number; n: number }>;
  byMetro: Record<string, { usedAI: number; n: number }>;
  byRegion: Record<string, { aiUsage: number; states: string[] }>;
}

const metroNames: Record<string, string> = {
  '0': 'Non-metro areas',
  '12060': 'Atlanta',
  '14460': 'Boston',
  '16980': 'Chicago',
  '19100': 'Dallas',
  '26420': 'Houston',
  '31080': 'Los Angeles',
  '33100': 'Miami',
  '35620': 'New York',
  '37980': 'Philadelphia',
  '47900': 'Washington DC',
};

export default function AIDividePage() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/ai-stats.json'), 'utf-8');
  const data: AiStats = JSON.parse(raw);

  // Income data ordered from lowest to highest
  const incomeOrder = ['Under $25K', '$25K-$35K', '$35K-$50K', '$50K-$75K', '$75K-$100K', '$100K-$150K', '$150K+'];
  const incomeItems = incomeOrder.map((inc) => ({ label: inc, value: data.byIncome[inc]?.usedAI ?? 0 }));

  // Education data ordered from least to most
  const eduOrder = ['Less than HS', 'Some HS', 'HS diploma/GED', 'Some college', 'Associate degree', "Bachelor's", 'Graduate degree'];
  const eduItems = eduOrder.map((edu) => ({ label: edu, value: data.byEducation[edu]?.usedAI ?? 0 }));

  // Metro vs Non-Metro
  const nonMetro = data.byMetro['0']?.usedAI ?? 0;
  const metroEntries = Object.entries(data.byMetro).filter(([k]) => k !== '0');
  const metroAvg = metroEntries.length > 0
    ? Math.round((metroEntries.reduce((s, [, v]) => s + v.usedAI, 0) / metroEntries.length) * 100) / 100
    : 0;

  const metroCompare = [
    { label: 'Metro Area Average', value: metroAvg },
    { label: 'Non-Metro Areas', value: nonMetro },
  ];

  // Gaps
  const lowestIncomeUsage = data.byIncome['Under $25K']?.usedAI ?? 0;
  const highestIncomeUsage = data.byIncome['$150K+']?.usedAI ?? 0;
  const incomeGap = Math.round((highestIncomeUsage - lowestIncomeUsage) * 100) / 100;

  const lowestEduUsage = data.byEducation['Less than HS']?.usedAI ?? 0;
  const highestEduUsage = data.byEducation['Graduate degree']?.usedAI ?? 0;
  const eduGap = Math.round((highestEduUsage - lowestEduUsage) * 100) / 100;

  const metroGap = Math.round((metroAvg - nonMetro) * 100) / 100;

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-purple-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <div className="inline-block bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-medium mb-6">
            Census HTOPS Deep Dive &middot; AI &amp; Demographics
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            The AI Divide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Does AI adoption correlate with economic wellbeing? Census data reveals how income, education,
            and geography shape who uses artificial intelligence &mdash; and who gets left behind.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* AI Usage by Income */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Usage by Income</h2>
          <p className="text-sm text-gray-500 mb-6">
            Percentage who used AI in the past 2 months, by household income bracket
          </p>
          <BarChart items={incomeItems} maxValue={35} color="#059669" />
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800">
              <span className="font-semibold">The income gap:</span> Americans earning $150K+ are {incomeGap} percentage
              points more likely to use AI than those earning under $25K ({highestIncomeUsage}% vs {lowestIncomeUsage}%).
            </p>
          </div>
        </section>

        {/* AI Usage by Education */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Usage by Education</h2>
          <p className="text-sm text-gray-500 mb-6">
            Percentage who used AI in the past 2 months, by highest education level attained
          </p>
          <BarChart items={eduItems} maxValue={35} color="#d97706" />
          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-800">
              <span className="font-semibold">The education gap:</span> Those with a graduate degree are {eduGap} percentage
              points more likely to use AI than those with less than a high school education ({highestEduUsage}% vs {lowestEduUsage}%).
              Note: the &ldquo;Less than HS&rdquo; group has a very small sample size (n={data.byEducation['Less than HS']?.n ?? 0}).
            </p>
          </div>
        </section>

        {/* Metro vs Non-Metro */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Usage: Metro vs Non-Metro</h2>
          <p className="text-sm text-gray-500 mb-6">
            Average AI adoption across 10 major metro areas compared to non-metro regions
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl font-bold text-blue-700 mb-1">{metroAvg}%</div>
              <div className="text-sm text-gray-600">Metro Area Average</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl font-bold text-gray-700 mb-1">{nonMetro}%</div>
              <div className="text-sm text-gray-600">Non-Metro Areas</div>
            </div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">The geographic gap:</span> Metro areas average {metroGap} percentage
              points {metroGap > 0 ? 'higher' : 'lower'} AI adoption than non-metro areas ({metroAvg}% vs {nonMetro}%).
            </p>
          </div>
        </section>

        {/* The AI Prosperity Gap */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">The AI Prosperity Gap</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard value={`${incomeGap}pp`} label="Income Gap ($150K+ vs Under $25K)" color="#059669" />
            <StatCard value={`${eduGap}pp`} label="Education Gap (Grad vs Less than HS)" color="#d97706" />
            <StatCard value={`${metroGap}pp`} label="Metro vs Non-Metro Gap" color="#2563eb" />
          </div>
          <p className="text-sm text-gray-500 text-center mt-4">
            pp = percentage points difference in AI adoption rates
          </p>
        </section>

        {/* Key Findings */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Findings</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold mt-0.5">1.</span>
              <span>
                <span className="font-semibold">Income matters, but not linearly.</span> AI usage rises with income from
                Under $25K ({lowestIncomeUsage}%) to $100K-$150K ({data.byIncome['$100K-$150K']?.usedAI ?? 0}%),
                but dips slightly for the $150K+ bracket ({highestIncomeUsage}%). The $25K-$35K bracket
                shows a surprising spike at {data.byIncome['$25K-$35K']?.usedAI ?? 0}%.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold mt-0.5">2.</span>
              <span>
                <span className="font-semibold">Education is the strongest predictor.</span> The {eduGap} percentage point
                education gap is the largest divide. Bachelor&apos;s degree holders ({data.byEducation["Bachelor's"]?.usedAI ?? 0}%)
                and graduate degree holders ({highestEduUsage}%) lead AI adoption.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-0.5">3.</span>
              <span>
                <span className="font-semibold">The metro/non-metro gap is narrower than expected.</span> At just {metroGap} percentage
                points, the geographic divide in AI usage is smaller than income or education gaps, suggesting AI access
                is not purely a geographic issue.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-600 font-bold mt-0.5">4.</span>
              <span>
                <span className="font-semibold">AI adoption is still early.</span> Even among the highest-adopting demographics,
                fewer than 1 in 3 Americans report using AI, indicating substantial room for growth across all groups.
              </span>
            </li>
          </ul>
        </section>

        {/* Methodology Note */}
        <section className="bg-gray-50 rounded-xl p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-2">About This Data</h2>
          <p className="text-sm text-gray-600">
            Data from the U.S. Census Bureau Household Trends and Outlook Pulse Survey (HTOPS), March 2026.
            All percentages are weighted using PWEIGHT to be representative of the U.S. adult population.
            The AI question asks whether respondents used AI tools &ldquo;in the past 2 months.&rdquo;
            Some demographic subgroups have small sample sizes; interpret with caution.
          </p>
        </section>

        {/* Cross-links */}
        <section className="bg-gray-50 rounded-xl p-8 print:hidden">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Explore More</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/ai" className="text-[--primary] hover:underline text-sm font-medium">AI Deep Dive &rarr;</Link>
            <Link href="/metro-rural" className="text-[--primary] hover:underline text-sm font-medium">Metro vs Rural &rarr;</Link>
            <Link href="/trends" className="text-[--primary] hover:underline text-sm font-medium">Trend Tracker &rarr;</Link>
            <Link href="/compare" className="text-[--primary] hover:underline text-sm font-medium">Compare Regions &rarr;</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
