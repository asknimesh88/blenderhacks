# BlenderHacks

Source for [blenderhacks.com](https://blenderhacks.com), a blog of kitchen blender tips, cleaning guides and buying advice with Amazon affiliate links. It's built with [Astro](https://astro.build) as a static site.

## Run it locally

```sh
npm install
npm run dev      # http://localhost:4321 (drafts are visible here)
npm run build    # production build into dist/
```

## Where things live

| What | Where |
|---|---|
| Site name, email, author, **Amazon tag** | `src/config.ts` |
| Blog posts | `src/content/blog/*.mdx` |
| Stock photos | `public/images/` |
| About / Disclosure / Privacy / Contact | `src/pages/` |
| Homepage category blocks | `HOME_BLOCKS` in `src/config.ts` |
| Content plan | `docs/content-plan.md` |

## Once you're approved for Amazon Associates

Open `src/config.ts` and set your tracking ID:

```ts
export const AMAZON_TAG = 'yourtag-20';
```

After that, every "Check price on Amazon" button on the site includes your tag. Until then the links still work, but they don't earn anything.

Amazon rules to remember:
- You need **3 qualifying sales within 180 days** of signing up, or the account is closed.
- **Never copy product images from Amazon** (or from manufacturers' sites). Use stock photos, your own photos, or no image.
- **Don't show prices in posts.** Amazon's rules on displaying prices are strict, and the "Check price" button avoids the problem.
- Keep the disclosure text. It's already on every post and in the footer.

## Writing a new post

Every post uses the same layout: breadcrumbs, title, subtitle, byline, featured image, share bar, drop-cap intro, sidebar (score card, Recommended Reading, Top Review), then tags, previous/next links and the author box. A review post also gets a Deals box at the top and **The Review** block (score, stars, pros/cons, review breakdown, deals) at the end.

Create `src/content/blog/your-post-slug.mdx`:

```mdx
---
title: "Post title"
subtitle: "Short line under the title"
description: "One or two sentences. This is also the Google snippet."
pubDate: 2026-10-01
category: "Buying Guides"   # "Tips & Tricks", "Cleaning & Care", "Buying Guides", "Recipes"
tags: ["Reviews", "Personal Blenders"]
draft: true                  # remove when ready to publish
hero:                        # optional stock photo
  src: /images/your-photo.jpg
  alt: "Describe the photo"
  credit: "Photographer Name on Unsplash"
  creditUrl: "https://unsplash.com/photos/..."
review:                      # optional: turns the post into a scored review
  product: "Product name"
  summary: "One-paragraph verdict."
  criteria:                  # percent; the overall score is their average
    - { label: "Blending results", score: 85 }
    - { label: "Ease of cleaning", score: 90 }
  pros: ["...", "..."]
  cons: ["..."]
  stores:
    - { name: "Amazon", query: "product search words" }   # or asin: "B0XXXXXXXX"
---

Your post...

<RelatedPosts />              {/* two related articles, anywhere in the text */}
<PullQuote>A big centered quote.</PullQuote>

<ProductBox
  rank={1}
  name="Product name"
  query="search words for Amazon"
  bestFor="Who it's for"
  criteria={[{ label: "Ease of use", score: 90 }, { label: "Value", score: 80 }]}
  pros={["...", "..."]}
  cons={["..."]}
/>

<AmazonButton query="immersion blender" />
```

No imports are needed: `ProductBox`, `AmazonButton`, `RelatedPosts` and `PullQuote` are available in every post. `src/content/blog/nutribullet-pro-900-review.mdx` is a full example (a draft, so it isn't published).

**Scores:** stars are the score out of five (90% = 4.5 stars). Scores are research-based ratings, not lab tests, and the "How we score" section on the About page explains this. Only publish a score you can justify from specs, warranty terms and owner reviews.

**Linking products:** `query="..."` links to an Amazon search. Once you've picked an exact product, use `asin="B0..."` instead. The ASIN is the 10-character code after `/dp/` in the product's Amazon URL.

**Stock photos:** download from [Unsplash](https://unsplash.com) or [Pexels](https://pexels.com). Resize to about 1600px wide, save in `public/images/`, and fill in the `hero` block with the photographer's credit. Don't use a stock photo that shows a specific branded blender as if it were the product you're recommending.

**Author:** set the byline name, bio and avatar in `AUTHOR` in `src/config.ts`.

## Scheduling posts

New posts go into a queue: give a post a **future `pubDate`** and it stays hidden (homepage, lists, RSS, sitemap) until that date. The site rebuilds every morning via `.github/workflows/daily-rebuild.yml`, so scheduled posts appear on their day with no manual step.

- `draft: true` hides a post indefinitely; a future `pubDate` hides it until that day.
- `npm run dev` shows drafts and scheduled posts so you can preview them.
- The publishing calendar lives in `docs/content-plan.md`.

One-time setup for the daily rebuild:

1. Cloudflare: **Workers & Pages → blenderhacks → Settings → Builds → Deploy hooks → Add deploy hook**, pick the production branch, and copy the URL.
2. GitHub: **Settings → Secrets and variables → Actions → New repository secret**, name it `CLOUDFLARE_DEPLOY_HOOK`, and paste the URL.
3. Optional check: GitHub **Actions → Daily rebuild → Run workflow** should start a new Cloudflare deployment.

## Deploying to blenderhacks.com (Cloudflare Pages)

The site is hosted on Cloudflare Pages, connected to this GitHub repo. Every push to the production branch rebuilds and republishes it.

Build settings (Workers & Pages → blenderhacks → Settings → Build):

| Setting | Value |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | from `.node-version` (22) |

The custom domain is set under **Custom domains**. It should show `blenderhacks.com` as **Active**. Add `www.blenderhacks.com` there too.

## Before launch checklist

- [ ] Set up the `hello@blenderhacks.com` mailbox (or change `email` in `src/config.ts`)
- [ ] Publish 10–15 posts before applying to Amazon Associates. They review your site.
- [ ] Add `AMAZON_TAG` after approval
- [ ] Submit `https://blenderhacks.com/sitemap-index.xml` in [Google Search Console](https://search.google.com/search-console)
- [ ] Have someone review the Privacy Policy for your situation (this template is not legal advice)
