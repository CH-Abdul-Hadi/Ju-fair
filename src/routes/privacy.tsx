import { createFileRoute } from "@tanstack/react-router";
import { LegalDocument } from "@/components/site/LegalDocument";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";
import { seoHead } from "@/lib/seo";
import { redirectLegacyLang } from "@/lib/langRedirect";
import { analyticsProvider } from "@/lib/analytics";

export const Route = createFileRoute("/privacy")({
  // Language is the path now, so this route is unconditionally English.
  beforeLoad: ({ search }) => redirectLegacyLang("/privacy", search),
  head: () => seoHead("/privacy", "en"),
  component: PrivacyPage,
});

export function PrivacyPage() {
  const { lang } = useLanguage();
  const doc = t(lang).legal.privacy;

  // The policy describes what the site is ACTUALLY doing, not what it did when
  // the copy was written. The default wording says there is no analytics —
  // true today — and switching a provider on would silently make the published
  // policy false. Substituting the paragraphs here means it cannot: the claim
  // and the configuration are read from the same source.
  //
  // This is the mistake Phase 6 had to correct by hand after self-hosting the
  // fonts removed a data processor the policy still named.
  const provider = analyticsProvider();
  const sections = provider
    ? doc.sections.map((section) =>
        "id" in section && section.id === "cookies"
          ? { h: section.h, p: doc.analytics[provider] }
          : section,
      )
    : doc.sections;

  return <LegalDocument doc={{ hero: doc.hero, sections }} />;
}
