/**
 * verification.ts — search-engine site-verification tokens.
 *
 * Each engine proves you own a domain before it shows you its data. The
 * meta-tag method is the one that survives a redeploy: a DNS TXT record lives
 * outside this repo, and an uploaded HTML file gets wiped by the next build.
 *
 * ## How to use this file
 *
 * Two routes, and the first one needs no code change at all:
 *
 * 1. **Environment variable** — set `VITE_GOOGLE_VERIFICATION` (or `_BING_`,
 *    `_BAIDU_`, `_YANDEX_`) in the hosting dashboard and redeploy. Whoever
 *    holds the deploy account can do this end to end without touching the
 *    repo, which is the point: it removes a hand-off.
 * 2. **Constant below** — paste the token into the matching entry and commit.
 *    Useful when the value should live in version control.
 *
 * Either way it is **just the token**, not the whole `<meta>` tag.
 * `verificationMeta()` emits a tag only for the ones that are set, so blanks
 * are safe and emit nothing.
 *
 * These tokens are **not secrets**, which is why `VITE_` is appropriate here
 * despite that prefix inlining the value into the client bundle. They are
 * *designed* to be publicly visible in the page source — that is how
 * verification works. Do not put anything else here.
 *
 * ## Where each token comes from
 *
 * - **Google** — search.google.com/search-console → add a `https://www.jufairglobal.com`
 *   property → *HTML tag* method. The token is the `content="..."` value.
 * - **Bing** — bing.com/webmasters. Bing can also import a verified Google
 *   Search Console property, which skips this step entirely and is the
 *   quicker path.
 * - **Baidu** — ziyuan.baidu.com → 站点管理 → HTML标签验证. Matters because
 *   Baidu is the dominant engine for the Chinese half of this site.
 * - **Yandex** — only worth adding if Russian-speaking markets become a target.
 *   Left here so nobody has to work out the tag name later.
 */

export const VERIFICATION = {
  /** `google-site-verification` */
  google: "5grCIcwIwt0dwDKDfoWcC3ixlzOpkP2wutI3dOvw9q0",
  /** `msvalidate.01` */
  bing: "",
  /** `baidu-site-verification` */
  baidu: "",
  /** `yandex-verification` */
  yandex: "",
} as const;

type Engine = keyof typeof VERIFICATION;

/** Meta-tag name for each engine, in the order they should appear. */
const META_NAME: Record<Engine, string> = {
  google: "google-site-verification",
  bing: "msvalidate.01",
  baidu: "baidu-site-verification",
  yandex: "yandex-verification",
};

/** Environment variable checked before falling back to the constant. */
const ENV_NAME: Record<Engine, string> = {
  google: "VITE_GOOGLE_VERIFICATION",
  bing: "VITE_BING_VERIFICATION",
  baidu: "VITE_BAIDU_VERIFICATION",
  yandex: "VITE_YANDEX_VERIFICATION",
};

/**
 * Environment variable wins over the committed constant.
 *
 * `import.meta.env` is statically replaced at build time, so it is read
 * through an index rather than destructured — that keeps the four lookups in
 * one place instead of four hard-coded references.
 */
function tokenFor(engine: Engine): string {
  const env = import.meta.env as Record<string, string | undefined>;
  const fromEnv = env[ENV_NAME[engine]];
  return (fromEnv ?? VERIFICATION[engine] ?? "").trim();
}

/**
 * Verification meta tags for every token that has been filled in.
 *
 * Returns an empty array while they are all blank, so this can be spread into
 * the root `head()` unconditionally and starts working the moment a token is
 * pasted in — no code change needed at that point, which is the whole reason
 * this indirection exists.
 */
export function verificationMeta(): Array<{ name: string; content: string }> {
  return (Object.keys(VERIFICATION) as Engine[])
    .map((engine) => ({ name: META_NAME[engine], content: tokenFor(engine) }))
    .filter((tag) => tag.content.length > 0);
}
