import React from 'react';
// removed unused lucide-react icons (no visual usage in this file)
import { SetupForwarding } from './how-it-works/SetupForwarding';
import { TrustedContacts } from './how-it-works/TrustedContacts';
import { FamilyOversight } from './how-it-works/FamilyOversight';
import { Gatekeeper } from './how-it-works/Gatekeeper';
import { AIScreening } from './how-it-works/AIScreening';
import { FamilyReview } from './how-it-works/FamilyReview';
import { CardContainer } from './how-it-works/CardContainer';



// The interactive demos were moved to `components/sections/how-it-works/*`.
// This file keeps the original CardContainer structure but uses the
// prototype components for each step so copy and behavior match the
// Twilio end-to-end flow described in project docs.

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-light-card dark:bg-dark-card/50 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-4 tracking-tight">
            Protection without isolation
          </h2>
          <p className="text-lg text-light-muted dark:text-dark-muted">
            Intelligent screening that keeps your loved ones safe while keeping them connected.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

          <CardContainer
            stepNumber={1}
            title="Connect Your Phone"
            description="On signup you will receive a Verity number. Forward your phone or landline to the provided number and let Verity screen unknown callers so your loved one isn't disturbed."
          >
            <SetupForwarding />
          </CardContainer>

          <CardContainer
            stepNumber={2}
            title="Trusted Contacts"
            description="Import contacts right from your phone. Calls from trusted contacts will skip screening and are never recorded."
          >
            <TrustedContacts />
          </CardContainer>

          <CardContainer
            stepNumber={3}
            title="Account Members"
            description="Invite caregivers and family members to manage the account and receive real time alerts when threats are blocked."
          >
            <FamilyOversight />
          </CardContainer>

          <CardContainer
            stepNumber={4}
            title="The Gatekeeper"
            description="Callers that are not trusted call Verity first. Correct PINs bridge the call, otherwise they are asked to leave a voicemail."
          >
            <Gatekeeper />
          </CardContainer>

          <CardContainer
            stepNumber={5}
            title="Fraud Protection"
            description="Voicemails from untrusted callers are recorded and transcribed, our fraud engine computes a risk score and stores matched keywords."
          >
            <AIScreening />
          </CardContainer>

          <CardContainer
            stepNumber={6}
            title="Family Review"
            description="Account Members receive alerts with transcript snippets and a risk level, and mark calls safe to add to trusted or fraud to block future calls."
          >
            <FamilyReview />
          </CardContainer>

        </div>
      </div>
    </section>
  );
};