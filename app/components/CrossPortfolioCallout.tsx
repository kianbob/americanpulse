interface CalloutProps {
  type: 'ai' | 'housing' | 'employment' | 'food';
}

const calloutData: Record<CalloutProps['type'], { links: { text: string; url: string }[] }> = {
  ai: {
    links: [
      { text: 'See who\'s lobbying to regulate AI', url: 'https://theailobby.com' },
      { text: 'Which jobs are at risk from AI', url: 'https://aiexposure.org' },
    ],
  },
  housing: {
    links: [
      { text: 'Detailed housing data', url: 'https://shelterscope.com' },
    ],
  },
  employment: {
    links: [
      { text: 'Federal workforce data', url: 'https://openfeds.org' },
    ],
  },
  food: {
    links: [
      { text: 'Farm subsidies data', url: 'https://opensubsidies.org' },
    ],
  },
};

export default function CrossPortfolioCallout({ type }: CalloutProps) {
  const { links } = calloutData[type];

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-8">
      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1.5"
          >
            <span>{link.text} &rarr; <span className="font-medium text-gray-700">{link.url.replace('https://', '')}</span></span>
            <svg className="w-3.5 h-3.5 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
