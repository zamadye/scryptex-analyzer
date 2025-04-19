
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/cardui";
import { Badge } from "@/components/ui/badge";
import { Twitter } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Tweet {
  id: string;
  content: string;
  time: string;
  status: 'scheduled' | 'posted';
}

interface TweetQueueProps {
  tweets: Tweet[];
  userName: string;
  userHandle: string;
}

export function TweetQueue({ tweets, userName, userHandle }: TweetQueueProps) {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('scheduledTweets')}</CardTitle>
        <CardDescription>
          {tweets.length > 0 
            ? t('scheduledTweetsCount', { count: tweets.length }) 
            : t('noScheduledTweets')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {tweets.length > 0 ? (
          <div className="space-y-4">
            {tweets.map((tweet) => (
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
                          <p className="font-semibold">{userName}</p>
                          <p className="text-gray-500 ml-2 text-sm">{userHandle}</p>
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
  );
}
