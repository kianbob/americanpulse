import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Do Americans Trust Congress? Only 17.9% Say Yes [2026 Data]',
  description: 'According to 2026 Census HTOPS data, only 17.9% of Americans have a great deal or quite a lot of confidence in Congress, making it the least trusted institution surveyed.',
};

const faqs = [
  {
    question: 'Do Americans trust Congress?',
    answer: 'According to 2026 Census HTOPS data, only 17.9% of Americans have a great deal or quite a lot of confidence in Congress, making it the least trusted institution surveyed. 41.7% have very little confidence.',
  },
  {
    question: 'How does Congress compare to other institutions?',
    answer: 'Congress ranks dead last among 9 institutions measured. The U.S. Census Bureau leads at 70.7%, followed by the Military at 65.1%. Even the Criminal Justice System (31.8%) and the Presidency (27.5%) outrank Congress.',
  },
  {
    question: 'Which age group trusts Congress the least?',
    answer: 'Americans aged 75+ have the lowest confidence in Congress at 15.1%. The 30-44 age group is close behind at 16.2%. No age group exceeds 20% high trust.',
  },
  {
    question: 'Does income affect trust in Congress?',
    answer: 'Interestingly, lower-income Americans (under $25K) show the highest trust in Congress at 29.8%. Trust drops sharply for higher income brackets, with $100K-$150K earners at just 13.7%.',
  },
  {
    question: 'What is the source of this data?',
    answer: 'This data comes from the U.S. Census Bureau\'s Household Trends and Outlook Pulse Survey (HTOPS), March 2026, conducted in March 2026. The survey represents approximately 259 million American adults.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function CongressTrustPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Do Americans Trust Congress?</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Only 17.9% of Americans have a great deal or quite a lot of confidence in Congress — the lowest of any institution surveyed.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {faqs.map((faq) => (
          <div key={faq.question} className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h2>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}

        <div className="bg-indigo-50 rounded-xl border border-indigo-200 p-6 text-center">
          <p className="text-indigo-900 font-medium mb-3">Explore the full trust rankings for all 9 institutions</p>
          <Link href="/trust" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            View Trust in America →
          </Link>
        </div>

        <p className="text-xs text-gray-500 text-center">
          Data source: U.S. Census Bureau HTOPS, March 2026.
        </p>
      </div>
    </div>
  );
}
