
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Play, PauseCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";

export const HeroSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const heroText = [
    { title: t('aiAgentCommandCenter'), subtitle: t('dashboardDescription') },
    { title: t('analyzeAnyProject'), subtitle: t('analyzeProjectDescription') },
    { title: t('automateYourFarming'), subtitle: t('farmingDescription') },
    { title: t('manageAirdropOdds'), subtitle: t('airdropOddsDescription') }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % heroText.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroText.length]);
  
  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      setShowAuthModal(true);
    }
  };
  
  const toggleVideo = () => {
    setShowVideo(true);
    setIsVideoPlaying(!isVideoPlaying);
  };
  
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-white to-blue-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute top-40 -left-20 w-80 h-80 bg-purple-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-20 right-40 w-72 h-72 bg-green-100 rounded-full opacity-30 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="h-28 md:h-36 mb-6 flex items-center justify-center overflow-hidden">
          {heroText.map((text, index) => (
            <h1 
              key={index}
              className={`text-4xl md:text-6xl font-bold leading-tight transition-all duration-700 absolute ${
                index === currentTextIndex 
                  ? "opacity-100 transform-none" 
                  : "opacity-0 translate-y-8"
              }`}
            >
              <span className="text-scryptex-blue">{text.title}</span>
            </h1>
          ))}
        </div>
        
        <div className="h-24 mb-10 flex items-center justify-center overflow-hidden">
          {heroText.map((text, index) => (
            <p 
              key={`subtitle-${index}`}
              className={`text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-700 delay-100 absolute ${
                index === currentTextIndex 
                  ? "opacity-100 transform-none" 
                  : "opacity-0 translate-y-8"
              }`}
            >
              {text.subtitle}
            </p>
          ))}
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
          <Button size="lg" className="font-medium text-base" onClick={handleGetStarted}>
            {t('getStarted')} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="font-medium text-base" onClick={toggleVideo}>
            {!showVideo ? (
              <>
                {t('watchDemo')} <Play className="ml-2 h-5 w-5" />
              </>
            ) : isVideoPlaying ? (
              <>
                {t('pauseVideo')} <PauseCircle className="ml-2 h-5 w-5" />
              </>
            ) : (
              <>
                {t('playVideo')} <Play className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
        
        {showVideo && (
          <div className="mt-12 relative aspect-video max-w-4xl mx-auto shadow-xl rounded-xl overflow-hidden animate-in fade-in duration-500">
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
              <p className="text-white text-xl">Demo video would play here</p>
            </div>
          </div>
        )}
      </div>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </section>
  );
};
