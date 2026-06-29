import rss from '@astrojs/rss';
import { getCollection, type CollectionEntry } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const [rawBlogs, rawInsights] = await Promise.all([
    getCollection('blogs'),
    getCollection('insights'),
  ]);
  const blogs    = rawBlogs.filter((p: CollectionEntry<'blogs'>) => !p.data.draft);
  const insights = rawInsights.filter((i: CollectionEntry<'insights'>) => !i.data.draft);

  const all = [...blogs, ...insights].sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime()
  );

  return rss({
    title:       'CapitalMind',
    description: 'Research-driven investing for the discerning Indian investor.',
    site:         context.site!.toString(),
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
      dc:   'http://purl.org/dc/elements/1.1/',
    },
    customData: `
      <language>en-in</language>
      <atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml" />
      <managingEditor>content@capitalmind.in (CapitalMind)</managingEditor>
      <webMaster>tech@capitalmind.in (CapitalMind Tech)</webMaster>
    `,
    items: all.map((item) => ({
      title:       item.data.title,
      description: item.data.description,
      link:        `/${item.collection}/${item.slug}`,
      pubDate:     item.data.publishDate,
      categories:  [item.data.category],
    })),
  });
}
