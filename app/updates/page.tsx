import type { Metadata } from 'next';
import NewsletterForm from '../components/NewsletterForm';

export const metadata: Metadata = {
  title: 'Data Updates & Newsletter',
  description: 'Stay up to date with the latest Census HTOPS data releases. Subscribe to get notified when new American Pulse data drops.',
};

const timeline = [
  {
    wave: 'Wave 2506',
    date: 'March 2026',
    status: 'current' as const,
    description: 'Latest release — covers AI usage, food security, housing, employment, health insurance, and spending.',
  },
  {
    wave: 'Wave 2507',
    date: 'May 2026 (expected)',
    status: 'upcoming' as const,
    description: 'Next scheduled release from the Census Bureau HTOPS pulse survey.',
  },
  {
    wave: 'Wave 2505',
    date: 'January 2026',
    status: 'past' as const,
    description: 'Previous wave with updated demographic and economic indicators.',
  },
  {
    wave: 'Wave 2504',
    date: 'November 2025',
    status: 'past' as const,
    description: 'Fall 2025 release covering household economic conditions.',
  },
];

export default function UpdatesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Data Updates & Newsletter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay up to date with the latest Census HTOPS data releases and American Pulse analysis.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Newsletter signup */}
        <section className="bg-blue-50 rounded-xl border border-blue-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Get Notified</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to get notified when new Census data is released. We&apos;ll send you a brief summary of what changed and what it means.
          </p>
          <NewsletterForm />
          <p className="text-xs text-gray-500 mt-3">No spam. Unsubscribe anytime. Data releases happen roughly every 2 months.</p>
        </section>

        {/* Timeline */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Release Timeline</h2>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div key={item.wave} className="flex gap-4">
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      item.status === 'current'
                        ? 'bg-[--primary] border-[--primary]'
                        : item.status === 'upcoming'
                          ? 'bg-white border-gray-300'
                          : 'bg-gray-300 border-gray-300'
                    }`}
                  />
                  {i < timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-200 min-h-[60px]" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-8">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{item.wave}</span>
                    {item.status === 'current' && (
                      <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Current</span>
                    )}
                    {item.status === 'upcoming' && (
                      <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Upcoming</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 mb-1">{item.date}</div>
                  <div className="text-sm text-gray-700">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Data source info */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About the Data</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              American Pulse uses data from the U.S. Census Bureau&apos;s Household Topics and Outlook Pulse Survey (HTOPS).
              This bimonthly survey captures how Americans are experiencing key issues like AI adoption, food security,
              housing costs, employment, and health insurance coverage.
            </p>
            <p>
              We also incorporate supplemental data from FRED (Federal Reserve Economic Data) for housing metrics
              and the Bureau of Labor Statistics for unemployment rates.
            </p>
            <p>
              All data is publicly available. We process and visualize it to make it accessible and comparable across
              states and regions.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
