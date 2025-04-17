
import { useState, useEffect } from "react";
import { BarChart3, ExternalLink, AlertCircle, Check, ChevronRight, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/inputui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cardui";
import { FetcherButtons } from "@/components/analyze/FetcherButtons";
import { FetcherOutput } from "@/components/analyze/FetcherOutput";
import { useToast } from "@/hooks/use-toast";
import { CreditManager } from "@/components/common/CreditPanel";
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Tooltip
} from "recharts";

type FetcherType = "tokenomics" | "roadmap" | "backers" | "social" | "airdrop" | null;

interface ProjectAnalysis {
  name: string;
  description: string;
  aiScore: number;
  vcBackers: { name: string; logo: string }[];
  tokenomics: { name: string; value: number; color: string }[];
}

const Analyze = () => {
  const { toast } = useToast();
  const [projectName, setProjectName] = useState("");
  const [projectWebsite, setProjectWebsite] = useState("");
  const [projectChain, setProjectChain] = useState("");
  const [projectTwitter, setProjectTwitter] = useState("");
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ProjectAnalysis | null>(null);
  const [activeFetcher, setActiveFetcher] = useState<FetcherType>(null);
  const [isFetcherLoading, setIsFetcherLoading] = useState(false);

  // Handle analyze button click
  const handleAnalyze = () => {
    if (!projectName || !projectWebsite || !projectChain) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before analyzing.",
        variant: "destructive",
      });
      return;
    }

    // Try to use a credit
    if (!CreditManager.useCredit(1)) {
      toast({
        title: "Insufficient Credits",
        description: "You don't have enough credits to perform this action.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setActiveFetcher(null);

    // Simulate API call with setTimeout
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        name: projectName,
        description: 
          `${projectName} is a decentralized protocol built on ${projectChain} that enables seamless cross-chain liquidity for DeFi users. The protocol utilizes advanced algorithms and secure bridges to facilitate faster and cheaper transactions while maintaining high security standards. The team consists of experienced blockchain developers with backgrounds at major crypto projects.`,
        aiScore: Math.floor(Math.random() * 41) + 60, // Random score between 60-100
        vcBackers: getDummyVcBackers(),
        tokenomics: getDummyTokenomics(),
      });
      
      toast({
        title: "Analysis Complete",
        description: `${projectName} has been successfully analyzed.`,
      });
    }, 2000);
  };

  // Handle fetcher button selection
  const handleFetcherSelect = (fetcher: FetcherType) => {
    setActiveFetcher(fetcher);
    setIsFetcherLoading(true);
    
    // Simulate loading time
    setTimeout(() => {
      setIsFetcherLoading(false);
    }, 1500);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Project Analysis</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Get comprehensive insights into any crypto project with our AI-powered analysis.
        </p>
      </div>

      <Card className="mb-10 animate-in fade-in duration-300">
        <CardHeader>
          <CardTitle>Enter Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
              <Input 
                id="projectName"
                placeholder="e.g. Uniswap, Arbitrum" 
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="projectWebsite" className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <Input 
                id="projectWebsite"
                placeholder="e.g. https://uniswap.org" 
                value={projectWebsite}
                onChange={(e) => setProjectWebsite(e.target.value)}
                className="w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="projectChain" className="block text-sm font-medium text-gray-700 mb-1">Blockchain</label>
              <Input 
                id="projectChain"
                placeholder="e.g. Ethereum, Solana" 
                value={projectChain}
                onChange={(e) => setProjectChain(e.target.value)}
                className="w-full"
                required
              />
            </div>
            
            <div>
              <label htmlFor="projectTwitter" className="block text-sm font-medium text-gray-700 mb-1">Twitter (Optional)</label>
              <Input 
                id="projectTwitter"
                placeholder="e.g. @Uniswap" 
                value={projectTwitter}
                onChange={(e) => setProjectTwitter(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button 
              onClick={handleAnalyze}
              disabled={!projectName || !projectWebsite || !projectChain || isAnalyzing}
              className="bg-scryptex-blue hover:bg-scryptex-dark text-white px-8"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Project"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {isAnalyzing && (
        <div className="flex justify-center items-center py-16 animate-in fade-in duration-300">
          <div className="text-center">
            <Loader2 className="h-12 w-12 text-scryptex-blue animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Analyzing {projectName}...</h3>
            <p className="text-gray-600">
              Our AI is scanning on-chain data, social media, and other sources.
            </p>
          </div>
        </div>
      )}

      {analysisResult && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <Card className="overflow-hidden">
            <CardHeader className="bg-gray-50">
              <div className="flex justify-between items-center">
                <CardTitle>{analysisResult.name}</CardTitle>
                <Badge variant="outline" className="border-scryptex-blue text-scryptex-blue">
                  {projectChain}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold mb-3">Project Overview</h3>
                  <p className="text-gray-700">{analysisResult.description}</p>
                  
                  <h3 className="text-lg font-semibold mt-8 mb-3">VC Backers</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {analysisResult.vcBackers.map((backer, index) => (
                      <div key={index} className="flex items-center border rounded-lg p-3">
                        <div className="w-8 h-8 mr-3 flex-shrink-0">
                          <img src={backer.logo} alt={backer.name} className="h-full w-full" />
                        </div>
                        <span className="font-medium text-sm">{backer.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="border rounded-xl p-6 text-center mb-6">
                    <h3 className="text-lg font-semibold mb-1">AI Score</h3>
                    <div className={`text-5xl font-bold ${getScoreColor(analysisResult.aiScore)}`}>
                      {analysisResult.aiScore}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Based on team, tech, tokenomics, and market fit
                    </p>
                  </div>
                  
                  <div className="border rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4 text-center">Tokenomics</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={analysisResult.tokenomics}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {analysisResult.tokenomics.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value) => [`${value}%`, 'Allocation']}
                            itemStyle={{ color: "#3366FF" }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {analysisResult.tokenomics.map((item, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span>{item.name}: {item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Fetcher Buttons Section */}
          <div className="animate-in fade-in slide-in-from-bottom duration-300">
            <h3 className="text-xl font-semibold mb-4">Explore More Details</h3>
            <FetcherButtons 
              onFetcherSelect={handleFetcherSelect}
              activeFetcher={activeFetcher}
              isLoading={isFetcherLoading}
            />
            
            {/* Fetcher Output */}
            <FetcherOutput 
              type={activeFetcher}
              onBack={() => setActiveFetcher(null)}
              projectName={projectName}
            />
          </div>
          
          <div className="flex justify-center">
            <Button className="bg-scryptex-blue hover:bg-scryptex-dark text-white">
              View Detailed Report
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

// Dummy data functions
function getDummyVcBackers() {
  return [
    { name: "Paradigm", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg" },
    { name: "a16z", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg" },
    { name: "Binance Labs", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg" },
    { name: "Dragonfly", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg" },
  ];
}

function getDummyTokenomics() {
  return [
    { name: "Team", value: 15, color: "#3366FF" },
    { name: "Investors", value: 20, color: "#66A1FF" },
    { name: "Community", value: 40, color: "#99C5FF" },
    { name: "Treasury", value: 10, color: "#CCE5FF" },
    { name: "Advisors", value: 15, color: "#0047CC" },
  ];
}

export default Analyze;
