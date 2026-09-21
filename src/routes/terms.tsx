import { createFileRoute } from "@tanstack/react-router";
import { LegalDocument } from "@/components/site/LegalDocument";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "@/translations";
import { seoHead } from "@/lib/seo";
import { redirectLegacyLang } from "@/lib/langRedirect";

export const Route = createFileRoute("/terms")({
  // Language is the path now, so this route is unconditionally English.
  beforeLoad: ({ search }) => redirectLegacyLang("/terms", search),
  head: () => seoHead("/terms", "en"),
  component: TermsPage,
});

export function TermsPage() {
  const { lang } = useLanguage();
  return <LegalDocument doc={t(lang).legal.terms} />;
}
