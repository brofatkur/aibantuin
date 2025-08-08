import React from 'react';
import { useAdmin } from '../contexts/AdminContext';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  variant?: 'default' | 'footer';
}

const Logo: React.FC<LogoProps> = ({ className = '', width = 200, height = 60, variant = 'default' }) => {
  const { contentData } = useAdmin();
  const isFooter = variant === 'footer';
  const gradientId = `headGradient-${variant}-${Math.random().toString(36).substr(2, 9)}`;



  // If there's a logo URL (either default or custom), use it
  if (contentData.logoUrl) {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <img
          src={contentData.logoUrl}
          alt="AI Bantuin Logo"
          width={width}
          height={height}
          className="object-contain"
          style={{ maxWidth: width, maxHeight: height }}
        />
      </div>
    );
  }

  // Default SVG logo
  return (
    <div className={`inline-flex items-center ${className}`}>
      <svg width={width} height={height} viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* AI Character Head with gradient */}
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isFooter ? "#60A5FA" : "#3B82F6"} />
            <stop offset="100%" stopColor={isFooter ? "#3B82F6" : "#1E40AF"} />
          </linearGradient>
        </defs>

        <circle cx="30" cy="30" r="25" fill={`url(#${gradientId})`} stroke={isFooter ? "#60A5FA" : "#E2E8F0"} strokeWidth="2"/>

        {/* Eyes */}
        <ellipse cx="22" cy="25" rx="4" ry="6" fill="white"/>
        <ellipse cx="38" cy="25" rx="4" ry="6" fill="white"/>

        {/* Eye pupils for more character */}
        <ellipse cx="22" cy="26" rx="1.5" ry="2" fill="#1F2937"/>
        <ellipse cx="38" cy="26" rx="1.5" ry="2" fill="#1F2937"/>

        {/* Speed Lines with better spacing */}
        <rect x="2" y="18" width="10" height="2" rx="1" fill={isFooter ? "#60A5FA" : "#2563EB"} opacity="0.8"/>
        <rect x="4" y="23" width="8" height="2" rx="1" fill={isFooter ? "#60A5FA" : "#2563EB"} opacity="0.9"/>
        <rect x="2" y="28" width="10" height="2" rx="1" fill={isFooter ? "#60A5FA" : "#2563EB"} opacity="0.8"/>
        <rect x="4" y="33" width="8" height="2" rx="1" fill={isFooter ? "#60A5FA" : "#2563EB"} opacity="0.7"/>
        <rect x="6" y="38" width="6" height="2" rx="1" fill={isFooter ? "#60A5FA" : "#2563EB"} opacity="0.6"/>

        {/* Headphones/Audio indicator */}
        <path d="M15 15 Q30 5 45 15" stroke={isFooter ? "#93C5FD" : "#CBD5E1"} strokeWidth="2" fill="none"/>
        <circle cx="15" cy="15" r="2" fill={isFooter ? "#93C5FD" : "#CBD5E1"}/>
        <circle cx="45" cy="15" r="2" fill={isFooter ? "#93C5FD" : "#CBD5E1"}/>

        {/* Text "aibantuin" with better typography */}
        <text x="70" y="28" fontFamily="system-ui, -apple-system, sans-serif" fontSize="20" fontWeight="700" fill={isFooter ? "#60A5FA" : "#2563EB"}>ai</text>
        <text x="95" y="28" fontFamily="system-ui, -apple-system, sans-serif" fontSize="20" fontWeight="500" fill={isFooter ? "#E5E7EB" : "#374151"}>bantuin</text>
      </svg>
    </div>
  );
};

export default Logo;
