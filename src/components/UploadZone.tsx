import React, { useState, useRef } from 'react';
import { Upload, Camera, FileCheck, ArrowLeft, Loader2 } from 'lucide-react';
import { Frame } from '../types/frame';
import { Language, translations } from '../utils/translations';
import { soundEffects } from '../utils/soundEffects';

interface UploadZoneProps {
  selectedFrame: Frame;
  onImageSelected: (image: HTMLImageElement, file: File) => void;
  onBackToGallery: () => void;
  onError: (msg: string) => void;
  language: Language;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  selectedFrame,
  onImageSelected,
  onBackToGallery,
  onError,
  language
}) => {
  const t = translations[language];
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    // Mobile file type validation (allow image/*, empty type for iOS camera uploads, and standard formats)
    const isImageType = !file.type || file.type.startsWith('image/') || /\.(jpg|jpeg|png|webp|heic|heif)$/i.test(file.name);
    
    if (!isImageType) {
      soundEffects.playRejected();
      onError(t.errType);
      return;
    }

    const maxSizeMB = 25; // High-res mobile camera support up to 25MB
    if (file.size > maxSizeMB * 1024 * 1024) {
      soundEffects.playRejected();
      onError(t.errSize);
      return;
    }

    soundEffects.playUpload();
    setLoading(true);

    // Fast Object URL loading for mobile browsers
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    
    img.onload = () => {
      setLoading(false);
      onImageSelected(img, file);
      // Clean up object URL after load
      setTimeout(() => URL.revokeObjectURL(objectUrl), 2000);
    };

    img.onerror = () => {
      // Fallback to FileReader if Object URL fails
      const reader = new FileReader();
      reader.onload = (event) => {
        const fallbackImg = new Image();
        fallbackImg.onload = () => {
          setLoading(false);
          onImageSelected(fallbackImg, file);
        };
        fallbackImg.onerror = () => {
          setLoading(false);
          soundEffects.playRejected();
          onError(t.errType);
        };
        if (event.target?.result) {
          fallbackImg.src = event.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    };

    img.src = objectUrl;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <section className="py-8 sm:py-12 max-w-4xl mx-auto px-4 sm:px-6 font-sans">
      
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <button
          onClick={() => {
            soundEffects.playClick();
            onBackToGallery();
          }}
          className="text-gray-600 hover:text-[#C3094A] font-semibold text-sm flex items-center space-x-2 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-2xs transition-all w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.changeFrame}</span>
        </button>

        <div className="flex items-center space-x-2 bg-red-50 text-[#C3094A] text-xs font-semibold px-3.5 py-1.5 rounded-full border border-red-200">
          <span>{t.selectedFrameLabel}: {selectedFrame.name}</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-200">
        
        <div className="text-center max-w-lg mx-auto mb-6 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {t.uploadTitle}
          </h2>
          <p className="text-sm text-gray-600 font-normal">
            {t.uploadSubtitle}
          </p>
        </div>

        {/* Upload Container Zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => {
            soundEffects.playClick();
            if (fileInputRef.current) {
              fileInputRef.current.value = ''; // Reset value so re-selecting same photo triggers onChange
              fileInputRef.current.click();
            }
          }}
          className={`relative border-2 border-dashed rounded-3xl p-6 sm:p-12 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center space-y-4 ${
            isDragging
              ? 'border-[#C3094A] bg-red-50/50 scale-[1.01]'
              : 'border-gray-300 hover:border-[#C3094A]/60 bg-gray-50/80 hover:bg-white'
          }`}
        >
          {/* Universal Mobile Image Input (accept="image/*" for iPhone Camera + Gallery) */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,.jpg,.jpeg,.png,.webp,.heic,.heif"
            className="hidden"
          />

          {loading ? (
            <div className="py-8 space-y-3">
              <Loader2 className="w-12 h-12 text-[#C3094A] animate-spin mx-auto" />
              <p className="text-base font-semibold text-[#C3094A]">{t.processingPhoto}</p>
            </div>
          ) : (
            <>
              <div className="w-20 h-20 rounded-full bg-red-50 text-[#C3094A] flex items-center justify-center shadow-inner">
                <Upload className="w-10 h-10 text-[#C3094A] animate-bounce" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {t.dragDrop}
                </h3>
                <p className="text-xs text-gray-500 font-normal">{t.orSelect}</p>
              </div>

              <button
                type="button"
                className="bg-[#C3094A] hover:bg-[#8B0000] text-white font-semibold text-base px-8 py-3.5 rounded-xl shadow transition-all flex items-center space-x-2 active:scale-98"
              >
                <Camera className="w-5 h-5" />
                <span>{t.btnSelectPhoto}</span>
              </button>

              <div className="pt-2 text-[11px] text-gray-400 font-normal">
                Supported Formats: Camera Photo • JPG • PNG • WebP • HEIC (Max 25MB)
              </div>
            </>
          )}

        </div>

        <div className="mt-6 text-center text-xs text-gray-500 flex items-center justify-center space-x-1.5 bg-gray-50 py-2.5 rounded-xl">
          <FileCheck className="w-4 h-4 text-emerald-600" />
          <span>{t.privacyNote}</span>
        </div>

      </div>
    </section>
  );
};
