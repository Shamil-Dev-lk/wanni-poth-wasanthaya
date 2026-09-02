import React from 'react';
import { Camera, Layers, Sparkles } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface CallToActionProps {
  onStartClick: () => void;
  onExploreFrames: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onStartClick, onExploreFrames }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-red-50/60 via-white to-amber-50/60 py-20 md:py-24 border-t border-red-100/80 shadow-2xs text-[#1F2937] font-sans">
      
      {/* Soft Ambient Floating Glow Accents */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-red-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        
        {/* Campaign Badge */}
        <div className="inline-flex items-center space-x-2 bg-white text-[#C3094A] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-red-200 shadow-2xs font-sans">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Official Public Campaign 2026</span>
        </div>

        {/* Heading */}
        <h2 className="font-sinhala-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F2937] tracking-tight leading-tight">
          “දිවි ඇතිතුරු අකුරු මිතුරු”
        </h2>

        {/* Subtext */}
        <p className="font-sinhala-sans text-base sm:text-lg text-gray-600 max-w-xl mx-auto font-normal leading-relaxed">
          Join the <strong className="text-[#C3094A] font-semibold">වන්නි පොත් වසන්තය</strong> campaign.
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              if (soundEffects.enabled) soundEffects.playClick();
              onStartClick();
            }}
            className="btn-primary-red w-full sm:w-auto flex items-center justify-center space-x-2.5 shadow-md"
          >
            <Camera className="w-4.5 h-4.5" />
            <span>Create Your Photo</span>
          </button>

          <button
            onClick={() => {
              if (soundEffects.enabled) soundEffects.playClick();
              onExploreFrames();
            }}
            className="btn-secondary-outlined w-full sm:w-auto flex items-center justify-center space-x-2"
          >
            <Layers className="w-4.5 h-4.5" />
            <span>Browse Frames</span>
          </button>
        </div>

      </div>
    </section>
  );
};
