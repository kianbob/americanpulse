'use client';

import { useState, useEffect, useRef } from 'react';

interface StatesData {
  national: Record<string, number>;
  states: Record<string, { name: string; abbreviation: string; slug: string; [k: string]: unknown }>;
}

interface TrustStats {
  federalStatistics: { overall: { percentages: Record<string, number> } };
  congress: { overall: { percentages: Record<string, number> } };
  [k: string]: unknown;
}

const topics = [
  { id: 'ai', label: 'AI Usage', metric: 'aiUsage', unit: '%', bullets: (s: number, n: number) => [`${s}% use AI in this state`, `National average: ${n}%`, `Based on Census Bureau Household Pulse Survey`, `March 2026 data`] },
  { id: 'food', label: 'Food Security', metric: 'foodInsufficient', unit: '%', bullets: (s: number, n: number) => [`${s}% report food insufficiency`, `National average: ${n}%`, `"Sometimes" or "often" not enough to eat`, `Census Household Pulse Survey`] },
  { id: 'housing', label: 'Housing', metric: 'rentBehind', unit: '%', bullets: (s: number, n: number) => [`${s}% behind on rent`, `National average: ${n}%`, `Renters who missed last month's payment`, `Census Household Pulse Survey`] },
  { id: 'trust', label: 'Trust in Institutions', metric: null, unit: '%', bullets: () => [`70.7% trust the Census Bureau`, `Only 17.9% trust Congress`, `Trust increases with income`, `Census Household Pulse Survey`] },
  { id: 'employment', label: 'Employment', metric: 'employed', unit: '%', bullets: (s: number, n: number) => [`${s}% currently employed`, `National average: ${n}%`, `Includes full-time and part-time`, `Census Household Pulse Survey`] },
  { id: 'health', label: 'Health Insurance', metric: 'uninsured', unit: '%', bullets: (s: number, n: number) => [`${s}% uninsured`, `National average: ${n}%`, `Without any health coverage`, `Census Household Pulse Survey`] },
];

const allStates = [
  'National', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',
  'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming',
];

export default function InfographicPage() {
  const [topicId, setTopicId] = useState('ai');
  const [stateName, setStateName] = useState('National');
  const [statesData, setStatesData] = useState<StatesData | null>(null);
  const [trustData, setTrustData] = useState<TrustStats | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/data/states-data.json').then(r => r.json()).then(setStatesData).catch(() => {});
    fetch('/data/trust-stats.json').then(r => r.json()).then(setTrustData).catch(() => {});
  }, []);

  const topic = topics.find(t => t.id === topicId)!;
  const isNational = stateName === 'National';

  let statValue: number | null = null;
  let natValue: number | null = null;
  let displayName = stateName;

  if (statesData) {
    natValue = topic.metric ? statesData.national[topic.metric] : null;

    if (!isNational && topic.metric) {
      const entry = Object.values(statesData.states).find(s => s.name === stateName);
      if (entry) {
        statValue = entry[topic.metric] as number;
        displayName = entry.name;
      }
    }
  }

  const mainStat = isNational
    ? (natValue !== null ? `${natValue}%` : (topicId === 'trust' ? '17.9%' : '—'))
    : (statValue !== null ? `${statValue}%` : '—');

  const subtitle = isNational
    ? `National ${topic.label}`
    : `${topic.label} in ${displayName}`;

  const bullets = (statValue !== null && natValue !== null)
    ? topic.bullets(statValue, natValue)
    : (natValue !== null ? topic.bullets(natValue, natValue) : topic.bullets(0, 0));

  // For trust, override main stat
  const trustMainStat = topicId === 'trust'
    ? (isNational ? '17.9%' : '17.9%')
    : mainStat;
  const trustSubtitle = topicId === 'trust' ? 'Trust Congress' : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Infographic Generator</h1>
        <p className="text-lg text-gray-600">Create shareable data cards for social media</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
          <select
            value={topicId}
            onChange={e => setTopicId(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white focus:border-[var(--primary,#2563eb)] focus:outline-none"
          >
            {topics.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <select
            value={stateName}
            onChange={e => setStateName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white focus:border-[var(--primary,#2563eb)] focus:outline-none"
          >
            {allStates.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Card Preview */}
      <div className="mb-4">
        <div
          ref={cardRef}
          className="relative mx-auto rounded-xl overflow-hidden"
          style={{
            width: '100%',
            maxWidth: 600,
            aspectRatio: '1200 / 630',
            backgroundColor: '#1e293b',
            color: 'white',
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Top */}
          <div>
            <div style={{ fontSize: '0.875rem', opacity: 0.7, marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              How Is America
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 600, opacity: 0.9 }}>
              {trustSubtitle || subtitle}
            </div>
          </div>

          {/* Big Stat */}
          <div style={{ textAlign: 'center', margin: '1rem 0' }}>
            <div style={{ fontSize: '4rem', fontWeight: 800, lineHeight: 1 }}>
              {topicId === 'trust' ? trustMainStat : mainStat}
            </div>
            {!isNational && natValue !== null && topicId !== 'trust' && (
              <div style={{ fontSize: '1rem', opacity: 0.7, marginTop: '0.5rem' }}>
                National avg: {natValue}%
              </div>
            )}
          </div>

          {/* Bullets */}
          <div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {bullets.map((b, i) => (
                <li key={i} style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '0.25rem', paddingLeft: '1rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0 }}>•</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Watermark */}
          <div style={{ position: 'absolute', bottom: '1rem', right: '1.5rem', fontSize: '0.7rem', opacity: 0.5 }}>
            howisamerica.com
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 mb-2">
        Right-click the card above and select &quot;Save image as...&quot; or take a screenshot to share.
      </p>
      <p className="text-center text-xs text-gray-400">
        Card is 1200×630 ratio — optimized for Twitter, Facebook, and LinkedIn sharing.
      </p>
    </div>
  );
}
