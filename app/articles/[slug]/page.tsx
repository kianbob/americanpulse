import Link from 'next/link';
import { articles } from '../data';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: 'Article Not Found' };
  return {
    title: `${article.title} | American Pulse`,
    description: article.description,
  };
}

function renderMarkdown(content: string) {
  // Simple markdown renderer for article content
  const lines = content.split('\n');
  const elements: { type: string; content: string; key: number }[] = [];
  let key = 0;

  for (const line of lines) {
    if (line.startsWith('## ')) {
      elements.push({ type: 'h2', content: line.slice(3), key: key++ });
    } else if (line.trim() === '') {
      elements.push({ type: 'br', content: '', key: key++ });
    } else {
      elements.push({ type: 'p', content: line, key: key++ });
    }
  }

  return elements;
}

function renderInlineMarkdown(text: string) {
  // Handle bold, italic, links
  const parts: (string | { type: string; href?: string; text: string })[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    // Links: [text](url)
    const linkMatch = remaining.match(/^([\s\S]*?)\[([^\]]+)\]\(([^)]+)\)([\s\S]*)/);
    if (linkMatch) {
      if (linkMatch[1]) parts.push(linkMatch[1]);
      parts.push({ type: 'link', href: linkMatch[3], text: linkMatch[2] });
      remaining = linkMatch[4];
      continue;
    }
    // Bold: **text**
    const boldMatch = remaining.match(/^([\s\S]*?)\*\*([^*]+)\*\*([\s\S]*)/);
    if (boldMatch) {
      if (boldMatch[1]) parts.push(boldMatch[1]);
      parts.push({ type: 'bold', text: boldMatch[2] });
      remaining = boldMatch[3];
      continue;
    }
    // Italic: *text*
    const italicMatch = remaining.match(/^([\s\S]*?)\*([^*]+)\*([\s\S]*)/);
    if (italicMatch) {
      if (italicMatch[1]) parts.push(italicMatch[1]);
      parts.push({ type: 'italic', text: italicMatch[2] });
      remaining = italicMatch[3];
      continue;
    }
    parts.push(remaining);
    break;
  }

  return parts.map((part, i) => {
    if (typeof part === 'string') return <span key={i}>{part}</span>;
    if (part.type === 'link') {
      const isExternal = part.href?.startsWith('http');
      if (isExternal) {
        return <a key={i} href={part.href} target="_blank" rel="noopener noreferrer" className="text-[--primary] hover:underline">{part.text}</a>;
      }
      return <Link key={i} href={part.href ?? ''} className="text-[--primary] hover:underline">{part.text}</Link>;
    }
    if (part.type === 'bold') return <strong key={i} className="font-semibold">{part.text}</strong>;
    if (part.type === 'italic') return <em key={i}>{part.text}</em>;
    return null;
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Article not found</h1>
        <Link href="/articles" className="text-[--primary] hover:underline mt-4 inline-block">Back to Articles</Link>
      </div>
    );
  }

  const rendered = renderMarkdown(article.content);

  return (
    <div>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/articles" className="text-[--primary] hover:underline text-sm mb-6 inline-block print:hidden">
          &larr; All Articles
        </Link>
        <header className="mb-8">
          <div className="text-sm text-gray-500 mb-2">{article.date} &middot; {article.topic}</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{article.title}</h1>
          <p className="text-lg text-gray-600">{article.description}</p>
        </header>

        <div className="prose-custom space-y-4">
          {rendered.map((el) => {
            if (el.type === 'h2') {
              return <h2 key={el.key} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{el.content}</h2>;
            }
            if (el.type === 'br') {
              return <div key={el.key} className="h-2" />;
            }
            return (
              <p key={el.key} className="text-gray-700 leading-relaxed">
                {renderInlineMarkdown(el.content)}
              </p>
            );
          })}
        </div>

        <footer className="mt-12 pt-8 border-t border-gray-200 print:hidden">
          <p className="text-sm text-gray-500 mb-4">
            Data from U.S. Census Bureau Household Trends and Outlook Pulse Survey (HTOPS), March 2026.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/articles" className="text-[--primary] hover:underline text-sm font-medium">More Articles &rarr;</Link>
            <Link href="/downloads" className="text-[--primary] hover:underline text-sm font-medium">Download Data &rarr;</Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
