import React, { useState, useEffect } from 'react';
import { Frame } from '../types/frame';
import { downloadCanvasImage } from '../utils/canvasHelper';
import { Download, Share2, ArrowLeft, Maximize2, RefreshCw, X, Copy, Check, MessageCircle } from 'lucide-react';
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
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [previewDataUrl, setPreviewDataUrl] = useState<string>('');

  const shareUrl = window.location.href.includes('localhost')
    ? 'https://wanni-poth-wasanthaya.vercel.app/'
    : window.location.href;

  const shareText = '“දිවි ඇතිතුරු අකුරු මිතුරු” — Create your official customized campaign photo for Wanni Poth Wasanthaya 2026 (Nikaweratiya Pradeshiya Sabha)';

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

  const handleShareClick = async () => {
    soundEffects.playClick();
    if (!canvasRef) {
      setShowShareModal(true);
      return;
    }

    try {
      canvasRef.toBlob(async (blob) => {
        if (blob && navigator.canShare && navigator.canShare({ files: [new File([blob], 'wanni-poth-wasanthaya.png', { type: 'image/png' })] })) {
          const file = new File([blob], 'wanni-poth-wasanthaya.png', { type: 'image/png' });
          await navigator.share({
            title: t.psName,
            text: shareText,
            files: [file]
          });
        } else {
          setShowShareModal(true);
        }
      });
    } catch (e) {
      setShowShareModal(true);
    }
  };

  const copyShareLink = () => {
    soundEffects.playClick();
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
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
        
        {/* Preview Frame Container */}
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

        {/* Action Buttons Section */}
        <div className="mt-6 space-y-4 max-w-md mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => handleDownload('png')}
              className="w-full bg-[#C3094A] hover:bg-[#8B0000] text-white font-semibold text-sm sm:text-base py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 whitespace-nowrap min-h-[48px] active:scale-98"
            >
              <Download className="w-4.5 h-4.5 flex-shrink-0" />
              <span>Download PNG</span>
            </button>

            <button
              onClick={() => handleDownload('jpeg')}
              className="w-full bg-gray-900 hover:bg-black text-white font-semibold text-sm sm:text-base py-3.5 px-4 rounded-xl shadow transition-all flex items-center justify-center space-x-2 whitespace-nowrap min-h-[48px] active:scale-98"
            >
              <Download className="w-4.5 h-4.5 flex-shrink-0" />
              <span>Download JPG</span>
            </button>
          </div>

          <button
            onClick={handleShareClick}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm sm:text-base py-3.5 px-4 rounded-xl shadow transition-all flex items-center justify-center space-x-2 min-h-[48px] active:scale-98"
          >
            <Share2 className="w-5 h-5 flex-shrink-0" />
            <span>Share to Social Media</span>
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

      {/* Fullscreen HD Preview Modal */}
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

      {/* Social Media Sharing Modal */}
      {showShareModal && (
        <div
          onClick={() => setShowShareModal(false)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative border border-gray-200 text-center space-y-6 animate-scale-in cursor-default font-sans"
          >
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#C3094A] uppercase tracking-wider">
                Official Campaign 2026
              </span>
              <h3 className="text-2xl font-bold text-gray-900">
                Share Campaign Photo
              </h3>
              <p className="text-xs text-gray-600 font-normal">
                Choose a social platform or copy link with official preview thumbnail.
              </p>
            </div>

            {/* Generated Photo Thumbnail */}
            {previewDataUrl && (
              <div className="w-36 h-36 mx-auto rounded-2xl overflow-hidden shadow-md border-2 border-gray-200">
                <img src={previewDataUrl} alt="Campaign Share Preview" className="w-full h-full object-cover" />
              </div>
            )}

            {/* Social Share Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              
              {/* WhatsApp */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEffects.playClick()}
                className="py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEffects.playClick()}
                className="py-3 px-4 bg-[#1877F2] hover:bg-[#166fe5] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center space-x-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Facebook</span>
              </a>

              {/* Twitter / X */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEffects.playClick()}
                className="py-3 px-4 bg-black hover:bg-gray-800 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center space-x-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Twitter / X</span>
              </a>

              {/* Copy Link */}
              <button
                onClick={copyShareLink}
                className="py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center space-x-2 border border-gray-200"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-gray-600" />}
                <span>{copiedLink ? 'Copied Link!' : 'Copy Link'}</span>
              </button>

            </div>

            {/* Campaign Slogan Footer */}
            <p className="text-xs font-semibold text-[#C3094A] pt-2 border-t border-gray-100 font-sinhala-serif">
              “දිවි ඇතිතුරු අකුරු මිතුරු” • Nikaweratiya Pradeshiya Sabha
            </p>

          </div>
        </div>
      )}

    </section>
  );
};
