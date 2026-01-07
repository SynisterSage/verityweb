import React from 'react';
import { Shield, Lock, Eye, Trash2, Server, MicOff, ArrowLeft, Globe, Smartphone, Cookie } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export const PrivacyPolicy: React.FC = () => {
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
          Data & Privacy
        </h1>
        <p className="text-lg text-brand-blue font-medium mb-4">
          Effective Date: January 2026
        </p>
        <p className="text-lg text-light-muted dark:text-dark-muted max-w-3xl">
          Transparency is our core feature. This policy describes how we handle data for visitors joining our waitlist and for families using the Verity Protect application.
        </p>
      </div>

      <div className="space-y-12">
        {/* Service Disclaimer */}
        <div className="bg-brand-blue/10 border border-brand-blue/20 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-brand-blue mb-2 flex items-center gap-2">
            <Shield size={20} /> Important Service Limitation
          </h3>
          <p className="text-light-text dark:text-dark-text leading-relaxed">
            Verity Protect is a <strong>call screening service</strong> designed to filter spam and fraud. It is <strong>not an emergency response system</strong>. In the event of an emergency, always dial 911 directly. Verity cannot route emergency calls or detect emergency situations.
          </p>
        </div>

        {/* Section 1: Website Data */}
        <section className="border-b border-light-border dark:border-dark-border pb-12">
           <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6 flex items-center gap-3">
             <Globe className="text-brand-blue" /> Section 1: Website & Waitlist Data
           </h2>
           <p className="text-light-muted dark:text-dark-muted mb-6 leading-relaxed">
             When you visit our marketing website or join our waitlist, we collect limited information to manage your access request.
           </p>
           <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl">
              <h3 className="font-bold text-light-text dark:text-dark-text mb-3">Waitlist Information</h3>
              <ul className="space-y-3 text-sm text-light-muted dark:text-dark-muted list-disc list-inside">
                 <li><span className="font-semibold text-light-text dark:text-dark-text">Identity:</span> Name and Email Address.</li>
                 <li><span className="font-semibold text-light-text dark:text-dark-text">Role:</span> Whether you are a Family Member, Caretaker, or Agency.</li>
                 <li><span className="font-semibold text-light-text dark:text-dark-text">Agency Details:</span> Organization name and team size (if applicable).</li>
                 <li><span className="font-semibold text-light-text dark:text-dark-text">Usage:</span> We use this solely to contact you regarding early access, product updates, and account setup.</li>
              </ul>
           </div>
        </section>

        {/* Section 2: App Data */}
        <section className="border-b border-light-border dark:border-dark-border pb-12">
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6 flex items-center gap-3">
             <Smartphone className="text-brand-blue" /> Section 2: App Service Data
          </h2>
          <p className="text-light-muted dark:text-dark-muted mb-6 leading-relaxed">
             For users of the Verity Protect mobile application, we strictly limit data collection to what is necessary for screening calls and detecting fraud.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
             <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl">
                <h3 className="font-bold text-light-text dark:text-dark-text mb-3">Service Data</h3>
                <ul className="space-y-3 text-sm text-light-muted dark:text-dark-muted list-disc list-inside">
                   <li><span className="font-semibold text-light-text dark:text-dark-text">Metadata:</span> Call time, duration, and caller ID for unknown callers only.</li>
                   <li><span className="font-semibold text-light-text dark:text-dark-text">Transcripts:</span> Generated only for screened (unknown) callers to detect fraud.</li>
                   <li><span className="font-semibold text-light-text dark:text-dark-text">Risk Scores:</span> Algorithmic assessments of call transcripts.</li>
                </ul>
             </div>
             <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl">
                <h3 className="font-bold text-light-text dark:text-dark-text mb-3">Trusted Contacts</h3>
                <ul className="space-y-3 text-sm text-light-muted dark:text-dark-muted">
                   <li className="flex gap-3">
                      <Server size={18} className="shrink-0 text-brand-blue" /> 
                      <span>Phone numbers are stored securely server-side to allow calls to bypass screening.</span>
                   </li>
                   <li className="flex gap-3">
                      <Lock size={18} className="shrink-0 text-brand-blue" /> 
                      <span>Contact names are stored <strong>locally on your device</strong> whenever possible for maximum privacy.</span>
                   </li>
                </ul>
             </div>
          </div>

          <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-4">App Privacy Mechanics</h3>
          <div className="space-y-6">
             <div className="flex gap-4">
                <div className="bg-green-500/10 p-3 h-fit rounded-lg text-green-500 border border-green-500/20">
                   <MicOff size={24} />
                </div>
                <div>
                   <h3 className="text-lg font-bold text-light-text dark:text-dark-text">No Recording of Trusted Calls</h3>
                   <p className="text-light-muted dark:text-dark-muted mt-1">
                      Calls from numbers on your Trusted List bypass our screening entirely. We never record, transcribe, or listen to these conversations.
                   </p>
                </div>
             </div>

             <div className="flex gap-4">
                <div className="bg-brand-blue/10 p-3 h-fit rounded-lg text-brand-blue border border-brand-blue/20">
                   <Shield size={24} />
                </div>
                <div>
                   <h3 className="text-lg font-bold text-light-text dark:text-dark-text">Automated Fraud Analysis</h3>
                   <p className="text-light-muted dark:text-dark-muted mt-1">
                      For unknown callers, we use automated keyword scanning and risk scoring algorithms on the transcript to detect fraud. This process is fully automated.
                   </p>
                </div>
             </div>
          </div>
        </section>

        {/* Section 3: Cookies & Analytics */}
        <section className="border-b border-light-border dark:border-dark-border pb-12">
           <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6 flex items-center gap-3">
             <Cookie className="text-brand-blue" /> Section 3: Cookies & Analytics
           </h2>
           <p className="text-light-muted dark:text-dark-muted mb-6 leading-relaxed">
             We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.
           </p>
           <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl">
              <h3 className="font-bold text-light-text dark:text-dark-text mb-3">Tracking Technologies</h3>
              <ul className="space-y-3 text-sm text-light-muted dark:text-dark-muted list-disc list-inside">
                 <li><span className="font-semibold text-light-text dark:text-dark-text">Cookies:</span> Files with small amount of data which may include an anonymous unique identifier.</li>
                 <li><span className="font-semibold text-light-text dark:text-dark-text">Analytics:</span> We use third-party analytics tools to help us measure traffic and usage trends for the Service.</li>
              </ul>
           </div>
        </section>

        {/* Retention & Control */}
        <section className="pt-0">
           <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">Retention & Control</h2>
           <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl">
                 <h3 className="font-bold text-light-text dark:text-dark-text mb-2">90-Day Retention</h3>
                 <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed">
                    We retain call data and transcripts for 90 days to allow for your review and reporting. After this period, data is automatically permanently deleted from our servers.
                 </p>
              </div>
              <div className="p-6 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl">
                 <h3 className="font-bold text-light-text dark:text-dark-text mb-2 flex items-center gap-2">
                    <Trash2 size={16} /> Delete Profile
                 </h3>
                 <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed">
                    You can request a "Delete Profile" action at any time. This performs an immediate hard delete of all your data, contacts, and logs.
                 </p>
              </div>
           </div>
        </section>

        {/* Contact */}
        <section className="border-t border-light-border dark:border-dark-border pt-12 mt-12">
           <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">Contact Us</h2>
           <p className="text-light-muted dark:text-dark-muted">
             If you have any questions about this Privacy Policy, please contact us at <a href="mailto:verityprotect@gmail.com" className="text-brand-blue hover:underline">verityprotect@gmail.com</a>.
           </p>
        </section>
      </div>
    </div>
  );
};