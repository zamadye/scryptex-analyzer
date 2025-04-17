
import { useState } from "react";
import { Twitter, Send, RefreshCw, Clock, Check, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";

interface Tweet {
  id: string;
  username: string;
  handle: string;
  avatar: string;
  content: string;
  time: string;
  retweeted: boolean;
}

const Autopilot = () => {
  const [twitterHandle, setTwitterHandle] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [autoRetweeting, setAutoRetweeting] = useState(false);

  // Dummy data for demonstration
  const dummyTweets: Tweet[] = [
    {
      id: "1",
      username: "Arbitrum",
      handle: "@arbitrum",
      avatar: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg",
      content: "Excited to announce our new partnership with @optimism to improve L2 interoperability! This collaboration will bring seamless cross-rollup transactions to all users. #Arbitrum #Optimism #L2",
      time: "2 hours ago",
      retweeted: false
    },
    {
      id: "2",
      username: "Arbitrum",
      handle: "@arbitrum",
      avatar: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg",
      content: "Join us for the ARB community call tomorrow at 11AM ET. We'll discuss upcoming protocol improvements and answer your questions live! Register now: arb.network/community-call",
      time: "5 hours ago",
      retweeted: false
    },
    {
      id: "3",
      username: "Arbitrum",
      handle: "@arbitrum",
      avatar: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg",
      content: "Arbitrum Nova now supports more than 100 dApps! Gaming, social media, and entertainment use cases are thriving on our AnyTrust chain. #ArbitrumNova",
      time: "1 day ago",
      retweeted: false
    },
    {
      id: "4",
      username: "Arbitrum",
      handle: "@arbitrum",
      avatar: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg",
      content: "Developers: Check out our new documentation hub at docs.arbitrum.io with improved tutorials and examples for building on Arbitrum One and Nova.",
      time: "2 days ago",
      retweeted: false
    }
  ];

  const handleSearch = () => {
    if (!twitterHandle) return;
    
    setIsSearching(true);
    setTweets([]);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      setIsSearching(false);
      setTweets(dummyTweets);
    }, 1500);
  };

  const handleAutoRetweet = () => {
    setAutoRetweeting(true);
    
    let counter = 0;
    const retweetInterval = setInterval(() => {
      if (counter >= tweets.length) {
        clearInterval(retweetInterval);
        setAutoRetweeting(false);
        return;
      }
      
      setTweets(prevTweets => 
        prevTweets.map((tweet, idx) => 
          idx === counter ? { ...tweet, retweeted: true } : tweet
        )
      );
      
      counter++;
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Twitter Autopilot</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Automate your Twitter engagement with Web3 projects to maximize airdrop eligibility.
        </p>
      </div>

      <Card className="mb-10">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Twitter className="mr-2 h-5 w-5 text-scryptex-blue" />
            Auto Retweet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <Input 
                label="Twitter Handle" 
                placeholder="e.g. @arbitrum" 
                value={twitterHandle}
                onChange={(e) => setTwitterHandle(e.target.value)}
                fullWidth
              />
            </div>
            <div className="flex-shrink-0 md:self-end">
              <Button 
                onClick={handleSearch}
                disabled={!twitterHandle || isSearching}
                isLoading={isSearching}
                className="bg-scryptex-blue hover:bg-scryptex-dark text-white w-full md:w-auto"
              >
                {isSearching ? "Searching..." : "Search Tweets"}
              </Button>
            </div>
          </div>

          {tweets.length > 0 && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Latest Tweets</h3>
                <Button 
                  onClick={handleAutoRetweet}
                  disabled={autoRetweeting || tweets.every(t => t.retweeted)}
                  isLoading={autoRetweeting}
                  className="bg-scryptex-blue hover:bg-scryptex-dark text-white"
                >
                  {autoRetweeting ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Auto Retweet All
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-4">
                {tweets.map((tweet) => (
                  <Card key={tweet.id} className="overflow-hidden transition-all duration-300 hover:shadow-md">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <img 
                            src={tweet.avatar} 
                            alt={tweet.username} 
                            className="h-12 w-12 rounded-full"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-semibold">{tweet.username}</p>
                              <p className="text-gray-500 text-sm">{tweet.handle}</p>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 text-gray-400 mr-1" />
                              <span className="text-xs text-gray-500">{tweet.time}</span>
                            </div>
                          </div>
                          <p className="mt-2 text-gray-800">{tweet.content}</p>
                          <div className="mt-3 flex justify-between items-center">
                            <div className="flex items-center">
                              <Badge
                                variant={tweet.retweeted ? "default" : "outline"}
                                className={tweet.retweeted 
                                  ? "bg-green-100 text-green-800 border-green-200" 
                                  : "border-gray-300 text-gray-600"
                                }
                              >
                                {tweet.retweeted ? (
                                  <>
                                    <Check className="mr-1 h-3 w-3" />
                                    Retweeted
                                  </>
                                ) : (
                                  <>Pending</>
                                )}
                              </Badge>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={tweet.retweeted}
                              className={tweet.retweeted 
                                ? "border-green-200 text-green-800 pointer-events-none" 
                                : "border-gray-300 text-gray-700"
                              }
                              onClick={() => {
                                setTweets(
                                  tweets.map((t) =>
                                    t.id === tweet.id ? { ...t, retweeted: true } : t
                                  )
                                );
                              }}
                            >
                              {tweet.retweeted ? (
                                <Check className="mr-1 h-4 w-4" />
                              ) : (
                                <RefreshCw className="mr-1 h-4 w-4" />
                              )}
                              {tweet.retweeted ? "Done" : "Retweet"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-12 bg-gray-50 rounded-xl p-6">
        <div className="flex items-start">
          <AlertCircle className="h-6 w-6 text-scryptex-blue mr-3 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-2">How Auto Retweet Works</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Enter the Twitter handle of a Web3 project</li>
              <li>Our system fetches the most recent and relevant tweets</li>
              <li>Click "Auto Retweet All" to schedule retweets</li>
              <li>Connect your Twitter account when prompted</li>
              <li>Retweets will be spread out over time to appear natural</li>
            </ol>
            <p className="mt-4 text-sm text-gray-500">
              This tool helps you stay engaged with projects for potential airdrops while saving you time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Autopilot;
