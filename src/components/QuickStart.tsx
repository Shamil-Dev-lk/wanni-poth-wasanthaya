import React from 'react';
import { Layers, Camera, Download, ArrowRight } from 'lucide-react';
import { Language, translations } from '../utils/translations';

interface QuickStartProps {
  onStart: () => void;
  language: Language;
}

export const QuickStart: React.FC<QuickStartProps> = ({ onStart, language }) => {
  const t = translations[language];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-border/80">
        
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-extrabold tracking-widest text-primary uppercase bg-primary-soft px-3 py-1 rounded-full">
            {t.quickTag}
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-text mt-2">
            {t.quickTitle}
          </h3>
          <p className="text-sm text-muted mt-1">
            {t.quickSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div className="relative bg-background rounded-2xl p-6 border border-gray-200/70 hover:border-primary/40 transition-all hover:shadow-md group text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-primary-soft text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Layers className="w-7 h-7 text-primary" />
            </div>
            <h4 className="text-lg font-bold text-text mb-1">{t.step1Title}</h4>
            <p className="text-xs text-muted leading-relaxed">{t.step1Desc}</p>
          </div>

          <div className="relative bg-background rounded-2xl p-6 border border-gray-200/70 hover:border-primary/40 transition-all hover:shadow-md group text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-gold/15 text-gold-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Camera className="w-7 h-7 text-gold-700" />
            </div>
            <h4 className="text-lg font-bold text-text mb-1">{t.step2Title}</h4>
            <p className="text-xs text-muted leading-relaxed">{t.step2Desc}</p>
          </div>

          <div className="relative bg-background rounded-2xl p-6 border border-gray-200/70 hover:border-primary/40 transition-all hover:shadow-md group text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Download className="w-7 h-7 text-green-700" />
            </div>
            <h4 className="text-lg font-bold text-text mb-1">{t.step3Title}</h4>
            <p className="text-xs text-muted leading-relaxed">{t.step3Desc}</p>
          </div>
        </div>

        <div className="mt-8 text-center pt-4 border-t border-gray-100">
          <button
            onClick={onStart}
            className="bg-primary hover:bg-primary-dark text-white font-bold text-base px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all inline-flex items-center space-x-2"
          >
            <span>{t.quickCta}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
