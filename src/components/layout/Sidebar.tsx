
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, Search, Leaf, Twitter, Gift, 
  Bookmark, Bell, Settings, User, ChevronLeft, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
  collapsed?: boolean;
}

const NavItem = ({ icon, label, to, active, collapsed }: NavItemProps) => {
  const navigate = useNavigate();
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(to);
  };
  
  return (
    <Link
      to={to}
      onClick={handleClick}
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
};

interface SidebarProps {
  open: boolean;
}

export function Sidebar({ open }: SidebarProps) {
  const location = useLocation();
  const { t } = useLanguage();
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { to: "/dashboard", icon: <LayoutDashboard size={20} />, label: t('dashboard') },
    { to: "/analyze", icon: <Search size={20} />, label: t('analyze') },
    { to: "/farming", icon: <Leaf size={20} />, label: t('farming') },
    { to: "/twitter", icon: <Twitter size={20} />, label: t('twitterAgent') },
    { to: "/airdrops", icon: <Gift size={20} />, label: t('airdropExplorer') },
    { to: "/portfolio", icon: <Bookmark size={20} />, label: t('savedProjects') },
    { to: "/notifications", icon: <Bell size={20} />, label: t('notifications') },
    { to: "/profile", icon: <User size={20} />, label: t('profile') },
    { to: "/settings", icon: <Settings size={20} />, label: t('settings') },
  ];
  
  return (
    <aside
      className={cn(
        "fixed top-16 left-0 z-30 h-[calc(100vh-64px)] bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
        open ? "w-64" : "w-20"
      )}
    >
      <div className="flex flex-col h-full p-4">
        <div className="flex-1 flex flex-col">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              active={isActive(item.to)}
              collapsed={!open}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
