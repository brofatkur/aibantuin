import React, { useState } from 'react';
import { MessageSquare, Calendar, User } from 'lucide-react';
import { customerSegments } from '../constants';

const CustomerSegments: React.FC = () => {
  const [activeTab, setActiveTab] = useState('online');

  const getTabIcon = (id: string) => {
    switch (id) {
      case 'online': return MessageSquare;
      case 'offline': return Calendar;
      case 'solo': return User;
      default: return MessageSquare;
    }
  };

  const activeSegment = customerSegments.find(segment => segment.id === activeTab);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Solusi Sempurna Untuk Skala Bisnis Anda
          </h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center mb-12 gap-4 sm:space-x-4">
          {customerSegments.map((segment) => {
            const IconComponent = getTabIcon(segment.id);
            return (
              <button
                key={segment.id}
                onClick={() => setActiveTab(segment.id)}
                className={`flex items-center space-x-3 px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all w-full sm:w-auto ${
                  activeTab === segment.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <div className="text-left">
                  <span className="block text-sm sm:text-base">{segment.title}</span>
                  <span className="block text-xs opacity-75">{segment.description}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeSegment && (
          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                  {activeSegment.title}
                </h3>
                
                {activeSegment.id === 'solo' ? (
                  <div className="space-y-6">
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                      {activeSegment.visual}
                    </p>
                    <div className="flex justify-center">
                      <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                        <User className="w-24 h-24 text-blue-600" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 mb-6">
                    <div className="flex items-start space-x-3">
                      <div className="bg-green-500 w-3 h-3 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm sm:text-base text-gray-600 italic mb-2">{activeSegment.visual}</p>
                        <div className="bg-blue-600 text-white px-4 py-2 rounded-lg rounded-tl-none inline-block">
                          <p className="text-sm">Siap! Warna biru ready stok. Untuk pengiriman hari ini, order sebelum jam 3 sore ya kak 😊</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <ul className="space-y-4">
                  {activeSegment.points.map((point, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="bg-blue-100 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-sm font-bold">{index + 1}</span>
                      </div>
                      <span className="text-sm sm:text-base text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:pl-12 mt-8 lg:mt-0">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 sm:p-8 text-center">
                  <MessageSquare className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                    Mulai Otomatisasi Sekarang
                  </h4>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 w-full sm:w-auto">
                    Coba Demo Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CustomerSegments;