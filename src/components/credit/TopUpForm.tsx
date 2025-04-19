
import { useState } from "react";
import { CreditCard, Check, Gift, Wallet, CreditCardIcon, ArrowRight, Smartphone } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/cardui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/inputui";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const creditPackages = [
  { id: "basic", name: "Basic", credits: 100, price: 29 },
  { id: "pro", name: "Pro", credits: 500, price: 99, recommended: true },
  { id: "premium", name: "Premium", credits: 1500, price: 249 }
];

const paymentOptions = {
  onchain: [
    { id: "eth", name: "Ethereum (ETH)", icon: "💎" },
    { id: "bnb", name: "Binance Coin (BNB)", icon: "🔶" },
    { id: "usdt", name: "Tether (USDT)", icon: "💵" }
  ],
  offchain: [
    { id: "paypal", name: "PayPal", icon: "🌐" },
    { id: "gopay", name: "GoPay", icon: "🇮🇩" },
    { id: "ovo", name: "OVO", icon: "📱" }
  ]
};

export function TopUpForm() {
  const [selectedPackage, setSelectedPackage] = useState("pro");
  const [referralCode, setReferralCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  // Payment simulation states
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("onchain");
  const [selectedCrypto, setSelectedCrypto] = useState("eth");
  const [selectedProvider, setSelectedProvider] = useState("paypal");
  const [walletAddress, setWalletAddress] = useState("");
  
  const handleTopUp = () => {
    // Open the payment modal instead of immediately processing
    setShowPaymentModal(true);
    setCurrentStep(1);
  };
  
  const handlePaymentCancel = () => {
    setShowPaymentModal(false);
    setCurrentStep(1);
    setWalletAddress("");
  };
  
  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const simulatePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(3);
    }, 1500);
  };
  
  const completePayment = () => {
    // Add credits to user account (simulated)
    const currentCredits = parseInt(localStorage.getItem('userCredits') || '0');
    const packageCredits = creditPackages.find(p => p.id === selectedPackage)?.credits || 0;
    
    localStorage.setItem('userCredits', (currentCredits + packageCredits).toString());
    
    // Record the transaction in credit history
    const transactions = JSON.parse(localStorage.getItem('creditTransactions') || '[]');
    transactions.push({
      type: 'topup',
      credits: packageCredits,
      method: paymentMethod === 'onchain' ? selectedCrypto : selectedProvider,
      price: getDiscountedPrice(),
      date: new Date().toISOString(),
      package: selectedPackage
    });
    localStorage.setItem('creditTransactions', JSON.stringify(transactions));
    
    // Dispatch storage event for other components to detect
    window.dispatchEvent(new Event('storage'));
    
    // Close the modal and show success toast
    setShowPaymentModal(false);
    setCurrentStep(1);
    
    toast({
      title: "Credits Added",
      description: `${packageCredits} credits have been added to your account.`,
    });
  };
  
  const getDiscount = () => {
    if (!referralCode) return 0;
    // Simulate referral code validation (20% discount)
    return 0.2;
  };
  
  const discount = getDiscount();
  const selectedPkg = creditPackages.find(p => p.id === selectedPackage);
  const getDiscountedPrice = () => {
    return selectedPkg ? Math.round(selectedPkg.price * (1 - discount)) : 0;
  };
  const discountedPrice = getDiscountedPrice();

  return (
    <>
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
            Complete Purchase
          </Button>
        </CardFooter>
      </Card>

      {/* Payment Simulation Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Purchase Credits</DialogTitle>
            <DialogDescription>
              Step {currentStep} of 3
            </DialogDescription>
          </DialogHeader>

          {/* Step 1: Payment Method Selection */}
          {currentStep === 1 && (
            <div className="space-y-4 py-4">
              <h3 className="text-lg font-medium">Select Payment Method</h3>
              <Tabs 
                defaultValue="onchain" 
                value={paymentMethod} 
                onValueChange={setPaymentMethod} 
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="onchain" className="flex items-center">
                    <Wallet className="h-4 w-4 mr-2" />
                    Onchain
                  </TabsTrigger>
                  <TabsTrigger value="offchain" className="flex items-center">
                    <CreditCardIcon className="h-4 w-4 mr-2" />
                    Offchain
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="onchain" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Select Cryptocurrency</Label>
                    <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select cryptocurrency" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentOptions.onchain.map(option => (
                          <SelectItem key={option.id} value={option.id}>
                            <span className="flex items-center">
                              <span className="mr-2">{option.icon}</span>
                              {option.name}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
                <TabsContent value="offchain" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Select Payment Provider</Label>
                    <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment provider" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentOptions.offchain.map(option => (
                          <SelectItem key={option.id} value={option.id}>
                            <span className="flex items-center">
                              <span className="mr-2">{option.icon}</span>
                              {option.name}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Step 2: Payment Details */}
          {currentStep === 2 && (
            <div className="space-y-4 py-4">
              <h3 className="text-lg font-medium">Payment Details</h3>
              
              {paymentMethod === 'onchain' ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="wallet-address">Your Wallet Address</Label>
                    <Input
                      id="wallet-address"
                      placeholder="0x..."
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                    />
                  </div>
                  <div className="rounded-md bg-blue-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Wallet className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">Payment Information</h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <p>Send {selectedCrypto.toUpperCase()} to the address below to receive {selectedPkg?.credits} credits</p>
                          <p className="mt-1 font-mono text-xs bg-white p-2 rounded border border-blue-200">
                            0x3F6890a3eAbe818F4D85bA6a131eAFF8b68E03F4
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-md bg-blue-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Smartphone className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">Payment Information</h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <p>You'll be redirected to {paymentOptions.offchain.find(p => p.id === selectedProvider)?.name} to complete your payment of ${discountedPrice}.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Package:</span>
                      <span className="font-medium">{selectedPkg?.name}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-600">Total:</span>
                      <span className="font-bold">${discountedPrice}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                      <span>Value per credit:</span>
                      <span>≈ ${(discountedPrice / (selectedPkg?.credits || 1)).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Confirmation */}
          {currentStep === 3 && (
            <div className="space-y-4 py-4">
              <div className="bg-green-50 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-green-800">Payment Simulated Successfully</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>Your payment for {selectedPkg?.credits} credits has been successfully simulated. Click "Confirm" to add credits to your account.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Package:</span>
                  <span className="font-medium">{selectedPkg?.name}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Credits:</span>
                  <span className="font-medium">{selectedPkg?.credits}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Method:</span>
                  <span className="font-medium">{paymentMethod === 'onchain' ? 
                    selectedCrypto.toUpperCase() : 
                    paymentOptions.offchain.find(p => p.id === selectedProvider)?.name}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                  <span className="font-medium">Total Paid:</span>
                  <span className="font-bold">${discountedPrice}</span>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
            {currentStep === 1 && (
              <>
                <Button variant="outline" onClick={handlePaymentCancel}>
                  Cancel
                </Button>
                <Button onClick={handleNextStep}>
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            )}
            
            {currentStep === 2 && (
              <>
                <Button variant="outline" onClick={handlePrevStep}>
                  Back
                </Button>
                <Button 
                  onClick={simulatePayment} 
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Simulate Payment"}
                </Button>
              </>
            )}
            
            {currentStep === 3 && (
              <>
                <Button variant="outline" onClick={handlePaymentCancel}>
                  Cancel
                </Button>
                <Button onClick={completePayment}>
                  Confirm
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
