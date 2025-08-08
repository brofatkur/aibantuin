import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import ValueProposition from './ValueProposition';
import CustomerSegments from './CustomerSegments';
import Features from './Features';
import HowItWorks from './HowItWorks';
import Pricing from './Pricing';
import Testimonials from './Testimonials';
import FinalCTA from './FinalCTA';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <ValueProposition />
      <CustomerSegments />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FinalCTA />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default LandingPage;
