import type { CollectionEntry } from 'astro:content';

export const SUPPORTED_LANGS = ['en', 'ja', 'ko', 'fr', 'pt', 'es'] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

export interface Alternate {
  hreflang: string;
  href: string;
}

function urlForLang(lang: Lang, slug: string): string {
  return lang === 'en'
    ? `https://kaoriq.com/blog/${slug}/`
    : `https://kaoriq.com/${lang}/blog/${slug}/`;
}

/**
 * 指定されたslugについて、実際に翻訳が存在する言語のhreflangリストを返す。
 * x-default はデフォルト言語（en）にフォールバック、なければ存在する任意の翻訳。
 */
export function blogAlternates(
  allPosts: CollectionEntry<'blog'>[],
  slug: string,
): Alternate[] {
  const available: Lang[] = SUPPORTED_LANGS.filter((lang) =>
    allPosts.some((p) => p.id === `${lang}/${slug}`),
  );

  if (available.length === 0) return [];

  const alternates: Alternate[] = available.map((lang) => ({
    hreflang: lang,
    href: urlForLang(lang, slug),
  }));

  const defaultLang: Lang = available.includes('en') ? 'en' : available[0];
  alternates.push({
    hreflang: 'x-default',
    href: urlForLang(defaultLang, slug),
  });

  return alternates;
}

/**
 * 静的ページ用のhreflang。各言語版が存在するページパスのマップを渡す。
 * 例: staticAlternates({ en: '/', ja: '/ja/' })
 */
export function staticAlternates(paths: Partial<Record<Lang, string>>): Alternate[] {
  const entries = (Object.entries(paths) as [Lang, string][])
    .filter(([, p]) => Boolean(p));
  if (entries.length === 0) return [];
  const list: Alternate[] = entries.map(([lang, path]) => ({
    hreflang: lang,
    href: `https://kaoriq.com${path}`,
  }));
  const fallback = entries.find(([l]) => l === 'en') ?? entries[0];
  list.push({ hreflang: 'x-default', href: `https://kaoriq.com${fallback[1]}` });
  return list;
}
