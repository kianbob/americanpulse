'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

interface NavItem {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
}

const navItems: NavItem[] = [
  { href: '/', label: 'Home' },
  {
    href: '#',
    label: 'Data',
    children: [
      { href: '/ai', label: 'AI' },
      { href: '/food', label: 'Food' },
      { href: '/housing', label: 'Housing' },
      { href: '/employment', label: 'Jobs' },
      { href: '/health', label: 'Health' },
      { href: '/spending', label: 'Spending' },
      { href: '/transportation', label: 'Transport' },
      { href: '/trust', label: 'Trust' },
      { href: '/prices', label: 'Prices' },
      { href: '/childcare', label: 'Childcare' },
    ],
  },
  { href: '/states', label: 'States' },
  {
    href: '#',
    label: 'Analysis',
    children: [
      { href: '/articles', label: 'Articles' },
      { href: '/history', label: 'History' },
      { href: '/inequality', label: 'Inequality' },
      { href: '/demographics', label: 'Demographics' },
    ],
  },
  {
    href: '#',
    label: 'Tools',
    children: [
      { href: '/calculator', label: 'Calculator' },
      { href: '/compare', label: 'Compare' },
      { href: '/wellbeing', label: 'Wellbeing' },
      { href: '/squeeze', label: 'Squeeze' },
      { href: '/embed/ai-usage', label: 'Embeds' },
    ],
  },
  { href: '/about', label: 'About' },
];

function DesktopDropdown({ item, isActive }: { item: NavItem; isActive: (href: string) => boolean }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const hasActiveChild = item.children?.some((c) => isActive(c.href));

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors inline-flex items-center gap-1 ${
          hasActiveChild
            ? 'bg-[--primary-light] text-[--primary]'
            : 'text-gray-600 hover:text-[--primary] hover:bg-gray-50'
        }`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {item.label}
        <svg className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-lg border border-gray-200 shadow-lg py-1 z-50">
          {item.children!.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className={`block px-4 py-2 text-sm transition-colors ${
                isActive(child.href)
                  ? 'bg-[--primary-light] text-[--primary] font-medium'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-[--primary]'
              }`}
              onClick={() => setOpen(false)}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileAccordion({ item, isActive, onNav }: { item: NavItem; isActive: (href: string) => boolean; onNav: () => void }) {
  const [open, setOpen] = useState(false);
  const hasActiveChild = item.children?.some((c) => isActive(c.href));

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium ${
          hasActiveChild
            ? 'bg-[--primary-light] text-[--primary]'
            : 'text-gray-600 hover:text-[--primary] hover:bg-gray-50'
        }`}
      >
        {item.label}
        <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="ml-4 mt-1 space-y-1">
          {item.children!.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onNav}
              className={`block px-3 py-2 rounded-md text-sm ${
                isActive(child.href)
                  ? 'bg-[--primary-light] text-[--primary] font-medium'
                  : 'text-gray-600 hover:text-[--primary] hover:bg-gray-50'
              }`}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
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
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) =>
              item.children ? (
                <DesktopDropdown key={item.label} item={item} isActive={isActive} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-[--primary-light] text-[--primary]'
                      : 'text-gray-600 hover:text-[--primary] hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) =>
              item.children ? (
                <MobileAccordion key={item.label} item={item} isActive={isActive} onNav={() => setMobileOpen(false)} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(item.href)
                      ? 'bg-[--primary-light] text-[--primary]'
                      : 'text-gray-600 hover:text-[--primary] hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
