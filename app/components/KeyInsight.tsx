export default function KeyInsight({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 rounded-r-lg p-6">
        <div className="flex items-start gap-3">
          <span className="text-lg font-semibold text-emerald-700 whitespace-nowrap">✨ Key Insight</span>
        </div>
        <p className="mt-2 text-gray-700 leading-relaxed">{children}</p>
      </div>
    </div>
  );
}
