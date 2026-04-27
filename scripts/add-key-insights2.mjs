import fs from 'fs';
import path from 'path';

const pages = {
  'app/ai/page.tsx': `1 in 4 Americans now use AI — but the adoption gap is stark. Those earning $200K+ are 3× more likely to use AI than those earning under $25K. As AI reshapes the economy, this digital divide could widen inequality faster than any technology since the internet.`,
  'app/food/page.tsx': `7% of Americans — roughly 18.3 million adults — don&apos;t have enough to eat. That&apos;s down from 23% during COVID&apos;s peak, but it means the recovery is far from complete. The gap between metro and rural food insecurity tells a story of two Americas.`,
  'app/housing/page.tsx': `Nearly 1 in 10 Americans are behind on rent or mortgage payments right now. With median rent at $1,326 nationally and housing costs consuming 30%+ of income for half of all renters, the housing affordability crisis is the defining economic pressure of 2026.`,
  'app/trust/page.tsx': `The Census Bureau is the most trusted institution in America at 70.7%. Congress is the least trusted at 17.9%. This isn&apos;t just a polling curiosity — trust in institutions predicts everything from vaccine uptake to tax compliance to democratic participation.`,
  'app/employment/page.tsx': `56.6% of Americans are currently employed — but what matters more is HOW they work. The rise of remote work, gig employment, and AI-assisted jobs is reshaping the labor market in ways traditional unemployment numbers don&apos;t capture.`,
  'app/spending/page.tsx': `56.6% of households report difficulty paying usual expenses. 75.3% say prices have increased in the past year, and 27.5% are &apos;very stressed&apos; about it. This is the squeeze: wages haven&apos;t kept pace with the cost of everything.`,
  'app/health/page.tsx': `7.45% of Americans lack health insurance — that&apos;s roughly 24.5 million people. The uninsured rate varies dramatically by state, income, and age. Being uninsured isn&apos;t just a policy statistic — it&apos;s the difference between seeing a doctor and hoping it goes away.`,
  'app/prices/page.tsx': `75.3% of Americans say prices increased over the past year, and 27.5% are &apos;very stressed&apos; about it. But the impact isn&apos;t equal: low-income households spend a larger share of income on essentials, making every price increase hit harder.`,
  'app/childcare/page.tsx': `6.6% of families with children experienced childcare disruptions. But behind that number is a cascade: missed work, lost income, and children without supervised care. The childcare crisis is an economic crisis hiding in plain sight.`,
  'app/transportation/page.tsx': `How Americans get around shapes everything from job access to healthcare to food security. In rural areas, lack of transportation is a barrier to employment for 1 in 5 job seekers.`,
  'app/wellbeing/page.tsx': `The American Wellbeing Index combines food security, housing, employment, health insurance, expense difficulty, and AI adoption into a single score. The gap between the highest-scoring region (West North Central, 67.2) and lowest (Middle Atlantic, 40.8) reveals just how different the American experience is depending on where you live.`,
  'app/squeeze/page.tsx': `The Squeeze Index measures how financially pressured each region is — combining rent burden, food insecurity, and expense difficulty into a single A-F grade. It&apos;s the answer to &apos;how hard is it to get by here?&apos;`,
  'app/inequality/page.tsx': `The gap between America&apos;s richest and poorest households isn&apos;t just about income — it shows up in every dimension of daily life: food security, housing stability, healthcare access, and now AI adoption. The HTOPS data makes this visible in ways traditional economic indicators miss.`,
  'app/metro-rural/page.tsx': `Metro America and rural America might as well be different countries. Urban residents are more likely to use AI, have health insurance, and be employed — but they&apos;re also more likely to be behind on rent. The tradeoffs are real and the data proves it.`,
  'app/history/page.tsx': `From COVID&apos;s economic shock in 2020 to the AI revolution in 2026, six years of Census pulse data tells the story of American resilience — and fragility. Food insecurity peaked at 23% and fell to 7%. Anxiety went from 40% to normal levels. But new pressures (AI displacement, housing costs, inflation) have replaced old ones.`,
  'app/demographics/page.tsx': `America&apos;s experience differs dramatically by age, race, and education. College graduates are 2× more likely to use AI. Hispanic households report higher food insecurity. Young adults face the worst housing burden. The HTOPS data breaks down every metric by who you are.`,
  'app/global/page.tsx': `The US has the highest AI adoption rate among Western nations at 27% — but also the highest food insecurity (14.3%) and the only major country without universal healthcare. America leads in innovation while lagging in basic security.`,
  'app/states/page.tsx': `50 states, 50 different Americas. From food security to AI adoption, the data reveals that where you live determines how you live. Explore how your state compares.`,
  'app/calculator/page.tsx': `This isn&apos;t just a quiz — it&apos;s a mirror. See how your household compares to 7,485 Census respondents across income, housing, food security, employment, and AI usage. Your Pulse Score tells you where you stand in America.`,
  'app/articles/page.tsx': `Data-driven analysis from the largest Census household survey ever conducted. Every article is backed by real numbers from the HTOPS microdata — not opinions, not projections, not AI-generated filler.`,
};

function getRelativeImport(filePath) {
  const dir = path.dirname(filePath);
  const compPath = 'app/components/KeyInsight';
  const rel = path.relative(dir, compPath);
  return rel.startsWith('.') ? rel : './' + rel;
}

// Find the default export function and its return statement, then find the first </section> within it
function findMainReturnFirstSection(content) {
  // Find "export default function" 
  const exportIdx = content.indexOf('export default function');
  if (exportIdx === -1) return -1;
  
  // Find the return ( after export default function
  const returnIdx = content.indexOf('return (', exportIdx);
  if (returnIdx === -1) return content.indexOf('return(', exportIdx);
  
  // Find first </section> after that return
  const sectionEnd = content.indexOf('</section>', returnIdx);
  if (sectionEnd === -1) return -1;
  
  return sectionEnd + '</section>'.length;
}

let modified = 0;

for (const [filePath, insight] of Object.entries(pages)) {
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP (not found): ${filePath}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('KeyInsight')) {
    console.log(`SKIP (already has KeyInsight): ${filePath}`);
    continue;
  }

  const relImport = getRelativeImport(filePath);
  const importLine = `import KeyInsight from '${relImport}';`;

  // Add import after last import line
  const lines = content.split('\n');
  let lastImportLine = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^import /)) {
      // Find end of this import (might be multi-line)
      let j = i;
      while (j < lines.length && !lines[j].includes(';')) j++;
      lastImportLine = j;
    }
  }
  
  if (lastImportLine >= 0) {
    lines.splice(lastImportLine + 1, 0, importLine);
  } else {
    lines.unshift(importLine);
  }
  content = lines.join('\n');

  const keyInsightJSX = `\n      <KeyInsight>${insight}</KeyInsight>`;

  const insertPos = findMainReturnFirstSection(content);
  if (insertPos === -1) {
    // Fallback: look for pattern like <main or first <div in the default export return
    const exportIdx = content.indexOf('export default function');
    const returnIdx = content.indexOf('return (', exportIdx !== -1 ? exportIdx : 0);
    if (returnIdx !== -1) {
      // Find the opening tag after return (
      const afterReturn = content.slice(returnIdx);
      const firstTagClose = afterReturn.indexOf('>');
      if (firstTagClose !== -1) {
        const pos = returnIdx + firstTagClose + 1;
        content = content.slice(0, pos) + keyInsightJSX + content.slice(pos);
        fs.writeFileSync(filePath, content);
        console.log(`UPDATED (fallback): ${filePath}`);
        modified++;
        continue;
      }
    }
    console.log(`SKIP (can't find insertion point): ${filePath}`);
    continue;
  }

  content = content.slice(0, insertPos) + keyInsightJSX + content.slice(insertPos);
  fs.writeFileSync(filePath, content);
  console.log(`UPDATED: ${filePath}`);
  modified++;
}

console.log(`\nDone: ${modified} modified`);
