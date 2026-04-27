import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import StatCard from './components/StatCard';
import NewsletterForm from './components/NewsletterForm';
import USMap from './components/USMap';
import { articles } from './articles/data';

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

interface StateData {
  name: string;
  abbreviation: string;
  slug: string;
  aiUsage: number;
  foodInsufficient: number;
  employed: number;
  uninsured: number;
  rentBehind: number;
}

const topics = [
  { href: '/ai', label: 'AI Usage', desc: '1 in 4 Americans now use artificial intelligence', color: '#2563eb' },
  { href: '/food', label: 'Food Security', desc: 'Food sufficiency and insecurity across America', color: '#d97706' },
  { href: '/housing', label: 'Housing', desc: 'Rent and mortgage burden by region', color: '#dc2626' },
  { href: '/employment', label: 'Employment', desc: 'Work status, types, and telework patterns', color: '#059669' },
  { href: '/health', label: 'Health Insurance', desc: 'Coverage types and uninsured rates', color: '#7c3aed' },
  { href: '/spending', label: 'Spending', desc: 'Expense difficulty and price change impact', color: '#0891b2' },
  { href: '/transportation', label: 'Transportation', desc: 'How Americans get around', color: '#4f46e5' },
  { href: '/wellbeing', label: 'Wellbeing Index', desc: 'Composite wellbeing scores across all metrics', color: '#10b981' },
  { href: '/squeeze', label: 'Squeeze Index', desc: 'How financially squeezed is each region?', color: '#ef4444' },
  { href: '/metro-rural', label: 'Metro vs Rural', desc: 'The urban-rural divide in one survey', color: '#8b5cf6' },
  { href: '/trends', label: 'Trends', desc: 'How America is changing over time', color: '#f59e0b' },
];

const tickerItems = [
  '27% use AI',
  '20% food insecure',
  '56% struggle with expenses',
  '8.9% behind on rent',
  '7.5% uninsured',
];

export default function Home() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/national-stats.json'), 'utf-8');
  const data: NationalStats = JSON.parse(raw);
  const h = data.headlines;

  const statesRaw = fs.readFileSync(path.join(process.cwd(), 'public/data/states-data.json'), 'utf-8');
  const statesData: { states: Record<string, StateData> } = JSON.parse(statesRaw);

  const stats = [
    { value: `${h.aiUsagePct}%`, label: 'Use AI', color: '#2563eb' },
    { value: `${h.foodInsufficientPct}%`, label: 'Food Insecure', color: '#d97706' },
    { value: `${h.housingBurden.rentBehindPct}%`, label: 'Behind on Rent', color: '#dc2626' },
    { value: `${h.uninsuredPct}%`, label: 'Uninsured', color: '#7c3aed' },
    { value: `${h.employedPct}%`, label: 'Employed', color: '#059669' },
    { value: `${h.expenseDifficultyPct}%`, label: 'Expense Difficulty', color: '#0891b2' },
  ];

  // Latest 3 articles sorted by date desc
  const latestArticles = [...articles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const topicEmoji: Record<string, string> = {
    AI: '\u{1F916}',
    Food: '\u{1F37D}\uFE0F',
    Housing: '\u{1F3E0}',
    Demographics: '\u{1F465}',
    Overview: '\u{1F4CA}',
    Economy: '\u{1F4B0}',
    Health: '\u{1FA7A}',
    Regional: '\u{1F5FA}\uFE0F',
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            How Is America Really Doing?
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-4">
            Exploring life in America through the U.S. Census Bureau&apos;s Household Trends
            and Outlook Pulse Survey (HTOPS) data.
          </p>
          <p className="text-base text-gray-500 max-w-2xl mx-auto mb-8">
            Real-time data from the U.S. Census Bureau on AI, food, housing, jobs, and more
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <a
              href="#explore"
              className="inline-flex items-center px-6 py-3 bg-[--primary] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Explore the data
            </a>
            <Link
              href="/calculator"
              className="inline-flex items-center px-6 py-3 border-2 border-[--primary] text-[--primary] rounded-lg font-medium hover:bg-[--primary-light] transition-colors"
            >
              Take the quiz
            </Link>
          </div>
          <div className="inline-flex items-center gap-2 bg-[--primary-light] text-[--primary] px-4 py-2 rounded-full text-sm font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Powered by U.S. Census Bureau HTOPS data &middot; Wave 2506
          </div>
          <p className="text-sm text-gray-500 mt-3">Data updated: March 2026 (Wave 2506)</p>
        </div>
      </section>

      {/* Key Finding Callout */}
      <section className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-center gap-3 text-center">
          <span className="text-2xl" aria-hidden="true">📊</span>
          <p className="text-sm sm:text-base font-medium text-gray-800">
            <span className="font-bold text-[--primary]">Key Finding:</span>{' '}
            Americans making $200K+ are 3× more likely to use AI than those making $25K or less.
          </p>
          <Link href="/articles/ai-prosperity-gap" className="shrink-0 text-xs text-[--primary] hover:underline font-medium hidden sm:inline">
            Read more →
          </Link>
        </div>
      </section>

      {/* Quick Stats Ticker */}
      <section className="bg-gray-900 text-white py-3 overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap gap-12">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="text-sm font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Headline Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} color={s.color} />
          ))}
        </div>
      </section>

      {/* Topic Cards */}
      <section id="explore" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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

      {/* How Are You Doing? CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Link
          href="/calculator"
          className="block bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 sm:p-10 text-center text-white hover:from-blue-700 hover:to-indigo-700 transition-all"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">How Are You Doing?</h2>
          <p className="text-blue-100 max-w-lg mx-auto mb-4">
            Compare your situation to the national average. Answer a few quick questions about your income, housing, food security, and more to see where you stand.
          </p>
          <span className="inline-flex items-center px-5 py-2.5 bg-white text-blue-700 rounded-lg font-medium text-sm">
            Take the Calculator &rarr;
          </span>
        </Link>
      </section>

      {/* Latest Findings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Latest Findings</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:border-[--primary] hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{topicEmoji[article.topic] ?? '\u{1F4CA}'}</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                  {article.topic}
                </span>
                <span className="text-xs text-gray-500">{article.date}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[--primary] transition-colors mb-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-500">{article.description}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link href="/articles" className="text-[--primary] hover:underline font-medium text-sm">
            View all articles &rarr;
          </Link>
        </div>
      </section>

      {/* US State Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Explore by State</h2>
          <p className="text-sm text-gray-500 mb-6 text-center">Click any state to see detailed metrics. Colored by employment rate.</p>
          <USMap states={statesData.states} />
        </div>
      </section>

      {/* Get Updates */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-8 sm:p-10 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Updates</h2>
          <p className="text-gray-600 mb-6">Get notified when new data drops.</p>
          <div className="max-w-md mx-auto">
            <NewsletterForm />
          </div>
          <p className="text-xs text-gray-500 mt-3">
            No spam. We&apos;ll only email when new Census data is released.
          </p>
        </div>
      </section>
    </div>
  );
}
