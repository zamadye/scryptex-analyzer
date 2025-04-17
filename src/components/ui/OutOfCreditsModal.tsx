
import { X, CreditCard, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface OutOfCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OutOfCreditsModal = ({ isOpen, onClose }: OutOfCreditsModalProps) => {
  const navigate = useNavigate();
  
  if (!isOpen) return null;
  
  const handleTopUp = () => {
    navigate("/topup");
    onClose();
  };
  
  const handleReferral = () => {
    navigate("/referral");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full animate-in fade-in zoom-in duration-300">
        <div className="p-6">
          <div className="absolute top-4 right-4">
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-8 w-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold mb-2">Kredit Anda Telah Habis</h2>
            <p className="text-gray-600">
              Lanjutkan farming, analisa, atau post tweet dengan isi ulang cepat.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={handleTopUp}
              className="w-full bg-scryptex-blue hover:bg-scryptex-dark text-white py-3"
            >
              <CreditCard className="h-5 w-5 mr-2" />
              Top Up Sekarang
            </Button>
            
            <Button 
              onClick={handleReferral}
              variant="outline" 
              className="w-full border-gray-300 py-3"
            >
              <Share2 className="h-5 w-5 mr-2" />
              Dapatkan Kredit Gratis lewat Referral
            </Button>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              Waktu kamu sangat berharga — jangan biarkan farming berhenti hanya karena kehabisan kredit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
