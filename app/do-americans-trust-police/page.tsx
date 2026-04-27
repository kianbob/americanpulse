import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Do Americans Trust the Police? 53.4% Say Yes [2026 Data]',
  description: '53.4% of Americans have a great deal or quite a lot of confidence in the police. Trust varies dramatically by age: 33.6% for 18-29 vs 73.9% for 75+.',
};

const faqs = [
  {
    question: 'Do Americans trust the police?',
    answer: '53.4% of Americans have a great deal or quite a lot of confidence in the police, according to the 2026 Census HTOPS survey. This places the police 4th out of 9 institutions measured, behind the Census Bureau (70.7%), Military (65.1%), and Statistical Agencies (62.3%).',
  },
  {
    question: 'How does police trust vary by age?',
    answer: 'Police trust increases dramatically with age. Only 33.6% of Americans aged 18-29 have high confidence in police, compared to 42.7% for ages 30-44, 57.6% for 45-59, 70.1% for 60-74, and 73.9% for those 75 and older.',
  },
  {
    question: 'Does income affect trust in police?',
    answer: 'Higher-income Americans tend to trust police more. Trust ranges from 40.9% for households earning under $25K to 58.9% for those earning $100K-$150K. The gap narrows at the highest income levels ($150K+: 58.4%).',
  },
  {
    question: 'What percentage of Americans have very little confidence in police?',
    answer: 'According to the Census HTOPS data, the breakdown is: 21.5% have a great deal of confidence, 31.9% quite a lot, 30.0% some, and 16.6% very little confidence in the police.',
  },
  {
    question: 'How does police trust compare to other institutions?',
    answer: 'The police rank 4th out of 9 institutions. Above them: Census Bureau (70.7%), Military (65.1%), Statistical Agencies (62.3%). Below: Public Schools (46.8%), Supreme Court (34.5%), Criminal Justice System (31.8%), Presidency (27.5%), and Congress (17.9%).',
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

export default function PoliceTrustPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Do Americans Trust the Police?</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            53.4% of Americans have high confidence in police — but trust varies from 33.6% among young adults to 73.9% among those 75+.
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
          <p className="text-indigo-900 font-medium mb-3">Explore trust data for all 9 institutions with demographic breakdowns</p>
          <Link href="/trust" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            View Trust in America →
          </Link>
        </div>

        <p className="text-xs text-gray-500 text-center">
          Data source: U.S. Census Bureau HTOPS, Wave 2506, March 2026.
        </p>
      </div>
    </div>
  );
}
