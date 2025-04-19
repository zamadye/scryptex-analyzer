
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreditStatusBadge } from "@/components/ui/CreditStatusBadge";
import { OutOfCreditsModal } from "@/components/ui/OutOfCreditsModal";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CreditPanelProps {
  className?: string;
}

export const CreditPanel = ({ className }: CreditPanelProps) => {
  const navigate = useNavigate();
  
  // Initialize credits from localStorage or default to 6
  const [credits, setCredits] = useState(() => {
    const savedCredits = localStorage.getItem('userCredits');
    return savedCredits ? parseInt(savedCredits) : 6;
  });
  
  const [showModal, setShowModal] = useState(false);
  
  // Save credits to localStorage when they change
  useEffect(() => {
    localStorage.setItem('userCredits', credits.toString());
    
    // Show modal when credits reach 0
    if (credits === 0) {
      setShowModal(true);
    }
  }, [credits]);

  // Listen for changes to credits from other components
  useEffect(() => {
    const handleStorageChange = () => {
      const newCredits = localStorage.getItem('userCredits');
      if (newCredits) {
        setCredits(parseInt(newCredits));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Simulate credit usage (for demo purposes)
  const useCredit = (amount = 1) => {
    if (credits >= amount) {
      setCredits(credits - amount);
      
      // Record usage in credit history
      const transactions = JSON.parse(localStorage.getItem('creditTransactions') || '[]');
      transactions.push({
        type: 'use',
        credits: amount,
        date: new Date().toISOString(),
        action: 'AI Action'
      });
      localStorage.setItem('creditTransactions', JSON.stringify(transactions));
      
      return true;
    } else {
      setShowModal(true);
      return false;
    }
  };
  
  // Add free credit when expired
  const handleCreditExpire = () => {
    const newCredits = credits + 1;
    setCredits(newCredits);
    
    // Reset expiry to 24 hours from now
    const expiryTime = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem('freeCreditsExpiry', expiryTime.toString());
    
    // Record free credit in history
    const transactions = JSON.parse(localStorage.getItem('creditTransactions') || '[]');
    transactions.push({
      type: 'topup',
      credits: 1,
      date: new Date().toISOString(),
      package: 'Free Daily',
      method: 'System'
    });
    localStorage.setItem('creditTransactions', JSON.stringify(transactions));
    
    // Force UI update across components
    window.dispatchEvent(new Event('storage'));
    
    useToast().toast({
      title: "Free Credit Added",
      description: "You've received 1 free daily credit!"
    });
  };

  const handleTopUp = () => {
    navigate("/topup");
    setShowModal(false);
  };
  
  const handleReferral = () => {
    navigate("/referral");
    setShowModal(false);
  };

  return (
    <div className={className}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-pointer" onClick={() => navigate("/topup")}>
              <CreditStatusBadge credits={credits} onCreditExpire={handleCreditExpire} />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Each action consumes credits. Top up now.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <OutOfCreditsModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onTopUp={handleTopUp}
        onReferral={handleReferral}
      />
    </div>
  );
};

// Export functions to be used across the app
export const CreditManager = {
  useCredit: (amount = 1): boolean => {
    const savedCredits = localStorage.getItem('userCredits');
    const currentCredits = savedCredits ? parseInt(savedCredits) : 0;
    
    if (currentCredits >= amount) {
      const newCredits = currentCredits - amount;
      localStorage.setItem('userCredits', newCredits.toString());
      
      // Record usage in credit history
      const transactions = JSON.parse(localStorage.getItem('creditTransactions') || '[]');
      transactions.push({
        type: 'use',
        credits: amount,
        date: new Date().toISOString(),
        action: 'AI Action'
      });
      localStorage.setItem('creditTransactions', JSON.stringify(transactions));
      
      // Force UI update across components
      window.dispatchEvent(new Event('storage'));
      return true;
    }
    return false;
  },
  
  addCredits: (amount: number): void => {
    const savedCredits = localStorage.getItem('userCredits');
    const currentCredits = savedCredits ? parseInt(savedCredits) : 0;
    
    const newCredits = currentCredits + amount;
    localStorage.setItem('userCredits', newCredits.toString());
    
    // Force UI update across components
    window.dispatchEvent(new Event('storage'));
  },
  
  getCredits: (): number => {
    const savedCredits = localStorage.getItem('userCredits');
    return savedCredits ? parseInt(savedCredits) : 0;
  }
};
