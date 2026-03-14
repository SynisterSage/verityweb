export type ResourceReference = {
  label: string;
  url: string;
  prefix?: string;
};

export type ResourceSection = {
  id: string;
  title: string;
  body: string;
  bullets?: string[];
  references?: ResourceReference[];
};

export type SupportResourceType = 'system-basics' | 'privacy' | 'faq' | 'billing' | 'app-store';

export const SYSTEM_BASICS_CONTENT: ResourceSection[] = [
  {
    id: 'overview',
    title: 'How Verity Protect keeps you safe',
    body:
      'Verity Protect brings your trusted circle, ticket history, automation, and call monitoring into one place. You never have to dig through different apps; everything happens inside the same interface so you can act quickly.',
  },
  {
    id: 'twilio-call-flow',
    title: 'Twilio number & paired device',
    body:
      'Each profile pairs with a Twilio number. We record, analyze, and forward suspect calls, while also sending low-latency alerts to your phone. Add that number to your contacts so calls feel like a normal call from a trusted helper.',
    bullets: [
      'Link the Twilio number inside Settings → Paired Devices to see what hardware is listening.',
      'If you answer through the Twilio number, Verity automatically logs duration, transcription, and risk scores.',
      'Lost your phone? Remove the device from the list so it stops receiving alerts and recordings.',
    ],
  },
  {
    id: 'calls-interactions',
    title: 'Actions on the calls and alerts screens',
    body:
      'Calls and alerts stay together so you can take action fast. Tap a call or alert to open the detail view, or long press to bring up quick tools for that item.',
    bullets: [
      'Long press a call to block the number, trust it, archive it, or delete the log when it is no longer helpful.',
      'Long press a handled alert to delete it from your list while keeping the history for your circle.',
      'Each call shows recordings, transcripts, and the fraud score so you know exactly what happened before sharing or blocking.',
    ],
  },
  {
    id: 'circles',
    title: 'Circle members & roles',
    body:
      'Invite caretakers, trusted contacts, or guests from the Members screen. Assign roles so caretakers manage automation, trusted contacts verify alerts, and guests just watch what you share.',
    bullets: [
      'Caretakers can change automation, invite people, and open tickets.',
      'Trusted contacts see alerts and prove safety with a safe phrase. To load contacts from your phone, enable contact picker access inside Settings → Data & Privacy before you add trusteds.',
      'Guests only get read-only history and cannot edit anything.',
      'Only caretakers can take actions or change settings—family members and guests are view-only so they can stay in sync without accidentally changing automation.',
    ],
  },
  {
    id: 'automation-rules',
    title: 'Automation rules and scam detection',
    body:
      'Automation keeps an eye on keywords, call timing, and other signals so suspicious callers get flagged fast without you having to watch every call.',
    bullets: [
      'When automation spots scam keywords it raises an alert and prepares a ticket for you.',
      'You can pause a rule briefly if you expect a known number to ring so it does not trigger an alert.',
      'Alerts show recordings, transcripts, and risk scores so you never have to guess why something was flagged.',
    ],
  },
  {
    id: 'safe-phrases',
    title: 'Safe phrases and trusted contacts',
    body:
      'Safe phrases let automation know a call is okay, and trusted circle members can come through without entering the Family PIN.',
    bullets: [
      'Add safe phrases so automation can pass a caller automatically when it hears a match.',
      'Trusted contacts bypass the Family PIN and reach you right away when they call.',
      'Enable contact picker access inside Settings → Data & Privacy before adding trusted people from your phone.',
    ],
  },
  {
    id: 'blocked-callers',
    title: 'Blocked numbers and screened callers',
    body:
      'Blocked numbers never get connected, and unknown callers are sent to voicemail so you or automation can review them safely.',
    bullets: [
      'Add a scam number to the blocked list and it can no longer reach your loved one.',
      'Unknown numbers are screened, asked for a PIN, and drop into voicemail when the PIN is not entered.',
      'Automation can replay that voicemail, score it, and share it so you decide how to respond.',
    ],
  },
  {
    id: 'pin-security',
    title: 'PINs, passcodes, and security support',
    body:
      'The app lock is a PIN that you choose; change it anytime from Settings → Security. It keeps the timeline, automation, and circle controls private.',
    bullets: [
      'Enter the PIN when opening the app or changing privacy settings.',
      'Reset it inside the app under Settings → Security, or ask support through a ticket or email if you forget the current PIN.',
      'Enable biometric unlock if your device allows it so you can skip typing the PIN.',
    ],
  },
  {
    id: 'notifications',
    title: 'Notifications & alerts',
    body:
      'Alerts pop up when automation fires, a ticket is replied to, or a suspicious call happens. Tweak alerts from Settings → Notifications so you hear only what matters to you.',
    bullets: [
      'Turn on push, email, or SMS alerts for each type of event.',
      'Mute an alert directly from the call or ticket card if it is not helpful.',
    ],
  },
  {
    id: 'support-tickets',
    title: 'Support tickets & feedback',
    body:
      'Open a ticket whenever something feels off. We keep the conversation in the portal so you can scroll back through replies, file attachments, and automation notes. Each prompt now sends an auto-reply telling you an agent will join shortly.',
    bullets: [
      'Use quick-prompt chips to get straight to billing, automation, members, recordings, safe phrases, or number setup questions.',
      'View the timeline to see past replies before writing a new message, and end the session when everything is resolved.',
      'When you end a ticket we ask for feedback so the team can learn what went well or needs improvement.',
    ],
  },
  {
    id: 'export-delete',
    title: 'Exporting and deleting accounts',
    body:
      'You control your data. Export your timeline or delete your account with a few taps inside Settings.',
    bullets: [
      'Export call logs, tickets, and automation history from Settings → Privacy.',
      'Delete a profile from Settings → Account; we keep it for 30 days in case you change your mind.',
      'Need help? Ask through the portal so we can verify you before processing exports or deletions.',
    ],
  },
];

export const PRIVACY_CONTENT: ResourceSection[] = [
  {
    id: 'privacy-vision',
    title: 'We keep your circle secure',
    body:
      'Verity Protect was built for families and caretakers. We only store what is required to protect you, encrypt it, and give you tools to control every call and message that passes through the service.',
  },
  {
    id: 'privacy-data',
    title: 'What we collect',
    body:
      'We collect only the minimum: profile metadata, call metadata, and recordings/transcripts that you explicitly turn on.',
    bullets: [
      'Profile metadata (name, email, trusted circle).',
      'Call metadata (caller, time, fraud score, duration).',
      'Recordings, transcripts, and automation flags once you enable recording.',
      'Device info for tuning push and audio delivery.',
    ],
  },
  {
    id: 'privacy-use',
    title: 'How we use it',
    body:
      'We only use the data inside the app; nothing is sold or shared outside your circle without your approval.',
    bullets: [
      'Stop fraud: we analyze calls for scams and elevate alerts as needed.',
      'Support: ticket chat uses metadata to keep replies in context.',
      'Share with your circle depending on their role and permissions.',
    ],
  },
  {
    id: 'privacy-retention',
    title: 'Data retention',
    body:
      'Call logs, recordings, and alerts are deleted after 90 days unless you export them. Exported copies live only on your devices.',
  },
  {
    id: 'privacy-rights',
    title: 'Account controls',
    body:
      'Control exports, deletions, and privacy questions through Settings or support; everything is yours to manage.',
    bullets: [
      'Export your entire timeline from Settings → Privacy and keep a copy.',
      'Delete your profile from Settings → Account; we hold it for 30 days to recover if needed.',
      'Contact support for privacy questions, data portability requests, or legal notices.',
    ],
  },
  {
    id: 'privacy-compliance',
    title: 'Legal safeguards & compliance',
    body:
      'We follow strong safeguards: encryption in transit and at rest, strict row-level access control on Supabase, and clearly scoped contracts with partners. That means only you and trusted circle members see your calls unless you explicitly share them.',
    bullets: [
      'Encryption keeps recordings and tickets unreadable except for your circle and our service team.',
      'We enforce data minimization: only the metadata needed to deliver alerts, tickets, and automation is stored.',
      'Legal requests? We respond according to the law but always notify you when possible and require verification before releasing data.',
    ],
  },
  {
    id: 'privacy-partners',
    title: 'Third-party partners',
    body:
      'We work with trusted service providers; they only process data under strict agreements, and we audit their access regularly.',
    bullets: [
      'Twilio powers call routing, recording, and transcription.',
      'Supabase handles authentication, database, and row-level security.',
      'Resend delivers verification and alert emails, never marketing messages.',
    ],
  },
];

export const FAQ_CONTENT: ResourceSection[] = [
  {
    id: 'faq-response-time',
    title: 'When will I hear back?',
    body:
      'Support replies usually arrive within minutes, but during busy times it can take longer. We surface unread counts and send push notifications to keep you informed while you wait.',
  },
  {
    id: 'faq-automation',
    title: 'Why did automation flag this call?',
    body:
      'Automation watches keywords, caller reputation, and call timing. If it sees a match, it flags the call, alerts your circle, and keeps a ticket ready for you to explain what happened.',
    bullets: [
      'You can silence a rule temporarily if you expect a known number to call.',
      'Safe phrases let the system know a call is okay without yanking the line.',
      'Use the blocked caller list to stop known scams from appearing again.',
    ],
  },
  {
    id: 'faq-tickets',
    title: 'How does the ticket timeline work?',
    body:
      'Every message stays in the portal. You can scroll back through replies, transcripts, and status updates, so nothing is lost between sessions.',
    bullets: [
      'Hit “End session” when solved so we can ask how it went and archive the ticket.',
      'Quick prompts save typing on common topics like billing or scams.',
      'Long-press tickets on the portal to reopen or end them without typing.',
    ],
  },
  {
    id: 'faq-account',
    title: 'Can I export or delete my data?',
    body:
      'Yes. Export your timeline from Settings → Privacy, and delete your profile from Settings → Account. We keep deleted profiles for 30 days in case you change your mind.',
  },
  {
    id: 'faq-app-store',
    title: 'How do I manage charges?',
    body:
      'All payments occur through the App Store or Google Play. Open the store’s subscription settings to view receipts, cancel, or request refunds. Support can pin down which charges to reference before you reach out to the store.',
    bullets: [
      'The App Store billing portal shows the exact amounts you paid and any active subscriptions.',
      'Tap “Report a Problem” inside the store if you need a refund; mention the support ticket ID so we can link the conversation.',
      'Keep the ticket open and share the receipt you received from Apple/Google; we can help agents check the right profile.',
    ],
  },
  {
    id: 'faq-posthog-analytics',
    title: 'What analytics and error monitoring tools do you use?',
    body:
      'We use PostHog for product analytics, feature usage trends, and error monitoring so we can improve stability and understand what support flows need work.',
    bullets: [
      'PostHog helps us detect regressions faster when releases cause new issues.',
      'Usage trends guide product improvements in onboarding, billing, and support flows.',
      'We do not sell your data to advertisers.',
    ],
  },
];

export const BILLING_CONTENT: ResourceSection[] = [
  {
    id: 'billing-overview',
    title: 'App Store or Play Store billing',
    body:
      'Verity Protect charges are processed through the platform store tied to your Apple or Google account. We do not store your payment info, and the store handles subscriptions, receipts, and refunds.',
    bullets: [
      'Open the App Store or Play Store app, tap your profile, and go to Subscriptions to see active charges.',
      'Receipts are emailed from the store; save them for your records or share them with support.',
      'Need a refund? Use the store’s “Report a Problem” feature and mention the Verity Protect ticket so we can support the request.',
    ],
  },
  {
    id: 'billing-support',
    title: 'How support helps',
    body:
      'We can highlight the account, verify your identity, and summarize what happened to help the store respond faster while keeping you informed.',
    bullets: [
      'Start a ticket from the Support screen and mention which App Store account the purchase used.',
      'If you canceled a subscription, support can confirm it was marked resolved on our side once the store refunds.',
      'Question about shared profiles? Support can explain how the charge maps to the profile you care for.',
    ],
  },
];

export const APP_STORE_CONTENT: ResourceSection[] = [
  {
    id: 'apple-ios-age-suitability',
    title: 'Apple iOS age suitability (12+)',
    body:
      'Verity Protect is designed for users age 12 and up on iOS. The product focuses on scam-call protection, family visibility, and account safety controls rather than social networking or open user-generated content.',
    bullets: [
      'Recommended age: 12+. Younger users should use the app only with a parent, guardian, or caretaker.',
      'Core experience: call screening, trusted contacts, alerts, and support workflows.',
      'No gambling, adult content, or open social posting inside the app.',
      'Calls from unknown numbers may include unpredictable language before they are screened, which is why family oversight and safety settings are built in.',
    ],
  },
  {
    id: 'accessibility',
    title: 'Accessibility approach',
    body:
      'Verity Protect follows an adult-first, caregiver-friendly accessibility approach built for clarity during high-stress call moments. The interface supports both dark and light appearance modes, with deliberate attention to readable typography, predictable interaction patterns, and sufficient color contrast across key workflows.',
    bullets: [
      'The UI direction is led by designer Lex Ferguson, a design major at Monmouth University in West Long Branch, with a strong focus on practical, accessible product design.',
      'Current accessibility priorities include clear hierarchy, consistent interaction models, and contrast-conscious styling for everyday readability.',
      'Accessibility support is actively expanding, with additional Apple platform accessibility capabilities planned in upcoming releases.',
    ],
    references: [
      {
        prefix: 'Designer portfolio',
        label: 'Lex Ferguson',
        url: 'https://www.aferguson.art/',
      },
    ],
  },
];
