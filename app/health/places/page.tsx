import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import StatCard from '../../components/StatCard';
import DataTable from '../../components/DataTable';

export const metadata: Metadata = {
  title: 'CDC PLACES Health Rankings — State Health Outcomes & Risk Factors',
  description:
    'State-by-state health rankings from CDC PLACES data: obesity, diabetes, depression, smoking, physical inactivity, sleep, and more. See how your state compares.',
};

interface CdcState {
  name: string;
  measures: {
    obesity: number | null;
    diabetes: number | null;
    mentalHealth: number | null;
    physicalInactivity: number | null;
    smoking: number | null;
    bingeDrinking: number | null;
    insufficientSleep: number | null;
    noInsurance: number | null;
    annualCheckup: number | null;
  };
  healthScore: number;
}

interface CdcData {
  states: Record<string, CdcState>;
  national: Record<string, number>;
  metadata: { source: string; year: string };
}

function scoreColor(score: number): string {
  if (score >= 65) return '#059669';
  if (score >= 55) return '#d97706';
  return '#dc2626';
}

export default function CdcPlacesPage() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/cdc-places.json'), 'utf-8');
  const data: CdcData = JSON.parse(raw);
  const nat = data.national;

  const stateList = Object.entries(data.states)
    .map(([abbr, s]) => ({ abbr, ...s }))
    .sort((a, b) => b.healthScore - a.healthScore);

  const top = stateList[0];
  const bottom = stateList[stateList.length - 1];
  const avgScore = Math.round(stateList.reduce((s, d) => s + d.healthScore, 0) / stateList.length * 10) / 10;

  const rows = stateList.map((s, i) => ({
    rank: i + 1,
    state: s.name,
    healthScore: s.healthScore,
    obesity: s.measures.obesity,
    diabetes: s.measures.diabetes,
    mentalHealth: s.measures.mentalHealth,
    physicalInactivity: s.measures.physicalInactivity,
    smoking: s.measures.smoking,
    insufficientSleep: s.measures.insufficientSleep,
  }));

  const columns = [
    { key: 'rank', label: '#' },
    { key: 'state', label: 'State' },
    { key: 'healthScore', label: 'Health Score' },
    { key: 'obesity', label: 'Obesity', suffix: '%' },
    { key: 'diabetes', label: 'Diabetes', suffix: '%' },
    { key: 'mentalHealth', label: 'Depression', suffix: '%' },
    { key: 'physicalInactivity', label: 'Inactivity', suffix: '%' },
    { key: 'smoking', label: 'Smoking', suffix: '%' },
    { key: 'insufficientSleep', label: 'Poor Sleep', suffix: '%' },
  ];

  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">CDC PLACES Health Rankings</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            State-level health outcomes and risk factors from the CDC PLACES dataset, aggregated from county-level
            Behavioral Risk Factor Surveillance System (BRFSS) data.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard value={`${top.healthScore}`} label={`Healthiest: ${top.name}`} color="#059669" />
          <StatCard value={`${bottom.healthScore}`} label={`Lowest: ${bottom.name}`} color="#dc2626" />
          <StatCard value={`${avgScore}`} label="Average Score" color="#2563eb" />
          <StatCard value={`${nat.obesity}%`} label="National Obesity" color="#d97706" />
        </div>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">National Health Indicators</h2>
          <p className="text-sm text-gray-500 mb-6">Average prevalence rates across all states from CDC PLACES {data.metadata.year} data.</p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{nat.obesity}%</div>
              <div className="text-xs text-gray-500">Obesity</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{nat.diabetes}%</div>
              <div className="text-xs text-gray-500">Diabetes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{nat.mentalHealth}%</div>
              <div className="text-xs text-gray-500">Depression</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{nat.smoking}%</div>
              <div className="text-xs text-gray-500">Smoking</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{nat.physicalInactivity}%</div>
              <div className="text-xs text-gray-500">Inactivity</div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">State Health Rankings</h2>
          <p className="text-sm text-gray-500 mb-6">
            Click any column header to sort. Health Score is a composite 0-100 metric where higher is healthier.
          </p>
          <DataTable columns={columns} rows={rows} />
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Top 10 & Bottom 10 States</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-green-700 mb-3 uppercase tracking-wide">Healthiest States</h3>
              <div className="space-y-2">
                {stateList.slice(0, 10).map((s, i) => (
                  <div key={s.abbr} className="flex items-center justify-between py-1.5 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-400 w-5">{i + 1}</span>
                      <span className="text-sm font-medium text-gray-900">{s.name}</span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: scoreColor(s.healthScore) }}>
                      {s.healthScore}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-red-700 mb-3 uppercase tracking-wide">Lowest-Ranked States</h3>
              <div className="space-y-2">
                {stateList.slice(-10).reverse().map((s, i) => (
                  <div key={s.abbr} className="flex items-center justify-between py-1.5 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-400 w-5">{stateList.length - i}</span>
                      <span className="text-sm font-medium text-gray-900">{s.name}</span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: scoreColor(s.healthScore) }}>
                      {s.healthScore}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About This Data</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            CDC PLACES (Population Level Analysis and Community Estimates) provides model-based county-level
            estimates for chronic disease measures across the United States. The data comes from the Behavioral
            Risk Factor Surveillance System (BRFSS), a telephone health survey conducted annually by the CDC.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            State-level values shown here are population-weighted averages of county-level estimates.
            The Health Score is a composite metric computed by American Pulse that considers obesity, diabetes,
            depression, physical inactivity, smoking, binge drinking, insufficient sleep, lack of insurance,
            and annual checkup rates.
          </p>
          <p className="text-sm text-gray-500">
            Source: {data.metadata.source} | Year: {data.metadata.year} |{' '}
            <a href="/methodology" className="text-[--primary] hover:underline">Full methodology</a>
          </p>
        </section>
      </div>
    </div>
  );
}
