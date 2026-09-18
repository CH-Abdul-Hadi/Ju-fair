/**
 * Chinese mirror of /shanghaitex-matchmaking.
 *
 * Renders the same component as the English route — it reads its copy
 * through useLanguage(), which resolves the language from this path.
 */
import { createFileRoute } from "@tanstack/react-router";
import { ShanghaitexPage } from "./shanghaitex-matchmaking";
import { seoHead } from "@/lib/seo";
import { redirectLegacyLang } from "@/lib/langRedirect";

export const Route = createFileRoute("/cn/shanghaitex-matchmaking")({
  beforeLoad: ({ search }) => redirectLegacyLang("/shanghaitex-matchmaking", search),
  head: () => seoHead("/shanghaitex-matchmaking", "cn"),
  component: ShanghaitexPage,
});
