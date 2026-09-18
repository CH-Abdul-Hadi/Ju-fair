import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLanguage } from "@/hooks/useLanguage";
import { localizedPath, type RoutePath } from "@/lib/paths";

/**
 * An internal link that stays in the visitor's language.
 *
 * Use this for **every** internal navigation. A bare `<Link to="/about">`
 * inside the Chinese site would silently drop the reader back into English on
 * the next click — the same failure the old `search={(p) => ({ ...p })}` rule
 * existed to prevent, now solved by the path prefix instead.
 *
 * `to` is the canonical, language-neutral route (`"/about"`). The `/cn` prefix
 * is applied here, so callers never hand-build a localised path.
 *
 * The cast on `to` is unavoidable: the prefixed string is computed at runtime,
 * so TanStack's route-literal inference cannot see it. `RoutePath` keeps the
 * call sites type-checked, which is where a typo would actually happen.
 */
export function LocalizedLink({
  to,
  ...rest
}: Omit<LinkComponentProps<"a">, "to" | "search"> & { to: RoutePath }) {
  const { lang } = useLanguage();
  return <Link to={localizedPath(to, lang) as never} {...rest} />;
}
