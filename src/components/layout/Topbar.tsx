
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Bell, Globe, User, ChevronLeft, ChevronRight, Moon, Sun, Settings, LogOut } from "lucide-react";
import { CreditPanel } from "@/components/common/CreditPanel";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useTutorial } from "@/context/TutorialContext";
import { useNotifications } from "@/context/NotificationContext";
import { NotificationList } from "@/components/notifications/NotificationList";

interface TopbarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export function Topbar({ sidebarOpen, toggleSidebar }: TopbarProps) {
  const { user, isLoggedIn, logout, getXpLevel } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { startTutorial } = useTutorial();
  const { unreadCount } = useNotifications();
  
  const userLevel = getXpLevel();
  
  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="h-16 px-4 flex items-center justify-between md:px-6">
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
        
        <div className="flex items-center space-x-4">
          <CreditPanel id="credit-panel" />
          
          {/* Language & Theme Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t('language')} & {t('theme')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-normal text-gray-500 pl-2">{t('language')}</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={language} onValueChange={(value) => setLanguage(value as 'EN' | 'ID')}>
                  <DropdownMenuRadioItem value="EN">English</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="ID">Bahasa Indonesia</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-normal text-gray-500 pl-2">{t('theme')}</DropdownMenuLabel>
                <DropdownMenuItem onClick={toggleTheme}>
                  {theme === 'light' ? (
                    <Moon className="mr-2 h-4 w-4" />
                  ) : (
                    <Sun className="mr-2 h-4 w-4" />
                  )}
                  {theme === 'light' ? t('dark') : t('light')} {t('theme')}
                </DropdownMenuItem>
              </DropdownMenuGroup>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={startTutorial}>
                <Settings className="mr-2 h-4 w-4" />
                {t('tutorial')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Notification Bell */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative" size="icon">
                <Bell size={20} />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[350px]">
              <NotificationList />
            </DropdownMenuContent>
          </DropdownMenu>
          
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative" size="icon">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt={user?.name || "User"} />
                    <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex flex-col p-2">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                  <div className="flex items-center mt-2">
                    <Badge variant="outline" className="text-xs mr-2 bg-blue-50 text-blue-700 dark:text-blue-400 dark:bg-blue-950">
                      {t('level')} {userLevel.level}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {userLevel.title} • {user?.xp || 0} XP
                    </span>
                  </div>
                </div>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuGroup>
                  <DropdownMenuLabel>{t('activeProjects')}</DropdownMenuLabel>
                  {user?.analyzedProjects?.length ? (
                    user.analyzedProjects.slice(0, 3).map((project, index) => (
                      <DropdownMenuItem key={index}>
                        {project}
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <DropdownMenuItem disabled>
                      {t('noActiveProjects')}
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem asChild>
                  <Link to="/referral">
                    {t('referral')}
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem asChild>
                  <Link to="/topup">
                    {t('topup')}
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  {t('login')}
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">
                  {t('signup')}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
