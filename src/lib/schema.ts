/**
 * schema.ts — JSON-LD structured data.
 *
 * Emitted as a single `@graph` per page rather than a pile of separate
 * <script> blocks. The nodes cross-reference each other by `@id`, so a crawler
 * reads one connected description of the business instead of several
 * disconnected fragments that it then has to guess are the same company.
 *
 * Every string here either comes from the translations object or is a stable
 * business fact. Nothing is invented: if we cannot substantiate a property, it
 * is left out rather than filled with a plausible value — a wrong `geo` or a
 * fabricated `aggregateRating` is worse than none, and rating markup a site
 * cannot back up is a manual-action risk.
 *
 * This module takes its URLs as arguments rather than importing them from
 * `seo.ts`, which would make the two modules circular. `seo.ts` owns every URL
 * and passes the three this module needs.
 */

import type { Lang } from "@/translations";
import { t } from "@/translations";

/** Client-confirmed contact details. Single source — see SEO.md §2b. */
const PHONE = "+86 131 6255 5370";
const EMAIL = "info@jufairglobal.com";

/** Profiles we control. `sameAs` is how an engine reconciles the entity. */
const SAME_AS = [
  "https://www.facebook.com/share/1BdSxmw4wg/",
  "https://www.instagram.com/jufair_global",
  "https://www.linkedin.com/company/ju-global-private-limited/",
];

/** The 11 countries the buyer network actually covers (brief §12). */
const AREA_SERVED = [
  "Hungary",
  "Germany",
  "Poland",
  "Czech Republic",
  "Saudi Arabia",
  "United Arab Emirates",
  "Pakistan",
  "Bangladesh",
  "India",
  "Canada",
  "United States",
].map((name) => ({ "@type": "Country", name }));

const SCHEMA_LANG: Record<Lang, string> = { en: "en", cn: "zh-Hans" };

export type GraphContext = {
  /** Route path, e.g. "/services". Used only to decide which nodes apply. */
  path: string;
  lang: Lang;
  /** Must be the same string as the page's <title>. */
  name: string;
  /** Must be the same string as the page's meta description. */
  description: string;
  /** Origin with no trailing slash. */
  siteUrl: string;
  /** Absolute URL of this page in this language. */
  pageUrl: string;
  /** Absolute URL of the homepage in this language. */
  homeUrl: string;
};

/**
 * The company entity.
 *
 * Deliberately `Organization` and not `LocalBusiness`. LocalBusiness is for a
 * place a customer visits and expects a street address and geo coordinates; we
 * publish only "Shanghai, China", and the map component falls back to a
 * city-centre coordinate rather than a surveyed office location. Declaring a
 * precise `geo` from that would be asserting something we cannot stand behind,
 * and thin LocalBusiness markup gets ignored anyway. Upgrade this the day a
 * full registered address exists — see SEO.md §4b.
 */
function organization(ctx: GraphContext) {
  return {
    "@type": "Organization",
    "@id": `${ctx.siteUrl}/#organization`,
    name: "JU FAIR GLOBAL",
    alternateName: "JU Fair Global",
    url: ctx.siteUrl,
    foundingDate: "2022",
    description:
      ctx.lang === "cn"
        ? "总部位于中国上海的展会服务公司，提供国际买家邀约、B2B 商贸配对、买家接待支持与展位销售代理。"
        : "Shanghai-based exhibition services company providing international buyer recruitment, B2B matchmaking, buyer support and exhibition sales representation.",
    parentOrganization: { "@type": "Organization", name: "JU GLOBAL" },
    // A genuinely square 512x512 icon. This previously pointed at
    // favicon.png and declared 512x512, but that file is a 1091x749 wordmark —
    // the dimensions in the markup did not describe the file.
    logo: {
      "@type": "ImageObject",
      url: `${ctx.siteUrl}/icon-512.png`,
      width: 512,
      height: 512,
    },
    image: `${ctx.siteUrl}/hero-card.jpg`,
    email: EMAIL,
    telephone: PHONE,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Shanghai",
      addressCountry: "CN",
    },
    areaServed: AREA_SERVED,
    knowsLanguage: ["en", "zh-Hans"],
    sameAs: SAME_AS,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: PHONE,
        email: EMAIL,
        availableLanguage: ["English", "Chinese"],
      },
    ],
  };
}

function website(ctx: GraphContext) {
  return {
    "@type": "WebSite",
    "@id": `${ctx.siteUrl}/#website`,
    url: ctx.siteUrl,
    name: "JU FAIR GLOBAL",
    publisher: { "@id": `${ctx.siteUrl}/#organization` },
    inLanguage: SCHEMA_LANG[ctx.lang],
  };
}

/**
 * `WebPage` is the node a crawler lands on. It carries the page's language and
 * ties the page to both the site and the breadcrumb trail.
 *
 * `/about`, `/contact` and `/faqs` use their specific subtypes — those are
 * recognised types that describe the page's role, not decoration.
 */
const PAGE_TYPE: Record<string, string> = {
  "/about": "AboutPage",
  "/contact": "ContactPage",
  "/faqs": "FAQPage",
};

function webPage(ctx: GraphContext) {
  const node: Record<string, unknown> = {
    "@type": PAGE_TYPE[ctx.path] ?? "WebPage",
    "@id": `${ctx.pageUrl}#webpage`,
    url: ctx.pageUrl,
    name: ctx.name,
    description: ctx.description,
    isPartOf: { "@id": `${ctx.siteUrl}/#website` },
    about: { "@id": `${ctx.siteUrl}/#organization` },
    inLanguage: SCHEMA_LANG[ctx.lang],
  };
  if (ctx.path !== "/") {
    node.breadcrumb = { "@id": `${ctx.pageUrl}#breadcrumb` };
  }
  return node;
}

/**
 * Breadcrumbs. Two levels only, because the site is genuinely two levels deep —
 * inventing a third to look more structured would misdescribe the hierarchy.
 */
function breadcrumb(ctx: GraphContext) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${ctx.pageUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: ctx.lang === "cn" ? "首页" : "Home",
        item: ctx.homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: ctx.name,
        item: ctx.pageUrl,
      },
    ],
  };
}

/** The four core services, read from translations so copy stays in one place. */
function services(ctx: GraphContext) {
  return t(ctx.lang).services.items.map((item, i) => ({
    "@type": "Service",
    "@id": `${ctx.pageUrl}#service-${i + 1}`,
    name: item.title,
    description: item.desc,
    serviceType: item.title,
    provider: { "@id": `${ctx.siteUrl}/#organization` },
    areaServed: AREA_SERVED,
    // The bullet list under each service is a real list of what is included.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: item.title,
      itemListElement: item.points.map((point) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: point },
      })),
    },
  }));
}

/**
 * Every question on /faqs, for the FAQPage node. Google requires the markup to
 * match the visible page exactly, so this reads the same translations the page
 * renders — hiding extra questions in the markup is a guidelines violation
 * rather than a shortcut.
 */
function faqEntities(ctx: GraphContext) {
  // The translations object is `as const`, so each group's `items` is a
  // distinct readonly tuple type and flatMap cannot unify them on its own.
  // Widening to the common shape is what makes the flatten well-typed.
  type QA = { readonly q: string; readonly a: string };
  const items: readonly QA[] = t(ctx.lang).faqs.groups.flatMap(
    (g) => g.items as readonly QA[],
  );
  return items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  }));
}

/** Exhibitions we have worked with, as a plain ordered list of events. */
function exhibitionList(ctx: GraphContext) {
  const tx = t(ctx.lang).experience.exhibitions;
  return {
    "@type": "ItemList",
    "@id": `${ctx.pageUrl}#exhibitions`,
    name: tx.title,
    numberOfItems: tx.names.length,
    itemListElement: tx.names.map((name, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
    })),
  };
}

/** The full graph for one page, serialised ready for a script element. */
export function pageGraph(ctx: GraphContext): string {
  const page = webPage(ctx);
  const graph: Array<Record<string, unknown>> = [organization(ctx), website(ctx), page];

  if (ctx.path !== "/") {
    graph.push(breadcrumb(ctx));
  }
  if (ctx.path === "/services") {
    graph.push(...services(ctx));
  }
  if (ctx.path === "/faqs") {
    // PAGE_TYPE already made this node an FAQPage, so the questions go onto it
    // rather than into a second node with the same @id — duplicate @ids make
    // the graph ambiguous.
    page.mainEntity = faqEntities(ctx);
  }
  if (ctx.path === "/experience") {
    graph.push(exhibitionList(ctx));
  }

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });

  // Escape every `<` so a stray "</script>" inside any string can never
  // terminate the script element early. Standard practice for inline JSON.
  return json.split("<").join("\\u003c");
}
