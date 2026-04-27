'use client';

import { useState } from 'react';
import KeyInsight from '../components/KeyInsight';

const stateAverages: Record<string, { name: string; avg: number }> = {
  alabama: { name: 'Alabama', avg: 58 }, alaska: { name: 'Alaska', avg: 62 }, arizona: { name: 'Arizona', avg: 60 },
  arkansas: { name: 'Arkansas', avg: 56 }, california: { name: 'California', avg: 63 }, colorado: { name: 'Colorado', avg: 66 },
  connecticut: { name: 'Connecticut', avg: 67 }, delaware: { name: 'Delaware', avg: 63 }, district_of_columbia: { name: 'District of Columbia', avg: 65 },
  florida: { name: 'Florida', avg: 61 }, georgia: { name: 'Georgia', avg: 59 }, hawaii: { name: 'Hawaii', avg: 64 },
  idaho: { name: 'Idaho', avg: 63 }, illinois: { name: 'Illinois', avg: 62 }, indiana: { name: 'Indiana', avg: 60 },
  iowa: { name: 'Iowa', avg: 64 }, kansas: { name: 'Kansas', avg: 63 }, kentucky: { name: 'Kentucky', avg: 57 },
  louisiana: { name: 'Louisiana', avg: 55 }, maine: { name: 'Maine', avg: 63 }, maryland: { name: 'Maryland', avg: 66 },
  massachusetts: { name: 'Massachusetts', avg: 68 }, michigan: { name: 'Michigan', avg: 60 }, minnesota: { name: 'Minnesota', avg: 67 },
  mississippi: { name: 'Mississippi', avg: 54 }, missouri: { name: 'Missouri', avg: 60 }, montana: { name: 'Montana', avg: 62 },
  nebraska: { name: 'Nebraska', avg: 65 }, nevada: { name: 'Nevada', avg: 59 }, new_hampshire: { name: 'New Hampshire', avg: 68 },
  new_jersey: { name: 'New Jersey', avg: 65 }, new_mexico: { name: 'New Mexico', avg: 56 }, new_york: { name: 'New York', avg: 62 },
  north_carolina: { name: 'North Carolina', avg: 60 }, north_dakota: { name: 'North Dakota', avg: 66 }, ohio: { name: 'Ohio', avg: 59 },
  oklahoma: { name: 'Oklahoma', avg: 57 }, oregon: { name: 'Oregon', avg: 63 }, pennsylvania: { name: 'Pennsylvania', avg: 62 },
  rhode_island: { name: 'Rhode Island', avg: 63 }, south_carolina: { name: 'South Carolina', avg: 58 }, south_dakota: { name: 'South Dakota', avg: 65 },
  tennessee: { name: 'Tennessee', avg: 58 }, texas: { name: 'Texas', avg: 60 }, utah: { name: 'Utah', avg: 67 },
  vermont: { name: 'Vermont', avg: 65 }, virginia: { name: 'Virginia', avg: 66 }, washington: { name: 'Washington', avg: 66 },
  west_virginia: { name: 'West Virginia', avg: 53 }, wisconsin: { name: 'Wisconsin', avg: 64 }, wyoming: { name: 'Wyoming', avg: 63 },
};

const NATIONAL_AVG = 62;

const incomeBrackets = [
  { label: 'Under $25,000', value: 'under25', midpoint: 15000, points: 2 },
  { label: '$25,000 – $34,999', value: '25_35', midpoint: 30000, points: 5 },
  { label: '$35,000 – $49,999', value: '35_50', midpoint: 42500, points: 8 },
  { label: '$50,000 – $74,999', value: '50_75', midpoint: 62500, points: 12 },
  { label: '$75,000 – $99,999', value: '75_100', midpoint: 87500, points: 15 },
  { label: '$100,000 – $149,999', value: '100_150', midpoint: 125000, points: 18 },
  { label: '$150,000 or more', value: '150_plus', midpoint: 200000, points: 20 },
];

function scoreColor(score: number): string {
  if (score < 40) return '#dc2626';
  if (score < 60) return '#ea580c';
  if (score < 80) return '#059669';
  return '#2563eb';
}

function scoreLabel(score: number): string {
  if (score < 30) return 'Struggling';
  if (score < 45) return 'Under Pressure';
  if (score < 60) return 'Getting By';
  if (score < 75) return 'Doing Well';
  return 'Thriving';
}

function percentile(score: number): number {
  // Rough percentile mapping (normal-ish distribution centered at 62)
  const z = (score - 62) / 15;
  const p = 50 + 50 * Math.tanh(z * 0.8);
  return Math.max(1, Math.min(99, Math.round(p)));
}

function GaugeChart({ score }: { score: number }) {
  const color = scoreColor(score);
  const radius = 90;
  const circumference = Math.PI * radius; // semicircle
  const progress = (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 220 130" className="w-64 h-auto">
        <path
          d="M 20 120 A 90 90 0 0 1 200 120"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={16}
          strokeLinecap="round"
        />
        <path
          d="M 20 120 A 90 90 0 0 1 200 120"
          fill="none"
          stroke={color}
          strokeWidth={16}
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference}`}
          className="transition-all duration-1000 ease-out"
        />
        <text x="110" y="105" textAnchor="middle" fontSize="42" fontWeight="bold" fill={color}>
          {score}
        </text>
        <text x="110" y="125" textAnchor="middle" fontSize="12" fill="#6b7280">
          out of 100
        </text>
      </svg>
      <div className="text-xl font-bold mt-2" style={{ color }}>
        {scoreLabel(score)}
      </div>
    </div>
  );
}

export default function CalculatorPage() {
  const [state, setState] = useState('');
  const [income, setIncome] = useState('');
  const [housingCost, setHousingCost] = useState(1500);
  const [employment, setEmployment] = useState('');
  const [food, setFood] = useState('');
  const [insured, setInsured] = useState('');
  const [ai, setAi] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const canCalculate = state && income && employment && food && insured && ai;

  function calculate() {
    let s = 0;

    // Employment: +15
    if (employment === 'employed') s += 15;
    else if (employment === 'retired') s += 10;
    else if (employment === 'student') s += 8;

    // Food: +20 to -15
    if (food === '1') s += 20;
    else if (food === '2') s += 10;
    else if (food === '3') s -= 5;
    else if (food === '4') s -= 15;

    // Insurance: +15
    if (insured === 'yes') s += 15;

    // Income: 0-20
    const bracket = incomeBrackets.find((b) => b.value === income);
    if (bracket) s += bracket.points;

    // Housing cost burden: <30% of income = +15, else -5
    if (bracket) {
      const ratio = (housingCost * 12) / bracket.midpoint;
      if (ratio < 0.3) s += 15;
      else if (ratio < 0.5) s += 5;
      else s -= 5;
    }

    // AI usage: +5
    if (ai === 'yes') s += 5;

    // Food secure bonus
    if (food === '1' || food === '2') s += 10;

    // Clamp 0-100
    const final = Math.max(0, Math.min(100, s));
    setScore(final);
  }

  function shareScore() {
    const text = `My How Is America Score is ${score}/100 — ${scoreLabel(score!)}! How is America really doing? Find out at www.howisamerica.com/calculator`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const stateData = state ? stateAverages[state] : null;
  const pctile = score !== null ? percentile(score) : 0;

  return (
    <div>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            How Are You Doing?
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take the How Is America quiz to calculate your personal Pulse Score and see how you compare
            to your state and the national average.
          </p>
        </div>
      </section>
      <KeyInsight>This isn&apos;t just a quiz — it&apos;s a mirror. See how your household compares to 7,485 Census respondents across income, housing, food security, employment, and AI usage. Your Pulse Score tells you where you stand in America.</KeyInsight>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Your Situation</h2>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">What state do you live in?</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white"
            >
              <option value="">Select a state...</option>
              {Object.entries(stateAverages)
                .sort((a, b) => a[1].name.localeCompare(b[1].name))
                .map(([key, s]) => (
                  <option key={key} value={key}>{s.name}</option>
                ))}
            </select>
          </div>

          {/* Income */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Household income</label>
            <select
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white"
            >
              <option value="">Select income range...</option>
              {incomeBrackets.map((b) => (
                <option key={b.value} value={b.value}>{b.label}</option>
              ))}
            </select>
          </div>

          {/* Housing Cost */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly rent or mortgage: ${housingCost.toLocaleString()}
            </label>
            <input
              type="range"
              min={0}
              max={5000}
              step={50}
              value={housingCost}
              onChange={(e) => setHousingCost(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$0</span>
              <span>$5,000+</span>
            </div>
          </div>

          {/* Employment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employment status</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'employed', label: '💼 Employed' },
                { value: 'unemployed', label: '🔍 Unemployed' },
                { value: 'retired', label: '🏖️ Retired' },
                { value: 'student', label: '🎓 Student' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setEmployment(opt.value)}
                  className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                    employment === opt.value
                      ? 'border-[--primary] bg-[--primary-light] text-[--primary]'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Food */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Food situation in the past 7 days</label>
            <div className="space-y-2">
              {[
                { value: '1', label: '✅ Enough of the food I wanted' },
                { value: '2', label: '⚠️ Enough, but not always the kinds I wanted' },
                { value: '3', label: '😟 Sometimes not enough to eat' },
                { value: '4', label: '🚨 Often not enough to eat' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFood(opt.value)}
                  className={`w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                    food === opt.value
                      ? 'border-[--primary] bg-[--primary-light] text-[--primary]'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Insurance */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Do you have health insurance?</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setInsured('yes')}
                className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                  insured === 'yes'
                    ? 'border-[--primary] bg-[--primary-light] text-[--primary]'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                ✅ Yes
              </button>
              <button
                onClick={() => setInsured('no')}
                className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                  insured === 'no'
                    ? 'border-[--primary] bg-[--primary-light] text-[--primary]'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                ❌ No
              </button>
            </div>
          </div>

          {/* AI */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Have you used AI tools in the past 2 months?</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'yes', label: '🤖 Yes' },
                { value: 'no', label: 'No' },
                { value: 'unsure', label: '🤔 Not sure' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setAi(opt.value)}
                  className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                    ai === opt.value
                      ? 'border-[--primary] bg-[--primary-light] text-[--primary]'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Calculate */}
          <button
            onClick={calculate}
            disabled={!canCalculate}
            className={`w-full py-4 rounded-xl text-lg font-bold transition-colors ${
              canCalculate
                ? 'bg-[--primary] text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Calculate My Pulse Score
          </button>
        </div>

        {/* Results */}
        {score !== null && (
          <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold text-gray-900 text-center">Your Pulse Score</h2>

            <GaugeChart score={score} />

            <div className="text-center text-lg text-gray-700">
              You&apos;re doing <strong>{score >= NATIONAL_AVG ? 'better' : 'worse'}</strong> than{' '}
              <strong>{score >= NATIONAL_AVG ? pctile : 100 - pctile}%</strong> of Americans.
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-500">National Average</div>
                <div className="text-2xl font-bold text-gray-900">{NATIONAL_AVG}</div>
              </div>
              {stateData && (
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-500">{stateData.name} Average</div>
                  <div className="text-2xl font-bold text-gray-900">{stateData.avg}</div>
                </div>
              )}
            </div>

            {stateData && (
              <div className="text-center text-gray-600">
                {score > stateData.avg
                  ? `You're doing better than the ${stateData.name} average by ${score - stateData.avg} points.`
                  : score < stateData.avg
                    ? `You're ${stateData.avg - score} points below the ${stateData.name} average.`
                    : `You're right at the ${stateData.name} average!`}
              </div>
            )}

            <button
              onClick={shareScore}
              className="w-full py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
            >
              {copied ? '✅ Copied to clipboard!' : '🐦 Share Your Score'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
