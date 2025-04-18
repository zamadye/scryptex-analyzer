
import { useState } from "react";
import { Globe, ArrowRight } from "@/components/icons";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/cardui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/inputui";

interface AnalyzeFormProps {
  onAnalyze: (projectName: string, projectWebsite: string) => void;
  isAnalyzing: boolean;
}

export function AnalyzeForm({ onAnalyze, isAnalyzing }: AnalyzeFormProps) {
  const [projectName, setProjectName] = useState("");
  const [projectWebsite, setProjectWebsite] = useState("");

  const handleSubmit = () => {
    if (!projectName || !projectWebsite) return;
    onAnalyze(projectName, projectWebsite);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analyze Web3 Project</CardTitle>
        <CardDescription>
          Our AI agent will analyze the project and provide comprehensive insights from multiple sources.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Project Name</label>
            <Input
              placeholder="e.g. Arbitrum, ZKSync"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Website URL</label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="https://example.com"
                className="pl-10"
                value={projectWebsite}
                onChange={(e) => setProjectWebsite(e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          disabled={isAnalyzing || !projectName || !projectWebsite}
          className="w-full sm:w-auto"
        >
          {isAnalyzing ? (
            <>Analyzing Project<span className="ml-2 animate-pulse">...</span></>
          ) : (
            <>Analyze Project<ArrowRight className="ml-2 h-4 w-4" /></>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
