'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/ai', label: 'AI' },
  { href: '/food', label: 'Food' },
  { href: '/housing', label: 'Housing' },
  { href: '/employment', label: 'Jobs' },
  { href: '/health', label: 'Health' },
  { href: '/spending', label: 'Spending' },
  { href: '/transportation', label: 'Transport' },
  { href: '/regions', label: 'Regions' },
  { href: '/states', label: 'States' },
  { href: '/compare', label: 'Compare' },
  { href: '/articles', label: 'Articles' },
  { href: '/downloads', label: 'Downloads' },
  { href: '/about', label: 'About' },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold text-[--primary] shrink-0">
            American Pulse
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex gap-0.5">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-2.5 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(href)
                    ? 'bg-[--primary-light] text-[--primary]'
                    : 'text-gray-600 hover:text-[--primary] hover:bg-gray-50'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-2 space-y-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(href)
                    ? 'bg-[--primary-light] text-[--primary]'
                    : 'text-gray-600 hover:text-[--primary] hover:bg-gray-50'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
