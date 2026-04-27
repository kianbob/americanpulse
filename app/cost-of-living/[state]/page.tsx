import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import StatCard from '../../components/StatCard';
import BarChart from '../../components/BarChart';
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

interface HousingData {
  meta: { nationalMedianRent: number; nationalCostBurdenedPct: number };
  states: Record<string, { medianRent: number; costBurdenedPct: number }>;
}

interface UnemploymentData {
  meta: { nationalAverage: number };
  states: Record<string, { rate: number }>;
}

function getStatesData(): StatesData {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/states-data.json'), 'utf-8');
  return JSON.parse(raw);
}

function getHousingData(): HousingData | null {
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/fred-housing.json'), 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function getUnemploymentData(): UnemploymentData | null {
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/bls-unemployment.json'), 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const data = getStatesData();
  return Object.keys(data.states).map((state) => ({ state }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state: slug } = await params;
  const data = getStatesData();
  const state = data.states[slug];
  if (!state) return { title: 'State Not Found' };
  return {
    title: `Cost of Living in ${state.name} 2026`,
    description: `Cost of living data for ${state.name}: ${state.expenseDifficult}% find expenses difficult, ${state.rentBehind}% behind on rent, ${state.uninsured}% uninsured. Compare ${state.name} to national averages with Census HTOPS data.`,
    openGraph: {
      title: `Cost of Living in ${state.name} 2026 | American Pulse`,
      description: `${state.expenseDifficult}% of ${state.name} residents find expenses difficult. See how ${state.name} compares to the national average.`,
    },
  };
}

function pct(v: number | null | undefined): string {
  if (v == null || isNaN(v)) return 'N/A';
  return `${v}%`;
}

function buildFaqs(state: StateEntry, nat: Record<string, number>, housing: HousingData | null) {
  const abbr = state.abbreviation;
  const rentInfo = housing?.states?.[abbr];
  const avgRent = rentInfo ? `$${rentInfo.medianRent.toLocaleString()}` : 'not available in supplemental data';

  return [
    {
      '@type': 'Question' as const,
      name: `What is the cost of living in ${state.name}?`,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: `According to Census HTOPS data, ${state.expenseDifficult}% of ${state.name} residents report difficulty with expenses (national average: ${nat.expenseDifficult}%). The median rent is ${avgRent}.`,
      },
    },
    {
      '@type': 'Question' as const,
      name: `Is ${state.name} affordable?`,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: `${state.expenseDifficult}% of residents find expenses difficult, ${state.expenseDifficult > nat.expenseDifficult ? 'above' : 'below'} the national average of ${nat.expenseDifficult}%. ${state.rentBehind}% of renters are behind on payments.`,
      },
    },
    {
      '@type': 'Question' as const,
      name: `What is the average rent in ${state.name}?`,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: `The median rent in ${state.name} is ${avgRent} according to Census ACS data via FRED. ${rentInfo ? `${rentInfo.costBurdenedPct}% of renters are cost-burdened (spending 30%+ of income on rent).` : ''}`,
      },
    },
    {
      '@type': 'Question' as const,
      name: `What percentage of people are behind on rent in ${state.name}?`,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: `${state.rentBehind}% of renters in ${state.name} are behind on rent payments, compared to the national average of ${nat.rentBehind}%.`,
      },
    },
    {
      '@type': 'Question' as const,
      name: `How does ${state.name} compare to the national average?`,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: `${state.name} has ${state.expenseDifficult}% expense difficulty (national: ${nat.expenseDifficult}%), ${state.uninsured}% uninsured (national: ${nat.uninsured}%), ${state.employed}% employed (national: ${nat.employed}%), and ${state.aiUsage}% AI usage (national: ${nat.aiUsage}%).`,
      },
    },
  ];
}

export default async function CostOfLivingPage({ params }: { params: Promise<{ state: string }> }) {
  const { state: slug } = await params;
  const data = getStatesData();
  const state = data.states[slug];

  if (!state) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">State not found</h1>
        <Link href="/states" className="text-[--primary] hover:underline mt-4 inline-block">Back to States</Link>
      </div>
    );
  }

  const nat = data.national;
  const housing = getHousingData();
  const unemployment = getUnemploymentData();

  const abbr = state.abbreviation;
  const rentInfo = housing?.states?.[abbr];
  const unemploymentRate = unemployment?.states?.[abbr]?.rate;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: buildFaqs(state, nat, housing),
  };

  const comparisonItems = [
    { label: 'Expense Difficulty', state: state.expenseDifficult, national: nat.expenseDifficult, color: '#0891b2', inverse: true },
    { label: 'Rent Behind', state: state.rentBehind, national: nat.rentBehind, color: '#dc2626', inverse: true },
    { label: 'Uninsured', state: state.uninsured, national: nat.uninsured, color: '#7c3aed', inverse: true },
    { label: 'Employed', state: state.employed, national: nat.employed, color: '#059669', inverse: false },
    { label: 'AI Usage', state: state.aiUsage, national: nat.aiUsage, color: '#2563eb', inverse: false },
  ];

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link href="/states" className="text-[--primary] hover:underline text-sm mb-4 inline-block">
            &larr; All States
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
            Cost of Living in {state.name}
          </h1>
          <p className="text-lg text-gray-600">
            2026 Census HTOPS data on expenses, housing, employment, and more in {state.name} ({state.abbreviation}).
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Key Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard value={pct(state.expenseDifficult)} label="Expense Difficulty" color="#0891b2" />
          <StatCard value={pct(state.rentBehind)} label="Behind on Rent" color="#dc2626" />
          <StatCard value={pct(state.uninsured)} label="Uninsured" color="#7c3aed" />
          <StatCard value={pct(state.employed)} label="Employed" color="#059669" />
          <StatCard value={pct(state.aiUsage)} label="AI Usage" color="#2563eb" />
        </div>

        {/* Supplemental Data */}
        {(rentInfo || unemploymentRate != null) && (
          <div className="grid sm:grid-cols-3 gap-4">
            {rentInfo && (
              <>
                <StatCard value={`$${rentInfo.medianRent.toLocaleString()}`} label="Median Rent" color="#dc2626" />
                <StatCard value={`${rentInfo.costBurdenedPct}%`} label="Cost-Burdened Renters" color="#f59e0b" />
              </>
            )}
            {unemploymentRate != null && (
              <StatCard value={`${unemploymentRate}%`} label="Unemployment Rate" color="#6b7280" />
            )}
          </div>
        )}

        {/* Comparison to National Average */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{state.name} vs. National Average</h2>
          <div className="space-y-6">
            {comparisonItems.map((item) => {
              const maxVal = Math.max(item.state, item.national, 1);
              const diff = item.state - item.national;
              const isWorse = item.inverse ? diff > 0 : diff < 0;
              const near = Math.abs(diff) < 0.5;
              return (
                <div key={item.label}>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="font-medium text-gray-900">{item.label}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${near ? 'bg-gray-100 text-gray-700' : isWorse ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {near ? '~ average' : `${Math.abs(diff).toFixed(1)} pts ${isWorse ? 'worse' : 'better'}`}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-20">{state.abbreviation}: {item.state}%</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-3">
                        <div className="h-3 rounded-full" style={{ width: `${(item.state / maxVal) * 100}%`, backgroundColor: item.color }} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-20">US: {item.national}%</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-3">
                        <div className="h-3 rounded-full opacity-50" style={{ width: `${(item.national / maxVal) * 100}%`, backgroundColor: item.color }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Cost of Living Overview */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Cost of Living Overview</h2>
          <BarChart
            items={[
              { label: 'Expense Difficulty', value: state.expenseDifficult },
              { label: 'Behind on Rent', value: state.rentBehind },
              { label: 'Uninsured', value: state.uninsured },
              { label: 'Employed', value: state.employed },
              { label: 'AI Usage', value: state.aiUsage },
            ]}
            color="#0891b2"
          />
        </section>

        {/* Data note */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-amber-800 mb-1">About This Data</h3>
          <p className="text-sm text-amber-700">
            Census HTOPS data is reported at the Census Division level. Metrics for {state.name} reflect the {state.division} division.
            Supplemental rent and unemployment data come from the American Community Survey (via FRED) and Bureau of Labor Statistics respectively.
          </p>
        </div>

        {/* Cross-links */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Link href={`/states/${state.slug}`} className="block bg-blue-50 rounded-xl p-4 text-center hover:bg-blue-100 transition-colors">
            <div className="text-sm font-medium text-blue-700">Full {state.name} Profile &rarr;</div>
          </Link>
          <Link href={`/is-it-affordable/${state.slug}`} className="block bg-purple-50 rounded-xl p-4 text-center hover:bg-purple-100 transition-colors">
            <div className="text-sm font-medium text-purple-700">Is {state.name} Affordable? &rarr;</div>
          </Link>
          <Link href="/compare" className="block bg-green-50 rounded-xl p-4 text-center hover:bg-green-100 transition-colors">
            <div className="text-sm font-medium text-green-700">Compare States &rarr;</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
