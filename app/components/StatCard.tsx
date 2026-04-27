interface StatCardProps {
  value: string;
  label: string;
  color?: string;
}

export default function StatCard({ value, label, color = '#2563eb' }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
      <div className="text-3xl font-bold mb-1" style={{ color }}>
        {value}
      </div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}
