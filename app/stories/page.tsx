import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Stories — Weekly Highlights | How Is America',
  description:
    'Weekly data highlights from the How Is America project. Census-powered stories on AI adoption, trust in institutions, food insecurity, health coverage, and more.',
};

const stories = [
  {
    date: 'Week of April 27, 2026',
    headline: 'Trust in Congress Hits 17.9% — Lowest of All Institutions',
    summary:
      'New Census HTOPS data reveals Congress is the least trusted institution in America. Only 17.9% of Americans express "a great deal" or "quite a lot" of trust in Congress, while the Census Bureau leads at 70.7%.',
    link: '/trust',
    topic: 'Trust',
  },
  {
    date: 'Week of April 20, 2026',
    headline: 'Census Releases First HTOPS Data — 24.45% of Americans Use AI',
    summary:
      "The Census Bureau's new Household Trends and Outlook Pulse Survey reveals nearly 1 in 4 Americans have used AI tools. Usage varies dramatically by state, from 15% to over 33%.",
    link: '/ai',
    topic: 'AI',
  },
  {
    date: 'Week of April 13, 2026',
    headline: 'Food Insecurity Persists at 7% Nationally — 3× Higher for Low-Income',
    summary:
      'Despite economic recovery, 7% of American households report food insufficiency. The burden falls disproportionately on households earning under $25K, where rates are nearly three times the national average.',
    link: '/food',
    topic: 'Food',
  },
  {
    date: 'Week of April 6, 2026',
    headline: '80% of Americans Report Expense Difficulty',
    summary:
      'A staggering 80.39% of Americans say it\'s "somewhat" or "very" difficult to pay for usual household expenses. Housing costs remain the biggest driver, with 8.6% behind on rent.',
    link: '/spending',
    topic: 'Spending',
  },
  {
    date: 'Week of March 30, 2026',
    headline: 'The Uninsured Map: Arkansas Leads at 16.1%, Massachusetts Lowest',
    summary:
      'Health insurance coverage varies dramatically by state. Arkansas has the highest uninsured rate at 16.1%, while several northeastern states maintain rates below 4%.',
    link: '/health',
    topic: 'Health',
  },
  {
    date: 'Week of March 23, 2026',
    headline: 'State Wellbeing Rankings: The Geographic Divide in American Life',
    summary:
      'Our composite Wellbeing Index reveals stark geographic disparities. Northeastern and western states consistently outperform the South on income, health, and food security metrics.',
    link: '/wellbeing',
    topic: 'Wellbeing',
  },
];

const topicColors: Record<string, string> = {
  Trust: 'bg-purple-100 text-purple-800',
  AI: 'bg-blue-100 text-blue-800',
  Food: 'bg-orange-100 text-orange-800',
  Spending: 'bg-green-100 text-green-800',
  Health: 'bg-red-100 text-red-800',
  Wellbeing: 'bg-teal-100 text-teal-800',
};

export default function StoriesPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Data Stories</h1>
        <p className="text-lg text-gray-600">
          Weekly highlights from Census data — the numbers behind American life, explained.
        </p>
      </section>

      {/* Story Cards */}
      <section className="space-y-8">
        {stories.map((story, i) => (
          <article
            key={i}
            className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow bg-white"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm text-gray-500">{story.date}</span>
              <span
                className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${topicColors[story.topic] ?? 'bg-gray-100 text-gray-800'}`}
              >
                {story.topic}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{story.headline}</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">{story.summary}</p>
            <Link
              href={story.link}
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
            >
              Read more →
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
