import type { APIRoute } from 'astro';
import { site } from '../data/site';

/**
 * Everything is public, and AI crawlers are allowed on purpose: the site
 * publishes /llms.txt so agents can read it without scraping the HTML.
 *
 * There is no Sitemap line yet: the site is a single page and the sitemap
 * integration needs the canonical origin (site.url), which is not chosen yet.
 */
export const GET: APIRoute = () => {
	const body = ['User-agent: *', 'Allow: /', '', `# ${site.name}`, ''].join('\n');

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
