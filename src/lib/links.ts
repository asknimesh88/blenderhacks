const AFFILIATE_HOSTS = ['amazon.com', 'amzn.to'];

/**
 * Adds the right attributes to links in rendered post HTML that don't set their own:
 * external links open in a new tab and stay dofollow; affiliate links become
 * rel="sponsored nofollow".
 */
export function tagLinks(html: string, site: string): string {
  const own = new URL(site).hostname;
  return html.replace(/<a (?![^>]*\brel=)([^>]*?)href="(https?:\/\/[^"]+)"([^>]*)>/g, (tag, before, href, after) => {
    let host: string;
    try { host = new URL(href).hostname; } catch { return tag; }
    if (host === own || host.endsWith(`.${own}`)) return tag;
    const affiliate = AFFILIATE_HOSTS.some((h) => host === h || host.endsWith(`.${h}`));
    const rel = affiliate ? 'sponsored nofollow noopener' : 'noopener';
    return `<a ${before}href="${href}"${after} target="_blank" rel="${rel}">`;
  });
}

/**
 * Turns links to posts that aren't published yet into plain text, so a live post
 * can mention a scheduled one without a 404. The daily rebuild makes the link
 * live on the scheduled post's publish day.
 */
export function gateLinks(html: string, live: Set<string>): string {
  return html.replace(/<a ([^>]*?)href="\/blog\/([^"/#?]+)\/?(?:#[^"]*)?"([^>]*)>([\s\S]*?)<\/a>/g,
    (tag, _b, slug, _a, text) => (live.has(slug) ? tag : text));
}
