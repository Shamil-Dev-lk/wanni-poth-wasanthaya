import React, { useState } from 'react';
import { Frame } from '../types/frame';
import { Check, Sparkles, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { Language, translations } from '../utils/translations';
import { soundEffects } from '../utils/soundEffects';

interface FrameGalleryProps {
  frames: Frame[];
  selectedFrame: Frame | null;
  onSelectFrame: (frame: Frame) => void;
  language: Language;
}

export const FrameGallery: React.FC<FrameGalleryProps> = ({
  frames,
  selectedFrame,
  onSelectFrame,
  language
}) => {
  const t = translations[language];
  const [activeCategory, setActiveCategory] = useState<string>(t.catAll);

  // Guarantee maximum 3 official campaign frames
  const displayFrames = frames.filter((f) => f.enabled).slice(0, 3);

  const categories = [t.catAll, ...Array.from(new Set(displayFrames.map((f) => f.category)))];

  const filteredFrames = activeCategory === t.catAll
    ? displayFrames
    : displayFrames.filter((f) => f.category === activeCategory);

  const handleFrameClick = (frame: Frame) => {
    if (soundEffects.enabled) soundEffects.playFrameSelect();
    onSelectFrame(frame);
  };

  return (
    <section id="gallery" className="py-20 bg-[#FAFAFA] border-b border-gray-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C3094A] font-sans">
            Official Campaign Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F2937] tracking-tight font-sans">
            Choose Your Campaign Frame
          </h2>
          <p className="text-gray-600 text-base sm:text-lg font-normal font-sans">
            Select an official campaign frame to create your personalized photo.
          </p>
        </div>

        {/* Category Pills */}
        {categories.length > 2 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  if (soundEffects.enabled) soundEffects.playClick();
                  setActiveCategory(cat);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all font-sans ${
                  activeCategory === cat
                    ? 'bg-[#C3094A] text-white shadow-xs'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {filteredFrames.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300 max-w-md mx-auto">
            <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-800">{t.noFrames}</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {filteredFrames.map((frame) => {
              const isSelected = selectedFrame?.id === frame.id;

              return (
                <div
                  key={frame.id}
                  onClick={() => handleFrameClick(frame)}
                  className={`group bg-white rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 ${
                    isSelected
                      ? 'border-[#C3094A] ring-4 ring-[#C3094A]/20 shadow-md scale-[1.01]'
                      : 'border-gray-200 hover:border-[#C3094A]/40'
                  }`}
                >
                  {/* Frame Image Viewport */}
                  <div className="relative aspect-square bg-[#FAFAFA] overflow-hidden flex items-center justify-center p-4 border-b border-gray-100">
                    {frame.badge ? (
                      <span className="absolute top-3 left-3 z-10 bg-[#C3094A] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs flex items-center space-x-1 font-sans">
                        <Sparkles className="w-3 h-3 text-[#FFD400]" />
                        <span>{frame.badge}</span>
                      </span>
                    ) : (
                      <span className="absolute top-3 left-3 z-10 bg-amber-100 text-amber-900 border border-amber-300/80 text-[10px] font-bold px-2 py-0.5 rounded-full font-sans">
                        2026
                      </span>
                    )}

                    {isSelected && (
                      <div className="absolute top-3 right-3 z-10 bg-[#C3094A] text-white p-1.5 rounded-full shadow-md">
                        <Check className="w-4 h-4" />
                      </div>
                    )}

                    <img
                      src={frame.image}
                      alt={frame.name}
                      className="w-full h-full object-contain filter drop-shadow-xs group-hover:scale-102 transition-transform duration-300"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between bg-white space-y-4 font-sans">
                    <div>
                      <div className="flex items-center justify-between text-xs font-normal text-gray-500 mb-1">
                        <span>Official 2026 Frame</span>
                        <span className="text-[10px] bg-gray-100 text-gray-700 font-semibold px-2 py-0.5 rounded">
                          1080×1080 HD
                        </span>
                      </div>

                      <h3 className="text-base font-semibold text-[#1F2937] group-hover:text-[#C3094A] transition-colors leading-snug">
                        {frame.name}
                      </h3>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFrameClick(frame);
                      }}
                      className={`w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center space-x-2 ${
                        isSelected
                          ? 'bg-[#C3094A] text-white shadow-xs'
                          : 'bg-red-50 hover:bg-[#C3094A] text-[#C3094A] hover:text-white'
                      }`}
                    >
                      <span>{isSelected ? 'Selected' : 'Use This Frame'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
