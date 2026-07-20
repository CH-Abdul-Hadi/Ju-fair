import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback } from "react";
import { type Lang } from "../translations";

const STORAGE_KEY = "jufair_lang";

/**
 * Returns the current language and a setter.
 *
 * The language is stored as a URL search-param `?lang=en|cn` (so it's
 * shareable/bookmarkable) and also mirrored to localStorage so the user's
 * choice is remembered on their next visit.
 */
export function useLanguage() {
  // The root route validates `lang` — fall back to localStorage → "en"
  const search = useSearch({ strict: false }) as { lang?: Lang };
  const navigate = useNavigate();

  const lang: Lang =
    search.lang ??
    (typeof localStorage !== "undefined"
      ? ((localStorage.getItem(STORAGE_KEY) as Lang | null) ?? "en")
      : "en");

  const setLang = useCallback(
    (next: Lang) => {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(STORAGE_KEY, next);
      }
      navigate({
        search: (prev: Record<string, unknown>) => ({ ...prev, lang: next }),
        replace: true,
      });
    },
    [navigate],
  );

  return { lang, setLang } as const;
}
