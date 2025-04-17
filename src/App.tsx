
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import Home from "./pages/Home";
import Analyze from "./pages/Analyze";
import Autopilot from "./pages/Autopilot";
import Farming from "./pages/Farming";
import Portfolio from "./pages/Portfolio";
import Screener from "./pages/Screener";
import Referral from "./pages/Referral";
import TopUp from "./pages/TopUp";
import NotFound from "./pages/NotFound";
import { OutOfCreditsModal } from "@/components/ui/OutOfCreditsModal";

const App = () => {
  // Create a client with defaults
  const [queryClient] = useState(() => new QueryClient());
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  
  // Check if credits are 0 when component mounts
  useEffect(() => {
    const checkCredits = () => {
      const savedCredits = localStorage.getItem('userCredits');
      if (savedCredits === '0') {
        setShowCreditsModal(true);
      }
    };
    
    // Check initially
    checkCredits();
    
    // Listen for storage events (when credits change)
    window.addEventListener('storage', checkCredits);
    
    return () => {
      window.removeEventListener('storage', checkCredits);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PageLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analyze" element={<Analyze />} />
              <Route path="/autopilot" element={<Autopilot />} />
              <Route path="/farming" element={<Farming />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/screener" element={<Screener />} />
              <Route path="/referral" element={<Referral />} />
              <Route path="/topup" element={<TopUp />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </PageLayout>
        </BrowserRouter>
        
        {/* Out of credits modal */}
        <OutOfCreditsModal 
          isOpen={showCreditsModal}
          onClose={() => setShowCreditsModal(false)}
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
