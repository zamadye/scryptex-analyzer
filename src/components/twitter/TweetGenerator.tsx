
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/cardui";
import { Input } from "@/components/ui/inputui";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

interface TweetGeneratorProps {
  onGenerate: (content: string) => void;
}

export function TweetGenerator({ onGenerate }: TweetGeneratorProps) {
  const [projectName, setProjectName] = useState("");
  const [projectTwitter, setProjectTwitter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  const { user, updateUser } = useAuth();

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
      
      const generatedTweet = tweets[Math.floor(Math.random() * tweets.length)];
      onGenerate(generatedTweet);
      
      if (user) {
        const updatedProjects = [...(user.tweetedProjects || [])];
        if (!updatedProjects.includes(projectName)) {
          updatedProjects.push(projectName);
          updateUser({ tweetedProjects: updatedProjects });
        }
      }
      
      toast({
        title: t('tweetGenerated'),
        description: `Tweet about ${projectName} has been generated.`
      });
    }, 2000);
  };

  return (
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
  );
}
