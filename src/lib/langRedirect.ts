import { redirect } from "@tanstack/react-router";
import { localizedPath, type RoutePath } from "@/lib/paths";

/**
 * Sends a legacy `?lang=` URL to its path-based equivalent, permanently.
 *
 * Until Phase 5 the language lived in a search parameter, so links to
 * `/about?lang=cn` exist in the wild — in the old sitemap, in anything already
 * crawled, and in every link a visitor bookmarked or forwarded at an expo.
 *
 * Leaving both forms live would be the worst outcome: two URLs serving the same
 * content, splitting whatever authority each had earned. A **301** consolidates
 * them onto the canonical path and tells the crawler to replace the old URL in
 * its index rather than keep both.
 *
 * `?lang=en` on an English page is also redirected, to strip the now-redundant
 * parameter — otherwise `/about` and `/about?lang=en` are two crawlable URLs
 * for one page.
 *
 * Called from `beforeLoad`, so it runs during SSR and the redirect is a real
 * HTTP response rather than a client-side bounce a crawler might not follow.
 */
export function redirectLegacyLang(path: RoutePath, search: unknown): void {
  const value = (search as { lang?: unknown } | undefined)?.lang;
  if (value !== "en" && value !== "cn") return;

  // A relative href makes this a document-level redirect, which is what we
  // want: the response carries the 301 and the Location header.
  throw redirect({ href: localizedPath(path, value), statusCode: 301 });
}
