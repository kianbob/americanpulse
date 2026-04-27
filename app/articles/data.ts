export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  topic: string;
  content: string;
}

export const articles: Article[] = [
  {
    slug: 'ai-adoption-census-2026',
    title: '1 in 4 Americans Now Use AI — Census Data Reveals Who',
    description: 'The 2026 Census HTOPS survey shows 24.07% of Americans use AI tools. Here\'s who they are and what they\'re doing with it.',
    date: '2026-04-15',
    topic: 'AI',
    content: `The U.S. Census Bureau's Household Trends and Outlook Pulse Survey (HTOPS), conducted in March 2026, reveals that **24.07% of Americans** now report using artificial intelligence tools in the past two months. Meanwhile, 55.84% say they have not used AI, and 20.08% are not sure — suggesting actual usage may be even higher as AI becomes embedded in everyday products.

## Who Uses AI?

Age is a significant factor in AI adoption. Adults aged **25–39 lead with a 27.95% usage rate**, followed closely by the 55–64 age group at 26.89%. The 40–54 bracket comes in at 24.65%. Perhaps surprisingly, the youngest adults (18–24) trail at 20.69%, though this may reflect the survey's small sample size for that cohort (n=144). Americans 65 and older have the lowest adoption at 18.84%.

Income also plays a clear role. Those earning **$100K–$150K have the highest AI usage at 26.89%**, while those earning under $25K use AI at just 18.83%. The $25K–$35K bracket bucks the trend at 29.28%, suggesting price-sensitive early adopters or heavy phone-based AI use. Americans earning $150K+ come in at 25.08%.

Education level correlates strongly with AI adoption. **Bachelor's degree holders lead at 28.62%**, followed by associate degree holders at 28.31% and graduate degree holders at 27.59%. Those with some high school education show 17.88% adoption, and those with less than a high school diploma report 0% — though the sample is very small (n=15).

## What AI Is Used For

Among AI users, the most popular application is **finding factual information** (n=2,983 respondents, representing approximately 90.5 million Americans). This is followed by brainstorming and idea generation (n=1,924), work projects (n=1,889), integrated product features (n=1,725), and creative tasks (n=1,555).

For purposes, entertainment tops the list with roughly 61 million weighted users, followed by creative projects (43.5M), communication (35.2M), shopping (33.2M), and work/productivity (31.2M).

## What Concerns Americans About AI

Privacy and data security is the dominant concern, cited by an estimated **83.7 million Americans** (n=2,187 respondents). Bias and discrimination follows at 52.8 million, then impact on children (41.7M), job displacement (41.6M), dependence on AI (39.6M), and misinformation (37.9M).

## Regional Differences

AI adoption varies significantly by Census division. **New England leads at 33.79%**, driven by the Boston-area tech corridor. The West North Central region (Iowa, Kansas, Minnesota, Missouri, Nebraska, North Dakota, South Dakota) surprises with 30.43%. The Middle Atlantic trails at 19.27%, and the West South Central (Arkansas, Louisiana, Oklahoma, Texas) has the lowest adoption at 22.16%.

The data is clear: AI is no longer a niche technology. With nearly one in four Americans already using AI tools, and one in five unsure whether they are, artificial intelligence has crossed into mainstream American life.

*See who is lobbying to regulate AI at [theailobby.com](https://theailobby.com). Explore which jobs face the most AI exposure at [aiexposure.org](https://aiexposure.org).*

*Data source: U.S. Census Bureau HTOPS, March 2026.*`,
  },
  {
    slug: 'food-insecurity-map-2026',
    title: 'The Food Insecurity Map: Where Americans Are Going Hungry',
    description: '7.03% of Americans are food insecure according to the 2026 Census HTOPS data. Regional breakdowns reveal stark disparities.',
    date: '2026-04-16',
    topic: 'Food',
    content: `Food insecurity remains a persistent challenge across America. The 2026 Census HTOPS survey finds that **7.03% of Americans are food insecure**, meaning they sometimes or often do not have enough to eat. The broader picture shows 70.49% report having enough food, while 22.48% say they have enough but not always the kinds of food they want — suggesting financial strain even among the nominally food-secure.

## The National Picture

The survey asked 7,467 respondents about their food sufficiency in the past 7 days. The results, weighted to represent the U.S. population of approximately 260.6 million adults:

- **70.49%** had enough of the kinds of food they wanted
- **22.48%** had enough food but not always the kinds wanted
- **5.29%** sometimes did not have enough to eat
- **1.74%** often did not have enough to eat

Combining the last two categories yields the 7.03% food insecurity rate — representing roughly 18.3 million American adults who sometimes or often go without adequate food.

## Regional Disparities

The Census division data reveals significant geographic variation in food insufficiency:

**Highest food insecurity:**
- **Middle Atlantic (NJ, NY, PA): 9.46%** — the highest rate in the nation, likely reflecting the high cost of living in the New York metropolitan area
- **East South Central (AL, KY, MS, TN): 8.12%** — historically one of the poorest regions, with persistent rural poverty
- **Pacific (AK, CA, HI, OR, WA): 7.47%** — driven by California's high cost of living and homeless population

**Lowest food insecurity:**
- **West South Central (AR, LA, OK, TX): 5.30%** — a lower cost of living may buffer food access
- **Mountain (AZ, CO, ID, MT, NV, NM, UT, WY): 5.32%** — similar cost advantages
- **West North Central (IA, KS, MN, MO, NE, ND, SD): 5.39%** — agricultural heartland with lower food costs

The **South Atlantic** region comes in at 7.17%, close to the national average, while **New England** at 6.97% and **East North Central** at 6.90% fall slightly below.

## The Broader Context

Food insecurity doesn't exist in isolation. Regions with higher food insecurity also tend to show higher expense difficulty rates. The Middle Atlantic reports 82.94% of residents finding expenses at least somewhat difficult, while the East South Central reports 75.58%.

These numbers represent real families making impossible tradeoffs between food, rent, and other necessities. The 22.48% who have "enough but not always the kinds they want" represent a shadow food insecurity — Americans who technically eat enough calories but cannot afford nutritious or preferred foods.

*Explore food data in detail on our [Food Security page](/food). See regional breakdowns on our [Regions page](/regions).*

*Data source: U.S. Census Bureau HTOPS, March 2026.*`,
  },
  {
    slug: 'housing-burden-by-state-2026',
    title: 'Rent Is Eating America: Housing Burden by Region',
    description: '8.87% of renters are behind on rent nationally, but the Middle Atlantic region hits 21.23%. Census HTOPS data on America\'s housing crisis.',
    date: '2026-04-17',
    topic: 'Housing',
    content: `The American housing crisis shows no signs of easing. According to the 2026 Census HTOPS survey, **8.87% of renters are behind on their rent** and **4.37% of mortgage holders are behind on payments**. But these national figures mask extraordinary regional variation that tells a deeper story about where housing is most unaffordable.

## The National Housing Picture

Of the estimated 258 million American adults surveyed:

- **42.15%** own their home outright (no mortgage)
- **25.72%** own with a mortgage
- **30.78%** rent
- **1.35%** have other arrangements

Among the approximately 79 million renters, about 7 million are behind on payments. Among 109 million mortgage holders, about 4.7 million are behind.

## Regional Rent Delinquency: A Crisis in the Northeast

The regional data on rent delinquency is striking:

- **Middle Atlantic (NJ, NY, PA): 21.23%** — more than one in five renters are behind, reflecting sky-high rents in the New York and New Jersey metro areas
- **South Atlantic (DE, DC, FL, GA, MD, NC, SC, VA, WV): 15.11%** — driven by rapidly rising rents in Florida, Georgia, and the DC corridor
- **Pacific (AK, CA, HI, OR, WA): 6.23%** — California's housing crisis contributes, but stronger tenant protections may help
- **West North Central (IA, KS, MN, MO, NE, ND, SD): 5.32%** — a more affordable housing market
- **New England (CT, ME, MA, NH, RI, VT): 5.19%** — surprising given Boston's high rents, perhaps reflecting strong local economies

At the low end, the **Mountain region** (AZ, CO, ID, MT, NV, NM, UT, WY) reports just **1.61%** rent delinquency, and the **East North Central** (IL, IN, MI, OH, WI) just 2.19%.

## The Cost Burden Connection

Housing burden connects directly to expense difficulty. In the Middle Atlantic, where rent delinquency hits 21.23%, 82.94% of residents report expense difficulty. The West North Central, with its 87.71% expense difficulty rate, has moderate rent delinquency at 5.32% — suggesting that while people feel the squeeze, a lower baseline cost of housing keeps them current on payments.

## What the Numbers Mean

The 21.23% rent delinquency in the Middle Atlantic is alarming. For every five renters in New Jersey, New York, and Pennsylvania, more than one is falling behind. These aren't just statistics — they represent families facing potential eviction, damaged credit, and housing instability.

The contrast with the Mountain region's 1.61% suggests that housing affordability remains the primary driver. Where housing costs are lower relative to income, people stay current on payments even when other expenses feel difficult.

*Explore the full housing data on our [Housing page](/housing). Compare regions with our [Compare tool](/compare).*

*Data source: U.S. Census Bureau HTOPS, March 2026.*`,
  },
  {
    slug: 'metro-vs-rural-2026',
    title: 'Metro vs. Rural: Two Americas in the Data',
    description: 'Census HTOPS data reveals how metro and non-metro Americans differ on AI usage, food security, and employment.',
    date: '2026-04-18',
    topic: 'Demographics',
    content: `The divide between metropolitan and non-metropolitan America is one of the defining features of the 2026 landscape. The Census HTOPS survey provides a data-driven look at how these two Americas compare across technology adoption, food security, and daily life.

## AI Usage: Metro vs. Non-Metro

One might expect a large urban-rural digital divide in AI adoption, but the data tells a more nuanced story. Non-metro areas report **24.47% AI usage** — essentially matching the national average of 24.07%.

However, individual metro areas show significant variation:

**Highest AI adoption:**
- **Houston: 29.80%** — energy sector tech investment may play a role
- **Washington DC: 29.83%** — government and contractor workforce with high digital literacy
- **Chicago: 27.07%** — diverse economy with strong tech presence
- **Atlanta: 26.21%** — growing tech hub in the Southeast
- **Philadelphia: 26.27%** — academic and pharmaceutical AI applications

**Lowest AI adoption:**
- **New York: 14.08%** — surprisingly low, possibly reflecting the city's large non-English-speaking and older populations
- **Los Angeles: 21.51%** — below average despite proximity to Silicon Beach
- **Dallas: 23.57%** — near the national average
- **Miami: 23.55%** — close to Dallas

New York's 14.08% stands out dramatically. Despite being a global media and finance capital, its AI adoption rate is nearly half the national average. This may reflect demographic factors: a large elderly population, significant immigrant communities, and income inequality that limits access for lower-income New Yorkers.

## Employment Patterns

Employment varies significantly by region, with Census divisions as our geographic lens:

- **East South Central (AL, KY, MS, TN): 59.06%** employed — the highest rate
- **New England (CT, ME, MA, NH, RI, VT): 59.00%** — virtually tied
- **Mountain (AZ, CO, ID, MT, NV, NM, UT, WY): 52.50%** — the lowest rate

Nationally, 56.64% of adults are employed, with 65.64% of workers never teleworking, 14.70% sometimes, and 12.05% always working remotely.

## The Two Americas Narrative — Complicated

The data complicates the simplistic "two Americas" narrative. Non-metro AI adoption matches metro averages. Some traditionally "rural" Census divisions like the West North Central lead in AI adoption (30.43%) and have moderate employment rates.

The real divides appear to be more about income and education than geography. Across the board, Americans earning $100K+ use AI at 25–27% rates regardless of whether they live in Houston or rural Iowa. The digital divide is becoming an economic divide that cuts across the metro/non-metro boundary.

What remains true: cost of living creates real differences in housing burden (1.61% rent behind in the Mountain region vs. 21.23% in the Middle Atlantic) and food access (5.30% food insecure in the West South Central vs. 9.46% in the Middle Atlantic). Geography matters — but perhaps less through a metro/rural lens than through a cost-of-living lens.

*Explore metro-level AI data on our [AI page](/ai). Compare regions with our [Compare tool](/compare).*

*Data source: U.S. Census Bureau HTOPS, March 2026.*`,
  },
  {
    slug: 'census-pulse-survey-2026',
    title: 'What the Census Pulse Survey Reveals About 2026',
    description: 'A comprehensive look at the 2026 Census HTOPS data: AI adoption, food security, housing, employment, health, and spending across America.',
    date: '2026-04-19',
    topic: 'Overview',
    content: `The U.S. Census Bureau's Household Trends and Outlook Pulse Survey (HTOPS), March 2026, is one of the most comprehensive snapshots of American life available. Surveying 7,485 respondents with weighted estimates representing approximately 261 million American adults, it covers AI usage, food security, housing, employment, health insurance, spending, and transportation. Here are the key findings.

## AI: A Mainstream Technology

**24.07% of Americans** now use artificial intelligence tools — making AI a mainstream technology used by roughly 63 million adults. The adoption curve favors those aged 25–39 (27.95%), those with bachelor's degrees (28.62%), and those earning $100K–$150K (26.89%). New England leads regional adoption at 33.79%.

Privacy and data security remains the top concern (cited by an estimated 83.7 million Americans), followed by bias and discrimination (52.8M) and impact on children (41.7M).

## Food Security: 7% Going Hungry

**7.03% of Americans are food insecure**, meaning they sometimes or often don't have enough to eat. Another 22.48% have enough food but not always the kinds they want. Regional variation is significant: the Middle Atlantic (9.46%) and East South Central (8.12%) have the highest rates, while the West South Central (5.30%) and Mountain (5.32%) have the lowest.

## Housing: Rent Delinquency Rising

**8.87% of renters are behind on rent** and **4.37% of mortgage holders are behind on payments**. The Middle Atlantic stands out with a staggering 21.23% rent delinquency rate, while the Mountain region reports just 1.61%. Housing tenure splits roughly: 42.15% own outright, 25.72% own with mortgage, and 30.78% rent.

## Employment: A Split Economy

**56.64% of adults are employed**. Among workers, the private sector dominates (60.62%), followed by self-employment (16.03%) and government (12.58%). Telework has settled into a new normal: 65.64% never telework, but 12.05% always work remotely and another 14.70% sometimes do.

Regional employment ranges from 59.06% in the East South Central to 52.50% in the Mountain region.

## Health Insurance: Gaps Remain

**7.45% of Americans lack health insurance** (approximately 19.4 million people). Employer-sponsored coverage remains dominant at 57.04%, followed by Medicare (28.28%), Medicaid (20.36%), and directly purchased plans (15.64%). The West South Central region has the highest uninsured rate at 16.10%.

## Spending: Americans Under Pressure

**19.77% of Americans find expenses very or somewhat difficult**. Price changes have affected spending for 75.28% of respondents. The expense difficulty rate suggests that roughly one in five Americans is under significant financial strain.

## The Big Picture

The 2026 HTOPS data paints a picture of an America in transition. AI is rapidly entering mainstream use. Food insecurity persists at concerning levels. Housing affordability is creating a geographic divide between where people can afford to live and where they want to. Employment has recovered but the nature of work — remote, hybrid, in-person — continues to evolve.

The regional data is perhaps most striking: the same country produces a 1.61% rent delinquency rate in the Mountain West and a 21.23% rate in the Middle Atlantic. It produces 33.79% AI adoption in New England and 19.27% in the Middle Atlantic. America in 2026 is not one country in the data — it's several, layered on top of each other.

*Explore all the data across our topic pages: [AI](/ai), [Food](/food), [Housing](/housing), [Employment](/employment), [Health](/health), [Spending](/spending), [Transportation](/transportation). Download the raw data on our [Downloads page](/downloads).*

*Data source: U.S. Census Bureau HTOPS, March 2026.*`,
  },
  {
    slug: 'ai-prosperity-gap',
    title: 'The AI Prosperity Gap: The Surprising U-Shape of AI Adoption by Income',
    description: 'Census HTOPS data reveals a surprising pattern: the $25K-$35K bracket uses AI more (29%) than those earning $150K+ (25%). The income story is more complex than expected.',
    date: '2026-04-20',
    topic: 'AI',
    content: `The 2026 Census HTOPS survey reveals something unexpected about AI adoption and income: **the relationship isn't linear — it's U-shaped.** The $25K–$35K bracket uses AI at **29.28%**, the highest of any income group, while those earning $150K+ come in at just **25.08%**. The simple narrative of "rich people use AI more" doesn't hold up.

## The Income × AI Cross-Tab

The full income breakdown tells a nuanced story:

- **Under $25K:** 18.83%
- **$25K–$35K:** 29.28% — the **highest** of any bracket
- **$35K–$50K:** 22.11%
- **$50K–$75K:** 22.96%
- **$75K–$100K:** 24.37%
- **$100K–$150K:** 26.89%
- **$150K+:** 25.08%

The ratio between the highest ($150K+) and lowest (under $25K) brackets is just **1.33×** — far from a dramatic divide. And the $25K–$35K bracket actually **exceeds** the top earners by 4 percentage points.

## The U-Shape Story

Why do lower-middle-income Americans lead AI adoption? Several theories:

**Practical necessity:** Americans earning $25K–$35K may use free AI tools like ChatGPT for practical tasks — price comparison, budget management, job searching, navigating bureaucracy. When money is tight, a free productivity tool is more valuable.

**Digital natives in entry-level jobs:** This bracket skews younger — digital natives comfortable with AI tools despite modest incomes.

**The middle-class plateau:** The $35K–$75K range shows the lowest adoption (22–23%), suggesting a "comfortable enough" zone where the urgency to adopt new tools is lower.

## The Real Divide

The under-$25K bracket at 18.83% does show a meaningful gap — but it's a gap of access and awareness, not a 3× chasm. The true digital divide may be less about income and more about **context**: whether your workplace introduces AI, whether your social circle uses it, and whether you see it as solving a real problem in your life.

## Education Matters More Than Income

Education correlates more strongly with AI adoption than income:

- **Bachelor's degree:** 28.62%
- **Associate degree:** 28.31%
- **Graduate degree:** 27.59%
- **High school diploma:** 22.78%

The education gap is wider and more consistent than the income gap, suggesting that **familiarity with information tools** — not purchasing power — drives adoption.

## What This Means

The U-shaped pattern is actually encouraging. It suggests that free AI tools are already reaching lower-income Americans who find them useful. The policy implication: **expanding awareness and digital literacy** may matter more than subsidizing access. The tools are already free — the gap is knowing they exist and how to use them.

*Correction (April 27, 2026): This article originally stated a 3× gap between high and low-income AI usage. The actual ratio is 1.33× ($150K+: 25.08% vs under $25K: 18.83%). The article has been rewritten to reflect the more accurate — and more interesting — U-shaped adoption pattern. See our [corrections page](/corrections) for details.*

*See who is lobbying to regulate AI at [theailobby.com](https://theailobby.com). Explore which jobs face the most AI exposure at [aiexposure.org](https://aiexposure.org).*

*Data source: U.S. Census Bureau HTOPS, March 2026.*`,
  },
  {
    slug: 'americas-squeeze-expenses',
    title: "America's Squeeze: 1 in 3 Households Can't Cover Basic Expenses",
    description: '19.77% of Americans find expenses very difficult and 80.39% report some level of difficulty. Census HTOPS data on the American expense crisis.',
    date: '2026-04-21',
    topic: 'Economy',
    content: `The U.S. Census Bureau's HTOPS survey paints a picture of an America under financial pressure. A staggering **80.39% of respondents report at least some difficulty** covering usual household expenses, with **19.77% finding it very or somewhat difficult**. Only about one in five Americans say paying their bills is not at all difficult.

## How Bad Is It?

The expense difficulty question asks respondents to rate how difficult it is to pay for usual household expenses like food, rent or mortgage, car payments, medical expenses, and student loans. The breakdown:

- **Not at all difficult:** 19.61%
- **A little difficult:** 60.62%
- **Somewhat difficult:** 14.93%
- **Very difficult:** 4.84%

That 4.84% "very difficult" rate represents roughly **12.6 million American adults** who are struggling to cover basic costs. Combined with the 14.93% who find it "somewhat difficult," nearly one in five Americans faces real financial strain.

## The Regional Squeeze

Financial pressure is not evenly distributed across the country. The Census divisions reveal significant variation:

**Most squeezed:**
- **West North Central (IA, KS, MN, MO, NE, ND, SD): 87.71%** report some difficulty — the highest in the nation despite relatively low housing costs, suggesting that stagnant wages in agricultural and manufacturing economies are taking their toll
- **Middle Atlantic (NJ, NY, PA): 82.94%** — high cost of living in the New York metro drives this number
- **South Atlantic (DE, DC, FL, GA, MD, NC, SC, VA, WV): 82.76%** — a fast-growing region where housing costs have outpaced wage growth

**Least squeezed:**
- **Mountain (AZ, CO, ID, MT, NV, NM, UT, WY): 73.90%** — still high, but the lowest nationally
- **East South Central (AL, KY, MS, TN): 75.58%** — lower cost of living provides some buffer

## Income Tells the Story

Unsurprisingly, income is the strongest predictor of expense difficulty. Among those earning under $25K, the "very difficult" rate is dramatically higher than for those above $100K. But even among six-figure earners, a majority report at least "a little" difficulty — reflecting the reality that expenses scale with income as people take on mortgages, childcare, and other obligations.

## The Spending Squeeze Effect

The expense difficulty numbers connect to another HTOPS finding: **75.28% of Americans report that price changes have affected their spending**. Inflation may have moderated from its 2022 peaks, but the cumulative effect of years of elevated prices has eroded household budgets.

Americans are adapting: buying less, switching to store brands, cutting discretionary spending. But when 80% of the population finds expenses at least somewhat difficult, the squeeze is no longer affecting just the poor — it's a middle-class reality.

## What It Means

An economy where four out of five adults struggle with expenses is an economy under strain. The data suggests that while headline unemployment is low and GDP growth continues, the lived experience of most Americans involves constant financial juggling. The gap between macroeconomic statistics and kitchen-table economics has rarely been wider.

*Explore financial data on our [Spending page](/spending). Compare regional differences with our [Compare tool](/compare).*

*Data source: U.S. Census Bureau HTOPS, March 2026.*`,
  },
  {
    slug: 'covid-recovery-six-years',
    title: 'The COVID Recovery, 6 Years Later: Where America Stands in 2026',
    description: 'Food insecurity dropped from 23% to 7%, anxiety from 40% to ~20%. A data-driven look at how far America has come since 2020 — and what still lags.',
    date: '2026-04-22',
    topic: 'Economy',
    content: `Six years after the COVID-19 pandemic shut down the American economy, the 2026 Census HTOPS data offers a clear-eyed look at recovery. The numbers tell a story of remarkable progress on some fronts — and persistent pain on others.

## The Recovery Scorecard

Comparing the worst moments of the pandemic-era Household Pulse Survey to the 2026 HTOPS data:

**Food insecurity:** Dropped from **23% (2020) to 7.03% (2026)** — a dramatic improvement. At the height of the pandemic, nearly one in four Americans reported food insufficiency as job losses, supply chain disruptions, and school closures combined. Today's 7.03% is still 18.3 million adults, but the trajectory is unmistakable.

**Anxiety/mental health:** Fell from roughly **40% (2020) to ~20% (2026)**. The pandemic-era Pulse Survey recorded record levels of anxiety and depression symptoms. While mental health measures have improved significantly, they remain elevated compared to pre-pandemic baselines.

**Rent delinquency:** Declined from **15% (2020–2021) to 8.87% (2026)**. The eviction moratoriums of 2020–2021 masked even higher true delinquency. Today's 8.87% reflects a normalization, though it remains concerning — especially in the Middle Atlantic at 21.23%.

## What Worked

Several factors drove the recovery:

**Direct stimulus payments** in 2020 and 2021 put cash directly into household budgets, reducing food insecurity and keeping renters current. The expanded Child Tax Credit temporarily cut child poverty in half. Emergency rental assistance prevented millions of evictions.

**Labor market recovery** was faster than many predicted. The unemployment rate returned to pre-pandemic levels by 2022, and the current HTOPS data shows 56.64% employment — roughly in line with historical norms for the adult population (which includes retirees, students, and those not seeking work).

**Vaccine rollout** in 2021 allowed service industries to reopen, bringing back jobs in hospitality, retail, and food service that had been decimated.

## What Didn't Work — Or Hasn't Yet

**Housing affordability** has worsened in many markets. Pandemic-era migration to Sun Belt cities drove up prices in previously affordable areas. The 8.87% national rent delinquency rate understates the crisis in specific regions.

**The expense squeeze is real.** Despite recovery in employment and food security, 80.39% of Americans report difficulty with expenses. Years of cumulative inflation have raised the baseline cost of living, and wages haven't fully caught up.

**Health insurance gaps persist.** At 7.45% uninsured, millions of Americans still lack coverage. The pandemic exposed the fragility of employer-tied insurance, but no durable solution has emerged.

## The Government Efficiency Factor

The current political landscape includes a significant push for government efficiency through the Department of Government Efficiency (DOGE) initiative. While aimed at reducing federal spending, there are concerns that cuts to safety-net programs could slow or reverse recovery gains. The HTOPS data will be critical for tracking whether efficiency measures affect food security, health insurance coverage, and household financial stability in future waves.

## The Bottom Line

America in 2026 is measurably better off than America in 2020. Food insecurity has been cut by two-thirds. Anxiety levels have been halved. Rent delinquency has dropped significantly. But the recovery is uneven and incomplete. The expense squeeze, regional housing crises, and persistent insurance gaps mean that for tens of millions of Americans, the pandemic's economic aftershocks continue to reverberate.

*Explore the full data across our topic pages: [Food](/food), [Housing](/housing), [Employment](/employment), [Health](/health), [Spending](/spending).*

*Data source: U.S. Census Bureau HTOPS, March 2026. Historical comparisons from Census Household Pulse Survey (2020–2023).*`,
  },
  {
    slug: 'zip-code-determines-wellbeing',
    title: 'Why Your Zip Code Determines Your Wellbeing',
    description: 'Metro vs rural disparities and regional differences across the 9 Census divisions reveal how geography shapes American wellbeing in 2026.',
    date: '2026-04-23',
    topic: 'Regional',
    content: `The 2026 Census HTOPS data makes one thing clear: **where you live in America shapes nearly every measure of wellbeing**. From food security to AI adoption, housing affordability to health insurance, the 9 Census divisions tell starkly different stories about American life.

## The Regional Wellbeing Map

The American Wellbeing Index, computed from six HTOPS metrics, reveals a geography of advantage and disadvantage:

**Top-performing divisions** tend to cluster in the Mountain West and agricultural Midwest, where lower costs of living buffer households against financial strain. The **Mountain division** (AZ, CO, ID, MT, NV, NM, UT, WY) combines the lowest rent delinquency (1.61%) with moderate food insecurity (5.32%) and reasonable expense difficulty (73.90%).

**Bottom-performing divisions** include the **Middle Atlantic** (NJ, NY, PA), which despite high incomes suffers from crushing housing costs (21.23% rent delinquency), elevated food insecurity (9.46%), and widespread expense difficulty (82.94%). The **East South Central** (AL, KY, MS, TN) faces different challenges: lower housing costs but higher poverty, food insecurity at 8.12%, and the highest uninsured rate outside the West South Central.

## Metro vs. Rural: Not What You'd Expect

The conventional wisdom positions cities as engines of opportunity and rural areas as left behind. The HTOPS data complicates this narrative:

- **AI adoption** is nearly identical: non-metro areas report 24.47% vs. the national 24.07%
- **Houston (29.80%)** and **Washington DC (29.83%)** lead AI adoption, but **New York trails at just 14.08%**
- Employment rates don't follow a clean metro/rural divide — the East South Central (mostly rural) leads at 59.06%

The divide isn't metro vs. rural — it's **high-cost vs. low-cost**. Americans in expensive metros face housing burdens that offset their higher incomes. Americans in affordable rural areas face lower incomes but also lower costs.

## Division by Division

**New England** (CT, ME, MA, NH, RI, VT): Leads the nation in AI adoption at 33.79% and has moderate food insecurity (6.97%). Strong local economies and high education levels drive performance, but housing costs are rising.

**Middle Atlantic** (NJ, NY, PA): The most stressed division. Highest food insecurity (9.46%), highest rent delinquency (21.23%), and near-highest expense difficulty. High incomes can't compensate for extreme housing costs.

**South Atlantic** (DE, DC, FL, GA, MD, NC, SC, VA, WV): A mixed bag driven by rapid growth. Rent delinquency at 15.11% reflects Sun Belt housing pressure. DC-area incomes pull up averages, masking poverty in West Virginia and rural Carolinas.

**East South Central** (AL, KY, MS, TN): High employment but high food insecurity (8.12%). Limited safety net infrastructure and persistent poverty define the region's challenges.

**West South Central** (AR, LA, OK, TX): The highest uninsured rate at 16.10% — double the national average. Texas's decision not to expand Medicaid is visible in the data. But lower housing costs keep rent delinquency modest.

**West North Central** (IA, KS, MN, MO, NE, ND, SD): Surprisingly high AI adoption (30.43%) alongside the highest expense difficulty (87.71%). Agricultural economy stress meets digital literacy.

**Mountain** (AZ, CO, ID, MT, NV, NM, UT, WY): The best-performing division on housing (1.61% rent behind) and expense difficulty (73.90%). Growing tech presence in Colorado and Utah drives AI adoption.

**Pacific** (AK, CA, HI, OR, WA): Above-average on most measures but dragged down by California's housing costs and homeless population. Food insecurity at 7.47% tracks the national average.

## The Wellbeing Lottery

The data amounts to a **wellbeing lottery**: born in the Mountain West, you face a 1.61% chance of falling behind on rent. Born in the Middle Atlantic, that chance jumps to 21.23% — a 13× difference. Your zip code isn't destiny, but it's a powerful predictor of financial stress, food access, health coverage, and even access to AI tools.

*Explore regional data on our [Regions page](/regions). Compare divisions with our [Compare tool](/compare). See the full Wellbeing Index at [Wellbeing](/wellbeing).*

*Data source: U.S. Census Bureau HTOPS, March 2026.*`,
  },
  {
    slug: 'state-wellbeing-rankings-2026',
    title: 'Which States Are Struggling the Most? The 2026 Wellbeing Rankings',
    description: 'Ranking all 9 Census divisions by a composite Wellbeing Index built from food security, housing, employment, insurance, and expense data.',
    date: '2026-04-25',
    topic: 'Wellbeing',
    content: `Every Census division tells a different story about American life in 2026. By combining six HTOPS metrics into a composite **Wellbeing Index**, we can rank the regions and see where Americans are thriving and where they're struggling.

## How the Wellbeing Index Works

Each metric is scored on a 0-100 scale relative to the best and worst divisions, then averaged. Higher employment and AI usage are positive; higher food insecurity, uninsured rates, rent delinquency, and expense difficulty are negative.

## The Rankings

**1. Mountain (AZ, CO, ID, MT, NV, NM, UT, WY)** — Lowest rent delinquency (1.61%), moderate food insecurity (5.32%), expense difficulty 79.02%. Lower housing costs are the key advantage.

**2. West North Central (IA, KS, MN, MO, NE, ND, SD)** — Strong AI adoption (30.43%), low food insecurity (5.39%). But the highest expense difficulty in the nation (87.71%).

**3. East North Central (IL, IN, MI, OH, WI)** — Very low rent delinquency (2.19%) and food insecurity (6.90%). Solid employment at 58.37%.

**4. New England (CT, ME, MA, NH, RI, VT)** — Nation-leading AI adoption (33.79%) and employment (59.00%). Moderate food insecurity (6.97%).

**5. Pacific (AK, CA, HI, OR, WA)** — Middle of the pack. Lowest uninsured rate (3.61%) is a bright spot.

**6. West South Central (AR, LA, OK, TX)** — Low food insecurity (5.30%) but highest uninsured rate (16.10%).

**7. South Atlantic (DE, DC, FL, GA, MD, NC, SC, VA, WV)** — Rent delinquency at 15.11%, second highest nationally.

**8. East South Central (AL, KY, MS, TN)** — Highest employment (59.06%) but food insecurity at 8.12%.

**9. Middle Atlantic (NJ, NY, PA)** — Most stressed. Highest food insecurity (9.46%), highest rent delinquency (21.23%), near-highest expense difficulty (82.94%).

## What Drives the Rankings?

Housing affordability is the single strongest predictor. The Mountain division's 1.61% rent delinquency versus the Middle Atlantic's 21.23% creates a 13x gap. Insurance coverage is the second biggest differentiator.

## The Takeaway

Your region shapes your economic reality. **Cost of living, not GDP, is the true measure of regional prosperity**.

*See the full Wellbeing Index at [Wellbeing](/wellbeing). Explore each division on our [Regions page](/regions). Take the [calculator](/calculator) to see how you compare.*

*Data source: U.S. Census Bureau HTOPS, March 2026.*`,
  },
  {
    slug: 'ai-generation-gap-2026',
    title: 'The AI Generation Gap: Young Americans Lead AI Adoption',
    description: 'Census HTOPS age data reveals who uses AI and who doesn\'t — and the answer defies simple assumptions about young people and tech.',
    date: '2026-04-26',
    topic: 'AI',
    content: `The 2026 Census HTOPS data on AI adoption by age defies the simplest assumptions. **The 25-39 age group leads AI adoption at 27.95%** — and the age curve isn't a simple downward slope.

## AI Usage by Age

- **18-24:** 20.69% (n=144)
- **25-39:** 27.95% (n=1,667) — the highest
- **40-54:** 24.65% (n=1,917)
- **55-64:** 26.89% (n=1,357) — surprisingly high
- **65+:** 18.84% (n=2,366) — the lowest

The surprise is the 55-64 bracket at 26.89% — nearly matching the 25-39 leaders. These are late-career professionals in management or knowledge-worker roles where AI tools are increasingly standard.

## Why Aren't 18-24-Year-Olds Leading?

**Small sample size (n=144)** means higher margin of error. **Embedded AI vs. recognized AI** — young adults use AI-powered features daily but may not label them as AI. Among 18-24-year-olds, 23.77% said they're "not sure" if they use AI — the highest uncertainty of any age group.

**Workplace vs. personal use** — much of the AI surge is workplace-driven. The 25-39 and 55-64 cohorts use AI for work projects and professional tasks.

## The Professional Sweet Spot

The 25-39 bracket leads because they're deep enough in careers to encounter AI at work, young enough to be comfortable with new tech, and in industries that have aggressively adopted AI.

The 40-54 dip to 24.65% may reflect more traditional roles, but the bounce to 26.89% for 55-64 shows senior professionals embracing AI as a productivity tool.

## The 65+ Gap

At 18.84%, Americans 65+ have the lowest adoption. But that still means roughly **9 million older adults are using AI** — mostly for finding information and health questions.

## What This Means

The AI generation gap isn't a cliff — it's a curve with a surprising bump among older professionals. The real divide is about **workplace exposure, income, and education**, not birth year.

*See the full AI data on our [AI page](/ai). Explore the income divide in [The AI Prosperity Gap](/articles/ai-prosperity-gap). Take the [calculator](/calculator).*

*Data source: U.S. Census Bureau HTOPS, March 2026.*`,
  },
  {
    slug: 'food-crisis-census-2026',
    title: "America's Food Crisis Isn't Over: What the Census Data Shows",
    description: '7.03% of Americans are food insecure in 2026 — down from pandemic peaks but still 18.3 million adults. Census HTOPS vs USDA data.',
    date: '2026-04-27',
    topic: 'Food',
    content: `The pandemic may be over, but America's food crisis is not. The 2026 Census HTOPS data shows **7.03% of Americans are food insecure** — approximately **18.3 million adults** who sometimes or often don't have enough to eat.

## Census vs. USDA: Two Measures of Hunger

**USDA Food Security Survey (2023):** 13.5% of households food insecure at some point during the year; 47.4 million people affected.

**Census HTOPS (March 2026):** 7.03% food insecure in the past 7 days. 5.29% sometimes didn't have enough; 1.74% often didn't have enough. An additional 22.48% had food but not always the kinds they wanted.

The USDA number is higher because it captures any food insecurity over a full year. The HTOPS is a weekly snapshot — 7.03% at any given point means roughly 1 in 14 adults.

## The Regional Food Map

**Highest:** Middle Atlantic (9.46%), East South Central (8.12%), Pacific (7.47%)

**Lowest:** West South Central (5.30%), Mountain (5.32%), West North Central (5.39%)

**Food insecurity tracks cost of living**, not poverty alone.

## The Shadow Food Crisis

The **22.48% who have enough food but not the kinds they want** represent the shadow food crisis — Americans surviving on cheap processed food. Combined with the 7.03%, **nearly 30% of Americans face food access challenges**.

## The Pandemic Recovery — and Its Limits

Food insecurity dropped from 23% (2020) to 7.03% (2026). But the recovery has plateaued — 7% appears to be a structural floor that economic growth alone can't break through.

## The Expense Connection

The tradeoff is stark: pay rent or eat. In the Middle Atlantic where rent delinquency is 21.23%, food is often what gets cut.

## What the Data Demands

America's food crisis is structural, not cyclical. Addressing it requires tackling the underlying cost structure: housing, health care, and wage stagnation.

*Explore food data on our [Food Security page](/food). See [Regions](/regions) for breakdowns. Check [Food Insecurity by State](/food-insecurity-by-state) for state-level data.*

*Data source: U.S. Census Bureau HTOPS, March 2026. USDA ERS, Household Food Security 2023.*`,
  },
  {
    slug: 'uninsured-2026',
    title: 'The Uninsured in 2026: 8% of Americans Still Without Coverage',
    description: 'Census HTOPS data shows 7.45% of Americans lack health insurance. By region, income, and age — who falls through the cracks.',
    date: '2026-04-24',
    topic: 'Health',
    content: `Despite decades of health care reform, **7.45% of Americans — roughly 19.4 million adults — lack health insurance** according to the 2026 Census HTOPS survey. The uninsured rate has improved from pre-ACA levels above 15%, but stubborn gaps remain, concentrated by geography, income, and age.

## The National Insurance Picture

The HTOPS data shows how Americans are covered:

- **Employer-sponsored insurance:** 57.04% — still the backbone of American coverage
- **Medicare:** 28.28% — reflecting the large retiree population
- **Medicaid/CHIP:** 20.36% — the safety net for low-income Americans
- **Directly purchased (marketplace):** 15.64% — ACA marketplace plans
- **TRICARE/VA:** 8.10% — military and veteran coverage
- **Uninsured:** 7.45%

Note that percentages sum to more than 100% because respondents can have multiple coverage types.

## The Geography of Uninsurance

The regional data reveals a clear policy divide:

**Highest uninsured rates:**
- **West South Central (AR, LA, OK, TX): 16.10%** — more than double the national average. Texas alone accounts for a significant share, having declined to expand Medicaid under the ACA. Arkansas expanded Medicaid through a private option but Oklahoma and Louisiana have mixed records.
- **Mountain (AZ, CO, ID, MT, NV, NM, UT, WY): 10.59%** — several states in this division were late Medicaid expanders or have large undocumented populations ineligible for coverage
- **East South Central (AL, KY, MS, TN): 8.96%** — Alabama and Mississippi have not expanded Medicaid

**Lowest uninsured rates:**
- **New England (CT, ME, MA, NH, RI, VT): 2.67%** — Massachusetts pioneered universal coverage before the ACA, and all New England states expanded Medicaid
- **East North Central (IL, IN, MI, OH, WI): 3.72%** — Medicaid expansion and strong employer coverage
- **Middle Atlantic (NJ, NY, PA): 4.80%** — despite other challenges, the Northeast covers its residents relatively well

The 6× gap between New England (2.67%) and the West South Central (16.10%) illustrates how **state policy choices on Medicaid expansion directly shape coverage rates**.

## Income and Uninsurance

Income is the strongest predictor of coverage status. Americans earning under $25K are far more likely to be uninsured than those above $75K. The coverage gap is sharpest in states without Medicaid expansion, where adults earning between 100–138% of the federal poverty level fall into a "coverage gap" — too much income for Medicaid, too little for affordable marketplace plans.

The $25K–$50K range is particularly vulnerable. These workers often hold jobs that don't offer employer coverage (retail, food service, gig work) but earn too much for Medicaid in non-expansion states.

## Age and Coverage

Coverage patterns follow a predictable age curve:

- **18–24:** Higher uninsured rates, as young adults age off parental plans at 26 and may not have employer coverage
- **25–39:** The peak uninsured age range — old enough to have aged off parental plans, working in industries less likely to offer coverage
- **40–64:** Gradually declining uninsured rates as careers stabilize and employer coverage becomes more common
- **65+:** Near-universal coverage through Medicare (though supplemental coverage varies widely)

The ACA's provision allowing adults to stay on parental plans until 26 helped, but the 25–39 cohort remains the most vulnerable.

## The Cost of Being Uninsured

The 19.4 million uninsured Americans face real consequences: delayed preventive care, emergency room visits for treatable conditions, medical debt as the leading cause of personal bankruptcy, and worse health outcomes. Studies consistently show that gaining insurance coverage improves health, increases access to care, and reduces financial strain.

## What Would Move the Needle?

The data points to clear policy levers. The states with the highest uninsured rates are overwhelmingly those that declined Medicaid expansion. If every state expanded Medicaid, an estimated 2–4 million additional adults would gain coverage. Improving marketplace subsidies and addressing the "family glitch" in employer coverage could reach millions more.

The 2026 HTOPS data serves as a reminder: America's uninsured problem is smaller than it was a decade ago, but it hasn't gone away — and it's concentrated in places where policy choices leave the most vulnerable without coverage.

*Explore health insurance data on our [Health page](/health). See state-level estimates on our [States pages](/states).*

*Data source: U.S. Census Bureau HTOPS, March 2026.*`,
  },
  {
    slug: 'trust-rankings-congress-last',
    title: 'Who Does America Trust? Congress Ranks Last',
    description: 'Census Bureau #1 at 70.7%, Military #2 at 65.1%, Congress dead last at 17.9%. Trust rankings from the 2026 Census HTOPS survey.',
    date: '2026-04-27',
    topic: 'Trust',
    content: `The 2026 Census Bureau's Household Trends and Outlook Pulse Survey (HTOPS) asked Americans how much confidence they have in nine major institutions. The results reveal a nation that trusts its data collectors far more than its lawmakers.

## The Rankings

The **U.S. Census Bureau** tops the list at **70.7%** — meaning more than seven in ten Americans have "a great deal" or "quite a lot" of confidence in the agency. The **Military** follows at **65.1%**, and **U.S. Statistical Agencies** broadly come in at **62.3%**.

At the bottom? **Congress, at just 17.9%.** Fewer than one in five Americans have high confidence in the legislative branch. A staggering 41.7% say they have "very little" confidence — the highest disapproval of any institution measured.

The full ranking:
1. U.S. Census Bureau — 70.7%
2. The Military — 65.1%
3. U.S. Statistical Agencies — 62.3%
4. The Police — 53.4%
5. Public Schools — 46.8%
6. U.S. Supreme Court — 34.5%
7. Criminal Justice System — 31.8%
8. The Presidency — 27.5%
9. Congress — 17.9%

## The Age Factor

Do younger Americans trust institutions less? The data says: it depends on the institution.

For the **Census Bureau**, trust increases with age but stays high across the board: 61.7% for ages 18-29, rising to 77.9% for those 75+. The pattern is similar for the **Military** — younger adults are less trusting (52.5% for 18-29) but the gap isn't as dramatic as you might expect.

For **the Police**, the age gap is enormous. Only **33.6%** of Americans aged 18-29 have high confidence in police, compared to **73.9%** of those 75 and older. That's a 40-point spread — the largest age gap of any institution.

**Congress** is universally distrusted regardless of age. The range runs from 15.1% (75+) to 19.9% (45-59) — nobody likes Congress, young or old.

## The Income Divide

Does money buy trust? For most institutions, higher income correlates with slightly higher trust. Census Bureau trust ranges from 65.9% (under $25K) to 79.1% ($150K+). Military trust shows a similar but smaller gradient.

But **Congress breaks the pattern entirely.** Americans earning under $25K actually show the **highest** Congressional trust at 29.8% — nearly double the rate of those earning $100K-$150K (13.7%). One interpretation: lower-income Americans may look to government for more direct assistance and thus maintain relatively more faith in the institution. Higher-income Americans, who interact more with the tax code and regulatory apparatus, may be more cynical.

## The Education Pattern

Education amplifies trust in data-producing institutions. Trust in the Census Bureau jumps from 57.6% among those with less than a high school education to 86.1% for graduate degree holders. Trust in federal statistics follows the same curve: 57.1% for the lowest education bracket to 86.1% for the highest.

For Congress, education barely moves the needle. No education bracket exceeds 20% high trust.

## The Meta Finding

Here's the most interesting takeaway: **Americans trust the Census Bureau that produces this data more than almost any other institution.** The agency that surveys the public about institutional trust is itself the most trusted institution. That's either deeply reassuring about data quality — or a fascinating paradox about who we choose to believe.

The 70.7% trust in the Census Bureau also lends credibility to the survey itself. When seven in ten respondents trust the messenger, the message carries more weight.

Meanwhile, Congress sits at 17.9% and falling. In a democracy, the institution designed to represent the people is the one the people trust least. That gap between the Census Bureau (data) and Congress (power) may be the most telling number in the entire survey.

*Explore the full trust rankings with demographic breakdowns on our [Trust page](/trust). See who lobbies Congress at [theailobby.com](https://theailobby.com).*

*Data source: U.S. Census Bureau HTOPS, March 2026.*`,
  },
  {
    slug: 'childcare-desert-income',
    title: 'The Childcare Desert: How Income Determines Access',
    description: '6.6% of families with kids had childcare disruptions. 25.9% cut work hours, 25.5% supervised kids while working. The hidden economic cost.',
    date: '2026-04-27',
    topic: 'Economy',
    content: `When childcare falls apart, so does everything else. The 2026 Census HTOPS survey reveals that **6.6% of families with children** experienced childcare disruptions in the past four weeks — and the consequences cascade through household economics in ways that rarely make headlines.

## The Disruption Rate

Of 2,444 households with children surveyed, 161 reported childcare problems. Weighted to the population, 6.6% said yes, 55.9% said no, and 37.5% said the question wasn't applicable (no regular childcare arrangement). That 6.6% may sound small, but it represents millions of families making impossible tradeoffs every month.

## What Happens When Childcare Fails

The survey asked affected families what happened as a result. The answers paint a picture of economic disruption:

- **25.9% cut their work hours** — directly reducing household income
- **25.5% supervised children while working** — the "laptop on the kitchen table" scenario that kills productivity
- **21.2% did not look for a job** — sidelining potential earners entirely
- **18.9% took unpaid leave** — losing income with no safety net
- **18.8% used vacation or sick leave** — burning limited PTO on childcare emergencies
- **18.6% left a job** — the most drastic outcome, with long-term career consequences
- **12.7% lost a job** — fired or let go because childcare issues made work impossible

These aren't mutually exclusive. Many families experienced multiple consequences simultaneously — cutting hours AND supervising children while working, or taking unpaid leave before ultimately leaving a job.

## The Income Divide

Childcare disruptions don't hit everyone equally. The income breakdown reveals a clear gradient:

- **Under $25K: 10.4%** disruption rate — the highest by far
- **$25K-$35K: 6.0%**
- **$35K-$50K: 6.8%**
- **$50K-$75K: 3.8%** — the lowest rate
- **$75K-$100K: 6.0%**
- **$100K-$150K: 7.6%** — a surprising bump
- **$150K+: 4.8%**

The pattern isn't a simple "more money, fewer problems." The lowest-income families face the highest disruption rates — 10.4% vs. 3.8% for the $50K-$75K bracket. That's nearly three times the risk. These families have the fewest backup options: no nanny, no flexible work arrangement, no grandparent nearby who doesn't also work.

But the $100K-$150K bump is intriguing. These dual-income professional families may rely heavily on formal childcare arrangements (daycare centers, after-school programs) that have their own fragility — closures, staffing shortages, waitlists. When institutional childcare fails, families accustomed to it may be less equipped with informal alternatives.

## The Hidden Economic Cost

Consider the math. If 6.6% of families with children experience disruptions, and roughly a quarter of those families cut work hours or left jobs, the aggregate economic impact is enormous. Lost wages. Reduced productivity. Career setbacks that compound over years — the parent who leaves for six months returns at a lower salary, misses a promotion cycle, and never quite catches up.

The 12.7% job loss rate among affected families is particularly stark. Losing a job doesn't just mean lost income today — it means gaps on resumes, lost employer-sponsored health insurance, depleted savings, and increased risk of cascading financial problems.

## Metro vs. Rural

Metro areas report a 7.8% childcare disruption rate compared to 5.5% in non-metro areas. Higher costs, longer commutes, and less family proximity in cities may reduce childcare resilience. Rural families, while facing fewer formal options, may benefit from stronger informal support networks.

## The Policy Gap

The childcare crisis isn't new, but the HTOPS data quantifies its ongoing impact with unusual precision. The question isn't whether childcare disruptions matter — the data proves they cause job loss, income reduction, and workforce exit. The question is whether the cost of childcare support is higher or lower than the economic damage caused by its absence.

At 6.6% of families affected in any given month, the annual exposure is likely much higher. This isn't a niche issue — it's a structural economic drag hiding in plain sight.

*Explore the full childcare data on our [Childcare page](/childcare). See how expenses affect families on our [Spending page](/spending).*

*Data source: U.S. Census Bureau HTOPS, March 2026.*`,
  },
  {
    slug: 'price-shock-2026',
    title: 'Price Shock: How Inflation Is Still Squeezing Households in 2026',
    description: '75.3% say prices increased. 27.5% found it very stressful. 47.4% very concerned about future prices. Income breakdown from Census HTOPS 2026.',
    date: '2026-04-27',
    topic: 'Economy',
    content: `The inflation headlines may have faded, but the price shock hasn't. The 2026 Census HTOPS survey finds that **75.3% of Americans say prices have increased** over the past 12 months. Among those who saw increases, **27.5% describe the impact as "very stressful."** And looking ahead, **47.4% are "very concerned"** about future price changes.

These aren't pandemic-era numbers. This is 2026 — years after the Fed declared inflation under control. The data tells a different story at the kitchen table.

## The Price Perception Gap

The survey asked: "Over the past 12 months, would you say that the prices of the goods and services you usually buy have increased, stayed the same, decreased, or are you not sure?"

- **75.3%** — Prices increased
- **16.5%** — Prices stayed the same
- **2.9%** — Prices decreased
- **5.3%** — Not sure

Three-quarters of Americans perceive ongoing price increases. Only 2.9% think prices went down. Even if official CPI inflation has moderated, the **cumulative effect of years of elevated prices** means Americans are paying significantly more for groceries, rent, gas, and insurance than they were in 2020. The price level didn't go back down — it just stopped rising as fast.

## The Stress Factor

Among the 75.3% who saw prices increase, the stress breakdown reveals real pain:

- **27.5%** — Very stressful
- **31.4%** — Moderately stressful
- **33.0%** — A little stressful
- **8.1%** — Not at all stressful

Nearly 60% find price increases at least moderately stressful. Only 8.1% shrug it off entirely. The "very stressful" group — more than one in four — represents roughly 54 million Americans who are genuinely struggling with the cost of their daily lives.

## Income Makes All the Difference

The income breakdown on price stress is the most telling data in the survey:

**"Very stressful" rate by income:**
- Under $25K: **43.7%**
- $25K-$35K: **40.6%**
- $35K-$50K: **34.0%**
- $50K-$75K: **29.6%**
- $75K-$100K: **22.6%**
- $100K-$150K: **16.3%**
- $150K+: **11.9%**

The gradient is nearly linear and devastating. Americans earning under $25K are almost **four times as likely** to find price increases very stressful compared to those earning $150K+. This isn't surprising — but the magnitude matters. At 43.7%, nearly half of the lowest-income Americans are under severe financial stress from prices alone.

## Future Concern

Beyond current stress, Americans are worried about what's coming:

- **47.4%** — Very concerned about future prices
- **28.3%** — Somewhat concerned
- **18.3%** — A little concerned
- **6.0%** — Not at all concerned

Nearly half the country is very concerned about future price changes. By income, the pattern repeats: 59.5% of those under $25K are very concerned, compared to 35.4% of those earning $150K+.

Age also matters. Younger Americans (18-29: 52.0%, 30-44: 51.9%) are more concerned than older Americans (75+: 34.3%), likely reflecting that younger households have less savings buffer and are earlier in their earning trajectory.

## The Disconnect

There's a growing gap between macroeconomic indicators and lived experience. GDP grows. Unemployment stays low. The stock market hits highs. But 75.3% of Americans say prices are still going up, 27.5% find it very stressful, and 47.4% are very worried about the future.

This disconnect has political implications. When economists say inflation is "under control" but three-quarters of voters say prices are rising and nearly half are very worried, the economic conversation is happening in two different languages.

The HTOPS data suggests the price shock of 2021-2023 hasn't been absorbed — it's been **incorporated** into a permanently higher cost of living that continues to squeeze household budgets, especially for those who can least afford it.

*Explore price and spending data on our [Prices page](/prices) and [Spending page](/spending). See food impact at [Food Security](/food).*

*Data source: U.S. Census Bureau HTOPS, March 2026.*`,
  },
];
