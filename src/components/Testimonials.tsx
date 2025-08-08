import React from 'react';
import { Quote, TrendingUp, Clock, Heart } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const Testimonials: React.FC = () => {
  const { contentData } = useContent();

  const benefitIcons = [TrendingUp, Clock, Heart];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Jangan Hanya Percaya Kata Kami
          </h2>
        </div>

        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {contentData.testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <div className="flex items-center space-x-3 mb-6">
                {benefitIcons.map((Icon, i) => (
                  <Icon key={i} className="w-6 h-6 text-blue-600" />
                ))}
              </div>

              <div className="relative mb-6">
                <Quote className="w-8 h-8 text-blue-200 absolute -top-2 -left-2" />
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed pl-6">
                  {testimonial.content}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;