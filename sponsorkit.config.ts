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

  async onSponsorsReady(sponsors) {
    await writeFile(
      'sponsors.json',
      JSON.stringify(
        sponsors
          .filter((i) => i.privacyLevel !== 'PRIVATE')
          .map((i) => {
            return {
              name: i.sponsor.name,
              login: i.sponsor.login,
              avatar: i.sponsor.avatarUrl,
              amount: i.monthlyDollars,
              link: i.sponsor.linkUrl || i.sponsor.websiteUrl,
              org: i.sponsor.type === 'Organization',
            }
          })
          .sort((a, b) => b.amount - a.amount),
        null,
        2,
      ),
    )
  },

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