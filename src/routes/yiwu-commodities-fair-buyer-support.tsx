import { createFileRoute } from "@tanstack/react-router";
import { ExhibitionPage } from "@/components/site/ExhibitionPage";
import { seoHead } from "@/lib/seo";
import { redirectLegacyLang } from "@/lib/langRedirect";

export const Route = createFileRoute("/yiwu-commodities-fair-buyer-support")({
  // Language is the path now, so this route is unconditionally English.
  beforeLoad: ({ search }) => redirectLegacyLang("/yiwu-commodities-fair-buyer-support", search),
  head: () => seoHead("/yiwu-commodities-fair-buyer-support", "en"),
  component: YiwuPage,
});

export function YiwuPage() {
  return <ExhibitionPage index={2} />;
}
