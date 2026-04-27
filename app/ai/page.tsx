import fs from 'fs';
import path from 'path';
import BarChart from '../components/BarChart';
import StatCard from '../components/StatCard';

interface AiStats {
  usage: { percentages: Record<string, number> };
  tools: Record<string, { weighted: number; n: number }>;
  purposes: Record<string, { weighted: number; n: number }>;
  concerns: Record<string, { weighted: number; n: number }>;
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

function topByN(data: Record<string, { weighted: number; n: number }>, limit: number) {
  return Object.entries(data)
    .filter(([k]) => k !== 'Other' && k !== 'None')
    .sort((a, b) => b[1].n - a[1].n)
    .slice(0, limit)
    .map(([label, { n }]) => ({ label, value: n }));
}

export default function AIPage() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/ai-stats.json'), 'utf-8');
  const data: AiStats = JSON.parse(raw);

  const usagePct = data.usage.percentages['1'];

  // Age data sorted by age group
  const ageOrder = ['18-24', '25-39', '40-54', '55-64', '65+'];
  const ageItems = ageOrder.map((age) => ({
    label: age,
    value: data.byAge[age]?.usedAI ?? 0,
  }));

  // Income data sorted
  const incomeOrder = ['Under $25K', '$25K-$35K', '$35K-$50K', '$50K-$75K', '$75K-$100K', '$100K-$150K', '$150K+'];
  const incomeItems = incomeOrder.map((inc) => ({
    label: inc,
    value: data.byIncome[inc]?.usedAI ?? 0,
  }));

  // Education data sorted
  const eduOrder = ['Less than HS', 'Some HS', 'HS diploma/GED', 'Some college', 'Associate degree', "Bachelor's", 'Graduate degree'];
  const eduItems = eduOrder.map((edu) => ({
    label: edu,
    value: data.byEducation[edu]?.usedAI ?? 0,
  }));

  // Metro data
  const metroItems = Object.entries(data.byMetro)
    .sort((a, b) => b[1].usedAI - a[1].usedAI)
    .map(([code, { usedAI }]) => ({
      label: metroNames[code] ?? code,
      value: usedAI,
    }));

  // Tools (by respondent count, excluding Other/None)
  const toolItems = topByN(data.tools, 7);
  const maxToolN = Math.max(...toolItems.map((t) => t.value));

  // Purposes
  const purposeItems = topByN(data.purposes, 8);
  const maxPurposeN = Math.max(...purposeItems.map((p) => p.value));

  // Concerns
  const concernItems = topByN(data.concerns, 8);
  const maxConcernN = Math.max(...concernItems.map((c) => c.value));

  // Regional
  const regionItems = Object.entries(data.byRegion)
    .sort((a, b) => b[1].aiUsage - a[1].aiUsage)
    .map(([name, { aiUsage }]) => ({ label: name, value: aiUsage }));

  return (
    <div>
      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-block bg-[--primary-light] text-[--primary] px-3 py-1 rounded-full text-sm font-medium mb-4">
            Flagship Analysis
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            1 in 4 Americans Now Use AI
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {usagePct}% of Americans report using artificial intelligence tools,
            according to the latest Census HTOPS pulse survey.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard value={`${usagePct}%`} label="Used AI" color="#2563eb" />
          <StatCard value={`${data.usage.percentages['2']}%`} label="Did Not Use" color="#6b7280" />
          <StatCard value={`${data.usage.percentages['3']}%`} label="Not Sure" color="#d97706" />
          <StatCard value="7,451" label="Survey Respondents" color="#059669" />
        </div>

        {/* AI by Age */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">AI Usage by Age Group</h2>
          <BarChart items={ageItems} maxValue={35} color="#2563eb" />
        </section>

        {/* Tools & Purposes */}
        <div className="grid lg:grid-cols-2 gap-6">
          <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">How People Use AI</h2>
            <BarChart
              items={toolItems.map((t) => ({
                ...t,
                displayValue: `n=${t.value.toLocaleString()}`,
              }))}
              maxValue={maxToolN}
              color="#4f46e5"
            />
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">AI Purposes</h2>
            <BarChart
              items={purposeItems.map((p) => ({
                ...p,
                displayValue: `n=${p.value.toLocaleString()}`,
              }))}
              maxValue={maxPurposeN}
              color="#7c3aed"
            />
          </section>
        </div>

        {/* Concerns */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">AI Concerns</h2>
          <BarChart
            items={concernItems.map((c) => ({
              ...c,
              displayValue: `n=${c.value.toLocaleString()}`,
            }))}
            maxValue={maxConcernN}
            color="#dc2626"
          />
        </section>

        {/* By Income */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">AI Usage by Income</h2>
          <BarChart items={incomeItems} maxValue={35} color="#059669" />
        </section>

        {/* By Education */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">AI Usage by Education</h2>
          <BarChart items={eduItems} maxValue={35} color="#d97706" />
        </section>

        {/* By Metro */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">AI Usage by Metro Area</h2>
          <BarChart items={metroItems} maxValue={35} color="#0891b2" />
        </section>

        {/* By Region */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Regional AI Adoption</h2>
          <BarChart items={regionItems} maxValue={40} color="#2563eb" />
        </section>
      </div>
    </div>
  );
}
