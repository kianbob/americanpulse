import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Glossary — Terms & Definitions | American Pulse',
  description:
    'Definitions for every metric, index, and data source used on American Pulse — from AI Usage to Wellbeing Index.',
};

interface GlossaryEntry {
  term: string;
  slug: string;
  definition: string;
  source?: string;
  href: string;
}

const glossary: GlossaryEntry[] = [
  { term: 'ACS (American Community Survey)', slug: 'acs', definition: 'An ongoing Census Bureau survey providing detailed demographic, social, economic, and housing data for communities across the United States.', href: '/methodology' },
  { term: 'AI Usage', slug: 'ai-usage', definition: 'The percentage of respondents who reported using artificial intelligence tools such as ChatGPT, Copilot, or similar AI assistants.', source: 'Census HTOPS 2026', href: '/ai' },
  { term: 'Annual Checkup', slug: 'annual-checkup', definition: 'The percentage of adults who report visiting a doctor for a routine checkup within the past year.', source: 'CDC PLACES', href: '/health' },
  { term: 'Bachelors or Higher', slug: 'bachelors-or-higher', definition: 'The percentage of adults age 25+ who have completed a bachelor\'s degree or higher level of education.', source: 'ACS', href: '/demographics' },
  { term: 'Binge Drinking', slug: 'binge-drinking', definition: 'The percentage of adults who report consuming 5+ drinks (men) or 4+ drinks (women) on a single occasion in the past 30 days.', source: 'CDC PLACES', href: '/health' },
  { term: 'CDC PLACES', slug: 'cdc-places', definition: 'A CDC program providing health data for small areas across the United States, including counties, places, census tracts, and ZIP Code Tabulation Areas.', href: '/health' },
  { term: 'Cost Burden', slug: 'cost-burden', definition: 'When a household spends more than 30% of its income on housing costs (rent or mortgage).', source: 'ACS', href: '/housing' },
  { term: 'Division', slug: 'division', definition: 'A Census Bureau geographic grouping of states (e.g., "Pacific," "New England").', href: '/regions' },
  { term: 'Employed', slug: 'employed', definition: 'The percentage of respondents who reported being currently employed for pay.', source: 'Census HTOPS', href: '/employment' },
  { term: 'Expense Difficulty', slug: 'expense-difficulty', definition: 'The percentage of respondents who reported it is "somewhat difficult" or "very difficult" to pay for usual household expenses.', source: 'Census HTOPS', href: '/spending' },
  { term: 'Food Insecurity', slug: 'food-insecurity', definition: 'A broader measure: when a household has difficulty providing enough food for all members due to lack of resources. USDA definition.', href: '/food' },
  { term: 'Food Insufficiency', slug: 'food-insufficiency', definition: 'When a household sometimes or often does not have enough food to eat. Measured by the Census HTOPS survey. More severe than "food insecurity."', href: '/food' },
  { term: 'FRED (Federal Reserve Economic Data)', slug: 'fred', definition: 'Economic data published by the Federal Reserve Bank of St. Louis, including housing and economic indicators.', href: '/housing' },
  { term: 'Health Score', slug: 'health-score', definition: 'A composite score from 0–100 measuring overall population health based on CDC PLACES indicators including obesity, diabetes, physical inactivity, smoking, and preventive care.', href: '/health' },
  { term: 'HTOPS (Household Trends and Outlook Pulse Survey)', slug: 'htops', definition: 'A Census Bureau survey measuring household experiences across topics like AI, food, housing, employment, health, and trust. Successor to the Household Pulse Survey.', href: '/methodology' },
  { term: 'Median Age', slug: 'median-age', definition: 'The age at which half the population is older and half is younger.', source: 'ACS', href: '/demographics' },
  { term: 'Median Home Value', slug: 'median-home-value', definition: 'The middle value of owner-occupied housing units.', source: 'ACS', href: '/housing' },
  { term: 'Median Income', slug: 'median-income', definition: 'The middle household income where half earn more and half earn less.', source: 'ACS', href: '/income' },
  { term: 'Median Rent', slug: 'median-rent', definition: 'The middle gross rent for renter-occupied housing units.', source: 'ACS', href: '/housing' },
  { term: 'Mental Health', slug: 'mental-health', definition: 'The percentage of adults reporting 14 or more days of poor mental health in the past 30 days.', source: 'CDC PLACES', href: '/health' },
  { term: 'Obesity', slug: 'obesity', definition: 'The percentage of adults with a Body Mass Index (BMI) of 30.0 or higher.', source: 'CDC PLACES', href: '/health' },
  { term: 'Physical Inactivity', slug: 'physical-inactivity', definition: 'The percentage of adults who report no leisure-time physical activity in the past month.', source: 'CDC PLACES', href: '/health' },
  { term: 'Poverty Rate', slug: 'poverty-rate', definition: 'The percentage of the population living below the federal poverty line.', source: 'ACS', href: '/income' },
  { term: 'PUF (Public Use File)', slug: 'puf', definition: 'A publicly available microdata file with individual survey responses (with privacy protections).', href: '/downloads' },
  { term: 'PWEIGHT', slug: 'pweight', definition: 'The person-level survey weight used to produce nationally representative estimates from HTOPS data.', href: '/methodology' },
  { term: 'Rent Behind', slug: 'rent-behind', definition: 'The percentage of renters who reported being behind on rent payments.', source: 'Census HTOPS', href: '/housing' },
  { term: 'Sample Size', slug: 'sample-size', definition: 'The number of survey respondents in a given state or group. Larger samples produce more reliable estimates.', href: '/methodology' },
  { term: 'Smoking', slug: 'smoking', definition: 'The percentage of adults who report currently smoking cigarettes.', source: 'CDC PLACES', href: '/health' },
  { term: 'Squeeze Index', slug: 'squeeze-index', definition: 'A letter grade (A through F) measuring the financial pressure on households, based on expense difficulty, rent burden, food insufficiency, and uninsured rate.', href: '/squeeze' },
  { term: 'Uninsured', slug: 'uninsured', definition: 'The percentage of the population without health insurance coverage.', source: 'Census HTOPS and ACS', href: '/health' },
  { term: 'Unemployment Rate', slug: 'unemployment-rate', definition: 'The percentage of the labor force that is jobless and actively seeking employment.', source: 'BLS', href: '/employment' },
  { term: 'Wellbeing Index', slug: 'wellbeing-index', definition: 'A composite score from 0–100 measuring overall quality of life based on income, employment, health, food security, housing affordability, and education.', href: '/wellbeing' },
];

export default function GlossaryPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">Data Glossary</h1>
      <p className="mb-10 text-lg text-gray-600 dark:text-gray-300">
        Definitions for every metric, index, and data source used on American Pulse.
      </p>

      <dl className="space-y-6">
        {glossary.map((entry) => (
          <div key={entry.slug} id={entry.slug} className="scroll-mt-20">
            <dt className="text-lg font-semibold text-gray-900 dark:text-white">{entry.term}</dt>
            <dd className="mt-1 text-gray-600 dark:text-gray-300">
              {entry.definition}
              {entry.source && (
                <span className="text-gray-500 dark:text-gray-400"> Source: {entry.source}.</span>
              )}
              {' '}
              <Link href={entry.href} className="text-blue-600 dark:text-blue-400 hover:underline">
                Learn more →
              </Link>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
