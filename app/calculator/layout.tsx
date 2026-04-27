import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Are You Doing? Calculator — American Pulse',
  description: 'Compare your situation to the national average. Answer questions about income, housing, food security, and more to see where you stand among Americans.',
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
