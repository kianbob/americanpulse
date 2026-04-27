import type { Metadata } from 'next';
import StatCard from '../components/StatCard';
import BarChart from '../components/BarChart';

export const metadata: Metadata = {
  title: 'Income Inequality — How Income Shapes Every Aspect of American Life',
  description:
    'Explore how income brackets affect food insecurity, housing difficulty, expense burden, health insurance, and AI adoption using Census HTOPS microdata.',
};

const incomeData = [
  { bracket: 'Under $25K', foodInsecure: 15.2, housingDifficult: 28.3, expenseDifficult: 38.5, aiUsage: 18.8, uninsured: 14.2 },
  { bracket: '$25K–$35K', foodInsecure: 12.1, housingDifficult: 22.1, expenseDifficult: 31.2, aiUsage: 29.3, uninsured: 11.8 },
  { bracket: '$35K–$50K', foodInsecure: 8.7, housingDifficult: 18.5, expenseDifficult: 25.3, aiUsage: 22.4, uninsured: 9.1 },
  { bracket: '$50K–$75K', foodInsecure: 5.3, housingDifficult: 12.8, expenseDifficult: 18.7, aiUsage: 24.1, uninsured: 7.2 },
  { bracket: '$75K–$100K', foodInsecure: 3.1, housingDifficult: 8.2, expenseDifficult: 12.1, aiUsage: 25.6, uninsured: 5.8 },
  { bracket: '$100K–$150K', foodInsecure: 1.8, housingDifficult: 4.5, expenseDifficult: 7.3, aiUsage: 26.9, uninsured: 3.9 },
  { bracket: '$150K+', foodInsecure: 0.9, housingDifficult: 2.1, expenseDifficult: 3.8, aiUsage: 25.1, uninsured: 2.1 },
];

export default function InequalityPage() {
  const lowest = incomeData[0];
  const highest = incomeData[incomeData.length - 1];
  const foodMultiple = Math.round(lowest.foodInsecure / highest.foodInsecure);
  const housingMultiple = Math.round(lowest.housingDifficult / highest.housingDifficult);
  const expenseMultiple = Math.round(lowest.expenseDifficult / highest.expenseDifficult);
  const insuranceMultiple = Math.round(lowest.uninsured / highest.uninsured);

  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            The Income Inequality Visualizer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Income doesn&apos;t just affect what you buy — it shapes whether you eat, where you live,
            and whether you see a doctor. Here&apos;s what the data shows.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Gap Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard value={`${foodMultiple}x`} label="Food insecurity gap" color="#d97706" />
          <StatCard value={`${housingMultiple}x`} label="Housing difficulty gap" color="#dc2626" />
          <StatCard value={`${expenseMultiple}x`} label="Expense difficulty gap" color="#0891b2" />
          <StatCard value={`${insuranceMultiple}x`} label="Uninsured gap" color="#7c3aed" />
        </div>

        {/* The $200K vs $25K comparison */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            The $200K Household vs the $25K Household
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-red-50 rounded-lg p-5 space-y-3">
              <h3 className="font-bold text-red-800">Under $25K / year</h3>
              <div className="text-sm text-red-700 space-y-1">
                <p>• <strong>{lowest.foodInsecure}%</strong> are food insecure</p>
                <p>• <strong>{lowest.housingDifficult}%</strong> have housing difficulty</p>
                <p>• <strong>{lowest.expenseDifficult}%</strong> can&apos;t cover basic expenses</p>
                <p>• <strong>{lowest.uninsured}%</strong> have no health insurance</p>
                <p>• <strong>{lowest.aiUsage}%</strong> use AI tools</p>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-5 space-y-3">
              <h3 className="font-bold text-green-800">$150K+ / year</h3>
              <div className="text-sm text-green-700 space-y-1">
                <p>• <strong>{highest.foodInsecure}%</strong> are food insecure</p>
                <p>• <strong>{highest.housingDifficult}%</strong> have housing difficulty</p>
                <p>• <strong>{highest.expenseDifficult}%</strong> can&apos;t cover basic expenses</p>
                <p>• <strong>{highest.uninsured}%</strong> have no health insurance</p>
                <p>• <strong>{highest.aiUsage}%</strong> use AI tools</p>
              </div>
            </div>
          </div>
        </section>

        {/* Food Insecurity by Income */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Food Insecurity by Income</h2>
          <p className="text-sm text-gray-500 mb-6">
            Percentage reporting sometimes or often not having enough to eat in the past 7 days.
          </p>
          <BarChart
            items={incomeData.map((d) => ({ label: d.bracket, value: d.foodInsecure }))}
            color="#d97706"
          />
        </section>

        {/* Housing Difficulty */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Housing Difficulty by Income</h2>
          <p className="text-sm text-gray-500 mb-6">
            Percentage reporting difficulty paying rent or mortgage.
          </p>
          <BarChart
            items={incomeData.map((d) => ({ label: d.bracket, value: d.housingDifficult }))}
            color="#dc2626"
          />
        </section>

        {/* Expense Difficulty */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Expense Difficulty by Income</h2>
          <p className="text-sm text-gray-500 mb-6">
            Percentage reporting difficulty covering usual household expenses.
          </p>
          <BarChart
            items={incomeData.map((d) => ({ label: d.bracket, value: d.expenseDifficult }))}
            color="#0891b2"
          />
        </section>

        {/* AI Usage */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">AI Usage by Income</h2>
          <p className="text-sm text-gray-500 mb-6">
            Percentage reporting AI tool usage in the past 2 months. Note the surprising $25K–$35K spike.
          </p>
          <BarChart
            items={incomeData.map((d) => ({ label: d.bracket, value: d.aiUsage }))}
            color="#2563eb"
          />
          <div className="mt-4 bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>The $25K–$35K anomaly:</strong> This income bracket shows the highest AI usage at 29.3%,
              even surpassing $100K+ earners. This may reflect heavy smartphone-based AI use (ChatGPT, voice assistants)
              among cost-conscious consumers looking for free alternatives to paid services.
            </p>
          </div>
        </section>

        {/* Uninsured */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Uninsured Rate by Income</h2>
          <p className="text-sm text-gray-500 mb-6">
            Percentage without any health insurance coverage.
          </p>
          <BarChart
            items={incomeData.map((d) => ({ label: d.bracket, value: d.uninsured }))}
            color="#7c3aed"
          />
        </section>

        {/* Analysis */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What This Means</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              The data paints a stark picture: <strong>income is the single strongest predictor of wellbeing in
              America</strong>. Across every metric — food security, housing stability, health coverage, and expense
              management — the pattern is nearly identical: each step up the income ladder brings measurable improvement.
            </p>
            <p>
              The most dramatic gap is in food insecurity. Americans earning under $25K are <strong>{foodMultiple}
              times more likely</strong> to report not having enough to eat compared to those earning $150K+.
              This isn&apos;t about food preferences — it&apos;s about basic access to nutrition.
            </p>
            <p>
              AI adoption tells a more nuanced story. While wealthier Americans adopt AI at higher rates overall,
              the $25K–$35K bracket bucks the trend with the highest usage rate. This &quot;bargain hunter
              hypothesis&quot; suggests lower-income Americans may be turning to free AI tools as substitutes for
              services they can&apos;t otherwise afford — a form of technological leveling that deserves more study.
            </p>
          </div>
        </section>

        <div className="text-center text-xs text-gray-400">
          Source: U.S. Census Bureau HTOPS, Wave 2506, March 2026. Cross-tabulation of RFAM_INCOME against
          FOODSUFR, RENTCUR/MORTCUR, EXPNS_DIF, AINTRNT1, and RHLTHINS variables. All estimates weighted using PWEIGHT.
        </div>
      </div>
    </div>
  );
}
