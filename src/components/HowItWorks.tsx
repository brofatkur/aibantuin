import React from 'react';
import { steps } from '../constants';
import { ArrowRight } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const HowItWorks: React.FC = () => {
  const { contentData } = useContent();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Aktif dalam 3 Langkah Mudah
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 sm:space-y-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center">
                    <span className="text-2xl font-bold">{step.number}</span>
                  </div>
                </div>

                <div className="flex-1 bg-white rounded-2xl p-6 sm:p-8 shadow-lg w-full">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center sm:text-left">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed text-center sm:text-left">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="flex-shrink-0 hidden sm:block">
                    <ArrowRight className="w-8 h-8 text-blue-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a
              href="https://app.aibantuin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-xl text-lg sm:text-xl font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto inline-block"
            >
              {contentData.ctaButtons.howItWorksButton}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;