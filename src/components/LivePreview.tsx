import React, { useState, useEffect } from 'react';
import { Frame } from '../types/frame';
import { downloadCanvasImage } from '../utils/canvasHelper';
import { Download, Share2, ArrowLeft, Maximize2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, translations } from '../utils/translations';
import { soundEffects } from '../utils/soundEffects';

interface LivePreviewProps {
  canvasRef: HTMLCanvasElement | null;
  selectedFrame: Frame;
  onBackToEdit: () => void;
  onNewPhoto: () => void;
  onSuccess: () => void;
  language?: Language;
}

export const LivePreview: React.FC<LivePreviewProps> = ({
  canvasRef,
  selectedFrame,
  onBackToEdit,
  onNewPhoto,
  onSuccess,
  language = 'en'
}) => {
  const t = translations[language];
  const [fullscreen, setFullscreen] = useState(false);
  const [previewDataUrl, setPreviewDataUrl] = useState<string>('');

  useEffect(() => {
    if (canvasRef) {
      try {
        const url = canvasRef.toDataURL('image/png');
        setPreviewDataUrl(url);
      } catch (e) {
        console.error('Failed to generate preview data URL', e);
      }
    }
  }, [canvasRef]);

  const triggerConfetti = () => {
    try {
      soundEffects.playSuccess();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const handleDownload = (format: 'png' | 'jpeg') => {
    if (!canvasRef) return;
    soundEffects.playClick();
    const filename = `wanni-poth-wasanthaya-nikaweratiya-ps-${selectedFrame.id}.${format === 'jpeg' ? 'jpg' : 'png'}`;
    downloadCanvasImage(canvasRef, format, filename);
    triggerConfetti();
    onSuccess();
  };

  const handleShare = async () => {
    if (!canvasRef) return;
    soundEffects.playClick();
    try {
      canvasRef.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], 'wanni-poth-wasanthaya.png', { type: 'image/png' });
        
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: t.psName,
            text: t.slogan,
            files: [file]
          });
        } else {
          handleDownload('png');
        }
      });
    } catch (e) {
      handleDownload('png');
    }
  };

  return (
    <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 font-sans">
      
      <div className="text-center max-w-lg mx-auto mb-8 space-y-2">
        <span className="text-xs font-semibold text-[#C3094A] bg-red-50 px-3 py-1 rounded-full uppercase border border-red-200">
          04 DOWNLOAD & SHARE
        </span>
        <h2 className="text-3xl font-bold text-gray-900">
          {t.previewTitle}
        </h2>
        <p className="text-sm text-gray-600 font-normal">
          {t.previewSubtitle}
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-200">
        
        <div className="relative max-w-md mx-auto aspect-square rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200 group">
          {previewDataUrl ? (
            <img
              src={previewDataUrl}
              alt="Final Campaign Photo Preview"
              className="w-full h-full object-contain bg-gray-50 cursor-pointer"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-500 space-y-2">
              <div className="w-8 h-8 border-4 border-[#C3094A] border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-semibold">Preparing final composition...</span>
            </div>
          )}

          {previewDataUrl && (
            <button
              onClick={() => {
                soundEffects.playClick();
                setFullscreen(true);
              }}
              className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-full backdrop-blur-md shadow transition-all"
              title="Fullscreen Preview"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          )}
        </div>

        <p className="text-[11px] text-gray-400 text-center mt-3 font-normal">
          💡 On mobile: Tap download buttons or tap and hold the image to save directly to Photos.
        </p>

        <div className="mt-6 space-y-4 max-w-md mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => handleDownload('png')}
              className="w-full btn-primary-red text-white font-semibold text-base py-3.5 px-4 rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>{t.btnPng}</span>
            </button>

            <button
              onClick={() => handleDownload('jpeg')}
              className="w-full bg-gray-900 hover:bg-black text-white font-semibold text-base py-3.5 px-4 rounded-2xl shadow transition-all flex items-center justify-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>{t.btnJpg}</span>
            </button>
          </div>

          <button
            onClick={handleShare}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm py-3.5 px-4 rounded-xl shadow transition-all flex items-center justify-center space-x-2"
          >
            <Share2 className="w-5 h-5" />
            <span>{t.btnShare}</span>
          </button>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-600">
            <button
              onClick={() => {
                soundEffects.playClick();
                onBackToEdit();
              }}
              className="hover:text-[#C3094A] flex items-center space-x-1 py-2 px-3 rounded-lg hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.btnReEdit}</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                onNewPhoto();
              }}
              className="hover:text-[#C3094A] flex items-center space-x-1 py-2 px-3 rounded-lg hover:bg-gray-50"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{t.btnNewPhoto}</span>
            </button>
          </div>
        </div>

      </div>

      {fullscreen && previewDataUrl && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full">
            <button
              onClick={() => {
                soundEffects.playClick();
                setFullscreen(false);
              }}
              className="absolute -top-12 right-0 text-white font-semibold text-sm bg-white/20 px-4 py-2 rounded-full hover:bg-white/40"
            >
              ✕ Close
            </button>
            <img
              src={previewDataUrl}
              alt="Fullscreen HD Preview"
              className="w-full h-auto rounded-2xl shadow-2xl border-2 border-white/20 max-h-[85vh] object-contain mx-auto"
            />
          </div>
        </div>
      )}

    </section>
  );
};
