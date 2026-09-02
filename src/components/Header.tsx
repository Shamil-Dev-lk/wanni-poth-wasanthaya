import React, { useState, useEffect } from 'react';
import { Camera, Menu, X } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface HeaderProps {
  onStartClick: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onStartClick,
  onNavigate,
  activeSection = 'hero'
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Automatically turn ON sound effects by default
  useEffect(() => {
    soundEffects.enabled = true;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    soundEffects.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-3 z-50 w-full px-4 sm:px-6 lg:px-8 font-sans transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <div className={`header-floating rounded-2xl px-4 sm:px-6 transition-all duration-300 ${
          isScrolled ? 'shadow-md border-gray-300/80 py-1' : 'py-2'
        }`}>
          <div className="flex items-center justify-between h-16">
            
            {/* Left: Organization Branding */}
            <div
              onClick={() => handleNavClick('hero')}
              className="flex items-center space-x-3 cursor-pointer group flex-shrink-0"
            >
              <img
                src="/assets/ps-emblem.png"
                alt="Nikaweratiya PS Logo"
                className="w-10 h-10 object-contain transition-transform group-hover:scale-105"
              />
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C3094A]">
                  Nikaweratiya PS
                </span>
                <h1 className="text-xs sm:text-sm font-semibold text-[#1F2937] leading-tight tracking-tight whitespace-nowrap">
                  Nikaweratiya Pradeshiya Sabha
                </h1>
              </div>
            </div>

            {/* Center: Navigation Links (Clean, Regular/Medium 400-500 font weight) */}
            <nav className="hidden lg:flex items-center space-x-7 whitespace-nowrap">
              <button
                onClick={() => handleNavClick('hero')}
                className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}
              >
                Home
              </button>

              <button
                onClick={() => handleNavClick('gallery')}
                className={`nav-link ${activeSection === 'gallery' ? 'active' : ''}`}
              >
                Frames
              </button>

              <button
                onClick={() => handleNavClick('campaign-info')}
                className={`nav-link ${activeSection === 'campaign-info' ? 'active' : ''}`}
              >
                Campaign
              </button>

              <button
                onClick={() => handleNavClick('workflow')}
                className={`nav-link ${activeSection === 'workflow' ? 'active' : ''}`}
              >
                How It Works
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
              >
                About
              </button>
            </nav>

            {/* Right: Primary Action CTA Button (NO sound button, NO language switcher bar) */}
            <div className="hidden md:flex items-center space-x-3 whitespace-nowrap flex-shrink-0">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onStartClick();
                }}
                className="btn-primary-red flex items-center space-x-2"
              >
                <Camera className="w-4 h-4" />
                <span>Create Your Photo</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center space-x-2 flex-shrink-0">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="p-2 text-gray-700 hover:text-[#C3094A] rounded-xl focus:outline-none bg-gray-100 border border-gray-200"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-white border border-gray-200 rounded-2xl p-4 space-y-2 shadow-lg animate-fade-in-simple">
          <button
            onClick={() => handleNavClick('hero')}
            className="block w-full text-left py-2 px-3 font-medium text-gray-700 hover:text-[#C3094A] text-sm"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('gallery')}
            className="block w-full text-left py-2 px-3 font-medium text-gray-700 hover:text-[#C3094A] text-sm"
          >
            Frames
          </button>
          <button
            onClick={() => handleNavClick('campaign-info')}
            className="block w-full text-left py-2 px-3 font-medium text-gray-700 hover:text-[#C3094A] text-sm"
          >
            Campaign
          </button>
          <button
            onClick={() => handleNavClick('workflow')}
            className="block w-full text-left py-2 px-3 font-medium text-gray-700 hover:text-[#C3094A] text-sm"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="block w-full text-left py-2 px-3 font-medium text-gray-700 hover:text-[#C3094A] text-sm"
          >
            About
          </button>
          <div className="pt-2 border-t border-gray-100">
            <button
              onClick={() => {
                soundEffects.playClick();
                onStartClick();
                setMobileMenuOpen(false);
              }}
              className="w-full btn-primary-red flex items-center justify-center space-x-2 text-sm"
            >
              <Camera className="w-4 h-4" />
              <span>Create Your Photo</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
