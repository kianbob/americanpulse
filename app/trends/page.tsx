import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import StatCard from '../components/StatCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trend Tracker: How America Is Changing | American Pulse',
  description:
    'Track key indicators over time: AI adoption, food insecurity, housing burden, employment, and more. Current Wave 2506 baseline from Census HTOPS data.',
};

interface Headlines {
  aiUsagePct: number;
  foodInsufficientPct: number;
  housingBurden: { rentBehindPct: number; mortgageBehindPct: number };
  uninsuredPct: number;
  employedPct: number;
  expenseDifficultyPct: number;
}

interface NationalStats {
  meta: { source: string; wave: string; sampleSize: number; note: string };
  headlines: Headlines;
}

export default function TrendsPage() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/national-stats.json'), 'utf-8');
  const data: NationalStats = JSON.parse(raw);
  const h = data.headlines;

  const trackedMetrics = [
    { label: 'AI Adoption', value: `${h.aiUsagePct}%`, color: '#2563eb', description: 'Americans using AI tools in past 2 months' },
    { label: 'Food Insecurity', value: `${h.foodInsufficientPct}%`, color: '#dc2626', description: 'Households with sometimes/often not enough to eat' },
    { label: 'Rent Behind', value: `${h.housingBurden.rentBehindPct}%`, color: '#d97706', description: 'Renters behind on payments' },
    { label: 'Expense Difficulty', value: `${h.expenseDifficultyPct}%`, color: '#7c3aed', description: 'Finding it somewhat/very difficult to pay expenses' },
    { label: 'Employed', value: `${h.employedPct}%`, color: '#059669', description: 'Adults who worked in the past 7 days' },
    { label: 'Uninsured', value: `${h.uninsuredPct}%`, color: '#0891b2', description: 'Adults without health insurance' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-indigo-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <div className="inline-block bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium mb-6">
            Longitudinal Tracking &middot; Wave {data.meta.wave}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Trend Tracker
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            How is America changing? We track key indicators from each Census HTOPS wave to
            reveal trends in AI adoption, economic hardship, and wellbeing over time.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* How It Works */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How Trend Tracking Works</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-indigo-600 mb-2">1</div>
              <h3 className="font-semibold text-gray-900 mb-1">Baseline</h3>
              <p className="text-sm text-gray-600">
                We establish current metrics from Wave {data.meta.wave} as our starting point.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-indigo-600 mb-2">2</div>
              <h3 className="font-semibold text-gray-900 mb-1">Compare</h3>
              <p className="text-sm text-gray-600">
                As new HTOPS waves are released, we compare each indicator against prior waves.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-indigo-600 mb-2">3</div>
              <h3 className="font-semibold text-gray-900 mb-1">Analyze</h3>
              <p className="text-sm text-gray-600">
                Identify which metrics are improving, worsening, or holding steady over time.
              </p>
            </div>
          </div>
        </section>

        {/* Current Baseline Snapshot */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Current Baseline: Wave {data.meta.wave}
          </h2>
          <p className="text-sm text-gray-500 mb-8 text-center">
            These are the starting metrics we&apos;ll track over time &middot; {data.meta.sampleSize.toLocaleString()} respondents
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {trackedMetrics.map((m) => (
              <StatCard key={m.label} value={m.value} label={m.label} color={m.color} />
            ))}
          </div>
        </section>

        {/* Detailed Metrics */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Metric Details</h2>
          <div className="space-y-6">
            {trackedMetrics.map((m) => (
              <div key={m.label} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold min-w-[80px] text-right" style={{ color: m.color }}>
                  {m.value}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{m.label}</div>
                  <div className="text-sm text-gray-500">{m.description}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Wave Comparison Placeholder */}
        <section className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Wave-over-Wave Comparison</h2>
          <div className="text-center py-12">
            <div className="text-4xl mb-4">&#128202;</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Coming Soon</h3>
            <p className="text-gray-500 max-w-lg mx-auto">
              Historical wave comparison coming soon as we collect more data points.
              The Census Bureau releases new HTOPS waves periodically, and we&apos;ll add trend
              charts showing how each metric changes over time.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {['AI Adoption Trend', 'Food Insecurity Trend', 'Housing Burden Trend', 'Employment Trend', 'Expense Difficulty Trend', 'Uninsured Rate Trend'].map((title) => (
              <div key={title} className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                <div className="text-sm font-medium text-gray-400 mb-2">{title}</div>
                <div className="h-16 flex items-center justify-center">
                  <span className="text-xs text-gray-400">Awaiting Wave 2 data</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What to Watch */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What to Watch</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Leading Indicators</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">&bull;</span>
                  <span><span className="font-medium">AI adoption</span> &mdash; Is AI usage accelerating? Which demographics are catching up?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">&bull;</span>
                  <span><span className="font-medium">Employment</span> &mdash; Are work patterns shifting as AI tools become more common?</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Hardship Indicators</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">&bull;</span>
                  <span><span className="font-medium">Food insecurity</span> &mdash; Are more Americans struggling to put food on the table?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">&bull;</span>
                  <span><span className="font-medium">Housing burden</span> &mdash; Is the rental crisis deepening or stabilizing?</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cross-links */}
        <section className="bg-gray-50 rounded-xl p-8 print:hidden">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Explore More</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/ai" className="text-[--primary] hover:underline text-sm font-medium">AI Deep Dive &rarr;</Link>
            <Link href="/ai/divide" className="text-[--primary] hover:underline text-sm font-medium">The AI Divide &rarr;</Link>
            <Link href="/metro-rural" className="text-[--primary] hover:underline text-sm font-medium">Metro vs Rural &rarr;</Link>
            <Link href="/compare" className="text-[--primary] hover:underline text-sm font-medium">Compare Regions &rarr;</Link>
            <Link href="/downloads" className="text-[--primary] hover:underline text-sm font-medium">Download the Data &rarr;</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
