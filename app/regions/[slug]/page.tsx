import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import StatCard from '../../components/StatCard';
import BarChart from '../../components/BarChart';

interface RegionData {
  states: string[];
  n: number;
  aiUsage: number;
  foodInsufficient: number;
  expenseDifficult: number;
  employed: number;
  uninsured: number;
  rentBehind: number;
}

interface NationalStats {
  headlines: {
    aiUsagePct: number;
    foodInsufficientPct: number;
    housingBurden: { rentBehindPct: number };
    uninsuredPct: number;
    employedPct: number;
    expenseDifficultyPct: number;
  };
}

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

function fromSlug(slug: string, regions: Record<string, RegionData>): [string, RegionData] | null {
  for (const [name, data] of Object.entries(regions)) {
    if (toSlug(name) === slug) return [name, data];
  }
  return null;
}

export async function generateStaticParams() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/region-stats.json'), 'utf-8');
  const regions: Record<string, RegionData> = JSON.parse(raw);
  return Object.keys(regions).map((name) => ({ slug: toSlug(name) }));
}

export default async function RegionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const regionRaw = fs.readFileSync(path.join(process.cwd(), 'public/data/region-stats.json'), 'utf-8');
  const regions: Record<string, RegionData> = JSON.parse(regionRaw);

  const nationalRaw = fs.readFileSync(path.join(process.cwd(), 'public/data/national-stats.json'), 'utf-8');
  const national: NationalStats = JSON.parse(nationalRaw);

  const result = fromSlug(slug, regions);
  if (!result) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Region not found</h1>
        <Link href="/regions" className="text-[--primary] hover:underline mt-4 inline-block">
          Back to Regions
        </Link>
      </div>
    );
  }

  const [name, region] = result;
  const nh = national.headlines;

  const comparisons = [
    { label: 'AI Usage', regional: region.aiUsage, national: nh.aiUsagePct, color: '#2563eb', unit: '%' },
    { label: 'Food Insecure', regional: region.foodInsufficient, national: nh.foodInsufficientPct, color: '#d97706', unit: '%' },
    { label: 'Employed', regional: region.employed, national: nh.employedPct, color: '#059669', unit: '%' },
    { label: 'Uninsured', regional: region.uninsured, national: nh.uninsuredPct, color: '#7c3aed', unit: '%' },
    { label: 'Rent Behind', regional: region.rentBehind, national: nh.housingBurden.rentBehindPct, color: '#dc2626', unit: '%' },
  ];

  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link href="/regions" className="text-[--primary] hover:underline text-sm mb-4 inline-block">
            &larr; All Regions
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">{name}</h1>
          <p className="text-lg text-gray-600">
            {region.states.join(', ')} &middot; Sample size: {region.n.toLocaleString()}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard value={`${region.aiUsage}%`} label="AI Usage" color="#2563eb" />
          <StatCard value={`${region.foodInsufficient}%`} label="Food Insecure" color="#d97706" />
          <StatCard value={`${region.employed}%`} label="Employed" color="#059669" />
          <StatCard value={`${region.uninsured}%`} label="Uninsured" color="#7c3aed" />
          <StatCard value={`${region.rentBehind}%`} label="Rent Behind" color="#dc2626" />
        </div>

        {/* Comparison to national */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Compared to National Average</h2>
          <div className="space-y-6">
            {comparisons.map((c) => {
              const diff = c.regional - c.national;
              const diffStr = diff > 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1);
              return (
                <div key={c.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-900">{c.label}</span>
                    <span className="text-gray-500">
                      {c.regional}{c.unit} vs {c.national}{c.unit} national ({diffStr})
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-1">{name}</div>
                      <div className="w-full bg-gray-100 rounded-full h-3">
                        <div
                          className="h-3 rounded-full"
                          style={{
                            width: `${Math.min((c.regional / Math.max(c.regional, c.national, 1)) * 100, 100)}%`,
                            backgroundColor: c.color,
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-1">National</div>
                      <div className="w-full bg-gray-100 rounded-full h-3">
                        <div
                          className="h-3 rounded-full opacity-50"
                          style={{
                            width: `${Math.min((c.national / Math.max(c.regional, c.national, 1)) * 100, 100)}%`,
                            backgroundColor: c.color,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* All regions comparison for context */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">AI Usage Across All Regions</h2>
          <BarChart
            items={Object.entries(regions)
              .sort((a, b) => b[1].aiUsage - a[1].aiUsage)
              .map(([rName, r]) => ({
                label: rName === name ? `${rName} ★` : rName,
                value: r.aiUsage,
              }))}
            maxValue={40}
            color="#2563eb"
          />
        </section>
      </div>
    </div>
  );
}
