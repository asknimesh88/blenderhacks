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
| Site name, email, **Amazon tag** | `src/config.ts` |
| Blog posts | `src/content/blog/*.mdx` |
| Stock photos | `public/images/` |
| About / Disclosure / Privacy / Contact | `src/pages/` |
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

Create `src/content/blog/your-post-slug.mdx`:

```mdx
---
title: "Post title"
description: "One or two sentences. This is also the Google snippet."
pubDate: 2026-10-01
category: "Tips & Tricks"   # or "Cleaning & Care", "Buying Guides", "Recipes"
draft: true                  # remove when ready to publish
hero:                        # optional
  src: /images/your-photo.jpg
  alt: "Describe the photo"
  credit: "Photographer Name on Unsplash"
  creditUrl: "https://unsplash.com/photos/..."
---
import ProductBox from '../../components/ProductBox.astro';
import AmazonButton from '../../components/AmazonButton.astro';

Your post...

<ProductBox
  name="Product name"
  query="search words for Amazon"
  bestFor="Who it's for"
  pros={["...", "..."]}
  cons={["..."]}
/>

Or a plain button: <AmazonButton query="immersion blender" />
```

**Linking products:** `query="..."` links to an Amazon search. Once you've picked an exact product, use `asin="B0..."` instead. The ASIN is the 10-character code after `/dp/` in the product's Amazon URL.

**Stock photos:** download from [Unsplash](https://unsplash.com) or [Pexels](https://pexels.com). Resize to about 1600px wide, save as `.jpg`/`.webp` in `public/images/`, and fill in the `hero` block with the photographer's credit. Don't use a stock photo that shows a specific branded blender as if it were the product you're recommending.

**Honesty:** you don't own the products, so write buying advice as research ("based on specs and owner feedback"), not "we tested". This protects you with the FTC and with Google.

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
