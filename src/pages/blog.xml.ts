import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: { site: URL }) {
  const posts = (await getCollection('blog'))
    .filter(p => p.data.lang === 'en')
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'KaoriQ',
    description: 'Data-driven fragrance recommendations powered by personality science.',
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.id.replace('en/', '')}/`,
    })),
  });
}
