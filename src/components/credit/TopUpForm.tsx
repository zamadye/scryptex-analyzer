
import { useState } from "react";
import { CreditCard, Check, Gift } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/cardui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/inputui";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const creditPackages = [
  { id: "basic", name: "Basic", credits: 100, price: 29 },
  { id: "pro", name: "Pro", credits: 500, price: 99, recommended: true },
  { id: "premium", name: "Premium", credits: 1500, price: 249 }
];

export function TopUpForm() {
  const [selectedPackage, setSelectedPackage] = useState("pro");
  const [referralCode, setReferralCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  const handleTopUp = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Add credits to user account (simulated)
      const currentCredits = parseInt(localStorage.getItem('userCredits') || '0');
      const packageCredits = creditPackages.find(p => p.id === selectedPackage)?.credits || 0;
      
      localStorage.setItem('userCredits', (currentCredits + packageCredits).toString());
      
      // Dispatch storage event for other components to detect
      window.dispatchEvent(new Event('storage'));
      
      toast({
        title: "Credits Added",
        description: `${packageCredits} credits have been added to your account.`,
      });
    }, 2000);
  };
  
  const getDiscount = () => {
    if (!referralCode) return 0;
    // Simulate referral code validation (20% discount)
    return 0.2;
  };
  
  const discount = getDiscount();
  const selectedPkg = creditPackages.find(p => p.id === selectedPackage);
  const discountedPrice = selectedPkg ? Math.round(selectedPkg.price * (1 - discount)) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Up Credits</CardTitle>
        <CardDescription>
          Purchase credits to use our AI agent features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={selectedPackage} onValueChange={setSelectedPackage}>
          {creditPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex items-center justify-between p-4 rounded-lg border ${
                selectedPackage === pkg.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              } transition-all cursor-pointer`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              <div className="flex items-start gap-3">
                <RadioGroupItem value={pkg.id} id={pkg.id} className="mt-1" />
                <div>
                  <Label htmlFor={pkg.id} className="text-base font-medium">
                    {pkg.name} Package
                  </Label>
                  <p className="text-sm text-gray-500">
                    {pkg.credits} credits
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-bold text-lg">${pkg.price}</span>
                {discount > 0 && (
                  <span className="text-sm text-green-600 font-medium">
                    ${discountedPrice} after discount
                  </span>
                )}
              </div>
              {pkg.recommended && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-0.5 text-xs font-medium rounded-bl-lg rounded-tr-lg">
                  Recommended
                </div>
              )}
            </div>
          ))}
        </RadioGroup>
        
        <div className="pt-4 space-y-2">
          <Label htmlFor="referral-code">Referral Code (Optional)</Label>
          <div className="relative">
            <Gift className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="referral-code"
              placeholder="Enter referral code for 20% off"
              className="pl-10"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
            />
          </div>
          {discount > 0 && (
            <p className="text-sm text-green-600 flex items-center">
              <Check className="mr-1 h-4 w-4" />
              20% discount applied!
            </p>
          )}
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mt-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Selected Package:</span>
            <span className="font-medium">{selectedPkg?.name} ({selectedPkg?.credits} credits)</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Discount:</span>
              <span className="text-green-600">-${selectedPkg ? selectedPkg.price - discountedPrice : 0}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
            <span className="font-medium">Total:</span>
            <span className="font-bold">${discountedPrice}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleTopUp} 
          disabled={isProcessing}
          className="w-full"
        >
          <CreditCard className="mr-2 h-4 w-4" />
          {isProcessing ? "Processing Payment..." : "Complete Purchase"}
        </Button>
      </CardFooter>
    </Card>
  );
}
