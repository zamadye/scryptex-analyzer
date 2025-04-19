
import { useState } from "react";
import { Twitter, Send, ArrowRight, Clock, Check, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/inputui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/cardui";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";

export default function TwitterAgent() {
  const { isLoggedIn, user, updateUser } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isTwitterConnected, setIsTwitterConnected] = useState(false);
  const [twitterHandle, setTwitterHandle] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectTwitter, setProjectTwitter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [tweetContent, setTweetContent] = useState("");
  const [tweetDelay, setTweetDelay] = useState([24]); // Hours
  const { toast } = useToast();

  const connectTwitter = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    
    // Simulate Twitter connection
    setIsTwitterConnected(true);
    const defaultHandle = user?.name?.replace(/\s+/g, '') || 'user';
    setTwitterHandle(`@${defaultHandle.toLowerCase()}`);
    
    // Update user with Twitter handle
    if (user) {
      updateUser({ twitterHandle: `@${defaultHandle.toLowerCase()}` });
    }
    
    toast({
      title: "Twitter Connected",
      description: `Connected to ${defaultHandle.toLowerCase()}`,
    });
  };

  const generateTweet = () => {
    if (!projectName || !projectTwitter) return;
    
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      
      // Generate sample tweet
      const tweets = [
        `Just explored the amazing features of ${projectName} (${projectTwitter})! Their innovative approach to solving scalability issues is impressive. Can't wait to see what's next! #Web3 #Blockchain`,
        `Excited about the future of ${projectName} (${projectTwitter})! Their roadmap looks promising and the team is solid. Definitely a project to watch in the coming months. #Crypto #DeFi`,
        `Been testing out ${projectName} (${projectTwitter}) and I'm impressed with the user experience. Fast, secure, and easy to use. Highly recommend checking it out! #Testnet #Airdrop`
      ];
      
      setTweetContent(tweets[Math.floor(Math.random() * tweets.length)]);
      
      // Update user's tweeted projects
      if (user) {
        const updatedProjects = [...(user.tweetedProjects || [])];
        if (!updatedProjects.includes(projectName)) {
          updatedProjects.push(projectName);
          updateUser({ tweetedProjects: updatedProjects });
        }
      }
      
      toast({
        title: "Tweet Generated",
        description: `Tweet about ${projectName} has been generated.`,
      });
    }, 2000);
  };

  const scheduleTweet = () => {
    if (!tweetContent) return;
    
    toast({
      title: "Tweet Scheduled",
      description: `Your tweet will be posted in ${tweetDelay[0]} hours.`,
    });
    
    // Simulate tweet posting
    setTimeout(() => {
      toast({
        title: "Tweet Posted",
        description: "Your tweet has been successfully posted.",
      });
    }, 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Twitter Agent</h1>
        <div className="flex items-center space-x-2 text-sm font-medium text-gray-500">
          <Twitter className="h-4 w-4" />
          <span>Uses 3 credits per interaction</span>
        </div>
      </div>

      {!isLoggedIn && (
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Automate Your Twitter Engagement</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Generate, schedule, and post tweets about Web3 projects. Build your presence in the community and maximize airdrop eligibility. Login to use this feature.
          </p>
          <Button onClick={() => setShowAuthModal(true)}>
            Login to Continue
          </Button>
        </Card>
      )}

      {isLoggedIn && !isTwitterConnected && (
        <Card>
          <CardHeader>
            <CardTitle>Connect Your Twitter Account</CardTitle>
            <CardDescription>
              Connect your Twitter account to start automating your social interactions
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center py-8">
            <Twitter className="h-16 w-16 text-sky-500 mx-auto mb-4" />
            <p className="mb-6 text-gray-600">
              Your Twitter account will be used to post content, like, retweet, and follow accounts.
              All actions will require your approval before execution.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button size="lg" onClick={connectTwitter} className="bg-sky-500 hover:bg-sky-600">
              Connect Twitter
            </Button>
          </CardFooter>
        </Card>
      )}

      {isTwitterConnected && (
        <>
          <Card className="border-sky-100">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Twitter Connected</CardTitle>
                <div className="flex items-center text-sm text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
                  <Check className="h-4 w-4 mr-1" />
                  Connected
                </div>
              </div>
              <CardDescription>
                {twitterHandle}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Create Content</CardTitle>
              <CardDescription>
                Generate tweets about Web3 projects
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
                  <label className="text-sm font-medium">Project Twitter</label>
                  <Input
                    placeholder="e.g. @arbitrum"
                    value={projectTwitter}
                    onChange={(e) => setProjectTwitter(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={generateTweet} 
                disabled={isGenerating || !projectName || !projectTwitter}
                className="w-full sm:w-auto"
              >
                {isGenerating ? (
                  <>Generating Tweet<span className="ml-2 animate-pulse">...</span></>
                ) : (
                  <>Generate Tweet<ArrowRight className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </CardFooter>
          </Card>

          {tweetContent && (
            <Card>
              <CardHeader>
                <CardTitle>Tweet Preview</CardTitle>
                <CardDescription>
                  Review and schedule your tweet
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-start mb-3">
                    <div className="bg-gray-200 h-10 w-10 rounded-full flex-shrink-0 mr-3" />
                    <div>
                      <div className="flex items-center">
                        <p className="font-semibold">{user?.name || "User"}</p>
                        <p className="text-gray-500 ml-2 text-sm">{twitterHandle}</p>
                      </div>
                      <Textarea 
                        value={tweetContent} 
                        onChange={(e) => setTweetContent(e.target.value)}
                        className="my-2 w-full" 
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-gray-500 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>
                        {new Date().toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      Preview
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Post Delay (Hours)</label>
                      <span className="text-sm text-gray-500">{tweetDelay[0]} hours</span>
                    </div>
                    <Slider
                      value={tweetDelay}
                      onValueChange={setTweetDelay}
                      min={1}
                      max={48}
                      step={1}
                    />
                    <p className="text-xs text-gray-500">
                      A random delay helps your activity appear more natural.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={scheduleTweet} 
                  className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Schedule Tweet
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto"
                  onClick={() => setTweetContent("")}
                >
                  Generate New Tweet
                </Button>
              </CardFooter>
            </Card>
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
