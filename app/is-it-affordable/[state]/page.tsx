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
  const verdict = state.expenseDifficult > data.national.expenseDifficult ? 'more expensive than average' : 'less expensive than average';
  return {
    title: `Is ${state.name} Affordable? What the Data Says`,
    description: `Is ${state.name} affordable? ${state.expenseDifficult}% find expenses difficult (${verdict}). ${state.rentBehind}% behind on rent, ${state.uninsured}% uninsured. Real Census data on affordability in ${state.name}.`,
    openGraph: {
      title: `Is ${state.name} Affordable? What the Data Says | American Pulse`,
      description: `${state.expenseDifficult}% of ${state.name} residents find expenses difficult. Here's what the data says about affordability.`,
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
  const verdict = state.expenseDifficult > nat.expenseDifficult ? 'above' : 'below';

  return [
    {
      '@type': 'Question' as const,
      name: `Is it affordable to live in ${state.name}?`,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: `${state.expenseDifficult}% of ${state.name} residents report difficulty with expenses, which is ${verdict} the national average of ${nat.expenseDifficult}%. ${rentInfo ? `The median rent is $${rentInfo.medianRent.toLocaleString()}.` : ''}`,
      },
    },
    {
      '@type': 'Question' as const,
      name: `What percentage of people struggle with expenses in ${state.name}?`,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: `${state.expenseDifficult}% of ${state.name} residents report that their household expenses are somewhat or very difficult to handle, according to Census HTOPS data.`,
      },
    },
    {
      '@type': 'Question' as const,
      name: `Is ${state.name} more expensive than average?`,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: `${state.name}'s expense difficulty rate is ${state.expenseDifficult}% compared to the national average of ${nat.expenseDifficult}%, making it ${verdict} average. ${rentInfo ? `Median rent is $${rentInfo.medianRent.toLocaleString()} vs. the national median of $${housing?.meta?.nationalMedianRent?.toLocaleString()}.` : ''}`,
      },
    },
    {
      '@type': 'Question' as const,
      name: `What is the unemployment rate in ${state.name}?`,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: `${state.employed}% of ${state.name} respondents report being employed (national: ${nat.employed}%). ${state.uninsured}% are uninsured, which affects financial security.`,
      },
    },
    {
      '@type': 'Question' as const,
      name: `How many people in ${state.name} are behind on rent?`,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: `${state.rentBehind}% of renters in ${state.name} report being behind on rent payments, compared to the national average of ${nat.rentBehind}%.`,
      },
    },
  ];
}

export default async function IsItAffordablePage({ params }: { params: Promise<{ state: string }> }) {
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

  const verdict = state.expenseDifficult > nat.expenseDifficult ? 'more expensive' : 'less expensive';
  const rentVerdict = state.rentBehind > nat.rentBehind ? 'higher' : 'lower';

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: buildFaqs(state, nat, housing),
  };

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
            Is {state.name} Affordable?
          </h1>
          <p className="text-lg text-gray-600">
            What the data says about the cost of living in {state.name} — and how it compares.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* The Verdict */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">The Bottom Line</h2>
          <p className="text-gray-700 leading-relaxed">
            {state.name} is <strong>{verdict}</strong> than the national average when it comes to day-to-day
            expenses. <strong>{state.expenseDifficult}%</strong> of residents say their household expenses are
            difficult to handle, compared to <strong>{nat.expenseDifficult}%</strong> nationally.
            {state.rentBehind > 0 && (
              <> Meanwhile, <strong>{state.rentBehind}%</strong> of renters are behind on payments — {rentVerdict} than the
              national rate of {nat.rentBehind}%.</>
            )}
            {rentInfo && (
              <> The median rent in {state.name} sits at <strong>${rentInfo.medianRent.toLocaleString()}/month</strong>.</>
            )}
          </p>
        </section>

        {/* Key Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard value={pct(state.expenseDifficult)} label="Expense Difficulty" color="#0891b2" />
          <StatCard value={pct(state.rentBehind)} label="Behind on Rent" color="#dc2626" />
          <StatCard value={pct(state.uninsured)} label="Uninsured" color="#7c3aed" />
          <StatCard value={pct(state.employed)} label="Employed" color="#059669" />
          <StatCard value={pct(state.aiUsage)} label="AI Usage" color="#2563eb" />
        </div>

        {/* Supplemental */}
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

        {/* Narrative Analysis */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What This Means for Residents</h2>
          <div className="prose prose-gray max-w-none space-y-4">
            <p className="text-gray-700">
              When we look at the full picture in {state.name}, affordability goes beyond just rent.
              With {state.uninsured}% of residents lacking health insurance
              {state.uninsured > nat.uninsured ? ` (above the ${nat.uninsured}% national average)` : ` (below the ${nat.uninsured}% national average)`},
              unexpected medical costs can tip the balance for many households.
            </p>
            <p className="text-gray-700">
              Employment tells part of the story too: {state.employed}% of respondents are currently employed,
              {state.employed >= nat.employed ? ' meeting or exceeding' : ' falling below'} the national rate
              of {nat.employed}%. But being employed doesn&apos;t necessarily mean comfortable —
              the {state.expenseDifficult}% expense difficulty rate suggests many working families still feel the squeeze.
            </p>
            <p className="text-gray-700">
              {state.aiUsage > nat.aiUsage
                ? `Interestingly, ${state.name} has higher-than-average AI adoption at ${state.aiUsage}%, which may reflect a tech-forward workforce seeking productivity gains in a challenging economic environment.`
                : `AI adoption in ${state.name} sits at ${state.aiUsage}%, slightly below the national average of ${nat.aiUsage}%.`}
            </p>
          </div>
        </section>

        {/* Visual Comparison */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{state.name} at a Glance</h2>
          <BarChart
            items={[
              { label: 'Expense Difficulty', value: state.expenseDifficult },
              { label: 'Behind on Rent', value: state.rentBehind },
              { label: 'Uninsured', value: state.uninsured },
              { label: 'Employed', value: state.employed },
              { label: 'Food Insecure', value: state.foodInsufficient },
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
          <Link href={`/cost-of-living/${state.slug}`} className="block bg-cyan-50 rounded-xl p-4 text-center hover:bg-cyan-100 transition-colors">
            <div className="text-sm font-medium text-cyan-700">Cost of Living in {state.name} &rarr;</div>
          </Link>
          <Link href="/compare" className="block bg-green-50 rounded-xl p-4 text-center hover:bg-green-100 transition-colors">
            <div className="text-sm font-medium text-green-700">Compare States &rarr;</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
