import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ — 50 Questions About America | American Pulse',
  description:
    'Answers to 50 common questions about AI usage, food security, housing, trust, employment, health, and wellbeing in America — backed by Census and federal data.',
};

interface FaqItem {
  q: string;
  a: string;
  href: string;
}

interface FaqTopic {
  topic: string;
  items: FaqItem[];
}

const faqData: FaqTopic[] = [
  {
    topic: 'AI & Technology',
    items: [
      { q: 'How many Americans use AI?', a: '24.45% of Americans reported using AI tools like ChatGPT or Copilot, according to the Census HTOPS survey from March 2026.', href: '/ai' },
      { q: 'Which state has the highest AI usage?', a: 'Connecticut leads the nation at 33.79% AI adoption.', href: '/ai' },
      { q: 'Does AI usage vary by income?', a: 'Yes — higher-income households adopt AI at significantly higher rates than lower-income households.', href: '/ai' },
      { q: 'What is the Census HTOPS survey?', a: 'The Household Trends and Outlook Pulse Survey (HTOPS) is a Census Bureau survey measuring household experiences across topics like AI, food, housing, employment, health, and trust.', href: '/methodology' },
      { q: 'How does US AI adoption compare globally?', a: 'The US sits at 24.45%, compared to roughly 35% in China and 25% in the UK.', href: '/global' },
    ],
  },
  {
    topic: 'Food Security',
    items: [
      { q: 'What is the food insecurity rate in America?', a: '7.01% of households report food insufficiency — meaning they sometimes or often don\'t have enough to eat.', href: '/food' },
      { q: 'How does food insecurity vary by state?', a: 'State-level food insufficiency ranges from about 3% to 12%.', href: '/food' },
      { q: 'What is food insufficiency?', a: 'Food insufficiency is when a household sometimes or often does not have enough food to eat. It\'s a more severe measure than general food insecurity.', href: '/glossary' },
      { q: 'Is food insecurity worse for low-income families?', a: 'Yes — households earning under $25K experience food insufficiency at roughly 3× the national rate.', href: '/food' },
      { q: 'Which states have the highest food insecurity?', a: 'See our full state rankings for food insufficiency rates across all 50 states and DC.', href: '/states' },
    ],
  },
  {
    topic: 'Housing',
    items: [
      { q: 'What percentage of Americans are behind on rent?', a: '8.6% of renters reported being behind on rent payments.', href: '/housing' },
      { q: 'What is housing cost burden?', a: 'A household is cost-burdened when it spends more than 30% of its income on housing costs (rent or mortgage).', href: '/glossary' },
      { q: 'What is the median rent in America?', a: 'Median rent varies significantly by state. Explore our housing data for ACS-based rent figures by state.', href: '/housing' },
      { q: 'How does housing affordability vary by state?', a: 'Housing affordability varies dramatically — from highly affordable states in the Midwest to severe cost burden on the coasts.', href: '/housing' },
      { q: 'What percentage of renters are cost-burdened?', a: 'Roughly 50% of renters spend more than 30% of their income on housing.', href: '/housing' },
    ],
  },
  {
    topic: 'Trust & Institutions',
    items: [
      { q: 'Do Americans trust Congress?', a: 'Only 17.9% of Americans express high trust in Congress — the lowest of any institution surveyed.', href: '/trust' },
      { q: 'What is the most trusted institution?', a: 'The Census Bureau tops the list at 70.7% high trust.', href: '/trust' },
      { q: 'Do Americans trust the police?', a: 'Trust in police falls in the middle of institutional rankings. See the full trust breakdown.', href: '/do-americans-trust-police' },
      { q: 'Does trust vary by income?', a: 'Yes — trust in institutions varies significantly by income level.', href: '/trust' },
      { q: 'What is the least trusted institution?', a: 'Congress, at just 17.9% high trust.', href: '/do-americans-trust-congress' },
    ],
  },
  {
    topic: 'Employment & Income',
    items: [
      { q: 'What is the employment rate?', a: '56.85% of survey respondents report being currently employed for pay.', href: '/employment' },
      { q: 'How many Americans struggle with expenses?', a: '80.39% of respondents report some level of difficulty paying usual household expenses.', href: '/spending' },
      { q: 'What is the national unemployment rate?', a: 'See the latest BLS unemployment data on our employment page.', href: '/employment' },
      { q: 'Does employment vary by state?', a: 'Yes — state employment rates range from roughly 48% to 62%.', href: '/employment' },
      { q: 'What is the median household income?', a: 'Median household income varies widely by state. Explore our income data for full rankings.', href: '/income' },
    ],
  },
  {
    topic: 'Health',
    items: [
      { q: 'What percentage of Americans are uninsured?', a: '7.67% of the population lacks health insurance coverage.', href: '/health' },
      { q: 'Which state has the highest uninsured rate?', a: 'Arkansas has the highest uninsured rate at 16.1%.', href: '/health' },
      { q: 'What is the obesity rate in America?', a: 'Obesity rates vary by state. See CDC PLACES data on our health page for state-level breakdowns.', href: '/health' },
      { q: 'How does health vary by state?', a: 'We calculate a composite Health Score (0–100) for each state using CDC PLACES indicators.', href: '/health' },
      { q: 'What is the diabetes rate?', a: 'Diabetes rates vary by state and are sourced from CDC PLACES data. See our health rankings.', href: '/health' },
    ],
  },
  {
    topic: 'Wellbeing & Quality of Life',
    items: [
      { q: 'What is the Wellbeing Index?', a: 'A composite score from 0 to 100 measuring overall quality of life based on income, employment, health, food security, housing affordability, and education.', href: '/wellbeing' },
      { q: 'What is the Squeeze Index?', a: 'A letter grade (A through F) measuring financial pressure on households, based on expense difficulty, rent burden, food insufficiency, and uninsured rate.', href: '/squeeze' },
      { q: 'Which states rank highest for wellbeing?', a: 'See our full wellbeing rankings to compare all 50 states.', href: '/wellbeing' },
      { q: 'How is cost of living measured?', a: 'Cost of living incorporates multiple factors including housing, food, healthcare, and transportation costs.', href: '/cost-of-living-by-state' },
      { q: 'Do rural areas differ from metro?', a: 'Yes — rural and metro areas differ on many metrics including employment, health outcomes, and AI adoption.', href: '/metro-rural' },
    ],
  },
  {
    topic: 'Demographics',
    items: [
      { q: 'How does AI usage differ by age?', a: 'Younger adults adopt AI at significantly higher rates than older adults.', href: '/demographics' },
      { q: 'Does education affect AI adoption?', a: 'Yes — higher education levels correlate with higher AI adoption rates.', href: '/demographics' },
      { q: 'How does race affect food insecurity?', a: 'There are significant racial disparities in food insufficiency rates.', href: '/demographics' },
      { q: 'Are there regional differences?', a: 'Yes — the Census divides states into regions and divisions, each with distinct patterns. See our regional analysis.', href: '/regions' },
      { q: 'How does the survey work?', a: 'The HTOPS survey uses a random sample of households, with responses weighted using PWEIGHT to produce nationally representative estimates.', href: '/methodology' },
    ],
  },
  {
    topic: 'State Comparisons',
    items: [
      { q: 'How does California compare nationally?', a: 'See California\'s full data profile across AI, food, housing, health, and more.', href: '/states/california' },
      { q: 'How does Texas compare nationally?', a: 'See Texas\'s full data profile across AI, food, housing, health, and more.', href: '/states/texas' },
      { q: 'Which state has the lowest uninsured rate?', a: 'See our full state rankings for uninsured rates.', href: '/states' },
      { q: 'Which states are most affordable?', a: 'See our cost of living rankings for affordability comparisons.', href: '/cost-of-living-by-state' },
      { q: 'How do states rank overall?', a: 'Our Wellbeing Index ranks all 50 states on a composite score from 0 to 100.', href: '/wellbeing' },
    ],
  },
  {
    topic: 'Data & Methodology',
    items: [
      { q: 'Where does this data come from?', a: 'Primary data comes from the U.S. Census Bureau\'s Household Trends and Outlook Pulse Survey (HTOPS), supplemented by ACS, CDC PLACES, BLS, and FRED.', href: '/methodology' },
      { q: 'How current is the data?', a: 'HTOPS data is from the March 2026 survey wave.', href: '/methodology' },
      { q: 'Can I download the data?', a: 'Yes — we provide downloadable datasets on our downloads page.', href: '/downloads' },
      { q: 'How are the estimates calculated?', a: 'All estimates are weighted using PWEIGHT, the person-level survey weight, to produce nationally representative figures.', href: '/methodology' },
      { q: 'Is this site affiliated with the Census Bureau?', a: 'No — American Pulse is an independent analysis project. We use publicly available Census data but have no official affiliation.', href: '/about' },
    ],
  },
];

function AccordionItem({ q, a, href }: FaqItem) {
  return (
    <details className="group border-b border-gray-200 dark:border-gray-700">
      <summary className="flex cursor-pointer items-center justify-between py-4 text-left font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
        <span>{q}</span>
        <svg
          className="ml-2 h-5 w-5 shrink-0 transition-transform group-open:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="pb-4 text-gray-600 dark:text-gray-300">
        {a}{' '}
        <Link href={href} className="text-blue-600 dark:text-blue-400 hover:underline">
          Learn more →
        </Link>
      </div>
    </details>
  );
}

export default function FaqPage() {
  const allItems = faqData.flatMap((t) => t.items);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h1>
        <p className="mb-10 text-lg text-gray-600 dark:text-gray-300">
          50 questions about life in America — answered with data from the U.S. Census Bureau, CDC,
          BLS, and more.
        </p>

        {faqData.map((section) => (
          <section key={section.topic} className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
              {section.topic}
            </h2>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 px-5">
              {section.items.map((item) => (
                <AccordionItem key={item.q} {...item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
