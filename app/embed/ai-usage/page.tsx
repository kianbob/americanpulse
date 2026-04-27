'use client';

import { useState, useEffect } from 'react';

interface RegionData {
  aiUsage: number;
  states: string[];
  n: number;
}

export default function EmbedAiUsage() {
  const [regions, setRegions] = useState<Record<string, RegionData>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/data/region-stats.json')
      .then((r) => r.json())
      .then((data) => setRegions(data))
      .catch(() => {});
  }, []);

  const sorted = Object.entries(regions)
    .map(([name, d]) => ({ name, value: d.aiUsage }))
    .sort((a, b) => b.value - a.value);

  const max = sorted.length > 0 ? Math.max(...sorted.map((s) => s.value)) : 100;

  const embedCode = '<iframe src="https://www.howisamerica.com/embed/ai-usage" width="600" height="400" frameborder="0"></iframe>';

  function handleCopy() {
    navigator.clipboard.writeText(embedCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div style={{ padding: '24px', maxWidth: '600px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px', color: '#111' }}>
        AI Usage by Census Division
      </h2>
      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '20px' }}>
        % of households using AI tools — U.S. Census HTOPS 2026
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {sorted.map((item) => (
          <div key={item.name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '3px' }}>
              <span style={{ color: '#374151' }}>{item.name}</span>
              <span style={{ fontWeight: 600, color: '#111' }}>{item.value}%</span>
            </div>
            <div style={{ width: '100%', background: '#f3f4f6', borderRadius: '6px', height: '12px' }}>
              <div
                style={{
                  height: '12px',
                  borderRadius: '6px',
                  background: '#2563eb',
                  width: `${Math.max((item.value / max) * 100, 2)}%`,
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
