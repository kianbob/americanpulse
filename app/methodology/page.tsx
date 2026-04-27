import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Methodology — Data Sources, Indexes & Limitations',
  description:
    'How American Pulse processes Census HTOPS data, computes the Wellbeing and Squeeze indexes, and supplements with USDA, BLS, and ACS/FRED data. Includes limitations and caveats.',
};

export default function MethodologyPage() {
  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Methodology</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            How we collect, process, and present the data behind American Pulse.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Primary Data Source: Census HTOPS</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The primary data source for American Pulse is the{' '}
            <a
              href="https://www.census.gov/programs-surveys/htops.html"
              className="text-[--primary] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              U.S. Census Bureau Household Trends and Outlook Pulse Survey (HTOPS)
            </a>
            . HTOPS is the successor to the Household Pulse Survey that ran during and after the COVID-19 pandemic.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            HTOPS is a rapid-response survey designed to measure how emerging social and economic issues
            are impacting American households. It covers a broad range of topics including AI usage,
            food security, housing, employment, health insurance, household spending, and transportation.
          </p>
          <p className="text-gray-700 leading-relaxed">
            American Pulse uses data from <strong>Wave 2506</strong>, collected in <strong>March 2026</strong>.
          </p>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Sample & Weighting</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span><strong>Sample size:</strong> ~7,500 respondents nationally</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <strong>Weighting:</strong> All percentages and estimates use <strong>PWEIGHT</strong> (person-level
                survey weights) provided by the Census Bureau to produce nationally representative estimates.
                PWEIGHT adjusts for nonresponse bias and calibrates the sample to population benchmarks.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span>
                <strong>Population:</strong> Adults aged 18+ in the civilian, non-institutionalized population
                of the United States.
              </span>
            </li>
          </ul>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Geographic Granularity</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The HTOPS Public Use File (PUF) identifies respondent geography at the <strong>Census Division</strong> level
            only — it does not include state-level identifiers. This means all regional analysis on American Pulse
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
          <h2 className="text-xl font-bold text-gray-900 mb-4">Wellbeing Index</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The <a href="/wellbeing" className="text-[--primary] hover:underline">American Wellbeing Index</a> is a
            composite 0–100 score computed for each Census division. It combines six HTOPS metrics, each
            normalized relative to the worst-performing division:
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
                  <td className="py-2 px-3">20%</td>
                  <td className="py-2 px-3 font-mono text-xs">(1 − foodInsufficient / max) × 100</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3">Housing Affordability</td>
                  <td className="py-2 px-3">20%</td>
                  <td className="py-2 px-3 font-mono text-xs">(1 − rentBehind / max) × 100</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3">Employment</td>
                  <td className="py-2 px-3">15%</td>
                  <td className="py-2 px-3 font-mono text-xs">(employed / max) × 100</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3">Expense Difficulty</td>
                  <td className="py-2 px-3">15%</td>
                  <td className="py-2 px-3 font-mono text-xs">(1 − expenseDifficult / max) × 100</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3">Health Insurance</td>
                  <td className="py-2 px-3">15%</td>
                  <td className="py-2 px-3 font-mono text-xs">(1 − uninsured / max) × 100</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">AI Adoption</td>
                  <td className="py-2 px-3">15%</td>
                  <td className="py-2 px-3 font-mono text-xs">(aiUsage / max) × 100</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-600 text-sm mt-4">
            The composite score is the weighted sum of all six dimension scores. The worst division on each
            dimension scores 0 for that dimension; all others score proportionally higher.
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
          <p className="text-gray-700 leading-relaxed mt-4">
            Each metric is normalized to 0–100 relative to the maximum across divisions, then the three
            normalized scores are averaged. The resulting squeeze score is converted to a letter grade:
          </p>
          <div className="grid grid-cols-5 gap-2 mt-4 text-center text-sm">
            <div className="bg-green-50 rounded-lg p-2">
              <div className="font-bold text-green-700">A</div>
              <div className="text-xs text-gray-600">0–20</div>
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
              <div className="text-xs text-gray-600">81–100</div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Supplemental Data Sources</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            American Pulse supplements HTOPS data with state-level data from three additional federal sources:
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
                American Pulse, not the Census Bureau. The choice of weights, normalization method, and
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
