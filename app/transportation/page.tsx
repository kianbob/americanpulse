import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import type { Metadata } from 'next';
import BarChart from '../components/BarChart';
import StatCard from '../components/StatCard';
import KeyInsight from '../components/KeyInsight';

export const metadata: Metadata = {
  title: 'Transportation in America — 2026 Census Data',
  description: 'How Americans commute and get around. Transportation modes and patterns by state and region, based on U.S. Census HTOPS survey data.',
};

interface NationalStats {
  transportation: {
    modes: Record<string, { weighted: number; n: number }>;
  };
}

export default function TransportationPage() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/national-stats.json'), 'utf-8');
  const data: NationalStats = JSON.parse(raw);
  const { modes } = data.transportation;

  const modeItems = Object.entries(modes)
    .filter(([k]) => k !== 'Did not report')
    .sort((a, b) => b[1].n - a[1].n)
    .map(([label, { n }]) => ({ label, value: n, displayValue: `n=${n.toLocaleString()}` }));

  const maxN = Math.max(...modeItems.map((m) => m.value));

  // Detailed transportation data
  const detailRaw = fs.readFileSync(path.join(process.cwd(), 'public/data/transportation-detail-stats.json'), 'utf-8');
  const detail = JSON.parse(detailRaw);

  const modeDetailItems = Object.entries(detail.modes as Record<string, { pct: number; byMetro: { Metro: number; 'Non-metro': number } }>)
    .sort((a, b) => (b[1] as { pct: number }).pct - (a[1] as { pct: number }).pct)
    .map(([label, d]: [string, { pct: number; byMetro: { Metro: number; 'Non-metro': number } }]) => ({ label, value: d.pct }));

  const metroCompare = Object.entries(detail.modes as Record<string, { pct: number; byMetro: { Metro: number; 'Non-metro': number } }>)
    .filter(([k]) => ['Personal vehicle', 'Bus', 'Rail transit', 'Taxi/rideshare', 'Walk', 'Bike/e-scooter'].includes(k))
    .map(([label, d]: [string, { pct: number; byMetro: { Metro: number; 'Non-metro': number } }]) => ({
      label,
      metro: d.byMetro.Metro,
      nonMetro: d.byMetro['Non-metro'],
    }));

  const accessItems = Object.entries(detail.access.overall.percentages as Record<string, number>).map(([key, val]) => ({
    label: (detail.access.labels as Record<string, string>)[key] ?? key,
    value: val as number,
  }));

  const unmetItems = Object.entries(detail.unmetNeeds.reasons as Record<string, number>)
    .filter(([k]) => k !== 'None of the above')
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .map(([label, val]) => ({ label, value: val as number }));

  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Transportation</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            How Americans get around — from personal vehicles to public transit and beyond.
          </p>
        </div>
      </section>
      <KeyInsight>How Americans get around shapes everything from job access to healthcare to food security. In rural areas, lack of transportation is a barrier to employment for 1 in 5 job seekers.</KeyInsight>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Transportation Modes</h2>
          <p className="text-sm text-gray-500 mb-6">Respondents could select multiple modes. Ranked by number of respondents.</p>
          <BarChart items={modeItems} maxValue={maxN} color="#4f46e5" />
        </section>

        {/* Detailed Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <StatCard value="85.2%" label="Personal Vehicle" color="#4f46e5" />
          <StatCard value="6.3%" label="Unmet Transport Needs" color="#dc2626" />
          <StatCard value="64.7%" label="Walk Access" color="#059669" />
        </div>

        {/* Mode Breakdown by Percentage */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Mode Breakdown (Weighted %)</h2>
          <p className="text-sm text-gray-500 mb-6">Percentage of Americans using each transportation mode. Multiple selections allowed.</p>
          <BarChart items={modeDetailItems} color="#4f46e5" />
        </section>

        {/* Metro vs Non-Metro */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Rural vs Urban Transportation Gap</h2>
          <p className="text-sm text-gray-500 mb-6">How transportation modes differ between metro and non-metro areas.</p>
          <div className="space-y-4">
            {metroCompare.map((m) => (
              <div key={m.label} className="space-y-1">
                <div className="text-sm font-medium text-gray-700">{m.label}</div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-20">Metro</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: `${m.metro}%` }} />
                  </div>
                  <span className="text-xs font-medium w-12 text-right">{m.metro}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-20">Non-metro</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${m.nonMetro}%` }} />
                  </div>
                  <span className="text-xs font-medium w-12 text-right">{m.nonMetro}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Transportation Access Adequacy */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Transportation Access Adequacy</h2>
          <p className="text-sm text-gray-500 mb-6">How well Americans&apos; transportation needs are being met.</p>
          <BarChart items={accessItems} color="#059669" />
        </section>

        {/* Unmet Needs */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Why Transportation Needs Go Unmet</h2>
          <p className="text-sm text-gray-500 mb-6">Among the 6.3% with unmet transportation needs, these are the top reasons.</p>
          <BarChart items={unmetItems} color="#dc2626" />
        </section>
      </div>
    </div>
  );
}
