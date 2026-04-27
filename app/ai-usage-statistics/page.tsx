import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import Link from 'next/link';
import StatCard from '../components/StatCard';
import BarChart from '../components/BarChart';

export const metadata: Metadata = {
  title: 'How Many Americans Use AI? 2026 Census Data',
  description:
    '24.07% of Americans use AI according to Census HTOPS 2026 data. Explore AI adoption by age, income, education, and region with official government statistics.',
  openGraph: {
    title: 'How Many Americans Use AI? 2026 Census Data | How Is America',
    description: '24.07% of Americans use AI. See demographics, top uses, and concerns from Census HTOPS data.',
  },
};

interface AiStats {
  usage: { percentages: Record<string, number>; total: number; n: number };
  tools: Record<string, { weighted: number; n: number }>;
  purposes: Record<string, { weighted: number; n: number }>;
  concerns: Record<string, { weighted: number; n: number }>;
  byAge: Record<string, { usedAI: number; n: number }>;
  byIncome: Record<string, { usedAI: number; n: number }>;
  byEducation: Record<string, { usedAI: number; n: number }>;
  byRegion: Record<string, { aiUsage: number; states: string[] }>;
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How many Americans use AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'According to the U.S. Census Bureau HTOPS survey (March 2026), 24.07% of Americans report using artificial intelligence — approximately 62.5 million adults. Another 20.08% are not sure whether they have used AI, suggesting true usage may be higher.',
      },
    },
    {
      '@type': 'Question',
      name: 'What percentage of workers use AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Census HTOPS data shows 24.07% of all adults use AI, with work projects being a top use case. Among AI users, brainstorming and work projects are among the most common applications. Pew Research reports 26% have used ChatGPT specifically, while Gallup found 50% workplace AI adoption.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which age group uses AI the most?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Adults aged 25-39 have the highest AI usage rate at 27.95%, followed by 55-64 year olds at 26.89% and 40-54 year olds at 24.65%. The 65+ age group has the lowest rate at 18.84%. Notably, 18-24 year olds report 20.69% but have the highest "not sure" rate at 23.77%.',
      },
    },
    {
      '@type': 'Question',
      name: 'What do Americans use AI for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The top AI uses according to Census HTOPS data include: finding factual information, brainstorming, work projects, creative tasks, and as a tool integrated into other products. Entertainment, shopping, creative projects, and communication are the most common purposes.',
      },
    },
  ],
};

export default function AiUsageStatisticsPage() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/ai-stats.json'), 'utf-8');
  const data: AiStats = JSON.parse(raw);

  const ageItems = Object.entries(data.byAge)
    .sort((a, b) => b[1].usedAI - a[1].usedAI)
    .map(([age, { usedAI }]) => ({ label: age, value: usedAI }));

  const incomeItems = Object.entries(data.byIncome)
    .sort((a, b) => b[1].usedAI - a[1].usedAI)
    .map(([income, { usedAI }]) => ({ label: income, value: usedAI }));

  const educationItems = Object.entries(data.byEducation)
    .filter(([, { n }]) => n >= 50)
    .sort((a, b) => b[1].usedAI - a[1].usedAI)
    .map(([edu, { usedAI }]) => ({ label: edu, value: usedAI }));

  const topUses = Object.entries(data.tools)
    .filter(([name]) => name !== 'Other' && name !== 'None')
    .sort((a, b) => b[1].weighted - a[1].weighted)
    .slice(0, 6)
    .map(([name, { weighted }]) => ({
      label: name,
      value: Math.round(weighted / 1000000),
      displayValue: `${(weighted / 1000000).toFixed(1)}M`,
    }));

  const topConcerns = Object.entries(data.concerns)
    .filter(([name]) => name !== 'Other')
    .sort((a, b) => b[1].weighted - a[1].weighted)
    .slice(0, 6)
    .map(([name, { weighted }]) => ({
      label: name,
      value: Math.round(weighted / 1000000),
      displayValue: `${(weighted / 1000000).toFixed(1)}M`,
    }));

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
            How Many Americans Use AI?
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
            <strong className="text-gray-900">24.07%</strong> of Americans report using artificial intelligence,
            according to the U.S. Census Bureau HTOPS survey — that&apos;s approximately 62.5 million adults.
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Compare: Census 24% · Pew 26% (ChatGPT) · Gallup 50% (workplace AI)
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard value={`${data.usage.percentages['1']}%`} label="Use AI" color="#2563eb" />
          <StatCard value={`${data.usage.percentages['2']}%`} label="Do Not Use AI" color="#6b7280" />
          <StatCard value={`${data.usage.percentages['3']}%`} label="Not Sure" color="#d97706" />
          <StatCard value={`${data.usage.n.toLocaleString()}`} label="Survey Respondents" color="#059669" />
        </div>

        {/* Demographics */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Usage by Demographics</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">By Age</h3>
              <BarChart items={ageItems} color="#2563eb" />
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">By Income</h3>
              <BarChart items={incomeItems} color="#059669" />
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">By Education</h3>
              <BarChart items={educationItems} color="#7c3aed" />
            </div>
          </div>
        </section>

        {/* Uses and Concerns */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What Americans Use AI For — and What Worries Them</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Uses (weighted population)</h3>
              <BarChart items={topUses} color="#2563eb" />
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Concerns (weighted population)</h3>
              <BarChart items={topConcerns} color="#dc2626" />
            </div>
          </div>
        </section>

        {/* Survey Context */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Survey Comparisons</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-bold text-[--primary] mb-1">24%</p>
                <p className="text-sm text-gray-600">
                  <strong>Census HTOPS</strong> — general AI usage among U.S. adults (n=7,451)
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[--primary] mb-1">26%</p>
                <p className="text-sm text-gray-600">
                  <strong>Pew Research</strong> — have used ChatGPT specifically
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[--primary] mb-1">50%</p>
                <p className="text-sm text-gray-600">
                  <strong>Gallup</strong> — workplace AI adoption among employed adults
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            Dive deeper into AI adoption patterns, the digital divide, and regional differences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ai"
              className="inline-flex items-center gap-2 bg-[--primary] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Full AI Data →
            </Link>
            <Link
              href="/ai/divide"
              className="inline-flex items-center gap-2 bg-white text-[--primary] border border-[--primary] px-6 py-3 rounded-lg font-medium hover:bg-[--primary-light] transition-colors"
            >
              AI Digital Divide →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
