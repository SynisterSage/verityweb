import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BenefitItem {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

export enum UserRole {
  FAMILY_MEMBER = 'family_member',
  CARETAKER = 'caretaker',
  AGENCY = 'agency',
}

export interface WaitlistFormData {
  name: string;
  email: string;
  phone?: string;
  notes?: string;
  role: UserRole;
  organization?: string;
  teamSize?: string;
}

export type ViewState = 'home' | 'privacy' | 'terms';