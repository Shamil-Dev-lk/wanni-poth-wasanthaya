import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBenefits } from './components/TrustBenefits';
import { CampaignFeatures } from './components/CampaignFeatures';
import { AboutCampaign } from './components/AboutCampaign';
import { ProgressTracker } from './components/ProgressTracker';
import { FrameGallery } from './components/FrameGallery';
import { UploadZone } from './components/UploadZone';
import { PhotoEditor } from './components/PhotoEditor';
import { LivePreview } from './components/LivePreview';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';
import { AdminFrameManager } from './components/AdminFrameManager';
import { AdminAuthModal } from './components/AdminAuthModal';
import { SuccessModal } from './components/SuccessModal';
import { Toast } from './components/Toast';
import { Frame, ActiveStep } from './types/frame';
import { presetFrames, defaultSamplePreviews } from './data/presetFrames';
import { Language } from './utils/translations';
import { soundEffects } from './utils/soundEffects';

export const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Turn ON sound effects automatically by default
  useEffect(() => {
    soundEffects.enabled = true;
  }, []);

  const [frames, setFrames] = useState<Frame[]>(() => {
    try {
      const saved = localStorage.getItem('nikaweratiya_ps_frames');
      return saved ? JSON.parse(saved) : presetFrames;
    } catch {
      return presetFrames;
    }
  });

  const [samplePreviews, setSamplePreviews] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nikaweratiya_ps_sample_previews');
      return saved ? JSON.parse(saved) : defaultSamplePreviews;
    } catch {
      return defaultSamplePreviews;
    }
  });

  const [selectedFrame, setSelectedFrame] = useState<Frame | null>(presetFrames[0]);
  const [userImage, setUserImage] = useState<HTMLImageElement | null>(null);
  const [activeStep, setActiveStep] = useState<ActiveStep>('frame');
  const [activeComposedCanvas, setActiveComposedCanvas] = useState<HTMLCanvasElement | null>(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('nikaweratiya_ps_frames', JSON.stringify(frames));
    } catch {}
  }, [frames]);

  useEffect(() => {
    try {
      localStorage.setItem('nikaweratiya_ps_sample_previews', JSON.stringify(samplePreviews));
    } catch {}
  }, [samplePreviews]);

  const handleAdminClick = () => {
    if (isAdminView) {
      setIsAdminView(false);
    } else if (isAdmin) {
      setIsAdminView(true);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleAuthenticateAdmin = (pwd: string) => {
    if (pwd === '200611') {
      setIsAdmin(true);
      setIsAdminView(true);
      setShowAuthModal(false);
      setToastMessage('Authenticated as Admin Successfully!');
    } else {
      alert('Incorrect Admin Password!');
    }
  };

  const handleSaveFrames = (updatedFrames: Frame[]) => {
    setFrames(updatedFrames);
    setToastMessage('Frame settings saved successfully!');
  };

  const handleSaveSamplePreviews = (updatedPreviews: string[]) => {
    setSamplePreviews(updatedPreviews);
    setToastMessage('Hero sample previews updated!');
  };

  const handleSelectFrame = (frame: Frame) => {
    setSelectedFrame(frame);
    if (!userImage) {
      setActiveStep('upload');
    } else {
      setActiveStep('edit');
    }
  };

  const handleImageSelected = (img: HTMLImageElement) => {
    setUserImage(img);
    setActiveStep('edit');
  };

  const handleProceedToPreview = (composedCanvas: HTMLCanvasElement) => {
    setActiveComposedCanvas(composedCanvas);
    setActiveStep('download');
  };

  const handleSuccess = () => {
    setShowSuccessModal(true);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1F2937] flex flex-col font-sans selection:bg-[#E31E24] selection:text-white">
      
      <Header
        onStartClick={() => {
          setIsAdminView(false);
          setActiveStep('frame');
          scrollToSection('workflow');
        }}
        onNavigate={(id) => {
          setIsAdminView(false);
          scrollToSection(id);
        }}
        activeSection={activeSection}
      />

      <main className="flex-1">
        {isAdminView ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <AdminFrameManager
              frames={frames}
              onSaveFrames={handleSaveFrames}
              onBackToDashboard={() => setIsAdminView(false)}
              samplePreviews={samplePreviews}
              onSaveSamplePreviews={handleSaveSamplePreviews}
              language={language}
            />
          </div>
        ) : (
          <>
            <Hero
              onStartClick={() => {
                setActiveStep('frame');
                scrollToSection('workflow');
              }}
              onExploreFrames={() => {
                setActiveStep('frame');
                scrollToSection('workflow');
              }}
              samplePreviews={samplePreviews}
              language={language}
            />

            <TrustBenefits />

            <CampaignFeatures />

            <AboutCampaign
              onStartClick={() => {
                setActiveStep('frame');
                scrollToSection('workflow');
              }}
            />

            <div id="workflow" className="scroll-mt-24">
              <ProgressTracker
                currentStep={activeStep}
                onStepClick={(step) => setActiveStep(step)}
                language={language}
              />
            </div>

            <div className="min-h-[500px]">
              {activeStep === 'frame' && (
                <FrameGallery
                  frames={frames}
                  selectedFrame={selectedFrame}
                  onSelectFrame={handleSelectFrame}
                  language={language}
                />
              )}

              {activeStep === 'upload' && selectedFrame && (
                <UploadZone
                  selectedFrame={selectedFrame}
                  onImageSelected={handleImageSelected}
                  onBackToGallery={() => setActiveStep('frame')}
                  onError={(err) => setToastMessage(err)}
                  language={language}
                />
              )}

              {activeStep === 'edit' && selectedFrame && userImage && (
                <PhotoEditor
                  selectedFrame={selectedFrame}
                  userImage={userImage}
                  onGenerate={handleProceedToPreview}
                  onChangePhoto={() => setActiveStep('upload')}
                  onBackToGallery={() => setActiveStep('frame')}
                  language={language}
                />
              )}

              {activeStep === 'download' && selectedFrame && userImage && (
                <LivePreview
                  canvasRef={activeComposedCanvas}
                  selectedFrame={selectedFrame}
                  onBackToEdit={() => setActiveStep('edit')}
                  onNewPhoto={() => {
                    setUserImage(null);
                    setActiveStep('upload');
                  }}
                  onSuccess={handleSuccess}
                  language={language}
                />
              )}
            </div>

            <CallToAction
              onStartClick={() => {
                setActiveStep('frame');
                scrollToSection('workflow');
              }}
              onExploreFrames={() => {
                setActiveStep('frame');
                scrollToSection('workflow');
              }}
            />
          </>
        )}

      </main>

      <Footer onAdminClick={handleAdminClick} language={language} />

      <AdminAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthenticate={handleAuthenticateAdmin}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowAuthModal(false)}
        onDownloadPng={() => {
          if (activeComposedCanvas && selectedFrame) {
            import('./utils/canvasHelper').then((m) =>
              m.downloadCanvasImage(activeComposedCanvas, 'png', `wanni-poth-wasanthaya-${selectedFrame.id}.png`)
            );
          }
        }}
        onDownloadJpg={() => {
          if (activeComposedCanvas && selectedFrame) {
            import('./utils/canvasHelper').then((m) =>
              m.downloadCanvasImage(activeComposedCanvas, 'jpeg', `wanni-poth-wasanthaya-${selectedFrame.id}.jpg`)
            );
          }
        }}
        onNewPhoto={() => {
          setUserImage(null);
          setActiveStep('upload');
        }}
        language={language}
      />

      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

    </div>
  );
};

export default App;
