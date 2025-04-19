
import { useState, useEffect } from "react";
import { User, Shield, Calendar, Gift, Copy } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/cardui";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useXP } from "@/context/XPContext";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

export default function Profile() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const { getXpLevel } = useAuth();
  const { xp } = useXP();
  
  const [copied, setCopied] = useState(false);
  
  const userLevel = getXpLevel();
  const progress = (xp % 100) / 100;
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: t('copied'),
      description: t('referralCodeCopied'),
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">{t('pleaseLogIn')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('profile')}</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Info Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>{t('userInformation')}</CardTitle>
            <CardDescription>{t('yourAccountDetails')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center mb-6">
              <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <User className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold">{user.name}</h3>
              <p className="text-gray-500">{user.email}</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {t('joined')}
                </span>
                <span className="font-medium">
                  {new Date(user.joinDate).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  {t('membership')}
                </span>
                <span className="font-medium">
                  {user.xp > 100 ? t('premium') : t('standard')}
                </span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  {t('invites')}
                </span>
                <span className="font-medium">
                  {user.invites || 0}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* XP Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{t('experienceLevel')}</CardTitle>
            <CardDescription>{t('yourProgressAndAchievements')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-bold">{t('level')} {userLevel.level}</span>
              <span className="text-blue-600 font-medium">{userLevel.title}</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${progress * 100}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-sm text-gray-500">
              <span>{xp} XP</span>
              <span>{t('nextLevel')}: {Math.ceil(xp / 100) * 100} XP</span>
            </div>
            
            <div className="mt-6 space-y-4">
              <h4 className="font-medium">{t('recentAchievements')}</h4>
              
              <div className="space-y-2">
                {user.analyzedProjects && user.analyzedProjects.length > 0 ? (
                  user.analyzedProjects.slice(0, 3).map((project, index) => (
                    <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Search className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{t('analyzedProject')}</p>
                        <p className="text-sm text-gray-500">{project}</p>
                      </div>
                      <div className="ml-auto text-sm text-blue-600">+5 XP</div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">{t('noRecentAchievements')}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Referral Card */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>{t('referralCode')}</CardTitle>
            <CardDescription>{t('shareWithFriends')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center justify-between">
              <span className="font-bold text-lg">{user.referralCode}</span>
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(user.referralCode)}>
                <Copy className="h-4 w-4 mr-2" />
                {copied ? t('copied') : t('copy')}
              </Button>
            </div>
            
            <p className="mt-4 text-sm text-gray-500">
              {t('referralDescription')}
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={() => copyToClipboard(`https://scryptex.ai/r/${user.referralCode}`)}
            >
              {t('copyReferralLink')}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

// Need to import Search icon for achievements
import { Search } from "lucide-react";
