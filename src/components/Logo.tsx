import React from 'react';
import { useContent } from '../contexts/ContentContext';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  variant?: 'default' | 'footer';
}

const Logo: React.FC<LogoProps> = ({ className = '', width = 200, height = 60, variant = 'default' }) => {
  const { contentData } = useContent();
  const isFooter = variant === 'footer';
  const gradientId = `headGradient-${variant}-${Math.random().toString(36).substr(2, 9)}`;



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
};

export default Logo;
