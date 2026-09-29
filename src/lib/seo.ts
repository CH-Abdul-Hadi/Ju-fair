/**
 * seo.ts — one source of truth for every absolute URL and every meta string
 * the site emits.
 *
 * Canonical tags, og:url, hreflang and the sitemap must all agree on the same
 * origin, or search engines see conflicting signals. Everything derives from
 * SITE_URL below, so changing domain is a one-line edit.
 *
 * Titles and descriptions live here rather than in `src/translations/index.ts`
 * because they are search artefacts, not rendered copy — nothing on the page
 * displays them. Keeping both languages adjacent in one record also makes it
 * structurally impossible to add an English title and forget the Chinese one,
 * which is the failure mode the translations rule exists to prevent.
 */

import type { Lang } from "@/translations";
import { pageGraph } from "@/lib/schema";
import { SITE_URL, ROUTES, absoluteUrl, localizedPath, type RoutePath } from "@/lib/paths";

// Re-exported so callers keep importing every URL concern from one module.
export { SITE_URL, ROUTES, absoluteUrl, localizedPath, type RoutePath };

/**
 * BCP-47 tags for the `hreflang` attribute and `og:locale`.
 * `cn` is our internal key; `zh-Hans` is what search engines expect for
 * Simplified Chinese.
 */
const HREFLANG: Record<Lang, string> = { en: "en", cn: "zh-Hans" };
const OG_LOCALE: Record<Lang, string> = { en: "en_US", cn: "zh_CN" };

/**
 * Canonical + hreflang link tags for one page.
 *
 * The canonical is SELF-REFERENCING and language-aware. This is the important
 * part: if the Chinese page declared the English URL as its canonical, Google
 * would treat it as a duplicate and drop it from the index entirely — the
 * Chinese content would never rank. Instead each language points at itself and
 * the hreflang pair declares them as alternates of one another.
 *
 * Since Phase 5 these are real paths (`/cn/about`), not query variants.
 *
 * `x-default` points at English as the fallback for unmatched locales.
 */
export function seoLinks(path: RoutePath, lang: Lang = "en") {
  return [
    { rel: "canonical", href: absoluteUrl(path, lang) },
    { rel: "alternate", hreflang: HREFLANG.en, href: absoluteUrl(path, "en") },
    { rel: "alternate", hreflang: HREFLANG.cn, href: absoluteUrl(path, "cn") },
    { rel: "alternate", hreflang: "x-default", href: absoluteUrl(path, "en") },
  ];
}

/* ─────────────────────────────────────────────────────────────────────────
   ON-PAGE METADATA
   ───────────────────────────────────────────────────────────────────────── */

/**
 * `title` is the SERP headline. Google renders roughly 580px, which is about
 * 60 characters of Latin text before it truncates with an ellipsis — the old
 * homepage title was 71 and was being cut mid-phrase. Chinese glyphs are
 * double-width, so the CN budget is ~30 characters.
 *
 * `description` does not influence ranking, but it is the ad copy for the
 * result and directly drives click-through. Google renders ~920px ≈ 155
 * characters; under ~120 leaves visible dead space, over ~160 truncates. The
 * previous descriptions ran 42–79 characters — barely half the available
 * space, on every page.
 *
 * `ogTitle` / `ogDescription` are separate on purpose. A SERP title is a
 * keyword-led fragment; a shared link in a WhatsApp group or LinkedIn feed
 * reads better as a human sentence, and it has no 60-character ceiling.
 */
type PageMeta = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  /**
   * Primary + supporting queries this page is written to answer. Not emitted
   * as a meta tag — `<meta name="keywords">` has been ignored by every major
   * engine since 2009 and stuffing it is a spam signal. This lives here as the
   * keyword map: the record of which page owns which query, so two pages never
   * start competing with each other for the same one.
   */
  keywords: readonly string[];
};

const PAGE_SEO: Record<RoutePath, Record<Lang, PageMeta>> = {
  "/": {
    en: {
      title: "Trade Fair Buyer Recruitment & Matchmaking | JU Fair Global",
      description:
        "We recruit qualified international buyers for exhibitions in China and run the B2B matchmaking that turns them into orders. 3,000+ buyers, 11 countries.",
      ogTitle: "JU Fair Global — Connecting Global Buyers with Trade Opportunities",
      ogDescription:
        "International buyer recruitment, business matchmaking and exhibition sales representation, run from Shanghai.",
      keywords: [
        "international buyer recruitment",
        "trade fair buyer recruitment",
        "exhibition business matchmaking",
        "B2B matchmaking China",
      ],
    },
    cn: {
      title: "国际买家邀约与商贸对接 | JU Fair Global",
      description:
        "我们为中国展会邀约经筛选的国际买家，并通过一对一商贸配对把询盘转化为真实订单。已累计邀约 3,000+ 海外买家，覆盖欧洲、中东、南亚与北美共 11 个国家。",
      ogTitle: "JU Fair Global — 连接全球买家与真实贸易机会",
      ogDescription: "总部位于上海，提供国际买家邀约、商贸配对与展位销售代理服务。",
      keywords: ["国际买家邀约", "展会买家邀约", "商贸配对", "展会招商"],
    },
  },

  "/about": {
    en: {
      title: "About Us — Shanghai Exhibition Services | JU Fair Global",
      description:
        "Founded in Shanghai in 2022 as a division of JU Global, we exist to fix one problem: buyers and suppliers not connecting at trade events. Our story and values.",
      ogTitle: "About JU Fair Global",
      ogDescription:
        "A Shanghai exhibition services company built to turn trade events into long-term business.",
      keywords: [
        "exhibition services company Shanghai",
        "about JU Fair Global",
        "trade fair services company China",
      ],
    },
    cn: {
      title: "关于我们 — 上海展会服务公司 | JU Fair Global",
      description:
        "JU Fair Global 于 2022 年成立于上海，隶属 JU GLOBAL，专为解决买家与供应商在展会上无法有效对接的问题。了解我们的使命、愿景与核心价值观。",
      ogTitle: "关于 JU Fair Global",
      ogDescription: "一家上海展会服务公司，致力于把一次展会转化为长期贸易合作。",
      keywords: ["上海展会服务公司", "关于 JU Fair Global", "展会服务商"],
    },
  },

  "/services": {
    en: {
      title: "Buyer Recruitment & Exhibition Services | JU Fair Global",
      description:
        "Four services for organisers and exhibitors: international buyer recruitment, B2B matchmaking, buyer visa support and exhibition sales representation.",
      ogTitle: "Our Services — JU Fair Global",
      ogDescription:
        "Buyer recruitment, business matchmaking, buyer support and exhibition sales representation.",
      keywords: [
        "international buyer recruitment services",
        "exhibition sales representation",
        "business matchmaking services",
        "trade show buyer sourcing",
      ],
    },
    cn: {
      title: "买家邀约与展会服务 | JU Fair Global",
      description:
        "面向主办方与展商的四项核心服务：国际买家邀约、B2B 商贸配对、海外买家签证与接待支持，以及展位销售与招展代理，聚焦可衡量的成交结果。",
      ogTitle: "服务项目 — JU Fair Global",
      ogDescription: "买家邀约、商贸配对、买家接待支持与展位销售代理。",
      keywords: ["国际买家邀约服务", "展位销售代理", "商贸配对服务", "展会招商服务"],
    },
  },

  "/experience": {
    en: {
      title: "Exhibition Case Studies & Results | JU Fair Global",
      description:
        "Canton Fair, Yiwu International Commodities Fair, ShanghaiTex and four more — the exhibitions we support, the buyers we brought, and the deals that closed.",
      ogTitle: "Our Experience — JU Fair Global",
      ogDescription:
        "Seven major exhibitions, verified buyer numbers and the trade deals they produced.",
      keywords: [
        "Canton Fair buyer recruitment",
        "Yiwu Commodities Fair buyers",
        "exhibition case studies China",
        "trade fair results",
      ],
    },
    cn: {
      title: "成功案例与展会业绩 | JU Fair Global",
      description:
        "广交会、义乌国际小商品博览会、上海国际纺织工业展等七个展会的服务案例：真实买家数量、一对一配对场次，以及最终促成的贸易订单金额与合作行业。",
      ogTitle: "成功案例 — JU Fair Global",
      ogDescription: "七个大型展会、可核实的买家数量，以及由此促成的贸易订单。",
      keywords: ["广交会买家邀约", "义乌博览会买家", "展会成功案例", "展会业绩"],
    },
  },

  "/global-network": {
    en: {
      title: "Global Buyer Network — 11 Countries | JU Fair Global",
      description:
        "Local buyer networks across Europe, the Middle East, South Asia and North America — 11 countries, each worked by a team recruiting in its own language.",
      ogTitle: "Global Network — JU Fair Global",
      ogDescription:
        "Buyer networks in 11 countries across four regions, with local teams in every one.",
      keywords: [
        "international buyer network",
        "global buyer database exhibitions",
        "overseas buyer sourcing",
      ],
    },
    cn: {
      title: "全球买家网络 — 覆盖 11 个国家 | JU Fair Global",
      description:
        "我们在欧洲、中东、南亚与北美设有本地买家网络，覆盖 11 个国家，由熟悉当地市场的团队以母语直接邀约买家，而非远程群发邮件。",
      ogTitle: "全球网络 — JU Fair Global",
      ogDescription: "覆盖四大区域 11 个国家的买家网络，每个市场均设本地团队。",
      keywords: ["国际买家网络", "海外买家资源", "全球买家数据库"],
    },
  },

  "/partner": {
    en: {
      title: "Become Our Partner — Exhibition Growth | JU Fair Global",
      description:
        "Partner with us as a regional representative, exhibition organiser or exhibitor. Commission models, VIP access and pre-qualified buyer introductions.",
      ogTitle: "Become Our Partner — JU Fair Global",
      ogDescription:
        "Three partnership tracks: regional representatives, exhibition organisers and exhibitors.",
      keywords: [
        "exhibition partnership opportunities",
        "trade fair sales representative",
        "exhibition organiser partner China",
      ],
    },
    cn: {
      title: "成为合作伙伴 | JU Fair Global",
      description:
        "以地区代表、展会主办方或展商身份与 JU Fair Global 合作：佣金合作模式、VIP 展会通道，以及经筛选的优质买家资源对接，帮助您更快进入中国与海外市场。",
      ogTitle: "成为合作伙伴 — JU Fair Global",
      ogDescription: "三种合作模式：地区代表、展会主办方与展商。",
      keywords: ["展会合作机会", "展会销售代表", "展会主办方合作"],
    },
  },

  "/contact": {
    en: {
      title: "Contact Us — Shanghai, China | JU Fair Global",
      description:
        "Talk to our Shanghai team about buyer recruitment, business matchmaking or exhibition representation. Every enquiry gets a reply within one business day.",
      ogTitle: "Contact JU Fair Global",
      ogDescription:
        "Shanghai-based team. Buyer recruitment, matchmaking and exhibition representation enquiries answered within one business day.",
      keywords: [
        "contact JU Fair Global",
        "buyer recruitment enquiry",
        "exhibition services contact Shanghai",
      ],
    },
    cn: {
      title: "联系我们 — 中国上海 | JU Fair Global",
      description:
        "就国际买家邀约、商贸配对或展位销售代理事宜与我们的上海团队联系。所有合作与咨询均在一个工作日内回复，支持中英文沟通，也可通过 WhatsApp 直接联络。",
      ogTitle: "联系 JU Fair Global",
      ogDescription: "上海团队，买家邀约、商贸配对与展会代理咨询一个工作日内回复。",
      keywords: ["联系 JU Fair Global", "买家邀约咨询", "上海展会服务联系"],
    },
  },

  "/faqs": {
    en: {
      title: "Buyer Recruitment FAQs | JU Fair Global",
      description:
        "How buyer recruitment is priced, how buyers are qualified, lead times, visa support, reporting and what happens after the show — answered in plain terms.",
      ogTitle: "Frequently Asked Questions — JU Fair Global",
      ogDescription:
        "Straight answers on pricing, buyer qualification, lead times, visas and post-event reporting.",
      keywords: [
        "buyer recruitment cost",
        "how does exhibition matchmaking work",
        "buyer recruitment lead time",
        "exhibition buyer qualification",
      ],
    },
    cn: {
      title: "买家邀约常见问题 | JU Fair Global",
      description:
        "买家邀约如何收费、买家如何筛选、需要提前多久启动、是否提供签证与酒店协助、会后如何提供数据报告——展会主办方与展商最常问的问题，一次说清。",
      ogTitle: "常见问题 — JU Fair Global",
      ogDescription: "关于收费、买家筛选、启动周期、签证与会后报告的直接回答。",
      keywords: ["买家邀约费用", "展会商贸配对流程", "买家邀约周期", "买家筛选标准"],
    },
  },

  "/privacy": {
    en: {
      title: "Privacy Policy | JU Fair Global",
      description:
        "What data JU Fair Global collects through this website, who processes it, how long it is kept, and how to request access or deletion of your information.",
      ogTitle: "Privacy Policy — JU Fair Global",
      ogDescription: "What we collect, who processes it, and how to have it deleted.",
      keywords: ["JU Fair Global privacy policy"],
    },
    cn: {
      title: "隐私政策 | JU Fair Global",
      description:
        "JU Fair Global 通过本网站收集哪些数据、由谁处理、保留多久，以及如何申请查询、更正或删除您的个人信息。同时说明表单与地图服务商的第三方数据处理情况。",
      ogTitle: "隐私政策 — JU Fair Global",
      ogDescription: "我们收集什么、由谁处理，以及如何申请删除。",
      keywords: ["JU Fair Global 隐私政策"],
    },
  },

"/canton-fair-buyer-recruitment": {
    en: {
      title: "Canton Fair Buyer Recruitment | JU Fair Global",
      description:
        "We recruited 850+ international buyers from Europe, South Asia and the Middle East for Canton Fair — screened before the show and scheduled into meetings.",
      ogTitle: "Buyer Recruitment for Canton Fair — JU Fair Global",
      ogDescription:
        "850+ international buyers recruited, screened and scheduled for Canton Fair exhibitors.",
      keywords: [
        "Canton Fair buyer recruitment",
        "Canton Fair international buyers",
        "Canton Fair exhibitor services",
      ],
    },
    cn: {
      title: "广交会国际买家邀约 | JU Fair Global",
      description:
        "我们为广交会展商从欧洲、南亚与中东邀约到 850 多位国际买家，会前完成资质核实，并在展前安排好一对一洽谈。",
      ogTitle: "广交会国际买家邀约 — JU Fair Global",
      ogDescription: "为广交会展商邀约并核实 850 多位国际买家，展前完成洽谈排期。",
      keywords: ["广交会买家邀约", "广交会国际买家", "广交会展商服务"],
    },
  },

  "/shanghaitex-matchmaking": {
    en: {
      title: "ShanghaiTex B2B Matchmaking | JU Fair Global",
      description:
        "Curated one-to-one meetings between textile and garment buyers and exhibitors at ShanghaiTex — five closed deals, several now long-term supply partnerships.",
      ogTitle: "B2B Matchmaking for ShanghaiTex — JU Fair Global",
      ogDescription:
        "Curated meetings for textile and garment buyers at ShanghaiTex, and the deals they produced.",
      keywords: [
        "ShanghaiTex matchmaking",
        "ShanghaiTex textile buyers",
        "textile exhibition B2B meetings",
      ],
    },
    cn: {
      title: "上海国际纺织工业展商贸配对 | JU Fair Global",
      description:
        "在上海国际纺织工业展为纺织与服装类买家与展商安排一对一精准洽谈，会前完成采购资质核实，最终促成 5 笔贸易订单，其中数笔已发展为多年期供应合作。",
      ogTitle: "上海国际纺织工业展 B2B 商贸配对 — JU Fair Global",
      ogDescription: "为纺织与服装类买家安排的一对一洽谈，以及由此促成的订单。",
      keywords: ["上海纺织展配对", "纺织展买家对接", "纺织展会商贸配对"],
    },
  },

  "/yiwu-commodities-fair-buyer-support": {
    en: {
      title: "Yiwu Fair Buyer Support | JU Fair Global",
      description:
        "Invitation letters, visas, hotels and transport for buyers at the Yiwu Commodities Fair — the engagement that produced our largest single order to date.",
      ogTitle: "International Buyer Support for Yiwu Commodities Fair",
      ogDescription:
        "End-to-end buyer support — invitations, visas, hotels, transport — so confirmed buyers actually arrive.",
      keywords: [
        "Yiwu Commodities Fair buyers",
        "Yiwu fair buyer support",
        "China exhibition visa assistance",
      ],
    },
    cn: {
      title: "义乌小商品博览会买家接待 | JU Fair Global",
      description:
        "为义乌国际小商品博览会的海外买家提供邀请函、签证、酒店与交通的全流程接待服务，确保已确认买家真正到场；该项目也促成了我们迄今金额最大的单笔订单。",
      ogTitle: "义乌国际小商品博览会海外买家接待 — JU Fair Global",
      ogDescription: "邀请函、签证、酒店与交通的全流程接待，确保已确认买家真正到场。",
      keywords: ["义乌博览会买家", "义乌展会买家接待", "展会签证协助"],
    },
  },

  "/terms": {
    en: {
      title: "Terms of Service | JU Fair Global",
      description:
        "The terms covering use of the JU Fair Global website, the status of the figures and case studies published here, and how service engagements are contracted.",
      ogTitle: "Terms of Service — JU Fair Global",
      ogDescription: "Terms covering use of this website and how engagements are contracted.",
      keywords: ["JU Fair Global terms of service"],
    },
    cn: {
      title: "服务条款 | JU Fair Global",
      description:
        "本条款适用于 JU Fair Global 网站的使用、网站所载数据与案例的性质说明、知识产权归属，以及服务合作的正式签约方式与适用法律。",
      ogTitle: "服务条款 — JU Fair Global",
      ogDescription: "适用于本网站使用与服务签约方式的条款。",
      keywords: ["JU Fair Global 服务条款"],
    },
  },
};

/** The keyword map for one page. Exported for documentation and tests. */
export function pageKeywords(path: RoutePath, lang: Lang = "en"): readonly string[] {
  return PAGE_SEO[path][lang].keywords;
}

/* ─────────────────────────────────────────────────────────────────────────
   SHARE CARDS
   ───────────────────────────────────────────────────────────────────────── */

/**
 * Share card image per route.
 *
 * The site previously declared no `og:image` at all, so every link shared on
 * WhatsApp, LinkedIn, WeChat or Slack rendered as a blank grey box — the most
 * visible SEO defect the site had, and the one that matters most at an expo
 * where links get forwarded.
 *
 * Deliberately PNG/JPEG only. WebP share images are still unreliable across
 * messaging clients, so `business-deal.webp` is not used here even though it
 * is the right subject for /partner.
 *
 * `hero-card.jpg` is a purpose-built 1200×630 — Open Graph's exact ideal
 * ratio, so no platform has to crop it. It replaced a 1.73 MB PNG that was
 * 1774×887. The Expo photographs are 1038×692 / 1280×853 (1.50) and will be
 * centre-cropped by most platforms, which is acceptable for real photography.
 */
type OgImage = { src: string; w: number; h: number; type: string; alt: string };

const HERO_CARD: OgImage = {
  src: "/hero-card.jpg",
  w: 1200,
  h: 630,
  type: "image/jpeg",
  alt: "JU Fair Global — connecting international buyers with trade opportunities worldwide",
};

const PAVILION_CARD: OgImage = {
  src: "/Expo/expo1.jpeg",
  w: 1038,
  h: 692,
  type: "image/jpeg",
  alt: "National pavilion inauguration ceremony at an international trade exhibition",
};

const OG_IMAGES: Record<RoutePath, OgImage> = {
  "/": HERO_CARD,
  "/global-network": HERO_CARD,
  "/contact": HERO_CARD,
  // The legal and FAQ pages carry the branded hero rather than a photograph —
  // a pavilion shot beside "Privacy Policy" reads as a mismatch.
  "/faqs": HERO_CARD,
  // The exhibition pages share the pavilion photograph — it is the right
  // subject for a page about work delivered on a show floor.
  "/canton-fair-buyer-recruitment": PAVILION_CARD,
  "/shanghaitex-matchmaking": PAVILION_CARD,
  "/yiwu-commodities-fair-buyer-support": PAVILION_CARD,
  "/privacy": HERO_CARD,
  "/terms": HERO_CARD,
  "/about": PAVILION_CARD,
  "/partner": {
    ...PAVILION_CARD,
    alt: "National pavilion stand built for an international exhibition",
  },
  "/services": {
    src: "/Expo/expo2.jpeg",
    w: 1280,
    h: 853,
    type: "image/jpeg",
    alt: "International buyers meeting exhibitors on the trade show floor",
  },
  "/experience": {
    src: "/Expo/expo4.jpeg",
    w: 1280,
    h: 853,
    type: "image/jpeg",
    alt: "Visitors and exhibitors at a busy international trade exhibition stand",
  },
};

/**
 * Social + locale meta shared by every page.
 *
 * `og:url` and `og:image` must be absolute — the previous relative values
 * ("/about") were invalid Open Graph and produced broken previews everywhere.
 *
 * `twitter:title` / `twitter:description` are intentionally omitted: X and
 * most other consumers fall back to the `og:` equivalents, so duplicating them
 * per route would be two more strings to keep in sync for no gain.
 */
export function seoMeta(path: RoutePath, lang: Lang = "en") {
  const img = OG_IMAGES[path];
  const imgUrl = `${SITE_URL}${img.src}`;
  return [
    { property: "og:url", content: absoluteUrl(path, lang) },
    { property: "og:locale", content: OG_LOCALE[lang] },
    { property: "og:locale:alternate", content: OG_LOCALE[lang === "en" ? "cn" : "en"] },
    { property: "og:image", content: imgUrl },
    { property: "og:image:secure_url", content: imgUrl },
    { property: "og:image:type", content: img.type },
    // Declaring dimensions lets a platform reserve the card's space before the
    // image downloads, so the preview doesn't reflow while it loads.
    { property: "og:image:width", content: String(img.w) },
    { property: "og:image:height", content: String(img.h) },
    { property: "og:image:alt", content: img.alt },
    { name: "twitter:image", content: imgUrl },
    { name: "twitter:image:alt", content: img.alt },
  ];
}

/**
 * Everything a route's `head()` needs, in one call: meta tags, canonical and
 * hreflang links, and the page's JSON-LD graph.
 *
 * Routes previously hand-rolled six meta entries each, which is how the
 * homepage ended up with a 71-character title and /about with a 29-character
 * og:description. One helper means the rules are enforced in one place.
 *
 * Usage:
 *   head: ({ match }) => seoHead("/about", langFromSearch(match.search)),
 */
export function seoHead(path: RoutePath, lang: Lang = "en") {
  const page = PAGE_SEO[path][lang];

  // `string | undefined` because seoLinks' canonical entry has no `hreflang`,
  // and the union of its two shapes widens the optional key to undefined.
  const links: Array<Record<string, string | undefined>> = [...seoLinks(path, lang)];

  // The homepage's Largest Contentful Paint element is the hero, whose image is
  // a CSS `background-image`. The browser cannot discover that until it has
  // downloaded and parsed the stylesheet, so it starts the fetch late every
  // time — the classic late-discovered-LCP problem. An explicit preload with
  // high priority starts it with the HTML instead.
  //
  // Only on "/" — preloading an image a page does not use is wasted bandwidth
  // competing with the one it does.
  if (path === "/") {
    links.push({
      rel: "preload",
      href: "/hero.webp",
      as: "image",
      type: "image/webp",
      fetchPriority: "high",
    });
  }

  return {
    meta: [
      { title: page.title },
      { name: "description", content: page.description },
      { property: "og:title", content: page.ogTitle },
      { property: "og:description", content: page.ogDescription },
      ...seoMeta(path, lang),
    ],
    links,
    // The WebPage node reuses the same title and description as the meta tags
    // above, so the markup and the visible page can never disagree.
    scripts: [
      {
        type: "application/ld+json",
        children: pageGraph({
          path,
          lang,
          name: page.title,
          description: page.description,
          siteUrl: SITE_URL,
          pageUrl: absoluteUrl(path, lang),
          homeUrl: absoluteUrl("/", lang),
        }),
      },
    ],
  };
}

/**
 * Narrow an unvalidated search value to a Lang.
 *
 * Kept only for the legacy `?lang=` redirect in `langRedirect.ts`. Language is
 * resolved from the PATH now — see `src/lib/paths.ts`. Do not use this to pick
 * a language for rendering, or an English URL could serve Chinese content,
 * which is exactly the duplicate-content problem Phase 5 removed.
 */
export function langFromSearch(search: unknown): Lang {
  const value = (search as { lang?: unknown } | undefined)?.lang;
  return value === "cn" ? "cn" : "en";
}
