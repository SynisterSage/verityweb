import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const supportSectionRoutes = [
      'overview',
      'twilio-call-flow',
      'calls-interactions',
      'circles',
      'automation-rules',
      'safe-phrases',
      'blocked-callers',
      'pin-security',
      'notifications',
      'support-tickets',
      'export-delete',
      'privacy-vision',
      'privacy-data',
      'privacy-use',
      'privacy-retention',
      'privacy-rights',
      'privacy-compliance',
      'privacy-partners',
      'faq-response-time',
      'faq-automation',
      'faq-tickets',
      'faq-account',
      'faq-app-store',
      'billing-overview',
      'billing-support',
      'apple-ios-age-suitability',
      'accessibility',
    ].map((sectionId) => `/support/${sectionId}`);

    const dynamicRoutes = [
      '/',
      '/how-it-works',
      '/benefits',
      '/faq',
      '/agencies',
      '/facilities-contact',
      '/support',
      ...supportSectionRoutes,
      '/privacy',
      '/terms',
    ];

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        sitemap({
          hostname: 'https://www.verityprotect.com',
          dynamicRoutes,
          generateRobotsTxt: false,
        }),
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
