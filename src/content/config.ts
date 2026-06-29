import { defineCollection, z, reference } from 'astro:content';

// ── Shared field groups ───────────────────────────────────────────────────────

const seoFields = z.object({
  seoTitle:        z.string().max(60).optional(),
  seoDescription:  z.string().max(160).optional(),
  canonical:       z.string().url().optional(),
  noIndex:         z.boolean().default(false),
  ogImage:         z.string().optional(),
  twitterCard:     z.enum(['summary', 'summary_large_image']).default('summary_large_image'),
});

const imageField = z.object({
  src: z.string(),
  alt: z.string(),
  width:  z.number().optional(),
  height: z.number().optional(),
});

const dateFields = z.object({
  publishDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
});

// ── Section schema (content-driven rendering) ─────────────────────────────────

const heroSectionSchema = z.object({
  type:        z.literal('hero'),
  eyebrow:     z.string().optional(),
  heading:     z.string(),
  subheading:  z.string().optional(),
  body:        z.string().optional(),
  ctas:        z.array(z.object({
    label:    z.string(),
    href:     z.string(),
    variant:  z.enum(['primary', 'secondary', 'ghost']).default('primary'),
    external: z.boolean().default(false),
  })).optional(),
  image:       imageField.optional(),
  backgroundVariant: z.enum(['default', 'gradient', 'dark', 'image']).default('default'),
  fullHeight:  z.boolean().default(false),
});

const statsSectionSchema = z.object({
  type:    z.literal('stats'),
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  stats:   z.array(z.object({
    value:  z.string(),
    label:  z.string(),
    prefix: z.string().optional(),
    suffix: z.string().optional(),
  })),
});

const contentSectionSchema = z.object({
  type:    z.literal('content'),
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  body:    z.string(),
  layout:  z.enum(['centered', 'left', 'two-col']).default('centered'),
  image:   imageField.optional(),
  imagePosition: z.enum(['left', 'right']).default('right'),
});

const ctaSectionSchema = z.object({
  type:       z.literal('cta'),
  eyebrow:    z.string().optional(),
  heading:    z.string(),
  body:       z.string().optional(),
  ctas:       z.array(z.object({
    label:   z.string(),
    href:    z.string(),
    variant: z.enum(['primary', 'secondary', 'ghost', 'gold']).default('primary'),
  })),
  variant:    z.enum(['default', 'dark', 'brand']).default('default'),
});

const testimonialSectionSchema = z.object({
  type:         z.literal('testimonials'),
  eyebrow:      z.string().optional(),
  heading:      z.string().optional(),
  testimonials: z.array(z.object({
    quote:    z.string(),
    author:   z.string(),
    role:     z.string().optional(),
    company:  z.string().optional(),
    avatar:   imageField.optional(),
  })),
});

const faqSectionSchema = z.object({
  type:        z.literal('faq'),
  eyebrow:     z.string().optional(),
  heading:     z.string().optional(),
  viewAllHref: z.string().optional(),
  contactHref: z.string().optional(),
  faqs:        z.array(z.object({
    question: z.string(),
    answer:   z.string(),
  })),
});

const teamSectionSchema = z.object({
  type:    z.literal('team'),
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  members: z.array(z.object({
    name:   z.string(),
    role:   z.string(),
    bio:    z.string().optional(),
    image:  imageField.optional(),
    linkedin: z.string().url().optional(),
    twitter:  z.string().url().optional(),
  })),
});

const timelineSectionSchema = z.object({
  type:    z.literal('timeline'),
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  events:  z.array(z.object({
    year:        z.string(),
    heading:     z.string(),
    description: z.string().optional(),
  })),
});

const quoteSectionSchema = z.object({
  type:   z.literal('quote'),
  quote:  z.string(),
  author: z.string(),
  role:   z.string().optional(),
  variant: z.enum(['default', 'large', 'branded']).default('default'),
});

const featuresSectionSchema = z.object({
  type:     z.literal('features'),
  eyebrow:  z.string().optional(),
  heading:  z.string().optional(),
  body:     z.string().optional(),
  layout:   z.enum(['grid', 'list', 'alternating']).default('grid'),
  columns:  z.union([z.literal(2), z.literal(3), z.literal(4)]).default(3),
  features: z.array(z.object({
    icon:        z.string().optional(),
    heading:     z.string(),
    description: z.string(),
    link:        z.object({ label: z.string(), href: z.string() }).optional(),
  })),
});

const audienceSectionSchema = z.object({
  type:      z.literal('audience'),
  eyebrow:   z.string().optional(),
  heading:   z.string().optional(),
  audiences: z.array(z.object({
    label:       z.string(),
    description: z.string(),
    href:        z.string().optional(),
    icon:        z.string().optional(),
    image:       imageField.optional(),
  })),
});

const strategySectionSchema = z.object({
  type:       z.literal('strategies'),
  eyebrow:    z.string().optional(),
  heading:    z.string().optional(),
  strategies: z.array(z.object({
    name:        z.string(),
    description: z.string(),
    returns:     z.string().optional(),
    risk:        z.enum(['low', 'moderate', 'high']).optional(),
    href:        z.string().optional(),
    image:       imageField.optional(),
  })),
});

const whoweserveSectionSchema = z.object({
  type:     z.literal('whoweserve'),
  eyebrow:  z.string().optional(),
  heading:  z.string().optional(),
  body:     z.string().optional(),
  personas: z.array(z.object({
    id:          z.string(),
    title:       z.string(),
    description: z.string(),
    href:        z.string().optional(),
    image:       imageField.optional(),
    links:       z.array(z.object({
      label: z.string(),
      href:  z.string(),
    })).optional(),
  })),
});

const meetOurFounderSectionSchema = z.object({
  type:              z.literal('meetourfounder'),
  founderName:       z.string().optional(),
  founderTitle:      z.string().optional(),
  founderImage:      z.string().optional(),
  founderBgImage:    z.string().optional(),
  founderQuote:      z.string().optional(),
  leadershipHeading: z.string().optional(),
  team:              z.array(z.object({
    name:  z.string(),
    role:  z.string(),
    image: z.string(),
  })).optional(),
  bookEyebrow:       z.string().optional(),
  bookHeading:       z.string().optional(),
  bookDescription:   z.string().optional(),
  bookPurchaseLabel: z.string().optional(),
  bookPurchaseHref:  z.string().optional(),
  podcastImage:      z.string().optional(),
});

const capitalmindAdvantageSectionSchema = z.object({
  type:     z.literal('capitalmindadvantage'),
  eyebrow:  z.string().optional(),
  ctaLabel: z.string().optional(),
  ctaHref:  z.string().optional(),
  rows:     z.array(z.object({
    title:     z.string(),
    icon:      z.string(),
    cardText:  z.string(),
    rightText: z.string(),
  })),
});

const ourInvestmentPrinciplesSectionSchema = z.object({
  type:     z.literal('ourinvestmentprinciples'),
  heading:  z.string(),
  ctaLabel: z.string().optional(),
  ctaHref:  z.string().optional(),
  features: z.array(z.object({
    title:       z.string(),
    description: z.string(),
    image:       z.string(),
    imageWidth:  z.number().default(300),
    imageHeight: z.number().default(200),
  })),
});

const latestMarketUpdatesSectionSchema = z.object({
  type:             z.literal('latestmarketupdates'),
  heading:          z.string().optional(),
  mobileHeading:    z.string().optional(),
  ctaLabel:         z.string().optional(),
  ctaHref:          z.string().optional(),
  newsletterHeading: z.string().optional(),
  newsletterBody:   z.string().optional(),
  articles:         z.array(z.object({
    category:   z.string(),
    title:      z.string(),
    description: z.string(),
    author:     z.string(),
    image:      z.string(),
    imageAlt:   z.string(),
  })),
});

const testimonialsSectionSchema = z.object({
  type:         z.literal('testimonialssection'),
  heading:      z.string().optional(),
  testimonials: z.array(z.object({
    quote:        z.string(),
    mobileQuote:  z.string().optional(),
    name:         z.string(),
    role:         z.string(),
    image:        z.string(),
    wide:         z.boolean().default(false),
    showOnMobile: z.boolean().default(true),
  })),
});

const sectionSchema = z.discriminatedUnion('type', [
  heroSectionSchema,
  statsSectionSchema,
  contentSectionSchema,
  ctaSectionSchema,
  testimonialSectionSchema,
  faqSectionSchema,
  teamSectionSchema,
  timelineSectionSchema,
  quoteSectionSchema,
  featuresSectionSchema,
  audienceSectionSchema,
  strategySectionSchema,
  whoweserveSectionSchema,
  ourInvestmentPrinciplesSectionSchema,
  capitalmindAdvantageSectionSchema,
  meetOurFounderSectionSchema,
  testimonialsSectionSchema,
  latestMarketUpdatesSectionSchema,
]);

// ── Collections ───────────────────────────────────────────────────────────────

const home = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    sections:    z.array(sectionSchema).optional(),
  }).merge(seoFields),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title:          z.string(),
    description:    z.string(),
    featuredImage:  imageField.optional(),
    sections:       z.array(sectionSchema).optional(),
    showBreadcrumb: z.boolean().default(true),
  }).merge(seoFields).merge(dateFields.partial()),
});

const strategies = defineCollection({
  type: 'content',
  schema: z.object({
    title:         z.string(),
    description:   z.string(),
    featuredImage: imageField.optional(),
    category:      z.string().optional(),
    riskLevel:     z.enum(['low', 'moderate', 'high', 'very-high']).optional(),
    targetReturns: z.string().optional(),
    minInvestment: z.string().optional(),
    horizon:       z.string().optional(),
    tags:          z.array(z.string()).default([]),
    draft:         z.boolean().default(false),
  }).merge(seoFields).merge(dateFields),
});

const insights = defineCollection({
  type: 'content',
  schema: z.object({
    title:         z.string(),
    description:   z.string(),
    featuredImage: imageField.optional(),
    category:      z.string(),
    tags:          z.array(z.string()).default([]),
    author:        reference('authors'),
    readingTime:   z.string().optional(),
    featured:      z.boolean().default(false),
    draft:         z.boolean().default(false),
  }).merge(seoFields).merge(dateFields),
});

const blogs = defineCollection({
  type: 'content',
  schema: z.object({
    title:         z.string(),
    description:   z.string(),
    featuredImage: imageField.optional(),
    category:      z.string(),
    tags:          z.array(z.string()).default([]),
    author:        reference('authors'),
    readingTime:   z.string().optional(),
    featured:      z.boolean().default(false),
    draft:         z.boolean().default(false),
  }).merge(seoFields).merge(dateFields),
});

const authors = defineCollection({
  type: 'content',
  schema: z.object({
    name:      z.string(),
    role:      z.string(),
    bio:       z.string(),
    avatar:    imageField.optional(),
    linkedin:  z.string().url().optional(),
    twitter:   z.string().url().optional(),
    email:     z.string().email().optional(),
    expertise: z.array(z.string()).default([]),
  }),
});

const team = defineCollection({
  type: 'content',
  schema: z.object({
    name:      z.string(),
    role:      z.string(),
    bio:       z.string(),
    avatar:    imageField.optional(),
    linkedin:  z.string().url().optional(),
    twitter:   z.string().url().optional(),
    order:     z.number().default(99),
    featured:  z.boolean().default(false),
    expertise: z.array(z.string()).default([]),
  }),
});

const legal = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    version:     z.string().optional(),
  }).merge(seoFields).merge(dateFields),
});

export const collections = {
  home,
  pages,
  strategies,
  insights,
  blogs,
  authors,
  team,
  legal,
};
