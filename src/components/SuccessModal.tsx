import React, { useEffect } from 'react';
import { Download, RefreshCw, CheckCircle2, Sparkles, X } from 'lucide-react';
import { Language, translations } from '../utils/translations';
import { soundEffects } from '../utils/soundEffects';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadPng: () => void;
  onDownloadJpg: () => void;
  onNewPhoto: () => void;
  language: Language;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  onDownloadPng,
  onDownloadJpg,
  onNewPhoto,
  language
}) => {
  useEffect(() => {
    if (isOpen) {
      soundEffects.playSuccess();
    }
  }, [isOpen]);

  if (!isOpen) return null;
  const t = translations[language];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative border border-gray-200 text-center space-y-6 animate-scale-in">
        <button
          onClick={() => {
            soundEffects.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-20 h-20 bg-red-50 text-[#C3094A] rounded-full flex items-center justify-center mx-auto shadow-inner relative">
          <CheckCircle2 className="w-12 h-12 text-[#C3094A] animate-bounce" />
          <Sparkles className="w-6 h-6 text-[#FFD400] absolute -top-1 -right-1" />
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900 font-sans">
            {t.successTitle}
          </h2>
          <p className="text-base text-gray-700 font-medium font-sans">
            {t.successSub}
          </p>
          <p className="text-xs text-gray-500 font-normal font-sans">
            {t.psName} • {t.psEng}
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={() => {
              soundEffects.playClick();
              onDownloadPng();
              onClose();
            }}
            className="w-full bg-[#C3094A] hover:bg-[#8B0000] text-white font-semibold text-base py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>{t.btnPng}</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              onDownloadJpg();
              onClose();
            }}
            className="w-full bg-gray-900 hover:bg-black text-white font-semibold text-base py-3.5 px-4 rounded-xl shadow transition-all flex items-center justify-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>{t.btnJpg}</span>
          </button>
        </div>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-center space-x-4 text-xs font-semibold text-[#C3094A]">
          <button
            onClick={() => {
              soundEffects.playClick();
              onNewPhoto();
              onClose();
            }}
            className="hover:underline flex items-center space-x-1"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t.btnNewPhoto}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
