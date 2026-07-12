import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import tailwind from '@astrojs/tailwind';
import compress from '@playform/compress';
import { compression } from 'vite-plugin-compression2';
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
      // Emits pre-compressed .gz/.br sidecar files for text assets in dist/.
      // Only served automatically if CloudFront's built-in "Compress objects
      // automatically" is enabled (recommended) or a CloudFront Function/
      // Lambda@Edge negotiates Content-Encoding against these sidecar files.
      compression({
        algorithm: 'gzip',
        include: /\.(html|css|js|mjs|svg|json|xml|txt)$/,
        threshold: 1024,
        deleteOriginalAssets: false,
      }),
      compression({
        algorithm: 'brotliCompress',
        include: /\.(html|css|js|mjs|svg|json|xml|txt)$/,
        threshold: 1024,
        deleteOriginalAssets: false,
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
