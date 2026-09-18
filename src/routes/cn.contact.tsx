/**
 * Chinese mirror of /contact.
 *
 * Renders the *same* component as the English route — the page reads its
 * copy through useLanguage(), which resolves the language from this path.
 * Importing the component rather than duplicating it is what guarantees the
 * two languages can never drift apart structurally.
 */
import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "./contact";
import { seoHead } from "@/lib/seo";
import { redirectLegacyLang } from "@/lib/langRedirect";

export const Route = createFileRoute("/cn/contact")({
  beforeLoad: ({ search }) => redirectLegacyLang("/contact", search),
  head: () => seoHead("/contact", "cn"),
  component: ContactPage,
});
