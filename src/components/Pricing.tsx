import React from 'react';
import { Check, Star } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const Pricing: React.FC = () => {
  const { contentData } = useContent();

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Investasi Cerdas, Hasil Maksimal
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Tanpa Biaya Tersembunyi
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {contentData.pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-6 sm:p-8 transition-all transform hover:scale-105 ${
                index === 1 // Middle tier is popular
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-2xl sm:scale-105 neon-border animate-glow'
                  : 'bg-white border-2 border-gray-200 hover:shadow-xl hover:neon-border glass-effect'
              }`}
            >
              {index === 1 && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span>Paling Populer</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className={`text-xl sm:text-2xl font-bold mb-4 ${
                  index === 1 ? 'text-white' : 'text-gray-900'
                }`}>
                  {tier.name}
                </h3>

                <div className="mb-6">
                  <span className={`text-3xl sm:text-4xl font-bold ${
                    index === 1 ? 'text-white' : 'text-blue-600'
                  }`}>
                    {tier.price}
                  </span>
                  <span className={`text-base sm:text-lg ${
                    index === 1 ? 'text-blue-100' : 'text-gray-600'
                  }`}>
                    / bulan
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3 mb-4">
                  <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                    index === 1 ? 'text-blue-200' : 'text-green-500'
                  }`} />
                  <span className={`${
                    index === 1 ? 'text-blue-100' : 'text-gray-700'
                  }`}>
                    Cocok untuk: {tier.description}
                  </span>
                </div>

                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <Check className={`w-4 h-4 flex-shrink-0 mt-1 ${
                      index === 1 ? 'text-blue-200' : 'text-green-500'
                    }`} />
                    <span className={`text-sm ${
                      index === 1 ? 'text-blue-100' : 'text-gray-600'
                    }`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="https://app.aibantuin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 sm:py-4 rounded-xl text-sm sm:text-base font-semibold transition-all transform hover:scale-105 inline-block text-center ${
                  index === 1
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {tier.buttonText}
              </a>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm sm:text-base text-gray-600 bg-gray-50 p-4 sm:p-6 rounded-2xl inline-block max-w-2xl">
            <strong>Apa itu Token?</strong> 1000 token setara dengan ~750 kata. Paket Starter cukup untuk ratusan percakapan detail setiap bulan.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;