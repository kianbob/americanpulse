import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download Data — American Pulse',
  description: 'Download Census HTOPS data files in JSON format. Free, open data from the U.S. Census Bureau Household Trends and Outlook Pulse Survey.',
};

const files = [
  {
    name: 'all-tables.json',
    description: 'Complete HTOPS dataset with all 21 tables covering AI, employment, food, health, housing, spending, and transportation. Includes demographic breakdowns by age, sex, race, education, income, and more.',
    size: '~800 KB',
  },
  {
    name: 'national-stats.json',
    description: 'National-level summary statistics across all topics. Includes headline metrics (AI usage, food insecurity, employment, housing burden, uninsured rate) and detailed breakdowns.',
    size: '~25 KB',
  },
  {
    name: 'ai-stats.json',
    description: 'AI usage data: adoption rates, tools used, purposes, concerns, and demographic breakdowns by age, income, education, metro area, and Census division.',
    size: '~10 KB',
  },
  {
    name: 'food-stats.json',
    description: 'Food sufficiency and insecurity data with regional breakdowns across all 9 Census divisions.',
    size: '~3 KB',
  },
  {
    name: 'housing-stats.json',
    description: 'Housing tenure, rent and mortgage payment status with regional breakdowns. Includes delinquency rates by Census division.',
    size: '~4 KB',
  },
  {
    name: 'employment-stats.json',
    description: 'Employment status, work type (private, government, self-employed), and telework frequency with regional breakdowns.',
    size: '~4 KB',
  },
  {
    name: 'region-stats.json',
    description: 'Summary statistics for all 9 Census divisions including AI usage, food insecurity, employment, uninsured rate, rent delinquency, and expense difficulty.',
    size: '~4 KB',
  },
];

export default function DownloadsPage() {
  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Download the Data</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            All data files are available in JSON format for free. Use them in your own projects, research, or analysis.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-blue-900 mb-2">Data Source</h2>
          <p className="text-blue-800 text-sm">
            Data from the <strong>U.S. Census Bureau Household Trends and Outlook Pulse Survey (HTOPS)</strong>, March 2026 (Wave 2506).
            All percentages are weighted using PWEIGHT to produce nationally representative estimates.
            Sample size: 7,485 respondents. Geographic data is at the Census Division level.
          </p>
        </div>

        {files.map((file) => (
          <div key={file.name} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{file.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{file.description}</p>
              <span className="text-xs text-gray-500 mt-1 inline-block">Format: JSON &middot; {file.size}</span>
            </div>
            <a
              href={`/data/downloads/${file.name}`}
              download={file.name}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[--primary] text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download
            </a>
          </div>
        ))}

        <div className="bg-gray-50 rounded-xl p-6 mt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-2">License &amp; Attribution</h2>
          <p className="text-sm text-gray-700">
            This data is derived from the U.S. Census Bureau&apos;s publicly available HTOPS Public Use File (PUF).
            It is free to use for any purpose. If you use this data, please cite:
          </p>
          <blockquote className="mt-3 pl-4 border-l-4 border-gray-300 text-sm text-gray-600 italic">
            U.S. Census Bureau, Household Trends and Outlook Pulse Survey (HTOPS), Wave 2506, March 2026. Public Use File.
          </blockquote>
        </div>
      </div>
    </div>
  );
}
