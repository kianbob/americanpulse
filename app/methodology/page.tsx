import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Methodology — Data Dictionary, Indexes, Sampling & Limitations',
  description:
    'How How Is America processes Census HTOPS data, computes the Wellbeing and Squeeze indexes, and supplements with USDA, BLS, and ACS/FRED data. Includes full data dictionary, formulas, and limitations.',
};

export default function MethodologyPage() {
  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Methodology</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            How we collect, process, and present the data behind How Is America.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Primary Data Source: Census HTOPS</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The primary data source for How Is America is the{' '}
            <a
              href="https://www.census.gov/programs-surveys/htops.html"
              className="text-[--primary] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              U.S. Census Bureau Household Trends and Outlook Pulse Survey (HTOPS)
            </a>
            . The Household Pulse Survey (HPS) was officially relaunched as part of the Household Trends and Outlook Pulse Survey (HTOPS) in January 2025. Our data comes from HTOPS Wave 2506 (March 2026).
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            HTOPS is a rapid-response survey designed to measure how emerging social and economic issues
            are impacting American households. It covers a broad range of topics including AI usage,
            food security, housing, employment, health insurance, household spending, and transportation.
          </p>
          <p className="text-gray-700 leading-relaxed">
            How Is America uses data from <strong>March 2026</strong> (Wave 2506).
          </p>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Data Dictionary</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Key HTOPS variables used throughout How Is America, with their coding and descriptions:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Variable</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Description</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Coding</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3 font-mono text-xs">AINTRNT1</td>
                  <td className="py-2 px-3">AI usage (personal, past 2 months)</td>
                  <td className="py-2 px-3 text-xs">1=Yes, 2=No, 3=Not sure</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3 font-mono text-xs">RFAM_INCOME</td>
                  <td className="py-2 px-3">Family income bracket</td>
                  <td className="py-2 px-3 text-xs">7 brackets: &lt;$25K, $25–35K, $35–50K, $50–75K, $75–100K, $100–150K, $150K+</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3 font-mono text-xs">RRACETH1</td>
                  <td className="py-2 px-3">Race/ethnicity (recode)</td>
                  <td className="py-2 px-3 text-xs">1=White NH, 2=Black NH, 3=Asian NH, 4=Other/Multi NH, 5=Hispanic</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3 font-mono text-xs">REDUC1</td>
                  <td className="py-2 px-3">Education level (recode)</td>
                  <td className="py-2 px-3 text-xs">7 levels: &lt;HS through graduate degree</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3 font-mono text-xs">ANYWORK</td>
                  <td className="py-2 px-3">Employment in past 7 days</td>
                  <td className="py-2 px-3 text-xs">1=Yes, 2=No</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3 font-mono text-xs">FOODSUFR</td>
                  <td className="py-2 px-3">Food sufficiency in past 7 days</td>
                  <td className="py-2 px-3 text-xs">1=Enough wanted, 2=Enough not always wanted, 3=Sometimes not enough, 4=Often not enough</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3 font-mono text-xs">TENURE</td>
                  <td className="py-2 px-3">Housing tenure</td>
                  <td className="py-2 px-3 text-xs">1=Own free &amp; clear, 2=Own w/ mortgage, 3=Rent, 4=No payment</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3 font-mono text-xs">RENTCUR</td>
                  <td className="py-2 px-3">Rent current (among renters)</td>
                  <td className="py-2 px-3 text-xs">1=Current, 2=Behind</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3 font-mono text-xs">MORTCUR</td>
                  <td className="py-2 px-3">Mortgage current (among owners)</td>
                  <td className="py-2 px-3 text-xs">1=Current, 2=Behind</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3 font-mono text-xs">RHLTHINS</td>
                  <td className="py-2 px-3">Health insurance coverage</td>
                  <td className="py-2 px-3 text-xs">Multi-select: employer, Medicare, Medicaid, direct, TRICARE/VA, none</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3 font-mono text-xs">EXPNS_DIF</td>
                  <td className="py-2 px-3">Expense difficulty</td>
                  <td className="py-2 px-3 text-xs">1=Not at all, 2=A little, 3=Somewhat, 4=Very difficult</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono text-xs">PWEIGHT</td>
                  <td className="py-2 px-3">Person-level survey weight</td>
                  <td className="py-2 px-3 text-xs">Continuous; calibrates sample to ~260M adult population</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Census Sampling & Weighting</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            HTOPS is a <strong>probability-based survey</strong>, meaning every adult in the U.S. has a known,
            non-zero probability of being selected. This distinguishes it from opt-in online panels and makes
            it one of the most methodologically rigorous rapid-response surveys available.
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <strong>Sample frame:</strong> The Census Bureau draws the sample from the Master Address File,
                the same frame used for the decennial census and American Community Survey.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <strong>Sample size:</strong> Approximately <strong>7,500 respondents per wave</strong>,
                drawn from all 50 states and DC. Response rates vary by wave but typically fall between 5–10%.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <strong>Weighting:</strong> Each respondent receives a <strong>PWEIGHT</strong> (person weight)
                that adjusts for nonresponse and calibrates the sample to match known population totals by age, sex,
                race/ethnicity, education, and state. When applied, the ~7,500 respondents represent approximately
                <strong> 260 million American adults</strong>.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <strong>Collection mode:</strong> Internet self-response, with follow-up by phone for non-responders
                in some waves. The online-first approach may undercount populations with limited internet access.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <strong>Population:</strong> Civilian, non-institutionalized adults aged 18+ in the United States.
                Excludes those in prisons, nursing homes, military barracks, and other group quarters.
              </span>
            </li>
          </ul>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Margin of Error</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            As with any survey, HTOPS estimates carry sampling error. Key considerations:
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <strong>National estimates:</strong> With ~7,500 respondents, national percentages carry a margin
                of error of roughly <strong>&plusmn;1–2 percentage points</strong> at the 90% confidence level.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <strong>Division-level estimates:</strong> Sample sizes per Census division range from roughly
                330 to 1,700 respondents. Smaller divisions (e.g., East South Central with ~330) have margins
                of error of <strong>&plusmn;5–8 percentage points</strong>, while larger divisions are more precise.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <strong>Subgroup estimates:</strong> Cross-tabulations (e.g., AI usage by income within a
                specific age group) can produce small cells with high margins of error. We flag estimates
                based on small sample sizes (n&lt;50) where they appear.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <strong>State-level data:</strong> The HTOPS public-use file does not include state identifiers.
                State-level data on How Is America comes from supplemental sources (ACS, BLS, USDA) rather
                than HTOPS directly.
              </span>
            </li>
          </ul>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Wellbeing Index</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The <a href="/wellbeing" className="text-[--primary] hover:underline">American Wellbeing Index</a> is a
            composite 0–100 score computed for each Census division. It combines six HTOPS metrics and one
            CDC PLACES health metric, each normalized relative to the worst-performing division:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm mt-2">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Component</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Weight</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Formula</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3">Food Security</td>
                  <td className="py-2 px-3">17.5%</td>
                  <td className="py-2 px-3 font-mono text-xs">(1 &minus; foodInsufficient / max) &times; 100</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3">Housing Affordability</td>
                  <td className="py-2 px-3">17.5%</td>
                  <td className="py-2 px-3 font-mono text-xs">(1 &minus; rentBehind / max) &times; 100</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3">Employment</td>
                  <td className="py-2 px-3">12.5%</td>
                  <td className="py-2 px-3 font-mono text-xs">(employed / max) &times; 100</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3">Expense Difficulty</td>
                  <td className="py-2 px-3">12.5%</td>
                  <td className="py-2 px-3 font-mono text-xs">(1 &minus; expenseDifficult / max) &times; 100</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3">Health Insurance</td>
                  <td className="py-2 px-3">12.5%</td>
                  <td className="py-2 px-3 font-mono text-xs">(1 &minus; uninsured / max) &times; 100</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3">AI Adoption</td>
                  <td className="py-2 px-3">12.5%</td>
                  <td className="py-2 px-3 font-mono text-xs">(aiUsage / max) &times; 100</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Population Health (CDC)</td>
                  <td className="py-2 px-3">15%</td>
                  <td className="py-2 px-3 font-mono text-xs">(divisionHealthScore / max) &times; 100</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-600 text-sm mt-4">
            The composite score is the weighted sum of all seven dimension scores. The worst division on each
            dimension scores 0 for that dimension; all others score proportionally higher. The CDC Population
            Health component is computed by averaging state-level CDC PLACES health scores within each division.
          </p>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Squeeze Index</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The <a href="/squeeze" className="text-[--primary] hover:underline">Squeeze Index</a> measures
            financial pressure on households in each Census division. It combines three HTOPS metrics:
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span><strong>Rent delinquency</strong> (rentBehind): % of renters behind on rent</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span><strong>Food insufficiency</strong> (foodInsufficient): % reporting not enough to eat</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span><strong>Expense difficulty</strong> (expenseDifficult): % reporting difficulty paying expenses</span>
            </li>
          </ul>
          <div className="mt-4 bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-2">Formula</h3>
            <div className="font-mono text-xs text-gray-600 space-y-1">
              <div>rentScore = (rentBehind / max_rentBehind) &times; 100</div>
              <div>foodScore = (foodInsufficient / max_foodInsufficient) &times; 100</div>
              <div>expenseScore = (expenseDifficult / max_expenseDifficult) &times; 100</div>
              <div className="font-bold text-gray-900 pt-1">Squeeze Index = average(rentScore, foodScore, expenseScore)</div>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mt-4">
            Each metric is normalized to 0–100 relative to the maximum across divisions, then the three
            normalized scores are averaged. The resulting squeeze score is converted to a letter grade:
          </p>
          <div className="grid grid-cols-5 gap-2 mt-4 text-center text-sm">
            <div className="bg-green-50 rounded-lg p-2">
              <div className="font-bold text-green-700">A</div>
              <div className="text-xs text-gray-600">&lt;21</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-2">
              <div className="font-bold text-blue-700">B</div>
              <div className="text-xs text-gray-600">21–40</div>
            </div>
            <div className="bg-amber-50 rounded-lg p-2">
              <div className="font-bold text-amber-700">C</div>
              <div className="text-xs text-gray-600">41–60</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-2">
              <div className="font-bold text-orange-700">D</div>
              <div className="text-xs text-gray-600">61–80</div>
            </div>
            <div className="bg-red-50 rounded-lg p-2">
              <div className="font-bold text-red-700">F</div>
              <div className="text-xs text-gray-600">81+</div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Geographic Granularity</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The HTOPS Public Use File (PUF) identifies respondent geography at the <strong>Census Division</strong> level
            only — it does not include state-level identifiers. This means all regional analysis on How Is America
            is at the division level (9 divisions), not the state level.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700 mt-4">
            <div><strong>New England:</strong> CT, ME, MA, NH, RI, VT</div>
            <div><strong>Middle Atlantic:</strong> NJ, NY, PA</div>
            <div><strong>East North Central:</strong> IL, IN, MI, OH, WI</div>
            <div><strong>West North Central:</strong> IA, KS, MN, MO, NE, ND, SD</div>
            <div><strong>South Atlantic:</strong> DE, DC, FL, GA, MD, NC, SC, VA, WV</div>
            <div><strong>East South Central:</strong> AL, KY, MS, TN</div>
            <div><strong>West South Central:</strong> AR, LA, OK, TX</div>
            <div><strong>Mountain:</strong> AZ, CO, ID, MT, NV, NM, UT, WY</div>
            <div><strong>Pacific:</strong> AK, CA, HI, OR, WA</div>
          </div>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Comparison to Other Federal Surveys</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Understanding how HTOPS compares to other major surveys helps contextualize the data:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm mt-2">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Survey</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Frequency</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Sample Size</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-700">Strengths</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3 font-medium">Census HTOPS</td>
                  <td className="py-2 px-3">Periodic (waves)</td>
                  <td className="py-2 px-3">~7,500/wave</td>
                  <td className="py-2 px-3 text-xs">Rapid response, broad topic coverage, AI questions, probability-based</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3 font-medium">ACS</td>
                  <td className="py-2 px-3">Annual</td>
                  <td className="py-2 px-3">~3.5 million</td>
                  <td className="py-2 px-3 text-xs">Massive sample, granular geography (county/tract level), gold standard for demographics</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3 font-medium">CPS</td>
                  <td className="py-2 px-3">Monthly</td>
                  <td className="py-2 px-3">~60,000</td>
                  <td className="py-2 px-3 text-xs">Official unemployment rate, labor force participation, monthly frequency</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium">Gallup</td>
                  <td className="py-2 px-3">Daily tracking</td>
                  <td className="py-2 px-3">~1,000/day</td>
                  <td className="py-2 px-3 text-xs">Real-time sentiment, wellbeing tracking, AI workplace usage</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-600 text-sm mt-4">
            HTOPS fills a unique niche: it&apos;s faster than the ACS, broader than the CPS, and more
            methodologically rigorous than most private polling. Its main limitations are smaller sample
            size (limiting geographic granularity) and periodic rather than continuous collection.
          </p>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Supplemental Data Sources</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            How Is America supplements HTOPS data with state-level data from five additional federal sources:
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <strong>USDA Economic Research Service:</strong> State-level food insecurity rates (3-year average
                2021–2023). Source:{' '}
                <a
                  href="https://www.ers.usda.gov/topics/food-nutrition-assistance/food-security-in-the-u-s/"
                  className="text-[--primary] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  USDA ERS Food Security
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <strong>Bureau of Labor Statistics:</strong> State unemployment rates (March 2025, seasonally adjusted).
                Source:{' '}
                <a
                  href="https://www.bls.gov/lau/"
                  className="text-[--primary] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  BLS Local Area Unemployment Statistics
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <strong>U.S. Census Bureau ACS via FRED:</strong> Median gross rent and cost-burdened renter
                percentages by state (2023 American Community Survey). Source:{' '}
                <a
                  href="https://fred.stlouisfed.org/"
                  className="text-[--primary] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Federal Reserve Economic Data (FRED)
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <strong>CDC PLACES:</strong> State-level health outcomes and risk factors (2023 data, 2024 release)
                from the Behavioral Risk Factor Surveillance System (BRFSS). County-level estimates are aggregated
                to state-level population-weighted averages. Measures include obesity, diabetes, depression,
                physical inactivity, smoking, binge drinking, insufficient sleep, lack of insurance, and
                annual checkup rates. Source:{' '}
                <a
                  href="https://www.cdc.gov/places/"
                  className="text-[--primary] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CDC PLACES
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <strong>U.S. Census Bureau ACS 1-Year Estimates:</strong> State-level demographic profiles
                (2023) including median household income, median gross rent, median home value, median age,
                poverty rate, educational attainment (bachelor&apos;s degree or higher), and unemployment rate.
                Source:{' '}
                <a
                  href="https://data.census.gov/"
                  className="text-[--primary] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Census Bureau Data
                </a>
              </span>
            </li>
          </ul>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Limitations & Caveats</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <strong>Geographic resolution:</strong> HTOPS public-use data is only available at the Census Division
                level. Division-level averages can mask significant variation between states within a division.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <strong>Sample size:</strong> With ~7,500 respondents split across 9 divisions, some divisions
                have small sample sizes (as low as ~330), which increases the margin of error for those estimates.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <strong>Self-reported data:</strong> HTOPS is a survey. Responses are self-reported and subject
                to recall bias, social desirability bias, and other survey limitations.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <strong>Composite indexes:</strong> The Wellbeing and Squeeze indexes are constructed by
                How Is America, not the Census Bureau. The choice of weights, normalization method, and
                included metrics reflects editorial judgment and is not an official government statistic.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <strong>Multi-select questions:</strong> For topics like AI tools, transportation modes, and
                insurance types, respondents could select multiple options. Percentages for these questions
                sum to more than 100%.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <strong>Point-in-time snapshot:</strong> HTOPS Wave 2506 captures a single point in time
                (March 2026). Conditions may have changed since data collection.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <strong>Supplemental data timing:</strong> State-level supplemental data comes from different
                time periods (USDA 2021–2023 average, BLS March 2025, ACS 2023) and may not align perfectly
                with the HTOPS wave.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <strong>Nonresponse bias:</strong> Despite PWEIGHT adjustments, some systematic differences
                between responders and non-responders may persist. Populations with limited internet access,
                language barriers, or distrust of government surveys may be underrepresented.
              </span>
            </li>
          </ul>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Trust, Price Stress, Childcare &amp; Transportation Detail</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Wave 2506 introduced several new topic modules analyzed on How Is America:
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <strong>Institutional Trust:</strong> TRUST1 measures overall government trust. TRUST2_1 through
                TRUST2_9 measure confidence in 9 specific institutions (Congress, Supreme Court, President, military,
                police, media, public schools, banks, medical scientists). Additional variables capture trust in
                federal statistics. All coded on Likert scales; -99 and -88 excluded as missing.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <strong>Price Stress:</strong> PRICECHNG captures perceived price direction (increased/same/decreased).
                PRICESTRESS measures stress level among those perceiving increases. PRICECONCRN measures overall
                concern about rising prices. All weighted by PWEIGHT.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <strong>Childcare:</strong> CHILDCARE asks whether childcare was disrupted in the past 4 weeks
                (among households with children). CHILDCARE_RSLT1 through CHILDCARE_RSLT9 capture consequences
                (cut hours, unpaid leave, left job, supervised while working, etc.). -99 and -88 excluded.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <strong>Transportation Detail:</strong> TRANSPORT1 through TRANSPORT12 capture modes used
                (personal vehicle, bus, rail, rideshare, walk, bike, etc.). ACCESS_TRANSP measures adequacy
                of available transportation. NEEDS_TRANSP1 through NEEDS_TRANSP7 capture reasons for unmet
                needs (cost, safety, availability, disability). All use PWEIGHT for weighted estimates.
              </span>
            </li>
          </ul>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Further Reading</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <a
                  href="https://www.census.gov/programs-surveys/htops.html"
                  className="text-[--primary] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Census Bureau HTOPS Program Page
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <a
                  href="https://www.census.gov/programs-surveys/htops/technical-documentation.html"
                  className="text-[--primary] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  HTOPS Technical Documentation
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <a
                  href="https://www.census.gov/programs-surveys/htops/datasets.html"
                  className="text-[--primary] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  HTOPS Public Use Files (PUF)
                </a>
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
