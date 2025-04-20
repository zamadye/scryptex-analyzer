
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustSection } from "@/components/home/TrustSection";
import { FeatureSection } from "@/components/home/FeatureSection";
import { StepFlowSection } from "@/components/home/StepFlowSection";
import { WaitlistSection } from "@/components/home/WaitlistSection";
import { AuthModal } from "@/components/auth/AuthModal";
import { useLanguage } from "@/context/LanguageContext";

// Footer component
const Footer = () => {
  const { t } = useLanguage();
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Scryptex</h3>
            <p className="text-gray-400 mb-4">Your AI Agent for Crypto Airdrop Research & Farming</p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/scryptex" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="https://t.me/scryptex" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.05 18.312c-.97 0-1.937-.12-2.863-.34l-3.24.843.863-3.112c-.282-.905-.438-1.864-.438-2.853 0-5.348 4.417-9.704 9.852-9.704 5.435 0 9.853 4.355 9.853 9.703 0 5.346-4.418 9.703-9.853 9.703 0 0 0 0-.008-.002.008.002.008.002 0 .002z"></path>
                  <path d="M16.2 13.37c-.206-.105-1.238-.608-1.43-.678-.19-.07-.33-.105-.467.105-.138.21-.532.678-.65.816-.12.14-.24.157-.446.052-.206-.105-.87-.32-1.656-.972-.612-.543-1.026-1.214-1.145-1.422-.12-.207-.013-.318.09-.422.092-.097.205-.254.308-.38.103-.125.137-.215.205-.355s.113-.318.034-.444c-.078-.128-.467-1.126-.64-1.543-.168-.414-.339-.358-.466-.365-.12-.007-.26-.008-.398-.008-.137 0-.36.052-.55.258-.19.207-.72.704-.72 1.715 0 1.01.739 1.987.843 2.124.103.137 1.45 2.465 3.578 3.265.499.215.89.344 1.194.44.501.162.958.138 1.32.084.4-.06 1.237-.505 1.41-1.015.172-.51.172-.947.12-1.038-.052-.09-.192-.15-.398-.254z"></path>
                </svg>
              </a>
              <a href="https://github.com/scryptex" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><button onClick={() => setShowAuthModal(true)} className="hover:text-white transition-colors">Pricing</button></li>
              <li><button onClick={() => setShowAuthModal(true)} className="hover:text-white transition-colors">API</button></li>
              <li><Link to="/referral" className="hover:text-white transition-colors">Referral Program</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="https://docs.scryptex.ai" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="https://blog.scryptex.ai" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="https://community.scryptex.ai" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Community</a></li>
              <li><a href="https://support.scryptex.ai" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/cookies" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Scryptex. All rights reserved.</p>
        </div>
      </div>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </footer>
  );
};

// Main Home component
const Home = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <StepFlowSection />
      <FeatureSection />
      <TrustSection />
      <WaitlistSection />
      <Footer />
    </div>
  );
};

export default Home;
