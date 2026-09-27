import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/**
 * Published posts, newest first. Drafts and scheduled posts (pubDate in the
 * future) are hidden until their date; both show up in `npm run dev`.
 * The site rebuilds daily (.github/workflows/daily-rebuild.yml) so scheduled
 * posts go live on their day.
 */
export async function getPosts() {
  const now = Date.now();
  const posts = await getCollection(
    'blog',
    ({ data }) => import.meta.env.DEV || (!data.draft && data.pubDate.valueOf() <= now),
  );
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export const postUrl = (post: Post) => `/blog/${post.id}/`;

export const tagSlug = (tag: string) =>
  tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/** Other posts, same category first, then newest. */
export function relatedPosts(posts: Post[], current: Post, count: number) {
  const others = posts.filter((p) => p.id !== current.id);
  const same = others.filter((p) => p.data.category === current.data.category);
  return [...same, ...others.filter((p) => !same.includes(p))].slice(0, count);
}
