import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — American Pulse',
  description: 'About the American Pulse project, data methodology, Census divisions, and privacy policy.',
};

export default function AboutPage() {
  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">About This Project</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Understanding the data behind American Pulse.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Data Source</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            All data on this site comes from the{' '}
            <a
              href="https://www.census.gov/programs-surveys/household-pulse-survey.html"
              className="text-[--primary] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              U.S. Census Bureau Household Trends and Outlook Pulse Survey (HTOPS)
            </a>
            , Wave 2506.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The HTOPS is a rapid-response survey designed to measure how emerging
            social and economic issues are impacting American households. It covers
            topics including AI usage, food security, housing, employment, health
            insurance, spending, and transportation.
          </p>
        </section>

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
        </section>

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

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Attribution</h2>
          <p className="text-gray-700 leading-relaxed">
            This project is an independent analysis of publicly available Census data.
            It is not affiliated with or endorsed by the U.S. Census Bureau. Data
            is sourced from the HTOPS Public Use File (PUF).
          </p>
        </section>

        <section id="privacy" className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Privacy Policy</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              American Pulse is a static data visualization website. We are committed to protecting your privacy.
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
              please reach out via the project repository.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
