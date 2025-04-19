
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { XPProvider } from "@/context/XPContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Analyze from "./pages/Analyze";
import Autopilot from "./pages/Autopilot";
import Farming from "./pages/Farming";
import TwitterAgent from "./pages/TwitterAgent";
import Airdrops from "./pages/Airdrops";
import Portfolio from "./pages/Portfolio";
import Screener from "./pages/Screener";
import Referral from "./pages/Referral";
import TopUp from "./pages/TopUp";
import NotFound from "./pages/NotFound";
import { OutOfCreditsModal } from "@/components/ui/OutOfCreditsModal";
import { AuthModal } from "@/components/auth/AuthModal";
import { useAuth } from "@/context/AuthContext";

// Route Guard for protected routes
const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
    }
  }, [isLoggedIn, location]);
  
  if (!isLoggedIn) {
    return (
      <>
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
        <Outlet />
      </>
    );
  }
  
  return <Outlet />;
};

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  
  useEffect(() => {
    const checkCredits = () => {
      const savedCredits = localStorage.getItem('userCredits');
      if (savedCredits === '0') {
        setShowCreditsModal(true);
      }
    };
    
    checkCredits();
    
    window.addEventListener('storage', checkCredits);
    
    return () => {
      window.removeEventListener('storage', checkCredits);
    };
  }, []);

  const handleTopUp = () => {
    window.location.href = "/topup";
    setShowCreditsModal(false);
  };
  
  const handleReferral = () => {
    window.location.href = "/referral";
    setShowCreditsModal(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <ThemeProvider>
            <NotificationProvider>
              <XPProvider>
                <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  <BrowserRouter>
                    <Routes>
                      {/* Landing page route */}
                      <Route 
                        path="/" 
                        element={
                          <PageLayout>
                            <Home />
                          </PageLayout>
                        } 
                      />
                      
                      {/* Protected dashboard routes */}
                      <Route element={<ProtectedRoute />}>
                        <Route element={<DashboardLayout />}>
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/analyze" element={<Analyze />} />
                          <Route path="/farming" element={<Farming />} />
                          <Route path="/twitter" element={<TwitterAgent />} />
                          <Route path="/airdrops" element={<Airdrops />} />
                          <Route path="/portfolio" element={<Portfolio />} />
                          <Route path="/screener" element={<Screener />} />
                          <Route path="/referral" element={<Referral />} />
                          <Route path="/topup" element={<TopUp />} />
                        </Route>
                      </Route>
                      
                      <Route path="/404" element={<NotFound />} />
                      <Route path="*" element={<Navigate to="/404" replace />} />
                    </Routes>
                    
                    <OutOfCreditsModal 
                      isOpen={showCreditsModal}
                      onClose={() => setShowCreditsModal(false)}
                      onTopUp={handleTopUp}
                      onReferral={handleReferral}
                    />
                  </BrowserRouter>
                </TooltipProvider>
              </XPProvider>
            </NotificationProvider>
          </ThemeProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
