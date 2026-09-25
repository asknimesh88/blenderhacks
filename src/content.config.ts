import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['Tips & Tricks', 'Cleaning & Care', 'Buying Guides', 'Recipes']),
    draft: z.boolean().default(false),
    // Stock photo (e.g. from Unsplash/Pexels) saved under public/images/.
    hero: z
      .object({
        src: z.string(),
        alt: z.string(),
        credit: z.string(),
        creditUrl: z.url(),
      })
      .optional(),
  }),
});

export const collections = { blog };
