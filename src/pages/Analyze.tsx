
import { useState } from "react";
import { Search } from "@/components/icons";
import { AnalyzeForm } from "@/components/analyze/AnalyzeForm";
import { AnalysisLoadingState } from "@/components/analyze/AnalysisLoadingState";
import { ProjectAnalysisResults } from "@/components/analyze/ProjectAnalysisResults";

export default function Analyze() {
  const [projectName, setProjectName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = (name: string, website: string) => {
    setProjectName(name);
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analyze Agent</h1>
        <div className="flex items-center space-x-2 text-sm font-medium text-gray-500">
          <Search className="h-4 w-4" />
          <span>Uses 4 credits</span>
        </div>
      </div>

      <AnalyzeForm onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

      {isAnalyzing && <AnalysisLoadingState projectName={projectName} />}

      {showResults && <ProjectAnalysisResults />}
    </div>
  );
}
