import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import { CreditPanel } from "@/components/common/CreditPanel";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

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
            {isLoggedIn ? (
              <>
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
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="text-gray-700"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    className="flex items-center space-x-1"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    className="flex items-center space-x-1 bg-scryptex-blue hover:bg-scryptex-dark"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Sign Up</span>
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            {isLoggedIn && <CreditPanel className="mr-4" />}
            
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
          
          {isLoggedIn ? (
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
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
              <button
                onClick={handleLogout}
                className="w-full mt-2 px-3 py-2 text-left rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
              <Link
                to="/login"
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-scryptex-blue hover:bg-gray-50"
              >
                <LogIn className="h-5 w-5 mr-2" />
                Login
              </Link>
              <Link
                to="/signup"
                className="flex items-center px-3 py-2 rounded-md text-base font-medium bg-scryptex-blue text-white"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
