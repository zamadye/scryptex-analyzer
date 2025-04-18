
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Search, Leaf, Twitter, Gift, 
  Bookmark, Bell, Settings, ChevronLeft, ChevronRight
} from "@/components/icons";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
  collapsed?: boolean;
}

const NavItem = ({ icon, label, to, active, collapsed }: NavItemProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center px-3 py-2 my-1 rounded-lg text-sm font-medium transition-colors",
      active
        ? "bg-blue-50 text-blue-600"
        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
    )}
  >
    <div className="flex items-center justify-center w-8 h-8">{icon}</div>
    {!collapsed && <span className="ml-3">{label}</span>}
  </Link>
);

interface SidebarProps {
  open: boolean;
}

export function Sidebar({ open }: SidebarProps) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <aside
      className={cn(
        "fixed top-16 left-0 z-30 h-[calc(100vh-64px)] bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
        open ? "w-64" : "w-20"
      )}
    >
      <div className="flex flex-col h-full p-4">
        <div className="flex-1 flex flex-col">
          <NavItem
            to="/"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active={isActive("/")}
            collapsed={!open}
          />
          <NavItem
            to="/analyze"
            icon={<Search size={20} />}
            label="Analyze"
            active={isActive("/analyze")}
            collapsed={!open}
          />
          <NavItem
            to="/farming"
            icon={<Leaf size={20} />}
            label="Farming"
            active={isActive("/farming")}
            collapsed={!open}
          />
          <NavItem
            to="/twitter"
            icon={<Twitter size={20} />}
            label="Twitter Agent"
            active={isActive("/twitter")}
            collapsed={!open}
          />
          <NavItem
            to="/airdrops"
            icon={<Gift size={20} />}
            label="Airdrop Explorer"
            active={isActive("/airdrops")}
            collapsed={!open}
          />
          <NavItem
            to="/saved"
            icon={<Bookmark size={20} />}
            label="Saved Projects"
            active={isActive("/saved")}
            collapsed={!open}
          />
          <NavItem
            to="/notifications"
            icon={<Bell size={20} />}
            label="Notifications"
            active={isActive("/notifications")}
            collapsed={!open}
          />
          <NavItem
            to="/settings"
            icon={<Settings size={20} />}
            label="Settings"
            active={isActive("/settings")}
            collapsed={!open}
          />
        </div>
      </div>
    </aside>
  );
}
