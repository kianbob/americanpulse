#!/usr/bin/env node

/**
 * Build region-details.json by combining data from all topic-specific stats files.
 * Reads from ~/Projects/htops-data/processed/ and writes to public/data/region-details.json.
 */

const fs = require('fs');
const path = require('path');

const HTOPS_DIR = path.join(require('os').homedir(), 'Projects/htops-data/processed');
const OUT_DIR = path.join(__dirname, '..', 'public/data');

function readJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

const aiStats = readJSON(path.join(HTOPS_DIR, 'ai-stats.json'));
const foodStats = readJSON(path.join(HTOPS_DIR, 'food-stats.json'));
const housingStats = readJSON(path.join(HTOPS_DIR, 'housing-stats.json'));
const employmentStats = readJSON(path.join(HTOPS_DIR, 'employment-stats.json'));
const regionStats = readJSON(path.join(HTOPS_DIR, 'region-stats.json'));
const nationalStats = readJSON(path.join(HTOPS_DIR, 'national-stats.json'));

// National averages for comparison
const national = {
  aiUsage: nationalStats.headlines.aiUsagePct,
  foodInsufficient: nationalStats.headlines.foodInsufficientPct,
  rentBehind: nationalStats.headlines.housingBurden.rentBehindPct,
  mortgageBehind: nationalStats.headlines.housingBurden.mortgageBehindPct,
  employed: nationalStats.headlines.employedPct,
  uninsured: nationalStats.headlines.uninsuredPct,
  expenseDifficulty: nationalStats.headlines.expenseDifficultyPct,
};

const regionDetails = {};

for (const [name, data] of Object.entries(regionStats)) {
  const slug = name.toLowerCase().replace(/\s+/g, '-');

  const aiRegion = aiStats.byRegion[name] || {};
  const foodRegion = foodStats.byRegion[name] || {};
  const housingRegion = housingStats.byRegion[name] || {};
  const employmentRegion = employmentStats.byRegion[name] || {};

  regionDetails[name] = {
    slug,
    states: data.states,
    n: data.n,
    metrics: {
      aiUsage: aiRegion.aiUsage ?? data.aiUsage ?? null,
      foodInsufficient: foodRegion.foodInsufficient ?? data.foodInsufficient ?? null,
      rentBehind: housingRegion.rentBehind ?? data.rentBehind ?? null,
      employed: employmentRegion.employed ?? data.employed ?? null,
      uninsured: data.uninsured ?? null,
      expenseDifficult: data.expenseDifficult ?? null,
    },
    national,
    // Include national-level topic data for display on region pages
    nationalTopics: {
      ai: {
        tools: aiStats.tools,
        purposes: aiStats.purposes,
        concerns: aiStats.concerns,
        byAge: aiStats.byAge,
        byIncome: aiStats.byIncome,
        byEducation: aiStats.byEducation,
      },
      food: {
        sufficiency: foodStats.sufficiency,
        insecurePct: foodStats.insecurePct,
      },
      housing: {
        tenure: housingStats.tenure,
        rentCurrent: housingStats.rentCurrent,
        mortgageCurrent: housingStats.mortgageCurrent,
      },
      employment: {
        anywork: employmentStats.anywork,
        workType: employmentStats.workType,
        telework: employmentStats.telework,
      },
    },
    // All regions for comparison charts
    allRegions: Object.fromEntries(
      Object.entries(regionStats).map(([rName, rData]) => [
        rName,
        {
          aiUsage: aiStats.byRegion[rName]?.aiUsage ?? rData.aiUsage,
          foodInsufficient: foodStats.byRegion[rName]?.foodInsufficient ?? rData.foodInsufficient,
          rentBehind: housingStats.byRegion[rName]?.rentBehind ?? rData.rentBehind,
          employed: employmentStats.byRegion[rName]?.employed ?? rData.employed,
          uninsured: rData.uninsured,
          expenseDifficult: rData.expenseDifficult,
        },
      ])
    ),
  };
}

fs.writeFileSync(
  path.join(OUT_DIR, 'region-details.json'),
  JSON.stringify(regionDetails, null, 2)
);

console.log(`Built region-details.json with ${Object.keys(regionDetails).length} regions`);
