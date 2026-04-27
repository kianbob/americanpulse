'use client';

import { useState, useEffect } from 'react';

interface StateEntry {
  name: string;
  abbreviation: string;
  foodInsufficient: number;
}

interface StatesData {
  national: Record<string, number>;
  states: Record<string, StateEntry>;
}

export default function EmbedFoodMap() {
  const [data, setData] = useState<StatesData | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/data/states-data.json')
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {});
  }, []);

  const states = data
    ? Object.values(data.states)
        .sort((a, b) => b.foodInsufficient - a.foodInsufficient)
    : [];

  // Deduplicate by name (division-level data may repeat)
  const seen = new Set<string>();
  const unique = states.filter((s) => {
    if (seen.has(s.name)) return false;
    seen.add(s.name);
    return true;
  });

  const max = unique.length > 0 ? Math.max(...unique.map((s) => s.foodInsufficient)) : 10;
  const natAvg = data?.national?.foodInsufficient ?? 7;

  const embedCode = '<iframe src="https://www.howisamerica.com/embed/food-map" width="600" height="800" frameborder="0"></iframe>';

  function handleCopy() {
    navigator.clipboard.writeText(embedCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function getColor(val: number): string {
    if (val >= natAvg + 1) return '#dc2626';
    if (val >= natAvg - 0.5) return '#f59e0b';
    return '#059669';
  }

  return (
    <div style={{ padding: '24px', maxWidth: '600px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px', color: '#111' }}>
        Food Insecurity by State
      </h2>
      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '16px' }}>
        % reporting food insufficiency — National avg: {natAvg}% — U.S. Census HTOPS 2026
      </p>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', fontSize: '11px' }}>
        <span><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 2, background: '#dc2626', marginRight: 4 }} />Above avg</span>
        <span><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 2, background: '#f59e0b', marginRight: 4 }} />Near avg</span>
        <span><span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 2, background: '#059669', marginRight: 4 }} />Below avg</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '600px', overflowY: 'auto' }}>
        {unique.map((state) => (
          <div key={state.abbreviation}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '2px' }}>
              <span style={{ color: '#374151' }}>{state.abbreviation} — {state.name}</span>
              <span style={{ fontWeight: 600, color: '#111' }}>{state.foodInsufficient}%</span>
            </div>
            <div style={{ width: '100%', background: '#f3f4f6', borderRadius: '4px', height: '8px' }}>
              <div
                style={{
                  height: '8px',
                  borderRadius: '4px',
                  background: getColor(state.foodInsufficient),
                  width: `${Math.max((state.foodInsufficient / max) * 100, 2)}%`,
                  transition: 'width 0.3s',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid #e5e7eb' }}>
        <a
          href="https://www.howisamerica.com"
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
