
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-scryptex-blue font-bold text-xl">Scryptex</span>
            <p className="text-gray-500 text-sm mt-1">Crypto Analysis & Research Platform</p>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/analyze" className="text-gray-500 hover:text-gray-700">Analyze</Link>
            <Link to="/autopilot" className="text-gray-500 hover:text-gray-700">Autopilot</Link>
            <Link to="/farming" className="text-gray-500 hover:text-gray-700">Farming</Link>
            <Link to="/portfolio" className="text-gray-500 hover:text-gray-700">Portfolio</Link>
            <Link to="/screener" className="text-gray-500 hover:text-gray-700">Screener</Link>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Scryptex. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
