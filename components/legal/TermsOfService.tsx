import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
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
        <h1 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-4 flex items-center gap-3">
          <FileText className="text-brand-blue" /> Website Terms of Use
        </h1>
        <p className="text-lg text-brand-blue font-medium mb-4">
          Effective Date: January 2026
        </p>
        <p className="text-lg text-light-muted dark:text-dark-muted max-w-3xl">
          These Terms of Use apply to your access and use of the Verity Protect website. By using the Website, you agree to these Terms.
        </p>
      </div>

      <div className="space-y-8 text-light-text dark:text-dark-text">
        
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-brand-blue">1. Website Purpose</h2>
          <p className="leading-relaxed">
            The Website provides information about Verity Protect and allows users to join a waitlist for future access to our services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-brand-blue">2. Eligibility</h2>
          <p className="leading-relaxed">
            You must be at least 18 years old to use the Website. If you are under 18, please have a parent or guardian join the waitlist on your behalf.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-brand-blue">3. Waitlist</h2>
          <p className="leading-relaxed">
            Joining the waitlist does not guarantee access or availability. We may contact you with product updates, early access opportunities, or related communications.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-brand-blue">4. Acceptable Use</h2>
          <p className="leading-relaxed">
            You agree not to misuse the Website, interfere with its operation, attempt to access non‑public areas, or violate any applicable laws.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-brand-blue">5. Intellectual Property</h2>
          <p className="leading-relaxed">
            All content and materials on the Website are owned by Verity Protect or its licensors. You may not copy, reproduce, or distribute any content without permission.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-brand-blue">6. Third‑Party Links</h2>
          <p className="leading-relaxed">
            The Website may include links to third‑party sites. We are not responsible for their content or practices.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-brand-blue">7. Disclaimer</h2>
          <p className="leading-relaxed">
            The Website is provided “as is” without warranties of any kind. We do not guarantee the Website will be uninterrupted or error‑free.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-brand-blue">8. Limitation of Liability</h2>
          <p className="leading-relaxed">
            To the maximum extent permitted by law, Verity Protect will not be liable for any indirect, incidental, or consequential damages related to your use of the Website.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-brand-blue">9. Changes to These Terms</h2>
          <p className="leading-relaxed">
            We may update these Terms at any time. Updates will be posted with a new effective date.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-brand-blue">10. Contact</h2>
          <p className="leading-relaxed">
            Questions about these Terms can be sent to <a href="mailto:verityprotect@gmail.com" className="text-brand-blue hover:underline">verityprotect@gmail.com</a>.
          </p>
        </section>

      </div>
    </div>
  );
};