
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { CreditPanel } from "@/components/common/CreditPanel";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Analyze", path: "/analyze" },
    { name: "Autopilot", path: "/autopilot" },
    { name: "Farming", path: "/farming" },
    { name: "Airdrops", path: "/portfolio" },
    { name: "Screener", path: "/screener" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-scryptex-blue">Scryptex</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "text-scryptex-blue"
                    : "text-gray-700 hover:text-scryptex-blue hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <CreditPanel />
            
            <Link
              to="/referral"
              className="text-sm text-gray-700 hover:text-scryptex-blue px-3 py-2"
            >
              Referral
            </Link>
            <Link
              to="/topup"
              className="bg-scryptex-blue hover:bg-scryptex-dark text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Top Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <CreditPanel className="mr-4" />
            
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-scryptex-blue hover:bg-gray-50 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === item.path
                  ? "text-scryptex-blue bg-scryptex-light"
                  : "text-gray-700 hover:text-scryptex-blue hover:bg-gray-50"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
            <Link
              to="/referral"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-scryptex-blue hover:bg-gray-50"
            >
              Referral
            </Link>
            <Link
              to="/topup"
              className="block px-3 py-2 rounded-md text-base font-medium bg-scryptex-blue text-white"
            >
              Top Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
