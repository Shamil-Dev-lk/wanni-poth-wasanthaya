import React, { useState, useEffect } from 'react';
import { Camera, Layers, Sparkles, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Language, translations } from '../utils/translations';
import { soundEffects } from '../utils/soundEffects';

interface HeroProps {
  onStartClick: () => void;
  onExploreFrames: () => void;
  samplePreviews: string[];
  language?: Language;
}

export const Hero: React.FC<HeroProps> = ({
  onStartClick,
  onExploreFrames,
  samplePreviews,
  language = 'en'
}) => {
  const t = translations[language];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide effect every 3 seconds
  useEffect(() => {
    if (samplePreviews.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % samplePreviews.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [samplePreviews, isHovered]);

  const handleNext = () => {
    soundEffects.playClick();
    setCurrentIndex((prev) => (prev + 1) % samplePreviews.length);
  };

  const handlePrev = () => {
    soundEffects.playClick();
    setCurrentIndex((prev) => (prev - 1 + samplePreviews.length) % samplePreviews.length);
  };

  const handleDotClick = (idx: number) => {
    soundEffects.playClick();
    setCurrentIndex(idx);
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-white pt-8 pb-16 lg:py-20 border-b border-gray-200/60 font-sans">
      
      {/* NPP Abstract Ambient Radial Glows */}
      <div className="ambient-blob-red" />
      <div className="ambient-blob-yellow" />

      {/* Abstract Flowing Curve SVG Layer */}
      <div className="npp-curve-layer">
        <svg viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
          <path d="M-100 200 C300 400, 700 100, 1540 350 L1540 -100 L-100 -100 Z" fill="url(#nppRedGradient)" opacity="0.05" />
          <path d="M-100 350 C450 150, 950 450, 1540 200" stroke="#FFD400" strokeWidth="2" opacity="0.15" strokeDasharray="6 6" />
          <defs>
            <linearGradient id="nppRedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C3094A" />
              <stop offset="100%" stopColor="#8B0000" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Campaign Info */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Small Badge */}
            <div className="inline-flex items-center space-x-2 bg-red-50 text-[#C3094A] border border-red-200/80 rounded-full px-4 py-1.5 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C3094A] animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase font-sans">
                NIKAWERATIYA PRADESHIYA SABHA
              </span>
            </div>

            {/* Main Campaign Title */}
            <div className="space-y-3">
              <div className="flex justify-center lg:justify-start">
                <img
                  src="/assets/wanni-title-logo.png"
                  alt="වන්නි පොත් වසන්තය"
                  className="h-20 sm:h-24 md:h-28 lg:h-32 object-contain filter drop-shadow-2xs"
                />
              </div>

              {/* Slogan */}
              <h2 className="font-sinhala-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1F2937] tracking-normal pt-1">
                “දිවි ඇතිතුරු අකුරු මිතුරු”
              </h2>
            </div>

            {/* Description */}
            <p className="font-sinhala-sans text-gray-600 text-base sm:text-lg md:text-xl font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Create your campaign photo and share the spirit of reading with the Wanni Poth Wasanthaya initiative by Nikaweratiya Pradeshiya Sabha.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onStartClick();
                }}
                className="btn-primary-red w-full sm:w-auto flex items-center justify-center space-x-2.5 group"
              >
                <Camera className="w-4.5 h-4.5 group-hover:rotate-12 transition-transform" />
                <span>Create Your Photo</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  onExploreFrames();
                }}
                className="btn-secondary-outlined w-full sm:w-auto flex items-center justify-center space-x-2"
              >
                <Layers className="w-4.5 h-4.5" />
                <span>Browse Frames</span>
              </button>
            </div>

          </div>

          {/* Right Column: Sliding Sample Images Card */}
          <div className="lg:col-span-5 flex justify-center relative">
            
            {/* Ambient Floating Circles */}
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-red-100/60 rounded-full blur-xs pointer-events-none animate-float-slow" />
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-amber-100/70 rounded-full blur-xs pointer-events-none animate-float-delay" />

            <div className="relative w-full max-w-md">
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative bg-white border border-gray-200/90 rounded-3xl p-5 shadow-xl space-y-4 animate-float-slow"
              >
                
                {/* Card Header */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center space-x-2.5">
                    <img
                      src="/assets/ps-emblem.png"
                      alt="Nikaweratiya PS Emblem"
                      className="w-8 h-8 object-contain"
                    />
                    <div>
                      <h3 className="text-xs font-semibold text-gray-900 font-sans">Official Campaign Gallery</h3>
                      <p className="text-[10px] text-gray-500 font-normal font-sans">Nikaweratiya Pradeshiya Sabha</p>
                    </div>
                  </div>

                  <span className="bg-amber-100 text-amber-900 border border-amber-300/80 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1 font-sans">
                    <Sparkles className="w-3 h-3 text-[#FFD400]" />
                    <span>2026</span>
                  </span>
                </div>

                {/* Sliding Image Viewport */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 shadow-inner group">
                  
                  {/* Sliding Container */}
                  <div
                    className="flex w-full h-full transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {samplePreviews.map((imgSrc, idx) => (
                      <div key={idx} className="w-full h-full flex-shrink-0 relative">
                        <img
                          src={imgSrc}
                          alt={`Official Campaign Sample ${idx + 1}`}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Previous / Next Arrow Controls */}
                  {samplePreviews.length > 1 && (
                    <>
                      <button
                        onClick={handlePrev}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-[#C3094A] text-white p-2 rounded-full backdrop-blur-md transition-all shadow-md active:scale-95"
                        title="Previous Sample"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <button
                        onClick={handleNext}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-[#C3094A] text-white p-2 rounded-full backdrop-blur-md transition-all shadow-md active:scale-95"
                        title="Next Sample"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  {/* Indicator Counter Badge */}
                  <div className="absolute bottom-2.5 right-2.5 z-20 bg-black/75 text-white text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-md font-sans">
                    Sample 0{currentIndex + 1} / 0{samplePreviews.length}
                  </div>
                </div>

                {/* Clickable Pagination Dots */}
                {samplePreviews.length > 1 && (
                  <div className="flex justify-center items-center space-x-2 pt-1">
                    {samplePreviews.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDotClick(idx)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          idx === currentIndex
                            ? 'w-7 bg-[#C3094A]'
                            : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                        }`}
                        title={`Go to Sample ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Card Action Button */}
                <div className="pt-1">
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      onStartClick();
                    }}
                    className="w-full py-2.5 bg-[#C3094A] hover:bg-[#8B0000] text-white font-semibold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-2 font-sans"
                  >
                    <span>Use This Frame</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
