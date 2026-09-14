'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  hoverable?: boolean;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, hoverable = false, className = '', onClick }: CardProps) {
  return (
    <div
      className={`bg-white border border-[#e7e8e9] rounded-[8px] p-6 transition-all duration-200 ${hoverable ? 'hover:border-[#c43636] hover:shadow-md hover:-translate-y-1 cursor-pointer' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
