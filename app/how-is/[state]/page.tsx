import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import type { Metadata } from 'next';

interface StateEntry {
  name: string;
  abbreviation: string;
  slug: string;
  division: string;
  aiUsage: number;
  foodInsufficient: number;
  expenseDifficult: number;
  employed: number;
  uninsured: number;
  rentBehind: number;
  sampleSize: number;
}

interface StatesData {
  national: Record<string, number>;
  states: Record<string, StateEntry>;
}

interface AcsProfile {
  name: string;
  fips: string;
  medianIncome: number | null;
  medianRent: number | null;
  medianHomeValue: number | null;
  medianAge: number | null;
  povertyRate: number | null;
  bachelorsOrHigher: number | null;
  unemploymentRate: number | null;
}

interface CdcState {
  name: string;
  measures: Record<string, number | null>;
  healthScore: number;
}

function getData(): StatesData {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/states-data.json'), 'utf-8');
  return JSON.parse(raw);
}

function getAcsData(): Record<string, AcsProfile> {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/acs-state-profiles.json'), 'utf-8');
  return JSON.parse(raw).states;
}

function getCdcData(): Record<string, CdcState> {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/cdc-places.json'), 'utf-8');
  return JSON.parse(raw).states;
}

function findStateBySlug(slug: string): { data: StatesData; state: StateEntry } | null {
  const data = getData();
  // The how-is route uses "state" param but states-data.json is keyed by slug
  const state = data.states[slug];
  if (!state) return null;
  return { data, state };
}

export async function generateStaticParams() {
  const data = getData();
  return Object.keys(data.states).map((slug) => ({ state: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state: slug } = await params;
  const result = findStateBySlug(slug);
  if (!result) return { title: 'State Not Found' };
  const { state } = result;
  return {
    title: `How Is ${state.name} Doing? 2026 Data | American Pulse`,
    description: `How is ${state.name} doing in 2026? AI usage, food security, housing, employment, and more from Census data.`,
  };
}

function pct(v: number | null | undefined): string {
  if (v == null || isNaN(v)) return 'N/A';
  return `${v}%`;
}

function dollar(v: number | null | undefined): string {
  if (v == null) return 'N/A';
  return `$${v.toLocaleString()}`;
}

type MetricDef = {
  key: string;
  label: string;
  value: number;
  national: number;
  inverse: boolean; // true = lower is better
};

function MetricCard({ m }: { m: MetricDef }) {
  const diff = m.value - m.national;
  const absDiff = Math.abs(diff);
  const near = absDiff < 0.5;

  // For AI Usage, treat as neutral
  const isNeutral = m.key === 'aiUsage';
  let colorClass = 'text-gray-600';
  let bgClass = 'bg-gray-50';
  let arrow = '';

  if (!near && !isNeutral) {
    const isGood = m.inverse ? diff < 0 : diff > 0;
    colorClass = isGood ? 'text-green-700' : 'text-red-700';
    bgClass = isGood ? 'bg-green-50' : 'bg-red-50';
    arrow = diff > 0 ? '▲' : '▼';
  } else {
    arrow = near ? '~' : (diff > 0 ? '▲' : '▼');
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="text-sm font-medium text-gray-500 mb-1">{m.label}</div>
      <div className="text-3xl font-bold text-gray-900 mb-3">{m.value}%</div>
      <div className="text-xs text-gray-500 mb-2">National avg: {m.national}%</div>
      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${bgClass} ${colorClass}`}>
        {arrow} {absDiff.toFixed(1)} pts
      </div>
    </div>
  );
}

function DemoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="text-sm font-medium text-gray-500 mb-1">{label}</div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
  );
}

function computeRankings(data: StatesData) {
  const allStates = Object.values(data.states);
  const metrics: { key: keyof StateEntry; label: string; inverse: boolean }[] = [
    { key: 'aiUsage', label: 'AI Usage', inverse: false },
    { key: 'foodInsufficient', label: 'Food Insecurity', inverse: true },
    { key: 'expenseDifficult', label: 'Expense Difficulty', inverse: true },
    { key: 'employed', label: 'Employment', inverse: false },
    { key: 'uninsured', label: 'Uninsured', inverse: true },
    { key: 'rentBehind', label: 'Rent Behind', inverse: true },
  ];

  const rankings: Record<string, Record<string, number>> = {};

  for (const m of metrics) {
    const sorted = [...allStates].sort((a, b) => {
      const aVal = a[m.key] as number;
      const bVal = b[m.key] as number;
      // Rank 1 = best. For inverse metrics, lower is better. For normal, higher is better.
      return m.inverse ? aVal - bVal : bVal - aVal;
    });
    sorted.forEach((s, i) => {
      if (!rankings[s.slug]) rankings[s.slug] = {};
      rankings[s.slug][m.key as string] = i + 1;
    });
  }

  return { rankings, metrics };
}

export default async function HowIsStatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state: slug } = await params;
  const result = findStateBySlug(slug);

  if (!result) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">State not found</h1>
        <Link href="/states" className="text-[--primary] hover:underline mt-4 inline-block">Back to States</Link>
      </div>
    );
  }

  const { data, state } = result;
  const nat = data.national;
  const acsStates = getAcsData();
  const cdcStates = getCdcData();
  const acs = acsStates[state.abbreviation];
  const cdc = cdcStates[state.abbreviation];

  const aboveBelow = (val: number, natVal: number) => val > natVal ? 'above' : val < natVal ? 'below' : 'at';

  const metrics: MetricDef[] = [
    { key: 'aiUsage', label: 'AI Usage', value: state.aiUsage, national: nat.aiUsage, inverse: false },
    { key: 'foodInsufficient', label: 'Food Insecurity', value: state.foodInsufficient, national: nat.foodInsufficient, inverse: true },
    { key: 'expenseDifficult', label: 'Expense Difficulty', value: state.expenseDifficult, national: nat.expenseDifficult, inverse: true },
    { key: 'employed', label: 'Employment Rate', value: state.employed, national: nat.employed, inverse: false },
    { key: 'uninsured', label: 'Uninsured Rate', value: state.uninsured, national: nat.uninsured, inverse: true },
    { key: 'rentBehind', label: 'Rent Behind', value: state.rentBehind, national: nat.rentBehind, inverse: true },
  ];

  const { rankings, metrics: rankMetrics } = computeRankings(data);
  const stateRankings = rankings[state.slug] || {};

  // FAQ JSON-LD
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the AI usage rate in ${state.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${state.name} has an AI usage rate of ${state.aiUsage}%, which is ${aboveBelow(state.aiUsage, nat.aiUsage)} the national average of ${nat.aiUsage}%.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the food insecurity rate in ${state.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${state.foodInsufficient}% of households in ${state.name} report food insufficiency, compared to the national average of ${nat.foodInsufficient}%.`,
        },
      },
      {
        '@type': 'Question',
        name: `What percentage of ${state.name} residents are uninsured?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${state.uninsured}% of ${state.name} residents are uninsured, compared to the national average of ${nat.uninsured}%.`,
        },
      },
      {
        '@type': 'Question',
        name: `How does ${state.name} compare to the national average?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${state.name} has ${state.aiUsage}% AI usage (national: ${nat.aiUsage}%), ${state.foodInsufficient}% food insecurity (national: ${nat.foodInsufficient}%), ${state.employed}% employment (national: ${nat.employed}%), and ${state.uninsured}% uninsured (national: ${nat.uninsured}%).`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the median income in ${state.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: acs ? `The median household income in ${state.name} is ${dollar(acs.medianIncome)}, with a poverty rate of ${pct(acs.povertyRate)} and a median home value of ${dollar(acs.medianHomeValue)}.` : `Median income data is not available for ${state.name}.`,
        },
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link href="/states" className="text-[--primary] hover:underline text-sm mb-4 inline-block print:hidden">
            &larr; All States
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            How Is {state.name} Doing? 2026 Data
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            {state.name} has {state.aiUsage}% AI usage ({aboveBelow(state.aiUsage, nat.aiUsage)} the {nat.aiUsage}% national average), {state.foodInsufficient}% food insecurity, and a {state.uninsured}% uninsured rate.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Metrics Grid */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Census Pulse Metrics</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {metrics.map((m) => (
              <MetricCard key={m.key} m={m} />
            ))}
          </div>
        </section>

        {/* ACS Demographics */}
        {acs && (
          <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Demographics (ACS)</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <DemoCard label="Median Income" value={dollar(acs.medianIncome)} />
              <DemoCard label="Median Rent" value={dollar(acs.medianRent)} />
              <DemoCard label="Home Value" value={dollar(acs.medianHomeValue)} />
              <DemoCard label="Poverty Rate" value={pct(acs.povertyRate)} />
              <DemoCard label="Bachelor's+" value={pct(acs.bachelorsOrHigher)} />
              <DemoCard label="Unemployment" value={pct(acs.unemploymentRate)} />
            </div>
          </section>
        )}

        {/* Health */}
        {cdc && (
          <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Health Indicators (CDC)</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              <DemoCard label="Obesity" value={pct(cdc.measures.obesity)} />
              <DemoCard label="Diabetes" value={pct(cdc.measures.diabetes)} />
              <DemoCard label="Mental Health" value={pct(cdc.measures.mentalHealth)} />
              <DemoCard label="Physical Inactivity" value={pct(cdc.measures.physicalInactivity)} />
              <DemoCard label="Health Score" value={`${cdc.healthScore}/100`} />
            </div>
          </section>
        )}

        {/* Rankings */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">State Rankings (out of 51)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {rankMetrics.map((m) => {
              const rank = stateRankings[m.key as string] || '-';
              return (
                <div key={m.key as string} className="bg-white rounded-xl border border-gray-200 p-5 text-center">
                  <div className="text-sm font-medium text-gray-500 mb-1">{m.label}</div>
                  <div className="text-3xl font-bold text-gray-900">#{String(rank)}</div>
                  <div className="text-xs text-gray-400 mt-1">of 51</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Back link */}
        <div className="print:hidden">
          <Link href="/states" className="inline-flex items-center gap-2 bg-blue-50 rounded-xl px-6 py-3 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors">
            &larr; View All States
          </Link>
        </div>
      </div>
    </div>
  );
}
