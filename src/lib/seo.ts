export interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
  publishDate?: Date;
  updatedDate?: Date;
  author?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  jsonLd?: Record<string, unknown>;
}

const SITE_URL  = 'https://www.capitalmind.in';
const SITE_NAME = 'CapitalMind';
const DEFAULT_OG = `${SITE_URL}/images/og-default.jpg`;

export function buildSeo(props: SeoProps) {
  const {
    title,
    description,
    canonical,
    ogImage = DEFAULT_OG,
    ogType = 'website',
    noIndex = false,
    publishDate,
    updatedDate,
    author,
    twitterCard = 'summary_large_image',
    jsonLd,
  } = props;

  const fullTitle    = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical ?? '';

  return {
    fullTitle,
    description,
    canonical: canonicalUrl,
    ogImage: ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`,
    ogType,
    noIndex,
    publishDate,
    updatedDate,
    author,
    twitterCard,
    jsonLd,
    SITE_URL,
    SITE_NAME,
  };
}

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CapitalMind',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.svg`,
    sameAs: [
      'https://twitter.com/capitalmind_in',
      'https://www.linkedin.com/company/capitalmind',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'support@capitalmind.in',
    },
  };
}

export function buildArticleJsonLd(article: {
  title: string;
  description: string;
  url: string;
  publishDate: Date;
  updatedDate?: Date;
  author: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.publishDate.toISOString(),
    dateModified: (article.updatedDate ?? article.publishDate).toISOString(),
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.svg`,
      },
    },
    image: article.image ?? DEFAULT_OG,
    mainEntityOfPage: { '@type': 'WebPage', '@id': article.url },
  };
}

export function buildBreadcrumbJsonLd(items: Array<{ label: string; href: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

export function buildFaqJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
