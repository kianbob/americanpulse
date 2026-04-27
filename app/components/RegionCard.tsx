import Link from 'next/link';

interface RegionCardProps {
  name: string;
  slug: string;
  states: string[];
  aiUsage: number;
  foodInsufficient: number;
  employed: number;
  uninsured: number;
  rentBehind: number;
}

export default function RegionCard({
  name,
  slug,
  states,
  aiUsage,
  foodInsufficient,
  employed,
  uninsured,
  rentBehind,
}: RegionCardProps) {
  return (
    <Link
      href={`/regions/${slug}`}
      className="block bg-white rounded-xl border border-gray-200 p-6 hover:border-[--primary] hover:shadow-md transition-all"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
      <p className="text-xs text-gray-500 mb-4">{states.join(', ')}</p>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="text-gray-500">AI Usage</span>
          <span className="block font-semibold text-[--primary]">{aiUsage}%</span>
        </div>
        <div>
          <span className="text-gray-500">Employed</span>
          <span className="block font-semibold text-emerald-600">{employed}%</span>
        </div>
        <div>
          <span className="text-gray-500">Food Insecure</span>
          <span className="block font-semibold text-amber-600">{foodInsufficient}%</span>
        </div>
        <div>
          <span className="text-gray-500">Rent Behind</span>
          <span className="block font-semibold text-red-600">{rentBehind}%</span>
        </div>
        <div>
          <span className="text-gray-500">Uninsured</span>
          <span className="block font-semibold text-purple-600">{uninsured}%</span>
        </div>
      </div>
    </Link>
  );
}
