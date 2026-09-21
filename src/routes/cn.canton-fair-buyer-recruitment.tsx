/**
 * Chinese mirror of /canton-fair-buyer-recruitment.
 *
 * Renders the same component as the English route — it reads its copy
 * through useLanguage(), which resolves the language from this path.
 */
import { createFileRoute } from "@tanstack/react-router";
import { CantonFairPage } from "./canton-fair-buyer-recruitment";
import { seoHead } from "@/lib/seo";
import { redirectLegacyLang } from "@/lib/langRedirect";

export const Route = createFileRoute("/cn/canton-fair-buyer-recruitment")({
  beforeLoad: ({ search }) => redirectLegacyLang("/canton-fair-buyer-recruitment", search),
  head: () => seoHead("/canton-fair-buyer-recruitment", "cn"),
  component: CantonFairPage,
});
