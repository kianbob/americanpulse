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

export async function generateStaticParams() {
  const data = getData();
  return Object.keys(data.states).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getData();
  const state = data.states[slug];
  if (!state) return { title: 'State Not Found' };
  return {
    title: `${state.name} — Census Pulse Data`,
    description: `${state.name} Census HTOPS data: ${state.aiUsage}% AI usage, ${state.foodInsufficient}% food insecure, ${state.employed}% employed, ${state.uninsured}% uninsured, ${state.rentBehind}% behind on rent.`,
  };
}

function pct(v: number | null): string {
  if (v == null || isNaN(v)) return 'N/A';
  return `${v}%`;
}

function ComparisonBadge({ value, national, label, inverse }: { value: number; national: number; label: string; inverse?: boolean }) {
  const diff = value - national;
  const isGood = inverse ? diff < 0 : diff > 0;
  const absDiff = Math.abs(diff);
  const near = absDiff < 0.5;

  let bgColor = 'bg-gray-100 text-gray-700';
  let icon = '~';
  if (!near) {
    bgColor = isGood ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    icon = diff > 0 ? '▲' : '▼';
  }

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>
      {icon} {absDiff.toFixed(1)} pts {near ? 'near' : isGood ? 'better' : 'worse'} than avg
    </div>
  );
}

export default async function StateDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getData();
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
  const acsStates = getAcsData();
  const cdcStates = getCdcData();
  const acs = acsStates[state.abbreviation];
  const cdc = cdcStates[state.abbreviation];

  // Get sibling states in same division
  const siblings = Object.values(data.states)
    .filter((s) => s.division === state.division && s.slug !== state.slug)
    .sort((a, b) => a.name.localeCompare(b.name));

  const metrics = [
    { key: 'aiUsage', label: 'AI Usage', value: state.aiUsage, national: nat.aiUsage, color: '#2563eb', inverse: false, desc: 'Households using AI tools in the last 2 months' },
    { key: 'foodInsufficient', label: 'Food Insecure', value: state.foodInsufficient, national: nat.foodInsufficient, color: '#d97706', inverse: true, desc: 'Households sometimes or often not having enough to eat' },
    { key: 'employed', label: 'Employed', value: state.employed, national: nat.employed, color: '#059669', inverse: false, desc: 'Respondents employed in the last 7 days' },
    { key: 'uninsured', label: 'Uninsured', value: state.uninsured, national: nat.uninsured, color: '#7c3aed', inverse: true, desc: 'Respondents without health insurance' },
    { key: 'rentBehind', label: 'Rent Behind', value: state.rentBehind, national: nat.rentBehind, color: '#dc2626', inverse: true, desc: 'Renters behind on payments' },
    { key: 'expenseDifficult', label: 'Expense Difficulty', value: state.expenseDifficult, national: nat.expenseDifficult, color: '#0891b2', inverse: true, desc: 'Households finding expenses difficult' },
  ];

  // Build division comparison chart data
  const divisionStates = Object.values(data.states)
    .filter((s) => s.division === state.division)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link href="/states" className="text-[--primary] hover:underline text-sm mb-4 inline-block print:hidden">
            &larr; All States
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">{state.name}</h1>
          <p className="text-lg text-gray-600">
            {state.abbreviation} &middot; {state.division} Division &middot; Division sample: {state.sampleSize.toLocaleString()}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Key Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard value={pct(state.aiUsage)} label="AI Usage" color="#2563eb" />
          <StatCard value={pct(state.foodInsufficient)} label="Food Insecure" color="#d97706" />
          <StatCard value={pct(state.employed)} label="Employed" color="#059669" />
          <StatCard value={pct(state.uninsured)} label="Uninsured" color="#7c3aed" />
          <StatCard value={pct(state.rentBehind)} label="Rent Behind" color="#dc2626" />
          <StatCard value={pct(state.expenseDifficult)} label="Expense Difficulty" color="#0891b2" />
        </div>

        {/* Compared to National Average */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Compared to National Average</h2>
          <div className="space-y-6">
            {metrics.map((m) => {
              const maxVal = Math.max(m.value, m.national, 1);
              return (
                <div key={m.key}>
                  <div className="flex flex-wrap justify-between items-center text-sm mb-1 gap-2">
                    <div>
                      <span className="font-medium text-gray-900">{m.label}</span>
                      <span className="text-gray-500 text-xs ml-2">{m.desc}</span>
                    </div>
                    <ComparisonBadge value={m.value} national={m.national} label={m.label} inverse={m.inverse} />
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-1">{state.name}: {m.value}%</div>
                      <div className="w-full bg-gray-100 rounded-full h-3">
                        <div className="h-3 rounded-full" style={{ width: `${Math.min((m.value / maxVal) * 100, 100)}%`, backgroundColor: m.color }} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-1">National: {m.national}%</div>
                      <div className="w-full bg-gray-100 rounded-full h-3">
                        <div className="h-3 rounded-full opacity-50" style={{ width: `${Math.min((m.national / maxVal) * 100, 100)}%`, backgroundColor: m.color }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Division context */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{state.division} Division</h2>
          <p className="text-sm text-gray-500 mb-6">
            {state.name} is part of the {state.division} Census Division. All states in this division share the same HTOPS survey metrics.
          </p>
          <BarChart
            items={[
              { label: 'AI Usage', value: state.aiUsage },
              { label: 'Food Insecure', value: state.foodInsufficient },
              { label: 'Employed', value: state.employed },
              { label: 'Uninsured', value: state.uninsured },
              { label: 'Rent Behind', value: state.rentBehind },
            ]}
            color="#2563eb"
          />
        </section>

        {/* Other states in division */}
        {siblings.length > 0 && (
          <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Other States in {state.division}</h2>
            <div className="flex flex-wrap gap-2">
              {siblings.map((s) => (
                <Link
                  key={s.slug}
                  href={`/states/${s.slug}`}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-[--primary-light] hover:text-[--primary] rounded-full text-sm font-medium text-gray-700 transition-colors"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ACS Demographics */}
        {acs && (
          <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Demographics &amp; Economics</h2>
            <p className="text-sm text-gray-500 mb-6">From the 2023 American Community Survey 1-Year Estimates.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {acs.medianIncome != null && (
                <div className="text-center bg-gray-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-gray-900">${acs.medianIncome.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Median Income</div>
                </div>
              )}
              {acs.medianRent != null && (
                <div className="text-center bg-gray-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-gray-900">${acs.medianRent.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Median Rent</div>
                </div>
              )}
              {acs.medianHomeValue != null && (
                <div className="text-center bg-gray-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-gray-900">${acs.medianHomeValue.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Median Home Value</div>
                </div>
              )}
              {acs.medianAge != null && (
                <div className="text-center bg-gray-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-gray-900">{acs.medianAge}</div>
                  <div className="text-xs text-gray-500">Median Age</div>
                </div>
              )}
              {acs.povertyRate != null && (
                <div className="text-center bg-gray-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-gray-900">{acs.povertyRate}%</div>
                  <div className="text-xs text-gray-500">Poverty Rate</div>
                </div>
              )}
              {acs.bachelorsOrHigher != null && (
                <div className="text-center bg-gray-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-gray-900">{acs.bachelorsOrHigher}%</div>
                  <div className="text-xs text-gray-500">Bachelor&apos;s+</div>
                </div>
              )}
              {acs.unemploymentRate != null && (
                <div className="text-center bg-gray-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-gray-900">{acs.unemploymentRate}%</div>
                  <div className="text-xs text-gray-500">Unemployment</div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* CDC Health Data */}
        {cdc && (
          <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Health Profile</h2>
            <p className="text-sm text-gray-500 mb-4">
              CDC PLACES health indicators. Health Score: <strong className="text-gray-900">{cdc.healthScore}</strong>/100.
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
              {cdc.measures.obesity != null && (
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{cdc.measures.obesity}%</div>
                  <div className="text-xs text-gray-500">Obesity</div>
                </div>
              )}
              {cdc.measures.diabetes != null && (
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{cdc.measures.diabetes}%</div>
                  <div className="text-xs text-gray-500">Diabetes</div>
                </div>
              )}
              {cdc.measures.mentalHealth != null && (
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{cdc.measures.mentalHealth}%</div>
                  <div className="text-xs text-gray-500">Depression</div>
                </div>
              )}
              {cdc.measures.smoking != null && (
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{cdc.measures.smoking}%</div>
                  <div className="text-xs text-gray-500">Smoking</div>
                </div>
              )}
              {cdc.measures.physicalInactivity != null && (
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{cdc.measures.physicalInactivity}%</div>
                  <div className="text-xs text-gray-500">Inactivity</div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Data note */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-amber-800 mb-1">About This Data</h3>
          <p className="text-sm text-amber-700">
            The Census Bureau&apos;s Household Topics (HTOPS) public-use file reports data at the Census Division level,
            not individual states. The metrics shown for {state.name} reflect the {state.division} division aggregate.
            This includes {divisionStates.map((s) => s.abbreviation).join(', ')}.
            {acs ? ' Demographics come from the 2023 ACS 1-Year Estimates (state-specific).' : ''}
            {cdc ? ' Health data comes from CDC PLACES 2024 (state-specific).' : ''}
          </p>
        </div>

        {/* Cross-links */}
        <div className="grid sm:grid-cols-3 gap-4 print:hidden">
          <Link href={`/regions/${state.division.toLowerCase().replace(/\s+/g, '-')}`} className="block bg-blue-50 rounded-xl p-4 text-center hover:bg-blue-100 transition-colors">
            <div className="text-sm font-medium text-blue-700">View {state.division} Region &rarr;</div>
          </Link>
          <Link href="/states" className="block bg-purple-50 rounded-xl p-4 text-center hover:bg-purple-100 transition-colors">
            <div className="text-sm font-medium text-purple-700">All States &rarr;</div>
          </Link>
          <Link href="/compare" className="block bg-green-50 rounded-xl p-4 text-center hover:bg-green-100 transition-colors">
            <div className="text-sm font-medium text-green-700">Compare Metrics &rarr;</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
