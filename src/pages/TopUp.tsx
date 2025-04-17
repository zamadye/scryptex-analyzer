
import { useState } from "react";
import { CreditCard, Check, Info, DollarSign, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/inputui";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/cardui";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CreditManager } from "@/components/common/CreditPanel";

interface PricePlan {
  id: string;
  credits: number;
  price: number;
  originalPrice: number;
  popular?: boolean;
}

const TopUp = () => {
  const { toast } = useToast();
  
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState("");
  const [referralDiscount, setReferralDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Price plans
  const plans: PricePlan[] = [
    {
      id: "basic",
      credits: 10,
      price: 50000,
      originalPrice: 50000,
    },
    {
      id: "standard",
      credits: 50,
      price: 200000,
      originalPrice: 250000,
      popular: true,
    },
    {
      id: "premium",
      credits: 100,
      price: 350000,
      originalPrice: 500000,
    }
  ];
  
  // Apply referral code
  const handleApplyReferral = () => {
    if (referralCode.trim() === "") return;
    
    // Simulate API validation - in real app this would check the code's validity
    if (referralCode.length >= 5) {
      setReferralDiscount(0.1); // 10% discount
      
      toast({
        title: "Referral Code Applied",
        description: "You've received an additional 10% discount!",
      });
    } else {
      setReferralDiscount(0);
      
      toast({
        title: "Invalid Referral Code",
        description: "The code you entered is not valid.",
        variant: "destructive",
      });
    }
  };
  
  // Calculate final price with discounts
  const calculateFinalPrice = (plan: PricePlan): number => {
    const price = plan.price;
    const withReferral = price * (1 - referralDiscount);
    return withReferral;
  };
  
  // Calculate savings
  const calculateSavings = (plan: PricePlan): number => {
    return plan.originalPrice - calculateFinalPrice(plan);
  };
  
  // Handle checkout
  const handleCheckout = () => {
    if (!selectedPlan) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const plan = plans.find(p => p.id === selectedPlan);
      
      if (plan) {
        // Add credits to user's account
        CreditManager.addCredits(plan.credits);
        
        toast({
          title: "Payment Successful",
          description: `${plan.credits} credits have been added to your account.`,
        });
      }
      
      setIsProcessing(false);
      setSelectedPlan(null);
      setReferralCode("");
      setReferralDiscount(0);
    }, 1500);
  };
  
  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center mb-12 animate-in fade-in duration-300">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Top Up Credits</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Supercharge your airdrop hunting with more credits to analyze projects and farm testnets.
        </p>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 mb-10 border border-blue-100 animate-in fade-in slide-in-from-bottom-5 duration-300">
        <div className="flex flex-col sm:flex-row items-center">
          <div className="flex-shrink-0 bg-scryptex-blue rounded-full p-3 mb-4 sm:mb-0 sm:mr-4">
            <Info className="h-6 w-6 text-white" />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-1">🎉 Promo Spesial!</h3>
            <p className="text-gray-700 mb-1">
              Harga sudah termasuk diskon 20% dari platform.
            </p>
            <p className="text-gray-700 font-medium">
              🎁 Gunakan Kode Referral untuk Diskon Tambahan 10%
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`border-2 relative animate-in fade-in slide-in-from-bottom-5 duration-300 ${
              selectedPlan === plan.id 
                ? "border-scryptex-blue" 
                : plan.popular ? "border-gray-200 shadow-md" : "border-gray-200"
            }`}
            style={{ animationDelay: `${plans.indexOf(plan) * 100}ms` }}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Badge className="bg-scryptex-blue text-white">Most Popular</Badge>
              </div>
            )}
            
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{plan.credits} Credits</span>
                {selectedPlan === plan.id && (
                  <Check className="h-5 w-5 text-scryptex-blue" />
                )}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="mb-4">
                <span className="text-3xl font-bold">{formatCurrency(calculateFinalPrice(plan))}</span>
                {plan.originalPrice > plan.price && (
                  <span className="ml-2 text-gray-500 line-through">{formatCurrency(plan.originalPrice)}</span>
                )}
              </div>
              
              {calculateSavings(plan) > 0 && (
                <div className="bg-green-50 text-green-700 text-sm rounded-md p-2 mb-4">
                  Save {formatCurrency(calculateSavings(plan))} ({Math.round((calculateSavings(plan) / plan.originalPrice) * 100)}%)
                </div>
              )}
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Project Analysis</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Testnet Farming</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Twitter Automation</span>
                </div>
                {plan.credits >= 50 && (
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Priority Support</span>
                  </div>
                )}
                {plan.credits >= 100 && (
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Premium Chain Access</span>
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                onClick={() => setSelectedPlan(plan.id)}
                className={`w-full ${
                  selectedPlan === plan.id 
                    ? "bg-scryptex-blue hover:bg-scryptex-dark text-white" 
                    : "bg-white text-scryptex-blue border border-scryptex-blue hover:bg-scryptex-light"
                }`}
              >
                {selectedPlan === plan.id ? "Selected" : "Select Plan"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {selectedPlan && (
        <Card className="animate-in fade-in slide-in-from-bottom-5 duration-300">
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-4">Order Summary</h3>
                
                <div className="space-y-3">
                  {plans.find(p => p.id === selectedPlan) && (
                    <div className="flex justify-between">
                      <span>{plans.find(p => p.id === selectedPlan)?.credits} Credits</span>
                      <span>{formatCurrency(plans.find(p => p.id === selectedPlan)?.price || 0)}</span>
                    </div>
                  )}
                  
                  {referralDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Referral Discount (10%)</span>
                      <span>- {formatCurrency((plans.find(p => p.id === selectedPlan)?.price || 0) * referralDiscount)}</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-2 font-medium">
                    <div className="flex justify-between">
                      <span>Total</span>
                      <span>{formatCurrency(calculateFinalPrice(plans.find(p => p.id === selectedPlan) as PricePlan))}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Referral Code</h3>
                  <div className="flex">
                    <Input
                      placeholder="Enter referral code (optional)"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      className="mr-2"
                    />
                    <Button 
                      onClick={handleApplyReferral}
                      variant="outline"
                      disabled={referralDiscount > 0}
                    >
                      Apply
                    </Button>
                  </div>
                  
                  {referralDiscount > 0 && (
                    <div className="mt-2 text-sm text-green-600 flex items-center">
                      <Check className="h-4 w-4 mr-1" />
                      10% discount applied successfully!
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Payment Method</h3>
                
                <div className="space-y-4">
                  <div className="border rounded-lg p-3 flex items-center cursor-pointer bg-gray-50">
                    <input 
                      type="radio" 
                      id="cc" 
                      name="payment" 
                      defaultChecked 
                      className="h-4 w-4 text-scryptex-blue"
                    />
                    <label htmlFor="cc" className="ml-2 flex items-center cursor-pointer">
                      <CreditCard className="h-5 w-5 mr-2 text-gray-500" />
                      Credit/Debit Card
                    </label>
                  </div>
                  
                  <div className="border rounded-lg p-3 flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      id="bank" 
                      name="payment" 
                      className="h-4 w-4 text-scryptex-blue"
                    />
                    <label htmlFor="bank" className="ml-2 flex items-center cursor-pointer">
                      <DollarSign className="h-5 w-5 mr-2 text-gray-500" />
                      Bank Transfer
                    </label>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-scryptex-blue hover:bg-scryptex-dark text-white py-3"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      "Complete Purchase"
                    )}
                  </Button>
                  
                  <p className="text-center text-sm text-gray-500 mt-3">
                    Credits will be added to your account immediately after payment.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="text-center mt-8 text-gray-600 max-w-xl mx-auto animate-in fade-in duration-500">
        <p className="italic text-sm">
          "Lebih hemat dari kopi, lebih bermanfaat untuk portofoliomu."
        </p>
      </div>
    </div>
  );
};

export default TopUp;
