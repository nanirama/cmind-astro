import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import tailwind from '@astrojs/tailwind';
import compress from '@playform/compress';
import { FontaineTransform } from 'fontaine';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export default defineConfig({
  site: 'https://www.capitalmind.in',
  trailingSlash: 'never',
  output: 'static',

  prefetch: {
    defaultStrategy: 'viewport',
    prefetchAll: false,
  },

  build: {
    // The site's Tailwind/global.css bundle is one shared chunk across every
    // page (~15KB gzipped). Linking it externally makes every page wait on
    // an extra render-blocking round trip before first paint. Inlining it
    // into each page's <head> removes that request from the critical path;
    // the trade-off is losing cross-page cache reuse of those bytes, which
    // costs less here than the blocking round trip did.
    inlineStylesheets: 'always',
  },

  integrations: [
    react({
      include: ['**/components/**/*.tsx', '**/islands/**/*.tsx'],
    }),

    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'github-light',
        wrap: true,
      },
      remarkPlugins: [],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'prepend',
            properties: {
              className: ['anchor-link'],
              ariaLabel: 'Link to section',
            },
          },
        ],
      ],
      remarkRehype: {
        footnoteLabel: 'Footnotes',
      },
    }),

    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-IN' },
      },
    }),

    tailwind({
      applyBaseStyles: false,
      nesting: true,
    }),

    partytown({
      config: {
        forward: ['dataLayer.push', 'gtag'],
      },
    }),

    // Must run last: minifies HTML/CSS/JS/SVG in the final build output.
    compress({
      HTML: true,
      CSS: true,
      JavaScript: true,
      SVG: true,
      Image: false, // images are already optimized via astro:assets + sharp
    }),
  ],

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.capitalmind.in',
      },
    ],
    defaultOutputFormat: 'avif',
  },

  vite: {
    plugins: [
      // Generates metric-matched local @font-face fallbacks for every font
      // declared in global.css, cutting layout shift from the swap to the
      // self-hosted webfont (font-display: swap already set on all faces).
      FontaineTransform.vite({
        fallbacks: {}, // auto-picks serif/sans-serif fallback metrics per font family
        resolvePath: (id) => new URL(`./public${id}`, import.meta.url),
      }),
    ],
    resolve: {
      dedupe: ['react', 'react-dom', 'react-dom/client', 'framer-motion'],
    },
    optimizeDeps: {
      dedupe: ['react', 'react-dom', 'react-dom/client', 'framer-motion'],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'framer-motion': ['framer-motion'],
          },
        },
      },
    },
    ssr: {
      noExternal: ['framer-motion'],
    },
  },

  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-light',
    },
    rehypePlugins: [rehypeSlug],
    remarkRehype: {
      footnoteLabel: 'Footnotes',
    },
    gfm: true,
  },
});
