import React from 'react';
import { ShieldCheck, Image, Zap } from 'lucide-react';

export const TrustBenefits: React.FC = () => {
  const benefits = [
    {
      title: '100% FREE',
      description: 'Create your campaign photo for free.',
      icon: <ShieldCheck className="w-5 h-5 text-[#C3094A]" />,
      delay: '0ms'
    },
    {
      title: 'HD QUALITY',
      description: 'Download a high-quality campaign image.',
      icon: <Image className="w-5 h-5 text-amber-600" />,
      delay: '150ms'
    },
    {
      title: 'INSTANT DOWNLOAD',
      description: 'Create your photo quickly.',
      icon: <Zap className="w-5 h-5 text-[#C3094A]" />,
      delay: '300ms'
    }
  ];

  return (
    <section className="py-12 bg-[#FAFAFA] border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              style={{ animationDelay: b.delay }}
              className="bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-[#C3094A]/40 flex items-center space-x-4 animate-fade-up"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50/70 border border-red-100 flex items-center justify-center flex-shrink-0 shadow-2xs">
                {b.icon}
              </div>
              <div>
                <h3 className="text-xs font-semibold tracking-wider uppercase text-[#C3094A] font-sans">
                  {b.title}
                </h3>
                <p className="text-sm font-normal text-gray-700 mt-0.5 font-sans">
                  {b.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
