import React from 'react';

type Origin = 'host' | 'react' | 'vue' | 'iframe';

interface FederationWrapperProps {
  children: React.ReactNode;
  origin: Origin;
  className?: string; // Allow passing styles for layout
}

const config = {
  host: {
    label: '호스트 앱',
    borderColor: 'border-blue-500',
    bgColor: 'bg-blue-500',
    textColor: 'text-white'
  },
  react: {
    label: '리모트: React',
    borderColor: 'border-cyan-400',
    bgColor: 'bg-cyan-400',
    textColor: 'text-black'
  },
  vue: {
    label: '리모트: Vue',
    borderColor: 'border-emerald-500',
    bgColor: 'bg-emerald-500',
    textColor: 'text-white'
  },
  iframe: {
    label: '리모트: Iframe (React)',
    borderColor: 'border-purple-500',
    bgColor: 'bg-purple-500',
    textColor: 'text-white'
  }
};

export const FederationWrapper: React.FC<FederationWrapperProps> = ({ children, origin, className = '' }) => {
  const { label, borderColor, bgColor, textColor } = config[origin];

  return (
    <div className={`relative border-2 ${borderColor} rounded-lg p-1 ${className}`}>
      <div className={`absolute -top-2.5 left-2 ${bgColor} ${textColor} text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm z-20`}>
        {label}
      </div>
      {children}
    </div>
  );
};
