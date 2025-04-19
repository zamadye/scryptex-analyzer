
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/cardui";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/context/NotificationContext";
import { useLanguage } from "@/context/LanguageContext";
import { Bell, Check, Clock, AlertCircle, Search, Leaf, Twitter } from "lucide-react";

export default function Notifications() {
  const { notifications, markAllAsRead, clearNotifications } = useNotifications();
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  
  const filteredNotifications = notifications.filter((notification) => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return true;
  });
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };
  
  const getActionIcon = (title: string) => {
    if (title.toLowerCase().includes('analyze') || title.toLowerCase().includes('project')) {
      return <Search className="h-4 w-4 text-blue-500" />;
    }
    if (title.toLowerCase().includes('farm') || title.toLowerCase().includes('task')) {
      return <Leaf className="h-4 w-4 text-green-500" />;
    }
    if (title.toLowerCase().includes('tweet') || title.toLowerCase().includes('twitter')) {
      return <Twitter className="h-4 w-4 text-sky-500" />;
    }
    return <Bell className="h-4 w-4 text-gray-500" />;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">{t('notifications')}</h1>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => markAllAsRead()}
          >
            {t('markAllAsRead')}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => clearNotifications()}
          >
            {t('clearAll')}
          </Button>
        </div>
      </div>
      
      <div className="flex space-x-2 mb-4">
        <Button 
          variant={filter === 'all' ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter('all')}
        >
          {t('all')}
        </Button>
        <Button 
          variant={filter === 'unread' ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter('unread')}
        >
          {t('unread')}
        </Button>
        <Button 
          variant={filter === 'read' ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter('read')}
        >
          {t('read')}
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('allNotifications')}</CardTitle>
          <CardDescription>
            {filteredNotifications.length > 0 
              ? t('youHaveXNotifications', { count: filteredNotifications.length }) 
              : t('noNotifications')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredNotifications.length > 0 ? (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 rounded-lg border ${
                    notification.read ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-100'
                  }`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h3 className={`font-medium ${!notification.read ? 'text-blue-600' : ''}`}>
                          {notification.title}
                        </h3>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(notification.timestamp).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">{notification.message}</p>
                      
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs text-gray-500">
                          {new Date(notification.timestamp).toLocaleDateString()}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 flex items-center">
                          {getActionIcon(notification.title)}
                          <span className="ml-1">
                            {notification.title.toLowerCase().includes('analyze') ? 'Analysis' : 
                             notification.title.toLowerCase().includes('farm') ? 'Farming' :
                             notification.title.toLowerCase().includes('tweet') ? 'Twitter' :
                             'System'}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">{t('noNotificationsToShow')}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
