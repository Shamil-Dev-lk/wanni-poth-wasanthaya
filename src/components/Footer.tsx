import React from 'react';
import { MapPin, Globe, Phone, Mail, Facebook, Share2, Shield } from 'lucide-react';
import { Language, translations } from '../utils/translations';

interface FooterProps {
  onAdminClick?: () => void;
  language?: Language;
}

export const Footer: React.FC<FooterProps> = ({ onAdminClick, language = 'en' }) => {
  const t = translations[language];

  return (
    <footer id="about" className="bg-[#171717] text-white pt-16 pb-12 border-t border-gray-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-gray-800">
          
          {/* Left: Organization & Campaign Identity */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/assets/ps-emblem.png"
                alt="Nikaweratiya PS Emblem"
                className="w-11 h-11 object-contain bg-white/10 p-1 rounded-2xl border border-white/20"
              />
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Nikaweratiya Pradeshiya Sabha</h3>
                <p className="text-xs text-[#C3094A] font-semibold">නිකවැරටිය ප්‍රාදේශීය සභාව</p>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <img
                src="/assets/wanni-title-logo.png"
                alt="වන්නි පොත් වසන්තය"
                className="h-14 object-contain"
              />
              <p className="font-sinhala-serif text-base font-semibold text-[#FFD400]">
                “දිවි ඇතිතුරු අකුරු මිතුරු”
              </p>
            </div>

            <p className="text-xs text-gray-400 max-w-sm leading-relaxed font-normal">
              Official public service digital photo frame campaign generator brought to you by Nikaweratiya Pradeshiya Sabha.
            </p>
          </div>

          {/* Center: Quick Links */}
          <div className="md:col-span-3 space-y-3 text-sm">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-gray-800 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2 text-gray-400 text-xs font-normal">
              <li><a href="#hero" className="hover:text-[#C3094A] transition-colors">Home</a></li>
              <li><a href="#gallery" className="hover:text-[#C3094A] transition-colors">Frames</a></li>
              <li><a href="#campaign-info" className="hover:text-[#C3094A] transition-colors">Campaign</a></li>
              <li><a href="#workflow" className="hover:text-[#C3094A] transition-colors">How It Works</a></li>
              <li><a href="#about" className="hover:text-[#C3094A] transition-colors">About</a></li>
              {onAdminClick && (
                <li className="pt-2">
                  <button
                    onClick={onAdminClick}
                    className="inline-flex items-center space-x-1.5 text-xs text-gray-400 hover:text-white bg-gray-800 px-3 py-1.5 rounded-xl border border-gray-700 transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5 text-[#C3094A]" />
                    <span>Admin Panel Portal</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Right: Official Contact Information */}
          <div className="md:col-span-4 space-y-3 text-xs text-gray-400">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-gray-800 pb-2 flex items-center justify-between">
              <span>Official Campaign 2026</span>
              <span className="text-[10px] bg-[#C3094A] text-white px-2 py-0.5 rounded font-semibold">2026</span>
            </h4>

            <div className="space-y-2.5 font-normal">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#C3094A] flex-shrink-0 mt-0.5" />
                <span>Pradeshiya Sabha Office, Nikaweratiya, Sri Lanka.</span>
              </div>

              <div className="flex items-center space-x-2.5">
                <Globe className="w-4 h-4 text-[#C3094A] flex-shrink-0" />
                <span>nikaweratiyaps.gov.lk</span>
              </div>

              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#C3094A] flex-shrink-0" />
                <span>Hotline: 037 - 2260 238</span>
              </div>

              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#C3094A] flex-shrink-0" />
                <span>info@nikaweratiyaps.gov.lk</span>
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-3">
              <span className="w-8 h-8 rounded-xl bg-gray-800 flex items-center justify-center text-gray-300 hover:text-[#C3094A] hover:bg-white transition-all cursor-pointer">
                <Facebook className="w-4 h-4" />
              </span>
              <span className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-[#C3094A] hover:bg-white transition-all cursor-pointer">
                <Share2 className="w-4 h-4" />
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4 font-normal">
          <div>
            © 2026 <strong className="text-gray-300 font-semibold">Nikaweratiya Pradeshiya Sabha</strong>. All rights reserved.
          </div>
          <div>
            Official Public Service Campaign Platform
          </div>
        </div>

      </div>
    </footer>
  );
};
