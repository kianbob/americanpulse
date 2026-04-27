'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { qaData, popularQuestions, stateNames, metricLabels, type QAEntry } from './ask-data';

interface StatesData {
  national: Record<string, number>;
  states: Record<string, {
    name: string;
    abbreviation: string;
    slug: string;
    [key: string]: unknown;
  }>;
}

interface MatchResult {
  question: string;
  answer: string;
  source: string;
  link: string;
}

function findStateInQuery(query: string): string | null {
  const lower = query.toLowerCase();
  // Check longer names first to avoid partial matches
  const sorted = Object.keys(stateNames).sort((a, b) => b.length - a.length);
  for (const key of sorted) {
    if (lower.includes(key)) return key;
  }
  return null;
}

function searchQuestions(query: string, statesData: StatesData | null): MatchResult[] {
  const lower = query.toLowerCase().trim();
  if (!lower) return [];

  const stateKey = findStateInQuery(lower);
  const results: { entry: QAEntry; score: number }[] = [];

  for (const entry of qaData) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (lower.includes(kw.toLowerCase())) {
        score += kw.length;
      }
    }
    if (score > 0) {
      results.push({ entry, score });
    }
  }

  results.sort((a, b) => b.score - a.score);

  return results.slice(0, 5).map(({ entry }) => {
    let answer = entry.answer;
    let link = entry.link;

    if (entry.stateAware && stateKey && statesData) {
      const slug = stateKey === 'dc' ? 'district-of-columbia' : stateKey.replace(/ /g, '-');
      const stateData = Object.values(statesData.states).find(
        s => s.slug === slug || s.name.toLowerCase() === stateKey
      );
      const national = statesData.national;
      const stateName = stateNames[stateKey];

      if (stateData && entry.stateMetric) {
        const metric = entry.stateMetric;
        const stateVal = stateData[metric] as number;
        const natVal = national[metric];
        const label = metricLabels[metric] || metric;
        if (stateVal !== undefined && natVal !== undefined) {
          const comparison = stateVal > natVal ? 'above' : stateVal < natVal ? 'below' : 'at';
          answer = `${stateName}'s ${label.toLowerCase()} rate is ${stateVal}%, which is ${comparison} the national average of ${natVal}%.`;
        } else {
          answer = `Visit the ${stateName} state page for detailed data.`;
        }
        link = `/states/${stateData.slug || slug}`;
      } else if (stateData && !entry.stateMetric) {
        answer = `See how ${stateName} compares across all metrics on its dedicated state page.`;
        link = `/states/${stateData.slug || slug}`;
      }
    }

    return {
      question: entry.question.replace('[state]', stateNames[stateKey || ''] || 'your state'),
      answer,
      source: entry.source,
      link,
    };
  });
}

export default function AskPage() {
  const [query, setQuery] = useState('');
  const [statesData, setStatesData] = useState<StatesData | null>(null);
  const [selectedResult, setSelectedResult] = useState<MatchResult | null>(null);
  const [suggestions, setSuggestions] = useState<MatchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/data/states-data.json')
      .then(r => r.json())
      .then(setStatesData)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (query.length >= 2) {
      const results = searchQuestions(query, statesData);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, statesData]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleSelect(result: MatchResult) {
    setSelectedResult(result);
    setQuery(result.question);
    setShowSuggestions(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const results = searchQuestions(query, statesData);
    if (results.length > 0) {
      setSelectedResult(results[0]);
    } else {
      setSelectedResult(null);
    }
    setShowSuggestions(false);
  }

  function handlePopularClick(q: string) {
    setQuery(q);
    const results = searchQuestions(q, statesData);
    if (results.length > 0) {
      setSelectedResult(results[0]);
    }
    setShowSuggestions(false);
  }

  const noMatch = query.length >= 2 && suggestions.length === 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Ask the Data</h1>
        <p className="text-lg text-gray-600">
          Search real federal data on how America is doing — from AI adoption to food security.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative mb-8">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="Try: &quot;How many Americans use AI?&quot; or &quot;food insecurity in Texas&quot;"
            className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-[var(--primary,#2563eb)] focus:outline-none transition-colors"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-[var(--primary,#2563eb)] text-white px-5 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            Search
          </button>
        </div>

        {showSuggestions && (
          <div
            ref={suggestionsRef}
            className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
          >
            {suggestions.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelect(s)}
                className="w-full text-left px-5 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-0"
              >
                <span className="text-gray-800">{s.question}</span>
                <span className="text-xs text-gray-400 ml-2">— {s.source}</span>
              </button>
            ))}
          </div>
        )}
      </form>

      {/* Answer Card */}
      {selectedResult && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{selectedResult.question}</h2>
          <p className="text-gray-700 text-base leading-relaxed mb-4">{selectedResult.answer}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Source: {selectedResult.source}</span>
            <Link
              href={selectedResult.link}
              className="text-sm font-medium text-[var(--primary,#2563eb)] hover:underline"
            >
              Explore full data →
            </Link>
          </div>
        </div>
      )}

      {/* No Match */}
      {noMatch && !selectedResult && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8 text-center">
          <p className="text-amber-800 font-medium mb-1">We don&apos;t have data for that yet.</p>
          <p className="text-amber-600 text-sm">Try one of the popular questions below!</p>
        </div>
      )}

      {/* Popular Questions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Questions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {popularQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handlePopularClick(q)}
              className="text-left bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-[var(--primary,#2563eb)] hover:shadow-sm transition-all text-gray-700 text-sm"
            >
              💬 {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
