
import { Link } from "react-router-dom";
import { LogOut, User, Settings, CreditCard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export const UserMenu = () => {
  const { user, logout, getXpLevel } = useAuth();
  const { t } = useLanguage();
  const userLevel = getXpLevel();

  return (
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
        
        <DropdownMenuItem asChild>
          <Link to="/topup" className="flex items-center">
            <CreditCard className="mr-2 h-4 w-4" />
            {t('topup')}
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link to="/settings" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            {t('profile')}
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link to="/settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            {t('settings')}
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          {t('logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
