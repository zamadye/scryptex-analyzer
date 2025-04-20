
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export const WaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email is required",
        description: "Please enter your email address to join the waitlist",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Successfully joined waitlist!",
        description: "We'll notify you when Scryptex is ready for you",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Join the Scryptex Early Access</h2>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Be among the first to experience the future of airdrop farming and get exclusive benefits when we launch
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 py-6"
            />
            <Button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-600 text-white py-6" 
              isLoading={isSubmitting}
            >
              Join Waitlist
            </Button>
          </div>
        </form>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <div className="text-2xl font-bold mb-2">200+</div>
            <p className="text-blue-200">Active Beta Users</p>
          </div>
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <div className="text-2xl font-bold mb-2">$50K+</div>
            <p className="text-blue-200">Airdrops Claimed</p>
          </div>
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <div className="text-2xl font-bold mb-2">24/7</div>
            <p className="text-blue-200">Automated Farming</p>
          </div>
        </div>
      </div>
    </section>
  );
};
