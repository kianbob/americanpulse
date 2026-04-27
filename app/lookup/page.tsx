'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { zipToState, stateAbbrevToSlug, stateAbbrevToName } from './zip-to-state';

interface StatesData {
  national: Record<string, number>;
  states: Record<string, { name: string; abbreviation: string; slug: string; [k: string]: unknown }>;
}

interface ACSProfiles {
  states: Record<string, {
    name: string;
    medianIncome: number;
    medianRent: number;
    povertyRate: number;
    [k: string]: unknown;
  }>;
}

interface CDCData {
  states: Record<string, {
    name: string;
    measures: { obesity: number; diabetes: number; mentalHealth: number; [k: string]: number };
  }>;
  national: Record<string, number>;
}

interface MetricRow {
  label: string;
  stateVal: number | null;
  nationalVal: number | null;
  unit: string;
  higherIsBetter: boolean;
}

function Arrow({ better }: { better: boolean | null }) {
  if (better === null) return <span className="text-gray-400">—</span>;
  return better
    ? <span className="text-green-600 font-bold">▲ Better</span>
    : <span className="text-red-500 font-bold">▼ Worse</span>;
}

export default function LookupPage() {
  const [zip, setZip] = useState('');
  const [statesData, setStatesData] = useState<StatesData | null>(null);
  const [acsData, setAcsData] = useState<ACSProfiles | null>(null);
  const [cdcData, setCdcData] = useState<CDCData | null>(null);
  const [result, setResult] = useState<{ abbrev: string; name: string; slug: string } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('/data/states-data.json').then(r => r.json()),
      fetch('/data/acs-state-profiles.json').then(r => r.json()),
      fetch('/data/cdc-places.json').then(r => r.json()),
    ]).then(([sd, acs, cdc]) => {
      setStatesData(sd);
      setAcsData(acs);
      setCdcData(cdc);
    }).catch(() => {});
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setResult(null);

    const cleaned = zip.replace(/\D/g, '');
    if (cleaned.length !== 5) {
      setError('Please enter a valid 5-digit zip code.');
      return;
    }

    const abbrev = zipToState(cleaned);
    if (!abbrev) {
      setError('Could not find a state for that zip code.');
      return;
    }

    setResult({
      abbrev,
      name: stateAbbrevToName[abbrev] || abbrev,
      slug: stateAbbrevToSlug[abbrev] || abbrev.toLowerCase(),
    });
  }

  function getMetrics(): MetricRow[] {
    if (!result) return [];
    const rows: MetricRow[] = [];
    const abbr = result.abbrev;
    const slug = result.slug;

    // Pulse survey metrics
    if (statesData) {
      const nat = statesData.national;
      const st = Object.values(statesData.states).find(s => s.abbreviation === abbr || s.slug === slug);
      if (st) {
        rows.push({ label: 'AI Usage', stateVal: st.aiUsage as number, nationalVal: nat.aiUsage, unit: '%', higherIsBetter: true });
        rows.push({ label: 'Food Insecurity', stateVal: st.foodInsufficient as number, nationalVal: nat.foodInsufficient, unit: '%', higherIsBetter: false });
        rows.push({ label: 'Uninsured Rate', stateVal: st.uninsured as number, nationalVal: nat.uninsured, unit: '%', higherIsBetter: false });
        rows.push({ label: 'Behind on Rent', stateVal: st.rentBehind as number, nationalVal: nat.rentBehind, unit: '%', higherIsBetter: false });
        rows.push({ label: 'Employment', stateVal: st.employed as number, nationalVal: nat.employed, unit: '%', higherIsBetter: true });
      }
    }

    // ACS metrics
    if (acsData) {
      const st = acsData.states[abbr];
      // compute national averages from all states for display
      if (st) {
        const allStates = Object.values(acsData.states);
        const avgIncome = Math.round(allStates.reduce((s, v) => s + v.medianIncome, 0) / allStates.length);
        const avgRent = Math.round(allStates.reduce((s, v) => s + v.medianRent, 0) / allStates.length);
        const avgPoverty = +(allStates.reduce((s, v) => s + v.povertyRate, 0) / allStates.length).toFixed(1);
        rows.push({ label: 'Median Income', stateVal: st.medianIncome, nationalVal: avgIncome, unit: '$', higherIsBetter: true });
        rows.push({ label: 'Median Rent', stateVal: st.medianRent, nationalVal: avgRent, unit: '$', higherIsBetter: false });
        rows.push({ label: 'Poverty Rate', stateVal: st.povertyRate, nationalVal: avgPoverty, unit: '%', higherIsBetter: false });
      }
    }

    // CDC metrics
    if (cdcData) {
      const st = cdcData.states[abbr];
      const nat = cdcData.national;
      if (st && nat) {
        rows.push({ label: 'Obesity', stateVal: st.measures.obesity, nationalVal: nat.obesity, unit: '%', higherIsBetter: false });
        rows.push({ label: 'Diabetes', stateVal: st.measures.diabetes, nationalVal: nat.diabetes, unit: '%', higherIsBetter: false });
        rows.push({ label: 'Mental Health Distress', stateVal: st.measures.mentalHealth, nationalVal: nat.mentalHealth, unit: '%', higherIsBetter: false });
      }
    }

    return rows;
  }

  function formatVal(val: number | null, unit: string) {
    if (val === null) return '—';
    if (unit === '$') return `$${val.toLocaleString()}`;
    return `${val}%`;
  }

  function isBetter(row: MetricRow): boolean | null {
    if (row.stateVal === null || row.nationalVal === null) return null;
    if (row.higherIsBetter) return row.stateVal >= row.nationalVal;
    return row.stateVal <= row.nationalVal;
  }

  const metrics = getMetrics();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Zip Code Lookup</h1>
        <p className="text-lg text-gray-600">
          Enter your zip code to see how your state compares to national averages.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-8 max-w-md mx-auto">
        <input
          type="text"
          value={zip}
          onChange={e => setZip(e.target.value)}
          placeholder="Enter zip code (e.g. 90210)"
          maxLength={5}
          className="flex-1 px-5 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-[var(--primary,#2563eb)] focus:outline-none transition-colors text-center tracking-widest"
        />
        <button
          type="submit"
          className="bg-[var(--primary,#2563eb)] text-white px-6 py-4 rounded-xl hover:opacity-90 transition-opacity font-medium"
        >
          Look Up
        </button>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 text-center text-red-700">
          {error}
        </div>
      )}

      {result && (
        <div>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{result.name}</h2>
            <p className="text-gray-500">Zip code {zip} → {result.name} ({result.abbrev})</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
            <div className="grid grid-cols-4 bg-gray-50 px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <div>Metric</div>
              <div className="text-center">{result.abbrev}</div>
              <div className="text-center">National</div>
              <div className="text-center">vs National</div>
            </div>
            {metrics.map((row, i) => (
              <div key={row.label} className={`grid grid-cols-4 px-4 py-3 items-center ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <div className="text-sm font-medium text-gray-800">{row.label}</div>
                <div className="text-center text-sm font-semibold text-gray-900">
                  {formatVal(row.stateVal, row.unit)}
                </div>
                <div className="text-center text-sm text-gray-500">
                  {formatVal(row.nationalVal, row.unit)}
                </div>
                <div className="text-center text-xs">
                  <Arrow better={isBetter(row)} />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href={`/states/${result.slug}`}
              className="inline-flex items-center gap-2 bg-[var(--primary,#2563eb)] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              View full {result.name} profile →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
