import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useCallback } from "react";
import { type Lang } from "../translations";
import { langFromPathname, localizedPath, stripLang } from "@/lib/paths";

/**
 * Returns the current language and a setter.
 *
 * The language is determined **entirely by the URL path**: `/about` is English,
 * `/cn/about` is Chinese. Nothing else participates.
 *
 * That last part is deliberate and load-bearing. This hook used to fall back to
 * a `localStorage` preference when no `?lang` param was present, which meant a
 * returning Chinese visitor was served Chinese content at the *English* URL.
 * Under path-based i18n that is a duplicate-content bug: one URL would serve
 * two different languages depending on who asked, the canonical and `hreflang`
 * tags would describe only one of them, and a crawler warming a page for a
 * returning visitor could index the wrong copy. A URL must fully determine what
 * it serves, so the stored preference is gone. Visitors switch with the header
 * toggle, and search engines are told about both versions via `hreflang`.
 */
export function useLanguage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  const lang: Lang = langFromPathname(pathname);

  const setLang = useCallback(
    (next: Lang) => {
      // Swap the prefix on the *current* page rather than going home, so the
      // visitor stays where they were reading.
      const target = localizedPath(stripLang(pathname), next);
      (navigate as any)({ to: target, replace: false });
    },
    [navigate, pathname],
  );

  return { lang, setLang } as const;
}
