
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/cardui";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/context/LanguageContext";

interface SocialFarmingConfigProps {
  onConfigure: (config: {
    autoLike: boolean;
    autoRetweet: boolean;
    targetAccounts: string;
    interactionFrequency: number[];
  }) => void;
}

export function SocialFarmingConfig({ onConfigure }: SocialFarmingConfigProps) {
  const [autoLike, setAutoLike] = useState(true);
  const [autoRetweet, setAutoRetweet] = useState(true);
  const [targetAccounts, setTargetAccounts] = useState("@ethereum, @arbitrum, @optimism");
  const [interactionFrequency, setInteractionFrequency] = useState([2]);
  const { t } = useLanguage();

  const handleConfigure = () => {
    onConfigure({
      autoLike,
      autoRetweet,
      targetAccounts,
      interactionFrequency
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('socialFarming')}</CardTitle>
        <CardDescription>{t('autoEngageWithAccounts')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{t('autoLike')}</h3>
              <p className="text-sm text-gray-500">{t('autoLikeDescription')}</p>
            </div>
            <Switch checked={autoLike} onCheckedChange={setAutoLike} />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{t('autoRetweet')}</h3>
              <p className="text-sm text-gray-500">{t('autoRetweetDescription')}</p>
            </div>
            <Switch checked={autoRetweet} onCheckedChange={setAutoRetweet} />
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
          <p className="text-xs text-gray-500">{t('separateAccountsWithCommas')}</p>
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
          <p className="text-xs text-gray-500">{t('higherFrequencyMoreCredits')}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleConfigure} className="w-full sm:w-auto">
          {t('startSocialFarming')}
        </Button>
      </CardFooter>
    </Card>
  );
}
