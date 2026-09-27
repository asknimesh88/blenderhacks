import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const percent = z.number().min(0).max(100);

// Where to buy. Amazon links take an asin (preferred) or a search query;
// any other store takes a full url.
const store = z.object({
  name: z.string(),
  asin: z.string().optional(),
  query: z.string().optional(),
  url: z.url().optional(),
});

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['Tips & Tricks', 'Cleaning & Care', 'Buying Guides', 'Recipes']),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // Featured image: /images/posts/{slug}.webp (see src/lib/images.ts).
    hero: z
      .object({
        src: z.string(),
        alt: z.string(),
        credit: z.string().optional(), // omitted for licensed stock (Adobe Stock)
        creditUrl: z.url().optional(),
      })
      .optional(),
    // Adds the score box to the sidebar and "The Review" block after the article.
    review: z
      .object({
        product: z.string(),
        summary: z.string(),
        score: percent.optional(), // defaults to the average of the criteria
        criteria: z.array(z.object({ label: z.string(), score: percent })).min(1),
        pros: z.array(z.string()).default([]),
        cons: z.array(z.string()).default([]),
        stores: z.array(store).min(1),
      })
      .optional(),
  }),
});

export const collections = { blog };
