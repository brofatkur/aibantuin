import React, { useState, useEffect } from 'react';
import { MessageCircle, Zap, CheckCircle, Phone } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const HeroSection: React.FC = () => {
  const { contentData } = useContent();

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-blue-50 pt-8 pb-20 lg:pt-16 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight animate-fade-in">
                {contentData.heroTitle.split(' ').map((word, index) =>
                  word === 'WhatsApp' || word === '24/7' || word === 'AI' ? (
                    <span key={index} className="gradient-text animate-glow">{word} </span>
                  ) : (
                    <span key={index} className="text-gray-900">{word} </span>
                  )
                )}
              </h1>

              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed animate-fade-in">
                {contentData.heroSubtitle}
              </p>

              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl inline-block transform hover:scale-105 transition-all duration-300 neon-border animate-float">
                <p className="text-base sm:text-lg font-semibold">
                  <Zap className="inline-block w-5 h-5 mr-2 animate-pulse" />
                  {contentData.heroTagline}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <a
                href="https://app.aibantuin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-2xl w-full sm:w-auto inline-flex items-center justify-center gap-3 animate-pulse hover:animate-none"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce" />
                <span>{contentData.ctaButtons.heroButton}</span>
                <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <p className="text-sm text-gray-500 text-center lg:text-left">Setting cepat, langsung aktif di WA Anda.</p>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative mt-12 lg:mt-0">
            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-sm mx-auto">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">WhatsApp Business</h3>
                    <p className="text-sm text-gray-500">AI Bantuin aktif</p>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="space-y-3">
                  <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none">
                    <p className="text-sm">Kak, produk ini ready warna merah?</p>
                    <span className="text-xs text-gray-500">12:34</span>
                  </div>
                  
                  <div className="bg-blue-600 text-white p-3 rounded-lg rounded-tr-none ml-8">
                    <p className="text-sm">Hai! Warna merah masih ready kok. Mau order berapa pcs? 😊</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <CheckCircle className="w-3 h-3" />
                      <span className="text-xs">12:34</span>
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">AI</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;