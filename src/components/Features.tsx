import React from 'react';
import { Brain, Sheet, Globe, Shield, Image, Clock } from 'lucide-react';

const Features: React.FC = () => {
  const advancedFeatures = [
    {
      icon: Brain,
      title: 'Didukung AI Gemini Google',
      description: 'Memahami percakapan natural, bukan sekadar bot kaku.',
      status: 'active'
    },
    {
      icon: Sheet,
      title: 'Integrasi Real-time Google Sheets',
      description: 'Update info produk, stok, atau jadwal langsung dari Google Sheets.',
      status: 'active'
    },
    {
      icon: Globe,
      title: 'Hiper-Multibahasa',
      description: 'Melayani pelanggan dari seluruh dunia, bahkan dalam bahasa daerah.',
      status: 'active'
    },
    {
      icon: Shield,
      title: 'Teruji di Pasar Nyata',
      description: 'Sistem stabil dan telah dipercaya untuk menangani ribuan percakapan setiap hari.',
      status: 'active'
    },
    {
      icon: Image,
      title: 'Balasan Gambar & Media',
      description: 'Kirim brosur, gambar produk, atau info visual lainnya secara otomatis.',
      status: 'coming-soon'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Teknologi Canggih yang Bekerja untuk Anda
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {advancedFeatures.map((feature, index) => (
            <div
              key={index}
              className={`relative group p-6 sm:p-8 rounded-2xl transition-all transform hover:scale-105 ${
                feature.status === 'coming-soon' 
                  ? 'bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200' 
                  : 'bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl'
              }`}
            >
              {feature.status === 'coming-soon' && (
                <div className="absolute top-4 right-4">
                  <span className="bg-orange-500 text-white text-xs px-2 sm:px-3 py-1 rounded-full font-semibold">
                    Coming Soon: September
                  </span>
                </div>
              )}

              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                feature.status === 'coming-soon' 
                  ? 'bg-orange-200 text-orange-600' 
                  : 'bg-blue-200 text-blue-600'
              }`}>
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