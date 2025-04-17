
import { useState, useEffect } from "react";
import { AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreditStatusBadgeProps {
  credits: number;
  onCreditExpire?: () => void;
}

export const CreditStatusBadge = ({ credits, onCreditExpire }: CreditStatusBadgeProps) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(
    localStorage.getItem('freeCreditsExpiry') 
      ? Math.max(0, Math.floor((parseInt(localStorage.getItem('freeCreditsExpiry') || '0') - Date.now()) / 1000))
      : null
  );
  
  const hasFreeCredit = timeLeft !== null && timeLeft > 0;
  
  useEffect(() => {
    // Initialize free credits if not present
    if (timeLeft === null) {
      const expiryTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now
      localStorage.setItem('freeCreditsExpiry', expiryTime.toString());
      setTimeLeft(24 * 60 * 60);
    }
    
    const timer = setInterval(() => {
      if (timeLeft !== null && timeLeft > 0) {
        const newTimeLeft = timeLeft - 1;
        setTimeLeft(newTimeLeft);
        
        if (newTimeLeft === 0 && onCreditExpire) {
          onCreditExpire();
        }
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, onCreditExpire]);
  
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="relative">
      <div 
        className={cn(
          "px-3 py-1 rounded-full text-white font-medium text-sm flex items-center",
          credits >= 3 ? "bg-scryptex-blue" : 
          credits > 0 ? "bg-yellow-500" : "bg-red-500"
        )}
      >
        <span>Credits: {credits}</span>
      </div>
      
      {hasFreeCredit && (
        <div className="absolute top-full right-0 mt-1 w-max bg-green-100 text-green-800 text-xs px-2 py-1 rounded-md flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          <span>Free credit expires in {formatTime(timeLeft)}</span>
        </div>
      )}
      
      {credits <= 2 && (
        <div className="absolute top-full right-0 mt-1 w-max bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-md flex items-center">
          <AlertCircle className="h-3 w-3 mr-1" />
          <span>Low credits remaining</span>
        </div>
      )}
    </div>
  );
};
