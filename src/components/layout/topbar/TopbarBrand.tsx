
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopbarBrandProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const TopbarBrand = ({ sidebarOpen, toggleSidebar }: TopbarBrandProps) => {
  return (
    <div className="flex items-center">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="mr-2"
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </Button>
      <Link to="/" className="flex items-center">
        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Scryptex</span>
        <span className="ml-2 font-medium text-gray-700 dark:text-gray-300">AI Agent</span>
      </Link>
    </div>
  );
};
