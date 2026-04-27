import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.howisamerica.com';

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
    'ai-prosperity-gap',
    'americas-squeeze-expenses',
    'covid-recovery-six-years',
    'zip-code-determines-wellbeing',
    'uninsured-2026',
  ];

  const staticPages = [
    { url: base, changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${base}/ai`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${base}/food`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/housing`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/employment`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/health`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/health/places`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/demographics`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/demographics/age`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/demographics/race`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/demographics/education`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/income`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/inequality`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/history`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/calculator`, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${base}/spending`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/transportation`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/regions`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/compare`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/wellbeing`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/squeeze`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/metro-rural`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/articles`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${base}/updates`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${base}/downloads`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${base}/methodology`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${base}/about`, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${base}/trends`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/ai-usage-statistics`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/food-insecurity-by-state`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/housing-cost-burden`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/cost-of-living-by-state`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/embed/ai-usage`, changeFrequency: 'monthly' as const, priority: 0.4 },
    { url: `${base}/embed/food-map`, changeFrequency: 'monthly' as const, priority: 0.4 },
    { url: `${base}/embed/wellbeing`, changeFrequency: 'monthly' as const, priority: 0.4 },
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

  const costOfLivingPages = stateSlugs.map((slug) => ({
    url: `${base}/cost-of-living/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const affordabilityPages = stateSlugs.map((slug) => ({
    url: `${base}/is-it-affordable/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...regionPages, ...statePages, ...articlePages, ...costOfLivingPages, ...affordabilityPages];
}
