// Site-wide settings. Edit these in one place.

export const SITE = {
  name: 'BlenderHacks',
  url: 'https://blenderhacks.com',
  tagline: 'Kitchen blender tips, tricks and honest buying advice.',
  description:
    'Practical kitchen blender tips, smoothie tricks, cleaning and care guides, and straightforward advice on choosing a blender.',
  // TODO: set up this mailbox (or change it) before launch.
  email: 'hello@blenderhacks.com',
};

// Shown in the byline and the author box under every post.
export const AUTHOR = {
  name: 'BlenderHacks Editorial',
  bio: 'We research blenders so you don\'t have to: we compare specs, warranties and thousands of owner reviews, and write practical guides for getting more out of the blender you already have.',
  avatar: '/favicon.svg',
};

export const CATEGORIES = [
  { name: 'Tips & Tricks', slug: 'tips-tricks' },
  { name: 'Cleaning & Care', slug: 'cleaning-care' },
  { name: 'Buying Guides', slug: 'buying-guides' },
  { name: 'Recipes', slug: 'recipes' },
] as const;

export type CategoryName = (typeof CATEGORIES)[number]['name'];

export const categorySlug = (name: string) =>
  CATEGORIES.find((c) => c.name === name)?.slug ?? 'blog';

// Your Amazon Associates tracking ID, e.g. 'blenderhacks-20'.
// Leave empty until you're approved; links still work, they just won't earn.
export const AMAZON_TAG = '';

export const AMAZON_DISCLOSURE =
  'As an Amazon Associate I earn from qualifying purchases.';
