import React from 'react';
import * as Icons from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const ValueProposition: React.FC = () => {
  const { contentData } = useContent();

  const getIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
    return IconComponent || Icons.Star;
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Kenapa Ratusan Pebisnis Memilih AI Bantuin?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {contentData.features.map((feature, index) => {
            const IconComponent = getIcon(feature.icon);
            
            return (
              <div
                key={index}
                className="group bg-gray-50 hover:bg-blue-50 p-6 sm:p-8 rounded-2xl text-center transition-all transform hover:scale-105 hover:shadow-xl"
              >
                <div className="bg-blue-100 group-hover:bg-blue-200 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors">
                  <IconComponent className="w-8 h-8 text-blue-600" />
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;