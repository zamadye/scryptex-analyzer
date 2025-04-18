
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/cardui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/inputui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Twitter, Send, CalendarDays } from "lucide-react";

export default function TwitterAgent() {
  const [projectName, setProjectName] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = () => {
    if (!projectName || !twitterHandle) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  // Sample tweet drafts
  const tweetDrafts = [
    {
      id: 1,
      content: "Just explored the @OptimismFND ecosystem and I'm impressed by their scaling solutions! The transaction speed is incredible while maintaining Ethereum security. #Optimism #Blockchain #Layer2",
      schedule: "Today, 5:00 PM",
      engagement: "High"
    },
    {
      id: 2,
      content: "Have you tried @OptimismFND's latest testnet update? Their commitment to decentralization while scaling Ethereum is setting new standards for L2s. #Web3 #Optimism",
      schedule: "Tomorrow, 10:00 AM",
      engagement: "Medium"
    },
    {
      id: 3,
      content: "Following @OptimismFND's growth has been exciting! Their token economics and governance model is something every Web3 enthusiast should study. Truly innovative approach to scaling. #Optimism #DeFi",
      schedule: "Thursday, 2:30 PM",
      engagement: "High"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Twitter Agent</h1>
        <div className="flex items-center space-x-2 text-sm font-medium text-gray-500">
          <Clock className="h-4 w-4" />
          <span>Uses 4 credits</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate Twitter Content</CardTitle>
          <CardDescription>
            Our AI will analyze the project and create engaging tweet drafts optimized for crypto Twitter.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Name</label>
              <Input
                placeholder="e.g. Optimism, Arbitrum"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Twitter Handle</label>
              <Input
                placeholder="e.g. @OptimismFND"
                value={twitterHandle}
                onChange={(e) => setTwitterHandle(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleAnalyze} 
            disabled={isAnalyzing || !projectName || !twitterHandle}
            className="w-full sm:w-auto"
          >
            {isAnalyzing ? (
              <>Analyzing Project<span className="ml-2 animate-pulse">...</span></>
            ) : (
              <>Create Tweet Plan</>
            )}
          </Button>
        </CardFooter>
      </Card>

      {showResults && (
        <div className="space-y-8">
          <Tabs defaultValue="drafts" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="drafts">Tweet Drafts</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="engagement">Engagement Plan</TabsTrigger>
            </TabsList>
            
            <TabsContent value="drafts" className="space-y-4 mt-6">
              <h2 className="text-xl font-semibold mb-4">Generated Tweet Drafts</h2>
              
              {tweetDrafts.map(tweet => (
                <Card key={tweet.id} className="overflow-hidden">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Twitter className="h-6 w-6 text-sky-600" />
                      </div>
                      <div className="space-y-3 flex-1">
                        <p>{tweet.content}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500">
                            <CalendarDays className="h-4 w-4 mr-1" />
                            <span>{tweet.schedule}</span>
                          </div>
                          <Button variant="outline" size="sm">
                            <Send className="h-4 w-4 mr-2" />
                            Schedule
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <div className="flex justify-center mt-6">
                <Button>Generate More Tweets</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="schedule">
              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Tweet Schedule</CardTitle>
                    <CardDescription>
                      Optimal posting times based on your target audience
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-40" />
                        <p>Calendar view will be displayed here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="engagement">
              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Engagement Strategy</CardTitle>
                    <CardDescription>
                      Recommended accounts to engage with and hashtags to use
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <Twitter className="h-12 w-12 mx-auto mb-4 opacity-40" />
                        <p>Engagement strategy will be displayed here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
