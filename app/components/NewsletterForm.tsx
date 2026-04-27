'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      action="#"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 2000);
      }}
      className="flex flex-col sm:flex-row gap-3"
    >
      <input
        type="email"
        placeholder="your@email.com"
        required
        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-transparent"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-[--primary] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
      >
        {submitted ? 'Coming soon!' : 'Subscribe'}
      </button>
    </form>
  );
}
