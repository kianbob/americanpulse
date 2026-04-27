import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import StatesTable from '../components/StatesTable';
import type { Metadata } from 'next';
import KeyInsight from '../components/KeyInsight';

export const metadata: Metadata = {
  title: 'All 50 States + DC — Census Pulse Data',
  description:
    'Explore AI usage, food insecurity, housing burden, employment, and health metrics for all 50 U.S. states and Washington DC based on Census HTOPS pulse survey data.',
};

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

export default function StatesPage() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/states-data.json'), 'utf-8');
  const data: StatesData = JSON.parse(raw);
  const states = Object.values(data.states).sort((a, b) => a.name.localeCompare(b.name));
  const national = data.national;

  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">States</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore Census HTOPS pulse survey metrics for all 50 states and Washington DC.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Data is reported at the Census Division level. Each state reflects its division&apos;s aggregate metrics.
          </p>
        </div>
      </section>
      <KeyInsight>50 states, 50 different Americas. From food security to AI adoption, the data reveals that where you live determines how you live. Explore how your state compares.</KeyInsight>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <StatesTable states={states} national={national} />
        </section>

        <div className="mt-8 grid sm:grid-cols-3 gap-4 print:hidden">
          <Link href="/regions" className="block bg-blue-50 rounded-xl p-4 text-center hover:bg-blue-100 transition-colors">
            <div className="text-sm font-medium text-blue-700">View by Region &rarr;</div>
          </Link>
          <Link href="/compare" className="block bg-purple-50 rounded-xl p-4 text-center hover:bg-purple-100 transition-colors">
            <div className="text-sm font-medium text-purple-700">Compare Metrics &rarr;</div>
          </Link>
          <Link href="/downloads" className="block bg-green-50 rounded-xl p-4 text-center hover:bg-green-100 transition-colors">
            <div className="text-sm font-medium text-green-700">Download Data &rarr;</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
