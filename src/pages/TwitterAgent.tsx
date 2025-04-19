import { useState } from "react";
import { Twitter, Send, ArrowRight, Clock, Check, AlertCircle, ThumbsUp, Repeat } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/inputui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/cardui";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";

export default function TwitterAgent() {
  const { isLoggedIn, user, updateUser } = useAuth();
  const { t } = useLanguage();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isTwitterConnected, setIsTwitterConnected] = useState(false);
  const [twitterHandle, setTwitterHandle] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectTwitter, setProjectTwitter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [tweetContent, setTweetContent] = useState("");
  const [tweetDelay, setTweetDelay] = useState([24]); // Hours
  const [scheduledTweets, setScheduledTweets] = useState<any[]>([]);
  const [currentTab, setCurrentTab] = useState("tweet");
  
  const [autoLike, setAutoLike] = useState(true);
  const [autoRetweet, setAutoRetweet] = useState(true);
  const [interactionFrequency, setInteractionFrequency] = useState([2]); // Per day
  const [targetAccounts, setTargetAccounts] = useState("@ethereum, @arbitrum, @optimism");
  
  const { toast } = useToast();

  const connectTwitter = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    
    setIsTwitterConnected(true);
    const defaultHandle = user?.name?.replace(/\s+/g, '') || 'user';
    setTwitterHandle(`@${defaultHandle.toLowerCase()}`);
    
    if (user) {
      updateUser({ twitterHandle: `@${defaultHandle.toLowerCase()}` });
    }
    
    toast({
      title: t('twitterConnected'),
      description: `Connected to ${defaultHandle.toLowerCase()}`,
    });
  };

  const generateTweet = () => {
    if (!projectName || !projectTwitter) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      setIsGenerating(false);
      
      const tweets = [
        `Just explored the amazing features of ${projectName} (${projectTwitter})! Their innovative approach to solving scalability issues is impressive. Can't wait to see what's next! #Web3 #Blockchain`,
        `Excited about the future of ${projectName} (${projectTwitter})! Their roadmap looks promising and the team is solid. Definitely a project to watch in the coming months. #Crypto #DeFi`,
        `Been testing out ${projectName} (${projectTwitter}) and I'm impressed with the user experience. Fast, secure, and easy to use. Highly recommend checking it out! #Testnet #Airdrop`
      ];
      
      setTweetContent(tweets[Math.floor(Math.random() * tweets.length)]);
      
      if (user) {
        const updatedProjects = [...(user.tweetedProjects || [])];
        if (!updatedProjects.includes(projectName)) {
          updatedProjects.push(projectName);
          updateUser({ tweetedProjects: updatedProjects });
        }
      }
      
      toast({
        title: t('tweetGenerated'),
        description: `Tweet about ${projectName} has been generated.`,
      });
    }, 2000);
  };

  const scheduleTweet = () => {
    if (!tweetContent) return;
    
    const tweetTime = new Date();
    tweetTime.setHours(tweetTime.getHours() + tweetDelay[0]);
    
    const newTweet = {
      id: Date.now().toString(),
      content: tweetContent,
      time: tweetTime.toISOString(),
      status: 'scheduled'
    };
    
    setScheduledTweets([newTweet, ...scheduledTweets]);
    setTweetContent("");
    
    toast({
      title: t('tweetScheduled'),
      description: `Your tweet will be posted in ${tweetDelay[0]} hours.`
    });
    
    setTimeout(() => {
      const updatedTweets = scheduledTweets.map(tweet => 
        tweet.id === newTweet.id ? { ...tweet, status: 'posted' } : tweet
      );
      setScheduledTweets(updatedTweets);
      
      toast({
        title: t('tweetPosted'),
        description: t('tweetPostedSuccessfully')
      });
    }, 5000);
  };
  
  const configureFarming = () => {
    toast({
      title: t('socialFarmingConfigured'),
      description: `Will auto-interact with ${targetAccounts} ${interactionFrequency[0]} times per day.`
    });
    
    setTimeout(() => {
      toast({
        title: t('interactionComplete'),
        description: `Liked and retweeted recent posts from ${targetAccounts.split(',')[0]}`
      });
    }, 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('twitterAgent')}</h1>
        <div className="flex items-center space-x-2 text-sm font-medium text-gray-500">
          <Twitter className="h-4 w-4" />
          <span>{t('uses')} 3 {t('creditsPerInteraction')}</span>
        </div>
      </div>

      {!isLoggedIn && (
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">{t('automateTwitterEngagement')}</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            {t('twitterAgentDescription')}
          </p>
          <Button onClick={() => setShowAuthModal(true)}>
            {t('loginToContinue')}
          </Button>
        </Card>
      )}

      {isLoggedIn && !isTwitterConnected && (
        <Card>
          <CardHeader>
            <CardTitle>{t('connectTwitterAccount')}</CardTitle>
            <CardDescription>
              {t('connectTwitterDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center py-8">
            <Twitter className="h-16 w-16 text-sky-500 mx-auto mb-4" />
            <p className="mb-6 text-gray-600">
              {t('twitterPermissionsDescription')}
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button size="lg" onClick={connectTwitter} className="bg-sky-500 hover:bg-sky-600">
              {t('connectTwitter')}
            </Button>
          </CardFooter>
        </Card>
      )}

      {isTwitterConnected && (
        <>
          <Card className="border-sky-100">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>{t('twitterConnected')}</CardTitle>
                <div className="flex items-center text-sm text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
                  <Check className="h-4 w-4 mr-1" />
                  {t('connected')}
                </div>
              </div>
              <CardDescription>
                {twitterHandle}
              </CardDescription>
            </CardHeader>
          </Card>

          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="tweet" className="flex-1">{t('generateTweets')}</TabsTrigger>
              <TabsTrigger value="farm" className="flex-1">{t('socialFarming')}</TabsTrigger>
              <TabsTrigger value="queue" className="flex-1">{t('tweetQueue')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tweet">
              <Card>
                <CardHeader>
                  <CardTitle>{t('createContent')}</CardTitle>
                  <CardDescription>
                    {t('generateTweetsAboutProjects')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t('projectName')}</label>
                      <Input
                        placeholder="e.g. Arbitrum, ZKSync"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t('projectTwitter')}</label>
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
                      <>{t('generatingTweet')}<span className="ml-2 animate-pulse">...</span></>
                    ) : (
                      <>{t('generateTweet')}<ArrowRight className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>
                </CardFooter>
              </Card>

              {tweetContent && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>{t('tweetPreview')}</CardTitle>
                    <CardDescription>
                      {t('reviewAndScheduleTweet')}
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
                          {t('preview')}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">{t('postDelay')} ({t('hours')})</label>
                          <span className="text-sm text-gray-500">{tweetDelay[0]} {t('hours')}</span>
                        </div>
                        <Slider
                          value={tweetDelay}
                          onValueChange={setTweetDelay}
                          min={1}
                          max={48}
                          step={1}
                        />
                        <p className="text-xs text-gray-500">
                          {t('randomDelayHelps')}
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
                      {t('scheduleTweet')}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full sm:w-auto"
                      onClick={() => setTweetContent("")}
                    >
                      {t('generateNewTweet')}
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="farm">
              <Card>
                <CardHeader>
                  <CardTitle>{t('socialFarming')}</CardTitle>
                  <CardDescription>
                    {t('autoEngageWithAccounts')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{t('autoLike')}</h3>
                        <p className="text-sm text-gray-500">{t('autoLikeDescription')}</p>
                      </div>
                      <Switch 
                        checked={autoLike} 
                        onCheckedChange={setAutoLike} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{t('autoRetweet')}</h3>
                        <p className="text-sm text-gray-500">{t('autoRetweetDescription')}</p>
                      </div>
                      <Switch 
                        checked={autoRetweet} 
                        onCheckedChange={setAutoRetweet} 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('targetAccounts')}</label>
                    <Textarea
                      placeholder="@ethereum, @arbitrum, @optimism"
                      value={targetAccounts}
                      onChange={(e) => setTargetAccounts(e.target.value)}
                      className="h-24"
                    />
                    <p className="text-xs text-gray-500">
                      {t('separateAccountsWithCommas')}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">{t('interactionsPerDay')}</label>
                      <span className="text-sm text-gray-500">{interactionFrequency[0]}</span>
                    </div>
                    <Slider
                      value={interactionFrequency}
                      onValueChange={setInteractionFrequency}
                      min={1}
                      max={5}
                      step={1}
                    />
                    <p className="text-xs text-gray-500">
                      {t('higherFrequencyMoreCredits')}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={configureFarming} 
                    className="w-full sm:w-auto"
                  >
                    {t('startSocialFarming')}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>{t('recentInteractions')}</CardTitle>
                  <CardDescription>
                    {t('lastTwoDays')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border border-gray-200">
                      <div className="flex">
                        <div className="mr-4 flex-shrink-0">
                          <ThumbsUp className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <h4 className="font-medium">{t('likedTweet')}</h4>
                          <p className="text-sm text-gray-600 mt-1">@ethereum: "Ethereum Layer 2 solutions are showing incredible progress with transaction speeds..."</p>
                          <div className="mt-2 text-xs text-gray-500">
                            {new Date(Date.now() - 1800000).toLocaleString()} • {t('autoInteraction')}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg border border-gray-200">
                      <div className="flex">
                        <div className="mr-4 flex-shrink-0">
                          <Repeat className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <h4 className="font-medium">{t('retweetedPost')}</h4>
                          <p className="text-sm text-gray-600 mt-1">@arbitrum: "10M transactions and counting! Thanks to our amazing community for making this possible..."</p>
                          <div className="mt-2 text-xs text-gray-500">
                            {new Date(Date.now() - 3600000).toLocaleString()} • {t('autoInteraction')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="queue">
              <Card>
                <CardHeader>
                  <CardTitle>{t('scheduledTweets')}</CardTitle>
                  <CardDescription>
                    {scheduledTweets.length > 0 
                      ? t('scheduledTweetsCount', { count: scheduledTweets.length }) 
                      : t('noScheduledTweets')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {scheduledTweets.length > 0 ? (
                    <div className="space-y-4">
                      {scheduledTweets.map((tweet) => (
                        <div 
                          key={tweet.id} 
                          className="p-4 rounded-lg border border-gray-200"
                        >
                          <div className="flex items-start">
                            <div className="bg-gray-200 h-10 w-10 rounded-full flex-shrink-0 mr-3" />
                            <div className="flex-grow">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center">
                                    <p className="font-semibold">{user?.name || "User"}</p>
                                    <p className="text-gray-500 ml-2 text-sm">{twitterHandle}</p>
                                  </div>
                                  <p className="my-2">{tweet.content}</p>
                                </div>
                                <Badge 
                                  variant={tweet.status === 'posted' ? "secondary" : "outline"}
                                  className={tweet.status === 'posted' ? "bg-green-100 text-green-800" : ""}
                                >
                                  {tweet.status === 'posted' ? t('posted') : t('scheduled')}
                                </Badge>
                              </div>
                              <div className="text-xs text-gray-500 mt-2">
                                {tweet.status === 'posted' 
                                  ? `${t('postedOn')} ${new Date(tweet.time).toLocaleString()}`
                                  : `${t('scheduledFor')} ${new Date(tweet.time).toLocaleString()}`}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <Twitter className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">{t('noScheduledTweetsYet')}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
}
