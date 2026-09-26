import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** Published posts, newest first. Drafts show up only in `npm run dev`. */
export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
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
