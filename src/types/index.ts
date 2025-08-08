export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface CustomerSegment {
  id: string;
  title: string;
  description: string;
  visual: string;
  points: string[];
}

export interface PricingTier {
  name: string;
  price: string;
  tokens: string;
  description: string;
  popular?: boolean;
  ctaText: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
}