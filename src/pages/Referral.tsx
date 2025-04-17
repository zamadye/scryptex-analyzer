
import { useState } from "react";
import { Copy, Share, Twitter, MessageSquare, Users, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/cardui";
import { useToast } from "@/hooks/use-toast";
import { CreditManager } from "@/components/common/CreditPanel";

const Referral = () => {
  const { toast } = useToast();
  
  // Generate a random referral code
  const [referralCode] = useState(() => {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  });
  
  // Referral stats
  const [referred] = useState(3);
  const maxReferrals = 6;
  const creditPerReferral = 5;
  const totalEarned = referred * creditPerReferral;
  
  const referralUrl = `https://scryptex.app/register?ref=${referralCode}`;
  
  // Copy link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard.",
    });
  };
  
  // Share to Twitter
  const handleShareTwitter = () => {
    const text = encodeURIComponent(`I'm using Scryptex to analyze crypto projects and automate testnet farming! Join me and let's maximize our airdrop rewards. Use my referral code: ${referralCode}`);
    const url = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(referralUrl)}`;
    window.open(url, '_blank');
  };
  
  // Share to Telegram
  const handleShareTelegram = () => {
    const text = encodeURIComponent(`I'm using Scryptex to analyze crypto projects and automate testnet farming! Join me and let's maximize our airdrop rewards. Use my referral code: ${referralCode}`);
    const url = `https://t.me/share/url?url=${encodeURIComponent(referralUrl)}&text=${text}`;
    window.open(url, '_blank');
  };
  
  // Add mock credits
  const handleCollectCredits = () => {
    CreditManager.addCredits(5);
    
    toast({
      title: "Credits Added!",
      description: "5 credits have been added to your account.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center mb-12 animate-in fade-in duration-300">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Referral Program</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Share Scryptex with others and earn free credits for your airdrop hunting journey.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="h-full animate-in fade-in slide-in-from-left-5 duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="mr-2 h-5 w-5 text-scryptex-blue" />
                Your Referral Link
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-center text-scryptex-blue mb-4">
                  Bagikan Scryptex & dapatkan hingga 30 kredit GRATIS!
                </h2>
                <p className="text-gray-700 mb-4">
                  Untuk setiap 1 teman yang daftar dan farming pertama kali, Anda dapat +5 kredit gratis. Maksimal 6 teman per minggu.
                </p>
                
                <div className="flex items-center mb-6">
                  <div className="flex-1 bg-gray-50 border rounded-l-lg p-3 truncate">
                    {referralUrl}
                  </div>
                  <Button 
                    onClick={handleCopyLink}
                    className="rounded-l-none bg-scryptex-blue text-white"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                
                <div className="text-center text-sm text-gray-500 mb-4">
                  Or share directly to:
                </div>
                
                <div className="flex justify-center space-x-3">
                  <Button 
                    onClick={handleShareTwitter}
                    className="bg-[#1DA1F2] hover:bg-[#1a94da] text-white"
                  >
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                  <Button 
                    onClick={handleShareTelegram}
                    className="bg-[#0088cc] hover:bg-[#0077b3] text-white"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Telegram
                  </Button>
                </div>
              </div>
              
              <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Copywriting ideas for your shares:</h3>
                <div className="space-y-3 text-gray-600 text-sm">
                  <p>"Satu ajakanmu = satu peluang farming lagi."</p>
                  <p>"Berbagi Scryptex, berbagi kesempatan."</p>
                  <p>"Temukan proyek-proyek potensial sebelum semua orang dengan Scryptex! Gunakan link referralku untuk mulai."</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6 animate-in fade-in slide-in-from-right-5 duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-scryptex-blue" />
                Referral Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Your Referral Code</div>
                  <div className="font-mono text-lg font-bold">{referralCode}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-1">Friends Referred</div>
                  <div className="flex items-center">
                    <span className="text-xl font-bold">{referred}</span>
                    <span className="text-gray-500 mx-1">/</span>
                    <span className="text-gray-500">{maxReferrals}</span>
                    <span className="ml-1 text-xs text-gray-500">(weekly limit)</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div 
                      className="bg-scryptex-blue h-2.5 rounded-full" 
                      style={{ width: `${(referred / maxReferrals) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 mb-1">Credits Earned</div>
                  <div className="text-xl font-bold">{totalEarned} credits</div>
                  <div className="text-xs text-gray-500">
                    ({creditPerReferral} credits per referral)
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 border-t">
              <Button 
                onClick={handleCollectCredits}
                className="w-full bg-scryptex-blue hover:bg-scryptex-dark text-white"
                disabled={referred === 0}
              >
                <Gift className="h-4 w-4 mr-2" />
                Collect {totalEarned} Credits
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="animate-in fade-in slide-in-from-right-5 duration-500">
            <CardContent className="p-4">
              <div className="text-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Referral Rules:</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Referral must complete account verification</li>
                  <li>Referral must perform at least one farming activity</li>
                  <li>Weekly limit resets every Monday</li>
                  <li>Credits expire in 30 days if unused</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Referral;
