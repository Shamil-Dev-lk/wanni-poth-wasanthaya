import React, { useState, useEffect, useRef } from 'react';
import { Frame } from '../types/frame';
import { renderCanvasComposition } from '../utils/canvasHelper';
import { ZoomIn, ZoomOut, RotateCcw, Image as ImageIcon, ArrowLeft, Lock, Sparkles, CheckCircle, Maximize2 } from 'lucide-react';
import { Language, translations } from '../utils/translations';
import { soundEffects } from '../utils/soundEffects';

interface PhotoEditorProps {
  selectedFrame: Frame;
  userImage: HTMLImageElement;
  onGenerate: (canvas: HTMLCanvasElement) => void;
  onChangePhoto: () => void;
  onBackToGallery: () => void;
  language: Language;
}

export const PhotoEditor: React.FC<PhotoEditorProps> = ({
  selectedFrame,
  userImage,
  onGenerate,
  onChangePhoto,
  onBackToGallery,
  language
}) => {
  const t = translations[language];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameImgRef = useRef<HTMLImageElement | null>(null);
  const [frameLoaded, setFrameLoaded] = useState(false);

  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const frameImg = new Image();
    frameImg.crossOrigin = 'anonymous';
    frameImg.src = selectedFrame.image;
    frameImg.onload = () => {
      frameImgRef.current = frameImg;
      setFrameLoaded(true);
    };
  }, [selectedFrame]);

  useEffect(() => {
    if (canvasRef.current && frameLoaded && frameImgRef.current) {
      renderCanvasComposition(
        canvasRef.current,
        userImage,
        frameImgRef.current,
        selectedFrame.photoArea,
        { panX, panY, zoom },
        1080
      );
    }
  }, [selectedFrame, userImage, zoom, panX, panY, frameLoaded]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanX(e.clientX - dragStart.x);
    setPanY(e.clientY - dragStart.y);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Mobile Touch Pan Gesture Handling
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - panX,
        y: e.touches[0].clientY - panY
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1) {
      setPanX(e.touches[0].clientX - dragStart.x);
      setPanY(e.touches[0].clientY - dragStart.y);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleReset = () => {
    soundEffects.playClick();
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  const handleGenerateImage = () => {
    if (canvasRef.current) {
      soundEffects.playSuccess();
      onGenerate(canvasRef.current);
    }
  };

  return (
    <section className="py-8 lg:py-12 max-w-5xl mx-auto px-4 sm:px-6 pb-28 lg:pb-12 font-sans">
      
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
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

        <div className="text-center sm:text-right space-y-0.5">
          <h2 className="text-2xl font-bold text-gray-900">
            {t.adjustTitle}
          </h2>
          <p className="text-xs text-gray-500 font-normal">
            Drag photo to reposition • Pinch or slide to zoom
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Editor Viewport */}
        <div className="lg:col-span-8 flex flex-col items-center">
          <div className="relative w-full max-w-[540px] aspect-square bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-white select-none touch-none cursor-move">
            
            {/* Top Indicator */}
            <div className="absolute top-3 left-3 z-20 bg-black/75 text-white text-[11px] font-medium px-3 py-1 rounded-full backdrop-blur-md flex items-center space-x-1.5 pointer-events-none">
              <Lock className="w-3.5 h-3.5 text-[#FFD400]" />
              <span>Touch & Drag Photo Underneath</span>
            </div>

            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="w-full h-full object-contain block"
            />
          </div>

          <div className="mt-3 text-xs text-gray-500 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>High-definition 1080×1080 canvas renderer</span>
          </div>
        </div>

        {/* Desktop Controls Sidebar */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-gray-200 shadow-md space-y-6">
          <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center space-x-2">
            <span>Mobile Photo Controls</span>
          </h3>

          {/* Zoom Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
              <span className="flex items-center space-x-1">
                <ZoomIn className="w-4 h-4 text-[#C3094A]" />
                <span>Zoom Level: {Math.round(zoom * 100)}%</span>
              </span>
              <button
                onClick={handleReset}
                className="text-[#C3094A] hover:underline text-[11px] font-semibold"
              >
                Reset
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <ZoomOut
                className="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#C3094A]"
                onClick={() => {
                  soundEffects.playClick();
                  setZoom((z) => Math.max(z - 0.1, 0.5));
                }}
              />
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#C3094A]"
              />
              <ZoomIn
                className="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#C3094A]"
                onClick={() => {
                  soundEffects.playClick();
                  setZoom((z) => Math.min(z + 0.1, 2.5));
                }}
              />
            </div>
          </div>

          {/* Quick Action Presets */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleReset}
              className="py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-xl flex items-center justify-center space-x-1.5 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Position</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                onChangePhoto();
              }}
              className="py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-xl flex items-center justify-center space-x-1.5 transition-all"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Change Photo</span>
            </button>
          </div>

          {/* Primary Action Button */}
          <div className="pt-4 border-t border-gray-100">
            <button
              onClick={handleGenerateImage}
              className="w-full bg-[#C3094A] hover:bg-[#8B0000] text-white font-semibold text-base py-3.5 rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Generate Image</span>
            </button>
          </div>
        </div>

      </div>

      {/* Fixed Sticky Mobile Action Bar (Easy 1-Tap Mobile Experience) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-gray-200 p-3 shadow-2xl flex items-center justify-between space-x-3">
        <button
          onClick={handleReset}
          className="p-2.5 bg-gray-100 text-gray-700 rounded-xl text-xs font-semibold flex flex-col items-center justify-center min-w-[54px]"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Reset</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playClick();
            onChangePhoto();
          }}
          className="p-2.5 bg-gray-100 text-gray-700 rounded-xl text-xs font-semibold flex flex-col items-center justify-center min-w-[54px]"
        >
          <ImageIcon className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Change</span>
        </button>

        <button
          onClick={handleGenerateImage}
          className="flex-1 py-3 bg-[#C3094A] text-white font-semibold text-sm rounded-xl shadow-md flex items-center justify-center space-x-2 active:scale-98"
        >
          <CheckCircle className="w-4.5 h-4.5" />
          <span>Generate Image</span>
        </button>
      </div>

    </section>
  );
};
