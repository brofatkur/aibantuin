import React from 'react';
import { Rocket, ArrowRight } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const FinalCTA: React.FC = () => {
  const { contentData } = useContent();

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="flex justify-center mb-8">
            <div className="bg-blue-500 w-20 h-20 rounded-full flex items-center justify-center">
              <Rocket className="w-10 h-10 text-white" />
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-6">
            Siap Membuat Bisnis Anda Lebih Efisien?
          </h2>

          <p className="text-lg sm:text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
            Hentikan membuang waktu membalas chat yang sama berulang kali. Biarkan AI mengambil alih.
          </p>

          <div className="space-y-4">
            <a
              href="https://app.aibantuin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-100 text-blue-600 px-6 sm:px-12 py-4 sm:py-6 rounded-2xl text-lg sm:text-2xl font-bold transition-all transform hover:scale-105 shadow-2xl hover:shadow-3xl inline-flex items-center space-x-3 group w-full sm:w-auto justify-center"
            >
              <span>{contentData.ctaButtons.finalCtaButton}</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>

            <p className="text-sm sm:text-base text-blue-200">
              Daftar gratis, aktifkan kapan saja.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;