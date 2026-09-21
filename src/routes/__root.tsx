import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useLayoutEffect, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { z } from "zod";

import { LocalizedLink } from "@/components/site/LocalizedLink";
import { langFromPathname } from "@/lib/paths";
import { verificationMeta } from "@/lib/verification";
import { analyticsScripts } from "@/lib/analytics";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { useLanguage } from "../hooks/useLanguage";
import { t } from "../translations";

const searchSchema = z.object({
  lang: z.enum(["en", "cn"]).optional(),
});

function NotFoundComponent() {
  const { lang } = useLanguage();
  const tx = t(lang).notFound;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{tx.title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{tx.desc}</p>
        <div className="mt-6">
          <LocalizedLink
            to="/"
           
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {tx.goHome}
          </LocalizedLink>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "JU Fair Global — International Trade & Exhibitions" },
      {
        name: "description",
        content:
          "Connecting global buyers with real trade opportunities through world-class exhibitions and matchmaking.",
      },
      { property: "og:site_name", content: "JU Fair Global" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      // Explicit indexing directive. `max-image-preview:large` is the part
      // that matters commercially — it lets Google show a full-size image
      // thumbnail beside the result instead of a thumbnail or none, which
      // measurably lifts click-through.
      {
        name: "robots",
        content: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
      },
      // Search-console ownership tags. Emits nothing until a token is filled
      // in — see src/lib/verification.ts for where each one comes from.
      ...verificationMeta(),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.png", type: "image/png", sizes: "512x512" },
      { rel: "shortcut icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "512x512" },
      // Fonts are self-hosted — see the @font-face block at the top of
      // styles.css for why. No preconnect to fonts.googleapis.com is needed
      // any more, and no third-party stylesheet blocks first render.
      //
      // Only the two faces used above the fold are preloaded: Open Sans 400
      // is the body text and Poppins 800 is every hero and section heading.
      // Preloading all nine would compete with the LCP image for bandwidth,
      // which is the usual way a "performance" change makes things worse.
      // `crossOrigin` is required even same-origin, or the preload is fetched
      // in a different CORS mode than the font and downloaded twice.
      {
        rel: "preload",
        href: "/fonts/open-sans-latin-400-normal.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/fonts/poppins-latin-800-normal.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ],
    // Empty until a provider is configured in src/lib/analytics.ts — the site
    // ships with no tracker, no cookies and no third-party analytics request.
    scripts: analyticsScripts(),
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  // Resolve the language during SSR from the request PATH, so the server emits
  // the correct <html lang> instead of always shipping "en" and having LangSync
  // correct it after hydration. A screen reader would otherwise announce the
  // first paint of the Chinese site with English pronunciation rules.
  //
  // This reads the path rather than the old `?lang` search param: since Phase 5
  // the path is the only thing that determines language, and a `?lang` that
  // disagreed with the path would put the wrong value here.
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <html lang={langFromPathname(pathname) === "cn" ? "zh-Hans" : "en"}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/**
 * Sync the <html lang> attribute after a client-side navigation.
 *
 * RootShell sets it correctly for the first paint, but the shell does not
 * re-render on an in-app navigation, so crossing from /about to /cn/about would
 * otherwise leave `lang="en"` on Chinese content.
 */
function LangSync() {
  const { lang } = useLanguage();
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang === "cn" ? "zh-Hans" : "en";
    }
  }, [lang]);
  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Prevent the browser from trying to restore old scroll positions on navigation.
  // Must be 'manual' so we fully own scroll behaviour.
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Scroll to top BEFORE the browser paints the new page.
  //
  // Why useLayoutEffect and not useEffect?
  //   useLayoutEffect fires synchronously after the DOM is updated but BEFORE
  //   the browser paints. useEffect fires AFTER paint. IntersectionObservers in
  //   child ScrollReveal components use useEffect — so they start observing only
  //   after this layout effect has already reset scroll to 0. This prevents the
  //   classic race where observers fire while the browser is still repositioning
  //   the viewport from the previous page's scroll position.
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <LangSync />
      {/* Key on pathname so React fully unmounts/remounts content on navigation */}
      <div
        key={pathname}
        className="animate-fade-in"
        style={{ animationDuration: "250ms", animationFillMode: "both" }}
      >
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}
