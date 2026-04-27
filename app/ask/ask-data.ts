export interface QAEntry {
  question: string;
  keywords: string[];
  answer: string;
  source: string;
  link: string;
  stateAware?: boolean;
  stateMetric?: string;
}

export const qaData: QAEntry[] = [
  // AI Usage
  { question: "How many Americans use AI?", keywords: ["ai", "artificial intelligence", "how many", "use ai"], answer: "24.45% of Americans report using artificial intelligence, according to the Census Bureau's Household Pulse Survey (March 2026).", source: "Census HTOPS March 2026", link: "/ai" },
  { question: "What is the AI usage rate in my state?", keywords: ["ai usage", "ai rate", "artificial intelligence"], answer: "", source: "Census HTOPS March 2026", link: "/ai", stateAware: true, stateMetric: "aiUsage" },
  { question: "Which states use AI the most?", keywords: ["states", "ai", "most", "highest", "top"], answer: "AI adoption varies significantly by state. Visit our AI page to see the full state-by-state breakdown and interactive map.", source: "Census HTOPS March 2026", link: "/ai" },
  { question: "Is AI usage growing?", keywords: ["ai", "growing", "increasing", "trend", "growth"], answer: "AI usage has been tracked since the Census Bureau added it to the Household Pulse Survey. See our trends page for the latest data.", source: "Census HTOPS", link: "/trends" },

  // Food Security
  { question: "How many Americans are food insecure?", keywords: ["food insecure", "food insecurity", "hungry", "food insufficient"], answer: "7.01% of Americans report food insufficiency — meaning they sometimes or often don't have enough to eat.", source: "Census Household Pulse Survey", link: "/food" },
  { question: "What is the food insecurity rate in my state?", keywords: ["food insecurity", "food insecure", "food insufficient", "hungry"], answer: "", source: "Census Household Pulse Survey", link: "/food", stateAware: true, stateMetric: "foodInsufficient" },
  { question: "Which states have the worst food insecurity?", keywords: ["food", "worst", "highest", "states", "insecurity"], answer: "Food insecurity varies widely by state. Southern states generally report higher rates. See our food security page for the full breakdown.", source: "Census Household Pulse Survey", link: "/food" },
  { question: "How is food insecurity measured?", keywords: ["food insecurity", "measured", "how", "definition", "methodology"], answer: "The Census Household Pulse Survey asks respondents about food sufficiency — whether they had enough to eat in the last 7 days. We report the percentage who said 'sometimes not enough' or 'often not enough'.", source: "Census Household Pulse Survey", link: "/methodology" },

  // Trust
  { question: "Do Americans trust Congress?", keywords: ["trust", "congress", "government"], answer: "Only 17.9% of Americans report high trust in Congress — the lowest of any institution measured.", source: "Census Household Pulse Survey", link: "/trust" },
  { question: "Which institution do Americans trust the most?", keywords: ["trust", "most", "trusted", "institution"], answer: "The Census Bureau is the most trusted institution at 70.7%. Congress ranks last at just 17.9%.", source: "Census Household Pulse Survey", link: "/trust" },
  { question: "Do Americans trust the Census Bureau?", keywords: ["trust", "census", "bureau"], answer: "70.7% of Americans report trusting the Census Bureau — making it the most trusted federal institution.", source: "Census Household Pulse Survey", link: "/trust" },
  { question: "What is trust in government?", keywords: ["trust", "government", "institutions", "federal"], answer: "Trust varies dramatically by institution. The Census Bureau leads at 70.7%, while Congress trails at just 17.9%. See our trust page for the full breakdown by institution, income, and demographics.", source: "Census Household Pulse Survey", link: "/trust" },
  { question: "Do wealthy people trust government more?", keywords: ["trust", "income", "wealthy", "rich", "poor"], answer: "Trust in federal institutions tends to increase with income. Higher earners report more trust across most institutions. See the income breakdown on our trust page.", source: "Census Household Pulse Survey", link: "/trust" },

  // Health / Insurance
  { question: "How many Americans are uninsured?", keywords: ["uninsured", "health insurance", "no insurance", "without insurance"], answer: "7.67% of Americans report being uninsured, based on the latest Household Pulse Survey data.", source: "Census Household Pulse Survey", link: "/health" },
  { question: "What is the uninsured rate in my state?", keywords: ["uninsured", "insurance", "health"], answer: "", source: "Census Household Pulse Survey", link: "/health", stateAware: true, stateMetric: "uninsured" },
  { question: "Which states have the highest uninsured rates?", keywords: ["uninsured", "highest", "states", "worst"], answer: "Uninsured rates vary by state. Southern and western states tend to have higher rates. Visit our health page for the full map.", source: "Census Household Pulse Survey", link: "/health" },

  // Housing
  { question: "How many Americans are behind on rent?", keywords: ["rent", "behind", "late", "housing"], answer: "8.6% of renters report being behind on rent payments.", source: "Census Household Pulse Survey", link: "/housing" },
  { question: "What is the rent behind rate in my state?", keywords: ["rent", "behind", "housing"], answer: "", source: "Census Household Pulse Survey", link: "/housing", stateAware: true, stateMetric: "rentBehind" },
  { question: "Is housing affordable in America?", keywords: ["housing", "affordable", "affordability", "cost"], answer: "8.6% of renters are behind on payments and 80.39% of Americans report some difficulty with expenses. Visit our housing page for the full picture.", source: "Census Household Pulse Survey", link: "/housing" },
  { question: "How much is median rent?", keywords: ["median rent", "average rent", "rent cost"], answer: "National median rent is tracked in our cost of living data. Visit our housing page for state-by-state comparisons.", source: "American Community Survey", link: "/housing" },

  // Employment
  { question: "What is the employment rate?", keywords: ["employment", "employed", "jobs", "working"], answer: "56.85% of Americans report being currently employed, according to the Household Pulse Survey.", source: "Census Household Pulse Survey", link: "/employment" },
  { question: "What is the employment rate in my state?", keywords: ["employment", "employed", "jobs"], answer: "", source: "Census Household Pulse Survey", link: "/employment", stateAware: true, stateMetric: "employed" },
  { question: "How many people work from home?", keywords: ["remote", "work from home", "telework", "wfh"], answer: "Remote work and telework patterns vary significantly. Visit our employment page for the latest telework data.", source: "Census Household Pulse Survey", link: "/employment" },
  { question: "What is the unemployment rate?", keywords: ["unemployment", "unemployed", "jobless"], answer: "The Bureau of Labor Statistics reports unemployment data monthly. Our employment page tracks broader work status from the Household Pulse Survey, where 56.85% report being employed.", source: "Census HTOPS / BLS", link: "/employment" },

  // Spending / Expenses
  { question: "How many Americans struggle with expenses?", keywords: ["expenses", "struggle", "difficulty", "spending", "afford"], answer: "80.39% of Americans report some difficulty paying for usual household expenses.", source: "Census Household Pulse Survey", link: "/spending" },
  { question: "What is expense difficulty?", keywords: ["expense difficulty", "what is", "definition"], answer: "Expense difficulty measures the percentage of Americans who report 'somewhat difficult' or 'very difficult' paying for usual household expenses in the last 7 days. Currently at 80.39%.", source: "Census Household Pulse Survey", link: "/spending" },
  { question: "Are Americans worse off financially?", keywords: ["financially", "worse", "better", "economy", "financial"], answer: "80.39% report expense difficulty and 8.6% are behind on rent. Visit our spending and trends pages for the full picture.", source: "Census Household Pulse Survey", link: "/spending" },

  // Wellbeing
  { question: "What is the wellbeing index?", keywords: ["wellbeing", "well-being", "index", "score"], answer: "Our Wellbeing Index is a composite score combining AI adoption, food security, employment, insurance coverage, housing stability, and expense difficulty into a single metric for each state.", source: "How Is America (composite)", link: "/wellbeing" },
  { question: "Which state has the best wellbeing?", keywords: ["wellbeing", "best", "state", "top", "highest"], answer: "Wellbeing varies significantly by state. Visit our Wellbeing Index page for the full rankings.", source: "How Is America (composite)", link: "/wellbeing" },

  // Squeeze Index
  { question: "What is the squeeze index?", keywords: ["squeeze", "index", "squeezed", "financial pressure"], answer: "The Squeeze Index measures how financially squeezed each region is, combining expense difficulty, rent burden, food insecurity, and other financial stress indicators.", source: "How Is America (composite)", link: "/squeeze" },

  // Metro vs Rural
  { question: "Is rural America different from cities?", keywords: ["rural", "urban", "metro", "city", "cities", "divide"], answer: "Yes — there are significant differences between metro and rural areas across nearly every metric we track. Visit our Metro vs Rural page for the full comparison.", source: "Census Household Pulse Survey", link: "/metro-rural" },

  // Transportation
  { question: "How do Americans commute?", keywords: ["commute", "transportation", "drive", "transit", "car"], answer: "Transportation patterns vary widely by region and metro status. Visit our transportation page for the full breakdown.", source: "Census Household Pulse Survey", link: "/transportation" },

  // Demographics
  { question: "What are US demographics?", keywords: ["demographics", "population", "age", "race", "diversity"], answer: "Visit our demographics page for population, age, education, and other demographic breakdowns by state.", source: "American Community Survey", link: "/demographics" },

  // General / Meta
  { question: "Where does this data come from?", keywords: ["data", "source", "where", "methodology", "how"], answer: "Most of our data comes from the U.S. Census Bureau's Household Pulse Survey, supplemented by the American Community Survey, CDC PLACES, BLS, and other federal sources.", source: "Multiple federal sources", link: "/methodology" },
  { question: "How often is this data updated?", keywords: ["updated", "how often", "frequency", "latest", "current"], answer: "We update our data with each new release of the Household Pulse Survey, typically every 2-4 weeks. Check our updates page for the latest.", source: "How Is America", link: "/updates" },
  { question: "What is the Household Pulse Survey?", keywords: ["household pulse", "pulse survey", "what is", "census survey"], answer: "The Household Pulse Survey is an experimental survey by the U.S. Census Bureau that measures how Americans are doing across employment, food security, housing, health, spending, and more. It's conducted in near real-time.", source: "Census Bureau", link: "/methodology" },
  { question: "How many people are surveyed?", keywords: ["sample size", "surveyed", "how many", "respondents"], answer: "The Household Pulse Survey typically receives 40,000-70,000 responses per wave, making it one of the largest ongoing surveys of American life.", source: "Census Bureau", link: "/methodology" },

  // Cost of living
  { question: "What is the cost of living by state?", keywords: ["cost of living", "expensive", "cheap", "affordable", "state"], answer: "Cost of living varies significantly by state. Visit our cost of living page for median income, rent, home values, and more for all 50 states.", source: "American Community Survey", link: "/cost-of-living-by-state" },
  { question: "Which state is cheapest to live in?", keywords: ["cheapest", "affordable", "lowest cost", "inexpensive", "state"], answer: "States like Mississippi, Arkansas, and West Virginia tend to have the lowest costs of living. See our full cost of living comparison.", source: "American Community Survey", link: "/cost-of-living-by-state" },
  { question: "Which state is most expensive?", keywords: ["expensive", "highest cost", "priciest", "state"], answer: "Hawaii, California, and Massachusetts consistently rank as the most expensive states. See our full comparison.", source: "American Community Survey", link: "/cost-of-living-by-state" },

  // Health metrics (CDC)
  { question: "What is the obesity rate in America?", keywords: ["obesity", "obese", "overweight"], answer: "The national adult obesity rate is 33.3%, according to CDC PLACES data. Rates vary significantly by state.", source: "CDC PLACES", link: "/health" },
  { question: "What is the diabetes rate?", keywords: ["diabetes", "diabetic"], answer: "The national diabetes rate is 12.1% among adults, according to CDC PLACES data.", source: "CDC PLACES", link: "/health" },
  { question: "How common is mental health issues?", keywords: ["mental health", "depression", "anxiety", "mental"], answer: "21.6% of adults report frequent mental health distress (14+ days in past month), per CDC PLACES data.", source: "CDC PLACES", link: "/health" },

  // Income
  { question: "What is the median income in America?", keywords: ["median income", "average income", "salary", "earnings"], answer: "Visit our income page for median household income data by state, with comparisons to cost of living.", source: "American Community Survey", link: "/income" },
  { question: "What is the poverty rate?", keywords: ["poverty", "poverty rate", "poor"], answer: "Poverty rates vary significantly by state. Visit our demographics page for state-by-state data.", source: "American Community Survey", link: "/demographics" },

  // Prices
  { question: "Are prices going up?", keywords: ["prices", "inflation", "cost", "rising", "expensive"], answer: "Visit our prices page for the latest data on how Americans perceive price changes and their impact on spending.", source: "Census Household Pulse Survey", link: "/prices" },

  // State-aware patterns (these match when user includes a state name)
  { question: "How is [state] doing overall?", keywords: ["how is", "doing", "overall", "state"], answer: "", source: "How Is America", link: "/states", stateAware: true },
  { question: "AI usage in [state]", keywords: ["ai usage in", "ai in", "artificial intelligence in"], answer: "", source: "Census HTOPS March 2026", link: "/ai", stateAware: true, stateMetric: "aiUsage" },
  { question: "Food insecurity in [state]", keywords: ["food insecurity in", "food insecure in", "hungry in", "food insufficient in"], answer: "", source: "Census Household Pulse Survey", link: "/food", stateAware: true, stateMetric: "foodInsufficient" },
  { question: "Employment in [state]", keywords: ["employment in", "employed in", "jobs in", "working in"], answer: "", source: "Census Household Pulse Survey", link: "/employment", stateAware: true, stateMetric: "employed" },
  { question: "Uninsured rate in [state]", keywords: ["uninsured in", "insurance in", "health insurance in", "uninsured rate in"], answer: "", source: "Census Household Pulse Survey", link: "/health", stateAware: true, stateMetric: "uninsured" },
  { question: "Rent behind in [state]", keywords: ["rent in", "rent behind in", "housing in"], answer: "", source: "Census Household Pulse Survey", link: "/housing", stateAware: true, stateMetric: "rentBehind" },
  { question: "Expense difficulty in [state]", keywords: ["expense in", "expenses in", "spending in", "expense difficulty in"], answer: "", source: "Census Household Pulse Survey", link: "/spending", stateAware: true, stateMetric: "expenseDifficult" },

  // Regions
  { question: "How do regions compare?", keywords: ["regions", "region", "compare", "northeast", "south", "midwest", "west"], answer: "We break down data by Census division (9 regions). Visit our regions page for the full comparison.", source: "Census Household Pulse Survey", link: "/regions" },

  // Calculator
  { question: "Is there a calculator?", keywords: ["calculator", "calculate", "compare", "tool"], answer: "Yes! Our cost of living calculator lets you compare expenses between states. Try it out!", source: "How Is America", link: "/calculator" },

  // Childcare
  { question: "How much does childcare cost?", keywords: ["childcare", "child care", "daycare", "kids", "children"], answer: "Childcare costs vary dramatically by state. Visit our full data explorer for childcare statistics.", source: "Multiple sources", link: "/" },

  // Additional popular questions
  { question: "What percentage of Americans are employed?", keywords: ["percentage", "employed", "employment rate"], answer: "56.85% of Americans report being currently employed in the latest Household Pulse Survey.", source: "Census Household Pulse Survey", link: "/employment" },
  { question: "How does America compare to other countries?", keywords: ["compare", "other countries", "international", "world", "global"], answer: "Our data focuses on domestic comparisons across states, regions, and demographics. We don't currently include international comparisons.", source: "How Is America", link: "/" },
  { question: "Can I download the data?", keywords: ["download", "export", "csv", "raw data", "dataset"], answer: "We provide data downloads for many of our datasets. Check individual topic pages for download options.", source: "How Is America", link: "/methodology" },
  { question: "What is the most surprising statistic?", keywords: ["surprising", "shocking", "interesting", "wow", "notable"], answer: "80.39% of Americans report difficulty with expenses — that's 4 in 5. Meanwhile, only 17.9% trust Congress but 70.7% trust the Census Bureau. AI adoption has reached nearly 1 in 4 Americans.", source: "Census Household Pulse Survey", link: "/" },
  { question: "How can I use this data?", keywords: ["use", "cite", "reference", "academic", "research", "journalism"], answer: "All data on How Is America comes from public federal sources. You're free to cite and reference it. Visit our methodology page for source details.", source: "How Is America", link: "/methodology" },
];

export const popularQuestions = [
  "How many Americans use AI?",
  "Do Americans trust Congress?",
  "How many Americans are food insecure?",
  "How many Americans are uninsured?",
  "How many Americans struggle with expenses?",
  "What is the employment rate?",
  "How many Americans are behind on rent?",
  "Where does this data come from?",
];

export const stateNames: Record<string, string> = {
  alabama: "Alabama", alaska: "Alaska", arizona: "Arizona", arkansas: "Arkansas",
  california: "California", colorado: "Colorado", connecticut: "Connecticut", delaware: "Delaware",
  florida: "Florida", georgia: "Georgia", hawaii: "Hawaii", idaho: "Idaho",
  illinois: "Illinois", indiana: "Indiana", iowa: "Iowa", kansas: "Kansas",
  kentucky: "Kentucky", louisiana: "Louisiana", maine: "Maine", maryland: "Maryland",
  massachusetts: "Massachusetts", michigan: "Michigan", minnesota: "Minnesota", mississippi: "Mississippi",
  missouri: "Missouri", montana: "Montana", nebraska: "Nebraska", nevada: "Nevada",
  "new hampshire": "New Hampshire", "new jersey": "New Jersey", "new mexico": "New Mexico",
  "new york": "New York", "north carolina": "North Carolina", "north dakota": "North Dakota",
  ohio: "Ohio", oklahoma: "Oklahoma", oregon: "Oregon", pennsylvania: "Pennsylvania",
  "rhode island": "Rhode Island", "south carolina": "South Carolina", "south dakota": "South Dakota",
  tennessee: "Tennessee", texas: "Texas", utah: "Utah", vermont: "Vermont",
  virginia: "Virginia", washington: "Washington", "west virginia": "West Virginia",
  wisconsin: "Wisconsin", wyoming: "Wyoming", "district of columbia": "District of Columbia",
  dc: "District of Columbia",
};

export const metricLabels: Record<string, string> = {
  aiUsage: "AI Usage",
  foodInsufficient: "Food Insufficiency",
  employed: "Employment Rate",
  uninsured: "Uninsured Rate",
  rentBehind: "Behind on Rent",
  expenseDifficult: "Expense Difficulty",
};
