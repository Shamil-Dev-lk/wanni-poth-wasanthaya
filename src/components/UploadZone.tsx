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
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      soundEffects.playRejected();
      onError(t.errType);
      return;
    }

    const maxSizeMB = 15;
    if (file.size > maxSizeMB * 1024 * 1024) {
      soundEffects.playRejected();
      onError(t.errSize);
      return;
    }

    soundEffects.playUpload();
    setLoading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setLoading(false);
        onImageSelected(img, file);
      };
      img.onerror = () => {
        setLoading(false);
        soundEffects.playRejected();
        onError(t.errType);
      };
      if (event.target?.result) {
        img.src = event.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => {
            soundEffects.playClick();
            onBackToGallery();
          }}
          className="text-gray-600 hover:text-primary font-semibold text-sm flex items-center space-x-2 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.changeFrame}</span>
        </button>

        <div className="flex items-center space-x-2 bg-primary-soft text-primary text-xs font-bold px-3 py-1.5 rounded-full">
          <span>{t.selectedFrameLabel}: {selectedFrame.name}</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-border">
        <div className="text-center max-w-lg mx-auto mb-8 space-y-2">
          <h2 className="text-3xl font-black text-text">
            {t.uploadTitle}
          </h2>
          <p className="text-sm text-muted">
            {t.uploadSubtitle}
          </p>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => {
            soundEffects.playClick();
            fileInputRef.current?.click();
          }}
          className={`relative border-3 border-dashed rounded-3xl p-8 sm:p-14 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center space-y-4 ${
            isDragging
              ? 'border-primary bg-primary-soft/50 scale-[1.01]'
              : 'border-gray-300 hover:border-primary/60 bg-gray-50/80 hover:bg-white'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                processFile(e.target.files[0]);
              }
            }}
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
          />

          {loading ? (
            <div className="py-8 space-y-3">
              <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
              <p className="text-base font-bold text-primary">{t.processingPhoto}</p>
            </div>
          ) : (
            <>
              <div className="w-20 h-20 rounded-full bg-primary-soft text-primary flex items-center justify-center shadow-inner">
                <Upload className="w-10 h-10 text-primary animate-bounce" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {t.dragDrop}
                </h3>
                <p className="text-xs text-gray-500">{t.orSelect}</p>
              </div>

              <button
                type="button"
                className="bg-primary hover:bg-primary-dark text-white font-bold text-base px-8 py-3.5 rounded-xl shadow transition-all flex items-center space-x-2"
              >
                <Camera className="w-5 h-5" />
                <span>{t.btnSelectPhoto}</span>
              </button>

              <div className="pt-2 text-[11px] text-gray-400 font-medium">
                {t.supportedFormats}
              </div>
            </>
          )}

        </div>

        <div className="mt-6 text-center text-xs text-gray-500 flex items-center justify-center space-x-1.5 bg-gray-50 py-2.5 rounded-xl">
          <FileCheck className="w-4 h-4 text-green-600" />
          <span>{t.privacyNote}</span>
        </div>

      </div>
    </section>
  );
};
