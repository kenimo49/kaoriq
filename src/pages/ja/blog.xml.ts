import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: { site: URL }) {
  const posts = (await getCollection('blog'))
    .filter(p => p.data.lang === 'ja')
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'KaoriQ',
    description: '性格科学に基づくデータ駆動のフレグランス推薦。',
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/ja/blog/${post.id.replace('ja/', '')}`,
    })),
  });
}
