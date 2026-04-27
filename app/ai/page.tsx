import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import BarChart from '../components/BarChart';
import StatCard from '../components/StatCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Usage in America — 24% Now Use AI Tools | 2026 Census Data',
  description:
    '24.07% of Americans now use AI tools according to the 2026 Census HTOPS survey. Explore who uses AI, what they use it for, and what concerns them most.',
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

function calcToolPct(weighted: number, totalAiUsers: number): number {
  return Math.round((weighted / totalAiUsers) * 1000) / 10;
}

export default function AIPage() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/ai-stats.json'), 'utf-8');
  const data: AiStats = JSON.parse(raw);
  const usagePct = data.usage.percentages['1'] ?? 0;
  const didNotUsePct = data.usage.percentages['2'] ?? 0;
  const notSurePct = data.usage.percentages['3'] ?? 0;

  // Total AI users (weighted) for percentage calculation
  const totalAiUsersWeighted = (data.usage.total ?? 1) * (usagePct / 100);

  // Tools as % of AI users
  const toolItems = Object.entries(data.tools)
    .filter(([k]) => k !== 'Other' && k !== 'None')
    .sort((a, b) => b[1].weighted - a[1].weighted)
    .map(([label, { weighted }]) => ({
      label,
      value: calcToolPct(weighted, totalAiUsersWeighted),
    }));

  // Purposes as % of AI users
  const purposeItems = Object.entries(data.purposes)
    .filter(([k]) => k !== 'Other')
    .sort((a, b) => b[1].weighted - a[1].weighted)
    .map(([label, { weighted }]) => ({
      label,
      value: calcToolPct(weighted, totalAiUsersWeighted),
    }));

  // Concerns as % of respondents (use total population)
  const totalPopWeighted = data.usage.total ?? 1;
  const concernItems = Object.entries(data.concerns)
    .filter(([k]) => k !== 'Other')
    .sort((a, b) => b[1].weighted - a[1].weighted)
    .map(([label, { weighted }]) => ({
      label,
      value: Math.round((weighted / totalPopWeighted) * 1000) / 10,
    }));

  // Demographics
  const ageOrder = ['18-24', '25-39', '40-54', '55-64', '65+'];
  const ageItems = ageOrder.map((age) => ({ label: age, value: data.byAge[age]?.usedAI ?? 0 }));

  const incomeOrder = ['Under $25K', '$25K-$35K', '$35K-$50K', '$50K-$75K', '$75K-$100K', '$100K-$150K', '$150K+'];
  const incomeItems = incomeOrder.map((inc) => ({ label: inc, value: data.byIncome[inc]?.usedAI ?? 0 }));

  const eduOrder = ['Less than HS', 'Some HS', 'HS diploma/GED', 'Some college', 'Associate degree', "Bachelor's", 'Graduate degree'];
  const eduItems = eduOrder.map((edu) => ({ label: edu, value: data.byEducation[edu]?.usedAI ?? 0 }));

  // Metro vs Non-Metro
  const nonMetro = data.byMetro['0']?.usedAI ?? 0;
  const metroAvg = (() => {
    const metroEntries = Object.entries(data.byMetro).filter(([k]) => k !== '0');
    if (metroEntries.length === 0) return 0;
    const sum = metroEntries.reduce((s, [, v]) => s + v.usedAI, 0);
    return Math.round((sum / metroEntries.length) * 100) / 100;
  })();

  const metroItems = Object.entries(data.byMetro)
    .sort((a, b) => b[1].usedAI - a[1].usedAI)
    .map(([code, { usedAI }]) => ({ label: metroNames[code] ?? code, value: usedAI }));

  // Regional
  const regionItems = Object.entries(data.byRegion)
    .sort((a, b) => b[1].aiUsage - a[1].aiUsage)
    .map(([name, { aiUsage }]) => ({ label: name, value: aiUsage }));

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What percentage of Americans use AI?',
        acceptedAnswer: { '@type': 'Answer', text: `According to the 2026 Census HTOPS survey, ${usagePct}% of Americans report using AI tools in the past 2 months, while ${didNotUsePct}% did not and ${notSurePct}% were not sure.` },
      },
      {
        '@type': 'Question',
        name: 'What do Americans use AI for?',
        acceptedAnswer: { '@type': 'Answer', text: 'The most common AI use is finding factual information, followed by brainstorming and idea generation, work projects, creative tasks, and integrated product features.' },
      },
      {
        '@type': 'Question',
        name: 'Which age group uses AI the most?',
        acceptedAnswer: { '@type': 'Answer', text: `Adults aged 25-39 have the highest AI adoption at ${data.byAge['25-39']?.usedAI ?? 0}%, while those 65+ have the lowest at ${data.byAge['65+']?.usedAI ?? 0}%.` },
      },
      {
        '@type': 'Question',
        name: 'What are the biggest concerns about AI?',
        acceptedAnswer: { '@type': 'Answer', text: 'Privacy and data security is the top concern, followed by bias and discrimination, impact on children, job displacement, and over-dependence on AI.' },
      },
      {
        '@type': 'Question',
        name: 'Does income affect AI usage?',
        acceptedAnswer: { '@type': 'Answer', text: `Higher-income Americans are more likely to use AI. Those earning $100K-$150K have a ${data.byIncome['$100K-$150K']?.usedAI ?? 0}% usage rate, while those under $25K have an ${data.byIncome['Under $25K']?.usedAI ?? 0}% rate.` },
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Bold Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium mb-6">
            U.S. Census Bureau HTOPS Data &middot; March 2026
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            1 in 4 Americans<br />Now Use AI
          </h1>
          <div className="text-7xl sm:text-8xl font-black text-[--primary] mb-6">{usagePct}%</div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            of Americans report using artificial intelligence tools, according to the latest Census pulse survey of {data.usage.n?.toLocaleString() ?? '7,451'} respondents.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard value={`${usagePct}%`} label="Used AI" color="#2563eb" />
          <StatCard value={`${didNotUsePct}%`} label="Did Not Use" color="#6b7280" />
          <StatCard value={`${notSurePct}%`} label="Not Sure" color="#d97706" />
          <StatCard value={(data.usage.n ?? 7451).toLocaleString()} label="Respondents" color="#059669" />
        </div>

        {/* What AI Tools Are Used */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">What AI Is Used For</h2>
          <p className="text-sm text-gray-500 mb-6">Percentage of AI users who use each tool type</p>
          <BarChart items={toolItems} color="#4f46e5" />
        </section>

        {/* AI Purposes */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Purposes</h2>
          <p className="text-sm text-gray-500 mb-6">What AI users say they use AI for (% of AI users)</p>
          <BarChart items={purposeItems} color="#7c3aed" />
        </section>

        {/* AI Concerns */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Concerns</h2>
          <p className="text-sm text-gray-500 mb-6">Percentage of all respondents who expressed each concern</p>
          <BarChart items={concernItems} color="#dc2626" />
        </section>

        {/* Demographics Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Who Uses AI? Demographics Breakdown</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">By Age</h3>
              <BarChart items={ageItems} maxValue={35} color="#2563eb" />
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">By Income</h3>
              <BarChart items={incomeItems} maxValue={35} color="#059669" />
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">By Education</h3>
              <BarChart items={eduItems} maxValue={35} color="#d97706" />
            </div>
          </div>
        </section>

        {/* Metro vs Non-Metro */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Metro vs. Non-Metro</h2>
          <p className="text-sm text-gray-500 mb-6">AI adoption rates across major metro areas and non-metro regions</p>
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
          <BarChart items={metroItems} maxValue={35} color="#0891b2" />
        </section>

        {/* Regional AI Adoption Rankings */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Regional AI Adoption Rankings</h2>
          <p className="text-sm text-gray-500 mb-6">AI usage rates across 9 Census divisions</p>
          <BarChart items={regionItems} maxValue={40} color="#2563eb" />
        </section>

        {/* Cross-links */}
        <section className="bg-gray-50 rounded-xl p-8 print:hidden">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related Resources</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <a href="https://theailobby.com" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:shadow-sm transition-all">
              <div className="font-medium text-gray-900">See who is lobbying to regulate AI &rarr;</div>
              <div className="text-sm text-gray-500">theailobby.com</div>
            </a>
            <a href="https://aiexposure.org" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:shadow-sm transition-all">
              <div className="font-medium text-gray-900">See which jobs are most at risk &rarr;</div>
              <div className="text-sm text-gray-500">aiexposure.org</div>
            </a>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/articles/ai-adoption-census-2026" className="text-[--primary] hover:underline text-sm font-medium">Read: 1 in 4 Americans Now Use AI &rarr;</Link>
            <Link href="/compare" className="text-[--primary] hover:underline text-sm font-medium">Compare Regions &rarr;</Link>
            <Link href="/downloads" className="text-[--primary] hover:underline text-sm font-medium">Download the Data &rarr;</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
