'use client';

import { useState } from 'react';
import Link from 'next/link';

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
}

interface StatesTableProps {
  states: StateEntry[];
  national: Record<string, number>;
}

type SortKey = 'name' | 'aiUsage' | 'foodInsufficient' | 'employed' | 'uninsured' | 'rentBehind';

function Badge({ value, national, inverse }: { value: number; national: number; inverse?: boolean }) {
  const diff = value - national;
  const isGood = inverse ? diff < 0 : diff > 0;
  const color = Math.abs(diff) < 0.5 ? 'text-gray-500' : isGood ? 'text-green-600' : 'text-red-600';
  const arrow = Math.abs(diff) < 0.5 ? '~' : diff > 0 ? '▲' : '▼';
  return <span className={`text-xs font-medium ${color}`}>{arrow}</span>;
}

export default function StatesTable({ states, national }: StatesTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortAsc, setSortAsc] = useState(true);
  const [search, setSearch] = useState('');

  const filtered = states.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.abbreviation.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortAsc ? aVal - bVal : bVal - aVal;
    }
    return sortAsc ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
  });

  const handleSort = (key: SortKey) => {
    if (key === sortKey) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(key === 'name'); }
  };

  const columns: { key: SortKey; label: string; natKey?: string; inverse?: boolean }[] = [
    { key: 'name', label: 'State' },
    { key: 'aiUsage', label: 'AI Usage %', natKey: 'aiUsage' },
    { key: 'foodInsufficient', label: 'Food Insecure %', natKey: 'foodInsufficient', inverse: true },
    { key: 'employed', label: 'Employed %', natKey: 'employed' },
    { key: 'uninsured', label: 'Uninsured %', natKey: 'uninsured', inverse: true },
    { key: 'rentBehind', label: 'Rent Behind %', natKey: 'rentBehind', inverse: true },
  ];

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search states..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-transparent"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="text-left py-3 px-4 font-medium text-gray-700 cursor-pointer hover:text-[--primary] select-none whitespace-nowrap"
                >
                  {col.label}
                  {sortKey === col.key && <span className="ml-1">{sortAsc ? '↑' : '↓'}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((state) => (
              <tr key={state.slug} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <Link href={`/states/${state.slug}`} className="text-[--primary] hover:underline font-medium">
                    {state.name}
                  </Link>
                  <span className="text-gray-400 ml-1 text-xs">{state.abbreviation}</span>
                </td>
                <td className="py-3 px-4">
                  {state.aiUsage}% <Badge value={state.aiUsage} national={national.aiUsage} />
                </td>
                <td className="py-3 px-4">
                  {state.foodInsufficient}% <Badge value={state.foodInsufficient} national={national.foodInsufficient} inverse />
                </td>
                <td className="py-3 px-4">
                  {state.employed}% <Badge value={state.employed} national={national.employed} />
                </td>
                <td className="py-3 px-4">
                  {state.uninsured}% <Badge value={state.uninsured} national={national.uninsured} inverse />
                </td>
                <td className="py-3 px-4">
                  {state.rentBehind}% <Badge value={state.rentBehind} national={national.rentBehind} inverse />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 mt-4">
        ▲/▼ indicates above/below national average. ~ means within 0.5 points.
        Green = favorable, Red = unfavorable relative to national average.
      </p>
    </div>
  );
}
