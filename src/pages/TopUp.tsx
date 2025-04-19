
import { TopUpForm } from "@/components/credit/TopUpForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/cardui";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { CreditCard, Clock, Zap, Gift } from "lucide-react";

export default function TopUp() {
  const { isLoggedIn } = useAuth();
  
  const features = [
    {
      title: "AI Project Analysis",
      description: "Get in-depth analysis of any Web3 project",
      icon: <Zap className="h-5 w-5 text-blue-500" />,
      cost: "4 credits per analysis"
    },
    {
      title: "Twitter Agent",
      description: "Automate your Twitter engagement",
      icon: <CreditCard className="h-5 w-5 text-sky-500" />,
      cost: "3 credits per interaction"
    },
    {
      title: "Onchain Farming",
      description: "Execute testnet tasks automatically",
      icon: <Clock className="h-5 w-5 text-green-500" />,
      cost: "5 credits per task"
    },
    {
      title: "Referral Rewards",
      description: "Get 20% bonus credits for referrals",
      icon: <Gift className="h-5 w-5 text-purple-500" />,
      cost: "Free"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold">Top Up Credits</h1>
        <p className="text-gray-500 mt-2">
          Purchase credits to use our AI agents and features
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <TopUpForm />

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Why Purchase Credits?</CardTitle>
              <CardDescription>
                Credits power all our AI agent features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={feature.title} className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5 mr-3">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{feature.title}</h3>
                      <div className="flex justify-between">
                        <p className="text-sm text-gray-500">{feature.description}</p>
                        <span className="text-sm text-gray-600 font-medium ml-2">{feature.cost}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Benefits</CardTitle>
              <CardDescription>
                Why you should keep your credits topped up
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Unlimited Access</h3>
                <p className="text-sm text-gray-600">
                  Get unlimited access to all current and future AI agents. Use them as much as you need without restrictions.
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="font-medium">Priority Support</h3>
                <p className="text-sm text-gray-600">
                  Get priority access to our support team for any questions or issues you may have.
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="font-medium">Higher Airdrop Chances</h3>
                <p className="text-sm text-gray-600">
                  Regular users of our platform have reported receiving more airdrops than those who don't actively use the tools.
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="font-medium">Early Access to New Features</h3>
                <p className="text-sm text-gray-600">
                  Be the first to try new features and AI agents as soon as they are released.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">How long do credits last?</h3>
                <p className="text-sm text-gray-600">
                  Credits never expire. Once purchased, they remain in your account until used.
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="font-medium">Can I get a refund?</h3>
                <p className="text-sm text-gray-600">
                  We offer a 7-day money-back guarantee if you're not satisfied with our service.
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="font-medium">How do I get more credits?</h3>
                <p className="text-sm text-gray-600">
                  You can purchase credits anytime on this page. We also offer free credits through our referral program.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
