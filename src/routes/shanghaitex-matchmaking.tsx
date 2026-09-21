import { createFileRoute } from "@tanstack/react-router";
import { ExhibitionPage } from "@/components/site/ExhibitionPage";
import { seoHead } from "@/lib/seo";
import { redirectLegacyLang } from "@/lib/langRedirect";

export const Route = createFileRoute("/shanghaitex-matchmaking")({
  // Language is the path now, so this route is unconditionally English.
  beforeLoad: ({ search }) => redirectLegacyLang("/shanghaitex-matchmaking", search),
  head: () => seoHead("/shanghaitex-matchmaking", "en"),
  component: ShanghaitexPage,
});

export function ShanghaitexPage() {
  return <ExhibitionPage index={1} />;
}
