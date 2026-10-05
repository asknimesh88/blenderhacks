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

/** Slugs of posts linked from a post's body text. */
export const linkedSlugs = (post: Post) =>
  new Set([...(post.body ?? '').matchAll(/\]\(\/blog\/([^/)#]+)/g)].map((m) => m[1]));

/**
 * Other posts ranked by relevance: most shared tags, then same category, then
 * newest. Posts already linked in the body are skipped to avoid duplicate links.
 */
export function relatedPosts(posts: Post[], current: Post, count: number) {
  const tags = new Set(current.data.tags);
  const linked = linkedSlugs(current);
  const score = (p: Post) =>
    p.data.tags.filter((t) => tags.has(t)).length * 2 + (p.data.category === current.data.category ? 1 : 0);
  return posts
    .filter((p) => p.id !== current.id && !linked.has(p.id))
    .map((p, i) => ({ p, s: score(p), i }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .map(({ p }) => p)
    .slice(0, count);
}
