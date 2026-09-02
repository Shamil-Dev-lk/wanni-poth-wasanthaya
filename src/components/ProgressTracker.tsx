import React from 'react';
import { ActiveStep } from '../types/frame';
import { Layers, Upload, Eye, Download, Check } from 'lucide-react';
import { Language, translations } from '../utils/translations';
import { soundEffects } from '../utils/soundEffects';

interface ProgressTrackerProps {
  currentStep: ActiveStep;
  onStepClick: (step: ActiveStep) => void;
  language: Language;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  currentStep,
  onStepClick,
  language
}) => {
  const t = translations[language];

  const steps: { id: ActiveStep; label: string; number: string; icon: React.ReactNode }[] = [
    { id: 'frame', number: '01', label: 'Choose Frame', icon: <Layers className="w-4 h-4" /> },
    { id: 'upload', number: '02', label: 'Upload Photo', icon: <Upload className="w-4 h-4" /> },
    { id: 'edit', number: '03', label: 'Preview & Fit', icon: <Eye className="w-4 h-4" /> },
    { id: 'download', number: '04', label: 'Download & Share', icon: <Download className="w-4 h-4" /> }
  ];

  const getStepIndex = (stepId: ActiveStep) => steps.findIndex((s) => s.id === stepId);
  const currentIndex = getStepIndex(currentStep);

  return (
    <div className="w-full bg-white border-y border-gray-200/90 py-16 px-4 sm:px-6 lg:px-8 sticky top-20 z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Heading & Description */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C3094A] font-sans">
            Interactive Photo Creator
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F2937] tracking-tight font-sans">
            Create Your Campaign Photo
          </h2>
          <p className="text-base text-gray-600 font-normal font-sans">
            Choose a frame, upload your photo and create your Wanni Poth Wasanthaya campaign image.
          </p>
        </div>

        {/* Visual Stepper Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, idx) => {
            const isActive = step.id === currentStep;
            const isCompleted = idx < currentIndex;

            return (
              <button
                key={step.id}
                onClick={() => {
                  if (soundEffects.enabled) soundEffects.playClick();
                  if (isCompleted) onStepClick(step.id);
                }}
                disabled={!isCompleted && !isActive}
                className={`flex flex-col items-center p-5 rounded-2xl transition-all border ${
                  isActive
                    ? 'bg-white border-[#C3094A] shadow-md ring-2 ring-[#C3094A]/20 scale-[1.02]'
                    : isCompleted
                    ? 'bg-white border-gray-200 hover:border-gray-300 cursor-pointer'
                    : 'bg-gray-50/60 border-gray-200/60 text-gray-400 cursor-not-allowed'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold mb-2.5 transition-colors font-sans ${
                    isActive
                      ? 'bg-[#C3094A] text-white shadow-xs'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : step.number}
                </div>

                <div className="text-center space-y-1">
                  <div className="text-sm sm:text-base font-semibold text-gray-800 flex items-center justify-center space-x-1.5 font-sans">
                    <span>{step.icon}</span>
                    <span>{step.label}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
