import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'orange' | 'red';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'blue' }) => {
  const styles = {
    blue: "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
    orange: "bg-brand-warning/10 text-brand-warning border-brand-warning/20",
    red: "bg-brand-danger/10 text-brand-danger border-brand-danger/20",
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${styles[variant]}`}>
      {children}
    </span>
  );
};