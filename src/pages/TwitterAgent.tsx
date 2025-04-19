
import { useState } from "react";
import { Twitter, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/cardui";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";
import { TwitterConnectCard } from "@/components/twitter/TwitterConnectCard";
import { TweetGenerator } from "@/components/twitter/TweetGenerator";
import { TweetPreview } from "@/components/twitter/TweetPreview";
import { SocialFarmingConfig } from "@/components/twitter/SocialFarmingConfig";
import { TweetQueue } from "@/components/twitter/TweetQueue";

export default function TwitterAgent() {
  const { isLoggedIn, user, updateUser } = useAuth();
  const { t } = useLanguage();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isTwitterConnected, setIsTwitterConnected] = useState(false);
  const [twitterHandle, setTwitterHandle] = useState("");
  const [currentTab, setCurrentTab] = useState("tweet");
  const [tweetContent, setTweetContent] = useState("");
  const [tweetDelay, setTweetDelay] = useState([24]);
  const [scheduledTweets, setScheduledTweets] = useState<any[]>([]);
  const { toast } = useToast();

  const connectTwitter = () => {
    setIsTwitterConnected(true);
    const defaultHandle = user?.name?.replace(/\s+/g, '') || 'user';
    setTwitterHandle(`@${defaultHandle.toLowerCase()}`);
    
    if (user) {
      updateUser({ twitterHandle: `@${defaultHandle.toLowerCase()}` });
    }
    
    toast({
      title: t('twitterConnected'),
      description: `Connected to ${defaultHandle.toLowerCase()}`
    });
  };

  const handleTweetGenerated = (content: string) => {
    setTweetContent(content);
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

  const handleSocialFarmingConfig = (config: any) => {
    toast({
      title: t('socialFarmingConfigured'),
      description: `Will auto-interact with ${config.targetAccounts} ${config.interactionFrequency[0]} times per day.`
    });
    
    setTimeout(() => {
      toast({
        title: t('interactionComplete'),
        description: `Liked and retweeted recent posts from ${config.targetAccounts.split(',')[0]}`
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
        <TwitterConnectCard 
          onConnect={connectTwitter}
          onShowAuth={() => setShowAuthModal(true)}
        />
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
              <TweetGenerator onGenerate={handleTweetGenerated} />
              {tweetContent && (
                <TweetPreview
                  content={tweetContent}
                  onContentChange={setTweetContent}
                  onSchedule={scheduleTweet}
                  onClear={() => setTweetContent("")}
                  tweetDelay={tweetDelay}
                  onDelayChange={setTweetDelay}
                  userName={user?.name || "User"}
                  userHandle={twitterHandle}
                />
              )}
            </TabsContent>
            
            <TabsContent value="farm">
              <SocialFarmingConfig onConfigure={handleSocialFarmingConfig} />
            </TabsContent>
            
            <TabsContent value="queue">
              <TweetQueue
                tweets={scheduledTweets}
                userName={user?.name || "User"}
                userHandle={twitterHandle}
              />
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
