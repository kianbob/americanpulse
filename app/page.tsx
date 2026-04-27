import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import StatCard from './components/StatCard';

interface NationalStats {
  headlines: {
    aiUsagePct: number;
    foodInsufficientPct: number;
    housingBurden: { rentBehindPct: number; mortgageBehindPct: number };
    uninsuredPct: number;
    employedPct: number;
    expenseDifficultyPct: number;
  };
}

const topics = [
  { href: '/ai', label: 'AI Usage', desc: '1 in 4 Americans now use artificial intelligence', color: '#2563eb' },
  { href: '/food', label: 'Food Security', desc: 'Food sufficiency and insecurity across America', color: '#d97706' },
  { href: '/housing', label: 'Housing', desc: 'Rent and mortgage burden by region', color: '#dc2626' },
  { href: '/employment', label: 'Employment', desc: 'Work status, types, and telework patterns', color: '#059669' },
  { href: '/health', label: 'Health Insurance', desc: 'Coverage types and uninsured rates', color: '#7c3aed' },
  { href: '/spending', label: 'Spending', desc: 'Expense difficulty and price change impact', color: '#0891b2' },
  { href: '/transportation', label: 'Transportation', desc: 'How Americans get around', color: '#4f46e5' },
];

export default function Home() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/national-stats.json'), 'utf-8');
  const data: NationalStats = JSON.parse(raw);
  const h = data.headlines;

  const stats = [
    { value: `${h.aiUsagePct}%`, label: 'Use AI', color: '#2563eb' },
    { value: `${h.foodInsufficientPct}%`, label: 'Food Insecure', color: '#d97706' },
    { value: `${h.housingBurden.rentBehindPct}%`, label: 'Behind on Rent', color: '#dc2626' },
    { value: `${h.uninsuredPct}%`, label: 'Uninsured', color: '#7c3aed' },
    { value: `${h.employedPct}%`, label: 'Employed', color: '#059669' },
    { value: `${h.expenseDifficultyPct}%`, label: 'Expense Difficulty', color: '#0891b2' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            How Is America Really Doing?
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Exploring life in America through the U.S. Census Bureau&apos;s Household Trends
            and Outlook Pulse Survey (HTOPS) data.
          </p>
          <div className="inline-flex items-center gap-2 bg-[--primary-light] text-[--primary] px-4 py-2 rounded-full text-sm font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Powered by U.S. Census Bureau HTOPS data &middot; Wave 2506
          </div>
        </div>
      </section>

      {/* Headline Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} color={s.color} />
          ))}
        </div>
      </section>

      {/* Topic Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Explore the Data</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:border-[--primary] hover:shadow-md transition-all group"
            >
              <div
                className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center text-white text-lg font-bold"
                style={{ backgroundColor: t.color }}
              >
                {t.label[0]}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[--primary] transition-colors">
                {t.label}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{t.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
