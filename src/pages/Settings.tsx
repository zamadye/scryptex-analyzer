
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/cardui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/inputui";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { user, updateUser } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [walletAddress, setWalletAddress] = useState(user?.walletAddress || "");
  const [twitterHandle, setTwitterHandle] = useState(user?.twitterHandle || "");
  const [receiveNotifications, setReceiveNotifications] = useState(true);
  const [receiveNewsletter, setReceiveNewsletter] = useState(true);
  
  const saveSettings = () => {
    if (!user) return;
    
    updateUser({
      name,
      email,
      walletAddress,
      twitterHandle
    });
    
    toast({
      title: t('settingsSaved'),
      description: t('settingsSavedDescription'),
    });
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
        <h1 className="text-3xl font-bold">{t('settings')}</h1>
      </div>
      
      <div className="space-y-6">
        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle>{t('accountSettings')}</CardTitle>
            <CardDescription>{t('updateYourAccountInformation')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">{t('fullName')}</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">{t('emailAddress')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="walletAddress">{t('walletAddress')}</Label>
                <Input
                  id="walletAddress"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="0x..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="twitterHandle">{t('twitterHandle')}</Label>
                <Input
                  id="twitterHandle"
                  value={twitterHandle}
                  onChange={(e) => setTwitterHandle(e.target.value)}
                  placeholder="@username"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={saveSettings}>{t('saveChanges')}</Button>
          </CardFooter>
        </Card>
        
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>{t('notificationSettings')}</CardTitle>
            <CardDescription>{t('manageHowYouReceiveNotifications')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{t('appNotifications')}</h3>
                <p className="text-sm text-gray-500">{t('receiveInAppNotifications')}</p>
              </div>
              <Switch 
                checked={receiveNotifications} 
                onCheckedChange={setReceiveNotifications} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{t('emailNewsletter')}</h3>
                <p className="text-sm text-gray-500">{t('receiveWeeklyNewsletter')}</p>
              </div>
              <Switch 
                checked={receiveNewsletter} 
                onCheckedChange={setReceiveNewsletter} 
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={saveSettings}>{t('saveChanges')}</Button>
          </CardFooter>
        </Card>
        
        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle>{t('appearanceSettings')}</CardTitle>
            <CardDescription>{t('customizeTheAppearance')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{t('darkMode')}</h3>
                <p className="text-sm text-gray-500">{t('toggleDarkMode')}</p>
              </div>
              <Switch 
                checked={theme === 'dark'} 
                onCheckedChange={toggleTheme} 
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">{t('language')}</h3>
              <div className="flex space-x-4">
                <Button 
                  variant={language === 'EN' ? "default" : "outline"}
                  onClick={() => setLanguage('EN')}
                  className="w-full md:w-auto"
                >
                  English
                </Button>
                <Button 
                  variant={language === 'ID' ? "default" : "outline"}
                  onClick={() => setLanguage('ID')}
                  className="w-full md:w-auto"
                >
                  Bahasa Indonesia
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
