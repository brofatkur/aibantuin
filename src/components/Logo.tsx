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

  // Use white logo for footer, dark logo for other variants
  const logoUrl = isFooter ? '/src/assets/aibantuin-logo-putih.png' : contentData.logoUrl;

  return (
    <div className={`inline-flex items-center ${className}`}>
      <img
        src={logoUrl}
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
