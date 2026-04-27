export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-sm text-gray-500">
          <p className="font-medium text-gray-700 mb-1">American Pulse</p>
          <p>
            Data from the{' '}
            <a
              href="https://www.census.gov/programs-surveys/household-pulse-survey.html"
              className="text-[--primary] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              U.S. Census Bureau Household Trends and Outlook Pulse Survey (HTOPS)
            </a>
          </p>
          <p className="mt-1">Wave 2506 &middot; Weighted estimates using PWEIGHT</p>
        </div>
      </div>
    </footer>
  );
}
