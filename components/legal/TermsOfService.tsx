import React from 'react';
import { FileText, ArrowLeft, AlertCircle, Shield } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export const TermsOfService: React.FC = () => {
  const navigate = useNavigate();
  const onBack = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="mb-8">
        <Button variant="ghost" size="sm" onClick={onBack} className="pl-0 hover:bg-transparent text-brand-blue">
            <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Button>
      </div>

      <div className="mb-12 border-b border-light-border dark:border-dark-border pb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-4">
          Terms of Service
        </h1>
        <p className="text-sm text-light-muted dark:text-dark-muted mb-2">
          <strong>Effective Date:</strong> February 20, 2026
        </p>
        <p className="text-sm text-light-muted dark:text-dark-muted mb-6">
          <strong>Last Updated:</strong> February 20, 2026
        </p>
        <div className="prose prose-sm max-w-none text-light-muted dark:text-dark-muted">
          <p className="leading-relaxed">
            These Terms of Service ("Terms") govern your access to and use of the Verity Protect mobile application, website, and services (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.
          </p>
          <p className="leading-relaxed mt-4">
            Please read these Terms carefully. They contain important information about your legal rights, including mandatory arbitration and class action waiver provisions in Section 15.
          </p>
        </div>
      </div>

      <div className="space-y-12 prose prose-sm max-w-none text-light-text dark:text-dark-text">

        {/* Critical Emergency Disclaimer */}
        <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-500 dark:border-red-700 rounded-xl p-6 not-prose">
          <h3 className="text-lg font-bold text-red-900 dark:text-red-200 mb-3 flex items-center gap-2">
            <AlertCircle size={24} /> CRITICAL: NOT AN EMERGENCY SERVICE
          </h3>
          <div className="text-sm text-red-900 dark:text-red-200 space-y-2">
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

        {/* 1. Service Description */}
        <section>
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">1. Service Description</h2>
          
          <div className="text-sm text-light-muted dark:text-dark-muted space-y-4">
            <p>
              Verity Protect provides an automated call screening service designed to identify and filter potential fraud, spam, and unwanted calls. The Service includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Call forwarding and screening for unknown callers</li>
              <li>Automated fraud detection and risk assessment</li>
              <li>Call recording and transcription for screened calls</li>
              <li>Trusted contact management and allowlists</li>
              <li>Family circle features for collaborative monitoring</li>
              <li>Fraud alerts and call activity history</li>
            </ul>
            
            <div className="bg-brand-blue/10 border border-brand-blue/20 rounded-xl p-4 mt-4">
              <p className="text-sm text-light-text dark:text-dark-text">
                <strong>Important Limitations:</strong> The Service is not foolproof. It may fail to detect some fraudulent calls (false negatives) or incorrectly flag legitimate calls (false positives). You remain responsible for your own judgment in handling phone communications.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Eligibility and Account Registration */}
        <section className="border-t border-light-border dark:border-dark-border pt-12">
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">2. Eligibility and Account Registration</h2>
          
          <div className="text-sm text-light-muted dark:text-dark-muted space-y-4">
            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">2.1 Age Requirement</h3>
            <p>
              You must be at least 18 years old to create an account. If you are under 18, a parent or guardian must create and manage the account on your behalf.
            </p>

            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mt-6">2.2 Account Information</h3>
            <p>
              You agree to provide accurate, current, and complete information during registration and to update it as necessary. You are responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Maintaining the confidentiality of your password and account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized access or security breach</li>
              <li>Ensuring your forwarding phone number is accurate and functional</li>
            </ul>

            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mt-6">2.3 One Account Per User</h3>
            <p>
              You may only create one account per phone number. Creating multiple accounts or sharing accounts is prohibited.
            </p>
          </div>
        </section>

        {/* 3. Call Screening and Recording Consent */}
        <section className="border-t border-light-border dark:border-dark-border pt-12">
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">3. Call Screening and Recording Consent</h2>
          
          <div className="text-sm text-light-muted dark:text-dark-muted space-y-4">
            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">3.1 How Call Screening Works</h3>
            <p>
              By using the Service, you authorize Verity Protect to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Forward incoming calls to your Verity Protect phone number</li>
              <li>Answer and screen calls from unknown numbers using automated systems</li>
              <li>Record and transcribe screened calls for fraud analysis</li>
              <li>Store call metadata, recordings, and transcripts as described in our Privacy Policy</li>
              <li>Use automated fraud-detection models to analyze call content and detect fraud</li>
            </ul>

            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mt-6">3.2 Recording Consent and Legal Compliance</h3>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
              <p className="text-amber-900 dark:text-amber-200 font-semibold mb-2">
                Recording Consent Responsibility
              </p>
              <p className="text-amber-900 dark:text-amber-200">
                You are responsible for ensuring that your use of the Service complies with all applicable federal, state, and local laws regarding call recording and wiretapping. Some jurisdictions require two-party consent for call recording. By using the Service, you represent that you have obtained all necessary consents and comply with all applicable laws.
              </p>
            </div>

            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mt-6">3.3 Trusted Contacts</h3>
            <p>
              Calls from numbers on your Trusted Contact list bypass screening entirely and are not recorded or analyzed. You are responsible for maintaining an accurate trusted contact list.
            </p>
          </div>
        </section>

        {/* 4. Acceptable Use Policy */}
        <section className="border-t border-light-border dark:border-dark-border pt-12">
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">4. Acceptable Use Policy</h2>
          
          <div className="text-sm text-light-muted dark:text-dark-muted space-y-4">
            <p>You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
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
          </div>
        </section>

        {/* 5. Intellectual Property */}
        <section className="border-t border-light-border dark:border-dark-border pt-12">
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">5. Intellectual Property</h2>
          
          <div className="text-sm text-light-muted dark:text-dark-muted space-y-4">
            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">5.1 Our Property</h3>
            <p>
              The Service and all content, features, and functionality (including but not limited to software, code, designs, text, graphics, logos, and trademarks) are owned by Verity Protect or its licensors and are protected by copyright, trademark, patent, and other intellectual property laws.
            </p>

            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mt-6">5.2 License Grant</h3>
            <p>
              We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Service for personal, non-commercial purposes, subject to these Terms.
            </p>

            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mt-6">5.3 Your Content</h3>
            <p>
              You retain ownership of your call recordings, transcripts, and other content you provide. By using the Service, you grant us a license to use, store, and process this content to provide and improve the Service, as described in our Privacy Policy.
            </p>
          </div>
        </section>

        {/* 6. Fees and Payment */}
        <section className="border-t border-light-border dark:border-dark-border pt-12">
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">6. Fees and Payment</h2>
          
          <div className="text-sm text-light-muted dark:text-dark-muted space-y-4">
            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">6.1 Subscription Fees</h3>
            <p>
              Access to the Service requires a paid subscription. Current pricing is available on our website and in the app. You agree to pay all fees associated with your subscription.
            </p>

            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mt-6">6.2 Billing and Renewals</h3>
            <p>
              Subscriptions automatically renew at the end of each billing period unless canceled. You authorize us to charge your payment method on file for renewal fees. We may change our fees with 30 days' notice.
            </p>

            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mt-6">6.3 Refunds</h3>
            <p>
              Fees are generally non-refundable except as required by law or as otherwise stated in our refund policy. We reserve the right to issue refunds at our sole discretion.
            </p>
          </div>
        </section>

        {/* 7. Service Availability and Modifications */}
        <section className="border-t border-light-border dark:border-dark-border pt-12">
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">7. Service Availability and Modifications</h2>
          
          <div className="text-sm text-light-muted dark:text-dark-muted space-y-4">
            <p>
              We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time with or without notice. We may also impose limits on certain features or restrict access to parts of the Service.
            </p>
            <p>
              We are not liable for any modification, suspension, or discontinuation of the Service. The Service may experience downtime, delays, or errors, and we do not guarantee uninterrupted or error-free operation.
            </p>
          </div>
        </section>

        {/* 8. Termination */}
        <section className="border-t border-light-border dark:border-dark-border pt-12">
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">8. Termination</h2>
          
          <div className="text-sm text-light-muted dark:text-dark-muted space-y-4">
            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">8.1 Termination by You</h3>
            <p>
              You may terminate your account at any time through the app settings. Upon termination, your subscription will continue until the end of the current billing period, and you will not receive a refund for any unused portion.
            </p>

            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mt-6">8.2 Termination by Us</h3>
            <p>
              We may suspend or terminate your access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms. Reasons for termination may include:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Violation of these Terms or our Acceptable Use Policy</li>
              <li>Fraudulent or illegal activity</li>
              <li>Non-payment of fees</li>
              <li>Abusive behavior toward other users or our staff</li>
              <li>Extended inactivity (2+ years)</li>
            </ul>

            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mt-6">8.3 Effect of Termination</h3>
            <p>
              Upon termination, your right to use the Service immediately ceases. We will delete your data as described in our Privacy Policy. Provisions that should survive termination (including Sections 9, 10, 11, 14, 15, and 16) will remain in effect.
            </p>
          </div>
        </section>

        {/* 9. Disclaimers of Warranties */}
        <section className="border-t border-light-border dark:border-dark-border pt-12">
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">9. Disclaimers of Warranties</h2>
          
          <div className="text-sm text-light-muted dark:text-dark-muted space-y-4">
            <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-4 uppercase text-xs font-mono">
              <p className="mb-2">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
              </p>
              <p>
                TO THE FULLEST EXTENT PERMITTED BY LAW, VERITY PROTECT DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
            </div>
            
            <p className="text-xs">
              We do not warrant that:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-xs">
              <li>The Service will meet your requirements or expectations</li>
              <li>The Service will be uninterrupted, timely, secure, or error-free</li>
              <li>The results from using the Service will be accurate or reliable</li>
              <li>Any fraud detection will be 100% accurate or comprehensive</li>
              <li>Any errors or defects in the Service will be corrected</li>
            </ul>

            <p className="font-semibold text-light-text dark:text-dark-text mt-4">
              YOU USE THE SERVICE AT YOUR OWN RISK. WE ARE NOT RESPONSIBLE FOR ANY CALLS BLOCKED, DELAYED, OR MISDIRECTED BY THE SERVICE.
            </p>
          </div>
        </section>

        {/* 10. Limitation of Liability */}
        <section className="border-t border-light-border dark:border-dark-border pt-12">
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">10. Limitation of Liability</h2>
          
          <div className="text-sm text-light-muted dark:text-dark-muted space-y-4">
            <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-4 uppercase text-xs font-mono">
              <p className="mb-2">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, VERITY PROTECT SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
              </p>
              <p>
                THIS LIMITATION APPLIES WHETHER THE ALLEGED LIABILITY IS BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR ANY OTHER BASIS, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
            </div>

            <p className="text-xs">
              Without limiting the foregoing, we are not liable for:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-xs">
              <li>Calls blocked, delayed, or missed due to the Service</li>
              <li>False positives (legitimate calls flagged as fraud) or false negatives (fraud calls not detected)</li>
              <li>Inability to receive emergency calls or communications</li>
              <li>Financial losses resulting from fraud that was not detected</li>
              <li>Service interruptions, downtime, or technical failures</li>
              <li>Unauthorized access to your account or data</li>
              <li>Actions of third-party service providers (Twilio, Supabase, etc.)</li>
            </ul>

            <p className="font-semibold text-light-text dark:text-dark-text mt-4 text-xs">
              OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATED TO THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM, OR $100, WHICHEVER IS GREATER.
            </p>

            <p className="text-xs mt-4">
              Some jurisdictions do not allow the exclusion or limitation of certain damages, so some of the above limitations may not apply to you.
            </p>
          </div>
        </section>

        {/* 11. Indemnification */}
        <section className="border-t border-light-border dark:border-dark-border pt-12">
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">11. Indemnification</h2>
          
          <div className="text-sm text-light-muted dark:text-dark-muted space-y-4">
            <p>
              You agree to indemnify, defend, and hold harmless Verity Protect, its affiliates, officers, directors, employees, agents, and licensors from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising from or related to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Your use or misuse of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any law or regulation</li>
              <li>Your violation of any third-party rights (including privacy, publicity, or intellectual property rights)</li>
              <li>Your failure to obtain necessary consents for call recording</li>
              <li>Any content you provide or actions you take using the Service</li>
            </ul>
            <p className="mt-4">
              We reserve the right to assume exclusive defense and control of any matter subject to indemnification, at your expense.
            </p>
          </div>
        </section>

        {/* 12. Third-Party Services */}
        <section className="border-t border-light-border dark:border-dark-border pt-12">
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">12. Third-Party Services and Links</h2>
          
          <div className="text-sm text-light-muted dark:text-dark-muted space-y-4">
            <p>
              The Service relies on third-party services (including Twilio, Supabase, and others) and may contain links to third-party websites or services. We are not responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>The availability, accuracy, or content of third-party services</li>
              <li>Any interruptions or failures caused by third-party services</li>
              <li>The privacy practices or terms of service of third parties</li>
            </ul>
            <p className="mt-4">
              Your use of third-party services is at your own risk and subject to their terms and privacy policies.
            </p>
          </div>
        </section>

        {/* 13. Privacy and Data Protection */}
        <section className="border-t border-light-border dark:border-dark-border pt-12">
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">13. Privacy and Data Protection</h2>
          
          <div className="text-sm text-light-muted dark:text-dark-muted space-y-4">
            <p>
              Our collection, use, and disclosure of your personal information is governed by our <a href="/privacy" className="text-brand-blue hover:underline">Privacy Policy</a>, which is incorporated into these Terms by reference. By using the Service, you consent to our data practices as described in the Privacy Policy.
            </p>
          </div>
        </section>

        {/* 14. Changes to Terms */}
        <section className="border-t border-light-border dark:border-dark-border pt-12">
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">14. Changes to These Terms</h2>
          
          <div className="text-sm text-light-muted dark:text-dark-muted space-y-4">
            <p>
              We may modify these Terms at any time by posting updated Terms on our website and in the app. Material changes will be communicated via email or in-app notification.
            </p>
            <p>
              Your continued use of the Service after changes become effective constitutes acceptance of the updated Terms. If you do not agree to the updated Terms, you must stop using the Service and may cancel your account.
            </p>
          </div>
        </section>

        {/* 15. Dispute Resolution and Arbitration */}
        <section className="border-t border-light-border dark:border-dark-border pt-12">
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">15. Dispute Resolution and Arbitration</h2>
          
          <div className="text-sm text-light-muted dark:text-dark-muted space-y-4">
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
              <p className="text-amber-900 dark:text-amber-200 font-semibold mb-2 uppercase text-xs">
                IMPORTANT: PLEASE READ THIS SECTION CAREFULLY
              </p>
              <p className="text-amber-900 dark:text-amber-200 text-xs">
                This section contains a binding arbitration agreement and class action waiver. It affects your legal rights, including your right to file a lawsuit in court.
              </p>
            </div>

            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mt-6">15.1 Informal Dispute Resolution</h3>
            <p>
              Before filing a claim, you agree to contact us at <a href="mailto:support@verityprotect.com" className="text-brand-blue hover:underline">support@verityprotect.com</a> to attempt to resolve the dispute informally. We will attempt to resolve the dispute within 60 days.
            </p>

            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mt-6">15.2 Binding Arbitration</h3>
            <p>
              If we cannot resolve the dispute informally, you agree that any dispute, claim, or controversy arising from or relating to these Terms or the Service shall be resolved by binding arbitration administered by the American Arbitration Association (AAA) under its Consumer Arbitration Rules.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>The arbitration will be conducted by a single arbitrator</li>
              <li>The arbitration will take place in your state of residence or another mutually agreed location</li>
              <li>The arbitrator's decision is final and binding</li>
              <li>Judgment on the award may be entered in any court having jurisdiction</li>
            </ul>

            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mt-6">15.3 Class Action Waiver</h3>
            <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-4 uppercase text-xs font-mono">
              <p>
                YOU AND VERITY PROTECT AGREE THAT DISPUTES MUST BE BROUGHT ON AN INDIVIDUAL BASIS ONLY, AND NOT AS A CLASS ACTION, REPRESENTATIVE ACTION, OR COLLECTIVE ACTION. THERE WILL BE NO RIGHT OR AUTHORITY FOR ANY DISPUTE TO BE BROUGHT, HEARD, OR ARBITRATED AS A CLASS ACTION.
              </p>
            </div>

            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mt-6">15.4 Exceptions to Arbitration</h3>
            <p>
              Either party may bring a claim in small claims court if it qualifies. Additionally, either party may seek equitable relief in court for infringement or misuse of intellectual property rights.
            </p>

            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mt-6">15.5 Opt-Out Right</h3>
            <p>
              You may opt out of the arbitration agreement by sending written notice to support@verityprotect.com within 30 days of first accepting these Terms. Your notice must include your name, address, and a clear statement that you wish to opt out of arbitration.
            </p>
          </div>
        </section>

        {/* 16. General Provisions */}
        <section className="border-t border-light-border dark:border-dark-border pt-12">
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">16. General Provisions</h2>
          
          <div className="text-sm text-light-muted dark:text-dark-muted space-y-4">
            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">16.1 Governing Law</h3>
            <p>
              These Terms are governed by the laws of the State of Delaware, without regard to conflict of law principles. Any legal action must be brought in the state or federal courts located in Delaware (except for arbitration as provided in Section 15).
            </p>

            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mt-6">16.2 Entire Agreement</h3>
            <p>
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and Verity Protect regarding the Service and supersede all prior agreements.
            </p>

            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mt-6">16.3 Severability</h3>
            <p>
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.
            </p>

            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mt-6">16.4 Waiver</h3>
            <p>
              Our failure to enforce any provision of these Terms does not constitute a waiver of that provision or any other provision.
            </p>

            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mt-6">16.5 Assignment</h3>
            <p>
              You may not assign or transfer these Terms or your rights under them without our prior written consent. We may assign these Terms without restriction.
            </p>

            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mt-6">16.6 Force Majeure</h3>
            <p>
              We are not liable for any failure or delay in performance due to circumstances beyond our reasonable control, including acts of God, natural disasters, war, terrorism, labor disputes, or internet/telecommunications failures.
            </p>

            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mt-6">16.7 Notices</h3>
            <p>
              Notices to you may be sent via email to the address associated with your account or through in-app notifications. Notices to us should be sent to <a href="mailto:support@verityprotect.com" className="text-brand-blue hover:underline">support@verityprotect.com</a>.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="border-t border-light-border dark:border-dark-border pt-12">
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">Contact Us</h2>
          <div className="bg-brand-blue/10 border border-brand-blue/20 rounded-xl p-6">
            <p className="text-sm text-light-text dark:text-dark-text mb-4">
              Questions about these Terms can be sent to:
            </p>
            <div className="space-y-2 text-sm">
              <p><strong className="text-light-text dark:text-dark-text">Email:</strong> <a href="mailto:support@verityprotect.com" className="text-brand-blue hover:underline">support@verityprotect.com</a></p>
              <p><strong className="text-light-text dark:text-dark-text">Subject Line:</strong> <span className="text-light-muted dark:text-dark-muted">Terms of Service Inquiry</span></p>
            </div>
          </div>
        </section>

        {/* Acknowledgment */}
        <section className="border-t border-light-border dark:border-dark-border pt-12">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-200 mb-3 flex items-center gap-2">
              <Shield size={20} /> Acknowledgment
            </h3>
            <p className="text-sm text-emerald-900 dark:text-emerald-200">
              BY USING THE SERVICE, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS OF SERVICE. IF YOU DO NOT AGREE, YOU MUST NOT ACCESS OR USE THE SERVICE.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};
