
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreditStatusBadge } from "@/components/ui/CreditStatusBadge";
import { OutOfCreditsModal } from "@/components/ui/OutOfCreditsModal";
import { toast } from "@/hooks/use-toast";

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

  // Simulate credit usage (for demo purposes)
  const useCredit = (amount = 1) => {
    if (credits >= amount) {
      setCredits(credits - amount);
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
    
    toast({
      title: "Free Credit Added",
      description: "You've received 1 free daily credit!",
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
      <CreditStatusBadge credits={credits} onCreditExpire={handleCreditExpire} />
      
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
