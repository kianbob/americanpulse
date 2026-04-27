import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://americanpulse-app.vercel.app';

  const regionRaw = fs.readFileSync(path.join(process.cwd(), 'public/data/region-stats.json'), 'utf-8');
  const regions: Record<string, unknown> = JSON.parse(regionRaw);
  const regionSlugs = Object.keys(regions).map((n) => n.toLowerCase().replace(/\s+/g, '-'));

  const statesRaw = fs.readFileSync(path.join(process.cwd(), 'public/data/states-data.json'), 'utf-8');
  const statesData: { states: Record<string, unknown> } = JSON.parse(statesRaw);
  const stateSlugs = Object.keys(statesData.states);

  const articleSlugs = [
    'ai-adoption-census-2026',
    'food-insecurity-map-2026',
    'housing-burden-by-state-2026',
    'metro-vs-rural-2026',
    'census-pulse-survey-2026',
  ];

  const staticPages = [
    { url: base, changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${base}/ai`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${base}/food`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/housing`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/employment`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/health`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/spending`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/transportation`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/regions`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/compare`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/articles`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${base}/downloads`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${base}/about`, changeFrequency: 'monthly' as const, priority: 0.5 },
  ];

  const regionPages = regionSlugs.map((slug) => ({
    url: `${base}/regions/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const articlePages = articleSlugs.map((slug) => ({
    url: `${base}/articles/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const statePages = stateSlugs.map((slug) => ({
    url: `${base}/states/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...regionPages, ...statePages, ...articlePages];
}
