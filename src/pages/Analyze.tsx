
import { useState } from "react";
import { Search, Globe, ArrowRight, FileText, Users, BarChart, RoadMap, Wallet } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/cardui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/inputui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export default function Analyze() {
  const [projectName, setProjectName] = useState("");
  const [projectWebsite, setProjectWebsite] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState("about");

  const handleAnalyze = () => {
    if (!projectName || !projectWebsite) return;
    
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
            onClick={handleAnalyze} 
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

      {isAnalyzing && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6 animate-pulse">
                <Search className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Analyzing {projectName}</h3>
              <p className="text-gray-500 max-w-md">
                Our AI agent is gathering data from multiple sources and analyzing the project details. This might take a few moments.
              </p>
              
              <div className="mt-8 w-full max-w-md space-y-3">
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {showResults && (
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-5">
              <TabsTrigger value="about" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                <span>About</span>
              </TabsTrigger>
              <TabsTrigger value="team" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <span>Team</span>
              </TabsTrigger>
              <TabsTrigger value="tokenomics" className="flex items-center">
                <BarChart className="mr-2 h-4 w-4" />
                <span>Tokenomics</span>
              </TabsTrigger>
              <TabsTrigger value="roadmap" className="flex items-center">
                <RoadMap className="mr-2 h-4 w-4" />
                <span>Roadmap</span>
              </TabsTrigger>
              <TabsTrigger value="backers" className="flex items-center">
                <Wallet className="mr-2 h-4 w-4" />
                <span>Backers</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {projectName}</CardTitle>
                  <CardDescription>
                    Project overview and key details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>
                      Arbitrum is a layer 2 scaling solution for Ethereum that aims to improve the scalability and reduce the transaction costs of the Ethereum network while maintaining its security properties. It uses a technology called Optimistic Rollups to achieve this.
                    </p>
                    <p>
                      Key features of Arbitrum include:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Full Ethereum Virtual Machine (EVM) compatibility, allowing Ethereum developers to deploy their existing smart contracts with minimal changes</li>
                      <li>Significantly lower gas fees compared to Ethereum mainnet</li>
                      <li>Higher transaction throughput while inheriting Ethereum's security</li>
                      <li>Support for all Ethereum tools (MetaMask, Hardhat, Truffle, etc.)</li>
                    </ul>
                    <div className="bg-gray-50 p-4 rounded-lg mt-4">
                      <div className="text-sm text-gray-500 mb-1">Source:</div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">CoinMarketCap, Official Documentation</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="team" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Team Analysis</CardTitle>
                  <CardDescription>
                    Key team members and background
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-20 text-gray-500">
                    <Users className="h-16 w-16 mx-auto mb-4 opacity-40" />
                    <p>Team information will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tokenomics" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tokenomics</CardTitle>
                  <CardDescription>
                    Token distribution and economics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-20 text-gray-500">
                    <BarChart className="h-16 w-16 mx-auto mb-4 opacity-40" />
                    <p>Tokenomics data will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="roadmap" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Roadmap</CardTitle>
                  <CardDescription>
                    Future plans and milestones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-20 text-gray-500">
                    <RoadMap className="h-16 w-16 mx-auto mb-4 opacity-40" />
                    <p>Roadmap information will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="backers" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Backers & Investors</CardTitle>
                  <CardDescription>
                    Investment rounds and key backers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-20 text-gray-500">
                    <Wallet className="h-16 w-16 mx-auto mb-4 opacity-40" />
                    <p>Backer information will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
