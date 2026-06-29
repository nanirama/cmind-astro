export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
  external?: boolean;
  badge?: string;
}

export const primaryNav: NavItem[] = [
  {
    label: 'Strategies',
    href: '/strategies',
    description: 'Investment strategies for every risk profile',
    children: [
      { label: 'All Strategies',    href: '/strategies',            description: 'Browse our complete strategy portfolio' },
      { label: 'Momentum',          href: '/strategies/momentum',   description: 'Trend-following equity strategies' },
      { label: 'Smallcap',          href: '/strategies/smallcap',   description: 'High-growth small-cap opportunities' },
      { label: 'Large & Midcap',    href: '/strategies/largecap',   description: 'Stable blue-chip investments' },
      { label: 'Surge India',       href: '/surge-india',           description: 'India infrastructure growth play' },
    ],
  },
  {
    label: 'Insights',
    href: '/insights',
    description: 'Research, analysis, and market commentary',
    children: [
      { label: 'All Insights',      href: '/insights',              description: 'Deep-dive research and analysis' },
      { label: 'Market Commentary', href: '/insights/commentary',   description: 'Weekly market views from our team' },
      { label: 'NRI Corner',        href: '/insights/nri',          description: 'Special content for NRI investors' },
      { label: 'Blog',              href: '/blog',                  description: 'Founders, investors, and wealth musings' },
    ],
  },
  {
    label: 'Who We Serve',
    href: '/who-we-serve',
    description: 'Tailored solutions for every investor type',
    children: [
      { label: 'NRI Investors',     href: '/nri',                   description: 'Invest in India from anywhere' },
      { label: 'Founders',          href: '/founders',              description: 'Liquidity and wealth management' },
      { label: 'Wealth Clients',    href: '/wealth-management',     description: 'Private wealth advisory' },
      { label: 'Retail Investors',  href: '/investors',             description: 'Start your wealth journey' },
    ],
  },
  {
    label: 'About',
    href: '/about',
    description: 'Our story, team, and philosophy',
    children: [
      { label: 'About CapitalMind', href: '/about',                 description: 'Who we are and what we believe' },
      { label: 'Team',              href: '/team',                  description: 'Meet the people behind the numbers' },
      { label: 'Philosophy',        href: '/philosophy',            description: 'Our investment principles' },
      { label: 'Track Record',      href: '/track-record',          description: 'Audited performance history' },
    ],
  },
];

export const footerNav = {
  strategies: {
    label: 'Strategies',
    links: [
      { label: 'Momentum',       href: '/strategies/momentum'  },
      { label: 'Smallcap',       href: '/strategies/smallcap'  },
      { label: 'Large & Midcap', href: '/strategies/largecap'  },
      { label: 'Surge India',    href: '/surge-india'          },
      { label: 'All Strategies', href: '/strategies'           },
    ],
  },
  company: {
    label: 'Company',
    links: [
      { label: 'About',          href: '/about'                },
      { label: 'Team',           href: '/team'                 },
      { label: 'Track Record',   href: '/track-record'         },
      { label: 'Philosophy',     href: '/philosophy'           },
      { label: 'Careers',        href: '/careers'              },
    ],
  },
  resources: {
    label: 'Resources',
    links: [
      { label: 'Insights',       href: '/insights'             },
      { label: 'Blog',           href: '/blog'                 },
      { label: 'NRI Corner',     href: '/insights/nri'         },
      { label: 'RSS Feed',       href: '/rss.xml'              },
    ],
  },
  legal: {
    label: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/legal/privacy'        },
      { label: 'Terms of Use',   href: '/legal/terms'          },
      { label: 'Disclaimer',     href: '/legal/disclaimer'     },
      { label: 'SEBI Disclosures', href: '/legal/sebi'         },
    ],
  },
};

export const socialLinks = [
  { label: 'Twitter / X', href: 'https://twitter.com/capitalmind_in', icon: 'twitter' },
  { label: 'LinkedIn',    href: 'https://linkedin.com/company/capitalmind', icon: 'linkedin' },
  { label: 'YouTube',     href: 'https://youtube.com/@capitalmind', icon: 'youtube' },
];
