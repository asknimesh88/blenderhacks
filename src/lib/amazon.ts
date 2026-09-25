import { AMAZON_TAG } from '../config';

/**
 * Build an Amazon link. Prefer `asin` (from the product page URL, /dp/XXXXXXXXXX)
 * once you've picked an exact product; `query` falls back to an Amazon search.
 */
export function amazonUrl({ asin, query }: { asin?: string; query?: string }): string {
  const url = asin
    ? new URL(`https://www.amazon.com/dp/${encodeURIComponent(asin)}`)
    : new URL('https://www.amazon.com/s');
  if (!asin) {
    if (!query) throw new Error('amazonUrl needs an asin or a query');
    url.searchParams.set('k', query);
  }
  if (AMAZON_TAG) url.searchParams.set('tag', AMAZON_TAG);
  return url.toString();
}
