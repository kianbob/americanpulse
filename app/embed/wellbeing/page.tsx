'use client';

import { useState, useEffect } from 'react';

interface StateEntry {
  name: string;
  abbreviation: string;
  slug: string;
  aiUsage: number;
  foodInsufficient: number;
  expenseDifficult: number;
  employed: number;
  uninsured: number;
  rentBehind: number;
}

interface StatesData {
  national: Record<string, number>;
  states: Record<string, StateEntry>;
}

interface RankedState {
  name: string;
  abbreviation: string;
  score: number;
}

function calcWellbeing(s: StateEntry, nat: Record<string, number>): number {
  // Higher = better: employed, aiUsage. Lower = better: foodInsufficient, expenseDifficult, uninsured, rentBehind
  const scores = [
    s.employed / (nat.employed || 1),
    s.aiUsage / (nat.aiUsage || 1),
    (nat.foodInsufficient || 1) / (s.foodInsufficient || 1),
    (nat.expenseDifficult || 1) / (s.expenseDifficult || 1),
    (nat.uninsured || 1) / (s.uninsured || 1),
    (nat.rentBehind || 1) / (s.rentBehind || 1),
  ];
  return Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 100);
}

export default function EmbedWellbeing() {
  const [ranked, setRanked] = useState<RankedState[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/data/states-data.json')
      .then((r) => r.json())
      .then((data: StatesData) => {
        const seen = new Set<string>();
        const results: RankedState[] = [];
        for (const s of Object.values(data.states)) {
          if (seen.has(s.name)) continue;
          seen.add(s.name);
          results.push({ name: s.name, abbreviation: s.abbreviation, score: calcWellbeing(s, data.national) });
        }
        results.sort((a, b) => b.score - a.score);
        setRanked(results);
      })
      .catch(() => {});
  }, []);

  const max = ranked.length > 0 ? Math.max(...ranked.map((r) => r.score)) : 120;

  const embedCode = '<iframe src="https://americanpulse-app.vercel.app/embed/wellbeing" width="600" height="800" frameborder="0"></iframe>';

  function handleCopy() {
    navigator.clipboard.writeText(embedCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function getColor(score: number): string {
    if (score >= 110) return '#059669';
    if (score >= 95) return '#2563eb';
    return '#dc2626';
  }

  return (
    <div style={{ padding: '24px', maxWidth: '600px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px', color: '#111' }}>
        Wellbeing Index by State
      </h2>
      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '16px' }}>
        Composite score (100 = national average) — U.S. Census HTOPS 2026
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '620px', overflowY: 'auto' }}>
        {ranked.map((state, i) => (
          <div key={state.abbreviation}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '2px' }}>
              <span style={{ color: '#374151' }}>
                <span style={{ color: '#9ca3af', marginRight: 4 }}>#{i + 1}</span>
                {state.abbreviation} — {state.name}
              </span>
              <span style={{ fontWeight: 600, color: '#111' }}>{state.score}</span>
            </div>
            <div style={{ width: '100%', background: '#f3f4f6', borderRadius: '4px', height: '8px' }}>
              <div
                style={{
                  height: '8px',
                  borderRadius: '4px',
                  background: getColor(state.score),
                  width: `${Math.max((state.score / max) * 100, 2)}%`,
                  transition: 'width 0.3s',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid #e5e7eb' }}>
        <a
          href="https://americanpulse-app.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '11px', color: '#9ca3af', textDecoration: 'none' }}
        >
          Powered by American Pulse
        </a>
      </div>

      <div style={{ marginTop: '16px', padding: '12px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151' }}>Embed this chart</span>
          <button
            onClick={handleCopy}
            style={{
              fontSize: '11px',
              padding: '4px 10px',
              background: copied ? '#059669' : '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <code style={{ fontSize: '11px', color: '#6b7280', wordBreak: 'break-all', display: 'block' }}>
          {embedCode}
        </code>
      </div>
    </div>
  );
}
