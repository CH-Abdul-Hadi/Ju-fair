import { createFileRoute } from "@tanstack/react-router";
import { ExhibitionPage } from "@/components/site/ExhibitionPage";
import { seoHead } from "@/lib/seo";
import { redirectLegacyLang } from "@/lib/langRedirect";

export const Route = createFileRoute("/canton-fair-buyer-recruitment")({
  // Language is the path now, so this route is unconditionally English.
  beforeLoad: ({ search }) => redirectLegacyLang("/canton-fair-buyer-recruitment", search),
  head: () => seoHead("/canton-fair-buyer-recruitment", "en"),
  component: CantonFairPage,
});

export function CantonFairPage() {
  return <ExhibitionPage index={0} />;
}
