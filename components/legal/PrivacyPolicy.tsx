import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export const PrivacyPolicy: React.FC = () => {
   const navigate = useNavigate();
   const onBack = () => {
      navigate('/');
      window.scrollTo(0, 0);
   };

  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="mb-12">
        <Button variant="ghost" size="sm" onClick={onBack} className="pl-0 hover:bg-transparent text-brand-blue mb-8">
            <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Button>
        <div className="border-b border-light-border dark:border-dark-border pb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-6">
            Privacy Policy
          </h1>
          <div className="space-y-2 mb-6 text-sm text-light-muted dark:text-dark-muted">
            <p><strong>Effective Date:</strong> February 20, 2026</p>
            <p><strong>Last Updated:</strong> April 4, 2026</p>
          </div>
          <div className="text-light-text dark:text-dark-text leading-relaxed space-y-3">
            <p>
              Verity Protect ("we," "our," or "us") operates the Verity Protect mobile application and website at verityprotect.com (collectively, the "Service"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service.
            </p>
            <p>
              By using our Service, you consent to the data practices described in this policy. If you do not agree with this policy, please do not access or use our Service.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-16 text-light-text dark:text-dark-text">
        
        {/* Section 1 */}
        <section>
          <h2 className="text-3xl font-bold mb-8">1. Information We Collect</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">1.1 Information You Provide Directly</h3>
              
              <div className="mb-6">
                <h4 className="font-semibold text-light-text dark:text-dark-text mb-3">Account Information:</h4>
                <ul className="list-disc list-inside space-y-2 text-light-muted dark:text-dark-muted ml-2">
                  <li>Name and contact information</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Password (encrypted)</li>
                  <li>Passcode/PIN (encrypted)</li>
                  <li>Profile relationships (e.g., "caretaker," "family member")</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-light-text dark:text-dark-text mb-3">User Content:</h4>
                <ul className="list-disc list-inside space-y-2 text-light-muted dark:text-dark-muted ml-2">
                  <li>Trusted contact lists</li>
                  <li>Safe phrases for identity verification</li>
                  <li>Circle member information</li>
                  <li>Feedback on fraud alerts</li>
                  <li>Communications with our support team</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-light-border dark:border-dark-border pt-8">
              <h3 className="text-xl font-semibold mb-4">1.2 Call Data We Collect</h3>
              
              <div className="mb-6">
                <h4 className="font-semibold text-light-text dark:text-dark-text mb-3">Call Metadata:</h4>
                <ul className="list-disc list-inside space-y-2 text-light-muted dark:text-dark-muted ml-2">
                  <li>Caller phone numbers (inbound and outbound)</li>
                  <li>Call timestamps, duration, and status</li>
                  <li>Call routing decisions and outcomes</li>
                  <li>Fraud detection scores and risk assessments</li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-light-text dark:text-dark-text mb-3">Call Recordings and Transcripts:</h4>
                <ul className="list-disc list-inside space-y-2 text-light-muted dark:text-dark-muted ml-2">
                  <li>Audio recordings of calls processed through our Service</li>
                  <li>Speech-to-text transcriptions of call content</li>
                  <li>Fraud analysis signals (keywords, patterns, behavioral indicators)</li>
                </ul>
              </div>

              <div className="bg-light-card dark:bg-dark-card/30 border border-light-border dark:border-dark-border p-4 rounded-lg text-sm">
                <p><strong>Important:</strong> We only collect call data for calls routed through your Verity Protect phone number. We do not monitor or record calls made directly from your personal device outside our Service.</p>
              </div>
            </div>

            <div className="border-t border-light-border dark:border-dark-border pt-8">
              <h3 className="text-xl font-semibold mb-4">1.3 Information Collected Automatically</h3>
              
              <div className="mb-6">
                <h4 className="font-semibold text-light-text dark:text-dark-text mb-3">Device and Usage Data:</h4>
                <ul className="list-disc list-inside space-y-2 text-light-muted dark:text-dark-muted ml-2">
                  <li>Device type, operating system, and version</li>
                  <li>IP address and approximate location (city/state level)</li>
                  <li>App version and diagnostic data</li>
                  <li>Usage patterns (screens viewed, features used, session duration)</li>
                  <li>Performance metrics and crash reports</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-light-text dark:text-dark-text mb-3">Cookies and Tracking Technologies:</h4>
                <p className="text-light-muted dark:text-dark-muted">Our website uses cookies and similar technologies for authentication, preferences, and analytics. You can control cookie preferences through your browser settings.</p>
              </div>
            </div>

            <div className="border-t border-light-border dark:border-dark-border pt-8">
              <h3 className="text-xl font-semibold mb-4">1.4 Device Permissions (iOS App)</h3>
              
              <p className="text-light-muted dark:text-dark-muted mb-6">The Verity Protect app requests the following device permissions:</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-light-text dark:text-dark-text mb-3">Required Permissions:</h4>
                <ul className="list-disc list-inside space-y-3 text-light-muted dark:text-dark-muted ml-2">
                  <li><strong className="text-light-text dark:text-dark-text">Microphone:</strong> Used to transmit audio during live call screening through Verity's VoIP bridge. Only active during bridged calls. We do not record your microphone input.</li>
                  <li><strong className="text-light-text dark:text-dark-text">Notifications:</strong> Used to deliver real-time fraud alerts, suspicious call warnings, and circle activity updates. App works without notifications, but real-time delivery requires this permission.</li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-light-text dark:text-dark-text mb-3">Optional Permissions:</h4>
                <ul className="list-disc list-inside space-y-3 text-light-muted dark:text-dark-muted ml-2">
                  <li><strong className="text-light-text dark:text-dark-text">Contacts:</strong> Used to populate your trusted contact list and display caller names. You grant access to specific contacts you add to your account. We do not access your entire contact list without permission. You can revoke access anytime through Settings → Data & Privacy.</li>
                  <li><strong className="text-light-text dark:text-dark-text">Phone:</strong> Used during onboarding to pre-fill your phone number and display your Verity Number. Does not grant access to call history or cellular data.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-light-text dark:text-dark-text mb-3">New in 1.1.0:</h4>
                <ul className="list-disc list-inside space-y-2 text-light-muted dark:text-dark-muted ml-2">
                  <li><strong className="text-light-text dark:text-dark-text">Photos/Camera/Library:</strong> Used to upload profile pictures for your account and circle members. Photos are stored locally and shared only with authorized circle members. You can revoke access or delete pictures anytime through Settings.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="border-t border-light-border dark:border-dark-border pt-16">
          <h2 className="text-3xl font-bold mb-8">2. How We Use Your Information</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">2.1 Provide and Improve Service</h3>
              <ul className="list-disc list-inside space-y-2 text-light-muted dark:text-dark-muted ml-2">
                <li>Process and route incoming calls to detect potential fraud</li>
                <li>Generate real-time fraud analysis and risk scores</li>
                <li>Provide call playback, transcripts, and activity history</li>
                <li>Send fraud alerts via push notifications, email, or SMS</li>
                <li>Display caller information using your contact list</li>
                <li>Enable family circle features for collaborative call monitoring</li>
              </ul>
            </div>

            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">We Will Never:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-red-900 dark:text-red-100">
                <li>Send marketing emails without explicit consent</li>
                <li>Sell your call recordings or transcripts to third parties</li>
                <li>Use your data for advertising targeting</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">2.2 Fraud Detection and Research</h3>
              <p className="text-light-muted dark:text-dark-muted mb-4">
                We analyze call patterns to improve fraud detection models, use aggregated and anonymized data to tune detection accuracy, research emerging scam tactics, and generate security insights.
              </p>
              <p className="text-light-muted dark:text-dark-muted"><strong className="text-light-text dark:text-dark-text">Data Anonymization:</strong> Research and analytics use aggregated, de-identified data that cannot be traced back to individual users.</p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="border-t border-light-border dark:border-dark-border pt-16">
          <h2 className="text-3xl font-bold mb-8">3. How We Share Your Information</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">3.1 Within Your Circle</h3>
              <p className="text-light-muted dark:text-dark-muted">
                Caretakers and invited family members can view call logs, recordings, and fraud alerts for the protected profile they're authorized to access. Access is controlled through row-level security and profile permissions.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">3.2 Service Providers</h3>
              <p className="text-light-muted dark:text-dark-muted mb-4">
                We share information with trusted third-party service providers who assist in operating our Service:
              </p>
              
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-light-card dark:bg-dark-card/30 border border-light-border dark:border-dark-border p-4 rounded-lg">
                  <h4 className="font-semibold text-light-text dark:text-dark-text text-sm mb-1">Twilio</h4>
                  <p className="text-xs text-light-muted dark:text-dark-muted">Powers call routing, recording, and transcription</p>
                </div>
                <div className="bg-light-card dark:bg-dark-card/30 border border-light-border dark:border-dark-border p-4 rounded-lg">
                  <h4 className="font-semibold text-light-text dark:text-dark-text text-sm mb-1">Supabase</h4>
                  <p className="text-xs text-light-muted dark:text-dark-muted">Database, authentication, and access control</p>
                </div>
                <div className="bg-light-card dark:bg-dark-card/30 border border-light-border dark:border-dark-border p-4 rounded-lg">
                  <h4 className="font-semibold text-light-text dark:text-dark-text text-sm mb-1">Resend</h4>
                  <p className="text-xs text-light-muted dark:text-dark-muted">Transactional email delivery</p>
                </div>
                <div className="bg-light-card dark:bg-dark-card/30 border border-light-border dark:border-dark-border p-4 rounded-lg">
                  <h4 className="font-semibold text-light-text dark:text-dark-text text-sm mb-1">Sentry</h4>
                  <p className="text-xs text-light-muted dark:text-dark-muted">Error monitoring and crash reports</p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/30 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">We Never:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-emerald-900 dark:text-emerald-100">
                <li>Sell your personal information to data brokers or advertisers</li>
                <li>Share call recordings or transcripts for marketing purposes</li>
                <li>Provide your data to unaffiliated third parties without consent</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="border-t border-light-border dark:border-dark-border pt-16">
          <h2 className="text-3xl font-bold mb-8">4. Data Storage and Security</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">4.1 Security Measures</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-light-card dark:bg-dark-card/30 border border-light-border dark:border-dark-border p-4 rounded-lg">
                  <h4 className="font-semibold text-light-text dark:text-dark-text text-sm mb-1">Encryption</h4>
                  <p className="text-xs text-light-muted dark:text-dark-muted">TLS 1.3 in transit, AES-256 at rest</p>
                </div>
                <div className="bg-light-card dark:bg-dark-card/30 border border-light-border dark:border-dark-border p-4 rounded-lg">
                  <h4 className="font-semibold text-light-text dark:text-dark-text text-sm mb-1">Access Control</h4>
                  <p className="text-xs text-light-muted dark:text-dark-muted">Row-level security, multi-factor authentication</p>
                </div>
                <div className="bg-light-card dark:bg-dark-card/30 border border-light-border dark:border-dark-border p-4 rounded-lg">
                  <h4 className="font-semibold text-light-text dark:text-dark-text text-sm mb-1">Monitoring</h4>
                  <p className="text-xs text-light-muted dark:text-dark-muted">Continuous security monitoring and audits</p>
                </div>
                <div className="bg-light-card dark:bg-dark-card/30 border border-light-border dark:border-dark-border p-4 rounded-lg">
                  <h4 className="font-semibold text-light-text dark:text-dark-text text-sm mb-1">Storage</h4>
                  <p className="text-xs text-light-muted dark:text-dark-muted">Secure US-based cloud infrastructure</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">4.2 Data Retention</h3>
              <ul className="list-disc list-inside space-y-2 text-light-muted dark:text-dark-muted ml-2">
                <li><strong className="text-light-text dark:text-dark-text">Active Profiles:</strong> Call logs and recordings retained indefinitely while your profile is active</li>
                <li><strong className="text-light-text dark:text-dark-text">Inactive Profiles:</strong> Accounts inactive for 2+ years may be archived or deleted (with notification)</li>
                <li><strong className="text-light-text dark:text-dark-text">Deleted Profiles:</strong> Profile data deleted within 30 days, backups purged within 90 days</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="border-t border-light-border dark:border-dark-border pt-16">
          <h2 className="text-3xl font-bold mb-8">5. Your Rights and Choices</h2>
          
          <div className="space-y-4">
            <div className="bg-light-card dark:bg-dark-card/30 border border-light-border dark:border-dark-border p-4 rounded-lg">
              <h3 className="font-semibold text-light-text dark:text-dark-text mb-2">Access and Export Your Data</h3>
              <p className="text-sm text-light-muted dark:text-dark-muted mb-2">
                Download a complete copy of your data in JSON format through <strong>Settings → Data & Privacy → Export your data</strong>
              </p>
              <p className="text-sm text-light-muted dark:text-dark-muted">
                Includes account info, call metadata, transcripts, and fraud alerts.
              </p>
            </div>

            <div className="bg-light-card dark:bg-dark-card/30 border border-light-border dark:border-dark-border p-4 rounded-lg">
              <h3 className="font-semibold text-light-text dark:text-dark-text mb-2">Delete Your Data</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-light-muted dark:text-dark-muted mb-2">
                <li>Delete individual call records through the app</li>
                <li>Clear all call history: Settings → Data & Privacy → Clear records</li>
                <li>Delete entire account: Settings → Data & Privacy → Delete account</li>
              </ul>
              <p className="text-sm text-light-text dark:text-dark-text">
                <strong>Account deletion requires passcode verification and is irreversible.</strong>
              </p>
            </div>

            <div className="bg-light-card dark:bg-dark-card/30 border border-light-border dark:border-dark-border p-4 rounded-lg">
              <h3 className="font-semibold text-light-text dark:text-dark-text mb-2">Communication Preferences</h3>
              <p className="text-sm text-light-muted dark:text-dark-muted">
                Configure alert frequency in app settings. Unsubscribe links are in all alert emails. Account and security emails cannot be disabled.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section className="border-t border-light-border dark:border-dark-border pt-16">
          <h2 className="text-3xl font-bold mb-8">6. California & European Privacy Rights</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">California (CCPA)</h3>
              <p className="text-light-muted dark:text-dark-muted mb-4">
                California residents have additional rights under the California Consumer Privacy Act:
              </p>
              <ul className="list-disc list-inside space-y-2 text-light-muted dark:text-dark-muted ml-2">
                <li><strong className="text-light-text dark:text-dark-text">Right to Know:</strong> Request disclosure of personal information collected, used, and shared</li>
                <li><strong className="text-light-text dark:text-dark-text">Right to Delete:</strong> Request deletion of personal information</li>
                <li><strong className="text-light-text dark:text-dark-text">Right to Opt-Out:</strong> We do not sell personal information</li>
                <li><strong className="text-light-text dark:text-dark-text">Right to Non-Discrimination:</strong> We will not discriminate for exercising rights</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Europe (GDPR)</h3>
              <p className="text-light-muted dark:text-dark-muted mb-4">
                EEA, UK, and Swiss residents have additional rights under GDPR:
              </p>
              <ul className="list-disc list-inside space-y-2 text-light-muted dark:text-dark-muted ml-2">
                <li>Right to access, rectification, erasure, restriction, portability, and objection</li>
                <li>Right to withdraw consent</li>
                <li>Right to lodge a complaint with your local data protection authority</li>
              </ul>
            </div>

            <div className="bg-light-card dark:bg-dark-card/30 border border-light-border dark:border-dark-border p-4 rounded-lg">
              <p className="text-sm text-light-text dark:text-dark-text">
                <strong>To exercise these rights:</strong> Email <a href="mailto:support@verityprotect.com" className="text-brand-blue hover:underline">support@verityprotect.com</a> with your registered email address and request description. We respond within 30-45 days.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7 */}
        <section className="border-t border-light-border dark:border-dark-border pt-16">
          <h2 className="text-3xl font-bold mb-8">7. Additional Important Information</h2>
          
          <div className="space-y-4">
            <div className="bg-light-card dark:bg-dark-card/30 border border-light-border dark:border-dark-border p-4 rounded-lg">
              <h3 className="font-semibold text-light-text dark:text-dark-text mb-2">Children's Privacy</h3>
              <p className="text-sm text-light-muted dark:text-dark-muted">
                Our Service is not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, contact us immediately at support@verityprotect.com.
              </p>
            </div>

            <div className="bg-light-card dark:bg-dark-card/30 border border-light-border dark:border-dark-border p-4 rounded-lg">
              <h3 className="font-semibold text-light-text dark:text-dark-text mb-2">International Data Transfers</h3>
              <p className="text-sm text-light-muted dark:text-dark-muted">
                Our Service is operated in the United States. If you access from outside the US, your information will be transferred to, stored, and processed in the United States. By using our Service, you consent to this transfer.
              </p>
            </div>

            <div className="bg-light-card dark:bg-dark-card/30 border border-light-border dark:border-dark-border p-4 rounded-lg">
              <h3 className="font-semibold text-light-text dark:text-dark-text mb-2">Changes to This Policy</h3>
              <p className="text-sm text-light-muted dark:text-dark-muted">
                We may update this Privacy Policy from time to time. Material changes will be communicated via email. Continued use after changes constitutes acceptance.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="border-t border-light-border dark:border-dark-border pt-16">
          <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
          <div className="bg-light-card dark:bg-dark-card/30 border border-light-border dark:border-dark-border p-4 rounded-lg">
            <p className="text-sm text-light-text dark:text-dark-text mb-3">
              For questions, concerns, or requests regarding this Privacy Policy:
            </p>
            <div className="space-y-2 text-sm">
              <p><strong className="text-light-text dark:text-dark-text">Email:</strong> <a href="mailto:support@verityprotect.com" className="text-brand-blue hover:underline">support@verityprotect.com</a></p>
              <p><strong className="text-light-text dark:text-dark-text">Response Time:</strong> <span className="text-light-muted dark:text-dark-muted">Within 5 business days for general inquiries, 30 days for formal requests</span></p>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="border-t border-light-border dark:border-dark-border pt-16">
          <h2 className="text-3xl font-bold mb-8">Summary of Key Points</h2>
          <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/30 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3 text-sm">
              <span className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5">✓</span>
              <span className="text-emerald-900 dark:text-emerald-100">We collect call metadata, recordings, and account information to provide fraud protection</span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <span className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5">✓</span>
              <span className="text-emerald-900 dark:text-emerald-100">Family circle members can view calls for profiles they're authorized to access</span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <span className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5">✓</span>
              <span className="text-emerald-900 dark:text-emerald-100">We use trusted service providers (Twilio, Supabase, Resend) to operate our Service</span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <span className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5">✓</span>
              <span className="text-emerald-900 dark:text-emerald-100">We never sell your data or use it for advertising</span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <span className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5">✓</span>
              <span className="text-emerald-900 dark:text-emerald-100">You can export, correct, or delete your data anytime</span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <span className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5">✓</span>
              <span className="text-emerald-900 dark:text-emerald-100">Data is encrypted and stored securely in the United States</span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <span className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5">✓</span>
              <span className="text-emerald-900 dark:text-emerald-100">You have rights under CCPA (California) and GDPR (Europe)</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
