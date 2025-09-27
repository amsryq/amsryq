import { writeFile } from 'node:fs/promises'
import { defineConfig, tierPresets } from 'sponsorkit'

export default defineConfig({
  tiers: [
    {
      preset: tierPresets.small,
    },
    {
      monthlyDollars: 5,
      preset: tierPresets.base,
    },
    {
      monthlyDollars: 10,
      preset: tierPresets.large,
    },
  ],
  
  outputDir: './sponsorkit',
  formats: ['svg', 'png'],

  renders: [
    {
      name: 'sponsors.circles',
      renderer: 'circles',
      includePastSponsors: false,
    },
  ],
})