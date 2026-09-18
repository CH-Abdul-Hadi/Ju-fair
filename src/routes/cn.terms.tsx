/**
 * Chinese mirror of /terms.
 *
 * Renders the *same* component as the English route — the page reads its
 * copy through useLanguage(), which resolves the language from this path.
 * Importing the component rather than duplicating it is what guarantees the
 * two languages can never drift apart structurally.
 */
import { createFileRoute } from "@tanstack/react-router";
import { TermsPage } from "./terms";
import { seoHead } from "@/lib/seo";
import { redirectLegacyLang } from "@/lib/langRedirect";

export const Route = createFileRoute("/cn/terms")({
  beforeLoad: ({ search }) => redirectLegacyLang("/terms", search),
  head: () => seoHead("/terms", "cn"),
  component: TermsPage,
});
