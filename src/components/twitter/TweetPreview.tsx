
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/cardui";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Clock, Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface TweetPreviewProps {
  content: string;
  onContentChange: (content: string) => void;
  onSchedule: () => void;
  onClear: () => void;
  tweetDelay: number[];
  onDelayChange: (value: number[]) => void;
  userName: string;
  userHandle: string;
}

export function TweetPreview({
  content,
  onContentChange,
  onSchedule,
  onClear,
  tweetDelay,
  onDelayChange,
  userName,
  userHandle
}: TweetPreviewProps) {
  const { t } = useLanguage();

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{t('tweetPreview')}</CardTitle>
        <CardDescription>{t('reviewAndScheduleTweet')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-start mb-3">
            <div className="bg-gray-200 h-10 w-10 rounded-full flex-shrink-0 mr-3" />
            <div>
              <div className="flex items-center">
                <p className="font-semibold">{userName}</p>
                <p className="text-gray-500 ml-2 text-sm">{userHandle}</p>
              </div>
              <Textarea 
                value={content} 
                onChange={(e) => onContentChange(e.target.value)}
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
              onValueChange={onDelayChange}
              min={1}
              max={48}
              step={1}
            />
            <p className="text-xs text-gray-500">{t('randomDelayHelps')}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={onSchedule} 
          className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600"
        >
          <Send className="mr-2 h-4 w-4" />
          {t('scheduleTweet')}
        </Button>
        <Button 
          variant="outline" 
          className="w-full sm:w-auto"
          onClick={onClear}
        >
          {t('generateNewTweet')}
        </Button>
      </CardFooter>
    </Card>
  );
}
