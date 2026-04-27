import Link from 'next/link';
import { articles } from './data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Analysis Articles — American Pulse',
  description: 'Data-driven analysis articles based on the 2026 Census HTOPS survey, covering AI adoption, food insecurity, housing burden, and more.',
};

const topicColors: Record<string, string> = {
  AI: 'bg-blue-100 text-blue-700',
  Food: 'bg-amber-100 text-amber-700',
  Housing: 'bg-red-100 text-red-700',
  Demographics: 'bg-purple-100 text-purple-700',
  Overview: 'bg-emerald-100 text-emerald-700',
};

export default function ArticlesPage() {
  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Analysis</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Data-driven articles exploring what the Census HTOPS pulse survey reveals about American life in 2026.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="block bg-white rounded-xl border border-gray-200 p-6 hover:border-[--primary] hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${topicColors[article.topic] ?? 'bg-gray-100 text-gray-700'}`}>
                {article.topic}
              </span>
              <span className="text-xs text-gray-500">{article.date}</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[--primary]">{article.title}</h2>
            <p className="text-gray-600 text-sm">{article.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
