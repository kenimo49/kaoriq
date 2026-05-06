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
