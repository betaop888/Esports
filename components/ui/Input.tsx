'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-[#111a23]">
          {label}
        </label>
      )}
      <input
        className={`h-12 border border-[#e7e8e9] rounded-[6px] bg-white px-4 outline-none focus:border-[#c43636] focus:ring-1 focus:ring-[#c43636] transition-all ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  );
}
