import { amazonUrl } from './amazon';

export interface Criterion { label: string; score: number; }
export interface Store { name: string; asin?: string; query?: string; url?: string; }

/** Overall score in percent: the explicit score, or the rounded criteria average. */
export function overallScore(criteria: Criterion[], score?: number): number {
  if (score !== undefined) return score;
  return Math.round(criteria.reduce((sum, c) => sum + c.score, 0) / criteria.length);
}

/** Percent → stars out of 5, rounded to the nearest half star. */
export const toStars = (percent: number) => Math.round(percent / 10) / 2;

export function storeUrl(store: Store, product: string): string {
  if (store.url) return store.url;
  return amazonUrl({ asin: store.asin, query: store.asin ? undefined : store.query ?? product });
}
