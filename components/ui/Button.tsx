import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/50 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-brand-blue text-white hover:bg-brand-blue/90 shadow-glow-sm hover:shadow-glow border border-transparent",
    secondary: "bg-white text-dark-bg hover:bg-gray-100 dark:bg-dark-card dark:text-dark-text dark:hover:bg-dark-border border border-light-border dark:border-dark-border",
    outline: "bg-transparent border border-light-border dark:border-dark-border text-light-text dark:text-dark-text hover:border-brand-blue dark:hover:border-brand-blue hover:text-brand-blue dark:hover:text-brand-blue",
    ghost: "bg-transparent text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text"
  };

  const sizes = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-6 py-3",
    lg: "text-lg px-8 py-4"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};