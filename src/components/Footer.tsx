import React from 'react';
import { MessageCircle, Instagram, Mail, Zap } from 'lucide-react';
import Logo from './Logo';
import { useAdmin } from '../contexts/AdminContext';

const Footer: React.FC = () => {
  const { contentData } = useAdmin();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo & Slogan */}
          <div className="space-y-6">
            <div>
              <Logo width={140} height={42} className="mb-2" variant="footer" />
              <div className="flex items-center space-x-2 text-gray-300">
                <Zap className="w-4 h-4" />
                <span className="text-sm">{contentData.companyTagline}</span>
              </div>
            </div>
            
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Asisten WhatsApp AI yang membantu bisnis Anda melayani pelanggan 24/7 dengan balasan yang cerdas dan konsisten.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-base sm:text-lg mb-6">Fitur</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">AI WhatsApp Assistant</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Google Sheets Integration</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Multi-language Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">24/7 Automation</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-base sm:text-lg mb-6">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Case Studies</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Help Center</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-bold text-base sm:text-lg mb-6">Contact & Legal</h4>
            <ul className="space-y-3 mb-6">
              <li><a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="/terms-conditions" className="text-gray-400 hover:text-white transition-colors text-sm">Terms & Conditions</a></li>
              <li><a href="/support" className="text-gray-400 hover:text-white transition-colors text-sm">Support</a></li>
            </ul>

            <div className="flex space-x-4">
              <a href="#" className="bg-green-600 hover:bg-green-700 p-3 rounded-xl transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="bg-pink-600 hover:bg-pink-700 p-3 rounded-xl transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-blue-600 hover:bg-blue-700 p-3 rounded-xl transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
            <p className="text-gray-400 text-sm">
              © 2025 {contentData.companyName}. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 sm:mt-0">
              Powered by Google AI Gemini
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;