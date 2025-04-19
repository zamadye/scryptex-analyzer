
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/cardui";
import { Twitter } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

interface TwitterConnectCardProps {
  onConnect: () => void;
  onShowAuth: () => void;
}

export function TwitterConnectCard({ onConnect, onShowAuth }: TwitterConnectCardProps) {
  const { isLoggedIn } = useAuth();
  const { t } = useLanguage();

  const handleConnect = () => {
    if (!isLoggedIn) {
      onShowAuth();
      return;
    }
    onConnect();
  };

  return (
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
        <Button 
          size="lg" 
          onClick={handleConnect} 
          className="bg-sky-500 hover:bg-sky-600"
        >
          {t('connectTwitter')}
        </Button>
      </CardFooter>
    </Card>
  );
}
