import type { APIRoute } from 'astro';

const SITE_URL = 'https://www.capitalmind.in';

export const GET: APIRoute = () => {
  const robots = `User-agent: *
Allow: /

User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /

Sitemap: ${SITE_URL}/sitemap-index.xml
`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
