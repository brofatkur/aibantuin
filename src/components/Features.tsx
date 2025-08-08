import React from 'react';
import { Brain, MessageSquare, Database, Palette, Clock, Zap } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const Features: React.FC = () => {
  const { contentData } = useContent();

  const featureIcons = [Brain, MessageSquare, Database, Palette, Clock, Zap];

  const featuresWithIcons = contentData.features.map((feature, index) => ({
    ...feature,
    icon: featureIcons[index] || Brain,
    status: 'active'
  }));

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Teknologi Canggih yang Bekerja untuk Anda
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuresWithIcons.map((feature, index) => (
            <div
              key={index}
              className="relative group p-6 sm:p-8 rounded-2xl transition-all transform hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-2xl hover:neon-border glass-effect"
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg group-hover:animate-float">
                <feature.icon className="w-8 h-8" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {feature.status === 'active' && (
                <div className="mt-6 flex items-center text-blue-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm font-semibold">Aktif Sekarang</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;