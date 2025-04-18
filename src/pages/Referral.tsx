
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/cardui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/inputui';
import { Copy, Gift, Users, CreditCard, Share } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { CreditManager } from '@/components/common/CreditPanel';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';

export default function Referral() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const { t } = useLanguage();
  
  const referralCode = user?.referralCode || 'SCX123456';
  const referralLink = `https://scryptex.ai/r/${referralCode}`;
  const invites = user?.invites || 0;
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: t('copied'),
      description: t('referralCodeCopied'),
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  const sendInvite = () => {
    if (!email) return;
    
    // Simulate sending invitation
    toast({
      title: t('inviteSent'),
      description: `${t('inviteSentTo')} ${email}`,
    });
    
    setEmail('');
  };
  
  const claimBonus = () => {
    // Add 10 credits
    CreditManager.addCredits(10);
    
    toast({
      title: t('bonusClaimed'),
      description: t('bonusCreditsAdded'),
    });
  };
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('referral')}</h1>
        <div className="flex items-center space-x-2 text-sm font-medium text-gray-500">
          <Users className="h-4 w-4" />
          <span>{t('inviteFriends')}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Referral Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t('yourReferralCode')}</CardTitle>
            <CardDescription>
              {t('shareCodeDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <span className="font-bold text-lg">{referralCode}</span>
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(referralCode)}>
                <Copy className="h-4 w-4 mr-2" />
                {copied ? t('copied') : t('copy')}
              </Button>
            </div>
            
            <div>
              <label className="text-sm font-medium">{t('referralLink')}</label>
              <div className="mt-1 flex gap-2">
                <Input value={referralLink} readOnly className="flex-1" />
                <Button variant="outline" onClick={() => copyToClipboard(referralLink)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="mt-4 space-y-4">
              <div className="flex gap-2">
                <Input 
                  placeholder={t('enterFriendEmail')} 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button onClick={sendInvite} disabled={!email}>
                  <Share className="h-4 w-4 mr-2" />
                  {t('invite')}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 flex justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="mr-1">{t('invitesSent')}:</span>
              <span className="font-semibold">{invites}</span>
            </div>
          </CardFooter>
        </Card>
        
        {/* Rewards Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t('referralRewards')}</CardTitle>
            <CardDescription>
              {t('referralRewardsDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-100 dark:border-blue-800">
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                  <Gift className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <h3 className="font-medium">{t('inviteBonus')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {t('inviteBonusDescription')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border border-green-100 dark:border-green-800">
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-green-600 dark:text-green-300" />
                </div>
                <div>
                  <h3 className="font-medium">{t('referralCredit')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {t('referralCreditDescription')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <Button className="w-full" onClick={claimBonus}>
                <Gift className="h-4 w-4 mr-2" />
                {t('claimBonus')}
              </Button>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 flex justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="mr-1">{t('availableBonus')}:</span>
              <span className="font-semibold">10 {t('credits')}</span>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      {/* How It Works Section */}
      <Card>
        <CardHeader>
          <CardTitle>{t('howItWorks')}</CardTitle>
          <CardDescription>
            {t('referralProcessDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">1</div>
              </div>
              <h3 className="font-medium mb-2">{t('shareYourCode')}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('shareYourCodeDescription')}
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">2</div>
              </div>
              <h3 className="font-medium mb-2">{t('friendJoins')}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('friendJoinsDescription')}
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">3</div>
              </div>
              <h3 className="font-medium mb-2">{t('getBothRewards')}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('getBothRewardsDescription')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
