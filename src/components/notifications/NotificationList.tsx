
import { useNotifications, Notification as NotificationType } from '@/context/NotificationContext';
import { DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Bell, BellOff, Check, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

export const NotificationList = () => {
  const { notifications, markAsRead, markAllAsRead, clearNotifications } = useNotifications();
  const { t } = useLanguage();
  
  if (notifications.length === 0) {
    return (
      <div className="p-4 text-center">
        <div className="flex justify-center mb-2">
          <BellOff className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500">{t('noNotifications')}</p>
      </div>
    );
  }
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return format(date, 'MMM d, h:mm a');
  };
  
  const getIconForType = (type: NotificationType['type']) => {
    switch (type) {
      case 'success':
        return <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center"><Check className="h-4 w-4 text-green-600" /></div>;
      case 'warning':
        return <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center"><Bell className="h-4 w-4 text-yellow-600" /></div>;
      case 'error':
        return <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center"><Bell className="h-4 w-4 text-red-600" /></div>;
      default:
        return <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center"><Bell className="h-4 w-4 text-blue-600" /></div>;
    }
  };
  
  return (
    <div>
      <DropdownMenuLabel className="flex justify-between items-center">
        <span>{t('notifications')}</span>
        <div className="flex space-x-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={markAllAsRead}
            className="h-8 px-2 text-xs"
          >
            <Check className="h-3 w-3 mr-1" />
            {t('markAllRead')}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearNotifications}
            className="h-8 px-2 text-xs text-red-500 hover:text-red-600"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            {t('clear')}
          </Button>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      
      <div className="max-h-[300px] overflow-y-auto">
        {notifications.map((notification) => (
          <DropdownMenuItem
            key={notification.id}
            className={`p-3 flex items-start space-x-3 cursor-default ${!notification.read ? 'bg-blue-50 dark:bg-blue-950/30' : ''}`}
            onSelect={() => markAsRead(notification.id)}
          >
            {getIconForType(notification.type)}
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${!notification.read ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                {notification.title}
              </p>
              <p className="text-xs text-gray-500 truncate mt-1">{notification.message}</p>
              <p className="text-xs text-gray-400 mt-1">{formatTimestamp(notification.timestamp)}</p>
            </div>
            {!notification.read && (
              <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0 mt-1"></div>
            )}
          </DropdownMenuItem>
        ))}
      </div>
    </div>
  );
};
