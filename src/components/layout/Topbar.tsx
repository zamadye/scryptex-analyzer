
import { useAuth } from "@/context/AuthContext";
import { CreditPanel } from "@/components/common/CreditPanel";
import { TopbarBrand } from "./topbar/TopbarBrand";
import { LanguageThemeMenu } from "./topbar/LanguageThemeMenu";
import { NotificationMenu } from "./topbar/NotificationMenu";
import { UserMenu } from "./topbar/UserMenu";
import { AuthButtons } from "./topbar/AuthButtons";

interface TopbarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export function Topbar({ sidebarOpen, toggleSidebar }: TopbarProps) {
  const { isLoggedIn } = useAuth();
  
  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="h-16 px-4 flex items-center justify-between md:px-6">
        <TopbarBrand sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <div className="flex items-center space-x-4">
          <CreditPanel className="credit-panel" />
          <LanguageThemeMenu />
          <NotificationMenu />
          {isLoggedIn ? <UserMenu /> : <AuthButtons />}
        </div>
      </div>
    </header>
  );
}
