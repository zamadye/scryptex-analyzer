
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNotifications } from "@/context/NotificationContext";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

export const NotificationMenu = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const { t } = useLanguage();
  
  // Get only the 5 most recent notifications
  const recentNotifications = notifications.slice(0, 5);

  return (
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
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>{t('recentNotifications')}</span>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="h-auto py-1 px-2 text-xs"
            >
              {t('markAllAsRead')}
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {recentNotifications.length > 0 ? (
          <>
            {recentNotifications.map((notification) => (
              <DropdownMenuItem 
                key={notification.id} 
                onClick={() => markAsRead(notification.id)}
                className={`flex flex-col items-start p-3 gap-1 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
              >
                <div className="flex justify-between w-full">
                  <span className={`font-medium ${!notification.read ? 'text-blue-600' : ''}`}>
                    {notification.title}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(notification.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {notification.message}
                </p>
              </DropdownMenuItem>
            ))}

            <div className="text-center py-2 border-t">
              <Link 
                to="/notifications" 
                className="text-blue-600 text-sm hover:underline"
              >
                {t('viewAllNotifications')}
              </Link>
            </div>
          </>
        ) : (
          <div className="p-4 text-center text-gray-500">
            {t('noNotifications')}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
