
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
    <section className="relative min-h-screen flex items-center justify-center px-4 py-24 md:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-40 -left-20 w-96 h-96 bg-indigo-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-40 w-80 h-80 bg-cyan-500 rounded-full opacity-10 blur-3xl"></div>
        
        {/* Network grid effect */}
        <div className="absolute inset-0 bg-[url('/media/grid-pattern.svg')] bg-center opacity-20"></div>
      </div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white mb-6 animate-in fade-in-5 duration-1000">
          Your AI Agent for Crypto <br className="hidden md:block" />
          <span className="text-blue-400">Airdrop Research & Farming</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10 animate-in fade-in duration-1000 delay-300">
          Analyze Web3 projects, track airdrops, and automate your farming strategy with AI-powered tools
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-500">
          <Button size="lg" className="font-medium text-base bg-blue-500 hover:bg-blue-600 text-white" onClick={handleGetStarted}>
            Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="font-medium text-base border-white/30 text-white hover:bg-white/10" onClick={toggleVideo}>
            {!showVideo ? (
              <>
                Watch Demo <Play className="ml-2 h-5 w-5" />
              </>
            ) : isVideoPlaying ? (
              <>
                Pause Video <PauseCircle className="ml-2 h-5 w-5" />
              </>
            ) : (
              <>
                Play Video <Play className="ml-2 h-5 w-5" />
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
