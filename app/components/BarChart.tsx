interface BarItem {
  label: string;
  value: number;
  displayValue?: string;
}

interface BarChartProps {
  items: BarItem[];
  maxValue?: number;
  color?: string;
}

export default function BarChart({ items, maxValue, color = '#2563eb' }: BarChartProps) {
  const max = maxValue ?? Math.max(...items.map((i) => i.value));

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.label}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-700">{item.label}</span>
            <span className="font-medium text-gray-900">{item.displayValue ?? `${item.value}%`}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all"
              style={{
                width: `${Math.max((item.value / max) * 100, 2)}%`,
                backgroundColor: color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
