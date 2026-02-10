import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`bg-surface border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}>
      {title && <h3 className="text-lg font-semibold text-text mb-4">{title}</h3>}
      {children}
    </div>
  );
};