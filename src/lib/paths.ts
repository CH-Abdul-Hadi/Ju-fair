/**
 * paths.ts — the URL shape of the site, with no other dependencies.
 *
 * Language used to be a search parameter (`?lang=cn`). It is now a **path
 * prefix** (`/cn/about`), because Google treats query parameters as a weak
 * signal and routinely canonicalises them away, and Baidu — which matters most
 * for the Chinese half of this site — handles them worse still. A path segment
 * is unambiguous to every crawler.
 *
 * This module is deliberately dependency-free (apart from the `Lang` type) so
 * that `seo.ts`, `useLanguage` and `LocalizedLink` can all share it without
 * anything importing in a circle.
 */

import type { Lang } from "@/translations";

/**
 * Production origin, no trailing slash. Confirmed by the client.
 *
 * Changing domain is a one-line edit here. It must be absolute: Open Graph
 * rejects relative `og:url`, and a relative canonical is resolved against the
 * current URL, which makes it useless for de-duplicating variants.
 */
export const SITE_URL = "https://www.jufairglobal.com";

/**
 * The three exhibitions we have documented engagements for.
 *
 * Deliberately three and not seven. The other four exhibitions in the client
 * brief are names with no supporting detail, and four pages spun out of names
 * would be doorway pages — near-duplicate content targeting keyword variants,
 * which Google demotes explicitly. Those four stay listed on `/experience`.
 *
 * Each slug names the service actually provided at that event, which is both
 * honest and what the query volume is for. Order matches
 * `translations.exhibitions.items`, zipped positionally like the rest of this
 * codebase.
 */
export const EXHIBITION_ROUTES = [
  "/canton-fair-buyer-recruitment",
  "/shanghaitex-matchmaking",
  "/yiwu-commodities-fair-buyer-support",
] as const;

/**
 * Every indexable route, in its **canonical, language-neutral** form.
 * These are the English paths; the Chinese mirror is this list under `/cn`.
 * Keep in sync with src/routes/.
 */
export const ROUTES = [
  "/",
  "/about",
  "/services",
  "/experience",
  "/global-network",
  "/partner",
  "/contact",
  "/faqs",
  "/privacy",
  "/terms",
  // Per-exhibition landing pages. Flat, keyword-led slugs rather than a
  // /exhibitions/* tree: a parent segment with no page of its own would 404,
  // and the slug names the service we actually provided at that event.
  ...EXHIBITION_ROUTES,
] as const;

export type RoutePath = (typeof ROUTES)[number];

/** The Chinese path prefix. English is served unprefixed, as the default. */
export const CN_PREFIX = "/cn";

/** Real pathname for a canonical route in a given language. */
export function localizedPath(path: RoutePath, lang: Lang): string {
  if (lang === "en") return path;
  return path === "/" ? CN_PREFIX : CN_PREFIX + path;
}

/** The language a pathname serves. */
export function langFromPathname(pathname: string): Lang {
  return pathname === CN_PREFIX || pathname.startsWith(CN_PREFIX + "/") ? "cn" : "en";
}

/**
 * The canonical route for a pathname, with any language prefix and trailing
 * slash removed. Unknown paths fall back to "/" — callers use this to build a
 * language-swapped equivalent of the current page, and the homepage is the only
 * safe answer for a URL that is not a known route.
 */
export function stripLang(pathname: string): RoutePath {
  let p = pathname;
  if (p === CN_PREFIX || p === CN_PREFIX + "/") return "/";
  if (p.startsWith(CN_PREFIX + "/")) p = p.slice(CN_PREFIX.length);
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return (ROUTES as readonly string[]).includes(p) ? (p as RoutePath) : "/";
}

/**
 * Absolute URL for a route in a given language.
 *
 * The root keeps its trailing slash. This must match
 * scripts/generate-sitemap.mjs exactly — a canonical of "https://site.com"
 * against a sitemap entry of "https://site.com/" is two different URLs to a
 * crawler, and the mismatch makes the canonical self-contradictory.
 */
export function absoluteUrl(path: RoutePath, lang: Lang = "en"): string {
  const p = localizedPath(path, lang);
  return `${SITE_URL}${p === "/" ? "/" : p}`;
}
