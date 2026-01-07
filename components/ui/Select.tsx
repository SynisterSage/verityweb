import React, { useEffect, useRef, useState } from 'react';

interface Option { value: string; label: string }

interface SelectProps {
  id: string;
  name: string;
  value: string;
  required?: boolean;
  options: Option[];
  onChange: (e: { target: { name: string; value: string } }) => void;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({ id, name, value, required, options, onChange, className }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const handleSelect = (v: string) => {
    onChange({ target: { name, value: v } });
    setOpen(false);
    // focus back to button
    try { buttonRef.current?.focus(); } catch {}
  };

  const selectedLabel = options.find(o => o.value === value)?.label || '';

  return (
    <div className={`relative ${className || ''}`} ref={ref}>
      <input type="hidden" id={id} name={name} value={value} />
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label`}
        onClick={() => setOpen(s => !s)}
        className="w-full text-left px-4 py-3 pr-10 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none"
      >
        <span id={`${id}-label`} className={`${selectedLabel ? '' : 'text-light-muted dark:text-dark-muted'}`}>
          {selectedLabel || 'Select size'}
        </span>
        <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-light-muted dark:text-dark-muted w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-labelledby={`${id}-label`}
          className="absolute z-50 mt-2 w-full bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg shadow-lg max-h-60 overflow-auto"
        >
          {options.map((o) => (
            <li
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              onClick={() => handleSelect(o.value)}
              className={`px-4 py-3 cursor-pointer hover:bg-brand-blue/5 dark:hover:bg-white/5 ${o.value === value ? 'bg-brand-blue/5' : ''}`}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
