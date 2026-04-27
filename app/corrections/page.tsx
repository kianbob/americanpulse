import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Corrections',
  description: 'Corrections and clarifications to How Is America content.',
};

export default function CorrectionsPage() {
  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Corrections</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We take accuracy seriously. When we get something wrong, we fix it and document it here.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Data Correction</span>
            <span className="text-sm text-gray-500">April 27, 2026</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">AI income comparison overstated</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            <strong>Original claim:</strong> &quot;Americans making $200K+ are 3× more likely to use AI than those making $25K or less.&quot;
          </p>
          <p className="text-gray-700 leading-relaxed mb-3">
            <strong>Correction:</strong> The actual ratio is 1.33× ($150K+: 25.08% vs under $25K: 18.83%). The $200K+ bracket does not exist in HTOPS data — the top bracket is $150K+. Additionally, the $25K–$35K bracket uses AI at 29.28%, which is <em>higher</em> than the $150K+ bracket, revealing a U-shaped adoption pattern rather than a linear income divide.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Action taken:</strong> Updated the homepage callout, and rewrote the{' '}
            <Link href="/articles/ai-prosperity-gap" className="text-[--primary] hover:underline">
              AI Prosperity Gap article
            </Link>{' '}
            to reflect the corrected data and the more interesting U-shaped adoption story.
          </p>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">Clarification</span>
            <span className="text-sm text-gray-500">April 27, 2026</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">AI usage percentage: 27% vs 24%</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            <strong>Issue:</strong> The site displayed &quot;27% use AI&quot; in some places and &quot;24.07%&quot; in others.
          </p>
          <p className="text-gray-700 leading-relaxed mb-3">
            <strong>Clarification:</strong> 24.07% is the weighted estimate from HTOPS data. The 27% figure came from Pew Research comparisons. We now use 24% consistently as the HTOPS number across the site. The 27% Pew figure is cited only when specifically referencing Pew data.
          </p>
        </section>

        <section className="bg-gray-50 rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Report an Error</h2>
          <p className="text-gray-700 leading-relaxed">
            If you spot an error in our data, analysis, or content, please contact us at{' '}
            <a href="mailto:corrections@howisamerica.com" className="text-[--primary] hover:underline">
              corrections@howisamerica.com
            </a>{' '}
            or via{' '}
            <a href="https://thedataproject.ai" className="text-[--primary] hover:underline" target="_blank" rel="noopener noreferrer">
              TheDataProject.ai
            </a>.
            We appreciate corrections and will update the site promptly.
          </p>
        </section>
      </div>
    </div>
  );
}
