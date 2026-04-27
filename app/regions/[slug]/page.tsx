import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import StatCard from '../../components/StatCard';
import BarChart from '../../components/BarChart';
import type { Metadata } from 'next';

interface RegionMetrics {
  aiUsage: number | null;
  foodInsufficient: number | null;
  rentBehind: number | null;
  employed: number | null;
  uninsured: number | null;
  expenseDifficult: number | null;
}

interface RegionDetail {
  slug: string;
  states: string[];
  n: number;
  metrics: RegionMetrics;
  national: {
    aiUsage: number;
    foodInsufficient: number;
    rentBehind: number;
    mortgageBehind: number;
    employed: number;
    uninsured: number;
    expenseDifficulty: number;
  };
  nationalTopics: {
    food: { sufficiency: { percentages: Record<string, number> } };
    housing: {
      rentCurrent: { percentages: Record<string, number> };
      mortgageCurrent: { percentages: Record<string, number> };
    };
    employment: {
      workType: { percentages: Record<string, number> };
      telework: { percentages: Record<string, number> };
    };
  };
  allRegions: Record<string, RegionMetrics>;
}

function getDetails(): Record<string, RegionDetail> {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/region-details.json'), 'utf-8');
  return JSON.parse(raw);
}

function findBySlug(slug: string, details: Record<string, RegionDetail>): [string, RegionDetail] | null {
  for (const [name, data] of Object.entries(details)) {
    if (data.slug === slug) return [name, data];
  }
  return null;
}

export async function generateStaticParams() {
  const details = getDetails();
  return Object.values(details).map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const details = getDetails();
  const result = findBySlug(slug, details);
  if (!result) return { title: 'Region Not Found' };
  const [name, data] = result;
  return {
    title: `${name} — Regional Data | American Pulse`,
    description: `Census HTOPS data for ${name} (${data.states.join(', ')}): ${data.metrics.aiUsage ?? 0}% AI usage, ${data.metrics.employed ?? 0}% employed, ${data.metrics.foodInsufficient ?? 0}% food insecure.`,
  };
}

function pct(v: number | null | undefined): string {
  if (v == null || isNaN(v)) return 'N/A';
  return `${v}%`;
}

function diffStr(regional: number | null, national: number): string {
  if (regional == null) return '';
  const d = regional - national;
  return d > 0 ? `+${d.toFixed(1)}` : d.toFixed(1);
}

export default async function RegionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const details = getDetails();
  const result = findBySlug(slug, details);

  if (!result) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Region not found</h1>
        <Link href="/regions" className="text-[--primary] hover:underline mt-4 inline-block">
          Back to Regions
        </Link>
      </div>
    );
  }

  const [name, region] = result;
  const m = region.metrics;
  const nat = region.national;

  const comparisons = [
    { label: 'AI Usage', regional: m.aiUsage, national: nat.aiUsage, color: '#2563eb' },
    { label: 'Food Insecure', regional: m.foodInsufficient, national: nat.foodInsufficient, color: '#d97706' },
    { label: 'Employed', regional: m.employed, national: nat.employed, color: '#059669' },
    { label: 'Uninsured', regional: m.uninsured, national: nat.uninsured, color: '#7c3aed' },
    { label: 'Rent Behind', regional: m.rentBehind, national: nat.rentBehind, color: '#dc2626' },
    { label: 'Expense Difficulty', regional: m.expenseDifficult, national: nat.expenseDifficulty, color: '#0891b2' },
  ];

  const metricKeys: { key: keyof RegionMetrics; label: string; color: string }[] = [
    { key: 'aiUsage', label: 'AI Usage', color: '#2563eb' },
    { key: 'foodInsufficient', label: 'Food Insecure', color: '#d97706' },
    { key: 'employed', label: 'Employed', color: '#059669' },
    { key: 'rentBehind', label: 'Rent Behind', color: '#dc2626' },
    { key: 'uninsured', label: 'Uninsured', color: '#7c3aed' },
  ];

  const workTypeLabels: Record<string, string> = {
    '1': 'Self-employed', '2': 'Private wage/salary', '3': 'Government', '4': 'Other', '5': 'Unpaid family',
  };
  const teleworkLabels: Record<string, string> = {
    '1': 'Always remote', '2': 'Usually remote', '3': 'Sometimes remote', '4': 'Never remote',
  };
  const foodLabels: Record<string, string> = {
    '1': 'Enough food', '2': 'Enough, not always preferred', '3': 'Sometimes not enough', '4': 'Often not enough',
  };

  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link href="/regions" className="text-[--primary] hover:underline text-sm mb-4 inline-block print:hidden">
            &larr; All Regions
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">{name}</h1>
          <p className="text-lg text-gray-600">
            {region.states.join(', ')} &middot; Sample size: {region.n.toLocaleString()}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Key Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard value={pct(m.aiUsage)} label="AI Usage" color="#2563eb" />
          <StatCard value={pct(m.foodInsufficient)} label="Food Insecure" color="#d97706" />
          <StatCard value={pct(m.employed)} label="Employed" color="#059669" />
          <StatCard value={pct(m.uninsured)} label="Uninsured" color="#7c3aed" />
          <StatCard value={pct(m.rentBehind)} label="Rent Behind" color="#dc2626" />
          <StatCard value={pct(m.expenseDifficult)} label="Expense Difficulty" color="#0891b2" />
        </div>

        {/* Comparison to National */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Compared to National Average</h2>
          <div className="space-y-6">
            {comparisons.map((c) => {
              const maxVal = Math.max(c.regional ?? 0, c.national, 1);
              return (
                <div key={c.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-900">{c.label}</span>
                    <span className="text-gray-500">
                      {pct(c.regional)} vs {c.national}% national ({diffStr(c.regional, c.national)})
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-1">{name}</div>
                      <div className="w-full bg-gray-100 rounded-full h-3">
                        <div className="h-3 rounded-full" style={{ width: `${Math.min(((c.regional ?? 0) / maxVal) * 100, 100)}%`, backgroundColor: c.color }} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-1">National</div>
                      <div className="w-full bg-gray-100 rounded-full h-3">
                        <div className="h-3 rounded-full opacity-50" style={{ width: `${Math.min((c.national / maxVal) * 100, 100)}%`, backgroundColor: c.color }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* All Regions Ranking Charts */}
        {metricKeys.map((mk) => (
          <section key={mk.key} className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{mk.label} Across All Regions</h2>
            <BarChart
              items={Object.entries(region.allRegions)
                .sort((a, b) => (b[1][mk.key] ?? 0) - (a[1][mk.key] ?? 0))
                .map(([rName, r]) => ({
                  label: rName === name ? `${rName} ★` : rName,
                  value: r[mk.key] ?? 0,
                }))}
              maxValue={Math.max(...Object.values(region.allRegions).map((r) => r[mk.key] ?? 0), 1) * 1.1}
              color={mk.color}
            />
          </section>
        ))}

        {/* National Data Sections */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Food Sufficiency (National)</h2>
          <p className="text-sm text-gray-500 mb-6">National food sufficiency breakdown &mdash; region-specific: {pct(m.foodInsufficient)} food insecure</p>
          <BarChart
            items={Object.entries(region.nationalTopics.food.sufficiency.percentages).map(([k, v]) => ({
              label: foodLabels[k] ?? k, value: v,
            }))}
            color="#d97706"
          />
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Employment Details (National)</h2>
          <p className="text-sm text-gray-500 mb-6">National work type and telework data &mdash; region-specific employment: {pct(m.employed)}</p>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Work Type</h3>
              <BarChart
                items={Object.entries(region.nationalTopics.employment.workType.percentages).map(([k, v]) => ({
                  label: workTypeLabels[k] ?? k, value: v,
                }))}
                color="#059669"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Telework Frequency</h3>
              <BarChart
                items={Object.entries(region.nationalTopics.employment.telework.percentages).map(([k, v]) => ({
                  label: teleworkLabels[k] ?? k, value: v,
                }))}
                color="#4f46e5"
              />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Housing Details (National)</h2>
          <p className="text-sm text-gray-500 mb-6">National housing payment status &mdash; region-specific rent behind: {pct(m.rentBehind)}</p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-red-600 mb-1">{region.nationalTopics.housing.rentCurrent.percentages['2']}%</div>
              <div className="text-sm text-gray-600">Behind on Rent (National)</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-1">{region.nationalTopics.housing.mortgageCurrent.percentages['2']}%</div>
              <div className="text-sm text-gray-600">Behind on Mortgage (National)</div>
            </div>
          </div>
        </section>

        {/* States in this region */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">States in {name}</h2>
          <div className="flex flex-wrap gap-2">
            {region.states.map((st) => (
              <span key={st} className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">{st}</span>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Note: The HTOPS public-use file provides data at the Census Division level, not individual states.
            All metrics shown are for the {name} division as a whole.
          </p>
        </section>

        {/* Cross-links */}
        <div className="grid sm:grid-cols-3 gap-4 print:hidden">
          <Link href="/ai" className="block bg-blue-50 rounded-xl p-4 text-center hover:bg-blue-100 transition-colors">
            <div className="text-sm font-medium text-blue-700">Explore AI Data &rarr;</div>
          </Link>
          <Link href="/compare" className="block bg-purple-50 rounded-xl p-4 text-center hover:bg-purple-100 transition-colors">
            <div className="text-sm font-medium text-purple-700">Compare Regions &rarr;</div>
          </Link>
          <Link href="/articles" className="block bg-green-50 rounded-xl p-4 text-center hover:bg-green-100 transition-colors">
            <div className="text-sm font-medium text-green-700">Read Analysis &rarr;</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
