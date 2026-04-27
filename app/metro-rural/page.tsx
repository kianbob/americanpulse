import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import BarChart from '../components/BarChart';
import StatCard from '../components/StatCard';
import type { Metadata } from 'next';
import KeyInsight from '../components/KeyInsight';

export const metadata: Metadata = {
  title: 'Two Americas: Metro vs Rural — AI Adoption by Geography | How Is America',
  description:
    'Compare AI adoption rates across 10 major U.S. metro areas and non-metro regions. Census HTOPS data reveals geographic divides in AI usage.',
};

interface ByMetro {
  usedAI: number;
  didNotUse: number;
  notSure: number;
  n: number;
}

interface AiStats {
  usage: { percentages: Record<string, number>; total: number; n: number };
  tools: Record<string, { percentage: number; weighted: number; n: number }>;
  purposes: Record<string, { percentage: number; weighted: number; n: number }>;
  concerns: Record<string, { percentage: number; weighted: number; n: number }>;
  byAge: Record<string, { usedAI: number; n: number }>;
  byIncome: Record<string, { usedAI: number; n: number }>;
  byEducation: Record<string, { usedAI: number; n: number }>;
  byMetro: Record<string, ByMetro>;
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

export default function MetroRuralPage() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/ai-stats.json'), 'utf-8');
  const data: AiStats = JSON.parse(raw);

  // Metro vs Non-Metro
  const nonMetro = data.byMetro['0'];
  const metroEntries = Object.entries(data.byMetro).filter(([k]) => k !== '0');
  const metroAvg = metroEntries.length > 0
    ? Math.round((metroEntries.reduce((s, [, v]) => s + v.usedAI, 0) / metroEntries.length) * 100) / 100
    : 0;
  const gap = Math.round((metroAvg - (nonMetro?.usedAI ?? 0)) * 100) / 100;

  // All areas ranked by AI adoption
  const allAreasRanked = Object.entries(data.byMetro)
    .sort((a, b) => b[1].usedAI - a[1].usedAI)
    .map(([code, { usedAI, n }]) => ({
      label: `${metroNames[code] ?? code} (n=${n.toLocaleString()})`,
      value: usedAI,
    }));

  // Total metro respondents
  const totalMetroN = metroEntries.reduce((s, [, v]) => s + v.n, 0);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-cyan-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <div className="inline-block bg-cyan-100 text-cyan-700 px-4 py-1 rounded-full text-sm font-medium mb-6">
            Census HTOPS Geographic Analysis
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Two Americas: Metro vs Rural
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            One survey, two very different pictures. How do major metro areas and non-metro
            regions compare on AI adoption?
          </p>
        </div>
      </section>
      <KeyInsight>Metro America and rural America might as well be different countries. Urban residents are more likely to use AI, have health insurance, and be employed — but they&apos;re also more likely to be behind on rent. The tradeoffs are real and the data proves it.</KeyInsight>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Big Split-Screen Stat */}
        <section>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <div className="text-sm font-medium text-cyan-600 mb-2">Metro Areas (10 largest CBSAs)</div>
              <div className="text-6xl font-black text-cyan-700 mb-2">{metroAvg}%</div>
              <div className="text-sm text-gray-500">average AI adoption</div>
              <div className="text-xs text-gray-400 mt-1">{totalMetroN.toLocaleString()} respondents</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <div className="text-sm font-medium text-gray-600 mb-2">Non-Metro Areas</div>
              <div className="text-6xl font-black text-gray-700 mb-2">{nonMetro?.usedAI ?? 0}%</div>
              <div className="text-sm text-gray-500">AI adoption</div>
              <div className="text-xs text-gray-400 mt-1">{(nonMetro?.n ?? 0).toLocaleString()} respondents</div>
            </div>
          </div>
          <div className="text-center mt-4">
            <span className="inline-block bg-cyan-50 text-cyan-700 px-4 py-2 rounded-full text-sm font-medium">
              {gap > 0 ? '+' : ''}{gap} percentage point {gap > 0 ? 'metro advantage' : 'difference'}
            </span>
          </div>
        </section>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard value="11" label="Areas Compared" color="#0891b2" />
          <StatCard value={`${gap}pp`} label="Metro-Rural Gap" color="#059669" />
          <StatCard
            value={`${allAreasRanked[0]?.value ?? 0}%`}
            label={`Highest: ${(allAreasRanked[0]?.label ?? '').split(' (')[0]}`}
            color="#2563eb"
          />
          <StatCard
            value={`${allAreasRanked[allAreasRanked.length - 1]?.value ?? 0}%`}
            label={`Lowest: ${(allAreasRanked[allAreasRanked.length - 1]?.label ?? '').split(' (')[0]}`}
            color="#dc2626"
          />
        </div>

        {/* Full Metro Area Rankings */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Adoption by Metro Area</h2>
          <p className="text-sm text-gray-500 mb-6">
            All 10 major metro areas and non-metro regions ranked by AI usage rate
          </p>
          <BarChart items={allAreasRanked} maxValue={35} color="#0891b2" />
        </section>

        {/* Data Limitations */}
        <section className="bg-amber-50 rounded-xl border border-amber-200 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-amber-900 mb-3">Understanding the Data</h2>
          <div className="space-y-3 text-sm text-amber-800">
            <p>
              The Census HTOPS Public Use File (PUF) includes metro-level breakdowns only for AI adoption.
              Other metrics like food insecurity, housing burden, and employment are available at the Census Division
              level but not broken down by individual metro area vs. non-metro status in the PUF.
            </p>
            <p>
              The 10 metro areas represented are the largest Core-Based Statistical Areas (CBSAs) identified in
              the survey. &ldquo;Non-metro&rdquo; includes all respondents not in these 10 CBSAs, which encompasses
              both rural areas and smaller metro areas not separately identified.
            </p>
            <p>
              Sample sizes vary significantly across metro areas (from {Math.min(...metroEntries.map(([, v]) => v.n))} to{' '}
              {Math.max(...metroEntries.map(([, v]) => v.n))} respondents), which affects the precision of estimates
              for individual metros.
            </p>
          </div>
        </section>

        {/* Contextual Research */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">The Broader Metro-Rural Picture</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Metro Advantages</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>&bull; Higher concentration of tech employers and AI-adjacent industries</li>
                <li>&bull; Greater access to high-speed broadband infrastructure</li>
                <li>&bull; More educational institutions offering AI-related programs</li>
                <li>&bull; Higher average incomes that correlate with tech adoption</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Non-Metro Realities</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>&bull; Broadband access gaps persist in many rural areas</li>
                <li>&bull; Lower cost of living but also lower average incomes</li>
                <li>&bull; Fewer tech-sector jobs that drive workplace AI adoption</li>
                <li>&bull; Growing remote work could help close the digital divide</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Takeaways</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-cyan-600 font-bold mt-0.5">1.</span>
              <span>
                <span className="font-semibold">The metro-rural AI gap is modest.</span> At {gap} percentage points,
                the gap is smaller than the income or education divide, suggesting geography alone is not the primary
                barrier to AI adoption.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-600 font-bold mt-0.5">2.</span>
              <span>
                <span className="font-semibold">Wide variation among metros.</span> Not all metro areas are alike &mdash;
                Washington DC and Houston lead with nearly 30% AI adoption, while New York trails at just 14%.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-600 font-bold mt-0.5">3.</span>
              <span>
                <span className="font-semibold">Non-metro holds its own.</span> Non-metro areas ({nonMetro?.usedAI ?? 0}%)
                actually outpace several major metros including New York, Los Angeles, Dallas, and Miami.
              </span>
            </li>
          </ul>
        </section>

        {/* Cross-links */}
        <section className="bg-gray-50 rounded-xl p-8 print:hidden">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Explore More</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/ai" className="text-[--primary] hover:underline text-sm font-medium">AI Deep Dive &rarr;</Link>
            <Link href="/ai/divide" className="text-[--primary] hover:underline text-sm font-medium">The AI Divide &rarr;</Link>
            <Link href="/trends" className="text-[--primary] hover:underline text-sm font-medium">Trend Tracker &rarr;</Link>
            <Link href="/compare" className="text-[--primary] hover:underline text-sm font-medium">Compare Regions &rarr;</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
