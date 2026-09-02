import React from 'react';
import { Camera, Layers, Zap, Download, Smartphone, Gift } from 'lucide-react';

export const CampaignFeatures: React.FC = () => {
  const features = [
    {
      icon: <Camera className="w-5 h-5 text-[#C3094A]" />,
      title: 'Create Your Photo',
      desc: 'Add your photo overlay in seconds.'
    },
    {
      icon: <Layers className="w-5 h-5 text-amber-600" />,
      title: 'Multiple Campaign Frames',
      desc: 'Choose from official 2026 Photoshop frames.'
    },
    {
      icon: <Zap className="w-5 h-5 text-[#C3094A]" />,
      title: 'Instant Creation',
      desc: 'No registration or waiting required.'
    },
    {
      icon: <Download className="w-5 h-5 text-emerald-600" />,
      title: 'Easy Download',
      desc: 'Get lossless PNG or JPG exports.'
    },
    {
      icon: <Smartphone className="w-5 h-5 text-blue-600" />,
      title: 'Mobile Friendly',
      desc: 'Works seamlessly on any smartphone or tablet.'
    },
    {
      icon: <Gift className="w-5 h-5 text-[#C3094A]" />,
      title: '100% Free',
      desc: 'Public service initiative by Nikaweratiya PS.'
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C3094A]">
            Key Platform Highlights
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] tracking-tight">
            Campaign Features
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="bg-[#FAFAFA] border border-gray-200 rounded-2xl p-6 transition-all duration-200 hover:shadow-sm hover:border-[#C3094A]/30 space-y-3"
            >
              <div className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-2xs">
                {f.icon}
              </div>
              <h3 className="text-base font-semibold text-[#1F2937]">{f.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
