import Link from 'next/link';

const sisterSites = [
  { name: 'TheDataProject.ai', href: 'https://thedataproject.ai' },
  { name: 'theailobby.com', href: 'https://theailobby.com' },
  { name: 'aiexposure.org', href: 'https://aiexposure.org' },
  { name: 'nationalhealthratings.com', href: 'https://nationalhealthratings.com' },
  { name: 'drivedata.org', href: 'https://drivedata.org' },
  { name: 'foodinsider.org', href: 'https://foodinsider.org' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="text-xl font-bold text-white mb-3">American Pulse</div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Data from the U.S. Census Bureau Household Trends and Outlook Pulse Survey (HTOPS), March 2026. Wave 2506 &middot; Weighted estimates using PWEIGHT.
            </p>
            <div className="mt-4">
              <Link href="/about#privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Site Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Explore</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/ai" className="text-sm text-gray-400 hover:text-white transition-colors">AI Usage</Link>
              <Link href="/food" className="text-sm text-gray-400 hover:text-white transition-colors">Food Security</Link>
              <Link href="/housing" className="text-sm text-gray-400 hover:text-white transition-colors">Housing</Link>
              <Link href="/employment" className="text-sm text-gray-400 hover:text-white transition-colors">Employment</Link>
              <Link href="/regions" className="text-sm text-gray-400 hover:text-white transition-colors">Regions</Link>
              <Link href="/compare" className="text-sm text-gray-400 hover:text-white transition-colors">Compare</Link>
              <Link href="/articles" className="text-sm text-gray-400 hover:text-white transition-colors">Articles</Link>
              <Link href="/downloads" className="text-sm text-gray-400 hover:text-white transition-colors">Downloads</Link>
            </div>
          </div>

          {/* Sister Sites */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Sister Sites</h3>
            <div className="space-y-2">
              {sisterSites.map((site) => (
                <a
                  key={site.href}
                  href={site.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {site.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-xs text-gray-500">
            This project is an independent analysis of publicly available Census data. Not affiliated with or endorsed by the U.S. Census Bureau.
          </p>
        </div>
      </div>
    </footer>
  );
}
