export const SITE_URL = 'https://www.verityprotect.com';

export interface SeoEntry {
  title: string;
  description: string;
  ogImage: string;
  indexable?: boolean;
  includeInSitemap?: boolean;
  changefreq?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority?: number;
}

const SUPPORT_SECTION_TITLES: Record<string, string> = {
  overview: 'How Verity Protect keeps you safe',
  'twilio-call-flow': 'Twilio number & paired device',
  'calls-interactions': 'Actions on the calls and alerts screens',
  circles: 'Circle members & roles',
  'automation-rules': 'Automation rules and scam detection',
  'safe-phrases': 'Safe phrases and trusted contacts',
  'blocked-callers': 'Blocked numbers and screened callers',
  'pin-security': 'PINs, passcodes, and security support',
  notifications: 'Notifications & alerts',
  'support-tickets': 'Support tickets & feedback',
  'export-delete': 'Exporting and deleting accounts',
  'privacy-vision': 'We keep your circle secure',
  'privacy-data': 'What we collect',
  'privacy-use': 'How we use it',
  'privacy-retention': 'Data retention',
  'privacy-rights': 'Account controls',
  'privacy-compliance': 'Legal safeguards & compliance',
  'privacy-partners': 'Third-party partners',
  'faq-response-time': 'When will I hear back?',
  'faq-automation': 'Why did automation flag this call?',
  'faq-tickets': 'How does the ticket timeline work?',
  'faq-account': 'Can I export or delete my data?',
  'faq-app-store': 'How do I manage charges?',
  'billing-overview': 'App Store or Play Store billing',
  'billing-support': 'How support helps',
  'apple-ios-age-suitability': 'Apple iOS age suitability (12+)',
  accessibility: 'Accessibility approach',
};

const SUPPORT_SECTION_SEO = Object.fromEntries(
  Object.entries(SUPPORT_SECTION_TITLES).map(([sectionId, sectionTitle]) => [
    `/support/${sectionId}`,
    {
      title: `${sectionTitle} | Verity Protect Support`,
      description: `Read support guidance on "${sectionTitle}" in the Verity Protect support center.`,
      ogImage: '/og-image.png',
      changefreq: 'monthly',
      priority: 0.55,
    } as SeoEntry,
  ])
) as Record<string, SeoEntry>;

export const seo: Record<string, SeoEntry> = {
  '/': {
    title: 'Verity Protect | Scam Call Screening for Seniors and Families',
    description:
      'Block scam calls, screen unknown numbers, and protect older adults with family-managed trusted contacts and voicemail review.',
    ogImage: '/og-image.png',
    changefreq: 'weekly',
    priority: 1.0,
  },
  '/how-it-works': {
    title: 'How Verity Protect Works | Family Call Screening',
    description: 'See how trusted contacts, Family PIN checks, and voicemail review work together to stop scam calls.',
    ogImage: '/og-image.png',
    changefreq: 'weekly',
    priority: 0.8,
  },
  '/benefits': {
    title: 'Benefits | Reduce Scam Calls for Loved Ones',
    description: 'Give your family fewer spam interruptions, more trusted call connections, and better oversight.',
    ogImage: '/og-image.png',
    changefreq: 'weekly',
    priority: 0.8,
  },
  '/faq': {
    title: 'FAQ | Verity Protect Pricing, Setup, and Features',
    description: 'Get quick answers about Verity Protect setup, trusted contacts, Family PIN, and monthly or annual pricing.',
    ogImage: '/og-image.png',
    changefreq: 'weekly',
    priority: 0.7,
  },
  '/agencies': {
    title: 'Senior Living Partnerships | Verity Protect',
    description:
      'Offer residents scam-call protection with zero facility cost, minimal staff setup, and family-led onboarding.',
    ogImage: '/og-image.png',
    changefreq: 'monthly',
    priority: 0.75,
  },
  '/facilities-contact': {
    title: 'Facility Partnerships Contact | Verity Protect',
    description: 'Private contact form for senior living facilities interested in Verity Protect partnerships.',
    ogImage: '/og-image.png',
    changefreq: 'monthly',
    priority: 0.6,
  },
  '/support': {
    title: 'Support Center | Verity Protect',
    description: 'Search support articles for setup, billing, privacy, troubleshooting, and account help.',
    ogImage: '/og-image.png',
    changefreq: 'monthly',
    priority: 0.65,
  },
  ...SUPPORT_SECTION_SEO,
  '/privacy': {
    title: 'Privacy Policy | Verity Protect',
    description: 'Review how Verity Protect collects, uses, and secures personal data.',
    ogImage: '/og-image.png',
    changefreq: 'yearly',
    priority: 0.4,
  },
  '/terms': {
    title: 'Terms of Service | Verity Protect',
    description: 'Read Verity Protect terms, legal notices, account rules, and service conditions.',
    ogImage: '/og-image.png',
    changefreq: 'yearly',
    priority: 0.4,
  },
  '/auth/callback': {
    title: 'Auth Callback | Verity Protect',
    description: 'Internal authentication redirect for Verity Protect account sign-in and password reset links.',
    ogImage: '/og-image.png',
    indexable: false,
    includeInSitemap: false,
  },
};

export default seo;
