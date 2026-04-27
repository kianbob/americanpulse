import fs from 'fs';
import path from 'path';
import RegionCard from '../components/RegionCard';
import DataTable from '../components/DataTable';

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

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

export default function RegionsPage() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public/data/region-stats.json'), 'utf-8');
  const regions: Record<string, RegionData> = JSON.parse(raw);

  const entries = Object.entries(regions);

  const tableRows = entries.map(([name, r]) => ({
    name,
    states: r.states.join(', '),
    aiUsage: r.aiUsage,
    foodInsufficient: r.foodInsufficient,
    employed: r.employed,
    uninsured: r.uninsured,
    rentBehind: r.rentBehind,
    n: r.n,
  }));

  const columns = [
    { key: 'name', label: 'Region' },
    { key: 'aiUsage', label: 'AI Usage', suffix: '%' },
    { key: 'foodInsufficient', label: 'Food Insecure', suffix: '%' },
    { key: 'employed', label: 'Employed', suffix: '%' },
    { key: 'uninsured', label: 'Uninsured', suffix: '%' },
    { key: 'rentBehind', label: 'Rent Behind', suffix: '%' },
    { key: 'n', label: 'Sample Size' },
  ];

  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Regions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore metrics across all 9 U.S. Census divisions.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Region Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map(([name, r]) => (
            <RegionCard
              key={name}
              name={name}
              slug={toSlug(name)}
              states={r.states}
              aiUsage={r.aiUsage}
              foodInsufficient={r.foodInsufficient}
              employed={r.employed}
              uninsured={r.uninsured}
              rentBehind={r.rentBehind}
            />
          ))}
        </div>

        {/* Comparison Table */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Regional Comparison</h2>
          <DataTable columns={columns} rows={tableRows} />
        </section>
      </div>
    </div>
  );
}
