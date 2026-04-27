import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — How Is America',
  description: 'About the How Is America project, data methodology, Census divisions, and privacy policy.',
};

export default function AboutPage() {
  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">About This Project</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Understanding the data behind How Is America.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* What is How Is America */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What Is How Is America?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            How Is America is a free, open data visualization platform that makes U.S. Census Bureau data accessible and understandable. We transform raw survey data into interactive charts, maps, and analysis covering AI adoption, food security, housing affordability, employment, health insurance, and spending across America.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our goal is to answer one question: <strong>How is America really doing?</strong> By combining data from multiple federal sources, we provide a comprehensive, data-driven picture of American life in 2026.
          </p>
        </section>

        {/* Data Sources */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Data Sources</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            How Is America draws on multiple official government data sources:
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold shrink-0">&#8226;</span>
              <span><strong>U.S. Census Bureau Household Pulse Survey (HTOPS)</strong> — primary source, March 2026</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold shrink-0">&#8226;</span>
              <span><strong>CDC PLACES</strong> — Local health indicators and chronic disease prevalence</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold shrink-0">&#8226;</span>
              <span><strong>Census ACS</strong> — American Community Survey demographic and economic profiles</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold shrink-0">&#8226;</span>
              <span><strong>USDA ERS</strong> — Economic Research Service food security data</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold shrink-0">&#8226;</span>
              <span><strong>BLS</strong> — Bureau of Labor Statistics employment and unemployment data</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold shrink-0">&#8226;</span>
              <span><strong>FRED</strong> — Federal Reserve Economic Data on housing and economic indicators</span>
            </li>
          </ul>
        </section>

        {/* Methodology */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Methodology</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span><strong>Sample Size:</strong> 7,485 respondents</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span><strong>Weighting:</strong> All percentages use PWEIGHT (person-level weights) to produce nationally representative estimates</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span><strong>Geography:</strong> Regional data is at the Census Division level (9 divisions). The public-use file does not include state-level identifiers</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[--primary] font-bold">&#8226;</span>
              <span><strong>Multi-select questions:</strong> For topics like AI tools, purposes, concerns, transportation modes, and insurance types, respondents could select multiple options</span>
            </li>
          </ul>
          <div className="mt-4">
            <Link href="/methodology" className="text-[--primary] hover:underline text-sm font-medium">
              View full methodology &rarr;
            </Link>
          </div>
        </section>

        {/* Census Divisions */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Census Divisions</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
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

        {/* Who Built This */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Who Built This</h2>
          <p className="text-gray-700 leading-relaxed">
            Built by Kian O Connor as part of{' '}
            <a
              href="https://thedataproject.ai"
              className="text-[--primary] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              TheDataProject.ai
            </a>
            {' '}&mdash; a portfolio of 60+ data-driven websites making government and public data accessible to everyone.
          </p>
        </section>

        {/* AI Disclosure */}
        <section className="bg-blue-50 rounded-xl border border-blue-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">AI Disclosure</h2>
          <p className="text-gray-700 leading-relaxed">
            This site uses AI-assisted content generation and data analysis. All statistics are derived from official government data sources. AI tools were used to help process raw data, generate analysis text, and build interactive visualizations. The underlying data is always sourced from the U.S. Census Bureau and other federal agencies listed above.
          </p>
        </section>

        {/* Attribution */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Attribution</h2>
          <p className="text-gray-700 leading-relaxed">
            This project is an independent analysis of publicly available Census data.
            It is not affiliated with or endorsed by the U.S. Census Bureau. Data
            is sourced from the HTOPS Public Use File (PUF).
          </p>
        </section>

        {/* Privacy */}
        <section id="privacy" className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Privacy Policy</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              How Is America is a static data visualization website. We are committed to protecting your privacy.
            </p>
            <p>
              <strong>Data Collection:</strong> This website does not collect personal information from visitors.
              We do not use cookies for tracking, and we do not require account creation or login.
            </p>
            <p>
              <strong>Analytics:</strong> This site may use basic analytics (via the hosting platform, Vercel) to understand
              aggregate traffic patterns such as page views and visitor counts. No personally identifiable information is collected.
            </p>
            <p>
              <strong>Third-Party Links:</strong> This site contains links to external websites (Census Bureau, sister sites).
              We are not responsible for the privacy practices of those sites.
            </p>
            <p>
              <strong>Data Downloads:</strong> The data files available for download on this site are derived from
              publicly available U.S. Census Bureau data and contain no personal information about individual respondents.
            </p>
            <p>
              <strong>Contact:</strong> For questions about this privacy policy or the data presented on this site,
              please visit{' '}
              <a
                href="https://thedataproject.ai"
                className="text-[--primary] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                TheDataProject.ai
              </a>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
