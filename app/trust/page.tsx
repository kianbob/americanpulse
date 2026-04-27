import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import StatCard from '../components/StatCard';
import BarChart from '../components/BarChart';
import KeyInsight from '../components/KeyInsight';

export const metadata: Metadata = {
  title: 'Do Americans Trust Their Institutions? [2026 Census Data]',
  description: 'Trust in America: Who do we believe? Census Bureau ranks #1 at 70.7%, Congress dead last at 17.9%. Explore trust data by income, age, education, and metro status from Census HTOPS 2026.',
};

const trustLabels: Record<string, string> = {
  '1': 'A great deal',
  '2': 'Quite a lot',
  '3': 'Some',
  '4': 'Very little',
};

const trustColors: Record<string, string> = {
  '1': '#059669',
  '2': '#10b981',
  '3': '#f59e0b',
  '4': '#dc2626',
};

const fedStatLabels: Record<string, string> = {
  '1': 'Tend to trust',
  '2': 'Tend not to trust',
};

const policymakerLabels: Record<string, string> = {
  '1': 'Strongly agree',
  '2': 'Somewhat agree',
  '3': 'Neither agree nor disagree',
  '4': 'Somewhat disagree',
  '5': 'Strongly disagree',
};

interface RankingItem {
  institution: string;
  highTrustPct: number;
}

interface TrustData {
  rankings: RankingItem[];
  headlines: {
    trustFederalStatsPct: number;
    mostTrusted: string;
    mostTrustedPct: number;
    leastTrusted: string;
    leastTrustedPct: number;
  };
  institutions: Record<string, {
    overall: { percentages: Record<string, number> };
    highTrustPct: number;
    byIncome?: Record<string, { percentages: Record<string, number> }>;
    byAge?: Record<string, { percentages: Record<string, number> }>;
    byEducation?: Record<string, { percentages: Record<string, number> }>;
    byMetro?: Record<string, { percentages: Record<string, number> }>;
  }>;
  federalStatistics: {
    overall: { percentages: Record<string, number> };
    byIncome: Record<string, { percentages: Record<string, number> }>;
    byAge: Record<string, { percentages: Record<string, number> }>;
    byEducation: Record<string, { percentages: Record<string, number> }>;
    byMetro: Record<string, { percentages: Record<string, number> }>;
  };
  fedstatPolicymakers: {
    overall: { percentages: Record<string, number> };
    labels: Record<string, string>;
  };
}

function StackedBar({ percentages, labels, colors }: { percentages: Record<string, number>; labels: Record<string, string>; colors: Record<string, string> }) {
  return (
    <div>
      <div className="w-full h-8 rounded-full overflow-hidden flex">
        {Object.entries(percentages).map(([key, val]) => (
          <div
            key={key}
            className="h-full flex items-center justify-center text-xs font-medium text-white"
            style={{ width: `${val}%`, backgroundColor: colors[key] || '#6b7280', minWidth: val > 5 ? undefined : '0' }}
            title={`${labels[key] || key}: ${val}%`}
          >
            {val >= 8 ? `${val}%` : ''}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
        {Object.entries(percentages).map(([key, val]) => (
          <div key={key} className="flex items-center gap-1.5 text-xs text-gray-600">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors[key] || '#6b7280' }} />
            <span>{labels[key] || key}: {val}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CrossTabSection({ title, data, description }: { title: string; data: Record<string, { percentages: Record<string, number> }>; description?: string }) {
  const items = Object.entries(data).map(([label, v]) => {
    const highTrust = (v.percentages['1'] || 0) + (v.percentages['2'] || 0);
    return { label, value: Math.round(highTrust * 10) / 10, displayValue: `${highTrust.toFixed(1)}%` };
  });

  return (
    <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}
      <BarChart items={items} color="#2563eb" />
    </section>
  );
}

export default function TrustPage() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/trust-stats.json'), 'utf-8');
  const data: TrustData = JSON.parse(raw);
  const { rankings, headlines, institutions, federalStatistics, fedstatPolicymakers } = data;

  const rankingItems = rankings.map((r) => ({
    label: r.institution,
    value: r.highTrustPct,
    displayValue: `${r.highTrustPct}%`,
  }));

  const fedStatItems = Object.entries(federalStatistics.overall.percentages).map(([key, val]) => ({
    label: fedStatLabels[key] || key,
    value: val,
    displayValue: `${val}%`,
  }));

  const policymakerItems = Object.entries(fedstatPolicymakers.overall.percentages).map(([key, val]) => ({
    label: policymakerLabels[key] || key,
    value: val,
    displayValue: `${val}%`,
  }));

  // Federal stats trust by income
  const fedStatIncomeItems = Object.entries(federalStatistics.byIncome).map(([label, v]) => ({
    label,
    value: v.percentages['1'],
    displayValue: `${v.percentages['1']}%`,
  }));

  return (
    <div>
      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Trust in America: Who Do We Believe?</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The {headlines.mostTrusted} is the most trusted institution at {headlines.mostTrustedPct}%. {headlines.leastTrusted} ranks dead last at {headlines.leastTrustedPct}%.
          </p>
        </div>
      </section>
      <KeyInsight>The Census Bureau is the most trusted institution in America at 70.7%. Congress is the least trusted at 17.9%. This isn&apos;t just a polling curiosity — trust in institutions predicts everything from vaccine uptake to tax compliance to democratic participation.</KeyInsight>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard value={`${headlines.trustFederalStatsPct}%`} label="Trust Federal Statistics" color="#059669" />
          <StatCard value="Census Bureau #1" label={`Most Trusted at ${headlines.mostTrustedPct}%`} color="#2563eb" />
          <StatCard value={`${headlines.leastTrustedPct}%`} label="Congress — Last Place" color="#dc2626" />
        </div>

        {/* Institution Rankings */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Institution Trust Rankings</h2>
          <p className="text-sm text-gray-600 mb-6">Percentage with &quot;a great deal&quot; or &quot;quite a lot&quot; of confidence</p>
          <BarChart items={rankingItems} color="#2563eb" maxValue={100} />
        </section>

        {/* Trust Level Breakdown per Institution */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Trust Levels by Institution</h2>
          <div className="space-y-6">
            {rankings.map((r) => {
              const inst = institutions[r.institution];
              if (!inst) return null;
              return (
                <div key={r.institution}>
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">{r.institution}</h3>
                  <StackedBar percentages={inst.overall.percentages} labels={trustLabels} colors={trustColors} />
                </div>
              );
            })}
          </div>
        </section>

        {/* Trust by Income */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Trust by Income Bracket</h2>
          <p className="text-sm text-gray-600 mb-4">High trust (great deal + quite a lot) for key institutions by household income</p>
          <div className="space-y-8">
            {['U.S. Census Bureau', 'The Military', 'The Police', 'Congress'].map((name) => {
              const inst = institutions[name];
              if (!inst?.byIncome) return null;
              const items = Object.entries(inst.byIncome).map(([label, v]) => {
                const ht = (v.percentages['1'] || 0) + (v.percentages['2'] || 0);
                return { label, value: Math.round(ht * 10) / 10, displayValue: `${ht.toFixed(1)}%` };
              });
              return (
                <div key={name}>
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">{name}</h3>
                  <BarChart items={items} color="#2563eb" maxValue={100} />
                </div>
              );
            })}
          </div>
        </section>

        {/* Trust by Age */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Trust by Age Group</h2>
          <div className="space-y-8">
            {['U.S. Census Bureau', 'The Military', 'The Police', 'Congress'].map((name) => {
              const inst = institutions[name];
              if (!inst?.byAge) return null;
              const items = Object.entries(inst.byAge).map(([label, v]) => {
                const ht = (v.percentages['1'] || 0) + (v.percentages['2'] || 0);
                return { label, value: Math.round(ht * 10) / 10, displayValue: `${ht.toFixed(1)}%` };
              });
              return (
                <div key={name}>
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">{name}</h3>
                  <BarChart items={items} color="#7c3aed" maxValue={100} />
                </div>
              );
            })}
          </div>
        </section>

        {/* Trust by Education */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Trust by Education Level</h2>
          <div className="space-y-8">
            {['U.S. Census Bureau', 'The Police', 'Congress'].map((name) => {
              const inst = institutions[name];
              if (!inst?.byEducation) return null;
              const items = Object.entries(inst.byEducation).map(([label, v]) => {
                const ht = (v.percentages['1'] || 0) + (v.percentages['2'] || 0);
                return { label, value: Math.round(ht * 10) / 10, displayValue: `${ht.toFixed(1)}%` };
              });
              return (
                <div key={name}>
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">{name}</h3>
                  <BarChart items={items} color="#0891b2" maxValue={100} />
                </div>
              );
            })}
          </div>
        </section>

        {/* Trust by Metro */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Trust: Metro vs. Non-Metro</h2>
          <div className="space-y-8">
            {['U.S. Census Bureau', 'The Military', 'The Police', 'Congress'].map((name) => {
              const inst = institutions[name];
              if (!inst?.byMetro) return null;
              const items = Object.entries(inst.byMetro).map(([label, v]) => {
                const ht = (v.percentages['1'] || 0) + (v.percentages['2'] || 0);
                return { label, value: Math.round(ht * 10) / 10, displayValue: `${ht.toFixed(1)}%` };
              });
              return (
                <div key={name}>
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">{name}</h3>
                  <BarChart items={items} color="#d97706" maxValue={100} />
                </div>
              );
            })}
          </div>
        </section>

        {/* Federal Statistics Trust */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Do Americans Trust Government Data?</h2>
          <p className="text-sm text-gray-600 mb-6">{headlines.trustFederalStatsPct}% of Americans tend to trust federal statistics</p>
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Overall Trust in Federal Statistics</h3>
              <BarChart items={fedStatItems} color="#059669" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Trust in Federal Statistics by Income</h3>
              <BarChart items={fedStatIncomeItems} color="#059669" maxValue={100} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">&quot;Policymakers should use federal statistics to make decisions&quot;</h3>
              <BarChart items={policymakerItems} color="#7c3aed" />
            </div>
          </div>
        </section>

        {/* Cross-link */}
        <section className="bg-indigo-50 rounded-xl border border-indigo-200 p-6 sm:p-8 text-center">
          <h2 className="text-lg font-bold text-indigo-900 mb-2">Who Lobbies Congress?</h2>
          <p className="text-sm text-indigo-700 mb-4">
            Congress ranks last in trust at just {headlines.leastTrustedPct}%. See who&apos;s spending money to influence them.
          </p>
          <a
            href="https://theailobby.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Explore at theailobby.com →
          </a>
        </section>

        <p className="text-xs text-gray-500 text-center">
          Data source: U.S. Census Bureau HTOPS, March 2026.
        </p>
      </div>
    </div>
  );
}
