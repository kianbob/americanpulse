import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compare Regions — How Is America',
  description: 'Compare Census divisions side-by-side across AI usage, food security, employment, housing, health, and spending metrics.',
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
