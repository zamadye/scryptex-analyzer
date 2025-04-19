
import { useState, useEffect } from "react";
import { Search } from "@/components/icons";
import { AnalyzeForm } from "@/components/analyze/AnalyzeForm";
import { AnalysisLoadingState } from "@/components/analyze/AnalysisLoadingState";
import { ProjectAnalysisResults } from "@/components/analyze/ProjectAnalysisResults";
import { useXP } from "@/context/XPContext";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";
import { useLanguage } from "@/context/LanguageContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { FetcherButtons } from "@/components/analyze/FetcherButtons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/cardui";

export default function Analyze() {
  const [projectName, setProjectName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeFetcher, setActiveFetcher] = useState<"tokenomics" | "roadmap" | "backers" | "social" | "airdrop" | null>(null);
  
  const { addXP } = useXP();
  const { user, updateUser, isLoggedIn } = useAuth();
  const { addNotification } = useNotifications();
  const { t } = useLanguage();

  useEffect(() => {
    // Reset states when login status changes
    if (!isLoggedIn) {
      setShowResults(false);
      setIsAnalyzing(false);
    }
  }, [isLoggedIn]);

  const handleAnalyze = (name: string, website: string) => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    
    setProjectName(name);
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      setActiveFetcher("tokenomics");
      
      // Add XP for analyzing
      addXP(5, `Analyzed ${name}`);
      
      // Add to analyzed projects
      if (user) {
        const updatedProjects = [...(user.analyzedProjects || [])];
        if (!updatedProjects.includes(name)) {
          updatedProjects.push(name);
          updateUser({ analyzedProjects: updatedProjects });
        }
      }
      
      // Add notification
      addNotification({
        title: t('projectAnalyzed'),
        message: `${name} has been successfully analyzed.`,
        type: 'success'
      });
    }, 2500);
  };

  const handleFetcherSelect = (fetcher: "tokenomics" | "roadmap" | "backers" | "social" | "airdrop" | null) => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    
    if (!showResults) return;
    
    setActiveFetcher(fetcher);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('analyze')}</h1>
        <div className="flex items-center space-x-2 text-sm font-medium text-gray-500">
          <Search className="h-4 w-4" />
          <span>{t('uses')} 4 {t('credits')}</span>
        </div>
      </div>

      {!isLoggedIn && !showResults && (
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Unlock AI-Powered Project Analysis</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Deep dive into any Web3 project to understand the tokenomics, team, backers, and airdrop potential. Login to use this feature.
          </p>
          <Button onClick={() => setShowAuthModal(true)}>
            Login to Continue
          </Button>
        </Card>
      )}

      {(isLoggedIn || showResults) && (
        <>
          <AnalyzeForm onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

          {isAnalyzing && <AnalysisLoadingState projectName={projectName} />}

          {showResults && (
            <>
              <FetcherButtons 
                onFetcherSelect={handleFetcherSelect} 
                activeFetcher={activeFetcher} 
                isLoading={false} 
              />
              <ProjectAnalysisResults activeFetcher={activeFetcher} />
            </>
          )}
        </>
      )}

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
}
