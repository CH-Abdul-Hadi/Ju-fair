/**
 * analytics.ts — optional, cookieless analytics.
 *
 * **Nothing is enabled.** Both constants are empty, `analyticsScripts()`
 * returns an empty array, and the site ships with no tracker, no cookies and
 * no third-party analytics request. That is deliberate: which analytics to run
 * is a client decision with privacy consequences, not a default to be slipped
 * in.
 *
 * ## Why only cookieless providers are wired here
 *
 * Google Analytics 4 sets identifiers, which in the EU means a consent banner
 * before it may load, and a banner costs measurable conversions on a B2B
 * enquiry site. It also puts the site inside the EU/China data-transfer
 * argument. The two providers below measure pageviews without identifying
 * anyone, so **no consent banner is required** and the privacy story stays
 * short.
 *
 * ## How to enable
 *
 * Fill in ONE constant and deploy:
 *
 * - **Cloudflare Web Analytics** — free, and the site is already hosted on
 *   Cloudflare, so it adds no new vendor. Dashboard → Web Analytics → add
 *   `www.jufairglobal.com` → copy the token out of the snippet it shows you
 *   (the `token` value, not the whole `<script>` tag).
 * - **Plausible** — paid, better reporting, self-hostable. Use the bare domain
 *   as configured in Plausible, e.g. `www.jufairglobal.com`.
 *
 * ## ⚠️ Enabling this makes the privacy policy wrong
 *
 * `legal.privacy` in `src/translations/index.ts` currently states — truthfully
 * — that the site runs no analytics and sets no tracking cookies. Turning a
 * provider on means editing the "Cookies, analytics and tracking" section in
 * **both** `en` and `cn`. Suggested replacement text is in `SEO.md` §5.
 */

export const ANALYTICS = {
  /** Cloudflare Web Analytics beacon token. */
  cloudflareToken: "",
  /** Plausible domain, e.g. "www.jufairglobal.com". */
  plausibleDomain: "",
} as const;

/**
 * Either constant can also be supplied as an environment variable —
 * `VITE_CF_ANALYTICS_TOKEN` or `VITE_PLAUSIBLE_DOMAIN` — so whoever holds the
 * deploy account can switch analytics on from the hosting dashboard without a
 * code change. The env value wins.
 */
function configured(key: "cloudflareToken" | "plausibleDomain"): string {
  const env = import.meta.env as Record<string, string | undefined>;
  const envName = key === "cloudflareToken" ? "VITE_CF_ANALYTICS_TOKEN" : "VITE_PLAUSIBLE_DOMAIN";
  return (env[envName] ?? ANALYTICS[key] ?? "").trim();
}

/**
 * Which provider is active, or `null` when none is.
 *
 * `/privacy` reads this so the "Cookies, analytics and tracking" section
 * describes what the site is *actually* doing. Without that, switching
 * analytics on would silently make the published privacy policy false — which
 * is exactly the mistake Phase 6 had to correct after self-hosting the fonts
 * removed a data processor.
 */
export function analyticsProvider(): "cloudflare" | "plausible" | null {
  if (configured("cloudflareToken")) return "cloudflare";
  if (configured("plausibleDomain")) return "plausible";
  return null;
}

type HeadScript = {
  src: string;
  defer?: boolean;
  "data-cf-beacon"?: string;
  "data-domain"?: string;
};

/**
 * Script tags for whichever provider is configured.
 *
 * Returns `[]` while both constants are blank, so this can be spread into the
 * root `head()` unconditionally and starts working the moment a value is
 * pasted in — no code change needed at that point.
 *
 * Both load `defer`, so neither competes with the LCP image for bandwidth.
 * Cloudflare's token goes in `data-cf-beacon` as JSON, which is the format its
 * beacon expects.
 */
export function analyticsScripts(): HeadScript[] {
  const scripts: HeadScript[] = [];

  const cf = configured("cloudflareToken");
  if (cf) {
    scripts.push({
      src: "https://static.cloudflareinsights.com/beacon.min.js",
      defer: true,
      "data-cf-beacon": JSON.stringify({ token: cf }),
    });
  }

  const plausible = configured("plausibleDomain");
  if (plausible) {
    scripts.push({
      src: "https://plausible.io/js/script.js",
      defer: true,
      "data-domain": plausible,
    });
  }

  return scripts;
}
