'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'dark' | 'light' | 'red' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({ 
  variant = 'dark', 
  size = 'md', 
  loading = false, 
  children, 
  className = '', 
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = 'font-bold rounded-[6px] border-0 cursor-pointer transition-all duration-200';
  
  const variantStyles = {
    dark: 'bg-[#111a23] text-white hover:bg-[#1a2530]',
    light: 'bg-white border border-[#e7e8e9] text-[#111a23] hover:bg-[#f8f9fa]',
    red: 'bg-[#c43636] text-white hover:bg-[#9e2b2b]',
    ghost: 'bg-transparent text-[#111a23] hover:bg-[#f8f9fa]'
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm min-h-[36px]',
    md: 'px-5 py-3 text-sm min-h-[44px]',
    lg: 'px-6 py-4 text-base min-h-[52px]'
  };
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Загрузка...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
