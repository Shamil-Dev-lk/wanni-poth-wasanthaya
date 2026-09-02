import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface AboutCampaignProps {
  onStartClick: () => void;
}

export const AboutCampaign: React.FC<AboutCampaignProps> = ({ onStartClick }) => {
  return (
    <section id="campaign-info" className="py-20 bg-white border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          <div className="flex justify-center items-center space-x-4 mb-2">
            <img
              src="/assets/ps-emblem.png"
              alt="Nikaweratiya Pradeshiya Sabha Emblem"
              className="w-14 h-14 object-contain"
            />
          </div>

          <div className="inline-flex items-center space-x-2 bg-red-50 text-[#C3094A] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-red-200/80">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Public Campaign 2026</span>
          </div>

          <div className="flex justify-center">
            <img
              src="/assets/wanni-title-logo.png"
              alt="වන්නි පොත් වසන්තය"
              className="h-20 sm:h-24 md:h-28 object-contain"
            />
          </div>

          <h3 className="font-sinhala-serif text-2xl sm:text-3xl font-semibold text-[#1F2937]">
            “දිවි ඇතිතුරු අකුරු මිතුරු”
          </h3>

          <p className="font-sinhala-sans text-gray-600 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed font-normal">
            An initiative by Nikaweratiya Pradeshiya Sabha promoting reading, books, knowledge and a lasting connection with learning.
          </p>

          <div className="pt-3 flex justify-center">
            <button
              onClick={() => {
                if (soundEffects.enabled) soundEffects.playClick();
                onStartClick();
              }}
              className="btn-primary-red flex items-center space-x-2 text-base shadow-md"
            >
              <span>Create Your Photo</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
