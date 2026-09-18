/**
 * Chinese mirror of /yiwu-commodities-fair-buyer-support.
 *
 * Renders the same component as the English route — it reads its copy
 * through useLanguage(), which resolves the language from this path.
 */
import { createFileRoute } from "@tanstack/react-router";
import { YiwuPage } from "./yiwu-commodities-fair-buyer-support";
import { seoHead } from "@/lib/seo";
import { redirectLegacyLang } from "@/lib/langRedirect";

export const Route = createFileRoute("/cn/yiwu-commodities-fair-buyer-support")({
  beforeLoad: ({ search }) => redirectLegacyLang("/yiwu-commodities-fair-buyer-support", search),
  head: () => seoHead("/yiwu-commodities-fair-buyer-support", "cn"),
  component: YiwuPage,
});
