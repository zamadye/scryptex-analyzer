
import { useState } from "react";
import { Search } from "@/components/icons";
import { AnalyzeForm } from "@/components/analyze/AnalyzeForm";
import { AnalysisLoadingState } from "@/components/analyze/AnalysisLoadingState";
import { ProjectAnalysisResults } from "@/components/analyze/ProjectAnalysisResults";
import { useXP } from "@/context/XPContext";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Analyze() {
  const [projectName, setProjectName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { addXP } = useXP();
  const { user, updateUser } = useAuth();
  const { addNotification } = useNotifications();
  const { t } = useLanguage();

  const handleAnalyze = (name: string, website: string) => {
    setProjectName(name);
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      
      // Add XP for analyzing
      addXP(1, `Analyzed ${name}`);
      
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

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('analyze')}</h1>
        <div className="flex items-center space-x-2 text-sm font-medium text-gray-500">
          <Search className="h-4 w-4" />
          <span>{t('uses')} 4 {t('credits')}</span>
        </div>
      </div>

      <AnalyzeForm onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

      {isAnalyzing && <AnalysisLoadingState projectName={projectName} />}

      {showResults && <ProjectAnalysisResults />}
    </div>
  );
}
