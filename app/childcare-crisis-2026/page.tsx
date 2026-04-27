import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The Childcare Crisis in 2026: Census Data on Disruptions & Barriers',
  description: '6.6% of families with children had childcare disruptions in 2026. Top consequences: 25.9% cut work hours, 25.5% supervised kids while working. Census HTOPS data.',
};

const faqs = [
  {
    question: 'How many families experienced childcare disruptions in 2026?',
    answer: '6.6% of families with children reported childcare disruptions in the past 4 weeks according to the 2026 Census HTOPS survey. This represents 161 affected respondents out of 2,444 households with children surveyed.',
  },
  {
    question: 'What happens when families lose childcare?',
    answer: 'The consequences are severe. Among affected families: 25.9% cut work hours, 25.5% supervised children while working, 21.2% did not look for a job, 18.9% took unpaid leave, 18.8% used vacation or sick leave, 18.6% left a job, and 12.7% lost a job.',
  },
  {
    question: 'Does income affect childcare disruptions?',
    answer: 'Yes. Families earning under $25K had the highest disruption rate at 10.4%, compared to just 3.8% for those earning $50K-$75K. However, higher-income families ($100K-$150K) also reported 7.6%, suggesting the crisis spans income levels.',
  },
  {
    question: 'Is the childcare crisis worse in cities or rural areas?',
    answer: 'Metro areas report a slightly higher childcare disruption rate (7.8%) compared to non-metro areas (5.5%), possibly reflecting higher costs and longer commutes reducing childcare options in cities.',
  },
  {
    question: 'What is the source of this childcare data?',
    answer: 'This data comes from the U.S. Census Bureau\'s Household Trends and Outlook Pulse Survey (HTOPS), Wave 2506, conducted in March 2026. The childcare questions were asked of all households with children under 18.',
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

export default function ChildcareCrisisPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">The Childcare Crisis in 2026</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            6.6% of families with children experienced childcare disruptions — forcing parents to cut hours, leave jobs, or supervise kids while working.
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

        <div className="bg-red-50 rounded-xl border border-red-200 p-6 text-center">
          <p className="text-red-900 font-medium mb-3">Explore the full childcare data with income breakdowns and barrier analysis</p>
          <Link href="/childcare" className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
            View Childcare Data →
          </Link>
        </div>

        <p className="text-xs text-gray-500 text-center">
          Data source: U.S. Census Bureau HTOPS, Wave 2506, March 2026.
        </p>
      </div>
    </div>
  );
}
