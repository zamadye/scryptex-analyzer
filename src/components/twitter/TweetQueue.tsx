import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/cardui";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Tweet {
  id: string;
  content: string;
  time: string;
  status: string;
}

interface TweetQueueProps {
  tweets: Tweet[];
  userName: string;
  userHandle: string;
}

export function TweetQueue({ tweets, userName, userHandle }: TweetQueueProps) {
  const [scheduledTweets, setScheduledTweets] = useState(tweets);
  const { toast } = useToast();

  const handleDeleteTweet = (id: string) => {
    const updatedTweets = scheduledTweets.filter(tweet => tweet.id !== id);
    setScheduledTweets(updatedTweets);
    
    // Update the toast call to use a single object argument
    toast({
      title: "Tweet Deleted",
      description: "The scheduled tweet has been deleted."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scheduled Tweets</CardTitle>
        <CardDescription>Manage your scheduled tweets</CardDescription>
      </CardHeader>
      <CardContent>
        {scheduledTweets.length === 0 ? (
          <p className="text-gray-500">No tweets scheduled.</p>
        ) : (
          <div className="space-y-4">
            {scheduledTweets.map((tweet) => (
              <div key={tweet.id} className="border rounded-md p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{userName} <span className="text-gray-500">{userHandle}</span></p>
                    <p className="text-sm text-gray-500">{new Date(tweet.time).toLocaleString()}</p>
                    <p className="mt-2">{tweet.content}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteTweet(tweet.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
