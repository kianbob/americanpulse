'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface RegionData {
  states: string[];
  n: number;
  aiUsage: number;
  foodInsufficient: number;
  expenseDifficult: number;
  employed: number;
  uninsured: number;
  rentBehind: number;
}

const metrics = [
  { key: 'aiUsage', label: 'AI Usage', color: '#2563eb', suffix: '%' },
  { key: 'foodInsufficient', label: 'Food Insecure', color: '#d97706', suffix: '%' },
  { key: 'employed', label: 'Employed', color: '#059669', suffix: '%' },
  { key: 'uninsured', label: 'Uninsured', color: '#7c3aed', suffix: '%' },
  { key: 'rentBehind', label: 'Rent Behind', color: '#dc2626', suffix: '%' },
  { key: 'expenseDifficult', label: 'Expense Difficulty', color: '#0891b2', suffix: '%' },
] as const;

const colors = ['#2563eb', '#dc2626', '#059669'];

export default function ComparePage() {
  const [regions, setRegions] = useState<Record<string, RegionData>>({});
  const [selected, setSelected] = useState<string[]>(['', '', '']);

  useEffect(() => {
    fetch('/data/region-stats.json')
      .then((r) => r.json())
      .then(setRegions);
  }, []);

  const regionNames = Object.keys(regions);
  const activeRegions = selected.filter((s) => s && regions[s]);

  const handleSelect = (index: number, value: string) => {
    const next = [...selected];
    next[index] = value;
    setSelected(next);
  };

  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Compare Regions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select 2&ndash;3 Census divisions to compare side-by-side across all metrics.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Region Selectors */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Region {i + 1} {i < 2 ? '' : '(optional)'}
              </label>
              <select
                value={selected[i]}
                onChange={(e) => handleSelect(i, e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-transparent"
              >
                <option value="">Select a region...</option>
                {regionNames.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
              {selected[i] && regions[selected[i]] && (
                <p className="text-xs text-gray-500 mt-1">{regions[selected[i]].states.join(', ')}</p>
              )}
            </div>
          ))}
        </div>

        {activeRegions.length >= 2 ? (
          <>
            {/* Comparison Bars */}
            {metrics.map((metric) => {
              const vals = activeRegions.map((r) => regions[r][metric.key as keyof RegionData] as number);
              const maxVal = Math.max(...vals, 1) * 1.15;

              return (
                <section key={metric.key} className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">{metric.label}</h2>
                  <div className="space-y-4">
                    {activeRegions.map((name, idx) => {
                      const val = regions[name][metric.key as keyof RegionData] as number;
                      return (
                        <div key={name}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-700 font-medium">{name}</span>
                            <span className="font-semibold" style={{ color: colors[idx] }}>{val}{metric.suffix}</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-4">
                            <div
                              className="h-4 rounded-full transition-all duration-500"
                              style={{
                                width: `${Math.max((val / maxVal) * 100, 2)}%`,
                                backgroundColor: colors[idx],
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}

            {/* Summary Table */}
            <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Summary Table</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Metric</th>
                      {activeRegions.map((name, idx) => (
                        <th key={name} className="text-left py-3 px-4 font-medium" style={{ color: colors[idx] }}>{name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.map((metric) => (
                      <tr key={metric.key} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-700">{metric.label}</td>
                        {activeRegions.map((name) => {
                          const val = regions[name][metric.key as keyof RegionData] as number;
                          return (
                            <td key={name} className="py-3 px-4 font-medium text-gray-900">{val}{metric.suffix}</td>
                          );
                        })}
                      </tr>
                    ))}
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-700">Sample Size</td>
                      {activeRegions.map((name) => (
                        <td key={name} className="py-3 px-4 font-medium text-gray-900">{regions[name].n.toLocaleString()}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">Select at least 2 regions above to see a comparison.</p>
            <Link href="/regions" className="text-[--primary] hover:underline mt-2 inline-block">
              View all regions &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
