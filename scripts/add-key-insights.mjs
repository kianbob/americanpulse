import fs from 'fs';
import path from 'path';

const pages = {
  'app/ai/page.tsx': `1 in 4 Americans now use AI — but the adoption gap is stark. Those earning $200K+ are 3× more likely to use AI than those earning under $25K. As AI reshapes the economy, this digital divide could widen inequality faster than any technology since the internet.`,
  'app/food/page.tsx': `7% of Americans — roughly 18.3 million adults — don't have enough to eat. That's down from 23% during COVID's peak, but it means the recovery is far from complete. The gap between metro and rural food insecurity tells a story of two Americas.`,
  'app/housing/page.tsx': `Nearly 1 in 10 Americans are behind on rent or mortgage payments right now. With median rent at $1,326 nationally and housing costs consuming 30%+ of income for half of all renters, the housing affordability crisis is the defining economic pressure of 2026.`,
  'app/trust/page.tsx': `The Census Bureau is the most trusted institution in America at 70.7%. Congress is the least trusted at 17.9%. This isn't just a polling curiosity — trust in institutions predicts everything from vaccine uptake to tax compliance to democratic participation.`,
  'app/employment/page.tsx': `56.6% of Americans are currently employed — but what matters more is HOW they work. The rise of remote work, gig employment, and AI-assisted jobs is reshaping the labor market in ways traditional unemployment numbers don't capture.`,
  'app/spending/page.tsx': `56.6% of households report difficulty paying usual expenses. 75.3% say prices have increased in the past year, and 27.5% are 'very stressed' about it. This is the squeeze: wages haven't kept pace with the cost of everything.`,
  'app/health/page.tsx': `7.45% of Americans lack health insurance — that's roughly 24.5 million people. The uninsured rate varies dramatically by state, income, and age. Being uninsured isn't just a policy statistic — it's the difference between seeing a doctor and hoping it goes away.`,
  'app/prices/page.tsx': `75.3% of Americans say prices increased over the past year, and 27.5% are 'very stressed' about it. But the impact isn't equal: low-income households spend a larger share of income on essentials, making every price increase hit harder.`,
  'app/childcare/page.tsx': `6.6% of families with children experienced childcare disruptions. But behind that number is a cascade: missed work, lost income, and children without supervised care. The childcare crisis is an economic crisis hiding in plain sight.`,
  'app/transportation/page.tsx': `How Americans get around shapes everything from job access to healthcare to food security. In rural areas, lack of transportation is a barrier to employment for 1 in 5 job seekers.`,
  'app/wellbeing/page.tsx': `The American Wellbeing Index combines food security, housing, employment, health insurance, expense difficulty, and AI adoption into a single score. The gap between the highest-scoring region (West North Central, 67.2) and lowest (Middle Atlantic, 40.8) reveals just how different the American experience is depending on where you live.`,
  'app/squeeze/page.tsx': `The Squeeze Index measures how financially pressured each region is — combining rent burden, food insecurity, and expense difficulty into a single A-F grade. It's the answer to 'how hard is it to get by here?'`,
  'app/inequality/page.tsx': `The gap between America's richest and poorest households isn't just about income — it shows up in every dimension of daily life: food security, housing stability, healthcare access, and now AI adoption. The HTOPS data makes this visible in ways traditional economic indicators miss.`,
  'app/metro-rural/page.tsx': `Metro America and rural America might as well be different countries. Urban residents are more likely to use AI, have health insurance, and be employed — but they're also more likely to be behind on rent. The tradeoffs are real and the data proves it.`,
  'app/history/page.tsx': `From COVID's economic shock in 2020 to the AI revolution in 2026, six years of Census pulse data tells the story of American resilience — and fragility. Food insecurity peaked at 23% and fell to 7%. Anxiety went from 40% to normal levels. But new pressures (AI displacement, housing costs, inflation) have replaced old ones.`,
  'app/demographics/page.tsx': `America's experience differs dramatically by age, race, and education. College graduates are 2× more likely to use AI. Hispanic households report higher food insecurity. Young adults face the worst housing burden. The HTOPS data breaks down every metric by who you are.`,
  'app/global/page.tsx': `The US has the highest AI adoption rate among Western nations at 27% — but also the highest food insecurity (14.3%) and the only major country without universal healthcare. America leads in innovation while lagging in basic security.`,
  'app/states/page.tsx': `50 states, 50 different Americas. From food security to AI adoption, the data reveals that where you live determines how you live. Explore how your state compares.`,
  'app/calculator/page.tsx': `This isn't just a quiz — it's a mirror. See how your household compares to 7,485 Census respondents across income, housing, food security, employment, and AI usage. Your Pulse Score tells you where you stand in America.`,
  'app/articles/page.tsx': `Data-driven analysis from the largest Census household survey ever conducted. Every article is backed by real numbers from the HTOPS microdata — not opinions, not projections, not AI-generated filler.`,
};

function getRelativeImport(filePath) {
  const dir = path.dirname(filePath);
  const compPath = 'app/components/KeyInsight';
  const rel = path.relative(dir, compPath);
  return rel.startsWith('.') ? rel : './' + rel;
}

let modified = 0;
let skipped = 0;

for (const [filePath, insight] of Object.entries(pages)) {
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP (not found): ${filePath}`);
    skipped++;
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('KeyInsight')) {
    console.log(`SKIP (already has KeyInsight): ${filePath}`);
    skipped++;
    continue;
  }

  const relImport = getRelativeImport(filePath);
  const importLine = `import KeyInsight from '${relImport}';`;

  // Add import after last existing import
  const importRegex = /^import .+$/gm;
  let lastImportEnd = 0;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    // Handle multi-line imports
    let end = match.index + match[0].length;
    // If import doesn't have a semicolon, find the closing
    if (!match[0].includes(';') && !match[0].includes("';") && !match[0].includes('";')) {
      const semiIdx = content.indexOf(';', end);
      if (semiIdx !== -1) end = semiIdx + 1;
    }
    lastImportEnd = end;
  }

  if (lastImportEnd > 0) {
    content = content.slice(0, lastImportEnd) + '\n' + importLine + content.slice(lastImportEnd);
  } else {
    content = importLine + '\n' + content;
  }

  // Escape the insight text for JSX
  const escaped = insight.replace(/'/g, "\u2019").replace(/"/g, "&quot;");

  const keyInsightJSX = `\n      <KeyInsight>${escaped}</KeyInsight>\n`;

  // Strategy: find first </section> and insert after it
  const sectionEnd = content.indexOf('</section>');
  if (sectionEnd !== -1) {
    const insertPos = sectionEnd + '</section>'.length;
    content = content.slice(0, insertPos) + keyInsightJSX + content.slice(insertPos);
  } else {
    // Fallback: find the return ( and the first <div> or <main>, insert after opening
    const returnMatch = content.match(/return\s*\(\s*\n?\s*(<(?:div|main)[^>]*>)/);
    if (returnMatch) {
      const pos = content.indexOf(returnMatch[0]) + returnMatch[0].length;
      content = content.slice(0, pos) + keyInsightJSX + content.slice(pos);
    } else {
      console.log(`SKIP (can't find insertion point): ${filePath}`);
      skipped++;
      continue;
    }
  }

  fs.writeFileSync(filePath, content);
  console.log(`UPDATED: ${filePath}`);
  modified++;
}

console.log(`\nDone: ${modified} modified, ${skipped} skipped`);
