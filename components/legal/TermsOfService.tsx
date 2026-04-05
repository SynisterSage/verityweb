import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export const TermsOfService: React.FC = () => {
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
            Terms of Service
          </h1>
          <div className="space-y-2 mb-6 text-sm text-light-muted dark:text-dark-muted">
            <p><strong>Effective Date:</strong> February 20, 2026</p>
            <p><strong>Last Updated:</strong> February 20, 2026</p>
          </div>
          <div className="text-light-text dark:text-dark-text leading-relaxed space-y-3">
            <p>
              These Terms of Service ("Terms") govern your access to and use of the Verity Protect mobile application, website, and services (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.
            </p>
            <p>
              Please read these Terms carefully. They contain important information about your legal rights, including mandatory arbitration and class action waiver provisions in Section 15.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-16 text-light-text dark:text-dark-text">

        {/* CRITICAL DISCLAIMER */}
        <div className="bg-red-50 dark:bg-red-900/10 border-2 border-red-400 dark:border-red-600 rounded-lg p-4">
          <h2 className="text-xl font-bold text-red-900 dark:text-red-100 mb-3">
            CRITICAL: NOT AN EMERGENCY SERVICE
          </h2>
          <div className="text-sm text-red-900 dark:text-red-100 space-y-2">
            <p className="font-semibold">
              VERITY PROTECT IS A CALL SCREENING SERVICE, NOT AN EMERGENCY RESPONSE SYSTEM.
            </p>
            <p>
              <strong>DO NOT RELY ON THE SERVICE FOR EMERGENCIES.</strong> In any emergency situation, dial 911 directly from your phone. Verity Protect cannot detect, route, or prioritize emergency calls. The Service may delay or block calls, including emergency communications.
            </p>
            <p>
              By using the Service, you acknowledge and accept that Verity Protect is not responsible for any failure to receive emergency communications or any consequences resulting from such failures.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <section>
          <h2 className="text-3xl font-bold mb-8">1. Service Description</h2>
          
          <div className="space-y-4">
            <p className="text-light-muted dark:text-dark-muted">
              Verity Protect provides an automated call screening service designed to identify and filter potential fraud, spam, and unwanted calls. The Service includes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-light-muted dark:text-dark-muted ml-2">
              <li>Call forwarding and screening for unknown callers</li>
              <li>Automated fraud detection and risk assessment</li>
              <li>Call recording and transcription for screened calls</li>
              <li>Trusted contact management and allowlists</li>
              <li>Family circle features for collaborative monitoring</li>
              <li>Fraud alerts and call activity history</li>
            </ul>
            
            <div className="bg-light-card dark:bg-dark-card/30 border border-light-border dark:border-dark-border p-4 rounded-lg mt-4">
              <p className="text-sm">
                <strong>Important Limitations:</strong> The Service is not foolproof. It may fail to detect some fraudulent calls (false negatives) or incorrectly flag legitimate calls (false positives). You remain responsible for your own judgment in handling phone communications.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="border-t border-light-border dark:border-dark-border pt-16">
          <h2 className="text-3xl font-bold mb-8">2. Eligibility and Account Registration</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">2.1 Age Requirement</h3>
              <p className="text-light-muted dark:text-dark-muted">
                You must be at least 18 years old to create an account. If you are under 18, a parent or guardian must create and manage the account on your behalf.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">2.2 Account Information</h3>
              <p className="text-light-muted dark:text-dark-muted mb-3">
                You agree to provide accurate, current, and complete information during registration and to update it as necessary. You are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-light-muted dark:text-dark-muted ml-2">
                <li>Maintaining the confidentiality of your password and account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized access or security breach</li>
                <li>Ensuring your forwarding phone number is accurate and functional</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">2.3 One Account Per User</h3>
              <p className="text-light-muted dark:text-dark-muted">
                You may only create one account per phone number. Creating multiple accounts or sharing accounts is prohibited.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="border-t border-light-border dark:border-dark-border pt-16">
          <h2 className="text-3xl font-bold mb-8">3. Call Screening and Recording Consent</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">3.1 How Call Screening Works</h3>
              <p className="text-light-muted dark:text-dark-muted mb-3">
                By using the Service, you authorize Verity Protect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-light-muted dark:text-dark-muted ml-2">
                <li>Forward incoming calls to your Verity Protect phone number</li>
                <li>Answer and screen calls from unknown numbers using automated systems</li>
                <li>Record and transcribe screened calls for fraud analysis</li>
                <li>Store call metadata, recordings, and transcripts as described in our Privacy Policy</li>
                <li>Use automated fraud-detection models to analyze call content and detect fraud</li>
              </ul>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4">
              <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Recording Consent Responsibility</h4>
              <p className="text-sm text-amber-900 dark:text-amber-100">
                You are responsible for ensuring that your use of the Service complies with all applicable federal, state, and local laws regarding call recording and wiretapping. Some jurisdictions require two-party consent for call recording. By using the Service, you represent that you have obtained all necessary consents and comply with all applicable laws.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">3.2 Trusted Contacts</h3>
              <p className="text-light-muted dark:text-dark-muted">
                Calls from numbers on your Trusted Contact list bypass screening entirely and are not recorded or analyzed. You are responsible for maintaining an accurate trusted contact list.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="border-t border-light-border dark:border-dark-border pt-16">
          <h2 className="text-3xl font-bold mb-8">4. Acceptable Use Policy</h2>
          
          <p className="text-light-muted dark:text-dark-muted mb-4">You agree not to:</p>
          <ul className="list-disc list-inside space-y-2 text-light-muted dark:text-dark-muted ml-2">
            <li>Use the Service for any illegal purpose or in violation of any laws</li>
            <li>Interfere with or disrupt the Service or servers/networks connected to the Service</li>
            <li>Attempt to gain unauthorized access to any portion of the Service</li>
            <li>Use the Service to harass, abuse, or harm another person</li>
            <li>Impersonate any person or entity or falsely state your affiliation</li>
            <li>Use automated systems (bots, scrapers) to access the Service</li>
            <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
            <li>Remove or modify any proprietary notices or labels</li>
            <li>Use the Service to transmit viruses, malware, or harmful code</li>
            <li>Collect or harvest information about users without consent</li>
          </ul>
        </section>

        {/* Sections 5-16 combined in simplified layout */}
        <section className="border-t border-light-border dark:border-dark-border pt-16">
          <h2 className="text-3xl font-bold mb-8">5. Intellectual Property</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">5.1 Our Property</h3>
              <p className="text-light-muted dark:text-dark-muted">
                The Service and all content, features, and functionality (including but not limited to software, code, designs, text, graphics, logos, and trademarks) are owned by Verity Protect or its licensors and are protected by copyright, trademark, patent, and other intellectual property laws.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">5.2 License Grant</h3>
              <p className="text-light-muted dark:text-dark-muted">
                We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Service for personal, non-commercial purposes, subject to these Terms.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">5.3 Your Content</h3>
              <p className="text-light-muted dark:text-dark-muted">
                You retain ownership of your call recordings, transcripts, and other content you provide. By using the Service, you grant us a license to use, store, and process this content to provide and improve the Service, as described in our Privacy Policy.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-light-border dark:border-dark-border pt-16">
          <h2 className="text-3xl font-bold mb-8">6. Fees and Payment</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">6.1 Subscription Fees</h3>
              <p className="text-light-muted dark:text-dark-muted">
                Access to the Service requires a paid subscription. Current pricing is available on our website and in the app. You agree to pay all fees associated with your subscription.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">6.2 Billing and Renewals</h3>
              <p className="text-light-muted dark:text-dark-muted">
                Subscriptions automatically renew at the end of each billing period unless canceled. You authorize us to charge your payment method on file for renewal fees. We may change our fees with 30 days' notice.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">6.3 Refunds</h3>
              <p className="text-light-muted dark:text-dark-muted">
                Fees are generally non-refundable except as required by law or as otherwise stated in our refund policy. We reserve the right to issue refunds at our sole discretion.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-light-border dark:border-dark-border pt-16">
          <h2 className="text-3xl font-bold mb-8">7. Service Availability and Modifications</h2>
          
          <p className="text-light-muted dark:text-dark-muted">
            We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time with or without notice. We may also impose limits on certain features or restrict access to parts of the Service.
          </p>
          <p className="text-light-muted dark:text-dark-muted mt-4">
            We are not liable for any modification, suspension, or discontinuation of the Service. The Service may experience downtime, delays, or errors, and we do not guarantee uninterrupted or error-free operation.
          </p>
        </section>

        <section className="border-t border-light-border dark:border-dark-border pt-16">
          <h2 className="text-3xl font-bold mb-8">8. Termination</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">8.1 Termination by You</h3>
              <p className="text-light-muted dark:text-dark-muted">
                You may terminate your account at any time through the app settings. Upon termination, your subscription will continue until the end of the current billing period, and you will not receive a refund for any unused portion.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">8.2 Termination by Us</h3>
              <p className="text-light-muted dark:text-dark-muted mb-3">
                We may suspend or terminate your access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms. Reasons for termination may include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-light-muted dark:text-dark-muted ml-2">
                <li>Violation of these Terms or our Acceptable Use Policy</li>
                <li>Fraudulent or illegal activity</li>
                <li>Non-payment of fees</li>
                <li>Abusive behavior toward other users or our staff</li>
                <li>Extended inactivity (2+ years)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">8.3 Effect of Termination</h3>
              <p className="text-light-muted dark:text-dark-muted">
                Upon termination, your right to use the Service immediately ceases. We will delete your data as described in our Privacy Policy. Provisions that should survive termination (including Sections 9, 10, 11, 14, 15, and 16) will remain in effect.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-light-border dark:border-dark-border pt-16">
          <h2 className="text-3xl font-bold mb-8">9. Disclaimers of Warranties</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-100 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg p-4">
              <p className="text-xs font-mono uppercase">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, VERITY PROTECT DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
            </div>
            
            <p className="text-sm text-light-muted dark:text-dark-muted font-semibold">We do not warrant that:</p>
            <ul className="list-disc list-inside space-y-2 text-sm text-light-muted dark:text-dark-muted ml-2">
              <li>The Service will meet your requirements or expectations</li>
              <li>The Service will be uninterrupted, timely, secure, or error-free</li>
              <li>The results from using the Service will be accurate or reliable</li>
              <li>Any fraud detection will be 100% accurate or comprehensive</li>
              <li>Any errors or defects in the Service will be corrected</li>
            </ul>

            <p className="text-sm font-semibold mt-4">
              YOU USE THE SERVICE AT YOUR OWN RISK. WE ARE NOT RESPONSIBLE FOR ANY CALLS BLOCKED, DELAYED, OR MISDIRECTED BY THE SERVICE.
            </p>
          </div>
        </section>

        <section className="border-t border-light-border dark:border-dark-border pt-16">
          <h2 className="text-3xl font-bold mb-8">10. Limitation of Liability</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-100 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg p-4">
              <p className="text-xs font-mono uppercase">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, VERITY PROTECT SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES. THIS LIMITATION APPLIES WHETHER THE ALLEGED LIABILITY IS BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR ANY OTHER BASIS, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
            </div>

            <p className="text-sm text-light-muted dark:text-dark-muted font-semibold">We are not liable for:</p>
            <ul className="list-disc list-inside space-y-2 text-sm text-light-muted dark:text-dark-muted ml-2">
              <li>Calls blocked, delayed, or missed due to the Service</li>
              <li>False positives (legitimate calls flagged as fraud) or false negatives (fraud calls not detected)</li>
              <li>Inability to receive emergency calls or communications</li>
              <li>Financial losses resulting from fraud that was not detected</li>
              <li>Service interruptions, downtime, or technical failures</li>
              <li>Unauthorized access to your account or data</li>
              <li>Actions of third-party service providers (Twilio, Supabase, etc.)</li>
            </ul>

            <p className="text-sm font-semibold mt-4">
              OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATED TO THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM, OR $100, WHICHEVER IS GREATER.
            </p>

            <p className="text-xs text-light-muted dark:text-dark-muted mt-4">
              Some jurisdictions do not allow the exclusion or limitation of certain damages, so some of the above limitations may not apply to you.
            </p>
          </div>
        </section>

        <section className="border-t border-light-border dark:border-dark-border pt-16">
          <h2 className="text-3xl font-bold mb-8">11. Indemnification</h2>
          
          <p className="text-light-muted dark:text-dark-muted mb-4">
            You agree to indemnify, defend, and hold harmless Verity Protect, its affiliates, officers, directors, employees, agents, and licensors from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising from or related to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-light-muted dark:text-dark-muted ml-2 mb-4">
            <li>Your use or misuse of the Service</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any law or regulation</li>
            <li>Your violation of any third-party rights (including privacy, publicity, or intellectual property rights)</li>
            <li>Your failure to obtain necessary consents for call recording</li>
            <li>Any content you provide or actions you take using the Service</li>
          </ul>
          <p className="text-light-muted dark:text-dark-muted">
            We reserve the right to assume exclusive defense and control of any matter subject to indemnification, at your expense.
          </p>
        </section>

        <section className="border-t border-light-border dark:border-dark-border pt-16">
          <h2 className="text-3xl font-bold mb-8">12. Third-Party Services and Links</h2>
          
          <p className="text-light-muted dark:text-dark-muted mb-4">
            The Service relies on third-party services (including Twilio, Supabase, and others) and may contain links to third-party websites or services. We are not responsible for:
          </p>
          <ul className="list-disc list-inside space-y-2 text-light-muted dark:text-dark-muted ml-2 mb-4">
            <li>The availability, accuracy, or content of third-party services</li>
            <li>Any interruptions or failures caused by third-party services</li>
            <li>The privacy practices or terms of service of third parties</li>
          </ul>
          <p className="text-light-muted dark:text-dark-muted">
            Your use of third-party services is at your own risk and subject to their terms and privacy policies.
          </p>
        </section>

        <section className="border-t border-light-border dark:border-dark-border pt-16">
          <h2 className="text-3xl font-bold mb-8">13. Privacy and Data Protection</h2>
          
          <p className="text-light-muted dark:text-dark-muted">
            Our collection, use, and disclosure of your personal information is governed by our <a href="/privacy" className="text-brand-blue hover:underline">Privacy Policy</a>, which is incorporated into these Terms by reference. By using the Service, you consent to our data practices as described in the Privacy Policy.
          </p>
        </section>

        <section className="border-t border-light-border dark:border-dark-border pt-16">
          <h2 className="text-3xl font-bold mb-8">14. Changes to These Terms</h2>
          
          <p className="text-light-muted dark:text-dark-muted mb-4">
            We may modify these Terms at any time by posting updated Terms on our website and in the app. Material changes will be communicated via email or in-app notification.
          </p>
          <p className="text-light-muted dark:text-dark-muted">
            Your continued use of the Service after changes become effective constitutes acceptance of the updated Terms. If you do not agree to the updated Terms, you must stop using the Service and may cancel your account.
          </p>
        </section>

        <section className="border-t border-light-border dark:border-dark-border pt-16">
          <h2 className="text-3xl font-bold mb-8">15. Dispute Resolution and Arbitration</h2>
          
          <div className="space-y-6">
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4">
              <p className="text-xs font-semibold uppercase text-amber-900 dark:text-amber-100">
                IMPORTANT: PLEASE READ THIS SECTION CAREFULLY
              </p>
              <p className="text-xs text-amber-900 dark:text-amber-100 mt-2">
                This section contains a binding arbitration agreement and class action waiver. It affects your legal rights, including your right to file a lawsuit in court.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">15.1 Informal Dispute Resolution</h3>
              <p className="text-light-muted dark:text-dark-muted">
                Before filing a claim, you agree to contact us at <a href="mailto:support@verityprotect.com" className="text-brand-blue hover:underline">support@verityprotect.com</a> to attempt to resolve the dispute informally. We will attempt to resolve the dispute within 60 days.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">15.2 Binding Arbitration</h3>
              <p className="text-light-muted dark:text-dark-muted mb-3">
                If we cannot resolve the dispute informally, you agree that any dispute, claim, or controversy arising from or relating to these Terms or the Service shall be resolved by binding arbitration administered by the American Arbitration Association (AAA) under its Consumer Arbitration Rules.
              </p>
              <ul className="list-disc list-inside space-y-2 text-light-muted dark:text-dark-muted ml-2">
                <li>The arbitration will be conducted by a single arbitrator</li>
                <li>The arbitration will take place in your state of residence or another mutually agreed location</li>
                <li>The arbitrator's decision is final and binding</li>
                <li>Judgment on the award may be entered in any court having jurisdiction</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">15.3 Class Action Waiver</h3>
              <div className="bg-gray-100 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg p-4">
                <p className="text-xs font-mono uppercase">
                  YOU AND VERITY PROTECT AGREE THAT DISPUTES MUST BE BROUGHT ON AN INDIVIDUAL BASIS ONLY, AND NOT AS A CLASS ACTION, REPRESENTATIVE ACTION, OR COLLECTIVE ACTION. THERE WILL BE NO RIGHT OR AUTHORITY FOR ANY DISPUTE TO BE BROUGHT, HEARD, OR ARBITRATED AS A CLASS ACTION.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">15.4 Exceptions to Arbitration</h3>
              <p className="text-light-muted dark:text-dark-muted">
                Either party may bring a claim in small claims court if it qualifies. Additionally, either party may seek equitable relief in court for infringement or misuse of intellectual property rights.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">15.5 Opt-Out Right</h3>
              <p className="text-light-muted dark:text-dark-muted">
                You may opt out of the arbitration agreement by sending written notice to support@verityprotect.com within 30 days of first accepting these Terms. Your notice must include your name, address, and a clear statement that you wish to opt out of arbitration.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-light-border dark:border-dark-border pt-16">
          <h2 className="text-3xl font-bold mb-8">16. General Provisions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">16.1 Governing Law</h3>
              <p className="text-light-muted dark:text-dark-muted">
                These Terms are governed by the laws of the State of Delaware, without regard to conflict of law principles. Any legal action must be brought in the state or federal courts located in Delaware (except for arbitration as provided in Section 15).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">16.2 Entire Agreement</h3>
              <p className="text-light-muted dark:text-dark-muted">
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and Verity Protect regarding the Service and supersede all prior agreements.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">16.3 Severability</h3>
              <p className="text-light-muted dark:text-dark-muted">
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">16.4 Waiver</h3>
              <p className="text-light-muted dark:text-dark-muted">
                Our failure to enforce any provision of these Terms does not constitute a waiver of that provision or any other provision.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">16.5 Assignment</h3>
              <p className="text-light-muted dark:text-dark-muted">
                You may not assign or transfer these Terms or your rights under them without our prior written consent. We may assign these Terms without restriction.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">16.6 Force Majeure</h3>
              <p className="text-light-muted dark:text-dark-muted">
                We are not liable for any failure or delay in performance due to circumstances beyond our reasonable control, including acts of God, natural disasters, war, terrorism, labor disputes, or internet/telecommunications failures.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">16.7 Notices</h3>
              <p className="text-light-muted dark:text-dark-muted">
                Notices to you may be sent via email to the address associated with your account or through in-app notifications. Notices to us should be sent to <a href="mailto:support@verityprotect.com" className="text-brand-blue hover:underline">support@verityprotect.com</a>.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="border-t border-light-border dark:border-dark-border pt-16">
          <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
          <div className="bg-light-card dark:bg-dark-card/30 border border-light-border dark:border-dark-border p-4 rounded-lg">
            <p className="text-sm mb-3">
              Questions about these Terms can be sent to:
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> <a href="mailto:support@verityprotect.com" className="text-brand-blue hover:underline">support@verityprotect.com</a></p>
              <p><strong>Subject Line:</strong> <span className="text-light-muted dark:text-dark-muted">Terms of Service Inquiry</span></p>
            </div>
          </div>
        </section>

        {/* Acknowledgment */}
        <section className="border-t border-light-border dark:border-dark-border pt-16">
          <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/30 rounded-lg p-4">
            <h3 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">Acknowledgment</h3>
            <p className="text-sm text-emerald-900 dark:text-emerald-100">
              BY USING THE SERVICE, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS OF SERVICE. IF YOU DO NOT AGREE, YOU MUST NOT ACCESS OR USE THE SERVICE.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};
